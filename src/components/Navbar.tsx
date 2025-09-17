import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
    return (
        <div className="h-16 max-w-7xl px-4 py-2">
            <div className="flex justify-between items-center h-full w-full">
                <div className="flex justify-center items-center gap-1">
                    <Link href={"/"} className="flex items-center gap-1">
                        <Image
                            src="/home-logo.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className="object-cover bg-blue-500 rounded-full"
                        />
                        <h1 className="text-2xl font-sans font-bold">FlowPay</h1>
                    </Link>
                </div>

                <div>
                    <MobileNavbar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
