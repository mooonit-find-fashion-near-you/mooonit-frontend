const getRandomNum = () => Math.floor(Math.random() * 1000);

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
            { label: "Exclusive Styles", value: "999+" },
            { label: "Top-rated Shops", value: "850+" },
        ],
        mainImage: "/images/hero-women.jpg",
        miniImage: "/images/hero-mini-women.jpg",
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
        mainImage: `https://picsum.photos/1920/1080?random=${getRandomNum()}`,
        miniImage: `https://picsum.photos/1920/1080?random=${getRandomNum()}`,
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
        mainImage: `https://picsum.photos/1920/1080?random=${getRandomNum()}`,
        miniImage: `https://picsum.photos/1920/1080?random=${getRandomNum()}`,
    },
    Bags: {
        title: "CARRY YOUR WORLD",
        subtitle: "BAGS",
        description:
            "From sleek clutches to spacious backpacks, discover bags that blend functionality with high-end design.",
        stats: [
            { label: "Styles to Explore", value: "400+" },
            { label: "Trending Now", value: "250+" },
        ],
        mainImage: `https://picsum.photos/1920/1080?random=${getRandomNum()}`,
        miniImage: `https://picsum.photos/1920/1080?random=${getRandomNum()}`,
    },
};

// 👇 auto-sync sections
export const sections = Object.keys(heroData);
