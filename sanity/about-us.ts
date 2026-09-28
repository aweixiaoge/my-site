import { client } from "@/sanity/client";
import { ABOUT_US_QUERY } from "@/sanity/queries";
import type { AboutUs } from "@/sanity/types";

type AboutUsDocument = Omit<NonNullable<AboutUs>, "images"> & {
  images?: (string | null)[] | null;
};

export async function getAboutUs(): Promise<AboutUs> {
  try {
    const aboutUs = await client.fetch<AboutUsDocument | null>(
      ABOUT_US_QUERY,
      {},
      { next: { revalidate: 30 } },
    );

    if (!aboutUs) {
      return null;
    }

    return {
      ...aboutUs,
      images: (aboutUs.images ?? []).filter(
        (image): image is string => Boolean(image),
      ),
    };
  } catch {
    return null;
  }
}
