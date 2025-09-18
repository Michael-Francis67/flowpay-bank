import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import React from "react";

const Transactions = () => {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col gap-4">
                <HeaderBox
                    type="title"
                    title="Transactions History"
                    subtext="View all your past and recent financial activities in one place."
                />

                <div>
                    <RecentTransactions title="Transactions" />
                </div>
            </div>
        </main>
    );
};

export default Transactions;
