import { fireEvent, render, screen, within } from "@testing-library/react";
import { NavMenu } from "@/components/nav-menu";

let mockPathname = "/";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

describe("NavMenu", () => {
  beforeEach(() => {
    mockPathname = "/";
  });

  it("should_render_a_link_for_each_navigation_item", () => {
    render(<NavMenu items={items} />);

    const nav = screen.getByRole("navigation");

    expect(within(nav).getAllByRole("link")).toHaveLength(items.length);
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
  });

  it("should_mark_the_link_for_the_current_route_as_active", () => {
    mockPathname = "/products";

    render(<NavMenu items={items} />);

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Contact" })).not.toHaveAttribute("aria-current");
  });

  it("should_mark_the_parent_link_as_active_on_a_nested_route", () => {
    mockPathname = "/products/widget";

    render(<NavMenu items={items} />);

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("aria-current", "page");
  });

  it("should_not_mark_home_as_active_on_another_route", () => {
    mockPathname = "/products";

    render(<NavMenu items={items} />);

    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("should_expand_the_menu_when_the_toggle_is_clicked", () => {
    render(<NavMenu items={items} />);

    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("should_collapse_the_menu_when_a_link_is_clicked", () => {
    render(<NavMenu items={items} />);
    fireEvent.click(screen.getByRole("button", { name: /menu/i }));

    fireEvent.click(screen.getByRole("link", { name: "Products" }));

    expect(screen.getByRole("button", { name: /menu/i })).toHaveAttribute("aria-expanded", "false");
  });
});
