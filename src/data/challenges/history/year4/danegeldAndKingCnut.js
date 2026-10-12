import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const danegeldAndKingCnut = year4Topic(["https://www.royal.uk/canute-great-r-1016-1035", "https://www.english-heritage.org.uk/members-area/kids/saxons-vikings/vikings-in-england/", "https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.english-heritage.org.uk/learn/teaching-resources/story-of-1066/collectible-6/"],
    [
  lesson("💰", "Danegeld and King Cnut", [
    ["Danegeld was money paid to Viking forces.", "What was Danegeld?", "money paid to Viking forces", "a type of longship", "a monastery book"],
    ["Rulers hoped payments would stop attacks.", "Why pay Danegeld?", "to try to stop attacks", "to build pyramids", "to buy printed books"],
    ["Payments did not always prevent more attacks.", "Did payments always stop attacks?", "no", "yes, forever", "yes, everywhere"],
    ["Aethelred ruled during renewed Viking attacks.", "Which ruler faced renewed attacks?", "Aethelred", "Caesar", "Columba"],
    ["Cnut became king of England in AD 1016.", "Who became king in AD 1016?", "Cnut", "Alfred", "Athelstan"],
    ["Cnut also ruled Denmark and Norway.", "Which other kingdoms did Cnut rule?", "Denmark and Norway", "Egypt and Sumer", "Rome and Greece"]], sort("Payment or ruler?", ["Payment", "Ruler"],
    [
    ["Danegeld", 0],
    ["Aethelred", 1],
    ["Cnut", 1]],
    ["Danegeld was money", "Aethelred ruled", "Cnut became king"]), false),
  lesson("💰", "Danegeld and King Cnut", [
    ["Athelstan united England in AD 927.", "Which event came first here?", "Athelstan's unification", "Cnut's reign", "Edward's reign"],
    ["Viking attacks returned strongly in the AD 990s.", "What returned in the AD 990s?", "Viking attacks", "Roman government", "Stone Age farming"],
    ["Rulers made large payments during renewed attacks.", "When did rulers make these payments?", "during renewed attacks", "only during Roman rule", "only after Edward's death"],
    ["Cnut became king in AD 1016.", "What happened in AD 1016?", "Cnut became king", "Lindisfarne raid", "Edington"],
    ["Cnut died in AD 1035.", "What happened in AD 1035?", "Cnut died", "Alfred became king", "Roman rule ended"],
    ["Edward the Confessor became king in AD 1042.", "Who became king after Cnut's reign?", "Edward the Confessor", "Alfred", "Caesar"]], order("Order the events, oldest first.", ["Athelstan · AD 927", "Renewed attacks · AD 990s", "Cnut king · AD 1016", "Cnut dies · AD 1035", "Edward king · AD 1042"],
    ["AD 927", "AD 990s", "AD 1016", "AD 1035", "AD 1042"]), true),
  detective(["A later story says Cnut commanded the tide to stop.", "The tide kept coming in.", "The story explains limits to royal power.", "It was written later, not recorded by an eyewitness.", "A storyteller chose events to teach a lesson.", "It does not prove the event happened exactly as told."],
    [
    ["What does the later story describe?", "Cnut commanding the tide", "Cnut building a pyramid", "Cnut inventing a camera", "A later story says Cnut commanded the tide to stop."],
    ["What happened to the tide in the story?", "it kept coming in", "it obeyed completely", "it turned to stone", "The tide kept coming in."],
    ["What idea does the story explain?", "limits to royal power", "kings control nature", "the end of all trade", "The story explains limits to royal power."],
    ["Is it an eyewitness record?", "no", "yes, a photograph", "yes, a live recording", "It was written later, not recorded by an eyewitness."],
    ["Why did the storyteller use it?", "to teach a lesson", "to measure every tide", "to list every tax", "A storyteller chose events to teach a lesson."],
    ["What cannot the story prove?", "the event happened exactly as told", "its intended lesson", "what its words describe", "It does not prove the event happened exactly as told."],
    ["Does the story say kings can control nature?", "no, it shows limits", "yes, all nature", "yes, every sea", "The story explains limits to royal power."]], {"scene": "cnut-tide"}),
  lesson("💰", "Danegeld and King Cnut", [
    ["Danegeld was an attempt to avoid more harm from attacks.", "What was the payment trying to avoid?", "more harm from attacks", "all trade", "all farming"],
    ["Collecting payments placed a burden on communities.", "What could payments do to communities?", "create a burden", "remove all work", "guarantee wealth for everyone"],
    ["Paying could bring a pause, but not lasting safety.", "What could payment bring?", "a pause without guaranteed safety", "safety forever", "the end of all armies"],
    ["Cnut's rule connected England with Scandinavian kingdoms.", "What did Cnut's rule connect?", "England and Scandinavian kingdoms", "England and Egypt only", "Rome and Greece only"],
    ["People continued living and trading under a new king.", "What shows continuity?", "living and trading", "a new king", "a new royal connection"],
    ["A legend and a royal record answer different questions.", "How should we use different sources?", "ask what each can tell us", "treat all as identical proof", "ignore royal records"]], sort("Change or continuity?", ["Change", "Continuity"],
    [
    ["new king Cnut", 0],
    ["trading carrying on", 1],
    ["Scandinavian royal connections", 0]],
    ["Cnut's rule connected", "continued living and trading", "new king"]), false),
]);
