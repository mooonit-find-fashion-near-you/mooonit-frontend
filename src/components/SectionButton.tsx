"use client";

import Image from "next/image";

interface SectionButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export default function SectionButton({ label, isActive, onClick }: SectionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-full border transition-all
        ${isActive
                    ? "bg-[#FFBEB9] border-[#E54B4B] text-[#E54B4B]"
                    : "border-[#FBBC04] text-black"
                }`}
        >
            {/* Avatar / Image */}
            <figure
                className={`rounded-full p-1 aspect-square w-14 h-14 overflow-hidden object-cover border
          ${isActive ? "border-[#E54B4B]" : "border-[#FBBC04]"}
        `}
            >
                <Image
                    src={`/images/${label.toLowerCase().replace(" ", "")}.png`}
                    alt={label}
                    width={30}
                    height={30}
                />
            </figure>

            {/* Label */}
            <figcaption
                className={`border px-10 py-3 rounded-full font-bold
          ${isActive ? "border-[#E54B4B] bg-white" : "border-[#FBBC04] bg-[#FFDC91]"}
        `}
            >
                {label}
            </figcaption>
        </button>
    );
}
