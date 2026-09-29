import { render, screen, within } from "@testing-library/react";
import { Footer } from "@/components/footer";
import { en } from "@/lib/i18n/dictionaries/en";
import { ja } from "@/lib/i18n/dictionaries/ja";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

function renderFooter({
  locale = "en" as Locale,
  dict = en as Dictionary,
} = {}) {
  return render(<Footer locale={locale} dict={dict} />);
}

describe("Footer", () => {
  it("should_render_the_wordmark_linking_home_in_the_current_locale", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "Meridian" })).toHaveAttribute(
      "href",
      "/en",
    );
  });

  it("should_render_the_tagline", () => {
    renderFooter();

    expect(
      screen.getByText(
        "The platform where modern B2B teams run their operations.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_the_product_column_links", () => {
    renderFooter();

    const product = screen.getByRole("navigation", { name: "Product" });

    expect(
      within(product).getByRole("link", { name: "Earbud" }),
    ).toHaveAttribute("href", "/en/product/earbud");
    expect(
      within(product).getByRole("link", { name: "Smartphone" }),
    ).toHaveAttribute("href", "/en/product/smartphone");
    expect(
      within(product).getByRole("link", { name: "Headphone" }),
    ).toHaveAttribute("href", "/en/product/headphone");
  });

  it("should_render_the_company_column_links", () => {
    renderFooter();

    const company = screen.getByRole("navigation", { name: "Company" });

    expect(within(company).getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/en/about",
    );
    expect(within(company).getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/en/blog",
    );
    expect(within(company).getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(
      within(company).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/en/contact");
  });

  it("should_render_the_legal_column_links", () => {
    renderFooter();

    const legal = screen.getByRole("navigation", { name: "Legal" });

    expect(
      within(legal).getByRole("link", { name: "Privacy" }),
    ).toHaveAttribute("href", "/en/privacy");
    expect(within(legal).getByRole("link", { name: "Terms" })).toHaveAttribute(
      "href",
      "/en/terms",
    );
    expect(
      within(legal).getByRole("link", { name: "Cookies" }),
    ).toHaveAttribute("href", "/en/cookies");
  });

  it("should_render_the_copyright_notice", () => {
    renderFooter();

    expect(
      screen.getByText("© 2026 Meridian. All rights reserved."),
    ).toBeInTheDocument();
  });

  it("should_translate_the_columns_and_links_for_another_locale", () => {
    renderFooter({ locale: "ja", dict: ja });

    const company = screen.getByRole("navigation", { name: "会社" });

    expect(
      within(company).getByRole("link", { name: "会社概要" }),
    ).toHaveAttribute("href", "/ja/about");
    expect(screen.getByText(ja.footer.tagline)).toBeInTheDocument();
  });
});
