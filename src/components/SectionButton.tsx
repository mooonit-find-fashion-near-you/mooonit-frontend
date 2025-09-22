"use client";

import Image from "next/image";

interface SectionButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export default function SectionButton({ label, isActive, onClick }: SectionButtonProps) {
    console.log(`SectionButton: using image at /section-tabs/${label.toLowerCase().replace(" ", "")}.jpg`);

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-full border transition-all hover:cursor-pointer whitespace-nowrap ${isActive ? "bg-[#FFBEB9] border-[#E54B4B] text-[#E54B4B]" : "border-[#FBBC04] text-black"}`}
        >
            {/* Avatar / Image */}
            <figure
                className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 overflow-hidden border flex-shrink-0 ${isActive ? "border-[#E54B4B]" : "border-[#FBBC04]"}`}
            >
                <Image
                    src={`/section-tabs/${label.toLowerCase().replace(" ", "")}.jpg`}
                    alt={label}
                    width={100}
                    height={100}
                    className="object-cover"
                />
            </figure>

            {/* Label */}
            <figcaption
                className={`border font-[outfit] px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base flex-shrink-0 ${isActive ? "border-[#E54B4B] bg-white" : "border-[#FBBC04] bg-[#FFDC91]"}`}
            >
                {label}
            </figcaption>
        </button>
    );
}