import { Shop, shops } from "./shops";

export interface Product {
    id: string;
    images: string[];
    imageAlt: string;
    overlayText: string;
    title: string;
    description: string;
    price: string;
    oldPrice?: string;
    section: string;
    category: string;
    shopId: number;
    sizes?: string[];
}

const allSizes = ["S", "M", "L", "XL", "XXL"];

// Helper to get a random subset of sizes
const getRandomSizes = () => {
    const shuffled = allSizes.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * allSizes.length) + 1; // at least 1 size
    return shuffled.slice(0, count).sort(); // sorted for consistency
};

// helper function to generate 7 random images
const generateImages = () => {
    const randomId = Math.floor(Math.random() * 10000);
    return Array.from({ length: 7 }, (_, i) =>
        `https://picsum.photos/1920/1080?random=${randomId + i}`
    );
};

export const mockProducts: Product[] = [
    { id: "prod-1", images: generateImages(), imageAlt: "Designer Kurti", overlayText: "Best Seller", title: "Designer Printed Kurti", description: "Handcrafted ethnic kurti with intricate embroidery work", price: "₹1,899.00", oldPrice: "₹2,199.00", section: "Women", category: "topwear", shopId: 1, sizes: getRandomSizes() },
    { id: "prod-2", images: generateImages(), imageAlt: "Silk Saree", overlayText: "Premium", title: "Pure Silk Saree", description: "Traditional silk saree with golden zari border", price: "₹4,599.00", oldPrice: "₹5,299.00", section: "Women", category: "topwear", shopId: 1, sizes: getRandomSizes() },
    { id: "prod-3", images: generateImages(), imageAlt: "Casual Top", overlayText: "Trending", title: "Casual Cotton Top", description: "Comfortable everyday wear top with modern design", price: "₹899.00", oldPrice: "₹1,099.00", section: "Women", category: "topwear", shopId: 2, sizes: getRandomSizes() },
    { id: "prod-4", images: generateImages(), imageAlt: "Denim Shorts", overlayText: "Summer Essential", title: "High-Waist Denim Shorts", description: "Stylish denim shorts perfect for casual outings", price: "₹1,299.00", oldPrice: "₹1,599.00", section: "Women", category: "bottomwear", shopId: 2, sizes: getRandomSizes() },
    { id: "prod-5", images: generateImages(), imageAlt: "Party Gown", overlayText: "Exclusive", title: "Evening Party Gown", description: "Elegant floor-length gown for special occasions", price: "₹7,599.00", oldPrice: "₹8,999.00", section: "Women", category: "topwear", shopId: 3, sizes: getRandomSizes() },
    { id: "prod-6", images: generateImages(), imageAlt: "Cocktail Dress", overlayText: "New Arrival", title: "Cocktail Party Dress", description: "Chic cocktail dress with sequin detailing", price: "₹3,899.00", oldPrice: "₹4,599.00", section: "Women", category: "topwear", shopId: 3, sizes: getRandomSizes() },
    { id: "prod-7", images: generateImages(), imageAlt: "Western Dress", overlayText: "Bestseller", title: "A-Line Western Dress", description: "Flowy A-line dress perfect for brunch dates", price: "₹2,299.00", oldPrice: "₹2,699.00", section: "Women", category: "topwear", shopId: 4, sizes: getRandomSizes() },
    { id: "prod-8", images: generateImages(), imageAlt: "Designer Jeans", overlayText: "Premium Fit", title: "Slim Fit Designer Jeans", description: "Comfortable slim fit jeans with stretch fabric", price: "₹2,799.00", oldPrice: "₹3,299.00", section: "Women", category: "bottomwear", shopId: 4, sizes: getRandomSizes() },
    { id: "prod-9", images: generateImages(), imageAlt: "Anarkali Suit", overlayText: "Traditional", title: "Designer Anarkali Suit", description: "Regal anarkali suit with heavy embroidery work", price: "₹5,199.00", oldPrice: "₹5,999.00", section: "Women", category: "topwear", shopId: 5, sizes: getRandomSizes() },
    { id: "prod-10", images: generateImages(), imageAlt: "Chanderi Kurti", overlayText: "Handcrafted", title: "Chanderi Silk Kurti", description: "Lightweight chanderi silk kurti with delicate prints", price: "₹3,199.00", oldPrice: "₹3,699.00", section: "Women", category: "topwear", shopId: 5, sizes: getRandomSizes() },
    { id: "prod-11", images: generateImages(), imageAlt: "Palazzo Pants", overlayText: "Comfort Wear", title: "Floral Print Palazzo", description: "Flowy palazzo pants with vibrant floral prints", price: "₹1,699.00", oldPrice: "₹1,999.00", section: "Women", category: "bottomwear", shopId: 6, sizes: getRandomSizes() },
    { id: "prod-12", images: generateImages(), imageAlt: "Cotton Skirt", overlayText: "Casual", title: "A-Line Cotton Skirt", description: "Comfortable cotton skirt for everyday wear", price: "₹1,199.00", oldPrice: "₹1,499.00", section: "Women", category: "bottomwear", shopId: 6, sizes: getRandomSizes() },
    { id: "prod-13", images: generateImages(), imageAlt: "Boho Skirt", overlayText: "Bohemian", title: "Bohemian Maxi Skirt", description: "Ethnic print maxi skirt with elastic waistband", price: "₹1,899.00", oldPrice: "₹2,199.00", section: "Women", category: "bottomwear", shopId: 7, sizes: getRandomSizes() },
    { id: "prod-14", images: generateImages(), imageAlt: "Wrap Pants", overlayText: "Trendy", title: "Designer Wrap Pants", description: "Stylish wrap-around pants with unique pattern", price: "₹2,399.00", oldPrice: "₹2,799.00", section: "Women", category: "bottomwear", shopId: 7, sizes: getRandomSizes() },
    { id: "prod-15", images: generateImages(), imageAlt: "Office Trousers", overlayText: "Professional", title: "Formal Office Trousers", description: "Tailored fit trousers for professional settings", price: "₹2,899.00", oldPrice: "₹3,299.00", section: "Women", category: "bottomwear", shopId: 8, sizes: getRandomSizes() },
    { id: "prod-16", images: generateImages(), imageAlt: "Culottes", overlayText: "Smart Casual", title: "Wide-Leg Culottes", description: "Chic culottes perfect for semi-formal occasions", price: "₹1,999.00", oldPrice: "₹2,399.00", section: "Women", category: "bottomwear", shopId: 8, sizes: getRandomSizes() },
    { id: "prod-17", images: generateImages(), imageAlt: "Midi Skirt", overlayText: "Versatile", title: "Pleated Midi Skirt", description: "Elegant pleated skirt that pairs with everything", price: "₹1,599.00", oldPrice: "₹1,899.00", section: "Women", category: "bottomwear", shopId: 9, sizes: getRandomSizes() },
    { id: "prod-18", images: generateImages(), imageAlt: "Jogger Pants", overlayText: "Comfort", title: "Casual Jogger Pants", description: "Comfortable jogger-style pants for relaxed days", price: "₹1,399.00", oldPrice: "₹1,699.00", section: "Women", category: "bottomwear", shopId: 9, sizes: getRandomSizes() },
    { id: "prod-19", images: generateImages(), imageAlt: "Evening Gown", overlayText: "Luxury", title: "Designer Evening Gown", description: "Exclusive designer gown for red carpet events", price: "₹8,999.00", oldPrice: "₹1,0999.00", section: "Women", category: "bottomwear", shopId: 10, sizes: getRandomSizes() },
    { id: "prod-20", images: generateImages(), imageAlt: "Sequined Skirt", overlayText: "Party Wear", title: "Sequined Party Skirt", description: "Sparkling sequined skirt for night parties", price: "₹4,299.00", oldPrice: "₹4,999.00", section: "Women", category: "bottomwear", shopId: 10, sizes: getRandomSizes() },
    { id: "prod-21", images: generateImages(), imageAlt: "Designer Kurti", overlayText: "Best Seller", title: "Designer Printed Kurti", description: "Handcrafted ethnic kurti with intricate embroidery work", price: "₹1,899.00", oldPrice: "₹2,199.00", section: "Women", category: "topwear", shopId: 1, sizes: getRandomSizes() },
    { id: "prod-22", images: generateImages(), imageAlt: "Silk Saree", overlayText: "Premium", title: "Pure Silk Saree", description: "Traditional silk sare e with golden zari border", price: "₹4,599.00", oldPrice: "₹5,299.00", section: "Women", category: "topwear", shopId: 1, sizes: getRandomSizes() },
    { id: "prod-23", images: generateImages(), imageAlt: "Casual Top", overlayText: "Trending", title: "Casual Cotton Top", description: "Comfortable everyday wear top with modern design", price: "₹899.00", oldPrice: "₹1,099.00", section: "Women", category: "topwear", shopId: 2, sizes: getRandomSizes() },
    { id: "prod-24", images: generateImages(), imageAlt: "Denim Shorts", overlayText: "Summer Essential", title: "High-Waist Denim Shorts", description: "Stylish denim shorts perfect for casual outings", price: "₹1,299.00", oldPrice: "₹1,599.00", section: "Women", category: "bottomwear", shopId: 2, sizes: getRandomSizes() },
    { id: "prod-25", images: generateImages(), imageAlt: "Party Gown", overlayText: "Exclusive", title: "Evening Party Gown", description: "Elegant floor-length gown for special occasions", price: "₹7,599.00", oldPrice: "₹8,999.00", section: "Women", category: "topwear", shopId: 3, sizes: getRandomSizes() },
    { id: "prod-26", images: generateImages(), imageAlt: "Cocktail Dress", overlayText: "New Arrival", title: "Cocktail Party Dress", description: "Chic cocktail dress with sequin detailing", price: "₹3,899.00", oldPrice: "₹4,499.00", section: "Women", category: "topwear", shopId: 3, sizes: getRandomSizes() },
    { id: "prod-27", images: generateImages(), imageAlt: "Western Dress", overlayText: "Bestseller", title: "A-Line Western Dress", description: "Flowy A-line dress perfect for brunch dates", price: "₹2,299.00", oldPrice: "₹2,699.00", section: "Women", category: "topwear", shopId: 4, sizes: getRandomSizes() },
    { id: "prod-28", images: generateImages(), imageAlt: "Designer Jeans", overlayText: "Premium Fit", title: "Slim Fit Designer Jeans", description: "Comfortable slim fit jeans with stretch fabric", price: "₹2,799.00", oldPrice: "₹3,299.00", section: "Women", category: "bottomwear", shopId: 4, sizes: getRandomSizes() },
    { id: "prod-29", images: generateImages(), imageAlt: "Anarkali Suit", overlayText: "Traditional", title: "Designer Anarkali Suit", description: "Regal anarkali suit with heavy embroidery work", price: "₹5,199.00", oldPrice: "₹5,999.00", section: "Women", category: "topwear", shopId: 5, sizes: getRandomSizes() },
    { id: "prod-30", images: generateImages(), imageAlt: "Chanderi Kurti", overlayText: "Handcrafted", title: "Chanderi Silk Kurti", description: "Lightweight chanderi silk kurti with delicate prints", price: "₹3,199.00", oldPrice: "₹3,699.00", section: "Women", category: "topwear", shopId: 5, sizes: getRandomSizes() },
    { id: "prod-31", images: generateImages(), imageAlt: "Palazzo Pants", overlayText: "Comfort Wear", title: "Floral Print Palazzo", description: "Flowy palazzo pants with vibrant floral prints", price: "₹1,699.00", oldPrice: "₹1,999.00", section: "Women", category: "bottomwear", shopId: 6, sizes: getRandomSizes() },
    { id: "prod-32", images: generateImages(), imageAlt: "Cotton Skirt", overlayText: "Casual", title: "A-Line Cotton Skirt", description: "Comfortable cotton skirt for everyday wear", price: "₹1,199.00", oldPrice: "₹1,499.00", section: "Women", category: "bottomwear", shopId: 6, sizes: getRandomSizes() },
    { id: "prod-33", images: generateImages(), imageAlt: "Boho Skirt", overlayText: "Bohemian", title: "Bohemian Maxi Skirt", description: "Ethnic print maxi skirt with elastic waistband", price: "₹1,899.00", oldPrice: "₹2,199.00", section: "Women", category: "bottomwear", shopId: 7, sizes: getRandomSizes() },
    { id: "prod-34", images: generateImages(), imageAlt: "Wrap Pants", overlayText: "Trendy", title: "Designer Wrap Pants", description: "Stylish wrap-around pants with unique pattern", price: "₹2,399.00", oldPrice: "₹2,799.00", section: "Women", category: "bottomwear", shopId: 7, sizes: getRandomSizes() },
    { id: "prod-35", images: generateImages(), imageAlt: "Office Trousers", overlayText: "Professional", title: "Formal Office Trousers", description: "Tailored fit trousers for professional settings", price: "₹2,899.00", oldPrice: "₹3,299.00", section: "Women", category: "bottomwear", shopId: 8, sizes: getRandomSizes() },
    { id: "prod-36", images: generateImages(), imageAlt: "Culottes", overlayText: "Smart Casual", title: "Wide-Leg Culottes", description: "Chic culottes perfect for semi-formal occasions", price: "₹1,999.00", oldPrice: "₹2,399.00", section: "Women", category: "bottomwear", shopId: 8, sizes: getRandomSizes() },
    { id: "prod-37", images: generateImages(), imageAlt: "Midi Skirt", overlayText: "Versatile", title: "Pleated Midi Skirt", description: "Elegant pleated skirt that pairs with everything", price: "₹1,599.00", oldPrice: "₹1,899.00", section: "Women", category: "bottomwear", shopId: 9, sizes: getRandomSizes() },
    { id: "prod-38", images: generateImages(), imageAlt: "Jogger Pants", overlayText: "Comfort", title: "Casual Jogger Pants", description: "Comfortable jogger-style pants for relaxed days", price: "₹1,399.00", oldPrice: "₹1,699.00", section: "Women", category: "bottomwear", shopId: 9, sizes: getRandomSizes() },
    { id: "prod-39", images: generateImages(), imageAlt: "Evening Gown", overlayText: "Luxury", title: "Designer Evening Gown", description: "Exclusive designer gown for red carpet events", price: "₹8,999.00", oldPrice: "₹1,0999.00", section: "Women", category: "bottomwear", shopId: 10, sizes: getRandomSizes() },
    { id: "prod-40", images: generateImages(), imageAlt: "Sequined Skirt", overlayText: "Party Wear", title: "Sequined Party Skirt", description: "Sparkling sequined skirt for night parties", price: "₹4,299.00", oldPrice: "₹4,999.00", section: "Women", category: "bottomwear", shopId: 10, sizes: getRandomSizes() }
];

// Helper function to get products by shop ID
export const getProductsByShopId = (shopId: number): Product[] => {
    return mockProducts.filter(product => product.shopId === shopId);
};

// Helper function to get shop by product ID
export const getShopByProductId = (productId: string): Shop | undefined => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return undefined;
    return shops.find(shop => shop.id === product.shopId);
};