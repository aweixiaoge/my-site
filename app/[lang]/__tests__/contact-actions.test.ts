import { submitInquiry } from "@/app/[lang]/contact/actions";
import { createInquiry } from "@/sanity/inquiry";

jest.mock("@/sanity/inquiry", () => ({
  createInquiry: jest.fn(),
}));

const mockCreateInquiry = createInquiry as jest.Mock;

const inquiry = {
  name: "Jane Cooper",
  email: "jane@company.com",
  subject: "Partnership enquiry",
  message: "We would like to hear more about Meridian.",
};

describe("submitInquiry", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateInquiry.mockResolvedValue({ ok: true });
  });

  it("should_write_the_inquiry_when_the_submission_is_valid", async () => {
    const result = await submitInquiry(inquiry);

    expect(mockCreateInquiry).toHaveBeenCalledWith(inquiry);
    expect(result).toEqual({ ok: true });
  });

  it("should_trim_the_submitted_values_before_writing", async () => {
    await submitInquiry({
      name: "  Jane Cooper ",
      email: " jane@company.com ",
      subject: " Partnership enquiry ",
      message: " We would like to hear more about Meridian. ",
    });

    expect(mockCreateInquiry).toHaveBeenCalledWith(inquiry);
  });

  it("should_reject_a_submission_that_bypasses_the_client_form", async () => {
    const result = await submitInquiry({ ...inquiry, email: "not-an-email" });

    expect(mockCreateInquiry).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });

  it("should_reject_a_submission_with_empty_required_fields", async () => {
    const result = await submitInquiry({
      ...inquiry,
      name: " ",
      message: "",
    });

    expect(mockCreateInquiry).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });

  it("should_pass_the_write_failure_back_to_the_form", async () => {
    mockCreateInquiry.mockResolvedValue({
      ok: false,
      error: "We could not send your message.",
    });

    const result = await submitInquiry(inquiry);

    expect(result).toEqual({
      ok: false,
      error: "We could not send your message.",
    });
  });
});
