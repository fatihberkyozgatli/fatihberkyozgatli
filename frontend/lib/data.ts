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
  highlights?: string[]
  images?: string[]
  outcome?: string
}

export type AwardEntry = {
  title: string
  highlight: string
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
    title: "The Dialogue Society",
    organization: "Southern Methodist University",
    role: "Founder and President",
    dates: "Aug. 2023 – May 2026",
    summary: "Founded and led one of SMU's largest student organizations, securing significant university funding and sponsorships.",
    highlights: [
      "Grew membership from 2 to 300+, making it one of SMU's largest student organizations",
      "Secured $10K in university funding and sponsorships",
      "Built a thriving community focused on dialogue and engagement across campus",
      "Established organizational structure and leadership framework for sustainable growth"
    ],
    impact: "Transformed a concept into a 300+ member organization that became a flagship community initiative at SMU."
  },
  {
    title: "Raindrop Dallas",
    organization: "Raindrop Dallas",
    role: "Mentor",
    dates: "Aug. 2022 – Present",
    summary: "Mentoring local high-school students through weekly sessions focused on STEM skills, college readiness, and scholarship applications.",
    highlights: [
      "Mentored local high-school students through weekly sessions focused on STEM skills, college readiness, and scholarship applications",
      "Provided personalized guidance on academic pathways and career exploration in tech fields",
      "Helped students develop technical skills and prepare for college entrance requirements",
      "Supported scholarship application process and college transition planning"
    ],
    impact: "Empowered underrepresented high-school students to pursue STEM careers and higher education opportunities."
  }
]

export const awards: AwardEntry[] = [
  {
    title: "Provost Scholar",
    highlight: "Recognized for outstanding academic performance and consistent excellence in coursework."
  },
  {
    title: "SMU Discovery Scholarship",
    highlight: "Full scholarship recognizing exceptional potential in computer science and data science."
  },
  {
    title: "SMU Honors Program",
    highlight: "Invited to SMU's honors program for high-achieving students pursuing advanced coursework."
  },
  {
    title: "Order of the Engineer & NSPE Induction",
    highlight: "Honored member of NSPE with lifelong commitment to ethical engineering excellence."
  }
]

export const events: EventEntry[] = [
  {
    title: "High School Career Fair",
    date: "Feb. 14, 2026",
    role: "Organizer & Speaker",
    summary: "Hosted 100+ students and helped them explore majors, careers, and real college advice — so many bright futures in one room!",
    outcome: "Connected high school students with meaningful career guidance and pathways",
    highlights: [
      "Reached 100+ high school students exploring STEM majors and career pathways",
      "Delivered real college advice and mentorship from software engineers and industry professionals",
      "Connected motivated students with tangible pathways to tech careers and higher education"
    ]
  },
  {
    title: "Annual Convention",
    date: "Feb 7, 2026",
    role: "Founder & Organizer",
    summary: "The Dialogue Society's 5th Annual Convention brought together 200+ students from 5+ DFW universities for a full day of dialogue, connection, and purposeful engagement in the digital age.",
    outcome: "Strengthened dialogue and community building across the region with keynote speakers and interactive programming",
    highlights: [
      "Gathered 200+ students from 5+ universities for full-day dialogue conference on purpose, identity, and connection",
      "Featured keynote speakers (Enes Bilgin, Klyne Smith) on building meaningful human connections in the digital age and AI era",
      "Included panel sessions and interactive workshops on career development, ethical AI engagement, and community building"
    ]
  }
]

export const timeline: TimelineEvent[] = [
  {
    year: "2021",
    title: "Finished High School",
    description: "Completed secondary education and prepared for university.",
    type: "milestone"
  },
  {
    year: "2021",
    title: "Moved to the United States",
    description: "Relocated from Albania to pursue higher education and new opportunities.",
    type: "milestone"
  },
  {
    year: "2022",
    title: "Started SMU",
    description: "Began studies at Southern Methodist University, pursuing dual degrees in Computer Science and Data Science.",
    type: "education"
  },
  {
    year: "2022",
    title: "Started Mentoring at Raindrop Dallas",
    description: "Began mentoring high-school students through weekly sessions focused on STEM skills and college readiness.",
    type: "leadership"
  },
  {
    year: "2023",
    title: "Founded The Dialogue Society",
    description: "Established and grew one of SMU's largest student organizations from 2 to 300+ members.",
    type: "leadership"
  },
  {
    year: "2023",
    title: "Teaching Assistant at SMU",
    description: "Started conducting C++ lab sessions for 60+ students and grading assignments weekly.",
    type: "work"
  },
  {
    year: "2023",
    title: "Intern at Dialogue Institute Dallas",
    description: "Worked as Data Associate managing community outreach, data collection, and database creation.",
    type: "work"
  },
  {
    year: "2023",
    title: "Completed Search Engine Project",
    description: "Developed a C++ search engine indexing 300,000+ business articles using advanced data structures.",
    type: "project"
  },
  {
    year: "2024",
    title: "Left Dialogue Institute Intern Position",
    description: "Completed internship and concluded data work with the Dialogue Institute.",
    type: "milestone"
  },
  {
    year: "2024",
    title: "Left SMU Teaching Assistant Position",
    description: "Completed TA role after providing comprehensive support to computer science students.",
    type: "milestone"
  },
  {
    year: "2025",
    title: "AI Trainer at Outlier AI",
    description: "Designed and evaluated prompts for 50+ real-world web applications, comparing LLM outputs.",
    type: "work"
  },
  {
    year: "2025",
    title: "Junior Software & Data Associate at JR Dallas",
    description: "Started role designing Excel databases and automating data processes for wealth management.",
    type: "work"
  },
  {
    year: "2026",
    title: "Billingsley Senior Design Project",
    description: "Led UI/UX design for centralized data integration platform. 2nd Place Winner at Senior Design Expo.",
    type: "project"
  },
  {
    year: "2026",
    title: "Graduated from SMU",
    description: "Completed dual Bachelor of Science degrees in Computer Science and Data Science.",
    type: "education"
  },
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
  { label: "View Resume", action: "external", target: "/Fatih_Berk_Yozgatli_Resume.pdf" },
  { label: "Open GitHub", action: "external", target: "https://github.com/fatihberkyozgatli" },
  { label: "Open LinkedIn", action: "external", target: "https://www.linkedin.com/in/fatih-berk-yozgatli-4b623b261/" },
  { label: "Contact Me", action: "navigate", target: "#contact" },
  { label: "Toggle Theme", action: "theme", target: "" },
  { label: "Open Skills", action: "navigate", target: "#skills" },
  { label: "Open Experience", action: "navigate", target: "#experience" },
  { label: "Open Leadership", action: "navigate", target: "#leadership" },
  { label: "Open Events", action: "navigate", target: "#events" },
  { label: "High School Career Fair", action: "navigate", target: "/events/high-school-career-fair" },
  { label: "Annual Convention", action: "navigate", target: "/events/annual-convention" },
  { label: "Open Awards", action: "navigate", target: "#awards" },
  { label: "Open Timeline", action: "navigate", target: "#timeline" }
]

export const statusCards = [
  { label: "Status", value: "Building" },
  { label: "Focus", value: "Data/AI/ML" },
  { label: "Location", value: "Dallas, TX" },
  { label: "Current", value: "Job Search" },
  { label: "Mode", value: "Recruiter-Ready" }
]