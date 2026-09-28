import { render, screen } from "@testing-library/react";
import { AboutHeroSection } from "@/components/about-hero-section";

describe("AboutHeroSection", () => {
  it("should_render_the_page_heading", () => {
    render(<AboutHeroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: "About Us" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_intro_copy_from_the_design", () => {
    render(<AboutHeroSection />);

    expect(
      screen.getByText(
        "Meridian is built by people who spent a decade running operations, at companies that had outgrown their tools.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_the_founding_facts_line", () => {
    render(<AboutHeroSection />);

    expect(
      screen.getByText(
        "Founded in 2021. Remote-first, forty people, nine countries.",
      ),
    ).toBeInTheDocument();
  });
});
