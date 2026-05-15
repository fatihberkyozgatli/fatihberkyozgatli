import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, AlertCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { fetchImportSchedule, fetchLatestImportRun, ImportRun, ImportScheduleOut } from '../api/api'
import { useApps } from '../context/AppContext'

function formatDateTime(value?: string | null) {
  if (!value) return 'Not available'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  return date.toLocaleString()
}

function formatLabel(value?: string | null) {
  if (!value) return 'Not available'

  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function statusTextClass(status?: string | null) {
  switch (status) {
    case 'success':
      return 'text-green-600'
    case 'failed':
      return 'text-red-600'
    case 'partial_success':
      return 'text-yellow-600'
    case 'running':
      return 'text-blue-600'
    default:
      return 'text-muted-foreground'
  }
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { apps, loading: appsLoading, error: appsError } = useApps()
  const [latestRun, setLatestRun] = useState<ImportRun | null>(null)
  const [schedule, setSchedule] = useState<ImportScheduleOut | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadDashboardData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const [latestRunResult, scheduleResult] = await Promise.allSettled([
          fetchLatestImportRun(),
          fetchImportSchedule(),
        ])

        if (cancelled) return

        if (latestRunResult.status === 'fulfilled') {
          setLatestRun(latestRunResult.value)
        } else {
          const message =
            latestRunResult.reason instanceof Error
              ? latestRunResult.reason.message
              : 'Failed to fetch latest import run'

          if (message.includes('404')) {
            setLatestRun(null)
          } else {
            setError(message)
            console.error('Error fetching latest import run:', latestRunResult.reason)
          }
        }

        if (scheduleResult.status === 'fulfilled') {
          setSchedule(scheduleResult.value)
        } else {
          console.error('Error fetching import schedule:', scheduleResult.reason)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadDashboardData()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-8 pt-8 pb-12">
          <PageHeader title="Dashboard" />

          <section className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-foreground">Logs</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/data-ingestion')}
                  className="px-4 py-2.5 rounded-md bg-muted text-foreground text-sm font-semibold hover:bg-input transition-colors"
                >
                  Run Manual Import
                </button>
                <button
                  onClick={() => navigate('/logs')}
                  className="px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  View All
                </button>
              </div>
            </div>

            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading import status...</p>
            ) : error ? (
              <p className="text-sm text-red-600">Error: {error}</p>
            ) : latestRun ? (
              <>
                <p className="text-sm text-foreground mb-1">
                  Last Pull:{' '}
                  <span className="font-medium">
                    {formatDateTime(latestRun.started_at_utc)}
                  </span>
                </p>
                <p className="text-sm text-foreground mb-2">
                  Status:{' '}
                  <span className={`font-medium ${statusTextClass(latestRun.status)}`}>
                    {formatLabel(latestRun.status)}
                  </span>
                </p>
                <p className="text-sm text-foreground">
                  Tables Pulled:
                  <br />
                  {latestRun.files.length > 0
                    ? latestRun.files
                      .map((file) => `${file.table_name} (${file.rows_read} rows)`)
                      .join(', ')
                    : 'No files'}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No logs found yet</p>
            )}
          </section>

          <section className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-foreground">Scheduled Imports</h2>
              <button
                onClick={() => navigate('/settings')}
                className="px-4 py-2.5 rounded-md bg-muted text-foreground text-sm font-semibold hover:bg-input transition-colors"
              >
                Manage Schedule
              </button>
            </div>

            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading schedule...</p>
            ) : schedule ? (
              <div className="rounded-lg border border-border bg-secondary/20 p-4 flex flex-col gap-2">
                <p className="text-sm text-foreground">
                  Scheduled Import:{' '}
                  <span className={`font-semibold ${schedule.is_enabled ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {schedule.is_enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </p>

                <p className="text-sm text-foreground">
                  Source:{' '}
                  <span className="font-medium">
                    {formatLabel(schedule.source_type)}
                  </span>
                </p>

                <p className="text-sm text-foreground">
                  Next Run:{' '}
                  <span className="font-medium">
                    {schedule.next_run_time_utc ? formatDateTime(schedule.next_run_time_utc) : 'Not scheduled'}
                  </span>
                </p>

                <p className="text-sm text-foreground">
                  Local Schedule:{' '}
                  <span className="font-medium">
                    {schedule.local_time || 'Not available'}
                  </span>
                </p>

                <p className="text-sm text-foreground">
                  Last Scheduled Run:{' '}
                  <span className={`font-medium ${statusTextClass(schedule.last_run_status)}`}>
                    {schedule.last_run_status ? formatLabel(schedule.last_run_status) : 'No scheduled run yet'}
                  </span>
                  {schedule.last_run_finished_at_utc
                    ? ` at ${formatDateTime(schedule.last_run_finished_at_utc)}`
                    : ''}
                </p>

                {schedule.last_error_summary ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 text-destructive rounded-md mt-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">{schedule.last_error_summary}</span>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No schedule configured.</p>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-foreground">Apps</h2>
              <button
                onClick={() => navigate('/app-setup')}
                className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-input transition-colors"
                aria-label="Add new app"
              >
                <Plus className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {appsError && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 text-destructive rounded-md mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{appsError}</span>
              </div>
            )}

            {appsLoading ? (
              <p className="text-sm text-muted-foreground">Loading apps...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="border border-border rounded-xl p-4 bg-secondary/30 flex flex-col gap-3"
                  >
                    <p className="text-sm font-medium text-foreground">{app.name}</p>
                    <button
                      onClick={() => navigate(`/app-management/${app.id}`)}
                      className="w-fit px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-hover transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                ))}
                {!appsLoading && apps.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No apps created yet.{' '}
                    <button
                      onClick={() => navigate('/app-setup')}
                      className="text-primary underline hover:no-underline"
                    >
                      Create one
                    </button>
                  </p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
