"use client";

import React from "react";
import Image from "next/image";
import { heroData } from "@/data/heroData";
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/PrimaryButton";

export default function HeroSection({ activeSection }: { activeSection: string }) {
    const data = heroData[activeSection] || heroData["Women"];

    return (
        <section className="max-w-[89rem] min-h-[45rem] relative mx-auto bg-[#F9FAFB] py-6 sm:py-9 px-4 sm:px-6 md:px-8 flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Main Image */}
            <figure className="w-full lg:w-5/12 h-64 sm:h-80 md:h-96 lg:h-auto">
                <Image
                    src={data.mainImage}
                    alt={activeSection}
                    width={600}
                    height={600}
                    className="object-cover object-[70%] w-full h-full rounded-lg lg:rounded-none"
                />
            </figure>

            {/* Content Section */}
            <div className="flex-1 flex flex-col space-y-6 lg:items-end">
                {/* Title - Repositioned for mobile */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-medium font-[TOPLUXURY] text-gray-900 leading-tight flex flex-col lg:items-end lg:absolute lg:top-16 lg:right-8">
                    {data.title}
                </h1>

                {/* Mini Image and Subtitle */}
                <figure className="hidden lg:flex sm:flex-row items-start sm:items-center mt-4 lg:mt-40 gap-4 sm:gap-6 lg:gap-11 w-full">
                    <Image
                        src={data.miniImage}
                        alt={`${activeSection} mini`}
                        width={300}
                        height={200}
                        className="object-cover w-full sm:flex-1 h-36 object-top rounded-lg"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] font-medium font-[TOPLUXURY] text-gray-900">
                        {data.subtitle}
                    </h2>
                </figure>

                {/* Description and Stats */}
                <div className="flex flex-col items-start gap-6 w-full lg:w-[36rem]">
                    <p className="text-gray-600 text-sm sm:text-base max-w-full lg:max-w-lg font-[outfit]">
                        {data.description}
                    </p>

                    {/* Stats */}
                    <div className="hidden min-[285px]:flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-base sm:text-lg font-medium text-gray-800">
                        {data.stats.map((stat, idx) => {
                            const [firstWord, ...restWords] = stat.label.split(" ");
                            return (
                                <React.Fragment key={`${stat.value}-${stat.label}`}>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <span className="text-3xl sm:text-4xl font-bold text-gray-900 font-[TOPLUXURY]">
                                            {stat.value}
                                        </span>
                                        <p className="text-sm sm:text-base font-[outfit]">
                                            {firstWord} <br />
                                            {restWords.join(" ")}
                                        </p>
                                    </div>
                                    {idx < data.stats.length - 1 && (
                                        <span className="h-8 sm:h-10 border-l border-black" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* CTA Button */}
                    <Button
                        variant="outline"
                        className="bg-[#FFDC91] hover:bg-[#FFDC91] hover:cursor-pointer font-[outfit] text-lg rounded-full p-8 border border-[#FBBC04] w-auto hidden sm:flex"
                    >
                        Explore Nearby Shops
                    </Button>
                    <PrimaryButton
                        className="flex sm:hidden"
                        label="Explore Nearby Shops"
                        onClick={() => { console.log("Explore Nearby Shops clicked"); }}
                    />
                </div>
            </div>
        </section>
    );
}