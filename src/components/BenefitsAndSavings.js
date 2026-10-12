"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, TrendingDown, Sun, Shield, Layers, Calculator } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BenefitsAndSavings() {
  const sectionRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [calculationMode, setCalculationMode] = useState("units"); // "units" | "bill" | "system"
  const [monthlyBill, setMonthlyBill] = useState(4500);
  const [monthlyUnits, setMonthlyUnits] = useState(100);
  const [selectedKw, setSelectedKw] = useState(1);
  const [unitRate, setUnitRate] = useState(6);
  const [unitsPerKw, setUnitsPerKw] = useState(120); // Benchmark: 1 kW generates ~120 units/mo (~4 units/kW/day in India)

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set([".savings-anim-header", ".savings-pillar-card", ".savings-interactive-wrap"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // 1. Header fade up entrance
      gsap.from(".savings-anim-header", {
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

      // 2. 4 Pillars Cards entrance
      gsap.from(".savings-pillar-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
      });

      // 3. Wipe Slider and Calculator interactive area
      gsap.from(".savings-interactive-wrap", {
        scrollTrigger: {
          trigger: ".savings-interactive-wrap",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const safeRate = Number(unitRate) > 0 ? Number(unitRate) : 6;
  const safeUnitsPerKw = Number(unitsPerKw) > 0 ? Number(unitsPerKw) : 120;

  // Determine site consumption and system size based on active calculation mode
  let effectiveUnits = 100;
  let effectiveBill = 600;
  let estimatedSystemKw = 1;

  if (calculationMode === "bill") {
    effectiveBill = monthlyBill;
    effectiveUnits = Math.max(30, Math.round(monthlyBill / safeRate));
    estimatedSystemKw = Math.max(1, Math.round((effectiveUnits / safeUnitsPerKw) * 10) / 10);
  } else if (calculationMode === "units") {
    effectiveUnits = monthlyUnits;
    effectiveBill = Math.round(monthlyUnits * safeRate);
    estimatedSystemKw = Math.max(1, Math.round((effectiveUnits / safeUnitsPerKw) * 10) / 10);
  } else {
    // "system" mode: user chooses kW capacity directly
    estimatedSystemKw = selectedKw;
    effectiveUnits = Math.round(selectedKw * safeUnitsPerKw);
    effectiveBill = Math.round(effectiveUnits * safeRate);
  }

  // Monthly Solar Generation = System Capacity (kW) × Units 1 kW generates per month
  const estimatedUnitsPerMonth = Math.round(estimatedSystemKw * safeUnitsPerKw);

  // Financial Value of total solar electricity produced = Units Generated × Tariff Rate
  const totalSolarValue = Math.round(estimatedUnitsPerMonth * safeRate);

  // Units offset from consumer bill vs surplus exported via Net Metering
  const offsetUnits = Math.min(effectiveUnits, estimatedUnitsPerMonth);
  const directBillSavings = Math.round(offsetUnits * safeRate);
  const surplusUnits = Math.max(0, estimatedUnitsPerMonth - effectiveUnits);
  const surplusCredit = Math.round(surplusUnits * safeRate);

  // Estimated Monthly Savings: direct bill cut (plus export credit if net metered)
  const displayMonthlySavings =
    calculationMode === "system"
      ? totalSolarValue
      : directBillSavings;

  const estimatedAnnualSavings =
    calculationMode === "system"
      ? totalSolarValue * 12
      : (directBillSavings + surplusCredit) * 12;

  const estimatedRoofArea = Math.round(estimatedSystemKw * 90);

  // Net bill after solar offset (minimum meter rent ~₹100 in India)
  const estimatedNewBill = Math.max(100, Math.round(effectiveBill - directBillSavings));
  const estimatedNewBillMin = Math.max(80, Math.round(estimatedNewBill * 0.9));
  const estimatedNewBillMax = Math.max(120, Math.round(estimatedNewBill * 1.1));

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    let x;
    if (event.type === "touchmove") {
      x = event.touches[0].clientX - bounds.left;
    } else {
      x = event.clientX - bounds.left;
    }
    const position = Math.max(0, Math.min((x / bounds.width) * 100, 100));
    setSliderPosition(position);
  };

  const benefits = [
    {
      icon: TrendingDown,
      title: "Control Electricity Costs",
      desc: "Lock in your long-term energy rate and protect your family or business against routine grid tariff inflation.",
    },
    {
      icon: Sun,
      title: "Rooftop Space Utilization",
      desc: "Turn passive, unutilized roof or terrace square footage into a daily revenue-saving clean asset.",
    },
    {
      icon: Shield,
      title: "Reduced Grid Dependence",
      desc: "Generate your power locally with high-yield Tier-1 panels and reliable net-metered grid synchronization.",
    },
    {
      icon: Layers,
      title: "Long-Term Energy Planning",
      desc: "Solar arrays are designed for 25+ years of operational life, providing predictable returns and sustainability.",
    },
  ];

  const commonTariffs = [6, 7.5, 8, 10, 12];

  return (
    <section ref={sectionRef} id="savings" className="py-20 md:py-28 lg:py-32 bg-[#FAFAF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="savings-header-wrap text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="savings-anim-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAEAE5]/60 text-[#777D83] text-[11px] font-semibold uppercase tracking-wider mb-4">
            <span>FINANCIAL & OPERATIONAL VALUE</span>
          </div>

          <h2 className="savings-anim-header font-manrope text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#071A2B] mb-5">
            Same Rooftop. <br />
            <span className="font-instrument font-light italic text-[#071A2B]">A Completely Different</span> Future.
          </h2>

          <p className="savings-anim-header font-inter text-base sm:text-lg text-[#777D83] leading-relaxed">
            Harnessing solar power is not an expense—it is a smart reallocation of recurring utility bills into high-value rooftop infrastructure.
          </p>
        </div>

        {/* 4 Core Benefits Editorial Grid */}
        <div className="savings-pillars-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="savings-pillar-card bg-[#FFFFFF] p-7 rounded-2xl md:rounded-3xl border border-[#EAEAE5] shadow-[0_4px_20px_rgba(7,26,43,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] flex items-center justify-center text-[#071A2B] mb-5">
                    <Icon className="w-5 h-5 text-[#FFB800]" />
                  </div>
                  <h3 className="font-manrope font-bold text-lg text-[#071A2B] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm text-[#777D83] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Before vs After & Savings Estimator Section */}
        <div className="savings-interactive-wrap grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Before / After Wipe Slider (7 cols) */}
          <div className="lg:col-span-7">
            <div
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-[0_16px_40px_rgba(7,26,43,0.08)] border border-[#EAEAE5]"
              onMouseMove={handleMove}
              onTouchMove={handleMove}
            >
              {/* After State (Background with Solar System) */}
              <div className="absolute inset-0 bg-[#071A2B]">
                <Image
                  src="/rooftoop.png"
                  alt="After solar installation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/85 via-[#071A2B]/20 to-transparent" />
                
                <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-10 text-right z-10 text-white">
                  <span className="inline-block px-3 py-1 bg-[#FFB800] text-[#071A2B] text-[11px] font-bold uppercase tracking-wider rounded-full mb-2">
                    AFTER SOLAR
                  </span>
                  <p className="font-manrope font-bold text-2xl sm:text-3xl text-white">
                    {estimatedSystemKw} kW Solar Array
                  </p>
                  <p className="text-xs text-white/75 mt-0.5">
                    Estimated Net Bill: <strong className="text-[#FFB800]">₹{estimatedNewBillMin}–₹{estimatedNewBillMax}*</strong>
                  </p>
                </div>
              </div>

              {/* Before State (Clipped foreground overlay) */}
              <div
                className="absolute inset-0 bg-[#17202A] z-20"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src="/rooftoop.png"
                  alt="Before solar installation"
                  fill
                  className="object-cover grayscale contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-[#071A2B]/70" />

                <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-10 text-left z-10 text-white">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider rounded-full mb-2 backdrop-blur-md">
                    BEFORE SOLAR
                  </span>
                  <p className="font-manrope font-bold text-2xl sm:text-3xl text-white">
                    100% Grid Power
                  </p>
                  <p className="text-xs text-white/75 mt-0.5">
                    Recurring Monthly Bill: <strong className="text-white">₹{effectiveBill.toLocaleString("en-IN")}</strong>
                  </p>
                </div>
              </div>

              {/* Split Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-30 shadow-2xl"
                style={{ left: `calc(${sliderPosition}% - 1px)` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#EAEAE5]">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-3 bg-[#071A2B] rounded-full" />
                    <div className="w-0.5 h-3 bg-[#071A2B] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#777D83] text-center mt-3">
              *Drag slider horizontally. Illustrative savings model based on standard consumer tariff structures.
            </p>
          </div>

          {/* Interactive Calculator Bento Box (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl md:rounded-3xl p-6 sm:p-8 border border-[#EAEAE5] shadow-[0_8px_30px_rgba(7,26,43,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#777D83]">
                <Calculator className="w-4 h-4 text-[#FFB800]" />
                <span>ROOFTOP SAVINGS ESTIMATOR</span>
              </div>
            </div>

            <h3 className="font-manrope text-xl font-bold text-[#071A2B] mb-4">
              Estimate Your Potential Offset
            </h3>

            {/* Input Mode Toggle (3 Modes: By Units, By Bill, By System kW) */}
            <div className="flex p-1 bg-[#FAFAF7] rounded-xl border border-[#EAEAE5] mb-5">
              <button
                type="button"
                onClick={() => setCalculationMode("units")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  calculationMode === "units"
                    ? "bg-[#071A2B] text-[#FFB800] shadow-sm"
                    : "text-[#777D83] hover:text-[#071A2B]"
                }`}
              >
                By Units (kWh)
              </button>
              <button
                type="button"
                onClick={() => setCalculationMode("bill")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  calculationMode === "bill"
                    ? "bg-[#071A2B] text-[#FFB800] shadow-sm"
                    : "text-[#777D83] hover:text-[#071A2B]"
                }`}
              >
                By Bill (₹)
              </button>
              <button
                type="button"
                onClick={() => setCalculationMode("system")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  calculationMode === "system"
                    ? "bg-[#071A2B] text-[#FFB800] shadow-sm"
                    : "text-[#777D83] hover:text-[#071A2B]"
                }`}
              >
                By System (kW)
              </button>
            </div>

            {/* Dynamic Slider Control depending on mode */}
            {calculationMode === "units" && (
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#777D83]">Monthly Units Consumed</span>
                  <div className="text-right">
                    <span className="font-manrope font-bold text-base text-[#071A2B]">
                      {monthlyUnits.toLocaleString("en-IN")} units
                    </span>
                    <span className="text-[10px] text-[#777D83] ml-1.5">
                      (~₹{effectiveBill.toLocaleString("en-IN")} bill)
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="25"
                  value={monthlyUnits}
                  onChange={(e) => setMonthlyUnits(Number(e.target.value))}
                  className="w-full accent-[#FFB800] h-2 bg-[#EAEAE5] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#777D83] mt-1">
                  <span>50 units</span>
                  <span>1,500 units</span>
                  <span>3,000+ units</span>
                </div>
              </div>
            )}

            {calculationMode === "bill" && (
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#777D83]">Current Monthly Bill</span>
                  <div className="text-right">
                    <span className="font-manrope font-bold text-base text-[#071A2B]">
                      ₹{monthlyBill.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-[#777D83] ml-1.5">
                      (~{effectiveUnits} units)
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="500"
                  max="35000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-[#FFB800] h-2 bg-[#EAEAE5] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#777D83] mt-1">
                  <span>₹500</span>
                  <span>₹15,000</span>
                  <span>₹35,000+</span>
                </div>
              </div>
            )}

            {calculationMode === "system" && (
              <div className="mb-5">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#777D83]">Selected Solar System Size</span>
                  <div className="text-right">
                    <span className="font-manrope font-bold text-base text-[#071A2B]">
                      {selectedKw} kW Array
                    </span>
                    <span className="text-[10px] text-[#777D83] ml-1.5">
                      (~{estimatedUnitsPerMonth} units/mo)
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={selectedKw}
                  onChange={(e) => setSelectedKw(Number(e.target.value))}
                  className="w-full accent-[#FFB800] h-2 bg-[#EAEAE5] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#777D83] mt-1">
                  <span>1 kW</span>
                  <span>10 kW</span>
                  <span>20 kW</span>
                </div>
              </div>
            )}

            {/* User Input 2: Per Unit Electricity Rate & 1 kW Generation Factor */}
            <div className="mb-6 p-4 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5] space-y-3.5">
              
              {/* Tariff Rate */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="unitRateInput" className="text-xs font-semibold text-[#071A2B]">
                    Site Tariff (₹ / unit)
                  </label>
                  <div className="relative flex items-center">
                    <span className="text-xs text-[#777D83] font-bold mr-1">₹</span>
                    <input
                      id="unitRateInput"
                      type="number"
                      min="1"
                      max="30"
                      step="0.5"
                      value={unitRate}
                      onChange={(e) => setUnitRate(Number(e.target.value))}
                      className="w-16 px-2 py-0.5 text-sm font-manrope font-bold text-[#071A2B] bg-white border border-[#EAEAE5] rounded-lg focus:outline-none focus:border-[#FFB800] text-right"
                    />
                    <span className="text-[11px] text-[#777D83] ml-1.5 font-medium">/ kWh</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[#777D83] mr-0.5">Typical:</span>
                  {commonTariffs.map((tariff) => (
                    <button
                      key={tariff}
                      type="button"
                      onClick={() => setUnitRate(tariff)}
                      className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                        unitRate === tariff
                          ? "bg-[#071A2B] text-[#FFB800]"
                          : "bg-white text-[#777D83] hover:text-[#071A2B] border border-[#EAEAE5]"
                      }`}
                    >
                      ₹{tariff}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1 kW Solar Generation Benchmark */}
              <div className="pt-2.5 border-t border-[#EAEAE5]/70">
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <span className="text-xs font-semibold text-[#071A2B] block">
                      1 kW Solar Generation
                    </span>
                    <span className="text-[10px] text-[#777D83]">
                      ~{(safeUnitsPerKw / 30).toFixed(1)} units/day in sunny conditions
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="80"
                      max="180"
                      step="5"
                      value={unitsPerKw}
                      onChange={(e) => setUnitsPerKw(Number(e.target.value))}
                      className="w-16 px-2 py-0.5 text-sm font-manrope font-bold text-[#071A2B] bg-white border border-[#EAEAE5] rounded-lg focus:outline-none focus:border-[#FFB800] text-right"
                    />
                    <span className="text-[11px] text-[#777D83] ml-1.5 font-medium">units/mo</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[#777D83] mr-0.5">Benchmarks:</span>
                  {[
                    { label: "105 (3.5/d)", val: 105 },
                    { label: "120 (4.0/d)", val: 120 },
                    { label: "135 (4.5/d)", val: 135 },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setUnitsPerKw(item.val)}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors ${
                        unitsPerKw === item.val
                          ? "bg-[#071A2B] text-[#FFB800]"
                          : "bg-white text-[#777D83] hover:text-[#071A2B] border border-[#EAEAE5]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Calculated Metrics Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5]">
                <p className="text-[11px] text-[#777D83] uppercase tracking-wider mb-1 font-inter">
                  {calculationMode === "system" ? "Selected Capacity" : "Recommended Array"}
                </p>
                <p className="font-manrope font-bold text-lg text-[#071A2B]">
                  ~{estimatedSystemKw} kW
                </p>
                <p className="text-[10px] text-[#777D83] mt-0.5">Need ~{estimatedRoofArea} sq.ft roof</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAFAF7] border border-[#EAEAE5]">
                <p className="text-[11px] text-[#777D83] uppercase tracking-wider mb-1 font-inter">Monthly Generation</p>
                <p className="font-manrope font-bold text-lg text-[#071A2B]">
                  ~{estimatedUnitsPerMonth.toLocaleString("en-IN")} units
                </p>
                <p className="text-[10px] text-[#777D83] mt-0.5">
                  {estimatedSystemKw} kW × {safeUnitsPerKw} units
                </p>
              </div>

              <div className="col-span-2 p-4 rounded-xl bg-[#071A2B] text-white">
                <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <p className="text-[11px] text-white/60 uppercase tracking-wider font-inter">
                      {calculationMode === "system" ? "Solar Energy Value" : "Potential Monthly Savings"}
                    </p>
                    <p className="font-manrope font-bold text-2xl text-[#FFB800] mt-0.5">
                      ~₹{displayMonthlySavings.toLocaleString("en-IN")} / mo
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#FFB800] px-2.5 py-1 bg-white/10 rounded-full">
                    {calculationMode === "system"
                      ? `${estimatedUnitsPerMonth} units × ₹${safeRate}`
                      : `${offsetUnits} units offset`}
                  </span>
                </div>

                {/* Helpful contextual explanation */}
                {calculationMode !== "system" && (
                  <p className="text-[11px] text-white/80 mb-2 leading-relaxed">
                    {surplusUnits > 0 ? (
                      <>
                        Directly eliminates your <strong className="text-white">₹{effectiveBill.toLocaleString("en-IN")}</strong> power bill + <strong className="text-[#FFB800]">~{surplusUnits} surplus units</strong> (₹{surplusCredit}) exported to grid via Net Metering.
                      </>
                    ) : (
                      <>
                        Offsets <strong className="text-white">~{offsetUnits} units/month</strong> directly at ₹{safeRate}/unit on your recurring electricity bill.
                      </>
                    )}
                  </p>
                )}

                <div className="pt-2 border-t border-white/10 flex justify-between text-xs text-white/75">
                  <span>Estimated Annual Value:</span>
                  <span className="font-semibold text-white">
                    ~₹{estimatedAnnualSavings.toLocaleString("en-IN")} / year
                  </span>
                </div>
              </div>
            </div>

            <a
              href="#assessment"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-full transition-all duration-200 shadow-sm"
            >
              <span>Get Precise Feasibility Report</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <p className="text-[11px] text-[#777D83] text-center mt-3">
              Projections are for exploratory estimation. An on-site survey confirms exact layout and yields.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
