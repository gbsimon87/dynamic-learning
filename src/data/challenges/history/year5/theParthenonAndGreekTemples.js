import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const theParthenonAndGreekTemples = year5Topic(["https://whc.unesco.org/en/list/404/", "https://www.britishmuseum.org/collection/galleries/the-parthenon", "https://www.worldhistory.org/Parthenon/"], [
  lesson("🏛️", "The Parthenon", [
    ["The Parthenon is a temple on the Acropolis in Athens.", "What is the Parthenon?", "a temple", "a market", "a stadium"],
    ["Acropolis means high city.", "What does Acropolis mean?", "high city", "market place", "sea port"],
    ["It was built for the goddess Athena.", "Who was it built for?", "the goddess Athena", "the god Poseidon", "a Spartan king"],
    ["Builders used white marble.", "What stone did builders use?", "white marble", "red brick", "black glass"],
    ["Tall columns hold up the roof.", "What holds up the roof?", "tall columns", "iron chains", "giant ropes"],
    ["Inside stood a huge statue of Athena.", "What stood inside?", "a huge statue of Athena", "a Roman bath", "a ship"]],
    sort("Outside or inside?", ["Outside", "Inside"], [["tall columns", 0], ["white marble", 0], ["statue of Athena", 1]], ["Tall columns", "white marble", "statue of Athena"])),
  lesson("📅", "Building the Parthenon", [
    ["The Persians burned the old buildings on the Acropolis in 480 BC.", "Who burned the old buildings in 480 BC?", "the Persians", "the Spartans", "the Romans"],
    ["Athens rebuilt them under its leader Pericles.", "Who led the rebuilding?", "Pericles", "Cleisthenes", "Alexander"],
    ["Work on the Parthenon began in 447 BC.", "When did work on the Parthenon begin?", "447 BC", "480 BC", "432 BC"],
    ["Carvers finished the decoration in 432 BC.", "When did carvers finish the decoration?", "432 BC", "447 BC", "508 BC"],
    ["Later it became a church, and then a mosque.", "What did it become later?", "a church, then a mosque", "a theatre", "a shop"],
    ["Today it is a World Heritage Site that visitors can see.", "What is it today?", "a World Heritage Site", "a shopping centre", "a ruin nobody visits"]],
    order("Order the events, oldest first.", ["Old buildings burned · 480 BC", "Parthenon begun · 447 BC", "Decoration finished · 432 BC", "Church, then mosque · later"], ["480 BC", "447 BC", "432 BC", "Later"]), GREEK_TIMELINE),
  detective(["Our drawing shows a Greek temple like the Parthenon.", "It shows steps, tall columns and a triangular roof end.", "The real Parthenon had carvings of gods and heroes on it.", "Colourful paint may once have covered some carvings.", "Today the real Parthenon is damaged.", "A big explosion in 1687 destroyed parts of it.", "Archaeologists and drawings by earlier visitors help us picture it."],
    [
    ["What does our drawing show?", "a Greek temple like the Parthenon", "a Roman fort", "a Viking ship", "a Greek temple like the Parthenon"],
    ["What can we see in the drawing?", "steps, columns and a triangular roof end", "pyramid steps and a sphinx", "a harbour and ships", "steps, tall columns and a triangular roof end"],
    ["What was carved on the real Parthenon?", "gods and heroes", "Roman soldiers", "Viking raiders", "carvings of gods and heroes"],
    ["What may have covered some carvings?", "colourful paint", "gold coins", "snow", "Colourful paint may once have covered some carvings."],
    ["What is the real Parthenon like today?", "damaged", "perfect and new", "hidden under the sea", "Today the real Parthenon is damaged."],
    ["What happened in 1687?", "an explosion damaged it", "it was first built", "it was painted", "A big explosion in 1687"],
    ["What helps us picture the original?", "archaeologists and old drawings", "guessing with no evidence", "only modern buildings", "Archaeologists and drawings by earlier visitors"]], { scene: "y5-parthenon", picture: "🏛️", pictureLabel: "A Greek temple" }),
  lesson("🤔", "What temples tell us", [
    ["Greek temples were homes for gods, not meeting halls.", "What were Greek temples?", "homes for gods", "meeting halls", "schools"],
    ["People gathered at an altar outside to make offerings.", "Where did people make offerings?", "at an altar outside", "on the roof", "inside the market"],
    ["The Parthenon showed Athens' wealth and power.", "What did the Parthenon show?", "Athens' wealth and power", "Sparta's army", "Egypt's pyramids"],
    ["Athens paid for it partly with money from other Greek cities.", "Where did some of the money come from?", "other Greek cities", "Roman taxes", "Maya traders"],
    ["Some Greeks in other cities were unhappy about this.", "How did some other Greeks feel?", "unhappy", "delighted", "bored"],
    ["Today the Parthenon is a symbol of Greece.", "What is the Parthenon today?", "a symbol of Greece", "a Roman fort", "a hidden tomb"]],
    sort("Belief or power?", ["Belief", "Power and wealth"], [["offerings at an altar", 0], ["homes for gods", 0], ["wealth and power", 1], ["money from other cities", 1]], ["offerings", "homes for gods", "wealth and power", "money from other Greek cities"])),
]);
