import {create} from "zustand";
import {axiosInstance} from "@/lib/axios";
import {KycFormValues} from "@/app/(auth)/signup/[userId]/page";

export const useUserStore = create((set) => ({
    user: null,
    isLoading: false,
    isCheckingAuth: false,
    isLoggedIn: false,
    error: null,

    signUp: async (data: {email: string; password: string; firstName: string; lastName: string; phone: string}) => {
        set({isLoading: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({isLoading: false});
            return res.data;
        } catch (error: any) {
            console.log(error);
            set({error: error.response?.data?.error});
        } finally {
            set({isLoading: false});
        }
    },

    signIn: async (data: {email: string; password: string}) => {
        set({isLoading: true});
        try {
            const res = await axiosInstance.post("/auth/signin", data);
            set({user: res?.data?.user, isLoading: false, isLoggedIn: true});
            return res.data;
        } catch (error: any) {
            console.log(error);
            set({error: error.response?.data?.error});
        } finally {
            set({isLoading: false});
        }
    },

    kyc: async (data: KycFormValues, id: string) => {
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
                return;
            }

            const response = await request.json();

            console.log("KYC submitted successfully", response);

            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    checkAuth: async () => {
        set({isCheckingAuth: true});
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            console.log(res.data?.user);
            set({user: res.data?.user, isLoggedIn: true, isCheckingAuth: false});
        } catch (error) {
            console.log(error);
        } finally {
            set({isCheckingAuth: false});
        }
    },

    createPin: async (data: {pin: string; confirmPin: string}, id: string) => {
        try {
            const res = await axiosInstance.post(`/auth/signup/createpin/${id}`, data);
            set({user: res?.data?.user, isLoggedIn: true});
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({user: null, isLoggedIn: false});
        } catch (error: any) {
            console.log(error);
            set({error: error.response?.data?.error});
        } finally {
            set({user: null, isLoggedIn: false, isLoading: false});
        }
    },
}));
