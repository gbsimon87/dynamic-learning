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

const here = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(here, "..", "dist");

export function createApp({ serveStatic = process.env.NODE_ENV === "production" } = {}) {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());

  app.get("/api/health", (req, res) => res.json({ ok: true }));
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
    console.error("[api]", err);
    if (res.headersSent) return;
    res.status(500).json({ error: "SERVER_ERROR" });
  });

  return app;
}
