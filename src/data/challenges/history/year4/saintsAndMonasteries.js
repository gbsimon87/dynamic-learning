import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const saintsAndMonasteries = year4Topic(["https://www.english-heritage.org.uk/visit/places/lindisfarne-priory/History/", "https://www.historicenvironment.scot/visit/all/iona-abbey-and-nunnery/history-and-stories/", "https://searcharchives.bl.uk/catalog/040-001102725", "https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/"],
    [
  lesson("⛪", "Saints and Monasteries", [
    ["Augustine brought a Christian mission to Canterbury.", "Where did Augustine's mission arrive?", "Canterbury", "Jorvik", "Dunadd"],
    ["Columba founded a monastery on Iona.", "Who founded Iona's monastery?", "Columba", "Cnut", "Athelstan"],
    ["Aidan came from Iona to Lindisfarne.", "Who came from Iona to Lindisfarne?", "Aidan", "Caesar", "Alfred"],
    ["Monasteries were communities devoted to religious life.", "What was a monastery?", "a religious community", "a Viking market", "a Roman army camp"],
    ["Monks copied books by hand.", "How did monks copy books?", "by hand", "with printing presses", "with computers"],
    ["The Lindisfarne Gospels are a decorated Christian book.", "What are the Lindisfarne Gospels?", "a decorated Christian book", "a Roman road map", "a Viking law court"]], sort("Person or place?", ["Person", "Place"],
    [
    ["Augustine", 0],
    ["Columba", 0],
    ["Iona", 1],
    ["Lindisfarne", 1]],
    ["Augustine", "Columba", "Iona", "Lindisfarne"]), false),
  lesson("⛪", "Saints and Monasteries", [
    ["Columba founded Iona's monastery in AD 563.", "Which monastery came first here?", "Iona", "Lindisfarne", "Westminster"],
    ["Augustine arrived in Kent in AD 597.", "When did Augustine arrive?", "AD 597", "AD 793", "AD 1066"],
    ["Aidan founded Lindisfarne's monastery in AD 635.", "Who founded Lindisfarne's monastery?", "Aidan", "Columba", "Cnut"],
    ["The Gospels were made around AD 700–720.", "What was made around AD 700–720?", "Lindisfarne Gospels", "a printing press", "a Roman fort"],
    ["The Lindisfarne raid happened later, in AD 793.", "Which came after the Gospels?", "Lindisfarne raid", "Iona's founding", "Augustine's arrival"],
    ["Conversion spread over time, not everywhere together.", "Did everyone convert together?", "no", "yes, one day", "yes, one hour"]], order("Order the events, oldest first.", ["Iona · AD 563", "Augustine arrives · AD 597", "Lindisfarne founded · AD 635", "Gospels made · about AD 700–720", "Raid · AD 793"],
    ["AD 563", "AD 597", "AD 635", "AD 700–720", "later, in AD 793"]), true),
  detective(["This page comes from the Lindisfarne Gospels.", "It has decorated letters and patterned lines.", "Eadfrith is believed to have made the book.", "It was made to honour God and share Christian teaching.", "The writing is Latin.", "It cannot show what every person believed."],
    [
    ["Which book contains this page?", "Lindisfarne Gospels", "a Roman law book", "Alfred's diary", "This page comes from the Lindisfarne Gospels."],
    ["What can you see?", "decorated letters and patterned lines", "a photograph of a raid", "a map of Wessex", "It has decorated letters and patterned lines."],
    ["Who is believed to have made it?", "Eadfrith", "Cnut", "Julius Caesar", "Eadfrith is believed to have made the book."],
    ["Why was it made?", "Christian worship and teaching", "to record every raid", "to advertise a market", "It was made to honour God and share Christian teaching."],
    ["Which language is the writing?", "Latin", "modern English", "Gaelic only", "The writing is Latin."],
    ["What cannot this page show?", "everyone's beliefs", "its decorated letters", "its patterned lines", "It cannot show what every person believed."],
    ["Is this a diary describing the Viking raid?", "no, a Christian book", "yes, a raider's diary", "yes, a photograph", "It was made to honour God and share Christian teaching."]], {"image": "lindisfarne-gospels"}),
  lesson("⛪", "Saints and Monasteries", [
    ["Christian missions changed beliefs in many communities.", "What did missions help change?", "beliefs", "the need for food", "the need for shelter"],
    ["Some people kept older beliefs for a time.", "Did older beliefs vanish immediately?", "no", "yes, all at once", "yes, in one hour"],
    ["Monasteries connected communities through travel and books.", "What helped connect communities?", "travel and books", "complete isolation", "no written words"],
    ["Copying books preserved learning.", "What did copying books help preserve?", "learning", "only treasure", "only crops"],
    ["Richly decorated books show craft skill and religious purpose.", "What do decorated books show?", "skill and religious purpose", "everyone's thoughts", "every person's wealth"],
    ["Written sources often reflect educated religious writers' views.", "Whose views often appear in these sources?", "educated religious writers'", "every farmer's equally", "every raider's equally"]], sort("Change or preservation?", ["Change", "Preservation"],
    [
    ["new Christian beliefs", 0],
    ["copying learning", 1],
    ["keeping older beliefs for a time", 1]],
    ["changed beliefs", "preserved learning", "kept older beliefs"]), false),
]);
