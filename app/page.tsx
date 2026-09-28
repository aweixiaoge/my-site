import { ContentStatsSection } from "@/components/content-stats-section";
import { HeroSection } from "@/components/hero-section";

export default function IndexPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ContentStatsSection />
    </main>
  );
}
