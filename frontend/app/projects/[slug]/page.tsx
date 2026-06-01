import type { Metadata } from "next"
import { projects } from "@/lib/data"
import ProjectClient from "./project-client"

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Fatih Berk Yozgatli`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
    },
    twitter: {
      card: "summary",
      title: project.title,
      description: project.summary,
    },
  }
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return <ProjectClient slug={slug} />
}
