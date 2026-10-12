import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const howWeKnowAboutTheGreatFire = topic([
 "https://www.rmg.co.uk/stories/royal-history/curatorial/londons-burning-samuel-pepys-great-fire-london",
 "https://www.themonument.org.uk/history — the Monument commemorates the Great Fire.",
], [
 l(["Sources are clues about the past.", "Samuel Pepys wrote a diary about the Great Fire.", "Artists painted pictures of the fire.", "The Monument is a tall stone reminder in London.", "These sources help us learn."], "📖", "a diary", [
 ["What are sources?","clues about the past","guesses about tomorrow","only toys","Sources are clues"],
 ["Who wrote a diary?","Samuel Pepys","Neil Armstrong","Rosa Parks","Samuel Pepys wrote a diary"],
 ["What did artists make?","paintings","video calls","fire engines","painted pictures"],
 ["What is the Monument made of?","stone","paper","plastic","stone reminder"],
 ["Where is the Monument?","London","Jamaica","the Moon","in London"],
 ["What do these clues help us do?","learn about the past","see tomorrow","hear every voice","help us learn"],
 ], s("Written source or something to look at?", ["Written words","Picture or building"], [["Pepys's diary",0],["words in the diary",0],["a painting",1],["the Monument",1]], ["diary", "painted pictures", "Monument"])),
 l(["First, the Great Fire burned in London.", "Pepys wrote about it at the time.", "Later, people built the Monument to remember the fire.", "Today, we can read the diary and visit the Monument."], "🏛️", "a monument", [
 ["Which happened before the Monument was built?","the Great Fire","today's visit","a mobile video call","First"],
 ["When did Pepys write about the fire?","at the time","only today","before London existed","at the time"],
 ["What was built later?","the Monument","the Moon","a mobile phone","Later, people built the Monument"],
 ["Why was the Monument built?","to remember the fire","to cause another fire","to store all diaries","remember the fire"],
 ["What can people read today?","the diary","the fire's voice","tomorrow's diary","read the diary"],
 ["What can people visit today?","the Monument","London before the fire","Pepys as a child","visit the Monument"],
 ], o("Put the clues in time order.", ["the Great Fire happens", "the Monument is built later", "we visit it today"], ["First", "Later", "Today"])),
 l(["Pepys saw the fire and wrote about it.", "A painting shows an artist's view.", "The Monument remembers the fire but was built later.", "No single source tells us everything.", "Compare clues to check what happened."], "🔍", "a magnifying glass", [
 ["Why is Pepys's diary useful?","he saw the fire","he made a video","he lived today","Pepys saw the fire"],
 ["Whose view does a painting show?","an artist's view","everyone's thoughts","a camera's sound","artist's view"],
 ["Was the Monument standing during the fire?","no, it was built later","yes, it filmed it","yes, it stopped it","was built later"],
 ["What can no single source tell us?","everything","anything at all","its own clues","No single source tells us everything"],
 ["How can we check the story?","compare clues","ignore clues","choose without looking","Compare clues"],
 ["Which source gives a witness's written view?","Pepys's diary","a later stone reminder","a blank map","saw the fire and wrote"],
 ["Which clue was made after the event?","the Monument","Pepys watching the flames","people leaving during the fire","Monument remembers the fire but was built later"],
 ]),
 l(["A diary uses words; a painting uses pictures.", "Both can show someone's view of the fire.", "The Monument helps people remember today.", "Different sources give different clues.", "Using more than one can help us check a story."], "🖼️", "a framed picture", [
 ["Which source mainly uses words?","a diary","a painting","a stone tower","A diary uses words"],
 ["Which mainly uses pictures?","a painting","a diary's sentences","a spoken memory","painting uses pictures"],
 ["What can both show?","someone's view","every detail for certain","tomorrow's weather","Both can show someone's view"],
 ["What helps people remember today?","the Monument","throwing away diaries","forgetting sources","Monument helps people remember"],
 ["What do different sources give?","different clues","always identical stories","no information","Different sources give different clues"],
 ["Why use more than one source?","to check a story","to make guessing easier","to lose all clues","help us check a story"],
 ], s("Sort how these sources tell us things.", ["Words","Pictures"], [["a diary sentence",0],["written diary pages",0],["painted flames",1],["painted buildings",1]], ["diary uses words", "painting uses pictures"])),
]);

const detective = howWeKnowAboutTheGreatFire.levels[3];
detective.story.image = "great-fire-london-painting";
const sourceBank = howWeKnowAboutTheGreatFire.banks.facts3;
sourceBank[1] = { type: "choice", prompt: "What rises above the buildings in this painting?", answer: "flames", wrong: ["snow", "balloons"], answeredBy: "Flames rise above buildings", hint: "Look above the rooftops.", visual: { type: "source", image: detective.story.image } };
sourceBank[5] = { type: "choice", prompt: "What can you see on the water?", answer: "boats", wrong: ["cars", "trains"], answeredBy: "Boats are on the water", hint: "Look closely at the river.", visual: { type: "source", image: detective.story.image } };
for (const question of sourceBank) question.visual = { type: "source", image: detective.story.image };
