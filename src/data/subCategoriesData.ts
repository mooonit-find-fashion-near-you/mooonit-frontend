export interface SubCategory {
    id: string;
    name: string;
    image: string;
    slug: string;
    subCategories?: SubCategory[]; // 👈 added for sub-subcategories
}

export interface SubCategoriesData {
    [key: string]: SubCategory[];
}

export const subCategoriesData: SubCategoriesData = {
    women: [
        {
            id: 'women-topwear',
            name: 'Top Wear',
            image: '/images/categories/women-topwear.png',
            slug: 'topwear',
            subCategories: [
                { id: 'women-topwear-tshirts', name: 'T-Shirts', image: '/images/categories/women-tshirts.png', slug: 'tshirts' },
                { id: 'women-topwear-shirts', name: 'Shirts', image: '/images/categories/women-shirts.png', slug: 'shirts' },
                { id: 'women-topwear-crop', name: 'Crop Tops', image: '/images/categories/women-crop.png', slug: 'crop-tops' },
                { id: 'women-topwear-sweaters', name: 'Sweaters', image: '/images/categories/women-sweaters.png', slug: 'sweaters' }
            ]
        },
        {
            id: 'women-bottomwear',
            name: 'Bottom Wear',
            image: '/images/categories/women-bottomwear.png',
            slug: 'bottomwear',
            subCategories: [
                { id: 'women-bottomwear-jeans', name: 'Jeans', image: '/images/categories/women-jeans.png', slug: 'jeans' },
                { id: 'women-bottomwear-trousers', name: 'Trousers', image: '/images/categories/women-trousers.png', slug: 'trousers' },
                { id: 'women-bottomwear-shorts', name: 'Shorts', image: '/images/categories/women-shorts.png', slug: 'shorts' },
                { id: 'women-bottomwear-skirts', name: 'Skirts', image: '/images/categories/women-skirts.png', slug: 'skirts' }
            ]
        },
        {
            id: 'women-footwear',
            name: 'Footwear',
            image: '/images/categories/women-footwear.png',
            slug: 'footwear',
            subCategories: [
                { id: 'women-footwear-flats', name: 'Flats', image: '/images/categories/women-flats.png', slug: 'flats' },
                { id: 'women-footwear-sneakers', name: 'Sneakers', image: '/images/categories/women-sneakers.png', slug: 'sneakers' },
                { id: 'women-footwear-heels', name: 'Heels', image: '/images/categories/women-heels.png', slug: 'heels' },
                { id: 'women-footwear-boots', name: 'Boots', image: '/images/categories/women-boots.png', slug: 'boots' }
            ]
        },
        {
            id: 'women-ethnic',
            name: 'Ethnic Wear',
            image: '/images/categories/women-ethnic.png',
            slug: 'ethnic',
            subCategories: [
                { id: 'women-ethnic-sarees', name: 'Sarees', image: '/images/categories/women-sarees.png', slug: 'sarees' },
                { id: 'women-ethnic-kurtis', name: 'Kurtis', image: '/images/categories/women-kurtis.png', slug: 'kurtis' },
                { id: 'women-ethnic-lehenga', name: 'Lehengas', image: '/images/categories/women-lehenga.png', slug: 'lehengas' },
                { id: 'women-ethnic-salwar', name: 'Salwar Suits', image: '/images/categories/women-salwar.png', slug: 'salwar-suits' }
            ]
        },
        {
            id: 'women-western',
            name: 'Western Wear',
            image: '/images/categories/women-western.png',
            slug: 'western',
            subCategories: [
                { id: 'women-western-dresses', name: 'Dresses', image: '/images/categories/women-dresses.png', slug: 'dresses' },
                { id: 'women-western-jumpsuits', name: 'Jumpsuits', image: '/images/categories/women-jumpsuits.png', slug: 'jumpsuits' },
                { id: 'women-western-jackets', name: 'Jackets', image: '/images/categories/women-jackets.png', slug: 'jackets' },
                { id: 'women-western-coords', name: 'Co-Ords', image: '/images/categories/women-coords.png', slug: 'co-ords' }
            ]
        }
    ],
    footwear: [
        { id: 'footwear-sneakers', name: 'Sneakers', image: '/images/categories/sneakers.png', slug: 'sneakers' },
        { id: 'footwear-formal', name: 'Formal Shoes', image: '/images/categories/formal-shoes.png', slug: 'formal-shoes' },
        { id: 'footwear-sandals', name: 'Sandals', image: '/images/categories/sandals.png', slug: 'sandals' },
        { id: 'footwear-heels', name: 'Heels', image: '/images/categories/heels.png', slug: 'heels' }
    ],
    accessories: [
        { id: 'accessories-bags', name: 'Bags', image: '/images/categories/bags.png', slug: 'bags' },
        { id: 'accessories-watches', name: 'Watches', image: '/images/categories/watches.png', slug: 'watches' },
        { id: 'accessories-jewelry', name: 'Jewelry', image: '/images/categories/jewelry.png', slug: 'jewelry' },
        { id: 'accessories-belts', name: 'Belts', image: '/images/categories/belts.png', slug: 'belts' }
    ],
    bags: [
        { id: 'bags-backpacks', name: 'Backpacks', image: '/images/categories/backpacks.png', slug: 'backpacks' },
        { id: 'bags-clutches', name: 'Clutches', image: '/images/categories/clutches.png', slug: 'clutches' },
        { id: 'bags-sling', name: 'Sling', image: '/images/categories/sling.png', slug: 'sling' },
        { id: 'bags-tote', name: 'Tote', image: '/images/categories/tote.png', slug: 'tote' }
    ]
};
