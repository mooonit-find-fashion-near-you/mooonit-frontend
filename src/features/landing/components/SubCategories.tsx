"use client";

import React, { useState, useEffect } from "react";
import { subCategoriesData, SubCategory } from "@/data/subCategoriesData";
import SubCategoryCard from "../SubCategoryCard";
import Link from "next/link";

interface SubCategoriesProps {
    activeSection: string;
    hideBg?: boolean;
    onCategorySelect?: (category: SubCategory) => void;
}

const SubCategories: React.FC<SubCategoriesProps> = ({ activeSection, hideBg, onCategorySelect }) => {
    const currentSubCategories = subCategoriesData[activeSection.toLowerCase()] || [];

    const [activeCategoryId, setActiveCategoryId] = useState(
        hideBg ? currentSubCategories[0]?.id : null
    );

    useEffect(() => {
        if (hideBg && currentSubCategories.length > 0) {
            onCategorySelect?.(currentSubCategories[0]);
        }
    }, [activeSection]); // runs when section changes

    if (currentSubCategories.length === 0) {
        return null;
    }

    return (
        <section className="px-4">
            <div className="flex gap-6 p-10 max-w-[95rem] mx-auto overflow-x-auto scrollbar-hide snap-both">
                {currentSubCategories.map((category: SubCategory) => {
                    const isActive = hideBg && activeCategoryId === category.id;

                    return (
                        <React.Fragment key={category.id}>
                            {hideBg ? (
                                <div
                                    className="flex-shrink-0 snap-start cursor-pointer"
                                    onClick={() => {
                                        setActiveCategoryId(category.id);
                                        onCategorySelect?.(category);
                                    }}
                                >
                                    <SubCategoryCard
                                        category={category}
                                        hideBg={hideBg}
                                        isActive={isActive}
                                    />
                                </div>
                            ) : (
                                <Link
                                    href={`/products?section=${activeSection.toLowerCase()}&category=${category.slug}`}
                                    className="flex-shrink-0 snap-start"
                                >
                                    <SubCategoryCard category={category} hideBg={hideBg} />
                                </Link>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
};

export default SubCategories;
