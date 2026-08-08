"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SelectedWork {
  id: string;
  title: string;
  category1: string;
  category2: string;
  image: string;
}

const FALLBACK_WORKS: SelectedWork[] = [
  { id: "1", title: "Finvera Dashboard", category1: "Fintech", category2: "Product Design", image: "/project_fintech.png" },
  { id: "2", title: "Havenly Real Estate", category1: "Web App", category2: "UX/UI Design", image: "/project_hometrust.png" },
  { id: "3", title: "Cluvia Platform", category1: "EdTech", category2: "Mobile Design", image: "/project_ai_dashboard.png" },
  { id: "4", title: "Trusten M-Banking", category1: "Fintech", category2: "UI System", image: "/project_agency.png" },
];

export function SelectedWorksSection() {
  const [works, setWorks] = useState<SelectedWork[]>(FALLBACK_WORKS);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data.selectedWorks?.length) setWorks(data.selectedWorks);
      })
      .catch(() => {
        // Keep fallback data on error
      });
  }, []);

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

      {/* Dynamic Project Showcase Card Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {works.map((work) => (
          <motion.div 
            key={work.id}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#e8ebe4] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 overflow-hidden border border-black/5 shadow-md flex flex-col justify-between min-h-[320px] sm:min-h-[440px] group"
          >
            {/* Card Top Meta */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 z-10 select-none">
              <h3 className="text-2xl font-bold text-[#111111]">{work.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">{work.category1}</span>
                <span className="text-xs font-semibold px-3 py-1 bg-white/80 rounded-full text-slate-700 backdrop-blur-xs">{work.category2}</span>
              </div>
            </div>

            {/* Project Image Preview */}
            <div className="relative w-full h-[280px] sm:h-[380px] rounded-[16px] sm:rounded-[20px] overflow-hidden mt-4 sm:mt-6 shadow-lg border border-black/10 bg-white">
              <Image 
                src={work.image} 
                alt={`${work.title} Showcase`} 
                fill 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
