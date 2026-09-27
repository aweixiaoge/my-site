export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Blog", href: "/blog" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];
