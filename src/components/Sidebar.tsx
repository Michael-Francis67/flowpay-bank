"use client";

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";
import {navLinks} from "@/constants";
import Footer from "./Footer";
import Image from "next/image";

const Sidebar = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    const user = {
        name: "Michael Jackson",
        email: "michaeljackson@gmail.com",
    };

    return (
        <section className="h-full sticky w-full hidden lg:flex lg:flex-col bg-gray-200 space-y-4">
            <div className="w-full h-[10%] flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <Image
                        src="/home-logo.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="object-cover bg-blue-500 rounded-full"
                    />
                    <h1 className="text-2xl font-sans font-bold">FlowPay</h1>
                </div>
            </div>
            <nav className="w-full items-center justify-center flex-1 px-4 h-[75%]">
                <ul className="space-y-6 mt-6 w-full flex flex-col justify-start items-center h-full">
                    {navLinks.map((link) => (
                        <li
                            key={link.name}
                            className={`flex items-center gap-6 ${
                                isActive(link.route) ? "bg-blue-500" : "hover:bg-gray-500 "
                            } w-full py-2 rounded-lg transition-all duration-300 px-4 hover:text-white ${
                                isActive(link.route) && "bg-blue-500 text-white"
                            }`}
                        >
                            <link.icon size={20} />
                            <Link href={link.route}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Footer user={user} />
        </section>
    );
};

export default Sidebar;
