import z from "zod";

export async function signUp(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}) {
    try {
        const request = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const kycSchema = z.object({
    selfie: z.instanceof(File).optional(),
    // @ts-ignore
    dob: z.date({required_error: "Date of birth is required"}).refine(
        (date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            return age >= 18;
        },
        {message: "You must be at least 18 years old"}
    ),
    address: z.string().min(5, "Address must be at least 5 characters"),
    idNumber: z.string().min(6, "ID Number must be at least 6 characters"),
    // @ts-ignore
    idType: z.enum(["NIN", "BVN", "Passport", "Driver’s License"], {
        errorMap: () => ({message: "Please select a valid ID type"}),
    }),
});

type KycFormValues = z.infer<typeof kycSchema>;

export async function kyc(data: KycFormValues, id: string) {
    try {
        const file = data.selfie;

        if (!file) {
            console.log("No file selected");
            return;
        }

        const res = await fetch("/api/signature", {method: "POST"});

        const {timestamp, signature, cloudName, apiKey} = await res.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const result = await uploadRes.json();

        console.log("Image uploaded successfully:", result);

        const request = await fetch(`/api/auth/signup/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...data, selfie: result.secure_url, publicId: result.public_id}),
        });

        if (!request.ok) {
            throw new Error("Failed to submit KYC");
        }

        const response = await request.json();

        console.log("KYC submitted successfully", response);

        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function createPin(data: {pin: string; confirmPin: string}, id: string) {
    try {
        const request = await fetch(`/api/auth/signup/createpin/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function checkAuth() {
    try {
        const res = await fetch(`${baseUrl}/api/auth/check-auth`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await res.json();
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function signIn(data: {email: string; password: string}) {
    try {
    } catch (error) {}
}
