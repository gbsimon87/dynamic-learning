import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const stoneAgeHunterGatherers = year3Topic([
  "https://www.english-heritage.org.uk/siteassets/home/members-area/kids/kids-rule---prehistoric-england/kidsrule_prehistory.pdf",
  "https://historicengland.org.uk/education/schools-resources/teaching-activities/timeline-stone-age-to-iron-age/",
  "https://www.clevelandart.org/art/1915.42",
], [
  lesson("🦣", "an animal representing hunting", [
    ["Hunter-gatherers hunted animals and gathered wild plants.", "What did gatherers collect?", "wild plants", "planted wheat", "bronze coins"],
    ["Flint could be chipped into sharp tools.", "Which stone could become a sharp tool?", "flint", "soft clay", "wood"],
    ["Fire provided warmth and helped cook food.", "Why was fire useful?", "warmth and cooking", "growing metal", "writing books"],
    ["Some groups moved as the seasons changed.", "Why might a group move?", "the seasons changed", "to visit Roman baths", "to buy iron coins"],
    ["Hunting meant catching animals for food.", "Which activity is hunting?", "catching an animal", "picking berries", "planting barley"],
    ["Gathering meant collecting foods such as berries and nuts.", "Which food could be gathered?", "nuts", "bread from planted wheat", "meat from a hunt"],
  ], sort("Hunting or gathering?", ["Hunting", "Gathering"], [["catching an animal",0],["picking berries",1],["collecting nuts",1]], ["Hunting meant catching animals", "berries and nuts"])),
  lesson("🕰️", "a clock for time", [
    ["Early Stone Age people lived by hunting and gathering.", "How did early Stone Age people get food?", "hunting and gathering", "Roman markets", "iron ploughs"],
    ["Later Stone Age people in Britain began farming.", "When did farming begin in Britain?", "later Stone Age", "after Roman Britain", "only today"],
    ["The Bronze Age followed the Stone Age.", "Which age followed the Stone Age?", "Bronze Age", "Iron Age", "Roman Britain"],
    ["The Iron Age came next.", "Which age followed the Bronze Age?", "Iron Age", "Stone Age", "Roman Britain"],
    ["Roman Britain followed the Iron Age.", "Which period followed the Iron Age?", "Roman Britain", "Bronze Age", "early Stone Age"],
    ["Hunting continued after farming began.", "Did hunting stop when farming began?", "no, it continued", "yes, everywhere at once", "it had not begun yet"],
  ], order("Put these ways of life and periods in order.", ["Early Stone Age", "Later Stone Age", "Bronze Age", "Iron Age", "Roman Britain"], ["Early Stone Age", "Later Stone Age", "Bronze Age followed", "Iron Age came next", "Roman Britain followed"]), ["Early Stone Age", "Later Stone Age", "Bronze Age", "Iron Age", "Roman Britain"]),
  source("cma-flint-handaxe", ["This flint tool was found in Egypt, not Britain.", "Chipped edges show that people shaped the stone.", "Stone tools survive when many wooden tools decay.", "The photo cannot show which meal someone prepared.", "Comparing tools from different places helps us study toolmaking."], [
    ["Where was this tool found?","Egypt","Britain","Rome","found in Egypt"],
    ["Which detail suggests human work?","chipped edges","the dark background","the photo's border","Chipped edges"],
    ["What is this tool made of?","flint","bronze","iron","flint tool"],
    ["Why might stone tools survive better than wooden ones?","wood can decay","stone always has writing","wood cannot be shaped","wooden tools decay"],
    ["What cannot this photo tell us?","which meal was prepared","that the edge was chipped","that this is a stone tool","cannot show which meal"],
    ["What helps us study toolmaking?","comparing tools","guessing a maker's name","ignoring chipped edges","Comparing tools"],
    ["Does this object prove it was used in Britain?","no, it was found in Egypt","yes, all flint comes from Britain","yes, its shape proves Britain","Egypt, not Britain"],
  ]),
  lesson("🧩", "a puzzle for comparing ways of life", [
    ["Hunters and farmers both needed food and shelter.", "What did both groups need?", "food and shelter", "Roman coins", "iron forts"],
    ["Gatherers collected wild plants; farmers grew crops.", "What changed with farming?", "people grew crops", "plants stopped growing", "nobody gathered food"],
    ["Moving helped some hunters find seasonal food.", "Why might moving help hunters?", "finding seasonal food", "building a permanent field", "using a Roman bath"],
    ["Farmers often stayed near fields and animals.", "Why stay near a farm?", "to tend fields and animals", "to follow wild herds", "to avoid growing crops"],
    ["People still used stone tools after farming began.", "Which thing continued?", "using stone tools", "living only by hunting", "using Roman roads"],
    ["A new way of life did not reach everyone together.", "Did everyone change together?", "no, change varied", "yes, on one day", "only one family ever changed"],
  ], sort("Hunting and gathering or farming?", ["Hunting and gathering", "Farming"], [["collecting wild plants",0],["growing crops",1],["tending farm animals",1]], ["Gatherers collected wild plants", "farmers grew crops", "Farmers often stayed near fields and animals"])),
]);
