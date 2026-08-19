"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const phrases = [
  "Don't solve 4,000+ random LeetCode & Codeforces problems.",
  "You only need 25 patterns to crack any DSA interview.",
  "Master the shape once. Recognize it everywhere.",
  "Stop memorizing solutions. Start recognizing patterns.",
];

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto flex h-14 max-w-xl items-center justify-center overflow-hidden sm:h-10 lg:mx-0 lg:justify-start">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute font-mono text-sm text-cyan sm:text-[15px]"
        >
          {phrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}