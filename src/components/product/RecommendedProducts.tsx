// components/product/RecommendedProducts.tsx (with shadcn carousel)
"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/mockProducts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";

interface RecommendedProductsProps {
    products: Product[];
}

export default function RecommendedProducts({
    products,
}: RecommendedProductsProps) {

    if (products.length === 0) {
        return null;
    }

    return (
        <section>
            <Carousel
                opts={{ align: "start", loop: true, }}
                className="w-full"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-normal font-[TOPLUXURY]">
                        You Might Also Like
                    </h2>

                    {/* Custom navigation buttons that work with the carousel */}
                    <div className="flex space-x-2">
                        <CarouselPrevious className="static translate-y-0 border border-[#e7e7e7] hover:bg-[#f0f0f0]" />
                        <CarouselNext className="static translate-y-0 border border-[#e7e7e7] hover:bg-[#f0f0f0]" />
                    </div>
                </div>

                {/* FIXME: due to overflow shadow of it is not visible. also responsiveness is ruined */}
                <CarouselContent className="-ml-4 pb-8">
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="pl-5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                        >
                            <ProductCard
                                id={product.id}
                                image={product.images?.[0] || ""}
                                imageAlt={product.title}
                                overlayText={product.category}
                                title={product.title}
                                description={product.description}
                                price={product.price.toString()}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}