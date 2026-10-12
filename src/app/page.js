import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMosaic from "@/components/AboutMosaic";
import SolarSolutions from "@/components/SolarSolutions";
import SolarTechSection from "@/components/SolarTechSection";
import HowItWorks from "@/components/HowItWorks";
import Projects from "@/components/Projects";
import BenefitsAndSavings from "@/components/BenefitsAndSavings";
import TrustAndApproach from "@/components/TrustAndApproach";
import AssessmentForm from "@/components/AssessmentForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF7] text-[#17202A] selection:bg-[#FFB800] selection:text-[#071A2B]">
      {/* 1. Header & Navigation */}
      <Header />

      <main className="flex-1 flex flex-col">
        {/* 2. Photographic Hero Section */}
        <Hero />

        {/* 3. About Us — Editorial Image Mosaic */}
        <AboutMosaic />

        {/* 4. Solar Solutions — "How We Can Help" */}
        <SolarSolutions />

        {/* 5. Solar Technology Canvas Section — Exploded 3D Animation & Engineering */}
        <SolarTechSection />

        {/* 6. Installation Process — "From Rooftop to Renewable Energy" */}
        <HowItWorks />

        {/* 7. Projects Gallery — "Projects Designed Around Real Needs" */}
        <Projects />

        {/* 8. Benefits and Savings — 4 Pillars, Wipe Slider & Interactive Estimator */}
        <BenefitsAndSavings />

        {/* 9. Standards & Trust — "Our Approach" */}
        <TrustAndApproach />

        {/* 10. Assessment and Contact Section — "Let's Find the Right Solar Solution for You." */}
        <AssessmentForm />

        {/* 11. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* 12. Compact Editorial Footer */}
      <Footer />
    </div>
  );
}
