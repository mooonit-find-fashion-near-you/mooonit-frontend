import { NextResponse } from "next/server"
import { shops } from "@/data/shops"

// GET /api/trending-shops?section=Men
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const section = searchParams.get("section") || "Women"

    const filteredShops = shops.filter((shop) => shop.section === section)

    return NextResponse.json(filteredShops)
}
