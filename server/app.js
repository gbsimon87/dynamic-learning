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
import { protectApiWrites, securityHeaders, validateApiBody } from "./security.js";
import { createSeoMiddleware, createNotFoundMiddleware } from "./seo.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(here, "..", "dist");

export function createApp({ serveStatic = process.env.NODE_ENV === "production", signup = {}, recovery = {}, trustProxy = process.env.RENDER === "true" ? 1 : false, seo = {}, dist = DIST } = {}) {
  const app = express();
  app.disable("x-powered-by");
  // Render is the single ingress proxy. Direct/local servers trust no headers.
  // Never use `true`: a client-supplied leftmost X-Forwarded-For is untrusted.
  app.set("trust proxy", trustProxy);
  const production = process.env.NODE_ENV === "production";
  app.use(securityHeaders({ csp: serveStatic, production }));
  app.use("/api", (req, res, next) => { res.set("X-Robots-Tag", "noindex, nofollow"); next(); });
  app.use("/api", protectApiWrites({ production, publicAppUrl: process.env.PUBLIC_APP_URL }));
  app.use(express.json({ limit: "1mb" }));
  app.use("/api", validateApiBody);
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
    app.use(createSeoMiddleware({ dist, ...seo }));
    app.use(express.static(dist, { index: false, redirect: false, setHeaders(res, filePath) {
      // Only Vite's content-hashed assets get long-lived immutable caching.
      if (/[/\\]assets[/\\].+-[\w-]{8,}\.[\w.]+$/.test(filePath)) res.set("Cache-Control", "public, max-age=31536000, immutable");
      else res.set("Cache-Control", "public, max-age=3600");
      if (seo.indexable === false || seo.indexable === undefined && process.env.SEO_INDEXABLE !== "true") res.set("X-Robots-Tag", "noindex, nofollow");
    } }));
    app.use(createNotFoundMiddleware({ dist, ...seo }));
  }

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (res.headersSent) return;
    if (err.type === "entity.parse.failed") return res.status(400).json({ error: "INVALID_JSON" });
    if (err.type === "entity.too.large") return res.status(413).json({ error: "REQUEST_TOO_LARGE" });
    if (["charset.unsupported", "encoding.unsupported"].includes(err.type)) return res.status(415).json({ error: "UNSUPPORTED_ENCODING" });
    console.error("[api]", errorSummary(err));
    res.status(500).json({ error: "SERVER_ERROR" });
  });

  return app;
}
