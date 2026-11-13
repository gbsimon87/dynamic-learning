import { editionIndex } from '../../../shared/familyFridaySchedule.js';
import { randInt, seeded, shuffle } from '../freePlay/random.js';

// Version 1 is an immutable publication bank: keep order/content stable so a
// shared edition always replays the same questions. A future bank gets its own
// effective Friday rather than rewriting the archive. Facts use primary sources.
const OCTOPUS = 'https://www.nhm.ac.uk/discover/octopuses-keep-surprising-us-here-are-eight-examples-how.html';
const CLASSIFICATION = 'https://www.nhm.ac.uk/schools/teaching-resources/key-stage-2/life-cycles-habitats-and-classification/practical-activity-classification-exploration.html';
const PLANETS = 'https://science.nasa.gov/solar-system/planets/';
const MOON = 'https://science.nasa.gov/moon/facts/';

function fact(id, prompt, answer, wrong, explanation, source) {
  return { id, prompt, answer, options: [answer, ...wrong], explanation, source };
}

export const ANIMAL_QUESTIONS = [
  fact('octopus-hearts', 'How many hearts does an octopus have?', 'Three', ['One', 'Two'], 'An octopus has three hearts: two help send blood through its gills.', OCTOPUS),
  fact('butterfly-feet', 'A butterfly has taste sensors on which body part?', 'Its feet', ['Its wings', 'Its eyes'], 'Taste sensors on its feet help a butterfly check plants.', 'https://www.londonzoo.org/whats-here/habitats/butterfly-paradise/butterfly-facts'),
  fact('octopus-blood', 'What colour is an octopus’s blood?', 'Blue', ['Red', 'Yellow'], 'An octopus has blue blood, which carries oxygen around its body.', OCTOPUS),
  fact('insect-legs', 'How many legs does an adult insect usually have?', 'Six', ['Four', 'Eight'], 'Insects have six legs, arranged in three pairs.', CLASSIFICATION),
  fact('dolphin-family', 'A dolphin is which kind of animal?', 'A mammal', ['A fish', 'An insect'], 'Dolphins are mammals: they breathe air and feed their young milk.', CLASSIFICATION),
  fact('spider-legs', 'How many legs does a spider usually have?', 'Eight', ['Six', 'Ten'], 'Spiders have eight legs; they belong to a different group from insects.', 'https://australian.museum/learn/species-identification/ask-an-expert/what-is-a-spiders/'),
  fact('octopus-hide', 'How can an octopus hide in its surroundings?', 'Change its colour', ['Grow feathers', 'Turn into a rock'], 'An octopus can change its skin colour to blend into its surroundings.', OCTOPUS),
  fact('dolphin-breathe', 'What does a dolphin need to breathe?', 'Air', ['Sand', 'Only water'], 'Dolphins breathe air, so they come to the surface of the water.', CLASSIFICATION),
];

export const WORLD_QUESTIONS = [
  fact('venus-hot', 'Which is the hottest planet in our Solar System?', 'Venus', ['Mercury', 'Mars'], 'Venus is hottest because its thick atmosphere traps so much heat.', 'https://science.nasa.gov/venus/'),
  fact('jupiter-big', 'Which is the largest planet in our Solar System?', 'Jupiter', ['Earth', 'Mars'], 'Jupiter is the largest of the eight planets in our Solar System.', PLANETS),
  fact('moon-light', 'Where does the Moon’s bright light come from?', 'Light from the Sun', ['A giant lamp inside', 'Lights from houses'], 'The Moon reflects sunlight; it does not make its own light.', MOON),
  fact('mars-red', 'Which planet is often called the Red Planet?', 'Mars', ['Venus', 'Neptune'], 'Mars is called the Red Planet because its dusty surface looks reddish.', PLANETS),
  fact('pacific-big', 'Which is the largest ocean on Earth?', 'The Pacific Ocean', ['The Arctic Ocean', 'The Indian Ocean'], 'The Pacific is the largest of Earth’s ocean basins.', 'https://oceanservice.noaa.gov/facts/pacific.html'),
  fact('mercury-near', 'Which planet is nearest to the Sun?', 'Mercury', ['Earth', 'Jupiter'], 'Mercury is the first planet out from the Sun.', PLANETS),
  fact('earth-third', 'Counting outwards from the Sun, Earth is which planet?', 'Third', ['First', 'Fifth'], 'Mercury comes first, Venus second and Earth third.', PLANETS),
  fact('neptune-far', 'Which of the eight planets is furthest from the Sun?', 'Neptune', ['Saturn', 'Earth'], 'Neptune is the outermost of the eight planets in our Solar System.', PLANETS),
];

const WORD_QUESTIONS = [
  fact('palindrome', 'Which word reads the same forwards and backwards?', 'level', ['mouse', 'garden'], 'L-e-v-e-l reads the same in both directions; this is called a palindrome.'),
  fact('rhyme', 'Which word rhymes with “light”?', 'night', ['little', 'leaf'], 'Light and night have the same ending sound.'),
  fact('enormous', 'Which word means almost the same as “enormous”?', 'huge', ['tiny', 'quiet'], 'Enormous and huge both describe something very big.'),
  fact('compound', 'Join “rain” and “bow”. What word do you make?', 'rainbow', ['raincoat', 'snowball'], 'Rainbow is a compound word made from rain and bow.'),
  fact('action', 'Which word names an action?', 'jump', ['table', 'purple'], 'Jump is a verb: it names something you can do.'),
  fact('opposite', 'What is the opposite of “empty”?', 'full', ['small', 'round'], 'An empty cup holds nothing; a full cup has been filled.'),
  fact('question', 'Which mark finishes “Where is Bix”?', '?', ['!', '.'], 'A question mark tells us that a sentence is asking a question.'),
  fact('alphabet', 'Which word comes first in alphabetical order?', 'apple', ['pear', 'banana'], 'Apple starts with a, which comes before b and p in the alphabet.'),
];

function numberQuestion(index, rng) {
  const a = randInt(rng, 3, 9);
  const b = randInt(rng, 2, 7);
  if (index % 3 === 0) {
    const total = a * 2;
    return fact('sharing', `Share ${total} strawberries equally between two bowls. How many go in each?`, String(a), [String(a - 1), String(a + 1)], `${a} in each bowl makes ${a} + ${a} = ${total} altogether.`);
  }
  if (index % 3 === 1) {
    const total = a + b;
    return fact('picnic', `Bix packs ${a} apples and ${b} pears. How many pieces of fruit is that?`, String(total), [String(total - 1), String(total + 2)], `${a} + ${b} = ${total}, so there are ${total} pieces of fruit.`);
  }
  const total = a + b;
  return fact('missing', `Bix needs ${total} tickets and has ${a}. How many more tickets are needed?`, String(b), [String(b + 1), String(total)], `${a} + ${b} = ${total}, so Bix needs ${b} more tickets.`);
}

function pictureQuestion(index, rng) {
  const count = randInt(rng, 3, 7);
  const types = ['star', 'circle', 'triangle'];
  const target = types[index % types.length];
  const other = types[(index + 1) % types.length];
  const items = shuffle([...Array(count).fill(target), ...Array(2).fill(other)], rng);
  const question = fact('picture-count', `Look closely! How many ${target}s can you find?`, String(count), [String(count - 1), String(count + 2)], `There are ${count} ${target}s; the other two shapes are ${other}s.`);
  return { ...question, picture: { items, description: `Shapes, left to right, top row then bottom row: ${items.join(', ')}.` } };
}

const TITLES = ['Big little discoveries', 'A pinch of wonder', 'Five curious questions', 'Think, chat, discover', 'Wonder together', 'A little Friday fun', 'Your curious crew', 'Small quiz, big smiles'];

/** Fixed finite quiz. All families get the same edition; generated choices are
 * deterministic and facts rotate without repeating in consecutive weeks. */
export function familyFridayEdition(week) {
  const index = editionIndex(week);
  if (index === null) return null;
  const rng = seeded((index + 1) * 2654435761);
  const questions = [
    { ...ANIMAL_QUESTIONS[index % ANIMAL_QUESTIONS.length], category: 'Animal surprise' },
    { ...WORLD_QUESTIONS[index % WORLD_QUESTIONS.length], category: 'Our amazing world' },
    { ...WORD_QUESTIONS[index % WORD_QUESTIONS.length], category: 'Word wonder' },
    { ...numberQuestion(index, rng), category: 'Number nudge' },
    { ...pictureQuestion(index, rng), category: 'Picture puzzle' },
  ].map(question => ({ ...question, options: shuffle([...question.options], rng) }));
  return { week, number: index + 1, title: TITLES[index % TITLES.length], questions };
}
