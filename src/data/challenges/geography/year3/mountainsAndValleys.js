import { c, lesson, record, sort, ordered, topic, visual } from "./authoring.js";
import { map } from "./maps.js";
const land=visual("mountain","Mountains, hills and a valley","A high mountain has steep slopes on the left. A lower hill has gentler slopes on the right. A valley lies between slopes.",["Mountains and hills are raised land.","Valleys are lower land between slopes.","Steep slopes rise more sharply than gentle slopes."]);
const places=map("europe",["Lake District","Italy"],["Scafell Pike is a mountain in the Lake District, England.","The Alps include mountains in northern Italy.","Both studied areas include high land and valleys."]);
const form=visual("flow","One way mountains form","First plates push towards each other. Pressure squeezes rock. Land is pushed upwards. Some mountain ranges form this way; mountains have different origins.",["Some mountains form when plates push land upwards.","Not every mountain is a volcano."],{steps:["Plates push together","Rock is squeezed","Land rises into mountains"]});
const work=record(["Example valley plan: gentle fields, farm buildings and a road.","Example mountain plan: steep slopes and a marked walking path.","Gentle land can make farming and road building easier.","Walking routes can support leisure on mountain slopes.","Plans show these examples, not a rule for every slope."]);
export const mountainsAndValleys=topic([
 lesson(["Mountains and hills are raised land.","A valley lies between slopes.","Compare steep and gentle slopes using the diagram."],land,[
 c("Which feature is low land between slopes?","Valley","Mountain peak","Hilltop",land,["mountains"]),
 c("Which feature is the highest in this diagram?","Mountain","Hill","Valley floor",land,["mountains"]),
 c("Which slope rises more sharply?","Steep slope","Gentle slope","Level valley floor",land,["mountains"]),
 c("Which feature on the right has gentler slopes?","Hill","High mountain","Valley floor",land,["mountains"]),
 c("Which pair is raised land?","Mountains and hills","Valleys and lakes","Roads and homes",land,["mountains"]),
 c("Where is the valley shown?","Between the slopes","Above every peak","Outside the landscape",land,["mountains"]),
 sort("Sort the diagram features.",["Raised land","Lower land"],[["Mountain",0],["Hill",0],["Valley floor",1]],land,["mountains"]),
 ]),
 lesson(["Our UK example is in the Lake District.","Our European example includes the Italian Alps.","These regions have high land and valleys."],places,[
 c("Where is Scafell Pike?","Lake District","Campania coast","London",places,["park"]),
 c("Which country contains the Lake District?","England","Italy","Norway",places,["park"]),
 c("Which mountain range includes northern Italian peaks?","Alps","Pennines","Only the Thames",places,["atlas"]),
 c("Which studied country includes part of the Alps?","Italy","UK","Spain",places,["atlas"]),
 c("Which example is further north on this map?","Lake District","Italy","Both at one latitude",places,["atlas"]),
 c("Which feature occurs in both studied areas?","High land","Only flat land","Only open ocean",places,["park","atlas"]),
 c("Which UK mountain belongs in the Lake District key?","Scafell Pike","Vesuvius","Mont Blanc",places,["park"]),
 ]),
 lesson(["Some mountains form when plates push land upwards.","This diagram shows one formation route.","Mountains have different origins; not all are volcanoes."],form,[
 c("What moves towards another plate in this diagram?","A plate","A cloud","A river",form,["mountains"]),
 c("What happens to rock as plates push together?","It is squeezed","It becomes water vapour","It turns into a road",form,["mountains"]),
 c("Which way does the land move here?","Upwards","Only downwards","Into a cloud",form,["mountains"]),
 c("Does this explain every mountain's origin?","No, origins differ","Yes, all form this way","Yes, all are volcanoes",form,["mountains"]),
 c("Which claim matches the notes?","Not every mountain is a volcano","Every hill contains a crater","All valleys are volcanoes",form,["mountains"]),
 c("What could pushing plates create over time?","A mountain range","An instant city","A new cloud",form,["mountains"]),
 ordered("Order the shown formation route from plates pushing together.",["Plates push together","Rock is squeezed","Land rises"],form,["mountains"]),
 ]),
 lesson(["Use the example plans to link slopes and work.","Gentle slopes can help farming and transport.","Steep landscapes can support walking activities."],work,[
 c("Which plan shows easier land for the farm fields?","Valley plan","Steep mountain plan","Neither has fields",work,["example"]),
 c("Which activity is shown on the steep slopes?","Walking","Cargo shipping","Underground rail travel",work,["example"]),
 c("Why might a road use the gentle land here?","Building there can be easier","All roads must point north","Mountains have no visitors",work,["example"]),
 c("Which plan contains farm buildings?","Valley plan","Mountain plan","Both show only water",work,["example"]),
 c("Which land-use connection is supported?","Gentle fields support farming","Every steep slope has houses","Only valleys support leisure",work,["example"]),
 c("Which conclusion goes beyond these examples?","All slopes are used the same way","The valley plan has a road","The mountain plan has a path",work,["example"]),
 c("What further evidence could help compare land use?","Another labelled slope and use plan","Only a country's flag","Only a city's spelling",work,["example"]),
 ]),
]);
