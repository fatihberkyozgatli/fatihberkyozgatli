"use client"

interface ProductShowcaseProps {
  projectSlug?: string
}

export default function ProductShowcase({ projectSlug = "billingsley-data-integration" }: ProductShowcaseProps) {
  let dashboardUrl = ""
  
  if (projectSlug === "billingsley-data-integration") {
    dashboardUrl = process.env.NEXT_PUBLIC_BILLINGSLEY_DASHBOARD_URL || "http://localhost:5173"
  } else if (projectSlug === "image-2-surface") {
    dashboardUrl = process.env.NEXT_PUBLIC_IMAGE2SURFACE_DASHBOARD_URL || ""
  } else if (projectSlug === "whats-my-grade") {
    dashboardUrl = process.env.NEXT_PUBLIC_WHATSMYGRADE_DASHBOARD_URL || "https://whatsmygrade.app/"
  }

  const projectTitle =
    projectSlug === "billingsley-data-integration"
      ? "Intermediary Property DB Management System - Interactive Demo"
      : projectSlug === "whats-my-grade"
      ? "WhatsMyGrade - Live App"
      : "Image2Surface - Interactive Demo"
  
  return (
    <div className="flex justify-center items-center bg-gray-900 w-full" style={{ aspectRatio: "16/9", maxWidth: "960px", margin: "0 auto" }}>
      <style>{`
        .showcase-glow {
          animation: greenGlowPulse 4s ease-in-out infinite;
          border-width: 2px;
          border-style: solid;
          border-color: rgb(34, 197, 94);
        }
        @keyframes greenGlowPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.9),
                        0 0 20px 2px rgba(34, 197, 94, 0.5),
                        inset 0 0 0 0 rgba(34, 197, 94, 0.1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.3),
                        0 0 40px 6px rgba(34, 197, 94, 0.4),
                        inset 0 0 20px 2px rgba(34, 197, 94, 0.15);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.9),
                        0 0 20px 2px rgba(34, 197, 94, 0.5),
                        inset 0 0 0 0 rgba(34, 197, 94, 0.1);
          }
        }
      `}</style>
      <div className="showcase-glow w-full h-full overflow-hidden bg-white flex items-center justify-center">
        {dashboardUrl ? (
          <iframe
            src={dashboardUrl}
            title={projectTitle}
            className="w-full h-full border-0"
            allowFullScreen
            style={{ zoom: "50%" }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
              <p className="text-muted-foreground text-sm">Dashboard coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
