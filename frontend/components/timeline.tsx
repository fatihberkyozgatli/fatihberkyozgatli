"use client"

import { motion } from "framer-motion"
import { timeline } from "@/lib/data"
import { GraduationCap, Briefcase, Users, FolderOpen, Star } from "lucide-react"

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  leadership: Users,
  project: FolderOpen,
  milestone: Star,
}

export function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">/timeline</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Journey</h2>
          <p className="text-muted-foreground max-w-2xl">
            Key milestones in my path as an engineer, leader, and builder.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = iconMap[item.type] || Star
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={item.year + item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`hidden md:block w-1/2 ${
                      isEven ? "pr-12 text-right" : "pl-12 text-left"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-sm">
                      {item.year}
                    </span>
                  </div>

                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 glow-primary-sm">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>

                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pl-12" : "md:pr-12"
                    }`}
                  >
                    <span className="md:hidden inline-block px-2 py-0.5 mb-2 rounded-full bg-primary/10 text-primary font-mono text-xs">
                      {item.year}
                    </span>

                    <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>


          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 -bottom-4 w-3 h-3 rounded-full bg-primary glow-primary"
          />
        </div>
      </div>
    </section>
  )
}
