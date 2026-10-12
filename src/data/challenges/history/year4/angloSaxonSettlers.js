import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const angloSaxonSettlers = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.clevelandart.org/art/1980.3"],
    [
  lesson("🛶", "Anglo-Saxon Settlers", [
    ["Angles, Saxons and Jutes crossed the North Sea.", "Which sea did settlers cross?", "North Sea", "Mediterranean Sea", "Red Sea"],
    ["They came from areas now in Germany, Denmark and the Netherlands.", "Where did settlers come from?", "Germany, Denmark and the Netherlands", "Egypt and Sumer", "Italy and Greece only"],
    ["Some sought farmland and new homes.", "What did some settlers seek?", "farmland and homes", "only pyramids", "only Roman baths"],
    ["Some came as fighters, and conflict happened.", "What else did some newcomers do?", "fight", "build pyramids", "rule Rome"],
    ["Britons already lived in Britain.", "Who already lived in Britain?", "Britons", "only Vikings", "only Normans"],
    ["Their languages helped form Old English.", "What language developed?", "Old English", "modern Italian", "hieroglyphs"]], sort("Journey or settlement?", ["Journey", "Settlement"],
    [
    ["crossing the North Sea", 0],
    ["finding farmland", 1],
    ["making new homes", 1]],
    ["crossed the North Sea", "farmland and new homes"]), false),
  lesson("🛶", "Anglo-Saxon Settlers", [
    ["Roman rule ended about AD 410.", "Which event begins this timeline?", "Roman rule ending", "Viking York growing", "Edward's death"],
    ["Settlement increased during the fifth and sixth centuries.", "When did settlement increase?", "after Roman rule", "after Edward died", "before Roman Britain"],
    ["New villages grew before large kingdoms formed.", "What came before large kingdoms?", "new villages", "Cnut's empire", "Norman castles"],
    ["Kingdoms such as Wessex developed later.", "Which kingdom developed?", "Wessex", "Ancient Egypt", "Roman Empire"],
    ["The raid on Lindisfarne came later, in AD 793.", "Which event came later?", "Lindisfarne raid", "Roman withdrawal", "earliest settlement here"],
    ["Anglo-Saxon settlement was a process, not one single arrival.", "Was settlement one arrival?", "no, a process", "yes, one boat", "yes, one day"]], order("Order the events, oldest first.", ["Roman rule ends", "Settlement increases", "Villages grow", "Large kingdoms form"],
    ["Roman rule ended", "Settlement increased", "villages grew before", "Kingdoms such as Wessex developed later"]), true),
  detective(["This Anglo-Saxon brooch fastened clothing.", "A metalworker made its patterned surface.", "The decoration shows skill and choices about appearance.", "A museum labels this brooch as dating from the AD 500s.", "One brooch cannot represent every settler's clothes.", "We compare finds from different places to investigate settlement."],
    [
    ["What was the brooch used for?", "fastening clothing", "rowing a ship", "writing a diary", "This Anglo-Saxon brooch fastened clothing."],
    ["Who made the object?", "a metalworker", "a modern photographer", "a Roman governor", "A metalworker made its patterned surface."],
    ["What does decoration show?", "craft skill", "every person's voice", "every journey's date", "The decoration shows skill and choices about appearance."],
    ["Which date does the museum give?", "AD 500s", "AD 1016", "AD 1066", "A museum labels this brooch as dating from the AD 500s."],
    ["What cannot one brooch show?", "every settler's clothes", "its own decoration", "its own shape", "One brooch cannot represent every settler's clothes."],
    ["What helps investigate settlement?", "comparing different finds", "using one guess", "ignoring find locations", "We compare finds from different places to investigate settlement."],
    ["Was it made to photograph a journey?", "no, it was a crafted object", "yes, a camera", "yes, a written diary", "A metalworker made its patterned surface."]], {"image": "cma-anglo-saxon-brooch"}),
  lesson("🛶", "Anglo-Saxon Settlers", [
    ["Settlement changed languages and communities in Britain.", "What changed through settlement?", "languages and communities", "the need for water", "the need for food"],
    ["Farming continued, although methods and communities could change.", "What continued?", "farming", "Roman imperial rule", "everyone's old language unchanged"],
    ["Britons and settlers did not all live the same way.", "Did everyone live alike?", "no", "yes, identical homes", "yes, identical jobs"],
    ["Some places kept links with older traditions.", "What could places keep?", "older traditions", "Roman rule everywhere", "Egyptian pharaohs"],
    ["Objects and place names offer different kinds of clues.", "Which clues can we compare?", "objects and place names", "only a modern cartoon", "only one guess"],
    ["Migration can have several causes, not just one.", "How many causes can migration have?", "several", "always one", "none"]], sort("Change or continuity?", ["Change", "Continuity"],
    [
    ["new languages", 0],
    ["farming carrying on", 1],
    ["new communities", 0]],
    ["changed languages and communities", "Farming continued"]), false),
]);
