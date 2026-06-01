import type { Metadata } from "next"
import BlogsClient from "./blogs-client"

export const metadata: Metadata = {
  title: "Stories & Reflections — Fatih Berk Yozgatli",
  description: "Thoughts on building, leading, growing, and the journey. Real reflections from navigating tech, startups, and personal growth.",
  openGraph: {
    title: "Stories & Reflections — Fatih Berk Yozgatli",
    description: "Thoughts on building, leading, growing, and the journey.",
  },
  twitter: {
    card: "summary",
    title: "Stories & Reflections — Fatih Berk Yozgatli",
    description: "Thoughts on building, leading, growing, and the journey.",
  },
}

export default function BlogsPage() {
  return <BlogsClient />
}
