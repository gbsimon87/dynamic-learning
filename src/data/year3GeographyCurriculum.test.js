import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year3GeographyCurriculum as curriculum } from "./year3GeographyCurriculum.js";
import { countsTowardYear, loadCurriculum, yearAwardSubjectIds } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";
import { buildLockState } from "./curriculumLocks.js";
import { completeChallenge } from "./progressRules.js";
import { completedGeographyActivity } from "./geographyActivities.js";

const IDS = [
  ["the-uk-and-europe", ["counties-cities-and-regions","uk-landscapes-and-land-use","europe-and-russia"]],
  ["lines-on-the-globe", ["the-equator-and-hemispheres","tropics-and-polar-circles","latitude-and-longitude"]],
  ["physical-processes", ["mountains-and-valleys","volcanoes","earthquakes","the-water-cycle"]],
  ["two-european-regions", ["the-lake-district","campania","comparing-two-regions"]],
  ["maps-and-local-surveys", ["eight-compass-points","four-figure-grid-references","surveying-local-land-use"]],
];
const topics = curriculum.flatMap(c => c.topics);
const isBuilt = (id, level) => {
  const name = id.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");
  return existsSync(new URL(`../pages/skills/geography/challenges/year3/${id}/${name}Challenge${level}.jsx`, import.meta.url));
};

test("Year 3 Geography locks all 16 topic IDs, 64 wrapper paths, four slots and certificate outcomes", () => {
  assert.deepEqual(curriculum.map(c=>[c.id,c.topics.map(t=>t.id)]),IDS);
  assert.equal(loadCurriculum("3","geography"),curriculum);
  assert.equal(topics.length,16);
  for (const topic of topics) {
    assert.deepEqual(topic.challenges.map(c=>c.id),[1,2,3,4]);
    assert.ok(TOPIC_SKILLS[`3/geography/${topic.id}`]);
    for (const q of topic.challenges) assert.ok(isBuilt(topic.id,q.id),`${topic.id}/${q.id}`);
  }
  const mapping=readFileSync(new URL("../../docs/curriculum/key-stage-2-geography.md",import.meta.url),"utf8");
  for (const t of topics) assert.ok(mapping.includes(`\`${t.id}\``));
});

test("Geography preserves Year 3 award requirements and does not register other geography years", () => {
  assert.equal(countsTowardYear(3,"geography"),false);
  assert.deepEqual(yearAwardSubjectIds(3),["math","english","science","history"]);
  for (const year of [1,2,4]) assert.equal(loadCurriculum(year,"geography"),null);
});

test("all geography challenges cascade through topics/categories, survive reload, and remain replayable", () => {
  let progress={};
  const locks=()=>buildLockState({curriculum,progress,isBuilt});
  assert.deepEqual(locks()[0].topics[0].challenges.map(c=>c.locked),[false,true,true,true]);
  assert.ok(locks().slice(1).every(c=>c.locked));
  for (const category of curriculum) for (const topic of category.topics) {
    assert.equal(locks().find(c=>c.id===category.id).topics.find(t=>t.id===topic.id).locked,false);
    for (const {id} of topic.challenges) {
      progress=completeChallenge(progress,category.id,topic.id,String(id));
      progress=JSON.parse(JSON.stringify(progress));
      assert.ok(progress[category.id].topics[topic.id].completedChallenges.every(Number.isInteger));
    }
  }
  assert.ok(locks().every(c=>c.complete));
  const before=JSON.stringify(progress);
  progress=completeChallenge(progress,curriculum[0].id,topics[0].id,1);
  assert.equal(JSON.stringify(progress),before);
});

test("grown-up survey is shown only for a completed survey topic and never changes progress", () => {
  const c=curriculum.at(-1),t=c.topics.at(-1),args={year:3,subject:"geography",categoryId:c.id,topicId:t.id,isBuilt};
  assert.equal(completedGeographyActivity({...args,progress:{}}),null);
  let progress={}; for (const id of [1,2,3,4]) progress=completeChallenge(progress,c.id,t.id,id);
  const before=JSON.stringify(progress);
  assert.match(completedGeographyActivity({...args,progress}).note,/does not certify outdoor/);
  assert.equal(completedGeographyActivity({...args,subject:"history",progress}),null);
  assert.equal(JSON.stringify(progress),before);
});
