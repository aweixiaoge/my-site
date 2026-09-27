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

describe("getHero", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_hero_document", async () => {
    mockFetch.mockResolvedValueOnce(hero);

    const result = await getHero();

    expect(result).toEqual(hero);
  });

  it("should_query_sanity_with_the_hero_query", async () => {
    mockFetch.mockResolvedValueOnce(hero);

    await getHero();

    expect(mockFetch).toHaveBeenCalledWith(HERO_QUERY, {}, expect.anything());
  });

  it("should_return_null_when_no_hero_document_exists", async () => {
    mockFetch.mockResolvedValueOnce(null);

    const result = await getHero();

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getHero();

    expect(result).toBeNull();
  });
});
