"use client";

import {AccountDetailsCardProps} from "@/types/user.types";
import React, {useEffect, useState} from "react";
import CountUpCard from "./CountUp";
import DoughnutChart from "./DoughnutChart";
import {Check, Copy} from "lucide-react";
import CopyAccountNo from "./CopyAccountNo";
import {data} from "@/constants";
import {checkAuth} from "@/actions/user.actions";

const AccountDetailsCard = ({income, balance, expense}: AccountDetailsCardProps) => {
    const [accNo, setAccNo] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await checkAuth();
            console.log(user.user);
            setUser(user.user);
            setAccNo(user.user?.accountNumber || "");
        };

        fetchUser();
    }, [accNo]);

    return (
        <section className="w-full flex items-center justify-start mt-6 gap-1 bg-gray-300 py-4 rounded-xl">
            <div className="h-30">
                <DoughnutChart dataValues={data} />
            </div>

            <div className="flex flex-col justify-start items-center gap-2">
                {data.map((item) => (
                    <CountUpCard key={item.label} label={item.label} value={item.value} color={item.color} />
                ))}
                <div className="flex items-center gap-1">
                    <h1 className="whitespace-nowrap text-sm">Account No.:</h1>
                    <p>{accNo}</p>
                    <CopyAccountNo accountNumber={accNo} />
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="whitespace-nowrap text-sm">Bank Name:</h1>
                    <p>{user?.bankName}</p>
                </div>
                <div className="flex items-center gap-3">
                    <h1 className="whitespace-nowrap text-sm">Account Name:</h1>
                    <p>{user?.accountName}</p>
                </div>
            </div>
        </section>
    );
};

export default AccountDetailsCard;
