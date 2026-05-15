export type Project = {
  title: string
  slug: string
  category: "technical" | "leadership" | "professional" | "event"
  summary: string
  role: string
  stack?: string[]
  featured: boolean
  image?: string
  links?: {
    github?: string
    demo?: string
    caseStudy?: string
  }
  highlights: string[]
  problem?: string
  impact?: string
  architecture?: string
}

export type Experience = {
  title: string
  organization: string
  dates: string
  summary: string
  bullets: string[]
  skills?: string[]
}

export type TimelineEvent = {
  year: string
  title: string
  description: string
  type: "education" | "project" | "leadership" | "work" | "milestone"
}

export type LeadershipEntry = {
  title: string
  organization: string
  role: string
  dates: string
  summary: string
  highlights: string[]
  impact?: string
}

export type EventEntry = {
  title: string
  date: string
  role: string
  summary: string
  images?: string[]
  outcome?: string
}

export const projects: Project[] = [
  {
    title: "Intermediary Property DB Management System",
    slug: "billingsley-data-integration",
    category: "technical",
    summary: "Built a centralized data integration platform that automates nightly property data imports from Yardi financial systems and delivers them to internal company applications via secure APIs.",
    role: "Frontend Lead / UI Developer",
    stack: ["React", "TypeScript", "FastAPI", "Django", "Python", "MySQL", "JWT", "Azure", "Node.js", "Nginx", "SFTP", "Git"],
    featured: true,
    links: {
      github: "https://github.com/SamSkanse/Billingsley-Senior-Design-Project"
    },
    highlights: [
      "Led UI/UX design and built responsive React dashboard with real-time logs, flexible scheduling, and data access controls",
      "Architected 6-layer full-stack system with Python preprocessing, MySQL storage, FastAPI API layer, and React frontend for external app delivery",
      "Deployed production system on Azure Windows VM with Nginx reverse proxy and WinSW service management; automated data imports via APScheduler",
      "Implemented secure authentication with JWT tokens, API key management, 5-minute rate limiting, and Pydantic data validation preventing database corruption",
      "Delivered fully functional platform replacing manual recurring processes with automated scheduled data delivery; 2nd Place Winner at Senior Design Expo"
    ],
    problem: "Billingsley was manually downloading all property data from third-party financial software each time, uploading it to separate internal applications, and repeating constantly. This process was slow, tedious, and created data inconsistencies as information changed over time.",
    impact: "Removed the manual process entirely. The system now automatically ingests data on a customizable schedule, stores it centrally in MySQL, and serves it to multiple internal apps via authenticated APIs. Eliminates data sync errors and operational overhead.",
    architecture: ""
  }
]

export const experiences: Experience[] = [
  {
    title: "Junior Software and Data Associate",
    organization: "JR Dallas Wealth Management",
    dates: "Sept. 2025 – Present",
    summary: "Designing and maintaining Excel-based databases while automating data processes and developing internal analysis tools.",
    bullets: [
      "Designed and maintained Excel-based databases to manage client, account, and performance data across wealth management and retail divisions",
      "Automated recurring data updates and validation scripts, improving data accuracy and reducing manual effort by 30%",
      "Developed internal data analysis and visualization tools in Python and Excel, streamlining reporting for senior management"
    ],
    skills: ["Python", "Excel", "SQL", "Data Analysis", "Database Design", "Automation", "Scripting", "Reporting"]
  },
  {
    title: "AI Trainer",
    organization: "Outlier AI",
    dates: "May 2025 – Oct. 2025",
    summary: "Designed and evaluated prompts for real-world web applications, creating 50+ web applications while comparing outputs from multiple LLMs.",
    bullets: [
      "Designed and evaluated prompts for 50+ real-world web applications, comparing outputs from 3+ large language models (LLMs) for accuracy, coherence, and usability",
      "Built and refined HTML, React, and JavaScript-based responses as ground truth data to train and improve model reasoning and alignment",
      "Contributed to model performance optimization by identifying edge cases and generating corrective outputs, enhancing system reliability across diverse user intents"
    ],
    skills: ["React", "JavaScript", "HTML", "LLM Evaluation", "Prompt Engineering", "Web Development", "LLM Training", "Data Labeling"]
  },
  {
    title: "Teaching Assistant",
    organization: "Southern Methodist University",
    dates: "Aug. 2023 – May 2024",
    summary: "Conducted weekly lab sessions and provided comprehensive feedback on assignments for computer science students learning C++.",
    bullets: [
      "Conducted weekly lab sessions to clarify complex computer science concepts and provide assistance to students learning C++",
      "Graded 40+ assignments weekly and provided written feedback for 60+ students to support understanding of algorithmic concepts",
      "Supported students' transition from Java to C++ by reinforcing foundational programming principles from previous courses"
    ],
    skills: ["C++", "Java", "Teaching", "Algorithms", "Data Structures", "Mentoring", "Technical Communication", "Code Review"]
  },
  {
    title: "Data Associate",
    organization: "Dialogue Institute Dallas",
    dates: "Aug. 2023 – May 2024",
    summary: "Conducted data collection and analysis to enhance community outreach, creating databases to manage event organization across the DFW area.",
    bullets: [
      "Conducted data collection and analysis to enhance community outreach and engagement at the Dialogue Institute in Dallas",
      "Created a database with relevant individuals' information for event organization, targeting schools across all of the DFW area",
      "Supported interfaith and intercultural dialogue events by managing large data sets and researching outreach strategies"
    ],
    skills: ["Data Analysis", "Database Design", "SQL", "Event Management", "Research", "Community Engagement", "Outreach", "Information Management"]
  }
]

export const leadership: LeadershipEntry[] = [
  {
    title: "Organization Name",
    organization: "Company",
    role: "Role",
    dates: "Start Date - Present",
    summary: "Summary",
    highlights: [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3",
      "Achievement 4"
    ],
    impact: "Impact"
  }
]

export const events: EventEntry[] = [
  {
    title: "Event Name",
    date: "Date",
    role: "Role",
    summary: "Summary",
    outcome: "Outcome"
  }
]

export const timeline: TimelineEvent[] = [
  {
    year: "2025",
    title: "Current Focus",
    description: "What are you working on or focused on right now?",
    type: "milestone"
  },
  {
    year: "2024",
    title: "Key Achievement",
    description: "An important milestone or achievement from this year.",
    type: "project"
  },
  {
    year: "2023",
    title: "Starting Point",
    description: "An earlier milestone that matters to your journey.",
    type: "work"
  }
]

export const skills = {
  languages: ["Python", "C++", "Java", "SQL", "R", "HTML", "CSS", "JavaScript"],
  frontend: ["React", "TypeScript", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
  backend: ["Flask", "FastAPI", "Django", "Python", "MySQL", "JWT"],
  data: ["SQL", "R", "RapidMiner", "Pandas", "NumPy"],
  tools: ["Git", "MySQL", "VS Code", "IntelliJ", "CLion", "Eclipse", "Node.js", "Azure", "Excel"],
  concepts: ["Data Structures", "Algorithms", "System Design", "Full Stack Development"]
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Systems", href: "#systems" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" }
]

export const commands = [
  { label: "Open Projects", action: "navigate", target: "#projects" },
  { label: "Open Example Project", action: "navigate", target: "/projects/example-project" },
  { label: "View Resume", action: "external", target: "/Fatih_Berk_Yozgatli_Resume.pdf" },
  { label: "Open GitHub", action: "external", target: "https://github.com/fatihberkyozgatli" },
  { label: "Open LinkedIn", action: "external", target: "https://www.linkedin.com/in/fatih-berk-yozgatli-4b623b261/" },
  { label: "Contact Me", action: "navigate", target: "#contact" },
  { label: "Toggle Theme", action: "theme", target: "" },
  { label: "Open Leadership", action: "navigate", target: "#leadership" },
  { label: "Open Timeline", action: "navigate", target: "#timeline" }
]

export const statusCards = [
  { label: "Status", value: "Building" },
  { label: "Focus", value: "Data/AI/ML" },
  { label: "Location", value: "Dallas, TX" },
  { label: "Current", value: "Job Search" },
  { label: "Mode", value: "Recruiter-Ready" }
]