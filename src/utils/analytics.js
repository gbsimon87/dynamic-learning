/**
 * Product analytics — a no-op until PostHog arrives (PROJECT_IDEAS #36).
 * Every event goes through here so the rules are in one place: only events
 * listed below, only the listed props, and never names, emails or birth years.
 * When #36 lands, send `{event, props}` to posthog.capture here.
 */
const EVENTS = {
  signup_step_viewed: ["step"],
  signup_gated: [],
  signup_code_sent: [],
  signup_completed: ["learners", "verification"],
};

export function track(event, props = {}) {
  const allowed = EVENTS[event];
  if (!allowed) return null;
  const safe = Object.fromEntries(allowed.filter((key) => key in props).map((key) => [key, props[key]]));
  return { event, props: safe };
}
