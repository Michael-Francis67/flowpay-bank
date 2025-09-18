"use client";

import {AccountDetailsCardProps} from "@/types/user.types";
import React, {useEffect, useState} from "react";
import CountUpCard from "./CountUp";
import DoughnutChart from "./DoughnutChart";
import {Check, Copy} from "lucide-react";
import CopyAccountNo from "./CopyAccountNo";
import {data} from "@/constants";

const AccountDetailsCard = ({income, balance, expense}: AccountDetailsCardProps) => {
    const [accNo, setAccNo] = useState("");

    useEffect(() => {
        setAccNo("1234567890");
    }, [accNo]);

    return (
        <section className="w-full flex items-center justify-start mt-6 gap-2 bg-gray-300 py-4 rounded-xl">
            <div className="h-30">
                <DoughnutChart dataValues={data} />
            </div>

            <div className="flex flex-col justify-start items-center gap-2">
                {data.map((item) => (
                    <CountUpCard key={item.label} label={item.label} value={item.value} color={item.color} />
                ))}
                <div className="flex items-center gap-2">
                    <h1>Account No.&nbsp;:</h1>
                    <p>{accNo}</p>
                    <CopyAccountNo accountNumber={accNo} />
                </div>
            </div>
        </section>
    );
};

export default AccountDetailsCard;
