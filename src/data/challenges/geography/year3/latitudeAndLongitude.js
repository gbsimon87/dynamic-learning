import { c, lesson, record, sort, topic, visual } from "./authoring.js";
const words=record(["Latitude describes position north or south of the Equator.","Longitude describes position east or west of the Prime Meridian.","The Equator is 0° latitude.","The Greenwich Meridian is 0° longitude.","These globe coordinates differ from OS eastings and northings."]);
export const COORDINATES=[[20,20],[-20,20],[20,-20],[-20,-20],[40,20],[20,40],[-40,-20]];
const grid=(point)=>visual("coordinates","Read point P on a globe grid",`P lies on the ${Math.abs(point[1])}° ${point[1]>0?"north":"south"} latitude line and ${Math.abs(point[0])}° ${point[0]>0?"east":"west"} longitude line. Latitude is north/south; longitude is east/west.`,["Latitude labels run up the side. Longitude labels run along the bottom.","The bold zero lines represent Equator and Prime Meridian."],{point});
const name=(n,plus,minus)=>`${Math.abs(n)}° ${n>0?plus:minus}`;
export const latitudeAndLongitude=topic([
 lesson(["Latitude describes north or south of the Equator.","Longitude describes east or west of the Prime Meridian.","Their zero lines are different."],words,[
 c("What does latitude describe?","North or south position","East or west position","Distance along a road",words,["coordinates"]),
 c("What does longitude describe?","East or west position","North or south position","A mountain's height",words,["coordinates"]),
 c("Which line is zero latitude?","Equator","Greenwich Meridian","Arctic Circle",words,["coordinates"]),
 c("Which line is zero longitude?","Greenwich Meridian","Equator","Tropic of Cancer",words,["coordinates"]),
 c("From which line do we measure north or south?","Equator","Prime Meridian","National boundary",words,["coordinates"]),
 c("From which line do we measure east or west?","Prime Meridian","Equator","County boundary",words,["coordinates"]),
 sort("Sort the coordinate directions.",["Latitude","Longitude"],[["North",0],["South",0],["East",1],["West",1]],words,["coordinates"]),
 ]),
 lesson(["This is a practice globe grid.","Read north or south from the side.","Read east or west along the bottom."],grid(COORDINATES[0]),COORDINATES.map((p,i)=>c(`Grid ${i+1}: what is point P's latitude?`,name(p[1],"north","south"),name(-p[1],"north","south"),name(p[0],"east","west"),grid(p),["coordinates"],"Read the north or south label at the side."))),
 lesson(["The two coordinates describe different directions.","Keep north and south with latitude.","Keep east and west with longitude."],grid(COORDINATES[1]),COORDINATES.map((p,i)=>c(`Grid ${i+1}: what is point P's longitude?`,name(p[0],"east","west"),name(-p[0],"east","west"),name(p[1],"north","south"),grid(p),["coordinates"],"Read the east or west label along the bottom."))),
 lesson(["A pair of coordinates locates a point.","Give latitude first, then longitude in this lesson.","Check both the numbers and directions."],grid(COORDINATES[2]),COORDINATES.map((p,i)=>c(`Grid ${i+1}: which coordinate pair locates P?`,`${name(p[1],"north","south")}, ${name(p[0],"east","west")}`,`${name(-p[1],"north","south")}, ${name(p[0],"east","west")}`,`${name(p[1],"north","south")}, ${name(-p[0],"east","west")}`,grid(p),["coordinates"],"Find where the two labelled lines meet."))),
]);
