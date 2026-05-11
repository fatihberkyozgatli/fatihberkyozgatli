# PLANNING.md — fatihberkyozgatli.com

## 1. Product Vision

This is my portfolio. It needs to do one thing: convince a hiring manager that I can actually build things.

I'm building it as a premium product interface (fatihOS) rather than a resume page because that's what I do — I build systems. The portfolio IS the system. It should feel like navigating a real product, not clicking through static pages.

**Why it matters:** Most portfolios are collections of projects. This shows that I think systematically: how information flows, what navigation feels good, how to communicate technical decisions clearly. That's worth more than a pretty resume.

---

## 2. Core Positioning

### Primary Goal

The site prioritizes:

1. Getting software engineering, data engineering, platform engineering, and AI/data interviews.
2. Showing creative technical taste and interactive engineering ability.

The site will be recruiter-friendly first, but memorable and interactive enough to stand out.

### Primary Identity

The site will present Fatih as:

- Full-Stack Builder
- Creative Technologist
- AI/Data Engineer
- Research-Oriented Thinker
- Community Builder / Leader

### Final Brand Message

Primary tagline:

> Building systems that connect data, people, and ideas.

Supporting line:

> Computer Science + Data Science graduate building full-stack applications, data workflows, AI-powered tools, and human-centered technical communities.

### Desired Impression

Visitors should leave thinking:

> This is an engineer who can build real systems, communicate clearly, and bring technical ideas to life.

---

## 3. Design Direction

### The Goal

This should feel like Vercel or Linear's product page — clean, premium, with purpose behind every interaction. Dark theme, minimal, but not cold.

### Why This Approach

I've learned from working on dashboards and internal tools: clarity beats beauty. The design serves the content, not the other way around. Animations should guide attention or reveal information, not distract.

### Specifically

I want recruiters to see engineering depth (architecture diagrams, technical decisions in case studies) without feeling like they're reading a textbook. The OS concept is real navigation, not decoration — command palette for quick jumps, section labels that feel deliberate, timeline that tells a story.

### What to Avoid

I almost went full cyberpunk/terminal aesthetic early on. Stopped myself. That feels like "look at me, I'm a hacker" — not "I build real things." Same reason: no excessive animations, no neon, no fake windows. The work speaks for itself.

---

## 4. Color System

The site will use a black and green color system.

### Primary Palette

- Background: near-black / deep charcoal
- Surface: dark graphite
- Secondary surface: dark slate
- Text: soft white
- Secondary text: cool gray
- Accent: emerald green
- Accent glow: soft green blur, used sparingly

### Suggested Hex Values

```txt
Background: #050807
Primary Surface: #0D1110
Secondary Surface: #151A18
Border: #24302B
Primary Text: #F3F7F5
Secondary Text: #A7B3AD
Muted Text: #6F7D76
Accent Green: #22C55E
Accent Deep Green: #16A34A
Soft Glow Green: rgba(34, 197, 94, 0.18)
```

### Color Usage Rules

Green should be used only for:

- active states
- key CTAs
- timeline highlights
- architecture diagram highlights
- selected nodes
- command palette focus states
- subtle glow elements

The site should remain mostly black, charcoal, white, and gray. Green is an accent, not the whole design.

---

## 5. Typography

### Typeface Decision

Use a modern sans-serif font system.

Preferred stack:

- Geist Sans
- Inter
- Satoshi
- fallback: system sans-serif

### Typography Philosophy

I learned from dashboards that clarity beats beauty. If a recruiter has 30 seconds on the homepage, they need to understand in glances, not dense paragraphs.

Headlines should command attention but not shout. Body copy should be scannable. No decorative fonts. The content is the style.

### Typography Rules

- Hero headlines: bold, large, concise. One idea per line.
- Body copy: short paragraphs, bullet points where appropriate. Skim-able.
- Case studies: clear hierarchy (problem → solution → impact). Section breaks between ideas.
- Avoid walls of text. If I'm explaining something complex, use visuals or break it into smaller pieces.
- No decorative fonts. Ever.

---

## 6. Core Site Concept: fatihOS

**fatihOS is not a gimmick. It's real.**

Most portfolios are collections of pages. This is a system. Command palette (CMD+K) for shortcuts. Architecture diagrams that work like dashboards. Timeline that's actually chronological history. Everything connects intentionally.

I considered whether this would feel forced or "hacker-y." I don't think so — it's just treating a portfolio like the products I build: systems with purpose, not scattered content.

### How It Works

- Site uses real route labels: `/projects`, `/systems`, `/experience`, `/leadership`, `/writing`, `/contact`.
- Command palette is functional — not decoration.
- Animated elements guide attention or reveal context.
- The metaphor is subtle enough that a recruiter won't get confused, but intentional enough that a technical visitor appreciates it.

### OS Elements to Include

- Command palette
- System-style section labels
- Animated status indicators
- Timeline as system history
- Project architecture diagrams as system maps
- Subtle boot/init sequence
- Recruiter-readable structure

### OS Elements to Avoid

- draggable fake windows for the MVP
- fake app icons everywhere
- overdone terminal UI
- forced cyberpunk language
- excessive boot animations
- sound effects

---

## 7. Landing Page Decision

Use a short boot/init sequence followed immediately by a clean homepage.

The sequence should be subtle and fast. It should not block the user for too long.

### Landing Flow

1. User lands on site.
2. A minimal boot sequence appears:
   - `Initializing fatihOS...`
   - `Loading systems...`
   - `System online.`
3. The hero fades in smoothly.
4. User sees a clean, recruiter-readable homepage.

### Hero Section

Hero should feel like:

> Elite engineer first, creative systems builder second.

### Hero Copy

Primary headline:

> Engineer building systems that connect data, people, and ideas.

Alternative shorter headline:

> Building systems that connect data, people, and ideas.

Subheadline:

> Computer Science + Data Science graduate focused on full-stack engineering, data workflows, AI-powered tools, and human-centered technology.

### Hero CTA Buttons

Primary CTA:

- View Projects

Secondary CTA:

- Open Resume

Tertiary CTA:

- Contact

### Hero Supporting Elements

Include small system-status cards:

- Status: Building
- Focus: Full-stack / Data / AI systems
- Location: Dallas, TX
- Current: Senior Design + job search
- Mode: Recruiter-ready

---

## 8. Navigation Structure

### Main Navigation

The site will use the following top-level sections:

```txt
/home
/projects
/systems
/experience
/leadership
/events
/writing
/now
/contact
```

### Navigation Behavior

- Sticky floating navbar
- Smooth scrolling
- Active section indicator
- Mobile-friendly collapsed menu
- Command palette access with CMD/CTRL + K

### Required Navigation Features

- Command palette
- Resume link
- GitHub link
- LinkedIn link
- Contact link

---

## 9. Must-Have Features

The first full version must include:

1. Command palette
2. Animated timeline
3. Dark/light mode
4. Interactive architecture diagrams
5. Technical project case studies
6. Recruiter-readable homepage
7. Responsive design
8. Resume download/open link
9. Contact section
10. Blog/writing foundation

---

## 10. Command Palette

### Purpose

The command palette will make the site feel premium and product-like.

### Trigger

```txt
CMD + K on Mac
CTRL + K on Windows/Linux
```

### Commands

Initial commands:

- Open Projects
- Open Billingsley Case Study
- Open Image2Surface Case Study
- Open C++ Search Engine Case Study
- Open Sentiment Analyzer Case Study
- View Resume
- Open GitHub
- Open LinkedIn
- Contact Me
- Toggle Theme
- Open Writing
- Open Leadership
- Open Timeline

### Design

- Dark overlay
- Green selected state
- Minimal search input
- Keyboard navigable
- Fast and accessible

---

## 11. Theme System

The site will be dark-first but include light mode.

### Dark Mode

Dark mode is the default and primary design.

### Light Mode

Light mode should be polished but secondary.

Light mode should use:

- off-white background
- dark text
- green accent
- subtle gray surfaces

### Theme Toggle

Include a small theme toggle in the navbar and command palette.

---

## 12. Page and Section Architecture

## 12.1 Home

The homepage will introduce the full experience.

Sections:

1. Hero
2. Quick credibility stats
3. Featured technical systems
4. Selected case studies
5. Leadership snapshot
6. Timeline preview
7. Writing preview
8. Contact CTA

### Homepage Goal

A recruiter should understand Fatih within 30 seconds.

A technical visitor should be curious enough to open a case study.

---

## 12.2 Projects

The projects page will be the technical core of the website.

### Project Categories

```txt
Technical Projects
Leadership / Community Projects
Professional Work
Events / Presentations
```

### Content Depth Decision

Different project types will have different depth.

Technical projects will receive comprehensive case studies.

Leadership/professional experiences will receive structured summaries.

Events will receive short visual entries with descriptions and photos.

This prevents the site from feeling bloated while still allowing important technical work to shine.

---

## 13. Technical Project Case Studies

The first technical case studies will be:

1. Billingsley
2. C++ Search Engine
3. Sentiment Analyzer
4. Image2Surface

### Technical Project Case Study Structure

Each technical project page should include:

1. Overview
2. Problem
3. Role
4. Tech Stack
5. System Architecture
6. Key Features
7. Technical Decisions
8. Challenges
9. Impact
10. What I Learned
11. Screenshots / visuals
12. GitHub / demo link where appropriate

### Case Study Depth

Technical project pages should be deep and impressive, but still readable.

Use:

- short paragraphs
- architecture diagrams
- bullet highlights
- system visuals
- screenshots
- code snippets only when helpful

Avoid:

- wall-of-text explanations
- generic project descriptions
- vague claims
- undocumented impact metrics

---

## 14. Project-Specific Planning

## 14.1 Billingsley

### Positioning

Billingsley is the flagship project.

It should be presented as an enterprise data integration and internal tooling system.

### Emphasis

- React + TypeScript frontend
- FastAPI backend
- MySQL database
- JWT authentication
- protected routes
- API key generation
- data ingestion workflows
- import tracking
- real-time logs
- dashboard UI
- admin tools
- enterprise sponsor context
- Senior Design Expo recognition

### Interactive Visual

Include an interactive architecture diagram showing:

```txt
Yardi / Source Data
        ↓
Ingestion Pipeline
        ↓
FastAPI Backend
        ↓
MySQL Database
        ↓
Internal API Layer
        ↓
React Dashboard
        ↓
Internal Users
```

Node details should explain:

- data ingestion
- authentication
- database storage
- dashboard functionality
- access control
- logging

### Confidentiality Rule

proprietary screenshots, credentials, private sponsor data, or internal business details will not be presented.

---

## 14.2 C++ Search Engine

### Positioning

This project should demonstrate lower-level engineering, algorithms, performance awareness, and systems thinking.

### Emphasis

- C++
- search/indexing logic
- data structures
- parsing
- ranking
- performance considerations
- memory and efficiency awareness

### Visual

Include:

- indexing pipeline diagram
- query processing flow
- data structure explanation

---

## 14.3 Sentiment Analyzer

### Positioning

This project should demonstrate AI/data/NLP ability.

### Emphasis

- text preprocessing
- sentiment classification
- model evaluation
- data workflow
- visualization
- practical ML thinking

### Visual

Include:

- NLP pipeline
- model evaluation chart
- sample prediction flow

---

## 14.4 Image2Surface

### Positioning

This project should demonstrate creative full-stack engineering and visual computing.

### Emphasis

- image upload
- height-map generation
- mesh generation
- FastAPI-style backend architecture
- React / TypeScript frontend
- Three.js or 3D viewer logic
- layered architecture
- system design decisions

### Visual

Include:

- image-to-heightmap-to-mesh pipeline
- layered architecture diagram
- viewer screenshots or demo

---

## 15. Leadership Section

Initial leadership section:

1. The Dialogue Society
2. Mentoring

### Depth Decision

Leadership entries should be more than event descriptions but less technical than project case studies.

They should focus on:

- problem/context
- role
- actions taken
- scale
- communication
- collaboration
- measurable impact
- lessons learned

### The Dialogue Society Positioning

Present TDS as a leadership and community-building case study.

Emphasize:

- Founder / Co-President role
- building community
- creating dialogue spaces
- event planning
- cross-campus collaboration
- public speaking
- budgeting / logistics
- leadership under pressure
- 300+ active members if accurate and supported

### Mentoring Positioning

Present mentoring as evidence of communication, teaching, and leadership.

Emphasize:

- helping students
- explaining technical concepts
- supporting learning
- patience
- classroom / group / one-on-one communication

---

## 16. Professional Experience Section

Initial professional entries:

1. JR Dallas Wealth Management
2. Outlier AI
3. TA at SMU
4. Intern at Dialogue Institute

### Depth Decision

Professional experience entries should be concise but polished.

Each entry should include:

- title
- organization
- dates
- short overview
- responsibilities
- tools/skills
- impact bullets
- optional reflection

### Style

Professional entries should feel resume-aligned but more visual and readable.

Avoid overexplaining. The goal is credibility and scanability.

---

## 17. Events Section

Initial events:

1. Senior Design Expo
2. TDS Convention at UTD
3. Additional TDS events to be added later

### Depth Decision

Events should be short, visual, and media-forward.

Each event should include:

- event name
- date
- role
- 2–4 sentence description
- photos
- optional outcome/impact
- optional link or post

Events should not become full case studies unless they were major leadership accomplishments.

### Senior Design Expo

This should connect to the Billingsley project but remain separate as an event.

Focus:

- presentation
- demo
- judges / audience
- award or recognition
- teamwork
- public communication

### TDS Convention at UTD

Focus:

- event purpose
- planning role
- collaboration
- audience
- theme
- photos

---

## 18. Writing / Blog

Include a general blog with categories added over time.

### Initial Categories

- Engineering
- Data / AI
- Leadership
- Reflections
- Research / Society
- Career

### Blog Philosophy

The blog should be optional but visible. It should not block the MVP.

The writing section should eventually show that Fatih thinks deeply, communicates clearly, and can explain technical and human-centered topics.

### Initial Blog Ideas

- What I learned building an enterprise integration system
- Why dashboards are only useful when they reduce operational friction
- Building student communities from zero
- Lessons from senior design
- What full-stack engineering taught me about communication
- Data systems are people systems too

---

## 19. Timeline

### Purpose

The timeline will turn Fatih’s background into a concise story.

### Tone

Somewhere between light personal context and professional storytelling.

### Timeline Content

Include:

- moving to the U.S.
- starting at SMU
- Computer Science + Data Science path
- founding / growing The Dialogue Society
- mentoring and teaching
- research / writing interests
- technical project milestones
- senior design
- Senior Design Expo
- current job search / next chapter

### Design

- Animated vertical timeline on desktop
- Simplified stacked cards on mobile
- Green glow for active timeline nodes
- Smooth scroll reveal
- Short descriptions

### Personal Depth Rule

Include enough personal story to be memorable, but do not make the site feel like a diary.

---

## 20. Systems Section

### Purpose

The systems section will highlight architecture and technical thinking.

### Content

This section can include:

- architecture diagrams
- data flow diagrams
- API flow diagrams
- frontend/backend communication
- authentication flow
- database design snapshots
- system design notes

### Initial Systems

1. Billingsley architecture
2. Image2Surface layered architecture
3. C++ Search Engine indexing flow
4. Sentiment Analyzer NLP pipeline

### Interaction

Users should be able to click nodes and reveal explanations.

---

## 21. Recruiter Readability Strategy

### Decision

The site will use a balanced approach between recruiter readability and immersive interactivity.

### Recruiter Requirements

A recruiter should quickly find:

- resume
- contact
- technical skills
- education
- experience
- strongest projects
- leadership highlights
- GitHub
- LinkedIn

### Recruiter-Friendly Elements

- clear CTA buttons
- resume link in navbar
- featured skills near top
- concise homepage summary
- dedicated experience section
- quick project summaries
- contact visible at bottom and command palette

### Future Feature

A recruiter mode may be added after the MVP.

Recruiter mode would:

- reduce animation
- show concise summaries
- prioritize experience and resume
- make the site easier to scan

Recruiter mode is not required for the MVP but should be planned in the architecture.

---

## 22. Presentation Mode

### Decision

Presentation mode is valuable but not required for the MVP.

It should be a Phase 2 feature.

### Purpose

Presentation mode will help during:

- interviews
- networking calls
- live demos
- screen sharing
- project walkthroughs

### Behavior

When enabled:

- larger typography
- guided section navigation
- reduced clutter
- fullscreen project walkthroughs
- focused case study sequence

---

## 23. Animation System

Use smooth premium motion with some cinematic interactions.

### Animation Rules

Animations should:

- support storytelling
- reveal information
- guide attention
- feel smooth
- feel intentional

Animations should not:

- distract
- slow the site
- repeat constantly
- block usability
- feel gimmicky

### Animation Types

Use:

- fade/slide entrances
- spring-based transitions
- subtle hover motion
- glowing active states
- scroll reveals
- architecture-node highlighting
- timeline reveal animations
- command palette transitions

Avoid:

- heavy 3D for MVP
- constant particle overload
- long intro animation
- animation spam

---

## 24. Interaction System

### Required Interactions

1. Command palette
2. Theme toggle
3. Interactive architecture diagrams
4. Animated timeline
5. Smooth scroll navigation
6. Hover states for project cards
7. Expandable project details
8. Clickable skill/technology tags

### Optional Later Interactions

- presentation mode
- recruiter mode
- terminal mode
- draggable panels
- live project demos
- interactive resume builder

---

## 25. Technical Stack

### Frontend & Core
- Next.js (App Router)
- TypeScript
- React 18+
- Tailwind CSS
- shadcn/ui

### Interactions & Animations
- Framer Motion (animations)
- React Flow (architecture diagrams)
- Lucide React (icons)

### Content & Blog
- MDX with next-mdx-remote
- Frontmatter for metadata

### Forms & Email
- Vercel API Routes (form backend)
- Resend (email service)

### Deployment
- Vercel (production)
- GitHub (version control)

### Phase 2 (Optional)
- Prisma ORM
- PostgreSQL database

### Why This Stack

- **Next.js** — The clearest choice for this project. Vercel integration means one command to deploy. SEO matters for recruiter discovery. Built-in App Router is solid.
- **TypeScript** — Non-negotiable. I'm showing engineering rigor. Untyped JavaScript on a portfolio feels sloppy. Types catch real mistakes.
- **Tailwind CSS** — I've tried CSS-in-JS before. Too much abstraction overhead. Tailwind utility classes let me build fast and the final CSS is clean and performant.
- **shadcn/ui** — Copy-paste components I own completely. I can customize without fighting a design system. Pairs perfectly with Tailwind.
- **Framer Motion** — Spring-based animations feel premium. The cinematic feel I want isn't possible with vanilla CSS.
- **React Flow** — Purpose-built for architecture diagrams. Allows interactive nodes with explanations. Right tool for the job.
- **Lucide React** — Clean, minimal icons. No bloat, no design system overhead.
- **MDX** — Blog posts live in git alongside code. I can embed interactive React components inside Markdown for technical storytelling.
- **Vercel API Routes** — Simple serverless functions for form handling. No external services needed. One fewer dependency.
- **Resend** — Free email delivery. Free tier covers contact form volume I'll actually get.
- **Vercel** — Zero-config deployment. Automatic Git integration. No DevOps needed.

---

## 26. Folder Structure

```txt
/src
  /app
    /(site)
      /page.tsx
      /projects
      /systems
      /experience
      /leadership
      /events
      /writing
      /now
      /contact
    /layout.tsx
    /globals.css

  /components
    /layout
      Navbar.tsx
      Footer.tsx
      CommandPalette.tsx
      ThemeToggle.tsx
    /home
      Hero.tsx
      StatusCards.tsx
      FeaturedProjects.tsx
      TimelinePreview.tsx
    /projects
      ProjectCard.tsx
      ProjectCaseStudy.tsx
      ArchitectureDiagram.tsx
      TechStack.tsx
    /systems
      SystemMap.tsx
      FlowNode.tsx
    /timeline
      Timeline.tsx
      TimelineItem.tsx
    /writing
      BlogCard.tsx
      MDXComponents.tsx
    /ui
      Button.tsx
      Card.tsx
      Badge.tsx

  /content
    /projects
      billingsley.mdx
      cpp-search-engine.mdx
      sentiment-analyzer.mdx
      image2surface.mdx
    /writing
    /events

  /data
    projects.ts
    experiences.ts
    leadership.ts
    events.ts
    timeline.ts
    skills.ts

  /lib
    utils.ts
    constants.ts

  /public
    /images
    /resume
```

---

## 27. Content Data Model

### Project Object

```ts
type Project = {
  title: string;
  slug: string;
  category: "technical" | "leadership" | "professional" | "event";
  summary: string;
  role: string;
  stack?: string[];
  featured: boolean;
  image?: string;
  links?: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
  highlights: string[];
};
```

### Event Object

```ts
type Event = {
  title: string;
  date: string;
  role: string;
  summary: string;
  images?: string[];
  outcome?: string;
};
```

### Experience Object

```ts
type Experience = {
  title: string;
  organization: string;
  dates: string;
  summary: string;
  bullets: string[];
  skills?: string[];
};
```

---

## 28. MVP Scope

### MVP Must Include

1. Homepage
2. Projects overview
3. Billingsley case study
4. At least two additional technical project case studies
5. Experience section
6. Leadership section
7. Events section
8. Animated timeline
9. Command palette
10. Dark/light mode
11. Resume link
12. Contact section
13. Responsive design
14. Deployed to Vercel

### MVP Does Not Need

- terminal mode
- recruiter mode
- presentation mode
- heavy 3D
- fully populated blog
- live demos
- draggable windows

---

## 29. Phase 2 Scope

Add after MVP:

1. Recruiter mode
2. Presentation mode
3. Terminal mode
4. More blog posts
5. More interactive system maps
6. Live demos
7. Project filtering
8. Advanced animations
9. Analytics
10. Contact form integration

---

## 30. SEO and Metadata

### Domain

```txt
fatihberkyozgatli.com
```

### SEO Title

```txt
Fatih Berk Yozgatli — Software Engineer & Creative Technologist
```

### SEO Description

```txt
Computer Science and Data Science graduate building full-stack systems, data workflows, AI-powered tools, and human-centered technology.
```

### Social Preview

Use a custom Open Graph image with:

- black background
- green accent
- name
- tagline
- subtle grid

---

## 31. Accessibility Requirements

### This is non-negotiable.

I've mentored students with different learning styles. I know what broken accessibility feels like. I've used screen readers. If a recruiter on a screen reader can't navigate this, I've failed.

Requirements:

- **Semantic HTML** — Proper landmarks, headings, structure. Not div soup.
- **Keyboard navigation** — Everything works without a mouse. Command palette especially needs to be keyboard-perfect.
- **Visible focus states** — If someone's using keyboard navigation, they need to see where they are at all times.
- **Sufficient contrast** — Dark theme with green accents needs to pass WCAG AA at minimum.
- **Reduced motion support** — Animations are nice but opt-in. Some people get motion sickness from parallax or scroll animations.
- **Alt text** — Every image gets meaningful description, not just "image.png".
- **Mobile readability** — If I use small type on mobile, I've failed accessibility for people with low vision or on small screens.

---

## 32. Performance Requirements

The site should:

- load quickly
- lazy-load images
- optimize images
- avoid heavy initial JavaScript
- keep animations lightweight
- avoid unnecessary 3D in MVP
- use static content where possible
- use MDX/data files for content

---

## 33. Content Rules

### Voice

Be professional but don't hide. Use first person when it makes sense (I built, I learned, I chose). But don't be the main character in every story.

Tone: confident, clear, technical, reflective, human, concise.

### What NOT to do

Don't claim "led a team of 50" when I advised 5 students. Don't say "built the entire backend" when I architected one service. Don't use "synergistic AI-powered" anywhere — it's meaningless.

Don't overshare personal stuff. But don't be robotic either. The Dialogue Society work matters because it's about building community, not because I want a pat on the back.

Don't hide technical decisions behind buzzwords. Say *why* — "chose FastAPI because the data pipeline needs real-time performance" beats "used modern backend framework."

### What to use instead

- Specific technologies (React + TypeScript + Tailwind, not "modern stack")
- Specific roles (architected the data layer, mentored 3 students, founded the org)
- Clear outcomes (reduced dashboard load time from 8s to 1.2s, grew community from 20 to 300+ members)
- Technical decisions with reasoning (chose PostgreSQL over MongoDB because relational data model was crucial)
- Real constraints (legacy codebase had X limitation, so I chose Y approach)
- Lessons learned (most valuable thing I got from this project)
- Measurable impact where I have it; honest about uncertainty where I don't

---

## 34. Initial Implementation Order

### Step 1: Project Setup

- Create Next.js app
- Add TypeScript
- Add Tailwind
- Add shadcn/ui
- Add Framer Motion
- Configure theme system
- Set up global layout

### Step 2: Design System

- Define colors
- Define typography
- Create button styles
- Create card styles
- Create section container
- Create badge/tag components
- Create animation presets

### Step 3: Homepage

- Build boot sequence
- Build hero
- Build status cards
- Build featured projects
- Build leadership preview
- Build CTA section

### Step 4: Navigation

- Navbar
- Footer
- Command palette
- Theme toggle
- Smooth scroll behavior

### Step 5: Projects

- Project data model
- Project cards
- Project overview page
- Billingsley case study
- Other technical project case studies

### Step 6: Systems

- Add React Flow
- Build architecture diagram component
- Build Billingsley system map
- Build Image2Surface system map

### Step 7: Experience / Leadership / Events

- Build experience section
- Build leadership section
- Build events section
- Add images and summaries

### Step 8: Timeline

- Build animated timeline
- Add journey milestones
- Make mobile responsive

### Step 9: Writing

- Add MDX support
- Build writing index
- Add placeholder categories
- Add first post later

### Step 10: Polish and Deploy

- Mobile review
- Accessibility review
- Performance review
- SEO metadata
- Open Graph image
- Deploy to Vercel
- Connect domain

---

## 35. Final Blueprint Decision

The final site will be:

> A dark, black-and-green, minimalist, interactive personal operating-system inspired portfolio for an engineer-builder.

It will use the **fatihOS** concept through command-palette navigation, system-style architecture diagrams, animated timelines, and clean technical storytelling.

It will prioritize employability and clarity while still feeling creative, memorable, and technically impressive.

The MVP will focus on polish, content quality, and interaction quality rather than overbuilding experimental features.

The result should feel like a premium engineering portfolio that says:

> Fatih Berk Yozgatli is an engineer who can build.

Note: This is a comprehensive planning file, that can change along the way!
