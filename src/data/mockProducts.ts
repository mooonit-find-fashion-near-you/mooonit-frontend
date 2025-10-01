// mockProducts.ts
import { Shop, shops } from './shops';

// Interfaces
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

// ---------------- Seeded RNG ----------------
function seededRNG(seed: number) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function createRNG(seed: number) {
    let currentSeed = seed;
    return () => seededRNG(currentSeed++);
}

// ----------------- Data Pools -----------------
const sections = ['Women', 'Foot Wear', 'Accessories', 'Bags'];

const categories: Record<string, string[]> = {
    Women: ['topwear', 'bottomwear', 'ethnic', 'gown'],
    'Foot Wear': ['heels', 'sneakers', 'sandals', 'boots'],
    Accessories: ['watches', 'jewellery', 'sunglasses', 'belts'],
    Bags: ['backpacks', 'clutches', 'sling', 'tote'],
};

const sampleTitles: Record<string, string[]> = {
    topwear: ['Designer Kurti', 'Cotton Top', 'Silk Saree', 'Western Dress'],
    bottomwear: ['Denim Jeans', 'Maxi Skirt', 'Formal Trousers', 'Joggers'],
    ethnic: ['Anarkali Suit', 'Chanderi Kurti', 'Lehenga Choli', 'Saree'],
    gown: ['Evening Gown', 'Cocktail Dress', 'Party Gown'],
    heels: ['Stiletto Heels', 'Block Heels', 'Wedge Sandals'],
    sneakers: ['Running Sneakers', 'High-top Sneakers', 'Casual Sneakers'],
    sandals: ['Leather Sandals', 'Kolhapuri Chappals', 'Flip Flops'],
    boots: ['Chelsea Boots', 'Ankle Boots', 'Combat Boots'],
    watches: ['Analog Watch', 'Smart Watch', 'Luxury Wristwatch'],
    jewellery: ['Necklace Set', 'Earrings', 'Bracelet', 'Ring'],
    sunglasses: ['Aviator Shades', 'Round Sunglasses', 'Wayfarer Shades'],
    belts: ['Leather Belt', 'Designer Belt', 'Formal Belt'],
    backpacks: ['Laptop Backpack', 'Travel Backpack', 'Casual Backpack'],
    clutches: ['Evening Clutch', 'Party Clutch', 'Wedding Clutch'],
    sling: ['Crossbody Sling', 'Mini Sling Bag', 'Trendy Sling'],
    tote: ['Leather Tote', 'Canvas Tote', 'Shopping Tote'],
};

const sampleDescriptions = [
    'High-quality and durable',
    'Trendy design for everyday use',
    'Made from premium fabric',
    'Comfortable fit and stylish look',
    'Perfect for casual and formal occasions',
];

const overlayTexts = ['Best Seller', 'Trending', 'Exclusive', 'Premium', 'New Arrival'];

const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

// ----------------- Product Generator -----------------
export const generateProductsForShops = (seed = 12345, numPerShop = 10): Product[] => {
    const rng = createRNG(seed);
    let productCounter = 1;

    const randomPick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];
    const getRandomSizes = (): string[] => {
        const shuffled = [...allSizes].sort(() => rng() - 0.5);
        const count = Math.floor(rng() * allSizes.length) + 1;
        return shuffled.slice(0, count).sort();
    };
    const generateImages = (): string[] => {
        const randomId = Math.floor(rng() * 10000);
        return Array.from({ length: 5 }, (_, i) => `https://picsum.photos/1920/1080?random=${randomId + i}`);
    };

    const generated: Product[] = [];

    shops.forEach((shop) => {
        for (let i = 0; i < numPerShop; i++) {
            const section = randomPick(sections);
            const category = randomPick(categories[section]);
            const title = randomPick(sampleTitles[category]);
            const description = randomPick(sampleDescriptions);
            const price = (Math.floor(rng() * 80) + 10) * 100;
            const oldPrice = price + Math.floor(rng() * 1000) + 500;

            generated.push({
                id: `prod-${productCounter++}`,
                images: generateImages(),
                imageAlt: title,
                overlayText: randomPick(overlayTexts),
                title,
                description,
                price: `₹${price - 1}.00`,
                oldPrice: `₹${oldPrice}.00`,
                section,
                category,
                shopId: shop.id,
                sizes: getRandomSizes(),
            });
        }
    });

    return generated;
};

// ----------------- Export Mock Products -----------------
export const mockProducts: Product[] = generateProductsForShops(12345, 150);

// ----------------- Helper Functions -----------------
export const getProductsByShopId = (shopId: number): Product[] =>
    mockProducts.filter((product) => product.shopId === shopId);

export const getShopByProductId = (productId: string): Shop | undefined => {
    const product = mockProducts.find((p) => p.id === productId);
    return product ? shops.find((shop) => shop.id === product.shopId) : undefined;
};
