import type { Locale } from "@/lib/i18n/locales";
import { fetchInLocale } from "@/sanity/localized";
import { ABOUT_US_QUERY } from "@/sanity/queries";
import type { AboutUs } from "@/sanity/types";

type AboutUsDocument = Omit<NonNullable<AboutUs>, "images"> & {
  images?: (string | null)[] | null;
};

export async function getAboutUs(locale: Locale): Promise<AboutUs> {
  const aboutUs = await fetchInLocale<AboutUsDocument>(ABOUT_US_QUERY, locale);

  if (!aboutUs) {
    return null;
  }

  return {
    ...aboutUs,
    images: (aboutUs.images ?? []).filter(
      (image): image is string => Boolean(image),
    ),
  };
}
