"use client";

import React, { useState, useEffect, useMemo } from "react";
import SubCategoryCard from "../SubCategoryCard";
import Link from "next/link";
import apiClient from "@/services/apiClient";

interface SubCategory {
    id: string;
    name: string;
    slug: string;
    image: string;
}

interface SubCategoriesProps {
    activeSection: string;
    hideBg?: boolean;
    onCategorySelect?: (category: SubCategory) => void;
}

// Map frontend sections to backend category IDs
const SECTION_TO_CATEGORY_MAP: Record<string, string> = {
    "women": "women_root",
    "men": "men_root",
    "footwear": "footwear_root",
    "accessories": "accessories_root",
    "bags": "bags_root"
};

const SubCategories: React.FC<SubCategoriesProps> = ({ activeSection, hideBg, onCategorySelect }) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/api/user/catalog/categories');
                setCategories(response.data.data.subcategories || []);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Transform API data to match your SubCategory interface
    const currentSubCategories = useMemo(() => {
        if (!categories.length) return [];

        const sectionKey = activeSection.toLowerCase();
        const backendCategoryId = SECTION_TO_CATEGORY_MAP[sectionKey];

        if (!backendCategoryId) return [];

        // Find the main category (Women, Men, etc.)
        const mainCategory = categories.find(cat => cat.categoryId === backendCategoryId);
        if (!mainCategory || !mainCategory.subcategories) return [];

        // Transform subcategories to your format
        return mainCategory.subcategories.map((subcat: any) => ({
            id: subcat.categoryId,
            name: subcat.categoryName,
            slug: subcat.categoryId, // Use categoryId as slug for API calls
            image: subcat.imageUrl || "/images/placeholder-category.jpg" // Fallback image
        }));
    }, [categories, activeSection]);

    const [activeCategoryId, setActiveCategoryId] = useState(
        hideBg ? currentSubCategories[0]?.id : null
    );

    useEffect(() => {
        if (hideBg && currentSubCategories.length > 0) {
            onCategorySelect?.(currentSubCategories[0]);
        }
    }, [activeSection, hideBg, currentSubCategories, onCategorySelect]);

    if (loading) {
        return (
            <section className="px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-sm:pb-9 p-4 sm:p-6 md:p-8 lg:p-10 max-w-[95rem] mx-auto">
                    {/* Loading skeletons */}
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-32 h-32 bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    if (currentSubCategories.length === 0) {
        return null;
    }

    return (
        <section className="px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-sm:pb-9 p-4 sm:p-6 md:p-8 lg:p-10 max-w-[95rem] mx-auto">
                {currentSubCategories.map((category: SubCategory) => {
                    const isActive = hideBg && activeCategoryId === category.id;

                    return (
                        <React.Fragment key={category.id}>
                            {hideBg ? (
                                <div
                                    className="flex-shrink-0 cursor-pointer"
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
                                    className="flex-shrink-0"
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