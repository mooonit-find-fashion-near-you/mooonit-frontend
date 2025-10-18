// components/landing/main/ShopsProductsSection.tsx 
"use client";

import React, { useState, useEffect } from "react";
import SectionButton from "@/components/landing/SectionButton";
import SubCategories from "./SubCategories";
import { SubCategory } from "@/data/subCategoriesData";

import ShopCard, { Shop } from "@/components/ShopCard";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

import { Product } from "@/data/mockProducts";
import { categoryService } from "@/services/categoryService";

interface RawShop {
    followers: number;
    rating: number;
    shop_id: string;
    shop_logo: string | null;
    shop_name: string;
}

interface ShopProductsSectionProps {
    activeSection: string;
}

const ShopProductsSection: React.FC<ShopProductsSectionProps> = ({ activeSection }) => {
    const [activeTab, setActiveTab] = useState<"Shop" | "Products">("Shop");
    const [selectedCategory, setSelectedCategory] = useState<SubCategory | null>(null);

    const [shops, setShops] = useState<Shop[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedCategory) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === "Shop") {
                    const response = await categoryService.getShopsByCategory(selectedCategory.slug);

                    // The shops array is in response.data.data.shops, not response.data.shops
                    const apiData = response.data.data; // This contains shops, shop_count, subcategory_id
                    const rawShops = apiData?.shops || [];

                    // Transform the API data to match ShopCard expectations
                    const transformedShops = rawShops.map((shop: RawShop) => ({
                        shop_id: shop.shop_id,
                        shop_logo: shop.shop_logo || '/images/404.png',
                        shop_name: shop.shop_name,
                        rating: shop.rating,
                        location: 'City Center',
                    }));

                    setShops(transformedShops);
                } else {
                    const response = await categoryService.getProductsByCategory(selectedCategory.slug);
                    console.log("Products API response:", response.data);

                    const apiData = response.data.data; // similar to shops logic
                    const rawProducts = apiData?.products || [];

                    setProducts(rawProducts);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                // Fallback to empty arrays
                setShops([]);
                setProducts([]);
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
                                <ShopCard key={shop.shop_id} shop={shop} activeSection={activeSection} selectedCategory={selectedCategory} />
                            ))}
                        </div>
                        {shops.length > 6 && selectedCategory && (
                            <div className="text-center mt-12">
                                <Link
                                    href={`/shops?section=${activeSection}&category=${selectedCategory.slug}`}
                                    className="px-6 py-4 rounded-full bg-[#FFDC91] border border-[#FBBC04] font-[outfit] text-base font-semibold cursor-pointer"
                                >
                                    Explore More
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {/* TODO: Add Sizes filter */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                            {products
                                .slice(0, 6)
                                .filter(product => product.images && product.images[0] && product.images[0].trim() !== '')
                                .map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        image={product.images[0]}
                                        imageAlt={product.imageAlt}
                                        overlayText={product.overlayText}
                                        title={product.title}
                                        description={product.description}
                                        price={product.price}
                                    />
                                ))}
                        </div>
                        {products.length > 6 && selectedCategory && (
                            <div className="text-center mt-12">
                                <Link
                                    href={`/products?section=${activeSection}&category=${selectedCategory.slug}`}
                                    className="px-6 py-4 rounded-full bg-[#FFDC91] border border-[#FBBC04] font-[outfit] text-base font-semibold cursor-pointer"
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
