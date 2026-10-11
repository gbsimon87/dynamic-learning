/**
 * Review access for the hosted dev site and opt-in local development.
 *
 * The exact hosted dev hostname always opens built challenges and avatar
 * choices, including in a production-mode Vite bundle. Other hosted sites
 * retain normal locks. Local Vite development can opt in with
 * VITE_UNLOCK_ALL=true; that flag alone cannot unlock a production build.
 *
 * Access only: completion rules, earned rewards and stored progress are
 * untouched. Unbuilt challenges stay unavailable.
 */
export const HOSTED_DEV_HOSTNAME = "dynamic-learning-dev-zkww.onrender.com";

/** Explicit inputs keep environment and hostname checks testable outside Vite. */
export function shouldBypassLocks(env, hostname = globalThis.location?.hostname) {
  return hostname === HOSTED_DEV_HOSTNAME ||
    (env?.DEV === true && env?.VITE_UNLOCK_ALL === "true");
}
