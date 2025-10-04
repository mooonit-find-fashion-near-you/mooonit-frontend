// components/product/ProductDetails.tsx
import { Product } from "@/data/mockProducts";
import ShopInfo from "./ShopInfo";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailsProps {
    product: Product;
    selectedSize: string;
    onSizeChange: (size: string) => void;
    quantity: number;
    onQuantityChange: (change: number) => void;
}

export default function ProductDetails({
    product,
    selectedSize,
    onSizeChange,
    quantity,
    onQuantityChange,
}: ProductDetailsProps) {
    return (
        <div className="space-y-6 font-[outfit]">
            <ShopInfo productId={product.id} />

            <div>
                <h1 className="text-[2.1rem] font-normal mb-2 font-[TOPLUXURY]">{product.title}</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-2xl font-semibold text-[#e54b4b]">{product.price}</span>
                    {product.oldPrice && (
                        <span className="text-lg text-[#757575] line-through">{product.oldPrice}</span>
                    )}
                </div>
            </div>

            <p className="text-[#757575] leading-relaxed">{product.description}</p>

            {/* TODO: Display variants in place of SizeSelector */}
            <SizeSelector
                sizes={product.sizes || []}
                selectedSize={selectedSize}
                onSizeChange={onSizeChange}
            />

            <div className="flex items-center space-x-4">
                <QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} />
                <AddToCartButton />
            </div>
        </div>
    );
}