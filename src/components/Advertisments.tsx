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
        const controller = new AbortController()
        const signal = controller.signal

        const fetchAds = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/advertisements?section=${encodeURIComponent(activeSection)}`, { signal })
                if (!res.ok) {
                    // log and set empty ads to avoid breaking the carousel
                    console.error(`Failed to load advertisements: ${res.status} ${res.statusText}`)
                    setAds([])
                    return
                }
                const data = await res.json()
                setAds(Array.isArray(data) ? data : [])
            } catch (error: unknown) {
                // narrow unknown to check for AbortError and other error shapes
                if (typeof error === 'object' && error !== null) {
                    const err = error as { name?: unknown }
                    if (typeof err.name === 'string' && err.name === 'AbortError') return
                }
                console.error("Failed to load advertisements:", error)
                setAds([])
            } finally {
                setLoading(false)
            }
        }

        fetchAds()

        return () => controller.abort()
    }, [activeSection])

    if (loading) return <p className="text-center py-8">Loading advertisements...</p>

    if (!ads || ads.length === 0) return <p className="text-center py-8">No advertisements available.</p>

    return (
        <div className="min-h-screen p-4">
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
