import { lesson as l, sort as s, order as o, portrait, topic } from "./authoring.js";
export const florenceNightingale = topic([
 "https://www.nam.ac.uk/explore/florence-nightingale-lady-lamp",
 "https://www.florence-nightingale.co.uk/florence-nightingale-biography/ — nursing school and reform.",
], [
 l(["Florence Nightingale was a nurse long ago.", "She worked at Scutari during the Crimean War.", "She helped make the hospital cleaner.", "She carried a lamp when checking patients at night.", "People called her the Lady with the Lamp."], "🪔", "a lamp", [
 ["What was Florence's job?","a nurse","a pilot","a queen","was a nurse"],
 ["Where did she work?","Scutari","the Moon","a Pudding Lane bakery","at Scutari"],
 ["During which war did she work there?","the Crimean War","the Great Fire","the bus boycott","Crimean War"],
 ["What did she help improve?","hospital cleanliness","the bakery ovens","London's street names","hospital cleaner"],
 ["What did she carry at night?","a lamp","a mobile phone","a telescope","carried a lamp"],
 ["What name did people give her?","the Lady with the Lamp","the Queen of London","the First Pilot","Lady with the Lamp"],
 ], s("Florence's nursing work, or another job?", ["Nursing work","Another job"], [["checking patients",0],["helping clean hospitals",0],["caring at night",0],["flying a plane",1]], ["nurse", "cleaner", "checking patients at night"])),
 l(["First, Florence trained to care for sick people.", "Next, she helped soldiers at Scutari.", "Later, she helped start a school to train nurses.", "Her work helped nursing long after the Crimean War."], "🏥", "a hospital", [
 ["What did Florence learn first?","caring for sick people","piloting planes","printing books","First, Florence trained"],
 ["Who did she help at Scutari?","soldiers","only bakers","only astronauts","helped soldiers"],
 ["What did she help start later?","a nursing school","a bus company","a printing press","school to train nurses"],
 ["What did the school train?","nurses","pilots","kings","train nurses"],
 ["Did her work matter after the war?","yes, it helped nursing","no, it was forgotten immediately","only to train drivers","long after the Crimean War"],
 ["Which word shows a later event?","later","first","before","Later"],
 ], o("Put Florence's work in order.", ["trains to care for sick people", "helps at Scutari", "helps start a nursing school"], ["First", "Next", "Later"])),
 portrait("florence-nightingale-portrait", "Florence Nightingale", "a dark dress and white collar", "dark dress", "her care for patients"),
 l(["Florence helped make hospitals cleaner and trained nurses.", "Today, nurses also learn how to care for patients.", "They wash hands and use modern equipment.", "Cleanliness and kind care still matter."], "🧼", "soap for clean hands", [
 ["What did Florence help improve?","cleanliness","phone boxes","street names","hospitals cleaner"],
 ["What do nurses learn today?","caring for patients","only driving trains","only printing books","care for patients"],
 ["Which action does Bix name today?","washing hands","never washing","using dirty tools","wash hands"],
 ["What equipment do nurses use today?","modern equipment","only lamps","only buckets","modern equipment"],
 ["What mattered then and still matters now?","kind care","never learning","keeping dirt","kind care still matter"],
 ["Why do we remember Florence?","she helped improve nursing","she invented the web","she flew the first plane","cleaner and trained nurses"],
 ], s("Helpful care, or unhelpful care?", ["Helpful","Unhelpful"], [["clean hands",0],["learning to care",0],["kind care",0],["dirty hands",1]], ["learn", "wash hands", "Cleanliness and kind care"])),
]);
