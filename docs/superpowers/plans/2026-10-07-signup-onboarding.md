# Sign-up Onboarding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. **After every task, update the tracker** (`2026-10-07-signup-onboarding-tracker.md`): status, commit hash, date, anything that deviated.

**Goal:** Replace `/signup` with a one-question-per-screen flow guided by Bix that builds the whole family first, verifies the email with a six-digit code, and creates the account and every profile in one request.

**Architecture:** All flow logic (step order, skips, age bands, draft persistence, request body) lives in pure modules under `src/data/` so `node:test` covers it; React components only render and dispatch. The server gains a `pendingSignups` collection, a mailer (`server/email.js`, Resend over `fetch`), and a `createSignupRouter` with `/code` and `/complete`. Both store drivers expose `requestSignupCode` / `completeSignup`; `AuthContext` passes them to the screens.

**Tech Stack:** React 19, react-router 7, Vite 7, Express 5, MongoDB driver 7, `node:test`, Playwright (browser checks). No new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-07-signup-onboarding-design.md` — read it first; this plan argues from it.

## Global Constraints

- No new npm dependencies. Resend is called with `fetch`.
- Never store a birth year, an age, or a password outside the request that uses it. `dl.signupDraft` (sessionStorage) never contains a password.
- Never send names, emails or birth years to `track()`.
- Colours only from tokens: inside `.auth-page` use the `--au-*` tokens (`AuthShell.css`); profile colours are `var(--profile-colour-*)`. No colour literals.
- Touch targets ≥ 64 px. Both themes. `prefers-reduced-motion`: fades only, no confetti (`playEffect` already no-ops), no flying faces.
- Sounds only through `playCue` (respects mute) and only in response to a tap.
- Code: 6 digits, valid 10 minutes, 5 wrong tries, resend after 30 s, at most 5 sends per hour per email.
- Children per sign-up: 1–6 for a parent, exactly 1 for a learner. Nickname ≤ 20 characters (code points), trimmed.
- Age is counted at the youngest possible: `age = currentYear − birthYear − 1`. Under 13 is gated; nothing is saved and no request is made.
- Email modes: `RESEND_API_KEY` **and** `EMAIL_FROM` → send; neither and not production → log; anything else → off (verification skipped, `emailVerified: false`).
- Existing accounts, profiles, progress, rewards, `/login`, `/profiles`, `/parent`: unchanged. Progress documents are not touched.
- `npm run lint`, `npm test`, `npm run build` pass at the end of every task.
- Server tests need `MONGODB_URI` (they skip without it). Run them with `node --env-file-if-exists=.env --test server/` so they actually run.

## Review Focus

1. **Year changed after subjects were picked** (edit from the summary: Year 3 with Science → Year 2). Expect Science to drop away, since Year 2 has no Science. Pinned in Task 2 (`withLearner` test).
2. **Email typed differently at the two steps** (`" Maya@X.com"` for the code, `"maya@x.com"` to complete). Expect the same pending record to be found. Pinned in Task 4/5 tests.
3. **Pasted codes with spaces or dashes** (`"482 913"`, `"482-913"`, a whole email sentence). Expect the six digits to be extracted. Pinned in Task 2 (`parseCode` test).
4. **A stale or tampered draft in sessionStorage** (older version, 9 learners, wrong types, a cursor on the code step with no password). Expect it discarded or resumed at the account step. Pinned in Task 2 (`parseDraft` tests).
5. **Double submit** (the sixth digit auto-submits while Enter is pressed, or two tabs). Expect exactly one account. Pinned in Task 5 (concurrent-complete test) and Task 9 (the `submittingRef` guard).

---

## File map

| File | Responsibility |
|---|---|
| `shared/emailAddress.js` (+test) | `normaliseEmail`, `isEmailShaped`, `maskEmail` — used by both sides |
| `src/data/childFields.js` (+test) | `subjects` field, `CHILD_SUBJECTS`, `readSubjects`, `normaliseNewChildren` |
| `src/data/passwordStrength.js` (+test) | moved out of `SignUp.jsx` |
| `src/data/signupFlow.js` (+test) | steps, skips, age band, draft updates, draft parse, request body, destination, code parsing |
| `src/data/signupCopy.js` (+test) | Bix's lines, step titles, error messages |
| `src/utils/analytics.js` (+test) | `track()` no-op with an allow-list |
| `server/signupCodes.js` (+test) | code generation, hashing, comparison, send-rate decision |
| `server/email.js` (+test) | mode selection, the email itself, Resend call |
| `server/accounts.js` | `createParentAccount` (shared by old and new routes) |
| `server/childDoc.js` | `newChildDoc` |
| `server/routes/signup.js` | `createSignupRouter` — `/code`, `/complete` |
| `server/signup.test.js` | route tests |
| `src/pages/auth/PasswordField.jsx` | moved out of `SignUp.jsx` |
| `src/pages/auth/ProfilePickers.jsx` | `AvatarPicker`, `ColourPicker` lifted from `ProfileBuilder` |
| `src/pages/auth/signup/parts/*.jsx` | `BixGuide`, `ChoiceCards`, `YearWheel`, `CodeInput`, `FamilyRow`, `ProgressStars` |
| `src/pages/auth/signup/steps.jsx` | one small body component per step |
| `src/pages/auth/signup/useSignupDraft.js` | draft state + sessionStorage |
| `src/pages/auth/signup/SignUpFlow.jsx` / `.css` | the state machine and layout |
| `src/pages/auth/signup/HandOver.jsx` | the hand-over |

---

### Task 1: Shared email helpers and the child `subjects` field

**Files:**
- Create: `shared/emailAddress.js`, `shared/emailAddress.test.js`
- Modify: `src/data/childFields.js`, `src/data/childFields.test.js`
- Modify: `src/data/store/localStorageStore.js` (`createChild`), `src/data/store/apiStore.js` (`createChild` body), `server/routes/children.js` (POST)
- Modify: `server/routes.test.js` (one assertion)

**Interfaces:**
- Produces: `normaliseEmail(email): string`, `isEmailShaped(email): boolean`, `maskEmail(email): string`; `CHILD_SUBJECTS: string[]`, `CHILD_NAME_MAX = 20`, `MAX_CHILDREN_PER_SIGNUP = 6`, `readSubjects(child): string[]`, `normaliseNewChildren(list, { max }): Array<{name, avatar, colour, yearGroup, subjects}>` (throws `INVALID_CHILDREN | NAME_REQUIRED | NAME_TOO_LONG | INVALID_YEAR_GROUP | INVALID_SUBJECTS`). `normaliseChildPatch` accepts `subjects`.

- [ ] **Step 1: Write the failing tests**

`shared/emailAddress.test.js`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { isEmailShaped, maskEmail, normaliseEmail } from "./emailAddress.js";

test("normaliseEmail trims and lowercases, and survives junk", () => {
  assert.equal(normaliseEmail("  Maya.Parent@Example.COM "), "maya.parent@example.com");
  assert.equal(normaliseEmail(null), "");
  assert.equal(normaliseEmail(undefined), "");
});

test("isEmailShaped is a shape check, not a deliverability check", () => {
  for (const ok of ["a@b.co", " A@B.CO ", "first.last+tag@sub.example.org"]) assert.ok(isEmailShaped(ok), ok);
  for (const bad of ["", "a@b", "a b@c.de", "@b.co", "a@", null]) assert.equal(isEmailShaped(bad), false, String(bad));
});

test("maskEmail keeps the first letter and the domain", () => {
  assert.equal(maskEmail("Maya.Smith@Gmail.com"), "m…@gmail.com");
  assert.equal(maskEmail("x"), "x");
});
```

Append to `src/data/childFields.test.js`:
```js
import {
  CHILD_NAME_MAX,
  CHILD_SUBJECTS,
  EDITABLE_CHILD_FIELDS,
  normaliseNewChildren,
  readSubjects,
} from "./childFields.js";
import { CURRICULUM_SUBJECTS } from "./curriculumRegistry.js";

test("subjects: the list is the curriculum's subject ids, and is editable", () => {
  assert.deepEqual([...CHILD_SUBJECTS].sort(), CURRICULUM_SUBJECTS.map((s) => s.id).sort());
  assert.ok(EDITABLE_CHILD_FIELDS.includes("subjects"));
});

test("subjects: de-duplicated, null clears, absent untouched, unknown refused", () => {
  assert.deepEqual(normaliseChildPatch({ subjects: ["math", "science", "math"] }), { subjects: ["math", "science"] });
  assert.deepEqual(normaliseChildPatch({ subjects: null }), { subjects: [] });
  assert.deepEqual(normaliseChildPatch({ name: "Ada" }), { name: "Ada" });
  assert.throws(() => normaliseChildPatch({ subjects: ["history"] }), /INVALID_SUBJECTS/);
  assert.throws(() => normaliseChildPatch({ subjects: "math" }), /INVALID_SUBJECTS/);
});

test("readSubjects tolerates old and corrupt profiles", () => {
  assert.deepEqual(readSubjects({}), []);
  assert.deepEqual(readSubjects(null), []);
  assert.deepEqual(readSubjects({ subjects: "math" }), []);
  assert.deepEqual(readSubjects({ subjects: ["math", "history"] }), ["math"]);
});

test("normaliseNewChildren whitelists, trims and bounds a sign-up's profiles", () => {
  const [kid] = normaliseNewChildren(
    [{ name: "  Maya ", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"], parentId: "evil", _id: "x" }],
    { max: 6 }
  );
  assert.deepEqual(kid, { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] });
  assert.deepEqual(normaliseNewChildren([{ name: "Leo" }], { max: 1 })[0], {
    name: "Leo", avatar: null, colour: null, yearGroup: null, subjects: [],
  });
  assert.throws(() => normaliseNewChildren([], { max: 6 }), /INVALID_CHILDREN/);
  assert.throws(() => normaliseNewChildren("nope", { max: 6 }), /INVALID_CHILDREN/);
  assert.throws(() => normaliseNewChildren([{ name: "A" }, { name: "B" }], { max: 1 }), /INVALID_CHILDREN/);
  assert.throws(() => normaliseNewChildren([{ name: " " }], { max: 6 }), /NAME_REQUIRED/);
  assert.throws(() => normaliseNewChildren([null], { max: 6 }), /NAME_REQUIRED/);
  assert.throws(() => normaliseNewChildren([{ name: "x".repeat(CHILD_NAME_MAX + 1) }], { max: 6 }), /NAME_TOO_LONG/);
  // Counted in characters, not UTF-16 units: twenty emoji is twenty.
  assert.equal([...normaliseNewChildren([{ name: "🦊".repeat(20) }], { max: 6 })[0].name].length, 20);
  assert.throws(() => normaliseNewChildren([{ name: "A", yearGroup: 9 }], { max: 6 }), /INVALID_YEAR_GROUP/);
  assert.throws(() => normaliseNewChildren([{ name: "A", subjects: ["history"] }], { max: 6 }), /INVALID_SUBJECTS/);
});
```
(If `childFields.test.js` already imports `test`, `assert` and `normaliseChildPatch`, merge the import lines rather than duplicating them.)

- [ ] **Step 2: Run to see them fail**

Run: `node --test shared/emailAddress.test.js src/data/childFields.test.js`
Expected: FAIL — `Cannot find module './emailAddress.js'` and missing exports from `childFields.js`.

- [ ] **Step 3: Implement**

`shared/emailAddress.js`:
```js
/**
 * Email helpers shared by the client and the server, so both agree on what
 * "the same address" means. Plain ESM, no dependencies.
 */

export function normaliseEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

// A shape check only: it catches typos like "maya@gmail" before a round trip.
// Whether the address is real is what the six-digit code proves.
const SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailShaped(email) {
  return SHAPE.test(normaliseEmail(email));
}

/** "Maya.Smith@Gmail.com" → "m…@gmail.com" — for screens and server logs. */
export function maskEmail(email) {
  const normalised = normaliseEmail(email);
  const at = normalised.indexOf("@");
  if (at < 1) return normalised;
  return `${normalised[0]}…${normalised.slice(at)}`;
}
```

In `src/data/childFields.js`:
```js
/** Everything a caller may set on a child profile. Nothing else is writable. */
export const EDITABLE_CHILD_FIELDS = ["name", "avatar", "colour", "yearGroup", "subjects"];

/**
 * Subjects a profile may say it wants. Mirrors CURRICULUM_SUBJECTS' ids (a test
 * holds the two together) without importing the registry, which would drag the
 * curriculum datasets into the server.
 */
export const CHILD_SUBJECTS = ["math", "english", "geography", "science"];

/** Longest nickname a NEW profile may have, in characters. Existing names are left alone. */
export const CHILD_NAME_MAX = 20;

/** Most profiles one sign-up may create. */
export const MAX_CHILDREN_PER_SIGNUP = 6;

/** A profile's chosen subjects. Profiles made before the field existed have none. */
export function readSubjects(child) {
  return Array.isArray(child?.subjects)
    ? child.subjects.filter((id) => CHILD_SUBJECTS.includes(id))
    : [];
}

function normaliseSubjects(value) {
  if (value === null) return [];
  if (!Array.isArray(value) || value.some((id) => !CHILD_SUBJECTS.includes(id))) {
    throw new Error("INVALID_SUBJECTS");
  }
  return [...new Set(value)];
}
```
Inside `normaliseChildPatch`, after the `yearGroup` block and before `return out;`:
```js
  if (supplied("subjects")) out.subjects = normaliseSubjects(patch.subjects);
```
Add the JSDoc `@throws` line `INVALID_SUBJECTS when subjects is present but not a list of known ids`. Then append:
```js
/**
 * The profiles a sign-up creates, checked as a set. Stricter than a patch:
 * every field is filled in, the name is required and capped, and the list is
 * bounded. Anything not named here (parentId, _id…) is dropped.
 *
 * @param {unknown} list
 * @param {{max: number}} options  1 for a learner, MAX_CHILDREN_PER_SIGNUP for a parent
 * @throws {Error} INVALID_CHILDREN | NAME_REQUIRED | NAME_TOO_LONG | INVALID_YEAR_GROUP | INVALID_SUBJECTS
 */
export function normaliseNewChildren(list, { max }) {
  if (!Array.isArray(list) || list.length < 1 || list.length > max) {
    throw new Error("INVALID_CHILDREN");
  }
  return list.map((child) => {
    const input = child && typeof child === "object" ? child : {};
    const { name, yearGroup = null, subjects = [] } = normaliseChildPatch({
      name: input.name ?? "",
      yearGroup: input.yearGroup ?? null,
      subjects: input.subjects ?? [],
    });
    if ([...name].length > CHILD_NAME_MAX) throw new Error("NAME_TOO_LONG");
    return {
      name,
      avatar: typeof input.avatar === "string" ? input.avatar : null,
      colour: typeof input.colour === "string" ? input.colour : null,
      yearGroup,
      subjects,
    };
  });
}
```

Store `subjects` on every new profile. In `localStorageStore.createChild` change the signature and body:
```js
  async createChild(parentId, { name, avatar, colour, yearGroup, subjects }) {
    // …unchanged name checks…
    const { yearGroup: year = null, subjects: picked = [] } = normaliseChildPatch({ yearGroup, subjects });
    const child = {
      _id: newId(),
      parentId,
      name: trimmedName,
      avatar: avatar ?? null,
      colour: colour ?? null,
      yearGroup: year,
      subjects: picked,
      createdAt: now(),
    };
```
In `apiStore.createChild`, add `subjects` to the destructured argument and to the request body. In `server/routes/children.js` POST:
```js
    let year = null;
    let subjects = [];
    try {
      ({ yearGroup: year = null, subjects = [] } = normaliseChildPatch({
        yearGroup: req.body?.yearGroup ?? null,
        subjects: req.body?.subjects,
      }));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const child = {
      parentId: req.parent._id,
      name,
      avatar: req.body?.avatar ?? null,
      colour: req.body?.colour ?? null,
      yearGroup: year,
      subjects,
      createdAt: new Date().toISOString(),
    };
```
In `server/routes.test.js`, after `assert.equal(childA.name, "Ada");` add:
```js
  assert.deepEqual(childA.subjects, [], "a new profile has no subjects until one is chosen");
```

- [ ] **Step 4: Run all tests**

Run: `npm test` then `node --env-file-if-exists=.env --test server/`
Expected: PASS. If an existing store test compares a whole child document, add `subjects: []` to its expected value — that is the intended change.

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add shared/emailAddress.js shared/emailAddress.test.js src/data/childFields.js src/data/childFields.test.js src/data/store/localStorageStore.js src/data/store/apiStore.js server/routes/children.js server/routes.test.js
git commit -m "feat(signup): shared email helpers; subjects on child profiles; normaliseNewChildren"
```

---

### Task 2: The flow as pure logic — `signupFlow`, `signupCopy`, `passwordStrength`

**Files:**
- Create: `src/data/passwordStrength.js` (+ `.test.js`), `src/data/signupFlow.js` (+ `.test.js`), `src/data/signupCopy.js` (+ `.test.js`)
- Modify: `src/pages/auth/SignUp.jsx` (import `passwordStrength` / `MIN_PASSWORD_LENGTH` instead of defining them)

**Interfaces:**
- Consumes: Task 1's `CHILD_NAME_MAX`, `MAX_CHILDREN_PER_SIGNUP`, `normaliseEmail`, `isEmailShaped`, `maskEmail`.
- Produces (`signupFlow.js`): `STEP`, `GATED = "under-13"`, `EXPLORING = "exploring"`, `DRAFT_KEY = "dl.signupDraft"`, `STAGES`, `emptyDraft()`, `blankLearner()`, `ageBandForBirthYear(birthYear, currentYear)`, `birthYearOptions(currentYear)`, `subjectsForYear(yearGroup)`, `withBirthYear(draft, year, currentYear)`, `withLearnFor(draft, "me"|"children")`, `withCount(draft, n)`, `withLearner(draft, index, patch)`, `toggleSubject(subjects, id)`, `editLearner(draft, index)`, `addLearner(draft)`, `stepsFor(draft)`, `sameCursor(a, b)`, `nextCursor(draft, cursor)`, `prevCursor(draft, cursor)`, `stageOf(cursor)`, `stepError(draft, cursor)`, `isDraftReady(draft)`, `accountErrors({email, password, confirm})`, `signupBody(draft, {password, code})`, `destinationFor(child)`, `parseDraft(raw)`, `serialiseDraft(draft)`, `parseCode(text)`.
  - Draft: `{ v: 1, birthYear: number|null, ageBand: string|null, learnFor: "me"|"children"|null, learners: Learner[], email: string, cursor: {step, index?}, returnTo: "summary"|null }`.
  - Learner: `{ name: string, avatar: string|null, colour: string|null, yearGroup?: number|null, subjects?: string[] }` — `yearGroup`/`subjects` **absent** means "not answered yet"; `yearGroup: null` is "Not sure"; `subjects: []` is "Just exploring".
- Produces (`signupCopy.js`): `bixLine(draft, cursor)`, `stepTitle(draft, cursor)`, `errorMessage(code, details?)`, `ERROR_MESSAGES`.
- Produces (`passwordStrength.js`): `MIN_PASSWORD_LENGTH = 8`, `passwordStrength(password)`.

- [ ] **Step 1: Write the failing tests**

`src/data/passwordStrength.test.js`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { MIN_PASSWORD_LENGTH, passwordStrength } from "./passwordStrength.js";

test("password strength levels", () => {
  assert.equal(passwordStrength(""), null);
  assert.equal(passwordStrength("short").level, "short");
  assert.equal(MIN_PASSWORD_LENGTH, 8);
  assert.equal(passwordStrength("abcdefgh").level, "okay");
  assert.equal(passwordStrength("abcdefg1").level, "good");
  assert.equal(passwordStrength("Abcdefghij1!").level, "strong");
});
```

`src/data/signupFlow.test.js`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  DRAFT_KEY, EXPLORING, GATED, STEP, accountErrors, addLearner, ageBandForBirthYear,
  birthYearOptions, destinationFor, editLearner, emptyDraft, isDraftReady, nextCursor,
  parseCode, parseDraft, prevCursor, serialiseDraft, signupBody, stageOf, stepError,
  stepsFor, subjectsForYear, toggleSubject, withBirthYear, withCount, withLearnFor, withLearner,
} from "./signupFlow.js";

const NOW = 2026;
const maya = { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] };
const leo = { name: "Leo", avatar: "🐼", colour: "--profile-colour-mint", yearGroup: 3, subjects: [] };
const parentDraft = () => ({ ...withCount(withLearnFor(withBirthYear(emptyDraft(), 1990, NOW), "children"), 2), learners: [maya, leo] });

test("age is counted at the youngest it could be", () => {
  assert.equal(ageBandForBirthYear(2014, NOW), GATED); // 11 or 12
  assert.equal(ageBandForBirthYear(2013, NOW), GATED); // 12 or 13 → 12
  assert.equal(ageBandForBirthYear(2012, NOW), "13-15"); // 13 or 14
  assert.equal(ageBandForBirthYear(2010, NOW), "13-15"); // 15 or 16 → 15
  assert.equal(ageBandForBirthYear(2009, NOW), "16-17");
  assert.equal(ageBandForBirthYear(2008, NOW), "16-17"); // 17 or 18 → 17
  assert.equal(ageBandForBirthYear(2007, NOW), "18+");
});

test("birth years run newest first and are not pre-selected", () => {
  const years = birthYearOptions(NOW);
  assert.equal(years[0], NOW - 3);
  assert.equal(years.at(-1), NOW - 100);
  assert.equal(emptyDraft().birthYear, null);
});

test("subjects come from the registry for the year", () => {
  assert.deepEqual(subjectsForYear(null), []);
  assert.deepEqual(subjectsForYear(1), []);
  assert.deepEqual(subjectsForYear(2), ["math"]);
  assert.deepEqual([...subjectsForYear(3)].sort(), ["english", "math", "science"]);
  assert.deepEqual(subjectsForYear(4), ["english"]);
});

test("under 18 is always 'me' with one learner; under 13 goes to the gate", () => {
  const teen = withBirthYear(emptyDraft(), 2011, NOW);
  assert.equal(teen.learnFor, "me");
  assert.equal(teen.learners.length, 1);
  assert.equal(stepsFor(teen).some((c) => c.step === STEP.who), false);
  const child = withBirthYear(emptyDraft(), 2016, NOW);
  assert.equal(child.ageBand, GATED);
  assert.deepEqual(nextCursor(child, { step: STEP.birthYear }), { step: STEP.gate });
  assert.deepEqual(prevCursor(child, { step: STEP.gate }), { step: STEP.birthYear });
});

test("a grown-up path: who → count → each learner → summary → account → code", () => {
  const draft = parentDraft();
  assert.deepEqual(stepsFor(draft).map((c) => (c.index === undefined ? c.step : `${c.step}${c.index}`)), [
    "birthYear", "who", "count",
    "name0", "year0", "look0", "subjects0",
    "name1", "year1", "look1", "subjects1",
    "summary", "account", "code",
  ]);
});

test("subjects are skipped for a year with no curriculum or 'Not sure'", () => {
  const draft = { ...parentDraft(), learners: [{ ...maya, yearGroup: 1 }, { ...leo, yearGroup: null }] };
  assert.equal(stepsFor(draft).some((c) => c.step === STEP.subjects), false);
});

test("stepping forward and back follows the sequence", () => {
  const draft = parentDraft();
  assert.deepEqual(nextCursor(draft, { step: STEP.count }), { step: STEP.name, index: 0 });
  assert.deepEqual(nextCursor(draft, { step: STEP.subjects, index: 0 }), { step: STEP.name, index: 1 });
  assert.deepEqual(prevCursor(draft, { step: STEP.name, index: 1 }), { step: STEP.subjects, index: 0 });
  assert.equal(prevCursor(draft, { step: STEP.birthYear }), null);
});

test("editing from the summary returns to the summary", () => {
  const draft = editLearner(parentDraft(), 0);
  assert.deepEqual(draft.cursor, { step: STEP.name, index: 0 });
  assert.deepEqual(nextCursor(draft, { step: STEP.subjects, index: 0 }), { step: STEP.summary });
  assert.deepEqual(prevCursor(draft, { step: STEP.name, index: 0 }), { step: STEP.summary });
});

test("adding a learner from the summary is capped at six", () => {
  let draft = parentDraft();
  for (let i = 0; i < 10; i++) draft = addLearner(draft);
  assert.equal(draft.learners.length, 6);
  assert.equal(draft.returnTo, STEP.summary);
  assert.equal(addLearner({ ...withBirthYear(emptyDraft(), 2011, NOW) }).learners.length, 1, "a learner cannot add children");
});

test("count keeps learners already filled in", () => {
  const draft = withCount(parentDraft(), 3);
  assert.equal(draft.learners[0].name, "Maya");
  assert.equal(draft.learners.length, 3);
  assert.equal(withCount(draft, 1).learners.length, 1);
  assert.equal(withCount(draft, 99).learners.length, 6);
});

test("changing a year drops subjects that year doesn't have (Review Focus 1)", () => {
  const draft = { ...parentDraft(), learners: [{ ...leo, subjects: ["science", "math"] }] };
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 2 }).learners[0].subjects, ["math"]);
  assert.deepEqual(withLearner(draft, 0, { yearGroup: 1 }).learners[0].subjects, []);
});

test("toggling subjects: Just exploring is exclusive; clearing the last one un-answers", () => {
  assert.deepEqual(toggleSubject(undefined, "math"), ["math"]);
  assert.deepEqual(toggleSubject(["math"], "science"), ["math", "science"]);
  assert.equal(toggleSubject(["math"], "math"), undefined);
  assert.deepEqual(toggleSubject(["math"], EXPLORING), []);
  assert.deepEqual(toggleSubject([], "math"), ["math"]);
});

test("each step says what is missing", () => {
  const draft = { ...parentDraft(), learners: [{ name: " ", avatar: null, colour: null }] };
  assert.equal(stepError(draft, { step: STEP.name, index: 0 }), "NAME_REQUIRED");
  assert.equal(stepError({ ...draft, learners: [{ name: "x".repeat(21) }] }, { step: STEP.name, index: 0 }), "NAME_TOO_LONG");
  assert.equal(stepError(draft, { step: STEP.year, index: 0 }), "CHOOSE_ONE");
  assert.equal(stepError(draft, { step: STEP.look, index: 0 }), "CHOOSE_LOOK");
  assert.equal(stepError(parentDraft(), { step: STEP.year, index: 0 }), null);
  assert.equal(isDraftReady(parentDraft()), true);
  assert.equal(isDraftReady(draft), false);
});

test("account fields", () => {
  assert.deepEqual(accountErrors({ email: "a@b.co", password: "password1", confirm: "password1" }), {});
  assert.deepEqual(accountErrors({ email: "a@b", password: "short", confirm: "" }), { email: "EMAIL_INVALID", password: "PASSWORD_TOO_SHORT" });
  assert.deepEqual(accountErrors({ email: "a@b.co", password: "password1", confirm: "password2" }), { confirm: "PASSWORD_MISMATCH" });
});

test("the request body", () => {
  const draft = { ...parentDraft(), email: " Family@Example.com " };
  assert.deepEqual(signupBody(draft, { password: "pw-123456", code: "482913" }), {
    email: "family@example.com", password: "pw-123456", code: "482913", accountType: "parent", ageBand: null,
    children: [
      { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] },
      { name: "Leo", avatar: "🐼", colour: "--profile-colour-mint", yearGroup: 3, subjects: [] },
    ],
  });
  const teen = { ...withBirthYear(emptyDraft(), 2011, NOW), learners: [{ ...maya, yearGroup: null, subjects: undefined }], email: "t@x.co" };
  const body = signupBody(teen, { password: "pw-123456" });
  assert.equal(body.accountType, "learner");
  assert.equal(body.ageBand, "13-15");
  assert.equal("code" in body, false);
  assert.deepEqual(body.children[0].subjects, []);
  assert.equal("birthYear" in body, false, "the birth year never leaves the browser");
});

test("where a learner goes after the hand-over", () => {
  assert.equal(destinationFor({ yearGroup: 3, subjects: ["science", "math"] }), "/curriculum/year/3/science");
  assert.equal(destinationFor({ yearGroup: 3, subjects: [] }), "/");
  assert.equal(destinationFor({ yearGroup: null, subjects: [] }), "/");
  assert.equal(destinationFor({}), "/");
});

test("codes are pulled out of whatever was pasted (Review Focus 3)", () => {
  assert.equal(parseCode("482913"), "482913");
  assert.equal(parseCode(" 482 913 "), "482913");
  assert.equal(parseCode("482-913"), "482913");
  assert.equal(parseCode("Your code is 482913."), "482913");
  assert.equal(parseCode("1234567"), "123456");
  assert.equal(parseCode(null), "");
});

test("a draft round-trips and never holds a password", () => {
  const draft = { ...parentDraft(), email: "a@b.co", cursor: { step: STEP.summary } };
  const raw = serialiseDraft(draft);
  assert.equal(raw.includes("password"), false);
  assert.deepEqual(parseDraft(raw), draft);
  assert.equal(DRAFT_KEY, "dl.signupDraft");
});

test("a stale or tampered draft is discarded or made safe (Review Focus 4)", () => {
  for (const raw of ["", "not json", "null", "[]", '{"v":0}', JSON.stringify({ ...emptyDraft(), v: 2 })]) {
    assert.equal(parseDraft(raw), null, raw);
  }
  const nine = { ...parentDraft(), learners: Array.from({ length: 9 }, () => maya) };
  assert.equal(parseDraft(JSON.stringify(nine)), null);
  assert.equal(parseDraft(JSON.stringify({ ...parentDraft(), learners: [{ name: 5 }] })), null);
  assert.equal(parseDraft(JSON.stringify({ ...parentDraft(), ageBand: "9-10" })), null);
  assert.equal(parseDraft(JSON.stringify({ ...parentDraft(), cursor: { step: "nowhere" } })), null);
  // The code step needs the password, which is never saved: resume at the account step.
  assert.deepEqual(parseDraft(JSON.stringify({ ...parentDraft(), cursor: { step: STEP.code } })).cursor, { step: STEP.account });
  // A cursor the draft cannot reach restarts at the first unanswered step.
  const early = { ...withBirthYear(emptyDraft(), 1990, NOW), cursor: { step: STEP.summary } };
  assert.deepEqual(parseDraft(JSON.stringify(early)).cursor, { step: STEP.who });
});

test("progress stages", () => {
  assert.equal(stageOf({ step: STEP.who }), 0);
  assert.equal(stageOf({ step: STEP.look, index: 1 }), 1);
  assert.equal(stageOf({ step: STEP.summary }), 2);
  assert.equal(stageOf({ step: STEP.code }), 3);
});
```

`src/data/signupCopy.test.js`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { STEP, emptyDraft, withBirthYear } from "./signupFlow.js";
import { bixLine, errorMessage, stepTitle } from "./signupCopy.js";

const learner = { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 3, subjects: ["science"] };
const draft = { ...withBirthYear(emptyDraft(), 1990, 2026), learnFor: "children", learners: [learner], email: "maya.parent@gmail.com" };

test("Bix has a line and every step has a title", () => {
  for (const step of Object.values(STEP)) {
    const cursor = ["name", "year", "look", "subjects"].includes(step) ? { step, index: 0 } : { step };
    assert.ok(bixLine(draft, cursor), step);
    assert.ok(stepTitle(draft, cursor), step);
  }
});

test("Bix uses the name and reacts to the latest subject", () => {
  assert.equal(bixLine(draft, { step: STEP.name, index: 0 }), "Hi Maya! 👋");
  assert.equal(bixLine(draft, { step: STEP.subjects, index: 0 }), "Ooh, I love magnets!");
  assert.equal(bixLine(draft, { step: STEP.code }), "I sent a code to m…@gmail.com");
  assert.equal(stepTitle(draft, { step: STEP.year, index: 0 }), "Which school year is Maya in?");
});

test("'Me' changes the wording", () => {
  const me = { ...withBirthYear(emptyDraft(), 2011, 2026), learners: [{ name: "", avatar: null, colour: null }] };
  assert.equal(stepTitle(me, { step: STEP.name, index: 0 }), "What should Bix call you?");
  assert.equal(stepTitle(me, { step: STEP.year, index: 0 }), "Which year's work would you like?");
});

test("error messages: details are used, unknown codes fall back", () => {
  assert.equal(errorMessage("CODE_INCORRECT", { attemptsLeft: 1 }), "Hmm, let's try that again — 1 try left.");
  assert.equal(errorMessage("CODE_INCORRECT", { attemptsLeft: 3 }), "Hmm, let's try that again — 3 tries left.");
  assert.equal(errorMessage("TOO_MANY_CODES", { retryAfterSeconds: 61 }), "Let's take a break — try again in 2 minutes.");
  assert.equal(errorMessage("WHAT_IS_THIS"), errorMessage("SIGNUP_FAILED"));
});
```

- [ ] **Step 2: Run to see them fail**

Run: `node --test src/data/passwordStrength.test.js src/data/signupFlow.test.js src/data/signupCopy.test.js`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

`src/data/passwordStrength.js` — move `MIN_PASSWORD_LENGTH` and `passwordStrength` verbatim from `src/pages/auth/SignUp.jsx` (lines 13 and 33–55, comment included) and `export` both. In `SignUp.jsx` delete them and add `import { MIN_PASSWORD_LENGTH, passwordStrength } from "../../data/passwordStrength";`.

`src/data/signupFlow.js`:
```js
/**
 * The sign-up flow as data. Every rule the screens follow — which steps a
 * family sees, in what order, what Back does, what is sent — lives here, pure,
 * so node:test can pin it. The React side only renders a cursor and calls
 * these functions. Spec: docs/superpowers/specs/2026-10-07-signup-onboarding-design.md
 */
import { ACCOUNT_LEARNER, ACCOUNT_PARENT, AGE_BANDS } from "../../shared/accountTypes.js";
import { isEmailShaped, normaliseEmail } from "../../shared/emailAddress.js";
import { CHILD_NAME_MAX, MAX_CHILDREN_PER_SIGNUP } from "./childFields.js";
import { CURRICULUM_SUBJECTS, isCurriculumAvailable } from "./curriculumRegistry.js";
import { MIN_PASSWORD_LENGTH } from "./passwordStrength.js";

export const DRAFT_KEY = "dl.signupDraft";
const DRAFT_VERSION = 1;

/** The age band that is turned away. Same id as AGE_CHOICES' under-13 option. */
export const GATED = "under-13";

/** "Just exploring" — exclusive, and stored as an empty subject list. */
export const EXPLORING = "exploring";

export const STEP = Object.freeze({
  birthYear: "birthYear",
  gate: "gate",
  who: "who",
  count: "count",
  name: "name",
  year: "year",
  look: "look",
  subjects: "subjects",
  summary: "summary",
  account: "account",
  code: "code",
  handover: "handover",
});

const LEARNER_STEPS = [STEP.name, STEP.year, STEP.look, STEP.subjects];

/** The four dots along the top. */
export const STAGES = ["you", "learners", "check", "account"];

export function emptyDraft() {
  return {
    v: DRAFT_VERSION,
    birthYear: null,
    ageBand: null,
    learnFor: null,
    learners: [],
    email: "",
    cursor: { step: STEP.birthYear },
    returnTo: null,
  };
}

/** `yearGroup` and `subjects` are deliberately absent: absent means "not answered". */
export function blankLearner() {
  return { name: "", avatar: null, colour: null };
}

/* ---------- facts ---------- */

/** Counted at the youngest the person could be, since the birthday is unknown. */
export function ageBandForBirthYear(birthYear, currentYear) {
  const age = currentYear - birthYear - 1;
  if (age < 13) return GATED;
  if (age <= 15) return "13-15";
  if (age <= 17) return "16-17";
  return "18+";
}

export function birthYearOptions(currentYear) {
  const years = [];
  for (let year = currentYear - 3; year >= currentYear - 100; year--) years.push(year);
  return years;
}

export function subjectsForYear(yearGroup) {
  if (yearGroup === null || yearGroup === undefined) return [];
  return CURRICULUM_SUBJECTS.filter((subject) => isCurriculumAvailable(yearGroup, subject.id)).map(
    (subject) => subject.id
  );
}

/* ---------- draft updates: each returns a new draft ---------- */

export function withLearnFor(draft, learnFor) {
  if (learnFor === "me") return { ...draft, learnFor, learners: [draft.learners[0] ?? blankLearner()] };
  if (learnFor === "children") return { ...draft, learnFor };
  return { ...draft, learnFor: null, learners: [] };
}

export function withBirthYear(draft, birthYear, currentYear) {
  const ageBand = ageBandForBirthYear(birthYear, currentYear);
  const learnFor = ageBand === GATED ? null : ageBand === "18+" ? draft.learnFor : "me";
  return withLearnFor({ ...draft, birthYear, ageBand }, learnFor);
}

export function withCount(draft, count) {
  const n = Math.max(1, Math.min(MAX_CHILDREN_PER_SIGNUP, Math.floor(count) || 1));
  return { ...draft, learners: Array.from({ length: n }, (_, i) => draft.learners[i] ?? blankLearner()) };
}

export function withLearner(draft, index, patch) {
  const learners = draft.learners.map((learner, i) => {
    if (i !== index) return learner;
    const next = { ...learner, ...patch };
    // A new year can take subjects away (Year 3 Science → Year 2 has none).
    if ("yearGroup" in patch && Array.isArray(next.subjects)) {
      const allowed = subjectsForYear(next.yearGroup);
      next.subjects = next.subjects.filter((id) => allowed.includes(id));
    }
    if (next.subjects === undefined) delete next.subjects;
    return next;
  });
  return { ...draft, learners };
}

export function toggleSubject(subjects, id) {
  if (id === EXPLORING) return [];
  const current = Array.isArray(subjects) ? subjects : [];
  const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id];
  return next.length > 0 ? next : undefined;
}

export function editLearner(draft, index) {
  return { ...draft, cursor: { step: STEP.name, index }, returnTo: STEP.summary };
}

export function addLearner(draft) {
  if (draft.learnFor !== "children" || draft.learners.length >= MAX_CHILDREN_PER_SIGNUP) return draft;
  const learners = [...draft.learners, blankLearner()];
  return { ...draft, learners, cursor: { step: STEP.name, index: learners.length - 1 }, returnTo: STEP.summary };
}

/* ---------- the sequence ---------- */

export function stepsFor(draft) {
  const steps = [{ step: STEP.birthYear }];
  if (!draft.ageBand || draft.ageBand === GATED) return steps;
  if (draft.ageBand === "18+") steps.push({ step: STEP.who });
  if (!draft.learnFor) return steps;
  if (draft.learnFor === "children") steps.push({ step: STEP.count });
  if (draft.learners.length === 0) return steps;
  draft.learners.forEach((learner, index) => {
    for (const step of LEARNER_STEPS) {
      if (step === STEP.subjects && subjectsForYear(learner.yearGroup).length === 0) continue;
      steps.push({ step, index });
    }
  });
  steps.push({ step: STEP.summary }, { step: STEP.account }, { step: STEP.code });
  return steps;
}

export function sameCursor(a, b) {
  return Boolean(a && b) && a.step === b.step && (a.index ?? null) === (b.index ?? null);
}

export function nextCursor(draft, cursor) {
  if (cursor.step === STEP.birthYear && draft.ageBand === GATED) return { step: STEP.gate };
  const steps = stepsFor(draft);
  const at = steps.findIndex((c) => sameCursor(c, cursor));
  if (at === -1) return null;
  const next = steps[at + 1] ?? null;
  // Editing one learner from the summary goes back to the summary, not on to the next learner.
  if (draft.returnTo === STEP.summary && cursor.index !== undefined && next && next.index !== cursor.index) {
    return { step: STEP.summary };
  }
  return next;
}

export function prevCursor(draft, cursor) {
  if (cursor.step === STEP.gate) return { step: STEP.birthYear };
  if (draft.returnTo === STEP.summary && cursor.step === STEP.name) return { step: STEP.summary };
  const steps = stepsFor(draft);
  const at = steps.findIndex((c) => sameCursor(c, cursor));
  return at > 0 ? steps[at - 1] : null;
}

export function stageOf(cursor) {
  switch (cursor.step) {
    case STEP.birthYear:
    case STEP.gate:
    case STEP.who:
    case STEP.count:
      return 0;
    case STEP.name:
    case STEP.year:
    case STEP.look:
    case STEP.subjects:
      return 1;
    case STEP.summary:
      return 2;
    default:
      return 3;
  }
}

/* ---------- validation ---------- */

/** @returns {string|null} what is missing on this step, or null when it is answered */
export function stepError(draft, cursor) {
  const learner = cursor.index !== undefined ? draft.learners[cursor.index] : null;
  switch (cursor.step) {
    case STEP.birthYear:
      return draft.ageBand ? null : "CHOOSE_ONE";
    case STEP.who:
      return draft.learnFor ? null : "CHOOSE_ONE";
    case STEP.count:
      return draft.learners.length > 0 ? null : "CHOOSE_ONE";
    case STEP.name: {
      const name = String(learner?.name ?? "").trim();
      if (!name) return "NAME_REQUIRED";
      return [...name].length > CHILD_NAME_MAX ? "NAME_TOO_LONG" : null;
    }
    case STEP.year:
      return learner && learner.yearGroup !== undefined ? null : "CHOOSE_ONE";
    case STEP.look:
      return learner?.avatar && learner?.colour ? null : "CHOOSE_LOOK";
    case STEP.subjects:
      return Array.isArray(learner?.subjects) ? null : "CHOOSE_ONE";
    default:
      return null;
  }
}

/** Every step before the summary is answered. */
export function isDraftReady(draft) {
  const steps = stepsFor(draft);
  const summary = steps.findIndex((c) => c.step === STEP.summary);
  return summary > 0 && steps.slice(0, summary).every((c) => stepError(draft, c) === null);
}

export function accountErrors({ email, password, confirm }) {
  const errors = {};
  if (!isEmailShaped(email)) errors.email = "EMAIL_INVALID";
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) errors.password = "PASSWORD_TOO_SHORT";
  else if (password !== confirm) errors.confirm = "PASSWORD_MISMATCH";
  return errors;
}

/* ---------- leaving the browser ---------- */

/** The body for POST /api/auth/signup/complete. The birth year is not in it. */
export function signupBody(draft, { password, code }) {
  const learner = draft.learnFor === "me";
  return {
    email: normaliseEmail(draft.email),
    password,
    ...(code ? { code } : {}),
    accountType: learner ? ACCOUNT_LEARNER : ACCOUNT_PARENT,
    ageBand: learner ? draft.ageBand : null,
    children: draft.learners.map((l) => ({
      name: String(l.name ?? "").trim(),
      avatar: l.avatar ?? null,
      colour: l.colour ?? null,
      yearGroup: l.yearGroup ?? null,
      subjects: Array.isArray(l.subjects) ? l.subjects : [],
    })),
  };
}

export function destinationFor(child) {
  const year = child?.yearGroup ?? null;
  const subjects = Array.isArray(child?.subjects) ? child.subjects : [];
  const first = year === null ? undefined : subjects.find((id) => isCurriculumAvailable(year, id));
  return first ? `/curriculum/year/${year}/${first}` : "/";
}

export function parseCode(text) {
  return String(text ?? "").replace(/\D/g, "").slice(0, 6);
}

/* ---------- the saved draft ---------- */

export function serialiseDraft(draft) {
  return JSON.stringify(draft);
}

function cleanLearner(raw) {
  const learner = { name: raw.name, avatar: typeof raw.avatar === "string" ? raw.avatar : null, colour: typeof raw.colour === "string" ? raw.colour : null };
  if (raw.yearGroup === null || Number.isInteger(raw.yearGroup)) learner.yearGroup = raw.yearGroup;
  if (Array.isArray(raw.subjects) && raw.subjects.every((id) => typeof id === "string")) learner.subjects = raw.subjects;
  return learner;
}

/**
 * Reads a saved draft. Anything unexpected → null (start again) rather than a
 * half-trusted draft. A cursor that cannot be shown is moved somewhere safe.
 */
export function parseDraft(raw) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object" || Array.isArray(data) || data.v !== DRAFT_VERSION) return null;
  if (!Array.isArray(data.learners) || data.learners.length > MAX_CHILDREN_PER_SIGNUP) return null;
  if (data.learners.some((l) => !l || typeof l !== "object" || typeof l.name !== "string")) return null;
  if (![null, "me", "children"].includes(data.learnFor ?? null)) return null;
  if (data.ageBand !== null && data.ageBand !== GATED && !AGE_BANDS.includes(data.ageBand)) return null;
  if (!data.cursor || !Object.values(STEP).includes(data.cursor.step)) return null;

  const draft = {
    ...emptyDraft(),
    birthYear: Number.isInteger(data.birthYear) ? data.birthYear : null,
    ageBand: data.ageBand ?? null,
    learnFor: data.learnFor ?? null,
    learners: data.learners.map(cleanLearner),
    email: typeof data.email === "string" ? data.email : "",
    returnTo: data.returnTo === STEP.summary ? STEP.summary : null,
  };
  const cursor = { step: data.cursor.step, ...(Number.isInteger(data.cursor.index) ? { index: data.cursor.index } : {}) };

  if (cursor.step === STEP.code || cursor.step === STEP.handover) {
    draft.cursor = { step: STEP.account };
  } else if (cursor.step === STEP.gate || stepsFor(draft).some((c) => sameCursor(c, cursor))) {
    draft.cursor = cursor;
  } else {
    draft.cursor = stepsFor(draft).find((c) => stepError(draft, c) !== null) ?? { step: STEP.birthYear };
  }
  return draft;
}
```

`src/data/signupCopy.js`:
```js
/** Everything Bix and the sign-up screens say. Kept apart so it can be read and tested in one place. */
import { maskEmail } from "../../shared/emailAddress.js";
import { STEP } from "./signupFlow.js";

const SUBJECT_CHEERS = {
  math: "Numbers are my favourite!",
  english: "I love stories!",
  science: "Ooh, I love magnets!",
  geography: "Let's explore the world!",
};

function learnerOf(draft, cursor) {
  return cursor.index !== undefined ? draft.learners[cursor.index] : null;
}

export function bixLine(draft, cursor) {
  const learner = learnerOf(draft, cursor);
  const name = String(learner?.name ?? "").trim();
  const me = draft.learnFor === "me";
  switch (cursor.step) {
    case STEP.birthYear: return "Hi! I'm Bix. Let's get you set up!";
    case STEP.gate: return "You'll need a grown-up for this bit!";
    case STEP.who: return "Who am I going to meet?";
    case STEP.count: return "How many friends will I make?";
    case STEP.name: return name ? `Hi ${name}! 👋` : "A nickname is fine!";
    case STEP.year: return me ? "We can always change it later." : `Which class is ${name} in?`;
    case STEP.look: return learner?.avatar ? "Ooh, good choice!" : "Pick your favourites!";
    case STEP.subjects: return SUBJECT_CHEERS[learner?.subjects?.at(-1)] ?? "Pick as many as you like!";
    case STEP.summary: return me ? "Looking good!" : "Look at your crew!";
    case STEP.account: return "Nearly there!";
    case STEP.code: return `I sent a code to ${maskEmail(draft.email)}`;
    default: return "Let's go!";
  }
}

export function stepTitle(draft, cursor) {
  const learner = learnerOf(draft, cursor);
  const name = String(learner?.name ?? "").trim();
  const me = draft.learnFor === "me";
  switch (cursor.step) {
    case STEP.birthYear: return "What year were you born?";
    case STEP.gate: return "Ask a grown-up";
    case STEP.who: return "Who's going to learn?";
    case STEP.count: return "How many children?";
    case STEP.name: return me ? "What should Bix call you?" : "What should Bix call them?";
    case STEP.year: return me ? "Which year's work would you like?" : `Which school year is ${name} in?`;
    case STEP.look: return "Pick a picture and a colour";
    case STEP.subjects: return me ? "What would you like to do?" : `What would ${name} like to do?`;
    case STEP.summary: return me ? "All about you" : "Your family";
    case STEP.account: return "Your email and a password";
    case STEP.code: return "Check your email";
    default: return "Ready!";
  }
}

export const ERROR_MESSAGES = {
  CHOOSE_ONE: "Pick one to carry on.",
  CHOOSE_LOOK: "Pick a picture and a colour.",
  NAME_REQUIRED: "Type a name first! ✏️",
  NAME_TOO_LONG: "That's a long one! Try 20 letters or fewer.",
  EMAIL_INVALID: "That email doesn't look quite right.",
  EMAIL_REQUIRED: "Type your email address.",
  EMAIL_TAKEN: "That email already has an account.",
  PASSWORD_TOO_SHORT: "At least 8 characters, please.",
  PASSWORD_MISMATCH: "Those passwords don't match.",
  CODE_RECENTLY_SENT: "I've just sent one — give it a moment.",
  TOO_MANY_CODES: "Let's take a break — try again in a little while.",
  TOO_MANY_ATTEMPTS: "Let's take a break — try again in a little while.",
  EMAIL_SEND_FAILED: "I couldn't send the email. Try again?",
  CODE_INCORRECT: "Hmm, let's try that again.",
  CODE_EXPIRED: "That code has run out. Let's send a new one.",
  CODE_ATTEMPTS_EXCEEDED: "Too many tries — let's send a fresh code.",
  NETWORK_ERROR: "I can't reach the internet. Try again?",
  SIGNUP_FAILED: "Something went wrong — nothing was saved. Try again?",
};

export function errorMessage(code, details = {}) {
  if (code === "CODE_INCORRECT" && Number.isInteger(details?.attemptsLeft)) {
    const n = details.attemptsLeft;
    return `Hmm, let's try that again — ${n} ${n === 1 ? "try" : "tries"} left.`;
  }
  if ((code === "TOO_MANY_CODES" || code === "TOO_MANY_ATTEMPTS") && details?.retryAfterSeconds > 0) {
    const minutes = Math.ceil(details.retryAfterSeconds / 60);
    return `Let's take a break — try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`;
  }
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.SIGNUP_FAILED;
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS. If `subjectsForYear(3)` differs because the registry has changed since 2026-10-07, update the expected list from `curriculumRegistry.js`, not the code.

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/data/passwordStrength.js src/data/passwordStrength.test.js src/data/signupFlow.js src/data/signupFlow.test.js src/data/signupCopy.js src/data/signupCopy.test.js src/pages/auth/SignUp.jsx
git commit -m "feat(signup): the flow as pure logic — steps, skips, age bands, draft, request body, Bix's lines"
```

---

### Task 3: Codes and the mailer (server, pure)

**Files:**
- Create: `server/signupCodes.js` (+ `.test.js`), `server/email.js` (+ `.test.js`)

**Interfaces:**
- Produces (`signupCodes.js`): `CODE_TTL_MS = 600000`, `RESEND_MS = 30000`, `SEND_WINDOW_MS = 3600000`, `MAX_SENDS = 5`, `MAX_ATTEMPTS = 5`, `generateCode(randomInt?)`, `hashCode(email, code, secret)`, `codeMatches(storedHash, email, code, secret)`, `sendDecision(record|null, now) → {ok:true, sendCount, sendWindowStart} | {ok:false, error, retryAt}` (all times in ms).
- Produces (`email.js`): `emailMode(env) → "send"|"log"|"off"`, `signupCodeEmail(code) → {subject, text, html}`, `createMailer({mode, apiKey, from, fetch?, log?}) → {verification: "on"|"off", sendSignupCode(email, code)}`, `createMailerFromEnv(env?)`.

- [ ] **Step 1: Write the failing tests**

`server/signupCodes.test.js`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { MAX_SENDS, RESEND_MS, SEND_WINDOW_MS, codeMatches, generateCode, hashCode, sendDecision } from "./signupCodes.js";

test("codes are six digits, zero-padded", () => {
  assert.equal(generateCode(() => 42), "000042");
  assert.match(generateCode(), /^\d{6}$/);
});

test("hashes depend on the email, the code and the secret", () => {
  const h = hashCode("a@b.co", "123456", "s");
  assert.notEqual(h, hashCode("c@d.co", "123456", "s"));
  assert.notEqual(h, hashCode("a@b.co", "123457", "s"));
  assert.notEqual(h, hashCode("a@b.co", "123456", "t"));
  assert.equal(h.includes("123456"), false);
});

test("codeMatches is strict about shape and value", () => {
  const h = hashCode("a@b.co", "123456", "s");
  assert.equal(codeMatches(h, "a@b.co", "123456", "s"), true);
  assert.equal(codeMatches(h, "a@b.co", "654321", "s"), false);
  for (const junk of ["", "12345", "1234567", "12345a", null, undefined]) assert.equal(codeMatches(h, "a@b.co", junk, "s"), false);
  assert.equal(codeMatches(null, "a@b.co", "123456", "s"), false);
});

test("send decisions: first, too soon, capped, window over", () => {
  const t = 1_000_000;
  assert.deepEqual(sendDecision(null, t), { ok: true, sendCount: 1, sendWindowStart: t });
  const sent = { lastSentAt: t, sendWindowStart: t, sendCount: 1 };
  assert.deepEqual(sendDecision(sent, t + 5_000), { ok: false, error: "CODE_RECENTLY_SENT", retryAt: t + RESEND_MS });
  assert.deepEqual(sendDecision(sent, t + RESEND_MS), { ok: true, sendCount: 2, sendWindowStart: t });
  const capped = { lastSentAt: t + 200_000, sendWindowStart: t, sendCount: MAX_SENDS };
  assert.deepEqual(sendDecision(capped, t + 300_000), { ok: false, error: "TOO_MANY_CODES", retryAt: t + SEND_WINDOW_MS });
  assert.deepEqual(sendDecision(capped, t + SEND_WINDOW_MS), { ok: true, sendCount: 1, sendWindowStart: t + SEND_WINDOW_MS });
});
```

`server/email.test.js`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { createMailer, emailMode, signupCodeEmail } from "./email.js";

test("mode needs both settings to send, and is never 'log' in production", () => {
  assert.equal(emailMode({ RESEND_API_KEY: "k", EMAIL_FROM: "f" }), "send");
  assert.equal(emailMode({ RESEND_API_KEY: "k", EMAIL_FROM: "f", NODE_ENV: "production" }), "send");
  assert.equal(emailMode({}), "log");
  assert.equal(emailMode({ NODE_ENV: "production" }), "off");
  assert.equal(emailMode({ RESEND_API_KEY: "k" }), "off");
  assert.equal(emailMode({ EMAIL_FROM: "f" }), "off");
});

test("the email carries the code in the subject, text and html", () => {
  const { subject, text, html } = signupCodeEmail("482913");
  assert.equal(subject, "Your Dynamic Learning code: 482913");
  assert.match(text, /482913/);
  assert.match(text, /10 minutes/);
  assert.match(html, /482913/);
  assert.equal(/<img/i.test(html), false, "no images to host or block");
});

test("send mode posts to Resend", async () => {
  const calls = [];
  const mailer = createMailer({
    mode: "send", apiKey: "re_123", from: "Bix <hello@example.com>",
    fetch: async (url, init) => { calls.push({ url, init }); return { ok: true, status: 200 }; },
  });
  assert.equal(mailer.verification, "on");
  await mailer.sendSignupCode("a@b.co", "482913");
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers.Authorization, "Bearer re_123");
  const body = JSON.parse(calls[0].init.body);
  assert.deepEqual(body.to, ["a@b.co"]);
  assert.equal(body.from, "Bix <hello@example.com>");
  assert.match(body.subject, /482913/);
});

test("a Resend error is thrown, not swallowed", async () => {
  const mailer = createMailer({ mode: "send", apiKey: "k", from: "f", fetch: async () => ({ ok: false, status: 403 }) });
  await assert.rejects(mailer.sendSignupCode("a@b.co", "482913"), /EMAIL_SEND_FAILED:403/);
});

test("log mode prints a masked address and the code", async () => {
  const lines = [];
  const mailer = createMailer({ mode: "log", log: (line) => lines.push(line) });
  assert.equal(mailer.verification, "on");
  await mailer.sendSignupCode("maya@gmail.com", "482913");
  assert.deepEqual(lines, ["[email] signup code for m…@gmail.com: 482913"]);
});

test("off mode turns verification off and never sends", async () => {
  const mailer = createMailer({ mode: "off" });
  assert.equal(mailer.verification, "off");
  await assert.rejects(mailer.sendSignupCode("a@b.co", "1"), /EMAIL_DISABLED/);
});
```

- [ ] **Step 2: Run to see them fail**

Run: `node --test server/signupCodes.test.js server/email.test.js`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement**

`server/signupCodes.js`:
```js
/**
 * Six-digit sign-up codes: made, hashed, compared, and rate-limited. Pure apart
 * from crypto, so the rules are tested without a database. Times are ms.
 */
import crypto from "node:crypto";

export const CODE_TTL_MS = 10 * 60_000;
export const RESEND_MS = 30_000;
export const SEND_WINDOW_MS = 60 * 60_000;
export const MAX_SENDS = 5;
export const MAX_ATTEMPTS = 5;

export function generateCode(randomInt = crypto.randomInt) {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/** Keyed on the email too, so one stored hash can never verify another address. */
export function hashCode(email, code, secret) {
  return crypto.createHmac("sha256", secret).update(`${email}:${code}`).digest("hex");
}

export function codeMatches(storedHash, email, code, secret) {
  if (typeof storedHash !== "string" || !/^\d{6}$/.test(String(code ?? ""))) return false;
  const stored = Buffer.from(storedHash, "hex");
  const given = Buffer.from(hashCode(email, String(code), secret), "hex");
  return stored.length === given.length && crypto.timingSafeEqual(stored, given);
}

/**
 * May we send another code? `record` is the pending sign-up's send history in
 * ms, or null for a first send.
 */
export function sendDecision(record, now) {
  if (!record) return { ok: true, sendCount: 1, sendWindowStart: now };
  if (now - record.lastSentAt < RESEND_MS) {
    return { ok: false, error: "CODE_RECENTLY_SENT", retryAt: record.lastSentAt + RESEND_MS };
  }
  const windowOpen = now - record.sendWindowStart < SEND_WINDOW_MS;
  if (!windowOpen) return { ok: true, sendCount: 1, sendWindowStart: now };
  if (record.sendCount >= MAX_SENDS) {
    return { ok: false, error: "TOO_MANY_CODES", retryAt: record.sendWindowStart + SEND_WINDOW_MS };
  }
  return { ok: true, sendCount: record.sendCount + 1, sendWindowStart: record.sendWindowStart };
}
```

`server/email.js`:
```js
/**
 * Outgoing email. One job today: the sign-up code. Password reset (#3) will
 * add a second message here.
 *
 * Modes (PROJECT_KNOWLEDGE §6 item 17):
 *   send — RESEND_API_KEY and EMAIL_FROM both set: Resend's HTTP API.
 *   log  — neither set, not production: the code is printed to the terminal.
 *   off  — anything else: verification is skipped and accounts are stored
 *          with emailVerified: false.
 */
import { maskEmail } from "../shared/emailAddress.js";

const RESEND_URL = "https://api.resend.com/emails";

export function emailMode(env) {
  const hasKey = Boolean(env.RESEND_API_KEY);
  const hasFrom = Boolean(env.EMAIL_FROM);
  if (hasKey && hasFrom) return "send";
  if (!hasKey && !hasFrom && env.NODE_ENV !== "production") return "log";
  return "off";
}

export function signupCodeEmail(code) {
  const subject = `Your Dynamic Learning code: ${code}`;
  const text = [
    "Bix says hi! 👋",
    "",
    `Here's your code: ${code}`,
    "",
    "It works for 10 minutes.",
    "If you didn't ask for this, you can ignore this email.",
  ].join("\n");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;font-family:system-ui,sans-serif;background:#F6E8EA;color:#22181C">
<div style="max-width:420px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px;text-align:center">
<p style="font-size:18px;margin:0 0 8px">Bix says hi! 👋</p>
<p style="margin:0 0 16px">Here's your code</p>
<p style="font-size:36px;font-weight:700;letter-spacing:8px;margin:0 0 16px">${code}</p>
<p style="margin:0 0 8px">It works for 10 minutes.</p>
<p style="font-size:13px;color:#5c5157;margin:0">If you didn't ask for this, you can ignore this email.</p>
</div></body></html>`;
  return { subject, text, html };
}

export function createMailer({ mode, apiKey, from, fetch = globalThis.fetch, log = console.log }) {
  return {
    verification: mode === "off" ? "off" : "on",
    async sendSignupCode(email, code) {
      if (mode === "log") {
        log(`[email] signup code for ${maskEmail(email)}: ${code}`);
        return;
      }
      if (mode !== "send") throw new Error("EMAIL_DISABLED");
      const message = signupCodeEmail(code);
      const response = await fetch(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [email], ...message }),
      });
      if (!response.ok) throw new Error(`EMAIL_SEND_FAILED:${response.status}`);
    },
  };
}

export function createMailerFromEnv(env = process.env) {
  const mode = emailMode(env);
  if (mode === "off" && (env.RESEND_API_KEY || env.EMAIL_FROM)) {
    console.warn("[email] RESEND_API_KEY and EMAIL_FROM must both be set — email verification is OFF.");
  }
  return createMailer({ mode, apiKey: env.RESEND_API_KEY, from: env.EMAIL_FROM });
}
```
(The colours in the email HTML are literals on purpose: email clients do not support CSS custom properties. They are the `--light-bg`, `--light-text` and `--map-muted` values.)

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add server/signupCodes.js server/signupCodes.test.js server/email.js server/email.test.js
git commit -m "feat(signup): six-digit codes (hashed, rate-limited) and a Resend mailer with log/off modes"
```

---

### Task 4: `pendingSignups` and `POST /api/auth/signup/code`

**Files:**
- Modify: `server/db.js`, `server/index.js`, `server/app.js`, `server/routes/auth.js`
- Create: `server/accounts.js`, `server/childDoc.js`, `server/routes/signup.js`, `server/signup.test.js`

**Interfaces:**
- Consumes: Task 1 (`normaliseEmail`, `isEmailShaped`), Task 3 (codes, mailer).
- Produces: `db.pendingSignups()`, `db.ensureIndexes()`; `createParentAccount({email, password, account, verification?}) → parent doc with _id` (throws `EMAIL_TAKEN`); `newChildDoc(parentId, child) → doc`; `createSignupRouter({ mailer, now?, secret?, insertChildren? })`; `createApp({ serveStatic, signup: { mailer?, now?, insertChildren? } })`.

- [ ] **Step 1: Write the failing tests**

`server/signup.test.js` (Task 5 appends to it):
```js
/**
 * Sign-up with a code. Needs a live MongoDB; skips cleanly without
 * MONGODB_URI. Uses a throwaway database, dropped afterwards.
 */
import test from "node:test";
import assert from "node:assert/strict";

const URI = process.env.MONGODB_URI;
const TEST_DB = `dl_test_signup_${process.pid}`;

test("sign-up with a code", { skip: URI ? false : "MONGODB_URI not set" }, async (t) => {
  process.env.SESSION_SECRET ||= "test-secret-not-a-real-one";
  const db = await import("./db.js");
  const { createApp } = await import("./app.js");
  const database = await db.connect(URI, TEST_DB);
  await db.ensureIndexes();
  const servers = [];
  t.after(async () => {
    for (const server of servers) server.close();
    await database.dropDatabase();
    await db.close();
  });

  /** Starts an app; returns a factory of cookie-keeping "browsers". */
  async function start(signup) {
    const server = createApp({ serveStatic: false, signup }).listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    servers.push(server);
    const base = `http://127.0.0.1:${server.address().port}`;
    return () => {
      let cookie = "";
      return async (method, path, body) => {
        const res = await fetch(base + path, {
          method,
          headers: { ...(body ? { "content-type": "application/json" } : {}), ...(cookie ? { cookie } : {}) },
          body: body ? JSON.stringify(body) : undefined,
        });
        const setCookie = res.headers.get("set-cookie");
        if (setCookie) cookie = setCookie.split(";")[0];
        const text = await res.text();
        return { status: res.status, body: text ? JSON.parse(text) : null, retryAfter: res.headers.get("retry-after"), cookie };
      };
    };
  }

  function fakeMailer(verification = "on") {
    const sent = [];
    return { verification, sent, async sendSignupCode(email, code) { sent.push({ email, code }); } };
  }

  let clock = Date.parse("2026-10-07T09:00:00Z");
  const now = () => clock;
  const mailer = fakeMailer();
  const browser = await start({ mailer, now });
  const lastCode = (email) => mailer.sent.filter((m) => m.email === email).at(-1)?.code;
  const family = (email) => ({
    email,
    password: "password-1",
    accountType: "parent",
    children: [
      { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] },
      { name: "Leo", avatar: "🐼", colour: "--profile-colour-mint", yearGroup: 3, subjects: [] },
    ],
  });

  await t.test("a code is sent and stored only as a hash", async () => {
    const res = await browser()("POST", "/api/auth/signup/code", { email: "  Maya.Parent@Example.com " });
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { verification: "on", expiresInSeconds: 600, resendInSeconds: 30 });
    const code = lastCode("maya.parent@example.com");
    assert.match(code, /^\d{6}$/);
    const record = await database.collection("pendingSignups").findOne({ email: "maya.parent@example.com" });
    assert.ok(record.codeHash);
    assert.equal(JSON.stringify(record).includes(code), false);
    assert.equal(record.attempts, 0);
  });

  await t.test("bad emails are refused", async () => {
    assert.deepEqual((await browser()("POST", "/api/auth/signup/code", {})).body, { error: "EMAIL_REQUIRED" });
    assert.deepEqual((await browser()("POST", "/api/auth/signup/code", { email: "maya@gmail" })).body, { error: "EMAIL_INVALID" });
  });

  await t.test("resend waits 30 seconds, then at most five an hour", async () => {
    const b = browser();
    const email = "resend@example.com";
    assert.equal((await b("POST", "/api/auth/signup/code", { email })).status, 200);
    const early = await b("POST", "/api/auth/signup/code", { email });
    assert.equal(early.status, 429);
    assert.equal(early.body.error, "CODE_RECENTLY_SENT");
    assert.equal(early.retryAfter, "30");
    for (let i = 0; i < 4; i++) {
      clock += 31_000;
      assert.equal((await b("POST", "/api/auth/signup/code", { email })).status, 200);
    }
    clock += 31_000;
    const capped = await b("POST", "/api/auth/signup/code", { email });
    assert.equal(capped.status, 429);
    assert.equal(capped.body.error, "TOO_MANY_CODES");
    assert.ok(capped.body.retryAfterSeconds > 0);
    clock += 60 * 60_000;
    assert.equal((await b("POST", "/api/auth/signup/code", { email })).status, 200, "a new hour, a new allowance");
  });

  await t.test("a failed send leaves no code that can be redeemed", async () => {
    const broken = await start({ mailer: { verification: "on", async sendSignupCode() { throw new Error("boom"); } }, now });
    const res = await broken()("POST", "/api/auth/signup/code", { email: "bounce@example.com" });
    assert.equal(res.status, 502);
    assert.deepEqual(res.body, { error: "EMAIL_SEND_FAILED" });
    const record = await database.collection("pendingSignups").findOne({ email: "bounce@example.com" });
    assert.equal(record.codeHash, null);
  });

  await t.test("with email off, the code route says so and stores nothing", async () => {
    const off = await start({ mailer: fakeMailer("off"), now });
    assert.deepEqual((await off()("POST", "/api/auth/signup/code", { email: "nomail@example.com" })).body, { verification: "off" });
    assert.equal(await database.collection("pendingSignups").countDocuments({ email: "nomail@example.com" }), 0);
  });

  // Task 5 adds the /complete tests below this line, inside this test().
});
```

- [ ] **Step 2: Run to see them fail**

Run: `node --env-file-if-exists=.env --test server/signup.test.js`
Expected: FAIL — `db.ensureIndexes is not a function` (or 404s). If it reports "skipped", `.env` has no `MONGODB_URI`: set one (any local or Atlas test cluster) before going on — these tests must run.

- [ ] **Step 3: Implement**

`server/db.js` — append:
```js
export const pendingSignups = () => getDb().collection("pendingSignups");

/**
 * Indexes the app relies on. Idempotent; called at boot and by tests.
 * pendingSignups: one record per email, and Mongo deletes each one at `purgeAt`.
 */
export async function ensureIndexes() {
  await pendingSignups().createIndex({ email: 1 }, { unique: true });
  await pendingSignups().createIndex({ purgeAt: 1 }, { expireAfterSeconds: 0 });
}
```
`server/index.js` — after the successful `db.connect(...)` log line, inside the same `try`:
```js
  await db.ensureIndexes();
```

`server/accounts.js`:
```js
/** Creating a grown-up's or a learner's account — shared by the sign-up routes. */
import * as db from "./db.js";
import { hashPassword } from "./auth.js";

/**
 * @param {object} args
 * @param {string} args.email     already normalised
 * @param {string} args.password
 * @param {{accountType: string, ageBand: string|null}} args.account  from normaliseAccountFields
 * @param {{verified: boolean}} [args.verification]  omitted by the old route: no field written
 * @throws {Error} EMAIL_TAKEN
 */
export async function createParentAccount({ email, password, account, verification }) {
  if (await db.parents().findOne({ email })) throw new Error("EMAIL_TAKEN");

  const { hash, salt, iterations } = await hashPassword(password);
  const createdAt = new Date().toISOString();
  const parent = {
    email,
    passwordHash: hash,
    passwordSalt: salt,
    iterations,
    accountType: account.accountType,
    ageBand: account.ageBand,
    createdAt,
    ...(verification
      ? { emailVerified: verification.verified, emailVerifiedAt: verification.verified ? createdAt : null }
      : {}),
  };
  const { insertedId } = await db.parents().insertOne(parent);

  // The `email` index is NOT unique, so two concurrent sign-ups can both pass
  // the check above. The later insert deletes itself.
  const duplicates = await db.parents().find({ email }, { projection: { _id: 1 } }).sort({ _id: 1 }).toArray();
  if (duplicates.length > 1 && !insertedId.equals(duplicates[0]._id)) {
    await db.parents().deleteOne({ _id: insertedId });
    throw new Error("EMAIL_TAKEN");
  }
  return { ...parent, _id: insertedId };
}
```
Then in `server/routes/auth.js` replace the body of `/signup` from `// The \`email\` index is NOT unique` through the `res.cookie(...)` line with:
```js
    let parent;
    try {
      parent = await createParentAccount({ email, password, account });
    } catch (err) {
      if (err.message === "EMAIL_TAKEN") return res.status(409).json({ error: "EMAIL_TAKEN" });
      throw err;
    }

    res.cookie(COOKIE_NAME, signSession(parent._id), cookieOptions());
    return res.status(201).json({ parent: publicParent(parent) });
```
Keep the existing `EMAIL_TAKEN` pre-check above it or remove it (the helper checks); remove `hashPassword` from that file's imports if now unused, and import `createParentAccount` from `"../accounts.js"`. The existing `routes.test.js` sign-up assertions must still pass unchanged.

`server/childDoc.js`:
```js
/** A child document from an already-normalised profile (normaliseNewChildren). */
export function newChildDoc(parentId, child) {
  return {
    parentId,
    name: child.name,
    avatar: child.avatar ?? null,
    colour: child.colour ?? null,
    yearGroup: child.yearGroup ?? null,
    subjects: Array.isArray(child.subjects) ? child.subjects : [],
    createdAt: new Date().toISOString(),
  };
}
```

`server/routes/signup.js`:
```js
/**
 * /api/auth/signup — the question-led sign-up.
 *   POST /code      { email }                     → sends a six-digit code
 *   POST /complete  { email, code?, password, accountType, ageBand, children[] }
 *                   → checks the code, then creates the account and every
 *                     profile in one go, and signs in.
 * Spec: docs/superpowers/specs/2026-10-07-signup-onboarding-design.md §5
 */
import { Router } from "express";
import * as db from "../db.js";
import { createAuthThrottle } from "../authThrottle.js";
import { isEmailShaped, normaliseEmail } from "../../shared/emailAddress.js";
import {
  CODE_TTL_MS,
  RESEND_MS,
  SEND_WINDOW_MS,
  generateCode,
  hashCode,
  sendDecision,
} from "../signupCodes.js";

const toMs = (value) => (value instanceof Date ? value.getTime() : Number(value));
const seconds = (ms) => Math.max(1, Math.ceil(ms / 1000));

export function createSignupRouter({
  mailer,
  now = Date.now,
  secret = () => process.env.SESSION_SECRET,
}) {
  const router = Router();
  const throttle = createAuthThrottle({ now });

  /** Shared first check. Returns the normalised email, or answers 400 and returns null. */
  function readEmail(req, res) {
    const email = normaliseEmail(req.body?.email);
    if (!email) {
      res.status(400).json({ error: "EMAIL_REQUIRED" });
      return null;
    }
    if (!isEmailShaped(email)) {
      res.status(400).json({ error: "EMAIL_INVALID" });
      return null;
    }
    return email;
  }

  router.post("/code", throttle, async (req, res, next) => {
    try {
      const email = readEmail(req, res);
      if (!email) return undefined;
      if (await db.parents().findOne({ email })) return res.status(409).json({ error: "EMAIL_TAKEN" });
      if (mailer.verification === "off") return res.json({ verification: "off" });

      const time = now();
      const record = await db.pendingSignups().findOne({ email });
      const decision = sendDecision(
        record && {
          lastSentAt: toMs(record.lastSentAt),
          sendWindowStart: toMs(record.sendWindowStart),
          sendCount: record.sendCount,
        },
        time
      );
      if (!decision.ok) {
        const retryAfterSeconds = seconds(decision.retryAt - time);
        return res
          .set("Retry-After", String(retryAfterSeconds))
          .status(429)
          .json({ error: decision.error, retryAfterSeconds });
      }

      const code = generateCode();
      await db.pendingSignups().updateOne(
        { email },
        {
          $set: {
            email,
            codeHash: hashCode(email, code, secret()),
            expiresAt: new Date(time + CODE_TTL_MS),
            attempts: 0,
            sendCount: decision.sendCount,
            sendWindowStart: new Date(decision.sendWindowStart),
            lastSentAt: new Date(time),
            purgeAt: new Date(Math.max(decision.sendWindowStart + SEND_WINDOW_MS, time + CODE_TTL_MS)),
          },
        },
        { upsert: true }
      );

      try {
        await mailer.sendSignupCode(email, code);
      } catch (err) {
        console.error("[email] send failed:", err.message);
        // Keep the record (the send still counts) but make it unredeemable.
        await db.pendingSignups().updateOne({ email }, { $set: { codeHash: null } });
        return res.status(502).json({ error: "EMAIL_SEND_FAILED" });
      }

      return res.json({
        verification: "on",
        expiresInSeconds: CODE_TTL_MS / 1000,
        resendInSeconds: RESEND_MS / 1000,
      });
    } catch (err) {
      return next(err);
    }
  });

  // POST /complete is added in Task 5, here.

  return router;
}
```

`server/app.js`:
```js
import { createSignupRouter } from "./routes/signup.js";
import { createMailerFromEnv } from "./email.js";
// …
export function createApp({ serveStatic = process.env.NODE_ENV === "production", signup = {} } = {}) {
  // …
  app.get("/api/health", (req, res) => res.json({ ok: true }));
  // Before /api/auth: this router owns /api/auth/signup/*; anything it does not
  // match (the old POST /api/auth/signup) falls through to authRoutes.
  app.use(
    "/api/auth/signup",
    createSignupRouter({ ...signup, mailer: signup.mailer ?? createMailerFromEnv() })
  );
  app.use("/api/auth", authRoutes);
```

- [ ] **Step 4: Run the tests**

Run: `node --env-file-if-exists=.env --test server/` then `npm test`
Expected: PASS — the five new sub-tests and the existing `routes.test.js` (old `/signup` now through `createParentAccount`).

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add server/db.js server/index.js server/app.js server/accounts.js server/childDoc.js server/routes/auth.js server/routes/signup.js server/signup.test.js
git commit -m "feat(signup): pendingSignups collection and POST /api/auth/signup/code"
```

---

### Task 5: `POST /api/auth/signup/complete`

**Files:**
- Modify: `server/routes/signup.js`, `server/signup.test.js`

**Interfaces:**
- Consumes: Task 1 `normaliseNewChildren`, `MAX_CHILDREN_PER_SIGNUP`; Task 3 `codeMatches`, `MAX_ATTEMPTS`; Task 4 `createParentAccount`, `newChildDoc`, `readEmail`.
- Produces: `201 { parent, children }` + session cookie; errors `EMAIL_REQUIRED | EMAIL_INVALID | PASSWORD_REQUIRED | INVALID_ACCOUNT_TYPE | AGE_BAND_REQUIRED | AGE_BAND_TOO_YOUNG | INVALID_AGE_BAND | INVALID_CHILDREN | NAME_REQUIRED | NAME_TOO_LONG | INVALID_YEAR_GROUP | INVALID_SUBJECTS` (400), `EMAIL_TAKEN` (409), `CODE_EXPIRED | CODE_INCORRECT {attemptsLeft} | CODE_ATTEMPTS_EXCEEDED` (400), `SIGNUP_FAILED` (500).

- [ ] **Step 1: Write the failing tests** — in `server/signup.test.js`, replace the `// Task 5 adds…` comment with:
```js
  await t.test("the right code creates the account and every child in one go", async () => {
    const b = browser();
    const email = "family@example.com";
    await b("POST", "/api/auth/signup/code", { email: "FAMILY@example.com" });
    const res = await b("POST", "/api/auth/signup/complete", { ...family(" Family@Example.com"), code: lastCode(email) });
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.email, email);
    assert.equal(res.body.parent.emailVerified, true);
    assert.ok(res.body.parent.emailVerifiedAt);
    assert.equal(res.body.parent.passwordHash, undefined);
    assert.deepEqual(res.body.children.map((c) => [c.name, c.yearGroup, c.subjects]), [["Maya", 2, ["math"]], ["Leo", 3, []]]);
    assert.ok(res.cookie, "signed in");
    assert.deepEqual((await b("GET", "/api/children")).body.children.map((c) => c.name).sort(), ["Leo", "Maya"]);
    assert.equal((await browser()("POST", "/api/auth/signup/complete", { ...family(email), code: lastCode(email) })).status, 409);
  });

  await t.test("a wrong code counts down, and the fifth locks the code", async () => {
    const b = browser();
    const email = "wrong@example.com";
    await b("POST", "/api/auth/signup/code", { email });
    const right = lastCode(email);
    const wrong = right === "000000" ? "111111" : "000000";
    for (const left of [4, 3, 2, 1]) {
      const res = await b("POST", "/api/auth/signup/complete", { ...family(email), code: wrong });
      assert.equal(res.status, 400);
      assert.deepEqual(res.body, { error: "CODE_INCORRECT", attemptsLeft: left });
    }
    assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), code: wrong })).body, { error: "CODE_ATTEMPTS_EXCEEDED" });
    assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), code: right })).body, { error: "CODE_EXPIRED" });
    assert.equal(await database.collection("parents").countDocuments({ email }), 0);
  });

  await t.test("an expired code is refused", async () => {
    const b = browser();
    const email = "late@example.com";
    await b("POST", "/api/auth/signup/code", { email });
    clock += 10 * 60_000 + 1;
    assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), code: lastCode(email) })).body, { error: "CODE_EXPIRED" });
  });

  await t.test("bad profiles are refused before the code is checked", async () => {
    const b = browser();
    const email = "typo@example.com";
    await b("POST", "/api/auth/signup/code", { email });
    const cases = [
      [[], "INVALID_CHILDREN"],
      [[{ name: "" }], "NAME_REQUIRED"],
      [[{ name: "A", yearGroup: 9 }], "INVALID_YEAR_GROUP"],
      [[{ name: "A", subjects: ["history"] }], "INVALID_SUBJECTS"],
      [Array.from({ length: 7 }, () => ({ name: "A" })), "INVALID_CHILDREN"],
    ];
    for (const [children, error] of cases) {
      assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), children, code: "000000" })).body, { error });
    }
    assert.equal((await database.collection("pendingSignups").findOne({ email })).attempts, 0, "no attempt spent");
  });

  await t.test("a learner account holds exactly one profile, and under-13 is refused", async () => {
    const two = await browser()("POST", "/api/auth/signup/complete", { ...family("teen@example.com"), accountType: "learner", ageBand: "13-15", code: "000000" });
    assert.deepEqual(two.body, { error: "INVALID_CHILDREN" });
    const young = await browser()("POST", "/api/auth/signup/complete", { ...family("kid@example.com"), accountType: "learner", ageBand: "under-13", children: [{ name: "Kid" }], code: "000000" });
    assert.deepEqual(young.body, { error: "AGE_BAND_TOO_YOUNG" });
  });

  await t.test("the same address typed two ways is one sign-up (Review Focus 2)", async () => {
    const b = browser();
    await b("POST", "/api/auth/signup/code", { email: " Mixed.Case@Example.com" });
    const res = await b("POST", "/api/auth/signup/complete", { ...family("mixed.case@example.com"), code: lastCode("mixed.case@example.com") });
    assert.equal(res.status, 201);
  });

  await t.test("two requests racing with one code create one account (Review Focus 5)", async () => {
    const email = "race@example.com";
    await browser()("POST", "/api/auth/signup/code", { email });
    const code = lastCode(email);
    const results = await Promise.all([
      browser()("POST", "/api/auth/signup/complete", { ...family(email), code }),
      browser()("POST", "/api/auth/signup/complete", { ...family(email), code }),
    ]);
    const statuses = results.map((r) => r.status).sort();
    assert.equal(statuses.filter((s) => s === 201).length, 1);
    assert.ok([400, 409].includes(statuses.find((s) => s !== 201)));
    const parent = await database.collection("parents").findOne({ email });
    assert.equal(await database.collection("parents").countDocuments({ email }), 1);
    assert.equal(await database.collection("children").countDocuments({ parentId: parent._id }), 2);
  });

  await t.test("a child that fails to save leaves nothing behind", async () => {
    const failing = await start({ mailer: fakeMailer("off"), now, insertChildren: async () => { throw new Error("disk full"); } });
    const res = await failing()("POST", "/api/auth/signup/complete", family("broken@example.com"));
    assert.equal(res.status, 500);
    assert.deepEqual(res.body, { error: "SIGNUP_FAILED" });
    assert.equal(await database.collection("parents").countDocuments({ email: "broken@example.com" }), 0);
  });

  await t.test("with email off, sign-up completes without a code and says so", async () => {
    const off = await start({ mailer: fakeMailer("off"), now });
    const res = await off()("POST", "/api/auth/signup/complete", family("unverified@example.com"));
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.emailVerified, false);
    assert.equal(res.body.parent.emailVerifiedAt, null);
  });
```

- [ ] **Step 2: Run to see them fail**

Run: `node --env-file-if-exists=.env --test server/signup.test.js`
Expected: FAIL — `/complete` answers 404.

- [ ] **Step 3: Implement** — in `server/routes/signup.js` add imports:
```js
import { COOKIE_NAME, cookieOptions, signSession } from "../auth.js";
import { publicChild, publicParent } from "../serialize.js";
import { ACCOUNT_LEARNER, normaliseAccountFields } from "../../shared/accountTypes.js";
import { MAX_CHILDREN_PER_SIGNUP, normaliseNewChildren } from "../../src/data/childFields.js";
import { createParentAccount } from "../accounts.js";
import { newChildDoc } from "../childDoc.js";
import { MAX_ATTEMPTS, codeMatches } from "../signupCodes.js";
```
(merge `MAX_ATTEMPTS`, `codeMatches` into the existing `../signupCodes.js` import). Add an injectable child insert to the options, so a test can make it fail:
```js
export function createSignupRouter({
  mailer,
  now = Date.now,
  secret = () => process.env.SESSION_SECRET,
  insertChildren = (docs) => db.children().insertMany(docs),
}) {
```
Then replace the `// POST /complete is added in Task 5, here.` comment with:
```js
  router.post("/complete", throttle, async (req, res, next) => {
    try {
      // 1. Everything that can be checked without the code, so a typo in a
      //    profile never spends one of the five attempts.
      const email = readEmail(req, res);
      if (!email) return undefined;
      const password = req.body?.password;
      if (typeof password !== "string" || password.length === 0) {
        return res.status(400).json({ error: "PASSWORD_REQUIRED" });
      }
      let account;
      let children;
      try {
        account = normaliseAccountFields({ accountType: req.body?.accountType, ageBand: req.body?.ageBand });
        children = normaliseNewChildren(req.body?.children, {
          max: account.accountType === ACCOUNT_LEARNER ? 1 : MAX_CHILDREN_PER_SIGNUP,
        });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
      if (await db.parents().findOne({ email })) return res.status(409).json({ error: "EMAIL_TAKEN" });

      // 2. The code.
      let verified = false;
      if (mailer.verification === "on") {
        const record = await db.pendingSignups().findOne({ email });
        if (!record || !record.codeHash || toMs(record.expiresAt) <= now()) {
          return res.status(400).json({ error: "CODE_EXPIRED" });
        }
        if (!codeMatches(record.codeHash, email, req.body?.code, secret())) {
          const counted = await db
            .pendingSignups()
            .findOneAndUpdate({ email, codeHash: record.codeHash }, { $inc: { attempts: 1 } }, { returnDocument: "after" });
          const attempts = counted?.attempts ?? MAX_ATTEMPTS;
          if (attempts >= MAX_ATTEMPTS) {
            // Kept, not deleted, so the hourly send cap still holds.
            await db.pendingSignups().updateOne({ email }, { $set: { codeHash: null } });
            return res.status(400).json({ error: "CODE_ATTEMPTS_EXCEEDED" });
          }
          return res.status(400).json({ error: "CODE_INCORRECT", attemptsLeft: MAX_ATTEMPTS - attempts });
        }
        // Single use, claimed atomically: of two racing requests only one gets it.
        const claimed = await db
          .pendingSignups()
          .findOneAndUpdate({ email, codeHash: record.codeHash }, { $set: { codeHash: null } });
        if (!claimed) return res.status(400).json({ error: "CODE_EXPIRED" });
        verified = true;
      }

      // 3. The account, then every profile; undone together if a profile fails.
      let parent;
      try {
        parent = await createParentAccount({ email, password, account, verification: { verified } });
      } catch (err) {
        if (err.message === "EMAIL_TAKEN") return res.status(409).json({ error: "EMAIL_TAKEN" });
        throw err;
      }

      let docs = children.map((child) => newChildDoc(parent._id, child));
      try {
        const { insertedIds } = await insertChildren(docs);
        docs = docs.map((doc, i) => ({ ...doc, _id: insertedIds[i] }));
      } catch (err) {
        console.error("[signup] a profile failed to save; rolling back:", err.message);
        await db.children().deleteMany({ parentId: parent._id });
        await db.parents().deleteOne({ _id: parent._id });
        return res.status(500).json({ error: "SIGNUP_FAILED" });
      }

      res.cookie(COOKIE_NAME, signSession(parent._id), cookieOptions());
      return res.status(201).json({ parent: publicParent(parent), children: docs.map(publicChild) });
    } catch (err) {
      return next(err);
    }
  });
```

- [ ] **Step 4: Run the tests**

Run: `node --env-file-if-exists=.env --test server/` then `npm test`
Expected: PASS.

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add server/routes/signup.js server/signup.test.js
git commit -m "feat(signup): POST /api/auth/signup/complete — code check, account and profiles in one request, rollback"
```

---

### Task 6: Client data path — stores, `AuthContext`, `track()`

**Files:**
- Modify: `src/data/store/apiStore.js`, `src/data/store/localStorageStore.js`, `src/data/store/localStorageStore.test.js`, `src/context/AuthContext.jsx`
- Create: `src/utils/analytics.js`, `src/utils/analytics.test.js`

**Interfaces:**
- Consumes: Task 1 (`normaliseNewChildren`, `MAX_CHILDREN_PER_SIGNUP`, `isEmailShaped`, `normaliseEmail`).
- Produces: `store.requestSignupCode(email) → {verification, expiresInSeconds?, resendInSeconds?}`; `store.completeSignup(body) → {parent, children}`; thrown errors carry `.message` = code and `.details` = the server's JSON body (API driver); `AuthContext` value gains `requestSignupCode`, `completeSignup`; `track(event, props) → {event, props}|null`.

- [ ] **Step 1: Write the failing tests**

`src/utils/analytics.test.js`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { track } from "./analytics.js";

test("track keeps only allow-listed props, and never personal data", () => {
  assert.deepEqual(track("signup_step_viewed", { step: "name", name: "Maya" }), { event: "signup_step_viewed", props: { step: "name" } });
  assert.deepEqual(track("signup_completed", { learners: 2, verification: "on", email: "a@b.co" }), {
    event: "signup_completed", props: { learners: 2, verification: "on" },
  });
  assert.equal(track("unknown_event", {}), null);
});
```

Append to `src/data/store/localStorageStore.test.js`:
```js
test("completeSignup creates the account and every profile, unverified", async () => {
  reset();
  assert.deepEqual(await store.requestSignupCode("New@Example.com"), { verification: "off" });
  const { parent, children } = await store.completeSignup({
    email: "New@Example.com", password: "password-1", accountType: "parent", ageBand: null,
    children: [{ name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] }, { name: "Leo" }],
  });
  assert.equal(parent.email, "new@example.com");
  assert.equal(parent.emailVerified, false);
  assert.equal(parent.passwordHash, undefined);
  assert.deepEqual(children.map((c) => [c.name, c.subjects]), [["Maya", ["math"]], ["Leo", []]]);
  await assert.rejects(store.requestSignupCode("new@example.com"), /EMAIL_TAKEN/);
  await assert.rejects(store.requestSignupCode("nope"), /EMAIL_INVALID/);
});

test("completeSignup refuses a learner with two profiles and saves nothing", async () => {
  reset();
  await assert.rejects(
    store.completeSignup({ email: "t@x.co", password: "password-1", accountType: "learner", ageBand: "13-15", children: [{ name: "A" }, { name: "B" }] }),
    /INVALID_CHILDREN/
  );
  assert.equal(memory.get("dl.parents") ?? null, null);
});
```

- [ ] **Step 2: Run to see them fail**

Run: `node --test src/utils/analytics.test.js src/data/store/localStorageStore.test.js`
Expected: FAIL.

- [ ] **Step 3: Implement**

`src/utils/analytics.js`:
```js
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
```

`apiStore.js` — let errors carry the server's body. In `class ApiError`'s constructor accept `details` and set `this.details = details ?? null;`; in `request()` change the final throw to `throw new ApiError(code, { status: response.status, details: data });`. Then add to `store`:
```js
  /** Sends a sign-up code, or reports that verification is off. */
  async requestSignupCode(email) {
    const normalised = normaliseEmail(email);
    if (!normalised) throw new ApiError("EMAIL_REQUIRED");
    const { data } = await request("/auth/signup/code", { method: "POST", body: { email: normalised }, expect: [200] });
    return data;
  },

  /** Creates the account and every profile; the server sets the session cookie. */
  async completeSignup(body) {
    const { data } = await request("/auth/signup/complete", { method: "POST", body, expect: [201] });
    return { parent: data?.parent ?? null, children: data?.children ?? [] };
  },
```
(import `normaliseEmail` from `"../../../shared/emailAddress.js"`.)

`localStorageStore.js` — import `isEmailShaped` and `ACCOUNT_LEARNER`, `MAX_CHILDREN_PER_SIGNUP`, `normaliseNewChildren`. Let `createParent` accept `emailVerified`:
```js
  async createParent({ email, password, accountType, ageBand, emailVerified }) {
    // …unchanged…
    const parent = {
      // …unchanged fields…
      createdAt: now(),
      ...(typeof emailVerified === "boolean" ? { emailVerified, emailVerifiedAt: null } : {}),
    };
```
and add:
```js
  /** Browser-only mode has no email: verification is always off. */
  async requestSignupCode(email) {
    const normalised = normaliseEmail(email);
    if (!isEmailShaped(normalised)) throw new Error("EMAIL_INVALID");
    if (readCollection(KEYS.parents).some((p) => normaliseEmail(p.email) === normalised)) {
      throw new Error("EMAIL_TAKEN");
    }
    return { verification: "off" };
  },

  /** Same validation as the server; undoes the account if a profile fails. */
  async completeSignup({ email, password, accountType, ageBand, children }) {
    const account = normaliseAccountFields({ accountType, ageBand });
    const kids = normaliseNewChildren(children, {
      max: account.accountType === ACCOUNT_LEARNER ? 1 : MAX_CHILDREN_PER_SIGNUP,
    });
    const parent = await store.createParent({ email, password, accountType, ageBand, emailVerified: false });
    try {
      const created = [];
      for (const kid of kids) created.push(await store.createChild(parent._id, kid));
      return { parent, children: created };
    } catch (err) {
      writeCollection(KEYS.children, readCollection(KEYS.children).filter((c) => c.parentId !== parent._id));
      writeCollection(KEYS.parents, readCollection(KEYS.parents).filter((p) => p._id !== parent._id));
      throw err;
    }
  },
```

`AuthContext.jsx` — after `signUp`, add:
```js
  /** Step 6 of sign-up. Not stateful: nothing is saved until completeSignup. */
  const requestSignupCode = useCallback((email) => store.requestSignupCode(email), []);

  /**
   * Creates the account and every profile in one request. Signs in, but selects
   * no child: the hand-over screen does, once the device is in the right hands.
   */
  const completeSignup = useCallback(async (body) => {
    setError(null);
    try {
      const result = await store.completeSignup(body);
      if (!aliveRef.current) return result;
      setParent(result.parent);
      setChildProfiles(result.children);
      setChild(null);
      writeSession(result.parent._id, null, result.parent.email);
      writeLastAccount(result.parent, result.children);
      return result;
    } catch (err) {
      if (aliveRef.current) setError(err?.message || "SIGNUP_FAILED");
      throw err;
    }
  }, []);
```
and add `requestSignupCode, completeSignup` to both the `value` object and its dependency array.

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/utils/analytics.js src/utils/analytics.test.js src/data/store/apiStore.js src/data/store/localStorageStore.js src/data/store/localStorageStore.test.js src/context/AuthContext.jsx
git commit -m "feat(signup): requestSignupCode/completeSignup in both stores and AuthContext; no-op track()"
```

---

### Task 7: Building blocks — Bix's mood, pickers, cards, wheel, code boxes

**Files:**
- Modify: `src/components/mascot/Mascot.jsx`, `src/components/mascot/Mascot.css`, `src/pages/auth/ProfileBuilder.jsx`, `src/pages/auth/SignUp.jsx`
- Create: `src/pages/auth/PasswordField.jsx`, `src/pages/auth/ProfilePickers.jsx`, `src/pages/auth/signup/parts/BixGuide.jsx`, `ChoiceCards.jsx`, `YearWheel.jsx`, `CodeInput.jsx`, `FamilyRow.jsx`, `ProgressStars.jsx`, `src/pages/auth/signup/SignUpFlow.css`

**Interfaces:**
- Consumes: Task 2 `parseCode`, `STAGES`.
- Produces: `<Mascot mood="idle"|"puzzled" …>`; `<PasswordField id label value onChange error describedBy hint autoComplete />`; `<AvatarPicker value onChange unlocked? />`, `<ColourPicker value onChange />`; `<BixGuide line mood cheerOn />`; `<ChoiceCards label options value onChoose multiple? />` where `options: {id, title, blurb?, icon?}[]`; `<YearWheel years value onChange labelledBy />`; `<CodeInput value onChange onComplete disabled invalid shakeKey />`; `<FamilyRow learners />`; `<ProgressStars stage />`.

These are presentational; the repo has no component-test framework (PROJECT_IDEAS #2), so each is verified in the browser in Task 11. Their logic (code parsing, subject toggling) is already pure and tested in Task 2.

- [ ] **Step 1: Mascot mood**

`Mascot.jsx`: add `mood = "idle"` to the props and put `is-${mood}` in the root class list:
```jsx
      className={`mascot ${className} is-${mood} ${reacting ? "is-reacting" : ""}`}
```
`Mascot.css` — append:
```css
/* "puzzled": a head tilt for a wrong answer — never red, never a frown. */
.mascot .mascot-face {
  transition: transform 240ms cubic-bezier(0.22, 1.2, 0.36, 1);
}
.mascot.is-puzzled .mascot-face {
  transform: rotate(-12deg) translateY(2%);
}
@media (prefers-reduced-motion: reduce) {
  .mascot .mascot-face { transition: none; }
}
```
(If `.mascot-face` already has a `transform`, combine them in the `.is-puzzled` rule rather than replacing it.)

- [ ] **Step 2: Lift `PasswordField` and the pickers out**

Move the `PasswordField` function from `SignUp.jsx` (lines 59–102, with its comment) verbatim into `src/pages/auth/PasswordField.jsx`, add `import { useState } from "react";` and `export default PasswordField;`, and import it in `SignUp.jsx`.

`src/pages/auth/ProfilePickers.jsx`:
```jsx
import { AVATARS, PROFILE_COLOURS } from "../../data/avatars";
import { AVATARS_UNLOCKABLE, badgeForAvatar } from "../../data/badges";

/** The picture grid, shared by ProfileBuilder and sign-up. Classes stay pb-* so ProfileBuilder.css styles both. */
export function AvatarPicker({ value, onChange, unlocked = [] }) {
  const option = (emoji) => (
    <button
      key={emoji}
      type="button"
      className={`pb-avatar-option ${value === emoji ? "selected" : ""}`}
      onClick={() => onChange(emoji)}
      aria-pressed={value === emoji}
      aria-label={`Choose the ${emoji} picture`}
    >
      <span aria-hidden="true">{emoji}</span>
    </button>
  );
  return (
    <div className="pb-avatar-grid">
      {AVATARS.map(option)}
      {/* Locked pictures are SHOWN, not hidden: "there is more here" motivates. */}
      {AVATARS_UNLOCKABLE.filter((emoji) => !unlocked.includes(emoji)).map((emoji) => {
        const badge = badgeForAvatar(emoji);
        return (
          <span
            key={emoji}
            className="pb-avatar-option is-locked"
            title={`Earn the ${badge.name} badge to unlock this`}
            aria-label={`Locked picture — earn the ${badge.name} badge to unlock it`}
            role="img"
          >
            <span aria-hidden="true">🔒</span>
          </span>
        );
      })}
      {AVATARS_UNLOCKABLE.filter((emoji) => unlocked.includes(emoji)).map(option)}
    </div>
  );
}

export function ColourPicker({ value, onChange }) {
  return (
    <div className="pb-colour-row">
      {PROFILE_COLOURS.map((token) => (
        <button
          key={token}
          type="button"
          className={`pb-colour-option ${value === token ? "selected" : ""}`}
          style={{ "--pb-swatch": `var(${token})` }}
          onClick={() => onChange(token)}
          aria-pressed={value === token}
          aria-label={`Choose the ${token.replace("--profile-colour-", "").replace(/-/g, " ")} colour`}
        />
      ))}
    </div>
  );
}
```
In `ProfileBuilder.jsx`, replace the avatar grid `<div className="pb-avatar-grid">…</div>` with `<AvatarPicker value={avatar} onChange={setAvatar} unlocked={unlocked} />` and the colour row with `<ColourPicker value={colour} onChange={setColour} />`; import both and drop the now-unused imports. Sign-up imports `ProfileBuilder.css` for the `pb-*` styles.

- [ ] **Step 3: The sign-up parts**

`parts/BixGuide.jsx`:
```jsx
import Mascot from "../../../../components/mascot/Mascot";

/** Bix and one speech bubble. The bubble is a polite live region, so each new line is read out. */
export default function BixGuide({ line, mood = "idle", cheerOn }) {
  return (
    <div className="sf-bix">
      <Mascot decorative mood={mood} cheerOn={cheerOn} className="sf-bix-mascot" />
      <p className="sf-bubble" aria-live="polite">
        {line}
      </p>
    </div>
  );
}
```

`parts/ChoiceCards.jsx`:
```jsx
import { useRef } from "react";

/**
 * Big tappable answers. Arrow keys move between them; Enter/Space choose.
 * `value` is an id (single) or an id[] (multiple).
 */
export default function ChoiceCards({ label, options, value, onChoose, multiple = false }) {
  const refs = useRef([]);
  const isChosen = (id) => (multiple ? Array.isArray(value) && value.includes(id) : value === id);

  const onKeyDown = (event, index) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!delta) return;
    event.preventDefault();
    refs.current[(index + delta + options.length) % options.length]?.focus();
  };

  return (
    <div className="sf-cards" role="group" aria-label={label}>
      {options.map((option, index) => (
        <button
          key={option.id}
          ref={(node) => {
            refs.current[index] = node;
          }}
          type="button"
          className={`sf-card ${isChosen(option.id) ? "is-chosen" : ""}`}
          aria-pressed={isChosen(option.id)}
          onClick={() => onChoose(option.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
        >
          {option.icon && <span className="sf-card-icon" aria-hidden="true">{option.icon}</span>}
          <span className="sf-card-title">{option.title}</span>
          {option.blurb && <span className="sf-card-blurb">{option.blurb}</span>}
          <span className="sf-card-check" aria-hidden="true">✓</span>
        </button>
      ))}
    </div>
  );
}
```

`parts/YearWheel.jsx`:
```jsx
import { useEffect, useRef } from "react";

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/**
 * A scrolling list of years with NOTHING pre-selected — a pre-set adult year
 * would nudge a child to keep it. Keyboard: arrows, Page Up/Down, Home/End,
 * and typing digits jumps ("2" → "20" → "201" → "2013").
 */
export default function YearWheel({ years, value, onChange, labelledBy }) {
  const listRef = useRef(null);
  const typed = useRef({ text: "", at: 0 });

  useEffect(() => {
    const chosen = listRef.current?.querySelector('[aria-selected="true"]');
    chosen?.scrollIntoView({ block: "center", behavior: reducedMotion() ? "auto" : "smooth" });
  }, [value]);

  const at = value === null || value === undefined ? -1 : years.indexOf(value);
  const pick = (index) => onChange(years[Math.max(0, Math.min(years.length - 1, index))]);

  const onKeyDown = (event) => {
    const targets = {
      ArrowDown: at + 1,
      ArrowUp: at === -1 ? 0 : at - 1,
      PageDown: at + 5,
      PageUp: Math.max(0, at - 5),
      Home: 0,
      End: years.length - 1,
    };
    if (event.key in targets) {
      event.preventDefault();
      pick(targets[event.key]);
      return;
    }
    if (/^\d$/.test(event.key)) {
      const memory = typed.current;
      memory.text = (event.timeStamp - memory.at > 1000 ? "" : memory.text) + event.key;
      memory.at = event.timeStamp;
      const match = years.find((year) => String(year).startsWith(memory.text));
      if (match) onChange(match);
    }
  };

  return (
    <ul
      ref={listRef}
      className="sf-wheel"
      role="listbox"
      tabIndex={0}
      aria-labelledby={labelledBy}
      aria-activedescendant={at === -1 ? undefined : `sf-year-${value}`}
      onKeyDown={onKeyDown}
    >
      {years.map((year) => (
        <li
          key={year}
          id={`sf-year-${year}`}
          role="option"
          aria-selected={year === value}
          className={`sf-wheel-item ${year === value ? "is-chosen" : ""}`}
          onClick={() => onChange(year)}
        >
          {year}
        </li>
      ))}
    </ul>
  );
}
```

`parts/CodeInput.jsx`:
```jsx
import { useRef } from "react";
import { parseCode } from "../../../../data/signupFlow";

/**
 * Six boxes. Typing moves on, Backspace moves back, and pasting — or iOS/Android
 * offering the code from the email — fills all six. Calls onComplete once the
 * sixth digit lands; the caller guards against double submits.
 */
export default function CodeInput({ value, onChange, onComplete, disabled = false, invalid = false, shakeKey = 0 }) {
  const refs = useRef([]);
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? "");

  const fill = (from, text) => {
    const incoming = parseCode(text);
    if (!incoming) return;
    const next = (value.slice(0, from) + incoming).slice(0, 6);
    onChange(next);
    refs.current[Math.min(next.length, 5)]?.focus();
    if (next.length === 6) onComplete(next);
  };

  const onKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const cut = digits[index] ? index : Math.max(0, index - 1);
      onChange(value.slice(0, cut));
      refs.current[cut]?.focus();
    } else if (event.key === "ArrowLeft") {
      refs.current[Math.max(0, index - 1)]?.focus();
    } else if (event.key === "ArrowRight") {
      refs.current[Math.min(5, index + 1)]?.focus();
    }
  };

  return (
    <div key={shakeKey} className={`sf-code ${invalid ? "is-invalid" : ""}`} role="group" aria-label="Six-digit code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          className="sf-code-box"
          value={digit}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={index === 0 ? 6 : 2}
          aria-label={`Digit ${index + 1}`}
          disabled={disabled}
          autoFocus={index === 0}
          onChange={(event) => {
            const raw = event.target.value;
            // Typing over a filled box gives "47": keep the new digit only.
            const fresh = digit && raw.startsWith(digit) ? raw.slice(digit.length) : raw;
            fill(Math.min(index, value.length), fresh);
          }}
          onPaste={(event) => {
            event.preventDefault();
            fill(0, event.clipboardData.getData("text"));
          }}
          onKeyDown={(event) => onKeyDown(event, index)}
        />
      ))}
    </div>
  );
}
```

`parts/FamilyRow.jsx`:
```jsx
/** The learners finished so far, rising into a row as each is completed. Decoration only. */
export default function FamilyRow({ learners }) {
  const done = learners.filter((l) => String(l.name ?? "").trim() && l.avatar);
  if (done.length === 0) return null;
  return (
    <ul className="sf-family" aria-label={`${done.length} ready: ${done.map((l) => l.name.trim()).join(", ")}`}>
      {done.map((learner, index) => (
        <li
          key={index}
          className="sf-family-face"
          style={learner.colour ? { "--sf-face": `var(${learner.colour})` } : undefined}
          aria-hidden="true"
        >
          {learner.avatar}
        </li>
      ))}
    </ul>
  );
}
```

`parts/ProgressStars.jsx`:
```jsx
import { STAGES } from "../../../../data/signupFlow";

export default function ProgressStars({ stage }) {
  return (
    <ol className="sf-stars" aria-label={`Part ${stage + 1} of ${STAGES.length}`}>
      {STAGES.map((name, index) => (
        <li
          key={name}
          className={`sf-star ${index < stage ? "is-done" : ""} ${index === stage ? "is-current" : ""}`}
          aria-hidden="true"
        >
          {index < stage ? "★" : ""}
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 4: Styles — `src/pages/auth/signup/SignUpFlow.css`**

Scoped under `.auth-page .sf`; colours from `--au-*`; targets ≥ 64 px.
```css
/* Sign-up flow (spec §4). Everything is scoped to .auth-page .sf. */
.auth-page .sf { display: grid; gap: 1rem; }

/* Progress */
.auth-page .sf-stars { display: flex; justify-content: center; gap: 0.6rem; margin: 0; padding: 0; list-style: none; }
.auth-page .sf-star {
  width: 1.4rem; height: 1.4rem; border-radius: 50%; display: grid; place-items: center;
  border: 2px solid var(--au-border); font-size: 0.9rem; color: var(--au-on-accent);
  transition: background-color 300ms ease, transform 300ms cubic-bezier(0.22, 1.2, 0.36, 1);
}
.auth-page .sf-star.is-current { border-color: var(--au-accent); transform: scale(1.15); }
.auth-page .sf-star.is-done { background: var(--au-accent); border-color: var(--au-accent); }

/* Bix: above the card content on phones, beside it on wide screens */
.auth-page .sf-bix { display: flex; align-items: center; gap: 0.75rem; }
.auth-page .sf-bix-mascot { width: 72px; height: 72px; flex: none; }
.auth-page .sf-bubble {
  margin: 0; padding: 0.7rem 1rem; border-radius: 1rem 1rem 1rem 0.25rem;
  background: var(--au-bg); color: var(--au-text); font-size: 1.05rem; font-weight: 600;
}

/* Family row */
.auth-page .sf-family { display: flex; justify-content: center; gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
.auth-page .sf-family-face {
  width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; font-size: 1.5rem;
  background: var(--sf-face, var(--au-bg)); animation: sf-face-in 520ms cubic-bezier(0.22, 1.2, 0.36, 1) both;
}
@keyframes sf-face-in { from { transform: translateY(60px) scale(1.6); opacity: 0; } to { transform: none; opacity: 1; } }

/* Step panel */
.auth-page .sf-panel { animation: sf-step-in 380ms cubic-bezier(0.22, 1.1, 0.36, 1) both; }
.auth-page .sf-panel[data-direction="back"] { animation-name: sf-step-in-back; }
@keyframes sf-step-in { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: none; } }
@keyframes sf-step-in-back { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: none; } }
.auth-page .sf-panel .auth-title:focus { outline: none; }

/* Choice cards */
.auth-page .sf-cards { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
.auth-page .sf-card {
  position: relative; min-height: 64px; padding: 0.9rem 1rem; border-radius: 1rem; text-align: left;
  display: grid; grid-template-columns: auto 1fr; column-gap: 0.75rem; align-items: center;
  border: 2px solid var(--au-border); background: var(--au-panel); color: var(--au-text); font: inherit; cursor: pointer;
  transition: transform 160ms cubic-bezier(0.22, 1.2, 0.36, 1), border-color 160ms ease;
}
.auth-page .sf-card:active { transform: scale(0.96); }
.auth-page .sf-card:focus-visible { outline: 3px solid var(--au-accent); outline-offset: 2px; }
.auth-page .sf-card.is-chosen { border-color: var(--au-accent); }
.auth-page .sf-card-icon { grid-row: span 2; font-size: 2rem; }
.auth-page .sf-card-title { font-size: 1.15rem; font-weight: 700; }
.auth-page .sf-card-blurb { color: var(--au-muted); font-size: 0.95rem; }
.auth-page .sf-card-check {
  position: absolute; top: 0.5rem; right: 0.6rem; width: 1.6rem; height: 1.6rem; border-radius: 50%;
  display: grid; place-items: center; background: var(--au-accent); color: var(--au-on-accent);
  transform: scale(0); transition: transform 220ms cubic-bezier(0.22, 1.6, 0.36, 1);
}
.auth-page .sf-card.is-chosen .sf-card-check { transform: scale(1); }
@media (min-width: 640px) {
  .auth-page .sf-cards { grid-template-columns: repeat(2, 1fr); }
  .auth-page .sf-cards:has(> :nth-child(5)) { grid-template-columns: repeat(3, 1fr); }
}

/* Year wheel */
.auth-page .sf-wheel {
  height: 15rem; overflow-y: auto; scroll-snap-type: y mandatory; margin: 0; padding: 6rem 0; list-style: none;
  border: 2px solid var(--au-border); border-radius: 1rem; background: var(--au-panel);
  mask-image: linear-gradient(transparent, black 30%, black 70%, transparent);
}
.auth-page .sf-wheel:focus-visible { outline: 3px solid var(--au-accent); outline-offset: 2px; }
.auth-page .sf-wheel-item {
  scroll-snap-align: center; min-height: 3rem; display: grid; place-items: center;
  font-size: 1.4rem; color: var(--au-muted); cursor: pointer;
}
.auth-page .sf-wheel-item.is-chosen { color: var(--au-text); font-size: 1.9rem; font-weight: 800; }

/* Code boxes */
.auth-page .sf-code { display: flex; justify-content: center; gap: 0.5rem; }
.auth-page .sf-code.is-invalid { animation: auth-shake 400ms ease both; }
.auth-page .sf-code-box {
  width: 3rem; height: 4rem; border-radius: 0.75rem; text-align: center; font-size: 1.8rem; font-weight: 700;
  border: 2px solid var(--au-border); background: var(--au-panel); color: var(--au-text);
}
.auth-page .sf-code-box:focus { border-color: var(--au-accent); outline: none; }

/* Continue pinned within thumb reach on phones */
.auth-page .sf-continue { position: sticky; bottom: calc(env(safe-area-inset-bottom, 0px) + 0.75rem); }
.auth-page .sf-continue .auth-btn { width: 100%; min-height: 64px; font-size: 1.15rem; }

/* Hand-over */
.auth-page .sf-handover { text-align: center; display: grid; gap: 1.25rem; justify-items: center; }
.auth-page .sf-handover-face {
  width: 9rem; height: 9rem; border-radius: 50%; display: grid; place-items: center; font-size: 5rem;
  background: var(--sf-face, var(--au-bg));
}
.auth-page .sf-handover .auth-btn { min-height: 80px; font-size: 1.4rem; padding-inline: 2rem; animation: sf-pulse 1.6s ease-in-out infinite; }
@keyframes sf-pulse { 50% { transform: scale(1.05); } }

/* Summary */
.auth-page .sf-summary { display: grid; gap: 0.75rem; margin: 0; padding: 0; list-style: none; }
.auth-page .sf-summary-card {
  display: grid; grid-template-columns: auto 1fr auto; gap: 0.75rem; align-items: center;
  padding: 0.75rem; border-radius: 1rem; border: 2px solid var(--au-border);
}

@media (min-width: 900px) {
  .auth-page .sf { grid-template-columns: 9rem 1fr; column-gap: 1.5rem; }
  .auth-page .sf > :not(.sf-bix) { grid-column: 2; }
  .auth-page .sf-bix { grid-column: 1; grid-row: 1 / span 4; flex-direction: column; align-self: start; }
  .auth-page .sf-bix-mascot { width: 120px; height: 120px; }
  .auth-page .sf-bubble { border-radius: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .auth-page .sf-panel,
  .auth-page .sf-panel[data-direction="back"] { animation: sf-fade 200ms ease both; }
  .auth-page .sf-family-face,
  .auth-page .sf-handover .auth-btn,
  .auth-page .sf-code.is-invalid { animation: none; }
  .auth-page .sf-card,
  .auth-page .sf-card-check,
  .auth-page .sf-star { transition: none; }
}
@keyframes sf-fade { from { opacity: 0; } to { opacity: 1; } }
```
(`auth-shake` is defined in `AuthShell.css`.)

- [ ] **Step 5: Check, lint, build, commit**

Run: `npm test && npm run lint && npm run build`. Open `/profiles` → "Add a profile" and `/parent` → edit a profile: the picture and colour pickers look and behave exactly as before (this task changed `ProfileBuilder`).
```bash
git add src/components/mascot src/pages/auth/PasswordField.jsx src/pages/auth/ProfilePickers.jsx src/pages/auth/ProfileBuilder.jsx src/pages/auth/SignUp.jsx src/pages/auth/signup
git commit -m "feat(signup): building blocks — Bix's puzzled mood, shared pickers and password field, cards, year wheel, code boxes"
```

---

### Task 8: The flow, from birth year to summary

**Files:**
- Create: `src/pages/auth/signup/useSignupDraft.js`, `src/pages/auth/signup/steps.jsx`, `src/pages/auth/signup/SignUpFlow.jsx`
- Modify: `src/main.jsx` (the `signup` route renders `SignUpFlow`)

**Interfaces:**
- Consumes: Tasks 2, 6, 7.
- Produces: `useSignupDraft() → [draft, setDraft, finishDraft]`; `SignUpFlow` default export. Task 9 adds the account and code steps to it; Task 10 the hand-over.

- [ ] **Step 1: `useSignupDraft.js`**
```js
import { useCallback, useEffect, useRef, useState } from "react";
import { DRAFT_KEY, emptyDraft, parseDraft, serialiseDraft } from "../../../data/signupFlow";

function readDraft() {
  try {
    const raw = globalThis.sessionStorage?.getItem(DRAFT_KEY);
    return (raw && parseDraft(raw)) || emptyDraft();
  } catch {
    return emptyDraft(); // private mode, blocked storage
  }
}

/**
 * The answers so far, kept in sessionStorage so a refresh resumes. Never holds
 * the password. `finishDraft` removes it for good once sign-up succeeds.
 */
export function useSignupDraft() {
  const [draft, setDraft] = useState(readDraft);
  const finished = useRef(false);

  useEffect(() => {
    if (finished.current) return;
    try {
      globalThis.sessionStorage?.setItem(DRAFT_KEY, serialiseDraft(draft));
    } catch {
      /* the flow still works; it just won't survive a reload */
    }
  }, [draft]);

  const finishDraft = useCallback(() => {
    finished.current = true;
    try {
      globalThis.sessionStorage?.removeItem(DRAFT_KEY);
    } catch {
      /* nothing to remove */
    }
  }, []);

  return [draft, setDraft, finishDraft];
}
```

- [ ] **Step 2: `steps.jsx` — the bodies for birthYear … summary**
```jsx
import { CHILD_NAME_MAX } from "../../../data/childFields";
import { CURRICULUM_SUBJECTS, getSubjectName } from "../../../data/curriculumRegistry";
import { EXPLORING, birthYearOptions, subjectsForYear } from "../../../data/signupFlow";
import ChoiceCards from "./parts/ChoiceCards";
import YearWheel from "./parts/YearWheel";
import { AvatarPicker, ColourPicker } from "../ProfilePickers";
import "../ProfileBuilder.css";

const YEAR_OPTIONS = [
  { id: "1", title: "Year 1", blurb: "usually age 5–6" },
  { id: "2", title: "Year 2", blurb: "usually age 6–7" },
  { id: "3", title: "Year 3", blurb: "usually age 7–8" },
  { id: "4", title: "Year 4", blurb: "usually age 8–9" },
  { id: "none", title: "Not sure", blurb: "You can change it later" },
];

export function BirthYearBody({ draft, currentYear, onPick }) {
  return <YearWheel years={birthYearOptions(currentYear)} value={draft.birthYear} onChange={onPick} labelledBy="sf-heading" />;
}

export function GateBody({ onRestart }) {
  return (
    <>
      <p className="auth-intro">Ask a grown-up to sign up for you — they can add you to their account in a couple of minutes.</p>
      <button type="button" className="auth-btn auth-btn-quiet" onClick={onRestart}>Start again</button>
    </>
  );
}

export function WhoBody({ draft, onPick }) {
  return (
    <ChoiceCards
      label="Who's going to learn?"
      value={draft.learnFor}
      onChoose={onPick}
      options={[
        { id: "me", icon: "🙋", title: "Me", blurb: "I'm learning myself" },
        { id: "children", icon: "👨‍👩‍👧", title: "My children", blurb: "I'm setting this up for my family" },
      ]}
    />
  );
}

export function CountBody({ draft, onPick }) {
  const count = draft.learners.length;
  return (
    <ChoiceCards
      label="How many children?"
      value={count >= 4 ? "4" : count ? String(count) : null}
      onChoose={(id) => onPick(Number(id))}
      options={[
        { id: "1", icon: "🧒", title: "1" },
        { id: "2", icon: "👧👦", title: "2" },
        { id: "3", icon: "👧👦🧒", title: "3" },
        { id: "4", icon: "🎉", title: "4 or more", blurb: "Add more on the summary" },
      ]}
    />
  );
}

export function NameBody({ learner, error, onName, onSubmit }) {
  return (
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }} noValidate>
      <div className="auth-field">
        <label className="auth-label" htmlFor="sf-name">Nickname</label>
        <input
          id="sf-name"
          className={`auth-input ${error ? "invalid" : ""}`}
          value={learner.name}
          onChange={(event) => onName(event.target.value)}
          autoComplete="off"
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={CHILD_NAME_MAX * 2}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "sf-name-error" : "sf-name-hint"}
          autoFocus
        />
        {error ? (
          <p className="auth-error" id="sf-name-error" role="alert">{error}</p>
        ) : (
          <p className="auth-hint" id="sf-name-hint">No surname needed.</p>
        )}
      </div>
    </form>
  );
}

export function YearBody({ learner, label, onPick }) {
  const value = learner.yearGroup === undefined ? null : learner.yearGroup === null ? "none" : String(learner.yearGroup);
  return <ChoiceCards label={label} value={value} options={YEAR_OPTIONS} onChoose={(id) => onPick(id === "none" ? null : Number(id))} />;
}

export function LookBody({ learner, onAvatar, onColour }) {
  return (
    <>
      <p className="pb-label">Pick a picture</p>
      <AvatarPicker value={learner.avatar} onChange={onAvatar} />
      <p className="pb-label">Pick a colour</p>
      <ColourPicker value={learner.colour} onChange={onColour} />
    </>
  );
}

export function SubjectsBody({ learner, label, onToggle }) {
  const options = [
    ...subjectsForYear(learner.yearGroup).map((id) => {
      const subject = CURRICULUM_SUBJECTS.find((s) => s.id === id);
      return { id, icon: subject?.icon, title: getSubjectName(id) };
    }),
    { id: EXPLORING, icon: "🧭", title: "Just exploring" },
  ];
  const value = Array.isArray(learner.subjects) ? (learner.subjects.length ? learner.subjects : [EXPLORING]) : [];
  return <ChoiceCards label={label} multiple value={value} options={options} onChoose={onToggle} />;
}

export function SummaryBody({ draft, onEdit, onAdd, canAdd }) {
  return (
    <>
      <ul className="sf-summary">
        {draft.learners.map((learner, index) => (
          <li key={index} className="sf-summary-card">
            <span className="sf-family-face" style={learner.colour ? { "--sf-face": `var(${learner.colour})` } : undefined} aria-hidden="true">
              {learner.avatar}
            </span>
            <span>
              <strong>{learner.name.trim()}</strong>
              <br />
              {learner.yearGroup ? `Year ${learner.yearGroup}` : "Year not set"}
              {" · "}
              {learner.subjects?.length ? learner.subjects.map(getSubjectName).join(", ") : "Just exploring"}
            </span>
            <button type="button" className="auth-btn auth-btn-quiet" onClick={() => onEdit(index)} aria-label={`Edit ${learner.name.trim()}`}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      {canAdd && (
        <button type="button" className="auth-btn auth-btn-quiet" onClick={onAdd}>+ Add another child</button>
      )}
    </>
  );
}
```

- [ ] **Step 3: `SignUpFlow.jsx` — the state machine (birthYear → summary)**
```jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { MAX_CHILDREN_PER_SIGNUP } from "../../../data/childFields";
import {
  STEP, addLearner, editLearner, emptyDraft, isDraftReady, nextCursor, prevCursor,
  stageOf, stepError, toggleSubject, withBirthYear, withCount, withLearnFor, withLearner,
} from "../../../data/signupFlow";
import { bixLine, errorMessage, stepTitle } from "../../../data/signupCopy";
import { playCue } from "../../../components/celebration/sound/player";
import { track } from "../../../utils/analytics";
import AuthShell from "../AuthShell";
import BixGuide from "./parts/BixGuide";
import FamilyRow from "./parts/FamilyRow";
import ProgressStars from "./parts/ProgressStars";
import {
  BirthYearBody, CountBody, GateBody, LookBody, NameBody, SubjectsBody, SummaryBody, WhoBody, YearBody,
} from "./steps";
import { useSignupDraft } from "./useSignupDraft";
import "./SignUpFlow.css";

const WIDE = new Set([STEP.who, STEP.count, STEP.year, STEP.subjects, STEP.summary, STEP.handover]);
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export default function SignUpFlow() {
  const [draft, setDraft] = useSignupDraft();
  const [direction, setDirection] = useState("forward");
  const [cheer, setCheer] = useState(0);
  const [mood, setMood] = useState("idle");
  const [stepErr, setStepErr] = useState(null);
  const headingRef = useRef(null);
  const timer = useRef(0);
  const currentYear = new Date().getFullYear();

  const cursor = draft.cursor;
  const learner = cursor.index !== undefined ? draft.learners[cursor.index] : null;

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    track("signup_step_viewed", { step: cursor.step });
    if (cursor.step === STEP.gate) track("signup_gated");
    headingRef.current?.focus({ preventScroll: true });
  }, [cursor.step, cursor.index]);

  /** Moves to `next`; arriving at the summary ends any "edit and come back". */
  const moveTo = (base, next, way) => {
    if (!next) return;
    window.clearTimeout(timer.current);
    setDirection(way);
    setMood("idle");
    setStepErr(null);
    setDraft({ ...base, cursor: next, returnTo: next.step === STEP.summary ? null : base.returnTo });
  };
  const advance = (updated = draft) => {
    const error = stepError(updated, updated.cursor);
    if (error) {
      setStepErr(errorMessage(error));
      return;
    }
    moveTo(updated, nextCursor(updated, updated.cursor), "forward");
  };
  const back = () => moveTo(draft, prevCursor(draft, cursor), "back");

  /** A single-choice answer: show the tick, cheer, then move on by itself. */
  const choose = (updated) => {
    setDraft(updated);
    setCheer((n) => n + 1);
    playCue("chime");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => advance(updated), reducedMotion() ? 120 : 400);
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const updateLearner = (patch) => setDraft(withLearner(draft, cursor.index, patch));

  let body = null;
  let showContinue = false;
  switch (cursor.step) {
    case STEP.birthYear:
      body = <BirthYearBody draft={draft} currentYear={currentYear} onPick={(year) => setDraft(withBirthYear(draft, year, currentYear))} />;
      showContinue = true;
      break;
    case STEP.gate:
      body = <GateBody onRestart={() => moveTo(emptyDraft(), { step: STEP.birthYear }, "back")} />;
      break;
    case STEP.who:
      body = <WhoBody draft={draft} onPick={(id) => choose(withLearnFor(draft, id))} />;
      break;
    case STEP.count:
      body = <CountBody draft={draft} onPick={(n) => choose(withCount(draft, n))} />;
      break;
    case STEP.name:
      body = <NameBody learner={learner} error={stepErr} onName={(name) => updateLearner({ name })} onSubmit={() => advance()} />;
      showContinue = true;
      break;
    case STEP.year:
      body = <YearBody learner={learner} label={stepTitle(draft, cursor)} onPick={(yearGroup) => choose(withLearner(draft, cursor.index, { yearGroup }))} />;
      break;
    case STEP.look:
      body = (
        <LookBody
          learner={learner}
          onAvatar={(avatar) => { updateLearner({ avatar }); setCheer((n) => n + 1); playCue("chime"); }}
          onColour={(colour) => updateLearner({ colour })}
        />
      );
      showContinue = true;
      break;
    case STEP.subjects:
      body = (
        <SubjectsBody
          learner={learner}
          label={stepTitle(draft, cursor)}
          onToggle={(id) => { updateLearner({ subjects: toggleSubject(learner.subjects, id) }); setCheer((n) => n + 1); playCue("chime"); }}
        />
      );
      showContinue = true;
      break;
    case STEP.summary:
      body = (
        <SummaryBody
          draft={draft}
          canAdd={draft.learnFor === "children" && draft.learners.length < MAX_CHILDREN_PER_SIGNUP}
          onEdit={(index) => moveTo(editLearner(draft, index), { step: STEP.name, index }, "back")}
          onAdd={() => { const added = addLearner(draft); moveTo(added, added.cursor, "forward"); }}
        />
      );
      showContinue = isDraftReady(draft);
      break;
    default:
      body = null; // account, code: Task 9. handover: Task 10.
  }

  const hasBack = prevCursor(draft, cursor) !== null;

  return (
    <AuthShell width={WIDE.has(cursor.step) ? "wide" : "narrow"}>
      <div className="sf">
        <BixGuide line={bixLine(draft, cursor)} mood={mood} cheerOn={cheer} />
        <ProgressStars stage={stageOf(cursor)} />
        {cursor.step !== STEP.summary && <FamilyRow learners={draft.learners} />}
        <div key={`${cursor.step}-${cursor.index ?? ""}`} className="sf-panel" data-direction={direction}>
          <h1 className="auth-title" id="sf-heading" tabIndex={-1} ref={headingRef}>
            {stepTitle(draft, cursor)}
          </h1>
          {body}
          {stepErr && cursor.step !== STEP.name && <p className="auth-error" role="alert">{stepErr}</p>}
        </div>
        {showContinue && (
          <div className="sf-continue">
            <button type="button" className="auth-btn" onClick={() => advance()}>Continue →</button>
          </div>
        )}
        {hasBack && (
          <button type="button" className="auth-btn auth-btn-quiet" onClick={back}>← Back</button>
        )}
        {cursor.step === STEP.birthYear && (
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        )}
      </div>
    </AuthShell>
  );
}
```
(Task 9 adds `const auth = useContext(AuthContext);` and takes `finishDraft` from `useSignupDraft()` — they are left out here so this task lints clean.)

- [ ] **Step 4: Route it** — in `src/main.jsx` import `SignUpFlow from "./pages/auth/signup/SignUpFlow"` and set `{ path: "signup", element: <SignUpFlow /> }`. (`SignUp.jsx` stays on disk until Task 12.)

- [ ] **Step 5: Verify in the browser**

Run `npm run dev` (localStorage mode is fine for this task) and open `/signup` at 375 px and 1440 px:
- 1990 → Continue → Who → "My children" auto-advances → "2" → Maya / Year 2 / 🦊 + colour / Maths → Leo / Year 1 (no subjects step) → summary lists both; Edit Maya → change Year 3 → back at the summary.
- 2011 → no "Who" step; the name step says "What should Bix call you?".
- 2016 → the gate; Back returns to the wheel; nothing is in `localStorage` (`dl.parents` absent).
- Refresh in the middle: the same screen and answers come back; DevTools → Session Storage → `dl.signupDraft` holds no password.
- Keyboard only: Tab to the wheel, arrows/digits pick a year, Enter on Continue; arrows move between cards; Escape goes back.
- Both themes; reduced motion (DevTools rendering emulation): fades only.

Run: `npm test && npm run lint && npm run build`

- [ ] **Step 6: Commit**
```bash
git add src/pages/auth/signup src/main.jsx
git commit -m "feat(signup): the question-led flow from birth year to the family summary, with Bix and a resumable draft"
```

---

### Task 9: Email, password and the code

**Files:**
- Modify: `src/pages/auth/signup/steps.jsx`, `src/pages/auth/signup/SignUpFlow.jsx`

**Interfaces:**
- Consumes: Task 6 `requestSignupCode`, `completeSignup`; Task 7 `CodeInput`, `PasswordField`; Task 2 `accountErrors`, `signupBody`, `maskEmail` (via `bixLine`).
- Produces: on success, `created = { parent, children }` in `SignUpFlow` state (Task 10 renders the hand-over from it).

- [ ] **Step 1: Add the bodies to `steps.jsx`**
```jsx
import { Link } from "react-router";
import PasswordField from "../PasswordField";
import CodeInput from "./parts/CodeInput";
import { MIN_PASSWORD_LENGTH, passwordStrength } from "../../../data/passwordStrength";
import { ERROR_MESSAGES } from "../../../data/signupCopy";

export function AccountBody({ email, secret, errors, busy, onEmail, onSecret, onSubmit }) {
  const strength = passwordStrength(secret.password);
  const message = (field) => (errors[field] ? ERROR_MESSAGES[errors[field]] ?? errors[field] : null);
  return (
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }} noValidate>
      <div className="auth-field">
        <label className="auth-label" htmlFor="sf-email">Email address</label>
        <input
          id="sf-email"
          className={`auth-input ${errors.email ? "invalid" : ""}`}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => onEmail(event.target.value)}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "sf-email-error" : undefined}
          autoFocus
        />
        {errors.email && (
          <p className="auth-error" id="sf-email-error" role="alert">
            {message("email")}
            {errors.email === "EMAIL_TAKEN" && <> <Link to="/login">Sign in instead</Link></>}
          </p>
        )}
      </div>
      <PasswordField
        id="sf-password"
        label="Password"
        autoComplete="new-password"
        value={secret.password}
        onChange={(password) => onSecret({ ...secret, password })}
        error={message("password")}
        describedBy={errors.password ? "sf-password-error" : "sf-password-hint"}
        hint={
          <p className={`auth-hint su-strength is-${strength?.level ?? "empty"}`} id="sf-password-hint">
            {strength?.label ?? `At least ${MIN_PASSWORD_LENGTH} characters.`}
          </p>
        }
      />
      <PasswordField
        id="sf-confirm"
        label="Type it again"
        autoComplete="new-password"
        value={secret.confirm}
        onChange={(confirm) => onSecret({ ...secret, confirm })}
        error={message("confirm")}
        describedBy={errors.confirm ? "sf-confirm-error" : undefined}
        hint={null}
      />
      {errors.form && <p className="auth-error" role="alert">{errors.form}</p>}
      <div className="sf-continue">
        <button className="auth-btn" type="submit" disabled={busy}>{busy ? "Sending…" : "Send my code →"}</button>
      </div>
    </form>
  );
}

export function CodeBody({ code, onCode, onComplete, busy, error, invalid, shakeKey, resendIn, onResend, onChangeEmail, needsNewCode }) {
  return (
    <>
      <CodeInput value={code} onChange={onCode} onComplete={onComplete} disabled={busy} invalid={invalid} shakeKey={shakeKey} />
      {error && <p className="auth-error" role="alert">{error}</p>}
      <div className="auth-actions">
        <button type="button" className={`auth-btn ${needsNewCode ? "" : "auth-btn-quiet"}`} onClick={onResend} disabled={busy || resendIn > 0}>
          {resendIn > 0 ? `Send a new code in ${resendIn}s` : "Send a new code"}
        </button>
        <button type="button" className="auth-btn auth-btn-quiet" onClick={onChangeEmail} disabled={busy}>Change email</button>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Wire them into `SignUpFlow.jsx`**

Add `useContext` to the React import, `import { AuthContext } from "../../../context/auth-context";`, `const auth = useContext(AuthContext);` as the first line of the component, and change the draft hook line to `const [draft, setDraft, finishDraft] = useSignupDraft();`. Then add state and handlers (imports: `accountErrors`, `signupBody` from signupFlow; `AccountBody`, `CodeBody` from steps; `playEffect` from `../../../components/celebration/fx/effects`):
```jsx
  const [secret, setSecret] = useState({ password: "", confirm: "" }); // memory only, never saved
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);
  const [needsNewCode, setNeedsNewCode] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [resendAt, setResendAt] = useState(0);
  const [clock, setClock] = useState(() => Date.now());
  const [created, setCreated] = useState(null);
  const submitting = useRef(false);

  // A one-second tick only while a resend countdown is running.
  useEffect(() => {
    if (resendAt <= clock) return undefined;
    const id = window.setTimeout(() => setClock(Date.now()), 1000);
    return () => window.clearTimeout(id);
  }, [resendAt, clock]);
  const resendIn = Math.max(0, Math.ceil((resendAt - clock) / 1000));

  const complete = async (typed) => {
    if (submitting.current) return; // Review Focus 5: the sixth digit and Enter together
    submitting.current = true;
    setBusy(true);
    try {
      const result = await auth.completeSignup(signupBody(draft, { password: secret.password, code: typed }));
      track("signup_completed", { learners: result.children.length, verification: typed ? "on" : "off" });
      playCue("success");
      playEffect("confetti");
      setCheer((n) => n + 1);
      setSecret({ password: "", confirm: "" });
      finishDraft();
      setCreated(result);
    } catch (err) {
      const reason = err?.message;
      if (reason === "EMAIL_TAKEN") {
        setFieldErrors({ email: "EMAIL_TAKEN" });
        moveTo(draft, { step: STEP.account }, "back");
      } else if (typed) {
        setMood("puzzled");
        setShakeKey((n) => n + 1);
        setCode("");
        setNeedsNewCode(reason === "CODE_EXPIRED" || reason === "CODE_ATTEMPTS_EXCEEDED");
        setCodeError(errorMessage(reason, err?.details ?? {}));
      } else {
        setFieldErrors({ form: errorMessage(reason, err?.details ?? {}) });
      }
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  const sendCode = async () => {
    const errors = accountErrors({ email: draft.email, ...secret });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setBusy(true);
    try {
      const res = await auth.requestSignupCode(draft.email);
      if (res.verification === "off") {
        setBusy(false);
        await complete(null);
        return;
      }
      track("signup_code_sent");
      setClock(Date.now());
      setResendAt(Date.now() + (res.resendInSeconds ?? 30) * 1000);
      setCode("");
      setCodeError(null);
      setNeedsNewCode(false);
      if (cursor.step !== STEP.code) moveTo(draft, { step: STEP.code }, "forward");
    } catch (err) {
      const reason = err?.message;
      if (reason === "EMAIL_TAKEN" || reason === "EMAIL_INVALID") setFieldErrors({ email: reason });
      else if (cursor.step === STEP.code) setCodeError(errorMessage(reason, err?.details ?? {}));
      else setFieldErrors({ form: errorMessage(reason, err?.details ?? {}) });
    } finally {
      setBusy(false);
    }
  };
```
Add the two cases to the `switch`:
```jsx
    case STEP.account:
      body = (
        <AccountBody
          email={draft.email}
          secret={secret}
          errors={fieldErrors}
          busy={busy}
          onEmail={(email) => setDraft({ ...draft, email })}
          onSecret={setSecret}
          onSubmit={sendCode}
        />
      );
      break;
    case STEP.code:
      body = (
        <CodeBody
          code={code}
          onCode={(value) => { setCode(value); setCodeError(null); setMood("idle"); }}
          onComplete={complete}
          busy={busy}
          error={codeError}
          invalid={Boolean(codeError)}
          shakeKey={shakeKey}
          resendIn={resendIn}
          needsNewCode={needsNewCode}
          onResend={sendCode}
          onChangeEmail={() => moveTo(draft, { step: STEP.account }, "back")}
        />
      );
      break;
```
`sendCode` from the code step re-validates the account fields, which still hold the password in memory — correct. If the page was refreshed on the code step, `parseDraft` already put the cursor on the account step, so the password is re-typed.

- [ ] **Step 3: Verify in the browser (API mode, log mailer)**

Run `npm run dev:server` (with a `.env` that has `MONGODB_URI` and `SESSION_SECRET`, and **no** `RESEND_API_KEY`/`EMAIL_FROM`) and, in a second terminal, `VITE_USE_API=true npm run dev`. Go through to the account step:
- An invalid email or short password shows the field messages; "Send my code" with good values moves to the code step, Bix says "I sent a code to m…@…", and the server terminal prints `[email] signup code for …: 123456`.
- A wrong code: the boxes shake, Bix tilts, "… 4 tries left", the boxes clear.
- Paste "123 456" (the right code with a space): all six fill and it submits; confetti; `created` is set (Task 10 shows the screen — for now the panel is empty, which is expected).
- "Send a new code" is disabled with a countdown for 30 s.
- An email that already has an account: the account step shows "That email already has an account. Sign in instead".
- With `VITE_USE_API` unset (localStorage mode), "Send my code" completes straight away with no code step.

Run: `npm test && npm run lint && npm run build`

- [ ] **Step 4: Commit**
```bash
git add src/pages/auth/signup
git commit -m "feat(signup): email and password, the six-digit code, and every error in Bix's voice"
```

---

### Task 10: The hand-over, and "Your pick" on the curriculum page

**Files:**
- Create: `src/pages/auth/signup/HandOver.jsx`
- Modify: `src/pages/auth/signup/SignUpFlow.jsx`, `src/pages/curriculum/CurriculumSelectPage.jsx` (+ its CSS)

**Interfaces:**
- Consumes: `created` (Task 9), `auth.selectChild(childId)`, `destinationFor(child)` (Task 2), `readSubjects(child)` (Task 1).

- [ ] **Step 1: `HandOver.jsx`**
```jsx
import { useState } from "react";

/**
 * The payoff. One child: "Hand the device to Maya!" and a big button only she
 * should press. Several: "Who's playing first?". A learner: "Let's go!".
 */
export default function HandOver({ result, onStart }) {
  const [starting, setStarting] = useState(false);
  const kids = result.children;
  const learner = result.parent.accountType === "learner";
  const start = async (child) => {
    if (starting) return;
    setStarting(true);
    try {
      await onStart(child);
    } finally {
      setStarting(false);
    }
  };

  if (kids.length === 1) {
    const [child] = kids;
    return (
      <div className="sf-handover">
        <span className="sf-handover-face" style={child.colour ? { "--sf-face": `var(${child.colour})` } : undefined} aria-hidden="true">
          {child.avatar}
        </span>
        <h1 className="auth-title">{learner ? "You're all set!" : `Hand the device to ${child.name}!`}</h1>
        <button type="button" className="auth-btn" onClick={() => start(child)} disabled={starting} autoFocus>
          {learner ? "Let's go! 🚀" : `I'm ${child.name}! 🚀`}
        </button>
      </div>
    );
  }

  return (
    <div className="sf-handover">
      <h1 className="auth-title">Who's playing first?</h1>
      <div className="sf-cards">
        {kids.map((child) => (
          <button key={child._id} type="button" className="sf-card" onClick={() => start(child)} disabled={starting}>
            <span className="sf-card-icon" aria-hidden="true">{child.avatar}</span>
            <span className="sf-card-title">{child.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Render it from `SignUpFlow.jsx`** — before the main `return`:
```jsx
  const navigate = useNavigate(); // import { Link, useNavigate } from "react-router"
  if (created) {
    return (
      <AuthShell width="wide">
        <div className="sf">
          <BixGuide line={created.children.length > 1 ? "Who's first? 🎉" : "Let's go!"} cheerOn={cheer} />
          <HandOver
            result={created}
            onStart={async (child) => {
              await auth.selectChild(child._id);
              playCue("levelUp");
              playEffect("confettiStars");
              navigate(destinationFor(child));
            }}
          />
        </div>
      </AuthShell>
    );
  }
```
Hooks must all run before this early return: declare `navigate` with the other hooks at the top of the component, and put this block **after the last `useEffect`** (the resend tick from Task 9) and before the `switch`. Import `HandOver` and `destinationFor`.

- [ ] **Step 3: "⭐ Your pick" on the curriculum page** — in `CurriculumSelectPage.jsx` import `readSubjects` from `../../data/childFields`, compute `const picks = readSubjects(child);` next to `savedYear`, pass `picked={picks.includes(subject.id)}` to `<SubjectCard>`, accept `picked` in `SubjectCard`, and render after the `Ready` flag:
```jsx
      {picked && available && <span className="cs-subject-pick">⭐ Your pick</span>}
```
CSS (in `CurriculumSelectPage.css`, beside `.cs-subject-flag`, using the same tokens that rule uses):
```css
.cs-subject-pick {
  position: absolute;
  bottom: 0.6rem;
  right: 0.6rem;
  font-size: 0.85rem;
  font-weight: 700;
}
```

- [ ] **Step 4: Verify in the browser** — complete sign-up with two children (Maya: Year 3, Science; Leo: Year 2, Just exploring): "Who's playing first?" → Maya → confetti → `/curriculum/year/3/science`. Sign out, sign in, pick Leo → `/curriculum` behaves as before; Science on Maya's `/curriculum` shows "⭐ Your pick". A learner sign-up shows "Let's go!". Reduced motion: no confetti, no pulse.

Run: `npm test && npm run lint && npm run build`

- [ ] **Step 5: Commit**
```bash
git add src/pages/auth/signup src/pages/curriculum
git commit -m "feat(signup): the hand-over, and 'Your pick' on the curriculum page"
```

---

### Task 11: Full browser verification and the two-child regression

**Files:** none changed unless a check fails (fix in the owning file, re-run, note it in the tracker).

Use Playwright (the MCP browser tools if available, otherwise `playwright-core` in a scratch script outside the repo). API mode with the log mailer, as in Task 9. Save screenshots to the session scratchpad, not the repo; record pass/fail per row in the tracker's verification table.

- [ ] **Step 1: Regression baseline** — `npm run seed`; sign in to the seeded grown-up; screenshot `/profiles`, `/parent`, and one child's `/curriculum` and Trophy Room. (Do this before Step 2 so the two can be compared.)
- [ ] **Step 2: Flows at 375×812 and 1440×900, light and dark:**
  - V1 grown-up, one child, Year 2, Maths → `/curriculum/year/2/math`.
  - V2 grown-up, choose "3"; one child "Not sure" (no subjects step) → summary → "Add another child" (a 4th) → code → "Who's playing first?" lists four.
  - V3 learner born 2011 → no "Who" step, one profile, `accountType: learner`, `ageBand: 13-15`.
  - V4 born 2016 → gate; no request in the Network tab; no `pendingSignups` record.
  - V5 Back at every step keeps answers; Edit from the summary returns to the summary; changing a year from 3 to 2 drops Science.
  - V6 Refresh on the name step, the summary, and the code step (→ resumes at the account step, password empty).
  - V7 Code: paste "123 456"; a wrong code then the right one; wait 31 s and resend; 5 wrong → "Send a new code" highlighted.
  - V8 Keyboard only, start to finish (wheel by digits, cards by arrows, Enter, Escape for Back).
  - V9 Reduced motion: fades only, no confetti, no flying faces, no pulse.
  - V10 Sound: mute in the navbar first → silent throughout.
- [ ] **Step 3: Regression after** — sign in to the seeded account again; the four screens match Step 1.
- [ ] **Step 4:** `npm test && npm run lint && npm run build`; record results; commit any fixes:
```bash
git commit -am "fix(signup): browser verification fixes"   # only if something changed
```

---

### Task 12: Remove the old sign-up path; docs and deployment

**Files:**
- Delete: `src/pages/auth/SignUp.jsx`, `src/pages/auth/SignUp.css`
- Modify: `server/routes/auth.js` (remove `POST /signup`), `server/routes.test.js`, `src/data/store/apiStore.js` (remove `createParent`), `src/context/AuthContext.jsx` (remove `signUp`), `src/main.jsx` (drop the old import if any)
- Modify: `.env.example`, `render.yaml`, `docs/DEPLOYMENT.md`, `docs/PROJECT_KNOWLEDGE.md`, `docs/PROJECT_IDEAS.md`

- [ ] **Step 1: Point `routes.test.js` at real sign-in instead of the old route.** Add a helper that inserts an account and signs in through `/login`:
```js
  const { hashPassword } = await import("./auth.js");
  async function makeParent(browser, email, password) {
    const { hash, salt, iterations } = await hashPassword(password);
    await database.collection("parents").insertOne({
      email, passwordHash: hash, passwordSalt: salt, iterations,
      accountType: "parent", ageBand: null, createdAt: new Date().toISOString(),
    });
    return browser("POST", "/api/auth/login", { email, password });
  }
```
Replace `a("POST", "/api/auth/signup", { email: "  Parent.A@Example.com ", password: "password-a" })` with `makeParent(a, "parent.a@example.com", "password-a")` (status 200; keep the credential-stripping assertions on `.body.parent`), and the parent B sign-up likewise. Delete the "duplicate email is rejected" sub-test — `server/signup.test.js` covers `EMAIL_TAKEN` and the race. Drop the "email normalised" assertion (covered in `signup.test.js`).

- [ ] **Step 2: Remove the old code**
  - `server/routes/auth.js`: delete the `router.post("/signup", …)` handler and imports it alone used (`createParentAccount`, `normaliseAccountFields`, and the throttle if `/login` no longer uses it — it does, keep it).
  - `apiStore.js`: delete `createParent` (the API driver has no such endpoint now). `localStorageStore.createParent` stays: `completeSignup` uses it.
  - `AuthContext.jsx`: delete `signUp` and remove it from `value` and the deps array.
  - Delete `SignUp.jsx` and `SignUp.css`. `grep -rn "SignUp\b\|signUp\|su-strength" src` must show no live references; move the `.su-strength` rules into `SignUpFlow.css` as `.auth-page .su-strength…` first if `AccountBody` still uses that class (it does — keep the class name, move the rules).
  - `scripts/checkEnglishChallenges.js` stubs `signUp` in a fake auth object; leave it or drop the key — it is not called.
- [ ] **Step 3: Configuration**
  - `.env.example`, server section:
```
# Email for sign-up codes (Resend). Set BOTH to turn verification on.
# With neither set, local dev prints codes to the terminal; production skips
# verification. Until a domain is verified in Resend, EMAIL_FROM can only be
# onboarding@resend.dev, which delivers ONLY to the Resend account owner.
# See PROJECT_KNOWLEDGE §6 item 17.
RESEND_API_KEY=
EMAIL_FROM=
```
  - `render.yaml` `envVars`: add `- key: RESEND_API_KEY` / `sync: false` and `- key: EMAIL_FROM` / `sync: false`, with a comment pointing at DEPLOYMENT §2.
  - `docs/DEPLOYMENT.md` §2 table: two rows — `RESEND_API_KEY` (Resend → API Keys; leave unset until a domain is verified) and `EMAIL_FROM` (`Dynamic Learning <hello@your-domain>`; must be on a domain verified in Resend).
- [ ] **Step 4: Docs**
  - `PROJECT_KNOWLEDGE.md` §5 "Accounts": replace the `/signup` wizard table and the "account is created at the end of step 1" warning with the new flow: steps, the two routes, `pendingSignups` (fields, TTL), `emailVerified`/`emailVerifiedAt` (absent = never asked), `subjects` on children, the draft key `dl.signupDraft`, and where the logic lives (`signupFlow.js`, `signupCopy.js`). Update §6 item 17's last line to say the code is built and only the domain is pending.
  - `PROJECT_IDEAS.md`: delete row #21; in #3 note that `server/email.js` exists and password reset adds a second message to it; in the Suggested Order replace "#21 (question-led sign-up), then #35" with "#35 (the child's first-play intro)".
- [ ] **Step 5: Verify and commit**

Run: `npm test && node --env-file-if-exists=.env --test server/ && npm run lint && npm run build`, then repeat Task 11's V1 and V3 once more, and the regression.
```bash
git add -A
git commit -m "feat(signup): remove the old sign-up wizard and route; env, render.yaml and docs for email verification"
```
