import { render, screen } from "@testing-library/react";
import { HotProductsSection } from "@/components/hot-products-section";
import { getHotProducts } from "@/sanity/hot-products";

jest.mock("@/sanity/hot-products", () => ({
  getHotProducts: jest.fn(),
}));

const mockGetHotProducts = getHotProducts as jest.Mock;

const products = Array.from({ length: 6 }, (_, index) => ({
  _id: `product-${index + 1}`,
  title: `Product ${index + 1}`,
  path: `/products/product-${index + 1}`,
  imageUrl: `https://example.com/product-${index + 1}.png`,
}));

describe("HotProductsSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_section_heading", async () => {
    mockGetHotProducts.mockResolvedValueOnce(products);

    render(await HotProductsSection());

    expect(
      screen.getByRole("heading", { level: 2, name: "Most popular products" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_section_description", async () => {
    mockGetHotProducts.mockResolvedValueOnce(products);

    render(await HotProductsSection());

    expect(
      screen.getByText(
        "Everything you need to run your operations, without switching tools.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_the_six_products_from_sanity", async () => {
    mockGetHotProducts.mockResolvedValueOnce(products);

    render(await HotProductsSection());

    for (const product of products) {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    }
  });

  it("should_link_each_card_to_its_path", async () => {
    mockGetHotProducts.mockResolvedValueOnce(products);

    render(await HotProductsSection());

    expect(screen.getByRole("link", { name: /Product 1/ })).toHaveAttribute(
      "href",
      "/products/product-1",
    );
    expect(screen.getByRole("link", { name: /Product 6/ })).toHaveAttribute(
      "href",
      "/products/product-6",
    );
  });

  it("should_make_every_card_a_link", async () => {
    mockGetHotProducts.mockResolvedValueOnce(products);

    render(await HotProductsSection());

    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  it("should_render_each_product_image_from_the_first_image_list_entry", async () => {
    mockGetHotProducts.mockResolvedValueOnce(products);

    render(await HotProductsSection());

    expect(screen.getByRole("img", { name: "Product 1" })).toHaveAttribute(
      "src",
      "https://example.com/product-1.png",
    );
    expect(screen.getByRole("img", { name: "Product 6" })).toHaveAttribute(
      "src",
      "https://example.com/product-6.png",
    );
  });

  it("should_render_the_title_when_a_product_has_no_image", async () => {
    mockGetHotProducts.mockResolvedValueOnce([
      {
        _id: "product-1",
        title: "No image",
        path: "/products/no-image",
        imageUrl: null,
      },
    ]);

    render(await HotProductsSection());

    expect(screen.getByText("No image")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should_render_nothing_when_no_products_exist", async () => {
    mockGetHotProducts.mockResolvedValueOnce([]);

    const { container } = render(await HotProductsSection());

    expect(container).toBeEmptyDOMElement();
  });
});
