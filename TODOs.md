# TODOs — fatihberkyozgatli.com

## ✅ Completed

- ~~GitHub stats widget (shows repos, stars, PRs)~~
- ~~Project filtering system (All, Fullstack, Data/AI, Systems)~~
- ~~Dark mode with localStorage persistence~~
- ~~Reading time estimates (120 WPM)~~
- ~~Hide architecture diagrams on mobile~~
- [x] ~~Fix Billingsley env var~~ ✅ DONE
- [x] ~~Add GitHub stats widget~~ ✅ DONE (shows on desktop, hidden on mobile)
- [x] ~~Remove See the product functionality from mobile~~ ✅ DONE
- [x] ~~Project filtering system (1-2 hrs)~~ ✅ DONE (4 category buttons: All, Fullstack, Data/AI, Systems)
- [x] ~~Fix dark mode persistence~~ ✅ DONE (dark default, localStorage saves user preference)
- [x] ~~Add reading time estimates~~ ✅ DONE (120 WPM calculation)
- [x] ~~Hide architecture diagrams on mobile~~ ✅ DONE
- [x] ~~Highlighting metrics~~ ✅ REVERTED (decided against it)
- [x] ~~Cursor-pointer on buttons~~ ✅ DONE (global UX improvement)
- [x] ~~Update Contact CTA~~ ✅ DONE ("Building something meaningful? Let's talk.")
- [x] ~~Remove GitHub Repos Box~~ ✅ DONE (shows only language distribution)
- [x] ~~Skills section condensed & refined~~ ✅ DONE (26 items: Python, C++, Java, SQL, Bash/Shell + frontend/backend/data/tools/concepts)
- [x] ~~Remove bottom padding from all sections~~ ✅ DONE (py-24 → pt-24 pb-12 across all 8 sections)
- [x] ~~Add dedicated /projects page with filtering~~ ✅ DONE (Full-page view with featured + other projects, category filters)
- [x] ~~Add "View All Projects" button to featured section~~ ✅ DONE (Green button with arrow, links to /projects page)
- [x] ~~Blog section setup + first post (3-4 hrs)~~ ✅ DONE (4 blog posts, /blogs collection page with category filters, detail pages with content parsing, mobile responsive, featured homepage section, kernel integration)
- [x] ~~Add LinkedIn blog links~~ ✅ DONE (LinkedIn URLs on all 4 blog posts, LinkedIn icon button on detail page navbar, matched project card layout with horizontal line + button)
- [x] ~~Blog card layout optimization~~ ✅ DONE (4-column desktop layout, mobile limiting to 2 on homepage, responsive grid)
- [x] ~~Mobile skill limiting~~ ✅ DONE (Projects: first 3 visible, Experience: first 2 visible, rest hidden until md breakpoint)
- [x] ~~Mobile expandable cards~~ ✅ DONE (Events & Leadership: collapsible "More Details" button on mobile, original inline view on desktop)
- [x] ~~Navigation button consistency~~ ✅ DONE ("Back to Portfolio" on all detail pages, Leadership button styling matched to Events)

---

## Fixes

### Critical
- [x] ~~**Add favicon files to `frontend/public/`**~~ ✅ DONE
- [x] ~~**Remove `ignoreBuildErrors: true` from `next.config.mjs`**~~ ✅ DONE
- [x] ~~**Fix `Project.category` type definition**~~ ✅ DONE (aligned to `"fullstack" | "datastructures-ml" | "systems" | "leadership" | "professional"`)
- [x] ~~**Convert detail pages from `"use client"` to server components**~~ ✅ DONE (all 4 pages split into server page + client component; `generateMetadata` + `generateStaticParams` added to `/projects/[slug]`, `/blogs/[slug]`, `/events/[slug]`, `/blogs`)

### Moderate
- [x] ~~**Fix Twitter card — downgraded to `summary`**~~ ✅ DONE
- [x] ~~**Remove `enrichBlogPostsWithReadingTime` no-op**~~ ✅ DONE (`blogPostsWithReadingTime = blogPosts` directly)
- [x] ~~**Remove `\n` from Image2Surface project title**~~ ✅ DONE
- [x] ~~**Delete placeholder files from `frontend/public/`**~~ ✅ DONE
- [x] ~~**Add `slug` field to `EventEntry` type and data**~~ ✅ DONE (both events have slug; `events-section.tsx` updated to use `event.slug`)
- [x] ~~**Make "Other Stories" cards fully clickable on blog detail**~~ ✅ DONE (absolute inset `<Link>` overlay; LinkedIn button gets `relative z-10`)

### Minor
- [x] ~~**Remove dead `data-scroll-behavior="smooth"` from `layout.tsx`**~~ ✅ DONE
- [x] ~~**Replace `require()` with `import` in data.ts**~~ ✅ DONE (top-level `import { calculateReadingTime } from "./utils"`)
- [x] ~~**Replace raw `<button>` with `<Button>` on event detail page**~~ ✅ DONE (event-client.tsx uses `<Button>` component)

---

## 06/11/2026 Findings:

### Critical / Deploy Safety
- [ ] Escape contact form user input before rendering HTML email (`name`, `email`, `message`).
- [ ] Add contact form abuse protection: rate limiting, honeypot/CAPTCHA, or server-side throttling.
- [ ] Move Resend initialization so builds/dev do not fail when `RESEND_API_KEY` is missing locally.
- [ ] Make admin dashboard demo status explicit; current protected routes/API client are mock-only and should not be treated as real auth.
- [ ] Remove production iframe fallback to `http://localhost:5173`; use a deployed demo URL or a controlled unavailable state.

### Featured Project / Portfolio Strategy
- [x] Decide the 3-featured-project layout before adding WhatsMyGrade.
- [x] Use a deliberate featured layout instead of a 2-column orphan card: one flagship full-width case study + two supporting cards.
- [x] Decide whether WhatsMyGrade becomes the flagship project or a supporting featured project.
- [x] Use WhatsMyGrade as flagship for product + AI + deployed full-stack proof; keep Billingsley and Image2Surface as supporting featured cards.
- [x] Add WhatsMyGrade project entry from README + architecture docs.
- [x] Add WhatsMyGrade case-study content: problem, users, core grade engine, AI Grade Coach, syllabus parser, auth/session hardening, tests, deployment.
- [x] Add live demo and GitHub links for WhatsMyGrade once final URLs are confirmed. ✅ DONE (demo → https://whatsmygrade.app/, GitHub already linked)

### Case Studies / Project Cards
- [x] Add visible Case Study buttons for all projects, not only featured projects.
- [x] Ensure every project detail page has useful case-study content, including C++ Search Engine, Sentiment Analyzer, and Turkish Süper Lig Prediction. ✅ DONE (added problem/impact/architecture + generic Technical Architecture section; reading times now auto-compute)
- [x] Make project cards structurally equal height with `h-full flex flex-col` and action buttons pinned with `mt-auto`.
- [x] Remove hardcoded layout spacer for `Sentiment Analyzer - Tweets`.
- [ ] Remove false click affordances from inert cards or make full-card click behavior intentional.
- [ ] Reduce homepage featured-card detail; move deep bullets to detail pages.

### UI / UX / Accessibility
- [ ] Add `aria-label` to icon-only buttons and external icon links.
- [ ] Add `aria-pressed`, grouped labels, and focus-visible states to project filters.
- [ ] Add `aria-expanded` to expandable cards/buttons.
- [ ] Reorder or group lower-conversion homepage sections so the hiring signal is clearer.
- [ ] Reduce desktop nav density; keep key links visible and move secondary links to command palette/page body.
- [ ] Surface product proof earlier on case-study pages.
- [ ] Add mobile-friendly visual proof for architecture/product demos instead of hiding diagrams/showcases on mobile.
- [ ] Consider shortening or adding skip behavior to the boot sequence for first-time recruiter visits.

### Engineering Hygiene
- [ ] Add/install ESLint or update lint scripts; `npm run lint` currently fails because `eslint` is missing.
- [ ] Decide on one package manager/lockfile strategy to avoid npm/pnpm drift.
- [ ] Make production builds reproducible without external Google font fetches, or accept the deployment dependency knowingly.
- [ ] Add focused tests for `/api/contact`, `/api/github-stats`, dynamic project routes, and any real auth/session behavior.
- [ ] Add mobile/desktop smoke checks after major portfolio layout changes.

---

## 06/12/2026 — Review Agent Findings (new, not previously tracked)

> From parallel UI/UX + frontend-design review passes. Items already covered in the 06/11 block are intentionally omitted here.

### Design / Brand
- [ ] Reduce green-accent spread. Budget `--primary` to: CTAs, section eyebrows, ONE status pulse, and active filter state. Neutralize card hover borders (`hover:border-primary/50` → `hover:border-foreground/20`) and tone down the avatar's green glow (`shadow-primary/40` → `shadow-black/40` or `shadow-primary/10`).
- [ ] Give typography an identity. Every heading is `text-3xl/4xl font-bold` and hero is `font-bold` — the loudest "AI-built" tell. Move to a weight/scale system (hero `font-semibold tracking-[-0.03em]`, section h2 `text-2xl md:text-3xl font-semibold tracking-[-0.02em]`); optionally one characterful face for the hero only.
- [ ] Loosen section spacing. `pt-12 pb-12` (48px) reads as dashboard density; premium marketing pages run `py-24 md:py-32`. Pair with `scroll-mt-20` for anchor offset.
- [ ] Normalize containers: blog uses `max-w-7xl`, timeline/contact use `max-w-4xl`, rest use `max-w-6xl` — pick one (likely `max-w-6xl`) so section edges align.
- [ ] Unify chip radii: stack chips use `rounded` in smaller-project-card vs `rounded-md` in project-card for the same element.

### Bugs / Hygiene
- [ ] Delete dead duplicate theme file `styles/globals.css` (stale grays/blue-violet palette that contradicts `app/globals.css`) before it gets imported by accident.
- [ ] Fix command-palette footer markup (`command-palette.tsx` ~214–225): the keyboard-hint row is missing its wrapper (`flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground`) and renders as unstyled full-size text. Also add `role="dialog"`/`aria-modal`, focus trap, and body-scroll lock (or swap to the `cmdk` lib already installed).
- [ ] Remove double fade-up: `SmallerProjectCard` animates itself AND its parent wraps it in an identical `motion.div` in `featured-projects.tsx`.
- [ ] Add `prefers-reduced-motion` handling — wrap app in `<MotionConfig reducedMotion="user">` and add a CSS media block neutralizing `animate-pulse` + smooth scroll (WCAG 2.3.3).
- [ ] Fix invalid `<Link><Button>` nesting (renders `<a><button>`) in `featured-projects.tsx:176` and `blog-section.tsx:77` — use `<Button asChild><Link>`.

### Accessibility (additions to 06/11 block)
- [ ] Add explicit `focus-visible:ring-2 focus-visible:ring-ring` to hand-rolled `<button>`/`<a>` elements (filters, expand toggles, nav links) — only shadcn Buttons currently have rings.
- [ ] Bump low-emphasis text contrast: `text-primary/60` "min read" and `text-xs text-muted-foreground` metadata are borderline/failing AA on card backgrounds.

### Optional / Considered
- [ ] Add `metadataBase` + a branded OG image to `layout.tsx` (Twitter card is `summary` with no image — blank LinkedIn/Slack previews).
- [ ] Show "Ctrl/⌘ K" or platform-detect instead of ⌘K-only hint for Windows recruiters.

---

## 06/13/2026 — Completed This Session

- [x] WhatsMyGrade interactive architecture diagram (`architecture-diagram-whatsmygrade.tsx`) matching the Billingsley/Image2Surface style; embedded in the case-study Technical Architecture section.
- [x] WhatsMyGrade "See the Product" section added and wired to the live deployment (https://whatsmygrade.app/), with a live-app + GitHub note row.
- [x] Back-to-top button (`back-to-top.tsx`) with a scroll-progress ring, `cursor-pointer`, desktop hover label, and reduced-motion support; mounted on home, project/blog/event detail pages, and the projects/blogs listing pages.
- [x] Skills updated from WhatsMyGrade: added LLM Integration (data), Express (backend), Vite (tools), Framer Motion + Vercel + Railway (frontend); removed redundant Three.js (covered by React Three Fiber).
- [x] Lightweight case studies for the 3 notable projects (Süper Lig, Sentiment Analyzer, Search Engine): added problem/impact/architecture in `data.ts` + generic Technical Architecture render; reading times now auto-compute.
- [x] Appended the 06/12 review-agent findings block (design/bugs/a11y items) to this file.
- [x] Added a `demo` / `demo` sign-in disclaimer to the WhatsMyGrade "See the Product" note.
- [x] Made reading times more accurate: +3 min bonus for interactive case studies (Billingsley, Image2Surface, WhatsMyGrade) whose extra sections live in JSX, not data; exported `interactiveCaseStudySlugs` as the single source of truth.
- [x] Refined skills layout: moved Railway from frontend → tools so frontend stays ≤ 2 rows.
- [x] Created `frontend/.env.local` with all required vars (RESEND, CONTACT_EMAIL, GITHUB_API_TOKEN, the three dashboard URLs); confirmed gitignored.
- [x] Full project cleanup: removed all code comments from custom source + dead code (unused imports in theme-provider/blog-post-client/boot-sequence, unused `isConnected` function, unused `showBlankLine` prop); verified no comments / no unused symbols / build passes. (`components/ui/` and sub-apps left untouched.)
- [x] Gitignored `*.tsbuildinfo` build artifact.

### Open follow-ups from this session
- [x] Reconcile Sentiment Analyzer accuracy: matched portfolio to the repo's `accuracy.txt` (73% → 68%) in summary, highlight, and impact. (README still says 73%/52% — update the repo separately if desired.)
- [ ] Add a WhatsMyGrade `demo` / `demo` seeded account with sample courses so recruiters can try the real app without signing up.

---

## 06/23/2026 — Completed This Session

- [x] Added **Pages from the Red Diary** as a featured project (supporting card next to Billingsley) with a full interactive case study: Technical Architecture + clickable diagram (`architecture-diagram-reddiary.tsx`), Challenges, Decisions, Results, and a "See the Product" embed wired to https://www.pagesfromthereddiary.com/; GitHub linked to `fatihberkyozgatli/PagesfromtheRedDiary`.
- [x] Moved **Image2Surface** down to "Other Notable Projects" (case-study page kept) and hid **Sentiment Analyzer** from the homepage via a new `hideFromHome` flag while keeping it on `/projects`, so the homepage "Other Notable" grid stays a clean 3-up.
- [x] Timeline: renamed "Building My Portfolio" → "Building fatihOS"; added "Launched WhatsMyGrade" and "Delivered Pages from the Red Diary".
- [x] Fixed the side-by-side featured-card bug where expanding one card stretched its neighbor (`items-start` on the two-column card grids on the homepage and `/projects`).
- [x] Trimmed the Red Diary featured-card expanded content (problem/highlights/impact) to match Billingsley's expanded height; deep detail stays in the case-study sections.
- [x] Confirmed the WhatsMyGrade live-app iframe renders (no `X-Frame-Options` on whatsmygrade.app). (was: 06/13 open follow-up)
- [x] Verified the homepage already uses the flagship + supporting-pair layout in `featured-projects.tsx`. (was: 06/13 open follow-up)
- [x] Back-to-top button on long pages — already shipped in the 06/13 session (`back-to-top.tsx`); removed the stale duplicate from the wishlist.

### New follow-up (Red Diary embed)
- [ ] The Red Diary "See the Product" embed is blocked because pagesfromthereddiary.com sends `X-Frame-Options: DENY`. Fix on the Red Diary repo: remove `X-Frame-Options` and add `Content-Security-Policy: frame-ancestors 'self' https://fatihberkyozgatli.com https://www.fatihberkyozgatli.com http://localhost:3000;`, then redeploy. No portfolio change needed; the embed fills automatically afterward.

---

## High Priority Next
- [ ] Add "View All Events" button & dedicated /events page (when 4+ events available) (2 hrs)
- [ ] Enhanced case studies for C++/Sentiment/Süper Lig (2-3 hrs)
- [ ] Create Mobile-Friendly Interactive Architecture Diagrams (vertical layouts/accordion)
- [ ] Add card hover animations (glow + scale effect) (1-2 hrs)
- [ ] Add social share buttons (1 hr)
- [ ] Add project tags as visual pills (1 hr)
- [ ] Lighthouse audit & optimization (2 hrs)
- [ ] Image optimization with next/image (1-2 hrs)
- [ ] Structured data Schema.org (1 hr)
- [ ] Meta tags optimization (1 hr)
- [ ] Sitemap generation (30 min)
- [ ] RSS feed for blog (/feed.xml) (30 min) — missing for any blog with regular posts
- [ ] Open Graph images for blog posts & projects (1 hr) — social previews are blank without this
- [ ] robots.txt + canonical URL tags (20 min) — basic SEO hygiene gap

### Content & Design
- [ ] Add smooth scroll anchoring (1 hr)
- [ ] Improve keyboard focus states (1 hr)
- [ ] Add problem → solution → impact hierarchy (1 hr)
- [ ] Add bullet point summaries (1 hr)
- [ ] Add "Key Takeaways" to projects (1 hr)
- [ ] Blog post content - 8 posts (ongoing)
- [ ] Billingsley case study enhancements (2 hrs)
- [ ] Image2Surface case study enhancements (1 hr)
- [ ] C++ Search Engine case study (2 hrs)
- [ ] Sentiment Analyzer case study (1.5 hrs)
- [ ] Timeline enhancements (1 hr)
- [ ] Speaking engagements section (30 min)
- [ ] Open source contributions section (30 min)
- [ ] Newsletter signup (1 hr)
- [ ] Reading progress bar on blog post detail pages (30 min)
- [ ] Table of contents for long blog posts (1 hr)
- [ ] Related posts section at bottom of blog detail (1 hr)

### Phase 2 (Lower Priority, MAYBE)
- [ ] Terminal Mode (3-4 hrs)
- [ ] Contact form database (1-2 hrs)
- [ ] Analytics tracking (1-2 hrs)
- [ ] Skills Radar Chart (1.5 hrs)
- [ ] Advanced animations (2-3 hrs)
- [ ] Systems/React Flow visualizer (4-6 hrs)
- [ ] Recruiter Mode
- [ ] Interactive ML Playground (4-5 hrs)
- [ ] Live Search Engine Demo (3-4 hrs)
- [ ] Full-text search across blog + projects (2-3 hrs)
- [ ] Print/PDF styles for case studies (30 min)
- [ ] Loading skeleton screens for dynamic sections (1-2 hrs)
