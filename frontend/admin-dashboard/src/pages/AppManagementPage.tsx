import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Copy, Check, AlertCircle, Loader, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import AppDataAccessManager from '../components/AppDataAccessManager'
import { useApps } from '../context/AppContext'
import {
  AppDataAccessStatus,
  AppDataAccessSummaryOut,
  AppDataAccessView,
  clearAppViewExclusions,
  createAppApiKey,
  fetchAppDataAccessSummary,
  getAppApiKey,
  revokeAppApiKey,
} from '../api/api'

const inputCls =
  'w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors'

const VIEW_LABELS: Partial<Record<AppDataAccessView, string>> = {
  properties: 'Properties',
  property_lists: 'Property Lists',
  job: 'Job Codes',
  category: 'Categories',
  acct: 'GL Codes',
}

const TABLE_LABELS: Record<string, string> = {
  property: 'Property Table',
  listprop: 'Listprop Table',
  job: 'Job Table',
  category: 'Category Table',
  acct: 'Acct Table',
}

function isPropertyListClearBlockedByExcludedChild(
  view: AppDataAccessView | null,
  message: string
): boolean {
  return (
    view === 'property_lists' &&
    (message.includes('would expose excluded child row') ||
      message.includes('Cannot include property list'))
  )
}

function getClearViewFailureMessage(
  view: AppDataAccessView | null,
  message: string
): string {
  if (isPropertyListClearBlockedByExcludedChild(view, message)) {
    return (
      'Cannot clear Property List exclusions because doing so would re-include parent property lists that expose excluded child row(s). ' +
      'Clear or include the blocked child Property or Property List exclusion first, then try clearing Property List exclusions again.'
    )
  }

  return message
}

export default function AppManagementPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { getApp, updateApp, deleteApp, refreshApps, loading } = useApps()

  const appId = id ? parseInt(id, 10) : null
  const app = appId ? getApp(appId) : null

  const [appName, setAppName] = useState('')
  const [description, setDescription] = useState('')
  const [maskedKey, setMaskedKey] = useState('')
  const [hasKey, setHasKey] = useState(false)

  const [activeView, setActiveView] = useState<AppDataAccessView>('properties')
  const [statusFilter, setStatusFilter] = useState<AppDataAccessStatus>('all')
  const [summary, setSummary] = useState<AppDataAccessSummaryOut | null>(null)

  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [clearViewModalOpen, setClearViewModalOpen] = useState(false)

  const [generatedKey, setGeneratedKey] = useState('')
  const [copied, setCopied] = useState(false)
  const [confirmName, setConfirmName] = useState('')
  const [pendingClearView, setPendingClearView] = useState<AppDataAccessView | null>(null)
  const [dataRefreshNonce, setDataRefreshNonce] = useState(0)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [clearViewError, setClearViewError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)

  const summaryRows = useMemo(
    () =>
      (Object.keys(VIEW_LABELS) as AppDataAccessView[]).map((view) => ({
        view,
        label: VIEW_LABELS[view] ?? view,
        excludedCount: summary?.view_summary?.[view] ?? 0,
      })),
    [summary]
  )

  useEffect(() => {
    if (!success) return

    const timer = window.setTimeout(() => {
      setSuccess('')
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [success])

  const loadSummary = async () => {
    if (!appId) return

    setIsLoadingSummary(true)
    try {
      const data = await fetchAppDataAccessSummary(appId)
      setSummary(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load summary')
    } finally {
      setIsLoadingSummary(false)
    }
  }

  useEffect(() => {
    if (appId) {
      const fetchApiKey = async () => {
        try {
          const keyData = await getAppApiKey(appId)
          setMaskedKey('*'.repeat(28) + keyData.last4)
          setHasKey(true)
        } catch {
          setMaskedKey('')
          setHasKey(false)
        }
      }

      fetchApiKey()
      loadSummary()
    }
  }, [appId])

  useEffect(() => {
    if (!loading) {
      if (app) {
        setAppName(app.name)
        setDescription(app.description || '')
      } else if (appId) {
        const t = setTimeout(() => navigate('/dashboard'), 100)
        return () => clearTimeout(t)
      }
    }
  }, [app, appId, navigate, loading])

  const handleGenerateNewKey = async () => {
    if (!appId) return
    setIsLoading(true)
    setError('')

    try {
      const apiKeyResponse = await createAppApiKey(appId)
      setGeneratedKey(apiKeyResponse.plaintext_key)
      setMaskedKey('*'.repeat(28) + apiKeyResponse.last4)
      setHasKey(true)
      setApiKeyModalOpen(true)
      setSuccess('New API key generated successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate API key')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSave = async () => {
    if (!appId) return
    setIsSaving(true)
    setError('')

    try {
      await updateApp(appId, {
        name: appName.trim(),
        description: description.trim() || null,
      })
      setSuccess('App details saved successfully.')
      await refreshApps()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save app')
    } finally {
      setIsSaving(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!appId || confirmName.trim() !== appName.trim()) return
    setIsLoading(true)
    setError('')

    try {
      await deleteApp(appId)
      setDeleteModalOpen(false)
      setConfirmName('')
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete app')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRevokeKey = async () => {
    if (!appId) return
    setIsLoading(true)
    setError('')

    try {
      await revokeAppApiKey(appId)
      setMaskedKey('')
      setHasKey(false)
      setGeneratedKey('')
      setSuccess('API key revoked successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke API key')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReviewExcluded = (view: AppDataAccessView) => {
    setActiveView(view)
    setStatusFilter('excluded')
  }

  const handleClearViewRequested = (view: AppDataAccessView) => {
    setError('')
    setSuccess('')
    setClearViewError('')
    setPendingClearView(view)
    setClearViewModalOpen(true)
  }

  const handleClearViewConfirm = async () => {
    if (!appId || !pendingClearView) return

    const viewBeingCleared = pendingClearView

    setIsLoading(true)
    setError('')
    setClearViewError('')

    try {
      const response = await clearAppViewExclusions(appId, {
        view: viewBeingCleared,
      })
      setSuccess(response.detail)
      setActiveView(viewBeingCleared)
      setClearViewModalOpen(false)
      setPendingClearView(null)
      setClearViewError('')
      setDataRefreshNonce((prev) => prev + 1)
      await loadSummary()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to clear exclusions'

      setClearViewError(getClearViewFailureMessage(viewBeingCleared, message))
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
          <PageHeader title="Loading..." showBack />
          <p className="text-muted-foreground">Loading app...</p>
        </div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
          <PageHeader title="App Not Found" showBack />
          <p className="text-muted-foreground">
            This app doesn't exist. Please go back to the dashboard.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
        <PageHeader title={`Manage (${appName})`} showBack />

        {error && (
          <div className="mb-6 flex max-w-3xl items-start justify-between gap-3 rounded-md bg-destructive/10 px-3 py-2.5 text-destructive">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="whitespace-pre-line text-sm font-medium">{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError('')}
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Close error"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex max-w-3xl items-center justify-between gap-3 rounded-md bg-green-50 px-3 py-2.5 text-green-700">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{success}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccess('')}
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Close success"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mb-10 rounded-lg border border-border bg-card p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">App Details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Update the app name and description, review current status, and manage API keys.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Name"
                  className={inputCls}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of what this app uses the data for"
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving && <Loader className="h-4 w-4 animate-spin" />}
                  Save Details
                </button>

                <button
                  onClick={() => setDeleteModalOpen(true)}
                  disabled={isLoading}
                  className="rounded-md bg-destructive px-6 py-2.5 text-xs font-semibold text-destructive-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Delete App
                </button>
              </div>
            </div>

            <div className="self-center rounded-lg border border-border bg-muted/20 p-5">
              <div className="mb-4 text-sm font-semibold text-foreground">API Key</div>

              <div className="mb-5 rounded-md bg-input px-3 py-3 font-mono text-sm text-foreground">
                {maskedKey || '<no active key>'}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleGenerateNewKey}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                  {hasKey ? 'Generate New Key' : 'Generate Key'}
                </button>

                <button
                  onClick={handleRevokeKey}
                  disabled={!hasKey || isLoading}
                  className="rounded-md bg-orange-600 px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Revoke Key
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 rounded-lg border border-border bg-card p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-foreground">Data Access</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse supported data, search rows, disable whole tables, and include or exclude selected records.
            </p>
          </div>

          <AppDataAccessManager
            appId={appId!}
            activeView={activeView}
            onActiveViewChange={setActiveView}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onDataChanged={loadSummary}
            refreshNonce={dataRefreshNonce}
          />
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Summary / Review</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Review exclusions by view, jump into excluded records, or clear exclusions.
              </p>
            </div>
            {isLoadingSummary && <Loader className="h-5 w-5 animate-spin text-primary" />}
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {summaryRows.map((item) => (
              <div
                key={item.view}
                className="rounded-lg border border-border bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{item.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {item.excludedCount} excluded row(s)
                    </div>
                  </div>
                  <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-foreground">
                    {item.excludedCount}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleReviewExcluded(item.view)}
                    className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                  >
                    Review Excluded
                  </button>

                  <button
                    type="button"
                    onClick={() => handleClearViewRequested(item.view)}
                    disabled={item.excludedCount === 0 || isLoading}
                    className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Clear Exclusions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={apiKeyModalOpen} title="API Key Created">
        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          For security reasons, we will only show the key once.
          <br />
          Please copy and store it somewhere safe.
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5">
          <span className="flex-1 break-all font-mono text-xs text-foreground">{generatedKey}</span>
          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <button
          onClick={() => setApiKeyModalOpen(false)}
          className="w-full rounded-md bg-foreground py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Done
        </button>
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setConfirmName('')
        }}
        showClose
        title="Delete App"
      >
        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          This will permanently delete the app and its API keys, table access settings, and row exclusions.
          To confirm, type the application's name below.
        </p>
        <input
          type="text"
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
          placeholder="Application Name"
          className={inputCls}
        />
        <div className="flex gap-3">
          <button
            onClick={handleConfirmDelete}
            disabled={confirmName.trim() !== appName.trim() || isLoading}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-destructive py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            Delete App
          </button>
          <button
            onClick={() => {
              setDeleteModalOpen(false)
              setConfirmName('')
            }}
            disabled={isLoading}
            className="flex-1 rounded-md bg-muted py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-input disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={clearViewModalOpen}
        onClose={() => {
          setClearViewModalOpen(false)
          setPendingClearView(null)
          setClearViewError('')
        }}
        showClose
        title="Clear View Exclusions"
      >
        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          {pendingClearView
            ? `Are you sure you want to clear all exclusions for ${VIEW_LABELS[pendingClearView]}?`
            : 'Are you sure you want to clear these exclusions?'}
        </p>

        {clearViewError && (
          <div className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2.5 text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="whitespace-pre-line text-sm font-medium">{clearViewError}</span>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleClearViewConfirm}
            disabled={isLoading || !pendingClearView}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-destructive py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            Clear Exclusions
          </button>
          <button
            onClick={() => {
              setClearViewModalOpen(false)
              setPendingClearView(null)
              setClearViewError('')
            }}
            disabled={isLoading}
            className="flex-1 rounded-md bg-muted py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-input disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}
