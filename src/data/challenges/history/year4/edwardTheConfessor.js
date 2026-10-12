import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const edwardTheConfessor = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.westminster-abbey.org/history/explore-our-history/celebrating-st-edward", "https://www.westminster-abbey.org/media/gucnc5d2/history-masterclass-2019-teachers-notes.pdf"],
    [
  lesson("🕍", "Edward the Confessor", [
    ["Edward the Confessor became king of England in AD 1042.", "When did Edward become king?", "AD 1042", "AD 793", "AD 410"],
    ["He ruled after Cnut's family.", "Whose family ruled before Edward?", "Cnut's", "Caesar's", "Columba's"],
    ["Edward rebuilt Westminster Abbey.", "Which church did Edward rebuild?", "Westminster Abbey", "Lindisfarne's first monastery", "Iona's first monastery"],
    ["He was a Christian king.", "What was Edward's religion?", "Christianity", "ancient Egyptian religion", "Roman gods only"],
    ["Edward died in AD 1066 without a child to succeed him.", "What made succession uncertain?", "no child to succeed him", "a Roman governor returned", "there were no powerful nobles"],
    ["Powerful people disagreed about who should rule next.", "What did powerful people disagree about?", "who should rule next", "where the Nile flowed", "when Rome was founded"]], sort("Building or succession?", ["Building", "Succession"],
    [
    ["rebuilding Westminster Abbey", 0],
    ["choosing the next ruler", 1],
    ["no child to succeed him", 1]],
    ["rebuilt Westminster Abbey", "who should rule next", "without a child"]), false),
  lesson("🕍", "Edward the Confessor", [
    ["Cnut became king in AD 1016.", "Which ruler came first here?", "Cnut", "Edward", "Athelstan after Edward"],
    ["Edward became king later, in AD 1042.", "Which event belongs to AD 1042?", "Edward becoming king", "Lindisfarne raid", "Roman withdrawal"],
    ["His rebuilt abbey was consecrated in December 1065.", "What happened in December 1065?", "abbey consecrated", "Cnut became king", "Alfred died"],
    ["Edward died in January 1066.", "What happened in January 1066?", "Edward died", "Roman rule ended", "Iona founded"],
    ["Harold became king after Edward died.", "Who became king next?", "Harold", "Alfred", "Caesar"],
    ["Succession means choosing the next ruler.", "What does succession mean?", "choosing the next ruler", "building a monastery", "crossing the sea"]], order("Order the events, oldest first.", ["Cnut king · AD 1016", "Edward king · AD 1042", "Abbey consecrated · December 1065", "Edward dies · January 1066", "Harold becomes king"],
    ["AD 1016", "later, in AD 1042", "December 1065", "January 1066", "Harold became king after"]), true),
  detective(["A life of Edward was commissioned by Queen Edith.", "It praised Edward and Edith's family.", "Its writer chose what to include for this purpose.", "Praise does not make every detail false.", "It cannot give every rival's viewpoint.", "Comparing other accounts helps test its claims."],
    [
    ["Who commissioned the account?", "Queen Edith", "a Viking shipbuilder", "Julius Caesar", "A life of Edward was commissioned by Queen Edith."],
    ["Whom did it praise?", "Edward and Edith's family", "every villager equally", "only Roman emperors", "It praised Edward and Edith's family."],
    ["Why examine the writer's choices?", "the account had a purpose", "every account is neutral", "no writer makes choices", "Its writer chose what to include for this purpose."],
    ["Does praise make every detail false?", "no", "yes, always", "yes, nothing is useful", "Praise does not make every detail false."],
    ["What viewpoint is missing?", "every rival's", "the praising writer's", "the patron's interests", "It cannot give every rival's viewpoint."],
    ["How can we test its claims?", "compare other accounts", "accept all praise as proof", "ignore every written source", "Comparing other accounts helps test its claims."],
    ["What should we ask about this source?", "who commissioned it and why", "only its modern font size", "only today's weather", "A life of Edward was commissioned by Queen Edith."]], {"picture": "🕍", "pictureLabel": "Edward the Confessor"}),
  lesson("🕍", "Edward the Confessor", [
    ["Edward's death created uncertainty about the next ruler.", "What followed Edward's death?", "uncertainty about succession", "Roman government", "the founding of Wessex"],
    ["Not having a child was one cause of that uncertainty.", "What helped cause uncertainty?", "no child to succeed him", "the Nile flooding", "a Viking ship's shape"],
    ["Powerful nobles and rival claims also mattered.", "What else mattered?", "nobles and rival claims", "only farm tools", "only the weather"],
    ["The abbey linked royal power with religion.", "What did the abbey connect?", "royal power and religion", "only trade and boats", "only crops and animals"],
    ["Today's abbey includes much later rebuilding.", "Is today's abbey entirely Edward's building?", "no, much is later", "yes, all unchanged", "yes, every stone original"],
    ["Sources need comparison when people disagree.", "How should we investigate disagreement?", "compare sources", "choose one story without checking", "ignore all evidence"]], sort("Cause or consequence?", ["Cause", "Consequence"],
    [
    ["no child to succeed him", 0],
    ["rival claims", 0],
    ["uncertainty about the next ruler", 1]],
    ["one cause", "rival claims", "created uncertainty"]), false),
]);
