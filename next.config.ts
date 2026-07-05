/**
 * @file next.config.ts
 * @description Next.js configuration with HTTP security headers.
 *              Headers apply to every route via the catch-all matcher.
 *              CSP allows: self, Google Fonts, inline styles (framer-motion).
 */

import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Scripts: only same-origin (Next.js chunks)
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  // Styles: same-origin + Google Fonts + inline (Framer Motion injects inline styles)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Fonts: same-origin + Google Fonts CDN
  "font-src 'self' https://fonts.gstatic.com",
  // Images: same-origin + data URIs (Next.js Image optimisation)
  "img-src 'self' data: blob:",
  // Connections: same-origin only (no external API calls)
  "connect-src 'self'",
  // Prevent embedding in iframes (belt-and-suspenders alongside X-Frame-Options)
  "frame-ancestors 'none'",
  // No plugins (Flash, etc.)
  "object-src 'none'",
  // Upgrade insecure requests in production
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to every route
        source: "/(.*)",
        headers: [
          // ── Clickjacking protection ──────────────────────────────────────
          { key: "X-Frame-Options", value: "DENY" },
          // ── MIME-type sniffing protection ────────────────────────────────
          { key: "X-Content-Type-Options", value: "nosniff" },
          // ── Legacy XSS protection (browsers that pre-date CSP) ───────────
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // ── Referrer leakage control ─────────────────────────────────────
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // ── Browser feature permissions ──────────────────────────────────
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // ── Content Security Policy ──────────────────────────────────────
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
