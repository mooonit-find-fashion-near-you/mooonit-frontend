// components/ShopHero.tsx
import Image from "next/image";
import { Shop } from "@/data/shops";

interface ShopHeroProps {
    shop: Shop;
}

export default function ShopHero({ shop }: ShopHeroProps) {
    return (
        <div className="relative max-w-[95rem] h-[36rem] mx-auto mt-12">
            <figure>
                <Image
                    src={shop.image}
                    alt={shop.title}
                    fill
                    className="object-cover"
                    priority
                />
            </figure>
            <div className="absolute left-0 bg-gradient-to-r from-black/70 to-transparent w-1/2 h-full"></div>
            <figcaption className="absolute top-5/12 transform -translate-y-1/2 left-18 text-white flex flex-col items-start">
                <h1 className="text-[5.5rem] font-normal mb-2 uppercase font-[TOPLUXURY]">
                    {shop.title}
                </h1>
                <p className="flex items-center justify-center gap-2 font-[outfit] text-xl">
                    <svg width="15" height="15" className="text-[#4285f4]" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.7063 0.590088C18.6617 0.239561 19.585 1.18109 19.2413 2.15421L13.2054 19.2495C12.8306 20.3123 11.3646 20.3327 10.9609 19.2801L8.13385 11.915L0.91078 9.0333C-0.120516 8.62164 -0.10053 7.1268 0.94076 6.74367L17.7063 0.589069V0.590088Z" fill="#4285F4" />
                    </svg>
                    {shop.location}
                </p>
            </figcaption>
        </div>
    );
}