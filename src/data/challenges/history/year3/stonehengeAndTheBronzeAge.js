import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const stonehengeAndTheBronzeAge = year3Topic([
 "https://www.english-heritage.org.uk/visit/places/stonehenge/history-and-stories/",
 "https://www.english-heritage.org.uk/visit/places/stonehenge/history-and-stories/building-stonehenge/",
 "https://commons.wikimedia.org/wiki/File:Stonehenge_(213671879).jpeg",
], [
 lesson("🪨", "a stone representing Stonehenge", [
  ["Stonehenge is a prehistoric monument in Wiltshire.","Where is Stonehenge?","Wiltshire","Orkney","Rome"],
  ["Work began about 5,000 years ago, in the Stone Age.","When did work begin?","about 5,000 years ago","in AD 43","in 1922"],
  ["People built it in stages over many years.","How was it built?","in stages","all in one day","by one person"],
  ["Some stones travelled from Wales.","Where did some stones come from?","Wales","Rome","Egypt"],
  ["Its layout connects with the sun at solstices.","What connects with its layout?","the sun at solstices","Roman roads","the Nile's flood"],
  ["Bronze is a metal made by mixing copper and tin.","What makes bronze?","copper and tin","stone and wood","iron and clay"],
 ], sort("Stonehenge or bronze making?", ["Stonehenge","Bronze making"], [["stones from Wales",0],["mixing copper and tin",1],["solstice sunlight",0]], ["stones travelled from Wales", "mixing copper and tin", "sun at solstices"])),
 lesson("🕰️", "a clock for time", [
  ["Stonehenge began in the later Stone Age.","Which age saw its beginnings?","Stone Age","Iron Age","Roman Britain"],
  ["The stone circle was raised before the British Bronze Age.","Did the stone circle begin in the Iron Age?","no, before the Bronze Age","yes, after Roman Britain","yes, after iron tools"],
  ["People used the site into the Bronze Age.","When did people continue using the site?","Bronze Age","only today","only Roman times"],
  ["The Iron Age followed the Bronze Age.","Which age came next?","Iron Age","Stone Age","Roman Britain"],
  ["Roman Britain came later; today comes last.","What comes last on this timeline?","Today","Iron Age","Roman Britain"],
  ["A monument can stay important across several periods.","Must a monument belong to just one period?","no, several periods","yes, always one day","yes, only its first year"],
 ], order("Order the periods connected to Stonehenge.", ["Stone Age","Bronze Age","Iron Age","Roman Britain","Today"], ["began in the later Stone Age", "into the Bronze Age", "Iron Age followed", "Roman Britain came later; today comes last"]), ["Stone Age","Bronze Age","Iron Age","Roman Britain","Today"]),
 source("stonehenge-stones", ["This modern photo shows Stonehenge's surviving stones.","Some stand upright; others lie across their tops.","The stones show careful building skills.","Missing and fallen stones remind us the monument changed.","A photo cannot prove exactly which ceremonies took place here."], [
  ["Which monument is pictured?","Stonehenge","Skara Brae","Hadrian's Wall","Stonehenge's surviving stones"],
  ["How are some stones arranged?","upright with stones across their tops","only flat in rows","all lying underground","stand upright; others lie across their tops"],
  ["Which skill does the arrangement suggest?","careful building","papyrus making","coin making","careful building skills"],
  ["Does the photo show Stonehenge's builders at work?","no, it is modern","yes, during the Stone Age","yes, during one ceremony","modern photo"],
  ["What suggests the monument changed?","missing and fallen stones","a written diary","a Roman soldier","Missing and fallen stones"],
  ["Which claim needs more evidence?","exactly which ceremonies happened","stones stand upright","some stones lie across tops","cannot prove exactly which ceremonies"],
  ["What kind of evidence is this?","a modern photo of ancient remains","an ancient photograph","a builder's written plan","modern photo shows Stonehenge's surviving stones"],
 ]),
 lesson("🧩", "a puzzle for explaining a monument", [
  ["Moving large stones needed people working together.","What did moving stones require?","people working together","one person alone","Roman machinery"],
  ["Stones from Wales show connections between distant places.","What do travelled stones suggest?","links between distant places","everyone stayed in one village","all stones were local"],
  ["The solstice alignment suggests the sun mattered to builders.","What might the alignment suggest?","the sun mattered","the Nile mattered","Roman coins mattered"],
  ["We cannot be certain of every ceremony held there.","Which claim needs more evidence?","every ceremony's exact details","that large stones were moved","that some stones came from Wales"],
  ["Bronze tools were new, but stone tools continued.","What continued in the Bronze Age?","stone tools","only bronze tools","Roman roads"],
  ["New finds can improve our explanations.","What could change an explanation?","new finds","ignoring evidence","repeating a guess"],
 ], sort("Supported or uncertain?", ["Supported","Uncertain"], [["large stones needed teamwork",0],["links with Wales",0],["every ceremony's exact details",1]], ["people working together", "Stones from Wales", "cannot be certain of every ceremony"])),
]);
