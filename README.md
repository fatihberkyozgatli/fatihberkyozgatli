# fatihOS

Interactive portfolio platform built with Next.js, TypeScript, and modern full-stack architecture.
Designed as both a technical showcase and creative development environment.

**Live:** [fatihberkyozgatli.com](https://fatihberkyozgatli.com)

---

## What is fatihOS?

fatihOS is an operating-system-inspired portfolio platform built to showcase full-stack engineering, UI/UX design, and modern web architecture.

Features include:

- Command palette navigation
- Terminal-inspired boot sequence
- Dynamic theming system
- Interactive project showcase
- Real-time contact integration
- Specialized integrated applications

---

## Architecture

### Core Platform (`./frontend`)

The foundation of fatihOS built with Next.js 16, leveraging modern React patterns and server-side rendering for optimal performance.

**Technology:**
Next.js • React • TypeScript • Tailwind CSS • Framer Motion • shadcn/ui

**Key Features:**
- Server-side rendering for SEO optimization
- Dynamic route handling for projects and events
- API routes for contact form processing
- Responsive grid-based layouts
- Dark-first design philosophy

### Integrated Ecosystem

The platform hosts specialized applications that extend core functionality:

**Data Management System** - Admin dashboard for system administration and data configuration

**3D Surface Generator** - Interactive tool for converting 2D images into 3D meshes with real-time rendering

---

## Project Structure

```
frontend/
├── app/                          # Next.js core platform
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main portfolio homepage
│   ├── api/contact/            # Contact form endpoint
│   └── [dynamic routes]/        # Project and event pages
├── components/                   # Core components
│   ├── hero.tsx
│   ├── featured-projects.tsx
│   ├── command-palette.tsx
│   └── ui/                      # shadcn component library
├── lib/
│   ├── data.ts                  # Portfolio content
│   └── utils.ts                 # Utilities
├── styles/
│   └── globals.css              # Tailwind configuration
├── admin-dashboard/             # Data management system (Vite)
├── image2surface-showcase/      # 3D tool (Next.js)
└── pnpm-workspace.yaml          # Monorepo configuration
```

## Technology Stack

Next.js • React • TypeScript • Tailwind CSS • Framer Motion • shadcn/ui • Resend • Vercel • pnpm (monorepo)

---

## Design Philosophy

fatihOS uses a dark-first design approach with an emerald green accent color (#22C55E). The interface draws inspiration from classic operating system aesthetics while maintaining modern web standards for accessibility and responsiveness.

---


Built by Fatih Berk Yozgatli — Computer Science & Data Science @ SMU.
Interested in full-stack systems, AI-integrated applications, and human-centered technology.

Email: fatihberkyozgatli@gmail.com
GitHub: [github.com/fatihberkyozgatli](https://github.com/fatihberkyozgatli)
LinkedIn: [Fatih Berk Yozgatli](https://www.linkedin.com/in/fatih-berk-yozgatli-4b623b261/)
