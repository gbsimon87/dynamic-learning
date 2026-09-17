import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Dev only. In production the Express server serves the built app and the
    // API from the same origin, so `/api` needs no proxy there. During
    // `npm run dev` Vite serves the app on :5173 and the API lives on :3001, so
    // forward `/api` to it — same-origin from the browser's point of view, which
    // is what keeps the HTTP-only session cookie working without any CORS setup.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
