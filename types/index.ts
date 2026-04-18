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

export type ContentPosition =
  | "TOP_LEFT"
  | "TOP_CENTER"
  | "TOP_RIGHT"
  | "CENTER_LEFT"
  | "CENTER"
  | "CENTER_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_CENTER"
  | "BOTTOM_RIGHT";

export type CarouselSlide = {
  id: number;
  title: string | null;
  subtitle: string | null;
  desktopImageUrl: string;
  mobileImageUrl: string | null;
  buttonText: string | null;
  buttonLink: string | null;
  contentPosition: ContentPosition;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Partner = {
  id: number;
  name: string;
  logoUrl: string;
  displayOrder: number;
  isActive: boolean;
};

export type SearchProduct = {
  id: number;
  name: string;
  slug: string;
  images: { url: string; alt: string | null }[];
  subcategory: { slug: string; category: { slug: string } };
};

export type SearchSubcategory = {
  id: number;
  name: string;
  slug: string;
  category: { slug: string; name: string };
};

export type SearchResults = {
  subcategories: SearchSubcategory[];
  products: SearchProduct[];
};
