import { render, screen } from "@testing-library/react";
import { PostBadge } from "@/components/post-badge";

describe("PostBadge", () => {
  it("should_render_the_label_text", () => {
    render(<PostBadge>Featured</PostBadge>);

    expect(screen.getByText("Featured")).toBeInTheDocument();
  });
});
