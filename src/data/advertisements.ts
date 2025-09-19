export interface Advertisement {
    id: string
    saleText: string
    title: string
    subtitle: string
    buttonText: string
    imageUrl: string
    imageAlt: string
    backgroundColor: string
}

export const advertisements: Advertisement[] = [
    {
        id: "1",
        saleText: "SALE UP TO 25%",
        title: "It's In The Bag:",
        subtitle: "Limited Deals",
        buttonText: "Shop Now",
        imageUrl: "/images/fashion-model.jpg",
        imageAlt: "Fashion model in red patterned dress",
        backgroundColor: "#A67C5A",
    },
    {
        id: "2",
        saleText: "NEW ARRIVALS",
        title: "Spring Collection:",
        subtitle: "Fresh Styles",
        buttonText: "Explore",
        imageUrl: "/images/fashion-model.jpg",
        imageAlt: "Fashion model showcasing spring collection",
        backgroundColor: "#8B7355",
    },
    {
        id: "3",
        saleText: "EXCLUSIVE OFFER",
        title: "Premium Quality:",
        subtitle: "Luxury Items",
        buttonText: "Discover",
        imageUrl: "/images/fashion-model.jpg",
        imageAlt: "Fashion model in luxury outfit",
        backgroundColor: "#9A6B47",
    },
    {
        id: "4",
        saleText: "FLASH SALE",
        title: "Weekend Special:",
        subtitle: "Best Prices",
        buttonText: "Shop Sale",
        imageUrl: "/images/fashion-model.jpg",
        imageAlt: "Fashion model promoting weekend sale",
        backgroundColor: "#B8845C",
    },
]
