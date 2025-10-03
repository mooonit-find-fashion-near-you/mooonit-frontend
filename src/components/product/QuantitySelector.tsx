// components/product/QuantitySelector.tsx
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (change: number) => void;
}

export default function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
    return (
        <div className="flex items-center border border-[#e7e7e7] rounded-full px-2">
            <button
                className="p-2 hover:bg-[#f0f0f0] rounded-full cursor-pointer"
                onClick={() => onQuantityChange(-1)}
            >
                <Minus className="w-4 h-4 text-[#757575]" />
            </button>
            <span className="px-4 py-2 text-[#2c2d3a] font-medium">{quantity}</span>
            <button
                className="p-2 hover:bg-[#f0f0f0] rounded-full cursor-pointer"
                onClick={() => onQuantityChange(1)}
            >
                <Plus className="w-4 h-4 text-[#757575]" />
            </button>
        </div>
    );
}