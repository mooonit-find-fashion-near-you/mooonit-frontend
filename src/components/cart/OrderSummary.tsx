// components/cart/OrderSummary.tsx
"use client"

import { Tag } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface OrderSummaryProps {
    subtotal: number
    shipping: number
    tax: number
    total: number
    itemCount: number
    onCheckout?: () => void
}

export function OrderSummary({ subtotal, shipping, tax, total, itemCount, onCheckout }: OrderSummaryProps) {
    const [code, setCode] = useState("")
    const [applyingPromo, setApplyingPromo] = useState(false)

    const handleApplyPromo = async () => {
        if (!code.trim()) return

        setApplyingPromo(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setApplyingPromo(false)
        // In a real app, you'd apply the discount here
    }

    const handleCheckout = () => {
        if (onCheckout) {
            onCheckout()
        }
    }

    return (
        <aside aria-label="Order Summary" className="space-y-6 font-[outfit]">
            <h2 className="text-2xl md:text-3xl font-normal text-[#2c2d3a] font-[TOPLUXURY]">Order Summary</h2>

            <div className="space-y-3 text-[#2c2d3a]">
                <Row label="Subtotal" value={`₹${subtotal.toLocaleString("en-IN")}`} />
                <Row label="Shipping" value={`₹${shipping.toLocaleString("en-IN")}`} />
                <Row label="Tax" value={`₹${tax.toLocaleString("en-IN")}`} />
                <Row
                    label={<span className="font-semibold">Total</span>}
                    value={<span className="font-semibold">{`₹${total.toLocaleString("en-IN")}`}</span>}
                />
            </div>

            {/* Promo code */}
            <div className="flex items-stretch gap-3">
                <div className="flex-1 flex items-center gap-2 bg-white border border-[#757575] rounded-full px-4 h-13">
                    <Tag className="size-5 text-[#757575]" />
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Add promo code"
                        className="flex-1 bg-transparent outline-none text-[#2c2d3a] placeholder:text-[#808080]"
                        aria-label="Promo code"
                        disabled={applyingPromo}
                    />
                </div>
                <button
                    onClick={handleApplyPromo}
                    disabled={applyingPromo || !code.trim()}
                    className="h-12 px-6 rounded-full bg-[#FFDC91] border border-[#FBBC04] text-[#1d1d1d] font-medium hover:brightness-95 disabled:opacity-75 disabled:cursor-not-allowed"
                    aria-label="Apply promo code"
                >
                    {applyingPromo ? 'Applying...' : 'Apply'}
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