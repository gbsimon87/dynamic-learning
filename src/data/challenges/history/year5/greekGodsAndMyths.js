import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const greekGodsAndMyths = year5Topic(["https://www.britishmuseum.org/learn/schools", "https://www.worldhistory.org/Greek_Mythology/", "https://www.britannica.com/topic/Greek-religion"], [
  lesson("⚡", "Greek gods", [
    ["The Greeks believed in many gods and goddesses.", "What did the Greeks believe in?", "many gods and goddesses", "one god only", "no gods at all"],
    ["Twelve main gods lived on Mount Olympus.", "Where did the twelve main gods live?", "Mount Olympus", "the Acropolis", "the island of Crete"],
    ["Zeus was king of the gods and ruled the sky.", "Who was king of the gods?", "Zeus", "Poseidon", "Athena"],
    ["Poseidon was god of the sea.", "Who was god of the sea?", "Poseidon", "Zeus", "Athena"],
    ["Athena was goddess of wisdom, and Athens was named for her.", "Which goddess was Athens named for?", "Athena", "Hera", "Artemis"],
    ["Myths were stories about gods and heroes.", "What were myths?", "stories about gods and heroes", "laws about voting", "records of tax"]],
    sort("A god or a place?", ["A god or goddess", "A place"], [["Zeus", 0], ["Poseidon", 0], ["Athena", 0], ["Mount Olympus", 1], ["Athens", 1]], ["Zeus", "Poseidon", "Athena", "Mount Olympus", "Athens"])),
  lesson("📅", "Gods across time", [
    ["Greek myths were told aloud long before they were written down.", "How were myths first told?", "aloud", "printed in books", "carved on every vase"],
    ["A poet called Homer wrote about heroes and gods about 750 BC.", "Who wrote about heroes and gods?", "Homer", "Cleisthenes", "Pericles"],
    ["Greeks held festivals for the gods, such as the Olympic Games of 776 BC.", "Which festival for the gods began in 776 BC?", "the Olympic Games", "the Assembly", "the Persian Wars"],
    ["The Parthenon honoured Athena and was begun in 447 BC.", "Which goddess did the Parthenon honour?", "Athena", "Hera", "Poseidon"],
    ["Temples to the gods were built in cities all over Greece.", "Where were temples built?", "in cities all over Greece", "only in Sparta", "only on Crete"],
    ["By 146 BC, Rome ruled Greece, and Romans copied many Greek gods.", "Who copied many Greek gods?", "the Romans", "the Vikings", "the Anglo-Saxons"]],
    order("Order the events, oldest first.", ["Olympic Games · 776 BC", "Homer's poems · about 750 BC", "Parthenon begun · 447 BC", "Rome rules Greece · 146 BC"], ["776 BC", "750 BC", "447 BC", "146 BC"]), GREEK_TIMELINE),
  detective(["In one myth, Persephone is taken to the underworld.", "Her mother Demeter, goddess of the harvest, is so sad that crops stop growing.", "Persephone returns each spring, and the crops grow again.", "The Greeks used this myth to explain the seasons.", "Today we explain the seasons by the tilt of the Earth.", "The myth is a story, not a record of real events.", "But it shows what Greeks believed and valued."],
    [
    ["Who is taken to the underworld in the myth?", "Persephone", "Demeter", "Athena", "Persephone is taken to the underworld."],
    ["What was Demeter the goddess of?", "the harvest", "the sea", "war", "goddess of the harvest"],
    ["What happens to crops when Demeter is sad?", "they stop growing", "they grow faster", "they turn to gold", "crops stop growing"],
    ["When does Persephone return?", "each spring", "each winter", "never", "returns each spring"],
    ["What did the Greeks use the myth to explain?", "the seasons", "how to vote", "how to build ships", "to explain the seasons"],
    ["How do we explain the seasons today?", "the tilt of the Earth", "a goddess's sadness", "Zeus's thunder", "the tilt of the Earth"],
    ["Is the myth a record of real events?", "no, it is a story", "yes, it is exact history", "yes, it is a diary", "not a record of real events"]], { picture: "📜", pictureLabel: "A Greek myth" }),
  lesson("🤔", "Why myths mattered", [
    ["Greeks used myths to explain things they could not see, such as storms.", "What did myths help Greeks explain?", "things they could not see", "how to build ships", "how to count to ten"],
    ["Zeus was blamed for thunder and lightning.", "Who was blamed for thunder?", "Zeus", "Athena", "Poseidon"],
    ["Greeks asked the gods for help with prayers and gifts.", "How did Greeks ask the gods for help?", "with prayers and gifts", "with voting slips", "with pottery pieces"],
    ["At Delphi, a priestess gave answers that people believed came from Apollo.", "Where did a priestess give answers from Apollo?", "Delphi", "Athens", "Crete"],
    ["Different cities had different favourite gods.", "What differed between cities?", "their favourite gods", "their language", "their sea"],
    ["Myths tell us what Greeks thought, even if they are not true history.", "What do myths tell us?", "what Greeks thought", "exactly what happened", "nothing at all"]],
    sort("What Greeks did or believed?", ["What Greeks did", "What Greeks believed"], [["prayers and gifts", 0], ["asking Delphi", 0], ["Zeus caused thunder", 1], ["different favourite gods", 1]], ["prayers and gifts", "Delphi", "blamed for thunder", "favourite gods"])),
]);
