import { NextResponse } from "next/server";
import { shops } from "@/data/shops"

interface Params {
    params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
    const shop = shops.find((s) => String(s.id) === params.id);
    if (!shop)
        return NextResponse.json({ message: "Shop not found" }, { status: 404 });
    return NextResponse.json(shop);
}
