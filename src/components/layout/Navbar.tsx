"use client";

import React, { useState, useEffect } from "react";
import { Wallet, LogIn, Menu } from "lucide-react";

import Image from "next/image";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass h-16" : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="100 Rupay Logo" 
            width={120} 
            height={48} 
            className="object-contain"
            priority
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-3 px-4 py-2 bg-surface-light border border-border rounded-full">
            <Wallet className="w-4 h-4 text-lime-neon" />
            <span className="font-rajdhani font-medium text-sm">
              100 <span className="text-lime-neon">KA NOTE</span>
            </span>
            <div className="w-[1px] h-4 bg-border" />
            <span className="font-rajdhani text-[11px] text-zinc-500 uppercase tracking-wider">
              ≈ 10,000 PKR
            </span>
          </div>

          <button className="flex items-center gap-2 px-5 py-2 bg-lime-neon text-black font-rajdhani font-bold text-sm rounded-full transition-transform hover:scale-105 active:scale-95">
            <LogIn className="w-4 h-4" />
            LOGIN
          </button>
        </div>

        <div className="md:hidden">
          <Menu className="w-6 h-6 text-lime-neon" />
        </div>
      </div>
    </nav>
  );
};
