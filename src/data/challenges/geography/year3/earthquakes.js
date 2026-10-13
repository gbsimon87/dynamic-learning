import { c, lesson, record, ordered, topic, visual } from "./authoring.js";
const fault=visual("fault","A simplified fault diagram","Two blocks of crust lie beside a fault. Sudden movement along the fault releases energy. Shaking spreads through the ground.",["Earth's outer layer is divided into moving plates.","A fault is a break in rock where movement can occur.","Sudden movement releases energy, causing earthquake shaking."]);
const areas=visual("map","Studied earthquake areas","North is up. Japan lies in eastern Asia. California lies on North America's Pacific coast. Italy lies in southern Europe. These are studied earthquake areas, not live alerts.",["Japan, California and Italy are studied earthquake areas.","Many earthquakes occur near plate boundaries.","Some earthquakes also occur away from plate boundaries."],{view:"world",markers:[{id:"A",label:"Japan",point:[138,37]},{id:"B",label:"California",point:[-120,36]},{id:"C",label:"Italy",point:[12.5,43]}]});
const release=visual("flow","Movement and shaking","First movement is held along a fault. Pressure builds. Rock suddenly slips. Released energy travels through the ground as shaking.",["Energy can build while a fault is held.","Sudden slipping releases energy.","Shaking travels away from the movement."],{steps:["Movement held along fault","Energy builds","Rock suddenly slips","Energy spreads as shaking"]});
// Original teaching traces checked against USGS's global setting map. Not a complete plate atlas.
areas.boundaries=[[[145,45],[143,39],[141,35],[137,30],[130,26]], [[-130,48],[-126,42],[-122,37],[-116,30]], [[-32,65],[-28,45],[-35,20],[-20,-15],[-12,-40]], [[-7,36],[8,38],[15,36],[23,35]]];
areas.alt += " Dashed traces show selected plate boundaries near Japan, California, the Atlantic and Mediterranean. Other boundaries are not shown.";
const scientists=record(["Scientists record where earthquakes happen and how the ground moves.","Records help scientists study patterns and plan safer buildings.","Scientists cannot predict the exact date, place and size of a future earthquake.","A pattern does not promise an exact earthquake date.","Recording an event is different from predicting one."]);
export const earthquakes=topic([
 lesson(["Earthquakes involve ground shaking.","Sudden movement along a fault releases energy.","A fault is a break in rock where movement can occur."],fault,[
 c("What happens during an earthquake?","Ground shakes","All water disappears","Every cloud freezes",fault,["earthquakes"]),
 c("Which label names a break where rock can move?","Fault","River","Cloud",fault,["earthquakes"]),
 c("What can sudden fault movement release?","Energy","Only rain","Only sunlight",fault,["earthquakes"]),
 c("Which layer is divided into moving plates?","Earth's outer layer","A cloud layer","The ocean's surface water",fault,["earthquakes"]),
 c("What spreads through the ground?","Shaking","A new country boundary","Only a rainbow",fault,["earthquakes"]),
 c("Which action causes shaking in this diagram?","Sudden movement along a fault","A boat moving slowly","Rain entering a lake",fault,["earthquakes"]),
 c("Which statement describes a plate?","Part of Earth's moving outer layer","A line drawn by a city","Water inside a cloud",fault,["earthquakes"]),
 ]),
 lesson(["The map shows three studied earthquake areas.","Many earthquakes occur near plate boundaries.","Earthquakes can also occur away from those boundaries."],areas,[
 c("Which marked area lies in eastern Asia?","Japan","California","Italy",areas,["atlas","earthquakes","plateMap"]),
 c("Which marked area lies in Europe?","Italy","Japan","California",areas,["atlas","earthquakes","plateMap"]),
 c("Which marked area lies in North America?","California","Italy","Japan",areas,["atlas","earthquakes","plateMap"]),
 c("Which letter labels Japan?","A","B","C",areas,["atlas"]),
 c("Which letter labels California?","B","A","C",areas,["atlas"]),
 c("Where do many earthquakes occur?","Near plate boundaries","Only in one country","Only on the Equator",areas,["earthquakes","plateMap"]),
 c("Can earthquakes occur away from plate boundaries?","Yes, some do","No, never","Only in clouds",areas,["earthquakes","plateMap"]),
 ]),
 lesson(["Movement can be held along a fault.","Energy builds and can be released suddenly.","The diagram links slipping with shaking."],release,[
 c("What builds while movement is held?","Energy","Only lake water","A new compass",release,["earthquakes"]),
 c("What releases energy in this diagram?","Sudden slipping","Only a gentle rainfall","Reading a map",release,["earthquakes"]),
 c("What happens after the rock slips?","Energy spreads as shaking","All ground stops moving forever","The Sun disappears",release,["earthquakes"]),
 c("Which happens before sudden slipping in this route?","Energy builds","Shaking has finished","Scientists name a city",release,["earthquakes"]),
 c("Where does the shaking travel?","Through the ground","Only along clouds","Only inside sunlight",release,["earthquakes"]),
 c("Which relationship matches the diagram?","Fault movement releases energy","All rain creates earthquakes","Maps make plates move",release,["earthquakes"]),
 ordered("Order the shown route, starting with held movement.",["Movement is held","Energy builds","Rock slips","Shaking spreads"],release,["earthquakes"]),
 ]),
 lesson(["Scientists record earthquakes to understand patterns.","Evidence helps people plan safer buildings.","It cannot give an exact future earthquake date."],scientists,[
 c("Why do scientists record ground movement?","To study earthquake patterns","To promise exact future dates","To stop all plate movement",scientists,["earthquakes","prediction"]),
 c("What can earthquake records help people plan?","Safer buildings","Every child's route home","Exact dates with certainty",scientists,["earthquakes"]),
 c("Which claim goes beyond scientific evidence?","An exact future earthquake date is guaranteed","Scientists record ground movement","Records help study patterns",scientists,["prediction"]),
 c("Which is a record of an event?","Where shaking happened","An untested exact future date","A guess about tomorrow",scientists,["earthquakes"]),
 c("Why is a pattern different from an exact prediction?","It does not promise one exact date","It stops ground shaking","It removes all uncertainty",scientists,["prediction"]),
 c("Which statement correctly describes scientists' work?","They study recorded movement","They control every fault","They guarantee no earthquakes",scientists,["earthquakes"]),
 c("Which conclusion uses the evidence carefully?","Records inform planning despite uncertainty","One pattern gives exact dates","Recording prevents every earthquake",scientists,["prediction"]),
 ]),
]);
