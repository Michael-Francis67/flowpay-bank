import React from "react";
import {Button} from "./ui/button";
import {ArrowLeft} from "lucide-react";

const Pagination = ({
    page,
    totalPages,
    setPage,
}: {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                <ArrowLeft size={16} />
            </Button>

            {Array.from({length: totalPages}, (_, i) => (
                <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}

            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                <ArrowLeft size={16} className="rotate-180" />
            </Button>
        </div>
    );
};

export default Pagination;
