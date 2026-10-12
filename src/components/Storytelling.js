"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Storytelling() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".story-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="py-24 md:py-32 bg-onray-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="story-content order-2 lg:order-1 flex flex-col justify-center">
            <p className="font-inter font-bold tracking-widest text-onray-slate uppercase text-sm mb-6">
              THE TURNING POINT
            </p>
            <h2 className="font-manrope text-4xl md:text-5xl lg:text-6xl font-bold text-onray-charcoal leading-tight mb-4">
              The solution is already above you.
            </h2>
            <p className="font-instrument text-3xl md:text-4xl text-onray-yellow mb-8 italic">
              Your rooftop.
            </p>
            
            <p className="font-inter text-lg text-onray-slate leading-relaxed mb-6">
              For too long, homes and businesses have been reliant on traditional electricity—facing unpredictable rate hikes, environmental concerns, and lack of control over their energy future.
            </p>
            
            <p className="font-inter text-lg text-onray-slate leading-relaxed mb-8">
              Solar power represents a fundamental shift. By harnessing renewable energy directly from your roof, you transform a monthly expense into a long-term investment. It is not just about powering your property; it is about taking ownership of your energy.
            </p>

            <div className="border-l-4 border-onray-yellow pl-6 py-2">
              <p className="font-instrument text-2xl md:text-3xl text-onray-navy">
                Secure long-term energy savings while building a more sustainable tomorrow.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="story-image order-1 lg:order-2 relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-onray-navy/10 z-10 rounded-2xl"></div>
            <Image
              src="/rooftoop.png"
              alt="Beautiful solar installation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
