import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/hero-section";
import { getHero } from "@/sanity/hero";

jest.mock("@/sanity/hero", () => ({
  getHero: jest.fn(),
}));

const mockGetHero = getHero as jest.Mock;

const hero = {
  title: "Platforms, unified",
  description: "A shorter description from Sanity.",
  path: "/contact",
  imageUrl: "https://example.com/hero.jpg",
};

describe("HeroSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_title_and_description_from_sanity", async () => {
    mockGetHero.mockResolvedValueOnce(hero);

    render(await HeroSection());

    expect(
      screen.getByRole("heading", { level: 1, name: "Platforms, unified" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A shorter description from Sanity."),
    ).toBeInTheDocument();
  });

  it("should_stretch_the_description_to_fill_the_text_column", async () => {
    mockGetHero.mockResolvedValueOnce(hero);

    render(await HeroSection());

    const description = screen.getByText("A shorter description from Sanity.");
    expect(description).not.toHaveClass("max-w-[479px]");
    expect(description.parentElement).toHaveClass("self-stretch");
  });

  it("should_wrap_a_long_unbreakable_description_within_the_column", async () => {
    mockGetHero.mockResolvedValueOnce(hero);

    render(await HeroSection());

    expect(
      screen.getByText("A shorter description from Sanity."),
    ).toHaveClass("wrap-anywhere");
  });

  it("should_render_the_call_to_action_linking_to_the_hero_path", async () => {
    mockGetHero.mockResolvedValueOnce(hero);

    render(await HeroSection());

    expect(screen.getByRole("link", { name: "Check out" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("should_render_the_image_from_the_hero_image_url", async () => {
    mockGetHero.mockResolvedValueOnce(hero);

    render(await HeroSection());

    expect(
      screen.getByRole("img", { name: "Platforms, unified" }),
    ).toHaveAttribute("src", "https://example.com/hero.jpg");
  });

  it("should_link_the_image_to_the_hero_path", async () => {
    mockGetHero.mockResolvedValueOnce(hero);

    render(await HeroSection());

    expect(
      screen.getByRole("link", { name: "Platforms, unified" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("should_render_an_empty_image_slot_when_the_hero_has_no_image_url", async () => {
    mockGetHero.mockResolvedValueOnce({ ...hero, imageUrl: null });

    render(await HeroSection());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Platforms, unified" }),
    ).not.toBeInTheDocument();
  });

  it("should_render_the_fallback_content_when_no_hero_content_exists", async () => {
    mockGetHero.mockResolvedValueOnce(null);

    render(await HeroSection());

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Modern infrastructure for B2B teams",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No exports, no stale spreadsheets, no guessing\./),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Check out" })).toHaveAttribute(
      "href",
      "/products",
    );
  });
});
