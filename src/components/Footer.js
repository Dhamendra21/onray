import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#071A2B] text-white pt-20 pb-12 border-t border-[#071A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top CTA Banner in Footer */}
        <div className="pb-16 mb-16 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#FFB800] block mb-2 font-inter">
              TAKE OWNERSHIP OF YOUR POWER
            </span>
            <h3 className="font-manrope text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to turn your rooftop into a clean energy asset?
            </h3>
          </div>

          <a
            href="#assessment"
            className="shrink-0 inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#E5A500] text-[#071A2B] font-semibold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Get Free Assessment</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">

          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-10 w-44">
                <Image
                  src="/logo.png"
                  alt="Onray Solar Solution Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="font-inter text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              Onray Solar Solution is dedicated to providing high-performance, turnkey solar installations for Indian residences, businesses, and industrial infrastructures.
            </p>

            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="w-2 h-2 rounded-full bg-[#39A96B]" />
              <span>Engineering Excellence &bull; India</span>
            </div>
          </div>

          {/* Solutions Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-manrope font-bold text-sm text-white uppercase tracking-wider mb-5">
              Solutions
            </h4>
            <ul className="space-y-3 font-inter text-xs text-white/70">
              <li>
                <a href="#residential" className="hover:text-[#FFB800] transition-colors">Residential Solar</a>
              </li>
              <li>
                <a href="#commercial" className="hover:text-[#FFB800] transition-colors">Commercial Solar</a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-[#FFB800] transition-colors">Industrial Solar</a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#FFB800] transition-colors">Solar Technology</a>
              </li>
              <li>
                <a href="#savings" className="hover:text-[#FFB800] transition-colors">Savings Estimator</a>
              </li>
            </ul>
          </div>

          {/* Company Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-manrope font-bold text-sm text-white uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3 font-inter text-xs text-white/70">
              <li>
                <a href="#about" className="hover:text-[#FFB800] transition-colors">About Onray</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#FFB800] transition-colors">Projects Portfolio</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#FFB800] transition-colors">Installation Process</a>
              </li>
              <li>
                <a href="#approach" className="hover:text-[#FFB800] transition-colors">Our Approach</a>
              </li>
              <li>
                <a href="#assessment" className="hover:text-[#FFB800] transition-colors">Request Survey</a>
              </li>
            </ul>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-manrope font-bold text-sm text-white uppercase tracking-wider mb-5">
              Contact Desk
            </h4>
            <ul className="space-y-3 font-inter text-xs text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <span>Pipariya, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFB800] shrink-0" />
                <a href="tel:+919098444167" className="hover:text-[#FFB800] transition-colors">+91 90984-44167</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFB800] shrink-0" />
                <a href="mailto:[EMAIL_ADDRESS]" className="hover:text-[#FFB800] transition-colors">onraysolar@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; {currentYear} Onray Solar Solution. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
