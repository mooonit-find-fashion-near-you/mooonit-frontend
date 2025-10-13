// hooks/useCart.ts
"use client"

import { useState, useEffect } from 'react'
import { CartItem, cartService } from '@/services/cartService'

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Load cart items on mount
    useEffect(() => {
        loadCartItems()
    }, [])

    const loadCartItems = async () => {
        try {
            setLoading(true)
            setError(null)
            const cartItems = await cartService.getCartItems()
            setItems(cartItems)
        } catch (err) {
            setError('Failed to load cart items')
            console.error('Error loading cart:', err)
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (itemId: number, quantity: number) => {
        try {
            setError(null)
            const updatedItems = await cartService.updateQuantity(itemId, quantity)
            setItems(updatedItems)
        } catch (err) {
            setError('Failed to update quantity')
            console.error('Error updating quantity:', err)
            // Revert optimistic update by reloading
            await loadCartItems()
        }
    }

    const removeItem = async (itemId: number) => {
        try {
            setError(null)
            const updatedItems = await cartService.removeItem(itemId)
            setItems(updatedItems)
        } catch (err) {
            setError('Failed to remove item')
            console.error('Error removing item:', err)
            await loadCartItems()
        }
    }

    const addItem = async (itemId: number) => {
        try {
            setError(null)
            const updatedItems = await cartService.addItem(itemId)
            setItems(updatedItems)
        } catch (err) {
            setError('Failed to add item')
            console.error('Error adding item:', err)
            await loadCartItems()
        }
    }

    const clearCart = async () => {
        try {
            setError(null)
            const updatedItems = await cartService.clearCart()
            setItems(updatedItems)
        } catch (err) {
            setError('Failed to clear cart')
            console.error('Error clearing cart:', err)
            await loadCartItems()
        }
    }

    // Calculate cart totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return {
        items,
        loading,
        error,
        subtotal,
        itemCount,
        updateQuantity,
        removeItem,
        addItem,
        clearCart,
        refresh: loadCartItems,
    }
}