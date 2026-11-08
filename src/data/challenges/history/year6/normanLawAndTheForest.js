import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const normanLawAndTheForest = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.english-heritage.org.uk/learn/story-of-england/medieval/"], [
  lesson("🏰", "Norman law and the Forest", [
    ["After 1066, King William I made the king's peace stronger.", "Who made the king's peace stronger after 1066?", "William I", "King Alfred", "King Cnut"],
    ["The Normans built castles to help the king control the land.", "What did the Normans build to control the land?", "castles", "railways", "police stations"],
    ["A royal Forest was land kept for the king's hunting, and Forest Law protected his deer.", "What did Forest Law protect?", "the king's deer", "the farmers' crops", "the village market"],
    ["Poaching, which means hunting the king's deer, was a crime.", "What was poaching?", "hunting the king's deer", "stealing the king's crown", "cutting a farmer's hay"],
    ["Forest courts fined poachers, and many people resented the law.", "What did Forest courts do to poachers?", "fined them", "crowned them", "gave them land"],
    ["In 1086, the Domesday Book recorded who owned land.", "What did the Domesday Book record?", "who owned land", "every crime", "the king's laws"]],
    sort("Norman power or broken law?", ["Norman power", "Broke the law"], [["castles", 0], ["Domesday Book", 0], ["poaching", 1], ["hunting the king's deer", 1]], ["castles", "Domesday Book", "Poaching", "hunting the king's deer"])),
  lesson("📅", "From the Conquest to Magna Carta", [
    ["William of Normandy won at Hastings and became king in 1066.", "When did William become king?", "1066", "1154", "1215"],
    ["In 1086, William's officials made the Domesday Book.", "When was the Domesday Book made?", "1086", "1166", "1016"],
    ["William died in 1087, and his sons ruled after him.", "Who ruled after William I?", "his sons", "King Cnut", "King Alfred"],
    ["Henry II became king in 1154.", "Which king began his reign in 1154?", "Henry II", "King John", "William I"],
    ["Henry II later sent royal judges to visit the counties.", "What did Henry II later send round the counties?", "royal judges", "castle builders", "Forest guards"],
    ["In 1215, King John agreed to Magna Carta.", "When did King John agree to Magna Carta?", "1215", "1066", "1154"]],
    order("Order the events, oldest first.", ["Norman Conquest · 1066", "Domesday Book · 1086", "Henry II becomes king · 1154", "Magna Carta · 1215"], ["1066", "1086", "1154", "1215"]), false),
  detective(["The Domesday Book of 1086 lists land, owners and animals.", "Royal officials asked people questions to fill the book.", "It was made for the king, to show what land and wealth there was.", "It tells us little about how ordinary people felt.", "An English chronicle, written by monks, complained about the king's Forest rules.", "The monks were English, so they may not have been fair to the Normans.", "Historians compare different sources before deciding what happened."],
    [
    ["In which year was the Domesday Book made?", "1086", "1066", "1215", "The Domesday Book of 1086"],
    ["What does the Domesday Book list?", "land, owners and animals", "crimes, courts and prisoners", "every child's name", "lists land, owners and animals"],
    ["Who was the Domesday Book made for?", "the king", "the poor", "the Vikings", "made for the king"],
    ["What does the Domesday Book tell us little about?", "how ordinary people felt", "who owned land", "how many animals there were", "tells us little about how ordinary people felt"],
    ["Who complained about the Forest rules?", "English monks", "a Norman sheriff", "King William himself", "An English chronicle, written by monks, complained"],
    ["Why might the monks be unfair to the Normans?", "they were English", "they were Norman lords", "they were the king's judges", "The monks were English"],
    ["What do historians do before deciding what happened?", "compare different sources", "choose only the oldest one", "pick the shortest one", "compare different sources"]], { picture: "📖", pictureLabel: "A great survey book" }),
  lesson("🤔", "Why Forest Law mattered", [
    ["William had conquered England, so he wanted strong control.", "Why did William want strong control?", "he had conquered England", "he had no castles or soldiers", "he was a child"],
    ["Forest Law made hunting in a royal Forest a crime for most people.", "What did Forest Law make a crime?", "hunting in a royal Forest", "farming your own fields", "walking on village roads"],
    ["Poor villagers who hunted for food could be fined for it.", "Who could be fined for hunting for food?", "poor villagers", "the king himself", "Norman lords"],
    ["Many English people felt the laws were unfair, because they favoured Normans.", "Why did many English people feel the laws were unfair?", "they favoured Normans", "they were too gentle", "they were never enforced"],
    ["Norman law still used oaths and ordeals, and added trial by combat, where two sides fought.", "What did the Normans add?", "trial by combat", "trial by jury", "a modern police force"],
    ["Over time, royal judges and juries replaced these old tests.", "What replaced the old tests?", "royal judges and juries", "Forest guards", "village moots and tithing groups"]],
    sort("Kept or new?", ["Kept from before", "New with the Normans"], [["oaths", 0], ["ordeals", 0], ["Forest Law", 1], ["trial by combat", 1]], ["oaths", "ordeals", "Forest Law", "trial by combat"])),
]);
