import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const vikingLifeInJorvik = year4Topic(["https://www.jorvikvikingcentre.co.uk/the%20vikings/how%20did%20they%20live/", "https://www.jorvikvikingcentre.co.uk/about/jorvik-story/coppergate-dig/", "https://www.jorvikvikingcentre.co.uk/about/jorvik-artefact-gallery/"],
    [
  lesson("🏘️", "Viking Life in Jorvik", [
    ["Jorvik was the Viking name for York.", "Which city was Jorvik?", "York", "Rome", "Canterbury"],
    ["The city became a busy centre for trade.", "What was Jorvik a centre for?", "trade", "only royal burials", "only Roman baths"],
    ["Craftworkers made combs, shoes and other goods.", "What did craftworkers make?", "combs, shoes and goods", "electric motors", "printed newspapers"],
    ["Traders brought goods from distant places.", "What did traders bring?", "distant goods", "only local water", "only royal laws"],
    ["People lived and worked in timber buildings.", "Which buildings did people use?", "timber buildings", "glass towers", "Roman palaces only"],
    ["Archaeologists found everyday objects at Coppergate.", "Where were everyday objects found?", "Coppergate", "the Nile", "Stonehenge"]], sort("Making or exchanging?", ["Making", "Exchanging"],
    [
    ["crafting combs", 0],
    ["making shoes", 0],
    ["trading goods", 1]],
    ["Craftworkers made combs, shoes", "Traders brought goods"]), false),
  lesson("🏘️", "Viking Life in Jorvik", [
    ["York existed before the Vikings captured it.", "Did Vikings create York from nothing?", "no, it already existed", "yes, empty land", "yes, no earlier town"],
    ["A Viking army captured York in AD 866.", "When was York captured?", "AD 866", "AD 410", "AD 1066"],
    ["Jorvik grew as a Viking-age trading town.", "What happened after capture?", "trade and town life grew", "all people left forever", "all buildings became pyramids"],
    ["Viking influence continued after rulers changed.", "What could continue after rulers changed?", "Viking influence", "one ruler forever", "no trade"],
    ["Coppergate excavations began in 1976.", "What began in 1976?", "modern excavations", "Viking settlement", "Cnut's reign"],
    ["Excavation came long after people used these objects.", "Which came first?", "using the objects", "modern excavation", "today's museum displays"]], order("Order the events, oldest first.", ["York before Viking capture", "Capture · AD 866", "Viking-age town life", "Coppergate excavation · 1976"],
    ["York existed before", "captured York in AD 866", "Jorvik grew", "excavations began in 1976"]), true),
  detective(["Coppergate's damp soil preserved wood, leather and other materials.", "Combs show craftworkers shaped bone and antler.", "Leather shoes give clues about clothing and making skills.", "Traders and craftworkers used these objects in everyday life.", "Archaeologists study find locations as well as the objects.", "Objects cannot tell us every person's thoughts."],
    [
    ["What helped preserve materials?", "damp soil", "modern plastic wrapping", "Roman marble", "Coppergate's damp soil preserved wood, leather and other materials."],
    ["What can combs show?", "working bone and antler", "every person's name", "all raiders' thoughts", "Combs show craftworkers shaped bone and antler."],
    ["What can shoes help investigate?", "clothing and skills", "every spoken language", "every battle", "Leather shoes give clues about clothing and making skills."],
    ["Why were everyday objects made?", "for everyday use", "only for modern museums", "only to record battles", "Traders and craftworkers used these objects in everyday life."],
    ["What else do archaeologists study?", "find locations", "only museum paint", "only today's prices", "Archaeologists study find locations as well as the objects."],
    ["What cannot objects tell us?", "every person's thoughts", "their material", "their visible shape", "Objects cannot tell us every person's thoughts."],
    ["Whose work do these finds help reveal?", "traders and craftworkers", "only kings", "only Roman emperors", "Traders and craftworkers used these objects in everyday life."]], {"scene": "jorvik-finds"}),
  lesson("🏘️", "Viking Life in Jorvik", [
    ["Jorvik shows that Viking lives included peaceful work.", "What does Jorvik help show?", "peaceful work as well as conflict", "only battles", "only kings"],
    ["Trade connected York with distant places.", "What did trade connect?", "York and distant places", "only one house", "only one farm"],
    ["Making and selling goods supported the town.", "What supported town life?", "making and selling goods", "ending all trade", "stopping all crafts"],
    ["Everyday rubbish can become valuable historical evidence.", "What can rubbish become?", "historical evidence", "proof of every thought", "a complete written diary"],
    ["Written accounts often describe rulers more than workers.", "Who may get less attention in written accounts?", "workers", "kings", "rulers"],
    ["Comparing objects and accounts gives a fuller picture.", "How can we get a fuller picture?", "compare objects and accounts", "ignore everyday finds", "use only battle stories"]], sort("Written emphasis or everyday evidence?", ["Written emphasis", "Everyday evidence"],
    [
    ["rulers in accounts", 0],
    ["discarded shoes", 1],
    ["broken combs", 1]],
    ["accounts often describe rulers", "Everyday rubbish", "objects and accounts"]), false),
]);
