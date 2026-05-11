"use client"

import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/data"
import Link from "next/link"

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const project = projects.find((p) => p.slug === slug)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            {project.links?.github && (
              <Button variant="ghost" size="icon" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            {project.links?.demo && (
              <Button variant="ghost" size="icon" asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#projects" className="hover:text-foreground transition-colors">Projects</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{project.title}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.summary}</p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm">
              {project.role}
            </Badge>
            <Badge variant="outline" className="text-sm capitalize">
              {project.category}
            </Badge>
          </div>

          {/* Tech Stack */}
          { <div className="flex flex-wrap gap-2 mb-12">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {project.problem && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">The Problem</h2>
            </div>
            <div className="pl-4 border-l-2 border-border ml-0.5">
              <p className="text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
          </motion.section>
        )}

        {/* Architecture Section */}
        {project.architecture && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Architecture</h2>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 overflow-x-auto">
              <div className="flex items-center gap-2 flex-wrap font-mono text-sm">
                {project.architecture.split(" → ").map((step, index, arr) => (
                  <span key={index} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-secondary rounded-md whitespace-nowrap">
                      {step}
                    </span>
                    {index < arr.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">Key Highlights</h2>
          </div>
          <ul className="space-y-3 pl-4 border-l-2 border-border ml-0.5">
            {project.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Impact Section */}
        {project.impact && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Impact</h2>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <p className="text-foreground leading-relaxed">
                {project.impact}
              </p>
            </div>
          </motion.section>
        )}

        {/* Navigation to Other Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-12 border-t border-border"
        >
          <h3 className="text-lg font-semibold mb-6">Other Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects
              .filter((p) => p.slug !== slug && p.featured)
              .slice(0, 2)
              .map((otherProject) => (
                <Link
                  key={otherProject.slug}
                  href={`/projects/${otherProject.slug}`}
                  className="group p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {otherProject.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {otherProject.summary}
                  </p>
                </Link>
              ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
}
