import { render, screen } from "@testing-library/react";
import { BlogContentSection } from "@/components/blog-content-section";
import { en } from "@/lib/i18n/dictionaries/en";
import { getBlogPosts } from "@/sanity/posts";
import type { BlogPost } from "@/sanity/types";

jest.mock("@/sanity/posts", () => ({
  getBlogPosts: jest.fn(),
}));

const mockGetBlogPosts = getBlogPosts as jest.Mock;

function makePost(index: number, label: string | null = "Design"): BlogPost {
  return {
    _id: `blog-${index}`,
    title: `Post ${index}`,
    description: `Description ${index}`,
    author: "John Layer",
    createdTime: "2026-09-27",
    label,
    imageUrl: `https://example.com/blog-${index}.png`,
  };
}

const featured = [makePost(100, "Featured"), makePost(101, "Featured")];
const rest = Array.from({ length: 8 }, (_, index) => makePost(index + 1));
const posts = [...featured, ...rest];

describe("BlogContentSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_hero_heading_and_intro", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(posts);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Blog" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Notes on operations, product, and the craft of building calm software.",
      ),
    ).toBeInTheDocument();
  });

  it("should_rank_the_featured_posts_before_the_grid", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(posts);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    const headings = screen
      .getAllByRole("heading")
      .map((heading) => heading.textContent);

    expect(headings).toEqual([
      "Blog",
      "Post 100",
      "Post 101",
      "Post 1",
      "Post 2",
      "Post 3",
      "Post 4",
      "Post 5",
      "Post 6",
    ]);
  });

  it("should_not_repeat_featured_posts_in_the_grid", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(posts);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    expect(screen.getAllByText("Post 100")).toHaveLength(1);
    expect(screen.getByText("Post 100").tagName).toBe("H2");
  });

  it("should_paginate_the_grid_six_posts_per_page", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(posts);

    render(await BlogContentSection({ locale: "en", dict: en, page: 2 }));

    expect(screen.getByText("Post 7")).toBeInTheDocument();
    expect(screen.getByText("Post 8")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
  });

  it("should_link_the_pagination_pages_to_the_blog_route", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(posts);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    const pagination = screen.getByRole("navigation", { name: "Pagination" });
    expect(pagination).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/en/blog?page=2",
    );
  });

  it("should_hide_the_pagination_when_the_grid_fits_on_one_page", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(rest.slice(0, 6));

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    expect(
      screen.queryByRole("navigation", { name: "Pagination" }),
    ).not.toBeInTheDocument();
  });

  it("should_clamp_an_out_of_range_page_to_the_last_page", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(posts);

    render(await BlogContentSection({ locale: "en", dict: en, page: 99 }));

    expect(screen.getByText("Post 7")).toBeInTheDocument();
    expect(screen.getByText("Post 8")).toBeInTheDocument();
  });

  it("should_render_the_hero_and_no_posts_when_the_blog_is_empty", async () => {
    mockGetBlogPosts.mockResolvedValueOnce([]);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Blog" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("should_render_only_the_featured_posts_when_every_post_is_featured", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(featured);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("should_link_each_post_to_the_detail_page_of_its_title_slug", async () => {
    mockGetBlogPosts.mockResolvedValueOnce(posts);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    expect(screen.getByRole("link", { name: /Post 100/ })).toHaveAttribute(
      "href",
      "/en/blog/post-100",
    );
    expect(screen.getByRole("link", { name: /Post 1 / })).toHaveAttribute(
      "href",
      "/en/blog/post-1",
    );
  });

  it("should_keep_posts_with_colliding_titles_reachable_under_distinct_slugs", async () => {
    const colliding: BlogPost[] = [
      {
        ...makePost(1),
        _id: "4cb64872-4d33-487c-8c74-f7b8f0bf1f2f",
        title: "Same Title",
      },
      {
        ...makePost(2),
        _id: "5a91e251-3a25-4681-a361-858302a9f932",
        title: "Same Title",
      },
    ];
    mockGetBlogPosts.mockResolvedValueOnce(colliding);

    render(await BlogContentSection({ locale: "en", dict: en, page: 1 }));

    expect(
      screen
        .getAllByRole("link", { name: /Same Title/ })
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/en/blog/same-title", "/en/blog/same-title-5a91e251"]);
  });
});
