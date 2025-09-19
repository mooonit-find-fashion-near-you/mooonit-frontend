export interface SubCategory {
    id: string;
    name: string;
    image: string;
    slug: string;
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
            slug: 'topwear'
        },
        {
            id: 'women-bottomwear',
            name: 'Bottom Wear',
            image: '/images/categories/women-bottomwear.png',
            slug: 'bottomwear'
        },
        {
            id: 'women-footwear',
            name: 'Footwear',
            image: '/images/categories/women-footwear.png',
            slug: 'footwear'
        },
        {
            id: 'women-ethnic',
            name: 'Ethnic Wear',
            image: '/images/categories/women-ethnic.png',
            slug: 'ethnic'
        },
        {
            id: 'women-western',
            name: 'Western Wear',
            image: '/images/categories/women-western.png',
            slug: 'western'
        }
    ],
    men: [
        {
            id: 'men-shirts',
            name: 'Shirts',
            image: '/images/categories/men-shirts.png',
            slug: 'shirts'
        },
        {
            id: 'men-trousers',
            name: 'Trousers',
            image: '/images/categories/men-trousers.png',
            slug: 'trousers'
        },
        {
            id: 'men-jackets',
            name: 'Jackets',
            image: '/images/categories/men-jackets.png',
            slug: 'jackets'
        },
        {
            id: 'men-sportswear',
            name: 'Sportswear',
            image: '/images/categories/men-sportswear.png',
            slug: 'sportswear'
        },
        {
            id: 'men-footwear',
            name: 'Footwear',
            image: '/images/categories/men-footwear.png',
            slug: 'footwear'
        }
    ],
    footwear: [
        {
            id: 'footwear-sneakers',
            name: 'Sneakers',
            image: '/images/categories/sneakers.png',
            slug: 'sneakers'
        },
        {
            id: 'footwear-formal',
            name: 'Formal Shoes',
            image: '/images/categories/formal-shoes.png',
            slug: 'formal-shoes'
        },
        {
            id: 'footwear-sandals',
            name: 'Sandals',
            image: '/images/categories/sandals.png',
            slug: 'sandals'
        },
        {
            id: 'footwear-heels',
            name: 'Heels',
            image: '/images/categories/heels.png',
            slug: 'heels'
        }
    ],
    accessories: [
        {
            id: 'accessories-bags',
            name: 'Bags',
            image: '/images/categories/bags.png',
            slug: 'bags'
        },
        {
            id: 'accessories-watches',
            name: 'Watches',
            image: '/images/categories/watches.png',
            slug: 'watches'
        },
        {
            id: 'accessories-jewelry',
            name: 'Jewelry',
            image: '/images/categories/jewelry.png',
            slug: 'jewelry'
        },
        {
            id: 'accessories-belts',
            name: 'Belts',
            image: '/images/categories/belts.png',
            slug: 'belts'
        }
    ]
};