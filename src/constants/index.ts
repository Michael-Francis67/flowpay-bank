import {Home, CreditCard, ArrowLeftRight, BanknoteArrowDown, Bell} from "lucide-react";
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
    {name: "Notifications", icon: Bell, route: "/notifications"},
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
