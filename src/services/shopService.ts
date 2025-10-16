// services/shopService.ts
import apiClient from "./apiClient";

export interface Shop {
    id: string;
    name: string;
    section: string;
    image: string;
    title: string;
    rating: number;
    time: string;
    distance: string;
    location: string;
}

export const shopService = {
    getTrendingShops: (section: string): Promise<Shop[]> =>
        apiClient.get("/api/user/trending-shops", {
            params: { section }
        }),

    getShopDetails: (shopId: string): Promise<Shop> =>
        apiClient.get(`/api/user/shops/${shopId}`),
};