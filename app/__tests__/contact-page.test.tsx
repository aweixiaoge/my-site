import { render, screen } from "@testing-library/react";
import ContactPage, { generateMetadata } from "@/app/contact/page";

jest.mock("@/components/contact-hero-section", () => ({
  ContactHeroSection: () => <div data-testid="contact-hero-section" />,
}));

jest.mock("@/components/contact-message-section", () => ({
  ContactMessageSection: () => <div data-testid="contact-message-section" />,
}));

describe("ContactPage", () => {
  it("should_render_the_hero_section", () => {
    render(<ContactPage />);

    expect(screen.getByTestId("contact-hero-section")).toBeInTheDocument();
  });

  it("should_render_the_message_and_contact_info_section", () => {
    render(<ContactPage />);

    expect(screen.getByTestId("contact-message-section")).toBeInTheDocument();
  });

  it("should_export_a_title_and_description_for_search_engines", async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toBe("Contact Us");
    expect(metadata.description).toBeTruthy();
  });
});
