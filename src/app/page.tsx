/**
 * @file app/page.tsx
 * @description Home page — renders the Hero section only.
 *              All other sections now live on their own routes.
 */

import type { Metadata } from "next";
import { SITE_METADATA } from "@/lib/site-config";
import Hero from "@/components/Hero/Hero";

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
};

export default function HomePage() {
  return <Hero />;
}
