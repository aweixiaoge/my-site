import { render, screen } from "@testing-library/react";
import ProductPage, { generateMetadata } from "@/app/[lang]/product/page";
import { ProductContentSection } from "@/components/product-content-section";

jest.mock("@/components/product-content-section", () => ({
  ProductContentSection: jest.fn(() => (
    <div data-testid="product-content-section" />
  )),
}));

const mockSection = ProductContentSection as jest.Mock;

function renderPage(
  searchParams: Record<string, string | string[] | undefined> = {},
) {
  return ProductPage({
    params: Promise.resolve({ lang: "en" }),
    searchParams: Promise.resolve(searchParams),
  });
}

describe("ProductPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_main_content_area", async () => {
    render(await renderPage());

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should_render_the_product_content_section", async () => {
    render(await renderPage());

    expect(screen.getByTestId("product-content-section")).toBeInTheDocument();
  });

  it("should_pass_the_parsed_search_params_to_the_content_section", async () => {
    render(await renderPage({ category: "cat-1", q: "phone", page: "2" }));

    expect(mockSection.mock.calls[0][0]).toMatchObject({
      filters: { category: "cat-1", q: "phone", page: 2 },
    });
  });

  it("should_default_the_filters_when_no_search_params_are_set", async () => {
    render(await renderPage());

    expect(mockSection.mock.calls[0][0]).toMatchObject({
      filters: { category: "", q: "", page: 1 },
    });
  });

  it("should_provide_a_non_empty_title_and_description_via_generateMetadata", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ lang: "en" }), searchParams: Promise.resolve({}) });

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });
});
