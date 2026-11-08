import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const crimeFightingToday = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://le.ac.uk/"], [
  lesson("🔬", "Crime fighting today", [
    ["Scotland Yard's Fingerprint Bureau began in 1901.", "What began at Scotland Yard in 1901?", "a Fingerprint Bureau", "a modern DNA laboratory", "a CCTV office"],
    ["Each person's fingerprints are unique.", "What is true of fingerprints?", "each person's are unique", "everyone shares the same ones", "they change every day"],
    ["In 1984, Alec Jeffreys at Leicester discovered DNA profiling.", "Who discovered DNA profiling?", "Alec Jeffreys", "Sir Robert Peel", "John Howard"],
    ["DNA was first used to solve a crime in the late 1980s.", "When was DNA first used to solve a crime?", "the late 1980s", "the late 1880s", "the early 1960s"],
    ["CCTV cameras, computers and databases also help police.", "Which of these helps police today?", "CCTV cameras", "a rattle", "a hue and cry"],
    ["Police still need witnesses and careful questions.", "What do police still need?", "witnesses", "trial by ordeal", "Bow Street Runners"]],
    sort("Body clue or technology?", ["From a person's body", "From technology"], [["fingerprints", 0], ["DNA", 0], ["CCTV", 1], ["computers", 1]], ["fingerprints", "DNA", "CCTV", "computers"])),
  lesson("📅", "Modern crime fighting in order", [
    ["The Fingerprint Bureau at Scotland Yard began in 1901.", "When did the Fingerprint Bureau begin?", "1901", "1801", "1951"],
    ["The death penalty for murder ended in Britain in 1965.", "What ended in Britain in 1965?", "the death penalty for murder", "the use of fingerprint evidence in court", "youth courts"],
    ["Community service began as a punishment in the 1970s.", "In which decade did community service begin?", "the 1970s", "the 1870s", "the 1920s"],
    ["Alec Jeffreys discovered DNA profiling in 1984.", "What did Jeffreys discover in 1984?", "DNA profiling", "fingerprint matching", "CCTV"],
    ["DNA was first used to solve a crime in the late 1980s.", "What was first used to solve a crime in the late 1980s?", "DNA", "a whistle", "a truncheon"],
    ["Youth courts now deal with young people, and juries still hear serious cases.", "Which courts now deal with young people?", "youth courts", "moots", "Forest courts"]],
    order("Order the events, oldest first.", ["Fingerprint Bureau · 1901", "Death penalty for murder ends · 1965", "Community service begins · 1970s", "DNA profiling discovered · 1984", "DNA solves a crime · late 1980s"], ["1901", "1965", "1970s", "1984", "late 1980s"]), false),
  detective(["A fingerprint found at a crime scene can match one person.", "A match shows someone touched something, but not when or why.", "DNA evidence is strong, but it needs careful testing and checking.", "CCTV shows what a camera saw, but cameras do not cover everywhere.", "A witness may be honest but still remember things wrongly.", "Courts must be sure, beyond reasonable doubt, before a person is found guilty.", "Police and courts weigh different kinds of evidence together."],
    [
    ["What can a fingerprint at a crime scene match?", "one person", "every person", "a whole street", "can match one person"],
    ["What does a fingerprint match not show?", "when or why it was touched", "that something was touched", "that a hand was there", "but not when or why"],
    ["What does DNA evidence need?", "careful testing and checking", "no checking or testing at all", "a lucky guess", "needs careful testing and checking"],
    ["What does CCTV show?", "what a camera saw", "what everyone thought", "every street at once", "CCTV shows what a camera saw"],
    ["Why should a witness's memory be checked?", "honest people can remember wrongly", "witnesses never tell the truth at all", "memory never changes", "honest but still remember things wrongly"],
    ["What must courts be before finding someone guilty?", "sure, beyond reasonable doubt", "a little bit unsure", "in a very great hurry", "must be sure, beyond reasonable doubt"],
    ["What do police and courts do with evidence?", "weigh different kinds together", "use only the very first clue found", "ignore the hard parts", "weigh different kinds of evidence together"]], { picture: "🔍", pictureLabel: "A magnifying glass over a clue" }),
  lesson("🤔", "What has changed, what has not", [
    ["Technology helps police solve more crimes than before.", "What does technology help police do?", "solve more crimes", "avoid all crime for ever", "replace judges"],
    ["Police still need witnesses, because technology cannot answer every question.", "Why do police still need witnesses?", "technology cannot answer every question", "cameras are banned in every police station", "juries cannot hear them"],
    ["The death penalty for murder ended in 1965, and views about it still differ.", "What still differs about the death penalty today?", "people's views", "the date it ended", "its court"],
    ["Modern punishments include fines, community service and prison.", "Which is a modern punishment?", "community service", "trial by ordeal", "transportation to Australia"],
    ["Courts today need evidence beyond reasonable doubt, not just a guess.", "What do courts need today?", "evidence beyond reasonable doubt", "just a good guess about what happened", "a hue and cry"],
    ["In England and Wales, juries of twelve people still decide guilt in serious cases.", "How many people sit on a jury in England and Wales?", "twelve", "three", "forty-four"]],
    sort("Changed or stayed the same?", ["Changed", "Stayed the same"], [["the death penalty for murder", 0], ["technology used by police", 0], ["juries", 1], ["witnesses", 1]], ["death penalty for murder", "Technology", "Juries", "witnesses"])),
]);
