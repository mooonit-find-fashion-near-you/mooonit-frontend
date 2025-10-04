"use client";

import React from "react";
import Image from "next/image";
import { heroData } from "@/data/heroData";
import { Button } from "@/components/ui/button";

export default function HeroSection({ activeSection }: { activeSection: string }) {
    const data = heroData[activeSection] || heroData["Women"];

    return (
        <section className="max-w-[89rem] h-[45rem] relative mx-auto bg-[#F9FAFB] py-9 px-8 flex flex-row gap-8">
            <figure className="w-5/12">
                <Image
                    src={data.mainImage}
                    alt={activeSection}
                    width={600}
                    height={600}
                    className="object-cover object-[70%] w-full h-full"
                />
            </figure>

            <div className="flex-1 flex flex-col space-y-6 right-0 items-end">
                <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[5rem] font-bold font-[TOPLUXURY] top-16 text-gray-900 absolute leading-tight flex flex-col items-end">
                    {data.title}
                </h1>

                <figure className="flex items-center mt-40 gap-11 w-full">
                    <Image
                        src={data.miniImage}
                        alt={`${activeSection} mini`}
                        width={300}
                        height={200}
                        className="object-cover flex-1 h-36 object-top"
                    />
                    <h2 className="text-5xl sm:text-6xl md:text-7xl xl:text-[5rem] font-bold font-[TOPLUXURY] text-gray-900">
                        {data.subtitle}
                    </h2>
                </figure>

                <div className="flex flex-col items-start gap-6 w-[36rem]">
                    <p className="text-gray-600 max-w-lg font-[outfit]">{data.description}</p>

                    <div className="flex items-center gap-8 text-lg font-medium text-gray-800">
                        {data.stats.map((stat, idx) => {
                            const [firstWord, ...restWords] = stat.label.split(" ");
                            return (
                                <React.Fragment key={`${stat.value}-${stat.label}`}>
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-bold text-gray-900 font-[TOPLUXURY]">
                                            {stat.value}
                                        </span>
                                        <p className="text-base font-[outfit]">
                                            {firstWord} <br />
                                            {restWords.join(" ")}
                                        </p>
                                    </div>
                                    {idx < data.stats.length - 1 && (
                                        <span className="h-10 border-l border-black" />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        className="bg-[#FFDC91] hover:bg-[#FFDC91] hover:cursor-pointer font-[outfit] text-lg rounded-full p-8 border border-[#FBBC04]"
                    >
                        Explore Nearby Shops
                    </Button>
                </div>
            </div>
        </section>
    );
}