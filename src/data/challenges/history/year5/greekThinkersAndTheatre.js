import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const greekThinkersAndTheatre = year5Topic(["https://www.worldhistory.org/Greek_Theatre/", "https://www.britannica.com/biography/Socrates", "https://www.britishmuseum.org/learn/schools"], [
  lesson("🎭", "Thinkers and theatre", [
    ["Socrates asked people questions to make them think.", "How did Socrates make people think?", "he asked questions", "he gave orders", "he wrote plays"],
    ["Plato was his student and started a school called the Academy.", "What did Plato start?", "a school called the Academy", "the Olympic Games", "a Persian army"],
    ["Aristotle studied plants, animals and how to think clearly.", "What did Aristotle study?", "plants, animals and clear thinking", "pyramids and mummies", "only battles"],
    ["Hippocrates taught doctors to watch patients carefully.", "What did Hippocrates teach doctors?", "to watch patients carefully", "to ignore patients", "to pray and do nothing else"],
    ["Greeks watched plays in open-air theatres.", "Where did Greeks watch plays?", "open-air theatres", "indoor cinemas", "Roman baths"],
    ["Actors wore masks, and all the actors were men.", "What did actors wear?", "masks", "armour", "crowns"]],
    sort("A thinker or theatre?", ["A thinker", "Theatre"], [["Socrates", 0], ["Plato", 0], ["Aristotle", 0], ["masks", 1], ["open-air theatres", 1]], ["Socrates", "Plato", "Aristotle", "masks", "open-air theatres"])),
  lesson("📅", "Thinkers over time", [
    ["Socrates lived in Athens from about 470 to 399 BC.", "Where did Socrates live?", "Athens", "Sparta", "Rome"],
    ["Plato opened the Academy about 387 BC.", "When did Plato open the Academy?", "about 387 BC", "about 508 BC", "about 287 BC"],
    ["Hippocrates lived from about 460 to 370 BC.", "Who lived from about 460 to 370 BC?", "Hippocrates", "Archimedes", "Alexander"],
    ["Aristotle was born in 384 BC and later taught Alexander.", "Whom did Aristotle teach?", "Alexander", "Pericles", "Socrates"],
    ["Archimedes lived from about 287 to 212 BC.", "When did Archimedes live?", "about 287 to 212 BC", "about 470 to 399 BC", "AD 287 to 212"],
    ["Plays were performed at Athens' festival of Dionysus.", "Where were plays performed?", "at the festival of Dionysus", "at the Olympic Games", "at the Assembly"]],
    order("Order the events, oldest first.", ["Socrates dies · 399 BC", "Plato's Academy · about 387 BC", "Aristotle born · 384 BC", "Archimedes dies · 212 BC"], ["399 BC", "387 BC", "384 BC", "212 BC"]), GREEK_TIMELINE),
  detective(["The theatre at Epidaurus still stands in Greece.", "It has stone seats that could hold about fourteen thousand people.", "Visitors say a whisper on the stage can be heard at the top.", "Plays were mostly tragedies and comedies.", "Some Greek plays survive because they were copied by hand for centuries.", "We do not have most of the plays written then.", "So we see only some of what Greeks watched."],
    [
    ["What does the theatre at Epidaurus have?", "stone seats", "marble pyramids", "a Roman bath", "It has stone seats"],
    ["About how many people could it hold?", "fourteen thousand", "fourteen", "a hundred", "about fourteen thousand people"],
    ["What do visitors say they can hear?", "a whisper from the stage", "nothing at all", "only drums", "a whisper on the stage can be heard at the top"],
    ["What kinds of plays were there?", "tragedies and comedies", "films and news", "only sports shows", "mostly tragedies and comedies"],
    ["Why do some plays survive?", "they were copied by hand", "they were printed by machines", "they were carved on the Parthenon", "copied by hand for centuries"],
    ["Do we have most of the plays written then?", "no", "yes, all of them", "yes, most of them", "We do not have most of the plays written then."],
    ["What does this mean for us?", "we see only some of what Greeks watched", "we see everything they watched", "nothing survives", "we see only some of what Greeks watched"]], { picture: "🎭", pictureLabel: "A Greek theatre" }),
  lesson("🤔", "Why Greek thinking mattered", [
    ["Greek thinkers wanted reasons, not only stories about gods.", "What did Greek thinkers want?", "reasons", "only stories", "only gold"],
    ["Hippocrates said illness had natural causes.", "What did Hippocrates say about illness?", "it had natural causes", "gods always caused it", "it did not exist"],
    ["Euclid wrote a famous book on geometry about 300 BC.", "What did Euclid write about?", "geometry", "cooking", "the Olympic Games"],
    ["Plays made people think about right and wrong, and laugh at leaders.", "What did plays make people do?", "think about right and wrong", "forget their history", "copy Persian laws"],
    ["Many thinkers were rich men with time to study.", "Who were many thinkers?", "rich men with time to study", "enslaved workers", "young children"],
    ["We know their ideas partly because pupils wrote them down.", "How do we know their ideas?", "pupils wrote them down", "they were on photographs", "the Romans invented them"]],
    sort("Thinking or theatre?", ["Thinking", "Theatre"], [["reasons", 0], ["geometry", 0], ["right and wrong", 1], ["laugh at leaders", 1]], ["reasons", "geometry", "right and wrong", "laugh at leaders"])),
]);
