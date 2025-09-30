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

const authors = [
    "Priya Sharma", "Anjali Patel", "Rohit Kumar", "Deepika Singh", "Neha Kapoor",
    "Rajesh Kumar", "Sneha Patel", "Ravi Kumar", "Aditi Verma", "Karan Mehta",
    "Pooja Rani", "Vikas Sharma", "Nisha Agarwal", "Suresh Iyer", "Maya Nair",
    "Aman Tiwari", "Simran Kaur", "Arjun Desai", "Meena Joshi", "Rahul Bhat"
];

const comments = [
    "Absolutely love this piece! The quality exceeded my expectations.",
    "Good fabric and design, but sizing could be better.",
    "Perfect for casual and festive wear. Got many compliments!",
    "Fabric feels premium and comfortable.",
    "Decent product for the price. Could be improved.",
    "Looks exactly like the photos. Very happy with this purchase.",
    "Delivery was fast and packaging was nice.",
    "Not worth the price. Expected better quality.",
    "Stylish and trendy. Fits well.",
    "Great value for money. Would recommend."
];

// Helper: random choice
function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Generate reviews
export const mockReviews: Review[] = Array.from({ length: 40 * 3 }).map((_, i) => {
    const productId = `prod-${Math.floor(i / 3) + 1}`;
    return {
        id: `rev-${i + 1}`,
        productId,
        rating: Math.floor(Math.random() * 3) + 3, // 3 to 5 stars
        comment: pick(comments),
        author: pick(authors),
        date: `${Math.floor(Math.random() * 12) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}-${Math.floor(Math.random() * 10) + 2020}`,
        verified: Math.random() < 0.7, // 70% verified
    };
});
