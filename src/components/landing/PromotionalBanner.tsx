"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PromotionalBannerProps {
    saleText: string
    headline: string
    buttonText: string
    imageUrl: string
    imageAlt: string
    onButtonClick?: () => void
}

export function PromotionalBanner({
    saleText,
    headline,
    buttonText,
    imageUrl,
    imageAlt,
    onButtonClick,
}: PromotionalBannerProps) {
    return (
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between min-h-[300px] sm:h-80 md:h-96">
                {/* Text Content */}
                <div className="w-full sm:flex-1 p-6 sm:p-8 lg:p-12 z-10 order-2 sm:order-1">
                    <p className="text-[#ffffff] text-xs sm:text-sm md:text-base font-normal mb-2 sm:mb-4 uppercase tracking-wide font-[outfit]">
                        {saleText}
                    </p>
                    <h1 className="text-[#ffffff] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-4 sm:mb-6 lg:mb-8 text-balance font-[TOPLUXURY]">
                        {headline}
                    </h1>
                    <Button
                        className="bg-[#ffdc91] hover:bg-[#fbbc04] text-[#2c2d3a] font-semibold px-6 py-5 sm:p-7 rounded-full text-sm sm:text-base font-[outfit] transition-colors w-full sm:w-auto"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                </div>

                {/* Model Image */}
                <div className="absolute w-full h-full order-1 sm:order-2">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        className="object-cover object-center sm:object-right"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                    <div className="absolute w-full h-full top-0 left-0 z-0 opacity-20 bg-black"></div>
                </div>
            </div>
        </div>
    )
}

export function PromotionalBannerSkeleton() {
    return (
        <div className="relative flex-1 overflow-hidden rounded-xl sm:rounded-2xl animate-pulse bg-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between min-h-[300px] sm:h-80 md:h-96">
                <div className="w-full sm:flex-1 p-6 sm:p-8 lg:p-12 z-10 space-y-3 sm:space-y-4 order-2 sm:order-1">
                    <div className="h-4 sm:h-5 w-20 sm:w-24 bg-gray-400 rounded"></div>
                    <div className="h-8 sm:h-10 md:h-12 w-full sm:w-3/4 bg-gray-400 rounded"></div>
                    <div className="h-10 sm:h-12 w-full sm:w-32 bg-gray-400 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}