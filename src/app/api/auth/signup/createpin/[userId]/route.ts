import {NextResponse, NextRequest} from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {generateToken} from "@/lib/generateToken";
import {cookies} from "next/headers";

export async function POST(req: NextRequest, {params}: {params: {userId: string}}) {
    try {
        const {userId} = params;
        const {pin, confirmPin} = await req.json();

        if (!userId || !pin || !confirmPin) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        if (pin !== confirmPin) {
            return NextResponse.json({error: "Pins do not match"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPin = await bcrypt.hash(pin, salt);

        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                accountPin: hashedPin,
            },
        });

        const token = generateToken(updatedUser.id);

        if (token) {
            cookies().set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        } else {
            return NextResponse.json({error: "Failed to generate token"}, {status: 500});
        }

        return NextResponse.json({
            message: "Pin created successfully",
            user: {
                ...updatedUser,
                password: undefined,
                bankCode: undefined,
                accountPin: undefined,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
