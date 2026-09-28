import { render, screen } from "@testing-library/react";
import { BlogPostCard } from "@/components/blog-post-card";
import type { BlogPost } from "@/sanity/types";

const post: BlogPost = {
  _id: "blog-1",
  title: "This is my third blog",
  description: "This is my third blog description",
  author: "John Layer",
  createdTime: "2026-09-24",
  label: "Hot Sale",
  imageUrl: "https://example.com/blog-1.png",
};

describe("BlogPostCard", () => {
  it("should_render_the_title_as_a_heading", () => {
    render(<BlogPostCard post={post} />);

    expect(
      screen.getByRole("heading", { name: "This is my third blog" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_excerpt_and_the_formatted_meta_line", () => {
    render(<BlogPostCard post={post} />);

    expect(
      screen.getByText("This is my third blog description"),
    ).toBeInTheDocument();
    expect(screen.getByText("John Layer · September 24, 2026")).toBeInTheDocument();
  });

  it("should_render_the_label_badge", () => {
    render(<BlogPostCard post={post} />);

    expect(screen.getByText("Hot Sale")).toBeInTheDocument();
  });

  it("should_render_the_image_with_the_title_as_alt_text", () => {
    render(<BlogPostCard post={post} />);

    expect(
      screen.getByRole("img", { name: "This is my third blog" }),
    ).toHaveAttribute("src", "https://example.com/blog-1.png");
  });

  it("should_not_render_a_link_while_no_blog_detail_page_exists", () => {
    render(<BlogPostCard post={post} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should_hide_the_optional_parts_when_the_post_lacks_data", () => {
    render(
      <BlogPostCard post={{ _id: "blog-2", title: "Bare post", label: null }} />,
    );

    expect(screen.getByText("Bare post")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });
});
