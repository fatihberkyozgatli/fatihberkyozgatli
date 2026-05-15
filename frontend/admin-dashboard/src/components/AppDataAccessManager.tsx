interface AppDataAccessManagerProps {
  appId: number
  activeView?: string
  onActiveViewChange?: (view: string) => void
  statusFilter?: string
  onStatusFilterChange?: (status: string) => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onDataChanged?: () => Promise<void>
  refreshNonce?: number
}

export default function AppDataAccessManager({ appId }: AppDataAccessManagerProps) {
  return (
    <div className="rounded-lg border border-border p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Data Access Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Configure which tables and properties this application can access.
        </p>
        
        <div className="rounded-lg border border-border bg-secondary/20 p-4">
          <p className="text-sm font-medium text-foreground mb-2">Configured Tables</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Properties table - Enabled</li>
            <li>• Jobs table - Enabled</li>
            <li>• Categories table - Enabled</li>
            <li>• Accounts table - Enabled</li>
          </ul>
        </div>
        
        <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3 flex items-start gap-2">
          <div className="w-1 h-1 rounded-full bg-blue-600 mt-1.5 shrink-0" />
          <p className="text-xs text-blue-700">
            All configured tables are currently enabled for data import and access by application ID {appId}.
          </p>
        </div>
      </div>
    </div>
  )
}
