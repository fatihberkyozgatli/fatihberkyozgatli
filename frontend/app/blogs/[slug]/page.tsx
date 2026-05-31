"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Calendar, Clock, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { blogPostsWithReadingTime } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { NavbarActions } from "@/components/navbar-actions"
import { useCommandPalette } from "@/components/command-palette-provider"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const { open: openCommandPalette } = useCommandPalette()

  const post = blogPostsWithReadingTime.find((p) => p.slug === slug)
  const [otherPosts, setOtherPosts] = useState<typeof blogPostsWithReadingTime>([])

  useEffect(() => {
    const others = blogPostsWithReadingTime.filter((p) => p.slug !== slug)
    setOtherPosts([...others].sort(() => Math.random() - 0.5).slice(0, 2))
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/#blogs">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#blogs">
            <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            {post.linkedinUrl && (
              <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-2">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <NavbarActions onOpenCommandPalette={openCommandPalette} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link href="/#blogs" className="hover:text-foreground transition-colors">
              Blogs
            </Link>
            <span>/</span>
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold capitalize">
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">{post.title}</h1>

          <div className="flex items-center gap-6 mb-12 text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {post.images[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-80 rounded-lg overflow-hidden mb-12 border border-primary/20 shadow-lg shadow-primary/10"
            >
              <Image
                src={post.images[0]}
                alt={`${post.title} - Image 1`}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg leading-relaxed text-foreground space-y-4 mb-12"
          >
            {post.content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.trim().startsWith("–")) {
                const bullets = paragraph.split("\n").filter(line => line.trim().startsWith("–"))
                return (
                  <ul key={idx} className="space-y-3 ml-4">
                    {bullets.map((bullet, bulletIdx) => {
                      const text = bullet.replace(/^–\s*/, "")
                      const parts = text.split(/\*\*(.*?)\*\*/g)
                      return (
                        <li key={bulletIdx} className="flex gap-3">
                          <span className="text-primary flex-shrink-0 mt-1">•</span>
                          <span>
                            {parts.map((part, partIdx) =>
                              partIdx % 2 === 1 ? (
                                <strong key={partIdx}>{part}</strong>
                              ) : (
                                <span key={partIdx}>{part}</span>
                              )
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                )
              }
              const parts = paragraph.split(/\*\*(.*?)\*\*/g)
              return (
                <p key={idx}>
                  {parts.map((part, partIdx) =>
                    partIdx % 2 === 1 ? (
                      <strong key={partIdx}>{part}</strong>
                    ) : (
                      <span key={partIdx}>{part}</span>
                    )
                  )}
                </p>
              )
            })}
          </motion.div>

          {post.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12"
            >
              {post.images
                .filter((_, index) => {
                  // For graduation post, skip image1 (index 0)
                  if (post.category === "leadership" && index === 0) return false
                  // For growth post, skip image1 (index 0)
                  if (post.category === "growth" && index === 0) return false
                  return true
                })
                .map((image, index) => (
                  <div
                    key={index}
                    className={`flex justify-center ${
                      index === 0 && post.category === "growth" ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className={`relative rounded-lg overflow-hidden border border-primary/20 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all ${
                      index === 0 && post.category === "growth" ? "w-full md:max-w-lg h-96" : "w-full h-80"
                    }`}>
                      <Image
                        src={image}
                        alt={`${post.title} - Image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
            </motion.div>
          )}

          {otherPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 pt-8 border-t border-border"
            >
              <h3 className="text-2xl font-semibold mb-8">Other Stories</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {otherPosts.map((otherPost) => (
                  <div
                    key={otherPost.id}
                    className="group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                  >
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        <Link href={`/blogs/${otherPost.slug}`}>{otherPost.title}</Link>
                      </h4>
                      <p className="text-xs font-mono text-muted-foreground mb-1">{otherPost.date}</p>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-mono bg-primary/10 text-primary capitalize">
                        {otherPost.category}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-border">
                      {otherPost.linkedinUrl && (
                        <Button size="sm" variant="ghost" className="gap-2 flex-1" asChild>
                          <a href={otherPost.linkedinUrl} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="w-4 h-4" />
                            View on LinkedIn
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
