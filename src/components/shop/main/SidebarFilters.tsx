// components/SidebarFilters.tsx
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback } from "react";

interface SidebarFiltersProps {
    selectedCategories: string[];
    selectedSection: string;
    selectedSizes: string[];
    priceRange: number[];
    categoryOptions: { value: string; label: string; count?: number }[];
    getProductCount: (categorySlug: string) => number;
    onCategoryToggle: (category: string) => void;
    onSizeToggle: (size: string) => void;
    onPriceChange: (value: number[]) => void;
    minPrice: number;
    maxPrice: number;
}

export default function SidebarFilters({
    selectedCategories,
    selectedSizes,
    priceRange,
    categoryOptions,
    getProductCount,
    onCategoryToggle,
    onSizeToggle,
    onPriceChange,
    minPrice,
    maxPrice,
}: SidebarFiltersProps) {
    const sizeOptions = ["S", "M", "L", "XL", "XXL"];

    // Stable price change handler
    const handlePriceChange = useCallback((value: number[]) => {
        // Only update if values actually changed
        if (value[0] !== priceRange[0] || value[1] !== priceRange[1]) {
            onPriceChange(value);
        }
    }, [onPriceChange, priceRange]);

    return (
        <aside className="w-64 space-y-6">
            {/* Size Filter */}
            <div>
                <h3 className="font-normal text-2xl font-[TOPLUXURY] mb-3">Size</h3>
                <div className="space-y-2">
                    {sizeOptions.map((size) => (
                        <div
                            key={size}
                            className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100"
                            onClick={() => onSizeToggle(size)}
                        >
                            <span
                                className={`${selectedSizes.includes(size)
                                    ? "font-medium text-black"
                                    : "text-[#757575]"
                                    }`}
                            >
                                {size}
                            </span>
                            <span
                                className={`text-sm ${selectedSizes.includes(size) ? "text-black" : "text-[#757575]"
                                    }`}
                            >
                                {selectedSizes.includes(size) ? "✓" : ""}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div>
                <h3 className="font-medium mb-3 font-[TOPLUXURY] text-2xl">
                    Categories
                </h3>
                <div className="space-y-2">
                    {categoryOptions.map((category) => (
                        <div
                            key={category.value}
                            className={`flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100 ${category.value === 'all'
                                    ? (selectedCategories.length === 0 ? "bg-gray-200 font-medium" : "")
                                    : (selectedCategories.includes(category.value) ? "bg-gray-200 font-medium" : "")
                                }`}
                            onClick={() => onCategoryToggle(category.value)}
                        >
                            <div className="flex items-center gap-2">
                                {category.value === 'all' ? (
                                    <div className={`w-4 h-4 border rounded-sm ${selectedCategories.length === 0
                                            ? 'bg-black border-black'
                                            : 'border-gray-400'
                                        }`}>
                                        {selectedCategories.length === 0 && (
                                            <svg className="w-3 h-3 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                ) : (
                                    <Checkbox
                                        checked={selectedCategories.includes(category.value)}
                                        className="h-4 w-4 data-[state=checked]:bg-black data-[state=checked]:border-black"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}
                                <span
                                    className={`${category.value === 'all'
                                            ? (selectedCategories.length === 0 ? "text-black" : "text-[#757575] hover:text-black")
                                            : (selectedCategories.includes(category.value) ? "text-black" : "text-[#757575] hover:text-black")
                                        }`}
                                >
                                    {category.label}
                                </span>
                            </div>
                            <span
                                className={`text-sm ${category.value === 'all'
                                        ? (selectedCategories.length === 0 ? "text-black" : "text-[#757575]")
                                        : (selectedCategories.includes(category.value) ? "text-black" : "text-[#757575]")
                                    }`}
                            >
                                ({getProductCount(category.value)})
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div>
                <h3 className="font-medium mb-3 font-[TOPLUXURY] text-2xl">Price</h3>
                <div className="space-y-4">
                    {/* Only render slider if we have valid price range */}
                    {minPrice < maxPrice && (
                        <>
                            <Slider
                                value={priceRange}
                                onValueChange={handlePriceChange}
                                min={minPrice}
                                max={maxPrice}
                                step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-[#757575]">
                                <span>₹{priceRange[0].toLocaleString()}.00</span>
                                <span>₹{priceRange[1].toLocaleString()}.00</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}