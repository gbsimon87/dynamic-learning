import { c, lesson, record, ordered, sort, topic, visual } from "./authoring.js";
import { map, CAMPANIA_MAP } from "./maps.js";
const section=visual("volcano","A volcano cross-section","Magma is below Earth's crust. A vent is a passage upwards. A crater is the opening at the top. Lava is molten rock at the surface.",["Magma is molten rock below ground.","Lava is molten rock at the surface.","A vent carries material upwards; a crater is the top opening.","The crust is Earth's outer rocky layer."]);
const places=map("italy",["Campania","Naples"],["Campania is a region in Italy, within Europe.","Vesuvius lies within Campania, near Naples."]);
const route=visual("flow","From magma to lava","Follow this simplified route: magma below ground, magma moves up the vent, molten rock reaches the surface as lava.",["The name changes from magma to lava when molten rock reaches the surface.","Not all mountains are volcanoes."],{steps:["Magma below ground","Magma moves up a vent","Lava at the surface"]});
const living=record(["Studied volcanic places can attract visitors interested in their landscapes.","Some volcanic soils can support farming.","Eruptions can affect nearby homes, farms and roads.","Scientists monitor volcanoes to understand changes.","A benefit does not remove a possible challenge."]);
// These relationships are sourced to BGS's dedicated benefits/hazards discussion.
export const volcanoes=topic([
 lesson(["A volcano has a passage to the surface.","Magma is below ground; lava is at the surface.","Read the cross-section's labels."],section,[
 c("What is molten rock below ground called?","Magma","Lava","Rainwater",section,["magma"]),
 c("What is molten rock at the surface called?","Lava","Magma","Cloud droplets",section,["magma"]),
 c("Which label names the passage upwards?","Vent","Crater","Valley",section,["mountains"]),
 c("Which label names the opening at the top?","Crater","Crust","Magma",section,["mountains"]),
 c("Which label names Earth's outer rocky layer?","Crust","Cloud","Rain",section,["earthquakes"]),
 c("Where is the magma drawn?","Below ground","Inside a cloud","Only on the hillside",section,["magma"]),
 sort("Sort the two molten-rock locations.",["Magma","Lava"],[["Below ground",0],["Inside the vent below ground",0],["At the surface",1]],section,["magma"]),
 ]),
 lesson(["Vesuvius is our studied volcano.","It lies in Campania, a region of Italy.","Use a closer map to locate it near Naples."],places,[
 c("Which country contains Vesuvius?","Italy","France","UK",places,["vesuvius"]),
 c("Which region contains Vesuvius?","Campania","Lake District","North Yorkshire",places,["vesuvius"]),
 c("Which continent contains Italy?","Europe","Africa","South America",places,["atlas"]),
 c("Which city is near Vesuvius?","Naples","London","Berlin",places,["vesuvius"]),
 c("Which marker on the closer map names the volcano?","B: Vesuvius","A: Naples","Both are cities",CAMPANIA_MAP,["vesuvius"]),
 c("Which order correctly locates this volcano?","Europe, Italy, Campania, Vesuvius","Italy, Europe, London, Vesuvius","Europe, UK, Campania, Vesuvius",places,["atlas","vesuvius"]),
 c("Why use the closer Campania map?","It separates the nearby markers clearly","It changes Italy's location","It predicts an eruption",CAMPANIA_MAP,["atlas","vesuvius"]),
 ]),
 lesson(["Follow molten rock from below ground to the surface.","Its location decides whether we call it magma or lava.","A mountain is not automatically a volcano."],route,[
 c("Which material starts this shown route?","Magma","Rain","Ice",route,["magma"]),
 c("What passage does the magma travel through?","Vent","River channel","Cloud",route,["mountains"]),
 c("When is the material called lava?","When it reaches the surface","Whenever it is underground","Only when it becomes rain",route,["magma"]),
 c("What is material in the underground vent called?","Magma","Lava","Snow",route,["magma"]),
 c("Which claim about mountains is supported?","Not all are volcanoes","All contain flowing lava","All have one origin",route,["mountains"]),
 c("What changes along this route?","Location and the rock's name","Magma becomes river water","Every mountain erupts",route,["magma"]),
 ordered("Order the route, starting with magma below ground.",["Magma below ground","Magma rises in a vent","Lava reaches the surface"],route,["magma","mountains"]),
 ]),
 lesson(["Volcanic places can offer benefits and challenges.","Use the supplied evidence, without guessing eruption dates.","Scientists monitor changes carefully."],living,[
 c("Which activity can volcanic landscapes support?","Tourism","Only fishing everywhere","Only farming everywhere",living,["volcanoLife","vesuvius"]),
 c("Which possible benefit is described for some volcanic soils?","Farming","Predicting exact dates","Stopping every earthquake",living,["volcanoLife"]),
 c("Which possible challenge is described?","Effects on homes and roads","All soils are useless","Visitors never come",living,["volcanoLife"]),
 c("Why do scientists monitor volcanoes?","To understand changes","To make all mountains erupt","To guarantee exact dates",living,["volcanoLife","vesuvius"]),
 c("Which statement balances the evidence?","Benefits and challenges can both exist","A benefit removes every challenge","Volcanic places have no work",living,["volcanoLife"]),
 c("Which explanation links a landscape and work?","Visitors can support tourism jobs","Lava creates every job","All residents work as scientists",living,["volcanoLife","vesuvius"]),
 sort("Sort the supplied benefits and challenges.",["Possible benefit","Possible challenge"],[["Visitors interested in landscapes",0],["Soils supporting crops",0],["Effects on roads",1]],living,["volcanoLife"]),
 ]),
]);
