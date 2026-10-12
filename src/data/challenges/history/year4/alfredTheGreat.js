import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const alfredTheGreat = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.cambridge.org/core/books/abs/cambridge-anthology-of-british-medieval-latin/three-accounts-of-king-alfred-and-the-cakes/54F1B393DF7E5703C4CE0ADF1E9BB01D"],
    [
  lesson("🔥", "Alfred the Great", [
    ["Alfred ruled Wessex from AD 871 to AD 899.", "Which kingdom did Alfred rule?", "Wessex", "Northumbria", "Ancient Egypt"],
    ["He resisted Viking armies.", "Whom did he resist?", "Viking armies", "Roman legions", "Norman armies"],
    ["Alfred won the battle of Edington in AD 878.", "Which battle did Alfred win?", "Edington", "Hastings", "Waterloo"],
    ["He made an agreement with the Viking leader Guthrum.", "With whom did Alfred make an agreement?", "Guthrum", "Caesar", "Columba"],
    ["Fortified towns called burhs helped defend Wessex.", "What were burhs?", "fortified towns", "only ships", "only farms"],
    ["Alfred also encouraged learning and books.", "What else did Alfred encourage?", "learning and books", "ending all reading", "only raiding"]], sort("Defence or learning?", ["Defence", "Learning"],
    [
    ["burhs", 0],
    ["resisting armies", 0],
    ["books", 1]],
    ["resisted Viking armies", "burhs helped defend", "encouraged learning and books"]), false),
  lesson("🔥", "Alfred the Great", [
    ["The great army arrived in AD 865.", "Which event came first here?", "great army arriving", "Alfred becoming king", "Edington victory"],
    ["Alfred became king of Wessex in AD 871.", "When did Alfred become king?", "AD 871", "AD 793", "AD 1066"],
    ["He won at Edington in AD 878.", "Which happened after he became king?", "Edington victory", "Roman withdrawal", "Lindisfarne raid"],
    ["Burhs strengthened defence during his reign.", "What strengthened defence?", "burhs", "pyramids", "steam trains"],
    ["Alfred died in AD 899.", "Which event ended his reign?", "Alfred's death", "Cnut's coronation", "Edward's death"],
    ["Athelstan united England later, in AD 927.", "Who united England after Alfred?", "Athelstan", "Caesar", "Columba"]], order("Order the events, oldest first.", ["Great army · AD 865", "Alfred king · AD 871", "Edington · AD 878", "Alfred dies · AD 899", "Athelstan · AD 927"],
    ["AD 865", "AD 871", "AD 878", "AD 899", "later, in AD 927"]), true),
  detective(["A famous legend says Alfred forgot cakes beside a fire.", "It was written down long after Alfred's lifetime.", "Later writers used it to tell a memorable moral story.", "It is not an eyewitness record of the event.", "Contemporary accounts give stronger evidence for Edington.", "Our fire drawing illustrates the legend, not proof it happened."],
    [
    ["What does the legend say?", "Alfred forgot cakes", "Alfred built a pyramid", "Alfred invented photography", "A famous legend says Alfred forgot cakes beside a fire."],
    ["When was the legend written down?", "long after his lifetime", "during the battle itself", "before he was born", "It was written down long after Alfred's lifetime."],
    ["Why did later writers use it?", "a memorable moral story", "a modern photograph", "a precise battle map", "Later writers used it to tell a memorable moral story."],
    ["Is it an eyewitness record?", "no", "yes, from the cook's camera", "yes, written that day", "It is not an eyewitness record of the event."],
    ["What gives stronger battle evidence?", "contemporary accounts", "the cakes legend alone", "a modern cartoon alone", "Contemporary accounts give stronger evidence for Edington."],
    ["What is our drawing?", "an illustration of the legend", "proof the event happened", "an ancient photograph", "Our fire drawing illustrates the legend, not proof it happened."],
    ["Whose purpose should we examine?", "later writers'", "only modern bakers'", "only raiders'", "Later writers used it to tell a memorable moral story."]], {"scene": "cakes"}),
  lesson("🔥", "Alfred the Great", [
    ["Winning at Edington helped Alfred keep power in Wessex.", "What did the victory help Alfred keep?", "power in Wessex", "power in Rome", "power in Egypt"],
    ["Burhs helped communities resist later attacks.", "What did burhs help communities do?", "resist attacks", "stop all farming", "forget all laws"],
    ["Agreements could reduce conflict as well as battles.", "What else could reduce conflict?", "agreements", "only more fighting", "only ignoring enemies"],
    ["Learning was another part of Alfred's work.", "What else mattered to Alfred?", "learning", "only treasure", "only ships"],
    ["Alfred did not rule all England as one kingdom.", "Did Alfred rule all England?", "no", "yes, the whole kingdom", "yes, every northern town"],
    ["The forgotten-cakes legend can be meaningful without proving an event.", "How should we treat a legend?", "meaningful but not proof", "proof of every detail", "evidence of nothing at all"]], sort("Supported history or legend?", ["Supported history", "Legend"],
    [
    ["Edington victory", 0],
    ["burhs", 0],
    ["forgotten cakes", 1]],
    ["Winning at Edington", "Burhs helped", "forgotten-cakes legend"]), false),
]);
