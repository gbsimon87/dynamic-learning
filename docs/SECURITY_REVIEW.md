# Security hardening — 2026-10-12

This review covers application input handling, browser execution, API request
boundaries and account authentication. It is a source review with regression
tests and local browser verification, not a claim that every possible attack
has been ruled out. Changes have not been deployed.

## Text inputs and rendering

User text remains text. React escapes nicknames, email display hints, game
answers and Speed Reader story chunks. No application use of raw HTML sinks,
`eval`, dynamic functions, `srcDoc` or HTML parsing was found. Names such as
`O'Brien`, Unicode names and ordinary punctuation remain supported; markup in
a nickname or story is displayed literally. This follows [OWASP's guidance on
context-appropriate output encoding](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).

| Input | Boundary and coverage |
| --- | --- |
| Signup/profile/parent-area nicknames | Shared validation for signup, API creation/update and browser storage: strings only, 20 Unicode code points, no control characters. Absent fields in patches remain untouched. Preview and persisted profile rendering are tested with markup payloads. |
| Signup/login/recovery email | String-only normalization, 254-character cap, shape check, no markup/control characters. Object and array coercion is rejected. Database queries use a scalar email value. |
| Signup/login/reset/delete-confirmation passwords, including reveal-as-text | UI caps and both hash implementations bound passwords to 1,024 characters. New API signups require 8–1,024 characters. Passwords are neither trimmed nor stripped of symbols. Legacy short passwords still verify. |
| Signup code | Digit-only UI and string-only six-digit server verification. Array/number coercion cannot verify a code. |
| Speed Reader textarea | State and tokenization capped at 20,000 characters, retaining the existing 500-word reading cap. Plain and pivoted rendering are tested with script/image-event payloads. |
| Numeric controls and challenge answers | Values are converted to numbers or restricted by the existing digit/letter controls, and rendered through React text. They are not evaluated as code or used to build database queries. |
| Avatar/colour/year/subject selections | Typed and bounded shared validation. Colours must be one of the app's tokens. Every profile colour rendering location uses a whitelist helper, including cached/older records, so stored strings cannot introduce arbitrary CSS URLs. |

ESLint blocks application raw HTML assignments, `dangerouslySetInnerHTML`,
`insertAdjacentHTML`/document writes, `eval`, implied evaluation, dynamic
functions and JavaScript URLs. Static test fixtures may still use HTML to
exercise DOM readers. These rules supplement the tests; they are not a general
JavaScript taint analyzer.

## API and browser protections

`server/security.js`, wired before the API handlers in `server/app.js`, adds:

- Cross-site write rejection using Fetch Metadata and validated Origin headers.
  Production uses `PUBLIC_APP_URL` when configured. Localhost Vite origins are
  accepted in development. JSON requests from non-browser clients can omit
  Origin; requests with bodies must use `application/json`. No permissive CORS
  policy is enabled. See [OWASP's CSRF guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
- Object-only JSON request envelopes with bounded nesting/node counts. Keys
  starting with `$`, dotted keys, `__proto__`, `constructor` and `prototype`
  are rejected recursively before any database handler executes. This blocks
  operator injection and unsafe prototype/object-merge payloads. String values
  containing punctuation are not rewritten.
- Safe JSON errors for malformed/oversized bodies and unsupported encodings,
  without returning parser details or submitted text. The existing 1 MB body
  limit remains in place.
- A Content Security Policy when Express serves the built app. Scripts must
  come from the same origin; inline script handlers, inline scripts and dynamic
  evaluation are blocked. Objects, base URL injection and framing are blocked.
  Local fonts plus Vite's data-font subsets, existing inline styles, HTTPS
  images, REST Countries and the confetti blob worker remain supported.
- No-sniff, no-referrer, frame denial, same-origin opener policy and disabled
  camera/microphone/geolocation permissions. HSTS is added in production; API
  responses are marked `no-store`; Express's identifying header is removed.

Vite development pages do not receive the production script policy because
HMR injects development scripts. The built app was checked under the actual
Express policy. CSP is an additional layer alongside safe rendering, as
recommended by [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html).

Session verification now accepts only HS256, matching the algorithm used to
issue sessions. Existing HTTP-only/SameSite cookies, expiry, rate limits,
password-reset session revocation and ownership-constrained MongoDB queries
remain in place.

## Learner data and validation

Storage keys, progress/reward document shapes and unlock rules are unchanged.
Profile reads do not rewrite old names/colours. Colour fallback affects display
only, and unrelated patches do not reject or overwrite legacy field values.
Incoming malformed requests fail before a saved learning document is changed.

Validation completed:

- `npm run lint`, `npm test` and `npm run build` pass. The standard suite has
  1,742 passing tests and four environment-dependent skips. The build retains
  its existing large-chunk warning.
- `npm audit` and `npm audit --omit=dev` each reported zero known vulnerabilities
  for the installed dependency versions on the review date.
- New regression tests cover malicious text, profile types/CSS values, email
  coercion, unsafe JSON keys, nesting, cross-site writes, parser errors,
  response headers, password bounds and JWT algorithm restrictions.
- Chrome, both themes: API signup and real UI login; stored
  `<script>x=1</script>` displayed literally; inline script insertion blocked
  by CSP; CSS/prototype/cross-site requests rejected; pre-existing saved
  progress remained identical after rejected writes and a reload. These checks
  used isolated synthetic accounts with email delivery disabled.
- Full desktop signup through the UI accepted an apostrophe-containing name
  and completed without CSP violations. The built Speed Reader accepted pasted
  script markup as literal story text without execution or runtime errors.
- The database-backed signup/authorization run passed its 49 behavioral
  assertions, but its two suite cleanup hooks failed because the configured
  database user lacks `dropDatabase`. The index-conversion protection suite
  could not start because that user also lacks `collMod`. These optional live
  suites are therefore not reported as passing. Synthetic records from the
  completed route/browser checks were deleted without changing permissions.

Remaining boundaries: browser-only storage mode cannot enforce account
security against someone controlling that device, and the hosted deployment
has not been re-tested or changed by this review. The app still accepts learning
results from its authenticated client; this work does not introduce server
grading or an independent score authority.
