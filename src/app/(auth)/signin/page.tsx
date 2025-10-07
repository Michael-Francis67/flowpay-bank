"use client";

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {FormFieldRenderer} from "@/components/CustomFormField";
import {useState} from "react";
import {useUserStore} from "@/stores/useUserStore";
import {useRouter} from "next/navigation";
import Link from "next/link";

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
    const router = useRouter();
    // @ts-ignore
    const {signIn, error} = useUserStore();

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {email: "", password: ""},
    });

    const onSubmit = async (data: SignInFormValues) => {
        setLoading(true);
        try {
            const res = await signIn(data);

            router.push("/");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
            form.reset();
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full p-6">
                <h1 className="text-2xl font-bold mb-8 uppercase text-center">Sign In</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {SignInFields.map((field) => (
                            // @ts-ignore
                            <FormFieldRenderer key={field.name} field={field} control={form.control} />
                        ))}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember" name="remember" type="checkbox" className="h-4 w-4" />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link
                                    href="/forgot-password"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <p className="text-sm text-red-600 text-center mt-4 mb-2">{error}</p>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Loading..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-sm text-center mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-blue-500">
                            Sign Up
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default SignInForm;
