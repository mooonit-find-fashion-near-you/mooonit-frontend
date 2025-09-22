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
        <div className="relative overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between h-96">
                {/* Text Content */}
                <div className="flex-1 p-8 lg:p-12 z-10">
                    <p className="text-[#ffffff] text-base font-normal mb-4 uppercase tracking-wide font-[outfit]">{saleText}</p>
                    <h1 className="text-[#ffffff] text-4xl lg:text-5xl font-light leading-tight mb-8 text-balance font-[TOPLUXURY]">
                        {headline}
                    </h1>
                    <Button
                        className="bg-[#ffdc91] hover:bg-[#fbbc04] text-[#2c2d3a] font-semibold p-7 rounded-full text-base font-[outfit] transition-colors"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                </div>

                {/* Model Image */}
                <figure className="h-full">
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        className="h-full w-auto object-cover"
                        fill
                    />
                    <div className="absolute w-full h-full top-0 left-0 z-0 opacity-20 bg-black"></div>
                </figure>
            </div>
        </div>
    )
}
