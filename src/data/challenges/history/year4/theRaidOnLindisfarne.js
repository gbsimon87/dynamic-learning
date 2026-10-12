import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const theRaidOnLindisfarne = year4Topic(["https://www.english-heritage.org.uk/visit/places/lindisfarne-priory/history/viking-raid/", "https://www.english-heritage.org.uk/visit/places/lindisfarne-priory/History/"],
    [
  lesson("🌊", "The Raid on Lindisfarne", [
    ["Vikings raided Lindisfarne's monastery in AD 793.", "Where was the raid?", "Lindisfarne's monastery", "Westminster Abbey", "Sutton Hoo"],
    ["Lindisfarne is an island off north-east England.", "Where is Lindisfarne?", "off north-east England", "in Egypt", "off southern Italy"],
    ["Monasteries held valuable objects.", "What made monasteries tempting targets?", "valuable objects", "steam engines", "electric lights"],
    ["Raiders took treasure and carried some people away to be sold as slaves.", "What happened to some people?", "they were carried away to be sold as slaves", "they all became kings", "they all chose holidays"],
    ["News of the attack shocked Christian communities.", "Who was shocked by the news?", "Christian communities", "only modern tourists", "only Roman emperors"],
    ["Accounts help us investigate what happened.", "What helps us investigate the raid?", "accounts", "only guesses", "only ship drawings"]], sort("Place or event?", ["Place", "Event"],
    [
    ["Lindisfarne", 0],
    ["monastery", 0],
    ["raid", 1]],
    ["Lindisfarne", "monastery", "raided"]), false),
  lesson("🌊", "The Raid on Lindisfarne", [
    ["Aidan founded Lindisfarne's monastery in AD 635.", "What happened first here?", "monastery founded", "raid", "great army arrives"],
    ["The Gospels were made around AD 700–720.", "What was made after the monastery's founding?", "Gospels", "a printing press", "a Roman fort"],
    ["The raid came later, in AD 793.", "What happened in AD 793?", "raid", "monastery founded", "Gospels begun"],
    ["Alcuin wrote letters after hearing the news.", "When did Alcuin write about the raid?", "after hearing the news", "before the monastery existed", "during Roman rule"],
    ["The great army arrived later, in AD 865.", "Which came after the raid?", "great army arriving", "monastery founded", "Gospels made"],
    ["The raid and the later invasion were different events.", "Were raid and invasion the same event?", "no", "yes, same date", "yes, same visit"]], order("Order the events, oldest first.", ["Monastery founded · AD 635", "Gospels made · about AD 700–720", "Raid · AD 793", "Great army arrives · AD 865"],
    ["AD 635", "AD 700–720", "later, in AD 793", "later, in AD 865"]), true),
  detective(["Alcuin was a Christian scholar from Northumbria.", "He wrote letters after hearing about the raid.", "He was abroad, not watching the raid.", "He wanted to warn and advise Christian readers.", "His letters reflect Christian fear and concern.", "They cannot describe every Scandinavian person's life."],
    [
    ["Who was Alcuin?", "a Christian scholar", "a Viking raider", "a Roman emperor", "Alcuin was a Christian scholar from Northumbria."],
    ["What source did he make?", "letters", "photographs", "ship models", "He wrote letters after hearing about the raid."],
    ["Was he an eyewitness at Lindisfarne?", "no, he was abroad", "yes, on the island", "yes, on a raiding ship", "He was abroad, not watching the raid."],
    ["Who were his intended readers?", "Christian readers", "modern tourists only", "only Viking shipbuilders", "He wanted to warn and advise Christian readers."],
    ["What viewpoint do his letters show?", "Christian fear and concern", "every raider's view", "no viewpoint at all", "His letters reflect Christian fear and concern."],
    ["What do these letters not describe?", "every Scandinavian life", "his concern", "his intended readers", "They cannot describe every Scandinavian person's life."],
    ["Why did Alcuin write?", "to warn and advise", "to sell ships", "to photograph the raid", "He wanted to warn and advise Christian readers."]], {"picture": "🌊", "pictureLabel": "The Raid on Lindisfarne"}),
  lesson("🌊", "The Raid on Lindisfarne", [
    ["The raid attacked an important religious place and shocked Christian communities.", "Why did the raid matter?", "it shocked Christian communities", "it ended all Christianity", "it ended all farming"],
    ["Treasure made monasteries attractive to raiders.", "What helped attract raiders?", "treasure", "modern railways", "electric lights"],
    ["Raiding harmed people; trading was a different activity.", "Which activity harmed people here?", "raiding", "peaceful trading", "growing crops"],
    ["A frightened account can still contain useful evidence.", "Can a fearful account still be useful?", "yes, read it carefully", "no, discard it always", "yes, it proves every detail"],
    ["Comparing accounts and finds helps test claims.", "What helps test claims?", "comparing accounts and finds", "one unsupported guess", "ignoring the source maker"],
    ["One raid does not describe all Viking lives.", "What should we avoid?", "describing all lives from one raid", "comparing sources", "checking a writer's viewpoint"]], sort("Cause or consequence?", ["Cause", "Consequence"],
    [
    ["valuable treasure attracting raiders", 0],
    ["people harmed", 1],
    ["Christian communities shocked", 1]],
    ["Treasure made monasteries attractive", "Raiding harmed", "shocked Christian communities"]), false),
]);
