import { NextResponse } from "next/server";
import { mockProducts } from "@/data/mockProducts";

// GET /api/products/:id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}
