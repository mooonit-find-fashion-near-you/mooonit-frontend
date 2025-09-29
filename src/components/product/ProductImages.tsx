// components/product/ProductImages.tsx
import Image from "next/image";

interface ProductImagesProps {
    images: string[];
    title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
    return (
        <div className="flex space-x-4">
            <div className="flex flex-col space-y-4">
                {images?.map((image: string, index: number) => (
                    <div key={index} className="w-16 bg-[#ffbeb9] rounded-lg overflow-hidden">
                        <Image
                            src={image}
                            alt={`Product thumbnail ${index + 1}`}
                            width={192}
                            height={108}
                            className="w-full object-cover aspect-square"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>
            <div className="bg-[#ffbeb9] rounded-lg overflow-hidden relative">
                <Image
                    src={images?.[0]}
                    alt={title}
                    width={192}
                    height={108}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </div>
    );
}