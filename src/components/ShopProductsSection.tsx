"use client";

import React, { useState, useEffect } from "react";
import SectionButton from "@/components/SectionButton";
import SubCategories from "./SubCategories";
import { SubCategory } from "@/data/subCategoriesData";

import ShopCard from "@/components/ShopCard";
import ProductCard from "@/components/ProductCard";
import axios from "axios";

interface ShopProductsSectionProps {
    activeSection: string;
}

const ShopProductsSection: React.FC<ShopProductsSectionProps> = ({ activeSection }) => {
    const [activeTab, setActiveTab] = useState<"Shop" | "Products">("Shop");
    const [selectedCategory, setSelectedCategory] = useState<SubCategory | null>(null);

    const [shops, setShops] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch data from backend whenever filters change
    useEffect(() => {
        if (!selectedCategory) return;

        const fetchData = async () => {
            setLoading(true);
            console.log("Fetching data...");
            try {
                if (activeTab === "Shop") {
                    console.log("Fetching shops...");
                    const res = await axios.get(
                        `/api/shops?section=${activeSection}&category=${selectedCategory.slug}`
                    );
                    console.log(`/api/shops?section=${activeSection}&category=${selectedCategory.slug}`);

                    console.log("Fetched shops:", res.data);
                    setShops(res.data);
                } else {
                    console.log("Fetching products...");
                    const res = await axios.get(
                        `/api/products?section=${activeSection}&category=${selectedCategory.slug}`
                    );
                    console.log("Fetched products:", res.data);
                    setProducts(res.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
                console.log("Finished fetching data");
            }
        };

        fetchData();
    }, [activeTab, activeSection, selectedCategory]);

    return (
        <section className="py-12 px-4 max-w-[95rem] mx-auto">
            {/* Tab Divider */}
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
            <SubCategories
                activeSection={activeSection}
                hideBg={true}
                onCategorySelect={setSelectedCategory}
            />

            {/* Content Area */}
            <div className="mt-12">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : activeTab === "Shop" ? (
                    <>
                        <h1 className="text-[#2c2d3a] text-4xl font-medium text-center mb-12 font-[TOPLUXURY]">
                            Our Shops
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                            {shops.map((shop) => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 place-items-center">
                            {products.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ShopProductsSection;
