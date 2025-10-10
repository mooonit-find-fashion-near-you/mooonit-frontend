'use client';

import { useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import ShopHero from '@/components/shop/main/ShopHero';
import FiltersBar from '@/components/shop/main/FiltersBar';
import SidebarFilters from '@/components/shop/main/SidebarFilters';
import ProductGrid from '@/components/shop/main/ProductGrid';
import LoadingState from '@/components/feedback/LoadingState';

import { useShopData } from '@/hooks/useShopData';
import { useShopFilters } from '@/hooks/useShopFilters';

import { getCategoryOptions, getSelectedCategoryNames, getProductCount } from '@/utils/categoryUtils';
import { Product } from '@/data/mockProducts';

export default function ShopPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();

  // Parse multiple categories from URL
  const categoryParam = searchParams.get('category');
  const selectedCategorySlugs = categoryParam ? categoryParam.split(',') : [];
  const selectedSection = (searchParams.get('section') || 'women').toLowerCase();

  const {
    shop,
    products,
    loading,
    categoryCounts,
    dynamicPriceRange,
    isInitialized,
    setProducts,
    setLoading
  } = useShopData({ shopId: id, selectedSection, selectedCategorySlugs });

  const handleProductsUpdate = useCallback((products: Product[]) => {
    setProducts(products);
  }, [setProducts]);

  const handleLoadingUpdate = useCallback((loading: boolean) => {
    setLoading(loading);
  }, [setLoading]);

  const {
    selectedCategories,
    priceRange,
    selectedSizes,
    handleCategoryToggle,
    setPriceRange,
    handleSizeToggle,
    clearAllFilters
  } = useShopFilters({
    shopId: id,
    selectedSection,
    selectedCategorySlugs,
    dynamicPriceRange,
    isInitialized,
    onProductsUpdate: handleProductsUpdate,
    onLoadingUpdate: handleLoadingUpdate
  });

  if (loading && !shop) return <LoadingState message="Loading shop..." />;
  if (!shop) return <LoadingState message="Shop not found." />;

  const filterProps = {
    selectedCategories,
    selectedSection,
    selectedSizes,
    priceRange,
    categoryOptions: getCategoryOptions(selectedSection, categoryCounts),
    getSelectedCategoryNames: () => getSelectedCategoryNames(selectedCategories, selectedSection),
    getProductCount: (slug: string) => getProductCount(slug, categoryCounts),
    onCategoryToggle: handleCategoryToggle,
    onSizeToggle: handleSizeToggle,
    onPriceChange: setPriceRange,
    onClearFilters: clearAllFilters,
    minPrice: dynamicPriceRange.min,
    maxPrice: dynamicPriceRange.max
  };

  return (
    <section className="min-h-screen font-[outfit]">
      <ShopHero shop={shop} />
      <FiltersBar {...filterProps} />

      <div className="max-w-[95rem] mx-auto px-4 py-6">
        <div className="flex gap-6">
          <SidebarFilters {...filterProps} />
          <ProductGrid
            loading={loading}
            products={products}
            selectedCategories={selectedCategories}
            selectedSection={selectedSection}
            getSelectedCategoryNames={() => getSelectedCategoryNames(selectedCategories, selectedSection)}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>
    </section>
  );
}