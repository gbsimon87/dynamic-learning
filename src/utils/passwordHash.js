/**
 * Password hashing built on the Web Crypto API only — no dependencies.
 *
 * PBKDF2-SHA-256, 150,000 iterations, random 16-byte salt. `globalThis.crypto.subtle`
 * exists in both the browser and Node 20+, so this module is unit-testable with
 * `node --test` and stays React-free (PROJECT_KNOWLEDGE §7).
 *
 * Nothing here is a substitute for server-side auth. Parent accounts currently
 * live in localStorage, so this only stops a stored password being readable in
 * plain text; when the Mongo-backed API lands, hashing should move server-side
 * and this module becomes the client-side fallback only.
 */

const ITERATIONS = 150000;
const SALT_BYTES = 16;
const KEY_BITS = 256;
const HASH = "SHA-256";

function subtle() {
  const webCrypto = globalThis.crypto;
  if (!webCrypto?.subtle) {
    throw new Error("WEB_CRYPTO_UNAVAILABLE");
  }
  return webCrypto.subtle;
}

/** Uint8Array → base64, without pulling in Buffer (which the browser lacks). */
function bytesToBase64(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** base64 → Uint8Array. */
function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveBits(password, saltBytes, iterations) {
  const keyMaterial = await subtle().importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await subtle().deriveBits(
    { name: "PBKDF2", salt: saltBytes, iterations, hash: HASH },
    keyMaterial,
    KEY_BITS
  );

  return new Uint8Array(bits);
}

/**
 * Hashes `password`. Generates a fresh random salt unless `saltB64` is supplied
 * (supplying one is how verification re-derives the same hash).
 *
 * @returns {Promise<{ hash: string, salt: string, iterations: number }>}
 *          `hash` and `salt` are base64.
 */
export async function hashPassword(password, saltB64) {
  if (typeof password !== "string" || password.length === 0) {
    throw new Error("PASSWORD_REQUIRED");
  }

  const saltBytes = saltB64
    ? base64ToBytes(saltB64)
    : globalThis.crypto.getRandomValues(new Uint8Array(SALT_BYTES));

  const derived = await deriveBits(password, saltBytes, ITERATIONS);

  return {
    hash: bytesToBase64(derived),
    salt: bytesToBase64(saltBytes),
    iterations: ITERATIONS,
  };
}

/**
 * Verifies `password` against a stored `{ hash, salt, iterations }` record.
 * Compares every byte rather than short-circuiting on the first mismatch, and
 * rejects a length mismatch up front so the comparison loop is always bounded.
 *
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, record) {
  if (typeof password !== "string" || !record) return false;
  const { hash, salt, iterations } = record;
  if (typeof hash !== "string" || typeof salt !== "string") return false;

  let expected;
  let actual;
  try {
    expected = base64ToBytes(hash);
    actual = await deriveBits(
      password,
      base64ToBytes(salt),
      Number(iterations) || ITERATIONS
    );
  } catch {
    // Malformed base64 or unavailable crypto — never throw at a login callsite.
    return false;
  }

  if (expected.length !== actual.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected[i] ^ actual[i];
  }
  return mismatch === 0;
}
