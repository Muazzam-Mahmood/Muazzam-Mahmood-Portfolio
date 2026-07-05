/**
 * @file components/Projects/ProjectCard.tsx
 * @description Individual project card with glassmorphism style.
 *              - Top gradient accent bar (violet → cyan)
 *              - Featured badge (amber) when project.featured === true
 *              - Tag badges in secondary (cyan) tones
 *              - GitHub + Live Demo links with icons
 *              - Hover: lift 6px + violet glow shadow
 *              - Wrapped in StaggerItem to participate in parent stagger
 */
"use client";

import { motion } from "framer-motion";
import { StaggerItem } from "@/components/motion";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    // StaggerItem handles the scroll-triggered stagger entrance
    <StaggerItem>
      <motion.div
        whileHover={{
          y: -7,
          boxShadow: "0 20px 56px rgba(124, 58, 237, 0.22)",
        }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0, 1] }}
        style={{
          position: "relative",
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          padding: "1.5rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "border-color 0.25s",
        }}
        className="project-card-hover"
      >
        {/* Top accent gradient bar */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
          }}
        />

        {/* Featured badge */}
        {project.featured && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              marginBottom: "0.85rem",
              padding: "0.2rem 0.65rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.28)",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "var(--color-accent)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              width: "fit-content",
            }}
          >
            <span aria-hidden="true">★</span>
            Featured
          </span>
        )}

        {/* Project title */}
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "0.75rem",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.865rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.75,
            marginBottom: "1.25rem",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "1.25rem",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(6, 182, 212, 0.07)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                fontSize: "0.7rem",
                color: "var(--color-secondary)",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <motion.a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: "var(--color-primary)" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.38rem",
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <GithubIcon />
            Code
          </motion.a>

          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: "var(--color-secondary)" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.38rem",
                fontSize: "0.8rem",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalIcon />
              Live Demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </StaggerItem>
  );
}

// ─── Inline Icons ─────────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
