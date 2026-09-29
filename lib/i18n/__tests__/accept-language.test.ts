import { preferredLocaleFromHeader } from "@/lib/i18n/accept-language";

describe("preferredLocaleFromHeader", () => {
  it("should_return_the_default_when_the_header_is_missing", () => {
    expect(preferredLocaleFromHeader(null)).toBe("en");
  });

  it("should_return_the_default_for_an_empty_header", () => {
    expect(preferredLocaleFromHeader("")).toBe("en");
  });

  it("should_match_a_supported_locale", () => {
    expect(preferredLocaleFromHeader("de")).toBe("de");
  });

  it("should_match_a_locale_with_a_region_subtag", () => {
    expect(preferredLocaleFromHeader("ja-JP")).toBe("ja");
  });

  it("should_honour_quality_values_over_header_order", () => {
    expect(preferredLocaleFromHeader("en;q=0.3, es;q=0.9")).toBe("es");
  });

  it("should_skip_unsupported_locales_and_take_the_next_supported_one", () => {
    expect(preferredLocaleFromHeader("fr-FR,fr;q=0.9,ja;q=0.8")).toBe("ja");
  });

  it("should_fall_back_to_the_default_when_nothing_is_supported", () => {
    expect(preferredLocaleFromHeader("fr-FR,fr;q=0.9,ko;q=0.8")).toBe("en");
  });

  it("should_ignore_a_wildcard_entry", () => {
    expect(preferredLocaleFromHeader("*")).toBe("en");
  });

  it("should_ignore_a_zero_quality_entry", () => {
    expect(preferredLocaleFromHeader("ja;q=0, de;q=0.5")).toBe("de");
  });

  it("should_tolerate_whitespace_and_casing", () => {
    expect(preferredLocaleFromHeader("  ES-MX ; q=0.8 ")).toBe("es");
  });
});
