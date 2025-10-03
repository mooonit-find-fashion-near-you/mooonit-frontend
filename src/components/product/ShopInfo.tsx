// components/product/ShopInfo.tsx
import { Star } from "lucide-react";
import { getShopByProductId } from "@/data/mockProducts";

interface ShopInfoProps {
    productId: string;
}

export default function ShopInfo({ productId }: ShopInfoProps) {
    const shop = getShopByProductId(productId);

    return (
        <div className="flex items-center justify-between border border-[#E54B4B] px-5 py-3 rounded-full bg-[#ffffff]">
            <div className="flex items-center space-x-2">
                <svg width="20" height="20" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.4766 7.40469L24.0625 1.74531C23.8891 1.05 23.2641 0.5625 22.5469 0.5625H3.45469C2.7375 0.5625 2.1125 1.05 1.9375 1.74531L0.523438 7.40469C0.507812 7.46563 0.5 7.52969 0.5 7.59375C0.5 9.74687 2.16406 11.5 4.21094 11.5C5.4 11.5 6.46094 10.9078 7.14062 9.98906C7.82031 10.9078 8.88125 11.5 10.0703 11.5C11.2594 11.5 12.3203 10.9078 13 9.98906C13.6797 10.9078 14.7391 11.5 15.9297 11.5C17.1203 11.5 18.1797 10.9078 18.8594 9.98906C19.5391 10.9078 20.5984 11.5 21.7891 11.5C23.8359 11.5 25.5 9.74687 25.5 7.59375C25.5 7.52969 25.4922 7.46563 25.4766 7.40469ZM21.7891 13.0625C20.725 13.0625 19.7141 12.7375 18.8594 12.1437C17.15 13.3328 14.7094 13.3328 13 12.1437C11.2906 13.3328 8.85 13.3328 7.14062 12.1437C6.28594 12.7375 5.275 13.0625 4.21094 13.0625C3.44375 13.0625 2.72031 12.8828 2.0625 12.5766V20.875C2.0625 21.7375 2.7625 22.4375 3.625 22.4375H9.875V16.1875H16.125V22.4375H22.375C23.2375 22.4375 23.9375 21.7375 23.9375 20.875V12.5766C23.2797 12.8828 22.5562 13.0625 21.7891 13.0625Z" fill="#E54B4B" />
                </svg>
                <span className="text-lg text-semibold">{shop?.name ?? ""}</span>
            </div>
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6.5 h-6.5 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
            </div>
        </div>
    );
}