import { sample, shuffle } from "../english/shared.js";
export const SOURCE = { label: "Rock features: British Geological Survey (adapted)", url: "https://www.bgs.ac.uk/discovering-geology/rocks-and-minerals/" };
export const GLOSS = "A specimen is a sample we study. Grains are tiny pieces in a rock. Crystals are hard, shiny shapes with flat sides. Some rocks have them. A fossil shows that something lived long ago. A property is something we can see or test. A scratch test shows how hard it is to scratch a rock. That is not how easily it breaks. A rock taking in water is not the same as water going all the way through it.";
// Unnamed example samples, not identifications or universal rock-type claims.
export const SPECIMENS = [
  { id: "A", grains: true, crystals: false, bands: false, fossil: false, scratch: true, water: true },
  { id: "B", grains: false, crystals: true, bands: false, fossil: false, scratch: false, water: false },
  { id: "C", grains: false, crystals: false, bands: true, fossil: false, scratch: true, water: false },
  { id: "D", grains: true, crystals: false, bands: false, fossil: true, scratch: false, water: true },
  { id: "E", grains: false, crystals: true, bands: true, fossil: false, scratch: true, water: true },
  { id: "F", grains: true, crystals: false, bands: true, fossil: false, scratch: false, water: false },
];
export const CRITERIA = [
  { id: "grains", label: "Grains can be seen", yes: "Grains can be seen", no: "No grains can be seen", kind: "appearance" },
  { id: "crystals", label: "Crystal shapes can be seen", yes: "Crystals can be seen", no: "No crystals can be seen", kind: "appearance" },
  { id: "bands", label: "Bands can be seen", yes: "Bands can be seen", no: "No bands can be seen", kind: "appearance" },
  { id: "scratch", label: "Left a scratch mark in the test", yes: "Scratch mark left", no: "No scratch mark", kind: "test" },
  { id: "water", label: "Took in water in the test", yes: "Water taken in", no: "No water taken in", kind: "test" },
];
export function specimenText(s) {
  return `Sample ${s.id}: ${s.grains ? "grains can be seen" : "no grains can be seen"}. ${s.crystals ? "Crystal shapes can be seen" : "No crystal shapes can be seen"}. ${s.bands ? "Bands (stripes) can be seen" : "No bands can be seen"}. ${s.fossil ? "A fossil imprint can be seen" : "There is no fossil imprint"}.`;
}
export function testText(s) {
  return `Tests on sample ${s.id}: ${s.scratch ? "a scratch mark was left" : "no scratch mark was left"}. ${s.water ? "Water was taken in" : "No water was taken in"}. These results are for this sample only.`;
}
const visible = [
 ["grains", "Grains can be seen", "No grains can be seen"],
 ["crystals", "Crystal shapes can be seen", "No crystal shapes can be seen"],
 ["bands", "Bands can be seen", "No bands can be seen"],
];
export const FEATURE_BANK = SPECIMENS.flatMap(s => visible.map(([feature, yes, no]) => ({ id: `feature-${s.id}-${feature}`, specimen: s, feature, prompt: `Look at sample ${s.id}. What can you see about its ${feature === "crystals" ? "crystal shapes" : feature}?`, answer: s[feature] ? yes : no, options: [yes, no, "It shows how hard the rock is"] })));
const sets = [[0,1,2],[1,2,3],[2,3,4]];
export const SORT_BANK = CRITERIA.flatMap(criterion => sets.map((indices,i) => ({id:`sort-${criterion.id}-${i}`, criterion, specimens: indices.map(index=>SPECIMENS[index])})));
const pairs = [["grains","crystals"],["grains","bands"],["crystals","bands"],["scratch","water"],["bands","scratch"]];
export const TABLE_BANK = pairs.flatMap((ids,i)=>sets.map((indices,j)=>({id:`table-${i}-${j}`, columns:ids.map(id=>CRITERIA.find(c=>c.id===id)), specimens:indices.map(index=>SPECIMENS[index])})));
const properties = [
 { id:"scratch", title:"Compare scratch marks", fair:"Use the same tool, the same push and the same number of strokes on both samples.", wrong:["Use a different tool for each sample.","Scratch one sample once and the other lots of times."], before:"Neither sample has a scratch mark yet.", method:"A grown-up used the same tool, the same push and the same number of strokes on both.", yes:"A scratch mark was left.", no:"No scratch mark was left.", finding:"The sample with no scratch mark was harder to scratch. That does not tell us how easily it breaks." },
 { id:"water", title:"Compare water taken in", fair:"Use dry samples of the same size, the same amount of water and the same waiting time.", wrong:["Give one sample more water than the other.","Leave one sample in the water for much longer."], before:"Both samples are the same size and dry before the water is added.", method:"A grown-up added the same amount of water to dry samples of the same size. They waited the same time.", yes:"Water was taken in.", no:"No water was taken in.", finding:"These results sort the samples by whether they took in water in this test. A picture cannot tell us this. We did not test if water goes all the way through." },
 { id:"wear", title:"Compare rubbing results", fair:"Use the same rubbing surface, the same push and the same number of strokes on both samples.", wrong:["Rub one sample gently and the other much harder.","Use a different rubbing surface for each sample."], before:"Both samples start with clean surfaces. No loose pieces have come off yet.", method:"A grown-up used the same rubbing surface, the same push and the same number of strokes on both.", yes:"Loose pieces came off.", no:"No loose pieces came off.", finding:"These results sort the samples by whether loose pieces came off when rubbed. This is not the same as a scratch test." },
];
const outcomes = [[true,false],[false,true],[true,true]];
export const ENQUIRY_BANK = properties.flatMap(property=>outcomes.map((result,i)=>({
 id:`enquiry-${property.id}-${i}`, group:property.id, property, title:property.title,
 specimens:[{...SPECIMENS[i],id:"X"},{...SPECIMENS[i+3],id:"Y"}], results:result,
 setup:"We want to compare two samples, X and Y. First choose a fair test. Then predict, look at the results, sort the samples and explain.",
 fairOptions:[property.fair,...property.wrong], fairAnswer:property.fair,
 predictionOptions:["Both samples may show it.","One sample may show it.","Neither sample may show it.","I am not sure yet."],
 stages:[{id:"before",label:"Before the test",text:property.before},{id:"method",label:"Same test for both",text:property.method},{id:"results",label:"Results",results:true}],
 recordCards:[{id:"sample-a",label:"Sample X"},{id:"sample-b",label:"Sample Y"}],
 recordBins:[{id:"yes",label:property.yes},{id:"no",label:property.no}],
 recordExpected:{"sample-a":result[0]?"yes":"no","sample-b":result[1]?"yes":"no"},
 conclusion:`Sample X: ${result[0]?property.yes:property.no} Sample Y: ${result[1]?property.yes:property.no} We sort them using the test results, not how they look.`,
})));
export function buildRocksQuestions(level,rng) {
 if(![1,2,3,4].includes(level))throw new RangeError("Unknown rocks level");
 const bank=[FEATURE_BANK,SORT_BANK,TABLE_BANK,ENQUIRY_BANK][level-1];
 const selected=level===4?properties.map(p=>sample(bank.filter(q=>q.group===p.id),1,rng)[0]):sample(bank,5,rng);
 return shuffle(selected,rng).map(q=>({...q,level,options:q.options?shuffle(q.options,rng):[],fairOptions:q.fairOptions?shuffle(q.fairOptions,rng):[],
  recordCards:level===2?shuffle(q.specimens.map(s=>({id:s.id,label:`Sample ${s.id}`})),rng):q.recordCards,
  recordBins:level===2?[{id:"yes",label:q.criterion.yes},{id:"no",label:q.criterion.no}]:q.recordBins,
  tiles:level===4?shuffle([{id:"evidence",label:q.conclusion},{id:"looks",label:"The pictures alone show every test result."},{id:"all",label:"Rocks of the same colour always have the same properties."}],rng):[],correctConclusionIds:level===4?["evidence"]:[],
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
