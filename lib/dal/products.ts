import { prisma } from "@/lib/prisma";
import { Product } from "@/types";
import { Prisma } from "@prisma/client";

const PRODUCTS_PER_PAGE = 12;

export type FilterOptions = {
  categories: { id: number; name: string; slug: string }[];
  subcategories: {
    id: number;
    name: string;
    slug: string;
    categorySlug: string;
  }[];
};

export type ProductListResult = {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  filterOptions: FilterOptions;
};

type GetProductsParams = {
  categorySlug?: string;
  subcategorySlug?: string;
  sort?: "newest" | "oldest";
  page?: number;
};

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

export async function getProducts({
  categorySlug,
  subcategorySlug,
  sort = "newest",
  page = 1,
}: GetProductsParams): Promise<ProductListResult> {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "newest" ? { createdAt: "desc" } : { createdAt: "asc" };

  let where: Prisma.ProductWhereInput = { isActive: true };

  if (subcategorySlug) {
    const matchingSubcategories = await prisma.subcategory.findMany({
      where: { slug: subcategorySlug },
      select: { id: true },
    });

    where = {
      ...where,
      subcategoryId: { in: matchingSubcategories.map((s) => s.id) },
    };
  } else if (categorySlug) {
    where = {
      ...where,
      subcategory: { category: { slug: categorySlug } },
    };
  }

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        subcategory: { include: { category: true } },
      },
      orderBy,
      skip,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  const categories = await prisma.category.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

  const subcategories = await prisma.subcategory.findMany({
    where: categorySlug ? { category: { slug: categorySlug } } : undefined,
    select: {
      id: true,
      name: true,
      slug: true,
      category: { select: { slug: true } },
    },
    orderBy: { name: "asc" },
  });

  return {
    products,
    totalCount,
    totalPages: Math.ceil(totalCount / PRODUCTS_PER_PAGE),
    currentPage: page,
    filterOptions: {
      categories,
      subcategories: subcategories.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        categorySlug: s.category.slug,
      })),
    },
  };
}
