// components/product/SizeSelector.tsx
interface SizeSelectorProps {
    sizes: string[];
    selectedSize: string;
    onSizeChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
    return (
        <div>
            <h3 className="text-lg font-normal text-[#2c2d3a] mb-3">Sizing</h3>
            <div className="flex space-x-2">
                {sizes?.map((size: string) => (
                    <button
                        key={size}
                        onClick={() => onSizeChange(size)}
                        className={`h-12 px-8 cursor-pointer rounded-full border font-medium ${size === selectedSize
                                ? "bg-[#FFDC91] border-[#FBBC04] text-[#2c2d3a]"
                                : "border-black"
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}