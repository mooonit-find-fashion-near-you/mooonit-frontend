"use client";

import Image from "next/image";
import { heroData } from "@/data/heroData";
import { Button } from "./ui/button";

export default function HeroSection({ activeSection }: { activeSection: string }) {
    const data = heroData[activeSection] || heroData["Women"];

    return (
        <section className="max-w-[89rem] h-[45rem] relative mx-auto bg-[#F9FAFB] py-9 px-8 flex flex-row gap-8">
            {/* Left Image */}
            <figure className="w-5/12">
                <Image
                    src={data.mainImage}
                    alt={activeSection}
                    width={600}
                    height={600}
                    className="object-cover object-[70%] w-full h-full"
                />
            </figure>

            {/* Right Content */}
            <div className="flex-1 flex flex-col space-y-6 right-0 items-end">
                {/* Heading */}
                <h1 className="text-[5rem] font-bold font-[TOPLUXURY] top-16 text-gray-900 absolute leading-tight flex flex-col items-end">
                    {data.title}
                </h1>

                {/* Highlighted Image */}
                <figure className="flex items-center mt-40 gap-11 w-full">
                    <Image
                        src={data.miniImage}
                        alt={`${activeSection} mini`}
                        width={300}
                        height={200}
                        className="object-cover flex-1 h-36 object-top"
                    />
                    <h1 className="text-gray-900 text-[5rem] font-bold font-[TOPLUXURY]">{data.subtitle}</h1>
                </figure>

                <div className="flex flex-col items-start gap-6 w-[36rem]">
                    {/* Paragraph */}
                    <p className="text-gray-600 max-w-lg font-[outfit]">{data.description}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-8 text-lg font-medium text-gray-800">
                        {data.stats.map((stat, idx) => {
                            // split the label once for readability and performance
                            const [firstWord, ...rest] = stat.label.split(" ")
                            const restLabel = rest.join(" ")

                            return (
                                <div key={stat.value + "-" + idx} className="flex items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-bold text-gray-900 font-[TOPLUXURY]">{stat.value}</span>
                                        <p className="text-base font-[outfit]">
                                            {firstWord} <br />
                                            {restLabel}
                                        </p>
                                    </div>
                                    {idx < data.stats.length - 1 && (
                                        <span className="h-10 border-l border-black" aria-hidden />
                                    )}
                                </div>
                            )
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
