export interface User {
    name: string;
    email: string;
}

export interface HeaderBoxProps {
    type?: string;
    user?: User;
    subtext: string;
    title: string;
}

export interface AccountDetailsCardProps {
    income: number;
    balance: number;
    expense: number;
}

export interface CardProps {
    label: string;
    value: number;
    color: string;
}

export interface DoughnutChartProps {
    dataValues: CardProps[];
}
