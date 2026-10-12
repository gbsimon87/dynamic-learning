import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const londonAfterTheFire = topic([
 "https://www.stpauls.co.uk/our-timeline",
 "https://www.cityoflondon.gov.uk/assets/Things-to-do/great-fire-walk.pdf",
], [
 l(["After the fire, people rebuilt London's homes.", "New rules called for brick and stone walls.", "Some streets became wider.", "Christopher Wren designed the new St Paul's Cathedral.", "Its great dome is still a London landmark."], "🏗️", "building work", [
 ["What did people do after the fire?","rebuilt homes","abandoned all of London","built only boats","rebuilt London's homes"],
 ["Which materials did new rules call for?","brick and stone","paper and straw","only wooden walls","brick and stone walls"],
 ["What happened to some streets?","they became wider","all disappeared","became rivers","streets became wider"],
 ["Who designed the new cathedral?","Christopher Wren","Rosa Parks","Samuel Pepys","Christopher Wren designed"],
 ["Which cathedral did he design?","St Paul's","a phone box","a bakery","St Paul's Cathedral"],
 ["Which feature is a landmark?","its dome","a mobile screen","a train wheel","great dome"],
 ], s("Rebuilding London, or unrelated?", ["Rebuilding","Unrelated"], [["brick walls",0],["stone walls",0],["wider streets",0],["mobile video calls",1]], ["brick and stone walls", "streets became wider"])),
 l(["First, the Great Fire damaged old St Paul's.", "Next, Christopher Wren designed a new cathedral.", "Builders spent many years making it.", "Today, the new St Paul's still stands.", "Rebuilding a city takes time."], "⛪", "a cathedral", [
 ["Which cathedral was damaged first?","old St Paul's","the new cathedral after today's visit","a space station","damaged old St Paul's"],
 ["What did Wren do next?","designed a new cathedral","made video calls","built a steam train","Next, Christopher Wren designed"],
 ["Who made the building?","builders","only Pepys","only a painter","Builders"],
 ["Was rebuilding very quick?","no, it took many years","yes, one minute","yes, one afternoon","spent many years"],
 ["What still stands today?","the new St Paul's","the old bakery unchanged","every old wooden house","new St Paul's still stands"],
 ["What does rebuilding a city need?","time","no work","only a diary","Rebuilding a city takes time"],
 ], o("Order the cathedral's story.", ["old St Paul's is damaged", "Wren designs the new cathedral", "we see the new St Paul's today"], ["First", "Next", "Today"])),
 l(["A drawing can show a plan for a building.", "Wren's plans help us learn what he designed.", "The cathedral itself is another clue.", "A plan cannot show how every builder felt.", "Compare the plan and building to learn more."], "📐", "a building plan", [
 ["What can a drawing show?","a building plan","every builder's feelings","a voice recording","plan for a building"],
 ["What do Wren's plans help us learn?","what he designed","what every builder thought","tomorrow's weather","what he designed"],
 ["Which is another clue?","the cathedral","a blank envelope","a new mobile","cathedral itself is another clue"],
 ["What cannot a plan show?","how every builder felt","drawn walls","the planned building","cannot show how every builder felt"],
 ["What should we compare?","the plan and building","only guesses","tomorrow and next week","Compare the plan and building"],
 ["Why compare them?","to learn more","to hide the clues","to hear stone speak","learn more"],
 ["Which question suits a plan?","What did Wren design?","How did every builder feel?","What was every person's voice like?","what he designed"],
 ]),
 l(["Before the fire, many houses had wooden frames.", "Afterwards, new walls used brick and stone.", "Some streets became wider, but London was still a city.", "People still needed homes and places to work."], "🧱", "a brick wall", [
 ["What framed many earlier houses?","wood","plastic","ice","wooden frames"],
 ["Which materials did new walls use?","brick and stone","paper and straw","only glass","brick and stone"],
 ["What changed about some streets?","they became wider","all became lakes","all disappeared","streets became wider"],
 ["What stayed the same about London?","it was still a city","all buildings were unchanged","nothing was rebuilt","London was still a city"],
 ["What did people still need?","homes","no buildings","only boats","needed homes"],
 ["What other places were still needed?","places to work","only places to hide","no shops or workplaces","places to work"],
 ], s("Before or after, in Bix's story?", ["Before","After"], [["many wooden frames",0],["houses framed in wood",0],["new brick walls",1],["new stone walls",1]], ["Before", "Afterwards"])),
]);
