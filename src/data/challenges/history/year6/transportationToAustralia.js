import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const transportationToAustralia = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.nationalarchives.gov.uk/education/", "https://www.nma.gov.au/"], [
  lesson("🚢", "Sent across the world", [
    ["From 1788, convicts were sent from Britain to Australia.", "Where were convicts sent from 1788?", "Australia", "Canada", "France"],
    ["The First Fleet had 11 ships, led by Captain Arthur Phillip.", "Who led the First Fleet?", "Captain Arthur Phillip", "Captain James Cook", "Admiral Horatio Nelson"],
    ["It arrived at Botany Bay in January 1788.", "Where did the First Fleet arrive?", "Botany Bay", "Dover Bay", "Plymouth Sound"],
    ["Before this, convicts had been sent to America.", "Where were convicts sent before Australia?", "America", "Africa", "Spain"],
    ["Convicts could be sent for seven years, fourteen years or life.", "Which sentence length could a convict receive?", "fourteen years", "two weeks", "only a few days"],
    ["Until 1868, about 160,000 convicts were sent.", "About how many convicts were sent?", "about 160,000", "about 16,000", "about 1,600,000"]],
    sort("People or places?", ["People", "Places"], [["Captain Arthur Phillip", 0], ["convicts", 0], ["Botany Bay", 1], ["America", 1]], ["Arthur Phillip", "convicts", "Botany Bay", "America"])),
  lesson("📅", "The convict ships in order", [
    ["Convicts were sent to America until the 1770s.", "Until when were convicts sent to America?", "the 1770s", "the 1670s", "the 1870s"],
    ["After America became independent, Britain needed a new place for convicts.", "Why did Britain need a new place for convicts?", "America became independent", "the sea dried up", "no more crimes happened at all"],
    ["The First Fleet sailed from England in 1787.", "When did the First Fleet sail?", "1787", "1707", "1807"],
    ["It reached Australia in January 1788.", "In which year did the First Fleet reach Australia?", "1788", "1688", "1888"],
    ["Convicts kept arriving for about 80 years.", "How long did convicts keep arriving?", "about 80 years", "about 8 years", "about 800 years"],
    ["The last convict ship reached Western Australia in 1868.", "Where did the last convict ship arrive?", "Western Australia", "Sydney Cove", "the island of Newfoundland"]],
    order("Order the events, oldest first.", ["Convicts sent to America · until the 1770s", "First Fleet sails · 1787", "First Fleet reaches Australia · 1788", "Last convict ship arrives · 1868"], ["1770s", "1787", "1788", "1868"]), false),
  detective(["Officers kept journals of the voyage and the first settlement.", "Convict records list names, crimes and sentences.", "Officials wrote down lists of convicts, so many records survive.", "Many convicts could not write, so few left diaries.", "Officers' journals show the officers' views, not the convicts' views.", "Aboriginal peoples already lived there, but early British records mostly give the settlers' side.", "Historians read many sources to hear different voices."],
    [
    ["What did officers keep?", "journals", "shop accounts", "tickets for trains", "Officers kept journals"],
    ["What do convict records list?", "names, crimes and sentences", "recipes and songs for the voyage", "ship repairs only", "list names, crimes and sentences"],
    ["Why do many convict records survive?", "officials wrote down lists", "convicts printed newspapers", "ships kept them safe at sea", "Officials wrote down lists of convicts"],
    ["Why do we have few diaries by convicts?", "many could not write", "they were banned from sleeping", "they all lived in towns", "Many convicts could not write"],
    ["Whose views do the officers' journals show?", "the officers'", "the convicts'", "the Aboriginal peoples'", "show the officers' views"],
    ["Whose side do early British records mostly miss?", "the Aboriginal peoples'", "the settlers'", "the settlers' and officers'", "early British records mostly give the settlers' side"],
    ["Why do historians read many sources?", "to hear different voices", "to make books heavier", "to avoid ever checking the facts", "to hear different voices"]], { picture: "📓", pictureLabel: "A journal and ship's list" }),
  lesson("🤔", "A new life or a punishment?", [
    ["Prisons were full, so the government looked for a new place for convicts.", "Why did the government look for a new place?", "prisons were full", "prisons were empty", "convicts had asked to leave"],
    ["Convicts also built roads, farms and the new colony.", "What did convicts build?", "roads and farms", "castles and moats", "railways and airports"],
    ["Some convicts earned a ticket of leave, letting them work for themselves, and later became free settlers.", "What did some convicts become?", "free settlers", "kings of Australia", "judges in London"],
    ["Aboriginal peoples had lived there for tens of thousands of years.", "How long had Aboriginal peoples lived there?", "tens of thousands of years", "about ten years", "only about two hundred years"],
    ["The colony took their land and caused them great harm.", "What did the colony do to Aboriginal land?", "took it", "paid for it", "shared it fairly"],
    ["People still disagree whether it was a punishment or a chance for a new life.", "What do people disagree about?", "whether it was punishment or a new life", "whether the ships were made of oak or elm", "whether Australia has a coast"]],
    sort("Reason or result?", ["Reason for sending convicts", "Result of the colony"], [["prisons were full", 0], ["a new place was needed", 0], ["roads and farms built", 1], ["Aboriginal land taken", 1]], ["Prisons were full", "new place for convicts", "roads, farms", "took their land"])),
]);
