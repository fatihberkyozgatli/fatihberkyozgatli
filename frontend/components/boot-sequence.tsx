"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BootSequenceProps {
  onComplete: () => void
}

const bootMessages = [
  { text: "Initializing fatihOS...", delay: 0 },
  { text: "Loading systems...", delay: 500 },
  { text: "System online.", delay: 900 },
]

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
      }, bootMessages[currentLine].delay + 400)
      return () => clearTimeout(timer)
    } else {
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 600)
      return () => clearTimeout(completeTimer)
    }
  }, [currentLine, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="max-w-md w-full px-6">
        <div className="font-mono text-sm space-y-2">
          {bootMessages.slice(0, currentLine).map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-primary">{">"}</span>
              <span className={index === bootMessages.length - 1 ? "text-primary" : "text-muted-foreground"}>
                {message.text}
              </span>
              {index === bootMessages.length - 1 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block w-2 h-2 rounded-full bg-primary glow-primary-sm"
                />
              )}
            </motion.div>
          ))}
          {currentLine < bootMessages.length && (
            <div className="flex items-center gap-2">
              <span className="text-primary">{">"}</span>
              <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-primary transition-opacity`}>
                _
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
