"use client";

import {checkAuth} from "@/actions/user.actions";
import AccountDetailsCard from "@/components/AccountDetailsCard";
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import {redirect} from "next/navigation";
import React, {useEffect, useState} from "react";

const Home = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await checkAuth();
            console.log(user.user);
            setUser(user.user);
        };

        fetchUser();
    }, []);

    console.log(user?.user || "No user found");

    return (
        <main>
            <HeaderBox
                type="greeting"
                title="Welcome"
                subtext="Access and manage your accounts efficiently."
                user={{name: `${user?.firstName} ${user?.lastName}`, email: user?.email}}
            />

            <AccountDetailsCard income={1000} expense={200} balance={500} />

            <div className="mt-4 overflow-auto w-full">
                <RecentTransactions title="Recent Transactions" />
            </div>
        </main>
    );
};

export default Home;
