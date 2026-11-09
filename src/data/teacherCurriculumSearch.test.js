import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { CURRICULUM_YEARS, CURRICULUM_SUBJECTS, loadCurriculum } from "./curriculumRegistry.js";
import { getTeacherCurriculum, teachingFromBriefing } from "./teacherPlanningResources.js";
import { getBriefingNotes } from "./teacherBriefings/index.js";
import { searchLearningNeeds } from "./teacherResourceCatalogue.js";
import { compileClassEvidence } from "./teacherClassInput.js";
import { generateTeachingPlan } from "./teacherPlanning.js";
import { getResourceExample } from "./teacherResourceExamples.js";

const keys = new Set(readdirSync(new URL("../pages/skills/", import.meta.url), { recursive: true }).map((name) => name.replaceAll("\\", "/")).flatMap((name) => {
  const match = name.match(/^([^/]+)\/challenges\/year(\d+)\/([^/]+)\/[^/]+Challenge(\d+)\.jsx$/);
  return match ? [`${match[1]}:${match[2]}:${match[3]}:${match[4]}`] : [];
}));
const isBuilt = (subject, year, topic, challenge) => keys.has(`${subject}:${year}:${topic}:${challenge}`);
const maths = getTeacherCurriculum({ isBuilt });
const search = (query, catalogue = maths) => searchLearningNeeds(query, catalogue.resources, catalogue.needs);

test("every registered year/subject indexes every built challenge with original identities and no cross-course leakage", () => {
  let courses = 0;
  for (const year of CURRICULUM_YEARS) for (const subject of CURRICULUM_SUBJECTS) {
    const curriculum = loadCurriculum(year, subject.id);
    if (!curriculum) continue;
    courses += 1;
    const catalogue = getTeacherCurriculum({ year, subject: subject.id, isBuilt });
    const expected = curriculum.flatMap((category) => category.topics.flatMap((topic) => topic.challenges.filter((challenge) => isBuilt(subject.id, year, topic.id, challenge.id)).map((challenge) => `/year/${year}/${subject.id}/problem/${category.id}/${topic.id}/${challenge.id}`)));
    const actual = catalogue.resources.filter((resource) => resource.kind === "curriculum" && resource.available);
    assert.deepEqual(actual.map((resource) => resource.to), expected);
    assert.equal(new Set(actual.map((resource) => resource.id)).size, actual.length);
    for (const resource of actual) {
      assert.equal(resource.year, year); assert.equal(resource.subject, subject.id);
      assert.ok(resource.needIds.some((id) => catalogue.needs.some((need) => need.id === id)), resource.id);
      assert.ok(catalogue.objectives.some((objective) => objective.id === resource.topicId));
    }
  }
  assert.equal(courses, 39);
  assert.equal(maths.resources.filter((resource) => resource.kind === "curriculum" && resource.available).length, 176);
  assert.equal(maths.objectives.length, 44);
});

test("quick search finds non-pilot topics, typos, prefixes, classroom terms and individual lesson text", () => {
  for (const query of ["perimter", "peri"]) assert.ok(search(query).some((match) => match.need.objectiveId === "perimeter-of-2-d-shapes"));
  assert.ok(search("weight").some((match) => match.need.objectiveId === "measuring-mass"));
  assert.ok(search("colum addition").some((match) => match.need.objectiveId === "column-addition"));
  assert.ok(search("work out the change")[0].resources.some((resource) => resource.topicId === "money-and-giving-change" && resource.challengeId === 2));
  const one = search("Read millimetres on a ruler")[0];
  assert.equal(one.need.objectiveId, "measuring-length-in-mm-cm-and-m");
  assert.deepEqual(one.resources.map((resource) => resource.challengeId), [1]);
  assert.deepEqual(search("photosynthesis"), []);
  const science = getTeacherCurriculum({ year: 3, subject: "science", isBuilt });
  assert.ok(search("fossils", science).some((match) => match.resources.every((resource) => resource.subject === "science")));
  const english = getTeacherCurriculum({ year: 4, subject: "english", isBuilt });
  assert.ok(search("fronted adverbials", english).length > 0);
});

test("a selected matching challenge survives input compilation and is used throughout the automatically generated plan", () => {
  const match = search("Read millimetres on a ruler")[0];
  const resource = match.resources[0];
  const evidence = compileClassEvidence([{ needId: match.need.id, priority: "teach", resourceIds: [resource.id] }], "teacher", maths);
  const plan = generateTeachingPlan({ selectedIds: [match.need.objectiveId], evidence, resources: maths.resources, objectives: maths.objectives, evidenceMeta: { source: "teacher" } });
  assert.ok(plan.lessons.every((lesson) => lesson.resources.length === 1 && lesson.resources[0].resourceId === resource.id));
  // Topics with briefing notes teach from the teacher notes; the selected
  // challenge's worked example still drives the activity.
  assert.equal(plan.lessons[0].teaching, teachingFromBriefing(resource.topicName, getBriefingNotes(3, "math", resource.topicId)).teach);
  assert.match(plan.lessons[0].activity, /3 marks past 50/);
  assert.equal(getResourceExample(resource).origin, "lesson");
  evidence[0].needs[0].resourceIds.push("edited");
  assert.deepEqual(plan.snapshots[0].needs[0].resourceIds, [resource.id]);
  assert.throws(() => compileClassEvidence([{ needId: match.need.id, priority: "teach", resourceIds: [maths.resources.find((entry) => entry.topicId === "column-addition").id] }], "teacher", maths), /belonging/);
});

test("class entry is not capped at the nine pilot needs", () => {
  const evidence = compileClassEvidence(maths.needs.slice(0, 12).map((need) => ({ needId: need.id, priority: "teach" })), "teacher", maths);
  assert.equal(evidence.reduce((total, row) => total + row.needs.length, 0), 12);
  const plan = generateTeachingPlan({ resources: maths.resources, objectives: maths.objectives, selectedIds: evidence.map((row) => row.objectiveId), evidence });
  assert.equal(new Set(plan.lessons.map((lesson) => lesson.needId)).size, 12);
});

test("other years/subjects generate correctly labelled plans and cannot borrow Year 3 fraction examples or unavailable challenges", () => {
  const science = getTeacherCurriculum({ year: 3, subject: "science", isBuilt });
  const match = search("fossils", science)[0];
  const evidence = compileClassEvidence([{ needId: match.need.id, priority: "teach" }], "teacher", science);
  const plan = generateTeachingPlan({ ...science, selectedIds: [match.need.objectiveId], evidence });
  assert.equal(plan.subject, "science"); assert.equal(plan.subjectName, "Science");
  assert.match(plan.title, /Year 3 science/);
  assert.ok(plan.lessons.every((lesson) => lesson.resources.every((entry) => science.resources.some((resource) => resource.id === entry.resourceId && resource.available))));
  const year4 = getTeacherCurriculum({ year: 4, subject: "math", isBuilt });
  const fraction = year4.resources.find((resource) => resource.topicId.includes("equivalent") && resource.lesson);
  assert.ok(fraction, "Year 4 equivalent-fractions lesson exists");
  assert.equal(getResourceExample(fraction)?.origin, "lesson");
  const missing = getTeacherCurriculum({ isBuilt: () => false });
  assert.deepEqual(missing.needs, []); assert.deepEqual(missing.objectives, []);
  assert.deepEqual(search("perimeter", missing), []);
});

test("plans share one body of subject knowledge with the topic briefings", () => {
  const notes = getBriefingNotes(3, "math", "column-subtraction");
  const objective = maths.objectives.find((entry) => entry.id === "column-subtraction");
  assert.equal(objective.source, "briefing");
  assert.match(objective.teach, new RegExp(notes.inBrief.slice(0, 30)));
  assert.ok(objective.support.includes(notes.misconceptions[0].mistake) && objective.support.includes(notes.misconceptions[0].response));
  assert.ok(objective.checkpoint.includes(notes.misconceptions[1].mistake));
  assert.deepEqual(objective.vocabulary, notes.vocabulary.map((word) => word.term));
  assert.equal(objective.briefingPath, "/teachers/briefings/3/math/column-subtraction");
  const plan = generateTeachingPlan({ selectedIds: ["column-subtraction"], resources: maths.resources, objectives: maths.objectives });
  assert.ok(plan.lessons.every((lesson) => lesson.briefingPath === objective.briefingPath && lesson.vocabulary.length === notes.vocabulary.length));
  assert.doesNotMatch(plan.lessons[0].teaching, /classroom materials/);
});

test("hand-written pilot plans keep their activities but gain the briefing vocabulary and link", () => {
  const pilot = maths.objectives.find((entry) => entry.id === "equivalent-fractions");
  assert.equal(pilot.source, "pilot");
  assert.match(pilot.practical, /fold equal-length paper strips/);
  assert.ok(pilot.vocabulary.length >= 4);
  assert.equal(pilot.briefingPath, "/teachers/briefings/3/math/equivalent-fractions");
});

test("topics without notes keep the generic text and no briefing link", () => {
  const year4 = getTeacherCurriculum({ year: 4, subject: "math", isBuilt });
  const generic = year4.objectives.find((entry) => !getBriefingNotes(4, "math", entry.id));
  assert.equal(generic.source, "generic");
  assert.equal(generic.briefingPath, null);
  assert.deepEqual(generic.vocabulary, []);
});
