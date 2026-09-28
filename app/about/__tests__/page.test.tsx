import { render, screen } from "@testing-library/react";
import AboutPage, { generateMetadata } from "@/app/about/page";

jest.mock("@/components/about-cta-section", () => ({
  AboutCtaSection: jest.fn(() => <div data-testid="about-cta-section" />),
}));
jest.mock("@/components/about-hero-section", () => ({
  AboutHeroSection: jest.fn(() => <div data-testid="about-hero-section" />),
}));
jest.mock("@/components/about-mission-section", () => ({
  AboutMissionSection: jest.fn(() => <div data-testid="about-mission-section" />),
}));
jest.mock("@/components/about-story-section", () => ({
  AboutStorySection: jest.fn(() => <div data-testid="about-story-section" />),
}));

describe("AboutPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_main_content_area", () => {
    render(<AboutPage />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should_render_every_section_of_the_page", () => {
    render(<AboutPage />);

    expect(screen.getByTestId("about-hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("about-story-section")).toBeInTheDocument();
    expect(screen.getByTestId("about-mission-section")).toBeInTheDocument();
    expect(screen.getByTestId("about-cta-section")).toBeInTheDocument();
  });

  it("should_render_the_sections_in_the_order_the_design_lays_them_out", () => {
    const { container } = render(<AboutPage />);

    const order = Array.from(container.querySelectorAll("[data-testid]")).map(
      (node) => node.getAttribute("data-testid"),
    );

    expect(order).toEqual([
      "about-hero-section",
      "about-story-section",
      "about-mission-section",
      "about-cta-section",
    ]);
  });

  it("should_provide_a_non_empty_title_and_description_via_generateMetadata", async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
  });

  it("should_use_the_about_us_title_in_metadata", async () => {
    const metadata = await generateMetadata();

    expect(metadata.title).toBe("About Us");
  });
});
