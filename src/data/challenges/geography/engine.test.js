import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { booleanPointInPolygon, point } from "@turf/turf";
import { YEAR3_GEOGRAPHY_TOPICS, YEAR3_GEOGRAPHY_BUILDERS } from "./year3/index.js";
import { GEOGRAPHY_SOURCES } from "./sources.js";
import { buildGeographyTopic, GEOGRAPHY_TITLES, lintGeographyTopic } from "./engine.js";
import { gridReference, isGridInterior, project, directionBetween, DIRECTIONS, STEPS } from "./geometry.js";
import { lintBuild, isCorrect, isReady, seededRng } from "../questionKinds.js";
import { GRID_POINTS, OS_POINTS } from "./year3/fourFigureGridReferences.js";
import { CLIMATE } from "./year3/climate.js";
import { geographyQuestionSpeech } from "./speech.js";

const manifest=JSON.parse(readFileSync(new URL("../../../assets/geography/manifest.json",import.meta.url)));
const maps=JSON.parse(readFileSync(new URL("../../../assets/geography/maps.json",import.meta.url)));
const response=q=>q.kind==="sort"?Object.fromEntries(q.cards.map(c=>[c.id,c.bin])):q.kind==="order"?q.answer.map(id=>q.items.find(i=>i.id===id)):q.answer;

test("geography narration reads reference digits and compass names without renaming map markers",()=>{
  assert.match(geographyQuestionSpeech({prompt:"Choose a reference.",visual:{type:"grid"},options:[2341,4123,2442]}),/2, 3, 4, 1/);
  assert.match(geographyQuestionSpeech({prompt:"Which name matches NE?",visual:{type:"compass"},options:["north-east","east","south-west"]}),/matches north-east/);
  assert.match(geographyQuestionSpeech({prompt:"Start at S.",visual:{type:"plan"},options:["Place A","Place B","Place C"]}),/Start at S/);
});

test("authoring validation reports malformed content instead of throwing or accepting inherited identifiers",()=>{
  for (const bad of [null, {}, {lessons:{}}, {lessons:[null, {notes:{lines:42},bank:[null,{visual:{lines:42}}]}]}]) {
    assert.ok(lintGeographyTopic(bad,GEOGRAPHY_SOURCES,manifest.images).length);
  }
  const topic=structuredClone(YEAR3_GEOGRAPHY_TOPICS["the-lake-district"]);
  const q=topic.lessons[0].bank[0];
  q.sources=["constructor"];q.visual.image="__proto__";q.kind="unrecognised";
  const errors=lintGeographyTopic(topic,GEOGRAPHY_SOURCES,manifest.images).join("\n");
  assert.match(errors,/unknown source constructor/);
  assert.match(errors,/unknown image __proto__/);
  assert.match(errors,/unknown question kind/);
  q.kind="choice";q.visual={type:"grid",title:"Bad grid",alt:"Description",lines:[],origin:[NaN,0],size:Infinity};
  assert.match(lintGeographyTopic(topic,GEOGRAPHY_SOURCES,manifest.images).join("\n"),/invalid grid dimensions/);
  q.visual={type:"map",title:"Bad map",alt:"Description",lines:[],view:"constructor",markers:{},maps:{}};
  q.kind="chart";q.options={};q.chart={};
  const malformed=lintGeographyTopic(topic,GEOGRAPHY_SOURCES,manifest.images).join("\n");
  assert.match(malformed,/unknown map view/);
  assert.match(malformed,/markers must be an array/);
  assert.match(malformed,/chart needs three choices/);
});

test("builders reject invalid levels, missing rounds and unsupported question kinds",()=>{
  const topic=YEAR3_GEOGRAPHY_TOPICS["the-lake-district"],build=buildGeographyTopic(topic);
  for(const level of [0,5,1.5,"1",NaN]) assert.throws(()=>build(level,()=>.5),RangeError);
  assert.throws(()=>buildGeographyTopic({lessons:[{bank:[]}]})(1,()=>.5),/five question templates/);
  const invalid=structuredClone(topic);
  for(const q of invalid.lessons[0].bank) q.kind="bad";
  assert.throws(()=>buildGeographyTopic(invalid)(1,()=>.5),/Unknown geography question kind/);
});

for (const [id,topic] of Object.entries(YEAR3_GEOGRAPHY_TOPICS)) test(`${id}: sourced, supported, age-appropriate banks and varied five-round runs`,()=>{
  assert.deepEqual(lintGeographyTopic(topic,GEOGRAPHY_SOURCES,manifest.images),[]);
  const build=YEAR3_GEOGRAPHY_BUILDERS[id];
  assert.deepEqual(lintBuild((l,r)=>build(l,r).questions,{titles:GEOGRAPHY_TITLES,year:3,seeds:60,minQuestions:5}),[]);
  for (let level=1;level<=4;level++) {
    const signatures=new Set();
    for (let seed=1;seed<=60;seed++) {
      const run=build(level,seededRng(seed));
      assert.equal(run.questions.length,5);
      assert.equal(new Set(run.questions.map(q=>q.prompt)).size,5);
      signatures.add(run.questions.map(q=>q.prompt).join("|"));
      for(const q of run.questions) { assert.ok(isReady(q,response(q)));assert.ok(isCorrect(q,response(q))); }
    }
    assert.ok(signatures.size>20,`slot ${level}: poor replay variation`);
  }
});

test("map geometry uses east-right, north-up; markers stay inside their view",()=>{
  assert.deepEqual(project([0,0],[-10,-10,10,10]),[240,160]);
  assert.ok(project([0,5],[-10,-10,10,10])[1]<160);
  assert.ok(project([5,0],[-10,-10,10,10])[0]>240);
  for (const t of Object.values(YEAR3_GEOGRAPHY_TOPICS)) for (const lesson of t.lessons) for (const q of lesson.bank) {
    const visuals=[q.visual,...(q.visual.maps??[])];
    for (const v of visuals.filter(v=>v.type==="map")) for (const m of v.markers) {
      const [x,y]=project(m.point,maps[v.view].extent);
      assert.ok(x>=0&&x<=480&&y>=0&&y<=320,`${m.label} outside ${v.view}`);
    }
  }
  const park=maps.lake.features.find(f=>f.name==="Lake District National Park").geometry;
  assert.equal(booleanPointInPolygon(point([-2.75,54.33]),park),false,"Kendal is outside the park");
  assert.equal(booleanPointInPolygon(point([-3.13,54.60]),park),true,"Keswick is inside the park");
  const camp=maps.campania.features.find(f=>f.name==="Campania").geometry;
  for (const p of [[14.27,40.85],[14.43,40.82]]) assert.equal(booleanPointInPolygon(point(p),camp),true);
});

test("four figures name lower-left square lines, eastings first, with no boundary markers",()=>{
  assert.equal(gridReference([23.4,41.6]),"2341");
  assert.equal(gridReference([25.6,21.5]),"2521");
  assert.equal(isGridInterior([23,41.5]),false);
  for(const p of [...GRID_POINTS,...OS_POINTS]) assert.ok(isGridInterior(p));
  const t=YEAR3_GEOGRAPHY_TOPICS["four-figure-grid-references"];
  for(const lesson of t.lessons) for(const q of lesson.bank.filter(q=>/^\d{4}$/.test(q.answer))) assert.equal(q.answer,gridReference(q.visual.markers[0].point));
  for(const q of t.lessons[1].bank) {
    const ref=q.prompt.match(/square (\d{4})/)[1];
    const marker=q.visual.markers.find(m=>m.label===q.answer);
    assert.equal(gridReference(marker.point),ref);
    assert.equal(q.visual.markers.filter(m=>gridReference(m.point)===ref).length,1);
  }
});

test("invalid grid coordinates never become plausible references or interior markers",()=>{
  for(const point of [null,[],[1],[NaN,1.2],[Infinity,1.2],[1.2,-.2],[100.2,1.2],["23.4",41.6]]) {
    assert.equal(isGridInterior(point),false);
    assert.throws(()=>gridReference(point),RangeError);
  }
  assert.equal(gridReference([0,99.9]),"0099");
});

test("compass answers follow geometry and route labels vary",()=>{
  for (const [i,step] of STEPS.entries()) assert.equal(directionBetween([0,0],step),DIRECTIONS[i]);
  const t=YEAR3_GEOGRAPHY_TOPICS["eight-compass-points"];
  for(const q of t.lessons[1].bank) assert.equal(q.answer,directionBetween(q.visual.markers[0].point,q.visual.markers[1].point));
  for(const q of t.lessons[2].bank) {
    const last=q.visual.route.at(-1),marker=q.visual.markers.find(m=>m.point.every((n,i)=>n===last[i]));
    assert.equal(q.answer,marker.label);
  }
  assert.equal(new Set(t.lessons[2].bank.map(q=>q.answer)).size,3);
});

test("every water ordering names its start and does not invent a unique cycle start",()=>{
  const t=YEAR3_GEOGRAPHY_TOPICS["the-water-cycle"];
  for(const q of t.lessons[2].bank) {
    assert.match(q.prompt,/starting with/);
    assert.ok(q.visual.alt.includes(q.labels[0])||q.visual.alt.toLowerCase().includes(q.labels[0].toLowerCase()));
  }
  assert.ok(t.lessons[2].notes.lines.includes("A cycle has no single starting point."));
});

test("bundled assets carry licence, provenance, reviewed equivalents and matching checksums",()=>{
  for(const asset of Object.values(manifest.images)) {
    for(const key of ["title","place","creator","sourceUrl","licenceUrl","date","retrieved","alt"]) assert.ok(asset[key],key);
    const bytes=readFileSync(new URL(`../../../assets/geography/${asset.file}`,import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"),asset.sha256);
  }
});

test("climate summaries rederive from matched 30-year monthly model records",()=>{
  for(const place of ["lake","naples"]) {
    const raw=JSON.parse(readFileSync(new URL(`../../../assets/geography/records/${place}-power-1991-2020.json`,import.meta.url)));
    for(const month of [1,7]) {
      const entries=(name)=>Object.entries(raw.properties.parameter[name]).filter(([key])=>key.endsWith(String(month).padStart(2,"0")));
      const temps=entries("T2M"),rains=entries("PRECTOTCORR");
      assert.equal(temps.length,30);assert.equal(rains.length,30);
      assert.equal(CLIMATE[place][month].temperatureC,Math.round(temps.reduce((n,[,v])=>n+v,0)/30));
      const total=rains.reduce((n,[key,v])=>n+v*new Date(Number(key.slice(0,4)),month,0).getDate(),0);
      assert.equal(CLIMATE[place][month].rainfallMm,Math.round(total/30));
    }
  }
});
