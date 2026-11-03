import { lesson, detective, sort, order, year5Topic, MAYA_TIMELINE } from "./authoring.js";
export const whereTheMayaLived = year5Topic(["https://www.worldhistory.org/Maya_Civilization/", "https://www.britannica.com/topic/Maya-people", "https://whc.unesco.org/en/list/64/"], [
  lesson("🌴", "The Maya world", [
    ["The Maya lived in Central America and southern Mexico.", "Where did the Maya live?", "Central America and southern Mexico", "West Africa", "northern Europe"],
    ["Today this area includes Guatemala, Belize and part of Mexico.", "Which country is named here?", "Guatemala", "Greece", "Egypt"],
    ["Many Maya cities were built in hot, wet rainforest.", "What was much of the land like?", "hot, wet rainforest", "cold, icy mountains", "dry, sandy desert"],
    ["In the north, the land was flatter and drier.", "What was the land like in the north?", "flatter and drier", "colder and wetter", "higher and snowier"],
    ["The Maya built their biggest cities from about AD 250 to 900.", "When did the Maya build their biggest cities?", "about AD 250 to 900", "about 776 BC", "about AD 1900"],
    ["Maya people still live there today.", "Do Maya people still live there?", "yes", "no, none remain", "only in old books"]],
    sort("A place or a time?", ["A place", "A time"], [["rainforest", 0], ["Guatemala", 0], ["AD 250 to 900", 1], ["today", 1]], ["rainforest", "Guatemala", "AD 250 to 900", "today"])),
  lesson("📅", "The Maya through time", [
    ["Maya farming villages began about 2000 BC.", "When did Maya villages begin?", "about 2000 BC", "about AD 250", "about AD 900"],
    ["Maya cities grew from about AD 250.", "When did Maya cities grow?", "from about AD 250", "from 2000 BC", "from AD 1500"],
    ["In the AD 800s, many southern cities were left empty.", "What happened to many southern cities in the AD 800s?", "they were left empty", "they grew twice as big", "they became Roman"],
    ["Chichen Itza was powerful in the north from about AD 900.", "Which northern city was powerful from about AD 900?", "Chichen Itza", "Athens", "Jorvik"],
    ["Spanish soldiers arrived in the 1500s.", "Who arrived in the 1500s?", "Spanish soldiers", "Roman soldiers", "Viking raiders"],
    ["The Classic period lasted until about AD 900.", "When did the Classic period end?", "about AD 900", "AD 250", "1066"]],
    order("Order the events, oldest first.", ["Villages begin · about 2000 BC", "Cities grow · from AD 250", "Southern cities emptied · AD 800s", "Chichen Itza powerful · from about AD 900", "Spanish arrive · 1500s"], ["2000 BC", "AD 250", "AD 800s", "AD 900", "1500s"]), MAYA_TIMELINE),
  detective(["In 2018, scientists used laser scanning from aircraft over Guatemala.", "The scans can see through trees to the ground.", "They showed tens of thousands of buildings, roads and farms hidden in the forest.", "Archaeologists then visit sites to check what the scans show.", "The scans suggest many more people lived there than once thought.", "A scan alone cannot tell us who lived in each building.", "So scientists combine scans with digging and old writing."],
    [
    ["What did scientists use in 2018?", "laser scanning from aircraft", "photographs from 1900", "a time machine", "used laser scanning from aircraft"],
    ["What can the scans see through?", "trees", "mountains", "the sea", "see through trees to the ground"],
    ["What did the scans show?", "hidden buildings, roads and farms", "an empty forest", "a Greek temple", "buildings, roads and farms hidden in the forest"],
    ["What do archaeologists do next?", "visit sites to check the scans", "ignore the scans", "burn the forest", "Archaeologists then visit sites to check what the scans show."],
    ["What do the scans suggest?", "many more people lived there", "nobody lived there", "fewer people lived there", "many more people lived there than once thought"],
    ["What can a scan not tell us?", "who lived in each building", "where trees grow", "that there is a forest", "cannot tell us who lived in each building"],
    ["What do scientists combine scans with?", "digging and old writing", "guessing only", "modern games", "combine scans with digging and old writing"]], { picture: "🛰️", pictureLabel: "Laser scanning over a forest" }),
  lesson("🤔", "Land and life", [
    ["The land gave the Maya limestone for building.", "What did the land give for building?", "limestone", "iron", "glass"],
    ["Much of the north had few rivers, so people used cenotes, which were deep natural wells.", "What were cenotes?", "deep natural wells", "stone pyramids", "trade roads"],
    ["Farming, trade and cities grew where there was water.", "Where did cities grow?", "where there was water", "only on mountain tops", "where there was ice"],
    ["Volcanic glass called obsidian came from the southern mountains and made sharp tools.", "What was obsidian used for?", "sharp tools", "building roofs", "making paper"],
    ["Traders carried goods between different places.", "What did traders carry?", "goods between places", "pyramids", "armies"],
    ["Maya people adapted to different landscapes.", "What did Maya people do in different landscapes?", "adapted to them", "never moved", "gave up farming"]],
    sort("Water or stone?", ["Water", "Stone"], [["cenotes", 0], ["rivers", 0], ["limestone", 1], ["obsidian", 1]], ["cenotes", "rivers", "limestone", "obsidian"])),
]);
