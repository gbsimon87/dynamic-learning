/**
 * Email helpers shared by the client and the server, so both agree on what
 * "the same address" means. Plain ESM, no dependencies.
 */

export function normaliseEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

// A shape check only: it catches typos like "maya@gmail" before a round trip.
// Whether the address is real is what the six-digit code proves.
const SHAPE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

export function isEmailShaped(email) {
  const normalised = normaliseEmail(email);
  return normalised.length <= 254 && SHAPE.test(normalised);
}

/** "Maya.Smith@Gmail.com" → "m…@gmail.com" — for screens and server logs. */
export function maskEmail(email) {
  const normalised = normaliseEmail(email);
  const at = normalised.indexOf("@");
  if (at < 1) return normalised;
  return `${normalised[0]}…${normalised.slice(at)}`;
}
