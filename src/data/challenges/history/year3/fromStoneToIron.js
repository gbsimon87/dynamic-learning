import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const fromStoneToIron = year3Topic([
 "https://historicengland.org.uk/education/schools-resources/teaching-activities/timeline-stone-age-to-iron-age/",
 "https://www.english-heritage.org.uk/siteassets/home/members-area/kids/kids-rule---prehistoric-england/kidsrule_prehistory.pdf",
 "https://www.clevelandart.org/art/1988.2",
], [
 lesson("📈", "a rising line representing change", [
  ["Stone Age people shaped stone tools.","Which material names the earliest age here?","stone","bronze","iron"],
  ["Later, bronze tools joined stone tools.","Which tools joined stone tools?","bronze tools","printed books","Roman coins"],
  ["Iron tools became important in the Iron Age.","When did iron tools become important?","Iron Age","early Stone Age","only today"],
  ["Farming began in Britain's later Stone Age.","When did farming begin in Britain?","later Stone Age","after the Iron Age","after Roman Britain"],
  ["People still needed food, shelter and clothing throughout.","What stayed necessary?","food, shelter and clothing","Roman baths","iron coins"],
  ["New materials did not replace old ones all at once.","Did new materials replace old ones immediately?","no, change took time","yes, in one day","yes, everywhere together"],
 ], sort("Tool material or continuing need?", ["Tool material","Continuing need"], [["bronze",0],["iron",0],["shelter",1]], ["bronze tools", "Iron tools", "needed food, shelter"])),
 lesson("🕰️", "a clock for time", [
  ["The Stone Age came first in this sequence.","Which age came first?","Stone Age","Iron Age","Bronze Age"],
  ["The Bronze Age came next, followed by the Iron Age.","Which age came between Stone and Iron?","Bronze Age","Roman Britain","Today"],
  ["Roman Britain followed the Iron Age.","Which period followed the Iron Age?","Roman Britain","Stone Age","Bronze Age"],
  ["Today comes last on our timeline.","Which band comes last?","Today","Iron Age","Roman Britain"],
  ["These named bands do not show equal lengths of time.","Do the bands represent equal durations?","no","yes, one year each","yes, one century each"],
  ["Prehistory in Britain ended as written records became available.","What helps mark the end of prehistory?","written records","all farming ending","stone disappearing"],
 ], order("Order the periods, oldest first.", ["Stone Age","Bronze Age","Iron Age","Roman Britain","Today"], ["Stone Age came first", "Bronze Age came next", "Roman Britain followed the Iron Age", "Today comes last"]), ["Stone Age","Bronze Age","Iron Age","Roman Britain","Today"]),
 source("cma-bronze-axe", ["This bronze axe head is from the Caucasus, outside Britain.","Its metal surface has an animal design and fine lines.","Compare it with a chipped stone tool.","Different materials needed different making skills.","This photo alone cannot tell us when every community changed its tools."], [
  ["What material is this axe head?","bronze","flint","iron","bronze axe head"],
  ["Is it a British find?","no, from the Caucasus","yes, from Dorset","yes, from Orkney","outside Britain"],
  ["What decoration is shown?","an animal design","a Roman name","a pyramid","animal design"],
  ["What could you compare it with?","a chipped stone tool","only a modern clock","only a Roman bath","Compare it with a chipped stone tool"],
  ["What did different materials require?","different making skills","exactly the same skills","no craft skills","different making skills"],
  ["What cannot this photo date?","every community's change of tools","the museum's stated object date","the pictured object's decoration","when every community changed"],
  ["Which visible detail suggests careful decoration?","fine lines","the photo background","the missing handle","fine lines"],
 ]),
 lesson("🧩", "a puzzle for change and continuity", [
  ["Change means something became different.","What does change mean?","something became different","everything stayed the same","we know no evidence"],
  ["Continuity means something carried on.","What does continuity mean?","something carried on","everything ended","something began for the first time"],
  ["Farming continued from the later Stone Age into the Iron Age.","Which activity continued?","farming","only hunting for all food","Roman bathing"],
  ["New metal tools were a change in technology.","Which example shows technological change?","new metal tools","still needing food","still needing shelter"],
  ["Trade helped materials and ideas travel.","What helped ideas travel?","trade","everyone staying apart","burying every tool"],
  ["Evidence helps explain changes without assuming everyone lived alike.","Why use evidence?","to investigate different lives","to assume all lives were alike","to guess without clues"],
 ], sort("Change or continuity?", ["Change","Continuity"], [["new metal tools",0],["farming carrying on",1],["something becoming different",0]], ["Change means", "Continuity means", "Farming continued", "New metal tools"])),
]);
