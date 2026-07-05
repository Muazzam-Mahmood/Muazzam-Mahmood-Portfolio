/**
 * @file Navbar.tsx
 * @description Responsive glassmorphism navbar — multi-page variant.
 *              - Scroll-aware: opacity increases after 64px scroll
 *              - Active route detection via usePathname()
 *              - Animated active-link pill with layoutId (Framer Motion)
 *              - Mobile hamburger with AnimatePresence slide-down menu
 *              - Uses Next.js <Link> for real route navigation (no hash-scroll)
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { NAV_ITEMS } from "@/lib/site-config";

const EASE = [0.25, 0.1, 0, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // ── Scroll-aware background ───────────────────────────────────────────────
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 64);
  });

  // ── Determine the active nav item by exact or prefix match ────────────────
  /**
   * Home ("/") requires exact match to avoid matching every route.
   * All other items use exact path equality.
   */
  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* ── Main Nav Bar ── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(8, 8, 16, 0.88)" : "rgba(8, 8, 16, 0)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
          transition: "background 0.35s, backdrop-filter 0.35s, border-color 0.35s",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "68px",
          }}
        >
          {/* ── Logo ── */}
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "1px" }}
              aria-label="Home"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  color: "var(--color-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                M
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  color: "var(--color-secondary)",
                  letterSpacing: "-0.02em",
                }}
              >
                M
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 400,
                  fontSize: "1.1rem",
                  color: "var(--color-text-faint)",
                }}
              >
                .
              </span>
            </Link>
          </motion.div>

          {/* ── Desktop Links ── */}
          <div className="nav-desktop-links">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.href}
                  whileHover={{
                    y: -1,
                    boxShadow: "0 0 18px rgba(124, 58, 237, 0.35)",
                  }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0, 1] }}
                  style={{ position: "relative", borderRadius: "var(--radius-md)" }}
                >
                  <Link
                    href={item.href}
                    style={{
                      display: "block",
                      position: "relative",
                      padding: "0.4rem 0.9rem",
                      fontSize: "0.875rem",
                      fontWeight: active ? 600 : 400,
                      color: active
                        ? "var(--color-text)"
                        : "var(--color-text-muted)",
                      textDecoration: "none",
                      borderRadius: "var(--radius-md)",
                      transition: "color 0.2s",
                    }}
                  >
                    {/* Active pill — shared layoutId for smooth transition */}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "var(--radius-md)",
                          background: "rgba(124, 58, 237, 0.12)",
                          border: "1px solid rgba(124, 58, 237, 0.3)",
                          zIndex: -1,
                        }}
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.4,
                        }}
                      />
                    )}
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ── Hamburger Button (mobile only) ── */}
          <motion.button
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="nav-hamburger-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  mobileOpen
                    ? {
                        rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                        y: i === 0 ? 7 : i === 2 ? -7 : 0,
                        opacity: i === 1 ? 0 : 1,
                      }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.25 }}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--color-text)",
                  borderRadius: "2px",
                  transformOrigin: "center",
                }}
              />
            ))}
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile Slide-down Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              position: "fixed",
              top: "68px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(8, 8, 16, 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--color-border)",
              overflow: "hidden",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.08 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "1rem 1.5rem",
                    color: isActive(item.href)
                      ? "var(--color-primary)"
                      : "var(--color-text-muted)",
                    textDecoration: "none",
                    fontSize: "0.925rem",
                    fontWeight: isActive(item.href) ? 600 : 400,
                    borderBottom: "1px solid var(--color-border)",
                    transition: "color 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
