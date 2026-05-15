import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  Ban,
  Check,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Loader,
  RotateCcw,
  X,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import {
  fetchCurrentUserProfile,
  fetchUserLoginHistory,
  listUsers,
  reactivateUser,
  registerUser,
  deactivateUser,
  UserOut,
} from '../api/api'

type ManagedUser = UserOut

type LoginAttempt = {
  timestamp: string
  ip_address: string | null
  status: string
  failure_reason?: string | null
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email)

const inputCls =
  'w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors'

function formatFailureReason(reason?: string | null): string {
  if (!reason) return 'Unknown reason'

  const reasonMap: Record<string, string> = {
    wrong_password: 'Incorrect password',
    user_not_found_or_inactive: 'User not found or inactive',
    missing_email: 'Email is missing',
    invalid_email_format: 'Invalid email format',
    missing_password: 'Password is missing',
    password_too_short: 'Password is too short',
    password_too_long: 'Password is too long',
    ip_blocked: 'Too many attempts from this IP address',
    email_blocked: 'Too many attempts for this email',
  }

  if (reasonMap[reason]) return reasonMap[reason]

  return reason
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getLoginAttemptLabel(status: string): string {
  if (status === 'LOGIN_SUCCESSFUL') return 'Successful Login'
  return 'Failed Login'
}

function getLoginAttemptStyles(status: string): string {
  if (status === 'LOGIN_SUCCESSFUL') {
    return 'bg-green-50 border-green-200'
  }

  return 'bg-red-50 border-red-200'
}

export default function UsersManagementPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordCopied, setPasswordCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [showInactiveUsers, setShowInactiveUsers] = useState(false)
  const [lastActionType, setLastActionType] = useState<'deactivate' | 'reactivate' | 'create' | null>(null)

  const [currentUserEmail, setCurrentUserEmail] = useState<string>('')

  const [showLoginHistoryModal, setShowLoginHistoryModal] = useState(false)
  const [loginHistoryUser, setLoginHistoryUser] = useState<string | null>(null)
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([])
  const [loginHistoryLoading, setLoginHistoryLoading] = useState(false)

  const isEmailValid = !email || isValidEmail(email)
  const isFormValid = email && isEmailValid

  const filteredUsers = showInactiveUsers ? users : users.filter((u) => u.is_active)

  const loadUsers = async () => {
    try {
      setLoadingUsers(true)
      const response = await listUsers(200, 0)
      setUsers(response.items)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users')
      setUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }

  const loadCurrentUser = async () => {
    try {
      const profile = await fetchCurrentUserProfile()
      setCurrentUserEmail(profile.email)
    } catch (err) {
      console.error('Failed to load current user profile:', err)
    }
  }

  useEffect(() => {
    loadUsers()
    loadCurrentUser()
  }, [])

  useEffect(() => {
    if (!success) return

    const timer = window.setTimeout(() => {
      setSuccess(null)
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [success])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setTemporaryPassword(null)
    setIsLoading(true)

    try {
      const response = await registerUser(email)
      setLastActionType('create')
      setSuccess(`User created successfully: ${response.email}`)
      setTemporaryPassword(response.temporary_password)
      setShowPasswordModal(true)
      setPasswordCopied(false)
      setEmail('')
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeactivateUser = async (userEmail: string) => {
    if (userEmail.trim().toLowerCase() === currentUserEmail.trim().toLowerCase()) {
      setError('You cannot deactivate your own account.')
      return
    }

    setActionLoading(userEmail)
    setError(null)
    setSuccess(null)

    try {
      await deactivateUser(userEmail)
      setLastActionType('deactivate')
      setSuccess(`User ${userEmail} deactivated`)
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deactivate user')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReactivateUser = async (userEmail: string) => {
    setActionLoading(userEmail)
    setError(null)
    setSuccess(null)

    try {
      await reactivateUser(userEmail)
      setLastActionType('reactivate')
      setSuccess(`User ${userEmail} reactivated`)
      await loadUsers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reactivate user')
    } finally {
      setActionLoading(null)
    }
  }

  const handleViewLoginHistory = async (userEmail: string) => {
    setLoginHistoryUser(userEmail)
    setShowLoginHistoryModal(true)
    setLoginHistoryLoading(true)
    try {
      const response = await fetchUserLoginHistory(userEmail)
      setLoginAttempts(response.login_attempts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch login history')
      setLoginAttempts([])
    } finally {
      setLoginHistoryLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-8 pt-8">
        <PageHeader title="Manage Users" showBack onBack={() => navigate('/dashboard')} />

        <div className="mb-8 pb-8 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6">Create New User</h2>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 text-destructive rounded-md mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {success && (
            <div
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-md mb-4 ${lastActionType === 'deactivate'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-green-50 text-green-700'
                }`}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{success}</span>
              </div>
              <button
                type="button"
                onClick={() => setSuccess(null)}
                className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <form onSubmit={handleRegister} className="max-w-lg flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className={`${inputCls} ${!isEmailValid ? 'border-destructive/50 focus:border-destructive' : ''
                  }`}
                disabled={isLoading}
              />
              {email && !isEmailValid && (
                <p className="text-xs text-destructive">Please enter a valid email address</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="px-4 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Users</h2>
            <button
              onClick={() => setShowInactiveUsers(!showInactiveUsers)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors"
            >
              {showInactiveUsers ? (
                <>
                  <Eye className="w-4 h-4" />
                  Show Active Only
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4" />
                  Show Inactive Users
                </>
              )}
            </button>
          </div>

          {loadingUsers ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8">
              {showInactiveUsers ? 'No inactive users found' : 'No active users found'}
            </p>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Display Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const isSelf =
                      user.email.trim().toLowerCase() === currentUserEmail.trim().toLowerCase()
                    const disableDeactivate = user.is_active && isSelf

                    return (
                      <tr
                        key={user.email}
                        className="border-t border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-foreground">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {user.display_name || '-'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${user.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
                              }`}
                          >
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() =>
                                user.is_active
                                  ? handleDeactivateUser(user.email)
                                  : handleReactivateUser(user.email)
                              }
                              disabled={actionLoading === user.email || disableDeactivate}
                              title={
                                disableDeactivate
                                  ? 'You cannot deactivate your own account'
                                  : undefined
                              }
                              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${user.is_active
                                  ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                                  : 'text-green-700 bg-green-50 hover:bg-green-100'
                                }`}
                            >
                              {actionLoading === user.email ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : user.is_active ? (
                                <Ban className="w-4 h-4" />
                              ) : (
                                <RotateCcw className="w-4 h-4" />
                              )}
                              {user.is_active ? 'Deactivate' : 'Reactivate'}
                            </button>

                            <button
                              onClick={() => handleViewLoginHistory(user.email)}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md text-primary bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              Login History
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Modal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          title="Temporary Password"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            For security reasons, share this temporary password with the user. They must change it upon their first login.
          </p>

          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 bg-muted/50">
            <span className="flex-1 text-xs font-mono text-foreground break-all">
              {temporaryPassword}
            </span>
            <button
              onClick={() => {
                if (temporaryPassword) {
                  navigator.clipboard.writeText(temporaryPassword)
                  setPasswordCopied(true)
                  setTimeout(() => setPasswordCopied(false), 2000)
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white text-xs font-semibold text-foreground hover:bg-muted transition-colors shrink-0"
            >
              {passwordCopied ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {passwordCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <button
            onClick={() => setShowPasswordModal(false)}
            className="w-full py-2.5 rounded-md bg-foreground text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </Modal>

        <Modal
          isOpen={showLoginHistoryModal}
          onClose={() => setShowLoginHistoryModal(false)}
          title={`Login History for ${loginHistoryUser}`}
        >
          {loginHistoryLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : loginAttempts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              No login attempts found for this user.
            </p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {loginAttempts.map((attempt, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 ${getLoginAttemptStyles(attempt.status)}`}
                  >
                    <div className="flex items-start justify-between mb-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {getLoginAttemptLabel(attempt.status)}
                        </p>

                        {attempt.failure_reason && attempt.status !== 'LOGIN_SUCCESSFUL' && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Reason: {formatFailureReason(attempt.failure_reason)}
                          </p>
                        )}

                        {attempt.ip_address && (
                          <p className="text-xs text-muted-foreground mt-1">
                            IP: {attempt.ip_address}
                          </p>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(attempt.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowLoginHistoryModal(false)}
            className="w-full mt-4 py-2.5 rounded-md bg-foreground text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  )
}
