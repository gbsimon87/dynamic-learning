import { c, lesson, topic, visual } from "./authoring.js";
import { DIRECTIONS, STEPS } from "../geometry.js";
export const COMPASS_NAMES=["N","NE","E","SE","S","SW","W","NW"];
const rose=visual("compass","Eight compass points","North is up. Clockwise from north: N north; NE north-east; E east; SE south-east; S south; SW south-west; W west; NW north-west.",["Use the shown north arrow before reading any direction.","Diagonal directions lie between the four main points."]);
const directionMap=(i)=>{
 const start=[2,2], target=STEPS[i].map((n,j)=>n+start[j]);
 return visual("plan","Practice map — north is up",`Start is at column 2, row 2. Tree is at column ${target[0]}, row ${target[1]}. Columns increase eastwards; rows increase northwards. North is up.`,["Read the tree's position relative to Start, using the north arrow."],{origin:[0,0],size:4,markers:[{id:"S",label:"Start",point:start},{id:"T",label:"Tree",point:target}]});
};
export const ROUTES=[[0,2],[1,4],[2,0],[3,6],[4,2],[5,0],[6,4]];
const routeMap=(steps)=>{
 const route=[[2,2]];for(const i of steps)route.push(route.at(-1).map((n,j)=>n+STEPS[i][j]));
 const last=route.at(-1), i=ROUTES.indexOf(steps)%3;
 const points=[[.5,.5],[3.5,.5]];points.splice(i,0,last);
 const markers=points.map((point,j)=>({id:"ABC"[j],label:`Place ${"ABC"[j]}`,point}));
 return visual("plan","Follow the mapped journey",`North is up. Journey starts at S, column 2, row 2. Step 1 goes ${DIRECTIONS[steps[0]]}. Step 2 goes ${DIRECTIONS[steps[1]]}. ${markers.map(m=>`${m.id} is at column ${m.point[0]}, row ${m.point[1]}.`).join(" ")}`,["Start at S. Follow the numbered line segments in order."],{origin:[0,0],size:4,route,markers:[{id:"S",label:"Start",point:[2,2]},...markers]});
};
export const eightCompassPoints=topic([
 lesson(["North, east, south and west are four main points.","North-east, south-east, south-west and north-west lie between them.","Use the north arrow."],rose,DIRECTIONS.map((name,i)=>c(`Which name matches ${COMPASS_NAMES[i]}?`,name,DIRECTIONS[(i+2)%8],DIRECTIONS[(i+4)%8],rose,["os"],"Read the point between its neighbouring directions."))),
 lesson(["Describe one feature relative to another.","Start at the named place.","This practice map has north pointing up."],directionMap(0),DIRECTIONS.map((name,i)=>c(`Map ${i+1}: which direction is Tree from Start?`,name,DIRECTIONS[(i+2)%8],DIRECTIONS[(i+4)%8],directionMap(i),["example"],"Start at S. Compare the tree's position with the north arrow."))),
 lesson(["Follow a route one step at a time.","A diagonal step changes both horizontal and vertical position.","Begin at S and use the north arrow."],routeMap(ROUTES[0]),ROUTES.map((steps,i)=>{const answer=`Place ${"ABC"[i%3]}`;return c(`Journey ${i+1}: which place ends the shown two-step route?`,answer,...["Place A","Place B","Place C"].filter(p=>p!==answer),routeMap(steps),["example"],"Trace from S along step 1, then step 2.");})),
 lesson(["Match a journey to a description.","The numbered line segments show the order.","Directions are read from the north arrow."],routeMap(ROUTES[1]),ROUTES.map((steps,i)=>c(`Journey ${i+1}: which description matches the numbered route?`,`${DIRECTIONS[steps[0]]}, then ${DIRECTIONS[steps[1]]}`,`${DIRECTIONS[steps[1]]}, then ${DIRECTIONS[steps[0]]}`,`${DIRECTIONS[(steps[0]+4)%8]}, then ${DIRECTIONS[steps[1]]}`,routeMap(steps),["example"],"Read the first segment before the second."))),
]);
