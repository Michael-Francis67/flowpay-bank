"use client";

import Link from "next/link";
import React from "react";
import RecentTransactionsTable from "./RecentTransactionsTable";
import {usePathname} from "next/navigation";
import {Plus} from "lucide-react";
import {Button} from "./ui/button";

const RecentTransactions = ({title}: {title: string}) => {
    const pathname = usePathname();
    return (
        <section className="w-full h-full mb-6">
            <div className="flex flex-col gap-4 px-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold">{title}</h1>
                    {pathname === "/transactions" ? (
                        <Button className="flex items-center gap-2 p-2 rounded-lg">
                            <Plus size={20} />
                            <Link href="/transfer" className="text-white font-medium text-sm">
                                New Transaction
                            </Link>
                        </Button>
                    ) : (
                        <Link href="/transactions" className="text-blue-500 font-medium text-sm">
                            View All
                        </Link>
                    )}
                </div>

                <div>
                    <RecentTransactionsTable />
                </div>
            </div>
        </section>
    );
};

export default RecentTransactions;
