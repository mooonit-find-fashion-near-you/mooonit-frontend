// components/SidebarFilters.tsx
import { Slider } from "@/components/ui/slider";
import { subCategoriesData } from "@/data/subCategoriesData";

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
}

export default function SidebarFilters({ activeCategory, selectedSection, selectedSizes, priceRange, categoryOptions, getProductCount, onCategoryChange, onSizeToggle, onPriceChange }: SidebarFiltersProps) {
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
                            <span className={`${selectedSizes.includes(size) ? 'font-medium text-black' : 'text-[#757575]'}`}>
                                {size}
                            </span>
                            <span className={`text-sm ${selectedSizes.includes(size) ? 'text-black' : 'text-[#757575]'}`}>
                                {selectedSizes.includes(size) ? '✓' : ''}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Filter */}
            <div>
                <h3 className="font-medium mb-3 font-[TOPLUXURY] text-2xl">
                    {activeCategory === "all" ? "All Categories" : "Other Categories"}
                </h3>
                <div className="space-y-2">
                    {categoryOptions
                        .filter(category => category.value !== activeCategory)
                        .map((category) => (
                            <div
                                key={category.value}
                                className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100"
                                onClick={() => onCategoryChange(category.value)}
                            >
                                <span className="text-[#757575] hover:text-black">
                                    {category.label}
                                </span>
                                <span className="text-[#757575] text-sm">
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
                    <Slider
                        value={priceRange}
                        onValueChange={onPriceChange}
                        max={10000}
                        step={100}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#757575]">
                        <span>Rs. {priceRange[0].toLocaleString()}</span>
                        <span>Rs. {priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}