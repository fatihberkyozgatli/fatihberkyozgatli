// UI-ONLY MOCK API - No backend calls
// All functions return mock data for UI prototyping

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

export type SftpImportRun = ImportRun

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

// Auth functions
export async function loginUser(email: string, password: string) {
  return {
    access_token: 'mock_token_' + Date.now(),
    requires_password_change: false,
  }
}

export function setJwtToken(_token: string) {
  // no-op
}

export async function changePassword(_currentPassword: string, _newPassword: string) {
  return { success: true }
}

export function getJwtToken() {
  return 'mock_token'
}

export async function validateSession() {
  return { valid: true }
}

export async function logoutUser() {
  return { success: true }
}

export async function refreshAccessToken() {
  return { access_token: 'mock_token_' + Date.now() }
}

export function isTokenExpired() {
  return false
}

export function clearJwtToken() {
  // no-op
}

// App management
export interface App {
  id: number
  name: string
  description?: string | null
  is_active: boolean
  created_at_utc: string
  updated_at_utc: string
}

export async function listApps(limit = 50, offset = 0) {
  return {
    total: 2,
    limit,
    offset,
    items: [
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
    ] as App[],
  }
}

export async function createApp(name: string, description: string | null) {
  return {
    id: Math.floor(Math.random() * 10000),
    name,
    description,
    is_active: true,
    created_at_utc: new Date().toISOString(),
    updated_at_utc: new Date().toISOString(),
  } as App
}

export async function updateApp(
  _id: number,
  name?: string,
  isActive?: boolean,
  description?: string | null
) {
  return {
    id: _id,
    name: name || 'App Name',
    description,
    is_active: isActive ?? true,
    created_at_utc: new Date().toISOString(),
    updated_at_utc: new Date().toISOString(),
  } as App
}

export async function deleteApp(_id: number) {
  return { success: true }
}

// API Key management
export async function createAppApiKey(_appId: number) {
  return {
    plaintext_key: 'pk_live_' + Math.random().toString(36).substring(2, 38),
    last4: Math.random().toString().substring(2, 6),
  }
}

export async function getAppApiKey(_appId: number) {
  return {
    plaintext_key: '',
    last4: '9876',
  }
}

export async function revokeAppApiKey(_appId: number, _keyId: number) {
  return { success: true }
}

// Data access
export type AppDataAccessStatus = 'all' | 'excluded' | 'included'
export type AppDataAccessView = 'properties' | 'property_lists' | 'job' | 'category' | 'acct'

export interface AppDataAccessSummaryOut {
  view_summary?: Record<AppDataAccessView, number>
}

export async function fetchAppDataAccessSummary(_appId: number) {
  return {
    view_summary: {
      properties: 5,
      property_lists: 2,
      job: 0,
      category: 0,
      acct: 1,
    },
  } as AppDataAccessSummaryOut
}

export async function clearAppViewExclusions(_appId: number, _view: AppDataAccessView) {
  return { success: true }
}

// Import management
export interface AvailableImportFile {
  filename: string
  table_name: string | null
  is_supported: boolean
  format?: string
  error?: string
}

export async function fetchAvailableImportFiles() {
  return {
    files: [
      { filename: 'properties.csv', table_name: 'property', is_supported: true, format: 'CSV' },
      { filename: 'jobs.csv', table_name: 'job', is_supported: true, format: 'CSV' },
      { filename: 'categories.xlsx', table_name: 'category', is_supported: true, format: 'XLSX' },
    ] as AvailableImportFile[],
  }
}

export async function fetchAvailableSFTPTables() {
  return {
    files: [
      { filename: 'property_data.csv', table_name: 'property', is_supported: true, format: 'CSV' },
      { filename: 'job_codes.txt', table_name: 'job', is_supported: false, format: 'TXT', error: 'Unsupported file format' },
      { filename: 'gl_accounts.csv', table_name: 'acct', is_supported: true, format: 'CSV' },
    ] as AvailableImportFile[],
  }
}

export interface TriggerImportResult {
  result: ImportRun
}

export async function triggerManualImport(_files: string[]) {
  return {
    result: {
      run_id: 'run_' + Date.now(),
      trigger_type: 'manual',
      source_type: 'local',
      status: 'success',
      started_at_utc: new Date().toISOString(),
      finished_at_utc: new Date().toISOString(),
      files_total: _files.length,
      files_succeeded: _files.length,
      files_failed: 0,
      total_rows_read: 1250,
      total_rows_inserted: 1200,
      total_rows_updated: 50,
      total_rows_unchanged: 0,
      total_rows_rejected: 0,
      error_summary: null,
      meta: {},
      files: _files.map((f) => ({
        filename: f,
        table_name: f.split('.')[0],
        status: 'success',
        rows_read: 400,
        rows_inserted: 400,
        rows_updated: 0,
        rows_unchanged: 0,
        rows_rejected: 0,
      })),
      created_at_utc: new Date().toISOString(),
    } as ImportRun,
  } as TriggerImportResult
}

export async function triggerSFTPImport(_tables: string[]) {
  return {
    result: {
      run_id: 'run_' + Date.now(),
      trigger_type: 'manual',
      source_type: 'sftp',
      status: 'success',
      started_at_utc: new Date().toISOString(),
      finished_at_utc: new Date().toISOString(),
      files_total: _tables.length,
      files_succeeded: _tables.length,
      files_failed: 0,
      total_rows_read: 2500,
      total_rows_inserted: 2400,
      total_rows_updated: 100,
      total_rows_unchanged: 0,
      total_rows_rejected: 0,
      error_summary: null,
      meta: {},
      files: _tables.map((t) => ({
        filename: t + '.csv',
        table_name: t,
        status: 'success',
        rows_read: 800,
        rows_inserted: 800,
        rows_updated: 0,
        rows_unchanged: 0,
        rows_rejected: 0,
      })),
      created_at_utc: new Date().toISOString(),
    } as ImportRun,
  } as TriggerImportResult
}

export async function fetchLatestImportRun() {
  return {
    run_id: 'run_20240510',
    trigger_type: 'scheduled',
    source_type: 'sftp',
    status: 'success',
    started_at_utc: '2024-05-14T02:00:00Z',
    finished_at_utc: '2024-05-14T02:15:00Z',
    files_total: 3,
    files_succeeded: 3,
    files_failed: 0,
    total_rows_read: 3000,
    total_rows_inserted: 2950,
    total_rows_updated: 50,
    total_rows_unchanged: 0,
    total_rows_rejected: 0,
    error_summary: null,
    meta: {},
    files: [],
    created_at_utc: '2024-05-14T02:00:00Z',
  } as ImportRun
}

// Import schedule
export interface ImportScheduleOut {
  is_enabled: boolean
  source_type?: string
  timezone?: string
  hour?: number
  minute?: number
  schedule?: string
  last_run_at?: string
  next_run_at?: string
  next_run_time_utc?: string | null
  local_time?: string
  last_run_status?: string
  last_run_finished_at_utc?: string
  last_error_summary?: string | null
  tables?: string[]
}

export async function fetchImportSchedule() {
  return {
    is_enabled: true,
    source_type: 'sftp',
    timezone: 'America/Chicago',
    hour: 2,
    minute: 0,
    schedule: 'FREQ=DAILY;BYHOUR=2;BYMINUTE=0',
    last_run_at: '2024-05-14T02:00:00Z',
    next_run_at: '2024-05-15T02:00:00Z',
    next_run_time_utc: '2024-05-15T02:00:00Z',
    local_time: '2:00 AM',
    last_run_status: 'success',
    last_run_finished_at_utc: '2024-05-14T02:15:00Z',
    last_error_summary: null,
    tables: ['properties', 'listings', 'transactions'],
  } as ImportScheduleOut
}

export async function updateImportSchedule(_schedule: Partial<ImportScheduleOut>) {
  const scheduleObj: ImportScheduleOut = {
    is_enabled: _schedule.is_enabled ?? true,
    source_type: _schedule.source_type || 'sftp',
    timezone: _schedule.timezone || 'America/Chicago',
    hour: _schedule.hour ?? 2,
    minute: _schedule.minute ?? 0,
    schedule: 'FREQ=DAILY;BYHOUR=' + (_schedule.hour ?? 2) + ';BYMINUTE=' + (_schedule.minute ?? 0),
    next_run_at: '2024-05-15T02:00:00Z',
    last_run_at: '2024-05-14T02:00:00Z',
    next_run_time_utc: '2024-05-15T02:00:00Z',
    local_time: '2:00 AM',
    last_run_status: 'success',
    last_run_finished_at_utc: '2024-05-14T02:15:00Z',
    last_error_summary: null,
    tables: ['properties', 'listings', 'transactions'],
  }
  return {
    schedule: scheduleObj,
    success: true
  }
}

export async function disableImportSchedule() {
  return {
    schedule: {
      is_enabled: false,
      source_type: 'sftp',
      timezone: 'America/Chicago',
      hour: 2,
      minute: 0,
      next_run_time_utc: null,
      local_time: 'Disabled',
      last_run_status: 'success',
      last_run_finished_at_utc: '2024-05-14T02:15:00Z',
      last_error_summary: null,
      tables: [],
    },
    success: true
  }
}

// Configuration
export interface ConfigurationTrackedTable {
  id?: number
  table_name: string
  enabled: boolean
  file_name?: string
  column_count?: number
}

export interface Configuration {
  sftp_host?: string
  sftp_port?: number
  sftp_username?: string
  sftp_remote_path?: string
  has_password: boolean
  tracked_tables?: ConfigurationTrackedTable[]
}

export async function fetchConfiguration() {
  return {
    sftp_host: 'sftp.example.com',
    sftp_port: 22,
    sftp_username: 'data_sync',
    sftp_remote_path: '/data/exports',
    has_password: true,
    tracked_tables: [
      { id: 1, table_name: 'property', enabled: true, file_name: 'property.csv', column_count: 45 },
      { id: 2, table_name: 'job', enabled: true, file_name: 'job.csv', column_count: 12 },
      { id: 3, table_name: 'category', enabled: true, file_name: 'category.csv', column_count: 8 },
      { id: 4, table_name: 'acct', enabled: true, file_name: 'acct.csv', column_count: 20 },
      { id: 5, table_name: 'listprop', enabled: true, file_name: 'listprop.csv', column_count: 35 },
    ],
  } as Configuration
}

export async function updateConfiguration(_config: Partial<Configuration>) {
  return {
    sftp_host: _config.sftp_host || 'sftp.example.com',
    sftp_port: _config.sftp_port || 22,
    sftp_username: _config.sftp_username || 'data_sync',
    sftp_remote_path: _config.sftp_remote_path || '/data/exports',
    has_password: _config.has_password ?? true,
    tracked_tables: _config.tracked_tables || [],
  } as Configuration
}

export async function testSftpConnection(_host: string, _port: number, _username: string, _password: string, _path: string) {
  return { 
    success: true, 
    message: 'Connection successful',
    files_found: ['export_20240514.csv', 'export_20240513.csv'],
  }
}

// Timezones
export async function fetchTimezoneOptions() {
  return {
    options: [
      { value: 'UTC', label: 'UTC' },
      { value: 'America/Chicago', label: 'Central Time' },
      { value: 'America/New_York', label: 'Eastern Time' },
      { value: 'America/Denver', label: 'Mountain Time' },
      { value: 'America/Los_Angeles', label: 'Pacific Time' },
    ],
  }
}

// Logging
export interface SFTPLogEntry {
  id: number
  event_type: string
  timestamp: string
  message?: string
}

export async function fetchSFTPLogs(limit = 50, offset = 0) {
  return {
    total: 15,
    limit,
    offset,
    items: [
      {
        id: 1,
        event_type: 'CONNECTION',
        timestamp: '2024-05-14T02:00:00Z',
        message: 'Connected to sftp.example.com',
      },
      {
        id: 2,
        event_type: 'DISCOVERY',
        timestamp: '2024-05-14T02:01:00Z',
        message: 'Found 3 files',
      },
    ] as SFTPLogEntry[],
  }
}

export async function fetchImportLogs(limit = 50, offset = 0) {
  return {
    total: 8,
    limit,
    offset,
    items: [
      {
        run_id: 'run_20240514',
        status: 'success',
        created_at_utc: '2024-05-14T02:00:00Z',
        files_total: 3,
        files_succeeded: 3,
        total_rows_read: 3000,
      },
      {
        run_id: 'run_20240513',
        status: 'success',
        created_at_utc: '2024-05-13T02:00:00Z',
        files_total: 3,
        files_succeeded: 3,
        total_rows_read: 2800,
      },
    ],
  }
}

export async function fetchAuditLogs(limit = 50, offset = 0) {
  return {
    total: 20,
    limit,
    offset,
    items: [
      {
        id: 1,
        created_at_utc: '2024-05-14T10:30:00Z',
        actor_email: 'admin@example.com',
        action: 'app_created',
        entity_type: 'app',
        entity_name: 'New App',
      },
      {
        id: 2,
        created_at_utc: '2024-05-14T09:15:00Z',
        actor_email: 'admin@example.com',
        action: 'settings_updated',
        entity_type: 'configuration',
      },
    ] as AuditLog[],
  }
}

// User management
export async function listUsers(limit = 50, offset = 0) {
  return {
    total: 3,
    limit,
    offset,
    items: [
      { email: 'admin@example.com', display_name: 'Admin User', is_active: true },
      { email: 'john@example.com', display_name: 'John Doe', is_active: true },
      { email: 'jane@example.com', display_name: 'Jane Smith', is_active: false },
    ] as UserOut[],
  }
}

export async function registerUser(_email: string, _displayName?: string) {
  return {
    email: _email,
    display_name: _displayName,
    temporary_password: 'TempPass123!@#',
  }
}

export async function deactivateUser(_email: string) {
  return { success: true }
}

export async function reactivateUser(_email: string) {
  return { success: true }
}

export async function fetchCurrentUserProfile() {
  return {
    email: 'admin@example.com',
    display_name: 'Admin User',
    is_active: true,
  } as UserOut
}

export async function updateCurrentUserProfile(displayName: string) {
  return {
    email: 'admin@example.com',
    display_name: displayName,
    is_active: true,
  } as UserOut
}

export async function changeUserPassword(_email: string, _newPassword: string) {
  return { success: true }
}

export async function fetchUserLoginHistory(_email: string, limit = 50, offset = 0) {
  const attempts = [
    { timestamp: '2024-05-14T10:00:00Z', ip_address: '192.168.1.1', status: 'LOGIN_SUCCESSFUL' },
    { timestamp: '2024-05-13T15:30:00Z', ip_address: '192.168.1.1', status: 'LOGIN_SUCCESSFUL' },
  ]
  return {
    total: 5,
    limit,
    offset,
    items: attempts,
    login_attempts: attempts,
  }
}

// Missing exports for AppDataAccessManager and other components
export type AppDataAccessBrowseResponse = any
export type AppDataAccessRow = any
export type AppTableAccessOut = any

export async function browseAppDataAccess(_appId: number, _view: string, _limit?: number, _offset?: number) {
  return { rows: [], total: 0 }
}

export async function excludeAppRows(_appId: number, _view: string, _rows: any[]) {
  return { success: true }
}

export async function fetchAppTableAccess(_appId: number, _table: string) {
  return { enabled: true, rows_excluded: 0 }
}

export async function includeAppRows(_appId: number, _view: string, _rows: any[]) {
  return { success: true }
}

export async function includeOnlyWeightedPropertyLists(_appId: number, _weightedLists: any[]) {
  return { success: true }
}

export async function updateAppTableAccess(_appId: number, _table: string, _enabled: boolean) {
  return { success: true }
}

// Logs page exports
export async function fetchImportRuns(limit = 50, offset = 0) {
  return { total: 8, limit, offset, items: [] }
}

export async function fetchImportRunById(_runId: string) {
  return { run_id: _runId, status: 'success', files: [], total_rows_read: 0 }
}

export async function fetchSftpImportRuns(limit = 50, offset = 0) {
  return { total: 5, limit, offset, items: [] }
}

export async function fetchSftpImportRunById(_runId: string) {
  return { run_id: _runId, status: 'success' }
}

export async function exportImportRunLogJson(_runId: string) {
  return new Blob()
}

export async function exportImportLogsBulkZip() {
  return new Blob()
}

export async function exportSftpImportRunLogJson(_runId: string) {
  return new Blob()
}

export async function exportSftpImportLogsBulkZip() {
  return new Blob()
}

export async function fetchAuditLogById(_id: number) {
  return { id: _id, action: 'test', created_at_utc: new Date().toISOString() }
}

export async function exportAuditLogJson(_id: number) {
  return new Blob()
}

export async function exportAuditLogsJson(limit = 50, offset = 0) {
  return new Blob()
}
