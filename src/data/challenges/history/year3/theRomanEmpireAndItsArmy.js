import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const theRomanEmpireAndItsArmy = year3Topic([
 "https://www.english-heritage.org.uk/learn/story-of-england/romans/",
 "https://romanarmymuseum.com/story/a-diverse-fighting-force/",
 "https://www.metmuseum.org/-/media/files/learn/for-educators/publications-for-educators/roman.pdf",
 "https://www.clevelandart.org/art/1969.158.a",
], [
 lesson("⚔️", "crossed swords representing an army", [
  ["An empire rules over many lands and peoples.","What is an empire?","many lands under one power","one small house","a farm tool"],
  ["Rome was a city in Italy.","Where was Rome?","Italy","Britain","Egypt"],
  ["By AD 42, its empire surrounded the Mediterranean Sea.","Which sea was central to the empire?","Mediterranean Sea","North Sea","Irish Sea"],
  ["Legions were large groups of Roman citizen soldiers.","What was a legion?","a group of soldiers","a group of farms","a group of temples"],
  ["Other soldiers came from many parts of the empire.","Did all soldiers come from Rome?","no, many places","yes, one city","yes, one family"],
  ["Training and teamwork helped the army.","What helped the army work well?","training and teamwork","never practising","everyone acting alone"],
 ], sort("Place or army feature?", ["Place","Army feature"], [["Italy",0],["Mediterranean Sea",0],["training and teamwork",1]], ["city in Italy", "Mediterranean Sea", "Training and teamwork"])),
 lesson("🕰️", "a clock for time", [
  ["Britain had Iron Age communities before Roman conquest.","What came before Roman conquest?","Iron Age communities","Roman Britain","today"],
  ["By AD 42, Rome already ruled a large empire.","Did the empire begin with Britain's conquest?","no, it was already large","yes, in Britain","yes, after AD 410"],
  ["Claudius ordered Britain's invasion in AD 43.","Who ordered the AD 43 invasion?","Claudius","Boudica","Hadrian"],
  ["Hadrian's Wall began later, in AD 122.","Which event came after the invasion?","Hadrian's Wall began","the British Iron Age began","Rome's empire began in Britain"],
  ["Roman rule in Britain ended around AD 410.","Which event came later still?","Roman rule ended","the AD 43 invasion","the British Iron Age"],
  ["Today, we study surviving Roman remains.","How can we investigate Roman life today?","study surviving remains","ask Claudius in person","watch a recording of AD 43"],
 ], order("Order the stages of the British story.", ["Iron Age Britain","Invasion · AD 43","Wall begins · AD 122","Roman rule ends · about AD 410","Today"], ["Iron Age communities before", "invasion in AD 43", "later, in AD 122", "ended around AD 410", "Today"]), ["Iron Age Britain","Invasion · AD 43","Wall begins · AD 122","Rule ends · about AD 410","Today"]),
 source("cma-claudius-coin", ["This gold Roman coin shows Emperor Claudius from the side.","Letters run around his head.","Coins could spread a ruler's image across the empire.","This is an official image, not a photograph.","It cannot show how every soldier lived or felt."], [
  ["Whose image is shown?","Claudius","Boudica","Tutankhamun","Emperor Claudius"],
  ["Which detail surrounds the head?","letters","a map","a wall","Letters run around his head"],
  ["How is his face shown?","from the side","from behind","hidden by a helmet","from the side"],
  ["What could coins spread?","a ruler's image","a ruler's voice","every soldier's thoughts","spread a ruler's image"],
  ["What kind of image is this?","an official coin image","a photograph","a soldier's diary","official image, not a photograph"],
  ["What cannot this coin tell us?","how every soldier felt","that Claudius was pictured","that letters surround the head","cannot show how every soldier lived or felt"],
  ["Why use other sources about the army?","to learn soldiers' lives","to hear this silent coin","to prove all soldiers were alike","every soldier lived or felt"],
 ]),
 lesson("🧩", "a puzzle for considering power", [
  ["Training helped soldiers act together.","Why did training matter?","soldiers could act together","it ended all war","it replaced all supplies"],
  ["Roads helped move soldiers and supplies.","Why did roads matter to the army?","moving soldiers and supplies","growing wheat","making gold"],
  ["Conquest brought lands under Roman rule.","What was a consequence of conquest?","Roman rule spread","no rulers remained","all people became equal"],
  ["Many conquered people lost freedom; some were enslaved.","Was conquest good for everyone?","no, some lost freedom","yes, everyone benefited","yes, nobody was harmed"],
  ["Soldiers came from different places and backgrounds.","What describes the army's people?","different backgrounds","all from one family","all born in Rome"],
  ["A powerful army was not always victorious.","Does power mean winning every battle?","no","yes, always","yes, without fighting"],
 ], sort("Helped the army or harmed conquered people?", ["Helped the army","Harmed conquered people"], [["training together",0],["roads for supplies",0],["losing freedom",1]], ["Training helped", "Roads helped", "lost freedom"])),
]);
