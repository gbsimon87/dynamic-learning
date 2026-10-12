import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const theRiverNile = year3Topic([
 "https://www.britishmuseum.org/collection/galleries/early-egypt",
 "https://giza.fas.harvard.edu/lessons/daily-life-in-ancient-egypt/",
 "https://www.clevelandart.org/art/1914.639",
 "https://resources.metmuseum.org/resources/metpublications/pdf/An_Egyptian_Bestiary_The_Metropolitan_Museum_of_Art_Bulletin_v_52_no_4_Spring_1995.pdf",
], [
 lesson("🌊", "water representing a river", [
  ["The Nile flows through Egypt towards the Mediterranean Sea.","Towards which sea does the Nile flow?","Mediterranean Sea","North Sea","Irish Sea"],
  ["Much land away from the river is desert.","What is much land away from the river like?","desert","all forest","all farmland"],
  ["Ancient floods left rich soil for farming.","How could floods help farming?","leaving rich soil","turning soil into gold","stopping all plant growth"],
  ["Farmers grew grain such as wheat and barley.","Which crops did farmers grow?","wheat and barley","potatoes and tomatoes","only wild berries"],
  ["Canals helped carry water to fields.","What helped bring water to fields?","canals","Roman coins","stone statues"],
  ["Boats carried people and goods along the river.","What did boats carry?","people and goods","only sand","only rulers"],
 ], sort("Farming or river travel?", ["Farming","Travel"], [["rich soil",0],["canals to fields",0],["boats carrying goods",1]], ["soil for farming", "water to fields", "Boats carried people and goods"])),
 lesson("🕰️", "a clock for the farming year", [
  ["First, the Nile flood covered low fields.","What happened first in this farming cycle?","flooding","harvesting","sowing dry fields"],
  ["Next, water withdrew and left rich soil.","What happened as water withdrew?","rich soil remained","all soil vanished","the harvest was finished"],
  ["Farmers then sowed seeds and tended crops.","What followed the water withdrawing?","sowing and tending","the same flood beginning","building pyramids"],
  ["Finally, they harvested ripe grain.","What came last in this cycle?","harvesting","sowing","water withdrawing"],
  ["This farming cycle repeated over many years.","Did the cycle happen just once?","no, it repeated","yes, only once","yes, only in 1922"],
  ["Modern dams have changed the Nile's flooding.","Is today's flooding exactly like ancient flooding?","no, dams changed it","yes, always identical","yes, no changes occurred"],
 ], order("Order the ancient farming cycle.", ["Flood covers fields","Water withdraws","Sow and tend crops","Harvest grain"], ["First", "Next", "then sowed", "Finally"]), ["Flood","Water withdraws","Sow and tend","Harvest"]),
 source("cma-egypt-boat-jar", ["This ancient Egyptian jar shows painted boats.","Rows of short lines appear below a curved boat shape.","Boats helped people travel on the Nile.","A painted scene tells us boats mattered to its maker.","It cannot tell us every voyage's route or cargo."], [
  ["Which object is shown?","a pottery jar","a stone pyramid","a metal coin","Egyptian jar"],
  ["Which transport is painted?","boats","Roman wagons","modern trains","painted boats"],
  ["What visible detail lies below the boat shape?","short lines","printed words","gold coins","Rows of short lines"],
  ["Which river supported Egyptian boat travel?","Nile","Thames","Tigris","travel on the Nile"],
  ["What cautious idea does the painting support?","boats mattered to its maker","every Egyptian owned this boat","all cargo was grain","boats mattered to its maker"],
  ["What cannot it tell us?","every voyage's cargo","that boats were painted","that the jar was decorated","cannot tell us every voyage's route or cargo"],
  ["Which evidence would help explore travel further?","other finds about boats and goods","only this jar's background","guessing every route","route or cargo"],
 ]),
 lesson("🧩", "a puzzle for cause and consequence", [
  ["River water and rich soil helped farming grow.","Why could farming grow near the Nile?","water and rich soil","only desert sand","only royal statues"],
  ["Extra crops supported workers doing other jobs.","What could extra crops support?","workers doing other jobs","no settlements","only hunting"],
  ["Boats connected settlements and helped trade.","How did boats help communities?","connections and trade","keeping everyone apart","ending all farming"],
  ["Too little flood water could mean poor crops.","What difficulty could low floods cause?","poor crops","too much soil everywhere","more grain every time"],
  ["Too much flood water could damage homes and fields.","What difficulty could high floods cause?","damage to homes and fields","no change anywhere","only better crops"],
  ["The river was useful, but people still needed skill and planning.","Did the river do all the work?","no, people needed skill","yes, no work was needed","yes, crops grew without tending"],
 ], sort("River benefit or possible difficulty?", ["Benefit","Difficulty"], [["rich farming soil",0],["trade by boat",0],["flood damage",1]], ["rich soil helped", "helped trade", "damage homes and fields"])),
]);
