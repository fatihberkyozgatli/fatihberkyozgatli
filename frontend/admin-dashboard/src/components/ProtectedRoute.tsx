// UI-ONLY MODE: All routes are accessible (no auth required)
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  element: React.ReactElement
}

export default function ProtectedRoute({ element }: ProtectedRouteProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Simulate brief loading for UI appearance
    const timer = setTimeout(() => setIsReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return element
}
