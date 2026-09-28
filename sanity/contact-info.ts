import { client } from "@/sanity/client";
import { CONTACT_INFO_QUERY } from "@/sanity/queries";
import type { ContactInfo } from "@/sanity/types";

export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const contactInfo = await client.fetch<ContactInfo>(
      CONTACT_INFO_QUERY,
      {},
      { next: { revalidate: 30 } },
    );

    return contactInfo ?? null;
  } catch {
    return null;
  }
}
