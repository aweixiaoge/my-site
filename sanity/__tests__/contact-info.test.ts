import { client } from "@/sanity/client";
import { getContactInfo } from "@/sanity/contact-info";
import { CONTACT_INFO_QUERY } from "@/sanity/queries";

jest.mock("@/sanity/client", () => ({
  client: { fetch: jest.fn() },
}));

const mockFetch = client.fetch as jest.Mock;

const contactInfo = {
  email: "hello@meridian.com",
  phone: "+1 (415) 555-0134",
  whatsapp: "+86 13556785648",
  address: "100 Market Street, Suite 400, San Francisco, CA 94105",
  youtube: "https://youtube.com/@meridian",
  facebook: "https://facebook.com/meridian",
  instagram: "https://instagram.com/meridian",
};

describe("getContactInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should_return_the_contact_info_document", async () => {
    mockFetch.mockResolvedValueOnce(contactInfo);

    const result = await getContactInfo("en");

    expect(result).toEqual(contactInfo);
  });

  it("should_query_sanity_with_the_requested_language", async () => {
    mockFetch.mockResolvedValueOnce(contactInfo);

    await getContactInfo("en");

    expect(mockFetch).toHaveBeenCalledWith(
      CONTACT_INFO_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_not_query_english_when_the_requested_language_has_a_document", async () => {
    mockFetch.mockResolvedValueOnce(contactInfo);

    await getContactInfo("es");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should_fall_back_to_english_when_the_language_has_no_document", async () => {
    mockFetch.mockResolvedValueOnce(null).mockResolvedValueOnce(contactInfo);

    const result = await getContactInfo("es");

    expect(result).toEqual(contactInfo);
    expect(mockFetch).toHaveBeenLastCalledWith(
      CONTACT_INFO_QUERY,
      { language: "en" },
      expect.anything(),
    );
  });

  it("should_return_null_when_no_document_exists", async () => {
    mockFetch.mockResolvedValueOnce(null);

    const result = await getContactInfo("en");

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getContactInfo("en");

    expect(result).toBeNull();
  });
});
