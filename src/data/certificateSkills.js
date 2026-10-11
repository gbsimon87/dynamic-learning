/**
 * The "I can…" line on a certificate: one short, first-person statement per
 * curriculum topic, in words a 6–8 year old can read to a grown-up.
 *
 * Each statement stays inside what its topic teaches — the topic's row in
 * `docs/curriculum/` (the statutory requirement it serves) sets the boundary,
 * exactly as it does for the questions. Keyed `year/subject/topicId`, the same
 * key as stickers and news (`news.stickerKey`). Topic ids are progress keys
 * locked by `curriculumIds.test.js`; this map only reads them.
 *
 * `certificateSkills.test.js` checks every topic in every registered
 * curriculum has a statement, that no key is an orphan, the length limit and
 * British spelling. A topic added later without a line still gets a
 * certificate, from the fallback template.
 *
 * Pure data, so it runs under `node --test`.
 */

import { YEAR1_MATH_TOPIC_SKILLS } from "./year1MathCertificateSkills.js";
import { YEAR2_ENGLISH_TOPIC_SKILLS } from "./english/year2CertificateSkills.js";

export const SKILL_STATEMENT_MAX = 80;

export const TOPIC_SKILLS = {
  ...YEAR2_ENGLISH_TOPIC_SKILLS,
  ...YEAR1_MATH_TOPIC_SKILLS,
  // ---- Year 2 Maths (docs/curriculum/year-2-maths.md) ----
  "2/math/numbers-and-counting": "I can read and write numbers to 100 in numerals and in words.",
  "2/math/counting-forwards-and-backwards": "I can count forwards and backwards in 2s, 3s, 5s and 10s.",
  "2/math/counting-in-steps-of-2-3-5-and-10": "I can count in steps of 2, 3, 5 and 10.",
  "2/math/counting-more-and-less": "I can use place value to find numbers that are more or less.",
  "2/math/place-value": "I know what the tens and ones mean in a two-digit number.",
  "2/math/less-than-greater-than-and-equal-to": "I can compare numbers to 100 using <, > and =.",
  "2/math/doubling-and-halving-using-addition-and-subtraction": "I can use my adding and taking-away facts to double and halve.",
  "2/math/solving-number-problems": "I can solve adding and taking-away problems with objects and pictures.",
  "2/math/using-two-digit-numbers": "I can add and subtract two-digit numbers, tens and ones.",
  "2/math/solving-missing-number-problems": "I can find the missing number in adding and taking-away sums.",
  "2/math/what-is-multiplication": "I can write multiplication with × and =, using arrays and groups.",
  "2/math/what-is-division": "I can share and group things, and write division with ÷ and =.",
  "2/math/2-5-and-10-multiplication-tables": "I know my 2, 5 and 10 times tables, and odd and even numbers.",
  "2/math/division-problems": "I can solve sharing and grouping problems.",
  "2/math/connecting-multiplication-and-division": "I know how multiplication and division are linked.",
  "2/math/doubling-and-halving-using-multiplication-and-division": "I know half of 40 is 20, and I can double and halve numbers.",
  "2/math/solving-multiplication-and-division-problems": "I can solve multiplication and division problems.",
  "2/math/what-is-a-fraction": "I can find halves, thirds and quarters of shapes and lengths.",
  "2/math/fractions-of-numbers": "I can find fractions of numbers, like half of 6 is 3.",
  "2/math/finding-fractions-of-larger-groups": "I can find fractions of a group of objects.",
  "2/math/measuring-length-and-height": "I can measure length and height in metres and centimetres.",
  "2/math/measuring-weight-and-volume": "I can measure mass in kg and g, and capacity in litres and ml.",
  "2/math/comparing-measurements": "I can compare lengths, masses and capacities using <, > and =.",
  "2/math/measuring-temperature": "I can read a thermometer in degrees Celsius.",
  "2/math/measuring-time": "I can tell the time to five minutes.",
  "2/math/standard-units-of-money": "I can use £ and p, and make amounts with different coins.",
  "2/math/money-problems": "I can solve money problems and work out change.",
  "2/math/2-d-shapes": "I can describe 2-D shapes by their sides and lines of symmetry.",
  "2/math/3-d-shapes": "I can count the faces, edges and vertices of 3-D shapes.",
  "2/math/different-shapes": "I can spot 2-D shapes on 3-D shapes, and sort shapes.",
  "2/math/patterns": "I can order and arrange shapes and objects in patterns.",
  "2/math/sequences": "I can carry on and complete sequences.",
  "2/math/quarter-turns-and-half-turns": "I can make quarter, half and three-quarter turns both ways.",
  "2/math/right-angle-turns": "I can describe turns using right angles.",
  "2/math/pictograms": "I can read and make pictograms.",
  "2/math/tally-charts": "I can read and make tally charts.",
  "2/math/block-diagrams": "I can read and make block diagrams.",
  "2/math/tables": "I can read and make simple tables.",
  "2/math/gathering-information-and-using-data": "I can sort, count and compare data to answer questions.",

  // ---- Year 3 Maths (docs/curriculum/year-3-maths.md) ----
  "3/math/counting-in-multiples-of-4-8-50-and-100": "I can count from 0 in 4s, 8s, 50s and 100s.",
  "3/math/finding-10-or-100-more-or-less": "I can find 10 or 100 more or less than a number.",
  "3/math/place-value-in-3-digit-numbers": "I know what each digit means in a 3-digit number.",
  "3/math/comparing-and-ordering-numbers-to-1000": "I can compare and order numbers up to 1,000.",
  "3/math/representing-and-estimating-numbers": "I can show and estimate numbers in different ways.",
  "3/math/reading-and-writing-numbers-to-1000": "I can read and write numbers to 1,000 in numerals and in words.",
  "3/math/number-and-place-value-problems": "I can solve problems using place value.",
  "3/math/adding-and-subtracting-ones-tens-and-hundreds": "I can add and subtract ones, tens and hundreds in my head.",
  "3/math/column-addition": "I can add 3-digit numbers using column addition.",
  "3/math/column-subtraction": "I can subtract 3-digit numbers using column subtraction.",
  "3/math/estimating-and-checking-answers": "I can estimate an answer, then check it with the inverse.",
  "3/math/missing-number-problems": "I can solve missing number problems.",
  "3/math/addition-and-subtraction-problems": "I can solve adding and subtracting problems.",
  "3/math/3-and-4-times-tables": "I know my 3 and 4 times tables.",
  "3/math/the-8-times-table": "I know my 8 times table.",
  "3/math/multiplying-and-dividing-two-digit-numbers": "I can multiply and divide two-digit numbers by one-digit numbers.",
  "3/math/scaling-and-correspondence-problems": "I can solve scaling problems and matching-up problems.",
  "3/math/multiplication-and-division-problems": "I can solve multiplication and division problems.",
  "3/math/tenths": "I can count up and down in tenths.",
  "3/math/fractions-of-a-set-of-objects": "I can find fractions of a set of objects.",
  "3/math/fractions-as-numbers": "I know fractions are numbers too, and I can use them.",
  "3/math/equivalent-fractions": "I can find fractions that are worth the same.",
  "3/math/adding-and-subtracting-fractions": "I can add and subtract fractions with the same denominator.",
  "3/math/comparing-and-ordering-fractions": "I can compare and order fractions.",
  "3/math/fraction-problems": "I can solve fraction problems.",
  "3/math/measuring-length-in-mm-cm-and-m": "I can measure lengths in mm, cm and m.",
  "3/math/measuring-mass": "I can measure and compare mass in kg and g.",
  "3/math/measuring-volume-and-capacity": "I can measure and compare capacity in litres and ml.",
  "3/math/adding-and-subtracting-measurements": "I can add and subtract lengths, masses and volumes.",
  "3/math/perimeter-of-2-d-shapes": "I can measure the perimeter of 2-D shapes.",
  "3/math/money-and-giving-change": "I can add and subtract money in £ and p, and give change.",
  "3/math/telling-the-time-to-the-minute": "I can tell the time to the nearest minute.",
  "3/math/roman-numerals-and-24-hour-clocks": "I can read clocks with Roman numerals and 24-hour times.",
  "3/math/units-of-time-and-durations": "I know the days in each month, and I can compare how long things take.",
  "3/math/drawing-2-d-shapes": "I can draw 2-D shapes.",
  "3/math/making-and-recognising-3-d-shapes": "I can recognise and describe 3-D shapes, whichever way they face.",
  "3/math/angles-as-turns": "I know an angle can describe a turn.",
  "3/math/right-angles": "I can spot right angles, and I know 4 make a whole turn.",
  "3/math/comparing-angles-to-a-right-angle": "I can tell if an angle is bigger or smaller than a right angle.",
  "3/math/horizontal-vertical-parallel-and-perpendicular-lines": "I can spot horizontal, vertical, parallel and perpendicular lines.",
  "3/math/bar-charts": "I can read and make bar charts.",
  "3/math/scaled-pictograms": "I can read pictograms where one picture stands for more than one.",
  "3/math/tables": "I can read and show data in tables.",
  "3/math/one-step-and-two-step-questions": "I can answer one-step and two-step questions from charts.",

  // ---- Year 1 English (docs/curriculum/year-1-english.md) ----
  "1/english/the-alphabet": "I can say the letters of the alphabet in order.",
  "1/english/double-letters-and-ck": "I can spell words ending in ff, ll, ss, zz and ck.",
  "1/english/the-sounds-nk-and-tch": "I can spell words with nk and tch, like think and catch.",
  "1/english/words-ending-in-ve-and-y": "I can spell words ending in ve and y, like give and happy.",
  "1/english/the-spellings-ph-wh-and-k": "I can spell words with ph, wh and k.",
  "1/english/blending-sounds": "I can blend sounds to read new words.",
  "1/english/same-letters-different-sounds": "I know some letters can make different sounds.",
  "1/english/tricky-words": "I can read and spell tricky words like said and friend.",
  "1/english/longer-words": "I can read longer words by splitting them into beats.",
  "1/english/contractions": "I can read short forms like I’m and we’ll.",
  "1/english/singular-and-plural": "I know when to add s or es to mean more than one.",
  "1/english/adding-ing-ed-and-er": "I can add ing, ed and er to words.",
  "1/english/adding-er-and-est": "I can add er and est to describing words.",
  "1/english/the-prefix-un": "I know that un at the start of a word changes its meaning.",
  "1/english/compound-words": "I can join two words to make one, like football.",
  "1/english/traditional-tales": "I know lots of fairy stories and traditional tales.",
  "1/english/titles-and-events": "I can talk about the title and what happens in a story.",
  "1/english/thinking-about-characters": "I can work out how characters feel from what they say and do.",
  "1/english/what-happens-next": "I can guess what might happen next in a story.",
  "1/english/the-spellings-ai-ay-oi-and-oy": "I can spell words with ai, ay, oi and oy.",
  "1/english/split-digraphs": "I can read and spell words like cake, bike and home.",
  "1/english/the-spellings-ee-ea-ie-and-igh": "I can spell words with ee, ea, ie and igh.",
  "1/english/the-spellings-oo-oa-ow-and-ew": "I can spell words with oo, oa, ow and ew.",
  "1/english/the-spellings-ar-or-er-ir-and-ur": "I can spell words with ar, or, er, ir and ur.",
  "1/english/the-spellings-air-ear-and-are": "I can spell words with air, ear and are.",
  "1/english/words-and-sentences": "I know words go together to make sentences.",
  "1/english/joining-with-and": "I can join words and ideas with and.",
  "1/english/capital-letters": "I can use capital letters for names and for I.",
  "1/english/days-of-the-week": "I can spell the days of the week.",
  "1/english/ending-a-sentence": "I can end a sentence with a full stop, question mark or exclamation mark.",
  "1/english/rhymes-and-poems": "I can hear and spot rhyming words.",
  "1/english/repeated-phrases": "I can join in with phrases that repeat in a story.",
  "1/english/what-words-mean": "I can work out what new words mean.",
  "1/english/facts-and-stories": "I can tell a fact book from a story.",
  "1/english/building-sentences": "I can build a sentence that makes sense.",
  "1/english/ordering-a-story": "I can put sentences in order to tell a story.",
  "1/english/checking-it-makes-sense": "I can check that my writing makes sense.",
  "1/english/dictation": "I can write sentences that are read out to me.",

  // ---- Year 3 English (docs/curriculum/year-3-and-4-english.md) ----
  "3/english/adding-prefixes": "I can add prefixes like dis, mis, re and sub to words.",
  "3/english/the-prefixes-super-anti-and-auto": "I can make new words with super, anti and auto.",
  "3/english/the-suffixes-ation-and-ly": "I can add the suffixes ation and ly to words.",
  "3/english/doubling-before-a-suffix": "I know when to double a letter before adding a suffix.",
  "3/english/root-words": "I can use root words to work out what new words mean.",
  "3/english/exception-words": "I can read tricky exception words.",
  "3/english/using-a-dictionary": "I can use a dictionary to check meanings and spellings.",
  "3/english/words-in-context": "I can work out what a word means from the words around it.",
  "3/english/a-or-an": "I know when to use a and when to use an.",
  "3/english/word-families": "I can spot word families and how their words are related.",
  "3/english/does-it-make-sense": "I can check that what I read makes sense.",
  "3/english/characters-feelings": "I can work out how characters feel from what they do.",
  "3/english/predicting-what-happens-next": "I can predict what might happen next in a story.",
  "3/english/fairy-stories-myths-and-legends": "I know lots about fairy stories, myths and legends.",
  "3/english/the-sure-and-ture-endings": "I can spell words ending in sure and ture.",
  "3/english/tricky-sounds-y-and-ou": "I can spell tricky words like myth and young.",
  "3/english/homophones": "I can spell homophones, like here and hear.",
  "3/english/words-often-misspelt": "I can spell words that are often misspelt.",
  "3/english/conjunctions": "I can join ideas with when, if, because and although.",
  "3/english/time-and-cause-words": "I can use words that tell when, where and why.",
  "3/english/the-present-perfect": "I know when to say I have played instead of I played.",
  "3/english/inverted-commas": "I can use inverted commas to show what people say.",
  "3/english/finding-information": "I can find information using contents pages and indexes.",
  "3/english/asking-questions-about-a-text": "I can ask questions to help me understand a text.",
  "3/english/kinds-of-writing": "I can tell letters, diaries and instructions apart.",
  "3/english/words-that-spark-the-imagination": "I can spot words and phrases that spark my imagination.",
  "3/english/poetry-forms": "I can recognise different forms of poetry.",
  "3/english/paragraphs": "I can group ideas that belong together into paragraphs.",
  "3/english/headings-and-sub-headings": "I can use headings and sub-headings to organise writing.",
  "3/english/settings-characters-and-plot": "I can create settings, characters and plots for stories.",
  "3/english/proofreading": "I can proofread for spelling and punctuation mistakes.",
  "3/english/dictation": "I can write sentences from memory when they are read to me.",

  // ---- Year 4 English (docs/curriculum/year-3-and-4-english.md) ----
  "4/english/the-prefixes-il-im-and-ir": "I can use the prefixes il, im and ir to mean not.",
  "4/english/the-suffix-ous": "I can spell words ending in ous, like famous.",
  "4/english/more-ly-adverbs": "I can spell tricky ly adverbs, like gently and truly.",
  "4/english/apostrophes-for-plural-possession": "I can use apostrophes with plurals, like girls’ and children’s.",
  "4/english/main-ideas-and-summaries": "I can find the main ideas in a text and sum them up.",
  "4/english/justifying-inferences": "I can back up what I think about characters with evidence.",
  "4/english/how-language-creates-meaning": "I can explain how a writer’s words create meaning.",
  "4/english/how-structure-and-presentation-help": "I can explain how layout and structure help a reader.",
  "4/english/plural-or-possessive": "I know the difference between a plural s and a possessive s.",
  "4/english/standard-english-verbs": "I can use Standard English, like we were and I did.",
  "4/english/determiners": "I can spot and use determiners.",
  "4/english/expanded-noun-phrases": "I can add detail to nouns with expanded noun phrases.",
  "4/english/the-shun-endings": "I can spell shun endings: tion, sion, ssion and cian.",
  "4/english/the-zhun-ending": "I can spell words ending in sion, like television.",
  "4/english/the-endings-gue-and-que": "I can spell words ending in gue and que, like tongue and unique.",
  "4/english/more-words-often-misspelt": "I can spell more words that are often misspelt.",
  "4/english/themes-in-stories": "I can spot the themes in stories.",
  "4/english/predicting-from-clues": "I can use clues to predict what might happen.",
  "4/english/myths-and-legends-from-around-the-world": "I know myths and legends from around the world.",
  "4/english/comparing-forms-of-poetry": "I can compare different forms of poetry.",
  "4/english/fronted-adverbials": "I can start sentences with fronted adverbials.",
  "4/english/commas-after-fronted-adverbials": "I can put a comma after a fronted adverbial.",
  "4/english/punctuating-direct-speech": "I can punctuate speech with inverted commas.",
  "4/english/pronouns-and-possessive-pronouns": "I can use pronouns and possessive pronouns.",
  "4/english/greek-and-french-ch": "I can spell ch words like school and chef.",
  "4/english/the-letters-sc": "I can spell words with sc, like science.",
  "4/english/the-sounds-ei-eigh-and-ey": "I can spell words with ei, eigh and ey, like eight and they.",
  "4/english/more-homophones": "I can spell more homophones, like whose and who’s.",
  "4/english/paragraphs-around-a-theme": "I can organise paragraphs around a theme.",
  "4/english/nouns-or-pronouns-for-clarity": "I can choose a noun or a pronoun to make my writing clear.",
  "4/english/editing-for-consistency": "I can edit writing so that it stays the same all the way through.",
  "4/english/proofreading-longer-texts": "I can proofread longer texts for spelling and punctuation.",
  "4/english/dictation": "I can write dictated sentences with the words and punctuation I know.",

  // ---- Year 3 Science (docs/curriculum/year-3-science.md) ----
  "3/science/parts-of-flowering-plants": "I know what roots, stems, leaves and flowers do.",
  "3/science/what-plants-need-to-grow": "I know plants need air, light, water, nutrients and room to grow.",
  "3/science/water-transport-in-plants": "I know how water travels up through a plant.",
  "3/science/pollination-and-seed-formation": "I know how flowers help plants to make seeds.",
  "3/science/seed-dispersal": "I know how seeds travel to new places.",
  "3/science/nutrition-for-animals-and-humans": "I know animals and humans get nutrition from what they eat.",
  "3/science/skeletons-for-support-and-protection": "I know skeletons support and protect bodies.",
  "3/science/muscles-and-movement": "I know muscles and skeletons work together to help us move.",
  "3/science/comparing-and-grouping-rocks": "I can compare and group rocks by how they look and feel.",
  "3/science/how-fossils-form": "I can explain how fossils form in rock.",
  "3/science/what-soil-is-made-from": "I know soil is made from rocks and bits of things that lived.",
  "3/science/light-and-darkness": "I know I need light to see, and dark is no light at all.",
  "3/science/reflected-light": "I know light reflects off surfaces.",
  "3/science/protecting-our-eyes-from-sunlight": "I know how to protect my eyes from the sun.",
  "3/science/how-shadows-form": "I know a shadow forms when something opaque blocks the light.",
  "3/science/changing-shadow-size": "I can find patterns in how shadows change size.",
  "3/science/movement-on-different-surfaces": "I can compare how things move on different surfaces.",
  "3/science/contact-and-magnetic-forces": "I know magnets can push or pull without touching.",
  "3/science/magnetic-materials": "I can sort materials into magnetic and not magnetic.",
  "3/science/magnets-and-their-poles": "I know a magnet has two poles, north and south.",
  "3/science/predicting-attraction-and-repulsion": "I can predict whether two magnets will attract or repel.",
};

/** The `TOPIC_SKILLS` key for a topic. Same shape as `news.stickerKey`. */
export function skillKey(year, subject, topicId) {
  return `${Number(year)}/${subject}/${topicId}`;
}

/** A topic's "I can…" line, or a template from its name if it has none yet. */
export function topicSkill({ year, subject, topicId, topicName }) {
  return TOPIC_SKILLS[skillKey(year, subject, topicId)] ??
    `I finished every challenge in ${topicName || "this topic"}.`;
}

/**
 * A quest's line. The achievement above it already names the quest, so this
 * says what it took rather than repeating it.
 */
export function categorySkill() {
  return "I kept going until every topic in the quest was done.";
}

/** A subject's line, e.g. "I worked through a whole year of Maths." */
export function subjectSkill({ subjectName }) {
  return `I worked through a whole year of ${subjectName || "learning"}.`;
}

/** A year's line. The year milestone needs every registered subject. */
export function yearSkill() {
  return "I worked through every subject in a whole school year.";
}
