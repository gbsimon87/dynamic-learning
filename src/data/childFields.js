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
export const EDITABLE_CHILD_FIELDS = ["name", "avatar", "colour", "yearGroup"];

/**
 * The school years a profile may claim. Matches the curriculum picker's years
 * rather than the whole of primary: offering Year 6 would promise a curriculum
 * that does not exist.
 */
export const CHILD_YEAR_GROUPS = [1, 2, 3];

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

  return out;
}
