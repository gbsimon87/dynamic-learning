import { lesson, detective, sort, order, year5Topic, MAYA_TIMELINE } from "./authoring.js";
export const chichenItzaAndMayaPyramids = year5Topic(["https://whc.unesco.org/en/list/483/", "https://www.worldhistory.org/Chichen_Itza/", "https://www.britannica.com/place/Chichen-Itza"], [
  lesson("🛕", "Chichen Itza", [
    ["Chichen Itza is a Maya city in northern Mexico.", "Where is Chichen Itza?", "northern Mexico", "southern Egypt", "western Greece"],
    ["Its biggest pyramid is called El Castillo.", "What is its biggest pyramid called?", "El Castillo", "the Parthenon", "Stonehenge"],
    ["El Castillo has steps up all four sides, and a temple on top.", "What is on top of El Castillo?", "a temple", "a ship", "a theatre"],
    ["The temple honoured Kukulkan, the feathered snake god.", "Who did the temple honour?", "Kukulkan, the feathered snake god", "Zeus, king of the gods", "Athena, goddess of wisdom"],
    ["Chichen Itza also has a huge ball court.", "What else does Chichen Itza have?", "a huge ball court", "a Roman bath", "a Viking harbour"],
    ["Today it is a World Heritage Site.", "What is it today?", "a World Heritage Site", "a Spanish fort", "a modern city"]],
    sort("A building or a god?", ["A building", "A god"], [["El Castillo", 0], ["ball court", 0], ["temple", 0], ["Kukulkan", 1]], ["El Castillo", "ball court", "temple", "Kukulkan"])),
  lesson("📅", "Chichen Itza through time", [
    ["Chichen Itza began as a Maya town before AD 900.", "When was Chichen Itza already a town?", "before AD 900", "after AD 1988", "before 2000 BC"],
    ["It became very powerful from about AD 900.", "When did it become very powerful?", "from about AD 900", "from 2000 BC", "from AD 1988"],
    ["Its famous buildings were mostly built between AD 800 and 1100.", "When were its famous buildings mostly built?", "between AD 800 and 1100", "between 2000 and 1500 BC", "between AD 1500 and 1900"],
    ["In the 1500s, Spanish soldiers reached Yucatan.", "Who reached Yucatan in the 1500s?", "Spanish soldiers", "Roman soldiers", "Viking raiders"],
    ["Many Maya people stayed and kept their language and customs.", "What did many Maya people do?", "kept their language and customs", "disappeared", "moved to Greece"],
    ["In 1988, UNESCO made Chichen Itza a World Heritage Site.", "When did UNESCO make it a World Heritage Site?", "1988", "AD 900", "the 1500s"]],
    order("Order the events, oldest first.", ["Town · before AD 900", "Very powerful · from about AD 900", "Spanish arrive · 1500s", "World Heritage Site · 1988"], ["before AD 900", "from about AD 900", "1500s", "1988"]), MAYA_TIMELINE),
  detective(["Our drawing shows a Maya stepped pyramid with a temple on top.", "Egyptian pyramids had smooth sides, but Maya pyramids had steps.", "People climbed the steps for ceremonies.", "Some Maya pyramids covered tombs, but not all.", "Archaeologists dig into pyramids to find older buildings inside.", "Inside El Castillo, they found a smaller, older pyramid.", "Our drawing is not an exact copy of El Castillo."],
    [
    ["What does our drawing show?", "a stepped pyramid with a temple on top", "a smooth-sided Egyptian pyramid", "a Greek temple", "a Maya stepped pyramid with a temple on top"],
    ["How were Maya pyramids different from Egyptian ones?", "they had steps", "they had smooth sides", "they were made of ice", "Maya pyramids had steps"],
    ["What did people do on the steps?", "climbed for ceremonies", "sold fish", "raced chariots", "People climbed the steps for ceremonies."],
    ["What did some Maya pyramids cover?", "tombs", "ships", "farms", "Some Maya pyramids covered tombs"],
    ["What do archaeologists dig to find?", "older buildings inside pyramids", "Greek vases", "Roman roads", "dig into pyramids to find older buildings inside"],
    ["What was found inside El Castillo?", "a smaller, older pyramid", "a Viking ship", "a Greek statue", "they found a smaller, older pyramid"],
    ["Is our drawing exact?", "no, it is not an exact copy", "yes, it is exact", "yes, it is a photograph", "Our drawing is not an exact copy of El Castillo."]], { scene: "y5-maya-pyramid", picture: "🛕", pictureLabel: "A Maya pyramid" }),
  lesson("🤔", "Why build pyramids?", [
    ["Maya pyramids were temples, not just tombs.", "What were Maya pyramids?", "temples, not just tombs", "only tombs", "only markets"],
    ["Building one took thousands of workers and years of work.", "What did building one take?", "thousands of workers and years", "one worker and one day", "machines and cranes"],
    ["Builders cut stone with stone tools.", "What did builders cut stone with?", "stone tools", "steel saws", "iron hammers"],
    ["Rulers could show power by ordering great buildings.", "How could rulers show power?", "by ordering great buildings", "by hiding gold", "by sailing away"],
    ["Parthenon builders also showed power with a huge temple.", "Who else showed power with a huge temple?", "the Parthenon's builders", "Viking raiders", "Roman soldiers"],
    ["Both Maya and Greek temples were built for gods.", "What were both Maya and Greek temples built for?", "gods", "markets", "races"]],
    sort("Work to build or reason to build?", ["Work to build", "Reason to build"], [["thousands of workers", 0], ["stone tools", 0], ["temples", 1], ["show power", 1]], ["thousands of workers", "stone tools", "temples", "show power"])),
]);
