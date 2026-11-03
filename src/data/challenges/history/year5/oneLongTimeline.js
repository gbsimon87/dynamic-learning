import { lesson, detective, sort, order, year5Topic, LONG_TIMELINE } from "./authoring.js";
export const oneLongTimeline = year5Topic(["https://www.britishmuseum.org/learn/schools", "https://www.worldhistory.org/timeline/", "https://www.english-heritage.org.uk/learn/"], [
  lesson("📈", "BC and AD", [
    ["BC dates count down towards the year AD 1.", "How do BC dates count?", "down towards AD 1", "up towards AD 1", "up and away from AD 1"],
    ["So 2600 BC is older than 776 BC.", "Which date is older?", "2600 BC", "776 BC", "AD 43"],
    ["Skara Brae was lived in about 3100 BC.", "When was Skara Brae lived in?", "about 3100 BC", "about 776 BC", "AD 43"],
    ["Egypt's Great Pyramid was built about 2600 BC.", "What was built about 2600 BC?", "Egypt's Great Pyramid", "the Parthenon", "Chichen Itza"],
    ["The first Olympic Games were held in 776 BC.", "What was held in 776 BC?", "the first Olympic Games", "the first Maya city", "the Norman invasion"],
    ["Romans invaded Britain in AD 43.", "When did Romans invade Britain?", "AD 43", "776 BC", "AD 1066"]],
    sort("BC or AD?", ["BC (before AD 1)", "AD"], [["Skara Brae", 0], ["Olympic Games", 0], ["Great Pyramid", 0], ["Romans invaded", 1]], ["Skara Brae", "Olympic Games", "Great Pyramid", "Romans invaded"])),
  lesson("📅", "Years 3 to 5 in order", [
    ["People lived at Skara Brae about 3100 BC.", "When did people live at Skara Brae?", "about 3100 BC", "about 508 BC", "AD 43"],
    ["Egypt's Great Pyramid was built about 2600 BC.", "What was built about 2600 BC?", "Egypt's Great Pyramid", "the Parthenon", "Tikal's temples"],
    ["Athens began democracy about 508 BC.", "When did Athens begin democracy?", "about 508 BC", "AD 43", "336 BC"],
    ["Alexander the Great became king in 336 BC.", "When did Alexander become king?", "336 BC", "508 BC", "AD 250"],
    ["Romans invaded Britain in AD 43.", "When did Romans invade Britain?", "AD 43", "336 BC", "AD 250"],
    ["Classic Maya cities began growing about AD 250.", "When did Classic Maya cities begin growing?", "about AD 250", "AD 43", "336 BC"]],
    order("Order the events, oldest first.", ["Skara Brae · about 3100 BC", "Great Pyramid · about 2600 BC", "Athens democracy · about 508 BC", "Alexander king · 336 BC", "Romans invade Britain · AD 43"], ["3100 BC", "2600 BC", "508 BC", "336 BC", "AD 43"]), LONG_TIMELINE),
  detective(["A timeline puts events in order from left to right.", "The oldest event is on the left.", "A long gap means a long time passed.", "Some things happened at the same time in different places.", "While Romans ruled Britain, Classic Maya cities were growing in Central America.", "While Vikings raided Britain, the southern Maya were leaving their cities.", "A timeline cannot tell us how people lived."],
    [
    ["Where is the oldest event on a timeline?", "on the left", "on the right", "in the middle", "The oldest event is on the left."],
    ["What does a long gap mean?", "a long time passed", "an event was missing", "the events were the same", "A long gap means a long time passed."],
    ["What can happen in different places?", "things at the same time", "only one thing at a time", "nothing at all", "happened at the same time in different places"],
    ["Who ruled Britain while Classic Maya cities were growing?", "the Romans", "the Greeks", "the Vikings", "While Romans ruled Britain"],
    ["What was happening in Britain while the southern Maya left their cities?", "Viking raids", "Roman rule", "Stone Age farming", "While Vikings raided Britain"],
    ["What can a timeline not tell us?", "how people lived", "which came first", "which is oldest", "cannot tell us how people lived"],
    ["How does a timeline order events?", "from left to right, oldest first", "from right to left", "by colour", "in order from left to right"]], { picture: "📈", pictureLabel: "A timeline" }),
  lesson("🤔", "Change and connections", [
    ["Many things changed between 3100 BC and AD 1066.", "What happened between 3100 BC and AD 1066?", "many things changed", "nothing changed", "only one thing changed"],
    ["Stone tools gave way to bronze, then iron.", "What came after stone tools?", "bronze, then iron", "plastic", "glass"],
    ["Civilisations in Egypt, Greece and Rome built great cities.", "Who built great cities?", "Egypt, Greece and Rome", "only Britain", "only Vikings"],
    ["The Maya had no contact with Britain, yet built great cities too.", "Did the Maya have contact with Britain?", "no", "yes, every day", "yes, by Roman roads"],
    ["Historians look for similarities across time and place.", "What do historians look for across time?", "similarities", "only dates", "only battles"],
    ["They also look for differences, because places are not the same.", "Why do they also look for differences?", "places are not the same", "all places are alike", "dates are secret"]],
    sort("Similarity or difference?", ["Similarity", "Difference"], [["great cities", 0], ["similarities", 0], ["not the same", 1], ["no contact", 1]], ["great cities", "similarities", "not the same", "no contact"])),
]);
