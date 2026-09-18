/**
 * Development-only bypass of the curriculum unlock rules.
 *
 * Set `VITE_UNLOCK_ALL=true` in `.env` and restart the dev server to make every
 * BUILT challenge playable from the picker, regardless of what has been
 * completed. It exists so the whole curriculum can be reached for review
 * without grinding through it in order.
 *
 * This is a BUILD-time switch, exactly like `VITE_USE_API` — Vite inlines
 * `import.meta.env` at build time, so flipping it needs a restart, not a
 * reload. A production build made without the variable contains no bypass at
 * all, which is why this is an env var rather than a URL parameter a curious
 * child could discover.
 *
 * It changes ONLY what the picker offers. Progress, the completion rules and
 * the stored data are untouched, so nothing a learner has done can be lost or
 * faked by turning it on. Unbuilt challenges stay unavailable — this unlocks
 * what exists, it does not invent pages.
 */

/**
 * `env` is normally `import.meta.env`, passed in rather than read directly so
 * this stays a pure function testable outside Vite.
 */
export function shouldBypassLocks(env) {
  return env?.VITE_UNLOCK_ALL === "true";
}
