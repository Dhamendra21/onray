"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Home, Building2, Factory, Wrench } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const solutions = [
  {
    id: "residential",
    tag: "HOME ENERGY INDEPENDENCE",
    title: "Residential Solar",
    description:
      "Bring reliable, cleaner energy to your home. Designed to protect against tariff inflation and optimize unused terrace spaces.",
    features: ["RCC / Terrace Mounts", "Net-Metering Support", "Smart App Monitoring"],
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop",
    icon: Home,
    featured: true,
  },
  {
    id: "commercial",
    tag: "OPERATIONAL COST CONTROL",
    title: "Commercial Solar",
    description:
      "Empower your offices, institutions, and retail facilities to reduce grid power dependencies with high-efficiency commercial setups.",
    features: ["Demand-Charge Offsetting", "Custom Load Matching", "High ROI"],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    icon: Building2,
    featured: false,
  },
  {
    id: "industrial",
    tag: "HEAVY CAPACITY INFRASTRUCTURE",
    title: "Industrial Solar",
    description:
      "Scalable photovoltaic deployments for manufacturing plants, warehouses, and factories with high daytime power requirements.",
    features: ["Metal Shed / Ground Mounts", "Substation Interfacing", "Rapid Payback"],
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop",
    icon: Factory,
    featured: false,
  },
  {
    id: "maintenance",
    tag: "LIFECYCLE ASSURANCE",
    title: "Solar Maintenance & Support",
    description:
      "Comprehensive system health assessments, panel cleaning, inverter diagnostics, and preventive maintenance for sustained output.",
    features: ["Performance Audits", "Thermal Scanning", "Fast Resolution"],
    image: "/maintainace.png",
    icon: Wrench,
    featured: false,
  },
];

export default function SolarSolutions() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".solution-anim-header", ".solution-card"], { opacity: 1, y: 0 });
        return;
      }

      // Section header entrance
      gsap.from(".solution-anim-header", {
        scrollTrigger: {
          trigger: ".solution-header-wrap",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Cards staggered reveal
      gsap.from(".solution-card", {
        scrollTrigger: {
          trigger: ".solutions-grid",
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Subtle desktop 3D tilt on pointer move
      if (!isTouch) {
        cardsRef.current.forEach((card) => {
          if (!card) return;

          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const normX = (e.clientX - rect.left) / rect.width - 0.5;
            const normY = (e.clientY - rect.top) / rect.height - 0.5;

            // Restrained tilt angle: max ±6 deg
            gsap.to(card, {
              rotateY: normX * 8,
              rotateX: -normY * 8,
              transformPerspective: 1000,
              duration: 0.4,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          };

          card.addEventListener("mousemove", handleMouseMove);
          card.addEventListener("mouseleave", handleMouseLeave);

          card._cleanupTilt = () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
          };
        });
      }
    }, sectionRef);

    return () => {
      cardsRef.current.forEach((card) => card?._cleanupTilt?.());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="solutions" className="py-20 md:py-28 lg:py-32 bg-[#FFFFFF] border-y border-[#EAEAE5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="solution-header-wrap flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="solution-anim-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
              <span>OUR SERVICES & CAPABILITIES</span>
            </div>
            
            <h2 className="solution-anim-header font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2B] leading-tight">
              How We Can Help
            </h2>
          </div>

          <p className="solution-anim-header font-inter text-base text-[#777D83] max-w-md">
            Custom engineered solar systems developed around your actual power tariff, structural roof type, and consumption curve.
          </p>
        </div>

        {/* Photography-led Card Grid */}
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="solution-card group relative flex flex-col bg-[#FAFAF7] rounded-2xl md:rounded-3xl overflow-hidden border border-[#EAEAE5] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(7,26,43,0.10)] will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Photographic Header Container */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EAEAE5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#071A2B] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-4 h-4 text-[#071A2B]" />
                  </div>

                  {item.featured && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#FFB800] text-[#071A2B] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Popular
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#777D83] block mb-2 font-inter">
                      {item.tag}
                    </span>

                    <h3 className="font-manrope text-xl font-bold text-[#071A2B] mb-2.5 flex items-center justify-between group-hover:text-[#FFB800] transition-colors duration-200">
                      <span>{item.title}</span>
                    </h3>

                    <p className="font-inter text-sm text-[#777D83] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature Pills & Action */}
                  <div>
                    <div className="space-y-1.5 mb-6 pt-4 border-t border-[#EAEAE5]">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#17202A]/80 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#assessment"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#071A2B] group-hover:text-[#FFB800] transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
