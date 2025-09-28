import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/data/mockProducts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const shopId = searchParams.get('shopId');
  const section = searchParams.get('section');
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sizes = searchParams.get('sizes');

  try {
    let filteredProducts = mockProducts;

    // Filter by shopId
    if (shopId) {
      filteredProducts = filteredProducts.filter(product => 
        product.shopId === parseInt(shopId)
      );
    }

    // Filter by section
    if (section) {
      filteredProducts = filteredProducts.filter(product =>
        product.section.toLowerCase() === section.toLowerCase()
      );
    }

    // Filter by category (if not "all")
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= parseInt(minPrice)
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= parseInt(maxPrice)
      );
    }

    // Filter by sizes
    if (sizes) {
      const sizeArray = sizes.split(',');
      filteredProducts = filteredProducts.filter(product =>
        sizeArray.some(size => product.sizes.includes(size))
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
}

// Optional: Endpoint for category counts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shopId, section } = body;

    // This would normally query your database
    const categoryCounts = {
      dresses: 12,
      shoes: 8,
      accessories: 15,
      tops: 7
    };

    return NextResponse.json(categoryCounts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category counts' }, 
      { status: 500 }
    );
  }
}