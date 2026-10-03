import test from "node:test";
import assert from "node:assert/strict";
import { ANIMALS, PARTS, JOB_BANK, SORT_BANK, LABEL_BANK, EXPLANATION_BANK, buildSkeletonQuestions as build, isSkeletonLabelsCorrect as labelsCorrect, isSkeletonSortCorrect as sortCorrect, isSkeletonExplanationCorrect as explanationCorrect } from "./skeletonsForSupportAndProtection.js";
import { HUMAN_ANCHORS } from "../../skeletonDiagram.js";
import { placeDiagramLabel } from "../../diagramPlacement.js";
function rng(seed) { let value = (seed * 2654435761) >>> 0; return () => { value = (1664525 * value + 1013904223) >>> 0; return value / 2 ** 32; }; }
test("four authored banks have distinct cases and no ambiguous options", () => {
  for (const bank of [JOB_BANK,SORT_BANK,LABEL_BANK,EXPLANATION_BANK]) { assert.equal(bank.length,15); assert.equal(new Set(bank.map(q=>q.id)).size,15); }
  for (const job of JOB_BANK) { assert.ok(ANIMALS.some(a=>a.id===job.animal)); assert.equal(new Set(job.options).size,3); assert.equal(job.options.filter(o=>o===job.answer).length,1); }
  assert.equal(new Set(SORT_BANK.map(q=>q.criterion+q.cards.map(c=>c.id).join())).size,15);
  for(const q of SORT_BANK){assert.equal(q.cards.length,3);assert.equal(new Set(q.cards.map(c=>c.id)).size,3);assert.equal(new Set(q.cards.map(c=>c[q.criterion])).size,2);}
});
test("grouping distinguishes backbone from protective outer covering",()=>{
  assert.deepEqual(ANIMALS.filter(a=>a.backbone).map(a=>a.id),["human","dog","bird","fish"]);
  assert.deepEqual(ANIMALS.filter(a=>a.outer).map(a=>a.id),["crab","beetle","snail"]);
  assert.equal(ANIMALS.find(a=>a.id==="worm").backbone,false);
  assert.ok(ANIMALS.find(a=>a.id==="worm").text.includes("other ways"));
  assert.ok(ANIMALS.find(a=>a.id==="fish").text.includes("scales are not a shell"));
});
test("deterministic sampling reaches all banks and preserves answers and targets",()=>{
 for(const level of [1,2,3,4]){const seen=new Set();for(let seed=0;seed<150;seed++){const questions=build(level,rng(seed));assert.deepEqual(questions,build(level,rng(seed)));assert.equal(questions.length,5);assert.equal(new Set(questions.map(q=>q.id)).size,5);
 for(const q of questions){seen.add(q.id);assert.equal(new Set(q.targets.map(t=>t.part)).size,4);if([1,3].includes(level))assert.ok(q.options.includes(level===3?q.job.answer:q.answer));if(level===2)assert.equal(sortCorrect(q,q.expected),true);if(level===4){assert.equal(new Set(q.tiles.map(t=>t.label)).size,3);assert.equal(q.tiles.find(t=>t.id==="supported").label,q.answer);}}}assert.equal(seen.size,15);for(const boundary of [0,0.999999])assert.equal(build(level,()=>boundary).length,5);}
 assert.throws(()=>build(0,rng(1)),RangeError);
});
test("all four known diagram labels are required with exact unique targets",()=>{
 for(const q of build(3,rng(9))){const answer=Object.fromEntries(q.targets.map(t=>[t.part,t.id]));assert.equal(labelsCorrect(q,answer),true);for(const value of [null,{}, {...answer,unknown:"target-0"}])assert.equal(labelsCorrect(q,value),false);
 const missing={...answer};delete missing.skull;assert.equal(labelsCorrect(q,missing),false);assert.equal(labelsCorrect(q,{...answer,skull:"unknown"}),false);
 assert.equal(labelsCorrect({...q,targets:[]},{}),false);assert.equal(labelsCorrect({...q,targets:q.targets.map(()=>q.targets[0])},answer),false);
 let placement={};for(const part of PARTS)placement=placeDiagramLabel(placement,part.id,answer[part.id],q.labels,q.targets);assert.equal(labelsCorrect(q,placement),true);
 assert.equal(placeDiagramLabel(placement,"skull",answer.ribs,q.labels,q.targets),placement);placement=placeDiagramLabel(placement,"skull",null,q.labels,q.targets);assert.equal(labelsCorrect(q,placement),false);
 }
});
test("sorting and built explanations reject missing/extra/unknown answers",()=>{
 for(const q of build(2,rng(4))){for(const value of [null,{}, {...q.expected,unknown:"yes"}])assert.equal(sortCorrect(q,value),false);const missing={...q.expected};delete missing[q.cards[0].id];assert.equal(sortCorrect(q,missing),false);assert.equal(sortCorrect(q,{...q.expected,[q.cards[0].id]:q.expected[q.cards[0].id]==="yes"?"no":"yes"}),false);assert.equal(sortCorrect({...q,cards:[]},{}),false);assert.equal(sortCorrect({...q,criterion:"unknown"},q.expected),false);assert.equal(sortCorrect({...q,cards:[q.cards[0],q.cards[0]]},q.expected),false);}
 for(const value of [null,[],["unknown"],["supported","supported"],["wrong-1"]])assert.equal(explanationCorrect(value),false);assert.equal(explanationCorrect(["supported"]),true);
});
test("human callouts lie on the independent skull/rib/spine/leg drawing features",()=>{
 const skull=HUMAN_ANCHORS.skull;assert.ok(((skull.x-180)/26)**2+((skull.y-45)/30)**2<=1);
 // Rib at y=106, quadratic midpoint of (180,106),(235,98),(203,118).
 assert.deepEqual(HUMAN_ANCHORS.ribs,{x:208.5,y:107});
 assert.ok(HUMAN_ANCHORS.spine.x>=176 && HUMAN_ANCHORS.spine.x<=184 && HUMAN_ANCHORS.spine.y>=154 && HUMAN_ANCHORS.spine.y<=163);
 const leg=HUMAN_ANCHORS.legs;assert.ok(Math.abs(leg.x-(157+(153-157)*(leg.y-250)/47))<0.1);
});
