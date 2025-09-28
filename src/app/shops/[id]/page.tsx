// page.tsx (main file)
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { shops, Shop } from "@/data/shops";
import { subCategoriesData } from "@/data/subCategoriesData";
import ShopHero from "@/features/shop/components/ShopHero";
import FiltersBar from "@/features/shop/components/FiltersBar";
import SidebarFilters from "@/components/layout/SidebarFilters";
import ProductGrid from "@/features/shop/components/ProductGrid";
import LoadingState from "@/components/feedback/LoadingState";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  section: string;
  shopId: number;
  sizes: string[];
  overlayText: string;
  description: string;
}

interface CategoryCount {
  [key: string]: number;
}

export default function ShopPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const selectedCategorySlug = searchParams.get('category');
  const selectedSection = searchParams.get('section') || 'women';

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategorySlug || "all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount>({});

  const fetchProducts = async (filters: { shopId: number; section: string; category?: string; minPrice?: number; maxPrice?: number; sizes?: string[]; }) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        shopId: filters.shopId.toString(),
        section: filters.section,
        ...(filters.category && filters.category !== 'all' && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice.toString() }),
        ...(filters.sizes && filters.sizes.length > 0 && { sizes: filters.sizes.join(',') })
      });

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');

      const productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryCounts = async (shopId: number, section: string) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopId, section })
      });

      if (response.ok) {
        const counts = await response.json();
        setCategoryCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching category counts:", error);
    }
  };

  const getCategoryOptions = () => {
    const sectionCategories = subCategoriesData[selectedSection] || [];
    const options = [{ value: "all", label: "All Categories", count: products.length }];

    sectionCategories.forEach(category => {
      options.push({
        value: category.slug,
        label: category.name,
        count: categoryCounts[category.slug] || 0
      });
    });

    return options;
  };

  useEffect(() => {
    if (!id) return;

    const fetchShopData = async () => {
      try {
        const shopId = parseInt(id as string);
        const foundShop = shops.find(s => s.id === shopId);

        if (!foundShop) throw new Error("Shop not found");

        setShop(foundShop);
        await fetchProducts({
          shopId,
          section: selectedSection,
          category: activeCategory,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sizes: selectedSizes
        });
        await fetchCategoryCounts(shopId, selectedSection);
      } catch (err) {
        console.error("Error fetching shop:", err);
        setLoading(false);
      }
    };

    fetchShopData();
  }, [id]);

  useEffect(() => {
    if (!id || !shop) return;

    fetchProducts({
      shopId: parseInt(id as string),
      section: selectedSection,
      category: activeCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sizes: selectedSizes
    });
    fetchCategoryCounts(parseInt(id as string), selectedSection);
  }, [activeCategory, selectedSection, priceRange, selectedSizes, id, shop]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const clearAllFilters = () => {
    setActiveCategory("all");
    setPriceRange([0, 10000]);
    setSelectedSizes([]);
  };

  const getSelectedCategoryName = () => {
    if (activeCategory === "all") return "All Categories";
    const category = subCategoriesData[selectedSection]?.find(cat => cat.slug === activeCategory);
    return category?.name || activeCategory;
  };

  const getProductCount = (categorySlug: string) => {
    if (categorySlug === "all") return products.length;
    return categoryCounts[categorySlug] || 0;
  };

  if (loading && !shop) return <LoadingState message="Loading shop..." />;
  if (!shop) return <LoadingState message="Shop not found." />;

  const filterProps = {
    activeCategory, selectedSection, selectedSizes, priceRange, categoryOptions: getCategoryOptions(), getSelectedCategoryName, getProductCount, onCategoryChange: handleCategoryChange, onSizeToggle: handleSizeToggle, onPriceChange: handlePriceChange, onClearFilters: clearAllFilters
  };

  return (
    <section className="min-h-screen">
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
            getSelectedCategoryName={getSelectedCategoryName}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>
    </section>
  );
}