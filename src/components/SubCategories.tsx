'use client';

import React from "react";
import { subCategoriesData, SubCategory } from "@/data/subCategoriesData";
import SubCategoryCard from "./SubCategoryCard";
import Link from "next/link";

interface SubCategoriesProps {
    activeSection: string;
}

const SubCategories: React.FC<SubCategoriesProps> = ({ activeSection }) => {
    const currentSubCategories = subCategoriesData[activeSection.toLowerCase()] || [];

    if (currentSubCategories.length === 0) {
        return null;
    }

    return (
        <section className="px-4">
            <div className="flex gap-6 p-10 max-w-[95rem] mx-auto overflow-x-auto scrollbar-hide snap-both">
                {currentSubCategories.map((category: SubCategory) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.slug}&section=${activeSection.toLowerCase()}`}
                        className="flex-shrink-0 snap-start"
                    >
                        <SubCategoryCard category={category} />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SubCategories;
