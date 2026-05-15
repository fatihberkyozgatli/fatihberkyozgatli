import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, User } from 'lucide-react'
import { fetchCurrentUserProfile, logoutUser } from '../api/api'

interface PageHeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
  showUser?: boolean
  userName?: string
}

export default function PageHeader({
  title,
  showBack = false,
  onBack,
  showUser = true,
  userName,
}: PageHeaderProps) {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [displayLabel, setDisplayLabel] = useState(userName || 'User')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (userName) {
      setDisplayLabel(userName)
      return
    }

    let isMounted = true

    const loadCurrentUser = async () => {
      try {
        const profile = await fetchCurrentUserProfile()
        if (!isMounted) return

        const nextLabel =
          (profile.display_name && profile.display_name.trim()) ||
          profile.email ||
          'User'

        setDisplayLabel(nextLabel)
      } catch (err) {
        if (!isMounted) return
        setDisplayLabel('User')
      }
    }

    const handleProfileUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<{ display_name?: string; email?: string }>
      const nextLabel =
        customEvent.detail?.display_name?.trim() ||
        customEvent.detail?.email ||
        'User'
      setDisplayLabel(nextLabel)
    }

    loadCurrentUser()
    window.addEventListener('current-user-profile-updated', handleProfileUpdated as EventListener)

    return () => {
      isMounted = false
      window.removeEventListener(
        'current-user-profile-updated',
        handleProfileUpdated as EventListener
      )
    }
  }, [userName])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logoutUser()
      navigate('/')
    } catch (err) {
      console.error('Logout failed:', err)
      navigate('/')
    } finally {
      setIsLoggingOut(false)
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="flex items-start justify-between pb-6 mb-6">
      <h1 className="text-4xl font-bold text-foreground tracking-tight flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-8 h-8" strokeWidth={2.5} />
          </button>
        )}
        {title}
      </h1>

      {showUser && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <span className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </span>
            <span>{displayLabel}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                onClick={() => {
                  navigate('/profile')
                  setDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                Profile Settings
              </button>
              <button
                onClick={() => {
                  navigate('/settings')
                  setDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                App Settings
              </button>
              <button
                onClick={() => {
                  navigate('/users')
                  setDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                Manage Users
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
