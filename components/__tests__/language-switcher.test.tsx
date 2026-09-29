import { fireEvent, render, screen } from "@testing-library/react";
import { LanguageSwitcher } from "@/components/language-switcher";

const mockReplace = jest.fn();
let mockPathname = "/en";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: mockReplace }),
}));

function selectLanguage(label: string) {
  fireEvent.click(screen.getByRole("button", { name: "Language" }));
  fireEvent.click(screen.getByRole("button", { name: label }));
}

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockPathname = "/en";
    window.history.pushState({}, "", "/en");
  });

  it("should_show_the_locale_the_url_is_currently_in", () => {
    mockPathname = "/ja/about";

    render(<LanguageSwitcher label="Language" />);

    expect(screen.getByRole("button", { name: "Language" })).toHaveTextContent(
      "日本語",
    );
  });

  it("should_fall_back_to_english_when_the_url_has_no_locale", () => {
    mockPathname = "/about";

    render(<LanguageSwitcher label="Language" />);

    expect(screen.getByRole("button", { name: "Language" })).toHaveTextContent(
      "English",
    );
  });

  it("should_navigate_to_the_same_page_in_the_chosen_language", () => {
    mockPathname = "/en/product/earbud";

    render(<LanguageSwitcher label="Language" />);
    selectLanguage("Deutsch");

    expect(mockReplace).toHaveBeenCalledWith("/de/product/earbud");
  });

  it("should_navigate_from_a_bare_locale_path", () => {
    mockPathname = "/en";

    render(<LanguageSwitcher label="Language" />);
    selectLanguage("Español");

    expect(mockReplace).toHaveBeenCalledWith("/es");
  });

  it("should_preserve_the_query_string_when_switching", () => {
    mockPathname = "/en/blog";
    window.history.pushState({}, "", "/en/blog?page=3");

    render(<LanguageSwitcher label="Language" />);
    selectLanguage("日本語");

    expect(mockReplace).toHaveBeenCalledWith("/ja/blog?page=3");
  });
});
