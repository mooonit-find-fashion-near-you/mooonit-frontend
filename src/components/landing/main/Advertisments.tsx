"use client"

import { useEffect, useState } from "react"
import { PromotionalBanner, PromotionalBannerSkeleton } from "@/components/landing/PromotionalBanner"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import PrimaryButton from "@/components/PrimaryButton"

type Advertisement = {
    id: string
    section: string
    saleText: string
    headline: string
    buttonText: string
    imageUrl: string
    imageAlt: string
}

// Helper function for error type checking
function isAbortError(error: unknown): error is DOMException {
    return error instanceof DOMException && error.name === 'AbortError'
}

// Simple validation function
function validateAdvertisement(data: unknown): data is Advertisement[] {
    return Array.isArray(data) && data.every(item =>
        typeof item?.id === 'string' &&
        typeof item?.saleText === 'string' &&
        typeof item?.headline === 'string'
    )
}

export default function Advertisements({ activeSection }: { activeSection: string }) {
    const [ads, setAds] = useState<Advertisement[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        const fetchAds = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`/api/advertisements?section=${activeSection}`, {
                    signal: abortController.signal
                })

                if (!res.ok) {
                    throw new Error(`Failed to load: ${res.status}`)
                }

                const data = await res.json()

                if (!validateAdvertisement(data)) {
                    throw new Error('Invalid data format')
                }

                setAds(data)
            } catch (error) {
                // Don't set error for aborted requests
                if (!isAbortError(error)) {
                    console.error("Failed to load advertisements:", error)
                    setError(error instanceof Error ? error.message : 'Failed to load advertisements')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchAds()

        return () => {
            abortController.abort()
        }
    }, [activeSection])

    const handleRetry = () => {
        // Trigger re-fetch by updating a dummy state
        setLoading(true)
        setError(null)
    }

    // Skeleton loader for better UX
    if (loading) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* <div className="max-w-7xl mx-auto flex gap-4 sm:gap-6 overflow-hidden"> */}
                <div className="max-w-7xl mx-auto">
                    <Carousel
                        className="w-full"
                        opts={{ align: "start", loop: true, }}
                    >
                        <CarouselContent className="-ml-2 sm:-ml-4">
                            {[1, 2, 3].map((i) => (
                                <CarouselItem key={i} className="pl-2 sm:pl-4 basis-full md:basis-1/2">
                                    <div className="p-1">
                                        <PromotionalBannerSkeleton />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center py-8 sm:py-12">
                    <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>
                    <PrimaryButton onClick={handleRetry} label="Try Again" />
                </div>
            </div>
        )
    }

    if (ads.length === 0) {
        return (
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center py-8 sm:py-12">
                    <p className="text-gray-500 mb-4 text-sm sm:text-base">No advertisements available</p>
                    <button
                        onClick={handleRetry}
                        className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm sm:text-base transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="max-w-7xl mx-auto">
                <Carousel
                    className="w-full"
                    opts={{ align: "start", loop: true, }}
                >
                    <CarouselContent className="-ml-2 sm:-ml-4">
                        {ads.map((ad) => (
                            <CarouselItem key={ad.id} className="pl-2 sm:pl-4 basis-full md:basis-1/2">
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
                    <div className="hidden sm:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}