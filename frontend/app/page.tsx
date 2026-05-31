"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { BootSequence } from "@/components/boot-sequence"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { BlogSection } from "@/components/blog-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { LeadershipSection } from "@/components/leadership-section"
import { EventsSection } from "@/components/events-section"
import { AwardsSection } from "@/components/awards-section"
import { Timeline } from "@/components/timeline"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { useCommandPalette } from "@/components/command-palette-provider"

export default function Home() {
  const [isBooting, setIsBooting] = useState<boolean | null>(null)
  const { open: openCommandPalette } = useCommandPalette()

  const handleBootComplete = useCallback(() => {
    setIsBooting(false)
    sessionStorage.setItem("fatihOS-booted", "true")
  }, [])

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("fatihOS-booted")
    setIsBooting(!hasBooted)
  }, [])

  useEffect(() => {
    if (isBooting !== false) return
    const target = sessionStorage.getItem("pendingScroll")
    if (target) {
      sessionStorage.removeItem("pendingScroll")
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })
      }, 150)
    }
  }, [isBooting])

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
          <Navbar onOpenCommandPalette={openCommandPalette} />
          
          <main>
            <Hero />
            <FeaturedProjects />
            <SkillsSection />
            <ExperienceSection />
            <LeadershipSection />
            <EventsSection />
            <BlogSection />
            <AwardsSection />
            <Timeline />
            <ContactSection />
          </main>

          <Footer />
        </>
      )}
    </>
  )
}
