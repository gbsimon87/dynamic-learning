import { describe, expect, it } from "vitest";
import { CURRICULUM_JOURNEY_MANIFEST } from "../../shared/curriculumJourneyManifest.js";
import { CURRICULUM_YEARS, CURRICULUM_SUBJECTS, loadCurriculum } from "../../src/data/curriculumRegistry.js";
import { isChallengeImplemented } from "../../src/data/challengeAvailability.js";

describe("journey built-content availability", () => {
  it("agrees with Vite availability for every registered challenge, including exclusions", () => {
    const generated = new Set(CURRICULUM_JOURNEY_MANIFEST.flatMap((p) => p.categories.flatMap((c) =>
      c.topics.flatMap((t) => t.challengeIds.map((id) => `${p.year}/${p.subject}/${t.id}/${id}`)))));
    let built = 0;
    for (const year of CURRICULUM_YEARS) for (const { id: subject } of CURRICULUM_SUBJECTS) {
      for (const category of loadCurriculum(year, subject) ?? []) for (const topic of category.topics) {
        for (const challenge of topic.challenges) {
          const implemented = isChallengeImplemented(subject, year, topic.id, challenge.id);
          expect(generated.has(`${year}/${subject}/${topic.id}/${challenge.id}`)).toBe(implemented);
          if (implemented) built++;
        }
      }
    }
    expect(generated.size).toBe(built);
  });
});
