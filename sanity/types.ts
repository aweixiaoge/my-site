export type NavItem = {
  label: string;
  href: string;
};

export type Navigation = {
  items?: NavItem[] | null;
} | null;

export type Hero = {
  title: string;
  description?: string | null;
  path: string;
  imageUrl?: string | null;
} | null;

export type HotProduct = {
  _id: string;
  title: string;
  path: string;
  imageUrl?: string | null;
};

export type Product = {
  _id: string;
  title: string;
  path: string;
  imageUrl?: string | null;
  categoryId?: string | null;
};

export type ProductDetail = {
  _id: string;
  title: string;
  description?: string | null;
  path: string;
  images: string[];
  category?: { _id: string; title: string } | null;
};

export type ProductCategory = {
  _id: string;
  title: string;
};

export type ContentMedia = {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
} | null;

export type AboutUs = {
  storyDescription: string;
  images: string[];
} | null;
