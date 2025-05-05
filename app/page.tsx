import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { CalculatorSection } from "@/components/sections/calculator";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { StandardsSection } from "@/components/sections/standards";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="space-y-16">
        <HeroSection />
        <FeaturesSection />
        <CalculatorSection />
        <HowItWorksSection />
        <StandardsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
