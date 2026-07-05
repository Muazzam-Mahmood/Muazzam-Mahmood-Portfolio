/**
 * @file components/Hero/Hero.tsx
 * @description Full-viewport hero section — multi-page variant.
 *              Navigation targets are now real routes, not scroll positions.
 *              - Three floating gradient orbs (infinite Framer Motion animation)
 *              - Subtle grid-pattern overlay (CSS)
 *              - Staggered letter-by-letter name entrance
 *              - TypewriterText for cycling roles
 *              - Two CTA buttons with hover glow
 *              - Social icon links with staggered entrance
 */
"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SITE_METADATA, SOCIAL_LINKS } from "@/lib/site-config";
import TypewriterText from "./TypewriterText";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.25, 0.1, 0, 1] as const;

// ─── Floating Orb ─────────────────────────────────────────────────────────────

interface OrbProps {
  size: number;
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: number;
  duration?: number;
}

function FloatingOrb({
  size,
  color,
  top,
  bottom,
  left,
  right,
  delay = 0,
  duration = 7,
}: OrbProps) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ y: [0, -22, 0], scale: [1, 1.06, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: "blur(90px)",
        pointerEvents: "none",
        opacity: 0.65,
        top,
        bottom,
        left,
        right,
      }}
    />
  );
}

// ─── Staggered Name Letters ────────────────────────────────────────────────────
/**
 * Splits text into words then animates letters within each word.
 * Each word is wrapped in a whiteSpace:nowrap span so the flex container
 * can only break between words — never inside a word.
 */
function AnimatedName({ text }: { text: string }) {
  const words = text.split(" ");

  // Cumulative letter count before each word — keeps stagger timing seamless
  const offsets = words.reduce<number[]>((acc, _word, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + words[i - 1].length);
    return acc;
  }, []);

  return (
    <span
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 0.35em",
        lineHeight: 1.1,
      }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: 0.45 + (offsets[wi] + ci) * 0.038,
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

// ─── Social Icon Map ──────────────────────────────────────────────────────────

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "github":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "email":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function Hero() {
  const router = useRouter();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 68px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--color-base)",
      }}
    >
      <ParticleBackground />
      {/* ── Background Orbs ── */}
      <FloatingOrb
        size={520}
        color="var(--color-primary-glow)"
        top="5%"
        left="-12%"
        delay={0}
        duration={8}
      />
      <FloatingOrb
        size={420}
        color="var(--color-secondary-glow)"
        top="25%"
        right="-10%"
        delay={2.5}
        duration={7}
      />
      <FloatingOrb
        size={300}
        color="rgba(245, 158, 11, 0.09)"
        bottom="12%"
        left="42%"
        delay={5}
        duration={9}
      />

      {/* ── Subtle Grid Overlay ── */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      {/* ── Main Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "4rem 1.5rem",
          maxWidth: "820px",
          width: "100%",
        }}
      >
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 1rem",
              borderRadius: "var(--radius-full)",
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.25)",
              fontSize: "0.82rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span style={{ fontSize: "1rem" }}>👋</span>
            Hi there, I&apos;m
          </span>
        </motion.div>

        {/* Name — staggered letters */}
        <h1
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            marginBottom: "1.25rem",
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
          }}
        >
          <AnimatedName text={SITE_METADATA.name} />
        </h1>

        {/* Typewriter roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.5 }}
          style={{
            fontSize: "clamp(1.15rem, 3.5vw, 1.75rem)",
            fontWeight: 600,
            marginBottom: "1.75rem",
            minHeight: "2.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TypewriterText />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.15 }}
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "var(--color-text-muted)",
            maxWidth: "560px",
            margin: "0 auto 2.75rem",
            lineHeight: 1.75,
          }}
        >
          {SITE_METADATA.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 1.35 }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "3.25rem",
          }}
        >
          {/* Primary CTA — navigate to /projects */}
          <motion.button
            onClick={() => router.push("/projects")}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 36px rgba(124, 58, 237, 0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.8rem 2rem",
              background: "linear-gradient(135deg, var(--color-primary), #5B21B6)",
              color: "#fff",
              borderRadius: "var(--radius-full)",
              fontWeight: 600,
              fontSize: "0.925rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
            }}
          >
            View Projects
            <span aria-hidden="true">→</span>
          </motion.button>

          {/* Resume CTA */}
          {SITE_METADATA.resumeUrl && (
            <motion.a
              href={SITE_METADATA.resumeUrl}
              download="Muazzam_Mahmood_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.04,
                borderColor: "rgba(124, 58, 237, 0.6)",
                color: "var(--color-text)",
                background: "rgba(124, 58, 237, 0.05)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem 2rem",
                background: "rgba(124, 58, 237, 0)",
                color: "var(--color-text-muted)",
                borderRadius: "var(--radius-full)",
                fontWeight: 600,
                fontSize: "0.925rem",
                textDecoration: "none",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                transition: "border-color 0.25s, color 0.25s, background-color 0.25s",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </motion.a>
          )}

          {/* Secondary CTA — GitHub */}
          <motion.a
            href={`https://github.com/${SITE_METADATA.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.04,
              borderColor: "rgba(124, 58, 237, 0.6)",
              color: "var(--color-text)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.8rem 2rem",
              background: "transparent",
              color: "var(--color-text-muted)",
              borderRadius: "var(--radius-full)",
              fontWeight: 600,
              fontSize: "0.925rem",
              textDecoration: "none",
              border: "1px solid var(--color-border)",
              cursor: "pointer",
              transition: "border-color 0.25s, color 0.25s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.85rem",
          }}
        >
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target={link.platform !== "email" ? "_blank" : undefined}
              rel={link.platform !== "email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.65 + i * 0.1, duration: 0.45 }}
              whileHover={{
                y: -4,
                borderColor: "rgba(124, 58, 237, 0.5)",
                color: "var(--color-primary)",
              }}
              aria-label={link.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "46px",
                height: "46px",
                borderRadius: "var(--radius-md)",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              <SocialIcon platform={link.platform} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
