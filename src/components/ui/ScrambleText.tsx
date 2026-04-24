"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export const ScrambleText = ({ text, className = "" }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            if (letter === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3; // Controls speed of reveal
    }, 30);

    return () => clearInterval(interval);
  }, [text, isInView]);

  return (
    <motion.span ref={ref} className={className}>
      {displayText}
    </motion.span>
  );
};
