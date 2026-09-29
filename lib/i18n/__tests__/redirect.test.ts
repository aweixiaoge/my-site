import { localeRedirectTarget } from "@/lib/i18n/redirect";

describe("localeRedirectTarget", () => {
  it("should_send_the_root_to_the_detected_locale", () => {
    expect(localeRedirectTarget("/", "de")).toBe("/de");
  });

  it("should_prefix_an_unprefixed_path_with_the_detected_locale", () => {
    expect(localeRedirectTarget("/about", "es")).toBe("/es/about");
  });

  it("should_use_english_when_no_language_is_acceptable", () => {
    expect(localeRedirectTarget("/about", "fr")).toBe("/en/about");
  });

  describe("when the path is already localised", () => {
    it("should_not_redirect", () => {
      expect(localeRedirectTarget("/en/about", "es")).toBeNull();
    });

    it("should_not_redirect_a_bare_locale_path", () => {
      expect(localeRedirectTarget("/ja", "es")).toBeNull();
    });

    it("should_leave_an_explicit_locale_alone_even_when_it_is_not_the_preference", () => {
      expect(localeRedirectTarget("/de/blog", "ja")).toBeNull();
    });
  });

  it("should_treat_a_non_locale_first_segment_as_an_unprefixed_path", () => {
    expect(localeRedirectTarget("/nope/page", "es")).toBe("/es/nope/page");
  });
});
