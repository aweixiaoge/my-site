import { render, screen } from "@testing-library/react";
import { PrimaryButton } from "@/components/primary-button";

describe("PrimaryButton", () => {
  it("should_render_a_link_with_the_given_href_and_label", () => {
    render(<PrimaryButton href="/products">Check out</PrimaryButton>);

    const link = screen.getByRole("link", { name: "Check out" });

    expect(link).toHaveAttribute("href", "/products");
  });
});
