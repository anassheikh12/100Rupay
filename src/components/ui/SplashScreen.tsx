"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = "hidden";
    
    // Hide the splash screen completely after the animation finishes
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 3000); // Increased duration by 0.5s
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.15, 1, 1, 1.15, 0], opacity: [0, 1, 1, 1, 1, 0] }}
            transition={{
              duration: 3,
              times: [0, 0.15, 0.25, 0.7, 0.8, 1], // Pop in, settle, hold, pop out, shrink
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logo.png"
              alt="100 Rupay Logo"
              width={350}
              height={140}
              className="object-contain drop-shadow-[0_0_30px_rgba(50,205,50,0.5)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
