"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { eventsWithReadingTime } from "@/lib/data"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NavbarActions } from "@/components/navbar-actions"
import { useCommandPalette } from "@/components/command-palette-provider"

export default function EventDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { open: openCommandPalette } = useCommandPalette()

  const event = eventsWithReadingTime.find((e) => 
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
            Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#events">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
          <NavbarActions onOpenCommandPalette={openCommandPalette} />
        </div>
      </header>

      <main className="pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative h-[500px] w-full overflow-hidden"
        >
          {event.heroImage ? (
            <Image
              src={event.heroImage}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Hero image placeholder</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-12 text-white"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-primary mb-6">
              <span className="text-sm font-semibold">{event.role}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 max-w-3xl">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{event.readingTime} min read</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {event.summary}
            </p>
          </motion.section>

          {event.openingNarrative && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              <div className="md:col-span-2 space-y-6">
                {event.openingNarrative.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    className="text-lg text-muted-foreground leading-relaxed first:text-xl first:font-semibold first:text-foreground"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              {event.candidImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative h-80 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={event.candidImage}
                    alt="Candid event image"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </motion.section>
          )}

          {event.designSection && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-20 py-12 border-t border-b border-border"
            >
              <h2 className="text-3xl font-bold mb-8">Designing the Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-6">
                  {event.designSection.split('\n\n').map((paragraph, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                      className="text-muted-foreground leading-relaxed"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                <div className="md:col-span-1 flex flex-col gap-6">
                  {event.boothImages?.slice(0, 2).reverse().map((image, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-video rounded-lg border border-border bg-muted flex items-center justify-center cursor-pointer overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Booth image ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {event.logisticsSection && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-20 py-12 bg-card rounded-lg border border-border p-8"
            >
              <h2 className="text-3xl font-bold mb-8">Leadership & Logistics</h2>
              <div className="space-y-6">
                {event.logisticsSection.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + idx * 0.1 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.section>
          )}

          {event.momentSection && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-20 py-12"
            >
              {event.momentImage && (
                <div className="mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                    className="relative h-96 rounded-lg border border-border bg-muted mb-8 flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={event.momentImage}
                      alt="Event moment"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              )}
              
              <div className="max-w-2xl mx-auto text-center space-y-6">
                {event.momentSection.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.75 + idx * 0.1 }}
                    className="text-lg text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.section>
          )}

          {event.closingReflection && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-12 py-16 bg-gradient-to-b from-primary/5 to-background rounded-lg border border-border p-8"
            >
              <h2 className="text-3xl font-bold mb-8">Closing Reflection</h2>
              <div className="space-y-6 mb-8">
                {event.closingReflection.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 + idx * 0.1 }}
                    className="text-lg text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                  className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  {event.closingImages?.map((image, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 + idx * 0.1 }}
                      className="relative aspect-video rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`Closing image ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-center text-muted-foreground italic mt-12 pt-8 border-t border-border"
              >
                "Connecting students with real stories, real careers, and real possibilities."
              </motion.p>
            </motion.section>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="flex justify-center py-16"
          >
            <Link href="/#events">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </button>
            </Link>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="py-20 border-t border-border"
          >
            <h2 className="text-3xl font-bold mb-12">Other Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventsWithReadingTime
                .filter((e) => e.title.toLowerCase().replace(/\s+/g, "-") !== slug)
                .map((otherEvent, idx) => (
                  <motion.div
                    key={otherEvent.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 + idx * 0.1 }}
                  >
                    <Link
                      href={`/events/${otherEvent.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group block"
                    >
                      <div className="rounded-lg border border-border bg-card hover:border-primary/50 transition-colors overflow-hidden cursor-pointer">
                        {otherEvent.heroImage && (
                          <div className="relative h-48 bg-muted">
                            <Image
                              src={otherEvent.heroImage}
                              alt={otherEvent.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                            {otherEvent.role}
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {otherEvent.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">{otherEvent.summary}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{otherEvent.date}</span>
                            <span className="text-primary font-semibold group-hover:translate-x-2 transition-transform">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
