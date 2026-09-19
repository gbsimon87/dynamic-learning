import { readFileSync, existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves `dev-seed.json` from the repo root during `npm run dev` only.
 *
 * `npm run seed` writes that file so the DEFAULT localStorage mode can be
 * seeded from the browser console (the browser is the database there, so no
 * Node script can reach it). It deliberately does NOT live in `public/`:
 * everything in `public/` is copied into `dist/`, so a local `npm run build`
 * would package a test account's password hash into the deployable bundle.
 *
 * `apply: 'serve'` means this middleware does not exist in a build at all.
 */
function devSeedPlugin() {
  return {
    name: 'dev-seed',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/dev-seed.json', (req, res, next) => {
        const file = new URL('./dev-seed.json', import.meta.url).pathname
        if (!existsSync(file)) return next()
        res.setHeader('Content-Type', 'application/json')
        res.end(readFileSync(file))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devSeedPlugin()],
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
