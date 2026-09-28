import { render, screen } from "@testing-library/react";
import IndexPage from "@/app/page";

jest.mock("@/components/hero-section", () => ({
  HeroSection: () => <div data-testid="hero-section" />,
}));

jest.mock("@/components/hot-products-section", () => ({
  HotProductsSection: () => <div data-testid="hot-products-section" />,
}));

jest.mock("@/components/content-media-section", () => ({
  ContentMediaSection: () => <div data-testid="content-media-section" />,
}));

describe("IndexPage", () => {
  it("should_render_the_hero_section_on_the_landing_page", () => {
    render(IndexPage());

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("should_render_the_hot_products_section_on_the_landing_page", () => {
    render(IndexPage());

    expect(screen.getByTestId("hot-products-section")).toBeInTheDocument();
  });

  it("should_render_the_content_media_section_on_the_landing_page", () => {
    render(IndexPage());

    expect(screen.getByTestId("content-media-section")).toBeInTheDocument();
  });
});
