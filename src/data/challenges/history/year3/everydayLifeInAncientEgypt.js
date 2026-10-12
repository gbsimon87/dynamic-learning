import { lesson, source, sort, order, year3Topic } from "./authoring.js";
export const everydayLifeInAncientEgypt = year3Topic([
 "https://giza.fas.harvard.edu/lessons/daily-life-in-ancient-egypt/",
 "https://www.metmuseum.org/-/media/files/learn/for-educators/publications-for-educators/the-art-of-ancient-egypt.pdf",
 "https://www.clevelandart.org/art/1949.499",
], [
 lesson("🌾", "grain representing daily work and food", [
  ["Many Egyptians farmed; others made goods or kept records.","Did everyone have the same job?","no, jobs differed","yes, all were pharaohs","yes, all were scribes"],
  ["Many houses were made from mud bricks.","What material built many homes?","mud bricks","only gold","only pyramid stone"],
  ["Bread was an important everyday food.","Which food was important?","bread","potatoes","tomatoes"],
  ["Linen clothing came from the flax plant.","Which plant supplied linen?","flax","wheat","papyrus"],
  ["Children learnt skills from adults; some trained as scribes.","How could children learn practical skills?","from adults","only from printed textbooks","only from Roman soldiers"],
  ["People enjoyed games, including senet, a board game.","What was senet?","a board game","a grain crop","a writing material"],
 ], sort("Work or play?", ["Work","Play"], [["farming",0],["keeping records",0],["playing senet",1]], ["farmed", "kept records", "senet, a board game"])),
 lesson("🕰️", "a clock for making bread", [
  ["First, farmers grew and harvested grain.","What came first in making bread?","growing and harvesting grain","baking dough","eating bread"],
  ["Next, people ground grain into flour.","What did grinding produce?","flour","linen","papyrus"],
  ["Then they mixed flour and water into dough.","What followed grinding?","mixing dough","growing grain","harvesting again"],
  ["Finally, they baked the dough into bread.","What happened last?","baking bread","grinding grain","sowing seeds"],
  ["Bread making still needs ingredients and work today.","What need continues today?","ingredients and work","only ancient stone ovens","only ancient hand tools"],
  ["Modern tools can differ from ancient grinding stones and ovens.","What may have changed?","the tools","the need for food","all ingredients becoming stone"],
 ], order("Order the steps of bread making.", ["Grow and harvest grain","Grind flour","Mix dough","Bake bread"], ["First", "Next", "Then", "Finally"]), ["Grow and harvest","Grind flour","Mix dough","Bake bread"]),
 source("cma-egypt-fishing", ["This Egyptian stone carving shows fish among tall plants.","A spear passes across the fish.","Traces of colour survive on the stone.","Fishing scenes help us investigate food and artists' skills.","A decorated tomb scene does not show every family's daily meal."], [
  ["What animals are pictured?","fish","horses","sheep","shows fish"],
  ["What stands around the fish?","tall plants","Roman columns","stone pyramids","tall plants"],
  ["What passes across the fish?","a spear","a modern fishing rod","a boat's wheel","A spear"],
  ["What remains on the stone?","traces of colour","a printed date","gold coins","Traces of colour"],
  ["Which daily activity can it help investigate?","getting food","building Roman roads","writing laws","investigate food"],
  ["Which craft does it reveal?","carving and colouring","modern photography alone","printing paper","stone carving",],
  ["Does it show every family's meal?","no","yes, all families ate alike","yes, every meal was fish","does not show every family's daily meal"],
 ]),
 lesson("🧩", "a puzzle for comparing daily lives", [
  ["Ancient and modern people both need food, homes and clothing.","What stayed necessary?","food, homes and clothing","mud bricks in every home","senet in every family"],
  ["Materials and tools changed over time.","What could change while needs stayed similar?","materials and tools","the need to eat","the need for shelter"],
  ["Wealth affected homes, food and opportunities.","Why did ancient lives differ?","different wealth and opportunities","all people were pharaohs","all homes were identical"],
  ["Children could learn practical skills by helping adults.","How could practical skills pass on?","children helping adults","only printed schoolbooks","only Roman teachers"],
  ["Tomb pictures often show selected, ideal scenes.","Why should we check other evidence?","pictures may show ideal scenes","pictures show every meal","pictures record everyone's life"],
  ["Tools, food remains and writing add other clues.","Which evidence adds clues about daily life?","tools, food remains and writing","only royal portraits","only one guess"],
 ], sort("Continuing need or thing that may change?", ["Continuing need","May change"], [["food",0],["shelter",0],["tools and materials",1]], ["need food, homes and clothing", "Materials and tools changed"])),
]);
