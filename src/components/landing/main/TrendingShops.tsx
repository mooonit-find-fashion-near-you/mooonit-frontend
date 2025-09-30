"use client"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ShopCard from "../../ShopCard"

type Shop = {
    id: number
    name: string
    section: string
    image: string
    title: string
    rating: number
    time: string
    distance: string
    location: string
}

export default function TrendingShops({ activeSection }: { activeSection: string }) {
    const [shops, setShops] = useState<Shop[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchShops = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/trending-shops?section=${activeSection}`)
                const data = await res.json()
                setShops(data)
            } catch (error) {
                console.error("Failed to load shops:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchShops()
    }, [activeSection])

    if (loading) return <p className="text-center py-8">Loading shops...</p>

    return (
        <div className="py-8">
            <div className="max-w-[85rem] mx-auto px-4">
                <h1 className="text-[#2c2d3a] text-4xl font-medium text-center mb-12 font-[TOPLUXURY]">
                    Trending Shops
                </h1>

                <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent>
                        {shops.map((shop) => (
                            <CarouselItem key={shop.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="px-4 pb-8">
                                    <ShopCard shop={shop} activeSection={activeSection} selectedCategory={null} />
                                </div>
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
