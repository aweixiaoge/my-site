import { client } from "@/sanity/client";
import { getProductCategories, getProducts } from "@/sanity/products";
import { PRODUCT_CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const products = [
  {
    _id: "product-1",
    title: "Insights",
    path: "/product/insights",
    imageUrl: "https://example.com/insights.png",
    categoryId: "cat-data",
  },
  {
    _id: "product-2",
    title: "Smartphone",
    path: "/product/smartphone",
    imageUrl: "https://example.com/smartphone.png",
    categoryId: "cat-phone",
  },
];

const categories = [
  { _id: "cat-data", title: "data" },
  { _id: "cat-phone", title: "phone" },
];

describe("getProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_product_list_documents", async () => {
    mockFetch.mockResolvedValueOnce(products);

    const result = await getProducts();

    expect(result).toEqual(products);
  });

  it("should_query_sanity_with_the_products_query", async () => {
    mockFetch.mockResolvedValueOnce(products);

    await getProducts();

    expect(mockFetch).toHaveBeenCalledWith(PRODUCTS_QUERY, {}, expect.anything());
  });

  it("should_return_an_empty_array_when_no_products_exist", async () => {
    mockFetch.mockResolvedValueOnce([]);

    const result = await getProducts();

    expect(result).toEqual([]);
  });

  it("should_return_an_empty_array_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getProducts();

    expect(result).toEqual([]);
  });
});

describe("getProductCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_category_documents", async () => {
    mockFetch.mockResolvedValueOnce(categories);

    const result = await getProductCategories();

    expect(result).toEqual(categories);
  });

  it("should_query_sanity_with_the_categories_query", async () => {
    mockFetch.mockResolvedValueOnce(categories);

    await getProductCategories();

    expect(mockFetch).toHaveBeenCalledWith(
      PRODUCT_CATEGORIES_QUERY,
      {},
      expect.anything(),
    );
  });

  it("should_return_an_empty_array_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getProductCategories();

    expect(result).toEqual([]);
  });
});
