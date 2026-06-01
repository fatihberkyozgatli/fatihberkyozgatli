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
- [ ] Back to top button on long pages (20 min)

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
