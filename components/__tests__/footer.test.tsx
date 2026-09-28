import { render, screen, within } from "@testing-library/react";
import { Footer } from "@/components/footer";

describe("Footer", () => {
  it("should_render_the_wordmark_linking_home", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Meridian" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("should_render_the_tagline", () => {
    render(<Footer />);

    expect(
      screen.getByText(
        "The platform where modern B2B teams run their operations.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_the_product_column_links", () => {
    render(<Footer />);

    const product = screen.getByRole("navigation", { name: "Product" });

    expect(
      within(product).getByRole("link", { name: "Earbud" }),
    ).toHaveAttribute("href", "/product/earbud");
    expect(
      within(product).getByRole("link", { name: "Smartphone" }),
    ).toHaveAttribute("href", "/product/smartphone");
    expect(
      within(product).getByRole("link", { name: "Headphone" }),
    ).toHaveAttribute("href", "/product/headphone");
  });

  it("should_render_the_company_column_links", () => {
    render(<Footer />);

    const company = screen.getByRole("navigation", { name: "Company" });

    expect(within(company).getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(company).getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(within(company).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      within(company).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("should_render_the_legal_column_links", () => {
    render(<Footer />);

    const legal = screen.getByRole("navigation", { name: "Legal" });

    expect(
      within(legal).getByRole("link", { name: "Privacy" }),
    ).toHaveAttribute("href", "/privacy");
    expect(within(legal).getByRole("link", { name: "Terms" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(
      within(legal).getByRole("link", { name: "Cookies" }),
    ).toHaveAttribute("href", "/cookies");
  });

  it("should_render_the_copyright_notice", () => {
    render(<Footer />);

    expect(
      screen.getByText("© 2026 Meridian. All rights reserved."),
    ).toBeInTheDocument();
  });
});
