import { prisma } from "@/lib/prisma";

export async function getCarouselSlides() {
  return prisma.carouselSlide.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
}

export async function getPartners() {
  return prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
}
