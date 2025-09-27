import { Product, mockProducts } from "@/data/mockProducts";

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