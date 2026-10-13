import { c, lesson, sort, ordered, topic, visual } from "./authoring.js";
const steps=["Evaporation: liquid water becomes water vapour","Condensation: vapour becomes droplets","Precipitation: water falls as rain or snow","Collection and runoff: water gathers and flows"];
const cycle=visual("flow","The water cycle — a repeating route","On the shown route: evaporation leads to condensation, then precipitation, then collection. Collection connects back to evaporation. Water can follow other routes. The Sun supplies energy.",["The Sun supplies energy for evaporation.","Condensation makes water droplets from invisible water vapour.","Clouds contain water droplets or ice.","Precipitation includes rain and snow.","Runoff moves across land into rivers and lakes.","This cycle has no single starting point."],{steps,cycle:true});
const routes=[
 ["evaporation",["Evaporation","Condensation","Precipitation","Collection"]],
 ["condensation",["Condensation","Precipitation","Collection","Evaporation"]],
 ["precipitation",["Precipitation","Collection","Evaporation","Condensation"]],
 ["collection",["Collection","Evaporation","Condensation","Precipitation"]],
 ["rain reaching land",["Rain reaches land","Runoff enters a river","River water reaches a lake"]],
 ["liquid water at the surface",["Liquid water at surface","Evaporation makes vapour","Condensation makes droplets"]],
 ["droplets forming a cloud",["Droplets form a cloud","Rain falls","Water collects"]],
];
export const theWaterCycle=topic([
 lesson(["Water moves through a repeating cycle.","The Sun supplies energy.","Evaporation makes vapour; condensation makes droplets.","Rain, snow, collection and runoff move water onwards."],cycle,[
 c("Which process changes liquid water into vapour?","Evaporation","Condensation","Collection",cycle,["water"]),
 c("Which process changes vapour into droplets?","Condensation","Evaporation","Runoff",cycle,["clouds"]),
 c("Which word describes rain or snow falling?","Precipitation","Collection","Evaporation",cycle,["water"]),
 c("Which source supplies energy for evaporation?","Sun","Only the Moon","Only the wind",cycle,["water"]),
 c("What do clouds contain?","Water droplets or ice","Only visible water vapour","Only dry dust",cycle,["clouds"]),
 c("Which process carries water across the land?","Runoff","Only condensation","Only cloud formation",cycle,["water"]),
 sort("Sort the changes of water.",["Evaporation","Condensation"],[["Liquid becomes vapour",0],["Vapour becomes droplets",1],["Droplets form a cloud",1]],cycle,["water","clouds"]),
 ]),
 lesson(["Follow the arrows along the shown route.","Start at the point named in each question.","Water can travel along other routes too."],cycle,[
 c("On this route, what follows evaporation?","Condensation","Collection","Runoff into a river",cycle,["water"]),
 c("On this route, what follows condensation?","Precipitation","Evaporation","Only underground storage",cycle,["water"]),
 c("On this route, what follows precipitation?","Collection","Condensation","Only sunlight",cycle,["water"]),
 c("On this route, what follows collection?","Evaporation","Precipitation","Only snow formation",cycle,["water"]),
 c("On this route, what happens before droplets form?","Vapour is made by evaporation","All water leaves Earth","Water becomes rock",cycle,["water","clouds"]),
 c("Where can runoff carry rainwater?","Into rivers and lakes","Only straight into the Sun","Only into clouds",cycle,["water"]),
 c("Which word names water gathering after rain?","Collection","Evaporation","Condensation",cycle,["water"]),
 ]),
 lesson(["A cycle has no single starting point.","Each task names where to start its route.","Order only the stages shown on that route."],cycle,routes.map(([start,labels])=>{
 const v={...cycle,title:`Route starting with ${start}`,steps:labels,alt:`Start with ${start}. Follow this route: ${labels.join("; then ")}. Water can follow other routes.`};
 return ordered(`Order this route, starting with ${start}.`,labels,v,["water","clouds"]);
 })),
 lesson(["Connect rainfall, runoff and evaporation using the evidence.","The water keeps moving between places and forms.","A cloud contains droplets or ice, not visible vapour."],cycle,[
 c("How can rainfall help refill a lake?","Runoff carries water into it","Sunlight turns rock into water","Clouds always fall whole",cycle,["water"]),
 c("What supplies energy as lake water evaporates?","Sun","Only runoff","Only the lake bed",cycle,["water"]),
 c("Which explanation connects vapour and clouds?","Vapour condenses into droplets","Clouds are only visible vapour","Water vapour is always rain",cycle,["clouds"]),
 c("Why can we start describing this cycle at different stages?","It repeats without one fixed start","It happens only once","It has no connected stages",cycle,["water"]),
 c("Which sequence links rain to a river?","Rain falls, then runoff enters a river","Condensation makes dry rocks","Sunlight makes a river disappear forever",cycle,["water"]),
 c("Which statement uses both forms of water?","Liquid evaporates; vapour condenses","Liquid is always a cloud","Vapour is always visible",cycle,["water","clouds"]),
 c("Which explanation describes a repeating process?","Collected water can evaporate again","Rain stops every future cycle","Clouds use up all Earth's water",cycle,["water"]),
 ]),
]);
