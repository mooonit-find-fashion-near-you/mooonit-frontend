import { Product } from '@/data/mockProducts';

export const extractPrice = (priceString: string): number => {
    if (!priceString) return 0;
    const numericString = priceString.replace(/[₹,\s]|Rs\.?/g, '');
    const price = parseFloat(numericString);
    return isNaN(price) ? 0 : price;
};

export const calculatePriceRange = (productList: Product[]) => {
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