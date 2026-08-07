"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section className="relative w-full bg-[#f8fcf3] py-24 md:py-36 px-4 sm:px-8 overflow-hidden font-sans border-t border-black/5">
      <div className="max-w-6xl mx-auto">
        
        {/* 2-Column Divided Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Center Vertical Divider Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-300/70 -translate-x-1/2" />

          {/* Left Testimonial Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between pr-0 md:pr-10 space-y-8 relative"
          >
            {/* Top Right Bold Quote Mark */}
            <div className="absolute right-0 top-0 text-3xl font-serif text-[#111111] font-bold select-none leading-none">
              ”
            </div>

            {/* Testimonial Quote Copy */}
            <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed tracking-tight max-w-md pt-2">
              Working with Debashis was seamless from start to finish. He understood our goals quickly, asked the right questions, and delivered a design system that scaled perfectly with our growing modern best app.
            </p>

            {/* Author Profile Footer */}
            <div className="flex items-center gap-3.5 pt-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10 shadow-xs bg-amber-100 shrink-0">
                <Image
                  src="/testimonial_avatar_1.png"
                  alt="Daniel Reed - Founder of NovaLabs"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#111111] tracking-tight">Daniel Reed</h4>
                <p className="text-xs text-gray-500 font-normal">Founder of NovaLabs</p>
              </div>
            </div>

          </motion.div>

          {/* Right Testimonial Card (Staggered Lower Down) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between pl-0 md:pl-10 space-y-8 relative pt-0 md:pt-48"
          >
            {/* Top Right Bold Quote Mark */}
            <div className="absolute right-0 top-0 md:top-48 text-3xl font-serif text-[#111111] font-bold select-none leading-none">
              ”
            </div>

            {/* Testimonial Quote Copy */}
            <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed tracking-tight max-w-md pt-2">
              Debashis brought our product vision to life with incredible attention to detail. His ability to balance business needs with user empathy made our platform not just beautiful — but genuinely useful.
            </p>

            {/* Author Profile Footer */}
            <div className="flex items-center gap-3.5 pt-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10 shadow-xs bg-[#9ef829] shrink-0">
                <Image
                  src="/testimonial_avatar_2.png"
                  alt="Sarah Nguyen - Product Manager at FlowSync"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#111111] tracking-tight">Sarah Nguyen</h4>
                <p className="text-xs text-gray-500 font-normal">Product Manager at FlowSync</p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
