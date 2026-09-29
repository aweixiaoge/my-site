import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_TAGS,
  hasLocale,
  toLocale,
} from "@/lib/i18n/locales";

describe("locales", () => {
  it("should_default_to_english", () => {
    expect(DEFAULT_LOCALE).toBe("en");
  });

  it("should_expose_the_four_supported_locales", () => {
    expect(LOCALES.map((locale) => locale.value)).toEqual([
      "en",
      "es",
      "de",
      "ja",
    ]);
  });

  it("should_label_each_locale_with_its_endonym", () => {
    expect(LOCALES.map((locale) => locale.label)).toEqual([
      "English",
      "Español",
      "Deutsch",
      "日本語",
    ]);
  });

  it("should_have_a_bcp47_tag_for_every_locale", () => {
    for (const locale of LOCALES) {
      expect(LOCALE_TAGS[locale.value]).toMatch(
        new RegExp(`^${locale.value}-[A-Z]{2}$`),
      );
    }
  });

  describe("hasLocale", () => {
    it("should_accept_every_supported_locale", () => {
      for (const locale of LOCALES) {
        expect(hasLocale(locale.value)).toBe(true);
      }
    });

    it("should_reject_an_unsupported_locale", () => {
      expect(hasLocale("fr")).toBe(false);
    });

    it("should_reject_an_empty_string", () => {
      expect(hasLocale("")).toBe(false);
    });
  });

  describe("toLocale", () => {
    it("should_return_a_supported_locale_unchanged", () => {
      expect(toLocale("ja")).toBe("ja");
    });

    it("should_fall_back_to_the_default_for_an_unsupported_locale", () => {
      expect(toLocale("fr")).toBe("en");
    });
  });
});
