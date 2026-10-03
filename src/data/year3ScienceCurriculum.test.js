import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { year3ScienceCurriculum as curriculum } from "./year3ScienceCurriculum.js";
import { isCurriculumAvailable, loadCurriculum } from "./curriculumRegistry.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { allSubjectsComplete, fullSubjectComplete, fullTopicComplete, getCompletionMilestones } from "./completionMilestones.js";
import { completedScienceActivity } from "./scienceActivities.js";
import { findNextChallenge } from "./curriculumNavigation.js";

const first = curriculum[0].topics[0];
const IMPLEMENTED_FORCE_TOPICS = 5;
const built = (topic, challenge) => topic === first.id && [1, 2, 3, 4].includes(Number(challenge));
test("Science is Year 3 only with five source-ordered categories, 21 topics and 84 independent slots", () => {
  assert.equal(isCurriculumAvailable(3, "science"), true);
  for (const year of [1, 2, 4, 5]) assert.equal(isCurriculumAvailable(year, "science"), false);
  assert.equal(loadCurriculum("3", "science"), curriculum);
  assert.deepEqual(curriculum.map((category) => category.title), ["Plants", "Animals, including humans", "Rocks", "Light", "Forces and magnets"]);
  assert.deepEqual(curriculum.map((category) => category.topics.length), [5, 3, 3, 5, 5]);
  const topics = curriculum.flatMap((category) => category.topics);
  assert.equal(new Set(topics.map((topic) => topic.id)).size, 21);
  assert.equal(new Set(topics.map((topic) => topic.challenges)).size, 21);
  assert.equal(topics.flatMap((topic) => topic.challenges).length, 84);
  for (const topic of topics) assert.deepEqual(topic.challenges.map((challenge) => challenge.id), [1, 2, 3, 4]);
  const source = fs.readFileSync(new URL("../../docs/curriculum/year-3-science.md", import.meta.url), "utf8");
  for (const topic of topics) assert.ok(source.includes(`\`${topic.id}\``), `${topic.id} lacks source mapping`);
});
test("release contains complete Science topics in approved order with no later placeholders", () => {
  for (const category of curriculum) for (const topic of category.topics) for (const challenge of topic.challenges) {
    const pascal = topic.id.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
    const path = new URL(`../pages/skills/science/challenges/year3/${topic.id}/${pascal}Challenge${challenge.id}.jsx`, import.meta.url);
    if ([...curriculum.slice(0, 4).flatMap(c => c.topics), ...curriculum[4].topics.slice(0, IMPLEMENTED_FORCE_TOPICS)].some((builtTopic) => builtTopic.id === topic.id)) {
      const content = fs.readFileSync(path, "utf8");
      assert.ok(content.includes("export default"));
      assert.ok(content.includes(`level={${challenge.id}}`));
      assert.ok(content.includes("onComplete={onComplete}"));
    } else assert.equal(fs.existsSync(path), false, "release topics in approved order");
  }
});
test("first challenge opens on fresh progress, all four are required and expansion preserves completed prefix", () => {
  let progress = {};
  for (let id = 1; id <= 4; id += 1) {
    const state = buildLockState({ curriculum, progress, isBuilt: built });
    const slots = state[0].topics[0].challenges;
    assert.equal(slots[id - 1].locked, false);
    if (id < 4) assert.equal(slots[id].locked, true);
    assert.equal(fullTopicComplete(progress, "plants", first, built), false);
    const result = getCompletionMilestones({ curriculum, progress, categoryId: "plants", topicId: first.id, challengeId: id, isBuilt: built });
    assert.equal(result.earned.includes("topic"), id === 4);
    assert.ok(!result.earned.includes("category"));
    assert.ok(!result.earned.includes("year"));
    progress = completeChallenge(progress, "plants", first.id, id);
  }
  const before = structuredClone(progress);
  assert.equal(fullTopicComplete(progress, "plants", first, built), true);
  assert.equal(fullSubjectComplete(progress, curriculum, built), false);
  const next = curriculum[0].topics[1];
  const expanded = buildLockState({ curriculum, progress, isBuilt: (topic, challenge) => built(topic, challenge) || topic === next.id });
  assert.ok(expanded[0].topics[0].challenges.every((challenge) => challenge.completed && !challenge.locked));
  assert.equal(expanded[0].topics[1].challenges[0].locked, false);
  assert.equal(expanded[0].topics[1].challenges[1].locked, true);
  assert.deepEqual(progress, before);
});
test("optional practical activity is read-only and requires validated Year 3 Science plus strict completion", () => {
  let progress = {};
  const args = { year: "3", subject: "science", categoryId: "plants", topicId: first.id, progress, isBuilt: built };
  assert.equal(completedScienceActivity(args), null);
  for (let id = 1; id <= 4; id += 1) progress = completeChallenge(progress, "plants", first.id, id);
  const before = structuredClone(progress);
  const done = { ...args, progress };
  assert.equal(completedScienceActivity(done).id, "observe-plant-parts");
  for (const change of [{ year: 2 }, { subject: "math" }, { categoryId: "rocks" }, { topicId: "__proto__" }, { progress: null }, { isBuilt: () => false }, { isBuilt: (_, id) => Number(id) < 4 }]) assert.equal(completedScienceActivity({ ...done, ...change }), null);
  assert.deepEqual(progress, before);
});

test("second-topic release preserves the first topic and grants only strict topic completion", () => {
  const second = curriculum[0].topics[1];
  const isBuilt = (topicId, challengeId) => [first.id, second.id].includes(topicId) && [1, 2, 3, 4].includes(Number(challengeId));
  let progress = {};
  assert.equal(buildLockState({ curriculum, progress, isBuilt })[0].topics[1].locked, true);
  for (let id = 1; id <= 4; id += 1) progress = completeChallenge(progress, "plants", first.id, id);
  const firstProgress = structuredClone(progress.plants.topics[first.id]);
  for (let id = 1; id <= 4; id += 1) {
    const state = buildLockState({ curriculum, progress, isBuilt });
    assert.equal(state[0].topics[1].challenges[id - 1].locked, false);
    if (id < 4) assert.equal(state[0].topics[1].challenges[id].locked, true);
    const result = getCompletionMilestones({ curriculum, progress, categoryId: "plants", topicId: second.id, challengeId: id, isBuilt });
    assert.deepEqual(result.earned, id < 4 ? ["challenge"] : ["challenge", "topic"]);
    assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: second.id, progress, isBuilt }), null);
    progress = completeChallenge(progress, "plants", second.id, id);
  }
  assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: second.id, progress, isBuilt }).id, "check-plant-care");
  assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
  assert.deepEqual(progress.plants.topics[first.id], firstProgress);
});

test("third-topic release preserves earlier progress and requires all four water challenges", () => {
  const third = curriculum[0].topics[2];
  const isBuilt = (topicId, challengeId) => curriculum[0].topics.slice(0, 3).some((topic) => topic.id === topicId) && [1, 2, 3, 4].includes(Number(challengeId));
  let progress = {};
  assert.equal(buildLockState({ curriculum, progress, isBuilt })[0].topics[2].locked, true);
  for (const topic of curriculum[0].topics.slice(0, 2)) for (let id = 1; id <= 4; id += 1) progress = completeChallenge(progress, "plants", topic.id, id);
  const earlier = structuredClone(progress);
  for (let id = 1; id <= 4; id += 1) {
    const state = buildLockState({ curriculum, progress, isBuilt });
    assert.equal(state[0].topics[2].challenges[id - 1].locked, false);
    if (id < 4) assert.equal(state[0].topics[2].challenges[id].locked, true);
    const result = getCompletionMilestones({ curriculum, progress, categoryId: "plants", topicId: third.id, challengeId: id, isBuilt });
    assert.deepEqual(result.earned, id < 4 ? ["challenge"] : ["challenge", "topic"]);
    assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: third.id, progress, isBuilt }), null);
    progress = completeChallenge(progress, "plants", third.id, id);
  }
  assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: third.id, progress, isBuilt }).id, "observe-coloured-water");
  for (const topic of curriculum[0].topics.slice(0, 2)) assert.deepEqual(progress.plants.topics[topic.id], earlier.plants.topics[topic.id]);
  assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
});

test("fourth-topic release preserves predecessor progress and awards only strict pollination-topic completion", () => {
  const fourth = curriculum[0].topics[3];
  const isBuilt = (topicId, challengeId) => curriculum[0].topics.slice(0, 4).some((topic) => topic.id === topicId) && [1, 2, 3, 4].includes(Number(challengeId));
  let progress = {};
  assert.equal(buildLockState({ curriculum, progress, isBuilt })[0].topics[3].locked, true);
  for (const topic of curriculum[0].topics.slice(0, 3)) for (let id = 1; id <= 4; id += 1) progress = completeChallenge(progress, "plants", topic.id, id);
  const earlier = structuredClone(progress);
  for (let id = 1; id <= 4; id += 1) {
    const state = buildLockState({ curriculum, progress, isBuilt });
    assert.equal(state[0].topics[3].challenges[id - 1].locked, false);
    if (id < 4) assert.equal(state[0].topics[3].challenges[id].locked, true);
    const result = getCompletionMilestones({ curriculum, progress, categoryId: "plants", topicId: fourth.id, challengeId: id, isBuilt });
    assert.deepEqual(result.earned, id < 4 ? ["challenge"] : ["challenge", "topic"]);
    assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: fourth.id, progress, isBuilt }), null);
    progress = completeChallenge(progress, "plants", fourth.id, id);
  }
  assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: fourth.id, progress, isBuilt }).id, "observe-flower-visits");
  for (const topic of curriculum[0].topics.slice(0, 3)) assert.deepEqual(progress.plants.topics[topic.id], earlier.plants.topics[topic.id]);
  assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
});


test("fifth-topic release completes Plants only after its final slot, preserving all predecessor progress", () => {
  const fifth = curriculum[0].topics[4];
  const isBuilt = (topicId, challengeId) => curriculum[0].topics.some((topic) => topic.id === topicId) && [1,2,3,4].includes(Number(challengeId));
  let progress = {};
  for (const topic of curriculum[0].topics.slice(0,4)) for (let id = 1; id <= 4; id++) progress = completeChallenge(progress, "plants", topic.id, id);
  const earlier = structuredClone(progress);
  for (let id = 1; id <= 4; id++) {
    const state = buildLockState({ curriculum, progress, isBuilt });
    assert.equal(state[0].topics[4].challenges[id - 1].locked, false);
    const result = getCompletionMilestones({ curriculum, progress, categoryId: "plants", topicId: fifth.id, challengeId: id, isBuilt });
    assert.deepEqual(result.earned, id < 4 ? ["challenge"] : ["challenge", "topic", "category"]);
    assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: fifth.id, progress, isBuilt }), null);
    progress = completeChallenge(progress, "plants", fifth.id, id);
  }
  assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: fifth.id, progress, isBuilt }).id, "observe-seed-features");
  assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
  for (const topic of curriculum[0].topics.slice(0,4)) assert.deepEqual(progress.plants.topics[topic.id], earlier.plants.topics[topic.id]);
  const before = structuredClone(progress);
  assert.deepEqual(completeChallenge(progress, "plants", fifth.id, 4), before);
  const expanded = (topicId, challengeId) => isBuilt(topicId, challengeId) || (topicId === curriculum[1].topics[0].id && [1,2,3,4].includes(Number(challengeId)));
  const locks = buildLockState({ curriculum, progress, isBuilt: expanded });
  assert.ok(locks[0].topics.every((topic) => topic.challenges.every((c) => c.completed && !c.locked)));
  assert.equal(locks[1].topics[0].challenges[0].locked, false);
  assert.equal(locks[1].topics[0].challenges[1].locked, true);
});

test("Nutrition release stays behind Plants, preserves its progress and grants only a strict topic award", () => {
  const categoryId = "animals-including-humans";
  const nutrition = curriculum[1].topics[0];
  const isBuilt = (topicId, challengeId) => [...curriculum[0].topics, nutrition].some((topic) => topic.id === topicId) && [1,2,3,4].includes(Number(challengeId));
  let progress = {};
  assert.equal(buildLockState({ curriculum, progress, isBuilt })[1].locked, true);
  for (const topic of curriculum[0].topics) for (let id = 1; id <= 4; id++) progress = completeChallenge(progress, "plants", topic.id, id);
  const plants = structuredClone(progress.plants);
  const activity = () => completedScienceActivity({ year: 3, subject: "science", categoryId, topicId: nutrition.id, progress, isBuilt });
  for (let id = 1; id <= 4; id++) {
    const state = buildLockState({ curriculum, progress, isBuilt });
    assert.ok(state[0].topics.every((topic) => topic.challenges.every((slot) => slot.completed && !slot.locked)));
    assert.equal(state[1].topics[0].challenges[id - 1].locked, false);
    if (id < 4) assert.equal(state[1].topics[0].challenges[id].locked, true);
    const result = getCompletionMilestones({ curriculum, progress, categoryId, topicId: nutrition.id, challengeId: id, isBuilt });
    assert.deepEqual(result.earned, id < 4 ? ["challenge"] : ["challenge", "topic"]);
    assert.equal(activity(), null);
    progress = completeChallenge(progress, categoryId, nutrition.id, id);
  }
  assert.equal(activity().id, "research-animal-foods");
  assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: "plants", topicId: nutrition.id, progress, isBuilt }), null);
  assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
  assert.deepEqual(progress.plants, plants);
  const before = structuredClone(progress);
  assert.deepEqual(completeChallenge(progress, categoryId, nutrition.id, 4), before);
  const next = curriculum[1].topics[1];
  const expanded = (topicId, challengeId) => isBuilt(topicId, challengeId) || (topicId === next.id && [1,2,3,4].includes(Number(challengeId)));
  const locks = buildLockState({ curriculum, progress, isBuilt: expanded });
  assert.ok(locks[0].topics.every((topic) => topic.challenges.every((slot) => slot.completed && !slot.locked)));
  assert.ok(locks[1].topics[0].challenges.every((slot) => slot.completed && !slot.locked));
  assert.equal(locks[1].topics[1].challenges[0].locked, false);
  assert.equal(locks[1].topics[1].challenges[1].locked, true);
  assert.deepEqual(progress, before);
});

test("Skeletons release preserves Plants/Nutrition, requires four slots and does not award unfinished Animals", () => {
  const categoryId = "animals-including-humans";
  const topic = curriculum[1].topics[1];
  const prefix = [...curriculum[0].topics, ...curriculum[1].topics.slice(0,2)];
  const isBuilt = (topicId, id) => prefix.some(t=>t.id===topicId) && [1,2,3,4].includes(Number(id));
  let progress = {};
  assert.equal(buildLockState({curriculum,progress,isBuilt})[1].topics[1].locked,true);
  for(const earlier of prefix.slice(0,-1))for(let id=1;id<=4;id++)progress=completeChallenge(progress,earlier===curriculum[1].topics[0]?categoryId:"plants",earlier.id,id);
  const before=structuredClone(progress);
  for(let id=1;id<=4;id++){
    const locks=buildLockState({curriculum,progress,isBuilt});assert.equal(locks[1].topics[1].challenges[id-1].locked,false);if(id<4)assert.equal(locks[1].topics[1].challenges[id].locked,true);
    assert.deepEqual(getCompletionMilestones({curriculum,progress,categoryId,topicId:topic.id,challengeId:id,isBuilt}).earned,id<4?["challenge"]:["challenge","topic"]);
    assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}),null);
    progress=completeChallenge(progress,categoryId,topic.id,id);
  }
  assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}).id,"compare-skeleton-pictures");
  assert.deepEqual(progress.plants,before.plants);assert.deepEqual(progress[categoryId].topics[curriculum[1].topics[0].id],before[categoryId].topics[curriculum[1].topics[0].id]);assert.equal(fullSubjectComplete(progress,curriculum,isBuilt),false);
  const snapshot=structuredClone(progress);assert.deepEqual(completeChallenge(progress,categoryId,topic.id,4),snapshot);
  const expanded=(topicId,id)=>isBuilt(topicId,id)||(topicId===curriculum[1].topics[2].id && [1,2,3,4].includes(Number(id)));
  const locks=buildLockState({curriculum,progress,isBuilt:expanded});assert.equal(locks[1].topics[2].challenges[0].locked,false);assert.equal(locks[1].topics[2].challenges[1].locked,true);assert.ok(locks[0].topics.every(t=>t.challenges.every(c=>c.completed&&!c.locked)));assert.ok(locks[1].topics.slice(0,2).every(t=>t.challenges.every(c=>c.completed&&!c.locked)));assert.deepEqual(progress,snapshot);
});

test("Muscles completes Animals only on the fourth slot, preserves earlier progress and leaves Science unfinished",()=>{
 const categoryId="animals-including-humans",topic=curriculum[1].topics[2];
 const prefix=[...curriculum[0].topics,...curriculum[1].topics];
 const isBuilt=(topicId,id)=>prefix.some(t=>t.id===topicId)&&[1,2,3,4].includes(Number(id));
 let progress={};assert.equal(buildLockState({curriculum,progress,isBuilt})[1].topics[2].locked,true);
 for(const category of curriculum.slice(0,2))for(const t of category.topics)if(t.id!==topic.id)for(let id=1;id<=4;id++)progress=completeChallenge(progress,category.id,t.id,id);
 const before=structuredClone(progress);
 for(let id=1;id<=4;id++){
  const locks=buildLockState({curriculum,progress,isBuilt});assert.equal(locks[1].topics[2].challenges[id-1].locked,false);if(id<4)assert.equal(locks[1].topics[2].challenges[id].locked,true);
  assert.deepEqual(getCompletionMilestones({curriculum,progress,categoryId,topicId:topic.id,challengeId:id,isBuilt}).earned,id<4?["challenge"]:["challenge","topic","category"]);
  assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}),null);
  progress=completeChallenge(progress,categoryId,topic.id,id);
 }
 assert.equal(fullSubjectComplete(progress,curriculum,isBuilt),false);assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}).id,"compare-movement-models");
 assert.deepEqual(progress.plants,before.plants);for(const t of curriculum[1].topics.slice(0,2))assert.deepEqual(progress[categoryId].topics[t.id],before[categoryId].topics[t.id]);
 const snapshot=structuredClone(progress);assert.deepEqual(completeChallenge(progress,categoryId,topic.id,4),snapshot);
 const expanded=(topicId,id)=>isBuilt(topicId,id)||(topicId===curriculum[2].topics[0].id&&[1,2,3,4].includes(Number(id)));
 const locks=buildLockState({curriculum,progress,isBuilt:expanded});assert.ok(locks.slice(0,2).every(c=>c.topics.every(t=>t.challenges.every(s=>s.completed&&!s.locked))));assert.equal(locks[2].topics[0].challenges[0].locked,false);assert.equal(locks[2].topics[0].challenges[1].locked,true);assert.deepEqual(progress,snapshot);
});

test("first Rocks release preserves Plants/Animals, requires all slots and awards no unfinished category",()=>{
 const categoryId="rocks",topic=curriculum[2].topics[0],prefix=[...curriculum[0].topics,...curriculum[1].topics,topic];
 const isBuilt=(topicId,id)=>prefix.some(t=>t.id===topicId)&&[1,2,3,4].includes(Number(id));
 let progress={};assert.equal(buildLockState({curriculum,progress,isBuilt})[2].locked,true);
 for(const c of curriculum.slice(0,2))for(const t of c.topics)for(let id=1;id<=4;id++)progress=completeChallenge(progress,c.id,t.id,id);
 const before=structuredClone(progress);
 for(let id=1;id<=4;id++){
  const locks=buildLockState({curriculum,progress,isBuilt});assert.equal(locks[2].topics[0].challenges[id-1].locked,false);if(id<4)assert.equal(locks[2].topics[0].challenges[id].locked,true);
  assert.deepEqual(getCompletionMilestones({curriculum,progress,categoryId,topicId:topic.id,challengeId:id,isBuilt}).earned,id<4?["challenge"]:["challenge","topic"]);
  assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}),null);progress=completeChallenge(progress,categoryId,topic.id,id);
 }
 assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}).id,"observe-rock-features");assert.equal(fullSubjectComplete(progress,curriculum,isBuilt),false);assert.deepEqual(progress.plants,before.plants);assert.deepEqual(progress["animals-including-humans"],before["animals-including-humans"]);
 const snapshot=structuredClone(progress);assert.deepEqual(completeChallenge(progress,categoryId,topic.id,4),snapshot);
 const expanded=(topicId,id)=>isBuilt(topicId,id)||(topicId===curriculum[2].topics[1].id&&[1,2,3,4].includes(Number(id)));
 const locks=buildLockState({curriculum,progress,isBuilt:expanded});assert.equal(locks[2].topics[1].challenges[0].locked,false);assert.equal(locks[2].topics[1].challenges[1].locked,true);assert.ok(locks.slice(0,2).every(c=>c.topics.every(t=>t.challenges.every(s=>s.completed&&!s.locked))));assert.deepEqual(progress,snapshot);
});

test("Fossils release preserves earlier Science progress and requires all slots without awarding unfinished Rocks",()=>{
 const categoryId="rocks",topic=curriculum[2].topics[1],prefix=[...curriculum[0].topics,...curriculum[1].topics,...curriculum[2].topics.slice(0,2)];
 const isBuilt=(topicId,id)=>prefix.some(t=>t.id===topicId)&&[1,2,3,4].includes(Number(id));
 let progress={};assert.equal(buildLockState({curriculum,progress,isBuilt})[2].topics[1].locked,true);
 for(const c of curriculum.slice(0,3))for(const t of c.topics)if(prefix.some(p=>p.id===t.id)&&t.id!==topic.id)for(let id=1;id<=4;id++)progress=completeChallenge(progress,c.id,t.id,id);
 const before=structuredClone(progress);
 for(let id=1;id<=4;id++){
  const locks=buildLockState({curriculum,progress,isBuilt});assert.equal(locks[2].topics[1].challenges[id-1].locked,false);if(id<4)assert.equal(locks[2].topics[1].challenges[id].locked,true);
  assert.deepEqual(getCompletionMilestones({curriculum,progress,categoryId,topicId:topic.id,challengeId:id,isBuilt}).earned,id<4?["challenge"]:["challenge","topic"]);assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}),null);progress=completeChallenge(progress,categoryId,topic.id,id);
 }
 assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}).id,"research-fossil-evidence");assert.equal(fullSubjectComplete(progress,curriculum,isBuilt),false);assert.deepEqual(progress.plants,before.plants);assert.deepEqual(progress["animals-including-humans"],before["animals-including-humans"]);assert.deepEqual(progress.rocks.topics[curriculum[2].topics[0].id],before.rocks.topics[curriculum[2].topics[0].id]);
 const snapshot=structuredClone(progress);assert.deepEqual(completeChallenge(progress,categoryId,topic.id,4),snapshot);
 const expanded=(topicId,id)=>isBuilt(topicId,id)||(topicId===curriculum[2].topics[2].id&&[1,2,3,4].includes(Number(id)));
 const locks=buildLockState({curriculum,progress,isBuilt:expanded});assert.equal(locks[2].topics[2].challenges[0].locked,false);assert.equal(locks[2].topics[2].challenges[1].locked,true);assert.ok(locks.slice(0,2).every(c=>c.topics.every(t=>t.challenges.every(s=>s.completed&&!s.locked))));assert.ok(locks[2].topics.slice(0,2).every(t=>t.challenges.every(s=>s.completed&&!s.locked)));assert.deepEqual(progress,snapshot);
});

test("Soil completes Rocks only at slot four, preserves earlier progress and opens future Light",()=>{
 const categoryId="rocks",topic=curriculum[2].topics[2],prefix=curriculum.slice(0,3).flatMap(c=>c.topics);
 const isBuilt=(topicId,id)=>prefix.some(t=>t.id===topicId)&&[1,2,3,4].includes(Number(id));
 let progress={};assert.equal(buildLockState({curriculum,progress,isBuilt})[2].topics[2].locked,true);
 for(const c of curriculum.slice(0,3))for(const t of c.topics)if(t.id!==topic.id)for(let id=1;id<=4;id++)progress=completeChallenge(progress,c.id,t.id,id);
 const before=structuredClone(progress);
 for(let id=1;id<=4;id++){
 const locks=buildLockState({curriculum,progress,isBuilt});assert.equal(locks[2].topics[2].challenges[id-1].locked,false);if(id<4)assert.equal(locks[2].topics[2].challenges[id].locked,true);
 assert.deepEqual(getCompletionMilestones({curriculum,progress,categoryId,topicId:topic.id,challengeId:id,isBuilt}).earned,id<4?["challenge"]:["challenge","topic","category"]);
 assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}),null);progress=completeChallenge(progress,categoryId,topic.id,id);
 }
 assert.equal(completedScienceActivity({year:3,subject:"science",categoryId,topicId:topic.id,progress,isBuilt}).id,"observe-soil-pictures");assert.equal(fullSubjectComplete(progress,curriculum,isBuilt),false);assert.deepEqual(progress.plants,before.plants);assert.deepEqual(progress["animals-including-humans"],before["animals-including-humans"]);for(const t of curriculum[2].topics.slice(0,2))assert.deepEqual(progress.rocks.topics[t.id],before.rocks.topics[t.id]);
 const snapshot=structuredClone(progress);assert.deepEqual(completeChallenge(progress,categoryId,topic.id,4),snapshot);
 const expanded=(topicId,id)=>isBuilt(topicId,id)||(topicId===curriculum[3].topics[0].id&&[1,2,3,4].includes(Number(id)));
 const locks=buildLockState({curriculum,progress,isBuilt:expanded});assert.equal(locks[3].topics[0].challenges[0].locked,false);assert.equal(locks[3].topics[0].challenges[1].locked,true);assert.ok(locks.slice(0,3).every(c=>c.topics.every(t=>t.challenges.every(s=>s.completed&&!s.locked))));assert.deepEqual(progress,snapshot);
});

test("first Light release preserves completed categories, requires all slots and awards no unfinished Light or Science", () => {
  const categoryId = "light", topic = curriculum[3].topics[0], prefix = [...curriculum.slice(0, 3).flatMap(c => c.topics), topic];
  const isBuilt = (topicId, id) => prefix.some(t => t.id === topicId) && [1, 2, 3, 4].includes(Number(id));
  let progress = {}; assert.equal(buildLockState({ curriculum, progress, isBuilt })[3].topics[0].locked, true);
  for (const c of curriculum.slice(0, 3)) for (const t of c.topics) for (let id = 1; id <= 4; id++) progress = completeChallenge(progress, c.id, t.id, id);
  const before = structuredClone(progress);
  for (let id = 1; id <= 4; id++) {
    const locks = buildLockState({ curriculum, progress, isBuilt }); assert.equal(locks[3].topics[0].challenges[id - 1].locked, false); if (id < 4) assert.equal(locks[3].topics[0].challenges[id].locked, true);
    assert.deepEqual(getCompletionMilestones({ curriculum, progress, categoryId, topicId: topic.id, challengeId: id, isBuilt }).earned, id < 4 ? ["challenge"] : ["challenge", "topic"]);
    assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId, topicId: topic.id, progress, isBuilt }), null); progress = completeChallenge(progress, categoryId, topic.id, id);
  }
  assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId, topicId: topic.id, progress, isBuilt }).id, "compare-light-pictures"); assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
  for (const c of curriculum.slice(0, 3)) assert.deepEqual(progress[c.id], before[c.id]);
  const snapshot = structuredClone(progress); assert.deepEqual(completeChallenge(progress, categoryId, topic.id, 4), snapshot);
  const expanded = (topicId, id) => isBuilt(topicId, id) || (topicId === curriculum[3].topics[1].id && [1, 2, 3, 4].includes(Number(id)));
  const locks = buildLockState({ curriculum, progress, isBuilt: expanded }); assert.equal(locks[3].topics[1].challenges[0].locked, false); assert.equal(locks[3].topics[1].challenges[1].locked, true); assert.ok(locks.slice(0, 3).every(c => c.topics.every(t => t.challenges.every(s => s.completed && !s.locked)))); assert.deepEqual(progress, snapshot);
});

test("complete Light path preserves earlier work, grants its category only at the final slot and expands to Forces", () => {
  const isBuilt = (topicId, challengeId) => {
    const pascal = topicId.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("");
    return fs.existsSync(new URL(`../pages/skills/science/challenges/year3/${topicId}/${pascal}Challenge${challengeId}.jsx`, import.meta.url));
  };
  let progress = {};
  for (const c of curriculum.slice(0, 3)) for (const t of c.topics) for (let id = 1; id <= 4; id++) progress = completeChallenge(progress, c.id, t.id, id);
  const earlier = structuredClone(progress);
  const light = curriculum[3];
  const activityIds = ["compare-light-pictures", "compare-reflection-pictures", null, "compare-shadow-pictures", "compare-shadow-measurements"];
  for (const [index, topic] of light.topics.entries()) {
    for (let id = 1; id <= 4; id++) {
      const locks = buildLockState({ curriculum, progress, isBuilt });
      assert.equal(locks[3].topics[index].challenges[id - 1].locked, false);
      if (id < 4) assert.equal(locks[3].topics[index].challenges[id].locked, true);
      if (index < 4) assert.equal(locks[3].topics[index + 1].locked, true);
      const earned = id < 4 ? ["challenge"] : index === 4 ? ["challenge", "topic", "category"] : ["challenge", "topic"];
      assert.deepEqual(getCompletionMilestones({ curriculum, progress, categoryId: light.id, topicId: topic.id, challengeId: id, isBuilt }).earned, earned);
      assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: light.id, topicId: topic.id, progress, isBuilt }), null);
      progress = completeChallenge(progress, light.id, topic.id, String(id));
      assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
      const beforeReplay = structuredClone(progress);
      assert.deepEqual(completeChallenge(progress, light.id, topic.id, id), beforeReplay);
      assert.ok(progress.light.topics[topic.id].completedChallenges.every(Number.isInteger));
      const next = findNextChallenge(buildLockState({ curriculum, progress, isBuilt }), { categoryId: light.id, topicId: topic.id, challengeId: id });
      if (id < 4) assert.equal(next.challengeId, id + 1);
      else if (index < 4) assert.equal(next.topicId, light.topics[index + 1].id);
      else assert.deepEqual(next, { categoryId: curriculum[4].id, topicId: curriculum[4].topics[0].id, challengeId: 1 });
    }
    assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: light.id, topicId: topic.id, progress, isBuilt })?.id ?? null, activityIds[index]);
    assert.equal(fullTopicComplete(progress, light.id, topic, isBuilt), true);
    for (const c of curriculum.slice(0, 3)) assert.deepEqual(progress[c.id], earlier[c.id]);
  }
  const snapshot = structuredClone(progress);
  const nextTopic = curriculum[4].topics[0];
  const expanded = (topicId, id) => isBuilt(topicId, id) || (topicId === nextTopic.id && [1, 2, 3, 4].includes(Number(id)));
  const locks = buildLockState({ curriculum, progress, isBuilt: expanded });
  assert.ok(locks.slice(0, 4).every(c => c.topics.every(t => t.challenges.every(slot => slot.completed && !slot.locked))));
  assert.equal(locks[4].topics[0].challenges[0].locked, false);
  assert.equal(locks[4].topics[0].challenges[1].locked, true);
  assert.deepEqual(progress, snapshot);
});

test("Forces release prefix preserves previous categories, awards strictly and keeps all earlier challenges replayable", () => {
  const prefix = curriculum[4].topics.slice(0, IMPLEMENTED_FORCE_TOPICS);
  const isBuilt = (topicId, challengeId) => {
    const pascal = topicId.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("");
    return fs.existsSync(new URL(`../pages/skills/science/challenges/year3/${topicId}/${pascal}Challenge${challengeId}.jsx`, import.meta.url));
  };
  let progress = {};
  assert.equal(buildLockState({ curriculum, progress, isBuilt })[4].locked, true);
  for (const category of curriculum.slice(0, 4)) for (const topic of category.topics) for (let id = 1; id <= 4; id++) progress = completeChallenge(progress, category.id, topic.id, id);
  const previous = structuredClone(progress);
  for (const [index, topic] of prefix.entries()) for (let id = 1; id <= 4; id++) {
    const locks = buildLockState({ curriculum, progress, isBuilt });
    assert.equal(locks[4].topics[index].challenges[id - 1].locked, false);
    if (id < 4) assert.equal(locks[4].topics[index].challenges[id].locked, true);
    if (index < 4) assert.equal(locks[4].topics[index + 1].locked, true);
    const final = index === 4 && id === 4;
    const expected = id < 4 ? ["challenge"] : final ? ["challenge", "topic", "category", "subject"] : ["challenge", "topic"];
    const args = { curriculum, progress, categoryId: curriculum[4].id, topicId: topic.id, challengeId: id, isBuilt };
    assert.deepEqual(getCompletionMilestones(args).earned, expected);
    assert.deepEqual(getCompletionMilestones({ ...args, otherSubjectsComplete: true }).earned, final ? [...expected, "year"] : expected);
    assert.equal(completedScienceActivity({ year: 3, subject: "science", categoryId: curriculum[4].id, topicId: topic.id, progress, isBuilt }), null);
    progress = completeChallenge(progress, curriculum[4].id, topic.id, String(id));
    assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), final);
    assert.ok(progress[curriculum[4].id].topics[topic.id].completedChallenges.every(Number.isInteger));
    assert.deepEqual(completeChallenge(progress, curriculum[4].id, topic.id, id), progress);
    assert.equal(getCompletionMilestones({ ...args, progress }).level, "practice");
    for (const category of curriculum.slice(0, 4)) assert.deepEqual(progress[category.id], previous[category.id]);
    assert.ok(buildLockState({ curriculum, progress, isBuilt }).slice(0, 4).every(c => c.topics.every(t => t.challenges.every(slot => slot.completed && !slot.locked))));
  }
  if (IMPLEMENTED_FORCE_TOPICS < 5) {
    const next = curriculum[4].topics[IMPLEMENTED_FORCE_TOPICS];
    const expanded = (topic, id) => isBuilt(topic, id) || (topic === next.id && [1, 2, 3, 4].includes(Number(id)));
    const locks = buildLockState({ curriculum, progress, isBuilt: expanded });
    assert.equal(locks[4].topics[IMPLEMENTED_FORCE_TOPICS].challenges[0].locked, false);
    assert.equal(locks[4].topics[IMPLEMENTED_FORCE_TOPICS].challenges[1].locked, true);
    assert.ok(locks[4].topics.slice(0, IMPLEMENTED_FORCE_TOPICS).every(t => t.challenges.every(c => c.completed && !c.locked)));
  }
});

test("complete Science requires all 84 real slots; Year 3 award also requires existing Maths and English", () => {
  const actualAvailability = subject => (topic, id) => {
    const pascal = topic.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("");
    return fs.existsSync(new URL(`../pages/skills/${subject}/challenges/year3/${topic}/${pascal}Challenge${id}.jsx`, import.meta.url));
  };
  const finish = data => data.reduce((progress, category) => category.topics.reduce((progress, topic) => topic.challenges.reduce((progress, c) => completeChallenge(progress, category.id, topic.id, c.id), progress), progress), {});
  const maths = loadCurriculum(3, "math"), english = loadCurriculum(3, "english");
  const previous = [{ curriculum: maths, progress: finish(maths), isBuilt: actualAvailability("math") }, { curriculum: english, progress: finish(english), isBuilt: actualAvailability("english") }];
  const snapshot = previous.map(s => structuredClone(s.progress));
  assert.equal(allSubjectsComplete(previous), true);
  const finalTopic = curriculum[4].topics[4], isBuilt = actualAvailability("science");
  let progress = {};
  for (const category of curriculum) for (const topic of category.topics) for (const c of topic.challenges) if (topic.id !== finalTopic.id || c.id !== 4) progress = completeChallenge(progress, category.id, topic.id, c.id);
  const args = { curriculum, progress, categoryId: curriculum[4].id, topicId: finalTopic.id, challengeId: 4, isBuilt };
  assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), false);
  assert.equal(allSubjectsComplete([...previous, { curriculum, progress, isBuilt }]), false);
  const othersDone = allSubjectsComplete(previous);
  assert.deepEqual(getCompletionMilestones({ ...args, otherSubjectsComplete: othersDone }).earned, ["challenge", "topic", "category", "subject", "year"]);
  for (const index of [0, 1]) {
    const unfinished = previous.map((s, i) => i === index ? { ...s, progress: {} } : s);
    assert.deepEqual(getCompletionMilestones({ ...args, otherSubjectsComplete: allSubjectsComplete(unfinished) }).earned, ["challenge", "topic", "category", "subject"]);
    assert.equal(allSubjectsComplete(previous.map((s, i) => i === index ? { ...s, progress: null } : s)), false);
  }
  progress = completeChallenge(progress, curriculum[4].id, finalTopic.id, 4);
  assert.equal(fullSubjectComplete(progress, curriculum, isBuilt), true);
  assert.equal(fullSubjectComplete(progress, curriculum, (topic, id) => isBuilt(topic, id) && !(topic === finalTopic.id && Number(id) === 4)), false);
  assert.equal(allSubjectsComplete([...previous, { curriculum, progress, isBuilt }]), true);
  assert.equal(findNextChallenge(buildLockState({ curriculum, progress, isBuilt }), { categoryId: curriculum[4].id, topicId: finalTopic.id, challengeId: 4 }), null);
  assert.deepEqual(previous.map(s => s.progress), snapshot);
});
