// page.tsx (updated with carousel)
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/data/mockProducts";
import ProductImages from "@/components/product/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import CustomerReviews from "@/components/product/CustomerReviews";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import LoadingState from "@/components/feedback/LoadingState";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
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

    // Navigation functions
    const navigateToProduct = (productId: string) => {
        router.push(`/products/${productId}`);
    };

    const getAdjacentProducts = () => {
        if (!allProducts.length || !product) return { prev: null, next: null };
        
        const currentIndex = allProducts.findIndex(p => p.id === product.id);
        const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
        const nextProduct = currentIndex < allProducts.length - 1 ? allProducts[currentIndex + 1] : null;
        
        return { prev: prevProduct, next: nextProduct };
    };

    const handleQuantityChange = (change: number) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    if (!product) {
        return <LoadingState message="Loading product..." />;
    }

    const { prev, next } = getAdjacentProducts();

    return (
        <div className="min-h-screen bg-[#f9fbff]">
            {/* Navigation Arrows */}
            <div className="max-w-[96rem] mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Button
                        variant="outline"
                        onClick={() => prev && navigateToProduct(prev.id)}
                        disabled={!prev}
                        className="flex items-center space-x-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </Button>
                    
                    <Button
                        variant="outline"
                        onClick={() => next && navigateToProduct(next.id)}
                        disabled={!next}
                        className="flex items-center space-x-2"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

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

                <CustomerReviews productId={id as string} />
                <RecommendedProducts 
                    products={recommendedProducts}
                    currentProductId={id as string}
                />
            </main>
        </div>
    );
}