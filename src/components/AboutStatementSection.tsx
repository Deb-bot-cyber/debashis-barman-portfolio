"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function AboutStatementSection() {
  return (
    <section id="about" className="relative w-full bg-[#f8fcf3] py-24 md:py-36 px-4 sm:px-8 overflow-hidden font-sans border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        
        {/* 3-Column Layout: Left Badges | Center Text | Right Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: 3 Capability Badges (Tilted) */}
          <div className="lg:col-span-3 flex flex-row flex-wrap lg:flex-col gap-3 lg:gap-6 items-center justify-center lg:items-end z-10">
            
            {/* Pill 1: Product Design (Orange) */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-flex items-center gap-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-5 py-2.5 rounded-full select-none whitespace-nowrap rotate-2 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#ff5500] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-sm sm:text-base font-normal text-[#222222] tracking-tight">Product Design</span>
            </motion.div>

            {/* Pill 2: UX Design (Blue) */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-flex items-center gap-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-5 py-2.5 rounded-full select-none whitespace-nowrap -rotate-2 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#0099ff] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-sm sm:text-base font-normal text-[#222222] tracking-tight">UX Design</span>
            </motion.div>

            {/* Pill 3: User Research (Dark) */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-flex items-center gap-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-5 py-2.5 rounded-full select-none whitespace-nowrap rotate-3 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#222222] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-sm sm:text-base font-normal text-[#222222] tracking-tight">User Research</span>
            </motion.div>

          </div>

          {/* Center Column: Hallo! + 4 Lines Statement */}
          <div className="lg:col-span-6 text-center space-y-6 px-2">
            
            {/* Italic Hallo! Greeting */}
            <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#111111] font-normal tracking-tight">
              Hallo!
            </h2>

            {/* 4 Lines Editorial Statement */}
            <div className="text-lg sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[43px] font-normal tracking-tight leading-[1.3] sm:leading-[1.25] text-[#111111] select-none max-w-4xl mx-auto">
              <span className="block sm:whitespace-nowrap">focus is on blending clear strategy,</span>
              <span className="block sm:whitespace-nowrap">thoughtful design, and user</span>
              <span className="block sm:whitespace-nowrap">
                empathy to <span className="font-serif italic font-normal text-slate-400">craft experiences</span>
              </span>
              <span className="block sm:whitespace-nowrap text-slate-400 font-normal">that solve real problems</span>
            </div>

          </div>

          {/* Right Column: 3 Capability Badges (Tilted) */}
          <div className="lg:col-span-3 flex flex-row flex-wrap lg:flex-col gap-3 lg:gap-6 items-center justify-center lg:items-start z-10">
            
            {/* Pill 4: Design Systems (Yellow) */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-flex items-center gap-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-5 py-2.5 rounded-full select-none whitespace-nowrap -rotate-3 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#ffcc00] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-sm sm:text-base font-normal text-[#222222] tracking-tight">Design Systems</span>
            </motion.div>

            {/* Pill 5: Usability Testing (Pink) */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-flex items-center gap-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-5 py-2.5 rounded-full select-none whitespace-nowrap rotate-2 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#ff3399] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-sm sm:text-base font-normal text-[#222222] tracking-tight">Usability Testing</span>
            </motion.div>

            {/* Pill 6: Brand Identity (Lime) */}
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="inline-flex items-center gap-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-5 py-2.5 rounded-full select-none whitespace-nowrap -rotate-2 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#22cc44] flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="text-sm sm:text-base font-normal text-[#222222] tracking-tight">Brand Identity</span>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
