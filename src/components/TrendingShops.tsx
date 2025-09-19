"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ShopCard from "./ShopCard"

export default function TrendingShops() {

    // Mock data (This will be fetched from backend.)
    const shops = [
        {
            id: 1,
            image: "/trending-shops/young-woman-posing-in-casual-outfit.jpg",
            title: "Urban Trends",
            rating: 4.7,
            time: "30 min",
            distance: "2 Km",
            location: "Vijay Nagar, Indore",
        },
        {
            id: 2,
            image: "/trending-shops/colorful-shopping-mall-interior-with-clothing-rack.jpg",
            title: "Fashion Hub",
            rating: 4.3,
            time: "22 min",
            distance: "1 Km",
            location: "Palasia, Indore",
        },
        {
            id: 3,
            image: "/trending-shops/woman-in-red-patterned-outfit-smiling.jpg",
            title: "Style Street",
            rating: 4.8,
            time: "18 min",
            distance: "0.8 Km",
            location: "Rajwada, Indore",
        },
        {
            id: 4,
            image: "/trending-shops/trendy-men-fashion-store.jpg",
            title: "Gentlemen’s Choice",
            rating: 4.6,
            time: "35 min",
            distance: "2.5 Km",
            location: "Bhawarkua, Indore",
        },
        {
            id: 5,
            image: "/trending-shops/traditional-wear-shop.jpg",
            title: "Ethnic Elegance",
            rating: 4.9,
            time: "28 min",
            distance: "1.5 Km",
            location: "Sapna Sangeeta, Indore",
        },
        {
            id: 6,
            image: "/trending-shops/shoe-store.jpg",
            title: "Sole Mates",
            rating: 4.4,
            time: "20 min",
            distance: "1 Km",
            location: "Malharganj, Indore",
        },
    ]


    return (
        <div className="bg-[#f7f7f7] py-8">
            <div className="max-w-[85rem] mx-auto px-4">
                <h1 className="text-[#2c2d3a] text-4xl font-medium text-center mb-12">
                    Trending Shops
                </h1>

                <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent>
                        {shops.map((shop) => (
                            <CarouselItem key={shop.id} className="md:basis-1/2 lg:basis-1/3">
                                <ShopCard shop={shop} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}
