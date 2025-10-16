// services/advertisementService.ts
import apiClient from "./apiClient";

export interface Advertisement {
    id: string;
    section: string;
    saleText: string;
    headline: string;
    buttonText: string;
    imageUrl: string;
    imageAlt: string;
}

export const advertisementService = {
    getAdvertisements: (section: string): Promise<Advertisement[]> =>
        apiClient.get("/api/user/advertisements", {
            params: { section }
        }),
};