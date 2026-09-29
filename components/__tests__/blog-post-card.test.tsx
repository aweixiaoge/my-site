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

const href = "/blog/this-is-my-third-blog";

describe("BlogPostCard", () => {
  it("should_render_the_title_as_a_heading", () => {
    render(<BlogPostCard post={post} href={href} locale="en" />);

    expect(
      screen.getByRole("heading", { name: "This is my third blog" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_excerpt_and_the_formatted_meta_line", () => {
    render(<BlogPostCard post={post} href={href} locale="en" />);

    expect(
      screen.getByText("This is my third blog description"),
    ).toBeInTheDocument();
    expect(screen.getByText("John Layer · September 24, 2026")).toBeInTheDocument();
  });

  it("should_render_the_label_badge", () => {
    render(<BlogPostCard post={post} href={href} locale="en" />);

    expect(screen.getByText("Hot Sale")).toBeInTheDocument();
  });

  it("should_render_the_image_with_the_title_as_alt_text", () => {
    render(<BlogPostCard post={post} href={href} locale="en" />);

    expect(
      screen.getByRole("img", { name: "This is my third blog" }),
    ).toHaveAttribute("src", "https://example.com/blog-1.png");
  });

  it("should_link_the_card_to_the_blog_detail_page", () => {
    render(<BlogPostCard post={post} href={href} locale="en" />);

    expect(
      screen.getByRole("link", { name: /This is my third blog/ }),
    ).toHaveAttribute("href", href);
  });

  it("should_hide_the_optional_parts_when_the_post_lacks_data", () => {
    render(
      <BlogPostCard
        post={{ _id: "blog-2", title: "Bare post", label: null }}
        href="/blog/bare-post"
        locale="en"
      />,
    );

    expect(screen.getByText("Bare post")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });
});
