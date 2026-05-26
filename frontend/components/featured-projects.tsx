"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projectsWithReadingTime } from "@/lib/data"
import { ProjectCard } from "./project-card"
import { SmallerProjectCard } from "./smaller-project-card"

type FocusFilter = "all" | "fullstack" | "data-ai" | "systems"

export function FeaturedProjects() {
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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">/projects</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          {/* Header with Filters */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                Technical projects demonstrating full-stack engineering, data systems,
                algorithms, and creative problem-solving.
              </p>
            </div>

            {/* Focus Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 justify-start lg:justify-end flex-shrink-0"
            >
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-mono transition-all ${
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
        </motion.div>

        {/* Show unified view when filter is active */}
        {filter !== "all" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {filteredProjects && filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {project.featured ? (
                      <ProjectCard project={project} />
                    ) : (
                      <SmallerProjectCard project={project} showBlankLine={true} />
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground col-span-2">
                  No projects found for this filter.
                </p>
              )}
            </motion.div>
          </>
        )}

        {/* Show normal two-section view when "All" filter is selected */}
        {filter === "all" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 mb-16"
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>

            {/* Other Notable Projects */}
            {smallerProjects.length > 0 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold">Other Notable Projects</h3>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {smallerProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <SmallerProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}
