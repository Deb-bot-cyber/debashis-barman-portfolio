"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useState, useEffect } from "react";

interface BrandLogo {
  id: string;
  name: string;
  icon?: string;
  image?: string;
}

interface WorkImage {
  id: string;
  src: string;
  alt: string;
}

// Fallback data if API fails
const FALLBACK_LOGOS: BrandLogo[] = [
  { id: "1", name: "messyprogrammer", icon: "▲" },
  { id: "2", name: "dream records", icon: "●" },
  { id: "3", name: "sealand logistics", icon: "✦" },
  { id: "4", name: "medikzo.com", icon: "◎" },
  { id: "5", name: "Envizn Labs", icon: "◆" },
  { id: "6", name: "Pannel IQ", icon: "❖" },
];

const FALLBACK_COL1: WorkImage[] = [
  { id: "w1", src: "/project_ai_dashboard.png", alt: "AI Dashboard Project" },
  { id: "w2", src: "/project_hometrust.png", alt: "Hometrust Real Estate" },
  { id: "w3", src: "/project_fintech.png", alt: "Fintech Digital Banking" },
];

const FALLBACK_COL2: WorkImage[] = [
  { id: "w4", src: "/project_healthcare.png", alt: "Healthcare Platform" },
  { id: "w5", src: "/project_furniture.png", alt: "Timeless Furniture Design" },
  { id: "w6", src: "/project_agency.png", alt: "Creative Product Agency" },
];

const FALLBACK_COL3: WorkImage[] = [
  { id: "w7", src: "/project_hometrust.png", alt: "Hometrust Real Estate" },
  { id: "w8", src: "/project_ai_dashboard.png", alt: "AI Dashboard Project" },
  { id: "w9", src: "/project_healthcare.png", alt: "Healthcare Platform" },
];

export function WorksSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [brandLogos, setBrandLogos] = useState<BrandLogo[]>(FALLBACK_LOGOS);
  const [col1, setCol1] = useState<WorkImage[]>(FALLBACK_COL1);
  const [col2, setCol2] = useState<WorkImage[]>(FALLBACK_COL2);
  const [col3, setCol3] = useState<WorkImage[]>(FALLBACK_COL3);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data.brandLogos?.length) setBrandLogos(data.brandLogos);
        if (data.worksImages?.column1?.length) setCol1(data.worksImages.column1);
        if (data.worksImages?.column2?.length) setCol2(data.worksImages.column2);
        if (data.worksImages?.column3?.length) setCol3(data.worksImages.column3);
      })
      .catch(() => {
        // Keep fallback data on error
      });
  }, []);

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
          {[...brandLogos, ...brandLogos, ...brandLogos].map((brand, index) => (
            <div key={index} className="inline-flex items-center gap-3 text-slate-400 font-medium text-lg tracking-wide select-none">
              {brand.image ? (
                <div className="flex items-center justify-center">
                  <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="h-8 sm:h-9 w-auto max-w-[160px] object-contain opacity-85 hover:opacity-100 transition-all mix-blend-multiply filter grayscale hover:grayscale-0" 
                  />
                </div>
              ) : (
                <>
                  <span className="text-xl opacity-60">{brand.icon || "✦"}</span>
                  <span className="font-semibold tracking-tight text-slate-700">{brand.name}</span>
                </>
              )}
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
              {[...col1, ...col1].map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg border border-black/5 bg-white">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top hover:scale-105 transition-transform duration-500" unoptimized />
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
              {[...col2, ...col2].map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg border border-black/5 bg-white">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top hover:scale-105 transition-transform duration-500" unoptimized />
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
              {[...col3, ...col3].map((img, idx) => (
                <div key={idx} className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg border border-black/5 bg-white">
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top hover:scale-105 transition-transform duration-500" unoptimized />
                </div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>

    </section>
  );
}
