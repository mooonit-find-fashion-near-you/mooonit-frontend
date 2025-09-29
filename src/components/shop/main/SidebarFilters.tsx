import { Slider } from "@/components/ui/slider";

interface SidebarFiltersProps {
    activeCategory: string;
    selectedSection: string;
    selectedSizes: string[];
    priceRange: number[];
    categoryOptions: { value: string; label: string; count?: number }[];
    getProductCount: (categorySlug: string) => number;
    onCategoryChange: (category: string) => void;
    onSizeToggle: (size: string) => void;
    onPriceChange: (value: number[]) => void;
    // New props for dynamic price range
    minPrice: number;
    maxPrice: number;
}

export default function SidebarFilters({
    activeCategory,
    selectedSizes,
    priceRange,
    categoryOptions,
    getProductCount,
    onCategoryChange,
    onSizeToggle,
    onPriceChange,
    minPrice,
    maxPrice,
}: SidebarFiltersProps) {
    const sizeOptions = ["S", "M", "L", "XL", "XXL"];

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
                            className={`flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100 ${activeCategory === category.value ? "bg-gray-200 font-medium" : ""
                                }`}
                            onClick={() => onCategoryChange(category.value)}
                        >
                            <span
                                className={`${activeCategory === category.value
                                    ? "text-black"
                                    : "text-[#757575] hover:text-black"
                                    }`}
                            >
                                {category.label}
                            </span>
                            <span
                                className={`text-sm ${activeCategory === category.value
                                    ? "text-black"
                                    : "text-[#757575]"
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
                                onValueChange={onPriceChange}
                                min={minPrice}
                                max={maxPrice}
                                step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))} // Dynamic step size
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