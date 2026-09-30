import { client } from "@/sanity/client";
import { getAboutUs } from "@/sanity/about-us";
import { ABOUT_US_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const aboutUs = {
  storyDescription: "We build tools for teams that run on data.",
  images: [
    "https://cdn.sanity.io/images/hgjts5tp/production/one.jpg",
    "https://cdn.sanity.io/images/hgjts5tp/production/two.jpg",
  ],
};

describe("getAboutUs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_about_us_document", async () => {
    mockFetch.mockResolvedValueOnce(aboutUs);

    const result = await getAboutUs("en");

    expect(result).toEqual(aboutUs);
  });

  it("should_query_sanity_with_the_requested_language", async () => {
    mockFetch.mockResolvedValueOnce(aboutUs);

    await getAboutUs("en");

    expect(mockFetch).toHaveBeenCalledWith(
      ABOUT_US_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_not_query_english_when_the_requested_language_has_a_document", async () => {
    mockFetch.mockResolvedValueOnce(aboutUs);

    await getAboutUs("de");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should_fall_back_to_english_when_the_language_has_no_document", async () => {
    mockFetch.mockResolvedValueOnce(null).mockResolvedValueOnce(aboutUs);

    const result = await getAboutUs("de");

    expect(result).toEqual(aboutUs);
    expect(mockFetch).toHaveBeenLastCalledWith(
      ABOUT_US_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_return_an_empty_image_list_when_no_images_are_set", async () => {
    mockFetch.mockResolvedValueOnce({
      storyDescription: aboutUs.storyDescription,
      images: null,
    });

    const result = await getAboutUs("en");

    expect(result?.images).toEqual([]);
  });

  it("should_drop_null_images_from_the_list", async () => {
    mockFetch.mockResolvedValueOnce({
      storyDescription: aboutUs.storyDescription,
      images: [aboutUs.images[0], null],
    });

    const result = await getAboutUs("en");

    expect(result?.images).toEqual([aboutUs.images[0]]);
  });

  it("should_return_null_when_no_document_exists", async () => {
    mockFetch.mockResolvedValueOnce(null);

    const result = await getAboutUs("en");

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getAboutUs("en");

    expect(result).toBeNull();
  });
});
