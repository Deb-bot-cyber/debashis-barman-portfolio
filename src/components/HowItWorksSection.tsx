"use client";

import { motion } from "framer-motion";

export function HowItWorksSection() {
  return (
    <section id="process" className="relative w-full bg-[#f8fcf3] py-24 md:py-36 px-4 sm:px-8 overflow-hidden font-sans">
      
      {/* Background Lime Radial Spotlight (Top-Right behind Cards) */}
      <div 
        className="absolute right-0 top-1/4 w-[600px] h-[600px] pointer-events-none z-0 opacity-60"
        style={{
          background: "radial-gradient(circle, #aef32f 0%, rgba(248, 252, 243, 0) 70%)"
        }}
      />

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16 md:mb-24">
        <div className="mb-3 select-none">
          <span className="font-serif italic text-lg sm:text-xl text-slate-500 font-normal tracking-tight">
            / Our Projects Explained
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#111111] select-none">
          Here&apos;s how it works
        </h2>
      </div>

      {/* 3 Tilted Cards Container with SVG Connectors */}
      <div className="relative max-w-6xl mx-auto min-h-0 md:min-h-[480px]">
        
        {/* SVG Connecting Lines with Green Anchor Rings */}
        <svg 
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible" 
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connector Line 1: Card 01 Top-Right Corner to Card 02 Top Border */}
          <path 
            d="M 360 -20 C 390 -80, 460 -80, 490 -45" 
            fill="none" 
            stroke="#9ef829" 
            strokeWidth="3" 
          />
          {/* Ring 1 (Card 01 Top-Right Corner Edge) */}
          <circle cx="360" cy="-20" r="6" fill="#f8fcf3" stroke="#9ef829" strokeWidth="3" />
          {/* Ring 2 (Card 02 Top Border above '02') */}
          <circle cx="490" cy="-45" r="6" fill="#f8fcf3" stroke="#9ef829" strokeWidth="3" />

          {/* Connector Line 2: Card 02 Right Edge to Card 03 Left Edge (Looping Swirl) */}
          <path 
            d="M 730 200 C 765 150, 795 140, 780 185 C 765 230, 735 190, 770 150 C 790 130, 805 120, 815 130" 
            fill="none" 
            stroke="#9ef829" 
            strokeWidth="3" 
          />
          {/* Ring 3 (Card 02 Bottom-Right Edge) */}
          <circle cx="730" cy="200" r="6" fill="#f8fcf3" stroke="#9ef829" strokeWidth="3" />
          {/* Ring 4 (Card 03 Left Border Edge near '03') */}
          <circle cx="815" cy="130" r="6" fill="#f8fcf3" stroke="#9ef829" strokeWidth="3" />
        </svg>

        {/* 3 Tilted Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          
          {/* Card 01: Discover */}
          <motion.div 
            whileHover={{ y: -6, rotate: -2 }}
            className="relative bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-[24px] md:rounded-[32px] border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] rotate-0 md:-rotate-3 transition-all z-10 flex flex-col justify-between min-h-[260px] md:min-h-[340px]"
          >
            <div className="text-5xl font-sans text-[#111111] font-light mb-8 select-none">01</div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#111111] mb-3 tracking-tight">Discover</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Understanding your goals, users, and challenges through research and strategy.
              </p>
            </div>
          </motion.div>

          {/* Card 02: Design (Elevated higher) */}
          <motion.div 
            whileHover={{ y: -34, rotate: -1 }}
            className="relative bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-[24px] md:rounded-[32px] border border-slate-200/60 shadow-[0_15px_35px_rgba(0,0,0,0.05)] rotate-0 md:-rotate-1 translate-y-0 md:-translate-y-12 transition-all z-10 flex flex-col justify-between min-h-[260px] md:min-h-[340px]"
          >
            <div className="text-5xl font-sans text-[#111111] font-light mb-8 select-none">02</div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#111111] mb-3 tracking-tight">Design</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Transforming insights into intuitive, beautiful, and functional product experiences.
              </p>
            </div>
          </motion.div>

          {/* Card 03: Deliver */}
          <motion.div 
            whileHover={{ y: -6, rotate: 3 }}
            className="relative bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-[24px] md:rounded-[32px] border border-slate-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] rotate-0 md:rotate-3 transition-all z-10 flex flex-col justify-between min-h-[260px] md:min-h-[340px]"
          >
            <div className="text-5xl font-sans text-[#111111] font-light mb-8 select-none">03</div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#111111] mb-3 tracking-tight">Deliver</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Testing, refining, and launching the final product with clarity and precision.
              </p>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
