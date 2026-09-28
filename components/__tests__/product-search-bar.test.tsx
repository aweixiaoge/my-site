import { fireEvent, render, screen, within } from "@testing-library/react";
import { ProductSearchBar } from "@/components/product-search-bar";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const categories = [
  { _id: "cat-headphone", title: "headphone" },
  { _id: "cat-earbud", title: "earbud" },
];

describe("ProductSearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_all_products_filter_by_default", () => {
    render(<ProductSearchBar categories={categories} category="" q="" />);

    expect(screen.getByRole("button", { name: "Category" })).toHaveTextContent(
      "All Products",
    );
  });

  it("should_offer_every_category_plus_all_products", () => {
    render(<ProductSearchBar categories={categories} category="" q="" />);

    fireEvent.click(screen.getByRole("button", { name: "Category" }));

    const menu = document.getElementById(
      screen.getByRole("button", { name: "Category" }).getAttribute("aria-controls") ?? "",
    );
    if (!menu) {
      throw new Error("the category menu did not open");
    }

    const options = within(menu)
      .getAllByRole("button")
      .map((option) => option.textContent);

    expect(options).toEqual(["All Products", "headphone", "earbud"]);
  });

  it("should_show_the_selected_category_on_the_trigger", () => {
    render(
      <ProductSearchBar categories={categories} category="cat-earbud" q="" />,
    );

    expect(screen.getByRole("button", { name: "Category" })).toHaveTextContent(
      "earbud",
    );
  });

  it("should_navigate_with_the_chosen_category_and_keep_the_query", () => {
    render(<ProductSearchBar categories={categories} category="" q="phone" />);

    fireEvent.click(screen.getByRole("button", { name: "Category" }));
    fireEvent.click(screen.getByRole("button", { name: "earbud" }));

    expect(mockPush).toHaveBeenCalledWith("/product?category=cat-earbud&q=phone");
  });

  it("should_render_the_current_search_query", () => {
    render(<ProductSearchBar categories={categories} category="" q="phone" />);

    expect(screen.getByRole("searchbox", { name: "Search products" })).toHaveValue(
      "phone",
    );
  });

  it("should_navigate_with_the_search_query_and_keep_the_category", () => {
    const { container } = render(
      <ProductSearchBar categories={categories} category="cat-headphone" q="" />,
    );

    fireEvent.change(screen.getByRole("searchbox", { name: "Search products" }), {
      target: { value: "data sync" },
    });
    fireEvent.submit(container.querySelector("form")!);

    expect(mockPush).toHaveBeenCalledWith(
      "/product?category=cat-headphone&q=data+sync",
    );
  });
});
