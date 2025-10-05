"use client";

import React, { useState, useEffect, useMemo } from "react";
import { subCategoriesData, SubCategory } from "@/data/subCategoriesData";
import SubCategoryCard from "../SubCategoryCard";
import Link from "next/link";

interface SubCategoriesProps {
    activeSection: string;
    hideBg?: boolean;
    onCategorySelect?: (category: SubCategory) => void;
}

const SubCategories: React.FC<SubCategoriesProps> = ({ activeSection, hideBg, onCategorySelect }) => {
    const currentSubCategories = useMemo(() =>
        subCategoriesData[activeSection.toLowerCase()] || []
        , [activeSection]);

    const [activeCategoryId, setActiveCategoryId] = useState(
        hideBg ? currentSubCategories[0]?.id : null
    );

    useEffect(() => {
        if (hideBg && currentSubCategories.length > 0) {
            onCategorySelect?.(currentSubCategories[0]);
        }
    }, [activeSection, hideBg, currentSubCategories, onCategorySelect]);

    if (currentSubCategories.length === 0) {
        return null;
    }

    return (
        <section className="px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-sm:pb-9 p-4 sm:p-6 md:p-8 lg:p-10 max-w-[95rem] mx-auto overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                {currentSubCategories.map((category: SubCategory) => {
                    const isActive = hideBg && activeCategoryId === category.id;

                    return (
                        <React.Fragment key={category.id}>
                            {hideBg ? (
                                <div
                                    className="flex-shrink-0 snap-start snap-always cursor-pointer"
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
                                    className="flex-shrink-0 snap-start snap-always"
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