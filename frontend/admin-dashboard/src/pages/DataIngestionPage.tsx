import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Loader, RefreshCw, Cloud, HardDrive } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import {
    fetchAvailableImportFiles,
    fetchAvailableSFTPTables,
    triggerManualImport,
    triggerSFTPImport,
    AvailableImportFile,
    TriggerImportResult,
    ImportRun,
} from '../api/api'

export default function DataIngestionPage() {
    const navigate = useNavigate()

    const [files, setFiles] = useState<AvailableImportFile[]>([])
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [isLoadingFiles, setIsLoadingFiles] = useState(true)
    const [isImporting, setIsImporting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [result, setResult] = useState<ImportRun | null>(null)
    const [importSource, setImportSource] = useState<'local' | 'sftp'>('sftp')

    const supportedFiles = useMemo(
        () => files.filter((file) => file.is_supported),
        [files]
    )

    const loadAvailableFiles = async (source: 'local' | 'sftp' = 'sftp') => {
        try {
            setIsLoadingFiles(true)
            setError(null)
            setFiles([])
            setSelectedFiles([])

            const data = source === 'sftp'
                ? await fetchAvailableSFTPTables()
                : await fetchAvailableImportFiles()

            setFiles(data.files)

            const defaultSelected = data.files
                .filter((file) => file.is_supported)
                .map((file) => file.filename)

            setSelectedFiles(defaultSelected)
        } catch (err) {
            setError(err instanceof Error ? err.message : `Failed to load ${source} files`)
        } finally {
            setIsLoadingFiles(false)
        }
    }

    useEffect(() => {
        loadAvailableFiles(importSource)
    }, [importSource])

    const toggleFile = (filename: string) => {
        setSelectedFiles((prev) =>
            prev.includes(filename)
                ? prev.filter((name) => name !== filename)
                : [...prev, filename]
        )
    }

    const handleSelectAll = () => {
        setSelectedFiles(supportedFiles.map((file) => file.filename))
    }

    const handleClearAll = () => {
        setSelectedFiles([])
    }

    const handleRunImport = async () => {
        if (selectedFiles.length === 0) {
            setError('Select at least one supported file to import')
            return
        }

        try {
            setIsImporting(true)
            setError(null)
            setSuccessMessage(null)
            setResult(null)

            let response
            if (importSource === 'sftp') {
                const tableNameByFile = new Map(files.map(f => [f.filename, f.table_name]))
                const tableNames = selectedFiles
                    .map(f => tableNameByFile.get(f))
                    .filter((t): t is string => t !== undefined)
                response = await triggerSFTPImport(tableNames)
            } else {
                response = await triggerManualImport(selectedFiles)
            }

            setResult(response.result)
            setSuccessMessage(`Import completed. Run ID: ${response.result.run_id}`)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to run import')
        } finally {
            setIsImporting(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-8 pt-8 pb-24">
                <PageHeader title="Manual Import" showBack onBack={() => navigate('/dashboard')} />

                <div className="max-w-3xl flex flex-col gap-5">
                    <div className="rounded-lg border border-border bg-secondary/20 p-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-foreground">Manual Import</p>
                            <p className="text-sm text-foreground">
                                {importSource === 'sftp'
                                    ? 'Import data files from the configured SFTP server. Select the tables you want to import. These will be staged, then imported'
                                    : 'Import data files from the backend data folder. Select the files you want to import and click Import.'}
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            This runs the real import pipeline and creates import log records for the dashboard and logs page.
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 text-destructive rounded-md">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="flex items-center gap-2 px-3 py-2.5 bg-green-50 text-green-700 rounded-md">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span className="text-sm font-medium">{successMessage}</span>
                        </div>
                    )}

                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-foreground">
                                Available Import Files ({files.length})
                            </h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => loadAvailableFiles(importSource)}
                                    disabled={isLoadingFiles || isImporting}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-muted text-foreground text-sm font-medium hover:bg-input transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoadingFiles ? <Loader className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                                    Refresh
                                </button>
                                <div className="flex items-center gap-1 bg-muted rounded-md p-1">
                                    <button
                                        onClick={() => setImportSource('sftp')}
                                        disabled={isLoadingFiles || isImporting}
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${importSource === 'sftp'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-input'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <Cloud className="w-4 h-4" />
                                        SFTP
                                    </button>
                                    <button
                                        onClick={() => setImportSource('local')}
                                        disabled={isLoadingFiles || isImporting}
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors ${importSource === 'local'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-input'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <HardDrive className="w-4 h-4" />
                                        Local
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSelectAll}
                                disabled={isLoadingFiles || supportedFiles.length === 0 || isImporting}
                                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Select All Supported
                            </button>
                            <button
                                onClick={handleClearAll}
                                disabled={isLoadingFiles || selectedFiles.length === 0 || isImporting}
                                className="px-4 py-2 rounded-md bg-muted text-foreground text-sm font-semibold hover:bg-input transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Clear Selection
                            </button>
                        </div>

                        {isLoadingFiles ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader className="w-4 h-4 animate-spin" />
                                Loading available files...
                            </div>
                        ) : files.length === 0 ? (
                            importSource === 'sftp' ? (
                                <p className="text-sm text-muted-foreground">
                                    There is currently no SFTP server configured. Please visit the{' '}
                                    <a href="/settings" className="text-primary underline">app settings</a>{' '}
                                    page to configure the server.
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground">No data files found in the backend data folder.</p>
                            )
                        ) : (
                            <div className="border border-border rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-muted">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Import</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Filename</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Format</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Detected Table</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {files.map((file) => {
                                            const checked = selectedFiles.includes(file.filename)

                                            return (
                                                <tr key={file.filename} className="border-t border-border hover:bg-secondary/20 transition-colors">
                                                    <td className="px-4 py-3 text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={checked}
                                                            disabled={!file.is_supported || isImporting}
                                                            onChange={() => toggleFile(file.filename)}
                                                            className="h-4 w-4"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-foreground font-mono">{file.filename}</td>
                                                    <td className="px-4 py-3 text-sm text-foreground">
                                                        {file.format ? (
                                                            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium uppercase">
                                                                {file.format}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-foreground">{file.table_name ?? '-'}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {file.is_supported ? (
                                                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                                                                Supported
                                                            </span>
                                                        ) : (
                                                            <div className="flex flex-col gap-1">
                                                                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                                                    Unsupported
                                                                </span>
                                                                {file.error && (
                                                                    <span className="text-xs text-gray-500 max-w-xs" title={file.error}>
                                                                        {file.error.substring(0, 50)}
                                                                        {file.error.length > 50 ? '...' : ''}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={handleRunImport}
                            disabled={isLoadingFiles || isImporting || selectedFiles.length === 0}
                            className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isImporting && <Loader className="w-4 h-4 animate-spin" />}
                            {isImporting ? 'Running Import...' : 'Run Import'}
                        </button>

                        <button
                            onClick={() => navigate('/logs')}
                            disabled={isImporting}
                            className="px-6 py-2.5 rounded-md bg-muted text-foreground text-sm font-semibold hover:bg-input transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            View Logs
                        </button>
                    </div>

                    {result && (
                        <section className="mt-4 flex flex-col gap-4">
                            <h2 className="text-lg font-semibold text-foreground">Latest Manual Import Result</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Run ID</p>
                                    <p className="text-sm font-mono text-foreground break-all">{result.run_id}</p>
                                </div>
                                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Status</p>
                                    <p className="text-sm font-semibold text-foreground">{result.status.toUpperCase()}</p>
                                </div>
                                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Files</p>
                                    <p className="text-sm text-foreground">
                                        {result.files_succeeded} succeeded / {result.files_failed} failed
                                    </p>
                                </div>
                                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Rows Read</p>
                                    <p className="text-sm text-foreground">{result.total_rows_read}</p>
                                </div>
                                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Rows Inserted</p>
                                    <p className="text-sm text-foreground">{result.total_rows_inserted}</p>
                                </div>
                                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Rows Updated</p>
                                    <p className="text-sm text-foreground">{result.total_rows_updated}</p>
                                </div>
                                <div className="border border-border rounded-lg p-4 bg-secondary/20">
                                    <p className="text-xs text-muted-foreground">Removed from Source</p>
                                    <p className="text-sm text-foreground">{result.total_rows_deactivated ?? 0}</p>
                                </div>
                            </div>

                            <div className="border border-border rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-muted">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">File</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Table</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Inserted</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Updated</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Rejected</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold">Removed from Source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.files.map((file: any) => (
                                            <tr key={`${file.filename}-${file.table_name}`} className="border-t border-border hover:bg-secondary/20 transition-colors">
                                                <td className="px-4 py-3 text-sm text-foreground font-mono">{file.filename}</td>
                                                <td className="px-4 py-3 text-sm text-foreground">{file.table_name}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-medium ${file.status === 'success'
                                                            ? 'bg-green-50 text-green-700'
                                                            : file.status === 'failed'
                                                                ? 'bg-red-50 text-red-700'
                                                                : 'bg-yellow-50 text-yellow-700'
                                                            }`}
                                                    >
                                                        {file.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-foreground">{file.rows_inserted}</td>
                                                <td className="px-4 py-3 text-sm text-foreground">{file.rows_updated}</td>
                                                <td className="px-4 py-3 text-sm text-foreground">{file.rows_rejected}</td>
                                                <td className="px-4 py-3 text-sm text-foreground">{file.rows_deactivated ?? 0}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {result.error_summary && (
                                <div className="px-3 py-2.5 bg-destructive/10 text-destructive rounded-md text-sm">
                                    {result.error_summary}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
