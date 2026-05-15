// UI-ONLY MODE: Mock API client with no actual backend calls

export const API_BASE_URL = 'http://localhost:8000'

export const getJwtToken = (): string | null => {
  // Mock token - always return a valid token for UI flow
  return 'mock_ui_token'
}


// Mock storage
export const setJwtToken = (token: string) => {
  // No-op for UI mode
}

export const clearJwtToken = () => {
  // No-op for UI mode
}

// Mock API client - all calls are no-ops
export const apiClient = {
  async get<T>(_endpoint: string, _headers?: Record<string, string>): Promise<T> {
    return {} as T
  },

  async post<T>(_endpoint: string, _body?: unknown, _headers?: Record<string, string>): Promise<T> {
    return {} as T
  },

  async put<T>(_endpoint: string, _body?: unknown, _headers?: Record<string, string>): Promise<T> {
    return {} as T
  },

  async delete<T>(_endpoint: string, _body?: unknown, _headers?: Record<string, string>): Promise<T> {
    return {} as T
  },

  async getBlob(_endpoint: string): Promise<Blob> {
    return new Blob()
  },

  async postBlob(_endpoint: string, _body?: unknown): Promise<Blob> {
    return new Blob()
  },
}
