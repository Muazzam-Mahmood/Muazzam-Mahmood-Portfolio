/**
 * @file app/skills/page.tsx
 * @description Skills page — renders the Skills section component.
 */

import type { Metadata } from "next";
import Skills from "@/components/Skills/Skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Muazzam Mahmood's technical skills — JavaScript, TypeScript, React, Next.js, Node.js, and more.",
};

export default function SkillsPage() {
  return <Skills />;
}
