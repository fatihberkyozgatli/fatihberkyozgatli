import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AppSetupPage from './pages/AppSetupPage'
import AppManagementPage from './pages/AppManagementPage'
import LogsPage from './pages/LogsPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import UsersManagementPage from './pages/UsersManagementPage'
import ProtectedRoute from './components/ProtectedRoute'
import DataIngestionPage from './pages/DataIngestionPage'
import { AppProvider } from './context/AppContext'
import { TrackedTableProvider } from './context/TrackedTableContext'
import SessionMonitor from './components/SessionMonitor'


function ProtectedAppLayout() {
  return (
    <ProtectedRoute
      element={
        <AppProvider>
          <TrackedTableProvider>
            <SessionMonitor />
            <Outlet />
          </TrackedTableProvider>
        </AppProvider>
      }
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Navigate to="/users" replace />} />

        <Route element={<ProtectedAppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/app-setup" element={<AppSetupPage />} />
          <Route path="/app-management/:id" element={<AppManagementPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersManagementPage />} />
          <Route path="/data-ingestion" element={<DataIngestionPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
