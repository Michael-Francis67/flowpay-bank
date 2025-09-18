import {Home, CreditCard, ArrowLeftRight, BanknoteArrowDown, Bell, ArrowDownCircle} from "lucide-react";
import {LucideIcon} from "lucide-react"; // type helper

type NavLink = {
    name: string;
    icon: LucideIcon; // icon component type
    route: string;
};

export const navLinks: NavLink[] = [
    {name: "Dashboard", icon: Home, route: "/"},
    {name: "Transactions", icon: CreditCard, route: "/transactions"},
    {name: "Transfer", icon: ArrowLeftRight, route: "/transfer"},
    {name: "Withdraw", icon: BanknoteArrowDown, route: "/withdraw"},
    {name: "Deposit", icon: ArrowDownCircle, route: "/deposit"},
    {name: "Notifications", icon: Bell, route: "/notifications"},
];

export const data = [
    {
        label: "income",
        value: 10000,
        color: "#4ade80",
    },
    {
        label: "expense",
        value: 5000,
        color: "#ef4444",
    },
    {
        label: "balance",
        value: 5000,
        color: "#3b82f6",
    },
];

export const transactions = [
    {
        id: 1,
        date: "2025-09-18",
        type: "Income",
        description: "Salary Payment",
        amount: "+₦150,000",
        status: "Successful",
    },
    {id: 2, date: "2025-09-17", type: "Balance", description: "Wallet Top-up", amount: "₦50,000", status: "Successful"},
    {
        id: 3,
        date: "2025-09-16",
        type: "Expense",
        description: "Electricity Bill",
        amount: "-₦20,000",
        status: "Successful",
    },
    {id: 4, date: "2025-09-15", type: "Expense", description: "Groceries", amount: "-₦35,000", status: "Successful"},
    {
        id: 5,
        date: "2025-09-14",
        type: "Income",
        description: "Freelance Project",
        amount: "+₦200,000",
        status: "Successful",
    },
    {id: 6, date: "2025-09-13", type: "Balance", description: "Bank Transfer", amount: "₦70,000", status: "Pending"},
    {
        id: 7,
        date: "2025-09-12",
        type: "Expense",
        description: "Airtime Recharge",
        amount: "-₦5,000",
        status: "Successful",
    },
    {
        id: 8,
        date: "2025-09-11",
        type: "Income",
        description: "Investment Return",
        amount: "+₦50,000",
        status: "Successful",
    },
    {
        id: 9,
        date: "2025-09-10",
        type: "Expense",
        description: "Data Subscription",
        amount: "-₦10,000",
        status: "Failed",
    },
    {id: 10, date: "2025-09-09", type: "Balance", description: "Card Funding", amount: "₦25,000", status: "Successful"},
];

export function formatAmount(amount: number) {
    return (
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        .formatToParts(0) // format a dummy value
        .find((part) => part.type === "currency")?.value || "₦"
    );
}
