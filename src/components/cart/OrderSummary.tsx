// components/cart/OrderSummary.tsx
"use client"

import { Tag, ChevronDown } from "lucide-react"
import React, { useState } from "react"
import { Button } from "../ui/button"

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"

import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"

interface OrderSummaryProps {
    subtotal: number
    shipping: number
    tax: number
    total: number
    itemCount: number
    onCheckout?: () => void
}

export function OrderSummary({
    subtotal,
    shipping,
    tax,
    total,
    itemCount,
    onCheckout,
}: OrderSummaryProps) {
    const [code, setCode] = useState("")
    const [applyingPromo, setApplyingPromo] = useState(false)
    const promoCodes = ["WELCOME10", "FREESHIP", "DIWALI20"]

    const handleApplyPromo = async () => {
        if (!code.trim()) return
        setApplyingPromo(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setApplyingPromo(false)
        // In a real app, you'd apply the discount here
    }

    const handleCheckout = () => {
        if (onCheckout) onCheckout()
    }

    return (
        <aside
            aria-label="Order Summary"
            className="space-y-6 font-[outfit] sticky top-4"
        >
            <h2 className="text-2xl md:text-3xl font-normal text-[#2c2d3a] w-full border-b pb-3 border-[#808080] font-[TOPLUXURY]">
                Order Summary
            </h2>

            <div className="space-y-3 text-[#2c2d3a]">
                <Row
                    label={<span className="font-medium text-xl font-[TOPLUXURY]">SubTotal</span>}
                    value={<span className="font-medium text-xl">{`₹${total.toLocaleString("en-IN")}`}</span>}
                />
            </div>

            {/* Promo code with dropdown */}
            <div className="flex items-stretch gap-3">
                <div className="flex-1 flex items-center gap-2 bg-white border border-[#757575] rounded-full px-4 h-13 relative">
                    <Tag className="size-5 text-[#757575]" />
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Add promo code"
                        className="flex-1 bg-transparent outline-none text-[#2c2d3a] placeholder:text-[#808080]"
                        aria-label="Promo code"
                        disabled={applyingPromo}
                    />

                    {/* ✅ Dropdown of promos */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                className="flex items-center gap-1 text-[#757575] hover:text-[#2c2d3a] focus:outline-none"
                                aria-label="Select promo code"
                            >
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[180px] bg-white border rounded-xl shadow-md p-2">
                            <ul className="space-y-1">
                                {promoCodes.map((promo) => (
                                    <li
                                        key={promo}
                                        className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-1"
                                        onClick={() => setCode(promo)}
                                    >
                                        {promo}
                                    </li>
                                ))}
                            </ul>
                        </PopoverContent>
                    </Popover>
                </div>

                <button
                    onClick={handleApplyPromo}
                    disabled={applyingPromo || !code.trim()}
                    className="h-12 px-6 rounded-full bg-[#FFDC91] border border-[#FBBC04] text-[#1d1d1d] font-medium hover:brightness-95 disabled:opacity-75 disabled:cursor-not-allowed"
                    aria-label="Apply promo code"
                >
                    {applyingPromo ? "Applying..." : "Apply"}
                </button>
            </div>

            {/* Checkout CTA */}
            <button
                onClick={handleCheckout}
                disabled={itemCount === 0}
                className="w-full h-14 rounded-full bg-[#e54b4b]/20 text-[#e54b4b] border border-[#e54b4b] font-semibold hover:bg-[#e54b4b]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Proceed to checkout"
            >
                Proceed to checkout
            </button>

            <div className="mx-auto w-fit shadow-xl gap-4 py-3 px-6 z-10 bg-[#fefefe] border border-[#757575] rounded-full flex items-center justify-between">
                <span>No hidden charges on Mooonit!</span>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            variant="outline"
                            className="text-[#2c2d3a] bg-[#f0f0f0] border-1 rounded-full cursor-pointer scale-y-95"
                            aria-label="View detailed bill"
                        >
                            View Bill
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="bg-gradient-to-br from-[#fffaf3] to-[#fffefc] border-t border-[#d1d1d1]/60 shadow-2xl rounded-t-3xl backdrop-blur-lg">
                        <DrawerHeader className="text-center space-y-1 pt-5">
                            <DrawerTitle className="text-2xl font-[TOPLUXURY] tracking-wide text-[#1f1f1f]">
                                Your Detailed Bill
                            </DrawerTitle>
                            <DrawerDescription className="text-[#5f5f5f] text-base">
                                A transparent breakdown of your Mooonit order
                            </DrawerDescription>
                        </DrawerHeader>

                        {/* Bill Card */}
                        <div className="mx-auto mt-5 mb-8 max-w-md w-full bg-white/60 backdrop-blur-md shadow-md border border-[#e0e0e0] rounded-2xl p-6 space-y-4 font-[outfit]">
                            <Row
                                label={<span className="text-[#3a3a3a]">Subtotal</span>}
                                value={<span className="text-[#3a3a3a]">{`₹${subtotal.toLocaleString("en-IN")}`}</span>}
                            />
                            <Row
                                label={<span className="text-[#3a3a3a]">Shipping</span>}
                                value={<span className="text-[#3a3a3a]">{`₹${shipping.toLocaleString("en-IN")}`}</span>}
                            />
                            <Row
                                label={<span className="text-[#3a3a3a]">Tax</span>}
                                value={<span className="text-[#3a3a3a]">{`₹${tax.toLocaleString("en-IN")}`}</span>}
                            />

                            <hr className="border-[#dcdcdc]" />

                            <Row
                                label={<span className="font-semibold text-lg text-[#1a1a1a] font-[TOPLUXURY]">Total</span>}
                                value={<span className="font-semibold text-lg text-[#e54b4b]">{`₹${total.toLocaleString("en-IN")}`}</span>}
                            />
                        </div>

                        <DrawerFooter className="pb-6 flex flex-col items-center gap-2">
                            <p className="text-sm text-[#6d6d6d]">No hidden charges. 100% transparency.</p>
                            <DrawerClose asChild>
                                <Button
                                    variant="outline"
                                    className="rounded-full w-32 border-[#d1d1d1] text-[#2c2d3a] hover:bg-[#f5f5f5]"
                                >
                                    Close
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </aside>
    )
}

function Row({
    label,
    value,
}: {
    label: React.ReactNode
    value: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="text-base">{label}</div>
            <div className="text-base">{value}</div>
        </div>
    )
}
