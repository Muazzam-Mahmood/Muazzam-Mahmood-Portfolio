/**
 * @file components/Hero/TypewriterText.tsx
 * @description Animated typewriter that cycles through HERO_ROLES.
 *              Uses AnimatePresence with "wait" mode for clean exit → enter transitions.
 *              Renders a blinking cursor via CSS animation (.typewriter-cursor).
 */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_ROLES } from "@/lib/site-config";

export default function TypewriterText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: "0.1em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.38, ease: [0.25, 0.1, 0, 1] }}
          className="gradient-text"
        >
          {HERO_ROLES[index]}
        </motion.span>
      </AnimatePresence>
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
