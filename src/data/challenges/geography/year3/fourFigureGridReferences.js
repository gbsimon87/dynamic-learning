import { c, lesson, topic, visual } from "./authoring.js";
import { gridReference } from "../geometry.js";
export const GRID_POINTS=[[23.4,41.6],[24.7,42.3],[25.2,41.7],[23.8,43.3],[24.2,43.6],[25.6,42.8],[25.5,43.2]];
export const OS_POINTS=[[25.6,21.5],[25.6,22.3],[26.5,23.4],[27.4,25.4],[23.5,22.5],[26.4,20.6],[28.4,24.5]];
const practice=(point)=>visual("grid","Practice grid: a square reference",`Marker T is inside the square between eastings ${Math.floor(point[0])} and ${Math.floor(point[0])+1}, and northings ${Math.floor(point[1])} and ${Math.floor(point[1])+1}. North is up.`,["Read eastings first, then northings.","Use the lines at the square's lower-left corner.","Four figures identify a square, not an exact point."],{origin:[23,41],size:3,markers:[{id:"T",label:"Tree marker",point}]});
const key=visual("photo","The actual OS key — June 2026","The actual OS key shows grey areas for buildings and green patches for woods.",["OS means Ordnance Survey.","A map key explains the symbols used on that map.","Grey areas represent buildings; green patches represent woods."],{image:"os-land-key"});
const os=(point)=>visual("grid","OS extract: Keswick and Derwentwater",`North is up. Marker P is inside eastings ${Math.floor(point[0])}–${Math.floor(point[0])+1} and northings ${Math.floor(point[1])}–${Math.floor(point[1])+1}. The original OS extract shows Keswick north of Derwentwater. Pale blue outlined areas represent lake water; green patches represent woods.`,["Original OS raster extract, June 2026. Added numbered 1 km grid.","Use the actual OS key shown beneath the extract.","P marks a position inside one grid square."],{origin:[22,19],size:8,image:"os-derwentwater",markers:[{id:"P",label:"Position P",point}]});
const squareChoice=(point,v,prompt)=>c(prompt,gridReference(point),`${Math.floor(point[1])}${Math.floor(point[0])}`,gridReference([Math.floor(point[0])+1.3,Math.floor(point[1])+1.3]),v,[v.image?"os":"example"],"Along first, then up. Find the lower-left corner lines.");
const locate=(point,i)=>{
 const points=[GRID_POINTS[(i+1)%GRID_POINTS.length],GRID_POINTS[(i+2)%GRID_POINTS.length]];
 points.splice(i%3,0,point);
 const markers=points.map((point,j)=>({id:"ABC"[j],label:`Marker ${"ABC"[j]}`,point}));
 const alt=markers.map(m=>`${m.id} is inside eastings ${Math.floor(m.point[0])}–${Math.floor(m.point[0])+1} and northings ${Math.floor(m.point[1])}–${Math.floor(m.point[1])+1}.`).join(" ");
 const v={...practice(point),title:"Find a square from its reference",markers,alt:`North is up. ${alt}`};
 const answer=`Marker ${"ABC"[i%3]}`;
 return c(`Practice grid ${i+1}: which marker is in square ${gridReference(point)}?`,answer,...markers.map(m=>m.label).filter(label=>label!==answer),v,["example"],"Find the easting pair, then the northing pair.");
};
export const fourFigureGridReferences=topic([
 lesson(["A grid reference helps locate a square.","Read eastings first, then northings.","Map keys explain symbols.","This key is from the real OS product."],key,[
 c("What does OS stand for?","Ordnance Survey","Ocean Seasons","Outdoor Spelling",key,["os"]),
 c("What does a map key explain?","Map symbols","Only tomorrow's weather","Only country populations",key,["os"]),
 c("Which feature does the green patch represent?","Woods","A lake","A building area",key,["os"]),
 c("Which feature does the grey area represent?","Buildings","Woods","Open sea",key,["os"]),
 c("Which numbered lines are read first?","Eastings","Northings","Both in any order",practice(GRID_POINTS[0]),["os"]),
 c("Which corner lines identify a square?","Lower-left","Upper-right","Centre point only",practice(GRID_POINTS[0]),["os"]),
 c("What does a four-figure reference identify?","One square","One exact point","Every place on Earth",practice(GRID_POINTS[0]),["os"]),
 ]),
 lesson(["The question gives a four-figure reference.","Use eastings first, then northings, to find the square.","Choose the marker inside that square."],locate(GRID_POINTS[0],0).visual,GRID_POINTS.map(locate)),
 lesson(["This is a genuinely licensed OS map extract.","Use its actual key and the added numbered grid.","Four figures identify a square within the NY grid area."],os(OS_POINTS[0]),[
 ...OS_POINTS.slice(0,4).map((p,i)=>squareChoice(p,os(p),`OS extract ${i+1}: which square contains marker P?`)),
 c("Which feature lies in the blue area around P?","Lake water","Woodland","Building area",os(OS_POINTS[0]),["os"],"Compare the blue area with the actual water key."),
 c("Which feature is north of Derwentwater on this extract?","Keswick","Only open sea","The Equator",os(OS_POINTS[2]),["os"]),
 c("Which key feature matches the green patches on this extract?","Woods","Lakes","Grey building areas",os(OS_POINTS[4]),["os"],"Match the patch with the actual land key."),
 ]),
 lesson(["Locate interior markers using the lower-left square lines.","Avoid swapping eastings and northings.","An interior marker gives one unambiguous square."],practice(GRID_POINTS[1]),GRID_POINTS.map((p,i)=>squareChoice(p,practice(p),`Marker ${i+1}: choose its four-figure square reference.`))),
]);
