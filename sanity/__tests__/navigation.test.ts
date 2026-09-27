import { client } from "@/sanity/client";
import { getNavigationItems } from "@/sanity/navigation";
import { NAVIGATION_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const englishItems = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

describe("getNavigationItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_navigation_items_for_the_requested_language", async () => {
    mockFetch.mockResolvedValueOnce({ items: englishItems });

    const items = await getNavigationItems("en");

    expect(items).toEqual(englishItems);
  });

  it("should_query_sanity_with_the_requested_language", async () => {
    mockFetch.mockResolvedValueOnce({ items: englishItems });

    await getNavigationItems("en");

    expect(mockFetch).toHaveBeenCalledWith(
      NAVIGATION_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_fall_back_to_english_when_the_language_has_no_navigation", async () => {
    mockFetch.mockResolvedValueOnce(null).mockResolvedValueOnce({ items: englishItems });

    const items = await getNavigationItems("fr");

    expect(items).toEqual(englishItems);
    expect(mockFetch).toHaveBeenLastCalledWith(
      NAVIGATION_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_not_query_english_when_the_requested_language_has_navigation", async () => {
    mockFetch.mockResolvedValueOnce({ items: englishItems });

    await getNavigationItems("en");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should_fall_back_to_english_when_the_language_navigation_has_no_items", async () => {
    mockFetch.mockResolvedValueOnce({ items: [] }).mockResolvedValueOnce({ items: englishItems });

    const items = await getNavigationItems("fr");

    expect(items).toEqual(englishItems);
  });

  it("should_return_empty_array_when_no_navigation_exists", async () => {
    mockFetch.mockResolvedValue(null);

    const items = await getNavigationItems("fr");

    expect(items).toEqual([]);
  });

  it("should_return_empty_array_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const items = await getNavigationItems("en");

    expect(items).toEqual([]);
  });
});
