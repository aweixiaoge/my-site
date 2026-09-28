import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/product-card";

describe("ProductCard", () => {
  it("should_render_the_title_and_link_to_the_product_path", () => {
    render(
      <ProductCard
        title="Insights"
        path="/product/insights"
        imageUrl="https://example.com/insights.png"
      />,
    );

    const link = screen.getByRole("link", { name: /Insights/ });
    expect(link).toHaveAttribute("href", "/product/insights");
  });

  it("should_render_the_image_with_the_title_as_alt_text", () => {
    render(
      <ProductCard
        title="Insights"
        path="/product/insights"
        imageUrl="https://example.com/insights.png"
      />,
    );

    expect(screen.getByRole("img", { name: "Insights" })).toHaveAttribute(
      "src",
      "https://example.com/insights.png",
    );
  });

  it("should_render_the_title_without_an_image_when_none_is_provided", () => {
    render(<ProductCard title="No image" path="/product/no-image" imageUrl={null} />);

    expect(screen.getByText("No image")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
