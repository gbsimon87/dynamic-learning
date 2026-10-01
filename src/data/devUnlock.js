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
 * reload. A production build always disables the bypass, even with the
 * variable set. A URL parameter cannot turn it on.
 *
 * It changes access in the picker and the challenge route. The completion
 * rules and stored data are untouched. Unbuilt challenges stay unavailable — this unlocks
 * what exists, it does not invent pages.
 */

/**
 * `env` is normally `import.meta.env`, passed in rather than read directly so
 * this stays a pure function testable outside Vite.
 */
export function shouldBypassLocks(env) {
  return env?.DEV === true && env?.VITE_UNLOCK_ALL === "true";
}
