import { loadCurriculumIntroductions } from "../../src/data/curriculumIntroductions/index.js";
import { loadCurriculumAssessmentBank } from "../../shared/curriculumAssessments/index.js";
import { manifestTotals } from "./journeyManifest.js";
import { introductionForScope } from "../../shared/curriculumJourneyData.js";
import { validateIntroduction } from "../../shared/curriculumJourneyModels.js";
import { validateAssessmentCandidate } from "../../shared/curriculumAssessmentData.js";
import { selectAssessmentItems } from "../../shared/curriculumAssessmentRules.js";
import { existsSync, readFileSync } from "node:fs";
import { REPO_ROOT, repoPath } from "./topics.js";
import { checkEquation } from "../../src/data/lessons/lintLessons.js";

// Content rules the schema cannot express. Each returns a problem or null.
export function modelProblem(model) {
  if (model?.renderer === "lesson" && model.data.type === "equation" && checkEquation(model.data.parts) === false) return "equation in model is false";
  return null;
}
export function itemProblems(item, subject) {
  const problems = [];
  const answer = item.review.answerText.trim().toLowerCase();
  const visible = JSON.stringify(item.public.model ?? null).toLowerCase();
  if (answer.length >= 1 && visible.includes(`"${answer}"`)) problems.push("model shows the answer");
  if (modelProblem(item.public.model)) problems.push(modelProblem(item.public.model));
  const spoken = item.public.speech.mode === "prompt" ? item.public.speech.text.toLowerCase() : "";
  if (["english", "french"].includes(subject) && answer.length >= 3 && spoken.includes(answer)) problems.push("speech reads out the answer");
  if (item.public.input.kind === "choice" && item.public.prompt.toLowerCase().includes(answer) && answer.length >= 4 && item.public.input.options.every((o) => !item.public.prompt.toLowerCase().includes(o.label.toLowerCase()) || o.label.toLowerCase() === answer))
    problems.push("prompt contains the answer but no distractor");
  return problems;
}

export async function checkJourneyCoverage(manifest, { loadIntroductions = loadCurriculumIntroductions,
  loadBank = loadCurriculumAssessmentBank } = {}) {
  const results = [];
  for (const pathway of manifest) {
    const problems = [];
    const intros = await loadIntroductions(pathway.year, pathway.subject);
    const bank = await loadBank(pathway.year, pathway.subject);
    const counts = { introductions: 0, candidates: 0, assessments: 0 };
    const validated = { introductions: 0, candidates: 0, assessments: 0 };
    const checkSources = (refs) => {
      for (const ref of refs) {
        const path = repoPath(REPO_ROOT, ref.path);
        if (!existsSync(path) || !readFileSync(path, "utf8").includes(ref.heading)) throw new Error(`Missing source heading: ${ref.path} / ${ref.heading}`);
      }
    };
    const checkIntro = (scope, label) => {
      const intro = introductionForScope(intros, scope);
      if (!intro) { problems.push(`Missing ${label} introduction${scope === "subject" ? "" : `: ${scope}`}`); return; }
      counts.introductions++;
      try {
        validateIntroduction(intro); checkSources(intro.sources);
        const problem = modelProblem(intro.example.model); if (problem) throw new Error(problem);
        validated.introductions++;
      }
      catch (error) { problems.push(`Invalid ${label} introduction ${scope}: ${error.message}`); }
    };
    checkIntro("subject", "subject");
    for (const quest of pathway.categories) {
      checkIntro(`quest:${quest.id}`, "quest");
      for (const topic of quest.topics) {
        checkIntro(`topic:${quest.id}:${topic.id}`, "topic");
        const items = bank?.items?.filter((item) => item.categoryId === quest.id && item.topicId === topic.id) ?? [];
        counts.candidates += items.length;
        if (items.length < 3) problems.push(`Insufficient candidate pool: ${quest.id}/${topic.id} (${items.length}/3)`);
        const fingerprints = new Set();
        for (const item of items) {
          try {
            validateAssessmentCandidate(item); checkSources(item.sourceRefs);
            const content = itemProblems(item, pathway.subject); if (content.length) throw new Error(content.join("; "));
            if (!topic.challengeIds.includes(item.practice.challengeId)) throw new Error("Unbuilt practice target");
            const fingerprint = JSON.stringify(item.public);
            if (fingerprints.has(fingerprint)) throw new Error("Duplicate candidate content");
            fingerprints.add(fingerprint); validated.candidates++;
          } catch (error) { problems.push(`Invalid candidate ${item.id}: ${error.message}`); }
        }
      }
      if (bank?.quests?.includes(quest.id)) {
        counts.assessments++;
        try { selectAssessmentItems(pathway, bank, { kind: "quest", categoryId: quest.id, rng: () => 0.25 }); validated.assessments++; }
        catch (error) { problems.push(`Invalid quest blueprint ${quest.id}: ${error.message}`); }
      }
      else problems.push(`Missing quest blueprint: ${quest.id}`);
    }
    if (bank?.final) {
      counts.assessments++;
      try { selectAssessmentItems(pathway, bank, { kind: "subject", categoryId: null, rng: () => 0.25 }); validated.assessments++; }
      catch (error) { problems.push(`Invalid final blueprint: ${error.message}`); }
    }
    else problems.push("Missing final-test blueprint");
    results.push({ year: pathway.year, subject: pathway.subject, counts, validated, problems });
  }
  return { expected: manifestTotals(manifest), authored: results.reduce((sum, result) => ({
    introductions: sum.introductions + result.counts.introductions,
    candidates: sum.candidates + result.counts.candidates,
    assessments: sum.assessments + result.counts.assessments,
  }), { introductions: 0, candidates: 0, assessments: 0 }),
  validated: results.reduce((sum, r) => ({ introductions: sum.introductions + r.validated.introductions,
    candidates: sum.candidates + r.validated.candidates, assessments: sum.assessments + r.validated.assessments }),
  { introductions: 0, candidates: 0, assessments: 0 }),
  status: results.some((r) => r.problems.length) ? "gaps" : "pass", results,
  limitations: ["Schemas, source references, built IDs, pool capacity and selection checked. Independent factual/answer review, teaching quality and device review require separate evidence."] };
}
