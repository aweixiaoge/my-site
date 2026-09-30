import { client } from "@/sanity/client";
import { getHero } from "@/sanity/hero";
import { HERO_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const hero = {
  title: "Modern infrastructure for B2B teams",
  description:
    "Meridian unifies your data, workflows, and integrations in one platform.",
  path: "/products",
  imageUrl: "https://example.com/hero.jpg",
};

const spanishHero = {
  ...hero,
  title: "Infraestructura moderna para equipos B2B",
};

describe("getHero", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_hero_document", async () => {
    mockFetch.mockResolvedValueOnce(hero);

    const result = await getHero("en");

    expect(result).toEqual(hero);
  });

  it("should_query_sanity_with_the_requested_language", async () => {
    mockFetch.mockResolvedValueOnce(hero);

    await getHero("en");

    expect(mockFetch).toHaveBeenCalledWith(
      HERO_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_return_the_translated_hero_document", async () => {
    mockFetch.mockResolvedValueOnce(spanishHero);

    const result = await getHero("es");

    expect(result).toEqual(spanishHero);
  });

  it("should_not_query_english_when_the_requested_language_has_a_hero", async () => {
    mockFetch.mockResolvedValueOnce(spanishHero);

    await getHero("es");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should_fall_back_to_english_when_the_language_has_no_hero", async () => {
    mockFetch.mockResolvedValueOnce(null).mockResolvedValueOnce(hero);

    const result = await getHero("es");

    expect(result).toEqual(hero);
    expect(mockFetch).toHaveBeenLastCalledWith(
      HERO_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_return_null_when_no_hero_document_exists", async () => {
    mockFetch.mockResolvedValue(null);

    const result = await getHero("en");

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getHero("es");

    expect(result).toBeNull();
  });
});
