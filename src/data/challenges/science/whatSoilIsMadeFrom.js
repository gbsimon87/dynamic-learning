import { sample, shuffle } from "../english/shared.js";
export const SOURCES={bsss:{label:"British Society of Soil Science (adapted concepts; authored observations)",url:"https://soils.org.uk/what-is-soil/"}};
export const GLOSS="Soil includes mineral particles from rocks and organic matter from once-living things. Rocks break down over time. Organic matter includes decaying plant and animal remains. Soil also contains living things. Spaces between particles can contain air and water. These models show selected components, not every organism or exact amounts. Different soils have different mixtures; colour alone does not identify a component.";
export const COMPONENTS=[{id:"mineral",label:"Rock particles (mineral matter)"},{id:"organic",label:"Organic matter (once-living remains)"},{id:"air",label:"Air in spaces"},{id:"water",label:"Water in spaces"}];
export const SAMPLES=[
 {id:"A",mineral:"Sand grains from weathered rock",organic:"A decaying leaf fragment"},
 {id:"B",mineral:"Small stone fragments from broken-down rock",organic:"A decaying twig fragment"},
 {id:"C",mineral:"Fine silt particles from weathered rock",organic:"A decaying grass fragment"},
 {id:"D",mineral:"Tiny clay mineral particles from weathered rock",organic:"A decaying plant root fragment"},
 {id:"E",mineral:"Mixed mineral grains from broken-down rock",organic:"Decayed plant and animal remains identified in the supplied notes"},
];
export function soilFeatures(sample,variant=0){
 const parts=[{id:"mineral",text:sample.mineral},{id:"organic",text:sample.organic},{id:"air",text:"A space containing gas, identified as air in the notes"},{id:"water",text:"A space containing liquid, identified as water in the notes"}];
 return parts.map((_,i)=>({...parts[(i+variant)%4],letter:String.fromCharCode(65+i)}));
}
export const FACT_BANK=SAMPLES.flatMap(sample=>["mineral","organic","air","water"].map((component,i)=>({id:`fact-${sample.id}-${component}`,sample,component,variant:i%3,prompt:"Use the specimen notes. What component is marked",answer:COMPONENTS.find(c=>c.id===component).label,wrong:COMPONENTS.filter(c=>c.id!==component).slice(0,2).map(c=>c.label)})));
export const SORT_BANK=SAMPLES.flatMap(sample=>[0,1,2].map(variant=>({id:`sort-${sample.id}-${variant}`,sample,variant})));
export const LABEL_BANK=SAMPLES.flatMap(sample=>[0,1,2].map(variant=>({id:`label-${sample.id}-${variant}`,sample,variant})));
export const EVIDENCE_BINS=[{id:"supported",label:"Supported by the observations"},{id:"not-supported",label:"Not supported by the observations"}];
function soilClaims(sample,group){return [{id:"mixture",label:`Sample ${sample.id} contains material from rocks and once-living things.`,bin:"supported"},{id:"only",label:group==="solids"?"This soil contains only rock particles, with no organic matter.":group==="spaces"?"Air and water are the same as the solid rock particles.":"Every soil must have exactly the same mixture as this sample.",bin:"not-supported"}];}
export function soilStages(sample){return [
 {id:"inspect",label:"Inspect the solid parts",text:`Supplied magnified observations of sample ${sample.id}: ${sample.mineral}. ${sample.organic}. The notes identify their origins; colour alone is not used.`,variant:0},
 {id:"spaces",label:"Inspect the spaces",text:`The supplied cutaway notes identify air in some spaces and water in others between sample ${sample.id}'s solid particles. Amounts are not measured. This is a model, not a live test.`,variant:1},
 {id:"compare",label:"Compare the findings",text:`Sample ${sample.id} includes mineral particles from rocks and organic matter from once-living things. Air and water can occupy spaces. Another soil may contain different amounts and kinds of particles; this sample does not prove all soils are identical.`,variant:2},
];}
export const ENQUIRY_BANK=["solids","spaces","mixtures"].flatMap(group=>[0,1,2].map(i=>{const sample=SAMPLES[(i+["solids","spaces","mixtures"].indexOf(group))%5];return {id:`enquiry-${group}-${i}`,group,sample,variant:0,title:`Investigate soil ${sample.id}: ${group==="solids"?"solid components":group==="spaces"?"spaces between particles":"a mixture of materials"}`,setup:"Predict what the sample may contain. Inspect all three supplied observation cards, record the evidence and build an explanation.",predictionOptions:["Material from rocks may be present.","Once-living remains may be present.","Both may be present.","I am not sure yet."],claims:soilClaims(sample,group),conclusion:"The notes identify rock particles and once-living remains in this soil. Air and water occupy spaces between particles. Other soils may have different mixtures."};}));
export function buildSoilQuestions(level,rng){
 if(![1,2,3,4].includes(level))throw new RangeError("Unknown soil level");
 const bank=[FACT_BANK,SORT_BANK,LABEL_BANK,ENQUIRY_BANK][level-1];
 const firstFacts=level===1?COMPONENTS.map(c=>sample(bank.filter(q=>q.component===c.id),1,rng)[0]):[];
 const chosen=level===1?[...firstFacts,...sample(bank.filter(q=>!firstFacts.some(f=>f.id===q.id)),1,rng)]:level===4?["solids","spaces","mixtures"].map(group=>sample(bank.filter(q=>q.group===group),1,rng)[0]):sample(bank,5,rng);
 return shuffle(chosen,rng).map(q=>{
 const features=soilFeatures(q.sample,q.variant),cards=level===2?features.filter(c=>["mineral","organic"].includes(c.id)):q.claims??[];
 return {...q,level,features,stages:soilStages(q.sample),account:{source:"bsss"},options:level===1?shuffle([q.answer,...q.wrong],rng):[],
 recordCards:shuffle(cards.map(c=>({id:c.id,label:c.text??c.label})),rng),recordBins:level===2?COMPONENTS.slice(0,2):EVIDENCE_BINS,
 recordExpected:Object.fromEntries(cards.map(c=>[c.id,c.bin??c.id])),labels:shuffle(COMPONENTS,rng),targets:features.map(c=>({id:c.letter,label:c.letter})),
 tiles:level===4?shuffle([{id:"evidence",label:q.conclusion},{id:"only",label:"Soil is just rock dust. Nothing from living things is present."},{id:"same",label:"These observations prove that every soil has exactly the same mixture."}],rng):[],correctConclusionIds:level===4?["evidence"]:[]};
 });
}
export function isSoilRecordCorrect(q,record){
 if(![2,4].includes(q.level)||record==null||Object.keys(record).length!==2||!Array.isArray(q.recordCards)||q.recordCards.length!==2||new Set(q.recordCards.map(c=>c.id)).size!==2)return false;
 const canonical=q.level===2?[{id:"mineral",bin:"mineral"},{id:"organic",bin:"organic"}]:soilClaims(q.sample,q.group);
 return q.recordCards.every(c=>{const claim=canonical.find(item=>item.id===c.id);return claim&&Object.hasOwn(record,c.id)&&record[c.id]===claim.bin;});
}
export function isSoilLabelsCorrect(q,placement){
 if(q.level!==3||placement==null||Object.keys(placement).length!==4)return false;
 return soilFeatures(q.sample,q.variant).every(c=>Object.hasOwn(placement,c.id)&&placement[c.id]===c.letter);
}
