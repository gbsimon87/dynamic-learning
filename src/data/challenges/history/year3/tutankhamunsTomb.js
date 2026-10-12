import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const tutankhamunsTomb = year3Topic([
 "https://www.metmuseum.org/exhibitions/listings/2006/discovering-tutankhamun",
 "https://www.metmuseum.org/hubs/tutankhamun-100",
 "https://www.metmuseum.org/exhibitions/listings/2001/harry-burton",
 "https://commons.wikimedia.org/wiki/File:Tutankhamun_tomb_photographs_2_011.jpg",
], [
 lesson("👑", "a crown representing an Egyptian ruler", [
  ["Tutankhamun was a pharaoh of ancient Egypt.","Who was Tutankhamun?","an Egyptian pharaoh","a Roman emperor","a British queen"],
  ["He lived more than 3,000 years ago.","When did he live?","more than 3,000 years ago","in 1922","in Roman Britain"],
  ["His tomb was found in the Valley of the Kings.","Where was his tomb?","Valley of the Kings","Skara Brae","Caerwent"],
  ["Egyptian workers and Howard Carter's team uncovered it in 1922.","Who helped uncover the tomb?","Egyptian workers and Carter's team","Carter entirely alone","Roman soldiers"],
  ["Furniture, jewellery and a golden mask survived inside.","Which objects survived?","furniture and jewellery","modern televisions","Roman road signs"],
  ["Careful records helped preserve knowledge of the finds.","Why make careful records?","to preserve knowledge","to hide all evidence","to guess every answer"],
 ], sort("Ancient ruler or modern investigator?", ["Ancient ruler","Investigator"], [["Tutankhamun",0],["Howard Carter",1],["Egyptian excavation workers",1]], ["Tutankhamun was a pharaoh", "Egyptian workers and Howard Carter's team"])),
 lesson("🕰️", "a clock for the tomb's story", [
  ["First, Tutankhamun lived and ruled in ancient Egypt.","What came first in this story?","Tutankhamun's life","the 1922 discovery","modern study"],
  ["After he died, people buried him with many objects.","When were objects placed in his tomb?","after his death","after the 1922 discovery","before he was born"],
  ["The tomb remained hidden for many centuries.","What happened before discovery?","the tomb was hidden","the tomb was photographed yearly","Carter lived inside it"],
  ["The team found it in 1922.","Which label marks discovery?","1922","AD 43","55 BC"],
  ["Today, researchers study the objects and excavation records.","What do researchers study today?","objects and excavation records","a living Tutankhamun","films made by ancient builders"],
  ["Discovery dates are different from the age of ancient objects.","Were all the tomb's objects made in 1922?","no, discovery is later","yes, all made then","yes, by Carter"],
 ], order("Order the tomb's story.", ["Tutankhamun's life","Burial with objects","Hidden for centuries","Discovery · 1922","Modern study"], ["First", "After he died", "remained hidden", "found it in 1922", "Today"]), ["Life","Burial","Hidden","Discovery · 1922","Modern study"]),
 source("burton-tutankhamun-tomb", ["Harry Burton photographed objects in Tutankhamun's tomb in 1922.","This black-and-white photo shows furniture and parts of chariots.","A photograph records where objects lay during excavation.","It cannot show their original colours.","The photo records a discovery, not Tutankhamun's life directly."], [
  ["Who made this photograph?","Harry Burton","Tutankhamun","Julius Caesar","Harry Burton photographed"],
  ["Which objects can you see?","furniture and chariot parts","Roman lamps only","modern cars","furniture and parts of chariots"],
  ["What kind of source is this?","a photograph","an ancient painted wall","a written law","black-and-white photo"],
  ["What can it record?","where objects lay","every ancient conversation","every object's original colour","where objects lay"],
  ["What cannot this black-and-white photo show?","original colours","that furniture was present","that objects lay together","cannot show their original colours"],
  ["When was this photograph made?","1922","during Tutankhamun's life","AD 43","in 1922"],
  ["Does it directly picture Tutankhamun living?","no, it records discovery","yes, he took the picture","yes, it is an ancient camera photo","not Tutankhamun's life directly"],
 ]),
 lesson("🧩", "a puzzle for understanding discoveries", [
  ["The many surviving objects offer clues to royal life and burial beliefs.","Why did the discovery matter?","many clues survived","it revealed every Egyptian's life","it proved every belief true"],
  ["A royal tomb does not represent every Egyptian's home.","What can we not assume?","all homes were like this royal tomb","royal objects existed","burial objects survived"],
  ["Egyptian workers' knowledge and labour helped the discovery.","Why include Egyptian workers in the story?","their work helped the discovery","they played no part","Carter worked alone"],
  ["Photographs and notes record objects before they are moved.","Why record objects in place?","to keep their original context","to hide where they lay","to make every object modern"],
  ["New research can change explanations of old finds.","Can explanations change?","yes, with new research","no, never","only by ignoring finds"],
  ["Careful study matters more than calling finds treasure.","What makes a find useful for history?","careful study","only its gold value","only how shiny it looks"],
 ], sort("Helps historical study or loses information?", ["Helps study","Loses information"], [["recording objects before moving them",0],["new research",0],["moving objects without notes",1]], ["Photographs and notes record objects before they are moved", "New research", "Careful study"])),
]);
