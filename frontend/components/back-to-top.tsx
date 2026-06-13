"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowUp } from "lucide-react"

interface BackToTopProps {
  threshold?: number
}

const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function BackToTop({ threshold = 400 }: BackToTopProps) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollTop = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrollTop > threshold)
      setProgress(max > 0 ? Math.min(scrollTop / max, 1) : 0)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.2 }}
          className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-md transition-colors duration-300 hover:border-primary/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:bottom-8 md:right-8"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="var(--color-border)" strokeWidth="2" className="opacity-60" />
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              style={{ transition: prefersReducedMotion ? "none" : "stroke-dashoffset 0.15s linear" }}
            />
          </svg>

          <ArrowUp className="relative h-[18px] w-[18px] text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />

          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-border bg-card/90 px-2 py-1 font-mono text-[11px] text-muted-foreground opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 md:block">
            top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
