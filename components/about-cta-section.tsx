import { PrimaryButton } from "@/components/primary-button";

export function AboutCtaSection() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[1.2] font-bold text-neutral-950">
          Get in Touch
        </h2>
        <p className="text-xs leading-[1.25] text-neutral-600">
          Questions, partnerships, or a demo: we answer every message within a
          day.
        </p>
      </div>
      <div className="flex">
        <PrimaryButton href="/contact">Contact us</PrimaryButton>
      </div>
    </section>
  );
}
