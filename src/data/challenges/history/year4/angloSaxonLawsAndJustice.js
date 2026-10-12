import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const angloSaxonLawsAndJustice = year4Topic(["https://avalon.law.yale.edu/medieval/saxlaw.asp", "https://cdn.nationalarchives.gov.uk/documents/on-the-record-s5e1-trials-ordeal.pdf", "https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.nationalarchives.gov.uk/education/resources/anglo-saxons-gift-from-a-king/", "https://www.theanglosaxons.com/laws-of-alfred-ps/"],
    [
  lesson("⚖️", "Anglo-Saxon Laws and Justice", [
    ["Anglo-Saxon kings issued laws.", "Who issued laws?", "kings", "only shipbuilders", "only farmers"],
    ["A moot was a meeting that could hear disputes.", "What was a moot?", "a meeting hearing disputes", "a Viking ship", "a Roman bath"],
    ["An oath was a solemn promise to tell the truth.", "What was an oath?", "a solemn promise", "a kind of coin", "a house material"],
    ["Wergild was compensation for a person's death, with amounts linked to status.", "What was wergild?", "compensation linked to status", "a ship's sail", "a monk's book"],
    ["Law treated people differently according to rank.", "Were people treated equally by rank?", "no", "yes, always", "yes, no ranks existed"],
    ["Sometimes people faced a painful test called an ordeal.", "What was an ordeal?", "a painful test", "a peaceful market", "a farming tool"]], sort("Promise or payment?", ["Promise", "Payment"],
    [
    ["oath", 0],
    ["wergild", 1],
    ["compensation", 1]],
    ["oath was a solemn promise", "Wergild was compensation"]), false),
  lesson("⚖️", "Anglo-Saxon Laws and Justice", [
    ["Roman government ended before Anglo-Saxon kings issued their laws.", "Which came first?", "Roman government", "Alfred's laws", "Cnut's laws"],
    ["Early Anglo-Saxon kings began recording laws.", "What did early kings record?", "laws", "photographs", "printed newspapers"],
    ["Alfred issued laws during his reign in AD 871–899.", "Which ruler issued these later laws?", "Alfred", "Caesar", "Edward the Confessor"],
    ["Cnut issued laws after becoming king in AD 1016.", "Which lawgiver came after Alfred?", "Cnut", "Caesar", "Columba"],
    ["Communities continued using meetings and oaths.", "What continued in communities?", "meetings and oaths", "Roman governors", "photography"],
    ["Law could preserve older rules as well as add new ones.", "What could law do?", "keep older rules and add new ones", "only erase every old rule", "never change anything"]], order("Order the events, oldest first.", ["Roman government", "Early Anglo-Saxon laws", "Alfred's laws", "Cnut's laws"],
    ["Roman government ended before", "Early Anglo-Saxon kings", "Alfred issued laws", "Cnut issued laws after"]), true),
  detective(["A written law records what a ruler wanted people to do.", "Scribes wrote laws for rulers.", "Law codes helped declare authority and settle disputes.", "A law does not prove people always followed it.", "Wergild amounts depended on rank.", "Accounts of cases can help us compare rules with practice."],
    [
    ["What does a written law record?", "what a ruler wanted", "what everyone always did", "every person's thoughts", "A written law records what a ruler wanted people to do."],
    ["Who wrote laws down?", "scribes", "modern photographers", "only sailors", "Scribes wrote laws for rulers."],
    ["Why record laws?", "authority and settling disputes", "to show everyone obeyed", "to photograph a moot", "Law codes helped declare authority and settle disputes."],
    ["What cannot a law prove?", "everyone always obeyed", "its written rule", "a ruler's intention", "A law does not prove people always followed it."],
    ["What affected wergild amounts?", "rank", "only the weather", "only the season", "Wergild amounts depended on rank."],
    ["What helps compare rules with practice?", "accounts of cases", "only a crown", "only a modern guess", "Accounts of cases can help us compare rules with practice."],
    ["Whose purpose should we investigate?", "the ruler's", "only modern tourists'", "only shipbuilders'", "Law codes helped declare authority and settle disputes."]], {"picture": "⚖️", "pictureLabel": "Anglo-Saxon Laws and Justice"}),
  lesson("⚖️", "Anglo-Saxon Laws and Justice", [
    ["A moot heard disputes within a community.", "What did a moot hear?", "disputes", "only songs", "only weather reports"],
    ["Oaths asked people to promise they were truthful.", "What did an oath ask?", "a promise of truth", "a payment in ships", "a new house"],
    ["Compensation could help settle conflict.", "What could compensation help do?", "settle conflict", "guarantee every rule was fair", "end every dispute forever"],
    ["Rank affected treatment, which was unfair by today's standards.", "Why could treatment be unfair?", "rank affected it", "everyone had the same rank", "no laws existed"],
    ["People believed God could reveal truth through an ordeal.", "Why did people use ordeals?", "they believed God could reveal truth", "they had modern forensic tests", "they used cameras"],
    ["Rules and actual behaviour need separate evidence.", "What needs separate evidence?", "rules and behaviour", "only a law's letters", "only a law's title"]], sort("Rule or evidence of practice?", ["Rule", "Evidence of practice"],
    [
    ["a law code", 0],
    ["a case account", 1],
    ["a ruler's written order", 0]],
    ["Rules and actual behaviour", "separate evidence"]), false),
]);
