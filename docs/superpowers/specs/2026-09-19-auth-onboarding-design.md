# Auth Onboarding Redesign — Learner Accounts, Signup Wizard, Welcome-Back Login

Date: 2026-09-19
Status: approved, ready for implementation

## Problem

Two problems, one surface.

1. **Only grown-ups can hold an account.** `parents` is the sole identity, and a
   child exists only as a profile underneath one. An older child who wants to use
   the app on their own has no way in.
2. **The auth screens are the least finished part of the app.** `/login` and
   `/signup` are plain adult forms sitting between a child and an app whose home
   and curriculum pages are animated, themed and playful. They are also the first
   thing anyone sees.

## Non-goals

- Verifiable parental consent (email round-trip, payment check). The age gate here
  is an honest speed bump, not a compliance implementation.
- Password reset / email verification. Neither exists today; neither is added here.
- Any change to how curriculum progress is stored, keyed or unlocked.

## 1. Identity model

The `parents` collection keeps its name. Renaming a live collection costs a
migration and buys nothing — every consumer already goes through the store seam.

Two new fields on an account document:

| Field | Type | Notes |
|---|---|---|
| `accountType` | `"parent" \| "learner"` | **Absent means `"parent"`.** Existing rows need no migration. |
| `ageBand` | `"13-15" \| "16-17" \| "18+" \| null` | Set only on learner accounts. Under-13 never reaches account creation, so no under-13 band is ever stored. |

A **learner account** is an account that owns its own profile. Nothing about
child or progress scoping moves: progress is keyed by `childId`, `childId` still
carries a `parentId`, and `RequireChild` is untouched.

`isLearner` is derived from `accountType`, never stored. It changes exactly three
things:

- after sign-in, a learner with exactly one profile goes straight to `/curriculum`
  instead of the "who's playing" screen
- `/parent` is titled "My account" rather than addressing a grown-up
- profile copy is first-person ("Make my profile", not "Add your first child")

Learners may still add further profiles. The flow defaults to one; it does not
forbid more.

### Why one flagged type rather than two collections

A separate learner identity would duplicate auth, session handling and ownership
checks across both store drivers and the server, for a difference that amounts to
three strings of copy and one redirect. The flag also leaves the door open to
"adopting" a learner account into a family later, which two collections would not.

## 2. Data layer

### Store contract (both drivers, identical signatures)

```
store.createParent({ email, password, accountType, ageBand })
```

- `accountType` defaults to `"parent"` when omitted, so every existing caller
  keeps working unchanged.
- `ageBand` is ignored unless `accountType === "learner"`.
- Validation lives in both drivers so the local driver surfaces the same error
  codes as the server rather than depending on the server's wording — the existing
  convention in `apiStore.createParent`.

New error codes: `INVALID_ACCOUNT_TYPE`, `AGE_BAND_REQUIRED`, `AGE_BAND_TOO_YOUNG`.

### Server

- `POST /api/auth/signup` validates `accountType` against a whitelist and requires
  a whitelisted `ageBand` iff the type is `"learner"`. Anything outside the
  whitelist is a 400 — including an under-13 band, which the client should never
  send because the client refuses to create the account at all. Defence in depth.
- `serialize.publicParent` gains an explicit `accountType: parent.accountType ?? "parent"`
  so a legacy document reads as a parent rather than `undefined` on the client.
  `ageBand` flows through the existing `...rest` spread.

### AuthContext

- `signUp` takes the two extra arguments and stores the returned account as-is.
- No other context method changes shape.
- On successful `signIn` and `signUp`, write the `dl.lastAccount` record (below).
  Clear it on `signOut`.

## 3. Screens

### Shared shell

`src/pages/auth/AuthShell.jsx` + `AuthShell.css` — the drifting-glyph sky plus the
entrance card, used by both Login and SignUp so the two screens share one
background and one entrance. Modelled directly on `home-sky` / `cp-sky`: fixed
glyph positions (same scene every visit), `aria-hidden` on the container, all
colours from tokens.

### Extraction

The name / avatar / colour picker moves out of `Profiles.jsx` into
`src/pages/auth/ProfileBuilder.jsx` + `.css`. The signup wizard and `/profiles`
then share one implementation rather than two drifting copies. `Profiles.jsx` is
already carrying too much at 262 lines.

### SignUp — a wizard on one route

State machine inside the component; `/signup` stays the only route.

| Step | Grown-up branch | Learner branch |
|---|---|---|
| 0 | Two illustrated choice cards: "I'm a grown-up" / "I'm learning myself" | same screen |
| 0b | — | "How old are you?" as tappable age chips. Under 13 → a warm dead-end offering "Get a grown-up", which switches to the grown-up branch. **No account is created.** |
| 1 | Email, password, confirm. Show/hide toggle. Live strength hint rather than a post-submit error. | same fields, gentler copy |
| 2 | "Add your first child" (ProfileBuilder) | "Make my profile" (ProfileBuilder) |
| → | `/profiles` | `/curriculum` |

The account is created at the **end of step 1**, because step 2 calls `addChild`,
which needs an authenticated parent. A failure at step 1 keeps the user on step 1
with a field-level error, exactly as the current page behaves. A failure at step 2
leaves a real account with no profile — recoverable, because `/profiles` is
exactly the screen for adding one, so step 2 failure routes there with the error.

Back navigation within the wizard is allowed up to step 1. Once the account
exists, step 1 is no longer reachable — going "back" from step 2 would imply
editing credentials that are already saved.

### Login — welcome back

A new `dl.lastAccount` localStorage record, written on successful sign-in:

```json
{ "email": "...", "profiles": [{ "id": "...", "name": "...", "avatar": "...", "colour": "..." }] }
```

**Never** credentials, tokens or a password field. Cleared on sign-out.

When the record is present, `/login` leads with "Welcome back" and the familiar
avatar faces, pre-fills the email, and asks for the password alone. A fresh
browser sees the plain two-field form.

#### The honest limit of the fast lane

Tapping a face cannot skip authentication. It mostly does not need to: the session
cookie already lasts 30 days (`server/auth.js:18`), so a returning family is
normally still signed in and never reaches `/login` at all. `/login` appears only
when auth is genuinely required — and at that moment a tap-to-play card would be
a lie. The fast lane therefore reduces two fields to one and keeps the
reassurance; it does not remove the password.

## 4. Motion

Reuse the existing vocabulary rather than inventing a second one:

- drifting glyph sky — `home-drift` / `cp-drift`
- `useReveal` for staggered entrance of choice cards and form fields
- the `is-nudged` shake for invalid input, the same pattern as a locked challenge
- letter-by-letter reveal on the "Welcome back" greeting, as `home-hello-name` does
- wizard steps cross-fade and slide, with the transform distance and any fixed
  height driven by **one** `--step-distance` custom property (§9: fixed pixel
  heights and animation distances must share a variable)

Every animation collapses under `prefers-reduced-motion: reduce`.

Colour rule (§9): the accent is a background, never body text. Headings use
`--*-text`; anything sitting on the accent uses `--on-*-accent`.

## 5. Testing

- Both store drivers: `createParent` persists `accountType` and `ageBand`; omitting
  `accountType` yields `"parent"`; the three new error codes fire.
- Server: signup rejects an unknown `accountType`, rejects a learner with no
  `ageBand`, rejects an under-13 band, and `publicParent` reports a legacy
  document as `"parent"`.
- `dl.lastAccount` never contains a password, hash, salt or token field.
- Manual, both themes and a phone width: each wizard step, the under-13 dead-end,
  the welcome-back screen with and without a stored record.
