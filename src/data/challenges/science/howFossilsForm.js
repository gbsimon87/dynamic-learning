import { sample, shuffle } from "../english/shared.js";
export const SOURCES = {
 nhm:{label:"Natural History Museum fossil information (adapted)",url:"https://www.nhm.ac.uk/discover/how-are-fossils-formed.html"},
 bgs:{label:"British Geological Survey fossil information (adapted)",url:"https://www.bgs.ac.uk/discovering-geology/fossils-and-geological-time/fossils/"},
};
export const GLOSS="A fossil is preserved evidence of past life, such as remains or an imprint. Sediment means loose material such as mud or sand. A mould is a shape left when buried remains dissolve away. Minerals are natural materials that can help preserve remains. Erosion can remove covering rock and expose a fossil that has already formed. These pictures show a simplified account over a very long time, not a live experiment. Most remains do not become fossils.";
export const ACCOUNTS=[
 {id:"sea-shell",kind:"shell",place:"a shallow sea",source:"nhm"},
 {id:"shore-shell",kind:"shell",place:"a muddy shore",source:"bgs"},
 {id:"lake-fish",kind:"bone",place:"a lake",source:"nhm"},
 {id:"river-fish",kind:"bone",place:"a river bed",source:"bgs"},
 {id:"lake-leaf",kind:"leaf",place:"mud beside a lake",source:"bgs"},
];
export function fossilStages(account){
 const part=account.kind==="shell"?"shell":account.kind==="bone"?"bones":"leaf";
 return [
 {id:"life",label:"Life before burial",phase:"life",text:account.kind==="leaf"?`A leaf grows on a living plant near ${account.place}.`:`An animal with ${account.kind==="shell"?"a shell":"bones"} lives in ${account.place}.`},
 {id:"burial",label:"Remains covered",phase:"burial",text:`After ${account.kind==="leaf"?"the leaf falls and dies":"the animal dies"}, the ${part} ${part==="bones"?"are":"is"} covered by sediment. Burial can help protect remains, but does not guarantee a fossil.`},
 {id:"preserved",label:"Evidence in rock",phase:"preserved",text:account.kind==="shell"?"In this account, the shell dissolves away, leaving a shell-shaped mould. The surrounding sediment becomes rock, preserving that shape.":account.kind==="bone"?"Minerals from water fill spaces in the buried bones. Over a very long time, sediment becomes rock and evidence of the bones is preserved.":"In this account, a leaf-shaped imprint is preserved as the surrounding sediment becomes rock over a very long time."},
 {id:"exposed",label:"Fossil exposed",phase:"exposed",text:`Later, covering rock is worn away. The ${account.kind==="shell"?"shell-shaped mould":account.kind==="bone"?"preserved bones":"leaf imprint"} becomes exposed. It is evidence of past life, not a living ${account.kind==="leaf"?"leaf":"animal"}. Exposure reveals a fossil that formed earlier.`},
 ];
}
const factTemplates=[
 ["burial","What can cover remains before a fossil forms?","Sediment such as mud or sand.","Only air, with no burial.","A finished fossil must cover them first."],
 ["preserved","What is preserved in this account?",null,"A living animal or plant that still grows.","A rock with no connection to past life."],
 ["exposed","What does removing covering rock do here?","It reveals a fossil that already formed.","It makes a new living animal.","It forms the fossil for the first time."],
];
export const FACT_BANK=ACCOUNTS.flatMap(account=>factTemplates.map(([phase,prompt,answer,...wrong],i)=>({id:`fact-${account.id}-${i}`,account,phase,prompt,answer:answer??(account.kind==="shell"?"The shape of a shell in a mould.":account.kind==="bone"?"Evidence of bones preserved with minerals.":"The imprint of a leaf in rock."),wrong})));
const claimsFor=account=>[
 {id:"burial",label:"The remains were covered by sediment.",bin:"supported"},
 {id:"evidence",label:account.kind==="shell"?"The mould records the shell's shape.":account.kind==="bone"?"Minerals helped preserve evidence of the bones.":"The rock preserves a leaf-shaped imprint.",bin:"supported"},
 {id:"alive",label:"The final fossil is a living thing that still grows.",bin:"not-supported"},
 {id:"guarantee",label:"Every buried remain must become a fossil.",bin:"not-supported"},
 {id:"discovery",label:"Removing the covering rock revealed an earlier fossil.",bin:"supported"},
];
export const EVIDENCE_BINS=[{id:"supported",label:"Supported by this account"},{id:"not-supported",label:"Not supported by this account"}];
export const COMPARE_BANK=ACCOUNTS.flatMap(account=>[[0,1,2],[1,3,4],[0,2,3]].map((indices,i)=>({id:`compare-${account.id}-${i}`,account,claims:indices.map(index=>claimsFor(account)[index])})));
export const ORDER_BANK=ACCOUNTS.flatMap(account=>["Build the formation and discovery story.","Put the illustrated events in time order.","Order this account from past life to discovery."].map((prompt,i)=>({id:`order-${account.id}-${i}`,account,prompt})));
export const ENQUIRY_BANK=["shell","bone","leaf"].flatMap(kind=>["Follow the remains","Compare the evidence","Explain the discovery"].map((focus,i)=>{
 const account=ACCOUNTS.filter(a=>a.kind===kind)[i%ACCOUNTS.filter(a=>a.kind===kind).length];
 return {id:`enquiry-${kind}-${i}`,group:kind,account,title:`${focus}: ${kind==="bone"?"bones":kind==="shell"?"shell mould":"leaf imprint"}`,
 setup:"Read a supplied illustrated account. Predict what evidence might remain, inspect every source card, check the claims, then explain how the evidence was preserved.",
 predictionOptions:["A shape may be preserved.","Remains may be preserved with minerals.","No evidence may remain.","I am not sure yet."],
 claims:[claimsFor(account)[1],claimsFor(account)[i===1?3:2]],
 conclusion:kind==="shell"?"Sediment buried the shell; its shape was preserved as a mould in rock. Later removal of covering rock exposed that evidence of past life.":kind==="bone"?"Sediment buried the bones; minerals helped preserve them as the sediment became rock. Later removal of covering rock exposed the evidence of past life.":"Sediment covered the leaf; its imprint was preserved in rock. Later removal of covering rock exposed that evidence of a once-living plant.",
 };
}));
export function buildFossilQuestions(level,rng){
 if(![1,2,3,4].includes(level))throw new RangeError("Unknown fossil level");
 const bank=[FACT_BANK,COMPARE_BANK,ORDER_BANK,ENQUIRY_BANK][level-1];
 const chosen=level===4?["shell","bone","leaf"].map(kind=>sample(bank.filter(q=>q.group===kind),1,rng)[0]):sample(bank,5,rng);
 return shuffle(chosen,rng).map(q=>{
  const stages=fossilStages(q.account);
  const mixed=level===3?shuffle(stages,rng):[];
  return {...q,level,stages,options:level===1?shuffle([q.answer,...q.wrong],rng):[],
   recordCards:q.claims?shuffle(q.claims.map(({id,label})=>({id,label})),rng):[],recordBins:EVIDENCE_BINS,
   recordExpected:q.claims?Object.fromEntries(q.claims.map(c=>[c.id,c.bin])):{},
   pictureCards:mixed.map((s,i)=>({...s,letter:String.fromCharCode(65+i)})),
   tiles:level===3?mixed.map((s,i)=>({id:s.id,label:`Picture ${String.fromCharCode(65+i)}: ${s.text}`})):level===4?shuffle([{id:"evidence",label:q.conclusion},{id:"alive",label:"The buried remains stayed alive and grew into the final rock."},{id:"instant",label:"Removing covering rock instantly created the fossil; nothing was preserved earlier."}],rng):[],
   correctConclusionIds:level===3?stages.map(s=>s.id):level===4?["evidence"]:[],
  };
 });
}
export function isFossilRecordCorrect(q,record){
 const count=q.level===2?3:q.level===4?2:0;
 if(!count||!Array.isArray(q.recordCards)||q.recordCards.length!==count||new Set(q.recordCards.map(c=>c.id)).size!==count||!Array.isArray(q.claims)||q.claims.length!==count||record==null||Object.keys(record).length!==count)return false;
 const canonical=claimsFor(q.account);
 return q.recordCards.every(c=>{const claim=canonical.find(item=>item.id===c.id);return claim&&Object.hasOwn(record,c.id)&&record[c.id]===claim.bin;});
}
export function isFossilOrderCorrect(q,ids){
 return q.level===3&&Array.isArray(ids)&&ids.length===4&&Array.from(ids).every((id,i)=>id===["life","burial","preserved","exposed"][i]&&q.tiles.some(t=>t.id===id));
}
