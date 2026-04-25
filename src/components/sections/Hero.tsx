"use client";

import React from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";



export const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* ── Radial green glow (hero-specific) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(50,205,50,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Subtle vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(13,15,14,0.85) 100%)",
        }}
      />

      {/* <InteractiveCity /> */}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/10 border border-emerald-600/30 text-lime-neon font-rajdhani text-xs font-bold tracking-[0.2em] mb-6"
        >
          <ShieldCheck className="w-4 h-4" />
          COMMUNITY-BACKED ESCROW NETWORK
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl font-rajdhani font-bold tracking-tighter leading-none mb-8"
        >
          Aik Note,
          <br />
          <span className="text-lime-neon drop-shadow-[0_0_15px_rgba(50,205,50,0.3)]">
            Aik Hal.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-10"
        >
          Pakistan’s first AI-verified civic crowdfunding platform. Fix your street for just 100 Rupees.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-20"
        >
          <Link href="https://100rupayfrontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-lime-neon text-black font-rajdhani font-bold text-lg rounded-full flex items-center gap-3 overflow-hidden transition-all hover:pr-10">
            REPORT AN ISSUE
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Link>
          
          <Link href="https://100rupayfrontend.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border border-zinc-800 text-zinc-300 font-rajdhani font-bold text-lg rounded-full hover:bg-zinc-900 transition-colors">
            VIEW LIVE MAP
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-40">
        <span className="font-rajdhani text-[10px] tracking-widest text-zinc-500 uppercase">
          Explore Impact
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-lime-neon to-transparent" />
      </div>
    </section>
  );
};
