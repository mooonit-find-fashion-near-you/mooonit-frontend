"use client"

import { PromotionalBanner } from "@/components/PromotionalBanner"
import { advertisements } from "@/data/advertisements"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Advertisments() {
    const handleButtonClick = (adId: string) => {
        console.log("Ad clicked:", adId)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto relative">
                {/* gradient fade overlays */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-gray-100 via-gray-100/70 to-transparent z-10" />
                <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-gray-100 via-gray-100/70 to-transparent z-10" />

                <Carousel className="w-full">
                    <CarouselContent>
                        {advertisements.map((ad) => (
                            <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/2">
                                <div className="p-1">
                                    <PromotionalBanner
                                        saleText={ad.saleText}
                                        title={ad.title}
                                        subtitle={ad.subtitle}
                                        buttonText={ad.buttonText}
                                        imageUrl={ad.imageUrl}
                                        imageAlt={ad.imageAlt}
                                        backgroundColor={ad.backgroundColor}
                                        onButtonClick={() => handleButtonClick(ad.id)}
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
