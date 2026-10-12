import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const juliusCaesarTriesToInvade = year3Topic([
 "https://www.english-heritage.org.uk/learn/story-of-england/romans/invasion",
 "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-rome/timeline-roman-britain",
 "https://www.clevelandart.org/art/1969.146",
], [
 lesson("🚢", "a ship representing a sea crossing", [
  ["Julius Caesar was a Roman general.","Who was Julius Caesar?","a Roman general","a British queen","an Egyptian scribe"],
  ["He crossed from Gaul to Britain with soldiers.","Where did his soldiers travel?","from Gaul to Britain","from Britain to Egypt","from Orkney to Rome"],
  ["They came by ship across the sea.","How did they cross?","by ship","by road across land","by walking along a wall"],
  ["Caesar came in 55 BC and again in 54 BC.","How many expeditions are named?","two","one","three"],
  ["British groups resisted his soldiers.","How did some Britons respond?","they resisted","they all welcomed him","they all left Britain"],
  ["He left without making Britain a Roman province.","Did Caesar establish Roman Britain?","no","yes, all Britain became Roman","yes, forever"],
 ], sort("Caesar's expedition or not in this story?", ["Expedition","Not in this story"], [["Roman soldiers arriving by ship",0],["British resistance",0],["Britain becoming a Roman province",1]], ["came by ship", "resisted", "without making Britain a Roman province"])),
 lesson("🕰️", "a clock for time", [
  ["Caesar first crossed to Britain in 55 BC.","Which label marks the first expedition?","55 BC","54 BC","AD 43"],
  ["His second expedition came in 54 BC.","Which label marks his return?","54 BC","55 BC","AD 122"],
  ["The first expedition came before the second.","What comes first in this story?","first expedition","second expedition","Claudius's invasion"],
  ["Claudius's invasion came much later, in AD 43.","Whose invasion came much later?","Claudius's","Caesar's first","Caesar's second"],
  ["BC labels years before year 1.","What does BC describe?","before year 1","after year 1","only Roman rulers"],
  ["AD labels years from year 1 onwards.","What does AD describe?","year 1 onwards","before year 1","only prehistoric tools"],
 ], order("Order these three visits to Britain.", ["Caesar's first · 55 BC","Caesar's second · 54 BC","Claudius's invasion · AD 43"], ["first crossed", "second expedition", "much later"]), ["First · 55 BC","Second · 54 BC","Invasion · AD 43"]),
 source("cma-verica-coin", ["This British coin belongs to Verica's time, after Caesar's visits.","A horse and rider appear beside letters.","British leaders made coins before Claudius's conquest.","This coin is not Caesar's account of his expeditions.","We need written accounts and finds to investigate those visits."], [
  ["Whose time does this coin belong to?","Verica's","Tutankhamun's","Boudica's later revolt","Verica's time"],
  ["What image can you see?","a horse and rider","a ship crossing","a pyramid","horse and rider"],
  ["Is this coin from before or after Caesar's visits?","after","before","the same first expedition","after Caesar's visits"],
  ["What did British leaders make before conquest?","coins","Roman baths everywhere","printed books","made coins before"],
  ["Is this Caesar's written account?","no","yes, his diary","yes, his expedition map","not Caesar's account"],
  ["Which evidence helps investigate the expeditions?","written accounts and finds","only this later coin","only modern guesses","written accounts and finds"],
  ["What visible feature shows more than decoration?","letters","a modern photograph","a sea crossing","beside letters"],
 ]),
 lesson("🧩", "a puzzle for comparing invasions", [
  ["Caesar wanted power and knowledge of Britain.","What did Caesar seek?","power and knowledge","a quiet holiday","to become a British farmer"],
  ["British resistance made the expeditions harder.","What made the expeditions harder?","British resistance","everyone welcoming him","an empty island"],
  ["Crossing the sea meant moving soldiers and supplies by ship.","What did a sea crossing require?","ships for soldiers and supplies","only land roads","a stone wall"],
  ["Caesar's two visits did not create a permanent Roman province.","What did his visits not create?","a permanent Roman province","contact with Britain","knowledge of Britain"],
  ["Later, Claudius's invasion began lasting Roman rule.","What was different about Claudius's invasion?","lasting Roman rule began","Caesar returned again","all Britons disappeared"],
  ["Caesar's own account presents his side of the story.","Why compare his account with other evidence?","it presents his side","it includes every Briton's voice","it is a modern recording"],
 ], sort("Caesar's visits or Claudius's invasion?", ["Caesar's visits","Claudius's invasion"], [["did not create a permanent province",0],["began lasting Roman rule",1],["two expeditions",0]], ["Caesar's two visits", "Claudius's invasion"])),
]);
