import { render, screen } from "@testing-library/react";
import { ContentMediaSection } from "@/components/content-media-section";
import { getContentMedia } from "@/sanity/content-media";

jest.mock("@/sanity/content-media", () => ({
  getContentMedia: jest.fn(),
}));

const mockGetContentMedia = getContentMedia as jest.Mock;

const contentMedia = {
  title: "Live data, without the exports",
  description:
    "Meridian stays in sync with your CRM, warehouse, and finance tools.",
  videoUrl: "https://cdn.sanity.io/files/hgjts5tp/production/abc.mp4",
};

describe("ContentMediaSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_render_the_section_heading", async () => {
    mockGetContentMedia.mockResolvedValueOnce(contentMedia);

    render(await ContentMediaSection());

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "See the whole business in one place",
      }),
    ).toBeInTheDocument();
  });

  it("should_render_the_section_description", async () => {
    mockGetContentMedia.mockResolvedValueOnce(contentMedia);

    render(await ContentMediaSection());

    expect(
      screen.getByText(
        "Connect your systems once, and every team works from the same live view.",
      ),
    ).toBeInTheDocument();
  });

  it("should_render_the_title_from_sanity", async () => {
    mockGetContentMedia.mockResolvedValueOnce(contentMedia);

    render(await ContentMediaSection());

    expect(
      screen.getByRole("heading", { level: 3, name: contentMedia.title }),
    ).toBeInTheDocument();
  });

  it("should_render_the_description_from_sanity", async () => {
    mockGetContentMedia.mockResolvedValueOnce(contentMedia);

    render(await ContentMediaSection());

    expect(screen.getByText(contentMedia.description)).toBeInTheDocument();
  });

  it("should_render_the_video_from_sanity", async () => {
    mockGetContentMedia.mockResolvedValueOnce(contentMedia);

    const { container } = render(await ContentMediaSection());

    expect(container.querySelector("video")).toHaveAttribute(
      "src",
      contentMedia.videoUrl,
    );
  });

  it("should_render_the_title_when_the_document_has_no_video", async () => {
    mockGetContentMedia.mockResolvedValueOnce({
      ...contentMedia,
      videoUrl: null,
    });

    const { container } = render(await ContentMediaSection());

    expect(
      screen.getByRole("heading", { level: 3, name: contentMedia.title }),
    ).toBeInTheDocument();
    expect(container.querySelector("video")).not.toBeInTheDocument();
  });

  it("should_render_nothing_when_no_document_exists", async () => {
    mockGetContentMedia.mockResolvedValueOnce(null);

    const { container } = render(await ContentMediaSection());

    expect(container).toBeEmptyDOMElement();
  });
});
