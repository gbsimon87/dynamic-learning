import test from "node:test";
import assert from "node:assert/strict";
import { buildMusclesQuestions, ROLE_BANK, COMPARE_BANK, EXPLANATION_BANK, ENQUIRY_BANK, isMovementExplanationCorrect, isMovementRecordCorrect } from "./musclesAndMovement.js";
import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";
import { MOVEMENT_POSES, movementGeometry } from "../../movementDiagram.js";
function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }
test("movement banks meet replay depth and each choice has one explicit answer", () => {
  for (const [bank, count] of [[ROLE_BANK,15],[COMPARE_BANK,15],[EXPLANATION_BANK,15],[ENQUIRY_BANK,9]]) {
    assert.equal(bank.length,count);assert.equal(new Set(bank.map(q=>q.id)).size,count);
    for(const q of bank) if(q.options) { assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(o=>o===q.answer).length,1); }
  }
  const before=JSON.stringify([ROLE_BANK,COMPARE_BANK,EXPLANATION_BANK,ENQUIRY_BANK]);
  for(let seed=1;seed<=50;seed++)for(let level=1;level<=4;level++) {
    const run=buildMusclesQuestions(level,rng(seed));
    assert.equal(run.length,level===4?3:5);assert.equal(new Set(run.map(q=>q.id)).size,run.length);
    assert.deepEqual(run,buildMusclesQuestions(level,rng(seed)));
    if(level===4)assert.deepEqual(run.map(q=>q.group).sort(),["bend","return","straighten"]);
    for(const q of run) {
      if(q.clauses) { assert.equal(new Set(q.tiles.map(t=>t.id)).size,5);assert.equal(isMovementExplanationCorrect(q,q.correctConclusionIds),true); }
      for(const s of q.stages)assert.ok(MOVEMENT_POSES[s.pose]);
    }
  }
  assert.equal(JSON.stringify([ROLE_BANK,COMPARE_BANK,EXPLANATION_BANK,ENQUIRY_BANK]),before);
  for(const level of [0,5,"1",null])assert.throws(()=>buildMusclesQuestions(level,rng(1)),RangeError);
});
test("compare answers describe the actual supplied pose sequences",()=>{
  for(const q of COMPARE_BANK) {
    const angles=q.poses.map(p=>MOVEMENT_POSES[p].angle);
    assert.equal(angles.length,3);
    const independentlyDerived=angles[0]===angles[2] ? "The arm bends, then returns to straight." : angles[0]<angles[2] ? "The arm becomes more bent." : "The arm becomes straighter.";
    assert.equal(q.answer,independentlyDerived);
  }
});
test("geometry preserves bone lengths and shows opposing muscle length changes",()=>{
  const models=Object.keys(MOVEMENT_POSES).map(movementGeometry);
  for(const g of models)assert.ok(Math.abs(Math.hypot(g.hand.x-g.elbow.x,g.hand.y-g.elbow.y)-95)<1e-9);
  assert.ok(models[0].frontHeight>models[1].frontHeight&&models[1].frontHeight>models[2].frontHeight);
  assert.ok(models[0].backHeight<models[1].backHeight&&models[1].backHeight<models[2].backHeight);
  assert.equal(models[0].hand.x,160);assert.ok(models[2].hand.y<models[2].elbow.y);
  assert.throws(()=>movementGeometry("unknown"),RangeError);
});
test("explanations reject wrong order, duplicates, distractors and missing clauses",()=>{
  for(const level of [3,4])for(const q of buildMusclesQuestions(level,rng(4))) {
    for(const ids of [null,[],["clause-0"],["clause-0","clause-1"],["clause-1","clause-0","clause-2"],["clause-0","clause-0","clause-2"],["clause-0","push","clause-2"],["clause-0","clause-1","rubber"],["clause-0","clause-1","clause-2","push"]])assert.equal(isMovementExplanationCorrect(q,ids),false);
    assert.equal(isMovementExplanationCorrect({...q,tiles:[]},q.correctConclusionIds),false);
  }
});
test("investigations require observations, records and explanation; all predictions are ungraded",()=>{
 for(const q of buildMusclesQuestions(4,rng(7)))for(const prediction of q.predictionOptions) {
  let s=initialProcessEnquiry();
  const act=(type,extra={})=>{s=reduceProcessEnquiry(s,{type,...extra,revision:s.revision,version:s.version},q,isMovementRecordCorrect);return s;};
  act("finish");assert.equal(s.stage,"prediction");act("start");assert.equal(s.stage,"prediction");
  act("predict",{value:prediction});act("start");assert.equal(s.stage,"observe");
  const first=s;act("view",{index:2});assert.equal(s,first);act("recordStage");assert.equal(s,first);
  act("next");const stale={type:"next",revision:s.revision,version:s.version-1};assert.equal(reduceProcessEnquiry(s,stale,q,isMovementRecordCorrect),s);
  act("next");act("recordStage");assert.equal(s.stage,"record");
  for(const bad of [null,{}, {movement:"supported"}, {movement:"supported",push:"supported"},{movement:"supported",push:"not-supported",extra:"supported"},{movement:"supported",unknown:"not-supported"}])assert.equal(isMovementRecordCorrect(q,bad),false);
  act("checkRecord");assert.equal(s.stage,"record");act("record",{id:"movement",bin:"supported"});act("record",{id:"push",bin:"not-supported"});act("checkRecord");assert.equal(s.stage,"conclusion");
  act("conclusion",{ids:["clause-0","push","clause-2"]});act("finish");assert.equal(s.stage,"conclusion");
  act("conclusion",{ids:q.correctConclusionIds});act("finish");assert.equal(s.stage,"done");const done=s;act("finish");assert.equal(s,done);act("reset");assert.equal(s,done);
 }
});
test("restart clears evidence and rejects callbacks from the previous investigation",()=>{
 const q=buildMusclesQuestions(4,rng(9))[0];let s=initialProcessEnquiry();
 s=reduceProcessEnquiry(s,{type:"predict",value:q.predictionOptions[0],revision:0,version:0},q,isMovementRecordCorrect);
 s=reduceProcessEnquiry(s,{type:"start",revision:0,version:0},q,isMovementRecordCorrect);
 s=reduceProcessEnquiry(s,{type:"reset",revision:s.revision,version:s.version},q,isMovementRecordCorrect);
 assert.equal(s.stage,"prediction");assert.deepEqual(s.seen,[]);assert.deepEqual(s.record,{});assert.equal(s.prediction,null);
 assert.equal(reduceProcessEnquiry(s,{type:"next",revision:0,version:1},q,isMovementRecordCorrect),s);
});
