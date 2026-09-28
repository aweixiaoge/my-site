import { render, screen } from "@testing-library/react";
import { AboutStorySection } from "@/components/about-story-section";
import { getAboutUs } from "@/sanity/about-us";

jest.mock("@/sanity/about-us", () => ({
  getAboutUs: jest.fn(),
}));

const mockGetAboutUs = getAboutUs as jest.Mock;

const aboutUs = {
  storyDescription: "Meridian started in a shared document.",
  images: [
    "https://cdn.sanity.io/images/hgjts5tp/production/first.jpg",
    "https://cdn.sanity.io/images/hgjts5tp/production/second.png",
  ],
};

describe("AboutStorySection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_section_heading", async () => {
    mockGetAboutUs.mockResolvedValueOnce(aboutUs);

    render(await AboutStorySection());

    expect(
      screen.getByRole("heading", { level: 2, name: "Our Story" }),
    ).toBeInTheDocument();
  });

  it("should_render_the_story_description_from_sanity", async () => {
    mockGetAboutUs.mockResolvedValueOnce(aboutUs);

    render(await AboutStorySection());

    expect(screen.getByText(aboutUs.storyDescription)).toBeInTheDocument();
  });

  it("should_render_the_first_image_from_sanity", async () => {
    mockGetAboutUs.mockResolvedValueOnce(aboutUs);

    render(await AboutStorySection());

    expect(screen.getByRole("img")).toHaveAttribute("src", aboutUs.images[0]);
  });

  it("should_not_render_the_remaining_images", async () => {
    mockGetAboutUs.mockResolvedValueOnce(aboutUs);

    const { container } = render(await AboutStorySection());

    expect(container.querySelectorAll("img")).toHaveLength(1);
  });

  it("should_render_an_empty_image_slot_when_the_document_has_no_images", async () => {
    mockGetAboutUs.mockResolvedValueOnce({ ...aboutUs, images: [] });

    render(await AboutStorySection());

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Our Story" }),
    ).toBeInTheDocument();
  });

  it("should_render_nothing_when_no_document_exists", async () => {
    mockGetAboutUs.mockResolvedValueOnce(null);

    const { container } = render(await AboutStorySection());

    expect(container).toBeEmptyDOMElement();
  });
});
