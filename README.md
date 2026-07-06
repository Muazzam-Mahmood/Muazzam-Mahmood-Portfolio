# Muazzam Mahmood — Portfolio

A modern, fully responsive **developer portfolio** built with Next.js, React, TypeScript, and Tailwind CSS. Designed to showcase projects, skills, and experience with a clean dark aesthetic and smooth animations.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | [Next.js 16](https://nextjs.org/) (App Router) |
| Language   | [TypeScript](https://www.typescriptlang.org/) — strict mode, zero `.js` files |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com/) with custom dark design tokens |
| Runtime    | [React 19](https://react.dev/)      |
| Linting    | ESLint + Next.js recommended rules  |
| Formatting | Prettier                            |
| Deployment | [Netlify](https://netlify.com/)     |

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Muazzam-Mahmood/internship-program.git
cd internship-program
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Project Structure

```
src/
├── app/              # Next.js App Router — pages & layouts
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Hero, About, Education, Skills, Projects, Contact
│   └── ui/           # Reusable atomic components (ProjectCard, SkillBadge…)
├── data/             # Static typed data (projects, skills, education)
├── hooks/            # Custom React hooks
├── lib/              # Constants & site-wide config
└── types/            # Shared TypeScript interfaces
```

> All data lives in `src/data/` — adding a project or skill requires **no component changes**, only a data file update.

---

## Code Quality

This project strictly follows software engineering principles:

- **SRP** — Each component has a single responsibility
- **DRY** — Shared types in `src/types/`, constants in `src/lib/constants.ts`
- **SoC** — Data, UI, logic, and API concerns are fully separated
- **OCP** — Reusable wrapper components extend behavior without modification

Run checks locally:

```bash
npm run lint        # ESLint — must return 0 errors
npx tsc --noEmit    # TypeScript — must return 0 errors
```

---

## Live Demo

🔗 **[muazzam-mahmood.netlify.app](https://muazzam-mahmood-portfolio.netlify.app)**

---

## Author

**Muazzam Mahmood**
- GitHub: [@Muazzam-Mahmood](https://github.com/Muazzam-Mahmood)
- LinkedIn: [muazzam-mahmood](https://www.linkedin.com/in/muazzam-mahmood/)
- Email: muazzamm024@gmail.com
