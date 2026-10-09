import test from "node:test";
import assert from "node:assert/strict";
import { copyProgressIds, mergeProgress, migrateProgressDocument } from "./progressDocument.js";

const data = { numbers: { extra: "keep", topics: { counting: { completedChallenges: [1, 2], note: "keep" } } } };
test("v1 and pre-version account documents read losslessly without a storage write", () => {
  const old = { _id: "old", data, extra: "keep" };
  const migrated = migrateProgressDocument(old);
  assert.deepEqual(migrated, { ...old, schemaVersion: 1 });
  migrated.data.numbers.topics.counting.completedChallenges.push(3);
  assert.deepEqual(old.data, data);
  assert.equal(migrateProgressDocument(null), null);
});
test("future/invalid versions and missing migration steps fail closed", () => {
  for (const schemaVersion of [2, 0, -1, "1", 1.5]) assert.throws(() => migrateProgressDocument({ data, schemaVersion }), /UNSUPPORTED_PROGRESS_VERSION/);
  assert.throws(() => migrateProgressDocument({ data }, { version: 2 }), /PROGRESS_MIGRATION_REQUIRED/);
});
test("a numbered rename migration retains originals, metadata, collisions and numeric IDs", () => {
  const old = { data: mergeProgress(data, { renamed: { topics: { new: { completedChallenges: [3] } } } }) };
  const result = migrateProgressDocument(old, { version: 2, migrations: { 1: (doc) => ({ ...doc, data: copyProgressIds(doc.data, {
    categories: { numbers: "renamed" }, topics: { "numbers/counting": "new" }, challenges: { "numbers/counting/2": 4 },
  }) }) } });
  assert.deepEqual(result.data.numbers, data.numbers);
  assert.deepEqual(result.data.renamed.topics.new.completedChallenges, [3, 1, 4]);
  assert.equal(result.data.renamed.topics.new.note, "keep");
  assert.equal(result.schemaVersion, 2);
  assert.deepEqual(old.data.numbers, data.numbers);
});
test("stale saves, empty snapshots and repeated completions cannot remove learning", () => {
  const current = mergeProgress(data, { numbers: { topics: { counting: { completedChallenges: [3] }, other: { completedChallenges: [1] } } } });
  const next = mergeProgress(current, { numbers: { topics: { counting: { completedChallenges: ["1", 4, 4] } } } });
  assert.deepEqual(next.numbers.topics.counting.completedChallenges, [1, 2, 3, 4]);
  assert.equal(next.numbers.topics.counting.note, "keep");
  assert.deepEqual(next.numbers.topics.other.completedChallenges, [1]);
  assert.deepEqual(mergeProgress(next, {}), next);
});
test("multiple topics renamed to the same target retain all their completions", () => {
  const source = { category: { topics: { first: { completedChallenges: [1] }, second: { completedChallenges: [2] } } } };
  const result = copyProgressIds(source, { topics: { "category/first": "combined", "category/second": "combined" } });
  assert.deepEqual(result.category.topics.combined.completedChallenges, [1, 2]);
  assert.deepEqual(result.category.topics.first, source.category.topics.first);
});
