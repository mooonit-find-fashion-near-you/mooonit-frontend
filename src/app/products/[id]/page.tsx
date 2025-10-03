// page.tsx (updated with carousel)
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
    const [, setAllProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        if (id) {
            // Fetch current product
            axios.get(`/api/products/${id}`).then((res) => {
                setProduct(res.data);
                setSelectedSize(res.data.sizes?.[0] || "");
            });

            // Fetch all products for recommendations and navigation
            axios.get("/api/products").then((res) => {
                const products = res.data;
                setAllProducts(products);

                // Get recommended products (same category, excluding current)
                const currentProduct = products.find((p: Product) => p.id === id);
                if (currentProduct) {
                    const sameCategoryProducts = products.filter((p: Product) =>
                        p.category === currentProduct.category && p.id !== id
                    );

                    // If not enough same category products, add random ones
                    let recommended = sameCategoryProducts;
                    if (sameCategoryProducts.length < 6) { // Show more recommendations
                        const otherProducts = products.filter((p: Product) =>
                            p.category !== currentProduct.category && p.id !== id
                        );
                        recommended = [
                            ...sameCategoryProducts,
                            ...otherProducts.slice(0, 6 - sameCategoryProducts.length)
                        ];
                    }

                    setRecommendedProducts(recommended.slice(0, 6));
                }
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
        <main className="min-h-screen max-w-[96rem] mx-auto px-4 py-8 bg-[#f9fbff]">
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

            <CustomerReviews productId={id as string} />
            <RecommendedProducts
                products={recommendedProducts}
            />
        </main>
    );
}