import { fireEvent, render, screen } from "@testing-library/react";
import { ProductGallery } from "@/components/product-gallery";

const images = [
  "https://example.com/forecasting-1.png",
  "https://example.com/forecasting-2.png",
  "https://example.com/forecasting-3.png",
];

describe("ProductGallery", () => {
  it("should_show_the_first_image_as_the_main_image", () => {
    render(<ProductGallery images={images} title="Forecasting" />);

    expect(screen.getByRole("img", { name: "Forecasting" })).toHaveAttribute(
      "src",
      images[0],
    );
  });

  it("should_swap_the_main_image_when_a_thumbnail_is_selected", () => {
    render(<ProductGallery images={images} title="Forecasting" />);

    fireEvent.click(screen.getByRole("button", { name: "Show image 2" }));

    expect(screen.getByRole("img", { name: "Forecasting" })).toHaveAttribute(
      "src",
      images[1],
    );
  });

  it("should_mark_the_selected_thumbnail", () => {
    render(<ProductGallery images={images} title="Forecasting" />);

    fireEvent.click(screen.getByRole("button", { name: "Show image 2" }));

    expect(screen.getByRole("button", { name: "Show image 1" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "Show image 2" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("should_not_render_a_thumbnail_row_for_a_single_image", () => {
    render(<ProductGallery images={[images[0]]} title="Forecasting" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should_render_the_empty_frame_when_there_are_no_images", () => {
    render(<ProductGallery images={[]} title="Forecasting" />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
