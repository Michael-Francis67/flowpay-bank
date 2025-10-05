"use client";

import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Pagination from "./Pagination";
import {cn} from "@/lib/utils";
import {useUserStore} from "@/stores/useUserStore";

const getRowClass = (type: string) => {
    switch (type) {
        case "Income":
            return "bg-green-600 text-white hover:bg-gray-700 transition duration-200 cursor-pointer";
        case "Balance":
            return "bg-blue-600 text-white hover:bg-gray-700 transition duration-200 cursor-pointer";
        case "Expense":
            return "bg-red-600 text-white hover:bg-gray-700 transition duration-200 cursor-pointer";
        default:
            return "";
    }
};

export default function TransactionTable() {
    // @ts-ignore
    const {user} = useUserStore();
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(user?.transactions?.length / rowsPerPage);

    const startIndex = (page - 1) * rowsPerPage;
    const paginatedData = user?.transactions.slice(startIndex, startIndex + rowsPerPage) || [];

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableCaption>A list of your transactions.</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Reference</TableHead>
                        <TableHead>Receiver's Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedData?.length > 0 ? (
                        paginatedData.map((tx: any) => (
                            <TableRow key={tx.id} className={getRowClass(tx.type)}>
                                <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{tx.reference}</TableCell>
                                <TableCell>{`${user?.firstName} ${user?.lastName}`}</TableCell>
                                <TableCell>{tx.description}</TableCell>
                                <TableCell className="font-bold whitespace-nowrap">{tx.amount}</TableCell>
                                <TableCell>
                                    <div
                                        className={cn(
                                            "py-2 px-4 text-white w-fit rounded-full",
                                            tx.status === "SUCCESSFUL"
                                                ? "bg-green-700"
                                                : tx.status === "Pending"
                                                ? "bg-yellow-700"
                                                : "bg-red-700"
                                        )}
                                    >
                                        {tx.status}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No transactions found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div>
                {paginatedData?.length > 0 && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
            </div>
        </div>
    );
}
