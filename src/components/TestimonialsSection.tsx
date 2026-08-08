"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "Working with Debashis was seamless from start to finish. He understood our goals quickly, asked the right questions, and delivered a design system that scaled perfectly with our growing modern best app.",
    author: "Daniel Reed",
    role: "Founder of NovaLabs",
    avatar: "/testimonial_avatar_1.png",
  },
  {
    id: "2",
    quote: "Debashis brought our product vision to life with incredible attention to detail. His ability to balance business needs with user empathy made our platform not just beautiful — but genuinely useful.",
    author: "Sarah Nguyen",
    role: "Product Manager at FlowSync",
    avatar: "/testimonial_avatar_2.png",
  },
];

const BG_COLORS = ["bg-amber-100", "bg-[#9ef829]", "bg-sky-200", "bg-rose-100", "bg-violet-100"];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);

  useEffect(() => {
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials?.length) setTestimonials(data.testimonials);
      })
      .catch(() => {
        // Keep fallback data on error
      });
  }, []);

  // Render pairs for the 2-column layout
  const left = testimonials.filter((_, i) => i % 2 === 0);
  const right = testimonials.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative w-full bg-[#f8fcf3] py-24 md:py-36 px-4 sm:px-8 overflow-hidden font-sans border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        
        {/* 2-Column Divided Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Center Vertical Divider Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-300/70 -translate-x-1/2" />

          {/* Left Testimonial Cards */}
          <div className="flex flex-col gap-16 pr-0 md:pr-10">
            {left.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col justify-between space-y-8 relative"
              >
                {/* Top Right Bold Quote Mark */}
                <div className="absolute right-0 top-0 text-3xl font-serif text-[#111111] font-bold select-none leading-none">
                  &ldquo;
                </div>

                {/* Testimonial Quote Copy */}
                <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed tracking-tight max-w-md pt-2">
                  {t.quote}
                </p>

                {/* Author Profile Footer */}
                <div className="flex items-center gap-3.5 pt-4">
                  <div className={`relative w-10 h-10 rounded-full overflow-hidden border border-black/10 shadow-xs ${BG_COLORS[i % BG_COLORS.length]} shrink-0`}>
                    <Image
                      src={t.avatar}
                      alt={`${t.author} - ${t.role}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#111111] tracking-tight">{t.author}</h4>
                    <p className="text-xs text-gray-500 font-normal">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Testimonial Cards (Staggered Lower Down) */}
          <div className="flex flex-col gap-16 pl-0 md:pl-10 pt-0 md:pt-48">
            {right.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="flex flex-col justify-between space-y-8 relative"
              >
                {/* Top Right Bold Quote Mark */}
                <div className="absolute right-0 top-0 text-3xl font-serif text-[#111111] font-bold select-none leading-none">
                  &ldquo;
                </div>

                {/* Testimonial Quote Copy */}
                <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed tracking-tight max-w-md pt-2">
                  {t.quote}
                </p>

                {/* Author Profile Footer */}
                <div className="flex items-center gap-3.5 pt-4">
                  <div className={`relative w-10 h-10 rounded-full overflow-hidden border border-black/10 shadow-xs ${BG_COLORS[(i + 1) % BG_COLORS.length]} shrink-0`}>
                    <Image
                      src={t.avatar}
                      alt={`${t.author} - ${t.role}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#111111] tracking-tight">{t.author}</h4>
                    <p className="text-xs text-gray-500 font-normal">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
