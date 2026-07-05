/**
 * @file components/motion/index.tsx
 * @description Reusable Framer Motion animation primitives.
 *              All scroll animations fire once (viewport={{ once: true }}).
 *              Easing and duration are defined once here — DRY principle.
 */
"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// ─── Shared Config ────────────────────────────────────────────────────────────

const EASE = [0.25, 0.1, 0, 1] as const;
const VIEWPORT = { once: true, margin: "-60px" } as const;

// ─── Prop Types ───────────────────────────────────────────────────────────────

interface BaseProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
/**
 * Fades + slides up on scroll enter.
 * The most common entrance animation — use for section headers, paragraphs, etc.
 */
export function FadeIn({ children, className = "", delay = 0 }: BaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── SlideIn ──────────────────────────────────────────────────────────────────
/**
 * Slides in from left or right on scroll enter.
 * Use for two-column layouts where left/right panels animate toward center.
 */
interface SlideInProps extends BaseProps {
  direction?: "left" | "right";
}

export function SlideIn({
  children,
  className = "",
  delay = 0,
  direction = "left",
}: SlideInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleIn ──────────────────────────────────────────────────────────────────
/**
 * Scales + fades in on scroll enter.
 * Ideal for cards, icons, and badge elements.
 */
export function ScaleIn({ children, className = "", delay = 0 }: BaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerContainer ─────────────────────────────────────────────────────────
/**
 * Staggers children animations in sequence.
 * Must wrap StaggerItem components to participate in the stagger sequence.
 */
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export function StaggerContainer({
  children,
  className = "",
}: Omit<BaseProps, "delay">) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ──────────────────────────────────────────────────────────────
/**
 * A direct or nested child of StaggerContainer.
 * Inherits the stagger trigger from the parent container.
 * Do NOT set initial/animate/whileInView — inherited from parent.
 */
const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0, 1] },
  },
};

export function StaggerItem({
  children,
  className = "",
}: Omit<BaseProps, "delay">) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
