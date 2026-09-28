import { client } from "@/sanity/client";
import { getBlogPostBySlug, getBlogPosts } from "@/sanity/posts";
import { BLOG_POST_BY_ID_QUERY, BLOG_POSTS_QUERY } from "@/sanity/queries";

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

const detail = {
  _id: "blog-1",
  title: "This is my first blog",
  description: "This is my first blog",
  author: "John Layer",
  createdTime: "2026-09-27",
  label: "Featured",
  images: ["https://example.com/blog-1.png"],
  body: [
    {
      _type: "block",
      _key: "block-1",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "span-1", text: "Hello", marks: [] }],
    },
  ],
};

describe("getBlogPostBySlug", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_post_whose_title_slugifies_to_the_slug", async () => {
    mockFetch.mockResolvedValueOnce(posts).mockResolvedValueOnce(detail);

    const result = await getBlogPostBySlug("this-is-my-first-blog");

    expect(result).toEqual(detail);
  });

  it("should_fetch_the_matched_document_by_id", async () => {
    mockFetch.mockResolvedValueOnce(posts).mockResolvedValueOnce(detail);

    await getBlogPostBySlug("this-is-my-first-blog");

    expect(mockFetch).toHaveBeenLastCalledWith(
      BLOG_POST_BY_ID_QUERY,
      { id: "blog-1" },
      expect.anything(),
    );
  });

  it("should_resolve_a_suffixed_slug_to_the_later_document_of_a_collision", async () => {
    const colliding = [
      {
        ...posts[0],
        _id: "4cb64872-4d33-487c-8c74-f7b8f0bf1f2f",
        title: "Same Title",
      },
      {
        ...posts[0],
        _id: "5a91e251-3a25-4681-a361-858302a9f932",
        title: "Same Title",
      },
    ];
    mockFetch.mockResolvedValueOnce(colliding).mockResolvedValueOnce(detail);

    await getBlogPostBySlug("same-title-5a91e251");

    expect(mockFetch).toHaveBeenLastCalledWith(
      BLOG_POST_BY_ID_QUERY,
      { id: "5a91e251-3a25-4681-a361-858302a9f932" },
      expect.anything(),
    );
  });

  it("should_normalise_missing_images_to_an_empty_array", async () => {
    mockFetch
      .mockResolvedValueOnce(posts)
      .mockResolvedValueOnce({
        ...detail,
        images: [null, "https://example.com/blog-1b.png"],
      });

    const result = await getBlogPostBySlug("this-is-my-first-blog");

    expect(result?.images).toEqual(["https://example.com/blog-1b.png"]);
  });

  it("should_return_null_when_no_post_matches_the_slug", async () => {
    mockFetch.mockResolvedValueOnce(posts);

    const result = await getBlogPostBySlug("not-a-real-post");

    expect(result).toBeNull();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should_return_null_when_the_matched_document_is_gone", async () => {
    mockFetch.mockResolvedValueOnce(posts).mockResolvedValueOnce(null);

    const result = await getBlogPostBySlug("this-is-my-first-blog");

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getBlogPostBySlug("this-is-my-first-blog");

    expect(result).toBeNull();
  });
});
