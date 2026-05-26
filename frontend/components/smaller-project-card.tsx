"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/data"

interface SmallerProjectCardProps {
  project: Project
  showBlankLine?: boolean
}

export function SmallerProjectCard({ project, showBlankLine = false }: SmallerProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
    >
      <div className="mb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold group-hover:text-primary transition-colors flex-1">
            {project.title}
          </h3>
          {project.readingTime && (
            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
              {project.readingTime} min
            </span>
          )}
        </div>
        <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary">
          {project.category}
        </span>
      </div>

      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
        {project.summary}
      </p>

      {project.stack && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-mono bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.title === "Sentiment Analyzer - Tweets" && showBlankLine && (
        <div className="h-4" />
      )}

      <div className="flex gap-2 pt-3 border-t border-border">
        {project.links?.github && (
          <Button size="sm" variant="ghost" className="gap-2 flex-1" asChild>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              View Code
            </a>
          </Button>
        )}
        {project.links?.caseStudy && (
          <Button size="sm" variant="ghost" className="gap-2 flex-1" asChild>
            <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
              Case Study
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  )
}
