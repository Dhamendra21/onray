"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqs = [
  {
    question: "Is my rooftop suitable for a solar installation?",
    answer:
      "Suitability depends on available shadow-free area, roof orientation (south-facing is ideal in India), structural strength, and condition. Flat RCC roofs, pitched industrial metal sheds, and tiled terraces can all host solar when engineered with the appropriate mounting framework.",
  },
  {
    question: "How do I estimate the right solar capacity for my property?",
    answer:
      "A typical guideline is based on your monthly electricity consumption and roof area. A 1 kW system produces approximately 4 to 4.5 units (kWh) per day in sunny Indian conditions and requires about 80–100 sq. ft. of unshaded space. An Onray site survey evaluates your load curve to recommend the exact capacity.",
  },
  {
    question: "How does net metering work with local Indian electricity boards?",
    answer:
      "Net metering allows you to export excess solar energy generated during the day back to the local utility grid. At the end of the billing cycle, you are only billed for the net units consumed (Import minus Export), drastically slashing monthly power bills.",
  },
  {
    question: "What maintenance does a solar system require in Indian climates?",
    answer:
      "Solar modules are solid-state without moving parts. In Indian conditions, periodic cleaning with plain water every 2 to 3 weeks to wash away airborne dust ensures maximum irradiance capture. Inverters and wiring require only annual preventive inspections.",
  },
  {
    question: "How long does a standard residential or commercial installation take?",
    answer:
      "The physical on-site mechanical and electrical installation typically takes only 2 to 4 days for residential setups and 1 to 2 weeks for mid-size commercial systems. Overall project duration—including site analysis, design sign-off, and net-metering liaison with the utility—usually spans 3 to 5 weeks.",
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".faq-anim-header", ".faq-item-card"], { opacity: 1, y: 0 });
        return;
      }

      // Header entrance
      gsap.from(".faq-anim-header", {
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

      // FAQ accordion items entrance
      gsap.from(".faq-item-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    // Refresh ScrollTrigger once everything is mounted
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 lg:py-32 bg-[#FFFFFF] border-t border-[#EAEAE5] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="faq-header-wrap text-center mb-14 md:mb-18">
          <div className="faq-anim-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>CLARITY & GUIDANCE</span>
          </div>

          <h2 className="faq-anim-header font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2B] mb-5">
            Frequently Asked Questions
          </h2>

          <p className="faq-anim-header font-inter text-base text-[#777D83]">
            Straightforward answers to the most common questions about solar installations, net metering, and maintenance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-list-wrap space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="faq-item-card rounded-2xl border border-[#EAEAE5] bg-[#FAFAF7] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  className="w-full p-6 sm:p-7 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-manrope font-bold text-base sm:text-lg text-[#071A2B] pr-6">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#EAEAE5] bg-white flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#071A2B] text-white border-[#071A2B]" : "text-[#777D83]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#777D83] font-inter leading-relaxed animate-in fade-in duration-200 border-t border-[#EAEAE5]/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
