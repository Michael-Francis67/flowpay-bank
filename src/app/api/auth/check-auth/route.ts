export const dynamic = "force-dynamic";

import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({message: "Unauthorized Access - Token not found"}, {status: 401});
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);

        if (!decodedToken) {
            return NextResponse.json({message: "Unauthorized Access - Invalid token"}, {status: 401});
        }

        const user = await prisma.user.findUnique({
            where: {
                // @ts-ignore
                id: decodedToken.id,
            },
            include: {
                wallet: true,
                transactions: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                notifications: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
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
                    governmentIdNumber: undefined,
                },
            },
            {status: 200}
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
}
