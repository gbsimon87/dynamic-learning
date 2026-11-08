import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const magnaCartaAndTrialByJury = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.bl.uk/magna-carta"], [
  lesson("📜", "Magna Carta", [
    ["King John agreed to Magna Carta at Runnymede in June 1215.", "Where did King John agree to Magna Carta?", "Runnymede", "Hastings", "Jarrow"],
    ["The barons had rebelled against King John, so he agreed.", "Who had rebelled against King John?", "the barons", "the Vikings", "the monks"],
    ["Magna Carta limited the king's power.", "What did Magna Carta limit?", "the king's power", "the price of food in towns", "the number of royal castles"],
    ["Clause 39, one part of the charter, said a free man must be judged by the law of the land.", "How must a free man be judged, said clause 39?", "by the law of the land", "by the king's mood", "by his neighbours' gossip"],
    ["It applied only to free men, not to everyone.", "Who did clause 39 apply to?", "only free men", "every person in England", "only knights"],
    ["A few copies from 1215 still survive today.", "How many copies from 1215 survive?", "a few", "none at all", "thousands"]],
    sort("A person or a place?", ["Person or group", "Place or document"], [["King John", 0], ["the barons", 0], ["Runnymede", 1], ["clause 39", 1]], ["King John", "barons", "Runnymede", "Clause 39"])),
  lesson("📅", "Magna Carta and the jury", [
    ["In 1166, Henry II used juries of local men to accuse suspected criminals.", "When did Henry II begin using juries to accuse?", "1166", "1066", "1215"],
    ["Magna Carta was agreed in June 1215.", "In which month was Magna Carta agreed?", "June", "January", "October"],
    ["In November 1215, a great Church meeting, the Fourth Lateran Council, stopped priests joining ordeals.", "Who stopped priests taking part in ordeals?", "the Fourth Lateran Council", "the barons", "King John"],
    ["Without priests, trial by ordeal ended in England.", "What ended without priests?", "trial by ordeal", "Magna Carta", "the Danelaw"],
    ["Magna Carta was reissued, with changes, in 1225.", "What happened to Magna Carta in 1225?", "it was reissued", "it was lost", "it was sold abroad"],
    ["Today, juries still decide guilt in serious cases.", "What do juries still decide in serious cases?", "guilt", "taxes", "wages"]],
    order("Order the events, oldest first.", ["Henry II uses juries to accuse · 1166", "Magna Carta agreed · June 1215", "Fourth Lateran Council · November 1215", "Magna Carta reissued · 1225", "Juries still used · today"], ["1166", "June 1215", "November 1215", "1225", "Today"]), false),
  detective(["Magna Carta was written in Latin on parchment in 1215.", "Scribes made several copies, and a few still survive.", "It lists what the barons wanted from the king.", "Clause 39 talks about free men, so it does not name everyone.", "Many poor villagers were not free men, so clause 39 did not protect them.", "The document was soon reissued, so John's version was not the last.", "The words show what people wanted; they do not prove the king obeyed them."],
    [
    ["Which language was Magna Carta written in?", "Latin", "Greek", "Old English", "written in Latin"],
    ["Who made the copies?", "scribes", "printers", "knights", "Scribes made several copies"],
    ["Whose wishes does Magna Carta list?", "the barons'", "the Vikings'", "the villagers'", "what the barons wanted"],
    ["Why did clause 39 not name everyone?", "it talks about free men", "it was lost", "it was never written down", "it does not name everyone"],
    ["Who was left out of clause 39's protection?", "poor villagers who were not free", "all the barons", "the king's judges", "Many poor villagers were not free men"],
    ["What do the words of Magna Carta not prove?", "that the king obeyed them", "that it was written in 1215", "that scribes made copies", "do not prove the king obeyed them"],
    ["Why was John's version not the last?", "it was reissued", "it was burned", "it was never signed", "was soon reissued"]], { picture: "🖋️", pictureLabel: "A medieval charter" }),
  lesson("🤔", "Magna Carta then and now", [
    ["Magna Carta helped set the idea that the king must obey the law.", "What did Magna Carta help set?", "the idea that the king must obey the law", "the idea that only barons could vote", "the idea that all land belongs to the Church"],
    ["Many people still see that idea as important today.", "How do many people see that idea today?", "as still important", "as long forgotten", "as very cruel"],
    ["At first, clause 39 protected only free men.", "Who did clause 39 protect at first?", "only free men", "every person alive", "only the king's family"],
    ["Over time, laws came to protect all people.", "What happened to laws over time?", "they protected all people", "they protected fewer people", "they protected only barons"],
    ["Trial by ordeal ended, but juries are still used today.", "What is still used today?", "juries", "trial by ordeal", "the Danelaw"],
    ["Early jurors might already know the facts; later jurors heard evidence.", "What did later jurors do?", "heard evidence", "chose the king", "collected taxes"]],
    sort("Ended or still important?", ["Ended or changed", "Still important"], [["trial by ordeal", 0], ["protection for free men only", 0], ["the king obeying the law", 1], ["juries", 1]], ["Trial by ordeal ended", "only free men", "king must obey the law", "juries are still used"])),
]);
