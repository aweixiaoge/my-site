import { productDetailPath } from "@/lib/product-detail";

describe("productDetailPath", () => {
  it("should_build_the_product_path_from_the_route_segments", () => {
    expect(productDetailPath(["smartphone", "10"])).toBe("/product/smartphone/10");
  });

  it("should_build_a_single_segment_product_path", () => {
    expect(productDetailPath(["widget"])).toBe("/product/widget");
  });
});
