import { client } from "@/sanity/client";
import { getContentMedia } from "@/sanity/content-media";
import { CONTENT_MEDIA_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const contentMedia = {
  title: "See Meridian in action",
  description: "A two minute walkthrough of the platform.",
  videoUrl: "https://cdn.sanity.io/files/hgjts5tp/production/abc.mp4",
};

describe("getContentMedia", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_content_media_document", async () => {
    mockFetch.mockResolvedValueOnce(contentMedia);

    const result = await getContentMedia();

    expect(result).toEqual(contentMedia);
  });

  it("should_query_sanity_with_the_content_media_query", async () => {
    mockFetch.mockResolvedValueOnce(contentMedia);

    await getContentMedia();

    expect(mockFetch).toHaveBeenCalledWith(
      CONTENT_MEDIA_QUERY,
      {},
      expect.anything(),
    );
  });

  it("should_return_null_when_no_document_exists", async () => {
    mockFetch.mockResolvedValueOnce(null);

    const result = await getContentMedia();

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getContentMedia();

    expect(result).toBeNull();
  });
});
