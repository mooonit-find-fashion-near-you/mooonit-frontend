import { NextResponse } from "next/server"
import { advertisements } from "@/data/advertisements"

// GET /api/advertisements?section=Women
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get("section") || "Women"

  const filteredAds = advertisements.filter((ad) => ad.section === section)

  return NextResponse.json(filteredAds)
}
