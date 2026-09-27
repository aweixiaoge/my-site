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
