import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const egyptianGodsAndMummies = year3Topic([
 "https://www.britishmuseum.org/collection/galleries/egyptian-death-and-afterlife-mummies",
 "https://www.britishmuseum.org/learn/schools/ages-7-11/ancient-egypt/egyptian-mummification",
 "https://www.britishmuseum.org/blog/what-book-dead",
 "https://www.clevelandart.org/art/1914.561.b",
], [
 lesson("⚱️", "a decorated vessel representing burial beliefs", [
  ["Ancient Egyptians worshipped many gods and goddesses.","What describes ancient Egyptian worship?","many gods and goddesses","only Roman emperors","no beliefs"],
  ["Ra was linked with the sun.","What was Ra linked with?","the sun","Roman roads","only grain stores"],
  ["Osiris was linked with the afterlife.","What was Osiris linked with?","the afterlife","only boat making","only farming tools"],
  ["Many Egyptians believed life continued after death.","What was the afterlife belief?","life continued after death","nobody ever died","everyone became a pharaoh"],
  ["Mummification preserved bodies, often wrapped in linen.","What did mummification do?","preserved bodies","made coins","built pyramids"],
  ["Coffins and burial goods were connected with these beliefs.","Why study burial goods?","to investigate beliefs","to learn only road routes","to hear ancient voices"],
 ], sort("God or burial practice?", ["God","Burial practice"], [["Ra",0],["Osiris",0],["mummification",1]], ["Ra was linked", "Osiris was linked", "Mummification preserved"])),
 lesson("🕰️", "a clock for a burial sequence", [
  ["After a person died, specialists could preserve the body.","When could preservation begin?","after death","before the person was born","only after a modern discovery"],
  ["Next, the preserved body was wrapped in linen.","What came after preservation in this sequence?","linen wrapping","modern study","building a Roman wall"],
  ["Then it could be placed in a coffin and buried.","What followed wrapping?","a coffin and burial","the person's birth","a modern photograph"],
  ["Burial practices changed across thousands of years.","Were all burials identical?","no, practices changed","yes, always identical","yes, in every period"],
  ["Today, researchers study coffins, objects and writing.","What can researchers study today?","coffins, objects and writing","a living ancient pharaoh","a film made at every burial"],
  ["Not everyone could afford the same burial preparations.","Did everyone have the same preparations?","no","yes, everyone had royal coffins","yes, wealth never mattered"],
 ], order("Order this possible burial and study sequence.", ["Preserve the body","Wrap in linen","Coffin and burial","Modern study"], ["preserve the body", "Next", "Then", "Today"]), ["Preservation","Linen wrapping","Coffin and burial","Modern study"]),
 source("cma-egypt-coffin-lid", ["This is Bakenmut's painted wooden coffin lid, not a body.","A face, striped head covering and many designs decorate it.","Writing and figures connect the coffin with burial beliefs.","It helps us study craftwork and ideas about the afterlife.","It cannot prove what happens after death."], [
  ["What is pictured?","a coffin lid","an uncovered body","a pyramid","coffin lid, not a body"],
  ["Which material was painted?","wood","gold","papyrus","painted wooden coffin lid"],
  ["What detail can you see at the top?","a face","a boat","a horse","A face"],
  ["What appears with the designs?","writing and figures","a modern map","an electric lamp","Writing and figures"],
  ["Which ideas can the object help us study?","afterlife beliefs","Roman military plans","today's weather","ideas about the afterlife"],
  ["Can this object prove an afterlife exists?","no","yes, the painting proves it","yes, the wood proves it","cannot prove what happens after death"],
  ["Which other skill does it reveal?","craftwork","modern printing","iron road building","craftwork"],
 ]),
 lesson("🧩", "a puzzle for understanding beliefs respectfully", [
  ["Burial objects are evidence of beliefs, not proof of an afterlife.","What do burial objects provide?","evidence of beliefs","proof of an afterlife","everyone's private thoughts"],
  ["Preserving a body mattered to many Egyptians' beliefs.","Why did preservation matter?","it linked with beliefs","only for making money","only for storing grain"],
  ["Wealth affected burial preparations.","Why might burials differ?","different wealth","all families had royal wealth","nobody chose different objects"],
  ["Coffins reveal artists' work as well as religious ideas.","What else do coffins reveal?","artists' work","every person's voice","every voyage's cargo"],
  ["Beliefs and practices changed over time.","Did beliefs remain identical for thousands of years?","no","yes, without change","yes, everyone believed alike"],
  ["We discuss people's beliefs with care and respect.","How should we discuss these beliefs?","with respect","by mocking them","by pretending all beliefs are ours"],
 ], sort("Evidence supports or cannot prove?", ["Supports","Cannot prove"], [["people had burial beliefs",0],["artists decorated coffins",0],["what happens after death",1]], ["evidence of beliefs", "artists' work", "not proof of an afterlife"])),
]);
