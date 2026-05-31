"use client"

import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  FolderOpen,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sun,
  Users,
  Clock,
  Search,
  Calendar,
  Award,
  Code,
  Briefcase,
  BookOpen,
} from "lucide-react"
import { commands } from "@/lib/data"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const iconMap: Record<string, React.ReactNode> = {
  "Open Projects": <FolderOpen className="w-4 h-4" />,
  "Billingsley Data Integration": <Code className="w-4 h-4" />,
  "Image2Surface 3D Mesh": <Code className="w-4 h-4" />,
  "Turkish Super League Prediction": <Code className="w-4 h-4" />,
  "Sentiment Analyzer": <Code className="w-4 h-4" />,
  "Search Engine": <Code className="w-4 h-4" />,
  "Open Skills": <Code className="w-4 h-4" />,
  "Open Experience": <Briefcase className="w-4 h-4" />,
  "Open Leadership": <Users className="w-4 h-4" />,
  "Open Events": <Calendar className="w-4 h-4" />,
  "High School Career Fair": <Calendar className="w-4 h-4" />,
  "5th Annual Convention": <Calendar className="w-4 h-4" />,
  "Open Blogs": <BookOpen className="w-4 h-4" />,
  "You're Not Alone. We've Got This": <BookOpen className="w-4 h-4" />,
  "Life Keeps Moving Even When You Pause": <BookOpen className="w-4 h-4" />,
  "The Engineers Ring": <BookOpen className="w-4 h-4" />,
  "From SMU to the World": <BookOpen className="w-4 h-4" />,
  "Open Awards": <Award className="w-4 h-4" />,
  "Open Timeline": <Clock className="w-4 h-4" />,
  "View Resume": <FileText className="w-4 h-4" />,
  "Open GitHub": <Github className="w-4 h-4" />,
  "Open LinkedIn": <Linkedin className="w-4 h-4" />,
  "Contact Me": <Mail className="w-4 h-4" />,
  "Toggle Theme": <Sun className="w-4 h-4" />,
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { theme, setTheme } = useTheme()
  const scrollContainerRef = useCallback((element: HTMLDivElement | null) => {
    if (element && selectedIndex >= 0) {
      const selectedButton = element.querySelector(
        `button:nth-child(${selectedIndex + 1})`
      ) as HTMLButtonElement | null
      selectedButton?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [selectedIndex])

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  const executeCommand = useCallback(
    (command: (typeof commands)[0]) => {
      switch (command.action) {
        case "navigate":
          if (command.target.startsWith("#")) {
            if (window.location.pathname === "/") {
              const element = document.querySelector(command.target)
              element?.scrollIntoView({ behavior: "smooth" })
            } else {
              sessionStorage.setItem("pendingScroll", command.target)
              window.location.href = "/"
            }
          } else {
            window.location.href = command.target
          }
          break
        case "external":
          window.open(command.target, "_blank", "noopener,noreferrer")
          break
        case "theme":
          setTheme(theme === "dark" ? "light" : "dark")
          break
      }
      onClose()
      setSearch("")
      setSelectedIndex(0)
    },
    [theme, setTheme, onClose]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          )
          break
        case "Enter":
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex])
          }
          break
        case "Escape":
          onClose()
          setSearch("")
          setSelectedIndex(0)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, executeCommand, onClose])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
          >
            <div className="mx-4 overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="px-2 py-1 rounded bg-secondary text-xs text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2" ref={scrollContainerRef}>
                {filteredCommands.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No commands found.
                  </p>
                ) : (
                  <div className="space-y-1">
                    {filteredCommands.map((command, index) => (
                      <button
                        key={command.label}
                        onClick={() => executeCommand(command)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm rounded-md transition-colors ${
                          index === selectedIndex
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <span
                          className={
                            index === selectedIndex
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {iconMap[command.label] || (
                            <FolderOpen className="w-4 h-4" />
                          )}
                        </span>
                        {command.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-secondary">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-secondary">↵</kbd>
                  select
                </span>
              </div>
              <span className="font-mono">fatihOS</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
