import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const jarrowAndTheVenerableBede = year6Topic(["https://www.britannica.com/biography/Saint-Bede-the-Venerable", "https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.britishmuseum.org/learn/schools"], [
  lesson("⛪", "Jarrow on the Tyne", [
    ["Jarrow is a town on the River Tyne in north-east England.", "Which river is Jarrow on?", "the River Tyne", "the River Thames", "the River Severn"],
    ["St Paul's Church and monastery were founded at Jarrow in AD 681.", "What was founded at Jarrow in AD 681?", "St Paul's Church and monastery", "a Roman fort and bath-house", "a Viking market and harbour"],
    ["Benedict Biscop founded it, in the kingdom of Northumbria.", "Who founded the monastery?", "Benedict Biscop", "Julius Caesar", "William the Conqueror"],
    ["A stone from AD 685 records the day the church was dedicated, or opened, and it still survives.", "What does the stone from AD 685 record?", "the church's dedication day", "a Viking raid", "the death of a king"],
    ["The Venerable Bede lived most of his life at Wearmouth-Jarrow.", "Who lived most of his life at Wearmouth-Jarrow?", "the Venerable Bede", "King Offa", "Alfred the Great"],
    ["Monks there wrote books by hand on parchment.", "How did the monks make books?", "by hand on parchment", "on a printing press", "on a computer"]],
    sort("Person or place?", ["A person", "A place"], [["Bede", 0], ["Benedict Biscop", 0], ["Jarrow", 1], ["Northumbria", 1]], ["Venerable Bede", "Benedict Biscop", "Jarrow", "Northumbria"])),
  lesson("📅", "Jarrow and Bede in order", [
    ["Monkwearmouth monastery was founded in AD 674.", "When was Monkwearmouth monastery founded?", "AD 674", "AD 874", "AD 574"],
    ["Its twin, at Jarrow, was founded in AD 681.", "Which monastery was the twin of Monkwearmouth?", "Jarrow", "Lindisfarne", "Durham"],
    ["The dedication stone was carved in AD 685.", "When was the dedication stone carved?", "AD 685", "AD 885", "AD 485"],
    ["Bede finished his History of the English People in AD 731.", "What did Bede finish in AD 731?", "his History of the English People", "a plan for Durham Cathedral", "a Viking sea map"],
    ["Bede died in AD 735.", "When did Bede die?", "AD 735", "AD 635", "AD 835"],
    ["Vikings raided Jarrow in AD 794.", "Who raided Jarrow in AD 794?", "Vikings", "Romans", "Normans"]],
    order("Order the events, oldest first.", ["Jarrow founded · AD 681", "Dedication stone · AD 685", "History finished · AD 731", "Bede dies · AD 735", "Vikings raid Jarrow · AD 794"], ["AD 681", "AD 685", "AD 731", "AD 735", "AD 794"]), false),
  detective(["Bede wrote his History of the English People in Latin.", "It is one of our main written sources for that time.", "Bede was a monk, and he wrote to teach the Christian faith.", "He used letters and reports from others for events he did not see.", "A stone at Jarrow records the church's dedication in AD 685.", "The Codex Amiatinus, a huge Bible, was made at Wearmouth-Jarrow and now survives in Italy.", "None of these clues shows what ordinary farmers thought."],
    [
    ["Which language did Bede write in?", "Latin", "French", "Welsh", "in Latin"],
    ["Why did Bede write?", "to teach the Christian faith", "to sell books at a market", "to win a royal prize", "wrote to teach the Christian faith"],
    ["How did Bede learn about events he did not see?", "from letters and reports", "from television news", "from Viking maps", "letters and reports from others"],
    ["What does the stone at Jarrow record?", "the church's dedication", "a Viking victory", "Bede's birthday", "records the church's dedication"],
    ["Where does the Codex Amiatinus survive today?", "in Italy", "in Jarrow", "at Durham", "now survives in Italy"],
    ["What was the Codex Amiatinus?", "a huge Bible", "a Viking boat", "a tax list", "a huge Bible"],
    ["What do these clues not show?", "what ordinary farmers thought", "when the church was dedicated", "that Bede wrote in Latin", "None of these clues shows what ordinary farmers thought"]], { picture: "📖", pictureLabel: "A monk's handwritten book" }),
  lesson("🕯️", "Why Bede matters", [
    ["Bede's History is a key source for early English history.", "Why do historians value Bede's History?", "it is a key source for that time", "it is the only book ever written", "it was written only yesterday"],
    ["He helped spread the use of AD, counting years from Christ's birth.", "What did Bede help to spread?", "counting years from Christ's birth", "counting years from the Roman invasion", "counting years from the Norman Conquest"],
    ["We still count years that way in Britain today.", "What shows Bede's lasting influence?", "we still count years that way", "we still live in his monastery", "we still use his handwriting"],
    ["Bede also wrote about science and how to date the year.", "What else did Bede write about?", "science and how to date the year", "football and fashion", "ships and shipyards"],
    ["He wrote as a monk, so he stressed the Christian faith.", "Why does Bede stress the Christian faith?", "he wrote as a monk", "he wrote as a king", "he wrote as a farmer"],
    ["A Viking raid hit Jarrow in AD 794, long after Bede died in AD 735.", "How did the raid of AD 794 fit with Bede's life?", "it came long after he died", "it happened while he was a boy", "it stopped him writing his History"]],
    sort("Could Bede have written about it?", ["Yes, he could", "No, too late"], [["Science", 0], ["Dating years", 0], ["A Viking raid in AD 794", 1], ["The Jarrow March of 1936", 1]], ["science", "date the year", "long after Bede died"])),
]);
