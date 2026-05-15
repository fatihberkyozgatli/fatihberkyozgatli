import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface App {
  id: number
  name: string
  description?: string | null
  is_active: boolean
  created_at_utc: string
  updated_at_utc: string
}

interface UpdateAppInput {
  name?: string
  description?: string | null
  isActive?: boolean
}

interface AppContextType {
  apps: App[]
  loading: boolean
  error: string | null
  addApp: (name: string, description?: string | null) => Promise<App>
  updateApp: (id: number, updates: UpdateAppInput) => Promise<App>
  deleteApp: (id: number) => Promise<void>
  getApp: (id: number) => App | undefined
  refreshApps: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Mock data
const MOCK_APPS: App[] = [
  {
    id: 1,
    name: 'Property Management System',
    description: 'Main property database integration',
    is_active: true,
    created_at_utc: '2024-01-15T10:30:00Z',
    updated_at_utc: '2024-05-10T14:20:00Z',
  },
  {
    id: 2,
    name: 'Real Estate Analytics',
    description: 'Analytics dashboard for property data',
    is_active: true,
    created_at_utc: '2024-02-20T09:15:00Z',
    updated_at_utc: '2024-05-08T11:45:00Z',
  },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<App[]>(MOCK_APPS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const refreshApps = async () => {
    try {
      setLoading(true)
      setError(null)
      // Mock data already set on init
      await new Promise((resolve) => setTimeout(resolve, 300))
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load apps'
      setError(errorMsg)
      console.error('Error fetching apps:', err)
    } finally {
      setLoading(false)
    }
  }

  const addApp = async (name: string, description?: string | null): Promise<App> => {
    const newApp: App = {
      id: Math.floor(Math.random() * 10000),
      name,
      description,
      is_active: true,
      created_at_utc: new Date().toISOString(),
      updated_at_utc: new Date().toISOString(),
    }
    setApps((prevApps) => [...prevApps, newApp])
    setError(null)
    return newApp
  }

  const updateApp = async (id: number, updates: UpdateAppInput): Promise<App> => {
    const updatedApp: App = {
      id,
      name: updates.name || 'App Name',
      description: updates.description,
      is_active: updates.isActive ?? true,
      created_at_utc: new Date().toISOString(),
      updated_at_utc: new Date().toISOString(),
    }
    setApps((prevApps) =>
      prevApps.map((app) => (app.id === id ? updatedApp : app))
    )
    setError(null)
    return updatedApp
  }

  const deleteApp = async (id: number): Promise<void> => {
    setApps((prevApps) => prevApps.filter((app) => app.id !== id))
    setError(null)
  }

  const getApp = (id: number): App | undefined => {
    return apps.find((app) => app.id === id)
  }

  return (
    <AppContext.Provider
      value={{ apps, loading, error, addApp, updateApp, deleteApp, getApp, refreshApps }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApps() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApps must be used within an AppProvider')
  }
  return context
}
