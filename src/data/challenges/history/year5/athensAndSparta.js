import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const athensAndSparta = year5Topic(["https://www.britannica.com/place/ancient-Greece", "https://www.worldhistory.org/Sparta/", "https://www.worldhistory.org/Peloponnesian_War/"], [
  lesson("🛡️", "Athens and Sparta", [
    ["Athens and Sparta were both Greek city-states.", "What were Athens and Sparta?", "Greek city-states", "Roman forts", "Viking longships"],
    ["Athens was by the sea, with a busy port and market.", "Where was Athens?", "by the sea", "far inland", "beside the River Nile"],
    ["Athens was famous for art, ideas and democracy.", "What was Athens famous for?", "art, ideas and democracy", "only its army", "pyramids and mummies"],
    ["Sparta was inland in the south, and its army was famous.", "What was Sparta famous for?", "its army", "its theatre", "its painted pots"],
    ["Spartan boys left home at seven to train as soldiers.", "How old were Spartan boys when they left home to train?", "seven", "fifteen", "twenty"],
    ["Unfree workers called helots farmed the land for Sparta.", "Who farmed the land for Sparta?", "unfree workers called helots", "Athenian traders", "Spartan kings"]],
    sort("Athens or Sparta?", ["Athens", "Sparta"], [["busy port", 0], ["democracy", 0], ["art", 0], ["famous army", 1], ["helots", 1], ["left home at seven", 1]], ["busy port", "democracy", "art", "army", "helots", "left home at seven"])),
  lesson("📅", "Two cities across time", [
    ["Athens and Sparta were both city-states by about 800 BC.", "Which cities were city-states by about 800 BC?", "Athens and Sparta", "Rome and York", "Jorvik and Mercia"],
    ["In 480 BC they fought Persia together.", "Who did the two cities fight together in 480 BC?", "Persia", "Rome", "Egypt"],
    ["From 447 BC, Athens built the Parthenon.", "What did Athens begin to build in 447 BC?", "the Parthenon", "Hadrian's Wall", "Stonehenge"],
    ["Then they fought each other in the Peloponnesian War, which began in 431 BC.", "In which war did the two cities fight each other?", "the Peloponnesian War", "the Trojan War", "the Roman Civil War"],
    ["Sparta won in 404 BC.", "Who won the war in 404 BC?", "Sparta", "Athens", "Persia"],
    ["Later, Rome ruled both cities.", "Who ruled both cities later?", "Rome", "Persia", "the Vikings"]],
    order("Order the events, oldest first.", ["City-states · about 800 BC", "Fight Persia together · 480 BC", "Parthenon begun · 447 BC", "War begins · 431 BC", "Sparta wins · 404 BC"], ["800 BC", "480 BC", "447 BC", "431 BC", "404 BC"]), GREEK_TIMELINE),
  detective(["A Greek writer named Thucydides wrote about the Peloponnesian War.", "He was an Athenian who lived through the war.", "He tried to check what happened with people who were there.", "He wrote for readers to learn lessons from the past.", "But he was from Athens, so he saw events as an Athenian.", "Spartans left much less writing about the war.", "So historians compare his book with other clues."],
    [
    ["Who wrote about the war?", "Thucydides", "Homer", "Pericles", "A Greek writer named Thucydides"],
    ["Where was Thucydides from?", "Athens", "Sparta", "Rome", "He was an Athenian who lived through the war."],
    ["How did he check events?", "he asked people who were there", "he guessed with no evidence", "he read a modern textbook", "check what happened with people who were there"],
    ["Why did he write?", "so readers could learn lessons", "to win a prize at the Games", "to sell painted pots", "wrote for readers to learn lessons from the past"],
    ["Why might his view be one-sided?", "he was from Athens", "he was a king", "he was a child", "he was from Athens, so he saw events as an Athenian"],
    ["What did Spartans leave about the war?", "much less writing", "far more writing than Athens", "a diary of every day", "Spartans left much less writing about the war."],
    ["What do historians do with his book?", "compare it with other clues", "believe it without checking", "throw it away", "historians compare his book with other clues"]], { picture: "📜", pictureLabel: "A Greek writer's book" }),
  lesson("⚖️", "Alike and different", [
    ["Athens and Sparta were both proud city-states.", "How were Athens and Sparta alike?", "both were proud city-states", "both had no army", "both had no writers"],
    ["Athenian boys learned reading, music and sport.", "What did Athenian boys learn?", "reading, music and sport", "only how to fight", "only farming"],
    ["Spartan citizens spent their lives training for war.", "What did Spartan citizens train for?", "war", "theatre", "trading by sea"],
    ["Spartan women also exercised and owned land.", "What did Spartan women do?", "owned land", "sailed warships", "ruled as kings"],
    ["Athenian women ran the home and could not vote.", "What could Athenian women not do?", "vote", "run the home", "cook meals"],
    ["Both cities relied on unfree or enslaved workers.", "What did both cities rely on?", "unfree or enslaved workers", "paid factory workers", "machines"]],
    sort("Athens or Sparta?", ["Athens", "Sparta"], [["reading and music", 0], ["women could not vote", 0], ["training for war", 1], ["women owned land", 1]], ["reading, music and sport", "could not vote", "training for war", "owned land"])),
]);
