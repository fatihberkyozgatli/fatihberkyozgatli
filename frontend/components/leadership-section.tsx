"use client"

import { motion } from "framer-motion"
import { leadership } from "@/lib/data"
import { Users } from "lucide-react"

export function LeadershipSection() {
  return (
    <section id="leadership" className="pt-12 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">/leadership</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership</h2>
          <p className="text-muted-foreground max-w-2xl">
            Community building, mentorship, and organizational leadership experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {leadership.map((entry, index) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{entry.title}</h3>
                  <p className="text-sm text-primary">{entry.role}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    <span className="hidden sm:inline">
                      {entry.organization} • {entry.dates}
                    </span>
                    <span className="sm:hidden">
                      {entry.organization}
                      <br />
                      {entry.dates}
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{entry.summary}</p>

              <ul className="space-y-2 mb-4">
                {entry.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary mt-1">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>

              {entry.impact && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-mono text-primary mb-1">Impact</p>
                  <p className="text-sm text-muted-foreground">{entry.impact}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
