import { sample, shuffle } from "../english/shared.js";
export const SOURCE = { label: "Rock features: British Geological Survey (adapted)", url: "https://www.bgs.ac.uk/discovering-geology/rocks-and-minerals/" };
export const GLOSS = "A specimen is a sample to study. Grains are small pieces in a rock. Crystals are minerals with an ordered structure inside; some can be seen in rocks. A fossil is evidence of past life preserved in rock. A property is something we can observe or test. A scratch test compares resistance to scratching, not how easily a rock breaks. Water taken in by a sample is not the same as water passing all the way through it.";
// Unnamed authored samples, not identifications or universal rock-type claims.
export const SPECIMENS = [
  { id: "A", grains: true, crystals: false, bands: false, fossil: false, scratch: true, water: true },
  { id: "B", grains: false, crystals: true, bands: false, fossil: false, scratch: false, water: false },
  { id: "C", grains: false, crystals: false, bands: true, fossil: false, scratch: true, water: false },
  { id: "D", grains: true, crystals: false, bands: false, fossil: true, scratch: false, water: true },
  { id: "E", grains: false, crystals: true, bands: true, fossil: false, scratch: true, water: true },
  { id: "F", grains: true, crystals: false, bands: true, fossil: false, scratch: false, water: false },
];
export const CRITERIA = [
  { id: "grains", label: "Visible separate grains", yes: "Grains shown", no: "No grains shown", kind: "appearance" },
  { id: "crystals", label: "Visible crystal shapes", yes: "Crystals shown", no: "No crystals shown", kind: "appearance" },
  { id: "bands", label: "Visible bands", yes: "Bands shown", no: "No bands shown", kind: "appearance" },
  { id: "scratch", label: "Mark left in the supplied scratch test", yes: "Scratch mark left", no: "No scratch mark", kind: "test" },
  { id: "water", label: "Water taken in during the supplied test", yes: "Water taken in", no: "No water taken in", kind: "test" },
];
export function specimenText(s) {
  return `Sample ${s.id}: ${s.grains ? "separate grains shown" : "no separate grains shown"}; ${s.crystals ? "crystal shapes shown" : "no crystal shapes shown"}; ${s.bands ? "bands shown" : "no bands shown"}; ${s.fossil ? "a labelled fossil imprint shown" : "no fossil imprint shown"}.`;
}
export function testText(s) {
  return `Supplied tests for sample ${s.id}: ${s.scratch ? "a scratch mark was left" : "no scratch mark was left"}; ${s.water ? "water was taken in" : "no water was taken in"}. These are authored results for this sample only.`;
}
const visible = [
 ["grains", "Separate grains are shown.", "No separate grains are shown."],
 ["crystals", "Crystal shapes are shown.", "No crystal shapes are shown."],
 ["bands", "Bands are shown.", "No bands are shown."],
];
export const FEATURE_BANK = SPECIMENS.flatMap(s => visible.map(([feature, yes, no]) => ({ id: `feature-${s.id}-${feature}`, specimen: s, feature, prompt: `Look at sample ${s.id}. What does its view show about ${feature === "crystals" ? "crystal shapes" : feature}?`, answer: s[feature] ? yes : no, options: [yes, no, "The picture proves how easily it scratches."] })));
const sets = [[0,1,2],[1,2,3],[2,3,4]];
export const SORT_BANK = CRITERIA.flatMap(criterion => sets.map((indices,i) => ({id:`sort-${criterion.id}-${i}`, criterion, specimens: indices.map(index=>SPECIMENS[index])})));
const pairs = [["grains","crystals"],["grains","bands"],["crystals","bands"],["scratch","water"],["bands","scratch"]];
export const TABLE_BANK = pairs.flatMap((ids,i)=>sets.map((indices,j)=>({id:`table-${i}-${j}`, columns:ids.map(id=>CRITERIA.find(c=>c.id===id)), specimens:indices.map(index=>SPECIMENS[index])})));
const properties = [
 { id:"scratch", title:"Compare scratch marks", fair:"Use the same tool, pressure and number of strokes on fresh surfaces of both samples.", wrong:["Use a different tool for each sample.","Scratch one sample once and the other many times."], before:"Both fresh test surfaces have no scratch mark yet.", method:"A grown-up used the same tool, pressure and number of strokes on fresh test surfaces.", yes:"A scratch mark was left.", no:"No scratch mark was left.", finding:"The sample with no scratch mark resisted this scratch test better. This does not tell us how easily it breaks." },
 { id:"water", title:"Compare water taken in", fair:"Use dry samples of the same size, the same amount of water and the same waiting time.", wrong:["Give one sample more water than the other.","Watch one sample for much longer than the other."], before:"Both same-sized samples are dry before adding water.", method:"A grown-up added the same amount of water to dry, same-sized samples and waited the same time.", yes:"Water was taken into the sample.", no:"No water was taken into the sample.", finding:"These results group the samples by water taken in during this test. The view alone cannot tell us this, and we did not test water passing through the whole sample." },
 { id:"wear", title:"Compare rubbing results", fair:"Use the same rubbing surface, pressure and number of strokes for both samples.", wrong:["Rub one sample gently and the other much harder.","Use a different rubbing surface for each sample."], before:"Both samples have clean surfaces; no loose pieces from rubbing have been recorded yet.", method:"A grown-up used the same rubbing surface, pressure and number of strokes on both samples.", yes:"Loose pieces came off during rubbing.", no:"No loose pieces came off during rubbing.", finding:"These results group the samples by whether loose pieces came off in this rubbing test. This result does not give a scratch-test answer." },
];
const outcomes = [[true,false],[false,true],[true,true]];
export const ENQUIRY_BANK = properties.flatMap(property=>outcomes.map((result,i)=>({
 id:`enquiry-${property.id}-${i}`, group:property.id, property, title:property.title,
 specimens:[{...SPECIMENS[i],id:"X"},{...SPECIMENS[i+3],id:"Y"}], results:result,
 setup:"Choose a fair way to compare these two samples. Predict, inspect the supplied observations, record the results and explain the grouping. These are authored results, not a live experiment.",
 fairOptions:[property.fair,...property.wrong], fairAnswer:property.fair,
 predictionOptions:["Both may show this change.","One may show this change.","Neither may show this change.","I am not sure yet."],
 stages:[{id:"before",label:"Before the test",text:property.before},{id:"method",label:"Same test for both",text:property.method},{id:"results",label:"Results",results:true}],
 recordCards:[{id:"sample-a",label:"Sample X"},{id:"sample-b",label:"Sample Y"}],
 recordBins:[{id:"yes",label:property.yes},{id:"no",label:property.no}],
 recordExpected:{"sample-a":result[0]?"yes":"no","sample-b":result[1]?"yes":"no"},
 conclusion:`Sample X: ${result[0]?property.yes:property.no} Sample Y: ${result[1]?property.yes:property.no} We group them using these observed results, not their appearance.`,
})));
export function buildRocksQuestions(level,rng) {
 if(![1,2,3,4].includes(level))throw new RangeError("Unknown rocks level");
 const bank=[FEATURE_BANK,SORT_BANK,TABLE_BANK,ENQUIRY_BANK][level-1];
 const selected=level===4?properties.map(p=>sample(bank.filter(q=>q.group===p.id),1,rng)[0]):sample(bank,5,rng);
 return shuffle(selected,rng).map(q=>({...q,level,options:q.options?shuffle(q.options,rng):[],fairOptions:q.fairOptions?shuffle(q.fairOptions,rng):[],
  recordCards:level===2?shuffle(q.specimens.map(s=>({id:s.id,label:`Sample ${s.id}`})),rng):q.recordCards,
  recordBins:level===2?[{id:"yes",label:q.criterion.yes},{id:"no",label:q.criterion.no}]:q.recordBins,
  tiles:level===4?shuffle([{id:"evidence",label:q.conclusion},{id:"looks",label:"The pictures alone prove every test result."},{id:"all",label:"Every rock of the same colour must have the same properties."}],rng):[],correctConclusionIds:level===4?["evidence"]:[],
 }));
}
export function isRocksSortCorrect(q,record) {
 if(q.level!==2||!CRITERIA.some(c=>c.id===q.criterion?.id)||!Array.isArray(q.specimens)||q.specimens.length!==3||new Set(q.specimens.map(s=>s.id)).size!==3||record==null||Object.keys(record).length!==3)return false;
 return q.specimens.every(s=>{const known=SPECIMENS.find(item=>item.id===s.id);return known&&Object.hasOwn(record,s.id)&&record[s.id]===(known[q.criterion.id]?"yes":"no");});
}
export function isRocksTableCorrect(q,record) {
 if(q.level!==3||!Array.isArray(q.specimens)||q.specimens.length!==3||new Set(q.specimens.map(s=>s.id)).size!==3||!Array.isArray(q.columns)||q.columns.length!==2||new Set(q.columns.map(c=>c.id)).size!==2||record==null||Object.keys(record).length!==6)return false;
 return q.specimens.every(s=>{const known=SPECIMENS.find(item=>item.id===s.id);return known&&q.columns.every(c=>CRITERIA.some(item=>item.id===c.id)&&Object.hasOwn(record,`${s.id}:${c.id}`)&&record[`${s.id}:${c.id}`]===(known[c.id]?"yes":"no"));});
}
export function isRocksRecordCorrect(q,record) {
 return q.level===4&&record!=null&&Object.keys(record).length===2&&q.recordCards.every(c=>Object.hasOwn(record,c.id)&&["yes","no"].includes(record[c.id])&&record[c.id]===q.recordExpected[c.id]);
}
