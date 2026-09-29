import { client } from "@/sanity/client";
import { createInquiry } from "@/sanity/inquiry";

jest.mock("@/sanity/client", () => ({
  client: { withConfig: jest.fn() },
}));

const mockWithConfig = client.withConfig as jest.Mock;
const mockCreate = jest.fn();

const inquiry = {
  name: "Jane Cooper",
  email: "jane@company.com",
  subject: "Partnership enquiry",
  message: "We would like to hear more about Meridian.",
};

describe("createInquiry", () => {
  const originalToken = process.env.SANITY_API_WRITE_TOKEN;

  beforeEach(() => {
    jest.clearAllMocks();
    mockWithConfig.mockReturnValue({ create: mockCreate });
    mockCreate.mockResolvedValue({ _id: "inquiry-1" });
    process.env.SANITY_API_WRITE_TOKEN = "server-side-token";
  });

  afterAll(() => {
    if (originalToken === undefined) {
      delete process.env.SANITY_API_WRITE_TOKEN;
    } else {
      process.env.SANITY_API_WRITE_TOKEN = originalToken;
    }
  });

  it("should_create_an_inquiry_document_in_sanity", async () => {
    const result = await createInquiry(inquiry);

    expect(mockCreate).toHaveBeenCalledWith({
      _type: "inquiry",
      status: "new",
      ...inquiry,
    });
    expect(result).toEqual({ ok: true });
  });

  it("should_authorize_the_write_with_the_server_side_token", async () => {
    await createInquiry(inquiry);

    expect(mockWithConfig).toHaveBeenCalledWith({
      token: "server-side-token",
    });
  });

  it("should_not_write_anything_when_the_write_token_is_missing", async () => {
    delete process.env.SANITY_API_WRITE_TOKEN;

    const result = await createInquiry(inquiry);

    expect(mockCreate).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });

  it("should_report_a_failure_when_sanity_rejects_the_write", async () => {
    mockCreate.mockRejectedValue(new Error("Insufficient permissions"));

    const result = await createInquiry(inquiry);

    expect(result.ok).toBe(false);
  });

  it("should_not_leak_the_failure_reason_to_the_caller", async () => {
    mockCreate.mockRejectedValue(new Error("Insufficient permissions"));

    const result = await createInquiry(inquiry);

    expect(result).toHaveProperty("code");
    expect((result as { code: string }).code).not.toContain(
      "Insufficient permissions",
    );
  });
});
