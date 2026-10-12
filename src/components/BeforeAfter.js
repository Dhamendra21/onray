"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const sectionRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".before-after-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    let x;
    
    if (event.type === 'touchmove') {
      x = event.touches[0].clientX - bounds.left;
    } else {
      x = event.clientX - bounds.left;
    }

    const position = Math.max(0, Math.min((x / bounds.width) * 100, 100));
    setSliderPosition(position);
  };

  return (
    <section className="py-24 md:py-32 bg-onray-cream" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16 before-after-header">
          <h2 className="font-manrope text-4xl md:text-5xl font-bold text-onray-charcoal mb-6">
            Same roof. Different future.
          </h2>
        </div>

        <div 
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0 bg-onray-navy flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=2070&auto=format&fit=crop"
              alt="After solar installation"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-onray-green/20"></div>
            
            <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-right z-10 hidden sm:block">
              <span className="inline-block px-3 py-1 bg-onray-yellow text-onray-navy text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                AFTER
              </span>
              <h3 className="font-manrope font-bold text-3xl md:text-4xl text-onray-white mb-2">SOLAR SYSTEM</h3>
              <p className="font-inter text-xl text-onray-white/90 mb-4">5 kW</p>
              <p className="font-inter text-sm text-onray-white/70 uppercase tracking-widest mb-1">ESTIMATED BILL</p>
              <p className="font-manrope font-bold text-3xl text-onray-yellow">₹700–₹1,000*</p>
            </div>
          </div>

          {/* Before Image (Foreground overlay with clip path) */}
          <div 
            className="absolute inset-0 bg-onray-charcoal flex items-center justify-center z-20"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            {/* Grayscale filter to represent the "before" state without panels, simulating it with CSS if we use same image */}
            <Image
              src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=2070&auto=format&fit=crop"
              alt="Before solar installation"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-left">
              <span className="inline-block px-3 py-1 bg-onray-white/20 text-onray-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 backdrop-blur-sm">
                BEFORE
              </span>
              <h3 className="font-manrope font-bold text-3xl md:text-4xl text-onray-white mb-2">ELECTRICITY BILL</h3>
              <p className="font-manrope font-bold text-4xl md:text-5xl text-onray-white opacity-90">₹4,800 <span className="text-xl font-normal opacity-70">/ MONTH</span></p>
            </div>
          </div>

          {/* Slider line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-onray-charcoal/30 rounded-full"></div>
                <div className="w-1 h-3 bg-onray-charcoal/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-onray-slate mt-4 max-w-2xl mx-auto">
          *Illustrative example only. Actual savings depend on electricity consumption, tariff, location, system size, generation and other factors.
        </p>

        <div className="text-center mt-12">
          <a
            href="#calculator"
            className="bg-onray-navy hover:bg-onray-charcoal text-onray-white font-bold px-8 py-4 rounded-full transition-all text-sm shadow-lg inline-flex items-center justify-center uppercase tracking-wider"
          >
            Calculate Your Savings
          </a>
        </div>
      </div>
    </section>
  );
}
