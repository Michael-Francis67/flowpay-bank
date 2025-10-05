import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {NextResponse, NextRequest} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({message: "Unauthorized Access - Token not found"}, {status: 401});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

        if (!decodedToken) {
            return NextResponse.json({message: "Unauthorized Access - Invalid token"}, {status: 401});
        }

        const user = await prisma.user.findUnique({
            where: {
                // @ts-ignore
                id: decodedToken.id,
            },
        });

        if (!user) {
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }

        cookies().delete("token");

        return NextResponse.json({message: "Logout successful"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
