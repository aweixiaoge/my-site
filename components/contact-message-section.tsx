import { ContactForm } from "@/components/contact-form";
import { ContactInfoSection } from "@/components/contact-info-section";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ContactMessageSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="flex flex-col gap-[50px]">
      <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
        {dict.contact.messageTitle}
      </h2>
      {/* 1352 content − 625 form − 612 info = the 115px gutter the design renders. */}
      <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-[115px]">
        <div className="lg:max-w-[625px] lg:flex-[625_1_0%]">
          <ContactForm dict={dict} />
        </div>
        <ContactInfoSection dict={dict} />
      </div>
    </section>
  );
}
