import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const theOlympicGames = year5Topic(["https://whc.unesco.org/en/list/517/", "https://www.britishmuseum.org/learn/schools", "https://www.worldhistory.org/Olympic_Games/"], [
  lesson("🏅", "The first Games", [
    ["The first Olympic Games were held in 776 BC.", "When were the first Games held?", "776 BC", "508 BC", "490 BC"],
    ["They took place at Olympia, in honour of Zeus.", "Where were the Games held?", "Olympia", "Athens", "Sparta"],
    ["The Games were held every four years.", "How often were the Games held?", "every four years", "every year", "every ten years"],
    ["Athletes ran races, wrestled and raced chariots.", "What did athletes do?", "ran, wrestled and raced chariots", "played football and tennis", "built temples"],
    ["Winners were given a wreath of olive leaves.", "What did winners get?", "an olive wreath", "a gold medal", "a silver cup"],
    ["Wars stopped during the Games so travellers were safe.", "Why did wars stop?", "so travellers were safe", "so armies could join the race", "so generals could vote"]],
    sort("An event or a prize?", ["An event", "A prize"], [["running", 0], ["wrestling", 0], ["chariot racing", 0], ["olive wreath", 1]], ["ran races", "wrestled", "raced chariots", "wreath of olive leaves"])),
  lesson("📅", "The Games through time", [
    ["The first Games were held in 776 BC.", "When were the first Games held?", "776 BC", "508 BC", "146 BC"],
    ["The Games continued for over a thousand years.", "How long did the Games continue?", "over a thousand years", "about ten years", "exactly one hundred years"],
    ["The Games carried on after Rome took control of Greece in 146 BC.", "Who took control of Greece but let the Games go on?", "Rome", "Persia", "Sparta"],
    ["A Roman emperor ended the ancient Games about AD 393.", "When did the ancient Games end?", "about AD 393", "776 BC", "1896"],
    ["Olympia's temples and track lay buried for centuries.", "What lay buried for centuries?", "Olympia's temples and track", "the Parthenon", "the city of Athens"],
    ["The modern Games began in Athens in 1896.", "When did the modern Games begin?", "1896", "776 BC", "AD 393"]],
    order("Order the events, oldest first.", ["First Games · 776 BC", "Rome controls Greece · 146 BC", "Ancient Games end · about AD 393", "Modern Games begin · 1896"], ["776 BC", "146 BC", "AD 393", "1896"]), GREEK_TIMELINE),
  detective(["Our drawing shows a ring of olive leaves.", "At Olympia, winners were given one.", "The leaves came from a sacred olive tree.", "Old poems and carved lists name some winners.", "Archaeologists have found the stadium track at Olympia.", "These sources do not tell us how every athlete felt.", "Our drawing is not a real wreath."],
    [
    ["What does our drawing show?", "a ring of olive leaves", "a gold medal", "a silver coin", "a ring of olive leaves"],
    ["Who was given the wreath at Olympia?", "winners", "the losers", "the kings of Persia", "winners were given one"],
    ["Where did the leaves come from?", "a sacred olive tree", "a Spartan farm", "a Roman garden", "a sacred olive tree"],
    ["What names some winners?", "old poems and carved lists", "modern newspapers", "television", "Old poems and carved lists name some winners."],
    ["What have archaeologists found at Olympia?", "the stadium track", "the Parthenon", "a pyramid", "found the stadium track at Olympia"],
    ["What do these sources not tell us?", "how every athlete felt", "that Olympia existed", "where Olympia was", "do not tell us how every athlete felt"],
    ["Is our drawing a real wreath?", "no, it is our drawing", "yes, it is two thousand years old", "yes, it was found at Olympia", "Our drawing is not a real wreath."]], { scene: "y5-olive-wreath", picture: "🏅", pictureLabel: "An olive wreath" }),
  lesson("🤔", "Who took part?", [
    ["Only free Greek men could take part in the ancient Games.", "Who could take part in the ancient Games?", "free Greek men", "all Greek women", "anyone from any country"],
    ["Women and enslaved people could not compete.", "Who could not compete?", "women and enslaved people", "free Greek men", "athletes from Athens"],
    ["The Games were part of a religious festival for Zeus.", "Who was the festival for?", "Zeus", "Athena", "Poseidon"],
    ["Cities were proud when one of their athletes won.", "How did cities feel when an athlete won?", "proud", "ashamed", "bored"],
    ["The Games helped Greeks from different cities feel linked.", "What did the Games help Greeks feel?", "linked", "separate", "afraid"],
    ["Modern Games use the name and some ideas, but they are different.", "What is true of the modern Games?", "they share a name but are different", "they are exactly the same", "they are held for Zeus"]],
    sort("Could take part or not?", ["Could take part", "Could not take part"], [["free Greek men", 0], ["women", 1], ["enslaved people", 1]], ["free Greek men", "Women and enslaved people", "Women and enslaved people"])),
]);
