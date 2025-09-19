'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { subCategoriesData, SubCategory } from '@/data/subCategoriesData';

interface SubCategoriesProps {
    activeSection: string;
}

const SubCategories: React.FC<SubCategoriesProps> = ({ activeSection }) => {
    const currentSubCategories = subCategoriesData[activeSection.toLowerCase()] || [];

    if (currentSubCategories.length === 0) {
        return null;
    }

    return (
        <section className="py-12 px-4">
            {/* Horizontal Scroll with snapping */}
            <div className="flex gap-6 p-10 max-w-[95rem] mx-auto">
                {currentSubCategories.map((category: SubCategory) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.slug}&section=${activeSection.toLowerCase()}`}
                        className="flex-shrink-0 snap-start"
                    >
                        <div
                            className="w-[200px] scale-95 h-[230px] rounded-3xl p-6 bg-[#F0E4D3] border border-[#D9A299] 
                       shadow-[0px_6px_12px_rgba(0,0,0,0.15)] hover:shadow-[0px_10px_20px_rgba(0,0,0,0.25)] 
                       transition-shadow flex flex-col items-center justify-between"
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
                            </div>

                            {/* Title */}
                            <h1 className="font-medium text-gray-800 text-base text-center">
                                {category.name}
                            </h1>
                        </div>
                    </Link>
                ))}
            </div>
        </section>


    );
};

export default SubCategories;
