import {User} from "@/types/user.types";
import {LogOut} from "lucide-react";
import React from "react";

const Footer = ({user}: {user: User}) => {
    return (
        <section className="w-full h-[10%] flex justify-center items-center">
            <div className="flex justify-center items-center gap-2 cursor-pointer">
                <div className="p-2 text-white rounded-full bg-blue-500 flex justify-center items-center">
                    <h1 className="font-bold font-sans">{user.name[0] + user.name.split(" ")[1][0]}</h1>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-sm text-gray-600">{user.name}</h1>
                    <h1 className="text-sm text-gray-400">{user.email}</h1>
                </div>

                <div className="cursor-pointer flex items-center justify-center">
                    <LogOut size={20} />
                </div>
            </div>
        </section>
    );
};

export default Footer;
