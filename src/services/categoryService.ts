// services/categoryService.ts
import apiClient from "./apiClient";

export interface Category {
    categoryId: string;
    categoryName: string;
    description: string;
    imageUrl: string | null;
    subcategories: Category[];
}

export interface CategoryTreeResponse {
    data: {
        categoryId: string;
        categoryName: string;
        description: string;
        imageUrl: null;
        subcategories: Category[];
    };
    message: string;
    success: boolean;
}

export const categoryService = {
    getCategoryTree: (): Promise<CategoryTreeResponse> =>
        apiClient.get("/api/user/catalog/categories"),

    getSubcategories: (categoryId: string): Promise<Category[]> =>
        apiClient.get(`/api/user/catalog/categories/${categoryId}`),

    getProductsByCategory: (categoryId: string, params?: { size?: string }) =>
        apiClient.get(`/api/user/catalog/categories/${categoryId}/products`, { params }),

    getShopsByCategory: (subcategoryId: string) =>
        apiClient.get("/api/user/catalog/shops", {
            params: { subcategory_id: subcategoryId }
        }),
};