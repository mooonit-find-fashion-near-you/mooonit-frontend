import { useState, useEffect, useRef } from 'react';
import { Product } from '@/data/mockProducts';
import { fetchProducts } from '@/services/productService';

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
    const isFirstRender = useRef(true);

    useEffect(() => {
        setActiveCategory(selectedCategorySlug || 'all');
    }, [selectedCategorySlug]);

    // Update price range when dynamic range changes (only if different)
    useEffect(() => {
        if (priceRange[0] !== dynamicPriceRange.min || priceRange[1] !== dynamicPriceRange.max) {
            setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]);
        }
    }, [dynamicPriceRange.min, dynamicPriceRange.max]);

    // Filter update effect - only runs when user changes filters
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

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

    useEffect(() => {
        isFirstRender.current = true;
    }, [shopId, selectedSection]);

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
