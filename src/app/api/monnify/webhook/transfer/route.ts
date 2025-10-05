import {NextResponse, NextRequest} from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {revalidatePath} from "next/cache";

const verifyMonnifySignature = (payload: string, signature: string, secretKey: string) => {
    try {
        const computedSignature = crypto.createHmac("sha512", secretKey).update(JSON.stringify(payload)).digest("hex");

        return computedSignature === signature;
    } catch (error: any) {
        console.error("Error verifying Monnify signature:", error.message);
        return false;
    }
};

const handleSuccessfulTransaction = async (payload: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: payload?.customer?.email,
            },
        });

        if (!user) {
            return;
        }

        if (payload?.currency === "NGN") {
            await prisma.wallet.update({
                where: {
                    userId: user.id,
                },
                data: {
                    balance: {
                        increment: payload?.amountPaid,
                    },
                    totalBalance: {
                        increment: payload?.totalPayable,
                    },
                },
            });

            await prisma.transactions.create({
                data: {
                    amount: payload?.amountPaid,
                    currency: payload?.currency,
                    reference: payload?.transactionReference,
                    receiverId: user.id,
                    description: "Your account has been credited",
                    status: "SUCCESSFUL",
                    type: "BALANCE",
                },
            });

            await prisma.notifications.create({
                data: {
                    title: "Transfer Received",
                    message: `You have received ${payload?.amountPaid} ${payload?.currency} from ${payload?.customer?.name} (${payload?.customer?.email})`,
                    userId: user.id,
                },
            });
        } else {
            return;
        }

        return;
    } catch (error: any) {
        console.log("Error updating database", error.message);
        return;
    }
};

const handleFailedTransaction = async (payload: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: payload?.customer?.email,
            },
        });

        if (!user) {
            return;
        }

        await prisma.transactions.create({
            data: {
                amount: payload?.amountPaid,
                currency: payload?.currency,
                reference: payload?.transactionReference,
                receiverId: user.id,
                description: "Your transaction failed",
                status: "FAILED",
                type: "BALANCE",
            },
        });

        await prisma.notifications.create({
            data: {
                title: "Transaction Failed",
                message: `Your transfer failed because of ${payload?.failureReason} from ${payload?.customer?.name} (${payload?.customer?.email}) and don't worry, your account hasen't been debited`,
                userId: user.id,
            },
        });

        return;
    } catch (error: any) {
        console.log("Error updating database", error.message);
        return;
    }
};

const handleRefundCompletion = async (payload: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: payload?.customer?.email,
            },
        });

        if (!user) {
            return;
        }

        await prisma.transactions.create({
            data: {
                amount: payload?.amountPaid,
                currency: payload?.currency,
                reference: payload?.transactionReference,
                receiverId: user.id,
                status: "SUCCESSFUL",
                type: "BALANCE",
            },
        });

        await prisma.notifications.create({
            data: {
                title: "Refund Completed",
                message: `You have successfully refunded ${payload?.amountPaid} ${payload?.currency} to ${payload?.customer?.name} (${payload?.customer?.email})`,
                userId: user.id,
            },
        });

        return;
    } catch (error: any) {
        console.log("Error updating database", error.message);
        return;
    }
};

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const signature = req.headers.get("monnify-signature") as string;

        if (!signature) {
            return NextResponse.json({error: "Missing Monnify signature"}, {status: 401});
        }

        const isValid = verifyMonnifySignature(payload, signature, process.env.MONNIFY_SECRET_KEY!);

        if (!isValid) {
            return NextResponse.json({error: "Invalid Monnify signature"}, {status: 401});
        }

        console.log("Monnify webhook payload:", payload);

        switch (payload.eventType) {
            case "SUCCESSFUL_TRANSACTION":
                await handleSuccessfulTransaction(payload.eventData);
                break;
            case "FAILED_TRANSACTION":
                await handleFailedTransaction(payload.eventData);
                break;
            // case "REFUND_COMPLETION":
            //     await handleRefundCompletion(payload.eventData);
            //     break;
            default:
                console.log("Unhandled event type:", payload.eventType);
                break;
        }

        revalidatePath("/");
        return NextResponse.json({message: "Monnify webhook received successfully"}, {status: 200});
    } catch (error: any) {
        console.log("Error verifying webhook", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
