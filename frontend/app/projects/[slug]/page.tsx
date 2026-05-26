"use client"

import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Github, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/data"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { ArchitectureDiagramImage2Surface } from "@/components/architecture-diagram-image2surface"
import ProductShowcase from "@/components/product-showcase"
import Link from "next/link"

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const project = projects.find((p) => p.slug === slug)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            {project.links?.github && (
              <Button variant="ghost" size="icon" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
            {project.links?.demo && (
              <Button variant="ghost" size="icon" asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#projects" className="hover:text-foreground transition-colors">Projects</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{project.title}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.summary}</p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm">
              {project.role}
            </Badge>
            <Badge variant="outline" className="text-sm capitalize">
              {project.category}
            </Badge>
          </div>

          {/* Tech Stack */}
          {project.stack && (
            <div className="flex flex-wrap gap-2 mb-12">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary rounded-full border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {project.problem && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">The Problem</h2>
            </div>
            <div className="pl-4 border-l-2 border-border ml-0.5">
              <p className="text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">Key Highlights</h2>
          </div>
          <ul className="space-y-3 pl-4 border-l-2 border-border ml-0.5">
            {project.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Impact Section */}
        {project.impact && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Impact</h2>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <p className="text-foreground leading-relaxed">
                {project.impact}
              </p>
            </div>
          </motion.section>
        )}

        {/* Case Study Sections - Billingsley Only */}
        {project.slug === "billingsley-data-integration" && (
          <>
            {/* Case Study: Technical Architecture */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Technical Architecture</h2>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="text-muted-foreground space-y-3">
                  <p>
                    The system follows a 6-layer ETL (Extract, Transform, Load) architecture optimized for data consistency, security, and scalability.
                  </p>
                  <div className="bg-secondary/30 rounded p-4 mt-4">
                    <p className="text-sm font-mono text-primary">
                      Third-party Financial Software → Python Preprocessing → MySQL Storage → FastAPI API (Interaction Layer) → React Frontend (Admin) + External Applications
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Data Ingestion</h4>
                      <p className="text-sm text-muted-foreground">APScheduler orchestrates customizable, scheduled data imports via SFTP using Paramiko. Python preprocessing handles validation and data cleaning before MySQL storage.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">API Layer</h4>
                      <p className="text-sm text-muted-foreground">FastAPI with Uvicorn provides high-performance async access. Pydantic ensures strict schema validation. JWT tokens secure all endpoints.</p>
                    </div>
                  </div>
                </div>
                {/* Placeholder for Interactive Architecture Diagram */}
                <div className="mt-6">
                  <ArchitectureDiagram />
                </div>
              </div>
            </motion.section>


            {/* Case Study: Challenges & Solutions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Challenges & Solutions</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Challenge 1: Service Management on Windows</h3>
                  <div className="bg-destructive/10 border-l-2 border-destructive rounded px-3 py-2 mb-3">
                    <p className="text-sm text-muted-foreground">Originally selected NSSM as the service wrapper, but discovered it wasn't supported on Windows Server post-2020.</p>
                  </div>
                  <p className="text-sm text-foreground font-medium">Solution:</p>
                  <p className="text-sm text-muted-foreground">Pivoted to WinSW + Nginx architecture. WinSW wraps FastAPI as a Windows service; Nginx acts as reverse proxy handling HTTP/S traffic and routing.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Challenge 2: Data Source Delays</h3>
                  <div className="bg-destructive/10 border-l-2 border-destructive rounded px-3 py-2 mb-3">
                    <p className="text-sm text-muted-foreground">Third-party financial software SFTP server provisioning delayed early development and testing of ingestion pipeline.</p>
                  </div>
                  <p className="text-sm text-foreground font-medium">Solution:</p>
                  <p className="text-sm text-muted-foreground">Implemented manual import fallback. UI allows testing CSV uploads from local files while maintaining identical pipeline logic. Unblocked frontend/backend integration testing.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Challenge 3: Data Integrity Under Load</h3>
                  <div className="bg-destructive/10 border-l-2 border-destructive rounded px-3 py-2 mb-3">
                    <p className="text-sm text-muted-foreground">Ensuring enterprise-scale financial records don't corrupt the database if malformed or incomplete data arrives from external sources.</p>
                  </div>
                  <p className="text-sm text-foreground font-medium">Solution:</p>
                  <p className="text-sm text-muted-foreground">Multi-layer validation: Pydantic schemas validate all ingested data before database insert. Python preprocessing handles missing fields. Database constraints prevent invalid data. Comprehensive error logging for troubleshooting.</p>
                </div>
              </div>
            </motion.section>


            {/* Case Study: Key Technical Decisions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Key Technical Decisions</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">FastAPI over Django:</span> <span className="text-muted-foreground">Async-first architecture for high concurrency. Automatic OpenAPI documentation (Swagger UI) for API transparency and testing.</span></p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">Paramiko for SFTP:</span> <span className="text-muted-foreground">Low-level control over connection lifecycle and security. Handles password-protected access reliably and integrates cleanly with APScheduler.</span></p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">JWT + Rate Limiting:</span> <span className="text-muted-foreground">Stateless authentication scales across VMs. 5-minute lockout after 5 failed logins prevents brute-force attacks without permanent account blocks.</span></p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">User Deactivation (not deletion):</span> <span className="text-muted-foreground">Maintains historical audit trail. Admins can deactivate users while preserving all logs and action history for compliance.</span></p>
                </div>
              </div>
            </motion.section>


            {/* Case Study: Results & Outcomes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Results & Outcomes</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-3xl font-bold text-primary mb-2">∞</p>
                  <p className="text-sm text-muted-foreground">Customizable scheduled data imports - runs as frequently and flexibly as needed (daily, weekly, custom cadence)</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-xl font-bold text-primary mb-2">Fully Automated</p>
                  <p className="text-sm text-muted-foreground">Replaced manual recurring processes with completely autonomous scheduled data ingestion and delivery</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-3xl font-bold text-primary mb-2">0%</p>
                  <p className="text-sm text-muted-foreground">Data loss or corruption incidents since deployment (multi-layer validation and error handling)</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-3xl font-bold text-primary mb-2">2nd</p>
                  <p className="text-sm text-muted-foreground">Place at Senior Design Expo (Spring 2026) - Recognition for full-stack systems engineering</p>
                </div>
              </div>
            </motion.section>
          </>
        )}

        {/* Case Study Sections - Image2Surface Only */}
        {project.slug === "image-2-surface" && (
          <>
            {/* Case Study: Technical Architecture */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Technical Architecture</h2>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="text-muted-foreground space-y-3">
                  <p>
                    A 5-layer Layered Architecture with clean separation of concerns: Presentation Layer (React UI) → Communication Layer (Axios HTTP client) → API Layer (FastAPI endpoints) → Business Logic Layer (image processing, depth estimation, mesh generation) → Infrastructure Layer (file storage, PyTorch models).
                  </p>
                  <div className="bg-secondary/30 rounded p-4 mt-4">
                    <p className="text-sm font-mono text-primary">
                      Image Upload → Validation → Depth Estimation → Height Map → 3D Mesh → Three.js Render → Interactive Editing
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Image Processing</h4>
                      <p className="text-sm text-muted-foreground">GPU-accelerated depth estimation using PyTorch CUDA. Efficient NumPy vectorization for height map generation and mesh construction. Sub-5 second end-to-end latency.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">3D Rendering & Editing</h4>
                      <p className="text-sm text-muted-foreground">React Three Fiber for interactive WebGL visualization. Real-time mesh editing (smoothing, denoising, scaling). Downsampling parameter for mobile device optimization.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <ArchitectureDiagramImage2Surface />
                </div>
              </div>
            </motion.section>

            {/* Case Study: Challenges & Solutions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Challenges & Solutions</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Challenge 1: Achieving Sub-5 Second Latency</h3>
                  <div className="bg-destructive/10 border-l-2 border-destructive rounded px-3 py-2 mb-3">
                    <p className="text-sm text-muted-foreground">Depth estimation using neural networks is computationally expensive (5+ seconds), but real-time UX requires end-to-end latency under 5 seconds including model inference, image processing, and mesh generation.</p>
                  </div>
                  <p className="text-sm text-foreground font-medium">Solution:</p>
                  <p className="text-sm text-muted-foreground">Leveraged GPU acceleration through PyTorch CUDA, implemented efficient NumPy vectorization for mesh generation, and optimized image preprocessing. Depth estimation (2800ms) combined with remaining operations (&lt;200ms) achieves consistent sub-5s latency.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Challenge 2: Managing 1M+ Vertex Meshes on Mobile</h3>
                  <div className="bg-destructive/10 border-l-2 border-destructive rounded px-3 py-2 mb-3">
                    <p className="text-sm text-muted-foreground">High-resolution depth maps generate dense meshes with millions of vertices, causing performance bottlenecks and WebGL rendering issues on lower-end devices.</p>
                  </div>
                  <p className="text-sm text-foreground font-medium">Solution:</p>
                  <p className="text-sm text-muted-foreground">Implemented downsampling parameter (0.25-1.0 scale), created mesh optimization in Three.js using BufferGeometry, and added vertex decimation. Users trade detail for performance based on device capabilities.</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">Challenge 3: Stateless API with Complex Processing</h3>
                  <div className="bg-destructive/10 border-l-2 border-destructive rounded px-3 py-2 mb-3">
                    <p className="text-sm text-muted-foreground">REST API requires request-response cycles, but image-to-mesh conversion involves multiple sequential steps. Managing session state across requests while maintaining stateless API design is complex.</p>
                  </div>
                  <p className="text-sm text-foreground font-medium">Solution:</p>
                  <p className="text-sm text-muted-foreground">Implemented image_id-based session tracking with in-memory storage mapping image_id to image data, depth maps, and mesh states. Each request uses image_id to retrieve prior state, enabling sequential operations while maintaining stateless API design.</p>
                </div>
              </div>
            </motion.section>

            {/* Case Study: Key Technical Decisions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Key Technical Decisions</h2>
              </div>
              <div className="space-y-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">Layered Architecture over MVC:</span> <span className="text-muted-foreground">Better separation between routes, business logic, and data layers. Simplifies adding async processing, message queues, or microservices in future phases.</span></p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">Depth Anything V2 Model:</span> <span className="text-muted-foreground">Superior zero-shot generalization across diverse image domains. Lightweight ViT-small variant (~90MB) balances accuracy and inference speed.</span></p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">Three.js for 3D Rendering:</span> <span className="text-muted-foreground">Smaller bundle size, mature React Three Fiber integration with Next.js, and superior mobile device support through WebGL optimization.</span></p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm"><span className="font-semibold text-foreground">In-Memory Session Storage:</span> <span className="text-muted-foreground">File-based temporary storage with in-memory lookups for Phase 1 prototyping. Supports easy migration to persistent database in Phase 2 with minimal changes.</span></p>
                </div>
              </div>
            </motion.section>

            {/* Case Study: Results & Outcomes */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Results & Outcomes</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-3xl font-bold text-primary mb-2">3-4s</p>
                  <p className="text-sm text-muted-foreground">Average end-to-end latency from upload through mesh generation (GPU-accelerated depth estimation: 2800ms, processing: 45ms, mesh generation: 35ms, render: 100-200ms)</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-xl font-bold text-primary mb-2">Interactive 3D</p>
                  <p className="text-sm text-muted-foreground">Full-featured viewer with zoom (scroll), rotate (click-drag), pan (right-click-drag) controls enabling intuitive mesh exploration from multiple angles</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-3xl font-bold text-primary mb-2">1M+</p>
                  <p className="text-sm text-muted-foreground">Vertices efficiently processed on desktop (native resolution) with 100K-500K vertices optimized for mobile (0.25-0.5 downsampling) at 60 FPS</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-xl font-bold text-primary mb-2">Full-Stack Integration</p>
                  <p className="text-sm text-muted-foreground">End-to-end system combining PyTorch deep learning inference, FastAPI backend orchestration, and React Three Fiber rendering demonstrating architecture effectiveness</p>
                </div>
              </div>
            </motion.section>
          </>
        )}

        {/* See the Product - Both Billingsley & Image2Surface - Hidden on Mobile */}
        {(project.slug === "billingsley-data-integration" || project.slug === "image-2-surface") && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mb-12 hidden md:block"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">See the Product</h2>
            </div>
            <ProductShowcase projectSlug={project.slug} />
            
            {/* Showcase Disclaimer for Image2Surface */}
            {project.slug === "image-2-surface" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg"
              >
                <p className="text-sm text-muted-foreground">
                  This is a showcase demonstrating the Image2Surface system capabilities. The actual platform supports custom image uploads and is fully configurable with advanced parameters. Explore the full project and capabilities on{" "}
                  <a
                    href={project.links?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </motion.div>
            )}

            {/* Showcase Disclaimer for Billingsley */}
            {project.slug === "billingsley-data-integration" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg"
              >
                <p className="text-sm text-muted-foreground">
                  This demonstration uses mock data to showcase the Billingsley system capabilities. For the full project and implementation details, visit{" "}
                  <a
                    href={project.links?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Navigation to Other Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="pt-12 border-t border-border"
        >
          <h3 className="text-lg font-semibold mb-6">Other Projects</h3>
          {projects.filter((p) => p.slug !== slug && p.featured).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects
                .filter((p) => p.slug !== slug && p.featured)
                .slice(0, 2)
                .map((otherProject) => (
                  <Link
                    key={otherProject.slug}
                    href={`/projects/${otherProject.slug}`}
                    className="group p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {otherProject.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {otherProject.summary}
                    </p>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="p-6 rounded-lg border border-border bg-secondary/30 text-center">
              <p className="text-muted-foreground">More projects coming soon...</p>
            </div>
          )}
        </motion.section>
      </main>
    </div>
  )
}
