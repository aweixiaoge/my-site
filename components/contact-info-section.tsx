import type { ReactNode } from "react";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconYoutube,
} from "@/components/contact-icons";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { getContactInfo } from "@/sanity/contact-info";
import type { ContactInfo } from "@/sanity/types";

type InfoCard = {
  label: string;
  value: string;
  icon: ReactNode;
  href?: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

function buildCards(
  contactInfo: NonNullable<ContactInfo>,
  dict: Dictionary,
): InfoCard[] {
  const cards: InfoCard[] = [];

  const email = contactInfo.email?.trim();
  if (email) {
    cards.push({
      label: dict.contact.labelEmail,
      value: email,
      icon: <IconMail />,
      href: `mailto:${email}`,
    });
  }

  const phone = contactInfo.phone?.trim();
  if (phone) {
    cards.push({ label: dict.contact.labelPhone, value: phone, icon: <IconPhone /> });
  }

  const whatsapp = contactInfo.whatsapp?.trim();
  if (whatsapp) {
    cards.push({
      label: dict.contact.labelWhatsApp,
      value: whatsapp,
      icon: <IconMessageCircle />,
    });
  }

  const address = contactInfo.address?.trim();
  if (address) {
    cards.push({ label: dict.contact.labelAddress, value: address, icon: <IconMapPin /> });
  }

  return cards;
}

function buildSocialLinks(
  contactInfo: NonNullable<ContactInfo>,
  dict: Dictionary,
): SocialLink[] {
  const links: SocialLink[] = [];

  const youtube = contactInfo.youtube?.trim();
  if (youtube) {
    links.push({ label: dict.contact.labelYouTube, href: youtube, icon: <IconYoutube /> });
  }

  const facebook = contactInfo.facebook?.trim();
  if (facebook) {
    links.push({ label: dict.contact.labelFacebook, href: facebook, icon: <IconFacebook /> });
  }

  const instagram = contactInfo.instagram?.trim();
  if (instagram) {
    links.push({ label: dict.contact.labelInstagram, href: instagram, icon: <IconInstagram /> });
  }

  return links;
}

export async function ContactInfoSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const contactInfo = await getContactInfo(locale);

  if (!contactInfo) {
    return null;
  }

  const cards = buildCards(contactInfo, dict);
  const socialLinks = buildSocialLinks(contactInfo, dict);

  return (
    <section className="flex flex-col lg:max-w-[612px] lg:flex-[612_1_0%]">
      <div className="flex flex-col gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex min-h-[100px] items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
              {card.icon}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="text-sm leading-[1.5] text-neutral-600">
                {card.label}
              </p>
              {card.href ? (
                <a
                  href={card.href}
                  className="wrap-anywhere text-base leading-[1.6] text-neutral-600"
                >
                  {card.value}
                </a>
              ) : (
                <p className="wrap-anywhere text-base leading-[1.6] text-neutral-600">
                  {card.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {socialLinks.length > 0 ? (
        <div className="mt-[39px] flex w-36 justify-between">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100"
            >
              {link.icon}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
