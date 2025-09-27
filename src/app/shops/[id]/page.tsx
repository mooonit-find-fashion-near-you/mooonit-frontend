"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface Shop {
    id: string | number;
    image: string;
    title: string;
    rating: number;
    time: string;
    distance: string;
    location: string;
    description?: string;
}

interface Product {
    id: string | number;
    name: string;
    image: string;
    price: number;
    description?: string;
}

export default function ShopPage() {
    const { id } = useParams();
    const [shop, setShop] = useState<Shop | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const sizeOptions = ["S", "M", "L", "XL", "XXL"];
    const categoryOptions = ["Bag", "Shoes", "Clothes", "Ethnic"];

    useEffect(() => {
        if (!id) return;

        const fetchShopData = async () => {
            try {
                // Fetch single shop details
                const shopRes = await axios.get(`/api/shops/${id}`);
                setShop(shopRes.data);

                // Fetch products for this shop
                const productRes = await axios.get(`/api/shops/${id}/products`);
                setProducts(productRes.data);
            } catch (err) {
                console.error("Error fetching shop:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchShopData();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#f9fbff] flex items-center justify-center">
        <div className="text-lg">Loading shop...</div>
    </div>;

    if (!shop) return <div className="min-h-screen bg-[#f9fbff] flex items-center justify-center">
        <div className="text-lg">Shop not found.</div>
    </div>;

    return (
        <section className="min-h-screen">
            {/* Hero Section with Shop Details */}
            <div className="relative max-w-[95rem] h-[36rem] mx-auto mt-12">
                <figure>
                    <Image
                        src={shop.image}
                        alt={shop.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </figure>
                <div className="absolute left-0 bg-gradient-to-r from-black/70 to-transparent w-1/2 h-full"></div>
                <figcaption className="absolute top-5/12 transform -translate-y-1/2 left-18 text-white flex flex-col items-start">
                    <h1 className="text-[5.5rem] font-normal mb-2 uppercase font-[TOPLUXURY]">{shop.title}</h1>
                    <p className="flex items-center justify-center gap-2 font-[outfit] text-xl">
                        <svg width="15" height="15" className="text-[#4285f4]" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.7063 0.590088C18.6617 0.239561 19.585 1.18109 19.2413 2.15421L13.2054 19.2495C12.8306 20.3123 11.3646 20.3327 10.9609 19.2801L8.13385 11.915L0.91078 9.0333C-0.120516 8.62164 -0.10053 7.1268 0.94076 6.74367L17.7063 0.589069V0.590088Z" fill="#4285F4" />
                        </svg>
                        {shop.location}
                    </p>
                </figcaption>
            </div>

            {/* Filters Bar */}
            <div className="mt-15 px-4 py-3 max-w-[95rem] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="font-normal text-2xl font-[TOPLUXURY]">Filters</span>
                    <Button variant="outline" size="sm" className="bg-[#ffdc91] border-[#ffdc91] hover:bg-[#fbbc04]">
                        Ultra View
                    </Button>
                </div>
                <div className="flex items-center gap-4 text-[#757575] font-[TOPLUXURY] text-xl">
                    <span>All</span>
                    <span>I</span>
                    <span className="bg-[#fbbc04] px-2 py-1 rounded">N</span>
                    <span>XXI</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[95rem] mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <aside className="w-64 space-y-6">
                        {/* Size Filter */}
                        <div>
                            <h3 className="font-normal text-2xl font-[TOPLUXURY] mb-3">Size</h3>
                            <div className="space-y-2">
                                {sizeOptions.map((size) => (
                                    <div key={size} className="flex items-center justify-between">
                                        <span className="text-[#757575]">{size}</span>
                                        <span className="text-[#757575]">1</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <h3 className="font-medium mb-3 font-[TOPLUXURY] text-2xl">Category</h3>
                            <div className="space-y-2">
                                {categoryOptions.map((category) => (
                                    <div key={category} className="flex items-center justify-between">
                                        <span className="text-[#757575]">{category}</span>
                                        <ChevronDown className="w-4 h-4 text-[#757575]" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <h3 className="font-medium mb-3 font-[TOPLUXURY] text-2xl">Price</h3>
                            <div className="space-y-4">
                                <Slider defaultValue={[500]} max={1000} step={50} className="w-full" />
                                <div className="flex justify-between text-sm text-[#757575]">
                                    <span>Rs. 500</span>
                                    <span>Rs. 1000</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {products.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-[#757575] text-lg">No products available in this shop.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <Card key={product.id} className="border-[#e8e8e8] hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                                                <img
                                                    src={product.image || "/placeholder.svg"}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h4 className="font-medium mb-2">{product.name}</h4>
                                            <p className="text-sm text-[#757575] mb-3">
                                                {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
                                            </p>
                                            <p className="font-medium mb-4">Rs. {product.price}.00</p>
                                            <Button className="w-full bg-[#fbbc04] hover:bg-[#ffdc91] text-black">
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Add To Cart
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
}