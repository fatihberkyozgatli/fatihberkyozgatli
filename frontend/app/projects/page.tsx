"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projectsWithReadingTime } from "@/lib/data"
import { ProjectCard } from "@/components/project-card"
import { SmallerProjectCard } from "@/components/smaller-project-card"
import Link from "next/link"
import { ChevronLeft, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

type FocusFilter = "all" | "fullstack" | "data-ai" | "systems"

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FocusFilter>("all")

  const featuredProjects = projectsWithReadingTime.filter((p) => p.featured)
  const smallerProjects = projectsWithReadingTime.filter((p) => !p.featured)
  const allProjects = [...featuredProjects, ...smallerProjects]

  const filteredProjects =
    filter === "all" ? null : allProjects.filter((p) => p.focus === filter)

  const filterButtons: { label: string; value: FocusFilter }[] = [
    { label: "All", value: "all" },
    { label: "Fullstack", value: "fullstack" },
    { label: "Data/AI", value: "data-ai" },
    { label: "Systems", value: "systems" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/fatihberkyozgatli" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </header>

      <section className="pt-12 pb-12 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-mono text-sm">/projects</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Everything I've built—from full-stack apps to data systems and systems programming. Each project represents a distinct challenge and learning experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-3 py-1.5 rounded-full border text-sm font-mono transition-all cursor-pointer ${
                  filter === btn.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-card/50 text-foreground hover:border-primary"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pt-8 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {filter !== "all" && filteredProjects && filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {project.featured ? (
                    <ProjectCard project={project} />
                  ) : (
                    <SmallerProjectCard project={project} showBlankLine={true} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : filter !== "all" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No projects found for this filter.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold">Featured Work</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  {featuredProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {smallerProjects.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-semibold">Other Projects</h2>
                  </motion.div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {smallerProjects.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <SmallerProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
