"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Command } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarActionsProps {
  onOpenCommandPalette: () => void
}

export function NavbarActions({ onOpenCommandPalette }: NavbarActionsProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="hidden sm:flex items-center gap-2 text-foreground cursor-pointer hover:text-primary transition-colors"
        onClick={onOpenCommandPalette}
      >
        <Command className="w-4 h-4" />
        <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary text-xs cursor-pointer">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </Button>

      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  )
}
