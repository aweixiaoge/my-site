import { render, screen } from "@testing-library/react";
import { ContactHeroSection } from "@/components/contact-hero-section";

describe("ContactHeroSection", () => {
  it("should_render_the_contact_page_heading", () => {
    render(<ContactHeroSection />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Contact Us" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_intro_copy_from_the_design", () => {
    render(<ContactHeroSection />);

    expect(
      screen.getByText(
        "Questions about pricing, migrations, or partnerships: reach us here and we will get back within one business day.",
      ),
    ).toBeInTheDocument();
  });
});
