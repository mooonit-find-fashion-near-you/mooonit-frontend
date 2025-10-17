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
            className={`w-[120px] h-[150px] sm:w-[140px] sm:h-[170px] md:w-[160px] md:h-[190px] lg:w-[180px] lg:h-[210px] xl:w-[200px] xl:h-[230px] scale-95 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-all duration-300 ease-in-out flex flex-col items-center justify-between 
                ${hideBg
                    ? isActive
                        ? "bg-[#F0E4D3] border border-[#D9A299] shadow-[0px_10px_20px_rgba(0,0,0,0.25)]"
                        : "border border-transparent"
                    : "bg-[#F0E4D3] border border-[#D9A299] shadow-[0px_6px_12px_rgba(0,0,0,0.15)] hover:shadow-[0px_10px_20px_rgba(0,0,0,0.25)]"
                }`}
        >
            {/* Image + Shadow */}
            <div className="relative flex justify-center items-center h-[95px] md:h-[110px] lg:h-[130px] xl:h-[150px] w-full">
                <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="object-cover relative z-10 scale-70"
                />
                {!isActive && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 aspect-square bg-[#F0E4D3] rounded-full" />}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[50%] h-3 scale-y-40 bg-black rounded-[100%] blur-md" />
            </div>

            {/* Title */}
            <h1 className="font-medium text-gray-800 text-base sm:text-xl md:text-2xl lg:text-2xl text-center font-[TOPLUXURY] leading-tight">
                {category.name}
            </h1>
        </div>
    );
};

export default SubCategoryCard;

export const SubCategoryCardSkeleton = () => {
    return (
        <div
            className="w-[120px] h-[150px] sm:w-[140px] sm:h-[170px] md:w-[160px] md:h-[190px] lg:w-[180px] lg:h-[210px] xl:w-[200px] xl:h-[230px] bg-gray-200 rounded-2xl sm:rounded-3xl animate-pulse flex flex-col items-center justify-between p-4 sm:p-5 md:p-6"
        >
            <div className="w-[70%] aspect-square bg-gray-300 rounded-full"></div>
            <div className="w-3/4 h-6 sm:h-8 bg-gray-300 rounded"></div>
        </div>
    );
}