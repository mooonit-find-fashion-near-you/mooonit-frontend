import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { getSelectedCategoriesCount } from "@/utils/categoryUtils";

interface FiltersBarProps {
    selectedCategories: string[];
    selectedSizes: string[];
    priceRange: number[];
    categoryOptions: { value: string; label: string; count?: number }[];
    getSelectedCategoryNames: () => string;
    getProductCount: (categorySlug: string) => number;
    onCategoryToggle: (category: string) => void;
    onClearFilters: () => void;
}

export default function FiltersBar({
    selectedCategories,
    selectedSizes,
    priceRange,
    categoryOptions,
    getSelectedCategoryNames,
    getProductCount,
    onCategoryToggle,
    onClearFilters
}: FiltersBarProps) {
    const hasActiveFilters = selectedCategories.length > 0 ||
        priceRange[0] > 0 ||
        priceRange[1] < 10000 ||
        selectedSizes.length > 0;

    // Calculate total products for selected categories
    const categoryCounts: Record<string, number> = {};
    categoryOptions.forEach(option => {
        if (option.value !== 'all') {
            categoryCounts[option.value] = option.count || 0;
        }
    });

    const selectedProductCount = getSelectedCategoriesCount(selectedCategories, categoryCounts);

    return (
        <div className="mt-15 px-4 py-3 max-w-[95rem] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="font-normal text-2xl font-[TOPLUXURY]">Filters</span>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-fit bg-[#ffdc91] border-[#ffdc91] hover:bg-[#fbbc04] focus:ring-2 focus:ring-[#fbbc04] text-sm font-medium"
                        >
                            <div className="flex items-center justify-between w-full gap-2">
                                <span>{getSelectedCategoryNames()}</span>
                                <span className="text-xs bg-white/30 px-2 py-1 rounded">
                                    {selectedProductCount} products
                                </span>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-white border-2 border-[#ffdc91]">
                        <div className="space-y-2">
                            {categoryOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className="flex items-center justify-between py-2 px-3 hover:bg-[#ffdc91]/20 rounded cursor-pointer"
                                    onClick={() => onCategoryToggle(option.value)}
                                >
                                    <div className="flex items-center space-x-2">
                                        {option.value === 'all' ? (
                                            <div className={`w-4 h-4 border rounded ${selectedCategories.length === 0
                                                    ? 'bg-[#fbbc04] border-[#fbbc04]'
                                                    : 'border-gray-300'
                                                }`}>
                                                {selectedCategories.length === 0 && (
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                        ) : (
                                            <Checkbox
                                                checked={selectedCategories.includes(option.value)}
                                                className="data-[state=checked]:bg-[#fbbc04] data-[state=checked]:border-[#fbbc04]"
                                            />
                                        )}
                                        <label className="text-sm cursor-pointer">
                                            {option.label}
                                        </label>
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {getProductCount(option.value)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

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
        </div>
    );
}