import {
  PRODUCTS_PAGE_SIZE,
  filterProducts,
  paginate,
  parseProductFilters,
  productListingHref,
} from "@/lib/product-listing";
import type { Product } from "@/sanity/types";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    _id: "product-1",
    title: "Insights",
    path: "/product/insights",
    imageUrl: "https://example.com/insights.png",
    categoryId: "cat-data",
    ...overrides,
  };
}

describe("parseProductFilters", () => {
  it("should_default_to_no_filters_and_page_one", () => {
    expect(parseProductFilters({})).toEqual({ category: "", q: "", page: 1 });
  });

  it("should_read_category_and_query_from_search_params", () => {
    expect(parseProductFilters({ category: "cat-1", q: "phone" })).toEqual({
      category: "cat-1",
      q: "phone",
      page: 1,
    });
  });

  it("should_use_the_first_value_when_a_param_is_repeated", () => {
    expect(
      parseProductFilters({ category: ["cat-1", "cat-2"], q: ["a", "b"] }),
    ).toEqual({ category: "cat-1", q: "a", page: 1 });
  });

  it("should_parse_a_valid_page_number", () => {
    expect(parseProductFilters({ page: "3" })).toEqual({
      category: "",
      q: "",
      page: 3,
    });
  });

  it.each(["0", "-2", "abc", ""])(
    "should_fall_back_to_page_one_for_invalid_page %s",
    (page) => {
      expect(parseProductFilters({ page })).toEqual({
        category: "",
        q: "",
        page: 1,
      });
    },
  );
});

describe("filterProducts", () => {
  const products = [
    makeProduct({ _id: "1", title: "Insights", categoryId: "cat-data" }),
    makeProduct({ _id: "2", title: "Data Sync", categoryId: "cat-data" }),
    makeProduct({ _id: "3", title: "Smartphone", categoryId: "cat-phone" }),
  ];

  it("should_return_all_products_when_no_filters_are_set", () => {
    expect(filterProducts(products, { category: "", q: "" })).toEqual(products);
  });

  it("should_filter_products_by_category", () => {
    const result = filterProducts(products, { category: "cat-data", q: "" });

    expect(result.map((product) => product._id)).toEqual(["1", "2"]);
  });

  it("should_filter_products_by_a_case_insensitive_title_match", () => {
    const result = filterProducts(products, { category: "", q: "data" });

    expect(result.map((product) => product._id)).toEqual(["2"]);
  });

  it("should_ignore_surrounding_whitespace_in_the_query", () => {
    const result = filterProducts(products, { category: "", q: "  sync " });

    expect(result.map((product) => product._id)).toEqual(["2"]);
  });

  it("should_combine_category_and_query_filters", () => {
    const result = filterProducts(products, {
      category: "cat-data",
      q: "insight",
    });

    expect(result.map((product) => product._id)).toEqual(["1"]);
  });
});

describe("paginate", () => {
  const products = Array.from({ length: 10 }, (_, index) =>
    makeProduct({ _id: `${index + 1}`, title: `Product ${index + 1}` }),
  );

  it("should_use_a_page_size_of_nine", () => {
    expect(PRODUCTS_PAGE_SIZE).toBe(9);
  });

  it("should_return_the_first_nine_products_on_page_one_with_two_total_pages", () => {
    const result = paginate(products, 1, PRODUCTS_PAGE_SIZE);

    expect(result.items).toHaveLength(9);
    expect(result.items[0]._id).toBe("1");
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(2);
  });

  it("should_return_the_remaining_product_on_page_two", () => {
    const result = paginate(products, 2, PRODUCTS_PAGE_SIZE);

    expect(result.items.map((product) => product._id)).toEqual(["10"]);
    expect(result.page).toBe(2);
  });

  it("should_clamp_a_page_beyond_the_last_one", () => {
    const result = paginate(products, 99, PRODUCTS_PAGE_SIZE);

    expect(result.page).toBe(2);
    expect(result.items.map((product) => product._id)).toEqual(["10"]);
  });

  it("should_clamp_pages_below_one", () => {
    const result = paginate(products, 0, PRODUCTS_PAGE_SIZE);

    expect(result.page).toBe(1);
    expect(result.items).toHaveLength(9);
  });

  it("should_handle_an_empty_list", () => {
    const result = paginate([], 1, PRODUCTS_PAGE_SIZE);

    expect(result).toEqual({ items: [], page: 1, totalPages: 1 });
  });
});

describe("productListingHref", () => {
  it("should_point_at_the_bare_listing_by_default", () => {
    expect(productListingHref({})).toBe("/product");
    expect(productListingHref({ category: "", q: "", page: 1 })).toBe("/product");
  });

  it("should_include_the_category", () => {
    expect(productListingHref({ category: "cat-1" })).toBe(
      "/product?category=cat-1",
    );
  });

  it("should_encode_the_query", () => {
    expect(productListingHref({ q: "data sync" })).toBe("/product?q=data+sync");
  });

  it("should_omit_page_one_but_keep_later_pages", () => {
    expect(productListingHref({ page: 1 })).toBe("/product");
    expect(productListingHref({ page: 2 })).toBe("/product?page=2");
  });

  it("should_keep_all_filters_together", () => {
    expect(
      productListingHref({ category: "cat-1", q: "sync", page: 2 }),
    ).toBe("/product?category=cat-1&q=sync&page=2");
  });
});
