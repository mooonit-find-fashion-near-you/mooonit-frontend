// components/ProductGrid.tsx
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/mockProducts";

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

    console.log(products);

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
                        image={product.images[0]} // Use the first image from the images array
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