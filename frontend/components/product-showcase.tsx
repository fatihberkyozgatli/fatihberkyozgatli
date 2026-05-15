"use client"

export default function ProductShowcase() {
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
      <div className="showcase-glow w-full h-full overflow-hidden bg-white">
        <iframe
          src="http://localhost:5173"
          title="Intermediary Property DB Management System - Interactive Demo"
          className="w-full h-full border-0"
          allowFullScreen
          style={{ zoom: "50%" }}
        />
      </div>
    </div>
  )
}
