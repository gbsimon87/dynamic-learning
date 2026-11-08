import { topicLessons as lesson, sentence as s, table as t, fix as f, steps } from "../../topicLessons.js";

export const YEAR6_COMPOSITION_EDITING_LESSONS = {
  "formal-register-for-audience-and-purpose": lesson("Match the words to the reader", ["**Register** is the level of formality that suits a reader and purpose.", "Formal writing is precise and clear. It does not need to sound complicated."], [
    s("A formal request", "I would be grateful if the crossing could be repaired.", "The request is polite and precise."),
    t("Compare the register", ["Chatty", "Formal"], [["ask for", "request"], ["go in", "enter"]], "The meanings match, but the reader changes the choice."),
    f("Improve a notice", "Put your bags over there.", "Please leave bags in the lockers provided.", "The second sentence tells visitors exactly what to do."),
    steps("Check before publishing", ["Name the reader.", "Name the purpose.", "Choose clear words that suit both."], "Formal does not mean using the longest word."),
  ]),
  "precising-longer-passages": lesson("Keep the big idea", ["A **précis** is a short version that keeps the main information.", "It leaves out examples and small details without changing the meaning."], [
    s("One clear summary", "Beavers build dams that change streams into ponds.", "This keeps both the action and its important result."),
    t("Keep or leave out?", ["Keep", "Leave out"], [["main result", "a small example"], ["important cause", "repeated detail"]], "A précis needs the important ideas, not every fact."),
    f("Shorten accurately", "Mangroves grow along warm coasts and have tangled roots that shelter young fish from waves.", "Mangrove roots shelter young coastal animals.", "The shorter sentence keeps the key idea."),
    steps("Write a précis", ["Find the main idea.", "Keep the key result.", "Remove extra detail and reread for accuracy."], "Do not add an opinion that the passage did not give."),
  ]),
  "passive-voice-in-writing": lesson("Choose what comes first", ["An active sentence starts with the doer. A passive sentence can start with what was affected.", "Choose the voice that helps the reader notice the most important information."], [
    s("Move the focus", "The storm damaged the bridge. → **The bridge was damaged by the storm.**", "The passive version puts the bridge first."),
    t("Spot the focus", ["Doer first", "Affected thing first"], [["The ranger photographed the bird.", "The bird was photographed by the ranger."], ["The chef prepared the meal.", "The meal was prepared by the chef."]], "Read the first noun to see what the sentence foregrounds."),
    f("Write a report", "The wind blew down the fence.", "The fence was blown down by the wind.", "A damage report may need the fence to come first."),
    steps("Choose a voice", ["Decide what matters most to the reader.", "Put it first.", "Check that the sentence still says who or what acted."], "Passive voice changes presentation; it is not automatically better."),
  ]),
  "subjunctive-forms-in-writing": lesson("Use a special verb form", ["The **subjunctive** helps with imagined situations and formal wishes or demands.", "Useful patterns include **If I were** and **It is essential that ... be**."], [
    s("Imagine a different situation", "If I **were** mayor, I would protect the park.", "Were shows that the situation is imagined."),
    t("Choose the pattern", ["Imagined", "Formal requirement"], [["If the train were later ...", "It is essential that each form be completed."], ["Were the bridge closed ...", "The guide advises that the gate be kept closed."]], "Both patterns use a special verb form for their purpose."),
    f("Make the imagined form", "If Biscuit was taller, he could reach the shelf.", "If Biscuit were taller, he could reach the shelf.", "Were is used for this imagined situation."),
    steps("Check the meaning", ["Is this imagined, wished for or formally required?", "Find the special verb form.", "Read the whole sentence for its intended meaning."], "Not every formal sentence needs the subjunctive."),
  ]),
  "proofreading-for-clarity-and-effect": lesson("Reread like an editor", ["Proofreading means checking spelling, punctuation, grammar and clear meaning.", "Change what needs fixing, then reread the whole sentence."], [
    s("Check the opening", "**The** museum opens at ten.", "A sentence starts with a capital letter and ends with a full stop."),
    t("Proofread in order", ["Check", "Ask yourself"], [["capital letters", "Does every sentence start clearly?"], ["verbs", "Does the verb agree with its subject?"]], "A slow reread helps you notice different kinds of error."),
    f("Repair agreement", "The seeds needs water to grow.", "The seeds need water to grow.", "Seeds is plural, so it needs need."),
    steps("Use an editing routine", ["Read every word.", "Check spelling and punctuation.", "Check grammar and meaning, then read it once more."], "A good edit makes the intended meaning easier to understand."),
  ]),
  "year-6-dictation": lesson("Listen, look, cover and check", ["Dictation helps you practise spelling and punctuation from memory.", "Tap to hear the sentence, or use **Look carefully** if you cannot hear it."], [
    s("Notice the tricky word", "The secretary signed the relevant document.", "Say secretary in chunks, then check its middle letters."),
    t("Check each part", ["Check", "Example"], [["capital letter", "The"], ["end mark", "document."]], "A sentence needs correct words and correct punctuation."),
    f("Choose the spelling", "The musician kept a steady rythm.", "The musician kept a steady rhythm.", "Rhythm has a tricky middle: rhy-thm."),
    steps("Build from memory", ["Listen or look carefully.", "Recall the words in order.", "Check capitals, spellings and the end mark."], "You can show the sentence again; use each look to notice one more detail."),
  ]),
};
