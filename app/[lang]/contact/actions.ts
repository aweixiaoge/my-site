"use server";

import { validateInquiry, type InquiryValues } from "@/lib/contact-form";
import { createInquiry } from "@/sanity/inquiry";
import type { InquiryResult } from "@/sanity/types";

export async function submitInquiry(
  values: InquiryValues,
): Promise<InquiryResult> {
  if (Object.keys(validateInquiry(values)).length > 0) {
    return { ok: false, code: "invalid" };
  }

  return createInquiry({
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  });
}
