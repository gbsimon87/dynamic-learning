/**
 * Express app construction, kept separate from `index.js` so tests can build
 * an app without binding a port.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import childrenRoutes from "./routes/children.js";
import progressRoutes from "./routes/progress.js";
import rewardsRoutes from "./routes/rewards.js";
import { createSignupRouter } from "./routes/signup.js";
import { createRecoveryRouter } from "./routes/recovery.js";
import { createMailerFromEnv } from "./email.js";
import { errorSummary } from "./logError.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(here, "..", "dist");

export function createApp({ serveStatic = process.env.NODE_ENV === "production", signup = {}, recovery = {}, trustProxy = process.env.RENDER === "true" ? 1 : false } = {}) {
  const app = express();
  // Render is the single ingress proxy. Direct/local servers trust no headers.
  // Never use `true`: a client-supplied leftmost X-Forwarded-For is untrusted.
  app.set("trust proxy", trustProxy);
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/api/health", (req, res) => res.json({ ok: true }));
  // Before /api/auth: this router owns /api/auth/signup/*. The old single-call
  // POST /api/auth/signup is gone and answers 404 NOT_FOUND like any unknown route.
  app.use(
    "/api/auth/signup",
    createSignupRouter({ ...signup, mailer: signup.mailer ?? createMailerFromEnv() })
  );
  app.use("/api/auth/recovery", createRecoveryRouter({ ...recovery, mailer: recovery.mailer ?? signup.mailer ?? createMailerFromEnv() }));
  app.use("/api/auth", authRoutes);
  app.use("/api/children", childrenRoutes);
  app.use("/api/progress", progressRoutes);
  app.use("/api/rewards", rewardsRoutes);

  // Unknown API routes answer as JSON 404s. This sits BEFORE the SPA
  // catch-all so that a typo'd endpoint never silently returns index.html.
  app.use("/api", (req, res) => res.status(404).json({ error: "NOT_FOUND" }));

  if (serveStatic) {
    app.use(express.static(DIST));
    // Client-side routing: anything that is not /api/* gets the SPA shell.
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      return res.sendFile(path.join(DIST, "index.html"));
    });
  }

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error("[api]", errorSummary(err));
    if (res.headersSent) return;
    res.status(500).json({ error: "SERVER_ERROR" });
  });

  return app;
}
