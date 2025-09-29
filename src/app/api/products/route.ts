import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/data/mockProducts';

// Helper function to extract numeric price (same as in page.tsx)
const extractPrice = (priceString: string): number => {
  if (!priceString) return 0;
  const numericString = priceString.replace(/[₹Rs.,\s]/g, '');
  const price = parseFloat(numericString);
  return isNaN(price) ? 0 : price;
};

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
      const minPriceNum = parseInt(minPrice);
      filteredProducts = filteredProducts.filter(product =>
        extractPrice(product.price) >= minPriceNum
      );
    }

    if (maxPrice) {
      const maxPriceNum = parseInt(maxPrice);
      filteredProducts = filteredProducts.filter(product =>
        extractPrice(product.price) <= maxPriceNum
      );
    }

    // Filter by sizes
    if (sizes) {
      const sizeArray = sizes.split(',');
      filteredProducts = filteredProducts.filter(product =>
        sizeArray.some(size => product.sizes?.includes(size))
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