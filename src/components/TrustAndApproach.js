"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Ruler, Wrench, Headphones, Award, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pillars = [
  {
    icon: Ruler,
    title: "Tailored Site Engineering",
    description: "No cookie-cutter solar kits. We model every building's roof geometry, shadow path, and structural dead-load capacity before drafting final array blueprints.",
  },
  {
    icon: ShieldCheck,
    title: "Tier-1 Components Only",
    description: "We deploy proven monocrystalline modules, hot-dip galvanized mounting structures, and certified inverters equipped with remote cloud diagnostics.",
  },
  {
    icon: Wrench,
    title: "Certified In-House Installation",
    description: "Installations are overseen by experienced electrical engineers adhering to strict Indian Standards (IS/IEC) safety guidelines with zero roof punctures.",
  },
  {
    icon: Headphones,
    title: "Dedicated Post-Commissioning Support",
    description: "From utility net-metering approvals to routine preventative maintenance and generation audits, our support team remains your local point of contact.",
  },
];

export default function TrustAndApproach() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".approach-anim-header", ".approach-pillar-card", ".approach-standards-banner"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // 1. Header fade up entrance
      gsap.from(".approach-anim-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // 2. Pillars cards entrance
      gsap.from(".approach-pillar-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // 3. Standards banner entrance
      gsap.from(".approach-standards-banner", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="approach" className="py-20 md:py-28 lg:py-32 bg-[#FFFFFF] border-y border-[#EAEAE5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="approach-header-wrap text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="approach-anim-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>STANDARDS & COMMITMENTS</span>
          </div>

          <h2 className="approach-anim-header font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2B] mb-5">
            Our Approach to Solar
          </h2>

          <p className="approach-anim-header font-inter text-base sm:text-lg text-[#777D83] leading-relaxed">
            We focus on honest engineering, transparent data, and quality craftsmanship so our customers can invest in solar with complete peace of mind.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="approach-pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="approach-pillar-card bg-[#FAFAF7] rounded-2xl md:rounded-3xl p-7 border border-[#EAEAE5] shadow-[0_4px_16px_rgba(7,26,43,0.02)] flex flex-col justify-between hover:border-[#071A2B]/20 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAEAE5] flex items-center justify-center text-[#071A2B] mb-6 shadow-sm">
                    <Icon className="w-6 h-6 text-[#FFB800]" />
                  </div>
                  <h3 className="font-manrope text-lg font-bold text-[#071A2B] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-inter text-sm text-[#777D83] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verifiable Company Standards Banner */}
        <div className="approach-standards-banner rounded-2xl md:rounded-3xl bg-[#071A2B] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FFB800] block mb-2 font-inter">
              VERIFIED ENGINEERING STANDARDS
            </span>
            <h3 className="font-manrope text-2xl sm:text-3xl font-bold mb-3">
              Built to withstand Indian monsoons, heat, and high winds.
            </h3>
            <p className="text-sm text-white/75 leading-relaxed">
              Every Onray Solar Solution rooftop framework is tested for wind resistance up to 150 km/h and engineered with anti-corrosion hot-dip galvanization.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
              <CheckCircle className="w-5 h-5 text-[#FFB800] mx-auto mb-1.5" />
              <p className="text-xs font-semibold">Tier-1 Hardware</p>
              <p className="text-[10px] text-white/60">ALMM Approved</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
              <CheckCircle className="w-5 h-5 text-[#FFB800] mx-auto mb-1.5" />
              <p className="text-xs font-semibold">25-Yr Performance</p>
              <p className="text-[10px] text-white/60">Linear Yield Warranty</p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-center">
              <CheckCircle className="w-5 h-5 text-[#FFB800] mx-auto mb-1.5" />
              <p className="text-xs font-semibold">Net-Metering</p>
              <p className="text-[10px] text-white/60">DISCOM Compliance</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
