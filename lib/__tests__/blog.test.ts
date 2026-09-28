import {
  blogListingHref,
  formatPostMeta,
  parseBlogPage,
  splitBlogPosts,
} from "@/lib/blog";
import type { BlogPost } from "@/sanity/types";

function makePost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    _id: "blog-1",
    title: "This is my first blog",
    description: "This is my first blog",
    author: "John Layer",
    createdTime: "2026-09-27",
    label: "Design",
    imageUrl: "https://example.com/blog-1.png",
    ...overrides,
  };
}

describe("parseBlogPage", () => {
  it("should_default_to_page_1_when_no_page_param_is_set", () => {
    expect(parseBlogPage({})).toBe(1);
  });

  it("should_parse_a_valid_page_param", () => {
    expect(parseBlogPage({ page: "2" })).toBe(2);
  });

  it("should_use_the_first_value_when_the_param_is_an_array", () => {
    expect(parseBlogPage({ page: ["3", "4"] })).toBe(3);
  });

  it("should_fall_back_to_page_1_for_invalid_values", () => {
    expect(parseBlogPage({ page: "0" })).toBe(1);
    expect(parseBlogPage({ page: "-2" })).toBe(1);
    expect(parseBlogPage({ page: "abc" })).toBe(1);
  });
});

describe("splitBlogPosts", () => {
  it("should_rank_posts_with_the_featured_label_into_the_featured_list", () => {
    const featured = makePost({ _id: "f-1", label: "Featured" });
    const other = makePost({ _id: "o-1", label: "Design" });

    expect(splitBlogPosts([featured, other])).toEqual({
      featured: [featured],
      rest: [other],
    });
  });

  it("should_match_the_featured_label_case_insensitively_and_trimmed", () => {
    const post = makePost({ label: "  featured " });

    expect(splitBlogPosts([post]).featured).toEqual([post]);
  });

  it("should_put_posts_without_a_label_into_the_rest_list", () => {
    const post = makePost({ label: null });

    expect(splitBlogPosts([post])).toEqual({ featured: [], rest: [post] });
  });

  it("should_preserve_the_incoming_order_within_each_list", () => {
    const first = makePost({ _id: "f-1", label: "Featured" });
    const second = makePost({ _id: "f-2", label: "Featured" });
    const rest = makePost({ _id: "o-1" });

    expect(splitBlogPosts([first, rest, second])).toEqual({
      featured: [first, second],
      rest: [rest],
    });
  });
});

describe("formatPostMeta", () => {
  it("should_join_the_author_and_the_formatted_date_with_a_middle_dot", () => {
    expect(
      formatPostMeta({ author: "John Layer", createdTime: "2026-09-27" }),
    ).toBe("John Layer · September 27, 2026");
  });

  it("should_return_only_the_date_when_the_author_is_missing", () => {
    expect(
      formatPostMeta({ author: null, createdTime: "2026-09-27" }),
    ).toBe("September 27, 2026");
  });

  it("should_return_only_the_author_when_the_date_is_missing", () => {
    expect(formatPostMeta({ author: "John Layer", createdTime: null })).toBe(
      "John Layer",
    );
  });

  it("should_return_an_empty_string_when_both_fields_are_missing", () => {
    expect(formatPostMeta({ author: null, createdTime: null })).toBe("");
  });

  it("should_ignore_an_unparseable_date", () => {
    expect(formatPostMeta({ author: "John Layer", createdTime: "n/a" })).toBe(
      "John Layer",
    );
  });

  it("should_ignore_a_date_with_an_out_of_range_day", () => {
    expect(formatPostMeta({ author: "John Layer", createdTime: "2026-02-30" })).toBe(
      "John Layer",
    );
  });
});

describe("blogListingHref", () => {
  it("should_link_to_the_plain_blog_route_for_the_first_page", () => {
    expect(blogListingHref(1)).toBe("/blog");
  });

  it("should_add_the_page_param_for_later_pages", () => {
    expect(blogListingHref(3)).toBe("/blog?page=3");
  });
});
