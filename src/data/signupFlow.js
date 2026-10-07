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
    // Everything they picked is gone and the new year has subjects to choose from: ask again.
    if (
      "yearGroup" in patch &&
      Array.isArray(learner.subjects) && learner.subjects.length > 0 &&
      Array.isArray(next.subjects) && next.subjects.length === 0 &&
      subjectsForYear(next.yearGroup).length > 0
    ) {
      delete next.subjects;
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

/**
 * Moves the cursor. Arriving at the summary ends an edit, so the "go back to
 * the summary" shortcut is cleared and Back/Next follow the sequence again.
 */
export function withCursor(draft, cursor) {
  return { ...draft, cursor, returnTo: cursor.step === STEP.summary ? null : draft.returnTo };
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

/**
 * The draft that goes into sessionStorage. The birth year is never saved (it
 * stays in memory only), and a draft that was turned away at the gate is not
 * saved at all (null), so nothing about an under-13 survives a reload.
 */
export function serialiseDraft(draft) {
  if (draft.ageBand === GATED) return null;
  const { birthYear: _birthYear, ...saved } = draft;
  return JSON.stringify(saved);
}

function cleanLearner(raw) {
  const learner = { name: raw.name, avatar: typeof raw.avatar === "string" ? raw.avatar : null, colour: typeof raw.colour === "string" ? raw.colour : null };
  if (raw.yearGroup === null || Number.isInteger(raw.yearGroup)) learner.yearGroup = raw.yearGroup;
  if (Array.isArray(raw.subjects) && raw.subjects.every((id) => typeof id === "string")) learner.subjects = raw.subjects;
  return learner;
}

/**
 * Reads a saved draft. It never has a birth year (serialiseDraft drops it) and
 * a gated band is rejected, so nothing about an under-13 is ever restored.
 * Anything unexpected → null (start again) rather than a
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
  // A gated draft is never saved; if one turns up anyway, start again.
  if (data.ageBand === GATED) return null;
  if (data.ageBand !== null && data.ageBand !== undefined && !AGE_BANDS.includes(data.ageBand)) return null;
  if (!data.cursor || !Object.values(STEP).includes(data.cursor.step)) return null;

  const draft = {
    ...emptyDraft(),
    birthYear: null, // never read back: a saved draft holds no birth year
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
    draft.cursor =
      stepsFor(draft).find((c) => stepError(draft, c) !== null) ??
      (isDraftReady(draft) ? { step: STEP.summary } : { step: STEP.birthYear });
  }
  return draft;
}
