// app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import apiClient from "@/services/apiClient";

interface Product {
    id: string | undefined
    image: string
    imageAlt: string
    overlayText: string
    title: string
    description: string
    price: string
    onAddToCart?: () => Promise<void> | void
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";

    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            try {
                setLoading(true);
                // For now, mock API response (replace with your backend endpoint)
                const { data } = await apiClient.get(`/api/mock-search`, {
                    params: { q: query, category },
                });
                setResults(data);
            } catch (err) {
                console.error("Search fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchResults();
    }, [query, category]);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                Showing top {results.length} Results for &quot;{query}&quot; ({category})
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            imageAlt={product.title}
                            title={product.title}
                            description={product.description || product.title}
                            price={product.price}
                            overlayText={product.overlayText}
                            id={product.id?.toString()}
                            onAddToCart={product.onAddToCart}
                        />
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}
