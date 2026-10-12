"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bill-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
      });
      
      gsap.from(".problem-text", {
        scrollTrigger: {
          trigger: ".bill-item:last-child",
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" className="py-32 bg-onray-navy text-onray-white flex flex-col items-center justify-center min-h-[80vh]" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <h2 className="font-manrope text-4xl md:text-6xl font-bold mb-16 text-onray-white">
          Your electricity bill never stops.
        </h2>
        
        <div className="flex flex-col items-center gap-6 mb-20 font-inter text-2xl md:text-4xl font-light tracking-wider opacity-80">
          <div className="bill-item flex justify-between w-64 md:w-96 border-b border-onray-white/20 pb-2">
            <span>JAN</span>
            <span className="text-onray-yellow font-medium">₹3,200</span>
          </div>
          <div className="bill-item flex justify-between w-64 md:w-96 border-b border-onray-white/20 pb-2">
            <span>FEB</span>
            <span className="text-onray-yellow font-medium">₹3,480</span>
          </div>
          <div className="bill-item flex justify-between w-64 md:w-96 border-b border-onray-white/20 pb-2">
            <span>MAR</span>
            <span className="text-onray-yellow font-medium">₹3,750</span>
          </div>
          <div className="bill-item flex justify-between w-64 md:w-96 border-b border-onray-white/20 pb-2">
            <span>APR</span>
            <span className="text-onray-yellow font-medium">₹4,120</span>
          </div>
        </div>

        <div className="problem-text">
          <p className="font-instrument text-3xl md:text-4xl text-onray-cream mb-8 italic">
            Every month, the cycle starts again.
          </p>
          <p className="font-manrope text-2xl md:text-3xl font-bold text-onray-white">
            But what if your rooftop could generate the electricity instead?
          </p>
        </div>
      </div>
    </section>
  );
}
