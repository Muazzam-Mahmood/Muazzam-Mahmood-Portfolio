/**
 * @file app/projects/page.tsx
 * @description Projects page — renders the Projects section component.
 */

import type { Metadata } from "next";
import Projects from "@/components/Projects/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Portfolio projects by Muazzam Mahmood — full-stack apps, frontend projects, and more.",
};

export default function ProjectsPage() {
  return <Projects />;
}
