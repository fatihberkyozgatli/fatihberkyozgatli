"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Project } from "@/lib/data"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      id={project.slug}
      className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <span className="px-3 py-1.5 rounded-full border border-border bg-card/50 text-xs font-mono text-primary whitespace-nowrap">
            {project.category}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{project.role}</p>
        {project.readingTime && (
          <p className="text-xs font-mono text-primary/60">
            {project.readingTime} min read
          </p>
        )}
      </div>

      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
        {project.summary}
      </p>

      {project.stack && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-md text-xs font-mono bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          {isExpanded ? "Hide details" : "Show highlights"}
        </button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-2">
            {project.problem && (
              <div>
                <h4 className="text-xs font-mono text-primary mb-1">Problem</h4>
                <p className="text-sm text-muted-foreground">{project.problem}</p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-mono text-primary mb-2">Key Highlights</h4>
              <ul className="space-y-1.5">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1.5">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {project.impact && (
              <div>
                <h4 className="text-xs font-mono text-primary mb-1">Impact</h4>
                <p className="text-sm text-muted-foreground">{project.impact}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <Button size="sm" variant="default" className="gap-2" asChild>
          <Link href={`/projects/${project.slug}`}>
            View Case Study
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        {project.links?.github && (
          <Button size="sm" variant="ghost" className="gap-2" asChild>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Code
            </a>
          </Button>
        )}
        {project.links?.demo && (
          <Button size="sm" variant="ghost" className="gap-2" asChild>
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
