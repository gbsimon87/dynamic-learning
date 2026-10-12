import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";
import { CONTENT_SECURITY_POLICY, isSafeRequestObject, protectApiWrites, securityHeaders } from "./security.js";

test("JSON boundary rejects operators, prototype pollution, deep objects and non-object envelopes", () => {
  for (const raw of [
    '{"email":{"$ne":null}}', '{"data":{"$where":"attack()"}}',
    '{"children":[{"__proto__":{"polluted":true}}]}',
    '{"data":{"constructor":{"prototype":{"polluted":true}}}}',
    '{"data":{"profile.name":"changed"}}', '[]', 'null', '"text"',
  ]) assert.equal(isSafeRequestObject(JSON.parse(raw)), false, raw);
  let nested = {};
  for (let i = 0; i < 45; i++) nested = { nested };
  assert.equal(isSafeRequestObject(nested), false);
  assert.equal({}.polluted, undefined);
  const legacyProgress = { data: { numbers: { topics: { counting: { completedChallenges: [1, "2"], note: "O'Brien <script> is text" } } } } };
  const before = structuredClone(legacyProgress);
  assert.equal(isSafeRequestObject(legacyProgress), true);
  assert.deepEqual(legacyProgress, before, "validation never mutates or strips stored fields");
});

function writeDecision(headers, { production = true, publicAppUrl = "https://learnwithbix.com" } = {}) {
  let status = 200;
  let body;
  let continued = false;
  const request = { method: "POST", protocol: "https", get: key => headers[key.toLowerCase()], is: () => true };
  const response = { status(value) { status = value; return this; }, json(value) { body = value; return this; } };
  protectApiWrites({ production, publicAppUrl })(request, response, () => { continued = true; });
  return { status, body, continued };
}

test("write guard rejects cross-site origins and sibling subdomains, and permits same-origin and local Vite", () => {
  for (const origin of ["https://attacker.example", "https://learnwithbix.com.attacker.example", "https://other.learnwithbix.com", "null", "https://learnwithbix.com/path", "http://localhost:5173"]) {
    assert.equal(writeDecision({ host: "learnwithbix.com", origin }).status, 403, origin);
  }
  assert.equal(writeDecision({ origin: "https://learnwithbix.com", "sec-fetch-site": "cross-site" }).status, 403);
  assert.equal(writeDecision({ origin: "https://learnwithbix.com" }).continued, true);
  assert.equal(writeDecision({ host: "learnwithbix.com" }).continued, true, "non-browser JSON clients work");
  assert.equal(writeDecision({ origin: "http://127.0.0.1:5174" }, { production: false }).continued, true);
});

test("production headers block script execution, embedding, sniffing and API caching", () => {
  const headers = {};
  securityHeaders({ csp: true, production: true })({ path: "/api/auth/me" }, { set: (key, value) => typeof key === "object" ? Object.assign(headers, key) : headers[key] = value }, () => {});
  assert.equal(headers["Content-Security-Policy"], CONTENT_SECURITY_POLICY);
  for (const directive of ["script-src 'self'", "script-src-attr 'none'", "object-src 'none'", "base-uri 'none'", "frame-ancestors 'none'"]) assert.ok(CONTENT_SECURITY_POLICY.includes(directive));
  assert.equal(headers["Cache-Control"], "no-store");
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["Referrer-Policy"], "no-referrer");
  assert.equal(headers["Strict-Transport-Security"], "max-age=31536000");
});

test("API security boundaries return safe errors before handlers, without a database or email", async t => {
  const mailer = { verification: "off" };
  const server = createApp({ serveStatic: true, signup: { mailer }, recovery: { mailer } }).listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => { server.once("listening", resolve); server.once("error", reject); });
  t.after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = (body, headers = {}) => fetch(`${base}/api/auth/login`, {
    method: "POST", headers: { "Content-Type": "application/json", ...headers }, body,
  });
  for (const body of ['{"email":{"$ne":null}}', '{"password":{"$gt":""}}', '{"data":{"__proto__":{"polluted":true}}}', '[]']) {
    const response = await request(body);
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "INVALID_REQUEST" });
  }
  const malformed = await request('{"email":');
  assert.equal(malformed.status, 400);
  assert.deepEqual(await malformed.json(), { error: "INVALID_JSON" });
  const large = await request(JSON.stringify({ password: "x".repeat(1024 * 1024) }));
  assert.equal(large.status, 413);
  assert.deepEqual(await large.json(), { error: "REQUEST_TOO_LARGE" });
  const form = await request('email=a&password=b', { "Content-Type": "application/x-www-form-urlencoded" });
  assert.equal(form.status, 415);
  const crossSite = await request('{}', { Origin: "https://attacker.example", "Sec-Fetch-Site": "cross-site" });
  assert.equal(crossSite.status, 403);
  const junkEmail = await request(JSON.stringify({ email: ["valid@example.com"], password: "anything" }));
  assert.equal(junkEmail.status, 401, "array email is rejected without a database lookup");
  const health = await fetch(`${base}/api/health`);
  assert.equal(health.status, 200);
  assert.equal(health.headers.get("x-powered-by"), null);
  assert.equal(health.headers.get("content-security-policy"), CONTENT_SECURITY_POLICY);
  assert.equal(health.headers.get("cache-control"), "no-store");
  const logout = await fetch(`${base}/api/auth/logout`, { method: "POST", headers: { Origin: base } });
  assert.equal(logout.status, 204, "same-origin empty-body logout still works");
});
