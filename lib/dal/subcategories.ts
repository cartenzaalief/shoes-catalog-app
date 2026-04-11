import { prisma } from "@/lib/prisma";

export async function getSubcategoryBySlug(slug: string, categorySlug: string) {
  return prisma.subcategory.findFirst({
    where: {
      slug,
      category: { slug: categorySlug },
    },
    include: {
      category: true,
      products: {
        where: { isActive: true },
        include: {
          images: { orderBy: { position: "asc" }, take: 1 },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
