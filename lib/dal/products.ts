import { prisma } from "@/lib/prisma";

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      images: { orderBy: { position: "asc" } },
      subcategory: { include: { category: true } },
    },
  });
}

export async function getNewArrivals(limit = 8) {
  return prisma.product.findMany({
    where: { isNewArrival: true, isActive: true },
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
    },
    orderBy: { newArrivalOrder: "asc" },
    take: limit,
  });
}
