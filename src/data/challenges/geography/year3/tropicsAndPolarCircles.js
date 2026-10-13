import { c, lesson, record, sort, topic, visual } from "./authoring.js";
const referenceLines=[{label:"Arctic Circle",lat:66.5},{label:"Tropic of Cancer",lat:23.5},{label:"Equator",lat:0},{label:"Tropic of Capricorn",lat:-23.5},{label:"Antarctic Circle",lat:-66.5}];
const globe=visual("globe","Five globe reference lines","From north to south: Arctic Circle, Tropic of Cancer, Equator, Tropic of Capricorn, Antarctic Circle.",["The tropics lie about 23.5° north and south of the Equator.","The polar circles lie about 66.5° north and south."],{referenceLines});
const locations=visual("globe","Practice places and reference lines","Point 1 is at 70° north, north of the Arctic Circle. Point 2 is at 10° north, between the tropics. Point 3 is at 70° south, south of the Antarctic Circle.",["Point 1: 70° north. Point 2: 10° north. Point 3: 70° south."],{referenceLines,points:[{label:"Point 1",lat:70,lon:-25},{label:"Point 2",lat:10,lon:0},{label:"Point 3",lat:-70,lon:25}]});
const sun=visual("flow","Sunlight patterns — simplified diagram","Between the tropics: the noon Sun can be overhead on certain dates. Near the poles beyond the circles: there can be a day without sunset or sunrise. Earth's tilt matters.",["At the tropics, the noon Sun can be overhead on a solstice.","Beyond the polar circles, polar day or night can occur.","Earth's tilt helps explain these patterns.","Latitude alone does not determine a place's climate."],{steps:["Tilted Earth changes its position around the Sun","Tropics: overhead noon Sun on certain dates","Polar regions: periods without sunset or sunrise"]});
const use=record(["Reference lines help describe a place's position.","The tropics bound where the noon Sun can be directly overhead.","Polar circles mark the approximate limits of polar day and night.","Mountains, sea and other factors also influence climate.","Supplied degree labels describe lines; you do not need to memorise them."]);
export const tropicsAndPolarCircles=topic([
 lesson(["The tropics lie on either side of the Equator.","The polar circles lie nearer the poles.","Read the supplied names and degree labels."],globe,[
 ...referenceLines.filter(l=>l.lat!==0).map(l=>c(`Which line is labelled ${Math.abs(l.lat)}° ${l.lat>0?"north":"south"}?`,l.label,...referenceLines.filter(n=>n.label!==l.label).slice(0,2).map(n=>n.label),globe,["coordinates","sunlight","polar"])),
 c("Which line lies between the two tropics?","Equator","Arctic Circle","Antarctic Circle",globe,["coordinates"]),
 c("Which tropic is in the Northern Hemisphere?","Tropic of Cancer","Tropic of Capricorn","Antarctic Circle",globe,["sunlight"]),
 sort("Sort northern and southern reference lines.",["North of Equator","South of Equator"],[["Arctic Circle",0],["Tropic of Cancer",0],["Tropic of Capricorn",1],["Antarctic Circle",1]],globe,["coordinates"]),
 ]),
 lesson(["Compare each place with the marked reference lines.","Use the degree labels as clues.","Positions can lie between two lines."],locations,[
 c("Which point lies north of the Arctic Circle?","Point 1","Point 2","Point 3",locations,["coordinates"]),
 c("Which point lies south of the Antarctic Circle?","Point 3","Point 1","Point 2",locations,["coordinates"]),
 c("Which point lies between the tropics?","Point 2","Point 1","Point 3",locations,["coordinates"]),
 c("Which point lies between Equator and Tropic of Cancer?","Point 2","Point 3","Point 1",locations,["coordinates"]),
 c("Which point is nearest the North Pole?","Point 1","Point 2","Point 3",locations,["coordinates"]),
 c("Which reference line lies between Point 2 and Point 1?","Tropic of Cancer","Tropic of Capricorn","Antarctic Circle",locations,["coordinates"]),
 c("Which reference line lies between Equator and Point 3?","Tropic of Capricorn","Tropic of Cancer","Arctic Circle",locations,["coordinates"]),
 ]),
 lesson(["Earth's tilt affects sunlight through the year.","The tropics relate to the overhead noon Sun.","Polar regions can have continuous day or night.","These patterns do not give every place the same climate."],sun,[
 c("Where can the noon Sun be directly overhead?","Between the tropics","At every latitude","Only outside polar circles",sun,["sunlight"]),
 c("What can happen beyond the polar circles?","A period without sunset","The Sun always overhead","Every day exactly equal",sun,["polar"]),
 c("Which Earth feature helps explain these patterns?","Its tilt","Its country boundaries","Its roads",sun,["sunlight"]),
 c("What does polar night mean?","A period without sunrise","The Sun overhead at noon","Only a cloudy afternoon",sun,["polar"]),
 c("What does polar day mean?","A period without sunset","A normal cloudy night","Every country has summer",sun,["polar"]),
 c("Can latitude alone describe the whole climate?","No, other factors matter","Yes, every place is identical","Yes, mountains have no effect",sun,["sunlight"]),
 sort("Match patterns to the reference areas.",["Tropics","Beyond polar circles"],[["Overhead noon Sun on certain dates",0],["Polar day",1],["Polar night",1]],sun,["sunlight","polar"]),
 ]),
 lesson(["These lines connect position and sunlight patterns.","They are imaginary, useful reference boundaries.","They do not predict today's weather."],use,[
 c("Why are the tropics useful reference lines?","They bound the overhead noon Sun area","They show every mountain","They predict tomorrow's rain",use,["sunlight"]),
 c("Why are the polar circles useful?","They relate to polar day and night","They mark all country borders","They show every river",use,["polar"]),
 c("Which information can these reference lines help describe?","A place's position","Every building's use","Every day's rainfall",use,["coordinates"]),
 c("Why can two places at one latitude have different climates?","Mountains and sea also matter","Latitude always makes them identical","Reference lines are real fences",use,["sunlight"]),
 c("Which explanation uses the evidence?","Tropics help describe sunlight patterns","Tropics force identical weather","Polar circles divide countries exactly",use,["sunlight"]),
 c("What do the supplied degree labels help us read?","Reference-line positions","Tomorrow's temperature","A town's population",use,["coordinates"]),
 c("Which claim goes beyond this evidence?","All tropical places have identical weather","Lines describe position","Polar circles relate to sunlight",use,["sunlight"]),
 ]),
]);
