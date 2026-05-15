import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface PageShellProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  actions?: ReactNode
  children: ReactNode
}

export default function PageShell({ title, showBack = false, onBack, actions, children }: PageShellProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <div className="page-enter min-h-full px-8 py-8 max-w-3xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {children}
    </div>
  )
}
