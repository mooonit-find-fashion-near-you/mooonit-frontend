// app/api/mock-search/route.ts
import { mockProducts } from "@/data/mockProducts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category") || "all";

    const results = mockProducts.filter(
        (p) =>
            p.title.toLowerCase().includes(q.toLowerCase()) &&
            (category === "all" || p.category === category)
    );

    return NextResponse.json(results);
}
