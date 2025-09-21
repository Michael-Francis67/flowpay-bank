"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {FormFieldRenderer} from "@/components/CustomFormField";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {kyc} from "@/actions/user.actions";

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

const kycFields = [
    {name: "selfie", label: "Selfie Upload", type: "file"},
    {name: "dob", label: "Date of Birth", type: "date", placeholder: "dd/mm/yyyy"},
    {name: "address", label: "Address", type: "text", placeholder: "123 Street, City"},
    {name: "idNumber", label: "Government-issued ID Number", type: "text", placeholder: "Enter ID number"},
    {name: "idType", label: "ID Type", type: "select", options: ["NIN", "BVN", "Passport", "Driver’s License"]},
];

function KycForm({params: {userId}}: {params: {userId: string}}) {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            setId(userId);
        }
    }, [userId]);

    const form = useForm<KycFormValues>({
        resolver: zodResolver(kycSchema),
        defaultValues: {selfie: undefined, dob: undefined, address: "", idNumber: "", idType: undefined},
    });

    const onSubmit = async (data: KycFormValues) => {
        try {
            setLoading(true);
            console.log("KYC Data:", data);

            const response = await kyc(data, id);

            router.push(`/createpin/${response?.user?.id}`);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full p-6">
                <h1 className="text-2xl font-bold mb-8 uppercase text-center">professional details</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                        {kycFields.map((field) => (
                            // @ts-ignore
                            <FormFieldRenderer key={field.name} field={field} control={form.control} />
                        ))}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Loading..." : "Submit KYC"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default KycForm;
