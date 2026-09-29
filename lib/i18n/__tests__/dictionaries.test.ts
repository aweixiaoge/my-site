import { DICTIONARIES, dictionaryFor } from "@/lib/i18n/dictionaries";
import { en } from "@/lib/i18n/dictionaries/en";
import { LOCALE_VALUES } from "@/lib/i18n/locales";

/** Every leaf value keyed by its dotted path, e.g. "nav.home". */
function flatten(value: unknown, prefix = ""): Map<string, string> {
  const leaves = new Map<string, string>();

  if (typeof value === "string") {
    leaves.set(prefix, value);
    return leaves;
  }

  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;

    for (const [childPath, childValue] of flatten(child, path)) {
      leaves.set(childPath, childValue);
    }
  }

  return leaves;
}

const englishKeys = [...flatten(en).keys()].sort();

describe("dictionaries", () => {
  it("should_provide_a_dictionary_for_every_locale", () => {
    expect(Object.keys(DICTIONARIES).sort()).toEqual([...LOCALE_VALUES].sort());
  });

  it("should_expose_exactly_the_same_keys_as_english_in_every_locale", () => {
    for (const locale of LOCALE_VALUES) {
      expect([...flatten(DICTIONARIES[locale]).keys()].sort()).toEqual(
        englishKeys,
      );
    }
  });

  it("should_not_leave_any_value_empty", () => {
    for (const locale of LOCALE_VALUES) {
      const empty = [...flatten(DICTIONARIES[locale])]
        .filter(([, value]) => value.trim() === "")
        .map(([key]) => key);

      expect({ locale, empty }).toEqual({ locale, empty: [] });
    }
  });

  describe("when a locale is not English", () => {
    it("should_translate its navigation labels", () => {
      for (const locale of LOCALE_VALUES.filter((value) => value !== "en")) {
        expect(DICTIONARIES[locale].nav.home).not.toBe(en.nav.home);
      }
    });

    it("should_actually_translate_the_bulk_of_the_copy", () => {
      const english = flatten(en);

      for (const locale of LOCALE_VALUES.filter((value) => value !== "en")) {
        const translated = flatten(DICTIONARIES[locale]);
        const differing = [...english].filter(
          ([key, value]) => translated.get(key) !== value,
        ).length;

        // Brand names and loanwords legitimately repeat; the bulk must not.
        expect(differing / english.size).toBeGreaterThan(0.5);
      }
    });
  });
});

describe("dictionaryFor", () => {
  it("should_return_the_dictionary_for_the_requested_locale", () => {
    expect(dictionaryFor("de")).toBe(DICTIONARIES.de);
  });

  it("should_return_a_distinct_dictionary_per_locale", () => {
    expect(dictionaryFor("en")).not.toBe(dictionaryFor("ja"));
  });

  it("should_fall_back_to_english_for_an_unsupported_locale", () => {
    expect(dictionaryFor("fr")).toBe(DICTIONARIES.en);
  });
});
