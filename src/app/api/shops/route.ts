interface Shop {
    id: string;
    image: string;
    title: string;
    rating: number;
    time: string;
    distance: string;
    location: string;
    section: string;
    category: string;
}

const mockShops: Shop[] = [
    {
        id: "shop-1",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
        title: "Pizza Palace",
        rating: 4.5,
        time: "25-30 min",
        distance: "2.1 km",
        location: "Downtown",
        section: "Women",
        category: "topwear"
    },
    {
        id: "shop-2",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        title: "Sushi Express",
        rating: 4.8,
        time: "20-25 min",
        distance: "1.5 km",
        location: "City Center",
        section: "Women",
        category: "topwear"
    },
    {
        id: "shop-3",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
        title: "Burger Junction",
        rating: 4.2,
        time: "15-20 min",
        distance: "0.8 km",
        location: "Mall Road",
        section: "Women",
        category: "topwear"
    },
    {
        id: "shop-4",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
        title: "Fashion Hub",
        rating: 4.6,
        time: "Open now",
        distance: "3.2 km",
        location: "Shopping District",
        section: "Women",
        category: "bottomwear"
    },
    {
        id: "shop-5",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
        title: "Tech Store",
        rating: 4.4,
        time: "Open now",
        distance: "2.8 km",
        location: "Tech Park",
        section: "Women",
        category: "bottomwear"
    },
    {
        id: "shop-6",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
        title: "Book Cafe",
        rating: 4.7,
        time: "Open now",
        distance: "1.9 km",
        location: "University Area",
        section: "Women",
        category: "bottomwear"
    }
];

export async function GET(request: Request): Promise<Response> {
    try {
        console.log('GET request received');
        console.log('Request URL:', request.url);
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section');
        const category = searchParams.get('category');

        console.log('Section:', section);
        console.log('Category:', category);

        const shops = getShops(section || undefined, category || undefined);

        console.log('Shops fetched:', shops);

        return Response.json(shops);
    } catch (error) {
        console.log('Error fetching shops:', error);
        return Response.json({ error: 'Failed to fetch shops' }, { status: 500 });
    }
}

export function getShops(section?: string, category?: string): Shop[] {
    let filteredShops = mockShops;

    console.log('getShops called with section:', section, 'and category:', category);

    if (section) {
        console.log('Filtering shops by section:', section);
        filteredShops = filteredShops.filter((shop: Shop) => shop.section === section);
    }

    if (category) {
        console.log('Filtering shops by category:', category);
        filteredShops = filteredShops.filter((shop: Shop) => shop.category === category);
    }

    console.log('Filtered shops:', filteredShops);

    return filteredShops;
}
