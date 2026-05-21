"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type StageKey = "upload" | "validation" | "estimation" | "heightmap" | "mesh" | "rendering" | "editing"

interface StageDetails {
  title: string
  description: string
  technologies?: string[]
  layer?: string
}

const stageDetails: Record<StageKey, StageDetails> = {
  upload: {
    title: "Image Upload",
    description: "User selects and uploads 2D image for processing",
    technologies: ["File Input", "Validation"],
    layer: "Presentation"
  },
  validation: {
    title: "Validation & Storage",
    description: "Validate image format and store temporarily on disk for processing pipeline",
    technologies: ["FastAPI", "File System", "Format Check"],
    layer: "API Layer"
  },
  estimation: {
    title: "Depth Estimation",
    description: "GPU-accelerated depth map generation using Depth Anything V2 PyTorch model",
    technologies: ["PyTorch", "CUDA", "Depth Anything V2"],
    layer: "Business Logic"
  },
  heightmap: {
    title: "Height Map Generation",
    description: "Convert depth map to normalized height map via grayscale and NumPy vectorization",
    technologies: ["NumPy", "OpenCV", "Python"],
    layer: "Business Logic"
  },
  mesh: {
    title: "3D Mesh Construction",
    description: "Generate vertices and indices from height map with configurable resolution",
    technologies: ["NumPy", "SciPy", "Geometry"],
    layer: "Business Logic"
  },
  rendering: {
    title: "Three.js Rendering",
    description: "Interactive WebGL visualization with zoom, rotate, and pan controls",
    technologies: ["React Three Fiber", "WebGL", "Three.js"],
    layer: "Presentation"
  },
  editing: {
    title: "Real-time Editing",
    description: "Interactive mesh manipulation (smoothing, scaling, denoising) with instant visual feedback",
    technologies: ["React", "Three.js", "State Management"],
    layer: "Presentation"
  }
}

export function ArchitectureDiagramImage2Surface() {
  const [hovered, setHovered] = useState<StageKey | null>(null)
  const [selected, setSelected] = useState<StageKey | null>(null)

  const Box = ({ 
    id, 
    label, 
    x, 
    y, 
    width, 
    height 
  }: { 
    id: StageKey
    label: string
    x: number
    y: number
    width: number
    height: number 
  }) => {
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
          fill="var(--color-card)"
          stroke={isActive ? "var(--color-primary)" : "var(--color-border)"}
          strokeWidth={isActive ? 2.5 : 1.5}
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
            className="text-sm font-semibold"
            fill="var(--color-foreground)"
          >
            {line}
          </text>
        ))}
      </motion.g>
    )
  }

  const Arrow = ({ x1, y1, x2, y2, from, to }: { x1: number; y1: number; x2: number; y2: number; from: StageKey; to: StageKey }) => {
    const isActive = hovered === from || hovered === to
    const arrowId = `arrow-${from}-${to}`
    
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
          animate={{
            opacity: isActive ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        />
      </>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-secondary/20 border border-border rounded-lg p-6 relative">
        <svg viewBox="0 0 1200 700" className="w-full" style={{ minHeight: "100px" }}>
          {/* Define arrow markers */}
          <defs>
            <marker id="arrowGreenImage2Surface" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#22C55E" />
            </marker>
            <marker id="arrowGrayImage2Surface" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#94A3A0" />
            </marker>
          </defs>

          {/* LEFT COLUMN - Vertical top to bottom */}
          <Box id="upload" label={`Image\nUpload`} x={30} y={50} width={160} height={110} />
          <Box id="validation" label={`Validation &\nStorage`} x={30} y={250} width={160} height={110} />
          <Box id="estimation" label={`Depth\nEstimation`} x={30} y={450} width={160} height={110} />

          {/* MIDDLE COLUMN - Height Map at bottom */}
          <Box id="heightmap" label={`Height Map\nGeneration`} x={290} y={450} width={160} height={110} />

          {/* RIGHT COLUMN - Bottom to top (going upwards) */}
          <Box id="mesh" label={`3D Mesh\nConstruction`} x={550} y={450} width={160} height={110} />
          <Box id="rendering" label={`Three.js\nRendering`} x={550} y={250} width={160} height={110} />
          <Box id="editing" label={`Real-time\nEditing`} x={550} y={50} width={160} height={110} />

          {/* ARROWS */}
          {/* Left column vertical arrows - properly connecting box borders */}
          <Arrow x1={110} y1={160} x2={110} y2={250} from="upload" to="validation" />
          <Arrow x1={110} y1={360} x2={110} y2={450} from="validation" to="estimation" />

          {/* Horizontal arrow from Depth Estimation to Height Map */}
          <Arrow x1={190} y1={505} x2={290} y2={505} from="estimation" to="heightmap" />

          {/* Horizontal arrow from Height Map to 3D Mesh */}
          <Arrow x1={450} y1={505} x2={550} y2={505} from="heightmap" to="mesh" />

          {/* Right column vertical arrows (bottom to top/upwards) - from TOP of mesh to BOTTOM of rendering */}
          <Arrow x1={630} y1={450} x2={630} y2={360} from="mesh" to="rendering" />
          <Arrow x1={630} y1={250} x2={630} y2={160} from="rendering" to="editing" />
        </svg>

        {/* Popup on hover/click - Top Right */}
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
              <p className="text-sm text-muted-foreground mb-3">
                {stageDetails[selected].description}
              </p>
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
