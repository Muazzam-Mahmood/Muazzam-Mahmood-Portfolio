/**
 * @file projects.ts
 * @description All portfolio project data as a typed array.
 *              Data is intentionally separated from UI components (SoC).
 *              To add a project, append an entry here — no component changes needed.
 */

import type { Project } from "@/types";

// ─── Projects Data ────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: "vortx-game-store",
    title: "VORTX Online GameStore",
    description:
      "A database-driven platform that manages digital games, publishers, platforms, categories, pricing, and game listings. Provides a centralized system to store game details and automate operations like game listing, searching, and managing thumbnails and metadata.",
    tags: ["JavaScript", "Database", "Full Stack"],
    repoUrl: "https://github.com/Muazzam-Mahmood/VORTX-Online-GameStore",
    featured: true,
  },
  {
    id: "hotspot-qr-attendance",
    title: "Hotspot QR Attendance System",
    description:
      "A high-security local attendance system that completely eliminates proxy attendance by combining custom-duration expiring QR codes with Wi-Fi network proximity restrictions and hardware device (MAC address) locking.",
    tags: ["HTML", "JavaScript", "Full Stack"],
    repoUrl:
      "https://github.com/Muazzam-Mahmood/Hotspot-QR-Attendance-System",
    featured: true,
  },
  {
    id: "fast-student-facilitator",
    title: "FAST Student Facilitator",
    description:
      "A comprehensive student facilitator platform built for FAST-NUCES students. Features a React.js frontend for a modern, responsive UI and a Spring Boot (Java) backend for robust API services. Streamlines academic workflows, resource sharing, and student collaboration in one unified portal.",
    tags: ["Java", "JavaScript", "Full Stack"],
    repoUrl:
      "https://github.com/Muazzam-Mahmood/FAST-Student-Facilitator",
    liveUrl: "https://fast-student-facilitator.vercel.app",
    featured: true,
  },
  {
    id: "rozgar-e-resume",
    title: "Rozgar Pakistan E-Resume Builder",
    description:
      "A web portal designed to help Pakistani youth build professional resumes and apply for jobs. Empowers job seekers with an intuitive resume creation flow and modern templates.",
    tags: ["JavaScript", "Frontend", "HTML", "CSS"],
    repoUrl:
      "https://github.com/Muazzam-Mahmood/Rozgar-Pakistan-E-Resume-Builder",
    featured: false,
  },
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "A beautifully styled weather app featuring an animated glowing UI, real-time weather data from OpenWeatherMap API, smooth forecast scrolling, and a focus on design and lightweight performance.",
    tags: ["JavaScript", "API", "CSS", "Frontend"],
    repoUrl:
      "https://github.com/Muazzam-Mahmood/Weather-App-Web-Project",
    liveUrl: "https://muazzam-mahmood.github.io/Weather-App-Web-Project/",
    featured: false,
  },
  {
    id: "coffee-website",
    title: "Coffee Website",
    description:
      "A coffee-themed website showcasing a modern layout, responsive design, and simple interactivity. Built as a foundational step into web development and UI design.",
    tags: ["HTML", "CSS", "JavaScript", "Frontend"],
    repoUrl:
      "https://github.com/Muazzam-Mahmood/Coffee-Website-Web-Project",
    liveUrl:
      "https://muazzam-mahmood.github.io/Coffee-Website-Web-Project/",
    featured: false,
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    description:
      "An interactive Rock Paper Scissors web game developed with HTML, CSS, and JavaScript. Features smooth animations and a responsive game UI.",
    tags: ["JavaScript", "HTML", "CSS", "Frontend"],
    repoUrl:
      "https://github.com/Muazzam-Mahmood/rock-paper-scissors-js",
    liveUrl: "https://muazzam-mahmood.github.io/rock-paper-scissors-js/",
    featured: false,
  },
  {
    id: "currency-converter",
    title: "Currency Converter",
    description:
      "An interactive Currency Converter web app that fetches live exchange rates via a public API. Built with HTML, CSS, and JavaScript with a clean, intuitive interface.",
    tags: ["JavaScript", "API", "HTML", "CSS", "Frontend"],
    repoUrl:
      "https://github.com/Muazzam-Mahmood/currency-converter-js",
    liveUrl: "https://muazzam-mahmood.github.io/currency-converter-js/",
    featured: false,
  },
];

// ─── Featured Projects (used in hero / spotlight section) ─────────────────────

export const FEATURED_PROJECTS: Project[] = PROJECTS.filter(
  (project) => project.featured
);
