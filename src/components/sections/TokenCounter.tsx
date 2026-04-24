"use client";

import React, { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";

export const TokenCounter = () => {
  const [count, setCount] = useState(0);
  const targetValue = 842900; // Mock total raised

  useEffect(() => {
    const controls = animate(0, targetValue, {
      duration: 3,
      onUpdate: (value) => setCount(Math.floor(value)),
    });
    return () => controls.stop();
  }, [targetValue]);

  return (
    <div className="bg-emerald-900/10 border-y border-border py-10 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative flex flex-col items-center justify-center">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="font-rajdhani text-[10px] text-lime-neon font-bold tracking-[0.3em] uppercase mb-4"
        >
          Locked in Escrow Network
        </motion.div>
        
        <div className="flex items-center gap-4">
          <span className="font-rajdhani text-4xl md:text-6xl font-bold text-zinc-700">₨</span>
          <div className="flex font-rajdhani text-6xl md:text-8xl font-bold text-white tracking-tighter tabular-nums">
            {count.toLocaleString()}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center gap-6"
        >
          <div className="flex flex-col items-center">
            <span className="font-rajdhani font-bold text-lg text-white">8,429</span>
            <span className="font-rajdhani text-[10px] text-zinc-500 uppercase tracking-widest">Active Notes</span>
          </div>
          <div className="w-[1px] h-8 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <span className="font-rajdhani font-bold text-lg text-white">97%</span>
            <span className="font-rajdhani text-[10px] text-zinc-500 uppercase tracking-widest">Verify Rate</span>
          </div>
          <div className="w-[1px] h-8 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <span className="font-rajdhani font-bold text-lg text-white">1,248</span>
            <span className="font-rajdhani text-[10px] text-zinc-500 uppercase tracking-widest">Solved Issues</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative moving line */}
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-lime-neon/50 to-transparent"
      />
    </div>
  );
};
