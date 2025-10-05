"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {FormFieldRenderer} from "@/components/CustomFormField";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/stores/useUserStore";
import Link from "next/link";
import {revalidatePath} from "next/cache";
import {revalidateHome} from "@/actions/revalidateHome";

const signupSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(8, "Phone number is too short"),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[\W_]/, "Must contain a special character"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const signupFields = [
    {name: "firstName", label: "First Name", type: "text", placeholder: "John"},
    {name: "lastName", label: "Last Name", type: "text", placeholder: "Doe"},
    {name: "email", label: "Email", type: "email", placeholder: "john@example.com"},
    {name: "phone", label: "Phone Number", type: "phone"},
    {name: "password", label: "Password", type: "password", placeholder: "********"},
];

function SignupForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {firstName: "", lastName: "", email: "", phone: "", password: ""},
    });
    // @ts-ignore
    const {signUp, error} = useUserStore();

    const onSubmit = async (data: SignupFormValues) => {
        try {
            setLoading(true);
            console.log("Signup Data:", data);

            const user = await signUp(data);

            console.log(user);
            setLoading(false);

            if (user) {
                await revalidateHome("/");
                router.push(`/signup/${user?.user?.id}`);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
            form.reset();
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full p-6">
                <h1 className="text-2xl font-bold mb-8 uppercase text-center">Sign Up</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            {signupFields.slice(0, 2).map((field) => (
                                // @ts-ignore
                                <FormFieldRenderer key={field.name} field={field} control={form.control} />
                            ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {signupFields.slice(2, 4).map((field) => (
                                // @ts-ignore
                                <FormFieldRenderer key={field.name} field={field} control={form.control} />
                            ))}
                        </div>
                        {
                            // @ts-ignore
                            <FormFieldRenderer field={signupFields[4]} control={form.control} />
                        }

                        <p className="text-sm text-red-600 text-center mt-4 mb-2">{error}</p>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Loading..." : "Sign Up"}
                        </Button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-blue-500">
                            Sign In
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default SignupForm;
