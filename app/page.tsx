import { ContentMediaSection } from "@/components/content-media-section";
import { HeroSection } from "@/components/hero-section";
import { HotProductsSection } from "@/components/hot-products-section";

export default function IndexPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <HotProductsSection />
      <ContentMediaSection />
    </main>
  );
}
