import { HeroSection } from "@/components/HeroSection";
import { WorksSection } from "@/components/WorksSection";
import { AboutStatementSection } from "@/components/AboutStatementSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SelectedWorksSection } from "@/components/SelectedWorksSection";
import { WhoAmISection } from "@/components/WhoAmISection";
import { FooterCTASection } from "@/components/FooterCTASection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fcf3]">
      <WhatsAppButton />
      <HeroSection />
      <WorksSection />
      <AboutStatementSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <SelectedWorksSection />
      <WhoAmISection />
      <FooterCTASection />
    </main>
  );
}
