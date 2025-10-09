// components/cart/QuantityStepper.tsx
"use client"

interface QuantityStepperProps {
    value: number
    onQuantityChange: (quantity: number) => void
    min?: number
    disabled?: boolean
}

export function QuantityStepper({ value, onQuantityChange, min = 1, disabled = false }: QuantityStepperProps) {
    const decrement = () => onQuantityChange(Math.max(min, value - 1))
    const increment = () => onQuantityChange(value + 1)

    return (
        <div
            className="inline-flex items-center gap-4 bg-white text-[#2c2d3a] rounded-full px-4 h-11 border border-[#e7e7e7] shadow-sm"
            role="group"
            aria-label="Quantity"
        >
            <button
                onClick={decrement}
                disabled={disabled || value <= min}
                className="size-8 rounded-full grid place-items-center border border-[#e7e7e7] hover:bg-[#f0f0f0] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
                type="button"
            >
                <span aria-hidden="true">−</span>
            </button>
            <span className="min-w-4 text-center select-none">{value}</span>
            <button
                onClick={increment}
                disabled={disabled}
                className="size-8 rounded-full grid place-items-center border border-[#e7e7e7] hover:bg-[#f0f0f0] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
                type="button"
            >
                <span aria-hidden="true">+</span>
            </button>
        </div>
    )
}