// app/api/cart/route.ts
import { NextResponse } from 'next/server'

// Mock data
let cartItems = [
    {
        id: 1,
        name: "Premium T-Shirt",
        category: "Clothing",
        size: "Large",
        price: 999,
        image: "https://picsum.photos/1920/1080?random=1",
        quantity: 1,
    },
    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        size: "Standard",
        price: 2499,
        image: "https://picsum.photos/1920/1080?random=2",
        quantity: 1,
    },
    {
        id: 3,
        name: "Sports Shoes",
        category: "Footwear",
        size: "42",
        price: 1999,
        image: "https://picsum.photos/1920/1080?random=3",
        quantity: 1,
    },
]

export async function GET() {
    await new Promise(resolve => setTimeout(resolve, 300)) // Simulate network delay
    return NextResponse.json(cartItems)
}

export async function POST(request: Request) {
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
        const body = await request.json()
        const { action, itemId, quantity } = body

        switch (action) {
            case 'updateQuantity':
                const itemToUpdate = cartItems.find(item => item.id === itemId)
                if (itemToUpdate) {
                    itemToUpdate.quantity = Math.max(0, quantity)
                    // Remove item if quantity is 0
                    if (itemToUpdate.quantity === 0) {
                        cartItems = cartItems.filter(item => item.id !== itemId)
                    }
                }
                break

            case 'removeItem':
                cartItems = cartItems.filter(item => item.id !== itemId)
                break

            case 'addItem':
                const existingItem = cartItems.find(item => item.id === itemId)
                if (existingItem) {
                    existingItem.quantity += 1
                } else {
                    // In a real app, you'd fetch item details from products API
                    cartItems.push({
                        id: itemId,
                        name: `Product ${itemId}`,
                        category: "General",
                        size: "Medium",
                        price: 999,
                        image: `https://picsum.photos/1920/1080?random=${itemId}`,
                        quantity: 1,
                    })
                }
                break

            case 'clearCart':
                cartItems = []
                break

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
        }

        return NextResponse.json(cartItems)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}