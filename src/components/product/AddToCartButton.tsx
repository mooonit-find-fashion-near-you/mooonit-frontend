// components/product/AddToCartButton.tsx
import { Button } from "@/components/ui/button";

export default function AddToCartButton() {
    return (
        <Button className="flex-1 bg-[#ffcfcc] text-[#E54B4B] border border-[#E54B4B] hover:bg-[#ffcfcc] cursor-pointer py-6 rounded-full max-w-1/2">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.041 6.5V4.75M14.041 4.75H17.541L18.416 18.75H2.66602L3.54102 4.75H7.04102M14.041 4.75C14.041 3.82174 13.6723 2.9315 13.0159 2.27513C12.3595 1.61875 11.4693 1.25 10.541 1.25C9.61276 1.25 8.72252 1.61875 8.06614 2.27513C7.40976 2.9315 7.04102 3.82174 7.04102 4.75M14.041 4.75H7.04102M7.04102 4.75V6.5" stroke="#E54B4B" strokeWidth="1.66667" strokeMiterlimit="10" />
            </svg>
            Add To Cart
        </Button>
    );
}