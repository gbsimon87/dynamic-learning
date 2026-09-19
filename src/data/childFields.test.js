import test from "node:test";
import assert from "node:assert/strict";

import {
  CHILD_YEAR_GROUPS,
  EDITABLE_CHILD_FIELDS,
  normaliseChildPatch,
  readYearGroup,
} from "./childFields.js";

test("a profile with no yearGroup reads as null, not as a guess", () => {
  assert.equal(readYearGroup({ name: "Mia" }), null);
  assert.equal(readYearGroup(undefined), null);
});

test("a valid yearGroup reads back, however it was stored", () => {
  assert.equal(readYearGroup({ yearGroup: 3 }), 3);
  assert.equal(readYearGroup({ yearGroup: "3" }), 3);
});

test("a yearGroup outside the offered list is treated as unset", () => {
  // Year 6 would promise a curriculum that does not exist.
  assert.equal(readYearGroup({ yearGroup: 6 }), null);
  assert.equal(readYearGroup({ yearGroup: 0 }), null);
});

test("a patch is narrowed to the writable fields", () => {
  const out = normaliseChildPatch({
    name: "  Mia  ",
    avatar: "🦊",
    colour: "--profile-colour-sky",
    yearGroup: 3,
    // None of these may ever be written.
    parentId: "someone-else",
    _id: "hijacked",
    createdAt: "1999-01-01",
  });

  assert.deepEqual(Object.keys(out).sort(), EDITABLE_CHILD_FIELDS.slice().sort());
  assert.equal(out.name, "Mia");
  assert.equal(out.parentId, undefined);
  assert.equal(out._id, undefined);
});

test("absent fields stay absent, so a one-field patch blanks nothing", () => {
  assert.deepEqual(normaliseChildPatch({ yearGroup: 2 }), { yearGroup: 2 });
  assert.deepEqual(normaliseChildPatch({}), {});
  assert.deepEqual(normaliseChildPatch(null), {});
});

test("clearing the year group is allowed — 'I don't know' is a real answer", () => {
  assert.deepEqual(normaliseChildPatch({ yearGroup: null }), { yearGroup: null });
  assert.deepEqual(normaliseChildPatch({ yearGroup: "" }), { yearGroup: null });
});

test("an unoffered year group is rejected rather than stored", () => {
  assert.throws(() => normaliseChildPatch({ yearGroup: 7 }), /INVALID_YEAR_GROUP/);
  assert.throws(() => normaliseChildPatch({ yearGroup: "x" }), /INVALID_YEAR_GROUP/);
});

test("a present-but-empty name is rejected", () => {
  assert.throws(() => normaliseChildPatch({ name: "   " }), /NAME_REQUIRED/);
});

test("every offered year group survives a round trip", () => {
  for (const year of CHILD_YEAR_GROUPS) {
    assert.equal(readYearGroup({ yearGroup: normaliseChildPatch({ yearGroup: year }).yearGroup }), year);
  }
});

test("an explicitly-undefined field means 'not supplied', not 'invalid'", () => {
  // Regression: callers build patches by destructuring, so an argument that
  // never mentioned a year still arrives as `{ yearGroup: undefined }`. Keying
  // off `in` alone read that as a value and rejected it, which broke
  // createChild for every caller that did not pass a year.
  assert.deepEqual(
    normaliseChildPatch({ name: "Mia", avatar: undefined, yearGroup: undefined }),
    { name: "Mia" }
  );
});

test("undefined and null are different: one skips, the other clears", () => {
  assert.deepEqual(normaliseChildPatch({ yearGroup: undefined }), {});
  assert.deepEqual(normaliseChildPatch({ yearGroup: null }), { yearGroup: null });
});
