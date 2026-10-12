"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, Pause, RotateCcw, Cpu, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SolarTechSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".tech-anim-header", ".tech-canvas-wrap", ".tech-badge-card"], { opacity: 1, y: 0 });
        return;
      }

      // Header entrance
      gsap.from(".tech-anim-header", {
        scrollTrigger: {
          trigger: ".tech-header-wrap",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Canvas card entrance
      gsap.from(".tech-canvas-wrap", {
        scrollTrigger: {
          trigger: ".tech-canvas-wrap",
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
        scale: 0.97,
        y: 35,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
      });

      // Badges entrance
      gsap.from(".tech-badge-card", {
        scrollTrigger: {
          trigger: ".tech-badges-grid",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 25,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const layers = [
    {
      title: "Anodized Aluminum Frame",
      description: "Corrosion-resistant structural casing engineered to withstand high wind loads and harsh weather conditions.",
      material: "Grade 6063-T6 Aluminum",
      timecode: 0,
    },
    {
      title: "Anti-Reflective Tempered Glass",
      description: "Low-iron 3.2mm glass with advanced texturing that maximizes solar spectrum transmission and impact resistance.",
      material: "3.2mm High-Transmittance ARC Glass",
      timecode: 3,
    },
    {
      title: "Monocrystalline Solar Cells",
      description: "High-efficiency half-cut monocrystalline silicon cells minimizing resistive losses and shade vulnerabilities.",
      material: "N-Type / TOPCon Half-Cell Technology",
      timecode: 6,
    },
    {
      title: "Multi-Layer Encapsulant & Backsheet",
      description: "Dual EVA/POE encapsulation and UV-resistant backsheet guarding against moisture ingress and PID degradation.",
      material: "High-Dielectric Weatherproof Matrix",
      timecode: 9,
    },
  ];

  // Sync active layer based on video playback time
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);

      // Map progress to active layer
      const index = Math.min(
        Math.floor((current / duration) * layers.length),
        layers.length - 1
      );
      setActiveLayer(index);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const jumpToLayer = (index) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const duration = videoRef.current.duration;
    videoRef.current.currentTime = (index / layers.length) * duration;
    setActiveLayer(index);
  };

  return (
    <section ref={sectionRef} id="technology" className="py-20 md:py-28 lg:py-32 bg-[#FAFAF7] border-b border-[#EAEAE5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="tech-header-wrap text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="tech-anim-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>SOLAR ENGINEERING & HARDWARE</span>
          </div>

          <h2 className="tech-anim-header font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2B] mb-5">
            Engineered Down to <br />
            <span className="font-instrument font-light italic text-[#071A2B]">the Very Last</span> Layer.
          </h2>

          <p className="tech-anim-header font-inter text-base sm:text-lg text-[#777D83] leading-relaxed">
            Every module deployed by Onray Solar Solution utilizes Tier-1 architecture designed for 25+ years of continuous power generation under intense Indian climatic conditions.
          </p>
        </div>

        {/* Central Exploded Technology Canvas Container */}
        <div className="tech-canvas-wrap relative bg-[#071A2B] rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-[#EAEAE5] shadow-[0_24px_60px_-12px_rgba(7,26,43,0.18)] text-white p-6 sm:p-10 lg:p-12 mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Media Viewer (Video or 2K Assembly Render) */}
            <div className="lg:col-span-7 relative flex flex-col items-center">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/exploded-panel.mp4"
                  poster="/solar-assembly.jpg"
                  muted
                  autoPlay
                  loop
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-contain"
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#071A2B]/40 to-transparent" />

                {/* Video controls bottom bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1 rounded-full hover:text-[#FFB800] transition-colors"
                      aria-label={isPlaying ? "Pause animation" : "Play animation"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={restartVideo}
                      className="p-1 rounded-full hover:text-[#FFB800] transition-colors"
                      aria-label="Restart animation"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-white/70 font-mono">
                      Component View
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#FFB800]">
                    Tier-1 Monocrystalline
                  </span>
                </div>
              </div>

              {/* Scrub timeline indicators */}
              <div className="w-full mt-4 flex items-center gap-2">
                {layers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToLayer(idx)}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      activeLayer === idx
                        ? "bg-[#FFB800]"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Jump to layer ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Technical Detail Cards */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-[#FFB800] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Layer 0{activeLayer + 1} of 0{layers.length}</span>
              </div>

              <h3 className="font-manrope text-2xl sm:text-3xl font-bold text-white mb-3">
                {layers[activeLayer].title}
              </h3>

              <p className="font-inter text-sm sm:text-base text-white/75 leading-relaxed mb-6">
                {layers[activeLayer].description}
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <p className="text-[11px] uppercase tracking-wider text-white/50 mb-1 font-inter">Material Specification</p>
                <p className="font-manrope font-semibold text-sm text-[#FFB800]">
                  {layers[activeLayer].material}
                </p>
              </div>

              {/* Component breakdown list */}
              <div className="space-y-2">
                {layers.map((layer, index) => (
                  <button
                    key={index}
                    onClick={() => jumpToLayer(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs ${
                      activeLayer === index
                        ? "bg-white/15 text-white font-semibold border border-white/20"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>0{index + 1}. {layer.title}</span>
                    {activeLayer === index && <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800]" />}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#EAEAE5] shadow-sm">
          <div>
            <h4 className="font-manrope text-base sm:text-lg font-bold text-[#071A2B] mb-1">
              Want technical recommendations tailored to your rooftop?
            </h4>
            <p className="text-sm text-[#777D83]">
              Our engineering team conducts structural load assessments and 3D irradiance studies before each installation.
            </p>
          </div>

          <a
            href="#assessment"
            className="shrink-0 inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] text-xs font-semibold px-6 py-3 rounded-full transition-all shadow-sm"
          >
            <span>Consult an Engineer</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
