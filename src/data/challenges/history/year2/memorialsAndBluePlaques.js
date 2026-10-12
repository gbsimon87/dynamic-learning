import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const memorialsAndBluePlaques = topic([
 "https://www.english-heritage.org.uk/visit/blue-plaques/about-blue-plaques/",
 "https://www.iwm.org.uk/memorials — War Memorials Register.",
], [
 l(["Memorials help a place remember people or events.", "A war memorial may list people who died.", "A blue plaque can mark where someone lived or worked.", "Statues can remember people too.", "Read the words to find clues."], "🪧", "a memorial plaque", [
 ["What do memorials help us do?","remember people or events","see the future","make video calls","remember people or events"],
 ["What may a war memorial list?","people who died","tomorrow's weather","new bus routes","list people who died"],
 ["What can a blue plaque mark?","where someone lived or worked","where every person lives now","only a fire exit","lived or worked"],
 ["What else can remember people?","statues","only phone boxes","only toys","Statues"],
 ["What should we read for clues?","the words","only the pavement","nothing at all","Read the words"],
 ["What time do these clues help us learn about?","the past","tomorrow","next year","remember",],
 ], s("Plaque clues or unrelated things?", ["Clue about a person","Unrelated"], [["where they lived",0],["where they worked",0],["their name",0],["tomorrow's weather",1]], ["someone lived or worked", "Read the words"])),
 l(["First, a person lived or worked in a place.", "Later, people added a plaque to remember them.", "Today, we can read it and ask questions.", "The plaque is newer than the life it remembers."], "🔵", "a round plaque", [
 ["What came first?","the person's life in that place","today's visit","the plaque before the person","First"],
 ["What was added later?","a plaque","a space rocket","a steam train","added a plaque"],
 ["Why was it added?","to remember the person","to hide their name","to predict tomorrow","remember them"],
 ["What can we do today?","read and ask questions","meet every person named","change the past","read it and ask questions"],
 ["Which is newer?","the plaque","the life it remembers","both began together","plaque is newer"],
 ["What does later mean here?","after the person's life there","before the person lived there","at exactly the same time","Later",],
 ], o("Order the place's story.", ["a person lives or works here", "a plaque is added later", "we read the plaque today"], ["First", "Later", "Today"])),
 l(["This practice plaque says: Florence Nightingale, nurse, lived here.", "It is our drawing, not a photo of a real plaque.", "The words name a person, job and link to a place.", "They do not tell her whole life story."], "🪧", "a drawn practice plaque", [
 ["Who is named on the practice plaque?","Florence Nightingale","Mary Seacole","William Caxton","Florence Nightingale"],
 ["What job does it name?","nurse","pilot","printer","nurse"],
 ["What link to the place does it give?","lived here","built every house","invented a bus here","lived here"],
 ["What kind of picture is this?","our drawing","a real plaque photo","a sound recording","our drawing"],
 ["What cannot these words tell us?","her whole life story","her name","the job named","do not tell her whole life story"],
 ["Which clue tells us her job?","the word nurse","the colour alone","the shape alone","nurse"],
 ["Which question needs another source?","What else did she do in her life?","What name is written?","What job is written?","whole life story"],
 ]),
 l(["A memorial remembers people or events.", "A blue plaque links a person to a building.", "Both help us ask about local history.", "With a grown-up, read one near you if available.", "Ask who it remembers and why."], "🏘️", "buildings near you", [
 ["What does a memorial remember?","people or events","only tomorrow","only new phones","people or events"],
 ["What does a blue plaque link?","a person and a building","only two toys","only bus routes","person to a building"],
 ["What subject can both help with?","local history","tomorrow's weather","space travel only","local history"],
 ["Who should you explore with?","a grown-up","nobody","only a toy","With a grown-up"],
 ["What could you ask?","Who does it remember?","What will tomorrow be?","Can stone talk?","who it remembers"],
 ["What other question does Bix suggest?","Why are they remembered?","What is next week's weather?","How many stars exist?","and why"],
 ], s("Useful local history question, or not?", ["Useful question","Not about this history"], [["Who is remembered?",0],["Why are they remembered?",0],["What building is linked?",0],["What will tomorrow's weather be?",1]], ["person to a building", "who it remembers and why"])),
]);


memorialsAndBluePlaques.levels[3].story.scene = "plaque";
for (const question of memorialsAndBluePlaques.banks.facts3) question.visual = { type: "scene", scene: "plaque" };
