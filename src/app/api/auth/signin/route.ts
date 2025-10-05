import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import {generateToken} from "@/lib/generateToken";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    try {
        const {email, password} = await req.json();

        if (!email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return NextResponse.json({error: "Invalid credentials"}, {status: 404});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({error: "Invalid credentials"}, {status: 401});
        }

        const token = generateToken(user.id);

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

        return NextResponse.json({message: "Sign in successful"}, {status: 200});
    } catch (error: any) {
        console.log("Error in sign in route:", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
};
