import { lesson, detective, sort, order, year6Topic, BRITAIN_TIMELINE } from "./authoring.js";
export const changeAndContinuity = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zy3tyrd", "https://www.nationalarchives.gov.uk/education/", "https://www.english-heritage.org.uk/learn/"], [
  lesson("🔄", "Change and continuity", [
    ["Change means something becomes different over time.", "What does change mean?", "something becomes different", "something stays exactly the same", "something is forgotten"],
    ["Continuity means something stays the same over time.", "What does continuity mean?", "something stays the same", "something is brand new", "something disappears"],
    ["Fines were used in Anglo-Saxon times and are still used today.", "Which punishment has lasted a long time?", "fines", "transportation", "trial by ordeal"],
    ["Trial by ordeal stopped after 1215.", "What stopped after 1215?", "trial by ordeal", "fines", "juries"],
    ["Trial by jury took over after 1215, and juries are still used for serious crimes.", "Which idea took over after 1215 and continues?", "juries", "highwaymen", "night watchmen"],
    ["Peel started London's police in 1829.", "What did Peel start in 1829?", "London's police", "Magna Carta", "the Poor Law"]],
    sort("Change or continuity?", ["Change", "Continuity"], [["trial by ordeal stopped", 0], ["Peel started London's police", 0], ["fines are still used", 1], ["juries are still used", 1]], ["Trial by ordeal stopped", "Peel started London's police", "still used", "still used"])),
  lesson("📅", "Law and order over time", [
    ["The Normans conquered England in 1066.", "When did the Normans conquer England?", "1066", "1215", "1829"],
    ["King John agreed Magna Carta in 1215.", "What happened in 1215?", "King John agreed Magna Carta", "Peel started the police", "the Poor Law began"],
    ["The Poor Law began in 1601.", "What began in 1601?", "the Poor Law", "Magna Carta", "the first police"],
    ["London's police began in 1829.", "What began in 1829?", "London's police", "the Poor Law", "trial by jury"],
    ["Fingerprints were used by police from 1901.", "What did police use from 1901?", "fingerprints", "DNA", "Magna Carta"],
    ["Police first used DNA to solve a crime in the 1980s.", "When did police first use DNA?", "in the 1980s", "in the 1700s", "in 1066"]],
    order("Order the events, oldest first.", ["Normans conquer England · 1066", "Magna Carta · 1215", "Poor Law · 1601", "Police formed in London · 1829"], ["1066", "1215", "1601", "1829"]), BRITAIN_TIMELINE),
  detective(["Map A shows a village in 1850.", "Map B shows the same village in 1950.", "Both maps show the church in the same place.", "Map A shows fields beside the river.", "Map B shows houses on those fields.", "Map B also shows a railway line.", "A map cannot tell us how people felt about the change."],
    [
    ["What do both maps show in the same place?", "the church", "the railway", "the fields", "Both maps show the church in the same place."],
    ["What is beside the river on Map A?", "fields", "houses", "a railway", "Map A shows fields beside the river."],
    ["What stands on those fields on Map B?", "houses", "cows", "the church", "Map B shows houses on those fields."],
    ["Which map shows a railway line?", "Map B", "Map A", "neither map", "Map B also shows a railway line."],
    ["Which year does Map A show?", "1850", "1950", "1066", "Map A shows a village in 1850."],
    ["What stayed the same between the maps?", "the church's place", "the fields", "the number of houses", "Both maps show the church in the same place."],
    ["What can a map not tell us?", "how people felt", "where the church is", "where the river is", "A map cannot tell us how people felt about the change."]], { picture: "🗺️", pictureLabel: "Two maps of one village" }),
  lesson("⏳", "Fast and slow change", [
    ["The Metropolitan Police began in 1829.", "When did the Metropolitan Police begin?", "in 1829", "in 1215", "in 1066"],
    ["Many people thought harsh punishments were wrong, and laws changed slowly.", "How did laws about harsh punishments change?", "slowly", "overnight", "never"],
    ["Palmer's shipyard closed in 1934.", "When did Palmer's shipyard close?", "in 1934", "in 1851", "in 1066"],
    ["Pupils stopped using slate boards over many years.", "How did slate boards stop being used?", "over many years", "on one day", "in one hour"],
    ["Some changes are fast and others are slow.", "Which statement is true?", "some changes are fast and some slow", "all changes are fast", "no changes happen"],
    ["Historians ask whether a change was fast, slow, big or small.", "What do historians ask about change?", "was it fast, slow, big or small", "what was it called", "who won a race"]],
    sort("Fast or slow change?", ["Fast change", "Slow change"], [["The Metropolitan Police began in 1829", 0], ["Palmer's shipyard closed in 1934", 0], ["laws changed slowly", 1], ["over many years", 1]], ["Metropolitan Police began in 1829", "Palmer's shipyard closed in 1934", "laws changed slowly", "over many years"])),
]);
