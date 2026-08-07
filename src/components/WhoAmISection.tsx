"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WhoAmISection() {
  const experiences = [
    {
      role: "Web Designer",
      company: "Agrud Technologies",
      period: "Feb 2025 → Nov 2025",
    },
    {
      role: "Product Designer",
      company: "Mindtide.ai",
      period: "Jan 2024 → Jan 2025",
    },
    {
      role: "UI/UX Designer",
      company: "Virtuous Techlogic",
      period: "Feb 2023 → Jan 2024",
    },
  ];

  return (
    <section className="relative w-full bg-[#f8fcf3] py-24 md:py-36 px-4 sm:px-8 overflow-hidden font-sans border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Tag */}
        <div className="mb-4 select-none">
          <span className="font-serif italic text-lg sm:text-xl text-slate-500 font-medium tracking-tight">
            / Who Am I
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] mb-16 select-none">
          Pushing Boundaries <span className="text-slate-400 font-normal text-3xl sm:text-5xl">since 2011</span>
        </h2>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Tilted Black Portrait Frame & Social Links */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            
            {/* Black Tilted Card Frame */}
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative w-full max-w-[300px] sm:max-w-[380px] bg-[#111111] p-4 sm:p-6 rounded-[28px] sm:rounded-[36px] shadow-2xl rotate-0 lg:-rotate-2 border border-black/10 transition-all"
            >
              {/* Portrait Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-zinc-900 border border-white/10">
                <Image
                  src="/debashis_barman_heroimage.png"
                  alt="Debashis Barman - Product Designer"
                  fill
                  className="object-cover object-top grayscale filter contrast-105"
                />
              </div>

              {/* Social Media Links inside frame */}
              <div className="flex items-center justify-between mt-5 px-2">
                <div className="flex items-center gap-3">
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/uxdebashis/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  {/* Behance */}
                  <a href="https://www.behance.net/debashisbarman1" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                    </svg>
                  </a>
                  {/* Contra */}
                  <a href="https://contra.com/bdebashis/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 1.5C6.202 1.5 1.5 6.202 1.5 12S6.202 22.5 12 22.5 22.5 17.798 22.5 12 17.798 1.5 12 1.5zm0 3.75a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5zm0 2.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/>
                    </svg>
                  </a>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-white tracking-tight">Debashis Barman</p>
                  <p className="text-[10px] font-medium text-white/60">Product Designer</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Bio Copy & Experience Timeline Table */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Bio Paragraph */}
            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed tracking-tight">
              I am a digital product designer specializing in UI/UX architecture, scalable design systems, and modern Web/App experiences. Over the past 5+ years, I&apos;ve collaborated with SaaS startups and digital agencies to turn ambitious visions into high-performing products.
            </p>

            {/* Experience Table */}
            <div className="space-y-6 pt-4 border-l-2 border-slate-300 pl-6 sm:pl-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-200/80 last:border-b-0 last:pb-0">
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] tracking-tight">{exp.role}</h3>
                    <p className="text-sm font-medium text-slate-500 italic font-serif">{exp.company}</p>
                  </div>
                  <span className="text-xs font-semibold px-3.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
