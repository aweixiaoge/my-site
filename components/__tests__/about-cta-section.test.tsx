import { render, screen } from "@testing-library/react";
import { AboutCtaSection } from "@/components/about-cta-section";

describe("AboutCtaSection", () => {
  it("should_render_the_section_heading", () => {
    render(<AboutCtaSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Get in Touch" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_supporting_copy", () => {
    render(<AboutCtaSection />);

    expect(
      screen.getByText(
        "Questions, partnerships, or a demo: we answer every message within a day.",
      ),
    ).toBeInTheDocument();
  });

  it("should_link_the_contact_button_to_the_contact_page", () => {
    render(<AboutCtaSection />);

    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
