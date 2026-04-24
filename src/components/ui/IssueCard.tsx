"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, CheckCircle2, Users, ArrowUpRight } from "lucide-react";

interface IssueCardProps {
  id: string;
  title: string;
  location: string;
  progress: number;
  tokens: number;
  isAiVerified: boolean;
  image: string;
}

export const IssueCard = ({
  title,
  location,
  progress,
  tokens,
  isAiVerified,
  image,
}: IssueCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-lime-neon/50 transition-colors"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-110 duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {isAiVerified && (
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-black/80 backdrop-blur-md border border-lime-neon/50 rounded-full overflow-hidden">
            <motion.div 
              animate={{ y: [-10, 30] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} 
              className="absolute left-0 right-0 h-[1px] bg-lime-neon/80 shadow-[0_0_8px_#32CD32] z-0" 
            />
            <div className="relative z-10 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-lime-neon" />
              <span className="font-rajdhani text-[10px] font-bold text-white tracking-widest uppercase">
                AI TASDEEQ SHUDA
              </span>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-zinc-300 font-rajdhani text-xs">
          <MapPin className="w-3 h-3 text-lime-neon" />
          {location}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-rajdhani font-bold text-xl text-white mb-4 line-clamp-1 group-hover:text-lime-neon transition-colors">
          {title}
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="font-rajdhani text-xs text-zinc-500 uppercase tracking-widest">
                Crowdfunding Progress
              </span>
              <span className="font-rajdhani font-bold text-lime-neon">
                {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-lime-neon shadow-[0_0_8px_rgba(50,205,50,0.5)]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-zinc-500" />
              <span className="font-rajdhani text-sm font-bold text-white">
                {tokens} <span className="text-zinc-500 font-medium">NOTES</span>
              </span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-lime-neon/10 border border-lime-neon text-lime-neon font-rajdhani font-bold text-xs rounded hover:bg-lime-neon hover:text-black transition-all shadow-[0_0_10px_rgba(50,205,50,0.3)]">
              DONATE 100 RUPAY <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
