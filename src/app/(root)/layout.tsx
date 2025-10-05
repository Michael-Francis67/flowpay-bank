"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {useUserStore} from "@/stores/useUserStore";
import {useEffect, useState} from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // @ts-ignore
    const {checkAuth} = useUserStore();
    const [_, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getUser = async () => {
            await checkAuth();
            setLoading(false);
        };

        getUser();
    }, [checkAuth]);

    return (
        <main className="min-h-screen w-screen overflow-x-hidden lg:flex">
            <div className="flex">
                <div className="lg:w-[300px] hidden lg:flex h-full">
                    <Sidebar />
                </div>
                <div className="lg:hidden w-full bg-gray-200 shadow-lg backdrop-blur-md">
                    <Navbar />
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-6 p-6">{children}</div>
        </main>
    );
}
