import { SKILL_GROUPS } from './skillsCatalog.js';

// These describe the existing games, not new statutory curriculum requirements.
// Keep the overview, instructions and skill list aligned with the playable UI.
const CONTENT = {
  'clock-generator': ['Practise telling the time with an interactive clock.', 'Explore the clock face and practise reading the hours and minutes. Compare how the hands show a time and how that time is written.', ['Reading an analogue clock', 'Hours and minutes']],
  'multiplication-table': ['Explore times tables with an interactive multiplication grid.', 'Choose numbers in the grid to explore their products. Look for patterns across rows and columns and practise recalling multiplication facts.', ['Times tables', 'Multiplication patterns']],
  'times-tables': ['Race the clock to answer times table questions from 0 to 20.', 'Choose which times tables to practise, from one table up to a range. Play a set number of questions against the clock, where a wrong try adds 3 seconds, or beat the countdown by getting as many right as you can. Type each answer, then see which facts were slowest or missed and replay just those.', ['Times tables', 'Recalling multiplication facts', 'Answering quickly and accurately']],
  'reading-numbers': ['Practise reading numbers as digits and words.', 'Pick a number range from 20 up to 100,000, then play your way. Mixed rounds match digits with words and listen-and-pick; Build turns a dial for each digit; Explore shows how a number breaks into hundreds, tens and ones as you change it.', ['Matching digits and number words', 'Place value in larger numbers', 'Hearing and reading numbers aloud']],
  'arithmetic-practice': ['Practise addition, subtraction, multiplication and division.', 'Choose the type of calculation and the settings before starting. Work out each answer, check it, and use the next question for more practice.', ['Addition and subtraction', 'Multiplication and division']],
  'missing-number': ['Find the missing number in a number pattern.', 'Choose your number-pattern settings, then look at the numbers around the gap. Work out the step between numbers and use it to find the missing value.', ['Number sequences', 'Counting forwards and backwards']],
  'number-bonds': ['Find pairs of numbers that add up to a target.', 'Start with bonds to 10 or choose another target. Match pairs in the memory game, or switch to practice mode to work out the missing partner.', ['Number bonds', 'Addition facts']],
  'fraction-fun': ['Shade and name fractions on bars, pizzas, trays and polygons cut into equal parts.', 'Choose Shade it to shade the fraction you are given, or Name it to say which fraction is shaded. Pick Easy for halves, thirds and quarters, Medium for up to tenths, or Challenge for twelfths, equivalent fractions and simplest form. Count the equal parts before you answer.', ['Equal parts', 'Recognising fractions', 'Equivalent fractions', 'Simplest form']],
  money: ['Count UK coins and make amounts with pounds and pence.', 'Count the coins in a question or tap coins to make the requested amount. Different combinations can make the same total. Choose a level for more practice.', ['Coin values', 'Adding money', 'Making an amount']],
  measure: ['Read rulers, thermometers, measuring jugs and scales.', 'Read the marker on a scale or move it to the requested value. Use the labels and intervals to decide what each mark represents.', ['Reading scales', 'Length, temperature, capacity and mass']],
  'rule-zoo': ['Test invented creatures to discover a secret sorting rule.', 'The zookeeper sorts creatures into two pens by one hidden feature. Choose a creature to test, see which pen it goes to, and say the rule when you think you know it. Then pick a rule of your own and sort the creatures Bix asks about until he works it out.', ['Sorting and classifying', 'Spotting features', 'Testing an idea']],
  'robot-moves': ['Practise directions and turns by moving a robot.', 'Follow a route, work out a turn, or build a sequence of instructions for the robot. Check where your programme takes it and try another route.', ['Position and direction', 'Turns', 'Sequencing instructions']],
  charts: ['Read tally charts, pictograms and bar charts.', 'Look at the chart and its labels before answering the question. Count carefully, check what each symbol or interval means, and compare the results.', ['Reading data', 'Comparing quantities', 'Chart scales']],
  'place-value': ['Explore hundreds, tens and ones with place value blocks.', 'Count the blocks, build a number, or work out what a digit is worth. Try different combinations of blocks and choose a level that suits your practice.', ['Hundreds, tens and ones', 'Building numbers', 'Digit values']],
  'word-builder': ['Practise tricky words at Easier, Medium and Harder levels.', 'Choose a level, then fill in a missing letter, pick the right spelling, or choose the word that fits a sentence, such as their, there or they\'re. A wrong choice is crossed out so you can try again. Say each word aloud and look closely at the tricky letters.', ['Tricky word spelling', 'Double and silent letters', 'Homophones']],
  'word-sorter': ['Sort words into their matching groups.', 'Read the group labels, then move each word to the group where it belongs. Think about the meaning or word type before checking your choices.', ['Word categories', 'Vocabulary']],
  'sentence-builder': ['Put words in order to build a sentence.', 'Read the words, arrange them into a sentence, and check the result. Look for a sensible order and how the words fit together.', ['Sentence order', 'Reading for meaning']],
  'opposite-match': ['Match words with their opposites.', 'Read each word and find the word that means the opposite. Tap a word, then tap its opposite to make a pair.', ['Opposites', 'Vocabulary']],
  'synonym-match': ['Find pairs of words with similar meanings.', 'Read the words and look for pairs that mean something similar. Match them to practise recognising synonyms and extending your vocabulary.', ['Synonyms', 'Word meanings']],
  'sight-word-pop': ['Practise recognising common words in a word game.', 'Choose your settings, then look for the word you are asked to find. Recognise the whole word and select it to keep practising.', ['Common words', 'Word recognition']],
  'speed-reader': ['Read a story in small chunks at a speed you choose.', 'Choose a story or enter your own text, then adjust the reading speed and chunk size. Read at a comfortable pace. The built-in stories also offer questions about what you have read.', ['Reading practice', 'Story comprehension']],
  shapes: ['Explore shapes and practise recognising their properties.', 'Look at each shape and answer the question about it. Use what you can see to practise describing and recognising different shapes.', ['Shape recognition', 'Shape properties']],
  'solar-system': ['Explore the Solar System in an interactive 3D scene.', 'Drag to move around the scene and zoom to take a closer look. Select a body to explore it, or try the available tours and activities.', ['Planets', 'Exploring space']],
  'world-map': ['Find countries and continents on an interactive world map.', 'Choose Countries or Continents, read the name you are asked to find, and select the matching area on the map. Use the map to explore where places are.', ['Countries and continents', 'Locating places on a map']],
  'flag-finder': ['Match flags to their countries in a geography quiz.', 'Look at the flag and choose its country from the answers. Practise with the whole planet or select a continent. The game loads country and flag data from REST Countries.', ['Flag recognition', 'Country names', 'Continents']],
  'city-spotlight': ['Use clues to recognise cities around the world.', 'Read the clue about a city and choose the answer. Use the game to practise linking a place with facts about it.', ['City names', 'Using geographical clues']],
  'find-the-city': ['Find named cities on an interactive map.', 'Read the city name and locate it on the map. Use the question and map together to practise finding places around the world.', ['Locating cities', 'Map skills']],
};

export const SKILL_GUIDES = SKILL_GROUPS.flatMap(group => group.games.map(game => {
  const slug = game.to.replace('/skills/', '');
  if (!CONTENT[slug]) throw new Error(`Missing public guide for ${slug}`);
  const [description, instructions, skills] = CONTENT[slug];
  return { ...game, slug, path: `/learn/${slug}`, subject: group.name, group: group.id, description, instructions, skills };
}));

export function findSkillGuide(slug) {
  return SKILL_GUIDES.find(guide => guide.slug === slug);
}
