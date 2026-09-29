import { localeFromPath, localizedHref } from "@/lib/i18n/localized-href";

describe("localizedHref", () => {
  it("should_prefix_the_root_path", () => {
    expect(localizedHref("es", "/")).toBe("/es");
  });

  it("should_prefix_a_nested_path", () => {
    expect(localizedHref("ja", "/product/earbud")).toBe("/ja/product/earbud");
  });

  it("should_prefix_a_path_with_a_query_string", () => {
    expect(localizedHref("de", "/blog?page=2")).toBe("/de/blog?page=2");
  });

  it("should_prefix_a_bare_path_without_a_leading_slash", () => {
    expect(localizedHref("es", "product")).toBe("/es/product");
  });

  it("should_keep_an_explicit_prefix_for_the_default_locale", () => {
    expect(localizedHref("en", "/about")).toBe("/en/about");
  });

  describe("when the path already carries a locale", () => {
    it("should_replace_rather_than_double_prefix_it", () => {
      expect(localizedHref("de", "/es/product")).toBe("/de/product");
    });

    it("should_replace_the_locale_of_a_bare_locale_path", () => {
      expect(localizedHref("ja", "/en")).toBe("/ja");
    });

    it("should_preserve_the_query_string_when_swapping", () => {
      expect(localizedHref("es", "/en/blog?page=2")).toBe("/es/blog?page=2");
    });
  });

  it("should_prefix_a_path_whose_first_segment_is_not_a_locale", () => {
    expect(localizedHref("es", "/nope/page")).toBe("/es/nope/page");
  });
});

describe("localeFromPath", () => {
  it("should_read_the_locale_from_the_first_segment", () => {
    expect(localeFromPath("/ja/product/earbud")).toBe("ja");
  });

  it("should_read_a_bare_locale_path", () => {
    expect(localeFromPath("/de")).toBe("de");
  });

  it("should_fall_back_to_the_default_when_the_path_has_no_locale", () => {
    expect(localeFromPath("/about")).toBe("en");
  });

  it("should_fall_back_to_the_default_for_an_unsupported_locale", () => {
    expect(localeFromPath("/fr/about")).toBe("en");
  });

  it("should_ignore_a_query_string", () => {
    expect(localeFromPath("/es/blog?page=2")).toBe("es");
  });
});
