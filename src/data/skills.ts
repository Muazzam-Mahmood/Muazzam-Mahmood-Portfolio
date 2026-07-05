/**
 * @file skills.ts
 * @description Skills data grouped by category as a typed array.
 *              Proficiency values (0–100) drive the progress bar rendering
 *              in the Skills section. Data is decoupled from all UI concerns.
 */

import type { SkillCategory } from "@/types";

// ─── Skills Data ──────────────────────────────────────────────────────────────

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      {
        name: "C++",
        level: "intermediate",
        proficiency: 70,
        icon: "cpp",
      },
      {
        name: "JavaScript",
        level: "advanced",
        proficiency: 85,
        icon: "javascript",
      },
      {
        name: "TypeScript",
        level: "intermediate",
        proficiency: 65,
        icon: "typescript",
      },
      {
        name: "HTML",
        level: "advanced",
        proficiency: 90,
        icon: "html",
      },
      {
        name: "CSS",
        level: "advanced",
        proficiency: 85,
        icon: "css",
      },
    ],
  },
  {
    category: "Frontend",
    skills: [
      {
        name: "React.js",
        level: "advanced",
        proficiency: 80,
        icon: "react",
      },
      {
        name: "Next.js",
        level: "intermediate",
        proficiency: 70,
        icon: "nextjs",
      },
      {
        name: "Tailwind CSS",
        level: "advanced",
        proficiency: 85,
        icon: "tailwind",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        level: "intermediate",
        proficiency: 70,
        icon: "nodejs",
      },
      {
        name: "Express.js",
        level: "intermediate",
        proficiency: 65,
        icon: "express",
      },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      {
        name: "Git",
        level: "intermediate",
        proficiency: 72,
        icon: "git",
      },
      {
        name: "GitHub",
        level: "intermediate",
        proficiency: 75,
        icon: "github",
      },
      {
        name: "VS Code",
        level: "advanced",
        proficiency: 90,
        icon: "vscode",
      },
      {
        name: "Netlify",
        level: "intermediate",
        proficiency: 65,
        icon: "netlify",
      },
    ],
  },
];

// ─── All Skills (flat list — useful for filtering / searching) ─────────────────

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap(
  (category) => category.skills
);
