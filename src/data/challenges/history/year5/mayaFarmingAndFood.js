import { lesson, detective, sort, order, year5Topic, MAYA_TIMELINE } from "./authoring.js";
export const mayaFarmingAndFood = year5Topic(["https://www.worldhistory.org/Maya_Civilization/", "https://www.britannica.com/topic/Maya-people", "https://www.metmuseum.org/toah/hd/maya/hd_maya.htm"], [
  lesson("🌽", "Maya food", [
    ["Maize was the most important Maya food.", "What was the most important Maya food?", "maize", "wheat", "potatoes"],
    ["The Maya also grew beans, squash and chilli peppers.", "Which foods did the Maya grow?", "beans, squash and chilli peppers", "wheat, oats and carrots", "rice, tea and apples"],
    ["They made maize into flat breads called tortillas.", "What did the Maya make maize into?", "tortillas", "pasta", "pizza"],
    ["Cacao beans were made into a bitter drink.", "What was made from cacao beans?", "a bitter drink", "a sweet cake", "a cold ice"],
    ["Farmers cleared forest for fields called milpas.", "What was a milpa?", "a field cleared from forest", "a stone temple", "a market stall"],
    ["They had no ploughs or farm animals to pull them.", "What did Maya farmers not have?", "ploughs or farm animals", "maize or beans", "fields or seeds"]],
    sort("Grown or made?", ["Grown", "Made from crops"], [["maize", 0], ["beans", 0], ["tortillas", 1], ["a cacao drink", 1]], ["Maize", "beans", "tortillas", "drink"])),
  lesson("📅", "Food through time", [
    ["Maya farmers were growing maize by about 2000 BC.", "When were farmers growing maize?", "by about 2000 BC", "by about AD 1500", "by about AD 900"],
    ["Cities needed lots of food from about AD 250.", "From when did cities need lots of food?", "about AD 250", "2000 BC", "AD 1500"],
    ["Farmers built terraces and raised fields to grow more.", "What did farmers build to grow more?", "terraces and raised fields", "pyramid roofs", "longships"],
    ["Around AD 800, droughts made harvests harder.", "What made harvests harder around AD 800?", "droughts", "floods of ice", "Roman taxes"],
    ["Cacao was traded widely by about AD 900.", "What was traded widely by about AD 900?", "cacao", "potatoes", "wheat"],
    ["Spanish arrivals in the 1500s brought cattle and horses.", "What did Spanish arrivals bring in the 1500s?", "cattle and horses", "maize and cacao", "tortillas"]],
    order("Order the events, oldest first.", ["Maize farming · about 2000 BC", "Cities need food · from AD 250", "Droughts · around AD 800", "Cacao widely traded · about AD 900", "Spanish bring cattle · 1500s"], ["2000 BC", "AD 250", "AD 800", "AD 900", "1500s"]), MAYA_TIMELINE),
  detective(["Archaeologists find maize pollen in lake mud.", "Maya paintings on pots show people drinking from tall cups.", "Chemical tests found cacao traces inside some of the cups.", "These clues suggest cacao was important at feasts.", "Bones show many people ate lots of maize.", "Written records of daily meals are rare.", "So archaeologists combine many clues about food."],
    [
    ["Where do archaeologists find maize pollen?", "in lake mud", "in tall cups", "in paper books", "maize pollen in lake mud"],
    ["What do pot paintings show?", "people drinking from tall cups", "farmers using ploughs", "men riding horses", "people drinking from tall cups"],
    ["What did chemical tests find?", "cacao traces in cups", "iron in cups", "gold in cups", "cacao traces inside some of the cups"],
    ["What do these clues suggest?", "cacao was important at feasts", "cacao was never used", "cacao was only for animals", "cacao was important at feasts"],
    ["What do bones show?", "many people ate lots of maize", "nobody ate maize", "everyone ate only fish", "many people ate lots of maize"],
    ["What is rare?", "written records of daily meals", "pottery", "maize", "Written records of daily meals are rare."],
    ["What do archaeologists do about food?", "combine many clues", "use one clue only", "stop looking", "archaeologists combine many clues about food"]], { picture: "🏺", pictureLabel: "A painted Maya cup" }),
  lesson("🤔", "Why farming mattered", [
    ["Maize gave the Maya most of their energy.", "What gave the Maya most of their energy?", "maize", "iron", "gold"],
    ["Farmers worked hard, but they also needed to share and store food.", "What did farmers need to do with food?", "share and store it", "throw it away", "sell it to Rome"],
    ["Cities collected food and goods from farmers.", "What did cities collect?", "food and goods from farmers", "swords from Sparta", "ships from Athens"],
    ["Important people held feasts with cacao.", "What did important people hold?", "feasts", "Olympic Games", "jury trials"],
    ["If harvests failed, many people went hungry.", "What happened if harvests failed?", "many people went hungry", "nothing changed", "everyone moved to Greece"],
    ["Good farming helped cities grow bigger.", "What helped cities grow bigger?", "good farming", "no farming", "fewer farmers"]],
    sort("Helped cities or caused trouble?", ["Helped cities", "Caused trouble"], [["good farming", 0], ["storing food", 0], ["failed harvests", 1]], ["good farming", "store", "harvests failed"])),
]);
