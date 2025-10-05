"use client";

import {FormFieldRenderer} from "@/components/CustomFormField";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {useUserStore} from "@/stores/useUserStore";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import z from "zod";

const signupSchema = z
.object({
    pin: z.string().min(4, "Your pin must be up to 4 numbers").max(4, "Your pin must not exceed four numbers"),
    confirmPin: z.string(),
})
.refine((data) => data.pin === data.confirmPin, {
    message: "Pins do not match",
    path: ["confirmPin"], // attach error to this field
});

type SignupFormValues = z.infer<typeof signupSchema>;

const CreatePinFields = [
    {name: "pin", label: "Pin", type: "number", placeholder: "Create your pin", min: 0},
    {name: "confirmPin", label: "Confirm Pin", type: "number", placeholder: "Re-enter your pin", min: 0},
];

const CreatePin = ({params: {userId}}: {params: {userId: string}}) => {
    const [id, setId] = useState(userId);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {pin: "", confirmPin: ""},
    });
    // @ts-ignore
    const {createPin} = useUserStore();

    useEffect(() => {
        if (userId) {
            setId(userId);
        }
    }, [userId]);

    const onSubmit = async (data: SignupFormValues) => {
        try {
            setLoading(true);
            console.log("Create pin Data:", data);

            const response = await createPin(data, id);

            console.log(response);

            setLoading(false);
            router.push("/");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full p-6">
                <h1 className="text-2xl font-bold mb-8 uppercase text-center">Create Pin</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {CreatePinFields.map((fields) => (
                            // @ts-ignore
                            <FormFieldRenderer key={fields.name} field={fields} control={form.control} />
                        ))}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Loading..." : "Create Pin"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreatePin;
