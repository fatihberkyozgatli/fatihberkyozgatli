import { apiClient, API_BASE_URL, getJwtToken } from './client'

// Type definitions for API responses
export interface PropertyOut {
  hmy: number
  scode: string
  saddr1?: string | null
}

export interface CategoryOut {
  hmy: number
  scode: string
  sdesc?: string | null
}

export interface GLCodeOut {
  hmy: number
  scode: string
  sdesc?: string | null
}

export interface JobOut {
  hmy: number
  hproperty?: number | null
  scode: string
  sbriefdesc?: string | null
  istatus?: number | null
}

export interface UserOut {
  email: string
  display_name?: string | null
  is_active: boolean
}

export interface UserListResponse {
  total: number
  limit: number
  offset: number
  items: UserOut[]
}

export interface ImportFileSummary {
  id?: number
  file_name?: string
  filename?: string
  table_name: string | null
  status: string

  started_at_utc?: string
  finished_at_utc?: string | null

  rows_read: number
  rows_inserted: number
  rows_updated: number
  rows_unchanged: number
  rows_rejected: number
  rows_deactivated?: number

  error_count?: number
  error_message?: string | null
  error_summary?: string | null
  error_samples?: string[]
  meta?: Record<string, unknown>
}

export interface ImportRun {
  run_id: string
  trigger_type: string
  source_type: string
  status: string
  triggered_by_email?: string | null
  started_at_utc: string
  finished_at_utc?: string | null

  files_total: number
  files_succeeded: number
  files_failed: number

  total_rows_read: number
  total_rows_inserted: number
  total_rows_updated: number
  total_rows_unchanged: number
  total_rows_rejected: number
  total_rows_deactivated?: number
  total_error_count?: number

  error_summary?: string | null
  meta: Record<string, unknown>
  files: ImportFileSummary[]
  created_at_utc: string
}

export interface AuditLog {
  id: number
  created_at_utc: string
  actor_email: string
  action: string
  entity_type: string
  entity_id?: string | null
  entity_name?: string | null
}

export interface AuditLogDetail extends AuditLog {
  actor_user_id?: number | null
  actor_session_id?: string | null
  actor_ip_address?: string | null
  details?: unknown
}

export interface PageResponse<T> {
  total: number
  limit: number
  offset: number
  items: T[]
}

const buildAppKeyHeaders = (apiKey: string): Record<string, string> => ({
  'x-api-key': apiKey,
})

// Properties API
export async function fetchProperties(
  apiKey: string,
  limit = 50,
  offset = 0,
  q?: string,
  listId?: number
) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())
  if (q) params.append('q', q)
  if (listId) params.append('list_id', listId.toString())

  return apiClient.get<PageResponse<PropertyOut>>(
    `/properties?${params.toString()}`,
    buildAppKeyHeaders(apiKey)
  )
}

export async function fetchPropertyById(apiKey: string, hmy: number) {
  return apiClient.get<PropertyOut>(`/properties/${hmy}`, buildAppKeyHeaders(apiKey))
}

// Categories API
export async function fetchCategories(apiKey: string, limit = 50, offset = 0, q?: string) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())
  if (q) params.append('q', q)

  return apiClient.get<PageResponse<CategoryOut>>(
    `/categories?${params.toString()}`,
    buildAppKeyHeaders(apiKey)
  )
}

export async function fetchCategoryByScode(apiKey: string, scode: string) {
  return apiClient.get<CategoryOut>(`/categories/${scode}`, buildAppKeyHeaders(apiKey))
}

// GL Codes API
export async function fetchGLCodes(apiKey: string, limit = 50, offset = 0, q?: string, prefix?: string) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())
  if (q) params.append('q', q)
  if (prefix) params.append('prefix', prefix)

  return apiClient.get<PageResponse<GLCodeOut>>(
    `/gl-codes?${params.toString()}`,
    buildAppKeyHeaders(apiKey)
  )
}

export async function fetchGLCodeByScode(apiKey: string, scode: string) {
  return apiClient.get<GLCodeOut>(`/gl-codes/${scode}`, buildAppKeyHeaders(apiKey))
}

// Jobs API
export async function fetchJobs(
  apiKey: string,
  limit = 50,
  offset = 0,
  q?: string,
  scode?: string,
  propertyHmy?: number
) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())
  if (q) params.append('q', q)
  if (scode) params.append('scode', scode)
  if (propertyHmy) params.append('property_hmy', propertyHmy.toString())

  return apiClient.get<PageResponse<JobOut>>(
    `/jobs?${params.toString()}`,
    buildAppKeyHeaders(apiKey)
  )
}

export async function fetchJobsByScode(
  apiKey: string,
  scode: string,
  limit = 50,
  offset = 0,
  propertyHmy?: number
) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())
  if (propertyHmy) params.append('property_hmy', propertyHmy.toString())

  return apiClient.get<PageResponse<JobOut>>(
    `/jobs/by-scode/${scode}?${params.toString()}`,
    buildAppKeyHeaders(apiKey)
  )
}

export async function fetchJobByHmy(apiKey: string, hmy: number) {
  return apiClient.get<JobOut>(`/jobs/by-hmy/${hmy}`, buildAppKeyHeaders(apiKey))
}

// Import Runs API
export async function fetchImportRuns(limit = 25, offset = 0) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())

  return apiClient.get<{
    total: number
    limit: number
    offset: number
    items: ImportRun[]
  }>(`/import-runs?${params.toString()}`)
}

export async function fetchLatestImportRun() {
  return apiClient.get<ImportRun>('/import-runs/latest')
}

export async function fetchImportRunById(runId: string) {
  return apiClient.get<ImportRun>(`/import-runs/${runId}`)
}

export async function getImportLogHistory(runId: string) {
  return apiClient.get<{
    run_id: string
    trigger_type: string
    source_type: string
    status: string
    triggered_by_email?: string | null
    started_at_utc: string
    finished_at_utc?: string | null
    tables: Array<{
      table_name: string
      error_count: number
      rows_updated: number
      rows_inserted: number
    }>
    created_at_utc: string
  }>(`/import-runs/${runId}/log-history`)
}

export async function exportImportLogsBulkZip() {
  try {
    const blob = await apiClient.postBlob('/import-runs/exports/bulk-zip', { format: 'json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const timestamp = new Date().toISOString().split('T')[0]
    a.download = `import_logs_${timestamp}.zip`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to export logs: ${message}`)
  }
}

export async function exportImportRunLogJson(runId: string) {
  try {
    const blob = await apiClient.getBlob(`/import-runs/${runId}/export`)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const safeRunId = runId.replace(/-/g, '_')
    const timestamp = new Date().toISOString().split('T')[0]
    a.download = `import_log_${safeRunId}_${timestamp}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to export import run log: ${message}`)
  }
}

export async function fetchAuditLogs(limit = 10, offset = 0) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())

  return apiClient.get<{
    total: number
    limit: number
    offset: number
    items: AuditLog[]
  }>(`/audit-logs?${params.toString()}`)
}

export async function fetchAuditLogById(auditLogId: number) {
  return apiClient.get<AuditLogDetail>(`/audit-logs/${auditLogId}`)
}

export async function exportAuditLogsJson() {
  try {
    const blob = await apiClient.getBlob('/audit-logs/export')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const timestamp = new Date().toISOString().split('T')[0]
    a.download = `user_activity_logs_${timestamp}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to export user activity logs: ${message}`)
  }
}

export async function exportAuditLogJson(auditLogId: number) {
  try {
    const blob = await apiClient.getBlob(`/audit-logs/${auditLogId}/export`)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const timestamp = new Date().toISOString().split('T')[0]
    a.download = `user_activity_log_${auditLogId}_${timestamp}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to export selected user activity log: ${message}`)
  }
}

export interface AvailableImportFile {
  filename: string
  format?: string | null
  table_name: string | null
  is_supported: boolean
  error?: string | null
}

export interface AvailableFilesResponse {
  message: string
  files: AvailableImportFile[]
  supported_tables: string[]
}

export interface TriggerImportProcessedFile {
  filename: string
  table_name: string
  status: 'running' | 'success' | 'partial_success' | 'failed'
  rows_read: number
  rows_inserted: number
  rows_updated: number
  rows_unchanged: number
  rows_rejected: number
  rows_deactivated?: number
  error?: string
}

export interface TriggerImportResult {
  run_id: string
  status: 'running' | 'success' | 'partial_success' | 'failed'
  files_processed: TriggerImportProcessedFile[]
  total_rows_read: number
  total_rows_inserted: number
  total_rows_updated: number
  total_rows_unchanged: number
  total_rows_rejected: number
  total_rows_deactivated?: number
  files_total: number
  files_succeeded: number
  files_failed: number
  error_summary?: string | null
  sftp_run_id?: number
  files_downloaded?: number
}

export interface TriggerImportResponse {
  message: string
  result: TriggerImportResult
}


export interface SftpImportRun {
  id: number
  started_at_utc: string
  finished_at_utc?: string | null
  status: string
  remote_path: string
  trigger_type: string
  table_names: string[]
  files_found: string[]
  modified_files: Array<{ name: string; mtime?: string }>
  files_downloaded: string[]
  files_failed: Array<{ name: string; table_name?: string; error?: string }>
  last_modified: Record<string, string>
  attempts_count: number
  error_details?: string | null
  created_at: string
}

export async function fetchSftpImportRuns(limit = 10, offset = 0) {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())

  return apiClient.get<{
    total: number
    limit: number
    offset: number
    items: SftpImportRun[]
  }>(`/sftp-import-runs?${params.toString()}`)
}

export async function fetchSftpImportRunById(runId: number) {
  return apiClient.get<SftpImportRun>(`/sftp-import-runs/${runId}`)
}

export async function exportSftpImportLogsBulkZip() {
  try {
    const blob = await apiClient.postBlob('/sftp-import-runs/exports/bulk-zip')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const timestamp = new Date().toISOString().split('T')[0]
    a.download = `sftp_logs_${timestamp}.zip`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to export SFTP logs: ${message}`)
  }
}

export async function exportSftpImportRunLogJson(runId: number) {
  try {
    const blob = await apiClient.getBlob(`/sftp-import-runs/${runId}/export`)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const timestamp = new Date().toISOString().split('T')[0]
    a.download = `sftp_log_${runId}_${timestamp}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to export selected SFTP log: ${message}`)
  }
}

export async function fetchAvailableImportFiles() {
  return apiClient.get<AvailableFilesResponse>('/data-ingestion/available-files')
}

export async function fetchAvailableSFTPTables() {
  return apiClient.get<AvailableFilesResponse>('/data-ingestion/available-sftp-tables')
}

export async function triggerManualImport(filenames: string[]) {
  return apiClient.post<TriggerImportResponse>('/data-ingestion/trigger', { filenames })
}

export async function triggerSFTPImport(tableNames?: string[]) {
  const params = new URLSearchParams()
  if (tableNames && tableNames.length > 0) {
    tableNames.forEach(table => params.append('table_names', table))
  }
  const query = params.toString() ? `?${params.toString()}` : ''
  return apiClient.post<TriggerImportResponse>(`/data-ingestion/manual-sftp${query}`, {})
}

export interface ConfigurationTrackedTable {
  id: number
  table_name: string
  file_name: string
  column_count?: number
  is_enabled: boolean
}

export interface ConfigurationOut {
  sftp_host?: string | null
  sftp_port?: number | null
  sftp_username?: string | null
  sftp_remote_path?: string | null
  has_password: boolean
  tracked_tables: ConfigurationTrackedTable[]
}

export interface UpdateConfigurationRequest {
  sftp_host?: string | null
  sftp_port?: number | null
  sftp_username?: string | null
  sftp_password?: string | null
  sftp_remote_path?: string | null
}

export interface SftpConnectionTestResponse {
  message: string
  run_id: number
  status: string
  trigger_type: string
  files_found: string[]
}

export async function fetchConfiguration() {
  return apiClient.get<ConfigurationOut>('/configuration')
}

export async function updateConfiguration(payload: UpdateConfigurationRequest) {
  return apiClient.put<ConfigurationOut>('/configuration', payload)
}

export async function testSftpConnection() {
  return apiClient.post<SftpConnectionTestResponse>('/configuration/test-sftp', {})
}

export interface TimezoneOption {
  value: string
  label: string
}

export interface TimezoneOptionsResponse {
  message: string
  options: TimezoneOption[]
}

export interface ImportScheduleOut {
  is_enabled: boolean
  frequency: string
  source_type: string
  timezone: string
  hour: number
  minute: number
  local_time: string
  utc_time: string
  next_run_time_utc?: string | null
  last_run_id?: string | null
  last_run_started_at_utc?: string | null
  last_run_finished_at_utc?: string | null
  last_run_status?: string | null
  last_error_summary?: string | null
  meta: Record<string, unknown>
  updated_at_utc?: string | null
  tables: string[]
}

export interface ImportScheduleResponse {
  message: string
  schedule: ImportScheduleOut
}

export interface UpdateImportScheduleRequest {
  is_enabled: boolean
  frequency: string
  source_type: string
  timezone: string
  hour: number
  minute: number
  meta?: Record<string, unknown>
}

export async function fetchTimezoneOptions() {
  return apiClient.get<TimezoneOptionsResponse>('/data-ingestion/timezone-options')
}

export async function fetchImportSchedule() {
  return apiClient.get<ImportScheduleResponse>('/data-ingestion/schedule')
}

export async function updateImportSchedule(payload: UpdateImportScheduleRequest) {
  return apiClient.post<ImportScheduleResponse>('/data-ingestion/schedule', payload)
}

export async function disableImportSchedule() {
  return apiClient.post<ImportScheduleResponse>('/data-ingestion/schedule/disable', {})
}

// App Management API
export interface AppOut {
  id: number
  name: string
  description?: string | null
  is_active: boolean
  created_at_utc: string
  updated_at_utc: string
}

export interface AppApiKeyOut {
  id: number
  app_id: number
  last4: string
  created_at_utc: string
  revoked_at_utc?: string | null
}

export interface AppApiKeyCreateOut {
  id: number
  app_id: number
  plaintext_key: string
  last4: string
  created_at_utc: string
}

export type AppDataAccessView =
  | 'properties'
  | 'property_lists'
  | 'property_list_allocations'
  | 'job'
  | 'category'
  | 'acct'

export type AppDataAccessStatus = 'all' | 'included' | 'excluded'

export interface AppTableAccessOut {
  table_name: string
  is_enabled: boolean
}

export interface AppDataAccessRow {
  row_hmy: number
  is_excluded: boolean
  [key: string]: unknown
}

export interface AppDataAccessBrowseResponse {
  view: AppDataAccessView
  columns: string[]
  rows: AppDataAccessRow[]
  page: number
  page_size: number
  total_rows: number
  status: AppDataAccessStatus
}

export interface AppDataAccessSummaryOut {
  table_access: Record<string, boolean>
  view_summary: Record<string, number>
}

export async function listApps(limit = 50, offset = 0, q?: string) {
  return apiClient.get<PageResponse<AppOut>>(
    `/apps?limit=${limit}&offset=${offset}${q ? `&q=${encodeURIComponent(q)}` : ''}`
  )
}

export async function getApp(appId: number) {
  return apiClient.get<AppOut>(`/apps/${appId}`)
}

export async function createApp(name: string, description?: string | null) {
  return apiClient.post<AppOut>('/apps', {
    name,
    description: description ?? null,
  })
}

export async function updateApp(
  appId: number,
  name?: string,
  isActive?: boolean,
  description?: string | null
) {
  const payload: Record<string, any> = {}
  if (name !== undefined) payload.name = name
  if (isActive !== undefined) payload.is_active = isActive
  if (description !== undefined) payload.description = description
  return apiClient.put<AppOut>(`/apps/${appId}`, payload)
}

export async function deleteApp(appId: number) {
  return apiClient.delete<AppOut>(`/apps/${appId}`)
}

export async function getAppApiKey(appId: number) {
  return apiClient.get<AppApiKeyOut>(`/apps/${appId}/api-key`)
}

export async function createAppApiKey(appId: number) {
  return apiClient.post<AppApiKeyCreateOut>(`/apps/${appId}/api-key`, {})
}

export async function revokeAppApiKey(appId: number) {
  return apiClient.delete<{ detail: string }>(`/apps/${appId}/api-key`)
}

// Legacy tag exclusion endpoints.
// These are being retired and should not be used by new UI work.
export interface AppExclusionOut {
  id: number
  app_id: number
  exclusion_type: string
  value: string
}

export async function listAppExclusions(appId: number, exclusionType?: string) {
  const params = new URLSearchParams()
  if (exclusionType) params.append('exclusion_type', exclusionType)
  return apiClient.get<AppExclusionOut[]>(
    `/apps/${appId}/exclusions${params.toString() ? '?' + params.toString() : ''}`
  )
}

export async function createAppExclusion(appId: number, exclusionType: string, value: string) {
  return apiClient.post<AppExclusionOut>(`/apps/${appId}/exclusions`, {
    exclusion_type: exclusionType,
    value: value,
  })
}

export async function deleteAppExclusion(appId: number, exclusionId: number) {
  return apiClient.delete<{ detail: string }>(`/apps/${appId}/exclusions/${exclusionId}`)
}

export async function fetchAppTableAccess(appId: number) {
  return apiClient.get<AppTableAccessOut[]>(`/apps/${appId}/table-access`)
}

export async function updateAppTableAccess(
  appId: number,
  tableName: string,
  isEnabled: boolean
) {
  return apiClient.put<AppTableAccessOut>(`/apps/${appId}/table-access/${tableName}`, {
    is_enabled: isEnabled,
  })
}

export async function fetchAppDataAccessSummary(appId: number) {
  return apiClient.get<AppDataAccessSummaryOut>(`/apps/${appId}/data-access/summary`)
}

export async function browseAppDataAccess(
  appId: number,
  params: {
    view: AppDataAccessView
    search?: string
    status?: AppDataAccessStatus
    page?: number
    page_size?: number
    weighted_only?: boolean
    property_list_hmy?: number
    property_hmy?: number
  }
) {
  const query = new URLSearchParams()
  query.append('view', params.view)
  query.append('status', params.status ?? 'all')
  query.append('page', String(params.page ?? 1))
  query.append('page_size', String(params.page_size ?? 25))

  if (params.search?.trim()) query.append('search', params.search.trim())
  if (params.weighted_only) query.append('weighted_only', 'true')
  if (params.property_list_hmy !== undefined) {
    query.append('property_list_hmy', String(params.property_list_hmy))
  }
  if (params.property_hmy !== undefined) {
    query.append('property_hmy', String(params.property_hmy))
  }

  return apiClient.get<AppDataAccessBrowseResponse>(
    `/apps/${appId}/data-access/browse?${query.toString()}`
  )
}

export async function excludeAppRows(
  appId: number,
  payload: {
    view: AppDataAccessView
    row_hmys: number[]
  }
) {
  return apiClient.post<{ detail: string }>(`/apps/${appId}/data-access/exclude`, payload)
}

export async function includeAppRows(
  appId: number,
  payload: {
    view: AppDataAccessView
    row_hmys: number[]
  }
) {
  return apiClient.post<{ detail: string }>(`/apps/${appId}/data-access/include`, payload)
}

export async function clearAppViewExclusions(
  appId: number,
  payload: {
    view: AppDataAccessView
  }
) {
  return apiClient.post<{ detail: string }>(
    `/apps/${appId}/data-access/clear-view-exclusions`,
    payload
  )
}

export async function includeOnlyWeightedPropertyLists(appId: number) {
  return apiClient.post<{ detail: string }>(
    `/apps/${appId}/data-access/property-lists/include-weighted-only`,
    {}
  )
}

// JWT Token management
export function setJwtToken(token: string) {
  localStorage.setItem('jwt_token', token)
}

export { getJwtToken }

export function clearJwtToken() {
  localStorage.removeItem('jwt_token')
}

export function isTokenExpired(): boolean {
  const token = getJwtToken()
  if (!token) return true

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true

    const payload = JSON.parse(atob(parts[1]))
    const exp = payload.exp

    if (!exp) return false

    const currentTimeInSeconds = Math.floor(Date.now() / 1000)
    return exp < currentTimeInSeconds
  } catch (err) {
    console.error('Error checking token expiration:', err)
    return true
  }
}

// Authentication API
export async function loginUser(email: string, password: string) {
  const formData = new FormData()
  formData.append('username', email)
  formData.append('password', password)

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || `Login failed with status ${response.status}`)
  }

  const data = await response.json()
  return data as { access_token: string; token_type: string; requires_password_change?: boolean }
}

export async function registerUser(email: string) {
  return apiClient.post<{
    msg: string
    temporary_password: string
    email: string
  }>('/auth/register', email)
}

export async function changeUserPassword(current_password: string, new_password: string) {
  return apiClient.post<{ message: string }>('/auth/change-password', {
    current_password,
    new_password,
  })
}

export interface CurrentUserProfileOut {
  email: string
  display_name: string
  requires_password_change: boolean
}

export async function fetchCurrentUserProfile() {
  return apiClient.get<CurrentUserProfileOut>('/auth/me')
}

export async function updateCurrentUserProfile(display_name: string) {
  return apiClient.put<CurrentUserProfileOut>('/auth/me', {
    display_name,
  })
}

export async function logoutUser() {
  try {
    await apiClient.post<{ msg: string }>('/auth/logout')
  } finally {
    clearJwtToken()
  }
}

export async function validateSession() {
  return apiClient.get<{ status: string; email?: string; session_id?: string }>('/auth/session-status')
}

export async function refreshAccessToken() {
  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || `Token refresh failed with status ${response.status}`)
  }

  const data = await response.json()
  setJwtToken(data.access_token)
  return data.access_token
}

// user-management helpers
export async function listUsers(limit = 25, offset = 0) {
  return apiClient.get<UserListResponse>(`/users?limit=${limit}&offset=${offset}`)
}

export async function deactivateUser(email: string) {
  return apiClient.post<{ message: string }>('/users/deactivate', email)
}

export async function reactivateUser(email: string) {
  return apiClient.post<{ message: string }>('/users/reactivate', email)
}

export async function deleteUser(email: string) {
  return apiClient.delete<{ message: string }>('/users', email)
}

export async function fetchUserLoginHistory(email: string) {
  return apiClient.post<{
    email: string
    login_attempts: Array<{
      timestamp: string
      ip_address: string | null
      status: string
      failure_reason?: string | null
    }>
  }>('/users/login-history', email)
}

export async function changePassword(currentPassword: string, newPassword: string) {
  return apiClient.post<{ message: string }>('/auth/change-password', {
    current_password: currentPassword,
    new_password: newPassword,
  })
}
