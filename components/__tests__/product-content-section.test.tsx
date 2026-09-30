import { render, screen } from "@testing-library/react";
import { ProductContentSection } from "@/components/product-content-section";
import { en } from "@/lib/i18n/dictionaries/en";
import { getProductCategories, getProducts } from "@/sanity/products";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/sanity/products", () => ({
  getProducts: jest.fn(),
  getProductCategories: jest.fn(),
}));

const mockGetProducts = getProducts as jest.Mock;
const mockGetProductCategories = getProductCategories as jest.Mock;

const products = Array.from({ length: 10 }, (_, index) => ({
  _id: `product-${index + 1}`,
  title: `Product ${index + 1}`,
  path: `/product/item-${index + 1}`,
  imageUrl: `https://example.com/product-${index + 1}.png`,
  categoryId: index % 2 === 0 ? "cat-a" : "cat-b",
}));

const categories = [
  { _id: "cat-a", title: "Alpha" },
  { _id: "cat-b", title: "Beta" },
];

const noFilters = { category: "", q: "", page: 1 };

describe("ProductContentSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetProducts.mockResolvedValue(products);
    mockGetProductCategories.mockResolvedValue(categories);
  });

  it("should_fetch_the_products_and_categories_for_the_active_locale", async () => {
    await ProductContentSection({
      locale: "es",
      dict: en,
      filters: noFilters,
    });

    expect(mockGetProducts).toHaveBeenCalledWith("es");
    expect(mockGetProductCategories).toHaveBeenCalledWith("es");
  });

  it("should_render_the_page_heading", async () => {
    render(await ProductContentSection({ locale: "en", dict: en, filters: noFilters }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Product" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_first_nine_products_on_the_first_page", async () => {
    render(await ProductContentSection({ locale: "en", dict: en, filters: noFilters }));

    for (let index = 1; index <= 9; index += 1) {
      expect(screen.getByText(`Product ${index}`)).toBeInTheDocument();
    }
    expect(screen.queryByText("Product 10")).not.toBeInTheDocument();
  });

  it("should_render_the_remaining_product_on_the_second_page", async () => {
    render(await ProductContentSection({ locale: "en", dict: en, filters: { ...noFilters, page: 2 } }));

    expect(screen.getByText("Product 10")).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });

  it("should_filter_products_by_category", async () => {
    render(
      await ProductContentSection({
        locale: "en",
        dict: en,
        filters: { ...noFilters, category: "cat-b" },
      }),
    );

    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 10")).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });

  it("should_filter_products_by_search_query", async () => {
    render(
      await ProductContentSection({ locale: "en", dict: en, filters: { ...noFilters, q: "Product 1" } }),
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 10")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });

  it("should_keep_the_filters_in_the_pagination_links", async () => {
    render(
      await ProductContentSection({ locale: "en", dict: en, filters: { ...noFilters, q: "Product" } }),
    );

    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/en/product?q=Product&page=2",
    );
    expect(screen.getByRole("link", { name: /Next/ })).toHaveAttribute(
      "href",
      "/en/product?q=Product&page=2",
    );
  });

  it("should_render_the_search_bar_with_the_current_filters", async () => {
    render(
      await ProductContentSection({
        locale: "en",
        dict: en,
        filters: { category: "cat-a", q: "alpha", page: 1 },
      }),
    );

    expect(screen.getByRole("button", { name: "Category" })).toHaveTextContent(
      "Alpha",
    );
    expect(screen.getByRole("searchbox", { name: "Search products" })).toHaveValue(
      "alpha",
    );
  });

  it("should_render_no_products_when_nothing_matches_the_filters", async () => {
    render(await ProductContentSection({ locale: "en", dict: en, filters: { ...noFilters, q: "zzz" } }));

    expect(screen.queryByText(/Product \d/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: "Pagination" }),
    ).not.toBeInTheDocument();
  });

  it("should_keep_the_heading_and_search_bar_when_sanity_returns_nothing", async () => {
    mockGetProducts.mockResolvedValue([]);

    render(await ProductContentSection({ locale: "en", dict: en, filters: noFilters }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Product" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: "Search products" })).toBeInTheDocument();
    expect(screen.queryByText(/Product \d/)).not.toBeInTheDocument();
  });
});
