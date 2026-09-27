export type NavItem = {
  label: string;
  href: string;
};

export type Navigation = {
  items?: NavItem[] | null;
} | null;
