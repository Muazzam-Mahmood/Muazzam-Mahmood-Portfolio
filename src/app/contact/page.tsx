/**
 * @file app/contact/page.tsx
 * @description Contact page — renders the Contact section component.
 */

import type { Metadata } from "next";
import Contact from "@/components/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Muazzam Mahmood — open for collaborations, internships, and project opportunities.",
};

export default function ContactPage() {
  return <Contact />;
}
