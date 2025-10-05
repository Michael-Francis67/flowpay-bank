"use client";

import AccountDetailsCard from "@/components/AccountDetailsCard";
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import {useUserStore} from "@/stores/useUserStore";

const Home = () => {
    // @ts-ignore
    const {user} = useUserStore();

    return (
        <main>
            <HeaderBox
                type="greeting"
                title="Welcome"
                subtext="Access and manage your accounts efficiently."
                user={{name: `${user?.firstName} ${user?.lastName}`, email: user?.email}}
            />

            <AccountDetailsCard />

            <div className="mt-4 overflow-auto w-full">
                <RecentTransactions title="Recent Transactions" />
            </div>
        </main>
    );
};

export default Home;
