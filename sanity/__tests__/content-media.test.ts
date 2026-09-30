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

    const result = await getContentMedia("en");

    expect(result).toEqual(contentMedia);
  });

  it("should_query_sanity_with_the_requested_language", async () => {
    mockFetch.mockResolvedValueOnce(contentMedia);

    await getContentMedia("en");

    expect(mockFetch).toHaveBeenCalledWith(
      CONTENT_MEDIA_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_not_query_english_when_the_requested_language_has_a_document", async () => {
    mockFetch.mockResolvedValueOnce(contentMedia);

    await getContentMedia("ja");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should_fall_back_to_english_when_the_language_has_no_document", async () => {
    mockFetch.mockResolvedValueOnce(null).mockResolvedValueOnce(contentMedia);

    const result = await getContentMedia("ja");

    expect(result).toEqual(contentMedia);
    expect(mockFetch).toHaveBeenLastCalledWith(
      CONTENT_MEDIA_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_return_null_when_no_document_exists", async () => {
    mockFetch.mockResolvedValueOnce(null);

    const result = await getContentMedia("en");

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getContentMedia("en");

    expect(result).toBeNull();
  });
});
