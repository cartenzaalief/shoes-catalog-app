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
