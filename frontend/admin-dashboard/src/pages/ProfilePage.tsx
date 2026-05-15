import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Check } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import {
  changeUserPassword,
  clearJwtToken,
  fetchCurrentUserProfile,
  updateCurrentUserProfile,
} from '@/api/api'

const inputCls =
  'w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors'

const readOnlyInputCls =
  'w-full px-3 py-2.5 rounded-md bg-muted text-muted-foreground border border-border text-sm cursor-not-allowed'

const PASSWORD_RULES = {
  minLength: { regex: /.{8,}/, label: 'At least 8 characters' },
  uppercase: { regex: /[A-Z]/, label: '1 uppercase letter (A-Z)' },
  lowercase: { regex: /[a-z]/, label: '1 lowercase letter (a-z)' },
  number: { regex: /\d/, label: '1 number (0-9)' },
  special: { regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, label: '1 special character' },
}

function validatePassword(password: string): string[] {
  const errors = []
  if (!PASSWORD_RULES.minLength.regex.test(password)) errors.push(PASSWORD_RULES.minLength.label)
  if (!PASSWORD_RULES.uppercase.regex.test(password)) errors.push(PASSWORD_RULES.uppercase.label)
  if (!PASSWORD_RULES.lowercase.regex.test(password)) errors.push(PASSWORD_RULES.lowercase.label)
  if (!PASSWORD_RULES.number.regex.test(password)) errors.push(PASSWORD_RULES.number.label)
  if (!PASSWORD_RULES.special.regex.test(password)) errors.push(PASSWORD_RULES.special.label)
  return errors
}

export default function ProfilePage() {
  const navigate = useNavigate()

  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [isSavingName, setIsSavingName] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const [nameError, setNameError] = useState<string | null>(null)
  const [nameSuccess, setNameSuccess] = useState<string | null>(null)

  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoadingProfile(true)
      try {
        const profile = await fetchCurrentUserProfile()
        setName(profile.display_name || '')
        setEmail(profile.email || '')
      } catch (err) {
        console.error('Failed to load profile:', err)
        setNameError('Failed to load profile.')
      } finally {
        setIsLoadingProfile(false)
      }
    }

    loadProfile()
  }, [])

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault()

    setNameError(null)
    setNameSuccess(null)

    if (!name.trim()) {
      setNameError('Name is required.')
      return
    }

    setIsSavingName(true)

    try {
      const updated = await updateCurrentUserProfile(name.trim())
      setName(updated.display_name ?? name)
      setEmail(updated.email ?? '')
      setNameSuccess('Name saved successfully.')

      window.dispatchEvent(
        new CustomEvent('current-user-profile-updated', {
          detail: {
            display_name: updated.display_name,
            email: updated.email,
          },
        })
      )
    } catch (err) {
      setNameError(err instanceof Error ? err.message : 'Failed to save name.')
    } finally {
      setIsSavingName(false)
    }
  }

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    setPasswordError(null)
    setPasswordSuccess(null)

    if (!currentPassword.trim()) {
      setPasswordError('Current password is required.')
      return
    }

    if (!newPassword.trim()) {
      setPasswordError('New password is required.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.')
      return
    }

    const passwordErrors = validatePassword(newPassword)
    if (passwordErrors.length > 0) {
      setPasswordError('Please satisfy all password requirements before saving.')
      return
    }

    setIsSavingPassword(true)

    try {
      await changeUserPassword(currentPassword, newPassword)

      setPasswordSuccess('Password updated successfully. Please log in again.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      clearJwtToken()

      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1200)
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to update password.')
    } finally {
      setIsSavingPassword(false)
    }
  }

  const passwordMismatch = newPassword && confirmPassword && newPassword !== confirmPassword
  const passwordErrors = newPassword ? validatePassword(newPassword) : []
  const passwordValid = newPassword && passwordErrors.length === 0
  const confirmPasswordFilled = confirmPassword.length > 0

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-8 pt-8">
        <PageHeader title="Profile" showBack onBack={() => navigate('/dashboard')} />

        <div className="max-w-lg flex flex-col gap-8">
          <form onSubmit={handleSaveName} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={inputCls}
                disabled={isLoadingProfile || isSavingName}
              />
            </div>

            {nameError && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 text-destructive rounded-md">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{nameError}</span>
              </div>
            )}

            {nameSuccess && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-green-100 text-green-800 rounded-md">
                <Check className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{nameSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoadingProfile || isSavingName}
              className="w-fit px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSavingName ? 'Saving Name...' : 'Save Name'}
            </button>
          </form>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className={readOnlyInputCls}
            />
          </div>

          <form onSubmit={handleSavePassword} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground">Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter Current Password"
                className={inputCls}
                autoComplete="current-password"
                disabled={isSavingPassword}
              />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                className={`${inputCls} ${newPassword && !passwordValid ? 'ring-1 ring-orange-300 border-orange-300' : ''
                  }`}
                autoComplete="new-password"
                disabled={isSavingPassword}
              />

              {newPassword && (
                <div className="mt-1 p-3 bg-orange-50 border border-orange-200 rounded-md">
                  <p className="text-xs font-semibold text-orange-900 mb-2">Password Requirements:</p>
                  <div className="space-y-1">
                    {Object.entries(PASSWORD_RULES).map(([key, rule]) => {
                      const met = rule.regex.test(newPassword)
                      return (
                        <div key={key} className="flex items-center gap-2 text-xs">
                          {met ? (
                            <Check className="w-3.5 h-3.5 text-success shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          )}
                          <span className={met ? 'text-success' : 'text-orange-700'}>
                            {rule.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className={`${inputCls} ${confirmPasswordFilled && passwordMismatch
                    ? 'ring-1 ring-destructive/40 border-destructive/40'
                    : confirmPasswordFilled && !passwordMismatch && passwordValid
                      ? 'ring-1 ring-success/40 border-success/40'
                      : ''
                  }`}
                autoComplete="new-password"
                disabled={isSavingPassword}
              />

              {confirmPasswordFilled && passwordMismatch && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                  <p className="text-xs text-destructive">Passwords do not match.</p>
                </div>
              )}

              {confirmPasswordFilled && !passwordMismatch && passwordValid && (
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success shrink-0" />
                  <p className="text-xs text-success">Passwords match and are valid.</p>
                </div>
              )}
            </div>

            {passwordError && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 text-destructive rounded-md">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-green-100 text-green-800 rounded-md">
                <Check className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{passwordSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSavingPassword}
              className="w-fit px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSavingPassword ? 'Saving Password...' : 'Save Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
