import { client } from "@/sanity/client";
import type { InquiryInput, InquiryResult } from "@/sanity/types";

export async function createInquiry(input: InquiryInput): Promise<InquiryResult> {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return { ok: false, code: "write-failed" };
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
    return { ok: false, code: "write-failed" };
  }
}
