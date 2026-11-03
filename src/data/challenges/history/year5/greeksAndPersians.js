import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const greeksAndPersians = year5Topic(["https://www.britannica.com/event/Greco-Persian-Wars", "https://www.worldhistory.org/Greco-Persian_Wars/", "https://www.worldhistory.org/Herodotus/"], [
  lesson("⚔️", "Greeks and Persians", [
    ["Persia was a huge empire to the east of Greece.", "Where was Persia?", "east of Greece", "west of Greece", "north of Britain"],
    ["Its king, Darius, wanted to rule Greece.", "Who wanted to rule Greece?", "King Darius", "King Alfred", "King Cnut"],
    ["In 490 BC, his army landed at Marathon.", "Where did his army land in 490 BC?", "Marathon", "Salamis", "Sparta"],
    ["The Athenians won the Battle of Marathon.", "Who won the Battle of Marathon?", "the Athenians", "the Persians", "the Romans"],
    ["In 480 BC, Greek ships won a sea battle at Salamis.", "What kind of battle was Salamis?", "a sea battle", "a chariot race", "a battle in the mountains"],
    ["The Greeks won the war in the end.", "Who won the war in the end?", "the Greeks", "the Persians", "the Romans"]],
    sort("Greek side or Persian side?", ["Greek side", "Persian side"], [["Athenians", 0], ["Greek ships", 0], ["King Darius", 1], ["Persia", 1]], ["Athenians", "Greek ships", "Darius", "Persia"])),
  lesson("📅", "The Persian Wars in order", [
    ["In 490 BC, the Athenians won at Marathon.", "Who won at Marathon?", "the Athenians", "the Persians", "the Spartans"],
    ["Legend says a runner took the news from Marathon to Athens.", "What does legend say a runner did?", "took the news to Athens", "won an Olympic race", "built a ship"],
    ["In 480 BC, the Persians returned with a bigger army.", "When did the Persians return?", "480 BC", "490 BC", "479 BC"],
    ["In 480 BC, a small Greek force held the pass at Thermopylae for days.", "Which place did a small Greek force hold?", "Thermopylae", "Marathon", "Plataea"],
    ["Later in 480 BC, Greek ships won at Salamis.", "Where did Greek ships win later in 480 BC?", "Salamis", "Thermopylae", "Marathon"],
    ["In 479 BC, the Greeks won at Plataea, and the Persians left.", "When did the Greeks win at Plataea?", "479 BC", "490 BC", "480 BC"]],
    order("Order the battles, oldest first.", ["Marathon · 490 BC", "Thermopylae · 480 BC", "Salamis · later in 480 BC", "Plataea · 479 BC"], ["490 BC", "Thermopylae", "Later in 480 BC", "479 BC"]), GREEK_TIMELINE),
  detective(["A Greek writer named Herodotus wrote a book about these wars.", "He lived in the 400s BC, after the battles.", "He asked travellers and soldiers what they remembered.", "He also wrote down stories he was not sure about.", "He was Greek, so he wrote mostly from the Greek side.", "Few Persian accounts of these battles survive.", "So historians compare Herodotus with other evidence, such as archaeology."],
    [
    ["Who wrote a book about the wars?", "Herodotus", "Homer", "Cleisthenes", "A Greek writer named Herodotus"],
    ["When did he live?", "the 400s BC", "the 1800s", "the AD 400s", "He lived in the 400s BC"],
    ["How did he find out what happened?", "asked travellers and soldiers", "watched the battles on film", "read only Persian records", "asked travellers and soldiers what they remembered"],
    ["What else did he write down?", "stories he was not sure about", "only proved facts", "only maps", "stories he was not sure about"],
    ["Which side did he mostly write from?", "the Greek side", "the Persian side", "the Roman side", "mostly from the Greek side"],
    ["What survives only in small amounts?", "Persian accounts of the battles", "Greek accounts of the battles", "statues of Athena", "Few Persian accounts of these battles survive."],
    ["What do historians do with his book?", "compare it with other evidence", "ignore archaeology", "believe every story", "historians compare Herodotus with other evidence"]], { picture: "📜", pictureLabel: "A Greek writer's book" }),
  lesson("🤔", "Why the wars mattered", [
    ["Persia was much bigger than any Greek city-state.", "How big was Persia?", "much bigger than any city-state", "smaller than Sparta", "the same as Athens"],
    ["Many people died in the battles, on both sides.", "Who died in the battles?", "people on both sides", "only Persians", "only Greeks"],
    ["The Greek win helped Athens grow rich and confident.", "How did Athens grow after winning?", "rich and confident", "poor and afraid", "smaller"],
    ["Athens led a group of cities and collected money from them.", "What did Athens collect from other cities?", "money", "mud bricks", "olive trees"],
    ["Sparta and other cities began to worry about Athens.", "Who began to worry about Athens?", "Sparta and other cities", "Persia only", "the Romans"],
    ["That worry later led to the Peloponnesian War.", "What did the worry lead to later?", "the Peloponnesian War", "the Olympic Games", "the Parthenon"]],
    sort("Before or after the Greek win?", ["Before", "After"], [["Persia much bigger", 0], ["Athens grew rich", 1], ["Peloponnesian War", 1]], ["much bigger", "rich and confident", "Peloponnesian War"])),
]);
