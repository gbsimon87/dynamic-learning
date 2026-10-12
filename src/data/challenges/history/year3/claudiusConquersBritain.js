import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const claudiusConquersBritain = year3Topic([
 "https://www.english-heritage.org.uk/learn/story-of-england/romans/invasion",
 "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-rome/timeline-roman-britain",
 "https://www.clevelandart.org/art/1969.158.a",
], [
 lesson("🏛️", "a classical building representing Roman rule", [
  ["Claudius was a Roman emperor.","Who was Claudius?","a Roman emperor","a British queen","a Stone Age hunter"],
  ["He ordered the invasion of Britain in AD 43.","Which year marks the invasion?","AD 43","55 BC","1922"],
  ["His army crossed the sea by ship.","How did the army reach Britain?","by ship","by road across the sea","along Hadrian's Wall"],
  ["The Romans fought British groups and won territory.","What did the army gain?","territory","only trading invitations","all Britain without fighting"],
  ["Part of Britain became a Roman province called Britannia.","What was the province called?","Britannia","Gaul","Egypt"],
  ["Conquest continued for years; not all Britain became Roman.","Was all Britain conquered at once?","no","yes, in one day","yes, before Caesar's visits"],
 ], sort("Roman leader or Roman province?", ["Leader","Province"], [["Claudius",0],["Britannia",1],["the emperor",0]], ["Claudius was a Roman emperor", "province called Britannia"])),
 lesson("🕰️", "a clock for time", [
  ["First came Caesar's expeditions, in 55 and 54 BC.","Whose expeditions came first?","Caesar's","Claudius's","Hadrian's"],
  ["Claudius ordered an invasion in AD 43.","What followed Caesar's earlier visits?","Claudius's invasion","the early Stone Age","today"],
  ["Boudica's revolt came later, about AD 60–61.","Which event followed the invasion?","Boudica's revolt","Caesar's first visit","the first stone tools"],
  ["Hadrian's Wall began later still, in AD 122.","Which event came after the revolt?","Hadrian's Wall began","Caesar returned","Claudius ordered invasion"],
  ["Conquest spread over many years.","How quickly did conquest spread?","over many years","in one day everywhere","before any soldiers arrived"],
  ["AD means years from year 1 onwards.","What does AD mean here?","year 1 onwards","before year 1","only prehistoric years"],
 ], order("Order these Roman events.", ["Caesar's visits","Claudius's invasion","Boudica's revolt","Hadrian's Wall begins"], ["First came Caesar", "invasion in AD 43", "revolt came later", "later still"]), ["Caesar's visits","Claudius's invasion","Boudica's revolt","Hadrian's Wall begins"]),
 source("cma-claudius-coin", ["This gold coin shows Claudius, with letters around his head.","It was made after the AD 43 invasion.","An emperor's image could remind people who ruled.","A coin presents an official image.","It cannot show whether conquered people welcomed Roman rule."], [
  ["Which emperor appears here?","Claudius","Hadrian","Caesar","shows Claudius"],
  ["What surrounds his head?","letters","a map of Britain","a ship","letters around his head"],
  ["When was this coin made compared with the invasion?","after","before","before Caesar's first visit","made after the AD 43 invasion"],
  ["What might the image remind people?","who ruled","every person's name","how a ship sailed","who ruled"],
  ["Whose view does an official coin present?","the ruler's official image","every conquered person's view","a modern photographer's view","official image"],
  ["What cannot it show?","whether people welcomed Roman rule","that Claudius was pictured","that it carried letters","cannot show whether conquered people welcomed"],
  ["Which material was used?","gold","iron","wood","gold coin"],
 ]),
 lesson("🧩", "a puzzle for considering conquest", [
  ["Claudius wanted victory to strengthen his power.","Why might victory matter to Claudius?","strengthening his power","ending the empire","becoming a farmer"],
  ["Britain offered resources such as metals.","What resources attracted Rome?","metals","printed books","modern machines"],
  ["Roman rule brought new towns, roads and taxes.","Which change followed Roman rule?","new roads and taxes","all farms vanished","Britain lost every town"],
  ["Some Britons cooperated; others resisted.","How did Britons respond?","in different ways","all welcomed Rome","all responded alike"],
  ["Conquest harmed people as well as changing buildings.","What else must we consider?","harm to people","only impressive buildings","only the emperor's success"],
  ["Britain's people did not all share one experience.","Can one story represent everyone?","no","yes, all lives were identical","yes, only soldiers lived there"],
 ], sort("Change to buildings or change to rule?", ["Buildings and travel","Rule"], [["new roads",0],["new towns",0],["Roman taxes",1]], ["new towns, roads and taxes"])),
]);
