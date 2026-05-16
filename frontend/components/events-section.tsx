"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { events } from "@/lib/data"
import { Calendar, ArrowRight } from "lucide-react"

export function EventsSection() {
  return (
    <section id="events" className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">/events</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Events</h2>
          <p className="text-muted-foreground max-w-2xl">
            Notable presentations, conferences, and events.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-sm text-primary mb-3">{event.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{event.summary}</p>
                  {event.highlights && event.highlights.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {event.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1 flex-shrink-0">•</span>
                          <p className="text-sm text-muted-foreground">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {event.outcome && (
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs font-mono text-primary mb-1">Outcome</p>
                      <p className="text-sm text-muted-foreground mb-4">{event.outcome}</p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/events/${event.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
