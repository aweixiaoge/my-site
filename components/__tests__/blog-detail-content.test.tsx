import { render, screen } from "@testing-library/react";
import { BlogDetailContent } from "@/components/blog-detail-content";
import type { BlogPostDetail } from "@/sanity/types";

function paragraph(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  };
}

const post: BlogPostDetail = {
  _id: "blog-1",
  title: "How we rebuilt the reporting engine",
  description: "A rewrite without downtime.",
  author: "Elena Marsh",
  createdTime: "2026-03-12",
  label: "Engineering",
  images: [
    "https://example.com/reporting-1.png",
    "https://example.com/reporting-2.png",
  ],
  body: [
    paragraph("block-1", "For four years, reporting ran on a queue."),
    paragraph("block-2", "Nothing was on fire."),
  ],
};

describe("BlogDetailContent", () => {
  it("should_render_the_post_title_as_the_page_heading", () => {
    render(<BlogDetailContent post={post} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "How we rebuilt the reporting engine",
      }),
    ).toBeInTheDocument();
  });

  it("should_link_the_breadcrumb_back_to_the_blog_listing", () => {
    render(<BlogDetailContent post={post} />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  it("should_mark_the_post_title_as_the_current_breadcrumb_step", () => {
    render(<BlogDetailContent post={post} />);

    const current = screen
      .getByRole("navigation", { name: "Breadcrumb" })
      .querySelector("[aria-current='page']");

    expect(current).toHaveTextContent("How we rebuilt the reporting engine");
  });

  it("should_render_the_label_badge", () => {
    render(<BlogDetailContent post={post} />);

    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("should_render_the_author_and_the_formatted_date_as_separate_parts", () => {
    render(<BlogDetailContent post={post} />);

    expect(screen.getByText("Elena Marsh")).toBeInTheDocument();
    expect(screen.getByText("March 12, 2026")).toBeInTheDocument();
  });

  it("should_render_the_post_images_in_the_gallery", () => {
    render(<BlogDetailContent post={post} />);

    expect(
      screen.getByRole("button", { name: "Show image 2" }),
    ).toBeInTheDocument();
  });

  it("should_render_every_body_block_as_a_paragraph", () => {
    render(<BlogDetailContent post={post} />);

    const first = screen.getByText("For four years, reporting ran on a queue.");
    const second = screen.getByText("Nothing was on fire.");

    expect(first.tagName).toBe("P");
    expect(second.tagName).toBe("P");
  });

  it("should_hide_the_optional_parts_when_the_post_lacks_data", () => {
    render(
      <BlogDetailContent
        post={{
          _id: "blog-2",
          title: "Bare post",
          label: null,
          images: [],
          body: null,
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Bare post" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });

  it("should_render_only_the_author_when_the_date_is_missing", () => {
    render(
      <BlogDetailContent post={{ ...post, createdTime: null }} />,
    );

    expect(screen.getByText("Elena Marsh")).toBeInTheDocument();
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });

  it("should_render_only_the_date_when_the_author_is_missing", () => {
    render(<BlogDetailContent post={{ ...post, author: null }} />);

    expect(screen.getByText("March 12, 2026")).toBeInTheDocument();
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });
});
