import { Product } from '@/data/mockProducts';
import { fetchProducts } from '@/services/productService';
import { useState, useEffect, useRef } from 'react';

interface UseShopFiltersProps {
    shopId: string | string[] | undefined;
    selectedSection: string;
    selectedCategorySlug: string | null;
    dynamicPriceRange: { min: number; max: number };
    isInitialized: React.MutableRefObject<boolean>;
    onProductsUpdate: (products: Product[]) => void;
    onLoadingUpdate: (loading: boolean) => void;
}

export const useShopFilters = ({
    shopId,
    selectedSection,
    selectedCategorySlug,
    dynamicPriceRange,
    isInitialized,
    onProductsUpdate,
    onLoadingUpdate
}: UseShopFiltersProps) => {
    const [activeCategory, setActiveCategory] = useState<string>(selectedCategorySlug || 'all');
    const [priceRange, setPriceRange] = useState([dynamicPriceRange.min, dynamicPriceRange.max]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Update price range when dynamic range changes
    useEffect(() => {
        setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]);
    }, [dynamicPriceRange]);

    // Filter update effect
    useEffect(() => {
        if (!isInitialized.current || !shopId) return;

        if (filterTimeoutRef.current) {
            clearTimeout(filterTimeoutRef.current);
        }

        filterTimeoutRef.current = setTimeout(async () => {
            onLoadingUpdate(true);

            const id = parseInt(shopId as string);
            const filteredProducts = await fetchProducts({
                shopId: id,
                section: selectedSection,
                category: activeCategory,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                sizes: selectedSizes
            });

            onProductsUpdate(filteredProducts);
            onLoadingUpdate(false);
        }, 300);

        return () => {
            if (filterTimeoutRef.current) {
                clearTimeout(filterTimeoutRef.current);
            }
        };
    }, [activeCategory, priceRange, selectedSizes]);

    const clearAllFilters = () => {
        setActiveCategory('all');
        setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]);
        setSelectedSizes([]);
    };

    const handleSizeToggle = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    return {
        activeCategory,
        priceRange,
        selectedSizes,
        setActiveCategory,
        setPriceRange,
        handleSizeToggle,
        clearAllFilters
    };
};
