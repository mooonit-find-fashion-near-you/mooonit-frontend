interface Product {
    id: string;
    image: string;
    imageAlt: string;
    overlayText: string;
    title: string;
    description: string;
    price: string;
    section: string;
    category: string;
}

const mockProducts: Product[] = [
    {
        id: "prod-1",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFyZ2hlcml0YSUyMFBpenphfGVufDB8fDB8fHww",
        imageAlt: "Margherita Pizza",
        overlayText: "Best Seller",
        title: "Margherita Pizza",
        description: "Fresh mozzarella, tomatoes, and basil on our signature crust",
        price: "599",
        section: "Women",
        category: "topwear"
    },
    {
        id: "prod-2",
        image: "https://images.unsplash.com/photo-1563612116891-9b03e4bb9318?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2FsbW9uJTIwU3VzaGklMjBSb2xsfGVufDB8fDB8fHww",
        imageAlt: "Salmon Sushi Roll",
        overlayText: "Chef Special",
        title: "Salmon Sushi Roll",
        description: "Fresh salmon with cucumber and avocado, served with wasabi",
        price: "899",
        section: "Women",
        category: "topwear"
    },
    {
        id: "prod-3",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
        imageAlt: "Classic Burger",
        overlayText: "Popular",
        title: "Classic Burger",
        description: "Beef patty with lettuce, tomato, cheese and our special sauce",
        price: "399",
        section: "Women",
        category: "topwear"
    },
    {
        id: "prod-4",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        imageAlt: "Smartwatch",
        overlayText: "New Arrival",
        title: "Smart Watch Pro",
        description: "Advanced fitness tracking with heart rate monitor and GPS",
        price: "12999",
        section: "Women",
        category: "topwear"
    },
    {
        id: "prod-5",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
        imageAlt: "Denim Jacket",
        overlayText: "Trending",
        title: "Vintage Denim Jacket",
        description: "Classic blue denim jacket with premium quality fabric",
        price: "2499",
        section: "Women",
        category: "bottomwear"
    },
    {
        id: "prod-6",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        imageAlt: "Fiction Novel",
        overlayText: "Bestseller",
        title: "Mystery Novel",
        description: "Thrilling mystery novel that will keep you on the edge",
        price: "499",
        section: "Women",
        category: "bottomwear"
    },
    {
        id: "prod-7",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        imageAlt: "Pasta",
        overlayText: "Chef's Choice",
        title: "Creamy Alfredo Pasta",
        description: "Rich and creamy pasta with parmesan cheese and herbs",
        price: "699",
        section: "Women",
        category: "bottomwear"
    },
    {
        id: "prod-8",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        imageAlt: "Running Shoes",
        overlayText: "Sport",
        title: "Running Shoes",
        description: "Comfortable running shoes with advanced cushioning technology",
        price: "4999",
        section: "Women",
        category: "bottomwear"
    }
];

export async function GET(request: Request): Promise<Response> {
    try {
        const { searchParams } = new URL(request.url);
        const section = searchParams.get('section');
        const category = searchParams.get('category');

        const products = getProducts(section || undefined, category || undefined);

        return Response.json(products);
    } catch (error) {
        return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

export function getProducts(section?: string, category?: string): Product[] {
    let filteredProducts = mockProducts;

    if (section) {
        filteredProducts = filteredProducts.filter(product => product.section === section);
    }

    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    return filteredProducts;
}