"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Users, Trophy } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { events } from "@/lib/data"

export default function EventDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const event = events.find((e) => 
    e.title.toLowerCase().replace(/\s+/g, "-") === slug
  )

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>

      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-6">
                {event.role}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{event.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{event.date}</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {event.summary}
              </p>
              {event.outcome && (
                <div className="rounded-lg border border-border bg-card p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Outcome</h3>
                      <p className="text-muted-foreground">{event.outcome}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 pt-12 border-t border-border"
          >
            <Link
              href="/#events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
