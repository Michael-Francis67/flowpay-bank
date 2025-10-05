"use client";

import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {useUserStore} from "@/stores/useUserStore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
    // @ts-ignore
    const {user} = useUserStore();

    const dataValues = [
        {
            label: "Income",
            value: user?.wallet?.totalBalance || 0,
            color: "#4ade80",
        },
        {
            label: "Expense",
            value:
                user?.wallet?.totalBalance > user?.wallet?.balance
                    ? user?.wallet?.totalBalance - user?.wallet?.balance
                    : user?.wallet?.balance - user?.wallet?.totalBalance || 0,
            color: "#ef4444",
        },
        {
            label: "Balance",
            value: user?.wallet?.balance || 0,
            color: "#3b82f6",
        },
    ];

    const values = dataValues.map((item) => {
        return item.value;
    });

    const data = {
        labels: ["Income", "Expense", "Balance"],
        datasets: [
            {
                label: "Amount",
                data: [...values],
                backgroundColor: [
                    "rgba(34, 197, 94, 0.6)", // green
                    "rgba(239, 68, 68, 0.6)", // red
                    "rgba(59, 130, 246, 0.6)", // blue
                ],
                borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)", "rgba(59, 130, 246, 1)"],
                borderWidth: 2,
                cutout: "70%", // 👈 make the middle hollow (doughnut hole size)
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // 👈 allow filling parent container
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="-mx-14 md:-mx-10 h-full">
            {" "}
            {/* 👈 container controls chart size */}
            <Doughnut data={data} options={options} />
        </div>
    );
}
