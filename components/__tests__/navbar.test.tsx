import { fireEvent, render, screen, within } from "@testing-library/react";
import { Navbar } from "@/components/navbar";
import { en } from "@/lib/i18n/dictionaries/en";
import { es } from "@/lib/i18n/dictionaries/es";
import type { Locale } from "@/lib/i18n/locales";

let mockPathname = "/en";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: jest.fn() }),
}));

function renderNavbar({ locale = "en" as Locale, dict = en } = {}) {
  return render(<Navbar locale={locale} dict={dict} />);
}

describe("Navbar", () => {
  beforeEach(() => {
    mockPathname = "/en";
  });

  it("should_render_the_wordmark_linking_home_in_the_current_locale", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Meridian" })).toHaveAttribute(
      "href",
      "/en",
    );
  });

  it("should_render_a_link_for_every_navigation_item", () => {
    renderNavbar();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(screen.getByRole("link", { name: "Product" })).toHaveAttribute(
      "href",
      "/en/product",
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/en/blog",
    );
    expect(screen.getByRole("link", { name: "About us" })).toHaveAttribute(
      "href",
      "/en/about",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/en/contact",
    );
  });

  it("should_translate_the_navigation_and_the_wordmark_for_another_locale", () => {
    mockPathname = "/es";
    renderNavbar({ locale: "es", dict: es });

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "href",
      "/es",
    );
    expect(screen.getByRole("link", { name: "Sobre nosotros" })).toHaveAttribute(
      "href",
      "/es/about",
    );
  });

  it("should_render_the_language_switcher_in_the_current_locale", () => {
    renderNavbar();

    expect(screen.getByRole("button", { name: "Language" })).toHaveTextContent(
      "English",
    );
  });

  it("should_offer_all_four_languages", () => {
    renderNavbar();

    const trigger = screen.getByRole("button", { name: "Language" });
    expect(trigger).toHaveTextContent("English");

    fireEvent.click(trigger);

    const menu = document.getElementById(
      trigger.getAttribute("aria-controls") ?? "",
    );
    if (!menu) {
      throw new Error("the language menu did not open");
    }

    const options = within(menu)
      .getAllByRole("button")
      .map((option) => option.textContent);

    expect(options).toEqual(["English", "Español", "Deutsch", "日本語"]);
  });
});
