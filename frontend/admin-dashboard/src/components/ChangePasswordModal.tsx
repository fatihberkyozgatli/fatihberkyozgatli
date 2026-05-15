import { useState } from 'react'
import { AlertCircle, Eye, EyeOff, Loader } from 'lucide-react'
import Modal from './Modal'

interface ChangePasswordModalProps {
  isOpen: boolean
  isLoading: boolean
  onSubmit: (currentPassword: string, newPassword: string) => Promise<void>
  error?: string | null
}

export default function ChangePasswordModal({
  isOpen,
  isLoading,
  onSubmit,
  error,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const passwordsMatch = newPassword === confirmPassword
  const isFormValid = currentPassword && newPassword && passwordsMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!passwordsMatch) {
      setLocalError('Passwords do not match')
      return
    }

    try {
      await onSubmit(currentPassword, newPassword)
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to change password')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="Set Your Password"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          UI-only mode: Enter any password to proceed
        </p>

        {(error || localError) && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-destructive/10 text-destructive rounded-md">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium">{error || localError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                disabled={isLoading}
                className="w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={isLoading}
                className="w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={isLoading}
                className="w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {newPassword && confirmPassword && !passwordsMatch && (
              <p className="text-xs text-destructive">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Setting Password...' : 'Set Password'}
          </button>
        </form>
      </div>
    </Modal>
  )
}
