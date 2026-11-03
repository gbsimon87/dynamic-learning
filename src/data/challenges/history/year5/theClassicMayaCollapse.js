import { lesson, detective, sort, order, year5Topic, MAYA_TIMELINE } from "./authoring.js";
export const theClassicMayaCollapse = year5Topic(["https://www.britannica.com/topic/Maya-people", "https://www.worldhistory.org/Maya_Civilization/", "https://www.worldhistory.org/article/1397/the-collapse-of-the-classic-maya/"], [
  lesson("🍂", "The Classic Maya collapse", [
    ["The Classic Maya period lasted from about AD 250 to 900.", "When was the Classic Maya period?", "about AD 250 to 900", "about 776 BC to 146 BC", "about AD 1500 to 1900"],
    ["After about AD 800, cities in the south grew smaller.", "What happened after about AD 800?", "southern cities grew smaller", "every city grew", "northern cities vanished"],
    ["Many kings stopped building new monuments.", "What did many kings stop doing?", "building new monuments", "farming maize", "using calendars"],
    ["People left some cities, and forest slowly covered the buildings.", "What slowly covered the buildings?", "forest", "snow", "sand"],
    ["Historians call this the Classic Maya collapse.", "What do historians call this?", "the Classic Maya collapse", "the Persian Wars", "the Great Heathen Army"],
    ["But the Maya people did not disappear.", "Did the Maya people disappear?", "no", "yes, all of them", "yes, by AD 900"]],
    sort("What happened or did not happen?", ["What happened", "What did not happen"], [["cities grew smaller", 0], ["kings stopped monuments", 0], ["forest covered buildings", 0], ["Maya people disappeared", 1]], ["grew smaller", "stopped building new monuments", "forest slowly covered", "did not disappear"])),
  lesson("📅", "The collapse in order", [
    ["In AD 250, Classic Maya cities began to grow.", "When did Classic cities begin to grow?", "AD 250", "AD 869", "AD 1500"],
    ["Many cities were at their largest in the AD 700s.", "When were many cities at their largest?", "the AD 700s", "the AD 1500s", "the AD 100s"],
    ["From about AD 800, many southern cities declined.", "What happened from about AD 800?", "southern cities declined", "all cities grew", "Spanish soldiers arrived"],
    ["The last dated monument at Tikal was set up in AD 869.", "When was Tikal's last dated monument set up?", "AD 869", "AD 250", "AD 750"],
    ["Chichen Itza became powerful in the north about AD 900.", "Which northern city became powerful about AD 900?", "Chichen Itza", "Tikal", "Athens"],
    ["Today millions of Maya people live in Central America.", "How many Maya people live there today?", "millions", "none", "only a few"]],
    order("Order the events, oldest first.", ["Cities grow · AD 250", "Cities at largest · AD 700s", "Southern decline · from AD 800", "Tikal's last date · AD 869", "Chichen Itza powerful · about AD 900"], ["AD 250", "AD 700s", "AD 800", "AD 869", "AD 900"]), MAYA_TIMELINE),
  detective(["Scientists study mud from lake beds and stone in caves.", "These show how much rain fell each year.", "They suggest long dry periods, called droughts, around the time cities declined.", "Carvings and writing also show more fighting between cities.", "No single clue explains everything.", "Historians think several causes worked together.", "They keep testing ideas as new evidence appears."],
    [
    ["What do scientists study?", "lake mud and cave stone", "Greek vases", "Roman coins", "mud from lake beds and stone in caves"],
    ["What do these show?", "how much rain fell", "who ruled each city", "what people ate daily", "how much rain fell each year"],
    ["What are droughts?", "long dry periods", "heavy floods", "long cold winters", "long dry periods, called droughts"],
    ["What else shows trouble?", "more fighting between cities", "more Olympic Games", "more theatres", "more fighting between cities"],
    ["Does one clue explain everything?", "no", "yes, drought only", "yes, war only", "No single clue explains everything."],
    ["What do historians think?", "several causes worked together", "one cause only", "no one knows anything", "several causes worked together"],
    ["What do they do as new evidence appears?", "keep testing ideas", "stop studying", "ignore it", "keep testing ideas as new evidence appears"]], { picture: "🔎", pictureLabel: "Scientists studying clues" }),
  lesson("🤔", "Causes and results", [
    ["Historians suggest drought, war and overused farmland all played a part.", "What do historians suggest played a part?", "drought, war and overused farmland", "only a volcano", "only Greek invaders"],
    ["Cities with huge populations needed lots of food and water.", "What did big cities need?", "lots of food and water", "lots of metal", "lots of ships"],
    ["When farming failed, rulers lost trust.", "What happened when farming failed?", "rulers lost trust", "rulers grew richer", "nothing changed"],
    ["Some people moved north or to smaller towns.", "Where did some people move?", "north or to smaller towns", "to Greece", "to Britain"],
    ["Chichen Itza and other northern cities grew.", "What grew in the north?", "Chichen Itza and other cities", "Rome", "Athens"],
    ["This was a big change, but not the end of Maya culture.", "What was this?", "a big change but not the end", "the end of the Maya", "a small change nobody noticed"]],
    sort("A cause or a result?", ["A cause", "A result"], [["drought", 0], ["war", 0], ["overused farmland", 0], ["people moved north", 1], ["rulers lost trust", 1]], ["drought", "war", "overused farmland", "moved north", "rulers lost trust"])),
]);
