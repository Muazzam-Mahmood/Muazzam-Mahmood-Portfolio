/**
 * @file layout.tsx
 * @description Root layout — wraps every page with global styles, metadata,
 *              and the persistent Navbar. Fonts are loaded via @import in
 *              globals.css. The Navbar lives here so it persists across all
 *              routes without re-mounting.
 */

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_METADATA } from "@/lib/site-config";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.name}`,
  },
  description: SITE_METADATA.description,
  keywords: [
    "Muazzam Mahmood",
    "Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "FAST NUCES",
    "Web Development",
  ],
  authors: [{ name: SITE_METADATA.name }],
  creator: SITE_METADATA.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.siteUrl,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: SITE_METADATA.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    creator: "@MuazzamMahmood",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" style={{ colorScheme: "dark" }} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">
        {/* Navbar persists across all routes — no re-mount on navigation */}
        <Navbar />
        {/* 68px top padding compensates for the fixed navbar height */}
        <main style={{ paddingTop: "68px", flex: 1 }}>{children}</main>
        {/* Footer persists across all routes — mirrors Navbar pattern */}
        <Footer />
      </body>
    </html>
  );
}
