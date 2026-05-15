import { useEffect, useState } from 'react'
import { Download, RefreshCw, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader'

function LogsPage() {
  const [activeTab, setActiveTab] = useState<'imports' | 'sftp' | 'audit'>('imports')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate loading
    await new Promise(r => setTimeout(r, 500))
    setIsRefreshing(false)
  }

  const mockImportRuns = [
    {
      run_id: 'run_1715849400000',
      status: 'success',
      started_at: '2024-05-14T10:00:00Z',
      files_succeeded: 5,
      files_failed: 0,
      total_rows: 2500,
    },
    {
      run_id: 'run_1715762400000',
      status: 'success',
      started_at: '2024-05-13T10:00:00Z',
      files_succeeded: 4,
      files_failed: 1,
      total_rows: 1800,
    },
    {
      run_id: 'run_1715676000000',
      status: 'warning',
      started_at: '2024-05-12T10:00:00Z',
      files_succeeded: 3,
      files_failed: 2,
      total_rows: 900,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <PageHeader title="Logs" />
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          {['imports', 'sftp', 'audit'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'imports' ? 'Import Runs' : tab === 'sftp' ? 'SFTP Runs' : 'Audit Logs'}
            </button>
          ))}
        </div>

        {/* Import Runs Tab */}
        {activeTab === 'imports' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Run ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Started</th>
                    <th className="text-left py-3 px-4 font-semibold">Files</th>
                    <th className="text-left py-3 px-4 font-semibold">Rows</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockImportRuns.map((run) => (
                    <tr key={run.run_id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs">{run.run_id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {run.status === 'success' ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-green-700 font-medium">Success</span>
                            </>
                          ) : run.status === 'warning' ? (
                            <>
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                              <span className="text-yellow-700 font-medium">Partial</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-700 font-medium">Running</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{run.started_at.split('T')[0]}</td>
                      <td className="py-3 px-4">{run.files_succeeded} ✓ / {run.files_failed} ✗</td>
                      <td className="py-3 px-4">{run.total_rows.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:underline flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SFTP Runs Tab */}
        {activeTab === 'sftp' && (
          <div className="rounded-lg border border-border bg-secondary/20 p-6 text-center">
            <p className="text-muted-foreground">No SFTP import runs available</p>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="rounded-lg border border-border bg-secondary/20 p-6 text-center">
            <p className="text-muted-foreground">No audit logs available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LogsPage
