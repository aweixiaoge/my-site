import { render, screen } from "@testing-library/react";
import { FeaturedPost } from "@/components/featured-post";
import type { BlogPost } from "@/sanity/types";

const post: BlogPost = {
  _id: "blog-1",
  title: "This is my first blog",
  description: "This is my first blog description",
  author: "John Layer",
  createdTime: "2026-09-27",
  label: "Featured",
  imageUrl: "https://example.com/blog-1.png",
};

const href = "/blog/this-is-my-first-blog";

describe("FeaturedPost", () => {
  it("should_render_the_title_as_a_heading", () => {
    render(<FeaturedPost post={post} href={href} />);

    expect(
      screen.getByRole("heading", { name: "This is my first blog" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_excerpt_and_the_formatted_meta_line", () => {
    render(<FeaturedPost post={post} href={href} />);

    expect(
      screen.getByText("This is my first blog description"),
    ).toBeInTheDocument();
    expect(screen.getByText("John Layer · September 27, 2026")).toBeInTheDocument();
  });

  it("should_render_the_label_badge", () => {
    render(<FeaturedPost post={post} href={href} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("should_render_the_image_with_the_title_as_alt_text", () => {
    render(<FeaturedPost post={post} href={href} />);

    expect(
      screen.getByRole("img", { name: "This is my first blog" }),
    ).toHaveAttribute("src", "https://example.com/blog-1.png");
  });

  it("should_link_the_featured_post_to_its_detail_page", () => {
    render(<FeaturedPost post={post} href={href} />);

    expect(
      screen.getByRole("link", { name: /This is my first blog/ }),
    ).toHaveAttribute("href", href);
  });

  it("should_hide_the_optional_parts_when_the_post_lacks_data", () => {
    render(
      <FeaturedPost
        post={{ _id: "blog-2", title: "Bare post", label: null }}
        href="/blog/bare-post"
      />,
    );

    expect(screen.getByText("Bare post")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });
});
