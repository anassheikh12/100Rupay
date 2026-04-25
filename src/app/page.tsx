"use client";

import Image from "next/image";




import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ImpactFeed } from "@/components/sections/ImpactFeed";
import { TokenCounter } from "@/components/sections/TokenCounter";
import { ReportingModal } from "@/components/modals/ReportingModal";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SplashScreen } from "@/components/ui/SplashScreen";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0]);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);


  


  return (
    <main className="relative bg-background min-h-screen selection:bg-lime-neon selection:text-black">
      <SplashScreen />
      {/* <Scene3D activeSection={activeSection} /> */}
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-lime-neon z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <div ref={section1Ref}>
        <Hero />
      </div>

      {/* Dynamic Background Overlay */}
      <motion.div 
        className="fixed inset-0 z-[-1] bg-lime-neon pointer-events-none"
        style={{ opacity: bgOpacity }} 
      />

      <div className="relative z-10">
        {/* Narrative Section 1 (0% - 30%) */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-20% 0px" }}
            className="text-5xl md:text-7xl font-rajdhani font-bold text-white text-center max-w-3xl drop-shadow-2xl"
          >
            Choti Raqam, <br/>
            <span className="text-lime-neon">Bara Asar.</span>
          </motion.h2>
        </section>

        {/* Narrative Section 2 (30% - 60%) */}
        <section ref={section2Ref} className="min-h-[80vh] flex items-center justify-center px-6 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-20% 0px" }}
            className="text-4xl md:text-5xl font-rajdhani font-medium text-zinc-300 text-center max-w-4xl drop-shadow-2xl"
          >
            Hamari AI har report ki tasdeeq karti hai taake aapka <span className="text-lime-neon font-bold">paisa sahi jagah lage.</span>
          </motion.h2>
        </section>
        <TokenCounter />
        
        <div ref={section3Ref}>
          <ImpactFeed />
        </div>

        {/* Call to Action Section */}
        <section className="py-32 px-6 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-12 md:p-20 rounded-[3rem] bg-surface border border-border relative overflow-hidden max-w-4xl w-full"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(50,205,50,0.1),transparent)]" />
              
              <h2 className="font-rajdhani font-bold text-4xl md:text-6xl text-white mb-6 relative z-10">
                Ready to solve 
                <br />
                <span className="text-lime-neon">your neighborhood?</span>
              </h2>
              <p className="text-zinc-500 font-medium text-lg mb-10 relative z-10 max-w-lg mx-auto">
                Join the network of thousands of citizens taking direct action through 100 Rupay.
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative z-10 px-10 py-5 bg-lime-neon text-black font-rajdhani font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(50,205,50,0.3)]"
              >
                REPORT YOUR FIRST ISSUE
              </button>
            </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="100 Rupay Logo" 
                width={80} 
                height={32} 
                className="object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <span className="font-rajdhani font-bold text-zinc-500 tracking-tighter">
                / PAKISTAN 2026
              </span>
            </div>
            
            <div className="flex gap-8 font-rajdhani text-xs font-bold text-zinc-600 tracking-widest uppercase">
              <a href="#" className="hover:text-lime-neon transition-colors">Infrastructure</a>
              <a href="#" className="hover:text-lime-neon transition-colors">Governance</a>
              <a href="#" className="hover:text-lime-neon transition-colors">Transparency</a>
            </div>
          </div>
        </footer>
      </div>

      <ReportingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
