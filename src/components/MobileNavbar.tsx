"use client";

import React, {useEffect, useState} from "react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import Footer from "./Footer";
import {navLinks} from "@/constants";
import Image from "next/image";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {checkAuth} from "@/actions/user.actions";

const MobileNavbar = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await checkAuth();
            console.log(user.user);
            setCurrentUser(user.user);
        };

        fetchUser();
    }, []);

    const user = {
        name: currentUser?.firstName + " " + currentUser?.lastName,
        email: currentUser?.email,
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent onClick={() => setOpen(false)}>
                <section className="h-full w-full flex flex-col space-y-4 md:mb-0">
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
                        <ul className="space-y-4 mt-6 w-full flex flex-col justify-start items-center h-full">
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
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavbar;
