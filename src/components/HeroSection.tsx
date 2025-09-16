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
                <h1 className="text-[5rem] font-bold top-16 text-gray-900 absolute leading-tight flex flex-col items-end">
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
                    <span className="text-gray-900 text-[5rem] font-bold">{data.subtitle}</span>
                </figure>

                <div className="flex flex-col items-start gap-6 w-[36rem]">
                    {/* Paragraph */}
                    <p className="text-gray-600 max-w-lg">{data.description}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-8 text-lg font-medium text-gray-800">
                        {data.stats.map((stat, idx) => (
                            <>
                                <div key={idx} className="flex items-center gap-4">
                                    <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
                                    <p>
                                        {stat.label.split(" ")[0]} <br />
                                        {stat.label.split(" ").slice(1).join(" ")}
                                    </p>
                                </div>
                                {idx < data.stats.length - 1 && (
                                    <span key={`sep-${idx}`} className="h-10 border-l border-black" />
                                )}
                            </>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        className="bg-[#FFDC91] hover:bg-[#FFDC91] hover:cursor-pointer rounded-full px-8 py-6 border border-[#FBBC04]"
                        >
                        Explore Nearby Shops
                    </Button>
                </div>
            </div>
        </section>
    );
}
