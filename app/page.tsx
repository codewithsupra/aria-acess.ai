import { Hero } from "@/components/landing/hero";
import { Trust } from "@/components/landing/trust";
import { ScanDemo } from "@/components/landing/scan-demo";
import { ReportPreview } from "@/components/landing/report-preview";
import { AiVision } from "@/components/landing/ai-vision";
import { Comparison } from "@/components/landing/comparison";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WhyAria } from "@/components/landing/why-aria";
import { FinalCta } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <main className="flex-1 bg-[#050816]">
      <Hero />
      <Trust />
      <HowItWorks />
      <ScanDemo />
      <ReportPreview />
      <AiVision />
      <Comparison />
      <WhyAria />
      <FinalCta />
      <LandingFooter />
    </main>
  );
}
