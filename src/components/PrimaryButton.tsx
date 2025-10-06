"use client";

import React from "react";

interface PrimaryButtonProps {
    onClick: () => void;
    label?: string;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onClick,
    label = "Explore More",
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-4 rounded-full bg-[#FFDC91] border border-[#FBBC04] font-[outfit] text-base font-semibold cursor-pointer transition-colors hover:bg-[#f9c74f] ${className}`}
        >
            {label}
        </button>
    );
};

export default PrimaryButton;
