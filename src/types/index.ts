/**
 * @file index.ts
 * @description Shared TypeScript interfaces and types for the portfolio site.
 *              All data shapes are defined here (Single Responsibility — types
 *              are not co-located with UI components or data files).
 */

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

// ─── Social Links ─────────────────────────────────────────────────────────────

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "twitter"
  | "instagram";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
  /** Icon name used to resolve the correct SVG icon component */
  icon: SocialPlatform;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectTag =
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Node.js"
  | "Express"
  | "HTML"
  | "CSS"
  | "Tailwind CSS"
  | "Java"
  | "C++"
  | "Database"
  | "API"
  | "Full Stack"
  | "Frontend";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  /** GitHub repository URL — always present */
  repoUrl: string;
  /** Deployed live URL — undefined if not deployed */
  liveUrl?: string;
  /** Whether this project is pinned/featured at the top */
  featured: boolean;
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Percentage 0–100 used for skill bar rendering */
  proficiency: number;
  /** Icon identifier to resolve the correct SVG */
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// ─── Education ────────────────────────────────────────────────────────────────

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  /** True if currently enrolled */
  current: boolean;
  description?: string;
  /** Short location string e.g. "Lahore, Pakistan" */
  location: string;
}

// ─── Site Metadata ────────────────────────────────────────────────────────────

export interface SiteMetadata {
  name: string;
  title: string;
  tagline: string;
  description: string;
  email: string;
  githubUsername: string;
  siteUrl: string;
  resumeUrl?: string;
}

// ─── About Stats ──────────────────────────────────────────────────────────────

export interface AboutStat {
  label: string;
  value: string;
}
