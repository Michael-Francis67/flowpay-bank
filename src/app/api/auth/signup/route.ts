import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import {getMonnifyAccessToken} from "@/helpers/getMonnifyAccessToken";
import {createVirtualAccount} from "@/helpers/createVirtualAccount";
import {formatPhoneNumber} from "@/lib/formatPhoneNumber";
import {generateToken} from "@/lib/generateToken";

export async function POST(req: NextRequest) {
    try {
        const {firstName, lastName, email, phone, password} = await req.json();

        if (!firstName || !lastName || !email || !phone || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExists) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        const accessToken = await getMonnifyAccessToken();

        if (!accessToken) {
            return NextResponse.json({error: "Monnify access token not found"}, {status: 500});
        }

        const resultBody = await createVirtualAccount({firstName, lastName, email}, accessToken);

        if (!resultBody) {
            return NextResponse.json({error: "Failed to create virtual account"}, {status: 500});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const fomattedPhone = formatPhoneNumber(phone);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNumber: fomattedPhone,
                password: hashedPassword,
                accountName: resultBody.accountName,
                accountNumber: resultBody?.accounts[0]?.accountNumber,
                bankName: resultBody?.accounts[0]?.bankName,
                bankCode: resultBody?.accounts[0]?.bankCode,
                accountReference: resultBody.accountReference,
            },
        });

        await prisma.wallet.create({
            data: {
                userId: newUser.id,
            },
        });

        await prisma.notifications.create({
            data: {
                userId: newUser.id,
                title: "Welcome to FlowPay",
                message: "Your account has been created successfully and you can make your first transfer now.",
            },
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: {
                    ...newUser,
                    password: undefined,
                    bankCode: undefined,
                },
            },
            {status: 201}
        );
    } catch (error) {
        console.log("Error in signup route:", error);
        return null;
    }
}
