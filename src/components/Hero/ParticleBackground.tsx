/**
 * @file components/Hero/ParticleBackground.tsx
 * @description Client-side tsParticles canvas — rendered exclusively inside
 *              the Hero section. Kept as its own component following SRP:
 *              - This file owns particle config + initialisation only.
 *              - Hero.tsx owns layout / content — zero coupling.
 *
 *  Principles
 *  ─────────────────────────────────────────────────────────────
 *  SRP   — one responsibility: render the particle canvas.
 *  OCP   — config object is isolated; tweak values without touching JSX.
 *  DRY   — colours reference CSS custom-property values (same palette
 *           used everywhere in the app).
 *  Clean — 'use client' required because canvas is browser-only;
 *           Next.js App Router renders server-side by default.
 */

"use client";

import { useCallback, memo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

// ─── Particle Config ──────────────────────────────────────────────────────────
// Isolated as a constant so the component body stays clean (OCP / readability).

const PARTICLE_OPTIONS = {
  fullScreen: { enable: false }, // scoped to parent — NOT full-page overlay
  background: {
    color: { value: "transparent" }, // hero background handles its own colour
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 90,
      density: { enable: true, area: 900 },
    },
    color: {
      // Dual-tone: violet (primary) + cyan (secondary) — matches brand palette
      value: ["#7C3AED", "#06B6D4", "#A78BFA"],
    },
    links: {
      enable: true,
      color: "#7C3AED",
      opacity: 0.18,
      distance: 130,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.9,          // slow drift — calm, not distracting
      direction: "none" as const,
      outModes: { default: "bounce" as const },
      random: true,
      straight: false,
    },
    opacity: {
      value: { min: 0.2, max: 0.6 },
      animation: { enable: true, speed: 0.8, minimumValue: 0.1 },
    },
    size: {
      value: { min: 1, max: 3 },
      animation: { enable: true, speed: 2, minimumValue: 0.5 },
    },
    shape: { type: "circle" },
  },
  interactivity: {
    detectsOn: "canvas" as const,
    events: {
      onHover: {
        enable: true,
        mode: "attract",   // particles glide toward the mouse cursor
      },
      onClick: {
        enable: true,
        mode: "push",      // click spawns a burst of new particles
      },
      resize: true,
    },
    modes: {
      attract: {
        distance: 180,
        duration: 0.4,
        speed: 2,
      },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * memo() — prevents re-render whenever the parent (Hero) re-renders.
 * The init callback is also memoised with useCallback for the same reason.
 */
const ParticleBackground = memo(function ParticleBackground() {
  const init = useCallback(async (engine: Engine) => {
    // loadSlim ships only what we need — ~30 % smaller than the full bundle.
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="hero-particles"
      init={init}
      // Fill the entire hero section; positioned absolute by the wrapper below
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
      options={PARTICLE_OPTIONS as never}
    />
  );
});

export default ParticleBackground;
