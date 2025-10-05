import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request, {params}: {params: {userId: string}}) {
    try {
        const {userId} = params;
        const {dob, address, idNumber, idType, selfie, publicId} = await req.json();

        if (!userId || !dob || !address || !idNumber || !idType || !selfie || !publicId) {
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedId = await bcrypt.hash(idNumber, salt);

        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                dob,
                address,
                profilePic: selfie,
                publicId,
                governmentIdNumber: hashedId,
                idType,
            },
        });

        if (!updatedUser) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        return NextResponse.json(
            {
                message: "User updated successfully",
                user: {
                    ...updatedUser,
                    password: undefined,
                    bankCode: undefined,
                },
            },
            {status: 200}
        );
    } catch (error) {
        console.log(error);
    }
}
