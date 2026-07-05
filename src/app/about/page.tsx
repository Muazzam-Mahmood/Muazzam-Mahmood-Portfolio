/**
 * @file app/about/page.tsx
 * @description About page — renders the About section component.
 */

import type { Metadata } from "next";
import About from "@/components/About/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Muazzam Mahmood — a Software Engineering student at FAST-NUCES, Lahore, passionate about full-stack web development and clean architecture.",
};

export default function AboutPage() {
  return <About />;
}
