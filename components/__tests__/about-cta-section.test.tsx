import { render, screen } from "@testing-library/react";
import { AboutCtaSection } from "@/components/about-cta-section";
import { en } from "@/lib/i18n/dictionaries/en";

describe("AboutCtaSection", () => {
  it("should_render_the_section_heading", () => {
    render(<AboutCtaSection locale="en" dict={en} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Get in Touch" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_supporting_copy", () => {
    render(<AboutCtaSection locale="en" dict={en} />);

    expect(
      screen.getByText(
        "Questions, partnerships, or a demo: we answer every message within a day.",
      ),
    ).toBeInTheDocument();
  });

  it("should_link_the_contact_button_to_the_contact_page", () => {
    render(<AboutCtaSection locale="en" dict={en} />);

    expect(screen.getByRole("link", { name: "Contact us" })).toHaveAttribute(
      "href",
      "/en/contact",
    );
  });
});
