import { Shop, shops } from "./shops";

export interface Product {
    id: string;
    image: string;
    imageAlt: string;
    overlayText: string;
    title: string;
    description: string;
    price: string;
    section: string;
    category: string;
    shopId: number;
}

export const mockProducts: Product[] = [
    { id: "prod-1", image: "https://picsum.photos/500/300", imageAlt: "Designer Kurti", overlayText: "Best Seller", title: "Designer Printed Kurti", description: "Handcrafted ethnic kurti with intricate embroidery work", price: "1899", section: "Women", category: "topwear", shopId: 1 },
    { id: "prod-2", image: "https://picsum.photos/500/301", imageAlt: "Silk Saree", overlayText: "Premium", title: "Pure Silk Saree", description: "Traditional silk saree with golden zari border", price: "4599", section: "Women", category: "topwear", shopId: 1 },
    { id: "prod-3", image: "https://picsum.photos/500/302", imageAlt: "Casual Top", overlayText: "Trending", title: "Casual Cotton Top", description: "Comfortable everyday wear top with modern design", price: "899", section: "Women", category: "topwear", shopId: 2 },
    { id: "prod-4", image: "https://picsum.photos/500/303", imageAlt: "Denim Shorts", overlayText: "Summer Essential", title: "High-Waist Denim Shorts", description: "Stylish denim shorts perfect for casual outings", price: "1299", section: "Women", category: "bottomwear", shopId: 2 },
    { id: "prod-5", image: "https://picsum.photos/500/304", imageAlt: "Party Gown", overlayText: "Exclusive", title: "Evening Party Gown", description: "Elegant floor-length gown for special occasions", price: "7599", section: "Women", category: "topwear", shopId: 3 },
    { id: "prod-6", image: "https://picsum.photos/500/305", imageAlt: "Cocktail Dress", overlayText: "New Arrival", title: "Cocktail Party Dress", description: "Chic cocktail dress with sequin detailing", price: "3899", section: "Women", category: "topwear", shopId: 3 },
    { id: "prod-7", image: "https://picsum.photos/500/306", imageAlt: "Western Dress", overlayText: "Bestseller", title: "A-Line Western Dress", description: "Flowy A-line dress perfect for brunch dates", price: "2299", section: "Women", category: "topwear", shopId: 4 },
    { id: "prod-8", image: "https://picsum.photos/500/307", imageAlt: "Designer Jeans", overlayText: "Premium Fit", title: "Slim Fit Designer Jeans", description: "Comfortable slim fit jeans with stretch fabric", price: "2799", section: "Women", category: "bottomwear", shopId: 4 },
    { id: "prod-9", image: "https://picsum.photos/500/308", imageAlt: "Anarkali Suit", overlayText: "Traditional", title: "Designer Anarkali Suit", description: "Regal anarkali suit with heavy embroidery work", price: "5199", section: "Women", category: "topwear", shopId: 5 },
    { id: "prod-10", image: "https://picsum.photos/500/309", imageAlt: "Chanderi Kurti", overlayText: "Handcrafted", title: "Chanderi Silk Kurti", description: "Lightweight chanderi silk kurti with delicate prints", price: "3199", section: "Women", category: "topwear", shopId: 5 },
    { id: "prod-11", image: "https://picsum.photos/500/310", imageAlt: "Palazzo Pants", overlayText: "Comfort Wear", title: "Floral Print Palazzo", description: "Flowy palazzo pants with vibrant floral prints", price: "1699", section: "Women", category: "bottomwear", shopId: 6 },
    { id: "prod-12", image: "https://picsum.photos/500/311", imageAlt: "Cotton Skirt", overlayText: "Casual", title: "A-Line Cotton Skirt", description: "Comfortable cotton skirt for everyday wear", price: "1199", section: "Women", category: "bottomwear", shopId: 6 },
    { id: "prod-13", image: "https://picsum.photos/500/312", imageAlt: "Boho Skirt", overlayText: "Bohemian", title: "Bohemian Maxi Skirt", description: "Ethnic print maxi skirt with elastic waistband", price: "1899", section: "Women", category: "bottomwear", shopId: 7 },
    { id: "prod-14", image: "https://picsum.photos/500/313", imageAlt: "Wrap Pants", overlayText: "Trendy", title: "Designer Wrap Pants", description: "Stylish wrap-around pants with unique pattern", price: "2399", section: "Women", category: "bottomwear", shopId: 7 },
    { id: "prod-15", image: "https://picsum.photos/500/314", imageAlt: "Office Trousers", overlayText: "Professional", title: "Formal Office Trousers", description: "Tailored fit trousers for professional settings", price: "2899", section: "Women", category: "bottomwear", shopId: 8 },
    { id: "prod-16", image: "https://picsum.photos/500/315", imageAlt: "Culottes", overlayText: "Smart Casual", title: "Wide-Leg Culottes", description: "Chic culottes perfect for semi-formal occasions", price: "1999", section: "Women", category: "bottomwear", shopId: 8 },
    { id: "prod-17", image: "https://picsum.photos/500/316", imageAlt: "Midi Skirt", overlayText: "Versatile", title: "Pleated Midi Skirt", description: "Elegant pleated skirt that pairs with everything", price: "1599", section: "Women", category: "bottomwear", shopId: 9 },
    { id: "prod-18", image: "https://picsum.photos/500/317", imageAlt: "Jogger Pants", overlayText: "Comfort", title: "Casual Jogger Pants", description: "Comfortable jogger-style pants for relaxed days", price: "1399", section: "Women", category: "bottomwear", shopId: 9 },
    { id: "prod-19", image: "https://picsum.photos/500/318", imageAlt: "Evening Gown", overlayText: "Luxury", title: "Designer Evening Gown", description: "Exclusive designer gown for red carpet events", price: "8999", section: "Women", category: "bottomwear", shopId: 10 },
    { id: "prod-20", image: "https://picsum.photos/500/319", imageAlt: "Sequined Skirt", overlayText: "Party Wear", title: "Sequined Party Skirt", description: "Sparkling sequined skirt for night parties", price: "4299", section: "Women", category: "bottomwear", shopId: 10 },
    { id: "prod-21", image: "https://picsum.photos/500/320", imageAlt: "Designer Kurti", overlayText: "Best Seller", title: "Designer Printed Kurti", description: "Handcrafted ethnic kurti with intricate embroidery work", price: "1899", section: "Women", category: "topwear", shopId: 1 },
    { id: "prod-22", image: "https://picsum.photos/500/321", imageAlt: "Silk Saree", overlayText: "Premium", title: "Pure Silk Saree", description: "Traditional silk sare e with golden zari border", price: "4599", section: "Women", category: "topwear", shopId: 1 },
    { id: "prod-23", image: "https://picsum.photos/500/322", imageAlt: "Casual Top", overlayText: "Trending", title: "Casual Cotton Top", description: "Comfortable everyday wear top with modern design", price: "899", section: "Women", category: "topwear", shopId: 2 },
    { id: "prod-24", image: "https://picsum.photos/500/323", imageAlt: "Denim Shorts", overlayText: "Summer Essential", title: "High-Waist Denim Shorts", description: "Stylish denim shorts perfect for casual outings", price: "1299", section: "Women", category: "bottomwear", shopId: 2 },
    { id: "prod-25", image: "https://picsum.photos/500/324", imageAlt: "Party Gown", overlayText: "Exclusive", title: "Evening Party Gown", description: "Elegant floor-length gown for special occasions", price: "7599", section: "Women", category: "topwear", shopId: 3 },
    { id: "prod-26", image: "https://picsum.photos/500/325", imageAlt: "Cocktail Dress", overlayText: "New Arrival", title: "Cocktail Party Dress", description: "Chic cocktail dress with sequin detailing", price: "3899", section: "Women", category: "topwear", shopId: 3 },
    { id: "prod-27", image: "https://picsum.photos/500/326", imageAlt: "Western Dress", overlayText: "Bestseller", title: "A-Line Western Dress", description: "Flowy A-line dress perfect for brunch dates", price: "2299", section: "Women", category: "topwear", shopId: 4 },
    { id: "prod-28", image: "https://picsum.photos/500/327", imageAlt: "Designer Jeans", overlayText: "Premium Fit", title: "Slim Fit Designer Jeans", description: "Comfortable slim fit jeans with stretch fabric", price: "2799", section: "Women", category: "bottomwear", shopId: 4 },
    { id: "prod-29", image: "https://picsum.photos/500/328", imageAlt: "Anarkali Suit", overlayText: "Traditional", title: "Designer Anarkali Suit", description: "Regal anarkali suit with heavy embroidery work", price: "5199", section: "Women", category: "topwear", shopId: 5 },
    { id: "prod-30", image: "https://picsum.photos/500/329", imageAlt: "Chanderi Kurti", overlayText: "Handcrafted", title: "Chanderi Silk Kurti", description: "Lightweight chanderi silk kurti with delicate prints", price: "3199", section: "Women", category: "topwear", shopId: 5 },
    { id: "prod-31", image: "https://picsum.photos/500/330", imageAlt: "Palazzo Pants", overlayText: "Comfort Wear", title: "Floral Print Palazzo", description: "Flowy palazzo pants with vibrant floral prints", price: "1699", section: "Women", category: "bottomwear", shopId: 6 },
    { id: "prod-32", image: "https://picsum.photos/500/331", imageAlt: "Cotton Skirt", overlayText: "Casual", title: "A-Line Cotton Skirt", description: "Comfortable cotton skirt for everyday wear", price: "1199", section: "Women", category: "bottomwear", shopId: 6 },
    { id: "prod-33", image: "https://picsum.photos/500/332", imageAlt: "Boho Skirt", overlayText: "Bohemian", title: "Bohemian Maxi Skirt", description: "Ethnic print maxi skirt with elastic waistband", price: "1899", section: "Women", category: "bottomwear", shopId: 7 },
    { id: "prod-34", image: "https://picsum.photos/500/333", imageAlt: "Wrap Pants", overlayText: "Trendy", title: "Designer Wrap Pants", description: "Stylish wrap-around pants with unique pattern", price: "2399", section: "Women", category: "bottomwear", shopId: 7 },
    { id: "prod-35", image: "https://picsum.photos/500/334", imageAlt: "Office Trousers", overlayText: "Professional", title: "Formal Office Trousers", description: "Tailored fit trousers for professional settings", price: "2899", section: "Women", category: "bottomwear", shopId: 8 },
    { id: "prod-36", image: "https://picsum.photos/500/335", imageAlt: "Culottes", overlayText: "Smart Casual", title: "Wide-Leg Culottes", description: "Chic culottes perfect for semi-formal occasions", price: "1999", section: "Women", category: "bottomwear", shopId: 8 },
    { id: "prod-37", image: "https://picsum.photos/500/336", imageAlt: "Midi Skirt", overlayText: "Versatile", title: "Pleated Midi Skirt", description: "Elegant pleated skirt that pairs with everything", price: "1599", section: "Women", category: "bottomwear", shopId: 9 },
    { id: "prod-38", image: "https://picsum.photos/500/337", imageAlt: "Jogger Pants", overlayText: "Comfort", title: "Casual Jogger Pants", description: "Comfortable jogger-style pants for relaxed days", price: "1399", section: "Women", category: "bottomwear", shopId: 9 },
    { id: "prod-39", image: "https://picsum.photos/500/338", imageAlt: "Evening Gown", overlayText: "Luxury", title: "Designer evening Gown", description: "Exclusive designer gown for red carpet events", price: "8999", section: "Women", category: "bottomwear", shopId: 10 },
    { id: "prod-40", image: "https://picsum.photos/500/339", imageAlt: "Sequined Skirt", overlayText: "Party Wear", title: "Sequined Party Skirt", description: "Sparkling sequined skirt for night parties", price: "4299", section: "Women", category: "bottomwear", shopId: 10 }
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