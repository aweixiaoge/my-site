import { render, screen } from "@testing-library/react";
import IndexPage from "@/app/page";

jest.mock("@/components/hero-section", () => ({
  HeroSection: () => <div data-testid="hero-section" />,
}));

jest.mock("@/components/content-stats-section", () => ({
  ContentStatsSection: () => <div data-testid="content-stats-section" />,
}));

describe("IndexPage", () => {
  it("should_render_the_hero_section_on_the_landing_page", () => {
    render(IndexPage());

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("should_render_the_content_stats_section_on_the_landing_page", () => {
    render(IndexPage());

    expect(screen.getByTestId("content-stats-section")).toBeInTheDocument();
  });
});
