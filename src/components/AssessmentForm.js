"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2, ShieldCheck, PhoneCall, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AssessmentForm() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "Residential Rooftop",
    city: "",
    bill: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".assessment-left-col", ".assessment-form-card"], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      // Left column entrance
      gsap.from(".assessment-left-col", {
        scrollTrigger: {
          trigger: ".assessment-grid-wrap",
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
        x: -50,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
      });

      // Form card entrance from opposite side
      gsap.from(".assessment-form-card", {
        scrollTrigger: {
          trigger: ".assessment-grid-wrap",
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
        x: 50,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Standard client form handler with clean mock response & clear integration note
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <section ref={sectionRef} id="assessment" className="py-20 md:py-28 lg:py-32 bg-[#FAFAF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="assessment-grid-wrap grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Context Column (5 cols) */}
          <div className="assessment-left-col lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>FREE SOLAR ASSESSMENT</span>
            </div>

            <h2 className="font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2B] mb-5 leading-tight">
              Let’s Find the Right Solar Solution for You.
            </h2>

            <p className="font-inter text-base sm:text-lg text-[#777D83] leading-relaxed mb-8">
              Share a few basic details regarding your rooftop. Our team will review your property's solar viability and outline an initial system size and tariff savings estimate.
            </p>

            {/* Assessment Steps */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EAEAE5]">
                <div className="w-7 h-7 rounded-full bg-[#071A2B] text-[#FFB800] flex items-center justify-center font-manrope font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-sm text-[#071A2B]">Submit Basic Property Information</h4>
                  <p className="text-xs text-[#777D83] mt-0.5">Tell us your location, property type, and typical power bill.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EAEAE5]">
                <div className="w-7 h-7 rounded-full bg-[#071A2B] text-[#FFB800] flex items-center justify-center font-manrope font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-sm text-[#071A2B]">Preliminary Satellite & Shading Review</h4>
                  <p className="text-xs text-[#777D83] mt-0.5">Our solar designers inspect roof orientation and shadow clearance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#EAEAE5]">
                <div className="w-7 h-7 rounded-full bg-[#071A2B] text-[#FFB800] flex items-center justify-center font-manrope font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-sm text-[#071A2B]">Custom Feasibility Proposal</h4>
                  <p className="text-xs text-[#777D83] mt-0.5">Receive an engineering summary with clear, realistic economics.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#777D83] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#39A96B]" />
              <span>Zero obligation &bull; Strictly transparent advice &bull; No spam</span>
            </div>
          </div>

          {/* Right Form Card (7 cols) */}
          <div className="assessment-form-card lg:col-span-7">
            <div className="bg-[#FFFFFF] rounded-2xl md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-[#EAEAE5] shadow-[0_16px_50px_rgba(7,26,43,0.06)]">

              {status === "success" ? (
                <div className="py-8 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#39A96B]/10 text-[#39A96B] flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-manrope text-2xl font-bold text-[#071A2B] mb-2">
                    Solar Assessment Request Received
                  </h3>
                  <p className="font-inter text-sm text-[#777D83] max-w-md mx-auto mb-8">
                    Thank you, <strong className="text-[#071A2B]">{formData.name}</strong>. An Onray solar engineer will reach out via <strong className="text-[#071A2B]">{formData.phone}</strong> to verify your rooftop parameters.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", phone: "", type: "Residential Rooftop", city: "", bill: "" });
                    }}
                    className="inline-flex items-center gap-2 bg-[#071A2B] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#17202A] transition-all"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#EAEAE5] pb-4 mb-2">
                    <h3 className="font-manrope text-xl font-bold text-[#071A2B]">
                      Request Free Assessment
                    </h3>
                    <p className="text-xs text-[#777D83] mt-1">
                      Fill out this brief form to begin your custom solar proposal.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[#17202A] mb-1.5 font-inter">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all placeholder:text-[#777D83]/60"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#17202A] mb-1.5 font-inter">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all placeholder:text-[#777D83]/60"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-xs font-semibold text-[#17202A] mb-1.5 font-inter">
                        City / District *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Bhilai, Raipur, Durg"
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all placeholder:text-[#777D83]/60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="type" className="block text-xs font-semibold text-[#17202A] mb-1.5 font-inter">
                        Property Type *
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all cursor-pointer"
                      >
                        <option value="Residential Rooftop">Residential Rooftop</option>
                        <option value="Commercial Complex">Commercial Complex</option>
                        <option value="Industrial Shed">Industrial Shed / Factory</option>
                        <option value="Institution / School">Institution / School</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="bill" className="block text-xs font-semibold text-[#17202A] mb-1.5 font-inter">
                        Monthly Electricity Bill (₹) (Optional)
                      </label>
                      <input
                        type="number"
                        id="bill"
                        name="bill"
                        value={formData.bill}
                        onChange={handleChange}
                        placeholder="e.g. 4500"
                        className="w-full px-4 py-3 text-sm rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all placeholder:text-[#777D83]/60"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-4 rounded-full font-manrope font-semibold text-sm sm:text-base bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      <span>{status === "submitting" ? "Processing..." : "Request a Solar Assessment"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#777D83] text-center pt-1 font-inter">
                    Direct inquiries can also be routed to our Pipariyacorporate desk at +91 1800 123 4567.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
