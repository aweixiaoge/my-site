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

    const result = await getContactInfo();

    expect(result).toEqual(contactInfo);
  });

  it("should_query_sanity_with_the_contact_info_query", async () => {
    mockFetch.mockResolvedValueOnce(contactInfo);

    await getContactInfo();

    expect(mockFetch).toHaveBeenCalledWith(
      CONTACT_INFO_QUERY,
      {},
      expect.anything(),
    );
  });

  it("should_return_null_when_no_document_exists", async () => {
    mockFetch.mockResolvedValueOnce(null);

    const result = await getContactInfo();

    expect(result).toBeNull();
  });

  it("should_return_null_when_the_sanity_request_fails", async () => {
    mockFetch.mockRejectedValue(new Error("Sanity request failed"));

    const result = await getContactInfo();

    expect(result).toBeNull();
  });
});
