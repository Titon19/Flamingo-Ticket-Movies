import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <div className="flex max-w-7xl mx-auto min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ShowcaseSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
