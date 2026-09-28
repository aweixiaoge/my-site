import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import BlogDetailPage, { generateMetadata } from "@/app/blog/[slug]/page";
import { getBlogPostBySlug } from "@/sanity/posts";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("@/sanity/posts", () => ({
  getBlogPostBySlug: jest.fn(),
}));

jest.mock("@/components/blog-detail-content", () => ({
  BlogDetailContent: () => <div data-testid="blog-detail-content" />,
}));

const mockGetBlogPostBySlug = getBlogPostBySlug as jest.Mock;
const mockNotFound = notFound as unknown as jest.Mock;

const post = {
  _id: "blog-1",
  title: "How we rebuilt the reporting engine",
  description: "A rewrite without downtime.",
  author: "Elena Marsh",
  createdTime: "2026-03-12",
  label: "Engineering",
  images: ["https://example.com/reporting-1.png"],
  body: [],
};

const pageProps = (slug: string) => ({
  params: Promise.resolve({ slug }),
  searchParams: Promise.resolve({}),
});

describe("BlogDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetBlogPostBySlug.mockResolvedValue(post);
  });

  it("should_render_the_main_content_area", async () => {
    render(await BlogDetailPage(pageProps("how-we-rebuilt")));

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should_fetch_the_post_for_the_route_slug_and_render_its_content", async () => {
    render(await BlogDetailPage(pageProps("how-we-rebuilt")));

    expect(mockGetBlogPostBySlug).toHaveBeenCalledWith("how-we-rebuilt");
    expect(screen.getByTestId("blog-detail-content")).toBeInTheDocument();
  });

  it("should_show_the_not_found_page_when_the_post_does_not_exist", async () => {
    mockGetBlogPostBySlug.mockResolvedValue(null);

    await expect(BlogDetailPage(pageProps("nope"))).rejects.toThrow(
      "NEXT_NOT_FOUND",
    );
    expect(mockNotFound).toHaveBeenCalled();
  });

  it("should_use_the_post_fields_for_the_page_metadata", async () => {
    const metadata = await generateMetadata(pageProps("how-we-rebuilt"));

    expect(metadata).toEqual({
      title: "How we rebuilt the reporting engine",
      description: "A rewrite without downtime.",
    });
  });

  it("should_fall_back_to_the_listing_description_when_the_post_has_no_description", async () => {
    mockGetBlogPostBySlug.mockResolvedValue({ ...post, description: null });

    const metadata = await generateMetadata(pageProps("how-we-rebuilt"));

    expect(metadata.description).toBe(
      "Notes on operations, product, and the craft of building calm software.",
    );
  });

  it("should_fall_back_to_a_generic_title_and_description_when_the_post_is_missing", async () => {
    mockGetBlogPostBySlug.mockResolvedValue(null);

    const metadata = await generateMetadata(pageProps("nope"));

    expect(metadata).toEqual({
      title: "Blog",
      description:
        "Notes on operations, product, and the craft of building calm software.",
    });
  });
});
