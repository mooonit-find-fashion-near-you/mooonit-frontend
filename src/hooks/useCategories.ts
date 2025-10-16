// hooks/useCategories.ts
"use client";

import { useState, useEffect } from 'react';
import apiClient from '@/services/apiClient';

const CATEGORY_CACHE_KEY = 'mooonit_categories';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheData {
    data: any;
    timestamp: number;
}

export const useCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            // Check cache first
            const cached = getCachedCategories();
            if (cached) {
                setCategories(cached.data);
                setLoading(false);

                // Refresh in background if cache is old
                if (isCacheStale(cached.timestamp)) {
                    fetchFreshCategories();
                }
                return;
            }

            // No cache, fetch fresh data
            await fetchFreshCategories();
        };

        fetchCategories();
    }, []);

    const getCachedCategories = (): CacheData | null => {
        if (typeof window === 'undefined') return null;

        try {
            const cached = localStorage.getItem(CATEGORY_CACHE_KEY);
            if (!cached) return null;

            const cacheData: CacheData = JSON.parse(cached);

            // Check if cache is still valid
            if (Date.now() - cacheData.timestamp > CACHE_DURATION) {
                localStorage.removeItem(CATEGORY_CACHE_KEY);
                return null;
            }

            return cacheData; // ✅ return full object
        } catch (error) {
            console.error('Error reading cache:', error);
            return null;
        }
    };

    const isCacheStale = (timestamp: number): boolean => {
        return Date.now() - timestamp > (30 * 60 * 1000); // 30 minutes
    };

    const fetchFreshCategories = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/api/user/catalog/categories');
            const categoriesData = response.data.data.subcategories || [];

            setCategories(categoriesData);

            // Cache the data
            const cacheData: CacheData = {
                data: categoriesData,
                timestamp: Date.now()
            };
            localStorage.setItem(CATEGORY_CACHE_KEY, JSON.stringify(cacheData));

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const clearCache = () => {
        localStorage.removeItem(CATEGORY_CACHE_KEY);
    };

    const refreshCategories = async () => {
        clearCache();
        await fetchFreshCategories();
    };

    return { categories, loading, error, refreshCategories, clearCache };
};