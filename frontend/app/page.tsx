"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { BootSequence } from "@/components/boot-sequence"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { LeadershipSection } from "@/components/leadership-section"
import { EventsSection } from "@/components/events-section"
import { AwardsSection } from "@/components/awards-section"
import { Timeline } from "@/components/timeline"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CommandPalette } from "@/components/command-palette"

export default function Home() {
  const [isBooting, setIsBooting] = useState<boolean | null>(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  const handleBootComplete = useCallback(() => {
    setIsBooting(false)
    sessionStorage.setItem("fatihOS-booted", "true")
  }, [])

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("fatihOS-booted")
    setIsBooting(!hasBooted)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsCommandPaletteOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (isBooting === null) {
    return (
      <div className="fixed inset-0 bg-background" />
    )
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isBooting && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!isBooting && (
        <>
          <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
          
          <main>
            <Hero />
            <FeaturedProjects />
            <SkillsSection />
            <ExperienceSection />
            <LeadershipSection />
            <EventsSection />
            <AwardsSection />
            <Timeline />
            <ContactSection />
          </main>

          <Footer />

          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
          />
        </>
      )}
    </>
  )
}
