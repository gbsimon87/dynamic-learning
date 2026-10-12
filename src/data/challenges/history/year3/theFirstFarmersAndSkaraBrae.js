import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const theFirstFarmersAndSkaraBrae = year3Topic([
 "https://www.historicenvironment.scot/visit/all/skara-brae/history-and-stories/",
 "https://blog.historicenvironment.scot/2026/01/the-story-of-skara-brae/",
 "https://commons.wikimedia.org/wiki/File:Skara_Brae_2000-7.jpg",
], [
 lesson("🏘️", "houses representing a village", [
  ["Skara Brae is a Stone Age village in Orkney, Scotland.","Where is Skara Brae?","Orkney, Scotland","Rome, Italy","Egypt"],
  ["People lived there about 5,000 years ago.","When did people live there?","about 5,000 years ago","in Roman times","in 1922"],
  ["Farmers grew barley and kept animals.","Which crop did they grow?","barley","potatoes","rice"],
  ["Villagers also hunted and fished.","What else helped provide food?","hunting and fishing","Roman shops","only crops"],
  ["Stone houses had hearths for fires.","What was a hearth for?","a fire","storing coins","growing barley"],
  ["Stone beds and cupboards survive inside the houses.","What survives inside?","stone furniture","televisions","wooden bookshelves"],
 ], sort("Food or house feature?", ["Food supply","House feature"], [["barley",0],["fishing",0],["stone beds",1]], ["grew barley", "hunted and fished", "Stone beds"])),
 lesson("🕰️", "a clock for time", [
  ["Early Stone Age groups hunted and gathered.","Which way of life came first?","hunting and gathering","Roman towns","Iron Age forts"],
  ["Farming reached Britain in the later Stone Age.","Which period brought farming to Britain?","later Stone Age","Roman Britain","today"],
  ["Skara Brae's farmers lived in that later Stone Age.","Which period includes Skara Brae?","later Stone Age","Iron Age","Roman Britain"],
  ["The Bronze Age followed, then the Iron Age.","What followed the Bronze Age?","Iron Age","early Stone Age","Roman Britain"],
  ["Roman Britain came after these prehistoric ages.","Which period came after the prehistoric ages?","Roman Britain","later Stone Age","Bronze Age"],
  ["Skara Brae was already ancient before Roman Britain.","Was Skara Brae new in Roman times?","no, already ancient","yes, a Roman village","yes, built by Claudius"],
 ], order("Order these periods, oldest first.", ["Early Stone Age","Later Stone Age","Bronze Age","Iron Age","Roman Britain"], ["Early Stone Age", "later Stone Age", "Bronze Age followed, then the Iron Age", "Roman Britain came after"]), ["Early Stone Age","Later Stone Age","Bronze Age","Iron Age","Roman Britain"]),
 source("skara-brae-houses", ["This modern photo shows a ruined stone house at Skara Brae.","Low walls outline rooms; stone furniture survives.","A square hearth lies near the centre.","A hearth held a fire for warmth and cooking.","The missing roof means we cannot see the complete original house."], [
  ["Which site is pictured?","Skara Brae","Caerwent","Giza","at Skara Brae"],
  ["Is this a photo made in the Stone Age?","no, it is modern","yes, by the villagers","yes, all old houses have ancient photos","modern photo"],
  ["What outlines the rooms?","low stone walls","gold panels","paper screens","Low walls outline rooms"],
  ["What feature lies near the centre?","a square hearth","a Roman bath","a grain field","square hearth"],
  ["What was a hearth used for?","a fire for warmth and cooking","writing letters","keeping coins","fire for warmth and cooking"],
  ["Which home feature survives?","stone furniture","a whole original roof","electric lighting","stone furniture survives"],
  ["What does this photo not show?","the complete original house","surviving stone walls","the square hearth","cannot see the complete original house"],
 ]),
 lesson("🧩", "a puzzle for comparing homes", [
  ["Skara Brae's houses show settled village life.","What do the houses suggest?","settled village life","only moving camps","Roman city life"],
  ["Growing crops encouraged people to stay near fields.","Why stay near fields?","to grow and tend crops","to follow wild herds","to build Roman roads"],
  ["People still hunted and fished as well as farming.","Which activity continued?","hunting and fishing","only gathering food","using Roman baths"],
  ["Stone furniture reveals how people arranged their homes.","What can stone furniture help explain?","the layout of homes","everyone's name","their exact voices"],
  ["Surviving houses do not tell us every villager's story.","What needs more evidence?","every villager's story","that stone houses existed","that furniture survives"],
  ["Both ancient and modern homes provide shelter.","What stayed similar?","the need for shelter","all building materials","all house sizes"],
 ], sort("Change or something that continued?", ["Change","Continued"], [["growing crops near a village",0],["hunting and fishing",1],["needing shelter",1]], ["Growing crops encouraged", "still hunted and fished", "provide shelter"])),
]);
