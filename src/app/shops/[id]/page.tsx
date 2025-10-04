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

import { getCategoryOptions, getSelectedCategoryName, getProductCount } from '@/utils/categoryUtils';
import { Product } from '@/data/mockProducts';

export default function ShopPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const selectedCategorySlug = searchParams.get('category');
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
  } = useShopData({ shopId: id, selectedSection, selectedCategorySlug });

  const handleProductsUpdate = useCallback((products: Product[]) => {
    setProducts(products);
  }, [setProducts]);

  const handleLoadingUpdate = useCallback((loading: boolean) => {
    setLoading(loading);
  }, [setLoading]);

  const {
    activeCategory,
    priceRange,
    selectedSizes,
    setActiveCategory,
    setPriceRange,
    handleSizeToggle,
    clearAllFilters
  } = useShopFilters({
    shopId: id,
    selectedSection,
    selectedCategorySlug,
    dynamicPriceRange,
    isInitialized,
    onProductsUpdate: handleProductsUpdate,
    onLoadingUpdate: handleLoadingUpdate
  });

  if (loading && !shop) return <LoadingState message="Loading shop..." />;
  if (!shop) return <LoadingState message="Shop not found." />;

  const filterProps = {
    activeCategory,
    selectedSection,
    selectedSizes,
    priceRange,
    categoryOptions: getCategoryOptions(selectedSection, categoryCounts),
    getSelectedCategoryName: () => getSelectedCategoryName(activeCategory, selectedSection),
    getProductCount: (slug: string) => getProductCount(slug, categoryCounts),
    onCategoryChange: setActiveCategory,
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
            activeCategory={activeCategory}
            selectedSection={selectedSection}
            getSelectedCategoryName={() => getSelectedCategoryName(activeCategory, selectedSection)}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>
    </section>
  );
}