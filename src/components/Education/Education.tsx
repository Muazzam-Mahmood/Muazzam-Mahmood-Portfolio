/**
 * @file components/Education/Education.tsx
 * @description Education section rendered as an animated vertical timeline.
 *              - Animated dot (spring scale) on scroll enter
 *              - Gradient timeline line from dot downward
 *              - Content card with hover slide-right micro-animation
 *              - Extensible: add more entries to EDUCATION data array
 */
"use client";

import { motion } from "framer-motion";
import { EDUCATION } from "@/data/education";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export default function Education() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-base)",
        padding: "4rem 1.5rem 6rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
              Education
            </p>
            <h2 className="section-title">Education</h2>
            <div className="section-divider" />
          </div>
        </FadeIn>

        {/* ── Timeline ── */}
        <StaggerContainer>
          {EDUCATION.map((edu, i) => (
            <StaggerItem key={`${edu.institution}-${i}`}>
              <div className="timeline-item">
                {/* ── Connector (dot + line) ── */}
                <div className="timeline-connector">
                  <motion.div
                    className="timeline-dot"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                      delay: 0.15,
                    }}
                  />
                  {/* Line only shown if there are more entries below */}
                  {i < EDUCATION.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>

                {/* ── Content Card ── */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0, 1] }}
                  className="timeline-content"
                >
                  {/* Header row: institution name + status badge */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--color-text)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {edu.institution}
                    </h3>
                    <span
                      style={{
                        padding: "0.2rem 0.65rem",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        background: edu.current
                          ? "rgba(34, 197, 94, 0.1)"
                          : "rgba(148, 163, 184, 0.08)",
                        border: `1px solid ${
                          edu.current
                            ? "rgba(34, 197, 94, 0.3)"
                            : "var(--color-border)"
                        }`,
                        color: edu.current
                          ? "var(--color-success)"
                          : "var(--color-text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {edu.current ? "● Currently Enrolled" : `${edu.startYear}–${edu.endYear}`}
                    </span>
                  </div>

                  {/* Degree */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {edu.degree} — {edu.field}
                  </p>

                  {/* Location & years */}
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                      fontFamily: "var(--font-mono)",
                      marginBottom: edu.description ? "1rem" : 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span aria-hidden="true">📍</span>
                    {edu.location} · {edu.startYear}–{edu.endYear}
                  </p>

                  {/* Description */}
                  {edu.description && (
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.78,
                      }}
                    >
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
