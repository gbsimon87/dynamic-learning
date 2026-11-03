import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const greekIdeasWeStillUse = year5Topic(["https://www.britishmuseum.org/learn/schools", "https://www.worldhistory.org/Ancient_Greece/", "https://www.britannica.com/place/ancient-Greece"], [
  lesson("💡", "Greek ideas today", [
    ["Many Greek ideas are still used today.", "What is true of many Greek ideas?", "they are still used today", "they are all forgotten", "they only appear in books"],
    ["Democracy is a Greek word, and many countries still vote.", "Which Greek word do many countries still use?", "democracy", "pharaoh", "longship"],
    ["The Olympic Games began in Greece and returned in 1896.", "When did the Games return?", "1896", "776 BC", "1066"],
    ["Our word alphabet comes from the Greek letters alpha and beta.", "Which Greek letters give us the word alphabet?", "alpha and beta", "A and Z", "one and two"],
    ["Greek-style columns decorate museums, banks and town halls.", "What decorates museums, banks and town halls?", "Greek-style columns", "pyramids", "longships"],
    ["Words like history, theatre and science come from Greek.", "Which word comes from Greek?", "theatre", "castle", "knight"]],
    sort("Words or buildings and sport?", ["Words", "Buildings and sport"], [["democracy", 0], ["alphabet", 0], ["history", 0], ["columns", 1], ["Olympic Games", 1]], ["Democracy", "alphabet", "history", "columns", "Olympic Games"])),
  lesson("📅", "Greek ideas travel through time", [
    ["The first Olympic Games were held in 776 BC.", "When were the first Games held?", "776 BC", "508 BC", "1896"],
    ["Athens began democracy about 508 BC.", "When did Athens begin democracy?", "about 508 BC", "776 BC", "AD 43"],
    ["The Romans admired and copied Greek art and buildings.", "Who copied Greek art and buildings?", "the Romans", "the Persians", "the Vikings"],
    ["The Romans invaded Britain in AD 43 and brought Greek-style art and buildings.", "What did the Romans bring to Britain?", "Greek-style art and buildings", "pyramids", "Maya numbers"],
    ["The British Museum's Greek-style building was begun in 1823.", "When was the British Museum's Greek-style building begun?", "1823", "776 BC", "AD 43"],
    ["The modern Olympic Games began in 1896.", "When did the modern Games begin?", "1896", "776 BC", "1823"]],
    order("Order the events, oldest first.", ["First Games · 776 BC", "Athens democracy · about 508 BC", "Romans arrive in Britain · AD 43", "British Museum begun · 1823", "Modern Olympics · 1896"], ["776 BC", "508 BC", "AD 43", "1823", "1896"]), GREEK_TIMELINE),
  detective(["Our drawing shows a Greek temple front.", "Many British buildings copy this shape, with columns and a triangle on top.", "Banks, museums and town halls often copy this style.", "Copying the style does not mean people copied Greek life.", "Architects chose it to look strong, old and important.", "We can spot the style by looking for columns and a triangle roof.", "A copied building is not an ancient Greek building."],
    [
    ["What does our drawing show?", "a Greek temple front", "a Roman fort", "a Viking ship", "Our drawing shows a Greek temple front."],
    ["What shape do many British buildings copy?", "columns with a triangle on top", "pyramid steps", "round huts", "columns and a triangle on top"],
    ["Which buildings often copy this style?", "banks, museums and town halls", "only castles", "only farms", "Banks, museums and town halls often copy this style."],
    ["Does copying the style mean Greek life was copied?", "no", "yes, completely", "yes, every law", "does not mean people copied Greek life"],
    ["Why did architects choose it?", "to look strong, old and important", "to save money", "to hide from Persia", "to look strong, old and important"],
    ["What can we look for to spot the style?", "columns and a triangle roof", "pointed arches and glass", "thatch and mud", "looking for columns and a triangle roof"],
    ["Is a copied building ancient Greek?", "no, it only copies the Greek style", "yes, it is ancient Greek", "yes, it was built by Alexander", "A copied building is not an ancient Greek building."]], { scene: "y5-parthenon", picture: "🏛️", pictureLabel: "A Greek temple front" }),
  lesson("🤔", "Where ideas come from", [
    ["Not every modern idea began in Greece.", "Did every modern idea begin in Greece?", "no", "yes, every one", "yes, all of them"],
    ["Earlier civilisations, such as Egypt and Sumer, also gave us ideas.", "Which earlier civilisations also gave us ideas?", "Egypt and Sumer", "Vikings and Normans", "Romans and Britons"],
    ["The Greeks learned from Egypt and Persia, and changed what they learned.", "What did the Greeks do with ideas they learned?", "changed them", "burned them", "hid them"],
    ["Ideas travelled because people traded, travelled and wrote.", "Why did ideas travel?", "people traded, travelled and wrote", "they flew in aeroplanes", "nobody left home"],
    ["Historians ask which ideas lasted and why.", "What do historians ask about ideas?", "which lasted and why", "which cost most", "which were red"],
    ["Greek ideas did not stay the same, because people changed them.", "What happened to Greek ideas?", "people changed them", "they never changed", "they were forgotten at once"]],
    sort("Where ideas came from or how they travelled?", ["Where they came from", "How they travelled"], [["Egypt", 0], ["Sumer", 0], ["trading", 1], ["writing", 1]], ["Egypt", "Sumer", "traded", "wrote"])),
]);
