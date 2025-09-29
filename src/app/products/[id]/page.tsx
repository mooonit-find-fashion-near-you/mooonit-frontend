// page.tsx (refactored)
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/data/mockProducts";
import ProductImages from "@/components/product/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import CustomerReviews from "@/components/product/CustomerReviews";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import LoadingState from "@/components/feedback/LoadingState";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (id) {
            // Fetch current product
            axios.get(`/api/products/${id}`).then((res) => {
                setProduct(res.data);
                setSelectedSize(res.data.sizes?.[0] || "");
            });

            // Fetch recommended products (all products excluding current one)
            axios.get("/api/products").then((res) => {
                const allProducts = res.data;
                const filteredProducts = allProducts.filter((p: Product) => p.id !== id);
                const randomProducts = filteredProducts
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                setRecommendedProducts(randomProducts);
            });
        }
    }, [id]);

    const handleQuantityChange = (change: number) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    if (!product) {
        return <LoadingState message="Loading product..." />;
    }

    return (
        <div className="min-h-screen bg-[#f9fbff]">
            <main className="max-w-[96rem] mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <ProductImages images={product.images || []} title={product.title} />

                    <ProductDetails
                        product={product}
                        selectedSize={selectedSize}
                        onSizeChange={setSelectedSize}
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                    />
                </div>

                <CustomerReviews />
                <RecommendedProducts products={recommendedProducts} />
            </main>
        </div>
    );
}