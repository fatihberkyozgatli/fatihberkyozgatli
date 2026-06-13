"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type StageKey = "user" | "spa" | "api" | "controllers" | "engine" | "db" | "ai" | "openai"

interface StageDetails {
  title: string
  description: string
  technologies?: string[]
  layer?: string
}

const stageDetails: Record<StageKey, StageDetails> = {
  user: {
    title: "Student",
    description: "An authenticated student tracking courses, entering grades, and planning outcomes",
    technologies: [],
    layer: "Client",
  },
  spa: {
    title: "React SPA",
    description: "Single-page app: JWT stored in localStorage, protected routes, live course views, dark mode, and a mobile-friendly layout",
    technologies: ["React 18", "Vite", "Tailwind", "Framer Motion", "React Router"],
    layer: "Presentation",
  },
  api: {
    title: "Express REST API",
    description: "Stateless API. Every request carries the JWT and every protected handler verifies ownership before reading or writing",
    technologies: ["Node", "Express", "JWT", "Rate Limiting"],
    layer: "API Layer",
  },
  controllers: {
    title: "Controllers + Services",
    description: "Routes apply auth, controllers validate with Joi and check ownership, then call the pg pool or a pure service",
    technologies: ["Joi", "pg pool", "TypeScript"],
    layer: "Business Logic",
  },
  engine: {
    title: "Grade Engine",
    description: "Pure computeResult: current grade, projected maximum, and the required average for each letter grade. Covered by Vitest with no DB or AI call",
    technologies: ["Pure Function", "Vitest"],
    layer: "Business Logic",
  },
  db: {
    title: "PostgreSQL",
    description: "User-scoped data: users, courses, grade components, and per-course JSONB grade scales, with cascade deletes and updated_at triggers",
    technologies: ["PostgreSQL", "JSONB", "pg pool"],
    layer: "Data",
  },
  ai: {
    title: "AI Service",
    description: "One shared OpenAI client behind ownership and validation, used by the Grade Coach, syllabus parser, and natural language grade entry",
    technologies: ["services/ai.ts", "Tool Calling"],
    layer: "AI Layer",
  },
  openai: {
    title: "OpenAI gpt-4o",
    description: "The model behind the shared client. The coach uses read and write tools; syllabus parsing and grade entry use structured extraction",
    technologies: ["gpt-4o", "JSON Mode"],
    layer: "External",
  },
}

export function ArchitectureDiagramWhatsMyGrade() {
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
    const arrowId = `wmg-arrow-${from}-${to}`

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
        <svg viewBox="0 0 900 720" className="w-full" style={{ minHeight: "100px" }}>
          <Box id="user" label={`User`} x={40} y={40} width={170} height={85} />
          <Box id="spa" label={`React SPA\n(Vite)`} x={40} y={180} width={170} height={85} />
          <Box id="api" label={`Express\nREST API`} x={40} y={320} width={170} height={85} />
          <Box id="controllers" label={`Controllers\n+ Services`} x={40} y={460} width={170} height={85} />

          <Box id="engine" label={`Grade Engine\n(pure, tested)`} x={360} y={360} width={190} height={85} />
          <Box id="db" label={`PostgreSQL`} x={360} y={480} width={190} height={85} />
          <Box id="ai" label={`AI Service\n(OpenAI)`} x={360} y={600} width={190} height={85} />
          <Box id="openai" label={`OpenAI\ngpt-4o`} x={650} y={600} width={190} height={85} />

          <Arrow x1={125} y1={125} x2={125} y2={180} from="user" to="spa" />
          <Arrow x1={125} y1={265} x2={125} y2={320} from="spa" to="api" />
          <Arrow x1={125} y1={405} x2={125} y2={460} from="api" to="controllers" />

          <Arrow x1={210} y1={485} x2={360} y2={402} from="controllers" to="engine" />
          <Arrow x1={210} y1={502} x2={360} y2={522} from="controllers" to="db" />
          <Arrow x1={210} y1={520} x2={360} y2={642} from="controllers" to="ai" />

          <Arrow x1={550} y1={642} x2={650} y2={642} from="ai" to="openai" />
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
