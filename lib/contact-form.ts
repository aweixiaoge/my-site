export type InquiryValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type InquiryErrors = Partial<
  Record<"name" | "email" | "message", string>
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
    errors.name = "Please enter your name.";
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  }

  return errors;
}
