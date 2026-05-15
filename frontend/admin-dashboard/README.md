# Billingsley Data Integration Frontend

## Overview

This frontend is the internal admin dashboard for the Billingsley Data Integration project.

It is built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

The frontend is responsible for:

- admin login and session handling
- dashboard navigation
- app setup and app management
- API key management
- table-level access controls
- row-level data access management
- nested property-list browsing and exclusion validation UX
- manual local import actions
- manual SFTP import actions
- import schedule configuration
- import log viewing and downloads
- SFTP log viewing and downloads
- user activity log viewing and downloads
- user management
- profile management
- SFTP and configuration settings

## Requirements

- Node.js 18+
- npm
- backend running locally at `http://localhost:8000`

## Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Development server

```bash
npm run dev
```

Frontend development URL:

```text
http://localhost:5173
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Environment

Create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8000
```

If `VITE_API_URL` is not set, the frontend API client falls back to:

```text
http://localhost:8000
```

## Current Frontend Structure

```text
frontend/
  src/
    api/
      api.ts              API function and response type definitions
      client.ts           shared API client, refresh handling, base URL
    components/           reusable UI components
    context/              React context providers
    pages/                full page implementations
    App.tsx               route setup
  index.html
  package.json
  vite.config.ts
  README.md
```

## Current Pages

### Login

- Admin email/password login.
- Real-time validation feedback.
- Access-token handling.
- Backend refresh-cookie support.

### Dashboard

- App list.
- Navigation to app setup and app management.
- Navigation to manual import, logs, users, profile, and settings.

### Add a New App

Two-step setup flow:

1. Create app details and generate the first API key.
2. Configure data access using the shared data-access manager.

### Manage App

Main sections:

1. **App Details**
   - app name
   - description
   - API key actions
   - app delete flow

2. **Data Access**
   - shared data-access manager
   - table-level enable/disable
   - row-level include/exclude
   - search, filters, pagination
   - nested property-list expansion
   - nested exclusion helper flows

3. **Summary / Review**
   - exclusions by view
   - quick review of excluded rows
   - clear exclusions per view
   - whole-table access summary

### Manual Import

- Lists available local import files from the backend.
- Supports local manual import.
- Supports manual SFTP import.
- Shows immediate import results after a run.
- Shows row counts for read, inserted, updated, rejected, unchanged, and removed from source.
- Shows file-level import results.

### Logs

The Logs page has three tabs.

#### Import Logs

- Shows normal database import history.
- Shows latest import summary.
- Shows file-level counts for selected runs.
- Shows **Removed from Source** counts.
- Supports bulk log zip download.
- Supports individual import run JSON download.

#### SFTP Logs

- Shows SFTP connection, discovery, download, and staging history.
- Shows files found, modified files, downloaded files, failed files, and download attempts.
- Rows can be clicked to view more details.
- Supports bulk SFTP log zip download.
- Supports individual SFTP run JSON download.

#### User Activity Logs

- Shows admin activity history.
- Shows actions such as app changes, API key events, user changes, and access-control updates.
- Rows can be clicked to view more details.
- Supports bulk audit log download.
- Supports individual audit log JSON download.

### Settings / Configuration

- Persistent ingestion configuration.
- SFTP host, port, username, password, and remote path.
- SFTP connection test.
- Tracked tables shown from DB-backed configuration.
- Scheduled import settings.
- Schedule source defaults to SFTP.
- Scheduled SFTP uses modified-time comparison.

### Profile

- Edit display name.
- View email address.
- Change password.

### Manage Users

- Create admin users.
- Deactivate and reactivate users.
- Prevent self-deactivation.
- View login history.

## Shared Data Access Manager

The frontend includes a shared `AppDataAccessManager` component used by both app setup and app management.

It supports user-facing data views:

- Properties
- Property Lists
- Job Codes
- Categories
- GL Codes

Property-list allocation rows are not a top-level exclusion view. They are shown through Property Lists because list allocation rows are implicit members of property lists.

The manager supports:

- table-level access toggles
- search
- status filter
- rows-per-page selector
- multi-select include/exclude actions
- excluded-only review
- recursive property-list expansion
- cycle-safe nested paths
- parent-list review before excluding a child list
- child-blocking details before including a parent list

## Property and Listprop Access Behavior

Property and Listprop are related, but not fully locked together.

Rules shown in the UI and enforced by the backend:

- Property disabled means Listprop is also disabled.
- Listprop cannot be enabled while Property is disabled.
- Property can be enabled while Listprop is disabled.
- When Listprop is disabled, property records and property-list records can still be browsed, but member expansion is unavailable.

## Nested Property-List UX

Property lists can contain both normal properties and other property lists.

The frontend displays nested members with columns such as:

- Member HMY
- Type
- Member Code
- Member Name
- DPercent

When a child property list cannot be excluded because included parent lists still expose it, the UI shows:

- a short red error message
- a helper card with parent lists
- a review action for parent lists
- a confirmation action to exclude the parent lists first

When a parent list cannot be included because it would expose an excluded child, the UI shows:

- a short red error message
- a helper card with the blocking child row and path

## Current Authentication Behavior

The frontend uses:

- access token storage for authenticated admin requests
- backend-owned refresh cookie for session refresh
- protected routes for admin pages
- automatic refresh attempt on unauthorized API calls
- session countdown warning
- keepalive behavior so active use can extend the session

## API Client Notes

Most backend communication lives in:

```text
src/api/api.ts
src/api/client.ts
```

The frontend sends admin requests with credentials enabled so the refresh cookie can be used by the backend.

Consumer applications do not use this frontend. App API keys are generated in the admin UI and then used by external/internal consumer apps against backend consumer endpoints.

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

## Common Development Checks

After frontend changes, run:

```powershell
npm run build
```

For local development:

```powershell
npm run dev
```

## Development Tips

- Keep the backend running at `http://localhost:8000` during frontend development.
- Keep `frontend/.env.local` aligned with the backend URL.
- Run `npm run build` after major frontend changes to catch TypeScript issues.
- Most backend communication lives in `src/api/api.ts`.
- The shared fetch and refresh behavior lives in `src/api/client.ts`.
- Shared app state for app records lives in `src/context/AppContext.tsx`.
- The data-access manager is the key shared component for app setup and app management.
- Logs page changes usually require matching API types in `src/api/api.ts`.

## Handoff Notes

- Do not commit `node_modules`.
- Do not commit `.env.local` if it contains environment-specific values.
- The frontend is internal/admin-only.
- Consumer apps authenticate directly against the backend with API keys.
- SFTP credentials are entered through the Settings page and stored by the backend, not in the frontend.
