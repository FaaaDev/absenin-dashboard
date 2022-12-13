export const ApiConfig = {
  baseUrl: import.meta.env.VITE_APP_API_URL,
  timeout: 120,
}

export const shouldLogApi = import.meta.env.VITE_APP_ENVIRONTMENT !== 'production'
