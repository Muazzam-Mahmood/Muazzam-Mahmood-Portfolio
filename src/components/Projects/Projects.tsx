/**
 * @file components/Projects/Projects.tsx
 * @description Projects section with animated tag filter.
 *              - Tag filter pills (All + unique tags from PROJECTS)
 *              - AnimatePresence on grid: cross-fades on tag change
 *              - StaggerContainer drives ProjectCard entrance sequence
 *              - Derived tag list is sorted and deduplicated automatically
 */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import type { ProjectTag } from "@/types";
import { FadeIn, StaggerContainer } from "@/components/motion";
import ProjectCard from "./ProjectCard";

// Build deduplicated, sorted tag list from data
const ALL_TAGS: string[] = [
  "All",
  ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort(),
];

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const visible =
    activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeTag as ProjectTag));

  return (
    <section
      style={{
        backgroundColor: "var(--color-surface)",
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
              Work
            </p>
            <h2 className="section-title">Projects</h2>
            <div className="section-divider" />
          </div>
        </FadeIn>

        {/* ── Tag Filter Pills ── */}
        <FadeIn delay={0.1}>
          <div
            role="tablist"
            aria-label="Project tag filter"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.45rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            {ALL_TAGS.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <motion.button
                  key={tag}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTag(tag)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.8rem",
                    fontWeight: isActive ? 600 : 400,
                    background: isActive
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                      : "var(--color-card)",
                    color: isActive ? "#fff" : "var(--color-text-muted)",
                    border: isActive
                      ? "1px solid transparent"
                      : "1px solid var(--color-border)",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s",
                  }}
                >
                  {tag}
                </motion.button>
              );
            })}
          </div>
        </FadeIn>

        {/* ── Projects Grid with AnimatePresence ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0, 1] }}
          >
            {visible.length > 0 ? (
              <StaggerContainer className="projects-grid">
                {visible.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </StaggerContainer>
            ) : (
              // Empty state
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: "center",
                  padding: "4rem 1.5rem",
                  color: "var(--color-text-muted)",
                  fontSize: "0.9rem",
                }}
              >
                No projects found for this filter.
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── GitHub CTA ── */}
        <FadeIn delay={0.2}>
          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <motion.a
              href="https://github.com/Muazzam-Mahmood"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(124, 58, 237, 0.5)",
                color: "var(--color-text)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                background: "transparent",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "border-color 0.25s, color 0.25s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              View all repos on GitHub
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
