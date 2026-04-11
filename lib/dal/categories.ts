import { prisma } from "@/lib/prisma";

export async function getAllCategoriesWithSubcategories() {
  return prisma.category.findMany({
    include: {
      subcategories: {
        orderBy: { displayOrder: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      subcategories: {
        orderBy: { displayOrder: "asc" },
      },
    },
  });
}
