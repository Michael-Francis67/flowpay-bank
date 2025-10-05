"use client";

import {AccountDetailsCardProps} from "@/types/user.types";
import React, {useEffect, useState} from "react";
import CountUpCard from "./CountUp";
import DoughnutChart from "./DoughnutChart";
import CopyAccountNo from "./CopyAccountNo";
import {useUserStore} from "@/stores/useUserStore";

const AccountDetailsCard = () => {
    // @ts-ignore
    const {user} = useUserStore();

    const data = [
        {label: "income", value: user?.wallet?.totalBalance, color: "text-green-600"},
        {label: "balance", value: user?.wallet?.balance, color: "text-blue-600"},
        {label: "expense", value: user?.wallet?.totalBalance - user?.wallet?.balance, color: "text-red-600"},
    ];

    return (
        <section className="w-full flex md:items-center max-lg:items-start justify-between mt-6 gap-1 bg-gray-300 py-4 pr-8 rounded-xl flex-col md:flex-row">
            <div className="h-30 -ml-2 flex justify-between items-center gap-2">
                <DoughnutChart />
                <div className="flex flex-col justify-start items-center gap-2">
                    {data.map((item) => (
                        <CountUpCard key={item.label} label={item.label} value={item.value} color={item.color} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full md:gap-8 bg-gray-600 ml-4 p-4 rounded-xl text-white">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                        <h1 className="whitespace-nowrap text-sm">Account No.:</h1>
                        <p>{user?.accountNumber}</p>
                        <CopyAccountNo accountNumber={user?.accountNumber} />
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
            </div>
        </section>
    );
};

export default AccountDetailsCard;
