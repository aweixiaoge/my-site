import { render, screen } from "@testing-library/react";
import { Pagination } from "@/components/pagination";

const buildHref = (page: number) => `/product?page=${page}`;

describe("Pagination", () => {
  it("should_render_nothing_when_there_is_only_one_page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} buildHref={buildHref} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should_render_a_link_for_every_page", () => {
    render(<Pagination currentPage={1} totalPages={3} buildHref={buildHref} />);

    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "/product?page=1",
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/product?page=2",
    );
    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute(
      "href",
      "/product?page=3",
    );
  });

  it("should_mark_the_current_page", () => {
    render(<Pagination currentPage={2} totalPages={3} buildHref={buildHref} />);

    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("should_style_the_current_page_with_the_accent_color", () => {
    render(<Pagination currentPage={1} totalPages={2} buildHref={buildHref} />);

    expect(screen.getByRole("link", { name: "1" })).toHaveClass(
      "bg-accent",
      "text-white",
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveClass(
      "text-neutral-600",
    );
  });

  it("should_link_to_the_next_page_when_one_exists", () => {
    render(<Pagination currentPage={1} totalPages={2} buildHref={buildHref} />);

    expect(screen.getByRole("link", { name: /Next/ })).toHaveAttribute(
      "href",
      "/product?page=2",
    );
  });

  it("should_render_next_as_disabled_on_the_last_page", () => {
    render(<Pagination currentPage={2} totalPages={2} buildHref={buildHref} />);

    expect(screen.queryByRole("link", { name: /Next/ })).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toHaveAttribute("aria-disabled", "true");
  });
});
