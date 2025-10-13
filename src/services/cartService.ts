// TODO: # AXIOS IMPLEMENTATION

// lib/cartService.ts
export interface CartItem {
    id: number
    name: string
    category: string
    size: string
    price: number
    image: string
    quantity: number
}

class CartService {
    private baseUrl = '/api/cart'

    async getCartItems(): Promise<CartItem[]> {
        const response = await fetch(this.baseUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch cart items')
        }
        return response.json()
    }

    async updateQuantity(itemId: number, quantity: number): Promise<CartItem[]> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'updateQuantity',
                itemId,
                quantity,
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to update quantity')
        }
        return response.json()
    }

    async removeItem(itemId: number): Promise<CartItem[]> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'removeItem',
                itemId,
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to remove item')
        }
        return response.json()
    }

    async addItem(itemId: number): Promise<CartItem[]> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'addItem',
                itemId,
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to add item')
        }
        return response.json()
    }

    async clearCart(): Promise<CartItem[]> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'clearCart',
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to clear cart')
        }
        return response.json()
    }
}

export const cartService = new CartService()