import { lesson, detective, sort, order, year5Topic } from "./authoring.js";
export const sourcesAndInterpretations = year5Topic(["https://www.britishmuseum.org/learn/schools", "https://www.worldhistory.org/Herodotus/", "https://www.britannica.com/topic/Maya-people"], [
  lesson("🔎", "Sources", [
    ["A source is something that gives us clues about the past.", "What is a source?", "something that gives clues about the past", "a place to grow food", "a kind of pot"],
    ["Archaeologists dig up pots, tools and buildings.", "What do archaeologists dig up?", "pots, tools and buildings", "modern phones", "old trains"],
    ["Writers such as Herodotus wrote accounts.", "Which early writer is named here?", "Herodotus", "Pakal", "Darius"],
    ["A primary source comes from the time being studied.", "What is a primary source?", "one from the time being studied", "one written last week", "one made by a film-maker"],
    ["A later book about the past is a secondary source.", "What is a secondary source?", "a later book about the past", "a pot from the time", "a carved stone from the time"],
    ["Using several sources is safer than using one.", "What is safer?", "using several sources", "using one source", "using no sources"]],
    sort("Primary or secondary?", ["Primary", "Secondary"], [["a dug-up pot", 0], ["a dug-up tool", 0], ["a later book", 1]], ["pots", "tools", "later book"])),
  lesson("📅", "Evidence over time", [
    ["Herodotus wrote about the Persian Wars in the 400s BC.", "When did Herodotus write?", "the 400s BC", "the 1870s", "2018"],
    ["Archaeologists began digging at Olympia in the 1870s.", "When did archaeologists begin digging at Olympia?", "the 1870s", "the 400s BC", "2018"],
    ["In the 1950s, Yuri Knorozov showed Maya glyphs stood for sounds.", "Who showed that Maya glyphs stood for sounds?", "Yuri Knorozov", "Herodotus", "Pakal"],
    ["In 2018, laser scans found thousands of hidden Maya buildings.", "What did laser scans find in 2018?", "hidden Maya buildings", "Greek temples", "Viking ships"],
    ["New evidence can change what historians think.", "What can new evidence change?", "what historians think", "what happened in the past", "nothing"],
    ["So history keeps being updated.", "What does history keep doing?", "being updated", "staying exactly the same", "disappearing"]],
    order("Order the discoveries, oldest first.", ["Herodotus writes · 400s BC", "Digging at Olympia · 1870s", "Knorozov's idea · 1950s", "Laser scans · 2018"], ["400s BC", "1870s", "1950s", "2018"])),
  detective(["Bishop Landa lived in Yucatan in the 1500s.", "He ordered many Maya books to be burned.", "He also wrote a book describing Maya life.", "Scholars use his book, but carefully.", "He wrote as a Spanish priest who wanted to change Maya beliefs.", "Maya carvings give another view, from the Maya themselves.", "Comparing both gives a stronger picture."],
    [
    ["Where did Landa live?", "Yucatan", "Athens", "Britain", "lived in Yucatan"],
    ["What did he order?", "Maya books burned", "new temples built", "Olympic Games held", "ordered many Maya books to be burned"],
    ["What else did he write?", "a book describing Maya life", "a poem about Athens", "a map of Greece", "a book describing Maya life"],
    ["How do scholars use his book?", "carefully", "without checking", "they never use it", "but carefully"],
    ["Why must we be careful?", "he wanted to change Maya beliefs", "he was a Maya king", "he never visited", "wanted to change Maya beliefs"],
    ["What do Maya carvings give us?", "a view from the Maya themselves", "a Spanish view", "a Greek view", "from the Maya themselves"],
    ["What gives a stronger picture?", "comparing both", "using only one", "using neither", "Comparing both gives a stronger picture."]], { picture: "📜", pictureLabel: "An old account of the Maya" }),
  lesson("🤔", "Interpretations", [
    ["An interpretation is an explanation of the past based on evidence.", "What is an interpretation?", "an explanation based on evidence", "a lucky guess", "a copy of a source"],
    ["Two historians can read the same evidence and disagree.", "What can two historians do?", "disagree about the same evidence", "never disagree", "never read"],
    ["The Maya collapse has several interpretations.", "Which event has several interpretations?", "the Maya collapse", "the Greek alphabet", "the Olympic wreath"],
    ["Some stress drought, while others stress war.", "What do some historians stress?", "drought, or war", "only crops", "only trade"],
    ["A good interpretation uses evidence and says what is uncertain.", "What does a good interpretation do?", "uses evidence and says what is uncertain", "ignores evidence", "hides doubts"],
    ["A weak interpretation ignores evidence that does not fit.", "What does a weak interpretation do?", "ignores evidence that does not fit", "uses lots of sources", "admits what is unknown"]],
    sort("Good or weak interpretation?", ["Good", "Weak"], [["uses evidence", 0], ["says what is uncertain", 0], ["ignores evidence", 1]], ["uses evidence", "uncertain", "ignores evidence"])),
]);
