# Data Template Guide

This skeleton contains placeholder data in `/frontend/lib/data.ts`. To customize your portfolio, replace the example entries with your own information.

## What to Replace

### 1. **Projects** (Currently: 1 example project)

Replace in `/frontend/lib/data.ts`:

```typescript
export const projects: Project[] = [
  {
    title: "Example Project",
    slug: "example-project",
    // ... rest of example
  }
]
```

**Each project should have:**
- `title` — Project name
- `slug` — URL-friendly version (e.g., "my-awesome-app" → `/projects/my-awesome-app`)
- `summary` — 1-2 sentence description
- `role` — Your role (e.g., "Lead Developer", "Co-Founder")
- `stack` — Technologies used (e.g., ["React", "Python", "PostgreSQL"])
- `featured` — `true` to show on homepage, `false` to hide
- `highlights` — 5 key achievements/features
- `problem` — What problem did you solve?
- `impact` — What was the outcome/value created?
- `architecture` — Visual representation (e.g., "Frontend → API → Database")

**Add as many projects as you want** — just add objects to the array.

---

### 2. **Experiences** (Currently: 1 example job)

Replace in `/frontend/lib/data.ts`:

```typescript
export const experiences: Experience[] = [
  {
    title: "Your Job Title",
    organization: "Company Name",
    // ... rest of example
  }
]
```

**Each experience should have:**
- `title` — Job title
- `organization` — Company/organization name
- `dates` — Duration (e.g., "Aug 2022 - May 2024")
- `summary` — Brief description of role
- `bullets` — 4+ key responsibilities/achievements
- `skills` — 4-6 relevant skills

**Duplicate the object and fill in your roles.**

---

### 3. **Leadership** (Currently: 1 example leadership entry)

Replace in `/frontend/lib/data.ts`:

```typescript
export const leadership: LeadershipEntry[] = [
  {
    title: "Your Organization or Initiative",
    organization: "Organization Name",
    // ... rest of example
  }
]
```

**Each leadership entry should have:**
- `title` — What you founded/led
- `organization` — Organization name
- `role` — Your specific role
- `dates` — Duration
- `summary` — What you did
- `highlights` — 4 key achievements/metrics
- `impact` — Lasting change or value created

---

### 4. **Events** (Currently: 1 example event)

Replace in `/frontend/lib/data.ts`:

```typescript
export const events: EventEntry[] = [
  {
    title: "Event or Speaking Engagement",
    date: "Month Year",
    // ... rest of example
  }
]
```

**Each event should have:**
- `title` — Event name
- `date` — When (e.g., "May 2025")
- `role` — Your role
- `summary` — What happened
- `outcome` — Impact/result

---

### 5. **Timeline** (Currently: 3 placeholder entries)

Replace in `/frontend/lib/data.ts`:

```typescript
export const timeline: TimelineEvent[] = [
  {
    year: "2025",
    title: "Current Focus",
    // ... rest of example
  }
]
```

**Each timeline entry should have:**
- `year` — Year (e.g., "2025")
- `title` — Event name
- `description` — What happened
- `type` — One of: `"education"` | `"project"` | `"leadership"` | `"work"` | `"milestone"`

**Add 6-10 entries spanning your journey.**

---

### 6. **Skills** (Currently: Generic placeholder skills)

Replace in `/frontend/lib/data.ts`:

```typescript
export const skills = {
  languages: ["Language 1", "Language 2", ...],
  frontend: ["Frontend Tech 1", ...],
  backend: ["Backend Tech 1", ...],
  data: ["Data Tool 1", ...],
  tools: ["Tool 1", ...],
  concepts: ["Concept 1", ...]
}
```

**Each category should have 4-6 items.** Examples:
- **languages:** TypeScript, Python, C++, Go, Rust
- **frontend:** React, Next.js, Vue, Tailwind CSS
- **backend:** FastAPI, Node.js, Django, PostgreSQL
- **data:** MySQL, MongoDB, Pandas, NumPy
- **tools:** Git, Docker, Figma, Linear
- **concepts:** System Design, Testing, DevOps, ML

---

### 7. **Hero Status Cards** (Currently: Generic placeholders)

Replace in `/frontend/lib/data.ts`:

```typescript
export const statusCards = [
  { label: "Status", value: "Add your status" },
  { label: "Focus", value: "Your focus areas" },
  // ...
]
```

**Customize each card's value to your current situation:**
- Status: "Actively hiring", "Building", "Available", etc.
- Focus: "Full-stack / AI / Design", "Data engineering", etc.
- Location: Your city/timezone
- Current: "Job searching", "Building X", "Consulting", etc.
- Mode: "Available", "Recruiting-ready", "Open to offers", etc.

---

### 8. **Command Palette** (Currently: Generic commands)

Replace in `/frontend/lib/data.ts`:

```typescript
export const commands = [
  { label: "Open Projects", action: "navigate", target: "#projects" },
  { label: "Open Example Project", action: "navigate", target: "/projects/example-project" },
  // ...
]
```

**Update the project links:**
- Change `"Open Example Project"` → `"Open Your Project Name"`
- Change target from `/projects/example-project` to `/projects/your-project-slug`

**Add commands for each of your projects.**

---

## Steps to Customize

1. **Open `/frontend/lib/data.ts`**

2. **Replace each section:**
   - Projects (keep minimum 1-4 featured projects)
   - Experiences (keep minimum 1-3)
   - Leadership (keep minimum 1)
   - Events (keep minimum 1)
   - Timeline (add 6-10 entries)
   - Skills (update all categories)
   - Status cards (customize 5 values)
   - Commands (update project references)

3. **Test locally:** `npm run dev`
   - Homepage should show your data
   - Project pages should render your case studies
   - Command palette should reference your projects

4. **Add more projects if needed:**
   - Just add new objects to the `projects` array
   - Create the route folder if you want a case study page (optional)
   - Components will auto-render any featured project

## Notes

- All `featured: true` projects show on homepage
- Only featured projects appear in command palette
- Timeline is displayed reverse-chronologically (newest first on display)
- Contact form works immediately — just set `.env.local` with your email
- Components handle empty arrays gracefully if you have fewer than 1 of something

## Next Steps

After customizing data:

1. Update `/public/Fatih_Berk_Yozgatli_Resume.pdf` with your resume
2. Set up `.env.local` with your Resend API key
3. Deploy to your hosting platform
4. Configure custom domain if desired

Done! Your portfolio is now customized.
