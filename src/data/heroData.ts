export const heroData: Record<
    string,
    {
        title: string;
        subtitle: string;
        description: string;
        stats: { label: string; value: string }[];
        mainImage: string;
        miniImage: string;
    }
> = {
    Women: {
        title: "ELEGANCE IN EVERY STITCH",
        subtitle: "WOMEN",
        description:
            "Step into the world of modern women’s fashion—crafted with timeless designs, premium fabrics, and unmatched attention to detail.",
        stats: [
            { label: "Exclusive Styles", value: "1,200+" },
            { label: "Top-rated Shops", value: "850+" },
        ],
        mainImage: "/images/hero-women.jpg",
        miniImage: "/images/hero-mini-women.jpg",
    },
    Men: {
        title: "REDEFINE YOUR WARDROBE",
        subtitle: "MEN",
        description:
            "From casual wear to tailored classics, explore men’s fashion built on comfort, durability, and contemporary style.",
        stats: [
            { label: "Premium Outfits", value: "1,000+" },
            { label: "Verified Sellers", value: "720+" },
        ],
        mainImage: "/images/hero-men.jpg",
        miniImage: "/images/hero-mini-men.jpg",
    },
    "Foot Wear": {
        title: "WALK WITH CONFIDENCE",
        subtitle: "FOOTWEAR",
        description:
            "Find the perfect pair for every step—sporty sneakers, sleek formals, or everyday essentials crafted for durability and design.",
        stats: [
            { label: "Styles Available", value: "650+" },
            { label: "Comfort Rated", value: "97%" },
        ],
        mainImage: "/images/hero-footwear.jpg",
        miniImage: "/images/hero-mini-footwear.jpg",
    },
    Accessories: {
        title: "DETAILS THAT DEFINE YOU",
        subtitle: "ACCESSORIES",
        description:
            "Elevate your outfit with a touch of class—bags, watches, jewelry, and more to complete your signature look.",
        stats: [
            { label: "Curated Products", value: "800+" },
            { label: "Customer Favorites", value: "500+" },
        ],
        mainImage: "/images/hero-accessories.jpg",
        miniImage: "/images/hero-mini-accessories.jpg",
    },
};
