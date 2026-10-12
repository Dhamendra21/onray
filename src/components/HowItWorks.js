"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ClipboardCheck, Compass, HardHat, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    tag: "DISCOVERY & MEASUREMENT",
    title: "Site Survey",
    description:
      "Every high-performance system begins with site precision. Our engineers inspect roof structural load ratings, analyze azimuth and tilt angles, identify micro-shading patterns, and inspect existing electrical panels.",
    highlights: ["Shading & 3D Shadow Analysis", "Roof Structural Integrity Test", "Load & Meter Compatibility"],
    image: "/roof.png",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    tag: "CUSTOM ENGINEERING",
    title: "Solar System Design",
    description:
      "We design an array custom-fitted to your property's dimensions and electrical profile. We prioritize optimal power yield, structural safety, and aesthetic architectural integration with your building.",
    highlights: ["Custom String & Inverter Sizing", "Galvanized Structure Blueprint", "Expected Yield Calculation"],
    image: "/structure.png",
    icon: Compass,
  },
  {
    number: "03",
    tag: "CERTIFIED EXECUTION",
    title: "Professional Installation",
    description:
      "Quality execution is non-negotiable. Experienced installers anchor heavy-duty corrosion-proof structures, mount Tier-1 monocrystalline panels, and wire inverters with strict electrical safety standards.",
    highlights: ["Tier-1 High-Efficiency Modules", "Certified Electricians & Riggers", "Zero Roof Leakage Mounting"],
    image: "/installation.png",
    icon: HardHat,
  },
  {
    number: "04",
    tag: "GRID COMMISSIONING",
    title: "System Activation",
    description:
      "We manage the net-metering liaison and inspection procedures with local power utilities. Once approved, your switch flips to clean, self-generated electricity with live mobile monitoring enabled.",
    highlights: ["Net-Metering Grid Connection", "Comprehensive Safety Testing", "Real-Time Mobile App Setup"],
    image: "/inverter.png",
    icon: Zap,
  },
];

export default function HowItWorks() {
  const processRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".process-anim-header", ".process-step-row"], { opacity: 1, y: 0 });
        return;
      }

      // 1. Process section header reveal
      gsap.from(".process-anim-header", {
        scrollTrigger: {
          trigger: ".process-header-wrap",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // 2. Progressive reveal for each step: Text and Image enter from opposite sides
      // and animate back in reverse when scrolling upwards
      const rows = gsap.utils.toArray(".process-step-row");
      rows.forEach((row, i) => {
        const isEven = i % 2 === 0;
        const textSide = row.querySelector(".step-content-anim");
        const imgSide = row.querySelector(".step-img-anim");

        // On desktop:
        // Even rows: Text is on Left (enters from -90px), Image is on Right (enters from +90px)
        // Odd rows: Image is on Left (enters from -90px), Text is on Right (enters from +90px)
        const isMobile = window.innerWidth < 1024;
        const textX = isMobile ? 0 : (isEven ? -90 : 90);
        const imgX = isMobile ? 0 : (isEven ? 90 : -90);
        const mobileY = isMobile ? 35 : 0;

        if (textSide) {
          gsap.from(textSide, {
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
            x: textX,
            y: mobileY,
            opacity: 0,
            duration: 1.05,
            ease: "power3.out",
          });
        }

        if (imgSide) {
          gsap.from(imgSide, {
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
            x: imgX,
            y: mobileY,
            scale: 0.95,
            opacity: 0,
            duration: 1.05,
            ease: "power3.out",
          });
        }
      });

      // 3. Bottom CTA reveal
      gsap.from(".process-bottom-cta", {
        scrollTrigger: {
          trigger: ".process-bottom-cta",
          start: "top 88%",
          toggleActions: "play reverse play reverse",
        },
        y: 25,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={processRef} id="process" className="py-20 md:py-28 lg:py-32 bg-[#FAFAF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="process-header-wrap text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="process-anim-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <span>STRUCTURED IMPLEMENTATION</span>
          </div>

          <h2 className="process-anim-header font-manrope text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#071A2B] mb-6 leading-tight">
            From Rooftop to <br />
            <span className="font-instrument font-light italic text-[#071A2B]">Renewable</span> Energy
          </h2>

          <p className="process-anim-header font-inter text-base sm:text-lg text-[#777D83] leading-relaxed">
            Our systematic four-phase engineering journey ensures every solar installation is safe, compliant, seamless, and primed for decades of dependable output.
          </p>
        </div>

        {/* Editorial Alternating Process Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="process-step-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Content Side */}
                <div
                  className={`step-content-anim lg:col-span-6 flex flex-col justify-center will-change-transform ${
                    isEven ? "order-2 lg:order-1" : "order-2 lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-manrope text-xs font-bold tracking-widest text-[#FFB800] px-2.5 py-1 rounded-md bg-[#071A2B]">
                      PHASE {step.number}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#777D83]">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-bold text-[#071A2B] mb-4">
                    {step.title}
                  </h3>

                  <p className="font-inter text-base text-[#777D83] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Highlight badges */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-[#EAEAE5]">
                    {step.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-[#17202A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <a
                      href="#assessment"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#071A2B] hover:text-[#FFB800] transition-colors"
                    >
                      <span>Inquire about this step</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Photographic Container */}
                <div
                  className={`step-img-anim lg:col-span-6 will-change-transform ${
                    isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"
                  }`}
                >
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(7,26,43,0.06)] border border-[#EAEAE5] bg-[#EAEAE5]/40 group">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 w-full h-full"
                      width={800}
                      height={800}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/40 via-transparent to-transparent" />
                    
                    {/* Floating Step Number Watermark */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#EAEAE5] flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#FFB800]" />
                      <span className="font-manrope text-xs font-bold text-[#071A2B]">Step {step.number}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="mt-20 text-center">
          <a
            href="#assessment"
            className="process-bottom-cta inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] font-semibold text-sm sm:text-base px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Start Your Rooftop Assessment</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
