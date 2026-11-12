import { sample, shuffle } from "../english/shared.js";
export const SOURCES = {
 nhm:{label:"Natural History Museum fossil information (adapted)",url:"https://www.nhm.ac.uk/discover/how-are-fossils-formed.html"},
 bgs:{label:"British Geological Survey fossil information (adapted)",url:"https://www.bgs.ac.uk/discovering-geology/fossils-and-geological-time/fossils/"},
};
export const GLOSS="A fossil is what is left of something that lived long ago, like a shell, a bone or an imprint. Sediment is loose mud or sand. A mould is a shape left behind when buried remains dissolve away. Minerals are natural materials that can help keep remains. Wearing away (erosion) takes off the rock on top, so we can see a fossil that formed earlier. The pictures show a simple story that takes a very long time. Most remains never become fossils.";
export const ACCOUNTS=[
 {id:"sea-shell",kind:"shell",place:"a shallow sea",source:"nhm"},
 {id:"shore-shell",kind:"shell",place:"a muddy shore",source:"bgs"},
 {id:"lake-fish",kind:"bone",place:"a lake",source:"nhm"},
 {id:"river-fish",kind:"bone",place:"a river bed",source:"bgs"},
 {id:"lake-leaf",kind:"leaf",place:"the edge of a lake",source:"bgs"},
];
export function fossilStages(account){
 const part=account.kind==="shell"?"shell":account.kind==="bone"?"bones":"leaf";
 return [
 {id:"life",label:"Life before burial",phase:"life",text:account.kind==="leaf"?`A leaf grows on a living plant near ${account.place}.`:`An animal with ${account.kind==="shell"?"a shell":"bones"} lives in ${account.place}.`},
 {id:"burial",label:"Remains covered",phase:"burial",text:`After ${account.kind==="leaf"?"the leaf falls and dies":"the animal dies"}, the ${part} ${part==="bones"?"are":"is"} covered by sediment (mud or sand). Burial can help keep remains safe, but does not guarantee a fossil.`},
 {id:"preserved",label:"Evidence in rock",phase:"preserved",text:account.kind==="shell"?"The shell dissolves away and leaves a shell-shaped mould. The sediment around it slowly becomes rock, which keeps that shape.":account.kind==="bone"?"Minerals from water fill the spaces in the buried bones. Over a very long time, the sediment becomes rock and the bones are kept safe.":"A leaf-shaped imprint is left in the sediment. Over a very long time, the sediment becomes rock and keeps the imprint."},
 {id:"exposed",label:"Fossil exposed",phase:"exposed",text:`Later, the rock on top wears away. The ${account.kind==="shell"?"shell-shaped mould":account.kind==="bone"?"preserved bones":"leaf imprint"} can now be seen. It is what is left of something that lived long ago. It is not alive. The fossil formed earlier. Wearing away the rock only shows it.`},
 ];
}
const factTemplates=[
 ["burial","What can cover remains before a fossil forms?","Sediment, like mud or sand","Only air","A fossil that already exists"],
 ["preserved","What is kept in the rock in this story?",null,"A living animal or plant that still grows","A rock with no link to past life"],
 ["exposed","What happens when the rock on top wears away?","It shows a fossil that formed earlier","It makes a new living animal","It makes the fossil for the first time"],
];
export const FACT_BANK=ACCOUNTS.flatMap(account=>factTemplates.map(([phase,prompt,answer,...wrong],i)=>({id:`fact-${account.id}-${i}`,account,phase,prompt,answer:answer??(account.kind==="shell"?"The shape of a shell in a mould":account.kind==="bone"?"Evidence of bones kept by minerals":"The imprint of a leaf in rock"),wrong})));
const claimsFor=account=>[
 {id:"burial",label:"The remains were covered by sediment.",bin:"supported"},
 {id:"evidence",label:account.kind==="shell"?"The mould records the shape of the shell.":account.kind==="bone"?"Minerals helped keep evidence of the bones.":"The rock keeps a leaf-shaped imprint.",bin:"supported"},
 {id:"alive",label:"The fossil is a living thing that still grows.",bin:"not-supported"},
 {id:"guarantee",label:"Every buried remain becomes a fossil.",bin:"not-supported"},
 {id:"discovery",label:"Wearing away the rock showed a fossil that formed earlier.",bin:"supported"},
];
export const EVIDENCE_BINS=[{id:"supported",label:"The story agrees"},{id:"not-supported",label:"The story does not agree"}];
export const COMPARE_BANK=ACCOUNTS.flatMap(account=>[[0,1,2],[1,3,4],[0,2,3]].map((indices,i)=>({id:`compare-${account.id}-${i}`,account,claims:indices.map(index=>claimsFor(account)[index])})));
export const ORDER_BANK=ACCOUNTS.flatMap(account=>["Put the fossil story in order.","Put the pictures in time order.","Put the story in order, from life to discovery."].map((prompt,i)=>({id:`order-${account.id}-${i}`,account,prompt})));
export const ENQUIRY_BANK=["shell","bone","leaf"].flatMap(kind=>["Follow the remains","Compare the evidence","Explain the discovery"].map((focus,i)=>{
 const account=ACCOUNTS.filter(a=>a.kind===kind)[i%ACCOUNTS.filter(a=>a.kind===kind).length];
 return {id:`enquiry-${kind}-${i}`,group:kind,account,title:`${focus}: ${kind==="bone"?"bones":kind==="shell"?"shell mould":"leaf imprint"}`,
 setup:"Read the fossil story. Predict what might be left. Read every card, check two claims, then explain.",
 predictionOptions:["A shape may be kept.","The remains may be kept by minerals.","Nothing may be left.","I am not sure yet."],
 claims:[claimsFor(account)[1],claimsFor(account)[i===1?3:2]],
 conclusion:kind==="shell"?"Sediment buried the shell. Its shape was kept as a mould in rock. Later, the rock on top wore away and showed this evidence of past life.":kind==="bone"?"Sediment buried the bones. Minerals helped keep them as the sediment became rock. Later, the rock on top wore away and showed this evidence of past life.":"Sediment covered the leaf. Its imprint was kept in rock. Later, the rock on top wore away and showed this evidence of a plant that once lived.",
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
   tiles:level===3?mixed.map((s,i)=>({id:s.id,label:`Picture ${String.fromCharCode(65+i)}: ${s.text}`})):level===4?shuffle([{id:"evidence",label:q.conclusion},{id:"alive",label:"The buried remains stayed alive and grew into rock."},{id:"instant",label:"Wearing away the rock made the fossil. Nothing was kept before."}],rng):[],
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
