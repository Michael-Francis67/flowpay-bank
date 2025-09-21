import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        console.log(token);

        const user = await prisma.user.findUnique({
            where: {
                id: token,
            },
            include: {
                wallet: true,
                transactions: true,
            },
        });

        if (!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        return NextResponse.json(
            {
                message: "Authorized",
                user: {
                    ...user,
                    password: undefined,
                    bankCode: undefined,
                    accountPin: undefined,
                },
            },
            {status: 200}
        );
    } catch (error) {}
}
