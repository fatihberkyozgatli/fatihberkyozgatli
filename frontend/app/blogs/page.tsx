"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { blogPostsWithReadingTime } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ChevronLeft, BookOpen } from "lucide-react"

type CategoryFilter = "all" | "career" | "leadership" | "growth" | "reflection"

export default function BlogPage() {
  const [filter, setFilter] = useState<CategoryFilter>("all")

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
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <Link href={`/blogs/${post.slug}`}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-mono text-muted-foreground">{post.date}</p>
                            <p className="text-xs font-mono text-primary">{post.readingTime} min read</p>
                          </div>
                        </div>
                        <p className="text-sm text-primary capitalize">{post.category}</p>
                      </div>
                    </div>
                  </Link>
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
    </main>
  )
}
