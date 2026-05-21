"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/data"

interface SmallerProjectCardProps {
  project: Project
}

export function SmallerProjectCard({ project }: SmallerProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="mb-3">
        <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1">
          {project.title}
        </h3>
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

      <div className="flex gap-2 pt-3 border-t border-border">
        {project.links?.github && (
          <Button size="sm" variant="ghost" className="gap-2 flex-1" asChild>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              View Code
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  )
}
