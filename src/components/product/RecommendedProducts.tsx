// components/product/RecommendedProducts.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/mockProducts";

interface RecommendedProductsProps {
    products: Product[];
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-normal font-[TOPLUXURY]">You Might Also Like</h2>
                <div className="flex space-x-2">
                    <button className="p-2 border border-[#e7e7e7] rounded-full hover:bg-[#f0f0f0]">
                        <ChevronLeft className="w-5 h-5 text-[#757575]" />
                    </button>
                    <button className="p-2 border border-[#e7e7e7] rounded-full hover:bg-[#f0f0f0]">
                        <ChevronRight className="w-5 h-5 text-[#757575]" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.images?.[0] || ""}
                        imageAlt={product.title}
                        overlayText={product.category}
                        title={product.title}
                        description={product.description}
                        price={product.price.toString()}
                    />
                ))}
            </div>
        </section>
    );
}