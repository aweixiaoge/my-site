import { render, screen } from "@testing-library/react";
import { ProductDetailContent } from "@/components/product-detail-content";
import { en } from "@/lib/i18n/dictionaries/en";
import { getRelatedProducts } from "@/sanity/products";
import type { ProductDetail } from "@/sanity/types";

jest.mock("@/sanity/products", () => ({
  getRelatedProducts: jest.fn(),
}));

const mockGetRelatedProducts = getRelatedProducts as jest.Mock;

const product: ProductDetail = {
  _id: "product-1",
  title: "Forecasting",
  description: "See where your revenue is heading.",
  path: "/product/smartphone/10",
  images: [
    "https://example.com/forecasting-1.png",
    "https://example.com/forecasting-2.png",
  ],
  category: { _id: "cat-phone", title: "Smartphone" },
};

const related = [
  {
    _id: "product-2",
    title: "Reporting",
    path: "/product/smartphone/9",
    imageUrl: "https://example.com/reporting.png",
  },
];

describe("ProductDetailContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRelatedProducts.mockResolvedValue(related);
  });

  it("should_render_the_product_title", async () => {
    render(await ProductDetailContent({ locale: "en", dict: en, product }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Forecasting" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_description_as_the_tagline_and_in_the_description_block", async () => {
    render(await ProductDetailContent({ locale: "en", dict: en, product }));

    expect(
      screen.getByRole("heading", { level: 2, name: "Description" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("See where your revenue is heading."),
    ).toHaveLength(2);
  });

  it("should_link_the_breadcrumb_to_the_listing_and_the_category_filter", async () => {
    render(await ProductDetailContent({ locale: "en", dict: en, product }));

    expect(screen.getByRole("link", { name: "Product" })).toHaveAttribute(
      "href",
      "/en/product",
    );
    expect(screen.getByRole("link", { name: "Smartphone" })).toHaveAttribute(
      "href",
      "/en/product?category=cat-phone",
    );
  });

  it("should_render_the_gallery_images_of_the_product", async () => {
    render(await ProductDetailContent({ locale: "en", dict: en, product }));

    expect(
      screen.getByRole("button", { name: "Show image 2" }),
    ).toBeInTheDocument();
  });

  it("should_fetch_and_render_the_related_products_of_the_same_category", async () => {
    render(await ProductDetailContent({ locale: "en", dict: en, product }));

    expect(mockGetRelatedProducts).toHaveBeenCalledWith(
      {
        categoryId: "cat-phone",
        excludeId: "product-1",
      },
      "en",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Related Products" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Reporting/ })).toHaveAttribute(
      "href",
      "/en/product/smartphone/9",
    );
  });

  it("should_hide_the_related_section_when_there_are_no_related_products", async () => {
    mockGetRelatedProducts.mockResolvedValue([]);

    render(await ProductDetailContent({ locale: "en", dict: en, product }));

    expect(
      screen.queryByRole("heading", { name: "Related Products" }),
    ).not.toBeInTheDocument();
  });

  it("should_not_fetch_related_products_when_the_product_has_no_category", async () => {
    render(
      await ProductDetailContent({ locale: "en", dict: en, product: { ...product, category: null } }),
    );

    expect(mockGetRelatedProducts).not.toHaveBeenCalled();
    expect(
      screen.queryByRole("heading", { name: "Related Products" }),
    ).not.toBeInTheDocument();
  });

  it("should_omit_the_description_block_when_the_product_has_no_description", async () => {
    render(
      await ProductDetailContent({ locale: "en", dict: en, product: { ...product, description: null } }),
    );

    expect(
      screen.queryByRole("heading", { name: "Description" }),
    ).not.toBeInTheDocument();
  });
});
