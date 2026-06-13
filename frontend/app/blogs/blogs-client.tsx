"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { blogPostsWithReadingTime } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, BookOpen } from "lucide-react"
import { NavbarActions } from "@/components/navbar-actions"
import { BackToTop } from "@/components/back-to-top"
import { useCommandPalette } from "@/components/command-palette-provider"

type CategoryFilter = "all" | "career" | "leadership" | "growth" | "reflection"

export default function BlogsClient() {
  const [filter, setFilter] = useState<CategoryFilter>("all")
  const { open } = useCommandPalette()

  const filteredPosts =
    filter === "all"
      ? blogPostsWithReadingTime
      : blogPostsWithReadingTime.filter((p) => p.category === filter)

  const categoryButtons: { label: string; value: CategoryFilter }[] = [
    { label: "All", value: "all" },
    { label: "Career", value: "career" },
    { label: "Leadership", value: "leadership" },
    { label: "Growth", value: "growth" },
    { label: "Reflection", value: "reflection" }
  ]

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#blogs">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
          <NavbarActions onOpenCommandPalette={open} />
        </div>
      </header>

      <section className="pt-12 pb-12 px-6 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-mono text-sm">/blogs</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Stories & Reflections</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Thoughts on building, leading, growing, and the journey. Real reflections from navigating tech, startups, and personal growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {categoryButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-3 py-1.5 rounded-full border text-sm font-mono transition-all cursor-pointer ${
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
      </section>

      <section className="pt-8 pb-24 px-6 bg-card/20">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-4 gap-4"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full"
                >
                  <Link href={`/blogs/${post.slug}`} className="absolute inset-0 rounded-lg" aria-label={post.title} />
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary capitalize">
                      {post.category}
                    </span>
                  </div>

                  {post.linkedinUrl && (
                    <div className="relative z-10 flex gap-2 pt-2 mt-2 border-t border-border">
                      <Button size="sm" variant="ghost" className="gap-2 flex-1 text-xs h-8" asChild>
                        <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="w-3 h-3" />
                          View on LinkedIn
                        </a>
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>
      <BackToTop />
    </main>
  )
}
