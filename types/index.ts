export type ProductImage = {
  id: number;
  url: string;
  alt: string | null;
  position: number;
  productId: number;
  createdAt: Date;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  subcategoryId: number;
  isNewArrival: boolean;
  newArrivalOrder: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: ProductImage[];
  subcategory?: Subcategory;
};

export type Subcategory = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  displayOrder: number | null;
  categoryId: number;
  createdAt: Date;
  category?: Category;
  products?: Product[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  subcategories?: Subcategory[];
};

export type CarouselSlide = {
  id: number;
  title: string | null;
  subtitle: string | null;
  desktopImageUrl: string;
  mobileImageUrl: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  displayOrder: number;
  isActive: boolean;
};

export type Partner = {
  id: number;
  name: string;
  logoUrl: string;
  displayOrder: number;
  isActive: boolean;
};
