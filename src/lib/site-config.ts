/**
 * @file site-config.ts
 * @description Portfolio site configuration — single source of truth for all
 *              static personal data and content. Importing from here (not
 *              hardcoding inline) follows the DRY principle and makes updates
 *              trivial: change a value once, reflected everywhere.
 */

import type { NavItem, SiteMetadata, SocialLink, AboutStat } from "@/types";

// ─── Site Metadata ────────────────────────────────────────────────────────────

export const SITE_METADATA: SiteMetadata = {
  name: "Muazzam Mahmood",
  title: "Muazzam Mahmood — Software Engineer",
  tagline: "Building modern web experiences with clean, scalable code.",
  description:
    "Portfolio of Muazzam Mahmood — a Software Engineering student at FAST-NUCES passionate about full-stack web development, clean architecture, and building real-world products.",
  email: "muazzamm024@gmail.com",
  githubUsername: "Muazzam-Mahmood",
  siteUrl: "https://muazzam-mahmood.netlify.app",
  resumeUrl: "/Muazzam_Mahmood_Resume.pdf",
};

// ─── Navigation Items ─────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Education", href: "/education" },
  { label: "Skills",    href: "/skills" },
  { label: "Projects",  href: "/projects" },
  { label: "Contact",   href: "/contact" },
];

// ─── Social Links ─────────────────────────────────────────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: `https://github.com/${SITE_METADATA.githubUsername}`,
    icon: "github",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/muazzam-mahmood/",
    icon: "linkedin",
  },
  {
    platform: "email",
    label: "Email",
    url: `mailto:${SITE_METADATA.email}`,
    icon: "email",
  },
];

// ─── Hero Roles (used for typewriter animation) ───────────────────────────────

export const HERO_ROLES: string[] = [
  "Software Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "React Developer",
  "Next.js Developer",
  "Solution Developer",
  "Problem Solver",
];

// ─── Stats (About section) ────────────────────────────────────────────────────

export const ABOUT_STATS: AboutStat[] = [
  { label: "Projects Built", value: "8+" },
  { label: "GitHub Repos", value: "8+" },
  { label: "Technologies", value: "10+" },
  { label: "Year of Study", value: "3rd" },
];
