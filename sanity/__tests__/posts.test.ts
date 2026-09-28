import { client } from "@/sanity/client";
import { getBlogPosts } from "@/sanity/posts";
import { BLOG_POSTS_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const posts = [
  {
    _id: "blog-1",
    title: "This is my first blog",
    description: "This is my first blog",
    author: "John Layer",
    createdTime: "2026-09-27",
    label: "Featured",
    imageUrl: "https://example.com/blog-1.png",
  },
  {
    _id: "blog-2",
    title: "This is my third blog",
    description: "This is my third blog",
    author: "John Layer",
    createdTime: "2026-09-24",
    label: "Hot Sale",
    imageUrl: "https://example.com/blog-2.png",
  },
];

describe("getBlogPosts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_blog_list_documents", async () => {
    mockFetch.mockResolvedValueOnce(posts);

    const result = await getBlogPosts();

    expect(result).toEqual(posts);
  });

  it("should_query_sanity_with_the_blog_posts_query", async () => {
    mockFetch.mockResolvedValueOnce(posts);

    await getBlogPosts();

    expect(mockFetch).toHaveBeenCalledWith(BLOG_POSTS_QUERY, {}, expect.anything());
  });

  it("should_return_an_empty_array_when_no_blog_posts_exist", async () => {
    mockFetch.mockResolvedValueOnce([]);

    const result = await getBlogPosts();

    expect(result).toEqual([]);
  });

  it("should_return_an_empty_array_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getBlogPosts();

    expect(result).toEqual([]);
  });
});
