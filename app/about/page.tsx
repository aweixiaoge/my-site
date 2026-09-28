import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/about-cta-section";
import { AboutHeroSection } from "@/components/about-hero-section";
import { AboutMissionSection } from "@/components/about-mission-section";
import { AboutStorySection } from "@/components/about-story-section";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us",
    description:
      "Who builds Meridian, the story behind the platform, and the principles we hold to.",
  };
}

export default function AboutPage() {
  return (
    <main className="flex-1">
      <div className="flex flex-col gap-16 bg-white px-5 py-16 sm:px-10 lg:gap-24 lg:px-20 lg:py-24">
        <AboutHeroSection />
        <AboutStorySection />
        <AboutMissionSection />
        <AboutCtaSection />
      </div>
    </main>
  );
}
