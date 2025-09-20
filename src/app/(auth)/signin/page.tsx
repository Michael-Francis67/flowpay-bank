"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {FormFieldRenderer} from "@/components/CustomFormField";
import {useState} from "react";

const SignInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string(),
});

type SignInFormValues = z.infer<typeof SignInSchema>;

const SignInFields = [
    {name: "email", label: "Email", type: "email", placeholder: "john@example.com"},
    {name: "password", label: "Password", type: "password", placeholder: "********"},
];

function SignInForm() {
    const [loading, setLoading] = useState(false);

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {email: "", password: ""},
    });

    const onSubmit = async (data: SignInFormValues) => {
        setLoading(true);
        console.log("SignIn Data:", data);
        await new Promise((res) => setTimeout(res, 2000));
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {SignInFields.map((field) => (
                            // @ts-ignore
                            <FormFieldRenderer key={field.name} field={field} control={form.control} />
                        ))}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default SignInForm;
