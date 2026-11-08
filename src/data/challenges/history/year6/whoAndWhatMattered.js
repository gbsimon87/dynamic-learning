import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const whoAndWhatMattered = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zy3tyrd", "https://www.nationalarchives.gov.uk/education/", "https://www.english-heritage.org.uk/learn/"], [
  lesson("⭐", "Significance", [
    ["Something is significant if it mattered a great deal.", "What does significant mean?", "it mattered a great deal", "it was very small", "it happened last week"],
    ["Historians ask how many people were affected.", "What do historians ask about numbers?", "how many people were affected", "how many pencils were used", "how many clouds there were"],
    ["They ask whether the effects lasted a long time.", "What else do they ask?", "whether the effects lasted", "whether it rained", "whether it was Tuesday"],
    ["Bede, a monk at Jarrow, helped to spread the use of AD dates.", "What did Bede help to spread?", "the use of AD dates", "the Poor Law", "London's police"],
    ["Magna Carta's idea that the king must obey the law still matters.", "What idea from Magna Carta still matters?", "the king must obey the law", "ships must be iron", "everyone must march"],
    ["Elizabeth Fry visited Newgate Prison to improve life for women.", "Who visited Newgate Prison to improve life for women?", "Elizabeth Fry", "Robert Peel", "Charles Palmer"]],
    sort("Who is it?", ["Bede", "Elizabeth Fry"], [["AD dates", 0], ["a monk at Jarrow", 0], ["Newgate Prison", 1], ["life for women", 1]], ["AD dates", "a monk at Jarrow", "Newgate Prison", "life for women"])),
  lesson("📅", "People and events in order", [
    ["Bede finished his history of the English people in AD 731.", "When did Bede finish his history?", "AD 731", "1215", "1813"],
    ["King John agreed Magna Carta in 1215.", "What happened in 1215?", "King John agreed Magna Carta", "Fry visited Newgate", "police used DNA"],
    ["Elizabeth Fry visited Newgate Prison in 1813.", "Who visited Newgate Prison in 1813?", "Elizabeth Fry", "King John", "Bede"],
    ["Peel started London's police in 1829.", "What happened in 1829?", "Peel started London's police", "Bede wrote a book", "Magna Carta was agreed"],
    ["Police used DNA to solve a crime in the 1980s.", "What did police use in the 1980s?", "DNA", "AD dates", "iron ships"],
    ["The Jarrow March took place in 1936.", "When did the Jarrow March take place?", "1936", "1215", "AD 731"]],
    order("Order the events, oldest first.", ["Bede finishes his history · AD 731", "Magna Carta · 1215", "Fry visits Newgate · 1813", "Jarrow March · 1936"], ["AD 731", "1215", "1813", "1936"]), false),
  detective(["Many history books name kings and generals.", "Fewer books name the workers who built ships.", "Records about ordinary people are often rarer.", "A statue shows who a town chose to honour.", "A museum may tell only some of the story.", "Oral history can add voices that records leave out.", "Historians look for whose story is missing."],
    [
    ["Who do many history books name?", "kings and generals", "ship workers", "pupils", "Many history books name kings and generals."],
    ["Who is named in fewer books?", "the workers who built ships", "kings", "generals", "Fewer books name the workers who built ships."],
    ["What are records about ordinary people often?", "rarer", "more plentiful", "always complete", "often rarer"],
    ["What does a statue show?", "who a town chose to honour", "every fact about a person", "the weather", "who a town chose to honour"],
    ["What may a museum tell?", "only some of the story", "every story", "no story", "only some of the story"],
    ["What can oral history add?", "voices that records leave out", "more statues", "more maps", "voices that records leave out"],
    ["What do historians look for?", "whose story is missing", "the longest book", "the biggest statue", "Historians look for whose story is missing."]], { picture: "🗿", pictureLabel: "A statue in a town square" }),
  lesson("🏛️", "What matters to whom?", [
    ["Something can matter a lot to one town but less to the whole country.", "Can an event matter more to one town than to the country?", "yes, it can", "no, never", "only if a king says so"],
    ["The Jarrow March mattered to Jarrow and to people across Britain.", "Who did the Jarrow March matter to?", "Jarrow and people across Britain", "only one marcher", "nobody"],
    ["Magna Carta has mattered to many countries since 1215.", "How long has Magna Carta mattered?", "since 1215", "for one week", "never"],
    ["Different people may disagree about who mattered most.", "What may different people do?", "disagree about who mattered most", "agree about everything", "forget everything"],
    ["Good historians give reasons for their choices.", "What do good historians give?", "reasons for their choices", "only guesses", "nothing at all"],
    ["We can change our minds when we find new evidence.", "When can we change our minds?", "when we find new evidence", "never", "only on Fridays"]],
    sort("Local or national importance?", ["Mattered locally", "Mattered nationally"], [["one town", 0], ["Jarrow", 0], ["across Britain", 1], ["many countries", 1]], ["one town", "Jarrow", "across Britain", "many countries"])),
]);
