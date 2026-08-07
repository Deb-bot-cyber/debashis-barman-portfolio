"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { Sparkles, Layers, Zap, ArrowRight, Palette, ShieldCheck, Code2 } from "lucide-react";
import { useRef } from "react";

export function ParallaxShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <div ref={targetRef} className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[400px] -right-[200px] w-[500px] h-[500px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Next.js + Parallax
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#motion" className="hover:text-white transition-colors">Parallax Motion</a>
              <a href="#tech" className="hover:text-white transition-colors">Stack</a>
            </div>
            <a
              href="#motion"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform active:scale-95"
            >
              Explore Demo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Motion */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Next.js App Router + Tailwind CSS + Framer Motion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6"
          >
            Smooth <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Parallax & Motion</span> for Next.js
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-10"
          >
            Your Next.js project is fully initialized with Tailwind CSS and pre-configured parallax motion capabilities. Ready to build stunning visual experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#features"
              className="px-8 py-4 rounded-xl text-base font-bold bg-white text-slate-950 hover:bg-slate-100 shadow-xl transition-all flex items-center gap-2 group"
            >
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#tech"
              className="px-8 py-4 rounded-xl text-base font-bold bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all hover:bg-slate-800/50"
            >
              View Stack
            </a>
          </motion.div>
        </motion.div>

        {/* Parallax Floating Cards Showcase */}
        <div className="relative w-full max-w-5xl mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <Parallax translateY={[-20, 20]} speed={-5}>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Next.js 16 App Router</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Optimized with TypeScript, server components, and clean file structure out of the box.
              </p>
            </div>
          </Parallax>

          <Parallax translateY={[20, -20]} speed={5}>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl hover:border-purple-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tailwind CSS Styling</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utility-first styling with inline theme configuration, zero-config compilation, and high performance.
              </p>
            </div>
          </Parallax>

          <Parallax translateY={[-15, 15]} speed={-3}>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl hover:border-pink-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Parallax Motion</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Seamless scroll animations powered by Framer Motion & React Scroll Parallax.
              </p>
            </div>
          </Parallax>
        </div>
      </section>

      {/* Interactive Parallax Section */}
      <section id="motion" className="py-28 px-6 bg-slate-900/50 border-t border-b border-slate-800/60 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Multi-Layer Parallax Scrolling
            </h2>
            <p className="text-slate-400">
              Scroll up and down to experience multi-depth parallax scroll layers operating in real-time.
            </p>
          </div>

          <div className="relative h-[450px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Background Parallax Layer */}
            <Parallax translateY={[-40, 40]} className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
            </Parallax>

            {/* Slow Moving Layer */}
            <Parallax translateY={[-25, 25]} speed={-10} className="absolute left-12 top-12">
              <div className="px-5 py-3 rounded-xl bg-slate-900/90 border border-slate-700/60 text-slate-300 text-sm font-semibold shadow-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Layer 1 (Speed: -10)
              </div>
            </Parallax>

            {/* Fast Moving Layer */}
            <Parallax translateY={[30, -30]} speed={10} className="absolute right-12 bottom-12">
              <div className="px-5 py-3 rounded-xl bg-purple-900/40 border border-purple-600/50 text-purple-200 text-sm font-semibold shadow-xl flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" /> Layer 2 (Speed: +10)
              </div>
            </Parallax>

            {/* Centered Focal Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative z-10 p-8 max-w-md text-center rounded-2xl bg-slate-900/90 border border-indigo-500/40 shadow-2xl backdrop-blur-xl"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/30">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready For Production</h3>
              <p className="text-slate-400 text-sm">
                Dependencies installed and configured. Start building your portfolio or application immediately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Next.js + Tailwind CSS + Parallax Motion. All rights reserved.</p>
      </footer>
    </div>
  );
}
