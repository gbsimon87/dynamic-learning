import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const alexanderTheGreat = year5Topic(["https://www.britannica.com/biography/Alexander-the-Great", "https://www.worldhistory.org/Alexander_the_Great/", "https://www.britishmuseum.org/learn/schools"], [
  lesson("👑", "Alexander the Great", [
    ["Alexander was born in Macedon, in the north, in 356 BC.", "Where was Alexander born?", "Macedon", "Egypt", "Persia"],
    ["His father was King Philip, and his teacher was Aristotle.", "Who was his teacher?", "Aristotle", "Pericles", "Homer"],
    ["Alexander became king at the age of twenty.", "How old was Alexander when he became king?", "twenty", "ten", "fifty"],
    ["He led his army east and defeated the Persian king.", "Whom did he defeat?", "the Persian king", "the Roman emperor", "King Cnut"],
    ["His empire reached as far as India.", "How far did his empire reach?", "as far as India", "as far as Britain", "as far as Mexico"],
    ["He died in Babylon in 323 BC, aged thirty-two.", "How old was he when he died?", "thirty-two", "twenty", "seventy"]],
    sort("A person or a place?", ["A person", "A place"], [["Aristotle", 0], ["King Philip", 0], ["Macedon", 1], ["India", 1], ["Babylon", 1]], ["Aristotle", "Philip", "Macedon", "India", "Babylon"])),
  lesson("📅", "Alexander's life in order", [
    ["Alexander was born in 356 BC.", "When was Alexander born?", "356 BC", "336 BC", "323 BC"],
    ["He became king in 336 BC.", "When did he become king?", "336 BC", "356 BC", "326 BC"],
    ["In 331 BC, he founded the city of Alexandria in Egypt.", "Which city did he found in Egypt?", "Alexandria", "Athens", "Babylon"],
    ["He reached India in 326 BC.", "When did he reach India?", "326 BC", "331 BC", "323 BC"],
    ["He died in 323 BC, and his empire split up.", "What happened after he died?", "his empire split up", "it grew bigger at once", "it became Roman at once"],
    ["Rome took control of Greece in 146 BC.", "Who took control of Greece in 146 BC?", "Rome", "Alexander", "Persia"]],
    order("Order the events, oldest first.", ["Born · 356 BC", "Becomes king · 336 BC", "Founds Alexandria · 331 BC", "Reaches India · 326 BC", "Dies · 323 BC"], ["356 BC", "336 BC", "331 BC", "326 BC", "323 BC"]), GREEK_TIMELINE),
  detective(["Alexander died in 323 BC.", "The books about him that survive were mostly written centuries later.", "One writer, Arrian, wrote more than four hundred years later.", "Arrian used older accounts, which are now lost.", "Coins and city ruins show where Alexander's power reached.", "Some stories praise him as a hero who never lost.", "Historians ask who wrote each story, and why."],
    [
    ["When did Alexander die?", "323 BC", "356 BC", "146 BC", "Alexander died in 323 BC."],
    ["When were most surviving books about him written?", "centuries later", "on the day he died", "in the last ten years", "written centuries later"],
    ["Which writer is named here?", "Arrian", "Herodotus", "Homer", "One writer, Arrian"],
    ["What did Arrian use?", "older accounts that are now lost", "photographs", "his own diary of the battles", "Arrian used older accounts, which are now lost."],
    ["What shows where Alexander's power reached?", "coins and city ruins", "myths only", "Persian lists only", "Coins and city ruins show where Alexander's power reached."],
    ["What do some stories say about him?", "that he never lost", "that he never fought", "that he was always a farmer", "praise him as a hero who never lost"],
    ["What do historians ask about each story?", "who wrote it, and why", "how much it cost", "what colour it was", "Historians ask who wrote each story, and why."]], { picture: "📜", pictureLabel: "An old account of Alexander" }),
  lesson("🤔", "Alexander's legacy", [
    ["Alexander spread the Greek language and ideas across a huge area.", "What did Alexander spread?", "the Greek language and ideas", "Roman roads", "Viking runes"],
    ["Cities he founded had Greek theatres and schools.", "What did cities he founded have?", "Greek theatres and schools", "Roman baths and forts", "Maya pyramids"],
    ["He also took ideas and customs from Persia and Egypt.", "What else did he take from Persia and Egypt?", "ideas and customs", "nothing at all", "only their ships"],
    ["His wars caused great suffering and many deaths.", "What did his wars cause?", "great suffering and many deaths", "peace everywhere", "no change"],
    ["Some people call him great, and others call him a destroyer.", "What do people say about him?", "some say great, some say destroyer", "everyone agrees he was kind", "nobody remembers him"],
    ["After he died, his generals fought over his empire.", "What did his generals do after he died?", "fought over his empire", "gave it back to Persia", "sailed to Britain"]],
    sort("What spread or what it cost?", ["What spread", "What it cost"], [["Greek language", 0], ["Greek theatres", 0], ["many deaths", 1], ["suffering", 1]], ["Greek language", "Greek theatres", "many deaths", "suffering"])),
]);
