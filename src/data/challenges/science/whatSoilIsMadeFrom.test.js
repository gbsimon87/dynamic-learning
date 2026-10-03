import test from "node:test";
import assert from "node:assert/strict";
import { COMPONENTS,SAMPLES,FACT_BANK,SORT_BANK,LABEL_BANK,ENQUIRY_BANK,soilFeatures,buildSoilQuestions,isSoilRecordCorrect,isSoilLabelsCorrect } from "./whatSoilIsMadeFrom.js";
import { initialProcessEnquiry,reduceProcessEnquiry } from "./processEnquiry.js";
const rng=seed=>()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
test("soil replay banks generate deterministic, unique, answerable runs without mutation",()=>{
 const banks=[FACT_BANK,SORT_BANK,LABEL_BANK,ENQUIRY_BANK],before=JSON.stringify(banks);
 banks.forEach((b,i)=>{assert.equal(b.length,[20,15,15,9][i]);assert.equal(new Set(b.map(q=>q.id)).size,b.length);});
 for(let seed=1;seed<=40;seed++)for(let level=1;level<=4;level++){
 const run=buildSoilQuestions(level,rng(seed));assert.deepEqual(run,buildSoilQuestions(level,rng(seed)));assert.equal(run.length,level===4?3:5);assert.equal(new Set(run.map(q=>q.id)).size,run.length);
 for(const q of run){assert.deepEqual(q.features.map(c=>c.letter),["A","B","C","D"]);assert.equal(new Set(q.features.map(c=>c.id)).size,4);if(level===1){assert.equal(new Set(q.options).size,3);assert.equal(q.options.filter(v=>v===q.answer).length,1);assert.ok(q.features.some(c=>c.id===q.component));}if(level===2||level===4)assert.equal(isSoilRecordCorrect(q,q.recordExpected),true);}
 if(level===1)assert.deepEqual([...new Set(run.map(q=>q.component))].sort(),["air","mineral","organic","water"]);
 if(level===4)assert.deepEqual(run.map(q=>q.group).sort(),["mixtures","solids","spaces"]);
 }
 assert.equal(JSON.stringify(banks),before);for(const level of [0,5,"1",null])assert.throws(()=>buildSoilQuestions(level,rng(1)),RangeError);
});
test("specimen notes independently distinguish rock material, decayed remains, gas and liquid",()=>{
 for(const s of SAMPLES)for(let v=0;v<3;v++){
 const f=soilFeatures(s,v);assert.match(f.find(c=>c.id==="mineral").text,/rock/);assert.match(f.find(c=>c.id==="organic").text,/decay/i);assert.match(f.find(c=>c.id==="air").text,/gas/);assert.match(f.find(c=>c.id==="water").text,/liquid/);
 }
 for(const q of buildSoilQuestions(4,rng(2))){assert.match(q.stages[1].text,/Amounts are not measured/);assert.match(q.stages[2].text,/does not prove all soils are identical/);}
});
test("component labels accept exactly one complete bijection, with movable labels",()=>{
 function permutations(xs){return xs.length?xs.flatMap((x,i)=>permutations(xs.filter((_,j)=>j!==i)).map(rest=>[x,...rest])):[[]];}
 for(const s of SAMPLES)for(let v=0;v<3;v++){
 const q={level:3,sample:s,variant:v},expected=Object.fromEntries(soilFeatures(s,v).map(c=>[c.id,c.letter]));
 for(const letters of permutations(["A","B","C","D"]))assert.equal(isSoilLabelsCorrect(q,Object.fromEntries(COMPONENTS.map((c,i)=>[c.id,letters[i]]))),COMPONENTS.every((c,i)=>expected[c.id]===letters[i]));
 for(const bad of[null,{}, {...expected,extra:"A"},{...expected,air:"Z"},{...expected,air:expected.water}])assert.equal(isSoilLabelsCorrect(q,bad),false);
 }
});
test("soil records reject incomplete, extra, duplicate, unknown and wrong assignments",()=>{
 for(const level of[2,4])for(let seed=1;seed<=12;seed++)for(const q of buildSoilQuestions(level,rng(seed))){
 assert.equal(isSoilRecordCorrect(q,q.recordExpected),true);
 for(const bad of[null,{}, {...q.recordExpected,extra:"supported"}])assert.equal(isSoilRecordCorrect(q,bad),false);
 for(const c of q.recordCards){const missing={...q.recordExpected};delete missing[c.id];assert.equal(isSoilRecordCorrect(q,missing),false);assert.equal(isSoilRecordCorrect(q,{...q.recordExpected,[c.id]:"unknown"}),false);}
 assert.equal(isSoilRecordCorrect({...q,recordCards:[q.recordCards[0],q.recordCards[0]]},q.recordExpected),false);
 }
});
test("every ungraded prediction requires all three observations, both records and an evidence explanation",()=>{
 for(let seed=1;seed<=9;seed++)for(const q of buildSoilQuestions(4,rng(seed)))for(const prediction of q.predictionOptions){
 let s=initialProcessEnquiry();const act=(type,extra={})=>{s=reduceProcessEnquiry(s,{type,...extra,revision:s.revision,version:s.version},q,isSoilRecordCorrect);};
 act("start");assert.equal(s.stage,"prediction");act("predict",{value:prediction});act("start");assert.equal(s.stage,"observe");const first=s;act("recordStage");assert.equal(s,first);act("view",{index:2});assert.equal(s,first);act("next");act("recordStage");assert.equal(s.stage,"observe");act("next");act("recordStage");assert.equal(s.stage,"record");act("checkRecord");assert.equal(s.stage,"record");for(const c of q.recordCards)act("record",{id:c.id,bin:q.recordExpected[c.id]});act("checkRecord");assert.equal(s.stage,"conclusion");for(const id of["only","same"]){act("conclusion",{ids:[id]});act("finish");assert.equal(s.stage,"conclusion");}act("conclusion",{ids:["evidence"]});act("finish");assert.equal(s.stage,"done");const done=s;act("finish");assert.equal(s,done);act("reset");assert.equal(s,done);
 }
});
test("soil restart clears evidence and rejects callbacks from the old investigation",()=>{
 const q=buildSoilQuestions(4,rng(9))[0];let s=initialProcessEnquiry();s=reduceProcessEnquiry(s,{type:"predict",value:q.predictionOptions[0],revision:0,version:0},q,isSoilRecordCorrect);s=reduceProcessEnquiry(s,{type:"start",revision:0,version:0},q,isSoilRecordCorrect);s=reduceProcessEnquiry(s,{type:"reset",revision:0,version:1},q,isSoilRecordCorrect);assert.equal(s.stage,"prediction");assert.deepEqual(s.seen,[]);assert.deepEqual(s.record,{});assert.deepEqual(s.conclusion,[]);assert.equal(s.prediction,null);assert.equal(reduceProcessEnquiry(s,{type:"next",revision:0,version:1},q,isSoilRecordCorrect),s);
});
