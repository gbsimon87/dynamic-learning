import { lesson as l, sort as s, order as o, portrait, topic } from "./authoring.js";
export const emilyDavisonAndVotesForWomen = topic([
 "https://www.parliament.uk/business/news/news-by-year/2013/june/suffragette-anniversary-/",
 "https://www.parliament.uk/about/living-heritage/transformingsociety/electionsvoting/womenvote/case-studies-women-parliament/ewd/",
], [
 l(["Women once could not vote in Britain's national elections.", "Emily Davison was a suffragette, campaigning for women's votes.", "At a horse race she ran onto the track to protest.", "She was badly hurt and died."], "🗳️", "a ballot box", [
 ["What could women once not do?","vote in national elections","read any books","travel anywhere","could not vote"],
 ["What was Emily?","a suffragette","a queen","a pilot","was a suffragette"],
 ["What did she campaign for?","women's votes","new bakeries","steam engines","women's votes"],
 ["Where did she protest?","a horse race","on the Moon","in a printing shop","At a horse race"],
 ["What did she run onto?","the track","a spaceship","a steam train","onto the track"],
 ["Why did she run onto the track?","to protest","to train as a nurse","to build a cathedral","to protest"],
 ], s("Votes for women, or a different campaign?", ["Votes for women","Different campaign"], [["women voting",0],["women taking part in elections",0],["equal voting rights",0],["building more bakeries",1]], ["women's votes", "national elections"])),
 l(["First, women were excluded from national elections.", "Next, Emily and others campaigned for votes.", "Later, some women won the vote.", "After that, women gained equal voting rights with men.", "Many campaigners helped bring this change."], "🗳️", "a voting box", [
 ["What was the earlier rule?","women could not vote","everyone had equal votes","only women voted","women were excluded"],
 ["What happened next?","campaigning for votes","printing the first books","the Great Fire","Next, Emily and others campaigned"],
 ["Who first won the vote later?","some women","all children","only nurses","some women won the vote"],
 ["What came after votes for some women?","equal voting rights with men","no women could vote again","only printers could vote","After that"],
 ["Who helped change the rules?","many campaigners","only one person","nobody","Many campaigners"],
 ["Did equal voting rights come all at once?","no, some women gained votes first","yes, everyone together immediately","no women ever gained votes","Later, some women",],
 ], o("Put changes in order.", ["women cannot vote nationally", "some women win the vote", "women gain equal voting rights with men"], ["First", "Later", "After that"])),
 portrait("emily-davison-portrait", "Emily Davison", "a dark jacket", "dark jacket", "her campaigning for votes"),
 l(["Emily campaigned when women could not vote nationally.", "Today, women and men have equal voting rights in Britain.", "A vote helps adults choose who represents them.", "Many people campaigned for this change.", "We remember their work for fairness."], "🤝", "hands showing equal treatment", [
 ["When did Emily campaign?","when women could not vote nationally","only today","after all voting stopped","when women could not vote nationally"],
 ["What do women and men have today?","equal voting rights","no votes at all","different rights because of sex","equal voting rights"],
 ["What does a vote help adults choose?","their representatives","tomorrow's weather","the size of the Moon","choose who represents them"],
 ["Where does Bix describe equal voting rights?","Britain","the Moon","every place in every time","in Britain"],
 ["Who campaigned for the change?","many people","only Emily","nobody","Many people campaigned"],
 ["Why remember the campaigners?","their work for fairness","they invented video calls","they built St Paul's","work for fairness"],
 ], s("Then or today, in this story?", ["Emily's time","Today in Britain"], [["women excluded nationally",0],["campaigning to gain women's votes",0],["equal voting rights",1],["women and men can vote",1]], ["women could not vote nationally", "Today", "equal voting rights"])),
]);
