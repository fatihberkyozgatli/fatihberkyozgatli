export type Project = {
  title: string
  slug: string
  category: "technical" | "leadership" | "professional" | "event"
  summary: string
  role: string
  stack?: string[]
  featured: boolean
  focus?: "fullstack" | "data-ai" | "systems"
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
  readingTime?: number
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
  location?: string
  role: string
  summary: string
  highlights?: string[]
  images?: string[]
  outcome?: string
  openingNarrative?: string
  designSection?: string
  logisticsSection?: string
  momentSection?: string
  closingReflection?: string
  heroImage?: string
  boothImages?: string[]
  momentImage?: string
  closingImages?: string[]
  candidImage?: string
  readingTime?: number
}

export type AwardEntry = {
  title: string
  highlight: string
}

export const projects: Project[] = [
  {
    title: "Intermediary Property DB Management System",
    slug: "billingsley-data-integration",
    category: "fullstack",
    summary: "Built a centralized data integration platform that automates nightly property data imports from Yardi financial systems and delivers them to internal company applications via secure APIs.",
    role: "Frontend Lead / UI Developer",
    stack: ["React", "TypeScript", "FastAPI", "Python", "MySQL", "JWT", "Azure", "Nginx", "SFTP", "APScheduler", "Paramiko", "Pydantic", "Uvicorn", "WinSW"],
    featured: true,
    focus: "fullstack",
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
    architecture: "The system follows a 6-layer ETL (Extract, Transform, Load) architecture optimized for data consistency, security, and scalability. Third-party Financial Software → Python Preprocessing → MySQL Storage → FastAPI API (Interaction Layer) → React Frontend (Admin) + External Applications. Data flows through multiple validation layers ensuring enterprise-grade reliability with financial records. APScheduler orchestrates customizable, scheduled data imports via SFTP using Paramiko for secure connections. Python preprocessing handles validation and data cleaning before MySQL storage with strict schema constraints. FastAPI with Uvicorn provides high-performance async access supporting concurrent requests. Pydantic ensures strict schema validation preventing malformed data from entering the database. JWT tokens with refresh token rotation secure all endpoints, while 5-minute rate limiting prevents brute-force attacks. Technical Decisions: FastAPI over Django for async-first architecture enabling high concurrency, plus automatic OpenAPI documentation for transparency. Paramiko for SFTP provides low-level control over connection lifecycle and security, integrating cleanly with APScheduler scheduling. JWT plus Rate Limiting enforces 5-minute lockout after 5 failed logins without permanent account blocks, balancing security and usability. User Deactivation (not deletion) maintains historical audit trail for compliance while allowing re-activation. Challenges & Solutions: Service Management required pivoting from NSSM to WinSW plus Nginx architecture when NSSM wasn't supported on Windows Server post-2020. WinSW wraps FastAPI as Windows service while Nginx acts as reverse proxy handling HTTP/S traffic and routing. Data source delays were addressed with manual import fallback allowing CSV uploads from local files while maintaining identical pipeline logic, enabling development continuation. Data integrity under load was solved with multi-layer validation: Pydantic schemas validate all ingested data before insertion, Python preprocessing handles missing fields gracefully, database constraints prevent invalid data at storage level, comprehensive error logging enables rapid troubleshooting of edge cases. Results: System processes monthly property updates for 500+ records across multiple property management divisions with zero data loss or corruption incidents since deployment. Customizable scheduled imports run as frequently as needed (daily, weekly, or custom cadence) eliminating manual processes entirely. Completely automated platform replaced recurring manual operations with autonomous scheduled data ingestion and delivery, increasing reliability and scalability. Senior Design Expo recognition validates full-stack systems engineering approach combining secure authentication, automated scheduling, data validation, and enterprise-grade infrastructure."
  },
  {
    title: "Image2Surface: 3D Mesh\nGeneration from Images",
    slug: "image-2-surface",
    category: "fullstack",
    summary: "Converts 2D images into interactive 3D surface models with layered architecture demonstrating clean separation of concerns and real-time mesh editing capabilities.",
    role: "Full-Stack Engineer",
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber", "FastAPI", "Python", "PyTorch", "NumPy", "OpenCV", "SciPy", "Axios", "CUDA/GPU"],
    featured: true,
    focus: "fullstack",
    links: {
      github: "https://github.com/Patriciomrt05/Image2Surface"
    },
    highlights: [
      "Implemented image processing pipeline with RGB→Grayscale→HeightMap→3D Mesh conversion achieving sub-5 second end-to-end latency",
      "Designed layered architecture with clean separation: Routes → Workflow → Services → Data layers for maintainability and testability",
      "Built interactive React Three Fiber viewer with real-time mesh editing (smoothing, denoising, scaling operations with intensity controls)",
      "Architected height map as primary editable state with mesh automatically derived from changes, ensuring data consistency and clean state management",
      "Planned and designed scalable microservices transition with independent image processing, surface generation, and editing services"
    ],
    problem: "Traditional image-to-3D conversion lacks clear architectural separation, making it difficult to maintain, test, and scale individual components. Manual mesh editing workflows are cumbersome and not interactive in real-time.",
    impact: "Delivers a functional, sub-5 second latency pipeline that converts any 2D image into an editable 3D mesh. The layered architecture enables easy testing, clear responsibilities, and a clear path to distributed microservices deployment.",
    architecture: "The system implements a 5-layer Layered Architecture with clear separation of concerns: Presentation Layer (Next.js React UI) → Communication Layer (Axios HTTP client) → API Layer (FastAPI endpoints) → Business Logic Layer (image processing, depth estimation, mesh generation) → Infrastructure Layer (file storage, PyTorch models).\n\nData Flow: User uploads image → Image validation and storage → Depth estimation via Depth Anything V2 model → Grayscale conversion and height map generation → 3D mesh construction with vertices and indices → Real-time Three.js visualization → Interactive editing (smoothing/scaling) → Mesh reset to original state\n\nKey Components: ImageUpload (file selection), SurfaceViewer (Three.js 3D rendering), EditControls (mesh operations), FastAPI routes for REST endpoints, OpenCV for image processing, PyTorch for depth inference, file system for persistent storage\n\nChallenges & Solutions:\n\n1. Achieving Sub-5 Second Latency\nProblem: Depth estimation using neural networks is computationally expensive, potentially taking 5+ seconds. Real-time user experience requires keeping end-to-end latency under 5 seconds including model inference, image processing, and mesh generation.\nSolution: Leveraged GPU acceleration through PyTorch CUDA support, implemented efficient NumPy vectorization for mesh generation, and optimized image preprocessing to reduce computational overhead. Profiling revealed depth estimation dominates (2800ms), while remaining operations complete in <200ms combined.\n\n2. Managing 1M+ Vertex Meshes on Mobile Devices\nProblem: High-resolution depth maps generate dense meshes with millions of vertices, causing performance bottlenecks and rendering issues on lower-end devices and browsers with limited WebGL support.\nSolution: Implemented downsampling parameter in depth estimation (adjustable 0.25-1.0 scale), created mesh optimization in Three.js using BufferGeometry, and added vertex decimation for mobile rendering. Users can trade detail for performance based on device capabilities.\n\n3. Stateless API with Complex Processing Pipelines\nProblem: REST API constraints require request-response cycles, but image-to-mesh conversion involves multiple sequential processing steps (upload → estimate → generate → edit). Managing session state across multiple requests is complex.\nSolution: Implemented image_id-based session tracking with in-memory storage (maps image_id to image data, depth maps, and mesh states). Each request uses image_id to retrieve prior state, enabling sequential operations while maintaining stateless API design. Stores intermediate results in temporary directories for consistency.\n\nKey Technical Decisions:\n\nLayered Architecture Over MVC: Selected Layered Architecture (scored 8.35/10) over MVC (7.75/10) because it provides better separation between API routes, business logic, and data layers. Clear layer boundaries simplify adding async processing, message queues, or microservices in future phases without major refactoring.\n\nDepth Anything V2 for Depth Estimation: Chose Depth Anything V2 model for superior zero-shot generalization across diverse image domains (indoor/outdoor, different lighting, object types) compared to alternatives. Lightweight ViT-small variant (~90MB) balances accuracy and inference speed.\n\nThree.js for 3D Rendering: Selected Three.js over Babylon.js for its smaller bundle size, mature React Three Fiber integration with Next.js, and superior mobile device support through WebGL optimization. Direct buffer geometry manipulation enables real-time mesh updates during editing operations.\n\nIn-Memory Session Storage: Chose file-based temporary storage with in-memory lookups over database solution because project is single-user, prototypical architecture (Phase 1). Supports easy migration to persistent database in Phase 2 with minimal changes to business logic layer.\n\nResults & Outcomes:\n\nSub-5 Second End-to-End Latency: Achieved average 3-4 second response time from image upload through mesh generation and initial render (GPU-accelerated depth estimation: 2800ms, image processing: 45ms, mesh generation: 35ms, frontend render: 100-200ms).\n\nInteractive 3D Manipulation: Implemented full-featured viewer with zoom (mouse scroll), rotate (click-drag), pan (right-click-drag) controls enabling intuitive exploration of generated 3D meshes from multiple angles and distances.\n\n1M+ Vertices Efficiently Processed: Successfully handled high-resolution meshes with downsampling enabling 1M+ vertices on desktop (native resolution) and 100K-500K vertices on mobile devices (0.25-0.5 downsampling) while maintaining 60 FPS interaction.\n\nFull-Stack Integration Demonstrated: Practical end-to-end system combining deep learning (PyTorch inference), backend orchestration (FastAPI async processing), and frontend rendering (React Three Fiber) showcasing architecture pattern effectiveness for AI-powered 3D applications."
  },
  {
    title: "Turkish Süper Lig Match Prediction",
    slug: "turkish-super-league-prediction",
    category: "datastructures-ml",
    summary: "Machine learning classification model predicting match outcomes in Turkish Süper Lig with 64% accuracy, a 42% improvement over baseline.",
    role: "Data Scientist",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Jupyter", "Matplotlib", "Seaborn"],
    featured: false,
    focus: "data-ai",
    links: {
      github: "https://github.com/fatihberkyozgatli/Turkish_Super_League_Match_Prediction"
    },
    highlights: [
      "Built 3-class classification model (Win/Draw/Loss) achieving 64% accuracy - 42% improvement over naive baseline",
      "Performed data preprocessing, feature engineering, and model evaluation using Scikit-learn pipelines",
      "Evaluated multiple models (Logistic Regression, Random Forest, SVM) and selected best performer",
      "Analyzed feature importance revealing home advantage and goals scored as strongest predictors"
    ]
  },
  {
    title: "Sentiment Analyzer - Tweets",
    slug: "sentiment-analyzer-tweets",
    category: "datastructures-ml",
    summary: "C++ sentiment classifier analyzing thousands of tweets with custom data structures. Achieved 73% accuracy using frequency-based model.",
    role: "Full-Stack Engineer",
    stack: ["C++", "CMake", "STL", "Memory Management", "Valgrind", "Catch2"],
    featured: false,
    focus: "data-ai",
    links: {
      github: "https://github.com/fatihberkyozgatli/Sentiment_Analyzer_Tweets"
    },
    highlights: [
      "Implemented custom DSString class using Rule of Three with full dynamic memory management",
      "Built sentiment classifier achieving 73% accuracy on Sentiment140 dataset using frequency-based training",
      "Designed modular architecture with Tokenizer, FileProcessor, and Classifier components",
      "Validated memory integrity with Valgrind - zero leaks with comprehensive unit testing"
    ]
  },
  {
    title: "Search Engine - Articles",
    slug: "search-engine-articles",
    category: "systems",
    summary: "High-performance C++ search engine indexing 300,000+ business articles with AVL Tree and inverted index data structures.",
    role: "Full-Stack Engineer",
    stack: ["C++", "CMake", "AVL Tree", "Linked List", "Hash Map", "RapidJSON", "Catch2"],
    featured: false,
    focus: "systems",
    links: {
      github: "https://github.com/fatihberkyozgatli/Search_Engine_Articles"
    },
    highlights: [
      "Indexed 300,000+ articles from Kaggle dataset achieving query response times under 1 second",
      "Implemented self-balanced AVL Tree serving as core Map data structure with O(log n) operations",
      "Built document parser with tokenization, stopword filtering, and persistent index storage/reload",
      "Developed interactive CLI with comprehensive Catch2 unit tests and memory leak validation"
    ]
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

export function enrichProjectsWithReadingTime(projectsList: Project[]): Project[] {
  const { calculateReadingTime } = require("./utils")
  return projectsList.map(project => {
    if (project.problem || project.impact || project.architecture) {
      const contentToRead = [
        project.summary,
        project.role,
        project.problem,
        project.impact,
        project.architecture,
        project.highlights?.join(" ")
      ]
        .filter(Boolean)
        .join(" ")
      return {
        ...project,
        readingTime: calculateReadingTime(contentToRead)
      }
    }
    return project
  })
}

export const projectsWithReadingTime = enrichProjectsWithReadingTime(projects)

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
    location: "SMU HTSC Ballrooms",
    role: "Organizer, Speaker, & Event Host",
    summary: "Bringing together high school students, university mentors, and industry professionals for an interactive career exploration experience designed around conversation, accessibility, and real guidance.",
    heroImage: "/images/events/careerfair-heroimage.png",
    outcome: "Connected high school students with meaningful career guidance and pathways",
    highlights: [
      "Reached 100+ high school students exploring STEM majors and career pathways",
      "Delivered real college advice and mentorship from software engineers and industry professionals",
      "Connected motivated students with tangible pathways to tech careers and higher education"
    ],
    boothImages: [
      "/images/events/careerfair-boothimage1.jpeg",
      "/images/events/careerfair-boothimage2.jpeg",
      "/images/events/careerfair-boothimage3.jpeg"
    ],
    momentImage: "/images/events/careerfair-eventimage.jpeg",
    closingImages: [
      "/images/events/careerfair-closingimage1.jpeg",
      "/images/events/careerfair-closingimage2.jpeg",
      "/images/events/careerfair-closingimage3.jpeg"
    ],
    candidImage: "/images/events/careerfair-candidimage.jpeg",
    openingNarrative: `When I first entered college, I felt completely unguided. I did not fully understand the differences between majors, career paths, internships, networking, or even the kinds of opportunities available within a university environment. A lot of what I learned came from trial and error, conversations with mentors, and events that exposed me to people already walking the paths I was curious about.

That experience stayed with me throughout college. I realized that many high school students, especially local students preparing to make major academic and career decisions, often do not have enough access to meaningful guidance before entering university. Career fairs and mentorship opportunities are usually introduced too late, after students have already committed to schools, majors, or directions they may not fully understand yet.

This event was created to help bridge that gap.

Together with my team, I organized the High School Career Fair at Southern Methodist University to create an environment where students could directly interact with professionals, university students, and mentors across a wide range of industries and academic fields. More than just a presentation-based event, the goal was to create genuine conversations, the kind that make students feel comfortable asking questions, exploring possibilities, and imagining themselves in spaces they may never have previously considered accessible.`,
    designSection: `One of the most important parts of organizing the event was making sure the experience felt interactive rather than passive. I did not want students sitting through long lectures without engagement. Instead, the event was intentionally designed around movement, conversation, and accessibility.

The career fair featured more than 50 professionals across industries including software engineering, cybersecurity, medicine, law, architecture, aviation, finance, education, public relations, psychology, and entrepreneurship. Students were encouraged to rotate freely between booths, ask questions, and engage in smaller conversations that felt approachable and personal rather than intimidating.

To support this structure, we created professional handbooks for panelists and question guides for students to encourage meaningful discussion. Professionals shared not only technical information about their careers, but also personal stories, misconceptions about their fields, lessons from failure, and advice they would give to their younger selves.

Students were not simply learning about jobs, they were learning about people, journeys, uncertainty, growth, and possibility.`,
    logisticsSection: `Behind the scenes, organizing the event required extensive coordination between volunteers, professionals, schools, and university administration. Since many attendees were minors visiting a university campus, logistics and supervision became one of the most important responsibilities throughout the planning process.

I served as one of the primary organizers and points of contact with the university, helping coordinate communication, event flow, volunteer management, timing, and overall supervision during the event itself. Weather conditions, scheduling constraints, and maintaining smooth movement throughout the venue all presented challenges that my team and I had to navigate carefully in real time.

Despite these challenges, the turnout exceeded our expectations. Seeing the ballroom filled with students actively engaging with professionals, asking questions, and exploring opportunities made months of preparation feel meaningful.`,
    momentSection: `One of the moments I remember most happened near the end of the event, when a student came up to me after walking through the booths and conversations throughout the evening. They told me they wanted to create a student organization and community similar to what we had built.

That interaction stayed with me because it represented something larger than career exploration alone.

The event was never only about majors, resumes, or professions. It was also about showing students that meaningful communities, mentorship, leadership, and impact are accessible to them much earlier than they may think. Sometimes all it takes is seeing people only a few years older creating something meaningful to begin imagining yourself doing the same.

For me, that was one of the clearest signs that the event accomplished what we hoped it would.`,
    closingReflection: `Looking back, the High School Career Fair became much more than a single event. It became a reminder of how important access, mentorship, and conversation can be during formative stages of life.

Seeing students confidently approach professionals, ask questions about careers and college, and begin imagining futures for themselves reminded me why spaces like this matter. It also reminded me how much impact community-driven initiatives can have when people come together with a shared purpose.

As someone who once entered college feeling uncertain and uninformed, helping create an environment that gave younger students clarity, encouragement, and inspiration was deeply meaningful to me.`
  },
  {
    title: "5th Annual Convention",
    date: "Feb. 7, 2026",
    location: "UT Dallas ECSW 1315",
    role: "Founder & Organizer",
    summary: "The Dialogue Society's 5th Annual Convention brought together 200+ students from 5+ DFW universities for a full day of dialogue, connection, and purposeful engagement in the digital age.",
    heroImage: "/images/events/convention-heroimage.jpg",
    outcome: "Strengthened dialogue and community building across the region with keynote speakers and interactive programming",
    highlights: [
      "Gathered 200+ students from 5+ universities for full-day dialogue conference on purpose, identity, and connection",
      "Featured keynote speakers on building meaningful human connections in the digital age and AI era",
      "Included panel sessions and interactive workshops on career development, ethical AI engagement, and community building"
    ],
    boothImages: [
      "/images/events/convention-boothimage1.jpg",
      "/images/events/convention-boothimage2.jpg"
    ],
    closingImages: [
      "/images/events/convention-closingimage1.jpg",
      "/images/events/convention-closingimage2.JPG",
      "/images/events/convention-closingimage3.jpg"
    ],
    candidImage: "/images/events/convention-candidimageJPG.JPG",
    openingNarrative: `In a world increasingly shaped by artificial intelligence and rapid technological transformation, this convention brought together students, professionals, and speakers from diverse fields to explore one central question:

What does it mean to stay human?

Through keynote talks, panel discussions, workshops, and open dialogue, the convention explored how technology is reshaping communication, careers, identity, and human relationships across every field, from software engineering and finance to healthcare, law, and education.`,
    designSection: `Artificial intelligence is no longer a distant concept limited to science fiction or research labs. It is actively reshaping industries, education, communication, and everyday life at a pace that many people are still trying to understand. Whether in medicine, finance, law, engineering, media, or education, nearly every field is beginning to integrate AI into the way people work, learn, and create.

At the same time, this transformation has introduced uncertainty and anxiety, especially among students preparing to enter a future that feels increasingly unpredictable.

This convention was created around the belief that technological advancement should not come at the expense of human connection, purpose, or identity.

Rather than approaching AI only from a technical perspective, we wanted to create conversations around the human side of change: how we communicate, how we maintain authentic relationships, how careers are evolving, and how people across different disciplines can adapt while still preserving empathy, ethics, and meaningful connection.

The goal was not to reject technology, but to better understand how humanity can grow alongside it.`,
    logisticsSection: `Organizing the convention required extensive coordination across logistics, speaker outreach, event planning, marketing, and live event management. I worked on organizing and supervising the convention from start to finish, coordinating speakers, managing communication and promotion, and helping oversee the experience throughout the event itself.

The convention featured keynote speakers, professional panelists, interactive workshops, and networking sessions designed to encourage active participation rather than passive listening. More than 200 students attended throughout the day, engaging with conversations that connected technology to real human experiences and future challenges.

One of the most rewarding parts of the event was seeing students from completely different academic and professional interests engage with the same ideas from different perspectives. Discussions around AI were no longer limited to computer science, they extended into healthcare, law, business, communication, psychology, and education.

That interdisciplinary exchange was exactly what we hoped to create.`,
    momentSection: `What made the convention feel meaningful was not simply the scale of the event, but the quality of the conversations taking place throughout the day.

Students discussed questions that many people are currently struggling to answer in real time:

How will AI reshape different careers?
What skills will remain uniquely human?
How do we maintain authentic communication in increasingly digital spaces?
What responsibilities come with rapidly advancing technology?
How can people adapt without losing themselves in the process?

The workshops and panels created an environment where students were encouraged to think critically, exchange perspectives, and reflect on the kind of future they want to help build rather than simply react to.

One of the most memorable moments for me personally was seeing my workshop group win the workshop competition. More than the competition itself, it was rewarding to watch students from different backgrounds collaborate, exchange ideas, and engage deeply with topics that genuinely matter for the future they are entering.`,
    closingReflection: `Organizing this convention changed the way I think about technology, leadership, and the future itself.

As a Computer Science and Data Science student, I already understood how rapidly AI and emerging technologies are developing. However, helping lead conversations around these topics from a human-centered perspective made me realize that technical advancement alone is not enough. The future will also depend on communication, ethics, adaptability, empathy, and the ability to bring people together across different disciplines and perspectives.

Looking around the room during the convention, seeing students networking, exchanging ideas, asking difficult questions, and engaging deeply with topics larger than themselves, made me optimistic about the future despite the uncertainty surrounding it.

More than anything, the convention reinforced my belief that dialogue remains one of the most important tools we have during periods of rapid transformation.`
  }
]

export function enrichEventsWithReadingTime(eventsList: EventEntry[]): EventEntry[] {
  const { calculateReadingTime } = require("./utils")
  return eventsList.map(event => {
    const contentToRead = [
      event.openingNarrative,
      event.designSection,
      event.logisticsSection,
      event.momentSection,
      event.closingReflection
    ]
      .filter(Boolean)
      .join(" ")
    
    if (contentToRead.length > 0) {
      return {
        ...event,
        readingTime: calculateReadingTime(contentToRead)
      }
    }
    return event
  })
}

export const eventsWithReadingTime = enrichEventsWithReadingTime(events)

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
  languages: ["Python", "C++", "C++17", "Java", "SQL", "R", "HTML", "CSS", "JavaScript"],
  frontend: ["React", "TypeScript", "React Three Fiber", "HTML", "CSS", "JavaScript", "Tailwind CSS", "Axios"],
  backend: ["FastAPI", "Flask", "Django", "Python", "MySQL", "JWT", "Uvicorn", "Pydantic", "Paramiko", "APScheduler"],
  data: ["SQL", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter", "PyTorch", "R", "RapidMiner"],
  tools: ["Git", "MySQL", "VS Code", "IntelliJ", "CLion", "Eclipse", "Node.js", "Azure", "Excel", "CMake", "RapidJSON", "Catch2", "WinSW"],
  concepts: ["Data Structures", "Algorithms", "System Design", "Full Stack Development", "STL", "Linked List", "Hash Map", "CUDA/GPU", "Memory Management"]
}

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Events", href: "#events" },
  { label: "Awards", href: "#awards" },
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
  { label: "5th Annual Convention", action: "navigate", target: "/events/5th-annual-convention" },
  { label: "Billingsley Data Integration", action: "navigate", target: "/projects/billingsley-data-integration" },
  { label: "Image2Surface 3D Mesh", action: "navigate", target: "/projects/image-2-surface" },
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