"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Compass, Cpu, Sun, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutMosaic() {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".about-anim-fade", ".about-card", ".about-main-img"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // 1. Header fade up entrance
      gsap.from(".about-anim-fade", {
        scrollTrigger: {
          trigger: ".about-header-wrap",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // 2. Main Large Photograph: Smooth clip-path mask & subtle zoom-out reveal
      gsap.from(".about-main-img-box", {
        scrollTrigger: {
          trigger: ".about-mosaic-grid",
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
        clipPath: "polygon(0 12%, 100% 12%, 100% 100%, 0 100%)",
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      // 3. Right column cards staggered entrance
      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-mosaic-grid",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        delay: 0.15,
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutRef} id="about" className="py-20 md:py-28 lg:py-32 bg-[#FAFAF7] text-[#17202A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Editorial Section Header */}
        <div className="about-header-wrap grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <div className="about-anim-fade inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>ABOUT ONRAY SOLAR SOLUTION</span>
            </div>

            <h2 className="about-anim-fade font-manrope text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#071A2B] leading-[1.12]">
              Clean Energy. <br />
              <span className="font-instrument font-light italic text-[#071A2B]">Smarter</span> Future.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="about-anim-fade font-inter text-base sm:text-lg text-[#777D83] leading-relaxed mb-6">
              Onray Solar Solution is an Indian solar engineering brand committed to helping homeowners and businesses unlock the clean energy potential of their rooftops. We combine rigorous site surveys, custom engineering, and Tier-1 hardware for long-lasting performance.
            </p>
            <div className="about-anim-fade flex items-center gap-6">
              <a
                href="#assessment"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#071A2B] hover:text-[#FFB800] transition-colors group"
              >
                <span>Request a consultation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="h-4 w-px bg-[#EAEAE5]" />
              <span className="text-xs text-[#777D83] font-medium">Pipariya&bull; Madhya Pradesh &bull; Pan-India</span>
            </div>
          </div>
        </div>

        {/* Asymmetrical Editorial Image Mosaic inspired by the reference image */}
        <div className="about-mosaic-grid grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Main Large Photograph (7 cols on desktop) */}
          <div className="md:col-span-7 relative group">
            <div className="about-main-img-box relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(7,26,43,0.06)] border border-[#EAEAE5] bg-[#EAEAE5]/30 will-change-transform">
              <Image
                src="/rooftoop.png"
                alt="Onray Solar rooftop installation in India"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/70 via-transparent to-transparent opacity-80" />

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#FFB800] mb-1 font-inter">
                  ARCHITECTURAL INTEGRATION
                </p>
                <h3 className="font-manrope text-xl sm:text-2xl font-bold tracking-tight">
                  Engineered precisely for Indian weather & building dynamics
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Two Editorial Cards (5 cols on desktop) */}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">

            {/* Top Right Card: Hardware & Engineering Focus */}
            <div className="about-card relative flex-1 group">
              <div className="relative aspect-[16/9] sm:aspect-[16/10] md:h-full min-h-[220px] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-[#EAEAE5] bg-[#071A2B]">
                <Image
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop"
                  alt="Solar engineering technicians inspect panel modules"
                  fill
                  className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/90 via-[#071A2B]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-1.5 text-[#FFB800]">
                    <Cpu className="w-4 h-4" />
                    <span className="text-[11px] font-semibold tracking-wider uppercase">PRECISION LAYOUT</span>
                  </div>
                  <h4 className="font-manrope text-lg font-bold text-white">
                    Maximum irradiance capture with zero structural compromise
                  </h4>
                </div>
              </div>
            </div>

            {/* Bottom Right Card: Technical Highlights Bento */}
            <div className="about-card rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-[#FFFFFF] border border-[#EAEAE5] shadow-[0_8px_30px_rgba(7,26,43,0.03)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#777D83]">
                  OUR CORE STANDARD
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]" />
              </div>

              <div className="grid grid-cols-2 gap-4 my-2">
                <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5]/60">
                  <div className="flex items-center gap-1.5 text-[#071A2B] font-manrope font-bold text-base mb-1">
                    <Sun className="w-4 h-4 text-[#FFB800]" />
                    <span>Monocrystalline</span>
                  </div>
                  <p className="text-xs text-[#777D83] leading-relaxed">
                    Half-cut PERC / TOPCon cell technology for peak yield.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5]/60">
                  <div className="flex items-center gap-1.5 text-[#071A2B] font-manrope font-bold text-base mb-1">
                    <Layers className="w-4 h-4 text-[#FFB800]" />
                    <span>Galvanized GI</span>
                  </div>
                  <p className="text-xs text-[#777D83] leading-relaxed">
                    Heavy-duty corrosion resistant structural mounting.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAEAE5] flex items-center justify-between text-xs text-[#777D83]">
                <span>Every project custom-surveyed</span>
                <span className="font-semibold text-[#071A2B]">100% Tailored Design</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
