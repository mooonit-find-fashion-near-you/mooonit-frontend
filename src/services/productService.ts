import { Product } from '@/data/mockProducts';

interface FetchProductsFilters {
    shopId: number;
    section: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
}

export const fetchProducts = async (filters: FetchProductsFilters): Promise<Product[]> => {
    try {
        const params = new URLSearchParams({
            shopId: filters.shopId.toString(),
            section: filters.section,
            ...(filters.category && filters.category !== 'all' && { category: filters.category }),
            ...(filters.minPrice !== undefined && { minPrice: filters.minPrice.toString() }),
            ...(filters.maxPrice !== undefined && { maxPrice: filters.maxPrice.toString() }),
            ...(filters.sizes && filters.sizes.length > 0 && { sizes: filters.sizes.join(',') })
        });

        const response = await fetch(`/api/products?${params}`);
        if (!response.ok) throw new Error('Failed to fetch products');

        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const fetchCategoryCounts = async (shopId: number, section: string) => {
    try {
        const response = await fetch(`/api/products?shopId=${shopId}&section=${section}`);
        if (!response.ok) throw new Error('Failed to fetch category counts');

        const productsData: Product[] = await response.json();
        const counts: Record<string, number> = {};

        productsData.forEach((product) => {
            const slug = product.category.toLowerCase();
            counts[slug] = (counts[slug] || 0) + 1;
        });

        return counts;
    } catch (error) {
        console.error('Error fetching category counts:', error);
        return {};
    }
};