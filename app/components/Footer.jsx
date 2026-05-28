"use client";
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C2C2C] text-[#FCF9F5] pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          
          {/* Column 1: Brand Essence (Spans 5 Columns) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-[0.25em] text-white">
              RAGA CANDLE CO.
            </h3>
            <p className="text-xs text-[#FCF9F5]/60 max-w-sm leading-relaxed font-light">
              Designing sensory architecture for modern sanctuaries. Hand-poured with intention, sustainable soy wax, and pure botanical elements.
            </p>
          </div>

          {/* Column 2: Digital Channels & Direct Contacts (Spans 4 Columns) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B927A]">
              Direct Concierge
            </h4>
            <div className="space-y-2 font-sans text-xs text-[#FCF9F5]/70">
              <p className="hover:text-white transition-colors duration-300">
                <a href="mailto:concierge@ragacandles.com">concierge@ragacandles.com</a>
              </p>
              <p className="hover:text-white transition-colors duration-300">
                <a href="tel:+919876543210">+91 (0) 98765 43210</a>
              </p>
            </div>
          </div>

          {/* Column 3: Social Instagram Clickable Link (Spans 3 Columns) */}
          <div className="md:col-span-3 space-y-4 md:text-right flex flex-col md:items-end">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#8B927A]">
              Connect
            </h4>
            <a 
              href="https://instagram.com/ragacandle.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 text-[#FCF9F5]/70 hover:text-white transition-colors duration-300 group text-xs focus:outline-none"
            >
              {/* High-Performance Inline Instagram SVG */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="group-hover:scale-110 transition-transform duration-300 text-[#8B927A] group-hover:text-white"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              
              <span className="font-sans tracking-wide">
                @ragacandle.co
              </span>
            </a>
          </div>

        </div>

        {/* Structural Separation Divider */}
        <div className="w-full h-[1px] bg-white/10" />

        {/* Baseline Utility Copyright Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 font-sans text-[10px] uppercase tracking-widest text-[#FCF9F5]/40 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Raga Candle Co. All Rights Reserved.
          </div>
          
          {/* Smooth Scroll-To-Top Button */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors duration-300 group text-[10px] uppercase tracking-widest focus:outline-none"
          >
            Back to Top 
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-300 text-[#8B927A]" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;