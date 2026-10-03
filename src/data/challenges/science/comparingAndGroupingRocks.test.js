import test from "node:test";
import assert from "node:assert/strict";
import { SPECIMENS, FEATURE_BANK, SORT_BANK, TABLE_BANK, ENQUIRY_BANK, buildRocksQuestions, isRocksSortCorrect, isRocksTableCorrect, isRocksRecordCorrect } from "./comparingAndGroupingRocks.js";
import { initialRocksEnquiry, reduceRocksEnquiry } from "./rocksEnquiry.js";
const rng=seed=>()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
test("rock banks meet replay depth, use unique identifiers and sample deterministically without mutation",()=>{
 const banks=[FEATURE_BANK,SORT_BANK,TABLE_BANK,ENQUIRY_BANK];const original=JSON.stringify(banks);
 banks.forEach((bank,i)=>{assert.ok(bank.length>=[15,15,15,9][i]);assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);});
 for(let seed=1;seed<=40;seed++)for(let level=1;level<=4;level++){
  const run=buildRocksQuestions(level,rng(seed));assert.deepEqual(run,buildRocksQuestions(level,rng(seed)));assert.equal(run.length,level===4?3:5);assert.equal(new Set(run.map(q=>q.id)).size,run.length);
  if(level===4)assert.deepEqual(run.map(q=>q.group).sort(),["scratch","water","wear"]);
 }
 assert.equal(JSON.stringify(banks),original);for(const level of [0,5,"1",null])assert.throws(()=>buildRocksQuestions(level,rng(1)),RangeError);
});
test("feature answers follow the drawn feature and never infer a physical test from appearance",()=>{
 for(const q of FEATURE_BANK){assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(o=>o===q.answer).length,1);assert.equal(q.answer.startsWith("No "),!q.specimen[q.feature]);assert.ok(["grains","bands","crystals"].includes(q.feature));}
 assert.equal(SPECIMENS[0].grains,SPECIMENS[5].grains);assert.notEqual(SPECIMENS[0].scratch,SPECIMENS[5].scratch);assert.notEqual(SPECIMENS[0].water,SPECIMENS[5].water);
});
test("sorting validates all specimens against the explicit criterion and rejects malformed records",()=>{
 for(const q of buildAll(2,SORT_BANK)){
  const correct=Object.fromEntries(q.specimens.map(s=>[s.id,s[q.criterion.id]?"yes":"no"]));assert.equal(isRocksSortCorrect(q,correct),true);
  for(const s of q.specimens){const wrong={...correct,[s.id]:correct[s.id]==="yes"?"no":"yes"};assert.equal(isRocksSortCorrect(q,wrong),false);const missing={...correct};delete missing[s.id];assert.equal(isRocksSortCorrect(q,missing),false);}
  assert.equal(isRocksSortCorrect(q,{...correct,unknown:"yes"}),false);assert.equal(isRocksSortCorrect(q,null),false);
  assert.equal(isRocksSortCorrect({...q,criterion:{id:"__proto__"}},correct),false);
  assert.equal(isRocksSortCorrect({...q,specimens:[q.specimens[0],q.specimens[0],q.specimens[2]]},correct),false);
 }
});
function buildAll(level,bank){return bank.map(q=>({...q,level}));}
test("classification tables require every row/column cell independently, allowing multiple features per rock",()=>{
 for(const q of buildAll(3,TABLE_BANK)){
  const correct=Object.fromEntries(q.specimens.flatMap(s=>q.columns.map(c=>[`${s.id}:${c.id}`,s[c.id]?"yes":"no"])));assert.equal(isRocksTableCorrect(q,correct),true);
  for(const key of Object.keys(correct)){assert.equal(isRocksTableCorrect(q,{...correct,[key]:correct[key]==="yes"?"no":"yes"}),false);const missing={...correct};delete missing[key];assert.equal(isRocksTableCorrect(q,missing),false);}
  assert.equal(isRocksTableCorrect(q,{...correct,extra:"no"}),false);assert.equal(isRocksTableCorrect(q,null),false);assert.equal(isRocksTableCorrect({...q,columns:[q.columns[0],q.columns[0]]},correct),false);
 }
});
test("fair plans keep relevant test conditions the same and supplied results match records and conclusions",()=>{
 for(const q of ENQUIRY_BANK){assert.equal(q.fairOptions.filter(v=>v===q.fairAnswer).length,1);assert.equal(new Set(q.fairOptions).size,3);assert.ok(q.fairAnswer.includes("same"));assert.equal(q.specimens[0].id,"X");assert.equal(q.specimens[1].id,"Y");
  q.results.forEach((yes,i)=>{assert.equal(q.recordExpected[i===0?"sample-a":"sample-b"],yes?"yes":"no");assert.ok(q.conclusion.includes(`Sample ${i===0?"X":"Y"}: ${yes?q.property.yes:q.property.no}`));});
 }
 assert.ok(ENQUIRY_BANK.some(q=>q.results.every(Boolean)),"same-group result must be accepted");
});
test("each investigation requires all observations and correct records; predictions remain ungraded",()=>{
 for(let seed=1;seed<=10;seed++)for(const q of buildRocksQuestions(4,rng(seed)))for(const prediction of q.predictionOptions){
  let s=initialRocksEnquiry();const act=(type,extra={})=>{s=reduceRocksEnquiry(s,{type,...extra,revision:s.revision,version:s.version},q);};
  act("start");assert.equal(s.stage,"plan");act("plan",{value:q.fairAnswer});act("checkPlan");act("start");assert.equal(s.stage,"prediction");act("predict",{value:prediction});act("start");assert.equal(s.stage,"observe");
  const first=s;act("recordStage");assert.equal(s,first);act("view",{index:2});assert.equal(s,first);act("next");const middle=s;assert.equal(reduceRocksEnquiry(s,{type:"next",revision:s.revision,version:s.version-1},q),middle);act("next");act("recordStage");assert.equal(s.stage,"record");
  assert.equal(isRocksRecordCorrect(q,null),false);assert.equal(isRocksRecordCorrect(q,{}),false);assert.equal(isRocksRecordCorrect(q,{...q.recordExpected,extra:"yes"}),false);
  for(const c of q.recordCards){assert.equal(isRocksRecordCorrect(q,{...q.recordExpected,[c.id]:q.recordExpected[c.id]==="yes"?"no":"yes"}),false);act("record",{id:c.id,bin:q.recordExpected[c.id]});}
  act("checkRecord");assert.equal(s.stage,"conclusion");act("conclusion",{ids:["looks"]});act("finish");assert.equal(s.stage,"conclusion");act("conclusion",{ids:["evidence"]});act("finish");assert.equal(s.stage,"done");const done=s;act("finish");assert.equal(s,done);
 }
});
test("reset invalidates all investigation evidence and callbacks",()=>{
 const q=buildRocksQuestions(4,rng(3))[0];let s=initialRocksEnquiry();
 const act=(type,extra={})=>{s=reduceRocksEnquiry(s,{type,...extra,revision:s.revision,version:s.version},q);};
 act("plan",{value:q.fairAnswer});act("checkPlan");act("predict",{value:q.predictionOptions[0]});act("start");
 const old={revision:s.revision,version:s.version};act("reset");
 assert.equal(s.stage,"plan");assert.equal(s.fairChoice,null);assert.deepEqual(s.seen,[]);assert.deepEqual(s.record,{});assert.deepEqual(s.conclusion,[]);assert.equal(s.prediction,null);assert.equal(reduceRocksEnquiry(s,{type:"next",...old},q),s);
});
