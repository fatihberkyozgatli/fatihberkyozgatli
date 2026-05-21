import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import {
  disableImportSchedule,
  fetchConfiguration,
  fetchImportSchedule,
  fetchTimezoneOptions,
  type ImportScheduleOut,
  updateConfiguration,
  updateImportSchedule,
  type ConfigurationTrackedTable,
  testSftpConnection,
} from '../api/api'

const inputCls =
  'w-full px-3 py-2 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-muted-foreground transition-colors'

type TimezoneOption = {
  value: string
  label: string
}

const fallbackTimezoneOptions: TimezoneOption[] = [
  { value: 'UTC', label: 'UTC (UTC+00:00)' },
  { value: 'America/Chicago', label: 'Central Time (America/Chicago)' },
  { value: 'America/New_York', label: 'Eastern Time (America/New_York)' },
  { value: 'America/Denver', label: 'Mountain Time (America/Denver)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (America/Los_Angeles)' },
]

function padTimePart(value: number) {
  return String(value).padStart(2, '0')
}

function formatDateTime(value?: string | null) {
  if (!value) return 'Not scheduled'

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

function statusClass(status?: string | null) {
  switch (status) {
    case 'success':
      return 'bg-green-50 text-green-700 border-green-200'
    case 'failed':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'partial_success':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'running':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    default:
      return 'bg-muted text-muted-foreground border-border'
  }
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

function DetailItem({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper?: string
}) {
  return (
    <div className="rounded-lg bg-secondary/30 px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
      {helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()

  const [sftpHost, setSftpHost] = useState('')
  const [sftpPort, setSftpPort] = useState('22')
  const [sftpUsername, setSftpUsername] = useState('')
  const [sftpPassword, setSftpPassword] = useState('')
  const [sftpRemotePath, setSftpRemotePath] = useState('')

  const [trackedTables, setTrackedTables] = useState<ConfigurationTrackedTable[]>([])
  const [hasStoredPassword, setHasStoredPassword] = useState(false)

  const [schedule, setSchedule] = useState<ImportScheduleOut | null>(null)
  const [timezoneOptions, setTimezoneOptions] = useState<TimezoneOption[]>(fallbackTimezoneOptions)
  const [scheduleEnabled, setScheduleEnabled] = useState(false)
  const [scheduleSourceType, setScheduleSourceType] = useState('sftp')
  const [scheduleTimezone, setScheduleTimezone] = useState('America/Chicago')
  const [scheduleHour, setScheduleHour] = useState(2)
  const [scheduleMinute, setScheduleMinute] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [isScheduleSaving, setIsScheduleSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [scheduleErrorMessage, setScheduleErrorMessage] = useState('')
  const [scheduleSuccessMessage, setScheduleSuccessMessage] = useState('')
  const [connectionTestMessage, setConnectionTestMessage] = useState('')
  const [connectionTestError, setConnectionTestError] = useState('')

  const scheduleTimeValue = useMemo(
    () => `${padTimePart(scheduleHour)}:${padTimePart(scheduleMinute)}`,
    [scheduleHour, scheduleMinute]
  )

  const applyScheduleToForm = (nextSchedule: ImportScheduleOut) => {
    setSchedule(nextSchedule)
    setScheduleEnabled(nextSchedule.is_enabled)
    setScheduleSourceType(nextSchedule.source_type || 'sftp')
    setScheduleTimezone(nextSchedule.timezone || 'America/Chicago')
    setScheduleHour(nextSchedule.hour ?? 2)
    setScheduleMinute(nextSchedule.minute ?? 0)
  }

  useEffect(() => {
    const loadPageData = async () => {
      setIsLoading(true)
      setErrorMessage('')
      setSuccessMessage('')
      setScheduleErrorMessage('')
      setScheduleSuccessMessage('')
      setConnectionTestMessage('')
      setConnectionTestError('')

      try {
        const [config, scheduleResponse, timezonesResponse] = await Promise.all([
          fetchConfiguration(),
          fetchImportSchedule(),
          fetchTimezoneOptions().catch(() => null),
        ])

        setSftpHost(config.sftp_host ?? '')
        setSftpPort(config.sftp_port != null ? String(config.sftp_port) : '22')
        setSftpUsername(config.sftp_username ?? '')
        setSftpRemotePath(config.sftp_remote_path ?? '')
        setTrackedTables(config.tracked_tables ?? [])
        setHasStoredPassword(config.has_password)
        setSftpPassword('')

        applyScheduleToForm(scheduleResponse)

        if (timezonesResponse?.options?.length) {
          setTimezoneOptions(timezonesResponse.options)
        }
      } catch (err) {
        console.error('Failed to load configuration:', err)
        setErrorMessage('Failed to load configuration.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPageData()
  }, [])

  const handleSaveSftp = async (e: FormEvent) => {
    e.preventDefault()

    setErrorMessage('')
    setSuccessMessage('')

    if (sftpPort.trim() && Number.isNaN(Number(sftpPort))) {
      setErrorMessage('Port must be a valid number.')
      return
    }

    setIsSaving(true)

    try {
      const updated = await updateConfiguration({
        sftp_host: sftpHost,
        sftp_port: sftpPort.trim() ? Number(sftpPort) : undefined,
        sftp_username: sftpUsername,
        sftp_remote_path: sftpRemotePath,
      })

      setSftpHost(updated.sftp_host ?? '')
      setSftpPort((updated.sftp_port ?? 22).toString())
      setSftpUsername(updated.sftp_username ?? '')
      setSftpRemotePath(updated.sftp_remote_path ?? '')
      setTrackedTables(updated.tracked_tables ?? [])
      setHasStoredPassword(updated.has_password)
      setSftpPassword('')
      setSuccessMessage('SFTP configuration saved successfully.')
    } catch (err) {
      console.error('Failed to save configuration:', err)
      setErrorMessage('Failed to save configuration.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveSchedule = async (e: FormEvent) => {
    e.preventDefault()

    setScheduleErrorMessage('')
    setScheduleSuccessMessage('')
    setIsScheduleSaving(true)

    try {
      const response = await updateImportSchedule({
        is_enabled: scheduleEnabled,
        source_type: scheduleSourceType,
        timezone: scheduleTimezone,
        hour: scheduleHour,
        minute: scheduleMinute,
      })

      applyScheduleToForm(response.schedule)
      setScheduleSuccessMessage(
        response.schedule.is_enabled
          ? 'Import schedule saved successfully.'
          : 'Import schedule saved as disabled.'
      )
    } catch (err) {
      console.error('Failed to save import schedule:', err)
      setScheduleErrorMessage(err instanceof Error ? err.message : 'Failed to save import schedule.')
    } finally {
      setIsScheduleSaving(false)
    }
  }

  const handleTestSftpConnection = async () => {
    setConnectionTestMessage('')
    setConnectionTestError('')
    setIsTestingConnection(true)

    try {
      const response = await testSftpConnection(sftpHost, Number(sftpPort) || 22, sftpUsername, sftpPassword, sftpRemotePath)
      setConnectionTestMessage(
        `${response.message} ${response.files_found?.length || 0} file(s) found on the configured server.`
      )
    } catch (err) {
      console.error('Failed to test SFTP connection:', err)
      setConnectionTestError(err instanceof Error ? err.message : 'Failed to test SFTP connection.')
    } finally {
      setIsTestingConnection(false)
    }
  }

  const handleDisableSchedule = async () => {
    setScheduleErrorMessage('')
    setScheduleSuccessMessage('')
    setIsScheduleSaving(true)

    try {
      const response = await disableImportSchedule()
      applyScheduleToForm(response.schedule)
      setScheduleSuccessMessage('Import schedule disabled successfully.')
    } catch (err) {
      console.error('Failed to disable import schedule:', err)
      setScheduleErrorMessage(err instanceof Error ? err.message : 'Failed to disable import schedule.')
    } finally {
      setIsScheduleSaving(false)
    }
  }

  const handleTimeChange = (value: string) => {
    if (!value || !value.includes(':')) return
    const [hourPart, minutePart] = value.split(':')
    setScheduleHour(Number(hourPart))
    setScheduleMinute(Number(minutePart))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-8 pt-8 pb-24">
        <PageHeader title="Manage Configuration" showBack onBack={() => navigate('/dashboard')} />

        <p className="mb-8 text-sm text-muted-foreground">
          Manage import scheduling, SFTP connection settings, and the supported Yardi source files.
        </p>

        <div className="flex flex-col gap-8">
          <SectionCard
            title="Import Schedule"
            description="Configure the daily import schedule. These settings are stored in the database and restored when the backend restarts."
          >
            <form onSubmit={handleSaveSchedule} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <DetailItem
                  label="Status"
                  value={schedule?.is_enabled ? 'Enabled' : 'Disabled'}
                  helper={schedule?.source_type ? `Source: ${formatLabel(schedule.source_type)}` : undefined}
                />
                <DetailItem
                  label="Next Run"
                  value={schedule?.next_run_time_utc ? formatDateTime(schedule.next_run_time_utc) : 'Not scheduled'}
                  helper={schedule?.local_time}
                />
                <DetailItem
                  label="Last Run"
                  value={schedule?.last_run_status ? formatLabel(schedule.last_run_status) : 'No scheduled run yet'}
                  helper={schedule?.last_run_finished_at_utc ? formatDateTime(schedule.last_run_finished_at_utc) : undefined}
                />
                <DetailItem
                  label="Tables"
                  value={schedule?.tables?.length ? `${schedule.tables.length} supported` : 'Not available'}
                  helper={schedule?.tables?.join(', ')}
                />
              </div>

              {schedule?.last_run_status ? (
                <div
                  className={`w-fit rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(
                    schedule.last_run_status
                  )}`}
                >
                  Last status: {formatLabel(schedule.last_run_status)}
                </div>
              ) : null}

              {schedule?.last_error_summary ? (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {schedule.last_error_summary}
                </div>
              ) : null}

              <div className="border-t border-border pt-5">
                <label className="flex items-start gap-3 rounded-lg border border-border px-4 py-3">
                  <input
                    type="checkbox"
                    checked={scheduleEnabled}
                    onChange={(e) => setScheduleEnabled(e.target.checked)}
                    disabled={isLoading || isScheduleSaving}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-foreground">Enable scheduled imports</span>
                    <span className="block text-xs text-muted-foreground">
                      Disabled schedules are saved, but they will not run automatically.
                    </span>
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">Import Source</label>
                  <select
                    value={scheduleSourceType}
                    onChange={(e) => setScheduleSourceType(e.target.value)}
                    className={inputCls}
                    disabled={isLoading || isScheduleSaving}
                  >
                    <option value="sftp">SFTP</option>
                    <option value="local_test">Local Test Data</option>

                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">Timezone</label>
                  <select
                    value={scheduleTimezone}
                    onChange={(e) => setScheduleTimezone(e.target.value)}
                    className={inputCls}
                    disabled={isLoading || isScheduleSaving}
                  >
                    {timezoneOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">Run Time</label>
                  <input
                    type="time"
                    value={scheduleTimeValue}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className={inputCls}
                    disabled={isLoading || isScheduleSaving}
                  />
                </div>
              </div>

              {scheduleErrorMessage ? (
                <div className="text-sm text-red-600">{scheduleErrorMessage}</div>
              ) : null}

              {scheduleSuccessMessage ? (
                <div className="text-sm text-green-600">{scheduleSuccessMessage}</div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isLoading || isScheduleSaving}
                  className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isScheduleSaving ? 'Saving...' : 'Save Schedule'}
                </button>

                <button
                  type="button"
                  onClick={handleDisableSchedule}
                  disabled={isLoading || isScheduleSaving || !schedule?.is_enabled}
                  className="px-5 py-2.5 rounded-md bg-muted text-foreground text-sm font-semibold hover:bg-input transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Disable Schedule
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/data-ingestion')}
                  disabled={isScheduleSaving}
                  className="px-5 py-2.5 rounded-md border border-border text-foreground text-sm font-semibold hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Run Manual Import
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard
            title="SFTP Configuration"
            description="Store the connection details that will be used by the production SFTP import workflow."
          >
            <form autoComplete="off" onSubmit={handleSaveSftp} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">SFTP Host</label>
                  <input
                    type="text"
                    value={sftpHost}
                    onChange={(e) => setSftpHost(e.target.value)}
                    placeholder="sftp.example.com"
                    className={inputCls}
                    disabled={isLoading || isSaving}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">Port</label>
                  <input
                    type="number"
                    value={sftpPort}
                    onChange={(e) => setSftpPort(e.target.value)}
                    placeholder="22"
                    className={inputCls}
                    disabled={isLoading || isSaving}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">Username</label>
                  <input
                    type="text"
                    value={sftpUsername}
                    onChange={(e) => setSftpUsername(e.target.value)}
                    placeholder="Username"
                    className={inputCls}
                    autoComplete="off"
                    disabled={isLoading || isSaving}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">Password</label>
                  <input
                    type="password"
                    value={sftpPassword}
                    onChange={(e) => setSftpPassword(e.target.value)}
                    placeholder={hasStoredPassword ? 'Leave blank to keep current password' : 'Password'}
                    className={inputCls}
                    autoComplete="new-password"
                    disabled={isLoading || isSaving}
                  />
                  <p className="text-xs text-muted-foreground">
                    {hasStoredPassword
                      ? 'A password is already stored. Leave blank to keep it unchanged.'
                      : 'No password is currently stored.'}
                  </p>
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground">Remote Path</label>
                  <input
                    type="text"
                    value={sftpRemotePath}
                    onChange={(e) => setSftpRemotePath(e.target.value)}
                    placeholder="/example/exports"
                    className={inputCls}
                    disabled={isLoading || isSaving}
                  />
                </div>
              </div>

              {errorMessage ? <div className="text-sm text-red-600">{errorMessage}</div> : null}
              {successMessage ? <div className="text-sm text-green-600">{successMessage}</div> : null}
              {connectionTestError ? <div className="text-sm text-red-600">{connectionTestError}</div> : null}
              {connectionTestMessage ? <div className="text-sm text-green-600">{connectionTestMessage}</div> : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isLoading || isSaving}
                  className="w-fit px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : isLoading ? 'Loading...' : 'Save SFTP Configuration'}
                </button>

                <button
                  type="button"
                  onClick={handleTestSftpConnection}
                  disabled={isLoading || isSaving || isTestingConnection || !hasStoredPassword || !sftpHost.trim() || !sftpUsername.trim()}
                  className="w-fit px-5 py-2.5 rounded-md bg-muted text-foreground text-sm font-semibold hover:bg-input transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isTestingConnection ? 'Testing...' : 'Test SFTP Connection'}
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard
            title="Tracked Tables"
            description="These read-only mappings show the Yardi source files supported by the import process."
          >
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Table Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Expected File Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Column Count</th>
                  </tr>
                </thead>
                <tbody>
                  {trackedTables.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-sm text-muted-foreground text-center">
                        No tracked tables configured.
                      </td>
                    </tr>
                  ) : (
                    trackedTables.map((row) => (
                      <tr key={row.id} className="border-t border-border">
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{row.table_name}</td>
                        <td className="px-4 py-3 text-sm font-mono text-foreground">{row.file_name}</td>
                        <td className="px-4 py-3 text-sm text-foreground text-center">{row.column_count || '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
