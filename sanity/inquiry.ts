import { client } from "@/sanity/client";
import type { InquiryInput, InquiryResult } from "@/sanity/types";

const WRITE_FAILED =
  "We could not send your message. Please try again, or email us directly.";

export async function createInquiry(input: InquiryInput): Promise<InquiryResult> {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return { ok: false, error: WRITE_FAILED };
  }

  try {
    await client.withConfig({ token }).create({
      _type: "inquiry",
      status: "new",
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
    });

    return { ok: true };
  } catch {
    return { ok: false, error: WRITE_FAILED };
  }
}
