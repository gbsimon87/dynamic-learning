export const journeyFixturePathway = { year: 3, subject: "math", categories: [
  { id: "number---fractions", topics: [{ id: "equal-parts", challengeIds: [1, 2] }, { id: "tenths", challengeIds: [1] }] },
  { id: "measurement", topics: [{ id: "length", challengeIds: [1] }, { id: "mass", challengeIds: [1] }] },
] };
export const journeyFixtureIntro = { version: 1, title: "Share a group fairly",
  learning: ["Find equal groups."], usefulness: "Give everyone the same number of counters.",
  example: { text: "Six counters in two equal groups gives three in each group.",
    model: { renderer: "groups", data: { groups: [["●", "●", "●"], ["●", "●", "●"]] }, alt: "Two groups of three counters." } },
  sources: [{ path: "docs/curriculum/year-3-maths.md", heading: "Number – fractions" }] };
export const journeyFixtureIntroductions = { year: 3, subject: "math", subjectIntroduction: journeyFixtureIntro,
  quests: Object.fromEntries(journeyFixturePathway.categories.map((q) => [q.id, { introduction: journeyFixtureIntro,
    topics: Object.fromEntries(q.topics.map((t) => [t.id, journeyFixtureIntro])) }])) };
export function journeyFixtureBank() {
  let n = 0;
  return { version: 1, quests: journeyFixturePathway.categories.map((q) => q.id), final: true,
    items: journeyFixturePathway.categories.flatMap((q) => q.topics.flatMap((t) => Array.from({ length: 3 }, (_, variant) => {
      const start = ++n;
      return { id: `${t.id}.${variant}`, version: 1, categoryId: q.id, topicId: t.id, objective: "Add three.",
        sourceRefs: journeyFixtureIntro.sources, public: { prompt: `What is ${start} + 3?`, evidence: [], model: null,
          input: { kind: "number", maxDigits: 3 }, speech: { mode: "none" } },
        scoring: { kind: "number", accepted: [start + 3] }, review: { answerText: String(start + 3), explanation: `Count three on from ${start}.` },
        practice: { topicId: t.id, challengeId: 1 } };
    }))) };
}
