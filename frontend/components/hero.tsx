"use client"

import { motion } from "framer-motion"
import { ArrowRight, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/avatar"
import { GitHubStats } from "@/components/github-stats"
import { statusCards } from "@/lib/data"

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-16 px-6">
      <div className="mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-4 justify-center"
        >
          {statusCards.map((card, index) => (
            <div
              key={card.label}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 text-xs font-mono ${
                card.label === "Mode" ? "hidden sm:flex" : "flex"
              }`}
            >
              <span className="text-muted-foreground">{card.label}:</span>
              <span className="text-foreground">{card.value}</span>
              {index === 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          ))}
        </motion.div>

        <div className="flex justify-center mb-8">
          <GitHubStats />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center justify-center max-w-6xl mx-auto">
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight text-balance mb-8"
            >
              Engineer building systems that connect{" "}
              <span className="text-primary">data</span>,{" "}
              <span className="text-primary">people</span>, and{" "}
              <span className="text-primary">ideas</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
            >
              Computer Science and Data Science graduate focused on full-stack engineering, 
              data workflows, AI-powered tools, and human-centered technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="gap-2" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="/Fatih_Berk_Yozgatli_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4" />
                  Open Resume
                </a>
              </Button>
              <Button size="lg" variant="ghost" className="gap-2" asChild>
                <a href="#contact">
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 text-xs text-muted-foreground font-mono"
            >
              Press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-foreground">
                ⌘
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-foreground">
                K
              </kbd>{" "}
              to open command palette
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center -ml-10"
          >
            <Avatar />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
