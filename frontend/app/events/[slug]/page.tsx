import type { Metadata } from "next"
import { events } from "@/lib/data"
import EventClient from "./event-client"

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)
  if (!event) return {}
  return {
    title: `${event.title} — Fatih Berk Yozgatli`,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
    },
    twitter: {
      card: "summary",
      title: event.title,
      description: event.summary,
    },
  }
}

export default async function EventPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return <EventClient slug={slug} />
}
