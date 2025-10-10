// hooks/useShopFilters.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Product } from '@/data/mockProducts';
import { fetchProducts } from '@/services/productService';

interface UseShopFiltersProps {
    shopId: string | string[] | undefined;
    selectedSection: string;
    selectedCategorySlugs: string[];
    dynamicPriceRange: { min: number; max: number };
    isInitialized: React.MutableRefObject<boolean>;
    onProductsUpdate: (products: Product[]) => void;
    onLoadingUpdate: (loading: boolean) => void;
}

export const useShopFilters = ({
    shopId,
    selectedSection,
    selectedCategorySlugs,
    dynamicPriceRange,
    isInitialized,
    onProductsUpdate,
    onLoadingUpdate
}: UseShopFiltersProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        selectedCategorySlugs.length > 0 ? selectedCategorySlugs : []
    );
    const [priceRange, setPriceRange] = useState([dynamicPriceRange.min, dynamicPriceRange.max]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true);
    const previousFilters = useRef({
        categories: [] as string[],
        priceRange: [0, 10000] as [number, number],
        sizes: [] as string[]
    });

    // Update categories when URL changes
    useEffect(() => {
        if (JSON.stringify(selectedCategorySlugs) !== JSON.stringify(selectedCategories)) {
            setSelectedCategories(selectedCategorySlugs.length > 0 ? selectedCategorySlugs : []);
        }
    }, [selectedCategorySlugs, selectedCategories]);

    // Update URL when categories change (debounced)
    useEffect(() => {
        if (!shopId || isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const params = new URLSearchParams();
        params.set('section', selectedSection);

        if (selectedCategories.length > 0) {
            params.set('category', selectedCategories.join(','));
        } else {
            params.delete('category');
        }

        const newUrl = `${pathname}?${params.toString()}`;
        const currentUrl = `${pathname}?${new URLSearchParams(window.location.search).toString()}`;

        // Only push if URL actually changed
        if (newUrl !== currentUrl) {
            router.push(newUrl, { scroll: false });
        }
    }, [selectedCategories, selectedSection, shopId, pathname, router]);

    // Initialize price range only once
    useEffect(() => {
        if (dynamicPriceRange.min !== 0 || dynamicPriceRange.max !== 10000) {
            setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]);
            previousFilters.current.priceRange = [dynamicPriceRange.min, dynamicPriceRange.max];
        }
    }, [dynamicPriceRange.min, dynamicPriceRange.max]);

    // Filter products when filters change
    const filterProducts = useCallback(async () => {
        if (!isInitialized.current || !shopId) return;

        const id = parseInt(shopId as string);
        
        // Check if filters actually changed
        const filtersChanged = 
            JSON.stringify(selectedCategories) !== JSON.stringify(previousFilters.current.categories) ||
            JSON.stringify(priceRange) !== JSON.stringify(previousFilters.current.priceRange) ||
            JSON.stringify(selectedSizes) !== JSON.stringify(previousFilters.current.sizes);

        if (!filtersChanged) return;

        onLoadingUpdate(true);

        try {
            const filteredProducts = await fetchProducts({
                shopId: id,
                section: selectedSection,
                categories: selectedCategories.length > 0 ? selectedCategories : undefined,
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
                sizes: selectedSizes
            });

            onProductsUpdate(filteredProducts);
            previousFilters.current = {
                categories: [...selectedCategories],
                priceRange: [...priceRange] as [number, number],
                sizes: [...selectedSizes]
            };
        } catch (error) {
            console.error('Error filtering products:', error);
        } finally {
            onLoadingUpdate(false);
        }
    }, [selectedCategories, priceRange, selectedSizes, shopId, selectedSection, isInitialized, onProductsUpdate, onLoadingUpdate]);

    // Debounced filter effect
    useEffect(() => {
        if (filterTimeoutRef.current) {
            clearTimeout(filterTimeoutRef.current);
        }

        filterTimeoutRef.current = setTimeout(() => {
            filterProducts();
        }, 300);

        return () => {
            if (filterTimeoutRef.current) {
                clearTimeout(filterTimeoutRef.current);
            }
        };
    }, [filterProducts]);

    const clearAllFilters = useCallback(() => {
        setSelectedCategories([]);
        setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]);
        setSelectedSizes([]);
        previousFilters.current = {
            categories: [],
            priceRange: [dynamicPriceRange.min, dynamicPriceRange.max],
            sizes: []
        };
    }, [dynamicPriceRange.min, dynamicPriceRange.max]);

    const handleCategoryToggle = useCallback((categorySlug: string) => {
        setSelectedCategories(prev => {
            if (categorySlug === 'all') {
                return [];
            } else {
                if (prev.includes(categorySlug)) {
                    return prev.filter(c => c !== categorySlug);
                } else {
                    return [...prev, categorySlug];
                }
            }
        });
    }, []);

    const handleSizeToggle = useCallback((size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    }, []);

    const setPriceRangeSafe = useCallback((newRange: number[]) => {
        setPriceRange(newRange);
    }, []);

    return {
        selectedCategories,
        priceRange,
        selectedSizes,
        handleCategoryToggle,
        setPriceRange: setPriceRangeSafe,
        handleSizeToggle,
        clearAllFilters
    };
};