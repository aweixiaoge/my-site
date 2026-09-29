export type InquiryValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * Validation returns codes rather than sentences so the logic stays free of
 * language; the form maps each code to the active dictionary.
 */
export type InquiryFieldError =
  | "name-required"
  | "email-required"
  | "email-invalid"
  | "message-required";

export type InquiryErrors = Partial<
  Record<"name" | "email" | "message", InquiryFieldError>
>;

export const EMPTY_INQUIRY: InquiryValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  const email = values.email.trim();

  if (!values.name.trim()) {
    errors.name = "name-required";
  }

  if (!email) {
    errors.email = "email-required";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "email-invalid";
  }

  if (!values.message.trim()) {
    errors.message = "message-required";
  }

  return errors;
}
