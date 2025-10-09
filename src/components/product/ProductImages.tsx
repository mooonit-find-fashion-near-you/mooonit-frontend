// components/product/ProductImages.tsx
import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
    images: string[];
    title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Thumbnails - Horizontal on mobile, vertical on desktop */}
            <div className="flex lg:flex-col gap-2 gap-y-3 order-2 lg:order-1 overflow-x-auto lg:overflow-visible">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-22 h-22 rounded-lg p-0.5 border-2 transition-colors ${selectedImage === index ? 'border-[#E54B4B]' : 'border-gray-200 opacity-80 cursor-pointer hover:opacity-90'
                            }`}
                    >
                        <Image
                            src={image}
                            alt=""
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-[0.45rem]"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="order-1 lg:order-2 flex-1 aspect-square max-h-11/12">
                <Image
                    src={images[selectedImage]}
                    alt={title}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover rounded-lg"
                    priority
                />
            </div>
        </div>
    );
}