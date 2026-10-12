import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const remembranceDay = topic([
 "https://www.iwm.org.uk/history/what-is-the-armistice",
 "https://www.iwm.org.uk/history/why-we-wear-poppies-on-remembrance-day",
], [
 l(["Fighting in the First World War stopped on 11 November 1918.", "Many soldiers died in the war.", "Poppies help us remember them.", "On Remembrance Day, people may keep a two-minute silence.", "It is a quiet time to remember."], "🌺", "a poppy flower", [
 ["Which war's fighting stopped?","the First World War","the Crimean War","the Gunpowder Plot","First World War"],
 ["Which date do we remember?","11 November","5 November","25 December","11 November"],
 ["Which flower helps people remember?","a poppy","a daisy","a rose only","Poppies"],
 ["Why do poppies help us remember?","many soldiers died","they powered trains","they printed books","Many soldiers died"],
 ["How long is the silence?","two minutes","two hours","two days","two-minute silence"],
 ["What kind of time is it?","quiet remembering","a noisy race","a firework game","quiet time to remember"],
 ], s("Remembrance, or a different event?", ["Remembrance","Different event"], [["poppies",0],["two-minute silence",0],["11 November",0],["Bonfire Night fireworks",1]], ["Poppies", "two-minute silence", "11 November"])),
 l(["First, the First World War brought years of fighting.", "Then, an armistice stopped the fighting on 11 November 1918.", "Later, people gathered to remember those who died.", "Today, Remembrance Day still marks that date.", "Armistice means an agreement to stop fighting."], "🕊️", "a dove", [
 ["What happened first?","years of fighting","today's silence","people invented the web","First"],
 ["What stopped the fighting?","an armistice","a printing press","a phone box","an armistice stopped"],
 ["What does armistice mean?","an agreement to stop fighting","a kind of toy","a new battle","agreement to stop fighting"],
 ["What did people do later?","gathered to remember","started the same war again","forgot every soldier","gathered to remember"],
 ["Who did people remember?","those who died","only train drivers","only printers","those who died"],
 ["What still marks the date today?","Remembrance Day","Bonfire Night","Christmas Day","Remembrance Day still marks"],
 ], o("Order the story of remembering.", ["years of fighting", "the armistice stops fighting", "people gather to remember afterwards"], ["First", "Then", "Later"])),
 l(["A war memorial may list names of people who died.", "Its words are clues about a place's past.", "It cannot tell each person's whole life story.", "Old letters and photos can give more clues.", "Read the names respectfully with a grown-up."], "🪧", "a memorial", [
 ["What may a war memorial list?","names","future birthdays","train departures","list names"],
 ["Whose names might it list?","people who died","only living babies","only printers","people who died"],
 ["What are its words?","clues about the past","a voice recording","a video call","clues about a place's past"],
 ["What cannot it tell us alone?","each whole life story","its written names","its visible words","cannot tell each person's whole life story"],
 ["Which other sources can give clues?","old letters and photos","only guesses","blank pages","Old letters and photos"],
 ["Who can help read the names?","a grown-up","a toy train","a silent phone","with a grown-up"],
 ["How should we read the names?","respectfully","mocking them","shouting jokes at them","respectfully"],
 ]),
 l(["People remembered those who died after the war.", "Today, poppies and silence still help people remember.", "A silence gives time to think quietly.", "Memorials link names from the past to places today.", "Remembering is a way to show respect."], "🌺", "a poppy", [
 ["Who did people remember after the war?","those who died","only kings","only printers","those who died"],
 ["What still helps people remember?","poppies and silence","only fireworks","only racing","poppies and silence"],
 ["What does silence give time for?","quiet thinking","loud games","a train journey","think quietly"],
 ["What do memorials link?","past names and places today","only future people","only weather reports","names from the past to places today"],
 ["What can remembering show?","respect","mockery","forgetfulness","show respect"],
 ["Has remembering continued into today?","yes, it still continues","no, it stopped forever","only before the war","Today",],
 ], s("Shows respect, or does not?", ["Respect","Not respectful"], [["quiet thought",0],["remembering names",0],["a remembrance silence",0],["mocking the people named",1]], ["think quietly", "names", "show respect"])),
]);
