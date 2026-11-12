import test from "node:test";
import assert from "node:assert/strict";
import { buildJourneyManifest, journeyManifestSource, manifestTotals } from "./journeyManifest.js";
import { checkJourneyCoverage } from "./journeyCoverage.js";
import { CURRICULUM_JOURNEY_MANIFEST } from "../../shared/curriculumJourneyManifest.js";

const manifest = () => buildJourneyManifest({ years: [3], subjects: [{ id: "math" }, { id: "unregistered" }],
  load: (_year, subject) => subject === "math" ? [
    { id: "number---fractions", topics: [{ id: "equal-parts", challenges: [{ id: 1 }, { id: 2 }] },
      { id: "unbuilt-topic", challenges: [{ id: 1 }] }] },
    { id: "empty", topics: [{ id: "another-unbuilt-topic", challenges: [{ id: 1 }] }] },
  ] : null,
  isBuilt: (_year, _subject, topic, challenge) => topic === "equal-parts" && Number(challenge) === 2,
});

test("manifest excludes unbuilt topics/quests and preserves shipped IDs and numeric slots", () => {
  assert.deepEqual(manifest(), [{ year: 3, subject: "math", categories: [
    { id: "number---fractions", topics: [{ id: "equal-parts", challengeIds: [2] }] },
  ] }]);
  assert.deepEqual(manifestTotals(manifest()), { pathways: 1, quests: 1, topics: 1, challenges: 1,
    introductions: 3, assessments: 2, minimumCandidates: 3 });
});

test("generated manifest matches actual registered wrapper files without timestamp churn", () => {
  const actual = buildJourneyManifest();
  assert.equal(journeyManifestSource(actual), journeyManifestSource(CURRICULUM_JOURNEY_MANIFEST));
  assert.equal(journeyManifestSource(buildJourneyManifest()), journeyManifestSource(actual));
});

test("inventory reports every missing scope and does not confuse presence with review", async () => {
  const report = await checkJourneyCoverage(manifest(), { loadIntroductions: async () => null, loadBank: async () => null });
  assert.equal(report.status, "gaps");
  assert.deepEqual(report.authored, { introductions: 0, candidates: 0, assessments: 0 });
  assert.equal(report.results[0].problems.length, 6);
  assert.match(report.results[0].problems.join("\n"), /equal-parts/);
});

test("a loader failure cannot be converted into an empty fresh inventory", async () => {
  await assert.rejects(checkJourneyCoverage(manifest(), { loadIntroductions: async () => { throw new Error("malformed content"); } }), /malformed content/);
});
