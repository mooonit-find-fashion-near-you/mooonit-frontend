'use client';

import React from "react";
import Image from "next/image";
import { SubCategory } from "@/data/subCategoriesData";

interface SubCategoryCardProps {
    category: SubCategory;
    hideBg?: boolean;
    isActive?: boolean; 
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({ category, hideBg, isActive }) => {
    return (
        <div
            className={`w-[200px] scale-95 h-[230px] rounded-3xl p-6 transition-shadow flex flex-col items-center justify-between
                ${hideBg
                    ? isActive
                        ? "bg-[#F0E4D3] border border-[#D9A299] shadow-[0px_10px_20px_rgba(0,0,0,0.25)]"
                        : "border border-transparent"
                    : "bg-[#F0E4D3] border border-[#D9A299] shadow-[0px_6px_12px_rgba(0,0,0,0.15)] hover:shadow-[0px_10px_20px_rgba(0,0,0,0.25)]"
                }`}
        >
            {/* Image + Shadow */}
            <div className="relative flex justify-center items-center h-[150px] w-full">
                <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="object-cover relative z-10 scale-70"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[50%] h-3 scale-y-40 bg-black rounded-[100%] blur-md" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 aspect-square bg-[#F0E4D3] rounded-full" />
            </div>

            {/* Title */}
            <h1 className="font-medium text-gray-800 text-2xl text-center font-[TOPLUXURY]">
                {category.name}
            </h1>
        </div>
    );
};

export default SubCategoryCard;
