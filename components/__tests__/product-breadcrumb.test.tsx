import { render, screen } from "@testing-library/react";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";

const items = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Smartphone", href: "/product?category=cat-phone" },
  { label: "Forecasting" },
];

describe("ProductBreadcrumb", () => {
  it("should_render_a_named_breadcrumb_navigation", () => {
    render(<ProductBreadcrumb items={items} label="Breadcrumb" />);

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("should_link_each_ancestor_crumb", () => {
    render(<ProductBreadcrumb items={items} label="Breadcrumb" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Product" })).toHaveAttribute(
      "href",
      "/product",
    );
    expect(screen.getByRole("link", { name: "Smartphone" })).toHaveAttribute(
      "href",
      "/product?category=cat-phone",
    );
  });

  it("should_render_the_last_crumb_as_the_current_page_without_a_link", () => {
    render(<ProductBreadcrumb items={items} label="Breadcrumb" />);

    expect(
      screen.queryByRole("link", { name: "Forecasting" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Forecasting")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should_render_a_divider_between_each_pair_of_crumbs", () => {
    render(<ProductBreadcrumb items={items} label="Breadcrumb" />);

    expect(screen.getAllByText("/")).toHaveLength(items.length - 1);
  });
});
