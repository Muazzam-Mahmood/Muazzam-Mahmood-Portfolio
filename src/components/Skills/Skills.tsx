/**
 * @file components/Skills/Skills.tsx
 * @description Skills section with animated category tab filter.
 *              - Tab filter: All | Languages | Frontend | Backend | Tools & Platforms
 *              - AnimatePresence on grid: fade/slide out old → in new on tab change
 *              - StaggerContainer staggers SkillCard entrance on scroll
 */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES } from "@/data/skills";
import { FadeIn, StaggerContainer } from "@/components/motion";
import SkillCard from "./SkillCard";

const TABS = ["All", ...SKILL_CATEGORIES.map((c) => c.category)];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All");

  const visible =
    activeTab === "All"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === activeTab);

  return (
    <section
      style={{
        backgroundColor: "var(--color-base)",
        padding: "4rem 1.5rem 6rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Section Header ── */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-secondary)",
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              Skills
            </p>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-divider" />
          </div>
        </FadeIn>

        {/* ── Category Tab Filter ── */}
        <FadeIn delay={0.1}>
          <div
            role="tablist"
            aria-label="Skill category filter"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <motion.button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    position: "relative",
                    padding: "0.48rem 1.2rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 600 : 400,
                    background: isActive
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                      : "var(--color-surface)",
                    color: isActive ? "#fff" : "var(--color-text-muted)",
                    border: isActive
                      ? "1px solid transparent"
                      : "1px solid var(--color-border)",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s",
                  }}
                >
                  {tab}
                </motion.button>
              );
            })}
          </div>
        </FadeIn>

        {/* ── Skill Cards Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0, 1] }}
          >
            <StaggerContainer className="skills-grid">
              {visible.map((category) => (
                <SkillCard key={category.category} category={category} />
              ))}
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
