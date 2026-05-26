import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 120
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
  return Math.max(3, Math.ceil(wordCount / wordsPerMinute))
}
