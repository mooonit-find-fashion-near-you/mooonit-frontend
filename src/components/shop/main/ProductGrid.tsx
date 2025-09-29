// components/ProductGrid.tsx
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

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

interface ProductGridProps {
    loading: boolean;
    products: Product[];
    activeCategory: string;
    selectedSection: string;
    getSelectedCategoryName: () => string;
    onClearFilters: () => void;
}

export default function ProductGrid({ loading, products, activeCategory, selectedSection, getSelectedCategoryName, onClearFilters }: ProductGridProps) {
    const hasActiveFilters = activeCategory !== "all";

    if (loading) {
        return (
            <main className="flex-1">
                <div className="text-center py-12">
                    <div className="text-lg">Loading products...</div>
                </div>
            </main>
        );
    }

    if (products.length === 0) {
        return (
            <main className="flex-1">
                <div className="text-center py-12">
                    <p className="text-[#757575] text-lg">
                        {activeCategory === "all"
                            ? `No products available for ${selectedSection} section in this shop.`
                            : `No products available in ${getSelectedCategoryName()} category for ${selectedSection} section.`
                        }
                    </p>
                    {hasActiveFilters && (
                        <Button onClick={onClearFilters} variant="outline" className="mt-4">
                            Clear Filters & View All Products
                        </Button>
                    )}
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1">
            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        price={product.price}
                        image={product.image}
                        imageAlt={product.title}
                        overlayText={product.overlayText}
                        title={product.title}
                        description={product.description}
                    />
                ))}
            </div>
        </main>
    );
}