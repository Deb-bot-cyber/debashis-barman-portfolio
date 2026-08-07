"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useState } from "react";

const BRAND_LOGOS = [
  { name: "messyprogrammer", icon: "▲" },
  { name: "dream records", icon: "●" },
  { name: "sealand logistics", icon: "✦" },
  { name: "medikzo.com", icon: "◎" },
  { name: "Envizn Labs", icon: "◆" },
  { name: "Pannel IQ", icon: "❖" },
];

const COLUMN_1_IMAGES = [
  { src: "/project_ai_dashboard.png", alt: "AI Dashboard Project" },
  { src: "/project_hometrust.png", alt: "Hometrust Real Estate" },
  { src: "/project_fintech.png", alt: "Fintech Digital Banking" },
];

const COLUMN_2_IMAGES = [
  { src: "/project_healthcare.png", alt: "Healthcare Platform" },
  { src: "/project_furniture.png", alt: "Timeless Furniture Design" },
  { src: "/project_agency.png", alt: "Creative Product Agency" },
];

const COLUMN_3_IMAGES = [
  { src: "/project_hometrust.png", alt: "Hometrust Real Estate" },
  { src: "/project_ai_dashboard.png", alt: "AI Dashboard Project" },
  { src: "/project_healthcare.png", alt: "Healthcare Platform" },
];

export function WorksSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="works" className="relative w-full bg-[#f8fcf3] py-16 px-4 sm:px-8 overflow-hidden font-sans">
      
      {/* Brand Logo Ticker Header */}
      <div className="max-w-7xl mx-auto mb-16 overflow-hidden relative">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8fcf3] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8fcf3] to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex items-center gap-16 whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, index) => (
            <div key={index} className="inline-flex items-center gap-3 text-slate-400 font-medium text-lg tracking-wide select-none">
              <span className="text-xl opacity-60">{brand.icon}</span>
              <span className="font-semibold tracking-tight text-slate-700">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Lime Green Bento Grid Slider Showcase */}
      <div 
        className="max-w-7xl mx-auto rounded-[28px] sm:rounded-[44px] bg-[#9ef829] p-4 sm:p-12 relative overflow-hidden h-[480px] sm:h-[840px] shadow-2xl transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Top & Bottom Gradient Masks to blend sliding cards */}
        <div className="absolute inset-x-0 top-0 h-20 sm:h-40 bg-gradient-to-b from-[#9ef829] via-[#9ef829]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-40 bg-gradient-to-t from-[#9ef829] via-[#9ef829]/80 to-transparent z-20 pointer-events-none" />

        {/* Floating "Seen Recent Works" Button - Appears on Hover */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.9,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        >
          <div className="inline-flex items-center gap-3 bg-[#111111] text-white px-6 py-3.5 rounded-full shadow-2xl backdrop-blur-md border border-white/10 select-none">
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
              <Layers className="w-4 h-4 text-lime-400" />
            </div>
            <span className="text-sm font-semibold tracking-wide">Seen Recent Works</span>
          </div>
        </motion.div>

        {/* 3-Column Reverse Vertical Slider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
          
          {/* Column 1: Infinite Scroll UP */}
          <div className="relative h-full overflow-hidden hidden md:block">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            >
              {[...COLUMN_1_IMAGES, ...COLUMN_1_IMAGES].map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg border border-black/5 bg-white">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 2: Infinite Scroll DOWN (Reverse Direction) */}
          <div className="relative h-full overflow-hidden">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ["-50%", "0%"] }}
              transition={{ duration: 26, ease: "linear", repeat: Infinity }}
            >
              {[...COLUMN_2_IMAGES, ...COLUMN_2_IMAGES].map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg border border-black/5 bg-white">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 3: Infinite Scroll UP */}
          <div className="relative h-full overflow-hidden hidden md:block">
            <motion.div
              className="flex flex-col gap-6"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            >
              {[...COLUMN_3_IMAGES, ...COLUMN_3_IMAGES].map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg border border-black/5 bg-white">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>

    </section>
  );
}
