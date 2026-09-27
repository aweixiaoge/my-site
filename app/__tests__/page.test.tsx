import { render, screen } from "@testing-library/react";
import IndexPage from "@/app/page";

jest.mock("@/components/hero-section", () => ({
  HeroSection: () => <div data-testid="hero-section" />,
}));

describe("IndexPage", () => {
  it("should_render_the_hero_section_on_the_landing_page", () => {
    render(IndexPage());

    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });
});
