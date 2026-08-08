"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FooterCTASection() {
  return (
    <footer id="contact" className="relative w-full bg-[#f8fcf3] pt-20 md:pt-32 pb-6 px-4 sm:px-8 overflow-hidden font-sans">
      
      {/* Full-Width Top Vibrant Lime Green Gradient Bar */}
      <div 
        className="absolute top-0 inset-x-0 h-96 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom, #aef32f 0%, rgba(174, 243, 47, 0.45) 40%, rgba(248, 252, 243, 0) 100%)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between min-h-[480px] sm:min-h-[640px]">
        
        {/* Main CTA Center Block */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-16 md:pt-24">
          
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-7xl md:text-[80px] font-normal tracking-tight text-[#111111] select-none leading-[1.1] sm:leading-none">
            Let&apos;s Make It Happen
          </h2>

          {/* Subtitle text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed tracking-normal max-w-xl mx-auto select-none opacity-90">
            always open to new opportunities, collaborations, and creative<br className="hidden sm:inline" /> challenges. Let&apos;s work together to bring your ideas to life
          </p>

          {/* Get In Touch Pill Button */}
          <div className="pt-6">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="https://cal.com/debashis-barman-182"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#18181b] hover:bg-black text-white text-sm sm:text-base font-medium px-7 py-3.5 rounded-full border border-slate-700/50 shadow-xl transition-all select-none group"
            >
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              <span>Get In Touch</span>
            </motion.a>
          </div>

        </div>

        {/* Footer Navigation & Copyright Bar */}
        <div className="pt-16 sm:pt-32 pb-8 sm:pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-sm font-normal text-slate-600">
          
          {/* Left Nav Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-10">
            <a href="#" className="hover:text-black transition-colors">Home</a>
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#projects" className="hover:text-black transition-colors">Portfolio</a>
            <a href="#works" className="hover:text-black transition-colors">Blog</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>

          {/* Right Copyright Notice */}
          <div className="text-xs sm:text-sm text-slate-500 font-normal">
            © 2026 Debashis Barman. All rights reserved.
          </div>

        </div>

        {/* Giant Editorial Serif Name Display across Bottom */}
        <div className="w-full text-center overflow-hidden select-none pointer-events-none -mt-4">
          <span className="font-serif italic text-[14vw] font-normal tracking-tight text-[#111111] opacity-95 leading-none whitespace-nowrap block">
            Debashis Barman
          </span>
        </div>

      </div>

    </footer>
  );
}
