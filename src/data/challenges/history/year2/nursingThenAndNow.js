import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const nursingThenAndNow = topic([
 "https://www.nam.ac.uk/schools/workshops/florence-and-mary-virtual",
 "https://www.nam.ac.uk/explore/florence-nightingale-lady-lamp",
 "https://edithcavell.org.uk/",
], [
 l(["Florence helped make hospitals cleaner.", "Mary brought soldiers food and care.", "Edith cared for soldiers from both sides.", "All three helped sick or hurt people.", "Nurses today use modern equipment and still give kind care."], "🩺", "a stethoscope", [
 ["Who helped make hospitals cleaner?","Florence","William","Rosa","Florence helped make hospitals cleaner"],
 ["Who brought soldiers food?","Mary","Tim","Emily","Mary brought soldiers food"],
 ["Who cared for soldiers from both sides?","Edith","Caxton","Pepys","Edith cared"],
 ["Who did all three help?","sick or hurt people","only healthy printers","only pilots","sick or hurt people"],
 ["What do nurses use today?","modern equipment","only lamps","only old buckets","modern equipment"],
 ["What do nurses still give?","kind care","no help","only maps","kind care"],
 ], s("Sort the care Bix describes.", ["Care","Not care"], [["cleaner hospitals",0],["food for soldiers",0],["helping sick people",0],["ignoring every patient",1]], ["cleaner", "food", "helped sick"])),
 l(["Florence and Mary cared for soldiers in the Crimean War.", "Later, Edith worked in the First World War.", "Today, nurses work in hospitals, clinics and people's homes.", "Care continued while tools and treatments changed."], "🏥", "a hospital", [
 ["Which two worked in the earlier war?","Florence and Mary","Edith and Rosa","William and Tim","Florence and Mary"],
 ["What was their war called?","the Crimean War","the First World War","the Great Fire","Crimean War"],
 ["When did Edith work?","in the later war","before Florence and Mary","only today","Later, Edith"],
 ["Where can nurses work today?","hospitals, clinics and homes","only battlefields","only printing shops","hospitals, clinics and people's homes"],
 ["What continued through time?","care","all tools stayed identical","every treatment stayed identical","Care continued"],
 ["What changed?","tools and treatments","people stopped needing care","all hospitals disappeared","tools and treatments changed"],
 ], o("Order these times, earliest first.", ["Florence and Mary in the Crimean War", "Edith in the First World War", "nurses caring today"], ["Crimean War", "Later", "Today"])),
 l(["Old photos can show nurses' clothes and equipment.", "Letters can describe how they cared for patients.", "Photos alone cannot tell us how every patient felt.", "Using both sources gives more clues."], "📷", "a camera", [
 ["What can an old photo show?","clothes and equipment","every patient's feelings","a spoken voice","clothes and equipment"],
 ["What can a letter describe?","patient care","a live moving image","every future hospital","how they cared for patients"],
 ["What cannot photos alone tell us?","how every patient felt","the visible clothes","the shown equipment","cannot tell us how every patient felt"],
 ["Why use both sources?","to get more clues","to stop learning","to hear a photo","more clues"],
 ["Which source uses written words?","a letter","a silent photo","a bandage","Letters"],
 ["Which question suits a photo?","What clothes are shown?","What did every patient think?","How did everyone sound?","photos can show nurses' clothes"],
 ["Which question suits a letter about care?","How did the nurse care for patients?","What will happen tomorrow?","How did every person's voice sound?","describe how they cared"],
 ]),
 l(["Then and now, nurses help sick people.", "Florence checked patients using a lamp at night.", "Today, hospitals have electric lights and modern machines.", "Clean hands and kind care matter in both times."], "🧼", "soap", [
 ["What is the same then and now?","helping sick people","all machines","all lights","nurses help sick people"],
 ["What did Florence use at night?","a lamp","a smartphone","a modern scanner","using a lamp"],
 ["What lights hospitals today?","electric lights","only Florence's lamp","only candles","electric lights"],
 ["What equipment does Bix name today?","modern machines","only old lamps","no equipment","modern machines"],
 ["What still matters for hands?","cleanliness","dirt","never washing","Clean hands"],
 ["What still matters for care?","kindness","ignoring patients","only treating friends","kind care"],
 ], s("Sort Bix's lighting clues.", ["Florence at night","Hospitals today"], [["checking by lamp",0],["carrying a lamp",0],["electric lights",1],["electric hospital lighting",1]], ["using a lamp", "Today", "electric lights"])),
]);
