import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const democracyInAthens = year5Topic(["https://www.worldhistory.org/Athenian_Democracy/", "https://www.britannica.com/topic/Athenian-democracy", "https://whc.unesco.org/en/list/404/"], [
  lesson("🗳️", "Democracy in Athens", [
    ["Democracy means rule by the people.", "What does democracy mean?", "rule by the people", "rule by one king", "rule by soldiers"],
    ["Athens began its democracy about 508 BC.", "When did Athenian democracy begin?", "about 508 BC", "about 776 BC", "about AD 43"],
    ["Citizens met in an Assembly to vote on laws.", "Where did citizens vote on laws?", "in the Assembly", "at the Olympic Games", "in the Parthenon"],
    ["Only adult men born in Athens were citizens.", "Who were citizens?", "adult men born in Athens", "all adults in Athens", "only the king's family"],
    ["Women, foreigners and enslaved people could not vote.", "Who could not vote?", "women, foreigners and enslaved people", "farmers and sailors", "only rich men"],
    ["Juries of citizens decided court cases.", "Who decided court cases?", "juries of citizens", "one king", "Spartan generals"]],
    sort("Could vote or could not?", ["Could vote", "Could not vote"], [["adult men born in Athens", 0], ["citizens in the Assembly", 0], ["women", 1], ["foreigners", 1], ["enslaved people", 1]], ["adult men born in Athens", "Women", "foreigners", "enslaved people"])),
  lesson("📅", "How democracy changed", [
    ["Before 508 BC, a few rich families and strong rulers held power.", "Who held power before 508 BC?", "a few rich families", "all citizens", "the Assembly"],
    ["About 508 BC, a leader called Cleisthenes made reforms.", "Who made reforms about 508 BC?", "Cleisthenes", "Pericles", "Alexander"],
    ["These reforms began Athenian democracy.", "What did the reforms begin?", "democracy", "the Olympic Games", "the Persian Wars"],
    ["Pericles led Athens from about 461 BC, when democracy was strong.", "Who led Athens from about 461 BC?", "Pericles", "Cleisthenes", "Alexander"],
    ["Macedon limited Athenian democracy in 322 BC.", "Who limited Athenian democracy in 322 BC?", "Macedon", "Sparta", "Persia"],
    ["Today, many countries use democracy of different kinds.", "What do many countries use today?", "democracy of different kinds", "no government", "rule by one Athenian king"]],
    order("Order the events, oldest first.", ["Rich families hold power · before 508 BC", "Cleisthenes' reforms · about 508 BC", "Pericles leads Athens · from 461 BC", "Macedon limits democracy · 322 BC"], ["Before 508 BC", "508 BC", "461 BC", "322 BC"]), GREEK_TIMELINE),
  detective(["This drawing shows a broken pot piece called an ostrakon.", "Athenians scratched a name on one to vote.", "Citizens could vote to send one powerful man away for ten years.", "Archaeologists have found thousands of real ostraka in Athens.", "The word ostracism comes from ostrakon.", "Some ostraka share handwriting, which suggests someone prepared them in advance.", "Our drawing has a made-up name, not a real vote."],
    [
    ["What did Athenians scratch a name on to vote?", "a broken pot piece", "a stone wall", "a papyrus scroll", "scratched a name on one to vote"],
    ["What could citizens vote to do?", "send a powerful man away", "choose a new god", "build a theatre", "send one powerful man away"],
    ["For how long was he sent away?", "ten years", "one year", "for ever", "away for ten years"],
    ["How do we know it happened?", "archaeologists found real ostraka", "a modern film shows it", "nobody wrote anything down", "found thousands of real ostraka"],
    ["Which English word comes from ostrakon?", "ostracism", "democracy", "marathon", "The word ostracism comes from ostrakon."],
    ["What does shared handwriting suggest?", "someone prepared them in advance", "every voter was a child", "the Romans made them", "someone prepared them in advance"],
    ["Is our drawing a real vote?", "no, it has a made-up name", "yes, it is real", "yes, it is from Athens", "made-up name, not a real vote"]], { scene: "y5-ostrakon", picture: "🗳️", pictureLabel: "A voting piece" }),
  lesson("⚖️", "How fair was it?", [
    ["Athenian democracy was new about 508 BC and gave citizens real power.", "Who had real power?", "citizens", "kings", "helots"],
    ["Citizens voted on many decisions themselves.", "How did citizens decide many things?", "they voted themselves", "a king chose", "an oracle chose"],
    ["Most people living in Athens could not take part.", "Who could not take part?", "most people living in Athens", "all citizens", "every adult man"],
    ["Today we would say it was not fair to everyone.", "What would we say about it today?", "it was not fair to everyone", "it was fair to everyone", "it was exactly like ours"],
    ["Later democracies copied ideas such as voting and juries.", "What did later democracies copy?", "voting and juries", "mud-brick houses", "olive oil lamps"],
    ["Our evidence includes speeches, laws and pottery pieces.", "What is part of our evidence?", "speeches, laws and pottery pieces", "photographs and videos", "emails and texts"]],
    sort("Real power or no say?", ["Real power", "No say"], [["citizens", 0], ["voting themselves", 0], ["most people in Athens", 1]], ["citizens", "themselves", "most people living in Athens"])),
]);
