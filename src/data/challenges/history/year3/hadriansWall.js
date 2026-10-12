import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const hadriansWall = year3Topic([
 "https://www.english-heritage.org.uk/visit/places/hadrians-wall/hadrians-wall-history-and-stories/history/",
 "https://www.english-heritage.org.uk/learn/teaching-resources/local-learning/-hadrians-wall/",
 "https://romanarmymuseum.com/story/a-diverse-fighting-force/",
 "https://www.livius.org/pictures/england/walltown-crags/hadrian-s-wall-at-walltown-crags/",
], [
 lesson("🧱", "bricks representing a wall", [
  ["Emperor Hadrian ordered a wall across northern Britain.","Who ordered the wall?","Hadrian","Caesar","Boudica"],
  ["Building began in AD 122.","When did building begin?","AD 122","55 BC","1922"],
  ["It marked a frontier, an edge of Roman control.","What is a frontier?","an edge of control","a town bath","a farm tool"],
  ["Forts housed soldiers; gates controlled crossings.","What did gates help control?","crossings","the Nile's flood","all farming"],
  ["Soldiers came from different parts of the empire.","Where did soldiers come from?","different parts of the empire","only Rome","only one British village"],
  ["The wall is not the modern England–Scotland border.","Is it the modern border?","no","yes, exactly","yes, everywhere along it"],
 ], sort("Wall feature or not a wall feature?", ["Wall feature","Other"], [["forts",0],["gates",0],["Egyptian pyramids",1]], ["Forts housed soldiers; gates controlled crossings"])),
 lesson("🕰️", "a clock for time", [
  ["Roman invasion came first, in AD 43.","Which event came first here?","Roman invasion","Hadrian's Wall began","Roman rule ended"],
  ["Boudica's revolt followed, about AD 60–61.","What followed the invasion?","Boudica's revolt","the first Stone Age tools","Roman rule ending"],
  ["The wall began in AD 122, after the revolt.","Did the wall begin before Boudica's revolt?","no, after","yes, before","on the same day"],
  ["Roman rule ended around AD 410.","What happened later still?","Roman rule ended","Caesar's first visit","the invasion began"],
  ["Parts of the wall survive today.","What can we investigate today?","surviving parts","every original wooden gate","recordings of Hadrian"],
  ["A ruin is what remains of an old building.","What is a ruin?","surviving remains","a new complete building","a written diary"],
 ], order("Order the wall's wider story.", ["Invasion · AD 43","Revolt · about AD 60–61","Wall begins · AD 122","Rule ends · about AD 410","Today"], ["invasion came first", "revolt followed", "wall began", "rule ended", "survive today"]), ["Invasion · AD 43","Revolt · about AD 60–61","Wall begins · AD 122","Rule ends · about AD 410","Today"]),
 source("hadrian-walltown", ["This modern photo shows Hadrian's Wall at Walltown Crags.","Rows of stone blocks follow the uneven ground.","A surviving wall helps us study its route and construction.","Parts have been repaired or rebuilt over time.","The photo cannot tell us every frontier soldier's story."], [
  ["Which wall is pictured?","Hadrian's Wall","a Skara Brae house","a Giza pyramid","Hadrian's Wall"],
  ["Where was this section photographed?","Walltown Crags","Rome","Egypt","at Walltown Crags"],
  ["Which material is visible?","stone blocks","wooden planks","papyrus sheets","stone blocks"],
  ["What does the wall follow?","uneven ground","a perfectly flat field","the Nile","follow the uneven ground"],
  ["What can the remains help us study?","route and construction","every soldier's thoughts","all ancient voices","route and construction"],
  ["Are all visible parts necessarily untouched Roman work?","no, parts were repaired","yes, none ever changed","yes, all stones are untouched","repaired or rebuilt"],
  ["What cannot this photo tell us?","every soldier's story","that stone blocks survive","that the ground is uneven","cannot tell us every frontier soldier's story"],
 ]),
 lesson("🧩", "a puzzle for understanding a frontier", [
  ["The wall helped control movement and defend the frontier.","Why build a frontier wall?","control movement and help defence","stop every trader forever","mark today's exact border"],
  ["Gates let people cross at controlled places.","Did the wall stop every crossing?","no, there were gates","yes, no openings","yes, nobody could pass"],
  ["Forts needed food and other supplies.","What did forts need?","food and supplies","only weapons","only stone"],
  ["Nearby communities traded with soldiers.","How could local people connect with soldiers?","through trade","only by fighting","by becoming emperors"],
  ["Life included work and trade, not just fighting.","What else happened on the frontier?","work and trade","only battles","only ceremonies"],
  ["Surviving stones and finds show different parts of frontier life.","Why compare buildings and small finds?","they show different parts of life","they always tell the same thing","one coin explains everything"],
 ], sort("Defence and control or everyday needs?", ["Defence and control","Everyday needs"], [["controlled gates",0],["food supplies",1],["trade with nearby communities",1]], ["control movement and defend", "food and other supplies", "communities traded"])),
]);
