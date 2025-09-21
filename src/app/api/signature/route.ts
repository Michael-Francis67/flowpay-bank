import {NextResponse} from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST() {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);

        const signature = cloudinary.utils.api_sign_request({timestamp}, process.env.CLOUDINARY_SECRET_KEY as string);

        return NextResponse.json({
            timestamp,
            signature,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
