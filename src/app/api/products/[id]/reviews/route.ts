// app/api/products/[id]/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mockReviews } from '@/data/mockReviews';

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id: productId } = params;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const reviews = mockReviews.filter(review => review.productId === productId);

    if (reviews.length === 0) {
        return NextResponse.json(
            { error: 'No reviews found for this product' },
            { status: 404 }
        );
    }

    // Calculate average rating and distribution
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    const totalReviews = reviews.length;

    const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
        stars,
        count: reviews.filter(review => review.rating === stars).length,
        percentage: (reviews.filter(review => review.rating === stars).length / totalReviews * 100).toFixed(0) + '%'
    }));

    return NextResponse.json({
        averageRating: averageRating.toFixed(1),
        totalReviews,
        ratingDistribution,
        reviews: reviews.slice(0, 5) // Return only first 5 reviews
    });
}