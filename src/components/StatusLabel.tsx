type StatusLabelProps = {
    label: string | number;
};

export default function StatusLabel({label}: StatusLabelProps) {
    // map the colors based on label
    const colorMap: Record<StatusLabelProps["label"], string> = {
        income: "text-green-600",
        balance: "text-blue-600",
        expense: "text-red-600",
    };

    return <span className={`font-semibold capitalize ${colorMap[label]}`}>{label}:</span>;
}
