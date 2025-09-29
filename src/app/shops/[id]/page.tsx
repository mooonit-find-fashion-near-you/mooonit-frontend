// page.tsx (main file)
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { shops, Shop } from "@/data/shops";
import { subCategoriesData } from "@/data/subCategoriesData";
import ShopHero from "@/components/shop/main/ShopHero";
import FiltersBar from "@/components/shop/main/FiltersBar";
import SidebarFilters from "@/components/shop/main/SidebarFilters";
import ProductGrid from "@/components/shop/main/ProductGrid";
import LoadingState from "@/components/feedback/LoadingState";
import { Product } from "@/data/mockProducts";

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
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategorySlug || "all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount>({});
  const [dynamicPriceRange, setDynamicPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });

  // Use refs to track initialization state
  const isInitialized = useRef(false);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to extract numeric price from string
  const extractPrice = (priceString: string): number => {
    if (!priceString) return 0;

    // Remove ₹, Rs, commas, spaces — but KEEP the dot
    const numericString = priceString.replace(/[₹,\s]|Rs\.?/g, '');
    const price = parseFloat(numericString);

    return isNaN(price) ? 0 : price;
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

  const fetchProducts = async (filters: {
    shopId: number;
    section: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
  }) => {
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

      const productsData = await response.json();
      return productsData;
    } catch (error) {
      console.error("Error fetching products:", error);
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
        const slug = product.category.toLowerCase();
        counts[slug] = (counts[slug] || 0) + 1;
      });

      return counts;
    } catch (error) {
      console.error("Error fetching category counts:", error);
      return {};
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

  // Initial load effect
  useEffect(() => {
    if (!id) return;

    // Reset initialization flag when shop or section changes
    isInitialized.current = false;

    const initializeShopData = async () => {
      try {
        setLoading(true);
        const shopId = parseInt(id as string);
        const foundShop = shops.find(s => s.id === shopId);

        if (!foundShop) {
          throw new Error("Shop not found");
        }

        setShop(foundShop);

        // Fetch all products for this shop and section to get counts and price range
        const [allProducts, counts] = await Promise.all([
          fetchProducts({ shopId, section: selectedSection }),
          fetchCategoryCounts(shopId, selectedSection)
        ]);

        // Calculate and set dynamic price range
        const priceRangeData = calculatePriceRange(allProducts);
        setDynamicPriceRange(priceRangeData);
        setPriceRange([priceRangeData.min, priceRangeData.max]);
        setCategoryCounts(counts);

        // Now fetch filtered products with initial filters
        const filteredProducts = await fetchProducts({
          shopId,
          section: selectedSection,
          category: selectedCategorySlug || "all",
          minPrice: priceRangeData.min,
          maxPrice: priceRangeData.max,
          sizes: []
        });

        setProducts(filteredProducts);
        setActiveCategory(selectedCategorySlug || "all");

        // Mark as initialized only after everything is loaded
        isInitialized.current = true;
      } catch (err) {
        console.error("Error initializing shop:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeShopData();

    // Cleanup function
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, [id, selectedSection]); // Only depend on id and selectedSection

  // Filter update effect
  useEffect(() => {
    // Don't run this effect until initialization is complete
    if (!isInitialized.current || !id || !shop) return;

    // Clear any existing timeout
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }

    // Debounce filter updates
    filterTimeoutRef.current = setTimeout(async () => {
      setLoading(true);

      const shopId = parseInt(id as string);
      const filteredProducts = await fetchProducts({
        shopId,
        section: selectedSection,
        category: activeCategory,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sizes: selectedSizes
      });

      setProducts(filteredProducts);
      setLoading(false);
    }, 300);

    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, [activeCategory, priceRange, selectedSizes]); // Only filter-related dependencies

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
    setPriceRange([dynamicPriceRange.min, dynamicPriceRange.max]);
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