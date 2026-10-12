"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, ArrowDown, ShieldCheck, SunMedium } from "lucide-react";

export default function Hero() {
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const bgMediaRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        // Respect reduced motion: show items immediately without translation
        gsap.set(".hero-fade", { opacity: 1, y: 0 });
        return;
      }

      // Elegant cinematic entrance sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 28,
            duration: 1.0,
          },
          "-=0.5"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.85,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 18,
            duration: 0.75,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .from(
          ".hero-bottom-item",
          {
            opacity: 0,
            y: 16,
            duration: 0.75,
            stagger: 0.08,
          },
          "-=0.4"
        );

      // Desktop-only subtle mouse parallax and ambient solar glow
      if (!isTouch && cardRef.current && bgMediaRef.current) {
        const card = cardRef.current;
        const bg = bgMediaRef.current;
        const glow = glowRef.current;

        const xQuickBg = gsap.quickTo(bg, "x", { duration: 0.8, ease: "power2.out" });
        const yQuickBg = gsap.quickTo(bg, "y", { duration: 0.8, ease: "power2.out" });
        
        let xQuickGlow = null;
        let yQuickGlow = null;
        if (glow) {
          xQuickGlow = gsap.quickTo(glow, "x", { duration: 0.5, ease: "power2.out" });
          yQuickGlow = gsap.quickTo(glow, "y", { duration: 0.5, ease: "power2.out" });
        }

        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          // Parallax offset: ±18px range
          const normX = (relX / rect.width - 0.5) * 2;
          const normY = (relY / rect.height - 0.5) * 2;
          xQuickBg(-normX * 16);
          yQuickBg(-normY * 16);

          if (glow && xQuickGlow && yQuickGlow) {
            xQuickGlow(relX);
            yQuickGlow(relY);
            gsap.to(glow, { opacity: 0.45, duration: 0.3 });
          }
        };

        const handleMouseLeave = () => {
          xQuickBg(0);
          yQuickBg(0);
          if (glow) {
            gsap.to(glow, { opacity: 0, duration: 0.5 });
          }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAF7] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Hero Container with Rounded Borders and Photographic Video */}
        <div
          ref={cardRef}
          className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden min-h-[580px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 shadow-[0_20px_60px_-15px_rgba(7,26,43,0.18)] border border-[#EAEAE5]/40 group"
        >
          {/* Background Video / Photographic Overlay with Parallax Scale */}
          <div ref={bgMediaRef} className="absolute -inset-6 z-0 pointer-events-none will-change-transform">
            <video
              src="/hero.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover scale-105"
            />
            {/* Editorial dark overlay for optimum contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/95 via-[#071A2B]/60 to-[#071A2B]/40" />
            <div className="absolute inset-0 bg-[#071A2B]/20" />
          </div>

          {/* Restrained Solar-Yellow Glow Tracking Cursor (Desktop only) */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#FFB800]/25 via-[#FFB800]/10 to-transparent blur-3xl opacity-0 z-[1] will-change-transform"
          />

          {/* Top Hero Bar: Eyebrow metadata label & Verified India Status */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 hero-eyebrow">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FAFAF7]">
              <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest uppercase font-inter">
                ROOFTOP SOLAR — INDIA
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-white/80 text-xs font-medium tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
              <span>Tier-1 Engineering & Clean Grid Integration</span>
            </div>
          </div>

          {/* Middle/Bottom Hero Content: Refined Typography & Actions */}
          <div className="relative z-10 max-w-4xl mt-12 sm:mt-16 md:mt-20">
            {/* Main Headline */}
            <h1 className="hero-title font-manrope text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FAFAF7] tracking-tight leading-[1.08] mb-6">
              Solar Solutions Designed <br className="hidden sm:block" />
              <span className="font-instrument font-light italic text-[#FFB800] pr-2">for a Brighter</span>
              Future.
            </h1>

            {/* Supporting Copy */}
            <p className="hero-desc font-inter text-base sm:text-lg md:text-xl text-white/85 max-w-2xl font-normal leading-relaxed mb-8 md:mb-10">
              Thoughtfully designed solar installations for Indian homes and businesses. Turning empty rooftops into long-term clean energy assets.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#assessment"
                className="hero-cta inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <span>Get Free Assessment</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#projects"
                className="hero-cta inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-[#FAFAF7] font-medium text-sm sm:text-base px-7 py-3.5 rounded-full backdrop-blur-md border border-white/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explore Our Projects</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar: Quick Architectural Highlights */}
          <div className="relative z-10 pt-8 sm:pt-12 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/90">
            <div className="hero-bottom-item">
              <p className="text-[11px] uppercase tracking-wider text-white/60 mb-1 font-inter">Engineered For</p>
              <p className="text-sm sm:text-base font-semibold font-manrope">Indian Rooftops</p>
            </div>
            <div className="hero-bottom-item">
              <p className="text-[11px] uppercase tracking-wider text-white/60 mb-1 font-inter">Components</p>
              <p className="text-sm sm:text-base font-semibold font-manrope">Tier-1 Monocrystalline</p>
            </div>
            <div className="hero-bottom-item">
              <p className="text-[11px] uppercase tracking-wider text-white/60 mb-1 font-inter">Lifecycle</p>
              <p className="text-sm sm:text-base font-semibold font-manrope">25+ Year Performance</p>
            </div>
            <div className="hero-bottom-item flex items-center justify-start md:justify-end">
              <a
                href="#about"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFB800] hover:text-white transition-colors"
              >
                <span>Scroll to explore</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
