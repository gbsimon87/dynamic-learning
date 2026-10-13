import { c, lesson, record, sort, topic, visual } from "./authoring.js";
const globe = visual("globe", "The Equator and hemispheres", "The Equator is midway between the poles. North of it is the Northern Hemisphere. South is the Southern Hemisphere.", ["The Equator is an imaginary line at zero degrees latitude.", "It separates the Northern and Southern Hemispheres."]);
const places = visual("map", "Places around the Equator", "North is up. UK and Italy are north of the Equator. Brazil and Ecuador each cross the Equator.", ["The Equator crosses Brazil and Ecuador.", "The UK and Italy lie north of the Equator."], {view:"world",equator:true,markers:[{id:"A",label:"UK",point:[-2,54]},{id:"B",label:"Italy",point:[12.5,43]},{id:"C",label:"Brazil",point:[-52,-10]},{id:"D",label:"Ecuador",point:[-78.5,0]}]});
const crossing = record(["Ecuador has land north and south of the Equator.", "Brazil also has land in both hemispheres.", "A marker shows a location, not a whole country's extent.", "The Equator does not form every national boundary."]);
const pairs = record(["London lies north of the Equator.", "Rome lies north of the Equator.", "Brasília lies south of the Equator.", "Quito lies just south of the Equator.", "Hemisphere tells position, not the weather on every day."]);
export const theEquatorAndHemispheres = topic([
 lesson(["The Equator is an imaginary line around Earth.", "Its latitude is zero degrees.", "North and south of it are two hemispheres."], globe, [
  c("Which line separates the two hemispheres?","Equator","Prime Meridian","Arctic Circle",globe,["coordinates"]),
  c("What latitude labels the Equator?","0°","90° north","90° south",globe,["coordinates"]),
  c("Which hemisphere is north of the Equator?","Northern Hemisphere","Southern Hemisphere","Both at every point",globe,["coordinates"]),
  c("Which hemisphere is south of the Equator?","Southern Hemisphere","Northern Hemisphere","Only the North Pole",globe,["coordinates"]),
  c("What kind of line is the Equator?","An imaginary reference line","A fence around Earth","Every country's boundary",globe,["coordinates"]),
  c("Where is the Equator between the two poles?","Midway","At the North Pole","At the South Pole",globe,["coordinates"]),
  sort("Sort locations around the Equator.",["Northern Hemisphere","Southern Hemisphere"],[["North of Equator",0],["South of Equator",1],["North Pole",0]],globe,["coordinates"]),
 ]),
 lesson(["The Equator crosses some countries.", "Use country boundaries as well as markers.", "The UK and Italy are in the Northern Hemisphere."],places,[
  c("Which hemisphere contains the UK?","Northern Hemisphere","Southern Hemisphere","Both",places,["atlas","coordinates"]),
  c("Which hemisphere contains Italy?","Northern Hemisphere","Southern Hemisphere","Both",places,["atlas","coordinates"]),
  c("Which country crosses the Equator?","Brazil","UK","Italy",places,["atlas"]),
  c("Which other shown country crosses the Equator?","Ecuador","UK","Italy",places,["atlas"]),
  c("Which pair lies north of the Equator?","UK and Italy","UK and all Brazil","Italy and all Ecuador",places,["atlas"]),
  c("Which country has some land south of the Equator?","Brazil","UK","Italy",places,["atlas"]),
  c("Which statement matches the map?","The Equator crosses national land","The Equator follows every coastline","Italy crosses the Equator",places,["atlas"]),
 ]),
 lesson(["A whole country can cross a reference line.", "Its marker cannot describe every part.", "Ecuador and Brazil have land in both hemispheres."],crossing,[
  c("Which hemispheres contain Ecuador's land?","Northern and Southern","Only Northern","Only Southern",crossing,["atlas"]),
  c("Which hemispheres contain Brazil's land?","Northern and Southern","Only Southern","Only Northern",crossing,["atlas"]),
  c("Why can one marker be misleading for a whole country?","It shows only one location","It removes every boundary","It always shows the climate",crossing,["atlas"]),
  c("Does the Equator divide every country?","No, only some countries cross it","Yes, all countries cross it","No country crosses it",crossing,["atlas"]),
  c("Which evidence helps check a crossing country?","Its boundary and the Equator","Only the city marker","Only today's weather",crossing,["atlas"]),
  c("Which country claim is supported?","Ecuador has land on both sides","Every part of Ecuador is north","Every part of Brazil is south",crossing,["atlas"]),
  c("Which description fits Brazil and Ecuador?","Countries in both hemispheres","Continents at the North Pole","Countries entirely north",crossing,["atlas"]),
 ]),
 lesson(["Compare the cities' positions on the globe.", "Use north and south of the Equator in descriptions.", "Hemisphere alone does not explain a day's weather."],pairs,[
  c("Which pair includes one city in each hemisphere?","London and Brasília","London and Rome","Brasília and Quito",pairs,["atlas"]),
  c("Which pair is entirely in the Northern Hemisphere?","London and Rome","Rome and Quito","London and Brasília",pairs,["atlas"]),
  c("Which pair is entirely in the Southern Hemisphere?","Brasília and Quito","London and Rome","London and Quito",pairs,["atlas"]),
  c("Which description correctly compares London and Brasília?","London north; Brasília south","Both north","Both south",pairs,["atlas"]),
  c("Which city is just south of the Equator?","Quito","London","Rome",pairs,["atlas"]),
  c("What can hemisphere tell us directly?","Position relative to the Equator","Tomorrow's temperature","Every day's rainfall",pairs,["coordinates"]),
  sort("Sort the four cities by hemisphere.",["Northern","Southern"],[["London",0],["Rome",0],["Brasília",1],["Quito",1]],pairs,["atlas"]),
 ]),
]);
