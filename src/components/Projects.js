"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: 1,
    title: "Residential Terrace Installation",
    category: "Residential Rooftop",
    capacity: "5 kW",
    location: "Bhilai, Madhya Pradesh",
    type: "On-Grid Net Metering",
    description: "Elevated structure design preserving terrace utility while powering air conditioners and daily residential load.",
    image: "/rooftoop.png",
  },
  {
    id: 2,
    title: "Commercial Complex Array",
    category: "Commercial Installation",
    capacity: "25 kW",
    location: "Raipur, Madhya Pradesh",
    type: "Commercial Rooftop",
    description: "High-irradiance solar array offsetting peak daytime commercial power tariffs with smart string inverters.",
    image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=2079&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Industrial Facility System",
    category: "Industrial Solar",
    capacity: "100 kW",
    location: "Durg Industrial Zone",
    type: "Metal Shed Mounting",
    description: "Heavy-duty solar deployment mounted on industrial corrugated metal sheds to counter manufacturing energy overhead.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Urban Villa Monocrystalline Array",
    category: "Residential Rooftop",
    capacity: "8 kW",
    location: "Nagpur, Maharashtra",
    type: "Bifacial / On-Grid",
    description: "Sleek architectural monocrystalline panels tailored for modern urban villa aesthetics and maximum generation.",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=2037&auto=format&fit=crop",
  },
];

const categories = ["All Projects", "Residential Rooftop", "Commercial Installation", "Industrial Solar"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const projectsRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".projects-anim-header", ".project-card"], { opacity: 1, y: 0 });
        return;
      }

      // 1. Header entrance
      gsap.from(".projects-anim-header", {
        scrollTrigger: {
          trigger: ".projects-header-wrap",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // 2. Project cards staggered entrance
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  // Animate cards on filter change
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const cards = gsap.utils.toArray(".project-card");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [activeCategory]);

  return (
    <section ref={projectsRef} id="projects" className="py-20 md:py-28 lg:py-32 bg-[#FFFFFF] border-t border-[#EAEAE5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Category Filters */}
        <div className="projects-header-wrap flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="projects-anim-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
              <span>PORTFOLIO & CASE STUDIES</span>
            </div>

            <h2 className="projects-anim-header font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2B] leading-tight">
              Projects Designed Around Real Needs
            </h2>
          </div>

          {/* Minimal Pill Filters */}
          <div className="projects-anim-header flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#071A2B] text-white shadow-sm"
                    : "bg-[#FAFAF7] text-[#777D83] hover:text-[#071A2B] hover:bg-[#EAEAE5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photography-led Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="project-card group relative bg-[#FAFAF7] rounded-2xl md:rounded-3xl overflow-hidden border border-[#EAEAE5] shadow-[0_4px_20px_rgba(7,26,43,0.03)] hover:shadow-[0_20px_45px_rgba(7,26,43,0.10)] transition-all duration-300 hover:-translate-y-1 will-change-transform"
            >
              {/* Image Container with Smooth Zoom on Hover */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAEAE5]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent opacity-40 group-hover:opacity-25 transition-opacity duration-300" />

                {/* Capacity badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#071A2B] font-manrope font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>{project.capacity}</span>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#071A2B]/80 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-[#777D83] font-medium mb-2 font-inter">
                  <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>{project.location}</span>
                  <span>&bull;</span>
                  <span>{project.type}</span>
                </div>

                <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#071A2B] mb-3 group-hover:text-[#FFB800] transition-colors duration-200">
                  {project.title}
                </h3>

                <p className="font-inter text-sm text-[#777D83] leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="pt-4 border-t border-[#EAEAE5] flex items-center justify-between">
                  <span className="text-xs text-[#777D83]">Tailored Site Layout</span>
                  <a
                    href="#assessment"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#071A2B] group-hover:text-[#FFB800] transition-colors uppercase tracking-wider"
                  >
                    <span>Request Similar Setup</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Portfolio Disclaimer */}
        <p className="text-center text-xs text-[#777D83] mt-10">
          Photographs display representative installations and architectural project references engineered to Onray Solar Solution standards.
        </p>

      </div>
    </section>
  );
}
