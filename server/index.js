/**
 * Server entry point. On Render this single Web Service serves both the API
 * and the built SPA from one origin, so the session cookie is first-party and
 * there is no CORS surface at all.
 */
import * as db from "./db.js";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT) || 3001;

// Fail fast and loudly. Booting with a default session secret would mean
// anyone could forge a session, so a missing secret is fatal, never defaulted.
const missing = ["MONGODB_URI", "SESSION_SECRET"].filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(
    `FATAL: missing required environment variable(s): ${missing.join(", ")}.\n` +
      "Set them in .env locally, or in the Render dashboard. Refusing to start."
  );
  process.exit(1);
}

try {
  await db.connect(process.env.MONGODB_URI);
  console.log("[api] connected to MongoDB");
} catch (err) {
  console.error("FATAL: could not connect to MongoDB:", err.message);
  process.exit(1);
}

const app = createApp();
const server = app.listen(PORT, () => {
  console.log(`[api] listening on :${PORT} (NODE_ENV=${process.env.NODE_ENV ?? "development"})`);
});

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => {
    server.close(async () => {
      await db.close();
      process.exit(0);
    });
  });
}
