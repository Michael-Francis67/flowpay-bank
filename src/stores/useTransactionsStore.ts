import {create} from "zustand";
import {axiosInstance} from "@/lib/axios";
import {TransferFormValues} from "@/app/(root)/transfer/page";

export const useTransactionsStore = create((set) => ({
    transactions: null,
    isLoading: false,
    error: null,

    transfer: async ({
        amount,
        recipientAccount,
        narration,
        pin,
    }: {
        amount: string;
        recipientAccount: string;
        narration: string;
        pin: string;
    }) => {
        set({isLoading: true});
        try {
            const response = await axiosInstance.post("/monnify/make-transfer", {
                amount,
                recipientAccount,
                narration,
                pin,
            });
            set({transactions: response.data});
        } catch (error: any) {
            set({error: error.response.data.error});
        } finally {
            set({isLoading: false});
        }
    },
}));
