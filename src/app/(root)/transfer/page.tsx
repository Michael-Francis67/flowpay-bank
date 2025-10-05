"use client";

import React from "react";
import HeaderBox from "@/components/HeaderBox";
import AccountDetailsCard from "@/components/AccountDetailsCard";
import z from "zod";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormFieldRenderer} from "@/components/CustomFormField";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {useTransactionsStore} from "@/stores/useTransactionsStore";
import {useRouter} from "next/navigation";
import {revalidateHome} from "@/actions/revalidateHome";

const transferSchema = z.object({
    accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 characters")
    .max(10, "Account number must not exceed 10 characters"),
    amount: z
    .string()
    .min(2, "Amount must be at least 2 characters")
    .max(1000000, "Amount must not exceed 1000000 characters"),
    description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(100, "Description must not exceed 100 characters"),
    pin: z.string().min(4, "Pin must be at least 4 characters").max(4, "Pin must not exceed 4 characters"),
});

export type TransferFormValues = z.infer<typeof transferSchema>;

const transferFields = [
    {
        label: "Account Number",
        name: "accountNumber",
        type: "text",
        placeholder: "Enter account number",
    },
    {
        label: "Amount",
        name: "amount",
        type: "text",
        placeholder: "Enter amount",
    },
    {
        label: "Description",
        name: "description",
        type: "textarea",
        placeholder: "Enter description",
    },
    {
        label: "Pin",
        name: "pin",
        type: "password",
        placeholder: "Enter your account pin",
    },
];

const Transfer = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();
    const form = useForm<TransferFormValues>({
        resolver: zodResolver(transferSchema),
        defaultValues: {
            accountNumber: "",
            amount: "",
            description: "",
            pin: "",
        },
    });
    // @ts-ignore
    const {transfer} = useTransactionsStore();

    const onSubmit = async (data: TransferFormValues) => {
        setLoading(true);
        try {
            console.log("Transfer Data:", data);
            await transfer({
                amount: data.amount,
                recipientAccount: data.accountNumber,
                narration: data.description,
                pin: data.pin,
            });

            await revalidateHome("/");
            router.push("/");
        } catch (error: any) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
            form.reset();
        }
    };

    return (
        <div className="flex flex-col flex-1">
            <div>
                <HeaderBox
                    type="title"
                    title="Transfer"
                    subtext="Transfer funds to another accounts easily from here."
                />
            </div>

            <div>
                <AccountDetailsCard />
            </div>

            <div className="w-full flex flex-col justify-between items-center gap-4 mt-6">
                <Form {...form}>
                    <h2 className="text-2xl font-bold text-center">Transfer Funds</h2>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            {transferFields.slice(0, 2).map((field) => (
                                // @ts-ignore
                                <FormFieldRenderer key={field.name} field={field} control={form.control} />
                            ))}
                        </div>

                        <div className="w-full">
                            {transferFields.slice(2, 4).map((field) => (
                                // @ts-ignore
                                <FormFieldRenderer key={field.name} field={field} control={form.control} />
                            ))}
                        </div>

                        <p
                            className={
                                error ? "text-sm text-red-600 text-center mt-4 mb-2 transition-all duration-300" : ""
                            }
                        >
                            {error}
                        </p>
                        <Button type="submit" className="w-full bg-blue-500" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Loading..." : "Transfer Funds"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Transfer;
