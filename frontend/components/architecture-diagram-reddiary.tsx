"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type StageKey = "visitor" | "rsc" | "middleware" | "actions" | "auth" | "supabase" | "wall" | "storage"

interface StageDetails {
  title: string
  description: string
  technologies?: string[]
  layer?: string
}

const stageDetails: Record<StageKey, StageDetails> = {
  visitor: {
    title: "Visitor / Reader",
    description: "Anyone can browse public pages and post teasers; reading a full essay requires a free account",
    technologies: [],
    layer: "Client",
  },
  rsc: {
    title: "Next.js 15 (RSC)",
    description: "Public pages render as React Server Components for speed and SEO. Client components are used only for auth forms, search, comments, and the Tiptap editor",
    technologies: ["Next.js 15", "App Router", "TypeScript", "Tailwind"],
    layer: "Presentation",
  },
  middleware: {
    title: "Middleware",
    description: "Refreshes the Supabase session cookie on every request and guards /admin, redirecting non-admins to the login page",
    technologies: ["middleware.ts", "Session Refresh", "Route Guard"],
    layer: "Edge",
  },
  actions: {
    title: "Server Actions",
    description: "All admin writes run as Server Actions under the caller's session, validated with Zod and authorized by RLS. No bespoke REST layer and no service-role key in the browser",
    technologies: ["Server Actions", "Zod"],
    layer: "Mutations",
  },
  auth: {
    title: "Supabase Auth",
    description: "Email and password with email confirmation. Roles are admin or reader on profiles.role; the owner is promoted to admin once",
    technologies: ["Supabase Auth", "Email Confirm", "Roles"],
    layer: "Auth",
  },
  supabase: {
    title: "Supabase Postgres",
    description: "Row Level Security on every table is the real authorization boundary. Security-definer RPCs power view counts and full-text search without granting direct writes",
    technologies: ["PostgreSQL", "RLS", "RPC", "Full-Text Search"],
    layer: "Data + Security",
  },
  wall: {
    title: "Registration Wall",
    description: "A column-limited posts_public view exposes only teaser columns; the gated content JSON is never granted to anonymous callers, so the wall holds even against direct API calls",
    technologies: ["posts_public view", "RLS", "Column Gating"],
    layer: "Security",
  },
  storage: {
    title: "Storage + Tiptap",
    description: "Cover and in-content images live in Supabase Storage with admin-only writes. Rich text is stored as Tiptap JSON and rendered by a shared read-only renderer",
    technologies: ["Supabase Storage", "Tiptap", "JSON"],
    layer: "Content",
  },
}

export function ArchitectureDiagramRedDiary() {
  const [hovered, setHovered] = useState<StageKey | null>(null)
  const [selected, setSelected] = useState<StageKey | null>(null)

  const Box = ({
    id,
    label,
    x,
    y,
    width,
    height,
  }: {
    id: StageKey
    label: string
    x: number
    y: number
    width: number
    height: number
  }) => {
    const isActive = hovered === id || selected === id
    const lines = label.split("\n")
    const lineHeight = 18
    const totalHeight = lines.length * lineHeight
    const startY = y + height / 2 - totalHeight / 2 + lineHeight / 2

    return (
      <motion.g
        key={id}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => setSelected(selected === id ? null : id)}
        style={{ cursor: "pointer" }}
      >
        <motion.rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx="8"
          fill="var(--color-card)"
          stroke={isActive ? "var(--color-primary)" : "var(--color-border)"}
          strokeWidth={isActive ? 2.5 : 1.5}
          animate={{
            filter: isActive ? "drop-shadow(0 0 12px var(--color-primary))" : "drop-shadow(0 0 0px transparent)",
          }}
          transition={{ duration: 0.3 }}
        />
        {lines.map((line, i) => (
          <text
            key={i}
            x={x + width / 2}
            y={startY + i * lineHeight}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-semibold"
            fill="var(--color-foreground)"
          >
            {line}
          </text>
        ))}
      </motion.g>
    )
  }

  const Arrow = ({
    x1,
    y1,
    x2,
    y2,
    from,
    to,
  }: {
    x1: number
    y1: number
    x2: number
    y2: number
    from: StageKey
    to: StageKey
  }) => {
    const isActive = hovered === from || hovered === to
    const arrowId = `rd-arrow-${from}-${to}`

    return (
      <>
        <defs key={`${arrowId}-defs`}>
          <marker
            id={arrowId}
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill={isActive ? "#22C55E" : "#94A3A0"} />
          </marker>
        </defs>
        <motion.line
          key={`${arrowId}-line`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isActive ? "#22C55E" : "#94A3A0"}
          strokeWidth={isActive ? 2 : 1.5}
          markerEnd={`url(#${arrowId})`}
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-secondary/20 border border-border rounded-lg p-6 relative">
        <svg viewBox="0 0 900 680" className="w-full" style={{ minHeight: "100px" }}>
          <Box id="visitor" label={`Visitor /\nReader`} x={40} y={40} width={180} height={80} />
          <Box id="rsc" label={`Next.js 15\n(Server Components)`} x={40} y={180} width={180} height={80} />
          <Box id="middleware" label={`Middleware\n(Auth Guard)`} x={40} y={320} width={180} height={80} />
          <Box id="actions" label={`Server Actions\n(Zod)`} x={40} y={460} width={180} height={80} />

          <Box id="wall" label={`Registration Wall\n(posts_public)`} x={360} y={40} width={200} height={80} />
          <Box id="supabase" label={`Supabase Postgres\n+ RLS`} x={360} y={230} width={200} height={90} />
          <Box id="auth" label={`Supabase Auth\n(email/password)`} x={360} y={430} width={200} height={80} />
          <Box id="storage" label={`Storage +\nTiptap Media`} x={660} y={230} width={200} height={90} />

          <Arrow x1={130} y1={120} x2={130} y2={180} from="visitor" to="rsc" />
          <Arrow x1={130} y1={260} x2={130} y2={320} from="rsc" to="middleware" />
          <Arrow x1={130} y1={400} x2={130} y2={460} from="middleware" to="actions" />

          <Arrow x1={220} y1={210} x2={360} y2={258} from="rsc" to="supabase" />
          <Arrow x1={220} y1={490} x2={360} y2={300} from="actions" to="supabase" />
          <Arrow x1={220} y1={368} x2={360} y2={462} from="middleware" to="auth" />

          <Arrow x1={460} y1={230} x2={460} y2={120} from="supabase" to="wall" />
          <Arrow x1={560} y1={275} x2={660} y2={275} from="supabase" to="storage" />
        </svg>

        <AnimatePresence>
          {selected && stageDetails[selected] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-6 right-6 bg-card border border-primary/30 rounded-lg p-4 w-64 max-w-sm shadow-xl"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{stageDetails[selected].title}</h3>
                  {stageDetails[selected].layer && (
                    <p className="text-xs text-primary mt-1 font-mono">{stageDetails[selected].layer}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{stageDetails[selected].description}</p>
              {stageDetails[selected].technologies && stageDetails[selected].technologies!.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {stageDetails[selected].technologies!.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Click any component to learn more • Hover to highlight connections
      </p>
    </div>
  )
}
