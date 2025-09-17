"use client";

import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
    const data = {
        labels: ["Income", "Expense", "Balance"],
        datasets: [
            {
                label: "Amount",
                data: [10000, 5000, 5000],
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
        <div className="-ml-10 -mr-10 h-full">
            {" "}
            {/* 👈 container controls chart size */}
            <Doughnut data={data} options={options} />
        </div>
    );
}
