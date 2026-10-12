import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const fromRomansTo1066 = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.english-heritage.org.uk/members-area/kids/saxons-vikings/vikings-in-england/"],
    [
  lesson("📈", "From Romans to 1066", [
    ["Roman rule ended about AD 410.", "Which rule ended about AD 410?", "Roman rule", "Cnut's rule", "Edward's rule"],
    ["Anglo-Saxon kingdoms developed over the following centuries.", "What developed after Roman rule?", "Anglo-Saxon kingdoms", "Ancient Egypt", "Roman imperial rule again"],
    ["Vikings came as raiders, traders and settlers.", "What roles did Vikings have?", "raiders, traders and settlers", "only raiders", "only kings"],
    ["Alfred resisted in Wessex.", "Where did Alfred resist?", "Wessex", "Egypt", "Rome"],
    ["Athelstan united England in AD 927.", "Who united England?", "Athelstan", "Columba", "Caesar"],
    ["Edward the Confessor ruled England and died in AD 1066.", "Whose death ends our main story?", "Edward the Confessor's", "Alfred's", "Cnut's"]], sort("Earlier kingdoms or united England?", ["Earlier kingdoms", "United England"],
    [
    ["Wessex under Alfred", 0],
    ["Athelstan in AD 927", 1],
    ["Edward's England", 1]],
    ["Alfred resisted in Wessex", "Athelstan united England", "Edward the Confessor"]), false),
  lesson("📈", "From Romans to 1066", [
    ["Roman withdrawal came first, about AD 410.", "What came first here?", "Roman withdrawal", "Lindisfarne raid", "Cnut's reign"],
    ["The Lindisfarne raid came later, in AD 793.", "What belongs to AD 793?", "Lindisfarne raid", "Roman withdrawal", "Edward's death"],
    ["The great army arrived in AD 865.", "What happened in AD 865?", "great army arriving", "Athelstan's unification", "Cnut's reign"],
    ["Alfred won at Edington in AD 878.", "Who won at Edington?", "Alfred", "Cnut", "Edward"],
    ["Athelstan united England in AD 927; Cnut became king in AD 1016.", "Which came first?", "Athelstan's unification", "Cnut becoming king", "Edward's death"],
    ["Edward ruled from AD 1042 and died in AD 1066.", "Who ruled last on this timeline?", "Edward", "Alfred", "Athelstan"]], order("Order the events, oldest first.", ["Roman withdrawal · about AD 410", "Lindisfarne raid · AD 793", "Alfred at Edington · AD 878", "Athelstan · AD 927", "Edward dies · AD 1066"],
    ["withdrawal came first", "raid came later", "Alfred won", "Athelstan united", "Edward ruled"]), true),
  detective(["Our sources include objects, documents and modern teaching drawings.", "Craftworkers made objects for use or display.", "Writers chose words for particular readers and purposes.", "Our drawings explain ideas but are not original artefacts.", "Coins can show authority; discarded shoes can show everyday life.", "One source rarely answers every question."],
    [
    ["Which kinds of sources are included?", "objects, documents and drawings", "only photographs", "only legends", "Our sources include objects, documents and modern teaching drawings."],
    ["Why did craftworkers make objects?", "use or display", "only future museums", "only modern tests", "Craftworkers made objects for use or display."],
    ["What did writers consider?", "readers and purposes", "no audience at all", "only modern tourists", "Writers chose words for particular readers and purposes."],
    ["Are our drawings original artefacts?", "no", "yes, ancient objects", "yes, excavated finds", "Our drawings explain ideas but are not original artefacts."],
    ["Which source helps investigate everyday clothing?", "discarded shoes", "only royal coins", "only written praise", "Coins can show authority; discarded shoes can show everyday life."],
    ["Can one source answer everything?", "rarely", "yes, always", "yes, no others needed", "One source rarely answers every question."],
    ["What question should a historian ask?", "who made this and why", "only whether it looks pretty", "only today's price", "Writers chose words for particular readers and purposes."]], {"image": "cma-anglo-saxon-brooch"}),
  lesson("📈", "From Romans to 1066", [
    ["Rulers and kingdoms changed between AD 410 and AD 1066.", "What changed across this period?", "rulers and kingdoms", "the need for food", "the need for shelter"],
    ["Farming and the need for shelter continued.", "What shows continuity?", "farming and shelter", "one ruler forever", "unchanged borders everywhere"],
    ["Migration and trade brought languages, goods and ideas.", "What did migration and trade bring?", "languages, goods and ideas", "only armies", "only coins"],
    ["Conflict caused harm, while agreements could reduce it.", "What could reduce conflict?", "agreements", "only more fighting", "ignoring all disputes"],
    ["Different communities experienced changes differently.", "Did every community experience identical change?", "no", "yes, all alike", "yes, on the same day"],
    ["Later in 1066, William of Normandy conquered England.", "What happened next in 1066?", "William conquered England", "Roman rule returned", "Columba founded Iona"],
    ["We explain history best by comparing evidence and viewpoints.", "How can we explain history carefully?", "compare evidence and viewpoints", "repeat one stereotype", "ignore everyday lives"]], sort("Change or continuity?", ["Change", "Continuity"],
    [
    ["new kingdoms", 0],
    ["farming", 1],
    ["needing shelter", 1],
    ["new language influences", 0]],
    ["Rulers and kingdoms changed", "Farming and the need for shelter continued", "brought languages"]), false),
]);
