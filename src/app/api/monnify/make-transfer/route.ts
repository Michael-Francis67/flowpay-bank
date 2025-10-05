import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getMonnifyAccessToken} from "@/helpers/getMonnifyAccessToken";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    try {
        const {amount, recipientAccount, narration, pin} = await req.json();
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({error: "Unauthorized Access - Token not found"}, {status: 401});
        }

        if (!amount || !recipientAccount || !narration || !pin) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        // @ts-ignore
        const id = String(decodedToken.id);

        const senderUser = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!senderUser) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const isPinValid = await bcrypt.compare(String(pin), senderUser.accountPin!);

        if (!isPinValid) {
            return NextResponse.json({error: "Incorrect pin"}, {status: 401});
        }

        console.log("User initiating transfer", senderUser);

        const user = await prisma.user.findUnique({
            where: {
                accountNumber: recipientAccount,
            },
        });

        console.log("Recipient user", user);

        if (!user) {
            return NextResponse.json({error: "Recipient user not found"}, {status: 404});
        }

        const senderWallet = await prisma.wallet.update({
            where: {
                userId: senderUser.id,
            },
            data: {
                balance: {
                    decrement: amount,
                },
            },
        });

        if (!senderWallet) {
            return NextResponse.json({error: "Sender not found"}, {status: 404});
        } else if (senderWallet.totalBalance < amount) {
            return NextResponse.json({error: "Insufficient balance"}, {status: 400});
        }

        const recipientWallet = await prisma.wallet.update({
            where: {
                userId: user.id,
            },
            data: {
                balance: {
                    increment: amount,
                },
            },
        });

        if (!recipientWallet) {
            return NextResponse.json({error: "Recipient not found"}, {status: 404});
        }

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        const accessToken = await getMonnifyAccessToken();

        if (!accessToken) {
            return NextResponse.json({error: "Monnify access token not found"}, {status: 500});
        }

        const response = await fetch(`${process.env.MONNIFY_BASE_URL}/api/v2/disbursements/single`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                amount,
                destinationAccountNumber: recipientAccount,
                destinationBankCode: user?.bankCode,
                narration,
                reference: user?.id + Date.now().toString() || Math.random().toString() + Date.now().toString(),
                currency: "NGN",
                sourceAccountNumber: process.env.MONNIFY_SOURCE_ACCOUNT_NUMBER,
            }),
        });

        const data = await response.json();

        if (data?.requestSuccessful) {
            await prisma.$transaction([
                prisma.transactions.create({
                    data: {
                        amount: Number(amount),
                        description: narration,
                        receiverId: senderUser?.id,
                        senderId: user.id,
                        reference: data?.responseBody?.reference || Math.random().toString() + Date.now().toString(),
                        status: "SUCCESSFUL",
                    },
                }),
                prisma.transactions.create({
                    data: {
                        amount: Number(amount),
                        description: narration,
                        receiverId: user?.id,
                        senderId: senderUser.id,
                        reference: data?.responseBody?.reference || Math.random().toString() + Date.now().toString(),
                        status: "SUCCESSFUL",
                    },
                }),
            ]);

            await prisma.$transaction([
                prisma.expenses.create({
                    data: {
                        amount: Number(amount),
                        walletId: senderWallet.id,
                    },
                }),
                prisma.expenses.create({
                    data: {
                        amount: Number(amount),
                        walletId: recipientWallet.id,
                    },
                }),
            ]);

            await prisma.$transaction([
                prisma.notifications.createMany({
                    data: [
                        {
                            userId: senderUser.id,
                            message: `You have successfully transferred ${amount} to ${user?.firstName} ${
                                user?.lastName
                            } at ${new Date().toLocaleString()}`,
                        },
                        {
                            userId: user?.id,
                            message: `You have successfully received ${amount} from ${senderUser.firstName} ${
                                senderUser.lastName
                            } at ${new Date().toLocaleString()}`,
                        },
                    ],
                }),
            ]);

            return NextResponse.json({message: "Transfer successful", data}, {status: 200});
        } else {
            await prisma.$transaction([
                prisma.transactions.create({
                    data: {
                        amount: Number(amount),
                        description: narration,
                        receiverId: user?.id,
                        senderId: senderUser.id,
                        reference: data?.responseBody?.reference || Math.random().toString() + Date.now().toString(),
                        status: "FAILED",
                    },
                }),
                prisma.transactions.create({
                    data: {
                        amount: Number(amount),
                        description: narration,
                        receiverId: user?.id,
                        senderId: senderUser.id,
                        reference: data?.responseBody?.reference || Math.random().toString() + Date.now().toString(),
                        status: "FAILED",
                    },
                }),
            ]);
        }
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        console.log("Error initiating transfer:", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
};
