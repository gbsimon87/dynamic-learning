import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const romanGodsAndEarlyChristianity = year3Topic([
 "https://www.english-heritage.org.uk/learn/story-of-england/romans/religion/",
 "https://www.english-heritage.org.uk/visit/places/lullingstone-roman-villa/history/significance/",
 "https://www.clevelandart.org/art/1915.559",
], [
 lesson("🏺", "a classical vessel representing ancient culture", [
  ["Many Romans worshipped several gods and goddesses.","How many gods did many Romans worship?","several","only one everywhere","none anywhere"],
  ["Jupiter was linked with the sky and thunder.","What was Jupiter linked with?","sky and thunder","only farming tools","only roads"],
  ["People made offerings at temples and shrines.","Where might people make offerings?","temples and shrines","only bath drains","only army roads"],
  ["British gods continued alongside Roman beliefs.","Did British beliefs disappear at once?","no, they continued","yes, everywhere","yes, in one day"],
  ["Christians followed Jesus and believed in one God.","Which belief describes early Christianity?","one God","many Roman gods","no religious beliefs"],
  ["Christian communities grew in later Roman Britain.","What grew in later Roman Britain?","Christian communities","Stone Age villages","the first Egyptian pyramids"],
 ], sort("Many Roman gods or early Christianity?", ["Many Roman gods","Early Christianity"], [["Jupiter",0],["following Jesus",1],["belief in one God",1]], ["Jupiter", "Christians followed Jesus and believed in one God"])),
 lesson("🕰️", "a clock for time", [
  ["British beliefs existed before Roman conquest.","Which beliefs were already present?","British beliefs","only later Christianity","only Roman imperial beliefs"],
  ["Roman conquest began in AD 43.","Which event followed pre-Roman Britain?","Roman conquest","today","Roman rule ending"],
  ["British and Roman gods were worshipped during Roman rule.","What happened during Roman rule?","beliefs existed alongside each other","everyone had identical beliefs","all belief ended"],
  ["Later, Christianity spread in Roman Britain.","Which belief spread later?","Christianity","early Stone Age toolmaking","only Jupiter worship"],
  ["Lullingstone has evidence of a later Roman Christian worship room.","What does Lullingstone help us study?","Christian worship","Stone Age hunting","Egyptian pyramid building"],
  ["Roman rule ended around AD 410; beliefs kept changing.","Did beliefs stop changing then?","no","yes, forever","yes, all beliefs ended"],
 ], order("Order these stages of Britain's story.", ["Pre-Roman Britain","Conquest · AD 43","Later Roman Britain","Rule ends · about AD 410"], ["before Roman conquest", "began in AD 43", "Later, Christianity spread", "ended around AD 410"]), ["Pre-Roman Britain","Conquest · AD 43","Later Roman Britain","Rule ends · about AD 410"]),
 source("cma-roman-altar", ["This Roman marble altar shows carved figures of gods.","One figure wears a helmet and holds a long spear.","The museum identifies Hermes and Athena.","Roman art sometimes used Greek gods' names and forms.","This altar does not prove that everyone shared the same beliefs."], [
  ["What kind of object is this?","an altar","a coin","a bath","marble altar"],
  ["What detail can you see on one figure?","a helmet","a modern hat","a crown of letters","wears a helmet"],
  ["What long object is shown?","a spear","a papyrus scroll","a road","long spear"],
  ["Who does the museum identify?","Hermes and Athena","Boudica and Claudius","two named farmers","Hermes and Athena"],
  ["What material was carved?","marble","gold","wood","marble altar"],
  ["Why do Greek names appear with Roman art?","Romans used Greek gods' forms","the object must be Egyptian","Romans had no art","Greek gods' names and forms"],
  ["What cannot this altar prove?","everyone believed the same things","that figures were carved","that it shows a helmet","does not prove that everyone shared the same beliefs"],
 ]),
 lesson("🧩", "a puzzle for comparing beliefs", [
  ["Beliefs varied between people and places.","Were beliefs identical everywhere?","no, they varied","yes, all alike","yes, one belief only"],
  ["Some British and Roman gods were linked together.","What could happen when cultures met?","gods were linked together","all old beliefs vanished instantly","nobody shared ideas"],
  ["Christianity brought belief in one God.","What was different about Christianity?","belief in one God","worship of Jupiter only","worship of many Roman gods"],
  ["An altar shows worship at a place, not everyone's private thoughts.","What does an altar not reveal?","everyone's private thoughts","evidence of worship","a carved object"],
  ["Buildings, objects and writing offer different clues to belief.","What helps investigate beliefs?","different kinds of evidence","only one guess","only an emperor's coin"],
  ["We describe ancient beliefs respectfully, even when ours differ.","How should we discuss different beliefs?","respectfully","by mocking them","by calling them all identical"],
 ], sort("Evidence or something we cannot assume?", ["Evidence","Cannot assume"], [["an altar at a worship place",0],["everyone's private thoughts",1],["different objects and writing",0]], ["An altar shows worship", "not everyone's private thoughts", "objects and writing offer different clues"])),
]);
