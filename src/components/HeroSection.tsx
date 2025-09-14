"use client";

import Image from "next/image";
import { heroData } from "@/data/heroData";

export default function HeroSection({ activeSection }: { activeSection: string }) {
    const data = heroData[activeSection] || heroData["Women"];

    return (
        <section className="w-full bg-[#F9FAFB] py-12 px-8 flex flex-col lg:flex-row items-center gap-12">
            {/* Left Image */}
            <div className="flex-1 flex justify-center">
                <Image
                    src={data.mainImage}
                    alt={activeSection}
                    width={500}
                    height={600}
                    className="object-cover"
                />
            </div>

            {/* Right Content */}
            <div className="flex-1 space-y-6">
                {/* Heading */}
                <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
                    {data.title} <br /> <span className="text-gray-900">{data.subtitle}</span>
                </h1>

                {/* Highlighted Image */}
                <div className="bg-[#FFDC91] p-4 w-fit">
                    <Image
                        src={data.miniImage}
                        alt={`${activeSection} mini`}
                        width={300}
                        height={200}
                        className="object-cover"
                    />
                </div>

                {/* Paragraph */}
                <p className="text-gray-600 max-w-lg">{data.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-12 text-lg font-medium text-gray-800">
                    {data.stats.map((stat, idx) => (
                        <div key={idx}>
                            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>

                <button className="px-6 py-3 rounded-full bg-[#FBBC04] text-gray-900 font-semibold hover:bg-[#f0aa02] transition">
                    Explore Nearby Shops
                </button>
            </div>
        </section>
    );
}
