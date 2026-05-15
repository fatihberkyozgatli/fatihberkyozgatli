"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

type ComponentKey = "ftp" | "preprocessing" | "mysql" | "delivery" | "interaction" | "frontend" | "admin" | "applications"

interface ComponentDetails {
  title: string
  description: string
  technologies?: string[]
}

const componentDetails: Record<ComponentKey, ComponentDetails> = {
  ftp: {
    title: "Third-party Financial Software",
    description: "External data source that delivers financial records via SFTP connection",
    technologies: ["SFTP", "Scheduled Exports"]
  },
  preprocessing: {
    title: "Pre-processing (Python)",
    description: "Validates, cleans, and transforms incoming data before database storage",
    technologies: ["Python", "Pydantic", "Data Validation"]
  },
  mysql: {
    title: "MySQL Server",
    description: "Centralized storage for all reference data with strict schema constraints",
    technologies: ["MySQL", "Database Constraints", "Indexing"]
  },
  delivery: {
    title: "Delivery (FastAPI)",
    description: "Secondary API layer for external applications to consume data",
    technologies: ["FastAPI", "async/await", "Rate Limiting"]
  },
  interaction: {
    title: "Interaction Layer (FastAPI)",
    description: "Primary API for frontend and system logic. Handles auth, validation, and data orchestration",
    technologies: ["FastAPI", "JWT Auth", "Pydantic"]
  },
  frontend: {
    title: "Frontend (React)",
    description: "Admin interface for managing apps, scheduling imports, viewing logs, and controlling data access",
    technologies: ["React", "TypeScript", "Real-time Updates"]
  },
  admin: {
    title: "Admin User",
    description: "Internal administrator managing the system, users, and data flow configurations",
    technologies: []
  },
  applications: {
    title: "External Applications",
    description: "Internal company apps consuming data via authenticated API endpoints",
    technologies: ["API Clients", "Scheduled Pulls"]
  }
}

export function ArchitectureDiagram() {
  const [hovered, setHovered] = useState<ComponentKey | null>(null)
  const [selected, setSelected] = useState<ComponentKey | null>(null)

  const isConnected = (from: ComponentKey, to: ComponentKey) => {
    const connections: [ComponentKey, ComponentKey][] = [
      ["ftp", "preprocessing"],
      ["preprocessing", "mysql"],
      ["mysql", "delivery"],
      ["mysql", "interaction"],
      ["interaction", "frontend"],
      ["frontend", "admin"],
      ["delivery", "applications"],
    ]
    return connections.some(
      ([f, t]) => (f === from && t === to) || (f === to && t === from)
    )
  }

  const Box = ({ id, label, x, y, width, height }: { id: ComponentKey; label: string; x: number; y: number; width: number; height: number }) => {
    const isActive = hovered === id || selected === id
    const lines = label.split('\n')
    const lineHeight = 16
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
          fill="var(--color-background)"
          stroke={isActive ? "var(--color-primary)" : "var(--color-border)"}
          strokeWidth={isActive ? 2 : 1}
          animate={{
            filter: isActive ? "drop-shadow(0 0 12px var(--color-primary))" : "drop-shadow(0 0 0px transparent)"
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
            className="text-xs font-semibold"
            fill="var(--color-foreground)"
          >
            {line}
          </text>
        ))}
      </motion.g>
    )
  }

  const Arrow = ({ x1, y1, x2, y2, from, to }: { x1: number; y1: number; x2: number; y2: number; from: ComponentKey; to: ComponentKey }) => {
    const isActive = hovered === from || hovered === to
    const arrowId = `arrow-${from}-${to}`
    return (
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
          <path d="M0,0 L0,6 L9,3 z" fill={isActive ? "#22C55E" : "#6F7D76"} />
        </marker>
      </defs>
    ) || (
      <motion.line
        key={`${arrowId}-line`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isActive ? "#22C55E" : "#6F7D76"}
        strokeWidth={isActive ? 2 : 1}
        markerEnd={`url(#${arrowId})`}
        animate={{
          opacity: isActive ? 1 : 0.6
        }}
        transition={{ duration: 0.3 }}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-secondary/20 border border-border rounded-lg p-6 relative">
        <svg viewBox="0 0 1000 700" className="w-full" style={{ minHeight: "400px" }}>
          {/* Define arrow markers */}
          <defs>
            <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#22C55E" />
            </marker>
            <marker id="arrowGray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#6F7D76" />
            </marker>
          </defs>

          {/* FTP Source - Outside Azure */}
          <Box id="ftp" label={`Yardi FTP`} x={60} y={20} width={140} height={80} />

          {/* Azure Server Border - Encapsulates Pre-processing, MySQL, Delivery, Interaction, Frontend */}
          <rect x={40} y={130} width={650} height={420} fill="none" stroke="#22C55E" strokeWidth="2" strokeDasharray="5,5" rx="8" opacity="0.4" />
          <text x={55} y={150} className="text-xs font-mono" fill="#22C55E" opacity="0.7">
            Azure Server
          </text>

          {/* LEFT COLUMN - Vertical Stack */}
          {/* Pre-processing */}
          <Box id="preprocessing" label={`Pre-processing\n(Python)`} x={60} y={160} width={140} height={100} />

          {/* MySQL */}
          <Box id="mysql" label={`MySQL\nServer`} x={60} y={300} width={140} height={100} />

          {/* Delivery */}
          <Box id="delivery" label={`Delivery\n(FastAPI)`} x={60} y={440} width={140} height={100} />

          {/* Applications - Outside Azure */}
          <Box id="applications" label={`Applications\n(1...n)`} x={60} y={580} width={140} height={100} />

          {/* CENTER-RIGHT - Horizontal Row at MySQL Level */}
          {/* Interaction Layer */}
          <Box id="interaction" label={`Interaction\nLayer\n(FastAPI)`} x={280} y={300} width={140} height={100} />

          {/* Frontend */}
          <Box id="frontend" label={`Frontend\n(React)`} x={500} y={300} width={140} height={100} />

          {/* Admin User - Outside Azure */}
          <Box id="admin" label={`Admin\nUser`} x={720} y={310} width={120} height={80} />

          {/* ARROWS - As Specified */}

          {/* 1) Straight line between FTP and Preprocessing */}
          <motion.line
            x1={130}
            y1={100}
            x2={130}
            y2={160}
            stroke={hovered === "ftp" || hovered === "preprocessing" ? "#22C55E" : "#6F7D76"}
            strokeWidth={2}
            animate={{ opacity: hovered === "ftp" || hovered === "preprocessing" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 2) Arrow from Preprocessing to MySQL */}
          <motion.line
            x1={130}
            y1={260}
            x2={130}
            y2={300}
            stroke={hovered === "preprocessing" || hovered === "mysql" ? "#22C55E" : "#6F7D76"}
            strokeWidth={hovered === "preprocessing" || hovered === "mysql" ? 2 : 1}
            markerEnd={hovered === "preprocessing" || hovered === "mysql" ? "url(#arrowGreen)" : "url(#arrowGray)"}
            animate={{ opacity: hovered === "preprocessing" || hovered === "mysql" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 3) Straight line between MySQL and Delivery */}
          <motion.line
            x1={130}
            y1={400}
            x2={130}
            y2={440}
            stroke={hovered === "mysql" || hovered === "delivery" ? "#22C55E" : "#6F7D76"}
            strokeWidth={2}
            animate={{ opacity: hovered === "mysql" || hovered === "delivery" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 4) Arrow from Delivery to Applications */}
          <motion.line
            x1={130}
            y1={540}
            x2={130}
            y2={580}
            stroke={hovered === "delivery" || hovered === "applications" ? "#22C55E" : "#6F7D76"}
            strokeWidth={hovered === "delivery" || hovered === "applications" ? 2 : 1}
            markerEnd={hovered === "delivery" || hovered === "applications" ? "url(#arrowGreen)" : "url(#arrowGray)"}
            animate={{ opacity: hovered === "delivery" || hovered === "applications" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 5) Straight line between MySQL and Interaction */}
          <motion.line
            x1={200}
            y1={350}
            x2={280}
            y2={350}
            stroke={hovered === "mysql" || hovered === "interaction" ? "#22C55E" : "#6F7D76"}
            strokeWidth={2}
            animate={{ opacity: hovered === "mysql" || hovered === "interaction" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 6) Arrow from Interaction to MySQL */}
          <motion.line
            x1={280}
            y1={350}
            x2={200}
            y2={350}
            stroke={hovered === "interaction" || hovered === "mysql" ? "#22C55E" : "#6F7D76"}
            strokeWidth={hovered === "interaction" || hovered === "mysql" ? 2 : 1}
            markerEnd={hovered === "interaction" || hovered === "mysql" ? "url(#arrowGreen)" : "url(#arrowGray)"}
            animate={{ opacity: hovered === "interaction" || hovered === "mysql" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 7) Arrow from Interaction to Frontend */}
          <motion.line
            x1={420}
            y1={350}
            x2={500}
            y2={350}
            stroke={hovered === "interaction" || hovered === "frontend" ? "#22C55E" : "#6F7D76"}
            strokeWidth={hovered === "interaction" || hovered === "frontend" ? 2 : 1}
            markerEnd={hovered === "interaction" || hovered === "frontend" ? "url(#arrowGreen)" : "url(#arrowGray)"}
            animate={{ opacity: hovered === "interaction" || hovered === "frontend" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 8) Straight line between Interaction and Frontend */}
          <motion.line
            x1={420}
            y1={350}
            x2={500}
            y2={350}
            stroke={hovered === "interaction" || hovered === "frontend" ? "#22C55E" : "#6F7D76"}
            strokeWidth={2}
            animate={{ opacity: hovered === "interaction" || hovered === "frontend" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 9) Arrow from Admin to Frontend */}
          <motion.line
            x1={720}
            y1={350}
            x2={640}
            y2={350}
            stroke={hovered === "admin" || hovered === "frontend" ? "#22C55E" : "#6F7D76"}
            strokeWidth={hovered === "admin" || hovered === "frontend" ? 2 : 1}
            markerEnd={hovered === "admin" || hovered === "frontend" ? "url(#arrowGreen)" : "url(#arrowGray)"}
            animate={{ opacity: hovered === "admin" || hovered === "frontend" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 10) Arrow from Frontend to Admin */}
          <motion.line
            x1={640}
            y1={350}
            x2={720}
            y2={350}
            stroke={hovered === "frontend" || hovered === "admin" ? "#22C55E" : "#6F7D76"}
            strokeWidth={hovered === "frontend" || hovered === "admin" ? 2 : 1}
            markerEnd={hovered === "frontend" || hovered === "admin" ? "url(#arrowGreen)" : "url(#arrowGray)"}
            animate={{ opacity: hovered === "frontend" || hovered === "admin" ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />
        </svg>

        {/* Tooltip - Top Right of Diagram Window */}
        {selected && (
          <div 
            className="absolute top-6 right-6 bg-card border border-primary/20 rounded-lg p-4 max-w-sm z-50 shadow-lg"
            style={{
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          >
            <style>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-foreground text-sm">{componentDetails[selected].title}</h4>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{componentDetails[selected].description}</p>
            {componentDetails[selected].technologies && componentDetails[selected].technologies!.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {componentDetails[selected].technologies!.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">Click any component to learn more • Hover to highlight connections</p>
    </div>
  )
}
