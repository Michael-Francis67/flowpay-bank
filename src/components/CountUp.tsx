"use client";

import CountUp from "react-countup";
import {CardProps} from "@/types/user.types";
import React from "react";
import {formatAmount} from "@/constants";
import StatusLabel from "./StatusLabel";

const CountUpCard = ({label, value, color}: CardProps) => {
    return (
        <div>
            <div className="flex items-center justify-center gap-1">
                <h1>
                    <StatusLabel label={label} />
                </h1>
                <h1 className={`text-xl font-bold ${color}`}>
                    <CountUp end={value} duration={2.75} prefix={formatAmount(value)} decimals={2} />
                </h1>
            </div>
        </div>
    );
};

export default CountUpCard;
