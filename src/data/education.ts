/**
 * @file education.ts
 * @description Education history as a typed array.
 *              Decoupled from UI — the Education section component imports
 *              from here, never hardcodes values inline.
 */

import type { Education } from "@/types";

// ─── Education Data ───────────────────────────────────────────────────────────

export const EDUCATION: Education[] = [
  {
    institution: "FAST-NUCES",
    degree: "Bachelor of Science",
    field: "Software Engineering (BS-SE)",
    startYear: 2024,
    endYear: 2028,
    current: true,
    location: "Lahore, Pakistan",
    description:
      "Pursuing a Bachelor's in Software Engineering with a focus on full-stack web development, data structures, algorithms, database systems, and software design principles. Actively building real-world projects to complement academic learning.",
  },
  {
    institution: "The Punjab College",
    degree: "Intermediate",
    field: "Pre-Engineering (FSc)",
    startYear: 2022,
    endYear: 2024,
    current: false,
    location: "Lahore, Pakistan",
    description:
      "Completed Intermediate in Pre-Engineering with a strong foundation in Mathematics, Physics, and Computer Science, preparing for a career in Software Engineering.",
  },
  {
    institution: "The Punjab School",
    degree: "Matriculation",
    field: "Science",
    startYear: 2010,
    endYear: 2022,
    current: false,
    location: "Lahore, Pakistan",
    description:
      "Completed Matriculation with a focus on Science subjects, building core analytical and problem-solving skills.",
  },
];

