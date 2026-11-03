import { lesson, detective, sort, order, year5Topic } from "./authoring.js";
export const comparingPastSocieties = year5Topic(["https://www.britishmuseum.org/learn/schools", "https://www.worldhistory.org/Maya_Civilization/", "https://www.worldhistory.org/Ancient_Greece/"], [
  lesson("⚖️", "Greece and the Maya", [
    ["Historians compare societies to see what is similar and different.", "Why do historians compare societies?", "to see similarities and differences", "to pick a winner", "to hide differences"],
    ["Greece had city-states, and so did the Maya.", "What did both Greece and the Maya have?", "city-states", "one empire", "no towns"],
    ["Greek writing used an alphabet, but Maya writing used glyphs.", "What did Greek writing use?", "an alphabet", "glyphs", "dots and bars"],
    ["Both Greeks and Maya built great temples.", "What did both build?", "great temples", "only huts", "only ships"],
    ["Athens had democracy, but Maya cities had kings.", "What did Athens have that Maya cities did not?", "democracy", "kings", "temples"],
    ["Both societies farmed, traded and told myths.", "What did both societies do?", "farmed, traded and told myths", "built railways", "used printing presses"]],
    sort("Greek or Maya?", ["Greek", "Maya"], [["alphabet", 0], ["democracy", 0], ["glyphs", 1], ["kings", 1]], ["alphabet", "democracy", "glyphs", "kings"])),
  lesson("📅", "Societies in time", [
    ["Greek city-states grew up about 800 BC.", "When did Greek city-states grow up?", "about 800 BC", "AD 43", "AD 927"],
    ["Romans invaded Britain in AD 43.", "When did Romans invade Britain?", "AD 43", "about 800 BC", "AD 793"],
    ["Classic Maya cities began to grow about AD 250.", "When did Classic Maya cities begin to grow?", "about AD 250", "AD 43", "AD 927"],
    ["The Romans left Britain about AD 410.", "When did the Romans leave Britain?", "about AD 410", "AD 43", "AD 793"],
    ["Vikings raided Lindisfarne in AD 793.", "When did Vikings raid Lindisfarne?", "AD 793", "AD 250", "AD 927"],
    ["Athelstan became the first king of England in AD 927.", "When did Athelstan become king of England?", "AD 927", "AD 793", "AD 43"]],
    order("Order the events, oldest first.", ["Greek city-states · about 800 BC", "Romans invade Britain · AD 43", "Maya cities grow · about AD 250", "Vikings raid Lindisfarne · AD 793", "Athelstan king · AD 927"], ["800 BC", "AD 43", "AD 250", "AD 793", "AD 927"])),
  detective(["Greek painted vases show runners, sailors and gods.", "Maya painted pots show kings, gods and feasts.", "Both were made by skilled painters.", "Both can show what people thought was important.", "Neither shows ordinary days very often.", "Each was made for people with money and power.", "So both sources can leave out ordinary people."],
    [
    ["What do Greek vases show?", "runners, sailors and gods", "kings and feasts", "trains and cars", "runners, sailors and gods"],
    ["What do Maya pots show?", "kings, gods and feasts", "runners and sailors", "tractors", "kings, gods and feasts"],
    ["Who made both?", "skilled painters", "Roman soldiers", "Spanish priests", "Both were made by skilled painters."],
    ["What can both show?", "what people thought was important", "every ordinary day", "photographs", "what people thought was important"],
    ["What do neither show very often?", "ordinary days", "gods", "kings", "Neither shows ordinary days very often."],
    ["Who were they made for?", "people with money and power", "everyone equally", "only children", "made for people with money and power"],
    ["What might these sources leave out?", "ordinary people", "all rich people", "all gods", "can leave out ordinary people"]], { picture: "🏺", pictureLabel: "A painted pot" }),
  lesson("🤔", "Alike and different", [
    ["Britain in AD 900 had kings, farms and Christian churches.", "What did Britain have in AD 900?", "kings, farms and churches", "pyramids and ball courts", "democracy and juries"],
    ["The Maya had kings, farms and temples to many gods.", "What did the Maya have?", "kings, farms and temples", "no kings", "no farms"],
    ["Britain used iron tools, but the Maya built with stone tools.", "What did the Maya build with?", "stone tools", "iron tools", "steel cranes"],
    ["Britain wrote on parchment, but the Maya wrote on bark paper and stone.", "What did the Maya write on?", "bark paper and stone", "parchment only", "clay tablets"],
    ["Both Britain and Maya cities had powerful rulers who fought rivals.", "What was true of both?", "powerful rulers fought rivals", "nobody fought", "there were no rulers"],
    ["Historians do not call one society better, only different.", "What do historians say about societies?", "different, not better", "one is always better", "only Britain mattered"]],
    sort("Britain or the Maya?", ["Britain in AD 900", "The Maya"], [["iron tools", 0], ["parchment", 0], ["stone tools", 1], ["bark paper", 1]], ["iron tools", "parchment", "stone tools", "bark paper"])),
]);
