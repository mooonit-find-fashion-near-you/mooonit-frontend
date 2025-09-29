// page.tsx (main file)
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { shops, Shop } from "@/data/shops";
import { subCategoriesData } from "@/data/subCategoriesData";
import ShopHero from "@/components/shop/main/ShopHero";
import FiltersBar from "@/components/shop/main/FiltersBar";
import SidebarFilters from "@/components/shop/main/SidebarFilters";
import ProductGrid from "@/components/shop/main/ProductGrid";
import LoadingState from "@/components/feedback/LoadingState";

interface Product {
  id: string | undefined;
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
  const selectedSection = (searchParams.get('section') || 'women').toLowerCase();

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  // const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategorySlug || "all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount>({});
  const [dynamicPriceRange, setDynamicPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });

  // Helper function to extract numeric price from string
  const extractPrice = (priceString: string): number => {
    // Remove "Rs. " and any commas, then parse
    const numericString = priceString.replace(/Rs\.?\s?|,/g, '');
    return parseInt(numericString) || 0;
  };

  // Calculate dynamic price range from available products
  const calculatePriceRange = (productList: Product[]) => {
    if (productList.length === 0) {
      return { min: 0, max: 10000 };
    }

    const prices = productList.map(product => extractPrice(product.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {
      min: Math.floor(minPrice),
      max: Math.ceil(maxPrice)
    };
  };

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

  const fetchAllProducts = async (shopId: number, section: string) => {
    try {
      const response = await fetch(`/api/products?shopId=${shopId}&section=${section}`);
      if (!response.ok) throw new Error("Failed to fetch all products");

      const productsData: Product[] = await response.json();
      // setAllProducts(productsData);

      // Calculate and set dynamic price range
      const priceRange = calculatePriceRange(productsData);
      setDynamicPriceRange(priceRange);

      // Reset price filter to use new range if current range is outside bounds
      setPriceRange(prevRange => [
        Math.max(prevRange[0], priceRange.min),
        Math.min(prevRange[1], priceRange.max)
      ]);

      return productsData;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  };

  const fetchCategoryCounts = async (shopId: number, section: string) => {
    try {
      const response = await fetch(`/api/products?shopId=${shopId}&section=${section}`);
      if (!response.ok) throw new Error("Failed to fetch category counts");

      const productsData: Product[] = await response.json();

      // group products by category slug
      const counts: CategoryCount = {};
      productsData.forEach((product) => {
        const slug = product.category.toLowerCase(); // assuming product.category = "topwear"
        counts[slug] = (counts[slug] || 0) + 1;
      });

      setCategoryCounts(counts);
    } catch (error) {
      console.error("Error fetching category counts:", error);
    }
  };

  const getCategoryOptions = () => {
    const sectionCategories = subCategoriesData[selectedSection] || [];

    // Calculate total count from categoryCounts
    const totalCount = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);

    const options = [{ value: "all", label: "All Categories", count: totalCount }];

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

        // First fetch all products to establish price range
        await fetchAllProducts(shopId, selectedSection);

        // Then fetch filtered products
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

  // Update dynamic price range when section changes
  useEffect(() => {
    if (!id || !shop) return;

    fetchAllProducts(parseInt(id as string), selectedSection);
  }, [selectedSection, id, shop]);

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
    setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]); // Reset to dynamic range
    setSelectedSizes([]);
  };

  const getSelectedCategoryName = () => {
    if (activeCategory === "all") return "All Categories";
    const category = subCategoriesData[selectedSection]?.find(cat => cat.slug === activeCategory);
    return category?.name || activeCategory;
  };

  const getProductCount = (categorySlug: string) => {
    if (categorySlug === "all") {
      return Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);
    }
    return categoryCounts?.[categorySlug] || 0;
  };

  if (loading && !shop) return <LoadingState message="Loading shop..." />;
  if (!shop) return <LoadingState message="Shop not found." />;

  const filterProps = {
    activeCategory,
    selectedSection,
    selectedSizes,
    priceRange,
    categoryOptions: getCategoryOptions(),
    getSelectedCategoryName,
    getProductCount,
    onCategoryChange: handleCategoryChange,
    onSizeToggle: handleSizeToggle,
    onPriceChange: handlePriceChange,
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
            getSelectedCategoryName={getSelectedCategoryName}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>
    </section>
  );
}