import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const angloSaxonKingdoms = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.english-heritage.org.uk/members-area/kids/saxons-vikings/vikings-in-england/"],
    [
  lesson("👑", "Anglo-Saxon Kingdoms", [
    ["Anglo-Saxon Britain had several kingdoms.", "Was there one kingdom at first?", "no, several kingdoms", "yes, one England", "yes, one Roman province"],
    ["Northumbria lay in the north.", "Which kingdom lay in the north?", "Northumbria", "Wessex", "East Anglia"],
    ["Mercia lay in the Midlands.", "Which kingdom lay in the Midlands?", "Mercia", "Wessex", "Northumbria"],
    ["East Anglia lay in the east.", "Which kingdom lay in the east?", "East Anglia", "Wessex", "Mercia"],
    ["Wessex lay in the south-west.", "Which kingdom lay in the south-west?", "Wessex", "Northumbria", "East Anglia"],
    ["Kings competed, and kingdom boundaries changed.", "What happened to boundaries?", "they changed", "they never changed", "they all disappeared immediately"]], sort("North and Midlands or south-west and east?", ["North / Midlands", "South-west / East"],
    [
    ["Northumbria", 0],
    ["Mercia", 0],
    ["Wessex", 1],
    ["East Anglia", 1]],
    ["Northumbria lay in the north", "Mercia lay in the Midlands", "East Anglia lay in the east", "Wessex lay in the south-west"]), false),
  lesson("👑", "Anglo-Saxon Kingdoms", [
    ["Roman rule came before the Anglo-Saxon kingdoms.", "What came first?", "Roman rule", "one kingdom of England", "Cnut's reign"],
    ["Several Anglo-Saxon kingdoms developed after settlement.", "What followed settlement?", "several kingdoms", "Roman conquest", "Edward's death"],
    ["Viking armies later conquered some kingdoms.", "Who later conquered some kingdoms?", "Viking armies", "Egyptian armies", "Stone Age farmers"],
    ["Wessex resisted under Alfred.", "Which kingdom resisted under Alfred?", "Wessex", "Ancient Sumer", "Roman Empire"],
    ["Athelstan united England in AD 927.", "Who united England in AD 927?", "Athelstan", "Caesar", "Edward the Confessor"],
    ["The timeline shows change from several kingdoms towards one.", "What change does it show?", "several kingdoms towards one", "one kingdom towards Rome", "Egypt becoming Wessex"]], order("Order the events, oldest first.", ["Roman rule", "Several Anglo-Saxon kingdoms", "Alfred resists in Wessex", "Athelstan unites England · AD 927"],
    ["Roman rule came before", "Several Anglo-Saxon kingdoms", "Wessex resisted under Alfred", "Athelstan united England"]), true),
  detective(["Our drawn map shows four kingdoms in approximate positions.", "Northumbria is north of Mercia on this drawing.", "Wessex is south-west of Mercia.", "East Anglia lies to the east.", "We made it to explain positions, not exact borders.", "Boundaries changed, so one map cannot show every date."],
    [
    ["What kind of map is this?", "our teaching drawing", "an original Anglo-Saxon map", "a photograph", "Our drawn map shows four kingdoms in approximate positions."],
    ["What is north of Mercia?", "Northumbria", "Wessex", "East Anglia", "Northumbria is north of Mercia on this drawing."],
    ["What is south-west of Mercia?", "Wessex", "Northumbria", "East Anglia", "Wessex is south-west of Mercia."],
    ["Which kingdom lies east?", "East Anglia", "Wessex", "Northumbria", "East Anglia lies to the east."],
    ["Why did we make this map?", "to explain positions", "to show exact borders always", "to record a king's speech", "We made it to explain positions, not exact borders."],
    ["What cannot one map show?", "every date's boundaries", "its own labels", "its approximate positions", "Boundaries changed, so one map cannot show every date."],
    ["Does the drawing show exact borders?", "no", "yes, every year", "yes, today's county borders", "We made it to explain positions, not exact borders."]], {"scene": "kingdoms"}),
  lesson("👑", "Anglo-Saxon Kingdoms", [
    ["A kingdom is land ruled by a king or queen.", "What is a kingdom?", "land ruled by a king or queen", "only a farm", "only a church"],
    ["Several kingdoms meant several centres of power.", "What did several kingdoms mean?", "several centres of power", "one ruler everywhere", "no rulers"],
    ["Rulers could make alliances as well as fight.", "What could rulers do besides fight?", "make alliances", "stop all farming", "end all trade"],
    ["Kingdom boundaries changed over time.", "What changed over time?", "kingdom boundaries", "the need for shelter", "the need for food"],
    ["People still farmed and traded under different rulers.", "What continued under different rulers?", "farming and trade", "one permanent border", "one ruler forever"],
    ["Later England grew from these changing kingdoms.", "What grew from the kingdoms?", "England", "Ancient Egypt", "the Roman Empire"]], sort("Power or everyday life?", ["Power", "Everyday life"],
    [
    ["making alliances", 0],
    ["changing rulers", 0],
    ["farming", 1],
    ["trading", 1]],
    ["Rulers could make alliances", "different rulers", "farmed and traded"]), false),
]);
