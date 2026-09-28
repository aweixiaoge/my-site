import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import ProductDetailPage, {
  generateMetadata,
} from "@/app/product/[...slug]/page";
import { getProductByPath } from "@/sanity/products";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("@/sanity/products", () => ({
  getProductByPath: jest.fn(),
}));

jest.mock("@/components/product-detail-content", () => ({
  ProductDetailContent: () => <div data-testid="product-detail-content" />,
}));

const mockGetProductByPath = getProductByPath as jest.Mock;
const mockNotFound = notFound as unknown as jest.Mock;

const product = {
  _id: "product-1",
  title: "Forecasting",
  description: "See where your revenue is heading.",
  path: "/product/smartphone/10",
  images: ["https://example.com/forecasting-1.png"],
  category: { _id: "cat-phone", title: "Smartphone" },
};

const pageProps = (slug: string[]) => ({
  params: Promise.resolve({ slug }),
  searchParams: Promise.resolve({}),
});

describe("ProductDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetProductByPath.mockResolvedValue(product);
  });

  it("should_fetch_the_product_for_the_route_path_and_render_its_content", async () => {
    render(await ProductDetailPage(pageProps(["smartphone", "10"])));

    expect(mockGetProductByPath).toHaveBeenCalledWith("/product/smartphone/10");
    expect(screen.getByTestId("product-detail-content")).toBeInTheDocument();
  });

  it("should_render_product_json_ld_built_from_the_sanity_data", async () => {
    const { container } = render(await ProductDetailPage(pageProps(["smartphone", "10"])));

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );

    expect(script).not.toBeNull();
    expect(JSON.parse(script?.innerHTML ?? "")).toEqual({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Forecasting",
      description: "See where your revenue is heading.",
      image: "https://example.com/forecasting-1.png",
    });
  });

  it("should_show_the_not_found_page_when_the_product_does_not_exist", async () => {
    mockGetProductByPath.mockResolvedValue(null);

    await expect(ProductDetailPage(pageProps(["smartphone", "10"]))).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
    expect(mockNotFound).toHaveBeenCalled();
  });

  it("should_use_the_product_fields_for_the_page_metadata", async () => {
    const metadata = await generateMetadata(pageProps(["smartphone", "10"]));

    expect(metadata).toEqual({
      title: "Forecasting",
      description: "See where your revenue is heading.",
    });
  });

  it("should_fall_back_to_a_generic_title_and_description_when_the_product_is_missing", async () => {
    mockGetProductByPath.mockResolvedValue(null);

    const metadata = await generateMetadata(pageProps(["smartphone", "10"]));

    expect(metadata).toEqual({
      title: "Product",
      description: "Browse the Meridian product catalog.",
    });
  });
});
