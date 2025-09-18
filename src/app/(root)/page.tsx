import AccountDetailsCard from "@/components/AccountDetailsCard";
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import React from "react";

const Home = () => {
    return (
        <main>
            <HeaderBox
                type="greeting"
                title="Welcome"
                subtext="Access and manage your accounts efficiently."
                user={{name: "Michael Jackson", email: "michaeljackson@gmail.com"}}
            />

            <AccountDetailsCard income={1000} expense={200} balance={500} />

            <div className="mt-4 overflow-auto w-full">
                <RecentTransactions title="Recent Transactions" />
            </div>
        </main>
    );
};

export default Home;
