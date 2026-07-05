/**
 * @file Footer.tsx
 * @description Portfolio footer — copyright, quick-nav, and social links.
 *
 *  Principles applied
 *  ─────────────────────────────────────────────────────────────────────────
 *  • SRP   — FooterSocials and FooterNav are separate named components,
 *            each responsible for one concern.
 *  • DRY   — all content (name, links, socials) is pulled from site-config.ts.
 *  • OCP   — adding a new social platform only requires updating site-config.ts
 *            and ICONS; nothing else changes.
 *  • Clean — CSS Module keeps styles scoped; no inline styles except one-offs.
 */

import type { FC, ReactElement } from "react";
import Link from "next/link";
import { SITE_METADATA, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/site-config";
import type { SocialLink, NavItem } from "@/types";
import styles from "./Footer.module.css";

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const ICONS: Record<string, ReactElement> = {
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  ),
};

// ─── FooterSocials ────────────────────────────────────────────────────────────

interface FooterSocialsProps {
  links: SocialLink[];
}

const FooterSocials: FC<FooterSocialsProps> = ({ links }) => (
  <nav className={styles.socials} aria-label="Social media links">
    {links.map(({ platform, label, url }) => (
      <a
        key={platform}
        href={url}
        target={platform !== "email" ? "_blank" : undefined}
        rel={platform !== "email" ? "noopener noreferrer" : undefined}
        className={styles.socialLink}
        aria-label={label}
        title={label}
      >
        {ICONS[platform] ?? null}
      </a>
    ))}
  </nav>
);

// ─── FooterNav ────────────────────────────────────────────────────────────────

interface FooterNavProps {
  items: NavItem[];
}

const FooterNav: FC<FooterNavProps> = ({ items }) => (
  <nav className={styles.quickNav} aria-label="Footer navigation">
    <h3 className={styles.navHeading}>Quick Links</h3>
    <ul className={styles.navList} role="list">
      {items.map(({ label, href }) => (
        <li key={href}>
          <Link href={href} className={styles.navLink}>
            <span className={styles.navLinkArrow} aria-hidden="true">›</span>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label="Site footer">
      {/* Top gradient divider */}
      <div className={styles.topDivider} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Brand Column ── */}
        <div className={styles.brand}>
          <Link href="/" className={styles.brandName} aria-label="Go to homepage">
            <span className="gradient-text">{SITE_METADATA.name}</span>
          </Link>
          <p className={styles.tagline}>{SITE_METADATA.tagline}</p>
          <FooterSocials links={SOCIAL_LINKS} />
        </div>

        {/* ── Quick Navigation ── */}
        <FooterNav items={NAV_ITEMS} />
      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy;&nbsp;{year}&nbsp;
          <span className="gradient-text" style={{ fontWeight: 600 }}>
            {SITE_METADATA.name}
          </span>
          &nbsp;— All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
