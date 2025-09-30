import { useState, useEffect, useRef } from 'react';
import { shops, Shop } from '@/data/shops';
import { Product } from '@/data/mockProducts';
import { fetchProducts, fetchCategoryCounts } from '@/services/productService';
import { calculatePriceRange } from '@/utils/productUtils';

interface UseShopDataProps {
  shopId: string | string[] | undefined;
  selectedSection: string;
  selectedCategorySlug: string | null;
}

interface CategoryCount {
  [key: string]: number;
}

export const useShopData = ({ shopId, selectedSection }: UseShopDataProps) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount>({});
  const [dynamicPriceRange, setDynamicPriceRange] = useState({ min: 0, max: 10000 });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!shopId) return;

    // Prevent re-initialization if already initialized with same params
    if (isInitialized.current) return;

    const initializeShopData = async () => {
      try {
        setLoading(true);
        const id = parseInt(shopId as string);
        const foundShop = shops.find(s => s.id === id);

        if (!foundShop) throw new Error('Shop not found');

        setShop(foundShop);

        const [allProducts, counts] = await Promise.all([
          fetchProducts({ shopId: id, section: selectedSection }),
          fetchCategoryCounts(id, selectedSection)
        ]);

        const priceRangeData = calculatePriceRange(allProducts);
        setDynamicPriceRange(priceRangeData);
        setCategoryCounts(counts);
        setProducts(allProducts);
        isInitialized.current = true;
      } catch (err) {
        console.error('Error initializing shop:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeShopData();
  }, [shopId, selectedSection]);

  // Reset initialization when shop or section changes
  useEffect(() => {
    isInitialized.current = false;
  }, [shopId, selectedSection]);

  return {
    shop,
    products,
    loading,
    categoryCounts,
    dynamicPriceRange,
    isInitialized,
    setProducts,
    setLoading
  };
};