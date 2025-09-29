// data/mockReviews.ts
export interface Review {
    id: string;
    productId: string;
    rating: number;
    comment: string;
    author: string;
    date: string;
    verified: boolean;
}

export const mockReviews: Review[] = [
    {
        id: 'rev-1',
        productId: 'prod-1',
        rating: 5,
        comment: 'Absolutely love this kurti! The fabric is premium and the embroidery is exquisite.',
        author: 'Priya Sharma',
        date: '2024-01-15',
        verified: true
    },
    {
        id: 'rev-2',
        productId: 'prod-1',
        rating: 4,
        comment: 'Good quality material, but the size runs a bit small. Would recommend ordering one size up.',
        author: 'Anjali Patel',
        date: '2024-01-10',
        verified: true
    },
    {
        id: 'rev-3',
        productId: 'prod-1',
        rating: 5,
        comment: 'Perfect for festive occasions. Received many compliments!',
        author: 'Rohit Kumar',
        date: '2024-01-08',
        verified: false
    },
    {
        id: 'rev-4',
        productId: 'prod-2',
        rating: 5,
        comment: 'Beautiful silk saree with authentic zari work. Worth every penny!',
        author: 'Deepika Singh',
        date: '2024-01-12',
        verified: true
    },
    {
        id: 'rev-5',
        productId: 'prod-2',
        rating: 4,
        comment: 'Great quality silk saree. The fabric is soft and luxurious, and the zari work is elegant and intricate.',
        author: 'Neha Kapoor',
        date: '2024-01-09',
        verified: true
    },
    {
        id: 'rev-6',
        productId: 'prod-2',
        rating: 5,
        comment: 'Excellent silk saree, perfect for any occasion. Highly recommended!',
        author: 'Rajesh Kumar',
        date: '2024-01-11',
        verified: false
    },
    {
        id: 'rev-7',
        productId: 'prod-3',
        rating: 4,
        comment: 'Good quality cotton shirt. The fit is comfortable and the fabric is soft and breathable.',
        author: 'Sneha Patel',
        date: '2024-01-14',
        verified: true
    },
    {
        id: 'rev-8',
        productId: 'prod-3',
        rating: 5,
        comment: 'Excellent cotton shirt, perfect for any occasion. Highly recommended!',
        author: 'Ravi Kumar',
        date: '2024-01-13',
        verified: false
    }
];