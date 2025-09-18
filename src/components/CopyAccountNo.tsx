"use client";

import {Check, Copy} from "lucide-react";
import React from "react";

const CopyAccountNo = ({accountNumber}: {accountNumber: string}) => {
    const [clicked, setClicked] = React.useState(false);

    const handleClicked = () => {
        navigator.clipboard.writeText(accountNumber);
        setClicked(true);
    };

    return (
        <div>
            {clicked ? (
                <div>
                    <Check size={20} />
                </div>
            ) : (
                <div className="cursor-pointer">
                    <Copy size={20} onClick={handleClicked} />
                </div>
            )}
        </div>
    );
};

export default CopyAccountNo;
