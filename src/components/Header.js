"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Residential Solar", href: "#residential" },
    { name: "Commercial Solar", href: "#commercial" },
    { name: "Projects", href: "#projects" },
    { name: "Technology", href: "#technology" },
    { name: "About Us", href: "#about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#EAEAE5] py-3.5 shadow-[0_4px_24px_rgba(7,26,43,0.04)]"
          : "bg-[#FAFAF7]/75 backdrop-blur-sm border-b border-[#EAEAE5]/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Onray Logo with preserved proportion & height */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative h-9 w-36 sm:h-10 sm:w-44 transition-opacity group-hover:opacity-90">
            <Image
              src="/logo.png"
              alt="Onray Solar Solution Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] tracking-wide font-medium text-[#17202A] hover:text-[#FFB800] transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Solar Yellow Pill CTA Button */}
          <a
            href="#assessment"
            className="inline-flex items-center gap-1.5 bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ml-2 cursor-pointer"
          >
            <span>Get Free Assessment</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Nav Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#assessment"
            className="bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm"
          >
            Free Assessment
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#17202A] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAFAF7] border-b border-[#EAEAE5] shadow-xl px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#17202A] hover:text-[#FFB800] text-sm font-medium py-2 border-b border-[#EAEAE5]/60"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <a
                href="#assessment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] font-semibold text-sm px-6 py-3 rounded-full shadow-sm text-center"
              >
                <span>Get Free Assessment</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
