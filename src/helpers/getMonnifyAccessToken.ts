"use server";

export const getMonnifyAccessToken = async () => {
    try {
        const string = Buffer.from(`${process.env.MONNIFY_API_KEY!}:${process.env.MONNIFY_SECRET_KEY!}`).toString(
            "base64"
        );

        const response = await fetch(`${process.env.MONNIFY_BASE_URL!}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${string}`,
            },
        });

        const data = await response.json();
        return data?.responseBody?.accessToken;
    } catch (error) {
        console.log(error);
        throw error;
        return null;
    }
};
