# fatihOS

A premium portfolio platform built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion. A fully interactive system that serves as both portfolio and technical showcase.

## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or pnpm

### Setup

```bash
# 1. Install frontend dependencies
cd frontend
npm install

# 2. Start development server
npm run dev
```

The portfolio will be available at **http://localhost:3000**

### Environment Variables

Copy `.env.example` to `.env.local` in the frontend directory:

```bash
cp frontend/.env.example frontend/.env.local
```

Then add your configuration (Resend API key for contact form, etc.)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── frontend/          # Next.js application (main portfolio)
├── backend/           # FastAPI backend (future)
├── requirements.txt   # Python dependencies
├── PLANNING.md        # Product vision & roadmap
└── README.md          # This file
```

## Key Features

- **Interactive Terminal-Style Interface** — fatihOS branding with system commands
- **Command Palette** — Quick navigation with ⌘K
- **Dark/Light Mode** — Theme toggle with localStorage persistence
- **Responsive Design** — Mobile-first, optimized for all devices
- **Animations** — Smooth Framer Motion transitions
- **Contact Form** — Email integration with Resend
- **SEO Ready** — Next.js App Router with metadata

## Tech Stack

### Frontend
- **Framework**: Next.js 16.2.4 (Turbopack)
- **Language**: TypeScript 5.7.3 (strict mode)
- **Styling**: Tailwind CSS 4.2.0
- **UI Components**: shadcn/ui (56 pre-built components)
- **Animations**: Framer Motion 12.38.0
- **Forms**: React Hook Form + Zod
- **Theming**: next-themes

### Backend (Future)
- **Framework**: FastAPI
- **Email**: Resend
- **Database**: SQLAlchemy, PostgreSQL (Phase 2+)

## Customization

Edit `frontend/lib/data.ts` to populate:
- Project portfolio
- Work experience
- Leadership roles
- Events/speaking engagements
- Skills & technical stack
- Navigation items
- Status cards

All placeholder data is templated for easy customization.

## Deployment

Ready to deploy on:
- Vercel
- Netlify
- Railway
- Self-hosted

## License

© 2026 Fatih Berk Yozgatli. All rights reserved.
