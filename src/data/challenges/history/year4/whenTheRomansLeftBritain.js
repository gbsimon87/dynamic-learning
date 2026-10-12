import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const whenTheRomansLeftBritain = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.english-heritage.org.uk/learn/story-of-england/romans/"],
    [
  lesson("🚪", "When the Romans Left Britain", [
    ["Roman rule in Britain ended about AD 410.", "What ended about AD 410?", "Roman rule in Britain", "all farming in Britain", "all travel to Britain"],
    ["Britons now had to organise their own defence.", "Who organised defence after Roman rule ended?", "Britons", "Cnut's soldiers", "Athelstan's army"],
    ["Many Roman towns became smaller.", "What happened to many Roman towns?", "they became smaller", "they all grew larger", "they all vanished overnight"],
    ["Farming continued in the countryside.", "What continued in the countryside?", "farming", "Roman government", "Viking rule"],
    ["Angles, Saxons and Jutes later settled in Britain.", "Which groups later settled here?", "Angles, Saxons and Jutes", "Egyptian pharaohs", "Norman kings"],
    ["The western Roman Empire fell later, in AD 476.", "Which empire fell in AD 476?", "western Roman Empire", "Cnut's kingdom", "Wessex"]], sort("Ending or carrying on?", ["Ended", "Continued"],
    [
    ["Roman rule", 0],
    ["farming", 1],
    ["western Roman Empire", 0]],
    ["Roman rule", "Farming continued", "Empire fell"]), false),
  lesson("🚪", "When the Romans Left Britain", [
    ["Roman rule came before the withdrawal about AD 410.", "What came before the withdrawal?", "Roman rule", "Cnut's reign", "Edward's death"],
    ["The withdrawal came before the western empire fell in AD 476.", "Which came first?", "Roman withdrawal", "western empire falling", "Edward becoming king"],
    ["Anglo-Saxon kingdoms grew after Roman rule ended.", "Which grew after Roman rule?", "Anglo-Saxon kingdoms", "Roman imperial government", "pharaohs' kingdoms"],
    ["The Lindisfarne raid happened later, in AD 793.", "Which happened after kingdoms grew?", "Lindisfarne raid", "Roman conquest", "Stone Age farming"],
    ["The 'Earlier' line shows periods studied in Year 3.", "What does the 'Earlier' line show?", "earlier periods", "Edward's reign", "future events"],
    ["Timeline bands are labels, not equal lengths of time.", "Do these bands have equal durations?", "no", "yes, a year each", "yes, ten years each"]], order("Order the events, oldest first.", ["Roman rule", "Withdrawal · about AD 410", "Western empire falls · AD 476", "Lindisfarne raid · AD 793"],
    ["Roman rule came before", "withdrawal came before", "raid happened later"]), true),
  detective(["Archaeologists study buildings and objects left in the ground.", "Roman coins show rulers' names and faces.", "Coins were made to show authority and help trade.", "A coin cannot tell us every farmer's life.", "Writers described troubles, but chose what to record.", "Comparing written and buried evidence gives a fuller picture."],
    [
    ["Who studies buried buildings and objects?", "archaeologists", "only modern kings", "only sailors", "Archaeologists study buildings and objects left in the ground."],
    ["What can Roman coins show?", "rulers' names and faces", "everyone's thoughts", "the sound of a battle", "Roman coins show rulers' names and faces."],
    ["Why were coins made?", "authority and trade", "to photograph houses", "to record every meal", "Coins were made to show authority and help trade."],
    ["What cannot one coin describe?", "every farmer's life", "its visible design", "its ruler's image", "A coin cannot tell us every farmer's life."],
    ["What did writers choose?", "what to record", "which coins we find", "every reader's answer", "Writers described troubles, but chose what to record."],
    ["How can we get a fuller picture?", "compare different evidence", "use only one guess", "ignore all objects", "Comparing written and buried evidence gives a fuller picture."],
    ["Which two sources could we compare?", "a written account and a coin", "two guesses", "only a modern cartoon", "Comparing written and buried evidence gives a fuller picture."]], {"image": "cma-claudius-coin"}),
  lesson("🚪", "When the Romans Left Britain", [
    ["Ending Roman rule changed who governed Britain.", "What changed when Roman rule ended?", "who governed Britain", "the need for food", "the need for shelter"],
    ["Farmers still grew crops after the withdrawal.", "What shows continuity?", "farmers growing crops", "Roman rule ending", "new kingdoms forming"],
    ["Change did not happen everywhere at once.", "Did all places change together?", "no, changes took time", "yes, on one day", "yes, in one hour"],
    ["Some Roman roads remained useful.", "What could still be used?", "some Roman roads", "Roman governors forever", "only new Viking roads"],
    ["Britons and newcomers helped shape new communities.", "Who shaped new communities?", "Britons and newcomers", "only Roman emperors", "only Egyptian rulers"],
    ["Evidence helps us test claims about this change.", "How should we test a claim?", "use evidence", "guess confidently", "ignore old objects"]], sort("Change or continuity?", ["Change", "Continuity"],
    [
    ["new governors", 0],
    ["growing crops", 1],
    ["using some Roman roads", 1]],
    ["changed who governed", "still grew crops", "roads remained useful"]), false),
]);
