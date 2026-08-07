"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Menu } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full sm:min-h-screen bg-[#f8fcf3] flex flex-col overflow-hidden font-sans">
      
      {/* Background Radial Lime Spotlight Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 75% 65% at 50% 50%, #a3f929 0%, #bbfd4b 35%, rgba(248, 252, 243, 0.95) 75%, #f8fcf3 100%)"
        }}
      />

      {/* ========== DESKTOP LAYOUT (sm+) ========== */}
      <div className="hidden sm:flex flex-col justify-between min-h-screen w-full">
        
        {/* Top Navbar Header */}
        <header className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 flex items-center justify-between">
          <a href="#" className="font-serif italic text-3xl sm:text-4xl font-normal tracking-tight text-[#111111] hover:opacity-80 transition-opacity select-none">
            Debashis Barman
          </a>
          <button 
            aria-label="Open Navigation Menu"
            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-xs flex items-center justify-center text-black hover:bg-white hover:scale-105 transition-all cursor-pointer select-none"
          >
            <Menu className="w-5 h-5 text-black" />
          </button>
        </header>

        {/* Main Title & Layered Typography */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center pt-4 flex flex-col items-center select-none pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-7xl md:text-8xl lg:text-[104px] font-medium tracking-tight text-[#111111] leading-[1.02]"
          >
            Hi I&apos;m Debashis
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif italic text-8xl md:text-9xl lg:text-[138px] font-normal text-[#111111] leading-[0.88] -mt-6 z-10"
          >
            Product Designer
          </motion.div>
        </div>

        {/* Hero Central Portrait */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20 w-full max-w-[560px] h-[78%] pointer-events-none flex justify-center items-end">
          <div 
            className="relative w-full h-full"
            style={{
              maskImage: "linear-gradient(to bottom, black 60%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 98%)"
            }}
          >
            <Image
              src="/debashis_barman_heroimage.png"
              alt="Debashis Barman - Senior Product Designer"
              fill
              className="object-contain object-bottom filter contrast-[1.05] grayscale"
              priority
            />
          </div>
        </div>

        {/* Side Floating Content Blocks */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 my-auto pt-16 flex justify-between items-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-xs pointer-events-auto select-none"
          >
            <span className="w-3 h-3 rounded-full bg-[#84cc16] animate-pulse ring-4 ring-[#84cc16]/20" />
            <span className="font-sans text-xs sm:text-sm font-normal text-gray-800 tracking-tight">
              Available for new opportunities
            </span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-[260px] lg:max-w-[280px] text-left pointer-events-auto"
          >
            <p className="font-sans text-xs sm:text-sm text-gray-800 font-normal leading-relaxed tracking-tight">
              passionate about creating intuitive digital experiences that connect users with value.
            </p>
          </motion.div>
        </div>

        {/* Bottom Footer Row */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-8 flex items-end justify-between gap-6 pointer-events-auto">
          <div className="flex items-center gap-3 max-w-sm">
            <div className="flex -space-x-2 overflow-hidden shrink-0">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative bg-amber-200">
                <Image src="/testimonial_avatar_1.png" alt="Client Avatar 1" fill className="object-cover" />
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative bg-lime-300">
                <Image src="/testimonial_avatar_2.png" alt="Client Avatar 2" fill className="object-cover" />
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative bg-sky-200">
                <Image src="/who_am_i_portrait.png" alt="Client Avatar 3" fill className="object-cover" />
              </div>
            </div>
            <p className="font-sans text-xs text-gray-600 font-normal leading-snug">
              Trusted by over <strong className="text-gray-900 font-semibold">100+ happy clients</strong> worldwide across digital &amp; SaaS projects.
            </p>
          </div>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://cal.com/debashis-barman-182"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#18181b] hover:bg-black text-white text-base font-medium px-7 py-3.5 rounded-full border border-slate-700/50 shadow-xl transition-all select-none group shrink-0"
          >
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            <span>Get In Touch</span>
          </motion.a>
        </div>
      </div>

      {/* ========== MOBILE LAYOUT (below sm) ========== */}
      <div className="flex sm:hidden flex-col w-full">
        
        {/* Mobile Navbar */}
        <header className="relative z-30 w-full px-5 pt-5 flex items-center justify-between">
          <a href="#" className="font-serif italic text-2xl font-normal tracking-tight text-[#111111] select-none">
            Debashis Barman
          </a>
          <button 
            aria-label="Open Navigation Menu"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-xs flex items-center justify-center text-black"
          >
            <Menu className="w-4.5 h-4.5 text-black" />
          </button>
        </header>

        {/* Mobile Title */}
        <div className="relative z-10 w-full px-5 pt-8 text-center select-none pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-[38px] font-medium tracking-tight text-[#111111] leading-[1.02]"
          >
            Hi I&apos;m Debashis
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-serif italic text-[44px] font-normal text-[#111111] leading-[0.9] -mt-1 z-10"
          >
            Product Designer
          </motion.div>
        </div>

        {/* Mobile: Available Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-20 flex justify-center mt-3"
        >
          <div className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-sm select-none">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] animate-pulse ring-4 ring-[#84cc16]/20" />
            <span className="font-sans text-xs font-normal text-gray-800 tracking-tight">
              Available for new opportunities
            </span>
          </div>
        </motion.div>

        {/* Mobile Portrait Image */}
        <div className="relative z-10 w-full flex justify-center -mt-6" style={{ height: "280px" }}>
          <div 
            className="relative w-[260px] h-full"
            style={{
              maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)"
            }}
          >
            <Image
              src="/debashis_barman_heroimage.png"
              alt="Debashis Barman - Senior Product Designer"
              fill
              className="object-contain object-bottom filter contrast-[1.05] grayscale"
              priority
            />
          </div>
        </div>

        {/* Mobile: Social Proof Row */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-20 px-6 mt-4 flex items-center justify-center gap-3 max-w-[300px] mx-auto"
        >
          <div className="flex -space-x-2 overflow-hidden shrink-0">
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white overflow-hidden relative bg-amber-200">
              <Image src="/testimonial_avatar_1.png" alt="Client Avatar 1" fill className="object-cover" />
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white overflow-hidden relative bg-lime-300">
              <Image src="/testimonial_avatar_2.png" alt="Client Avatar 2" fill className="object-cover" />
            </div>
            <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white overflow-hidden relative bg-sky-200">
              <Image src="/who_am_i_portrait.png" alt="Client Avatar 3" fill className="object-cover" />
            </div>
          </div>
          <p className="font-sans text-[11px] text-gray-600 font-normal leading-snug text-left">
            Trusted by <strong className="text-gray-900 font-semibold">100+ clients</strong> worldwide across digital &amp; SaaS projects.
          </p>
        </motion.div>

        {/* Mobile: Bio Text */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative z-20 px-6 mt-4 text-center max-w-[280px] mx-auto"
        >
          <p className="font-sans text-xs text-gray-700 font-normal leading-relaxed tracking-tight">
            passionate about creating intuitive digital experiences that connect users with value.
          </p>
        </motion.div>

        {/* Mobile: CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-20 px-6 mt-5 pb-6 flex justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://cal.com/debashis-barman-182"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#18181b] hover:bg-black text-white text-sm font-medium px-6 py-3 rounded-full border border-slate-700/50 shadow-xl transition-all select-none group"
          >
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            <span>Get In Touch</span>
          </motion.a>
        </motion.div>

      </div>

    </section>
  );
}
