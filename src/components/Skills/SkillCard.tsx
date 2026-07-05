/**
 * @file components/Skills/SkillCard.tsx
 * @description Glassmorphism card for a single skill category.
 *              - Wraps itself in StaggerItem to participate in parent stagger
 *              - Hover: lift (y: -4) + violet glow shadow
 *              - Renders all skills in the category as SkillBar components
 */
"use client";

import { motion } from "framer-motion";
import type { SkillCategory } from "@/types";
import SkillBar from "./SkillBar";
import { StaggerItem } from "@/components/motion";

interface SkillCardProps {
  category: SkillCategory;
}

export default function SkillCard({ category }: SkillCardProps) {
  return (
    // StaggerItem: handles staggered scroll entrance (from parent StaggerContainer)
    <StaggerItem>
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0 12px 40px rgba(124, 58, 237, 0.18)",
        }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0, 1] }}
        style={{
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem",
          height: "100%",
          transition: "border-color 0.2s",
        }}
        className="skill-card-hover"
      >
        {/* Category label */}
        <h3
          style={{
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--color-secondary)",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "1.25rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {category.category}
        </h3>

        {/* Skill bars */}
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </StaggerItem>
  );
}
