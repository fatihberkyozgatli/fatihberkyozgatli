import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Check } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && username.trim() && password.trim() && !isLoading) {
      handleLogin(e as any)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate brief loading
    setTimeout(() => {
      navigate('/dashboard')
    }, 500)
  }

  const inputCls =
    'w-full px-3 py-2.5 rounded-md bg-input text-foreground border border-transparent focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm transition-colors'

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-border shadow-sm p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-foreground">Login</h1>

        <p className="text-sm text-muted-foreground">
          UI-only mode: Use any credentials to proceed
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Email (any value)"
              className={inputCls}
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Password (any value)"
            className={inputCls}
            autoComplete="current-password"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !username.trim() || !password.trim()}
            className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
