"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github } from "lucide-react"

interface Language {
  name: string
  percentage: number
}

interface GitHubStats {
  languages: Language[]
  totalRepos: number
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const response = await fetch("/api/github-stats", {
          next: { revalidate: 3600 }
        })
        
        if (!response.ok) throw new Error("Failed to fetch")
        
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(true)
      }
    }

    fetchGitHubStats()
  }, [])

  if (error || !stats || !stats.languages || stats.languages.length === 0) return null

  // Limit to top 3 languages
  const topLanguages = stats.languages.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="hidden md:flex gap-3 items-center justify-center"
    >
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 text-xs font-mono">
        <Github className="w-3 h-3 text-muted-foreground" />
        <span className="text-muted-foreground">{stats.totalRepos}</span>
        <span className="text-muted-foreground">repos</span>
      </div>

      {topLanguages.map((lang, index) => (
        <div
          key={lang.name}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 text-xs font-mono"
        >
          <span className="text-muted-foreground">{lang.name}:</span>
          <span className="text-foreground">{lang.percentage}%</span>
          {index === 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          )}
        </div>
      ))}
    </motion.div>
  )
}
