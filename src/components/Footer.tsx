"use client";

import {useUserStore} from "@/stores/useUserStore";
import {LogOut} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

const Footer = () => {
    // @ts-ignore
    const {user, logout} = useUserStore();
    const router = useRouter();

    const name = user?.firstName + " " + user?.lastName;

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await logout();
        router.push("/signin");
    };

    return (
        <section className="w-full h-[10%] flex justify-center items-center">
            <div className="flex justify-center items-center gap-2 cursor-pointer">
                <div className="p-2 text-white rounded-full bg-blue-500 flex justify-center items-center">
                    <h1 className="font-bold font-sans">{name[0] + name.split(" ")[1][0]}</h1>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-sm text-gray-600">{name}</h1>
                    <h1 className="text-sm text-gray-400">{user?.email}</h1>
                </div>

                <div className="cursor-pointer flex items-center justify-center">
                    <LogOut size={20} onClick={handleLogout} />
                </div>
            </div>
        </section>
    );
};

export default Footer;
