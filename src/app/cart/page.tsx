// app/cart/page.tsx
"use client"

import { CartItem } from "@/components/cart/CartItem"
import { OrderSummary } from "@/components/cart/OrderSummary"
import RecommendedProducts from "@/components/product/RecommendedProducts"
import { useCart } from "@/hooks/useCart"
import { useState, useEffect } from "react"
import { Product } from "@/data/mockProducts"

export default function Page() {
    const {
        items,
        loading,
        error,
        subtotal,
        itemCount,
        updateQuantity,
        removeItem
    } = useCart()

    const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set())
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
    const [productsLoading, setProductsLoading] = useState(true)

    // Fetch recommended products
    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                setProductsLoading(true)
                const response = await fetch('/api/products?limit=10')
                if (response.ok) {
                    const products = await response.json()
                    setRecommendedProducts(products.slice(0, 10)) // Limit to 10 products
                }
            } catch (error) {
                console.error('Failed to fetch recommended products:', error)
            } finally {
                setProductsLoading(false)
            }
        }

        fetchRecommendedProducts()
    }, [])

    const handleQuantityChange = async (itemId: number, quantity: number) => {
        setUpdatingItems(prev => new Set(prev).add(itemId))
        await updateQuantity(itemId, quantity)
        setUpdatingItems(prev => {
            const newSet = new Set(prev)
            newSet.delete(itemId)
            return newSet
        })
    }

    const handleRemoveItem = async (itemId: number) => {
        setUpdatingItems(prev => new Set(prev).add(itemId))
        await removeItem(itemId)
        setUpdatingItems(prev => {
            const newSet = new Set(prev)
            newSet.delete(itemId)
            return newSet
        })
    }

    const handleCheckout = () => {
        alert(`Proceeding to checkout with ${itemCount} items!`)
        // In a real app, navigate to checkout page
    }

    // Calculate order summary values
    const shipping = subtotal > 0 ? 99 : 0
    const tax = subtotal * 0.18 // 18% tax
    const total = subtotal + shipping + tax

    if (loading) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <section className="mx-auto max-w-[96rem] px-4 sm:px-6 pt-10 pb-20">
                    <div className="animate-pulse">
                        <div className="h-12 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8 space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                            <div className="lg:col-span-4">
                                <div className="h-64 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-20">
                    <div className="text-center py-12">
                        <p className="text-lg text-red-600">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-[#e54b4b] text-white rounded-full hover:bg-[#d43c3c]"
                        >
                            Try Again
                        </button>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="min-h-screen text-foreground">
            <section className="mx-auto max-w-[96rem] px-4 sm:px-6 pt-10 pb-20">
                <h1 className="text-pretty text-3xl sm:text-4xl md:text-5xl font-normal font-[TOPLUXURY] text-[#2c2d3a] mb-6">
                    My cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-[outfit]">
                    {/* Left: Cart items */}
                    <div className="lg:col-span-8">
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-lg text-[#757575]">Your cart is empty</p>
                                <button
                                    onClick={() => window.history.back()}
                                    className="px-6 py-3 rounded-full bg-[#FFDC91] border border-[#FBBC04] font-[outfit] text-base font-semibold cursor-pointer mt-4"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-(--color-border) bg-transparent">
                                {items.map((item, idx) => (
                                    <div key={item.id} className="p-4 sm:p-6">
                                        <CartItem
                                            item={item}
                                            onQuantityChange={handleQuantityChange}
                                            onRemove={handleRemoveItem}
                                            updating={updatingItems.has(item.id)}
                                        />
                                        {idx !== items.length - 1 && <div className="mt-6 h-px w-full bg-(--color-border)" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-4">
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            total={total}
                            itemCount={itemCount}
                            onCheckout={handleCheckout}
                        />
                    </div>
                </div>
            </section>

            {/* Show recommended products only when cart has items */}
            {items.length > 0 && (
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6">
                    {productsLoading ? (
                        <div className="animate-pulse mb-12">
                            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <RecommendedProducts products={recommendedProducts} />
                    )}
                </div>
            )}
        </main>
    )
}