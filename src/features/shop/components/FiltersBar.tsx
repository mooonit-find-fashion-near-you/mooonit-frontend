// components/FiltersBar.tsx
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue, } from "@/components/ui/select";

interface FiltersBarProps {
    activeCategory: string;
    selectedSizes: string[];
    priceRange: number[];
    categoryOptions: { value: string; label: string; count?: number }[];
    getSelectedCategoryName: () => string;
    getProductCount: (categorySlug: string) => number;
    onCategoryChange: (category: string) => void;
    onClearFilters: () => void;
}

export default function FiltersBar({ activeCategory, selectedSizes, priceRange, categoryOptions, getSelectedCategoryName, getProductCount, onCategoryChange, onClearFilters }: FiltersBarProps) {
    const hasActiveFilters = activeCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 10000 || selectedSizes.length > 0;

    return (
        <div className="mt-15 px-4 py-3 max-w-[95rem] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="font-normal text-2xl font-[TOPLUXURY]">Filters</span>

                <Select value={activeCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger className="w-64 bg-[#ffdc91] border-[#ffdc91] hover:bg-[#fbbc04] focus:ring-2 focus:ring-[#fbbc04] text-sm font-medium">
                        <SelectValue>
                            <div className="flex items-center justify-between w-full">
                                <span>{getSelectedCategoryName()}</span>
                                <span className="text-xs bg-white/30 px-2 py-1 rounded">
                                    {getProductCount(activeCategory)} products
                                </span>
                            </div>
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-[#ffdc91]">
                        {categoryOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="flex items-center justify-between py-3 cursor-pointer hover:bg-[#ffdc91]/30 focus:bg-[#ffdc91]/30"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span>{option.label}</span>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">
                                        {getProductCount(option.value)}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearFilters}
                        className="flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Clear Filters
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-4 text-[#757575] font-[TOPLUXURY] text-xl">
                <span>All</span>
                <span>I</span>
                <span className="bg-[#fbbc04] px-2 py-1 rounded">N</span>
                <span>XXI</span>
            </div>
        </div>
    );
}