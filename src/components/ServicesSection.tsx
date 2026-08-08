"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Layout, Code2, Cpu, Palette } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
  outcome: string;
  icon: any;
}

const services: ServiceItem[] = [
  {
    id: "ui-ux-design",
    number: "01",
    tag: "UI/UX & Product Design",
    title: "UI/UX Design",
    description: "We craft design systems and visual experiences that are not just beautiful–but strategic. From UI/UX and product design to branding, motion graphics, brochures, and custom illustrations, our work helps funded startups and scaling companies stand out and communicate clearly.",
    image: "/service_ui_ux_design.png",
    deliverables: [
      "Mobile App Design",
      "Product Design",
      "Web App Interface Design",
      "Prototyping & Interaction Design",
      "UX Audit"
    ],
    outcome: "Distinctive, conversion-focused design assets that elevate your brand, enhance user experience, and drive engagement across every touchpoint.",
    icon: Layout,
  },
  {
    id: "web-development",
    number: "02",
    tag: "Full-Stack Development",
    title: "Website Development",
    description: "We design and build high-performing websites using the tools that best fit your needs–Framer, Webflow, Shopify, Next.js, and more. From custom builds to smart integrations and migrations, we create sites that are fast, scalable, and easy to manage.",
    image: "/service_website_development.jpg",
    deliverables: [
      "Framer Development",
      "Custom & Next.js Development",
      "Webflow Development",
      "Shopify Development",
      "Wix Development"
    ],
    outcome: "A future-ready website that looks great, performs fast, works seamlessly across devices, and gives your team full control backed by the right tools, platforms, and automations to scale your business.",
    icon: Code2,
  },
  {
    id: "ai-automation",
    number: "03",
    tag: "AI & Workflow Automation",
    title: "AI & Automation",
    description: "We design and deploy custom AI agents, automated workflow pipelines, and intelligent integrations that streamline business operations. By connecting your tools and eliminating manual workflows, we help teams save hundreds of operational hours.",
    image: "/service_ai_automation.png",
    deliverables: [
      "Custom AI Agent Engineering",
      "n8n & Make Automated Pipelines",
      "CRM & Ops Auto-Synchronization",
      "OpenAI & LLM API Integration",
      "Workflow Efficiency Audit"
    ],
    outcome: "Autonomous, error-free operational workflows that slash turnaround times, reduce overhead, and scale business productivity exponentially.",
    icon: Cpu,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative w-full bg-[#f8fcf3] py-20 px-4 sm:px-8 font-sans">
      
      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-16 md:mb-20 select-none">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <span className="font-serif italic text-lg sm:text-xl text-slate-500 font-normal tracking-tight">
            / Our Services Explained
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-medium tracking-tight text-[#111111]"
        >
          Specialized Services
        </motion.h2>
      </div>

      {/* Stacked Cards Container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14 pb-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          const stickyTopOffset = 100 + index * 24;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ top: `${stickyTopOffset}px` }}
              className="sticky bg-white border border-black/10 shadow-xl rounded-[28px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* LEFT SIDE: Service Showcase Image */}
                <div className="lg:col-span-6 relative aspect-[16/11] w-full rounded-[20px] sm:rounded-[28px] overflow-hidden border border-black/10 bg-slate-100 group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    unoptimized
                  />
                  
                  {/* Number Badge Overlay */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-slate-950/80 backdrop-blur-md text-white font-mono text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-md">
                    {service.number}
                  </div>
                </div>

                {/* RIGHT SIDE: Service Content */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  
                  <div>
                    {/* Category Tag & Icon */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/80 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-700">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{service.tag}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                      {service.title}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Vertical Checklist of Deliverables */}
                  <div className="space-y-3">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-slate-300 text-slate-900 flex items-center justify-center shrink-0 bg-slate-50">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-slate-900">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Outcome Box */}
                  <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    <span className="font-semibold text-slate-950">Outcome: </span>
                    {service.outcome}
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2.5 text-sm font-semibold px-6 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 group/btn"
                    >
                      <span>Book This Service</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
