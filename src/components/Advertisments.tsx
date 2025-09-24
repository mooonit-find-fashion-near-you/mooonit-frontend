"use client"

import { useEffect, useState } from "react"
import { PromotionalBanner } from "@/components/PromotionalBanner"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

type Advertisement = {
    id: string
    section: string
    saleText: string
    headline: string
    buttonText: string
    imageUrl: string
    imageAlt: string
    backgroundColor: string
}

export default function Advertisments({ activeSection }: { activeSection: string }) {
    const [ads, setAds] = useState<Advertisement[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/advertisements?section=${activeSection}`)
                const data = await res.json()
                setAds(data)
            } catch (error) {
                console.error("Failed to load advertisements:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchAds()
    }, [activeSection])

    if (loading) return <p className="text-center py-8">Loading advertisements...</p>

    return (
        <div className="p-4">
            <div className="max-w-7xl mx-auto relative">
                <Carousel className="w-full">
                    <CarouselContent>
                        {ads.map((ad) => (
                            <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/2">
                                <div className="p-1">
                                    <PromotionalBanner
                                        saleText={ad.saleText}
                                        headline={ad.headline}
                                        buttonText={ad.buttonText}
                                        imageUrl={ad.imageUrl}
                                        imageAlt={ad.imageAlt}
                                        onButtonClick={() => console.log("Ad clicked:", ad.id)}
                                    />
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
