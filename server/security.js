/** Browser and API boundaries. Text is rendered as text, never stripped of punctuation. */
const WRITES = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const LOOPBACK = new Set(["localhost", "127.0.0.1", "[::1]"]);

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "script-src-attr 'none'",
  // React styles, Leaflet positions and animation libraries need inline styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  // Vite inlines the smaller font subsets as data URLs.
  "font-src 'self' data:",
  "connect-src 'self' https://api.restcountries.com",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
].join("; ");

export function securityHeaders({ csp, production }) {
  return (req, res, next) => {
    res.set({
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    });
    if (csp) res.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);
    if (production) res.set("Strict-Transport-Security", "max-age=31536000");
    if (req.path === "/api" || req.path.startsWith("/api/")) res.set("Cache-Control", "no-store");
    next();
  };
}

/** Reject cross-site cookie writes before parsing JSON or touching the database. */
export function protectApiWrites({ production, publicAppUrl }) {
  const configuredOrigin = publicAppUrl ? new URL(publicAppUrl).origin : null;
  return (req, res, next) => {
    if (!WRITES.has(req.method)) return next();
    if (req.get("Sec-Fetch-Site") === "cross-site") {
      return res.status(403).json({ error: "CROSS_SITE_REQUEST" });
    }
    const origin = req.get("Origin");
    if (origin) {
      let url;
      try { url = new URL(origin); } catch { return res.status(403).json({ error: "CROSS_SITE_REQUEST" }); }
      const requestOrigin = `${req.protocol}://${req.get("host")}`;
      const trusted = configuredOrigin ?? requestOrigin;
      const local = !production && LOOPBACK.has(url.hostname) && ["http:", "https:"].includes(url.protocol);
      if (origin !== url.origin || url.origin !== trusted && !local) {
        return res.status(403).json({ error: "CROSS_SITE_REQUEST" });
      }
    }
    const hasBody = Number(req.get("Content-Length")) > 0 || Boolean(req.get("Transfer-Encoding"));
    if (hasBody && !req.is("application/json")) {
      return res.status(415).json({ error: "JSON_REQUIRED" });
    }
    return next();
  };
}

/** Never accept MongoDB operators or prototype keys in client JSON objects. */
export function isSafeRequestObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const pending = [{ value, depth: 0 }];
  let count = 0;
  while (pending.length) {
    const item = pending.pop();
    if (++count > 100_000 || item.depth > 40) return false;
    if (!item.value || typeof item.value !== "object") continue;
    for (const [key, child] of Object.entries(item.value)) {
      if (["__proto__", "prototype", "constructor"].includes(key) || key.startsWith("$") || key.includes(".")) return false;
      pending.push({ value: child, depth: item.depth + 1 });
    }
  }
  return true;
}

export function validateApiBody(req, res, next) {
  if (req.body !== undefined && !isSafeRequestObject(req.body)) {
    return res.status(400).json({ error: "INVALID_REQUEST" });
  }
  return next();
}
