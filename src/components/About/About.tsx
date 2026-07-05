/**
 * @file components/About/About.tsx
 * @description About section — two-column layout.
 *              Left: profile photo with glow + decorative border.
 *              Right: bio paragraphs, tech stack badges, stats grid.
 *
 * Profile photo: place your image at /public/profile.jpg
 * The <Image> src is "/profile.jpg" — Next.js serves from /public automatically.
 *
 * No section id needed — this component lives on its own route (/about).
 */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_METADATA, ABOUT_STATS } from "@/lib/site-config";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/motion";

// Tech stack to highlight in the About section (subset of full skills list)
const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Express",
  "JavaScript",
  "PostgreSQL",
];

export default function About() {
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
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
              About
            </p>
            <h2 className="section-title">About Me</h2>
            <div className="section-divider" />
          </div>
        </FadeIn>

        {/* ── Two-Column Grid ── */}
        <div className="about-grid">
          {/* ── Left: Profile Photo ── */}
          <SlideIn direction="left">
            <div className="profile-photo-wrapper">
              {/* Glow halo */}
              <div className="profile-photo-glow" aria-hidden="true" />
              {/* Corner accent squares */}
              <div className="photo-corner photo-corner-tl" aria-hidden="true" />
              <div className="photo-corner photo-corner-br" aria-hidden="true" />
              {/* Photo frame */}
              <div className="profile-photo-frame">
                <Image
                  src="/profile.jpg"
                  alt={`${SITE_METADATA.name} — profile photo`}
                  width={360}
                  height={420}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "var(--radius-lg)",
                    display: "block",
                  }}
                  priority
                />
              </div>
            </div>
          </SlideIn>

          {/* ── Right: Bio + Stack + Stats ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Bio */}
            <SlideIn direction="right">
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    lineHeight: 1.85,
                    fontSize: "0.97rem",
                  }}
                >
                  I&apos;m a{" "}
                  <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                    Software Engineering student at FAST-NUCES, Lahore
                  </strong>{" "}
                  (2024-2028), passionate about crafting modern, full-stack
                  web applications that solve real-world problems.
                </p>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    lineHeight: 1.85,
                    fontSize: "0.97rem",
                  }}
                >
                  I thrive at the intersection of{" "}
                  <span style={{ color: "var(--color-primary)", fontWeight: 500 }}>
                    clean architecture
                  </span>{" "}
                  and{" "}
                  <span style={{ color: "var(--color-secondary)", fontWeight: 500 }}>
                    polished UI
                  </span>{" "}
                 ,from designing scalable backend APIs to building pixel-perfect,
                  responsive front ends.
                </p>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    lineHeight: 1.85,
                    fontSize: "0.97rem",
                  }}
                >
                  When I&apos;m not coding, I&apos;m exploring new technologies,
                  building side projects, and constantly levelling up my skills.
                </p>
              </div>
            </SlideIn>

            {/* Tech Stack Badges */}
            <SlideIn direction="right" delay={0.08}>
              <div>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--color-text-faint)",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "0.75rem",
                  }}
                >
                  Tech Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {TECH_STACK.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{
                        scale: 1.06,
                        borderColor: "rgba(124, 58, 237, 0.5)",
                        color: "var(--color-text)",
                      }}
                      style={{
                        padding: "0.3rem 0.8rem",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(124, 58, 237, 0.07)",
                        border: "1px solid rgba(124, 58, 237, 0.18)",
                        fontSize: "0.8rem",
                        color: "var(--color-text-muted)",
                        fontFamily: "var(--font-mono)",
                        cursor: "default",
                        transition: "border-color 0.2s, color 0.2s",
                        userSelect: "none",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </SlideIn>

            {/* Stats Grid */}
            <StaggerContainer className="stats-grid">
              {ABOUT_STATS.map((stat) => (
                <StaggerItem key={stat.label}>
                  <motion.div
                    whileHover={{
                      borderColor: "rgba(124, 58, 237, 0.35)",
                      boxShadow: "0 4px 24px rgba(124, 58, 237, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="stat-card"
                  >
                    <span className="stat-value gradient-text">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
