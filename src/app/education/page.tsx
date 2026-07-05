/**
 * @file app/education/page.tsx
 * @description Education page — renders the Education section component.
 */

import type { Metadata } from "next";
import Education from "@/components/Education/Education";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Muazzam Mahmood's academic background — Software Engineering at FAST-NUCES, Lahore (2024–2028).",
};

export default function EducationPage() {
  return <Education />;
}
