/**
 * @file components/Skills/SkillBar.tsx
 * @description Animated skill progress bar.
 *              Width animates from 0 → proficiency% when the component enters viewport.
 *              Color is level-aware: advanced → cyan, intermediate → violet, beginner → amber.
 */
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Skill } from "@/types";

// ─── Level → Color Map ────────────────────────────────────────────────────────
const LEVEL_COLOR: Record<Skill["level"], string> = {
  advanced: "var(--color-secondary)",      // Cyan
  intermediate: "var(--color-primary)",    // Violet
  beginner: "var(--color-accent)",         // Amber
};

interface SkillBarProps {
  skill: Skill;
}

export default function SkillBar({ skill }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger once when the bar row enters the viewport
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const color = LEVEL_COLOR[skill.level];

  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.45rem",
        }}
      >
        <span
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text)",
            fontWeight: 500,
          }}
        >
          {skill.name}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Level badge */}
          <span
            style={{
              fontSize: "0.68rem",
              padding: "0.15rem 0.5rem",
              borderRadius: "var(--radius-full)",
              background: `${color}18`,
              border: `1px solid ${color}35`,
              color,
              fontFamily: "var(--font-mono)",
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          >
            {skill.level}
          </span>
          {/* Percentage */}
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
              minWidth: "2.5rem",
              textAlign: "right",
            }}
          >
            {skill.proficiency}%
          </span>
        </div>
      </div>

      {/* Track */}
      <div
        style={{
          height: "6px",
          borderRadius: "var(--radius-full)",
          background: "var(--color-border)",
          overflow: "hidden",
        }}
      >
        {/* Animated fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.proficiency}%` : 0 }}
          transition={{
            duration: 1.25,
            ease: [0.25, 0.1, 0, 1],
            delay: 0.15,
          }}
          style={{
            height: "100%",
            borderRadius: "var(--radius-full)",
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}
