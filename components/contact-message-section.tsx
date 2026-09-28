import { ContactForm } from "@/components/contact-form";
import { ContactInfoSection } from "@/components/contact-info-section";

export function ContactMessageSection() {
  return (
    <section className="flex flex-col gap-[50px]">
      <h2 className="text-2xl leading-[1.3] font-semibold tracking-[-0.01em] text-neutral-950">
        Send us a message
      </h2>
      {/* 1352 content − 625 form − 612 info = the 115px gutter the design renders. */}
      <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-[115px]">
        <div className="lg:max-w-[625px] lg:flex-[625_1_0%]">
          <ContactForm />
        </div>
        <ContactInfoSection />
      </div>
    </section>
  );
}
