import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ categories: [], products: [] });
  }

  const [subcategories, products] = await Promise.all([
    prisma.subcategory.findMany({
      where: { name: { contains: query, mode: "insensitive" } },
      include: { category: true },
      take: 5,
    }),
    prisma.product.findMany({
      where: {
        isActive: true,
        name: { contains: query, mode: "insensitive" },
      },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        subcategory: { include: { category: true } },
      },
      take: 5,
    }),
  ]);

  return NextResponse.json({ subcategories, products });
}
