"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
    id: string | undefined
    image: string
    imageAlt: string
    overlayText: string
    title: string
    description: string
    price: string
    onAddToCart?: () => Promise<void> | void
}

export default function ProductCard({
    id,
    image,
    imageAlt,
    overlayText,
    title,
    description,
    price,
    onAddToCart
}: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false)
    const [isInCart, setIsInCart] = useState(false)

    const handleAddToCart = async () => {
        if (isAdding || isInCart) return

        setIsAdding(true)
        try {
            // Call the API via the parent component's function
            if (onAddToCart) {
                await onAddToCart()
            }
            // If successful, update the button state
            setIsInCart(true)
        } catch (error) {
            console.error('Failed to add to cart:', error)
            // Handle error state if needed
        } finally {
            setIsAdding(false)
        }
    }

    // Add a fallback image or conditionally render
    const imageSrc = image && image.trim() !== '' ? image : `https://picsum.photos/1920/1080?random=${Math.floor(Math.random() * 1000)}`;

    return (
        <div className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-lg max-w-md">
            <Link href={`/products/${id}`} className="block relative">
                {imageSrc && (
                    <>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            width={400}
                            height={400}
                            className="aspect-square object-cover rounded-3xl"
                            priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 w-full h-1/2 bg-gradient-to-t from-black/55 rounded-b-3xl"></div>
                        <div className="absolute bottom-6 left-6 flex items-center gap-3">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M20.4812 6.25571L19.35 1.08143C19.2113 0.445714 18.7113 0 18.1375 0H2.86375C2.29 0 1.79 0.445714 1.65 1.08143L0.51875 6.25571C0.50625 6.31143 0.5 6.37 0.5 6.42857C0.5 8.39714 1.83125 10 3.46875 10C4.42 10 5.26875 9.45857 5.8125 8.61857C6.35625 9.45857 7.205 10 8.15625 10C9.1075 10 9.95625 9.45857 10.5 8.61857C11.0437 9.45857 11.8912 10 12.8438 10C13.7963 10 14.6438 9.45857 15.1875 8.61857C15.7312 9.45857 16.5788 10 17.5312 10C19.1688 10 20.5 8.39714 20.5 6.42857C20.5 6.37 20.4937 6.31143 20.4812 6.25571ZM17.5312 11.4286C16.68 11.4286 15.8713 11.1314 15.1875 10.5886C13.82 11.6757 11.8675 11.6757 10.5 10.5886C9.1325 11.6757 7.18 11.6757 5.8125 10.5886C5.12875 11.1314 4.32 11.4286 3.46875 11.4286C2.855 11.4286 2.27625 11.2643 1.75 10.9843V18.5714C1.75 19.36 2.31 20 3 20H8V14.2857H13V20H18C18.69 20 19.25 19.36 19.25 18.5714V10.9843C18.7237 11.2643 18.145 11.4286 17.5312 11.4286Z"
                                    fill="#e54b4b"
                                />
                            </svg>
                            <span className="text-white text-3xl font-medium font-[TOPLUXURY]">
                                {overlayText}
                            </span>
                        </div>
                    </>
                )}
            </Link>

            <div className="p-6">
                <Link href={`/products/${id}`}>
                    <h2 className="text-[#2c2d3a] text-2xl font-semibold mb-3 font-[TOPLUXURY]">
                        {title}
                    </h2>
                </Link>

                <p className="text-[#808080] text-base leading-relaxed mb-4 font-[outfit]">
                    {description}
                </p>
                <div className="text-[#e54b4b] text-xl font-semibold mb-6 font-[TOPLUXURY]">
                    {price}
                </div>

                {isInCart ? (
                    <Link href="/cart" className="block">
                        <Button
                            className="w-full cursor-pointer font-[outfit] bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
                        >
                            <svg
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.5 14.5H15.5C16.0523 14.5 16.5 14.0523 16.5 13.5V7.5C16.5 6.94772 16.0523 6.5 15.5 6.5H8.5C7.94772 6.5 7.5 6.94772 7.5 7.5V13.5C7.5 14.0523 7.94772 14.5 8.5 14.5Z"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.5 9.5V11.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.5 7.5V5.5C7.5 4.96957 7.71071 4.46086 8.08579 4.08579C8.46086 3.71071 8.96957 3.5 9.5 3.5H11.5C12.0304 3.5 12.5391 3.71071 12.9142 4.08579C13.2893 4.46086 13.5 4.96957 13.5 5.5V7.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            View Cart
                        </Button>
                    </Link>
                ) : (
                    <Button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="w-full cursor-pointer font-[outfit] bg-[#ffdc91] hover:bg-[#fbbc04] text-[#2c2d3a] font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAdding ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#2c2d3a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            <>
                                <svg
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.041 6.5V4.75M14.041 4.75H17.541L18.416 18.75H2.66602L3.54102 4.75H7.04102M14.041 4.75C14.041 3.82174 13.6723 2.9315 13.0159 2.27513C12.3595 1.61875 11.4693 1.25 10.541 1.25C9.61276 1.25 8.72252 1.61875 8.06614 2.27513C7.40976 2.9315 7.04102 3.82174 7.04102 4.75M14.041 4.75H7.04102M7.04102 4.75V6.5"
                                        stroke="#2C2D3A"
                                        strokeWidth="1.66667"
                                        strokeMiterlimit="10"
                                    />
                                </svg>
                                Add To Cart
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    )
}