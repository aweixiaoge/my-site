import { validateInquiry } from "@/lib/contact-form";

const validInquiry = {
  name: "Jane Cooper",
  email: "jane@company.com",
  subject: "Partnership enquiry",
  message: "We would like to hear more about Meridian.",
};

describe("validateInquiry", () => {
  it("should_return_no_errors_for_a_complete_inquiry", () => {
    expect(validateInquiry(validInquiry)).toEqual({});
  });

  it("should_treat_the_subject_as_optional", () => {
    expect(validateInquiry({ ...validInquiry, subject: "" })).toEqual({});
  });

  it("should_report_a_missing_name", () => {
    expect(Object.keys(validateInquiry({ ...validInquiry, name: "" }))).toEqual([
      "name",
    ]);
  });

  it("should_report_a_whitespace_only_name", () => {
    expect(
      Object.keys(validateInquiry({ ...validInquiry, name: "   " })),
    ).toEqual(["name"]);
  });

  it("should_report_a_missing_email", () => {
    expect(
      Object.keys(validateInquiry({ ...validInquiry, email: "" })),
    ).toEqual(["email"]);
  });

  it("should_report_a_missing_message", () => {
    expect(
      Object.keys(validateInquiry({ ...validInquiry, message: "" })),
    ).toEqual(["message"]);
  });

  it.each(["jane", "jane@", "@company.com", "jane@company"])(
    "should_report_the_malformed_email_%s",
    (email) => {
      expect(Object.keys(validateInquiry({ ...validInquiry, email }))).toEqual([
        "email",
      ]);
    },
  );

  it("should_accept_an_email_padded_with_whitespace", () => {
    expect(
      validateInquiry({ ...validInquiry, email: "  jane@company.com  " }),
    ).toEqual({});
  });

  it("should_report_every_invalid_field_at_once", () => {
    expect(
      Object.keys(
        validateInquiry({ name: "", email: "jane", subject: "", message: "" }),
      ).sort(),
    ).toEqual(["email", "message", "name"]);
  });
});
