import { client } from "@/sanity/client";
import { getHotProducts } from "@/sanity/hot-products";
import { HOT_PRODUCTS_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const products = [
  {
    _id: "product-1",
    title: "The first product",
    path: "/products/one",
    imageUrl: "https://example.com/one.png",
  },
  {
    _id: "product-2",
    title: "The second product",
    path: "/products/two",
    imageUrl: "https://example.com/two.png",
  },
];

describe("getHotProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_product_list_documents", async () => {
    mockFetch.mockResolvedValueOnce(products);

    const result = await getHotProducts("en");

    expect(result).toEqual(products);
  });

  it("should_query_sanity_with_the_requested_language", async () => {
    mockFetch.mockResolvedValueOnce(products);

    await getHotProducts("en");

    expect(mockFetch).toHaveBeenCalledWith(
      HOT_PRODUCTS_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_not_query_english_when_the_requested_language_has_products", async () => {
    mockFetch.mockResolvedValueOnce(products);

    await getHotProducts("de");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should_fall_back_to_english_when_the_language_has_no_products", async () => {
    mockFetch.mockResolvedValueOnce([]).mockResolvedValueOnce(products);

    const result = await getHotProducts("de");

    expect(result).toEqual(products);
    expect(mockFetch).toHaveBeenLastCalledWith(
      HOT_PRODUCTS_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_return_an_empty_array_when_no_products_exist", async () => {
    mockFetch.mockResolvedValueOnce([]);

    const result = await getHotProducts("en");

    expect(result).toEqual([]);
  });

  it("should_return_an_empty_array_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getHotProducts("en");

    expect(result).toEqual([]);
  });
});
