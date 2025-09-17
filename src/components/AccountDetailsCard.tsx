import {AccountDetailsCardProps} from "@/types/user.types";
import React from "react";
import CountUpCard from "./CountUp";
import DoughnutChart from "./DoughnutChart";

const AccountDetailsCard = ({income, balance, expense}: AccountDetailsCardProps) => {
    const data = [
        {
            label: "income",
            value: 10000,
            color: "#4ade80",
        },
        {
            label: "expense",
            value: 5000,
            color: "#ef4444",
        },
        {
            label: "balance",
            value: 5000,
            color: "#3b82f6",
        },
    ];

    return (
        <section className="w-full flex items-center justify-start mt-6 gap-2 bg-gray-300 py-4 rounded-xl">
            <div className="h-30">
                <DoughnutChart />
            </div>

            <div className="flex flex-col justify-start items-center gap-2">
                {data.map((item) => (
                    <CountUpCard key={item.label} label={item.label} value={item.value} color={item.color} />
                ))}
            </div>
        </section>
    );
};

export default AccountDetailsCard;
