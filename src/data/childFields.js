/**
 * The editable fields of a child profile — the ONE definition, shared by both
 * store drivers and the server.
 *
 * `updateChild` is a patch, and a patch needs a whitelist: without one, a
 * caller could rewrite `parentId` and hand another family's child to itself, or
 * overwrite `_id` and orphan every progress document pointing at it. Both of
 * those are silent, so the list lives here rather than being written out three
 * times and drifting.
 *
 * Plain ESM with no dependencies, so Vite and Node both read it untransformed.
 */

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

/**
 * The school years a profile may claim. Matches the curriculum picker's years
 * rather than the whole of primary: offering Year 6 would promise a curriculum
 * that does not exist.
 */
export const CHILD_YEAR_GROUPS = [1, 2, 3, 4];

/**
 * A profile created before `yearGroup` existed simply has none, which is the
 * same state as "a grown-up has not said yet" — both mean "ask, don't assume".
 * Never guess a year from progress: a child who tried Year 3 once should not be
 * permanently labelled Year 3.
 */
export function readYearGroup(child) {
  const year = Number(child?.yearGroup);
  return CHILD_YEAR_GROUPS.includes(year) ? year : null;
}

/**
 * Narrows a patch to the writable fields, dropping anything absent so a patch
 * of one field cannot blank the others.
 *
 * @returns {object} the fields to apply; `{}` when the patch sets nothing
 * @throws {Error} NAME_REQUIRED when a name is present but empty
 *                 INVALID_YEAR_GROUP when a year is present but not offered
 *                 INVALID_SUBJECTS when subjects is present but not a list of known ids
 */
export function normaliseChildPatch(patch) {
  const out = {};
  if (!patch || typeof patch !== "object") return out;

  // `undefined` means "not supplied", NOT "set to nothing". Callers build these
  // objects by destructuring — `{ name, avatar, colour, yearGroup }` from an
  // argument that never mentioned a year still HAS a `yearGroup` key, holding
  // undefined. Keying off `in` alone read that as an explicit value and
  // rejected it. `null` remains meaningful and distinct: "clear this".
  const supplied = (field) => field in patch && patch[field] !== undefined;

  if (supplied("name")) {
    const trimmed = String(patch.name ?? "").trim();
    // A patch may leave the name alone, but it may never blank it — an unnamed
    // profile is unpickable on a screen whose cards ARE the names.
    if (!trimmed) throw new Error("NAME_REQUIRED");
    out.name = trimmed;
  }

  if (supplied("avatar")) out.avatar = patch.avatar ?? null;
  if (supplied("colour")) out.colour = patch.colour ?? null;

  if (supplied("yearGroup")) {
    // null is a legitimate value: "actually, I don't know their year".
    if (patch.yearGroup === null || patch.yearGroup === "") {
      out.yearGroup = null;
    } else {
      const year = Number(patch.yearGroup);
      if (!CHILD_YEAR_GROUPS.includes(year)) throw new Error("INVALID_YEAR_GROUP");
      out.yearGroup = year;
    }
  }

  if (supplied("subjects")) out.subjects = normaliseSubjects(patch.subjects);

  return out;
}

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
