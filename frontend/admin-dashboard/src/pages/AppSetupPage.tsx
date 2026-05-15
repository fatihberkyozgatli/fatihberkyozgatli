import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, Check, AlertCircle, Loader, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import AppDataAccessManager from '../components/AppDataAccessManager'
import { useApps, type App } from '../context/AppContext'
import { createAppApiKey } from '../api/api'

const inputCls =
  'w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors'

export default function AppSetupPage() {
  const navigate = useNavigate()
  const { addApp, refreshApps } = useApps()

  const [step, setStep] = useState<1 | 2>(1)
  const [createdApp, setCreatedApp] = useState<App | null>(null)

  const [appName, setAppName] = useState('')
  const [description, setDescription] = useState('')

  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)
  const [generatedKey, setGeneratedKey] = useState('')
  const [copied, setCopied] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!success) return

    const timer = window.setTimeout(() => {
      setSuccess('')
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [success])

  const handleCreateApp = async () => {
    if (!appName.trim()) {
      setError('App name is required')
      return
    }

    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const app = await addApp(appName.trim(), description.trim() || null)
      const apiKeyResponse = await createAppApiKey(app.id)

      setCreatedApp(app)
      setGeneratedKey(apiKeyResponse.plaintext_key)
      setApiKeyModalOpen(true)
      setStep(2)
      setSuccess('App created successfully. Configure data access below.')
      await refreshApps()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create app'

      if (
        message.includes('409') ||
        message.toLowerCase().includes('already exists') ||
        message.toLowerCase().includes('conflict')
      ) {
        setError('An app with this name already exists')
      } else {
        setError(message)
      }
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

  const handleFinishSetup = () => {
    navigate('/dashboard')
  }

  const handleOpenManageApp = () => {
    if (!createdApp) return
    navigate(`/app-management/${createdApp.id}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
        <PageHeader title="Add a New App" showBack />

        {error && (
          <div className="mb-6 flex max-w-2xl items-center justify-between gap-3 rounded-md bg-destructive/10 px-3 py-2.5 text-destructive">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{error}</span>
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
          <div className="mb-6 flex max-w-2xl items-center justify-between gap-3 rounded-md bg-green-50 px-3 py-2.5 text-green-700">
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

        {step === 1 && (
          <div className="max-w-2xl rounded-lg border border-border bg-card p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-foreground">Step 1 • App Details</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Create the app, save its description, and generate its first API key.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">App Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Name"
                  className={inputCls}
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>

              <div className="rounded-md border border-border bg-muted/40 px-3 py-3 text-sm text-muted-foreground">
                All supported tables are included by default. In Step 2 you can refine full-table access and exclude specific rows.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCreateApp}
                  disabled={isLoading}
                  className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                  Create App and Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && createdApp && (
          <div className="flex flex-col gap-8">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-foreground">Step 2 • Configure Data Access</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse supported data, disable whole tables if needed, and include or exclude specific rows.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    App Name
                  </div>
                  <div className="mt-1 text-sm text-foreground">{createdApp.name}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Description
                  </div>
                  <div className="mt-1 text-sm text-foreground">
                    {createdApp.description || '-'}
                  </div>
                </div>
              </div>
            </div>

            <AppDataAccessManager appId={createdApp.id} />

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleFinishSetup}
                className="rounded-md bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Finish Setup
              </button>

              <button
                onClick={handleOpenManageApp}
                className="rounded-md bg-muted px-6 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted/80"
              >
                Open Manage App
              </button>
            </div>
          </div>
        )}
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
    </div>
  )
}
