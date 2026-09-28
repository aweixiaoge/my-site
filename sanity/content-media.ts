import { client } from "@/sanity/client";
import { CONTENT_MEDIA_QUERY } from "@/sanity/queries";
import type { ContentMedia } from "@/sanity/types";

export async function getContentMedia(): Promise<ContentMedia> {
  try {
    return await client.fetch<ContentMedia>(
      CONTENT_MEDIA_QUERY,
      {},
      { next: { revalidate: 30 } },
    );
  } catch {
    return null;
  }
}
