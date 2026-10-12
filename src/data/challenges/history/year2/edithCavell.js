import { lesson as l, sort as s, order as o, portrait, topic } from "./authoring.js";
export const edithCavell = topic([
 "https://www.iwm.org.uk/history/who-was-edith-cavell",
 "https://edithcavell.org.uk/ — biography and work in Belgium.",
], [
 l(["Edith Cavell was a British nurse in Belgium.", "She cared for soldiers from both sides in wartime.", "She also helped soldiers escape.", "In 1915 she was put to death for helping soldiers escape."], "🏥", "a hospital", [
 ["What was Edith's job?","a nurse","a queen","a printer","was a British nurse"],
 ["Where did she work?","Belgium","the Moon","Jamaica","in Belgium"],
 ["Who did she care for?","soldiers from both sides","only one side","no soldiers","both sides"],
 ["What else did she help soldiers do?","escape","build a cathedral","invent a website","helped soldiers escape"],
 ["What was Edith's nationality?","British","Jamaican","American","British nurse"],
 ["Why was she put to death?","for helping soldiers escape","for printing books","for building a school","for helping soldiers escape"],
 ], s("Actions in Edith's story, or unrelated?", ["Her actions","Unrelated"], [["caring for soldiers",0],["helping both sides",0],["helping soldiers escape",0],["inventing video calls",1]], ["cared", "both sides", "helped soldiers escape"])),
 l(["First, Edith trained as a nurse.", "Next, she helped train nurses in Belgium.", "During the First World War, she cared for soldiers.", "Today, people remember her courage and care."], "🩺", "a stethoscope", [
 ["What did Edith train as first?","a nurse","a pilot","an architect","trained as a nurse"],
 ["Who did she help train next?","nurses","printers","astronauts","train nurses"],
 ["Where did she help train nurses?","Belgium","Scutari","Montgomery","in Belgium"],
 ["During which war did she care for soldiers?","the First World War","the Great Fire","the bus boycott","First World War"],
 ["Who did she care for during the war?","soldiers","only builders","only kings","cared for soldiers"],
 ["Why is she remembered today?","courage and care","inventing phones","flying to the Moon","courage and care"],
 ], o("Put Edith's work in order.", ["trains as a nurse", "helps train nurses in Belgium", "cares for soldiers during the war"], ["First", "Next", "During"])),
 portrait("edith-cavell-portrait", "Edith Cavell", "a white blouse and lace collar", "white blouse", "her help for soldiers"),
 l(["Edith cared for soldiers from both sides.", "Florence and Mary helped in an earlier war.", "All three cared for sick or hurt people.", "Today, nurses care for people from different backgrounds.", "Kind care still matters."], "🤝", "hands showing care", [
 ["Who did Edith care for?","both sides","only one side","no soldiers","from both sides"],
 ["Who worked in an earlier war?","Florence and Mary","Tim and William","Rosa and Emily","Florence and Mary"],
 ["What links all three women?","caring for sick or hurt people","printing books","building cathedrals","All three cared"],
 ["Who do nurses care for today?","people from different backgrounds","only people from one place","nobody","different backgrounds"],
 ["What still matters?","kind care","keeping people apart","refusing all help","Kind care still matters"],
 ["Which shows kindness like Edith's?","caring for people from both sides","only helping one group","never helping soldiers","Edith cared for soldiers from both sides"],
 ], s("Care, or refusing care?", ["Care","Refusing care"], [["helping both sides",0],["helping sick people",0],["kindness across backgrounds",0],["turning every sick person away",1]], ["both sides", "sick", "Kind care"])),
]);
