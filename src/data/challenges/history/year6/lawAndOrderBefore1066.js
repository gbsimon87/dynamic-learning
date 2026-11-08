import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const lawAndOrderBefore1066 = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/"], [
  lesson("⚖️", "Law before 1066", [
    ["There was no police force, so neighbours kept the peace together.", "Who helped keep the peace in a village?", "the neighbours", "police officers", "castle guards"],
    ["A tithing was a group of neighbours who answered for each other.", "What was a tithing?", "a group of neighbours", "a royal court", "a kind of silver coin"],
    ["After a crime, people raised the hue and cry to chase the thief.", "Why did people raise the hue and cry?", "to chase the thief", "to open a village market", "to crown a king"],
    ["A moot was a local meeting where disputes were heard.", "What was a moot?", "a local meeting", "a royal castle", "a village market stall"],
    ["Wergild was a payment to a victim's family, and other fines were paid too.", "What was wergild?", "a payment to a victim's family", "a prison for thieves", "a tax paid to the Viking raiders"],
    ["In the late 800s, King Alfred collected laws into a law code.", "When did Alfred collect laws into a code?", "the late 800s", "the late 1200s", "the early 1600s"]],
    sort("Community job or payment?", ["Community job", "Payment"], [["tithing", 0], ["hue and cry", 0], ["wergild", 1], ["fines", 1]], ["tithing", "hue and cry", "Wergild", "fines"])),
  lesson("📅", "Law across the centuries", [
    ["Roman rule in Britain ended in about AD 410.", "When did Roman rule in Britain end?", "about AD 410", "AD 43", "1066"],
    ["King Alfred's law code was written down in the late 800s.", "When was Alfred's law code written down?", "the late 800s", "the late 1100s", "the early 1500s"],
    ["From the 880s, the Danelaw was an area that followed Viking law.", "Which law applied in the Danelaw?", "Viking law", "Roman law", "Norman law"],
    ["King Cnut, a Dane, ruled England from 1016.", "Who ruled England from 1016?", "King Cnut", "King John", "King Alfred"],
    ["In 1066, the Normans conquered England.", "Who conquered England in 1066?", "the Normans", "the Romans", "the Vikings"],
    ["Police like ours began in London in 1829, over 700 years later.", "When did police like ours begin in London?", "1829", "1066", "1016"]],
    order("Order the events, oldest first.", ["Romans leave · about AD 410", "Alfred's law code · late 800s", "Cnut becomes king · 1016", "Normans conquer England · 1066"], ["about AD 410", "late 800s", "1016", "1066"]), false),
  detective(["Alfred's law code was written down in the late 800s.", "It lists payments to be made for harm done.", "A king and his advisers decided what went into the code.", "It shows what the king wanted, not how often people obeyed.", "Few written records of ordinary village disputes survive.", "Monks wrote chronicles describing some events in the king's reign.", "A historian must ask who wrote each source, and why."],
    [
    ["When was Alfred's law code written down?", "the late 800s", "the late 1400s", "the early 1900s", "late 800s"],
    ["What does the law code list?", "payments for harm done", "names of every thief", "maps of every Saxon village", "payments to be made for harm done"],
    ["Who decided what went into the code?", "a king and his advisers", "ordinary village farmers", "Norman judges", "A king and his advisers decided"],
    ["What can the code not show us?", "how often people obeyed", "that kings made laws", "that harm could be paid for", "not how often people obeyed"],
    ["What is hard to find from this time?", "records of village disputes", "laws written down by kings", "chronicles written by monks", "Few written records of ordinary village disputes survive."],
    ["Who wrote chronicles of the king's reign?", "monks", "police officers", "jurors", "Monks wrote chronicles"],
    ["What must a historian ask about a source?", "who wrote it, and why", "how heavy it is", "how many words it has", "who wrote each source, and why"]], { picture: "📜", pictureLabel: "An old law code" }),
  lesson("🤔", "What changed, what stayed", [
    ["With no police, communities had to deal with crime themselves.", "Why did communities deal with crime themselves?", "there were no police", "everyone obeyed every law", "the Vikings did it for them"],
    ["Wergild aimed to stop families taking revenge on each other.", "What was wergild meant to stop?", "families taking revenge", "fines being paid to a king", "kings making laws"],
    ["In a trial by ordeal, such as carrying hot iron, people believed God would show the truth.", "Why did people use trial by ordeal?", "they believed God would show the truth", "they trusted the work of police detectives", "a jury had already decided"],
    ["Today, courts weigh evidence instead of using ordeals.", "What has replaced ordeals?", "weighing evidence", "calling the hue and cry", "paying wergild"],
    ["Police officers now do much of the work that neighbours once did.", "Who now does much of the work neighbours once did?", "police officers", "monks", "the old tithing groups"],
    ["Some ideas last: crimes are still reported and fines are still paid.", "Which Anglo-Saxon idea still exists today?", "fines", "ordeals", "wergild"]],
    sort("Anglo-Saxon times or today?", ["Anglo-Saxon times", "Today"], [["wergild", 0], ["trial by ordeal", 0], ["police officers", 1], ["courts weighing evidence", 1]], ["Wergild", "trial by ordeal", "Police officers", "courts weigh evidence"])),
]);
