"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function SelectedWorksSection() {
  return (
    <section id="projects" className="relative w-full bg-[#f8fcf3] py-24 md:py-36 px-4 sm:px-8 overflow-hidden font-sans">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="mb-3 select-none">
          <span className="font-serif italic text-lg sm:text-xl text-slate-500 font-medium tracking-tight">
            / Best Projects
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] select-none">
          Selected Works
        </h2>
      </div>

      {/* 2x2 Project Showcase Card Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Finvera Dashboard */}
        <motion.div 
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#e8ebe4] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 overflow-hidden border border-black/5 shadow-md flex flex-col justify-between min-h-[320px] sm:min-h-[440px] group"
        >
          {/* Card Top Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 z-10 select-none">
            <h3 className="text-2xl font-bold text-[#111111]">Finvera Dashboard</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">Fintech</span>
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">Product Design</span>
            </div>
          </div>

          {/* Project Image Preview */}
          <div className="relative w-full h-[200px] sm:h-[280px] rounded-[16px] sm:rounded-[20px] overflow-hidden mt-4 sm:mt-6 shadow-lg border border-black/10 bg-white">
            <Image 
              src="/project_fintech.png" 
              alt="Finvera Dashboard Showcase" 
              fill 
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>

        {/* Card 2: Havenly Real Estate */}
        <motion.div 
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#e8ebe4] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 overflow-hidden border border-black/5 shadow-md flex flex-col justify-between min-h-[320px] sm:min-h-[440px] group"
        >
          {/* Card Top Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 z-10 select-none">
            <h3 className="text-2xl font-bold text-[#111111]">Havenly Real Estate</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">Web App</span>
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">UX/UI Design</span>
            </div>
          </div>

          {/* Project Image Preview */}
          <div className="relative w-full h-[200px] sm:h-[280px] rounded-[16px] sm:rounded-[20px] overflow-hidden mt-4 sm:mt-6 shadow-lg border border-black/10 bg-white">
            <Image 
              src="/project_hometrust.png" 
              alt="Havenly Real Estate Showcase" 
              fill 
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>

        {/* Card 3: Cluvia Learning Platform */}
        <motion.div 
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#e8ebe4] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 overflow-hidden border border-black/5 shadow-md flex flex-col justify-between min-h-[320px] sm:min-h-[440px] group"
        >
          {/* Card Top Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 z-10 select-none">
            <h3 className="text-2xl font-bold text-[#111111]">Cluvia Platform</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">EdTech</span>
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">Mobile Design</span>
            </div>
          </div>

          {/* Project Image Preview */}
          <div className="relative w-full h-[200px] sm:h-[280px] rounded-[16px] sm:rounded-[20px] overflow-hidden mt-4 sm:mt-6 shadow-lg border border-black/10 bg-white">
            <Image 
              src="/project_ai_dashboard.png" 
              alt="Cluvia Platform Showcase" 
              fill 
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>

        {/* Card 4: Trusten M-Banking */}
        <motion.div 
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#e8ebe4] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 overflow-hidden border border-black/5 shadow-md flex flex-col justify-between min-h-[320px] sm:min-h-[440px] group"
        >
          {/* Card Top Meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 z-10 select-none">
            <h3 className="text-2xl font-bold text-[#111111]">Trusten M-Banking</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">Fintech</span>
              <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">UI System</span>
            </div>
          </div>

          {/* Project Image Preview */}
          <div className="relative w-full h-[200px] sm:h-[280px] rounded-[16px] sm:rounded-[20px] overflow-hidden mt-4 sm:mt-6 shadow-lg border border-black/10 bg-white">
            <Image 
              src="/project_agency.png" 
              alt="Trusten M-Banking Showcase" 
              fill 
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </motion.div>

      </div>

    </section>
  );
}
