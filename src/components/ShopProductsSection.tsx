"use client";

import React, { useState } from "react";
import SectionButton from "@/components/SectionButton";
// import Image from "next/image";
import SubCategories from "./SubCategories";

interface ShopProductsSectionProps {
    activeSection: string;
}

const ShopProductsSection: React.FC<ShopProductsSectionProps> = ({ activeSection }) => {
    const [activeTab, setActiveTab] = useState<"Shop" | "Products">("Shop");
const [selectedCategory, setSelectedCategory] = useState();

    return (
        <section className="py-12 px-4 max-w-[95rem] mx-auto">
            {/* Tab Divider (Shop / Products) */}
            <div className="flex justify-center gap-6 mb-12">
                <SectionButton
                    label="Shop"
                    isActive={activeTab === "Shop"}
                    onClick={() => setActiveTab("Shop")}
                />
                <SectionButton
                    label="Products"
                    isActive={activeTab === "Products"}
                    onClick={() => setActiveTab("Products")}
                />
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-normal text-center font-[TOPLUXURY]">
                Pick your category
            </h2>

            {/* Category Picker */}
            <SubCategories activeSection={activeSection} hideBg={true} />

            {/* Content Area */}
            <div className="mt-12">
                {activeTab === "Shop" ? (
                    <>
                        {/* Display shops */}
                    </>
                ) : (
                    <>
                        {/* Display products */}
                    </>
                )}
            </div >
        </section >
    );
};

export default ShopProductsSection;
