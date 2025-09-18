import AccountDetailsCard from "@/components/AccountDetailsCard";
import HeaderBox from "@/components/HeaderBox";
import Link from "next/link";
import React from "react";

const Deposit = () => {
    return (
        <main className="w-full h-full">
            <section className="w-full h-full flex flex-col gap-1">
                <div>
                    <HeaderBox
                        type="title"
                        title="Fund Your Account"
                        subtext="Please follow the procedures below to fund your account."
                    />
                </div>

                <div>
                    <AccountDetailsCard income={1000} expense={200} balance={500} />
                </div>

                <div className="flex flex-col gap-2 mt-6">
                    <h1 className="text-xl font-bold text-gray-600">Instructions:</h1>
                    <ul className="list-disc list-inside">
                        <li>Copy your account number above.</li>
                        <li>
                            Use your bank ussd or app to make a deposit or visit the nearest bank to make a deposit.
                        </li>
                        <li>Ensure to include your account number when making a deposit.</li>
                        <li>
                            Then return back to <Link href="/">FlowPay</Link> to see your balance.
                        </li>
                        <li>And that's it!, you have successfully funded your account.</li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default Deposit;
