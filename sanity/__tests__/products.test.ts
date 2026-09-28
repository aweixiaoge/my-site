import { client } from "@/sanity/client";
import {
  getProductByPath,
  getProductCategories,
  getProducts,
  getRelatedProducts,
} from "@/sanity/products";
import {
  PRODUCT_BY_PATH_QUERY,
  PRODUCT_CATEGORIES_QUERY,
  PRODUCTS_QUERY,
  RELATED_PRODUCTS_QUERY,
} from "@/sanity/queries";

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

const productDetail = {
  _id: "product-1",
  title: "Forecasting",
  description: "See where your revenue is heading.",
  path: "/product/smartphone/10",
  images: [
    "https://example.com/forecasting-1.png",
    "https://example.com/forecasting-2.png",
  ],
  category: { _id: "cat-phone", title: "Smartphone" },
};

describe("getProductByPath", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_product_matching_the_path", async () => {
    mockFetch.mockResolvedValueOnce(productDetail);

    const result = await getProductByPath("/product/smartphone/10");

    expect(result).toEqual(productDetail);
  });

  it("should_query_sanity_with_the_product_by_path_query", async () => {
    mockFetch.mockResolvedValueOnce(productDetail);

    await getProductByPath("/product/smartphone/10");

    expect(mockFetch).toHaveBeenCalledWith(
      PRODUCT_BY_PATH_QUERY,
      { path: "/product/smartphone/10" },
      expect.anything(),
    );
  });

  it("should_return_null_when_no_product_matches_the_path", async () => {
    mockFetch.mockResolvedValueOnce(null);

    const result = await getProductByPath("/product/unknown");

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getProductByPath("/product/smartphone/10");

    expect(result).toBeNull();
  });

  it("should_drop_empty_image_urls_from_the_gallery", async () => {
    mockFetch.mockResolvedValueOnce({
      ...productDetail,
      images: ["https://example.com/forecasting-1.png", null],
    });

    const result = await getProductByPath("/product/smartphone/10");

    expect(result?.images).toEqual(["https://example.com/forecasting-1.png"]);
  });

  it("should_return_an_empty_gallery_when_the_product_has_no_images", async () => {
    mockFetch.mockResolvedValueOnce({ ...productDetail, images: null });

    const result = await getProductByPath("/product/smartphone/10");

    expect(result?.images).toEqual([]);
  });
});

const relatedProducts = [
  {
    _id: "product-2",
    title: "Reporting",
    path: "/product/smartphone/9",
    imageUrl: "https://example.com/reporting.png",
  },
];

describe("getRelatedProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_related_products", async () => {
    mockFetch.mockResolvedValueOnce(relatedProducts);

    const result = await getRelatedProducts({
      categoryId: "cat-phone",
      excludeId: "product-1",
    });

    expect(result).toEqual(relatedProducts);
  });

  it("should_query_sanity_with_the_category_and_the_excluded_product", async () => {
    mockFetch.mockResolvedValueOnce(relatedProducts);

    await getRelatedProducts({ categoryId: "cat-phone", excludeId: "product-1" });

    expect(mockFetch).toHaveBeenCalledWith(
      RELATED_PRODUCTS_QUERY,
      { categoryId: "cat-phone", excludeId: "product-1" },
      expect.anything(),
    );
  });

  it("should_return_an_empty_array_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getRelatedProducts({
      categoryId: "cat-phone",
      excludeId: "product-1",
    });

    expect(result).toEqual([]);
  });
});
