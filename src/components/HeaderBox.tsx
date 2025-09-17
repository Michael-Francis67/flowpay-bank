import {HeaderBoxProps} from "@/types/user.types";
import React from "react";

const HeaderBox = ({type = "title", user, subtext, title}: HeaderBoxProps) => {
    return (
        <section className="w-full h-[10%] mb-4">
            <div className="flex items-start flex-col justify-start">
                {type === "greeting" && (
                    <div className="flex items-center justify-center mb-3">
                        <h1 className="text-xl font-bold text-gray-600">{title}</h1>&nbsp;
                        <h1 className="text-xl font-bold text-blue-600">{user?.name.split(" ")[0]}</h1>
                    </div>
                )}

                <div className="flex items-center justify-center">
                    <p className="text-sm text-gray-600">{subtext}</p>
                </div>
            </div>
        </section>
    );
};

export default HeaderBox;
