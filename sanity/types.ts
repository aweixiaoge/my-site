import type { PortableTextBlock } from "@portabletext/react";

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

export type BlogPost = {
  _id: string;
  title: string;
  description?: string | null;
  author?: string | null;
  createdTime?: string | null;
  label?: string | null;
  imageUrl?: string | null;
};

export type BlogPostDetail = {
  _id: string;
  title: string;
  description?: string | null;
  author?: string | null;
  createdTime?: string | null;
  label?: string | null;
  images: string[];
  body?: PortableTextBlock[] | null;
};

export type AboutUs = {
  storyDescription: string;
  images: string[];
} | null;

export type ContactInfo = {
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  instagram?: string | null;
} | null;

export type InquiryInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/** Failure reasons as codes; the client renders them in the active language. */
export type InquirySubmitError = "invalid" | "write-failed";

export type InquiryResult =
  | { ok: true }
  | { ok: false; code: InquirySubmitError };
