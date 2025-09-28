"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import { SubCategory } from "@/data/subCategoriesData";
import SubCategories from "@/features/landing/components/SubCategories";
import SectionButton from "@/features/landing/SectionButton";
import ProductCard from "../ProductCard";
import ShopCard from "../ShopCard";

interface ShopProductsSectionProps {
    activeSection: string;
}

const ShopProductsSection: React.FC<ShopProductsSectionProps> = ({ activeSection }) => {
    const [activeTab, setActiveTab] = useState<"Shop" | "Products">("Shop");
    const [selectedCategory, setSelectedCategory] = useState<SubCategory | null>(null);

    const [shops, setShops] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedCategory) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === "Shop") {
                    const res = await axios.get(
                        `/api/shops?section=${activeSection}&category=${selectedCategory.slug}`
                    );
                    setShops(res.data);
                } else {
                    const res = await axios.get(
                        `/api/products?section=${activeSection}&category=${selectedCategory.slug}`
                    );
                    setProducts(res.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
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
                            {shops.slice(0, 6).map((shop) => (
                                <ShopCard key={shop.id} shop={shop} activeSection={activeSection} selectedCategory={selectedCategory} />
                            ))}
                        </div>
                        {shops.length > 6 && selectedCategory && (
                            <div className="text-center mt-8">
                                <Link
                                    href={`/shops?section=${activeSection}&category=${selectedCategory.slug}`}
                                    className="px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
                                >
                                    Explore More
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 place-items-center">
                            {products.slice(0, 6).map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                        {products.length > 6 && selectedCategory && (
                            <div className="text-center mt-8">
                                <Link
                                    href={`/products?section=${activeSection}&category=${selectedCategory.slug}`}
                                    className="px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
                                >
                                    Explore More
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default ShopProductsSection;
