import { NextResponse } from "next/server"

const GITHUB_USERNAME = "fatihberkyozgatli"
const GITHUB_TOKEN = process.env.GITHUB_API_TOKEN

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    )
  }

  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    )

    if (!reposRes.ok) {
      throw new Error("Failed to fetch repositories")
    }

    const repos = await reposRes.json()

    const languages: Record<string, number> = {}
    let reposWithLanguage = 0

    for (const repo of repos) {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1
        reposWithLanguage++
      }
    }

    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([lang, count]) => ({
        name: lang,
        percentage: Math.round((count / reposWithLanguage) * 100),
      }))

    return NextResponse.json(
      {
        languages: sortedLanguages,
        totalRepos: repos.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  } catch (error) {
    console.error("Error fetching GitHub stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    )
  }
}
