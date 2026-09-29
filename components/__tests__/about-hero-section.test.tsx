import { render, screen } from "@testing-library/react";
import { AboutHeroSection } from "@/components/about-hero-section";
import { en } from "@/lib/i18n/dictionaries/en";

describe("AboutHeroSection", () => {
  it("should_render_the_page_heading", () => {
    render(<AboutHeroSection dict={en} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "About Us" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_intro_copy_from_the_design", () => {
    render(<AboutHeroSection dict={en} />);

    expect(
      screen.getByText(
        "We are a passionate team of innovators, engineers, and creators dedicated to building technology that makes everyday life better. Since our founding, we have grown from a small startup into a trusted global brand, serving millions of customers across more than 40 countries.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_the_founding_facts_line", () => {
    render(<AboutHeroSection dict={en} />);

    expect(
      screen.getByText(
        "Founded in 2021. Remote-first, forty people, nine countries.",
      ),
    ).toBeInTheDocument();
  });
});
