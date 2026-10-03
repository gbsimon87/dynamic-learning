import test from "node:test";
import assert from "node:assert/strict";
import { ACCOUNTS, FACT_BANK, COMPARE_BANK, ORDER_BANK, ENQUIRY_BANK, fossilStages, buildFossilQuestions, isFossilRecordCorrect, isFossilOrderCorrect } from "./howFossilsForm.js";
import { initialProcessEnquiry, reduceProcessEnquiry } from "./processEnquiry.js";
const rng=seed=>()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
test("fossil banks meet replay depth and deterministic runs do not mutate source data",()=>{
 const banks=[FACT_BANK,COMPARE_BANK,ORDER_BANK,ENQUIRY_BANK],before=JSON.stringify(banks);
 banks.forEach((bank,i)=>{assert.equal(bank.length,[15,15,15,9][i]);assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);});
 for(let seed=1;seed<=40;seed++)for(let level=1;level<=4;level++){
  const run=buildFossilQuestions(level,rng(seed));assert.equal(run.length,level===4?3:5);assert.equal(new Set(run.map(q=>q.id)).size,run.length);assert.deepEqual(run,buildFossilQuestions(level,rng(seed)));
  if(level===4)assert.deepEqual(run.map(q=>q.group).sort(),["bone","leaf","shell"]);
  for(const q of run){assert.equal(q.stages.length,4);if(level===1){assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(v=>v===q.answer).length,1);assert.ok(q.stages.some(s=>s.phase===q.phase));}
   if(level===3){assert.equal(new Set(q.pictureCards.map(s=>s.letter)).size,4);for(const card of q.pictureCards)assert.equal(q.tiles.find(t=>t.id===card.id).label,`Picture ${card.letter}: ${card.text}`);assert.equal(isFossilOrderCorrect(q,["life","burial","preserved","exposed"]),true);}
  }
 }
 assert.equal(JSON.stringify(banks),before);for(const level of [0,5,"1",null])assert.throws(()=>buildFossilQuestions(level,rng(1)),RangeError);
});
test("accounts distinguish burial, preservation and exposure without promising every remain fossilises",()=>{
 for(const a of ACCOUNTS){const stages=fossilStages(a);assert.deepEqual(stages.map(s=>s.phase),["life","burial","preserved","exposed"]);assert.ok(stages[1].text.includes("does not guarantee a fossil"));assert.ok(stages[3].text.includes("formed earlier"));assert.ok(stages[2].text.includes("rock"));
  if(a.kind==="shell"){assert.ok(stages[2].text.includes("dissolves away"));assert.ok(stages[2].text.includes("mould"));}if(a.kind==="bone")assert.ok(stages[2].text.includes("Minerals"));if(a.kind==="leaf")assert.ok(stages[2].text.includes("imprint"));
 }
});
test("record checking accepts all supplied claims only in their evidence bins",()=>{
 for(const level of[2,4])for(let seed=1;seed<=15;seed++)for(const q of buildFossilQuestions(level,rng(seed))){
  assert.equal(isFossilRecordCorrect(q,q.recordExpected),true);
  assert.equal(isFossilRecordCorrect(q,null),false);assert.equal(isFossilRecordCorrect(q,{}),false);assert.equal(isFossilRecordCorrect(q,{...q.recordExpected,extra:"supported"}),false);
  for(const c of q.recordCards){assert.equal(isFossilRecordCorrect(q,{...q.recordExpected,[c.id]:q.recordExpected[c.id]==="supported"?"not-supported":"supported"}),false);const missing={...q.recordExpected};delete missing[c.id];assert.equal(isFossilRecordCorrect(q,missing),false);}
  assert.equal(isFossilRecordCorrect({...q,recordCards:q.recordCards.map(()=>q.recordCards[0])},q.recordExpected),false);
 }
});
test("ordering rejects every incorrect permutation, duplicate, missing and unknown event",()=>{
 function permutations(ids){return ids.length?ids.flatMap((id,i)=>permutations(ids.filter((_,j)=>j!==i)).map(rest=>[id,...rest])):[[]];}
 for(const q of buildFossilQuestions(3,rng(4))){for(const ids of permutations(["life","burial","preserved","exposed"]))assert.equal(isFossilOrderCorrect(q,ids),ids.join()===q.correctConclusionIds.join());
  for(const ids of[null,[],["life"],["life","burial","preserved"],["life","life","preserved","exposed"],["life","burial","unknown","exposed"],["life","burial","preserved","exposed","extra"]])assert.equal(isFossilOrderCorrect(q,ids),false);
  assert.equal(isFossilOrderCorrect({...q,tiles:[]},q.correctConclusionIds),false);
 }
});
test("all prediction choices reach observation but completion requires every source, both records and explanation",()=>{
 for(let seed=1;seed<=9;seed++)for(const q of buildFossilQuestions(4,rng(seed)))for(const prediction of q.predictionOptions){
  let s=initialProcessEnquiry();const act=(type,extra={})=>{s=reduceProcessEnquiry(s,{type,...extra,revision:s.revision,version:s.version},q,isFossilRecordCorrect);};
  act("start");assert.equal(s.stage,"prediction");act("predict",{value:prediction});act("start");assert.equal(s.stage,"observe");const first=s;act("recordStage");assert.equal(s,first);act("view",{index:3});assert.equal(s,first);
  act("next");const middle=s;assert.equal(reduceProcessEnquiry(s,{type:"next",revision:s.revision,version:s.version-1},q,isFossilRecordCorrect),middle);act("next");act("recordStage");assert.equal(s.stage,"observe");act("next");act("recordStage");assert.equal(s.stage,"record");act("checkRecord");assert.equal(s.stage,"record");
  for(const c of q.recordCards)act("record",{id:c.id,bin:q.recordExpected[c.id]});act("checkRecord");assert.equal(s.stage,"conclusion");act("conclusion",{ids:["alive"]});act("finish");assert.equal(s.stage,"conclusion");act("conclusion",{ids:["instant"]});act("finish");assert.equal(s.stage,"conclusion");act("conclusion",{ids:["evidence"]});act("finish");assert.equal(s.stage,"done");const done=s;act("finish");assert.equal(s,done);act("reset");assert.equal(s,done);
 }
});
test("restart clears source evidence and invalidates stale callbacks",()=>{
 const q=buildFossilQuestions(4,rng(9))[0];let s=initialProcessEnquiry();s=reduceProcessEnquiry(s,{type:"predict",value:q.predictionOptions[0],revision:0,version:0},q,isFossilRecordCorrect);s=reduceProcessEnquiry(s,{type:"start",revision:0,version:0},q,isFossilRecordCorrect);s=reduceProcessEnquiry(s,{type:"reset",revision:0,version:1},q,isFossilRecordCorrect);
 assert.equal(s.stage,"prediction");assert.equal(s.prediction,null);assert.deepEqual(s.seen,[]);assert.deepEqual(s.record,{});assert.deepEqual(s.conclusion,[]);assert.equal(reduceProcessEnquiry(s,{type:"next",revision:0,version:1},q,isFossilRecordCorrect),s);
});
