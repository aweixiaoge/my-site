import { fireEvent, render, screen, within } from "@testing-library/react";
import { Navbar } from "@/components/navbar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("should_render_the_wordmark_linking_home", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Meridian" })).toHaveAttribute("href", "/");
  });

  it("should_render_a_link_for_every_navigation_item", () => {
    render(<Navbar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Product" })).toHaveAttribute("href", "/product");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "About us" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });

  it("should_render_the_language_switcher_with_the_default_language", () => {
    render(<Navbar />);

    expect(screen.getByRole("button", { name: "Language" })).toHaveTextContent("English");
  });

  it("should_offer_all_four_languages_and_default_to_english", () => {
    render(<Navbar />);

    const trigger = screen.getByRole("button", { name: "Language" });
    expect(trigger).toHaveTextContent("English");

    fireEvent.click(trigger);

    const menu = document.getElementById(trigger.getAttribute("aria-controls") ?? "");
    if (!menu) {
      throw new Error("the language menu did not open");
    }

    const options = within(menu)
      .getAllByRole("button")
      .map((option) => option.textContent);

    expect(options).toEqual(["English", "Español", "Deutsch", "日本語"]);
  });
});
