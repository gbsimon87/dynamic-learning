import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

const evidence = (title, text) => [{ title, text }];
const LOST = evidence("The envelope", "Idris found an envelope beside the school gate. There was no name on it. He began to open it, then stopped. He took it to the office instead. Later, Mrs Shah thanked him: the envelope contained the money for the school trip.");
const GARDEN = evidence("A growing project", "In March, volunteers cleared an unused patch behind the hall. They tested the soil and made a planting plan.\n\nIn April, families planted beans and salad leaves. A rota gave each family a watering turn.\n\nBy June, the first crops were ready. The volunteers shared them at a community lunch and planned another season.");
const RAIN = evidence("Two reports", "Reporter A: The sudden rain interrupted the match. Spectators hurried home, disappointed.\n\nReporter B: The rain brought welcome relief after weeks of heat. Gardeners were delighted, although the match ended early.");
const spell = (objective, first, second, question, answer, explanation) => ({ objective, items: [
  { q: "Which word is spelt correctly?", a: first[0], d: first.slice(1), practice: 1, why: explanation[0] },
  { q: "Sort the spellings into correct and incorrect.", sort: { bins: ["Correct", "Incorrect"], cards: [[first[0], "Correct"], [first[1], "Incorrect"], [second[0], "Correct"], [second[1], "Incorrect"]] }, practice: 2, why: explanation[1] },
  { q: question, t: answer, practice: 4, why: explanation[2] },
] });

export default defineAssessmentBank({ year: 6, subject: "english", version: 1, speech: "none", quests: {
  "spelling---advanced-patterns": {
    "adding-endings-to-fer": { objective: "Use the stress rule when adding vowel-letter suffixes to fer.", items: [
      { q: "Join refer and ing. Which spelling is correct?", a: "referring", d: ["refering", "reffering", "referrring"], practice: 1, why: "The fer syllable stays stressed, so double the r before ing." },
      { q: "Sort these words by whether an extra r was added to the root.", sort: { bins: ["Extra r", "No extra r"], cards: [["preferred", "Extra r"], ["transferred", "Extra r"], ["reference", "No extra r"], ["preference", "No extra r"]] }, practice: 2, why: "The stressed fer keeps a doubled r in preferred/transferred; the stress shifts in reference/preference." },
      { q: "Complete the sentence with transfer plus ed: The team ___ the files safely. Write the new word.", t: "transferred", practice: 4, why: "Transferred keeps stress on fer, so the r is doubled." },
    ] },
    "hyphens-in-words": { objective: "Place a hyphen at the prefix–root boundary in familiar spellings.", items: [
      { q: "Which spelling clearly joins re and enter with one hyphen at their boundary?", a: "re-enter", d: ["ree-nter", "re-en-ter", "r-eenter"], practice: 1, why: "The prefix is re and the root is enter; the hyphen belongs between them." },
      { q: "Sort these words by the prefix before the hyphen.", sort: { bins: ["co", "re"], cards: [["co-own", "co"], ["co-operate", "co"], ["re-elect", "re"], ["re-enter", "re"]] }, practice: 2, why: "Read the letters before the joining hyphen: co or re." },
      { q: "Join co and own with a single hyphen. Type the complete spelling.", t: "co-own", chars: ["-"], practice: 4, why: "Co-own puts one hyphen between the prefix co and the root own." },
    ] },
    "the-letter-string-ough": { objective: "Recognise familiar ough spellings and their varied pronunciations.", items: [
      { q: "Which of these words rhymes with rough?", a: "tough", d: ["through", "dough", "bough"], practice: 1, why: "Rough and tough share the uff sound, while the other ough words sound different." },
      { q: "Sort these words by the sound of their ough ending.", sort: { bins: ["Rhymes with blue", "Rhymes with go"], cards: [["through", "Rhymes with blue"], ["dough", "Rhymes with go"], ["though", "Rhymes with go"]] }, practice: 2, why: "Through has the oo sound; dough and though have the oh sound." },
      { q: "Write the word meaning not smooth that begins r and contains ough.", t: "rough", practice: 4, why: "Rough is spelt r-o-u-g-h even though its ending sounds like uff." },
    ] },
    "confusing-word-pairs": { objective: "Choose similar words by their meaning and grammatical job.", items: [
      { q: "Which word completes Please buy paper from the ___ shop?", a: "stationery", d: ["stationary", "station"], practice: 1, why: "Stationery refers to writing materials; stationary means not moving." },
      { q: "Which word completes The ___ reason is that the bridge is unsafe?", a: "principal", d: ["principle", "principally"], practice: 2, why: "Principal means main here; a principle is a rule or belief." },
      { q: "Complete with the word meaning a person who sells goods: The street ___ sold flowers.", t: "pedlar", practice: 4, why: "A pedlar sells goods; a pedal is part of a cycle and peddle is a verb." },
    ] },
    "year-6-word-list-part-1": spell("Recall spellings in the saved identity-to-pronunciation word-list section.",
      ["necessary", "neccessary", "necesary"], ["privilege", "privelege", "priviledge"],
      "Write the noun for the way a word is said. It begins pron and ends in ciation.", "pronunciation",
      ["Necessary has one c and two s letters.", "Necessary and privilege are the correct spellings; privilege has no d.", "Pronunciation has pronun at the start, not pronoun."]),
    "year-6-word-list-part-2": spell("Recall spellings in the saved queue-to-yacht word-list section.",
      ["rhythm", "rythm", "rhythym"], ["restaurant", "restaraunt", "resturant"],
      "Write the word for a sailing boat that begins y and ends cht.", "yacht",
      ["Rhythm begins rh and uses y for its vowel sound.", "Rhythm and restaurant are the correct spellings.", "Yacht is spelt y-a-c-h-t; its letters are not predictable from the sound alone."]),
  },
  "reading---interpretation-and-comparison": {
    "exploring-meaning-in-context": { objective: "Use surrounding words to choose the appropriate meaning.", items: [
      { q: "In The river bank was slippery after the rain, what does bank mean?", a: "The land beside the river", d: ["A place for savings", "A row of switches", "An aircraft turning"], practice: 1, why: "River and slippery after rain point to the land beside the water." },
      { q: "The hall fell silent as the judge delivered the verdict. What does delivered mean here?", a: "Announced", d: ["Carried a parcel to a house", "Gave birth", "Wrapped in paper"], practice: 3, why: "A judge delivers a verdict by announcing the decision." },
      { q: "The plan was sound: everyone agreed it would work. Which meaning of sound fits?", a: "Sensible and reliable", d: ["A loud noise", "Part of a sea coast", "Something heard through headphones"], practice: 4, why: "The statement that it would work supports the meaning sensible or reliable." },
    ] },
    "predicting-from-details": { objective: "Make plausible predictions from stated and implied details.", items: [
      { q: "A character sees dark clouds, hears thunder and leaves without a coat. Which prediction has the strongest support?", a: "They may get wet", d: ["A snowman will speak", "The sun will never rise again", "They will certainly win a prize"], practice: 1, why: "Clouds and thunder suggest rain; a prediction remains a possibility, not a certainty." },
      { q: "Which detail best supports a prediction that a boat might leak?", a: "Water is trickling through a crack in its side", d: ["Its name is painted blue", "The captain has a hat", "The harbour has a café"], practice: 3, why: "A crack with water coming through is relevant evidence about leaking." },
      { q: "After the community lunch, what is a reasonable prediction?", a: "The volunteers may grow more crops", d: ["The hall will definitely disappear", "Nobody will ever garden again", "The soil will turn into glass"], evidence: GARDEN, practice: 4, why: "The final paragraph says the volunteers planned another season." },
    ] },
    "summarising-across-paragraphs": { objective: "Combine main ideas drawn from more than one paragraph.", items: [
      { q: "Which summary best covers the whole passage?", a: "A community prepared a garden, grew food and shared its harvest.", d: ["Volunteers tested some soil.", "The hall was behind a patch.", "The crops were all planted in June."], evidence: GARDEN, practice: 1, why: "The summary includes preparation, growing and sharing across all three paragraphs." },
      { q: "Which detail could be omitted from a very short summary without losing the main story?", a: "The project began in March", d: ["Volunteers prepared a garden", "Families cared for the plants", "The harvest was shared"], evidence: GARDEN, practice: 3, why: "The exact starting month is less central than the sequence of communal work and sharing." },
      { q: "Which sentence combines the main ideas of both accounts?", a: "Rain ended a match early but benefited gardens after heat.", d: ["The rain had no effects.", "Both writers say the match finished normally.", "Nobody had noticed the heat."], evidence: RAIN, practice: 4, why: "It retains the interruption in the first account and the benefit described in the second." },
    ] },
    "figurative-language-and-its-effect": { objective: "Explain the effects of figurative comparisons rather than taking them literally.", items: [
      { q: "The city was a furnace. What impression does this metaphor create?", a: "The city felt intensely hot", d: ["Every building was an oven", "The city was freezing", "Nobody lived in the city"], practice: 1, why: "A furnace is very hot, so the metaphor intensifies the impression of heat." },
      { q: "Her words were a warm blanket. What does the comparison suggest?", a: "Her words were comforting", d: ["Her words were made of wool", "She had stopped speaking", "The room was on fire"], practice: 3, why: "A warm blanket suggests comfort and reassurance." },
      { q: "Which description most strongly suggests an angry sea?", a: "Waves clawed at the harbour wall.", d: ["Water lay still beneath the moon.", "The surface was flat.", "Three boats were tied to the pier."], practice: 4, why: "Clawed gives the waves a forceful, threatening action like an angry creature." },
    ] },
    "comparing-accounts-and-viewpoints": { objective: "Compare shared events and differing emphasis in accounts.", items: [
      { q: "What event do both reporters agree happened?", a: "The match ended early because of rain", d: ["The match continued normally", "There had been weeks of snow", "Nobody left the match"], evidence: RAIN, practice: 1, why: "Both accounts mention the rain bringing the match to an early end." },
      { q: "Which difference in emphasis is supported?", a: "A focuses on disappointment; B focuses on a benefit", d: ["A welcomes rain and B denies it rained", "Both discuss only gardening", "B says nobody was pleased"], evidence: RAIN, practice: 3, why: "A describes disappointed spectators, while B describes relief and delighted gardeners." },
      { q: "Why is reading both accounts useful?", a: "They reveal different effects of the same event", d: ["It proves one writer must be lying", "It removes the need to check evidence", "It means every opinion is a fact"], evidence: RAIN, practice: 4, why: "An event can cause both disappointment and relief for different people." },
    ] },
    "themes-and-conventions": { objective: "Distinguish broad themes from familiar genre conventions.", items: [
      { q: "Which theme is best supported by Idris's choice?", a: "Honesty and responsibility", d: ["Winning races", "Learning to cook", "Exploring outer space"], evidence: LOST, practice: 1, why: "Idris hands in the envelope instead of taking or secretly opening it." },
      { q: "A mystery introduces clues and possible suspects. What is this an example of?", a: "A familiar convention of a genre", d: ["A rule that every story must rhyme", "Proof the story is non-fiction", "The title of every mystery"], practice: 3, why: "Clues and suspects are familiar features that readers expect in mysteries." },
      { q: "Two stories show people helping someone they once feared. Which shared theme fits best?", a: "Overcoming prejudice through understanding", d: ["The best way to repair a roof", "Always avoiding other people", "Following a recipe exactly"], practice: 4, why: "The change from fear to helping supports a theme of understanding others." },
    ] },
    "asking-questions-about-texts": { objective: "Choose questions that clarify textual meaning and interpretation.", items: [
      { q: "Which question would best help explore Idris's motive?", a: "Why did he stop opening the envelope?", d: ["How many windows does my house have?", "What is my favourite food?", "Which shoes should I buy?"], evidence: LOST, practice: 1, why: "The question asks about a significant decision in the passage." },
      { q: "You do not understand why a character leaves home. What is the most useful question?", a: "Which earlier details explain the decision to leave?", d: ["Can I ignore the earlier paragraphs?", "Must every character have my favourite name?", "How many pages are left?"], practice: 3, why: "It directs attention to relevant evidence that could explain the motive." },
      { q: "A word seems to have two possible meanings in a passage. Which question helps?", a: "Which meaning fits the surrounding sentences?", d: ["Which meaning is first in every dictionary?", "Which meaning uses the most letters?", "Can I remove the whole passage?"], practice: 4, why: "Context helps choose the meaning intended in that passage." },
    ] },
  },
  "grammar---formal-language-and-sentence-choices": {
    "formal-and-informal-vocabulary": { objective: "Select vocabulary appropriate to formal and informal situations.", items: [
      { q: "Which expression is most suitable for a formal notice?", a: "Please contact the office.", d: ["Give us a ring, mate.", "Oi, phone us!", "Hey, what's up?"], practice: 1, why: "Contact and the polite request suit a formal notice." },
      { q: "Sort the phrases by their usual register.", sort: { bins: ["More formal", "More informal"], cards: [["purchase a ticket", "More formal"], ["obtain permission", "More formal"], ["grab a bite", "More informal"], ["give me a hand", "More informal"]] }, practice: 2, why: "Purchase/obtain are more formal choices; grab a bite/give me a hand are conversational idioms." },
      { q: "Replace kids with a more formal word: All ___ must be accompanied by an adult.", t: "children", practice: 4, why: "Children is suitable for a formal public notice." },
    ] },
    "synonyms-and-antonyms": { objective: "Choose context-appropriate words with similar or opposite meanings.", items: [
      { q: "Which word is a synonym for cautious?", a: "Careful", d: ["Reckless", "Noisy", "Hungry"], practice: 1, why: "Cautious and careful share the idea of avoiding risk." },
      { q: "Which word is an antonym of scarce?", a: "Abundant", d: ["Rare", "Limited", "Uncommon"], practice: 2, why: "Scarce means in short supply; abundant means plentiful." },
      { q: "Choose a synonym for bright in a bright idea.", a: "Clever", d: ["Shiny", "Sunlit", "Glowing"], practice: 4, why: "In this phrase bright describes an idea's cleverness, not visible light." },
    ] },
    "active-and-passive-voice": { objective: "Identify voice and explain a shift in focus.", items: [
      { q: "Which sentence is passive?", a: "The mural was painted by the class.", d: ["The class painted the mural.", "The class will paint tomorrow.", "We admire the mural."], practice: 1, why: "The mural receives the action; was painted is the passive verb phrase." },
      { q: "Sort the sentences by voice.", sort: { bins: ["Active", "Passive"], cards: [["The wind bent the tree.", "Active"], ["The tree was bent by the wind.", "Passive"], ["The team collected the litter.", "Active"], ["The litter was collected by the team.", "Passive"]] }, practice: 2, why: "In these active versions the doer is the subject; the passive versions foreground the affected thing." },
      { q: "The window was broken overnight. What does this version allow the writer to leave unstated?", a: "Who broke the window", d: ["What was broken", "That an event happened", "The fact that a window is mentioned"], practice: 4, why: "A passive clause can omit the doer while reporting the action and its effect." },
    ] },
    "formal-structures-and-the-subjunctive": { objective: "Recognise formal structures and familiar subjunctive forms.", items: [
      { q: "Which version is most suitable for a formal notice?", a: "The gates will close at six.", d: ["The gates close at six, okay?", "The gates close at six, don't they?"], practice: 1, why: "The formal notice states the information directly instead of seeking conversational agreement." },
      { q: "Choose the formal imagined form: If I ___ the mayor, I would protect the park.", a: "were", d: ["am", "be", "will be"], practice: 3, why: "If I were is a familiar subjunctive construction for an imagined situation." },
      { q: "Complete the formal requirement: It is essential that every visitor ___ accompanied.", t: "be", practice: 4, why: "Be is the subjunctive form in this formal statement of a requirement." },
    ] },
    "expanded-noun-phrases-for-information": { objective: "Select concise noun phrases carrying relevant identifying information.", items: [
      { q: "Which phrase gives the most precise information about a weather station?", a: "the solar-powered weather station on the school roof", d: ["the thing", "a station", "some equipment somewhere"], practice: 1, why: "The phrase identifies the equipment, its power source and its location." },
      { q: "What is the head noun in the three small wooden boxes on the shelf?", a: "boxes", d: ["small", "wooden", "shelf"], practice: 2, why: "The phrase names boxes; the other words add information about them." },
      { q: "Which revision combines the information clearly? The telescope is portable. It has a solar filter.", a: "the portable telescope with a solar filter", d: ["the solar portable with telescope", "the filter is a with telescope", "portable and solar and there"], practice: 4, why: "The details portable and with a solar filter both modify telescope in one clear noun phrase." },
    ] },
  },
  "grammar---cohesion-layout-and-punctuation": {
    "cohesive-devices-across-paragraphs": { objective: "Choose linking devices that express the intended relation.", items: [
      { q: "A paragraph explains an advantage. Which opening best introduces a disadvantage?", a: "On the other hand,", d: ["For the same reason,", "Likewise,", "In exactly the same way,"], practice: 1, why: "On the other hand signals a contrasting point." },
      { q: "A report discusses the new footbridge. The next paragraph begins This structure… What does this phrase do?", a: "Refers back to the footbridge", d: ["Introduces a completely unrelated subject", "Proves the bridge is ancient", "Changes every verb to future tense"], practice: 3, why: "This structure links the new paragraph to the previously named footbridge." },
      { q: "Which opening signals a concluding overview rather than another example?", a: "Overall,", d: ["For instance,", "For example,", "One illustration is"], practice: 4, why: "Overall draws together the main points instead of adding a specific example." },
    ] },
    ellipsis: { objective: "Recover words omitted through grammatical ellipsis.", items: [
      { q: "I can swim, and Jo can too. Which verb has been left out of the second clause?", a: "swim", d: ["can", "Jo", "too"], practice: 1, why: "The second clause omits the repeated verb swim; it means Jo can swim too." },
      { q: "Some pupils chose apples; others, pears. Which word is understood after others?", t: "chose", practice: 3, why: "The second clause is understood as others chose pears." },
      { q: "Which revision avoids repetition without losing the meaning? I will help, and Maya will help too.", a: "I will help, and Maya will too.", d: ["I will, and Maya.", "Maya help and I too will.", "I help will Maya."], practice: 4, why: "Help is recoverable from the first clause, so it can be omitted after Maya will." },
    ] },
    "layout-devices": { objective: "Choose layouts that help readers locate and compare information.", items: [
      { q: "Which layout best compares opening times for five days?", a: "A table with days and times", d: ["One long sentence with no spaces", "A picture without labels", "A random list of adjectives"], practice: 1, why: "Rows and columns keep each day aligned with its opening time." },
      { q: "What does a subheading usually do?", a: "Introduces a smaller section within a topic", d: ["Always ends the whole text", "Replaces every paragraph", "Makes every sentence a question"], practice: 2, why: "A subheading divides a larger topic into identifiable sections." },
      { q: "A reader wants only the equipment needed for an experiment. Which device helps them find it quickly?", a: "A clearly titled equipment list", d: ["A hidden note with no heading", "Equipment words scattered through an unrelated story", "An unlabelled page number"], practice: 4, why: "A clear list under a relevant heading supports scanning for specific information." },
    ] },
    "semicolons-colons-and-dashes": { objective: "Use boundary punctuation between independent clauses.", items: [
      { q: "Which sentence correctly uses a semicolon between two independent clauses?", a: "The path was flooded; we turned back.", d: ["The path; was flooded and wet.", "Because the path was flooded;.", "The; flooded path."], practice: 1, why: "The path was flooded and we turned back could each stand as a sentence." },
      { q: "The team had one problem: the gate was locked. What does the clause after the colon do?", a: "Explains the problem", d: ["Gives an unrelated name", "Lists colours", "Changes the event into a question"], practice: 3, why: "The second independent clause specifies the problem announced in the first." },
      { q: "Which punctuation mark can create an emphatic break between these clauses: I opened the box ___ it was empty?", a: "A dash", d: ["An apostrophe", "A hyphen inside a word", "A closing speech mark alone"], practice: 4, why: "A dash can connect the independent clauses while emphasising the surprising second one." },
    ] },
    "punctuation-in-lists": { objective: "Use colons and semicolons to clarify lists.", items: [
      { q: "Which mark correctly introduces the list: We packed three essentials ___ water, food and a map?", a: "A colon", d: ["An apostrophe", "A question mark", "A hyphen"], practice: 1, why: "The complete introduction We packed three essentials can be followed by a colon and its list." },
      { q: "Each list item already contains a comma. Which separator best keeps the items distinct?", a: "A semicolon", d: ["An apostrophe", "No separator", "A speech mark"], practice: 3, why: "Semicolons can separate complex list items that already contain commas." },
      { q: "Which list separates the two people and their descriptions clearly?", a: "Ava, our captain; and Ben, our goalkeeper", d: ["Ava our captain Ben our goalkeeper", "Ava; our; captain; Ben", "Ava our, captain Ben our"], practice: 4, why: "The semicolon separates the two list items, while commas attach each description to its person." },
    ] },
    "bullet-point-punctuation": { objective: "Apply a stated full-sentence bullet style consistently.", items: [
      { q: "A list uses complete sentences as bullets. Which item has suitable sentence punctuation?", a: "Bring a notebook.", d: ["Bring a notebook,", "Bring a notebook;"], practice: 1, why: "A complete sentence bullet can begin with a capital and finish with a full stop." },
      { q: "Which is a sensible editing check for a set of full-sentence bullet points?", a: "Use capitals and full stops consistently", d: ["Use a different punctuation rule for each item", "Remove all verbs", "Join every bullet into one word"], practice: 2, why: "Consistent punctuation makes the structure easy to follow." },
      { q: "Which bullet has the same full-sentence style as Lock the gate. and Switch off the lights.?", a: "Return the key.", d: ["Return the key,", "Return the key:"], practice: 4, why: "The instruction is a complete sentence and ends with a full stop, matching the others." },
    ] },
    "hyphens-to-avoid-ambiguity": { objective: "Explain how hyphens group words and clarify a phrase.", items: [
      { q: "What does a man-eating shark mean?", a: "A shark that eats people", d: ["A man eating a shark", "A shark eating a man's hat", "A man feeding fish"], practice: 1, why: "The hyphen joins man and eating into a description of the shark." },
      { q: "What does a small-business owner mean?", a: "An owner of a small business", d: ["An owner who is physically small", "A business that owns a person", "A business with no owner"], practice: 3, why: "The hyphen groups small with business rather than describing the owner's size." },
      { q: "Which phrase clearly describes a person who is five years old?", a: "a five-year-old child", d: ["a five year-old-child", "a five-year old-child"], practice: 4, why: "The hyphens join the age words before the noun child." },
    ] },
  },
  "writing---composition-and-editing": {
    "formal-register-for-audience-and-purpose": { objective: "Choose a register for a specified reader and writing purpose.", items: [
      { q: "Which opening best suits a formal enquiry to the council?", a: "I am writing to request information about…", d: ["Oi, tell me now!", "Hiya mate, what's happening?", "Once upon a time…"], practice: 1, why: "The clear, courteous request suits an organisation and a formal purpose." },
      { q: "Which sentence most suits a relaxed message to a close friend?", a: "Fancy coming to the park later?", d: ["I hereby request your attendance.", "Attendance is mandatory pursuant to this notice.", "The applicant is requested to submit documentation."], practice: 2, why: "A conversational invitation suits the relationship and purpose." },
      { q: "Which revision makes a demand more suitable for a formal request?", a: "Could you please explain the decision?", d: ["Explain it now or else!", "You lot had better explain!", "I don't care what you think."], practice: 4, why: "The question is clear and courteous without being threatening." },
    ] },
    "precising-longer-passages": { objective: "Condense a passage accurately while retaining its main ideas.", items: [
      { q: "Which précis best retains the main meaning?", a: "Volunteers created a garden and shared the harvest.", d: ["A rota existed.", "Nobody helped in the garden.", "The project finished before planting."], evidence: GARDEN, practice: 1, why: "It keeps the communal work and outcome without contradicting the passage." },
      { q: "Which shorter version keeps the important meaning? The library was closed for repairs. It reopened after the roof was fixed.", a: "The library reopened after roof repairs.", d: ["The library never reopened.", "The roof was never repaired.", "The library closed because nobody read."], practice: 3, why: "The shorter sentence retains the reason for closure and the reopening." },
      { q: "Which detail must a précis retain to explain Idris's decision?", a: "He handed the found envelope to the office", d: ["The gate's exact colour", "The size of every school window", "The weather on another day"], evidence: LOST, practice: 4, why: "Handing it in is central to the action and meaning of this passage; the other details are not even supplied." },
    ] },
    "passive-voice-in-writing": { objective: "Choose passive voice when it suits the intended report focus.", items: [
      { q: "Which version puts the damaged bridge first?", a: "The bridge was damaged by the storm.", d: ["The storm damaged the bridge.", "The storm arrived at midnight.", "People watched the storm."], practice: 1, why: "The passive version foregrounds the bridge and what happened to it." },
      { q: "You do not know who left the parcel. Which sentence reports the event without inventing a doer?", a: "The parcel was left outside the office.", d: ["A pirate left the parcel.", "The headteacher definitely left it.", "Nobody could ever leave a parcel."], practice: 3, why: "The passive reports the event while leaving the unknown doer unstated." },
      { q: "Which sentence is an appropriate passive revision of The team planted the trees?", a: "The trees were planted by the team.", d: ["The team were planted by the trees.", "The trees planted the team.", "The team was planting the trees."], practice: 4, why: "The trees receive the same action and the team remains the doer." },
    ] },
    "subjunctive-forms-in-writing": { objective: "Choose subjunctive forms for particular formal requirements and imagined situations.", items: [
      { q: "Which form suits a formal imagined condition?", a: "If I were the captain, I would check the map.", d: ["If I am captain yesterday, I checked the map.", "If I be captain yesterday, I checking the map."], practice: 1, why: "If I were is used for this imagined situation, followed by would." },
      { q: "The panel recommends that the gate ___ kept shut. Which form suits the formal recommendation?", a: "be", d: ["being", "were been", "to being"], practice: 3, why: "Be is the subjunctive form after this formal recommendation." },
      { q: "Complete the formal imagined form: Were they ___ arrive early, we would open the hall.", t: "to", practice: 4, why: "Were they to arrive is a formal way to express an imagined condition." },
    ] },
    "proofreading-for-clarity-and-effect": { objective: "Edit unclear references, repetition and punctuation without changing intended meaning.", items: [
      { q: "Jo told Kim that she had won. What is unclear?", a: "Whether Jo or Kim had won", d: ["Whether a person is mentioned", "Whether the sentence contains a verb", "Whether told is in the past"], practice: 1, why: "She could refer to either named person, so the winner should be identified." },
      { q: "Which edit removes repetition without losing information? The enormous giant was very, very huge.", a: "The giant was enormous.", d: ["The giant was tiny.", "There was no giant.", "The enormous enormous huge giant."], practice: 3, why: "Enormous already communicates the size; the revision avoids repeating that idea." },
      { q: "Which version keeps the intended meaning that visitors must stay on the path?", a: "Visitors must remain on the path.", d: ["Visitors must not remain on the path.", "Visitors can go anywhere they wish.", "Only paths may visit."], practice: 4, why: "Remain means stay; the other versions change the instruction or make no sense." },
    ] },
    "year-6-dictation": { objective: "Check spelling/punctuation related to dictation without claiming to assess listening transcription in a sound-off quiz.", items: [
      { q: "Which sentence spells all its words correctly?", a: "The necessary equipment arrived yesterday.", d: ["The neccessary equipment arrived yesterday.", "The necessary equiptment arrived yesterday."], practice: 1, why: "Necessary has one c and two s letters; equipment has no t after p." },
      { q: "Which version correctly uses a semicolon between two complete clauses?", a: "The room was quiet; everyone was reading.", d: ["The room; was quiet everyone reading.", "The room was quiet everyone; was reading."], practice: 3, why: "Each side of the semicolon can stand as a sentence." },
      { q: "Which check is most useful after writing a sentence from dictation?", a: "Compare all words, their order and punctuation with the original", d: ["Check only the first word", "Ignore every short word", "Change the message to something easier"], practice: 4, why: "Accurate dictation preserves the whole message, not just a few spellings." },
    ] },
  },
} });
