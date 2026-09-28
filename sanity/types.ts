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

export type ContentMedia = {
  title: string;
  description?: string | null;
  videoUrl?: string | null;
} | null;
