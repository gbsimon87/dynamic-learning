import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

// Original short passages; no narration of reading/spelling answers. Composition
// items sample choices and editing, rather than claiming to mark free writing.
const passage = (title, text) => [{ title, text }];
const spellings = (objective, words, clue) => ({ objective, items: [
  { q: "Which word is spelt correctly?", a: words[0][0], d: words[0].slice(1), practice: 1, why: `The spelling is ${words[0][0]}. ${clue[0]}` },
  { q: "Sort the spellings into correct and incorrect.", sort: { bins: ["Correct", "Incorrect"], cards: [
    [words[0][0], "Correct"], [words[0][1], "Incorrect"], [words[1][0], "Correct"], [words[1][1], "Incorrect"]] }, practice: 2,
    why: `${words[0][0]} and ${words[1][0]} are correct. ${clue[1]}` },
  { q: clue[2], t: words[2][0], practice: 4, why: clue[3] },
] });
const SCHOOL = passage("The greenhouse", "The class found the greenhouse locked. Its windows were dusty, and weeds covered the path. Mia asked the caretaker for the key. By Friday, the class had cleaned the windows and planted beans. Mia put a rota beside the door so everyone could help water them.");
const BOAT = passage("The crossing", "Nabil gripped the ferry rail. He had never crossed the river before. When the boat rocked, he shut his eyes. His sister pointed to the harbour ahead. Nabil opened one eye and loosened his grip.");
const LIBRARY = passage("Library notice", "The village library opens at 10 am on Tuesday and Friday. On Saturdays it opens at 9 am. The children's club meets upstairs at 11 am on Saturdays. Bring your own notebook. Pencils are provided. There is no charge.");
const PLAY = passage("The missing key", "ELLA: The cupboard is locked.\nTOM: I saw a key under the flowerpot.\n[Tom lifts the pot and holds up a key.]\nELLA: Try it carefully.\n[Tom turns the key. The door opens.]");

export default defineAssessmentBank({ year: 5, subject: "english", version: 1, speech: "none", quests: {
  "spelling---word-endings": {
    "the-endings-cious-and-tious": spellings("Spell cious and tious endings using related words and learned examples.",
      [["spacious", "spatious", "spashous"], ["cautious", "caucious", "cautous"], ["delicious"]],
      ["Space helps you remember the c in spacious.", "Cautious uses tious; spacious uses cious.", "Write a word ending in cious that means tasting very good. It begins del.", "Delicious means tasting very good and ends in cious."]),
    "the-endings-cial-and-tial": spellings("Spell cial and tial endings and recognise useful exceptions.",
      [["special", "spetial", "spechial"], ["essential", "essencial", "esential"], ["official"]],
      ["Special has cial after the vowel e.", "Special uses cial; essential uses tial.", "An o___ announcement is authorised by an organisation. Write the whole word, ending in cial.", "Official ends in cial: o-f-f-i-c-i-a-l."]),
    "the-endings-ant-ance-ent-and-ence": spellings("Link ant/ent adjectives and ance/ence nouns.",
      [["tolerant", "tolerent", "tolerunt"], ["confidence", "confidance", "confidense"], ["obedient"]],
      ["Tolerant uses ant; toleration is a related word.", "Tolerant ends in ant and confidence ends in ence.", "Write the word meaning willing to obey that begins ob and ends in ent.", "Obedient means willing to obey; its ending is ent."]),
    "the-endings-able-and-ible": spellings("Choose able/ible spellings rather than relying only on sound.",
      [["reliable", "relyable", "reliible"], ["possible", "possable", "posible"], ["visible"]],
      ["Rely changes y to i before able: reliable.", "Reliable uses able and possible uses ible.", "Write a word ending in ible that means able to be seen. It begins vis.", "Visible means able to be seen; it ends in ible."]),
  },
  "reading---words-and-meanings": {
    "roots-and-origins": { objective: "Use familiar roots and affixes to explain unfamiliar words.", items: [
      { q: "What does the prefix re mean in reread?", a: "Again", d: ["Not", "Before", "Too much"], practice: 1, why: "Reread means read again; re adds again." },
      { q: "Sort the words by the meaning added by the prefix.", sort: { bins: ["Again", "Not"], cards: [["rebuild", "Again"], ["rewrite", "Again"], ["unfair", "Not"], ["unwell", "Not"]] }, practice: 2, why: "Re adds again; un adds not in these words." },
      { q: "A biography tells the story of a person's life. What does autobiography mean?", a: "A person writes about their own life", d: ["A book about cars", "A made-up adventure", "A dictionary of names"], practice: 4, why: "Auto means self, so an autobiography is a person's account of their own life." },
    ] },
    "using-a-dictionary-and-thesaurus": { objective: "Choose reference tools and apply alphabetical/contextual information.", items: [
      { q: "You need to check what an unfamiliar word means. Which tool is most useful?", a: "A dictionary", d: ["A timetable", "A contents page", "A calculator"], practice: 1, why: "A dictionary provides word meanings and spellings." },
      { q: "Put these words in dictionary order.", order: ["spring", "sprinkle", "sprint"], practice: 2, why: "Compare beyond sprin: g comes before k, and k before t." },
      { q: "The bag was light enough to carry easily. Which synonym of light fits here?", a: "Not heavy", d: ["Bright", "Pale", "A lamp"], practice: 4, why: "Carry easily shows that light describes weight, not brightness or colour." },
    ] },
    "similes-and-metaphors": { objective: "Identify figurative comparisons and explain their effect.", items: [
      { q: "Which sentence uses a simile?", a: "The moon shone like a silver coin.", d: ["The moon rose at eight.", "The moon was above the trees.", "We watched the moon."], practice: 1, why: "Like compares the moon with a silver coin." },
      { q: "Sort the comparisons.", sort: { bins: ["Simile", "Metaphor"], cards: [["Her eyes were like stars.", "Simile"], ["The classroom was a beehive.", "Metaphor"], ["He was as quiet as a mouse.", "Simile"], ["The road was a ribbon.", "Metaphor"]] }, practice: 2, why: "Similes use like/as for comparison; these metaphors describe one thing as another." },
      { q: "The wind was a knife against her face. What does this metaphor suggest?", a: "The wind felt sharp and painfully cold", d: ["A real knife was flying", "The wind felt warm", "There was no wind"], practice: 4, why: "A knife suggests a sharp, cutting feeling; the statement is not literal." },
    ] },
  },
  "grammar---verbs-and-possibility": {
    "making-verbs-with-ate-ise-and-ify": { objective: "Form verbs using ate, ise and ify.", items: [
      { q: "Which verb means make simpler?", a: "Simplify", d: ["Simple", "Simply", "Simplicity"], practice: 1, why: "Adding ify helps form simplify, an action meaning make simpler." },
      { q: "Sort the verbs by their endings.", sort: { bins: ["ise", "ify", "ate"], cards: [["modernise", "ise"], ["purify", "ify"], ["activate", "ate"]] }, practice: 2, why: "Modernise ends in ise, purify in ify, and activate in ate." },
      { q: "Turn the adjective pure into a verb ending in ify. Write the new word.", t: "purify", practice: 4, why: "Purify means make pure; pure loses its final e." },
    ] },
    "verb-prefixes": { objective: "Explain how prefixes change a verb's meaning.", items: [
      { q: "What does misjudge mean?", a: "Judge incorrectly", d: ["Judge again", "Stop judging", "Judge too much"], practice: 1, why: "Mis adds the meaning wrongly or incorrectly." },
      { q: "Match each word to the meaning added by its prefix.", sort: { bins: ["Again", "Too much"], cards: [["repaint", "Again"], ["rebuild", "Again"], ["overcook", "Too much"], ["overfill", "Too much"]] }, practice: 2, why: "Re means again; over means too much in overcook and overfill." },
      { q: "Add a prefix to connect to make a verb meaning break the connection. Write the whole word.", t: "disconnect", practice: 4, why: "Disconnect means separate or break a connection." },
    ] },
    "modal-verbs-and-possibility": { objective: "Distinguish degrees of possibility and modal meanings.", items: [
      { q: "Which sentence expresses a possibility rather than certainty?", a: "We might visit tomorrow.", d: ["We definitely visited yesterday.", "We certainly visited yesterday."], practice: 1, why: "Might says the visit is possible, not certain." },
      { q: "In You must wear a helmet, what does must express?", a: "A requirement", d: ["A past event", "A description of colour", "An uncertain guess"], practice: 2, why: "In this instruction, must expresses an obligation or requirement." },
      { q: "Which adverb makes this prediction less certain: ___ the bus will arrive soon?", a: "Perhaps", d: ["Certainly", "Definitely", "Surely"], practice: 4, why: "Perhaps marks uncertainty; the other choices express stronger certainty." },
    ] },
  },
  "spelling---silent-letters-and-tricky-words": {
    "silent-letters": spellings("Remember silent letters rather than relying only on pronunciation.",
      [["doubt", "dout", "dowt"], ["knight", "nite", "knite"], ["solemn"]],
      ["Doubt includes a silent b.", "Doubt keeps b; knight keeps its silent k and gh letters.", "Write the word meaning serious and formal that begins sol and ends mn.", "Solemn ends in mn; the n is silent."]),
    "the-letters-ei-after-c": spellings("Spell the long ee sound as ei after c in familiar words.",
      [["ceiling", "cieling", "ceeling"], ["deceive", "decieve", "deceeve"], ["receive"]],
      ["Ceiling has ei after c.", "Ceiling and deceive both use ei after c for the ee sound.", "Write the word meaning get or accept a parcel. It begins rec and ends in eive.", "Receive has ei after c: r-e-c-e-i-v-e."]),
    "homophones-and-confusing-words": { objective: "Select easily confused words using meaning and word class.", items: [
      { q: "Please ___ me about the best route. Which word fits?", a: "advise", d: ["advice", "device"], practice: 1, why: "Advise is the verb meaning give advice." },
      { q: "The visitor was a welcome ___. Which word fits?", a: "guest", d: ["guessed", "guess"], practice: 2, why: "A guest is a visitor; guessed is a past-tense verb." },
      { q: "Complete the sentence with the food word: We ate ___ with milk for breakfast.", t: "cereal", practice: 4, why: "Cereal is a breakfast food; serial describes something in a series." },
    ] },
    "words-often-misspelt": spellings("Recall spellings from the first part of the saved Year 5 word list.",
      [["accommodate", "accomodate", "acommodate"], ["committee", "commitee", "comittee"], ["awkward"]],
      ["Accommodate has double c and double m.", "Committee has double m, double t and double e.", "Write the word meaning clumsy or difficult to manage that begins awk.", "Awkward keeps the letters awk at the start."]),
    "more-words-often-misspelt": spellings("Recall spellings from the second part of the saved Year 5 word list.",
      [["definite", "definate", "deffinite"], ["environment", "enviroment", "envirenment"], ["forty"]],
      ["Definite has i, not a, in its middle.", "Environment keeps the n before ment.", "Write the number word for 40.", "Forty has no u, unlike four."]),
  },
  "reading---understanding-texts": {
    "thoughts-and-motives": { objective: "Infer motives and feelings using stated textual evidence.", items: [
      { q: "Why does Nabil probably grip the rail?", a: "He is anxious about the crossing", d: ["He is painting it", "He is trying to stop the boat", "He wants his sister to leave"], evidence: BOAT, practice: 1, why: "He has never crossed before and shuts his eyes when the boat rocks; these details support anxiety." },
      { q: "Which detail best supports the idea that Nabil begins to feel calmer?", a: "He loosens his grip", d: ["The ferry has a rail", "The story names his sister", "The river has a harbour"], evidence: BOAT, practice: 3, why: "Loosening his grip shows a change from the tight hold described at the start." },
      { q: "Why does Mia probably put up a watering rota?", a: "To organise shared care of the beans", d: ["To stop anyone entering", "To hide the key", "To keep the windows dusty"], evidence: SCHOOL, practice: 4, why: "The passage says everyone could help water them; a rota organises turns." },
    ] },
    "comparing-characters-and-settings": { objective: "Compare matching features using details from two descriptions.", items: [
      { q: "Which difference is supported by these descriptions?", a: "Ari speaks readily; Jo is hesitant to speak", d: ["Jo is older than Ari", "Ari dislikes everyone", "Both characters refuse to speak"], evidence: passage("Two arrivals", "Ari greeted everyone before sitting down. Jo whispered her name and waited for someone to show her a seat."), practice: 1, why: "Ari greets everyone while Jo whispers and waits; no age or dislike is stated." },
      { q: "What feature is shared by the two settings?", a: "Both have a river nearby", d: ["Both are noisy cities", "Both have a busy bridge", "Neither has any water"], evidence: passage("Two places", "A quiet village stood beside a narrow river. Far away, a crowded city spread around a wide river crossed by busy bridges."), practice: 2, why: "Both descriptions mention a river, though the places differ in size and activity." },
      { q: "Which comparison uses evidence from both paragraphs?", a: "The greenhouse changes from neglected to cared for", d: ["The greenhouse is demolished", "The beans grow overnight", "The caretaker plants everything alone"], evidence: SCHOOL, practice: 4, why: "Dust and weeds at the start contrast with cleaned windows, planting and organised watering later." },
    ] },
    "fact-or-opinion": { objective: "Distinguish checkable claims from personal judgements.", items: [
      { q: "Which statement is an opinion?", a: "Swimming is the most enjoyable sport.", d: ["The pool is 25 metres long.", "The centre opens at nine.", "The team has twelve members."], practice: 1, why: "Most enjoyable is a judgement that people can disagree about." },
      { q: "Sort the statements.", sort: { bins: ["Fact", "Opinion"], cards: [["A week has seven days.", "Fact"], ["Tuesday is the best day.", "Opinion"], ["A triangle has three sides.", "Fact"], ["Triangles are the prettiest shapes.", "Opinion"]] }, practice: 2, why: "Day and side counts are checkable; best and prettiest express preferences." },
      { q: "Which claim could be checked using a timetable?", a: "The train leaves at 10:15.", d: ["The train is lovely.", "This is the nicest station.", "Rail journeys are the most exciting."], practice: 4, why: "A departure time can be checked against a timetable; the other claims are opinions." },
    ] },
    "retrieving-and-recording-information": { objective: "Retrieve and record specific information accurately.", items: [
      { q: "What time does the library open on Saturday?", a: "9 am", d: ["10 am", "11 am", "4 pm"], evidence: LIBRARY, practice: 1, why: "The notice explicitly says Saturdays start at 9 am." },
      { q: "Where does the children's club meet?", t: "upstairs", evidence: LIBRARY, practice: 3, why: "Upstairs is the location stated for the club." },
      { q: "Which note correctly records what a club visitor should bring?", a: "Bring a notebook; pencils are provided.", d: ["Bring pencils; notebooks are provided.", "Bring a fee and no notebook.", "Bring a key for the library."], evidence: LIBRARY, practice: 4, why: "The notice asks for a notebook and says pencils are provided and there is no charge." },
    ] },
    "reading-play-scripts": { objective: "Interpret script speakers and stage directions.", items: [
      { q: "Who says that the cupboard is locked?", a: "Ella", d: ["Tom", "The flowerpot", "The narrator"], evidence: PLAY, practice: 1, why: "The speaker name ELLA appears before that line." },
      { q: "Which part tells an actor what to do rather than say?", a: "[Tom lifts the pot and holds up a key.]", d: ["ELLA: Try it carefully.", "TOM: I saw a key under the flowerpot."], evidence: PLAY, practice: 2, why: "The bracketed stage direction describes an action." },
      { q: "Put the actions in the order shown in the script.", order: ["Tom lifts the pot", "Tom holds up a key", "Tom turns the key", "The door opens"], evidence: PLAY, practice: 4, why: "Those actions follow the two stage directions in their stated order." },
    ] },
  },
  "grammar---clauses-and-punctuation": {
    "relative-pronouns": { objective: "Choose relative pronouns that fit a person, thing or possession.", items: [
      { q: "The cyclist, ___ was wearing a red helmet, waved. Which word fits?", a: "who", d: ["which", "whose"], practice: 1, why: "Who introduces information about the person, the cyclist." },
      { q: "The child ___ dog ran away asked for help. Which word shows possession?", a: "whose", d: ["which", "who"], practice: 2, why: "Whose links the dog to its owner, the child." },
      { q: "Complete with who or which: The door, ___ had a brass handle, was open.", t: "which", practice: 4, why: "Which introduces information about the door, a thing." },
    ] },
    "relative-clauses": { objective: "Identify relative clauses and omitted relative pronouns.", items: [
      { q: "Which words form the relative clause in The runner who won the race smiled?", a: "who won the race", d: ["The runner", "smiled", "The runner smiled"], practice: 1, why: "Who won the race adds information about the runner." },
      { q: "Which sentence still works when that is omitted?", a: "The cake that I baked is cooling.", d: ["The dog that barked woke me.", "The car that stopped blocked the road."], practice: 3, why: "The cake I baked is cooling remains grammatical; the other sentences would lose the subject of their relative clause." },
      { q: "Which revision adds relevant information about the lighthouse?", a: "The lighthouse, which stood on the cliff, flashed twice.", d: ["The lighthouse which flashed twice the cliff.", "Which stood on the cliff, flashed twice.", "The lighthouse flashed which on twice."], practice: 4, why: "Which stood on the cliff is a complete relative clause attached to lighthouse." },
    ] },
    "brackets-dashes-and-commas": { objective: "Recognise parenthesis and paired punctuation around extra information.", items: [
      { q: "Which words are the parenthesis in Our teacher (a keen cyclist) rode home?", a: "a keen cyclist", d: ["Our teacher", "rode home", "teacher rode"], practice: 1, why: "A keen cyclist is extra information; the main sentence still works without it." },
      { q: "Which sentence correctly encloses the extra information?", a: "The dog — tired after the walk — fell asleep.", d: ["The dog — tired after the walk fell asleep.", "The dog tired — after the walk fell — asleep."], practice: 2, why: "The pair of dashes encloses tired after the walk." },
      { q: "What closing mark is missing: We visited York (a city in England ___ yesterday. Type the mark only.", t: ")", chars: [")"], practice: 4, why: "An opening bracket needs a closing bracket after the extra information." },
    ] },
    "commas-to-avoid-ambiguity": { objective: "Explain how commas clarify meaning.", items: [
      { q: "Which sentence clearly calls Mum to eat?", a: "Let's eat, Mum!", d: ["Let's eat Mum!", "Let's, eat Mum!"], practice: 1, why: "The comma before Mum shows that Mum is being addressed." },
      { q: "In We packed sandwiches, apples and water, what do the commas help show?", a: "The separate items in a list", d: ["That apples is a person's name", "That the sentence is a question", "That water owns the sandwiches"], practice: 2, why: "The punctuation separates the things that were packed." },
      { q: "Which sentence clearly tells a dog called Max to stop running?", a: "Stop running, Max!", d: ["Stop, running Max!", "Stop running Max!"], practice: 4, why: "The comma separates the instruction from the name of the one being addressed." },
    ] },
  },
  "grammar---cohesion-and-tense": {
    "cohesion-within-paragraphs": { objective: "Follow references and connect ideas inside a paragraph.", items: [
      { q: "I made a kite. This took an hour. What does This refer to?", a: "Making the kite", d: ["Only the hour", "Flying yesterday", "A different person"], practice: 1, why: "This points back to the action of making the kite." },
      { q: "Which link shows the next step: Mix the flour and water. ___ knead the dough?", a: "Then", d: ["Yesterday", "However", "Instead of"], practice: 2, why: "Then connects the two instructions in time order." },
      { q: "Rosa planted a seed. She watered it. Which words avoid repeating Rosa and the seed?", a: "She and it", d: ["planted and watered", "a and the", "Rosa and seed"], practice: 4, why: "She refers to Rosa and it refers to the seed, linking the sentences." },
    ] },
    "linking-paragraphs": { objective: "Recognise time, place and ordering links between paragraphs.", items: [
      { q: "A paragraph describes morning preparations. Which opening best moves to the afternoon?", a: "Later that day,", d: ["Long before the morning,", "In the same instant,", "For the first time ever,"], practice: 1, why: "Later that day clearly signals a later time on the same day." },
      { q: "Which opening links a new paragraph about a place close to the village?", a: "Nearby,", d: ["A century earlier,", "Finally,", "To begin with,"], practice: 2, why: "Nearby is a place link showing closeness to the location already described." },
      { q: "A report gives its first reason in one paragraph. Which opening clearly introduces reason number two?", a: "Secondly,", d: ["Before anything else,", "In conclusion,", "Firstly,"], practice: 4, why: "Secondly numbers the next reason and links it to the first." },
    ] },
    "the-past-perfect": { objective: "Use had plus a past participle to show an earlier past event.", items: [
      { q: "Which sentence uses the past perfect?", a: "The train had left before we arrived.", d: ["The train leaves at noon.", "The train is leaving now.", "The train will leave soon."], practice: 1, why: "Had left places the departure before another past event, our arrival." },
      { q: "In I found the letter that she had hidden, which event happened first?", a: "She hid the letter", d: ["I found the letter", "Both happened at exactly the same time"], practice: 2, why: "Had hidden shows the hiding happened before the finding." },
      { q: "Complete with the missing word: By the time lunch began, we ___ finished our work.", t: "had", practice: 4, why: "Had finished shows that finishing happened before lunch began." },
    ] },
  },
  "writing---composition-and-editing": {
    "audience-purpose-and-form": { objective: "Choose writing forms and language for a specified audience and purpose.", items: [
      { q: "You want visitors to find the times of three school clubs quickly. Which form suits this purpose best?", a: "A clearly labelled timetable", d: ["A long fairy tale", "A private diary entry", "An unlabelled picture"], practice: 1, why: "A timetable organises clubs and times for visitors to scan." },
      { q: "Which opening suits a polite letter asking the headteacher for new library books?", a: "Dear Headteacher, I am writing to ask…", d: ["Oi! Get books now!", "Once upon a time there was a dragon.", "Private diary: today I felt sleepy."], practice: 3, why: "The greeting and clear, courteous request suit the audience and purpose." },
      { q: "You want a personal record of the events and feelings of your day. Which form fits best?", a: "A diary entry", d: ["A timetable of bus departures", "An instruction sheet for a machine", "A dictionary entry"], practice: 4, why: "A diary records personal events and reflections; the other forms have different jobs." },
    ] },
    "characters-settings-and-atmosphere": { objective: "Choose narrative details that suggest character and atmosphere.", items: [
      { q: "Which detail most strongly creates a tense atmosphere?", a: "A slow footstep sounded behind the locked door.", d: ["The picnic blanket lay in the sunshine.", "The room had four plain walls.", "We counted the chairs."], practice: 1, why: "The unexplained footstep behind a locked door raises questions and suggests tension." },
      { q: "Which action shows generosity rather than simply naming it?", a: "Lena split her last sandwich with the new child.", d: ["Lena counted the clouds.", "Lena shut her notebook.", "Lena wore a green jumper."], practice: 3, why: "Sharing the last sandwich provides evidence of generosity." },
      { q: "Which sentence would best support a peaceful setting?", a: "Leaves drifted gently onto the still pond.", d: ["An alarm shrieked through the corridor.", "The door slammed and glass shattered.", "Thunder cracked above the roof."], practice: 4, why: "Gently and still create a calm impression; the other sentences suggest disturbance." },
    ] },
    "summarising-a-passage": { objective: "Preserve main events while leaving out minor details.", items: [
      { q: "Which sentence best summarises the passage?", a: "The class restored a neglected greenhouse and planned to care for its plants.", d: ["Mia found a dusty window.", "Friday is a day of the week.", "The caretaker planted every bean alone."], evidence: SCHOOL, practice: 1, why: "The summary keeps the main change and the continuing care, without inventing events." },
      { q: "Which detail could be left out of a brief summary?", a: "The crate was blue", d: ["The team built a raft", "The raft floated in the test", "The team repaired a leak"], evidence: passage("The raft", "The team built a raft from wood and a blue crate. It leaked during its first test. After the team sealed the gap, it floated."), practice: 3, why: "The crate's colour is not needed to explain building, testing and fixing the raft." },
      { q: "Put these main events in the order of the passage.", order: ["The class found the greenhouse neglected", "The class cleaned and planted it", "Mia organised watering turns"], evidence: SCHOOL, practice: 4, why: "The passage moves from discovery to restoration and then ongoing care." },
    ] },
    "headings-bullet-points-and-underlining": { objective: "Select organisational devices that guide a reader.", items: [
      { q: "Which heading best fits a paragraph describing where hedgehogs live?", a: "Habitats", d: ["Food", "Lifespans", "Measurements"], practice: 1, why: "Habitats names the places where living things live." },
      { q: "What is the main benefit of bullet points in an equipment list?", a: "Each item is easy to spot", d: ["They make every item rhyme", "They remove the need for words", "They turn the list into a story"], practice: 2, why: "Separate bullet points help readers scan individual items." },
      { q: "A notice has one very important deadline. What can underlining that date help a reader do?", a: "Find the deadline quickly", d: ["Change the date", "Know the weather", "Avoid reading any other instructions"], practice: 4, why: "Underlining draws attention to selected important information." },
    ] },
    "tense-and-agreement": { objective: "Maintain meaningful tense choices and subject–verb agreement.", items: [
      { q: "Which sentence has correct subject–verb agreement?", a: "The basket of apples is on the table.", d: ["The basket of apples are on the table.", "The baskets of apples is on the table."], practice: 1, why: "The head of the subject is the singular basket, so is agrees." },
      { q: "Which word keeps this story in the past: Jo opened the gate and ___ down the path?", a: "walked", d: ["walks", "will walk", "is walking"], practice: 2, why: "Walked matches the past-tense event opened." },
      { q: "Complete with was or were: The children ___ waiting outside.", t: "were", practice: 4, why: "The plural subject children agrees with were." },
    ] },
    "proofreading-spelling-and-punctuation": { objective: "Identify and correct specific spelling and punctuation errors.", items: [
      { q: "Which sentence correctly shows that one captain owns the hat?", a: "The captain's hat was blue.", d: ["The captains hat was blue.", "The captains' hat was blue."], practice: 1, why: "One captain takes apostrophe s: captain's." },
      { q: "Which correction makes the sentence complete and accurate: We visited York (a city in England yesterday?", a: "We visited York (a city in England) yesterday.", d: ["We visited York (a city in England yesterday.", "We visited York a city in England) yesterday."], practice: 3, why: "The extra information needs a closing bracket, and the statement needs a full stop." },
      { q: "Correct the misspelt word in Please be carefull. Write just the corrected word.", t: "careful", practice: 4, why: "Careful has one l at the end; the suffix ful uses one l." },
    ] },
    dictation: { objective: "Check spelling/punctuation choices related to dictation; this sound-off quiz does not measure listening transcription.", items: [
      { q: "Which version has a capital letter, correct spelling and an appropriate ending?", a: "Our committee met on Friday.", d: ["Our commitee met on Friday.", "Our committee met on Friday"], practice: 1, why: "The correct version begins with a capital, spells committee correctly and ends with a full stop." },
      { q: "Which sentence correctly punctuates the spoken words?", a: "\"Wait here,\" said Ava.", d: ["\"Wait here, said Ava.", "Wait here,\" said Ava.", "\"Wait here\" said Ava"], practice: 3, why: "The speech marks surround the spoken words; the comma belongs before the closing speech mark." },
      { q: "Which final check is useful after writing a sentence from memory?", a: "Check every word, its order and the punctuation", d: ["Check only the longest word", "Remove all punctuation", "Change every past verb to the present"], practice: 4, why: "Accurate transcription needs all words in order as well as spelling and punctuation." },
    ] },
  },
  "reading---discussion-and-debate": {
    "giving-reasons-for-your-views": { objective: "Choose reasoned interpretations linked to evidence.", items: [
      { q: "Which view is supported by a relevant reason?", a: "Mia is organised because she sets up a watering rota.", d: ["Mia is organised because I like her name.", "Mia is organised because every child is.", "Mia is organised because greenhouses have glass."], evidence: SCHOOL, practice: 1, why: "The rota is an action in the text that directly supports the judgement organised." },
      { q: "I think Nabil is nervous. Which detail is the strongest supporting reason?", a: "He shuts his eyes when the ferry rocks", d: ["He has a sister", "The story mentions a harbour", "The ferry is on water"], evidence: BOAT, practice: 3, why: "His reaction to the rocking supports the view more directly than background details." },
      { q: "Which response explains a judgement rather than repeating it?", a: "The ending is hopeful because the damaged garden is beginning to grow again.", d: ["The ending is hopeful because it is hopeful.", "The ending is good because it is the ending.", "I am right because I say so."], practice: 4, why: "The response links hopeful to a specific change in the imagined story." },
    ] },
    "challenging-views-courteously": { objective: "Choose respectful challenges supported by text evidence.", items: [
      { q: "A friend has a different reading of a character. Which reply invites a respectful discussion?", a: "What detail in the story led you to that view?", d: ["Your idea is stupid.", "Only my view matters.", "You are not allowed to speak."], practice: 1, why: "The question asks for evidence and leaves room for the other reader to explain." },
      { q: "A reader says Mia wanted to keep the greenhouse to herself. Which challenge uses evidence courteously?", a: "Could the rota suggest she wanted everyone to help?", d: ["You never understand anything.", "Mia is my favourite name, so you are wrong.", "Stop talking about the story."], evidence: SCHOOL, practice: 3, why: "The challenge refers to a relevant detail and asks about an alternative interpretation politely." },
      { q: "Which reply acknowledges another view before offering a different interpretation?", a: "I see why you think that; I read the last paragraph differently because…", d: ["That makes no sense and I will not listen.", "There cannot be two interpretations.", "I win, so the discussion is finished."], practice: 4, why: "It recognises the other person's idea and opens a reasoned alternative." },
    ] },
  },
} });
