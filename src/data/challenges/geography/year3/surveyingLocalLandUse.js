import { c, lesson, record, sort, ordered, topic, visual } from "./authoring.js";
const enquiry=record(["A land-use survey asks how people use land around a familiar place.","Choose visible evidence, such as a shop sign or people farming.","An aerial photograph alone cannot prove a building's current use.","Use an uncertain category when evidence is unclear.","Real observations happen with a grown-up, not inside this practice task."]);
const plan=visual("plan","Survey plan — example data, October 2026","North is up. Site A is at column 1, row 2 beside the shops. Site B is at column 3, row 1 beside the park. Homes are near Site A; a walking path is near Site B.",["Observe at Site A and Site B using the same categories.","Categories: homes, shops, leisure and uncertain.","Count visible uses; do not guess hidden building uses."],{origin:[0,0],size:4,markers:[{id:"A",label:"Site A / shops and homes",point:[1,2]},{id:"B",label:"Site B / park and walking path",point:[3,1]}]});
export const SURVEY_ROWS=[{label:"Homes",count:6},{label:"Shops",count:3},{label:"Leisure",count:2},{label:"Uncertain",count:1}];
const tally=record(["Example observations at Site A, October 2026: homes 6, shops 3, leisure 2, uncertain 1.","The graph represents these twelve sampled uses, not the whole neighbourhood.","Use a tally, a sketch map with a key, and a graph to present findings."]);
const conclusions=record(["Example Site A survey: homes 6, shops 3, leisure 2, uncertain 1.","Example Site B survey: homes 2, shops 1, leisure 5, uncertain 2.","Both used the same categories and ten-minute observation periods in October 2026.","The sample covers two points, not every place nearby.","To learn more, observe another point or repeat at a different time."]);
const activity={question:"How is land used around a familiar place?",steps:["Choose a familiar place and two observation points with a grown-up.","Stay at a suitable observation place with your grown-up.","Use the same categories and observation time at both points.","Tally visible uses. Write uncertain when a use is unclear.","Sketch a map with a key. Draw a graph of your tally.","Compare the sampled points and explain what you still do not know."]};
const chart=(prompt,answer,options)=>({kind:"chart",prompt,answer,options,chart:{type:"bar",rows:SURVEY_ROWS.map(({label,count})=>({label,value:count})),step:1,max:6,unit:"Sampled land uses"},visual:tally,sources:["example"],evidence:[tally.lines[0]],hint:"Match the labelled bars with the example tally."});
export const surveyingLocalLandUse=topic([
 lesson(["A survey asks a question about a place.","Look for visible evidence and record uncertainty.","The digital examples prepare you for observations with a grown-up."],enquiry,[
 c("Which question asks about observable local land use?","How is land used around this place?","Which country will win a race?","What is every resident thinking?",enquiry,["example"]),
 c("Which evidence could support calling a building a shop?","A visible shop sign","Only the roof shape","Only its colour",enquiry,["example"]),
 c("What should you record when use is unclear?","Uncertain","Definitely a shop","Definitely a home",enquiry,["example"]),
 c("Can an aerial photograph alone prove a building's current use?","No, other evidence is needed","Yes, every roof gives its use","Yes, all buildings are shops",enquiry,["example"]),
 c("Who should help with real observations?","A grown-up","Only the child alone","Nobody",enquiry,["example"]),
 c("What does completing this digital practice show?","You practised survey ideas","You performed outdoor fieldwork","You measured every local building",enquiry,["example"]),
 sort("Sort observation notes by certainty.",["Visible evidence","Uncertain use"],[["Visible shop sign",0],["People visibly farming",0],["Only a roof in an aerial photo",1]],enquiry,["example"]),
 ]),
 lesson(["The plan shows two example observation points.","Use the same categories at both sites.","Keep unclear uses in an uncertain category."],plan,[
 c("Which site is beside the shops and homes?","Site A","Site B","Neither",plan,["example"]),
 c("Which site is beside the park and walking path?","Site B","Site A","Neither",plan,["example"]),
 c("Which site is further north?","Site A","Site B","They are level",plan,["example"]),
 c("Which site is further east?","Site B","Site A","They are level",plan,["example"]),
 c("Which category includes a park's visible use?","Leisure","Shops","Uncertain if clearly labelled park",plan,["example"]),
 c("Why keep the categories the same at both sites?","To make counts comparable","To force the same answers","To remove every uncertainty",plan,["example"]),
 c("What should you avoid when recording buildings?","Guessing hidden uses","Reading visible signs","Recording uncertainty",plan,["example"]),
 ]),
 lesson(["These are labelled example observations.","A tally, sketch map and graph help present findings.","The graph describes the sample, not the whole neighbourhood."],tally,[
 chart("How many sampled uses were homes?",6,[6,3,2]),
 chart("How many sampled uses were shops?",3,[3,6,2]),
 chart("How many sampled uses were leisure?",2,[2,3,1]),
 chart("How many sampled uses were uncertain?",1,[1,2,3]),
 chart("How many homes and shops were sampled altogether?",9,[9,8,6]),
 c("Which category has the largest count?","Homes","Shops","Leisure",tally,["example"]),
 c("Which conclusion matches the graph's scope?","It describes twelve sampled uses","It describes every neighbourhood building","It proves every hidden use",tally,["example"]),
 ]),
 lesson(["Compare only the sampled observation points.","Use the same method at each point.","Choose a conclusion and a useful next observation."],conclusions,[
 c("Which site has more sampled leisure uses?","Site B","Site A","They are equal",conclusions,["example"]),
 c("Which site has more sampled homes?","Site A","Site B","They are equal",conclusions,["example"]),
 c("Which conclusion is supported?","Homes were the largest category at Site A","All nearby land is housing","Site B has no leisure",conclusions,["example"]),
 c("Which next step would extend the sample?","Observe another point","Guess all hidden uses","Delete uncertain results",conclusions,["example"]),
 c("Why repeat observations at another time?","Uses or visible activity may differ","One sample already proves everything","To force identical counts",conclusions,["example"]),
 c("Which part of the method helps a fair comparison?","Same categories and observation period","Different categories at each site","Guessing every unclear building",conclusions,["example"]),
 ordered("Order a survey plan, starting with the enquiry question.",["Ask the enquiry question","Choose sites and categories","Observe and tally","Map and graph findings"],visual("flow","Planning an enquiry","Start with a question. Choose sites and categories. Observe and tally. Present findings on a map and graph.",["Use the same method at each site."],{steps:["Ask a question","Choose sites and categories","Observe and tally","Map and graph findings"]}),["example"],"Start with the question. Record observations before presenting them."),
 ]),
],activity);
