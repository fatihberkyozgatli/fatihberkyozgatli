"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { blogPostsWithReadingTime } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

export function BlogSection() {
  const allPosts = blogPostsWithReadingTime

  return (
    <section id="blogs" className="pt-12 pb-12 px-6 border-b border-border/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">/blogs</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Stories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Thoughts on career, leadership, growth, and the journey. Real reflections from building and leading.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {allPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 flex flex-col h-full ${index >= 2 ? "hidden md:flex" : ""}`}
            >
              <div className="flex-1">
                <div className="mb-3">
                  <Link href={`/blogs/${post.slug}`} className="block">
                    <h3 className="text-sm font-semibold line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary capitalize">
                  {post.category}
                </span>
              </div>

              <div className="flex gap-2 pt-2 mt-2 border-t border-border">
                {post.linkedinUrl && (
                  <Button size="sm" variant="ghost" className="gap-2 flex-1 text-xs h-8" asChild>
                    <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="w-3 h-3" />
                      View on LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link href="/blogs">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              View All Stories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
