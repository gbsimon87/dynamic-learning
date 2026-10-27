// Source links for the teaching content are recorded in docs/SOLAR_SYSTEM_IDEAS.md.
// Namespaced IDs match the live scene; no changing moon-count rankings.
export const FLIGHT_CLUES = [
  { id: 'red-planet', target: 'Mars', clue: 'Fly to what people call the red planet.', hint: 'Look for Mars.', fact: 'Mars looks red because iron minerals in its dust have rusted.', question: { text: 'Why does Mars look red?', options: ['Rusty dust', 'Hot lava', 'Red water'], answer: 'Rusty dust', why: 'Iron in its dust has rusted.' }, then: { id: 'mars-phobos', target: 'Mars/Phobos', clue: 'Now find Phobos, the bigger of Mars’s two moons.', hint: 'Choose Phobos, a moon of Mars.', fact: 'Phobos is bigger than Deimos and circles very close to Mars.' } },
  { id: 'home', target: 'Earth', clue: 'Find our home planet, with oceans and living things.', hint: 'Look for Earth.', fact: 'Earth is the planet we call home.', then: { id: 'home-moon', target: 'Earth/Moon', clue: 'Now find the Moon that circles Earth.', hint: 'Choose Moon, beside Earth.', fact: 'The Moon goes round Earth about once a month.' } },
  { id: 'nearest-sun', target: 'Mercury', clue: 'Visit the planet closest to the Sun.', hint: 'Look for Mercury.', fact: 'Mercury is the closest planet to the Sun.' },
  { id: 'hottest', target: 'Venus', clue: 'Find the hottest planet, wrapped in thick clouds.', hint: 'Look for Venus, the second planet from the Sun.', fact: 'Venus traps heat in its thick atmosphere, making it hotter than Mercury.', question: { text: 'Which planet is hotter?', options: ['Venus', 'Mercury'], answer: 'Venus', why: 'Venus’s thick air traps the heat.' } },
  { id: 'giant', target: 'Jupiter', clue: 'Fly to the biggest planet in our Solar System.', hint: 'Look for Jupiter.', fact: 'Jupiter is the largest of our eight planets, much bigger than Earth.', question: { text: 'Is Jupiter bigger or smaller than Earth?', options: ['Bigger', 'Smaller'], answer: 'Bigger', why: 'Jupiter is the biggest planet of all.' } },
  { id: 'rings', target: 'Saturn', clue: 'Find the planet famous for its wide, bright rings.', hint: 'Look for Saturn.', fact: 'Saturn’s bright rings are made mostly of pieces of ice.', question: { text: 'What are Saturn’s rings mostly made of?', options: ['Ice', 'Gold', 'Fire'], answer: 'Ice', why: 'They are mostly pieces of ice.' }, then: { id: 'saturn-titan', target: 'Saturn/Titan', clue: 'Now find Saturn’s biggest moon.', hint: 'Choose Titan, a moon of Saturn.', fact: 'Titan is bigger than the planet Mercury.' } },
  { id: 'sideways', target: 'Uranus', clue: 'Find the planet that spins almost on its side.', hint: 'Look for Uranus.', fact: 'Uranus is tilted so far that it rolls around the Sun on its side.', question: { text: 'How does Uranus spin?', options: ['On its side', 'Upside down', 'It does not spin'], answer: 'On its side', why: 'It is tilted so far it rolls on its side.' } },
  { id: 'last-planet', target: 'Neptune', clue: 'Visit the eighth and farthest planet from the Sun.', hint: 'Look for Neptune. Pluto is a dwarf planet.', fact: 'Neptune is the farthest of our eight planets from the Sun.', then: { id: 'neptune-triton', target: 'Neptune/Triton', clue: 'Now find Neptune’s biggest moon.', hint: 'Choose Triton, a moon of Neptune.', fact: 'Triton is one of the coldest places we know of in our Solar System.' } },
  { id: 'dwarf', target: 'Pluto', clue: 'Find the dwarf planet once counted as the ninth planet.', hint: 'Look for Pluto.', fact: 'Pluto is a dwarf planet. Its real orbit sometimes brings it closer to the Sun than Neptune.', then: { id: 'pluto-charon', target: 'Pluto/Charon', clue: 'Now find Pluto’s biggest moon.', hint: 'Choose Charon, beside Pluto.', fact: 'Pluto and Charon are so close in size that they circle a point between them.' } },
  { id: 'our-star', target: 'Sun', clue: 'Visit the star that gives Earth its light and warmth.', hint: 'Look for the Sun. Only look at our pretend Sun, never the real one.', fact: 'The Sun is a star. Never look directly at the real Sun: it can hurt your eyes.', question: { text: 'What is the Sun?', options: ['A star', 'A planet', 'A moon'], answer: 'A star', why: 'The Sun is our star.' } },
  { id: 'earth-moon', target: 'Earth/Moon', clue: 'Find Earth’s natural satellite, where astronauts have walked.', hint: 'Choose Moon, beside Earth.', fact: 'The Moon is Earth’s natural satellite. People have walked on its surface.', question: { text: 'Who has walked on the Moon?', options: ['People', 'Nobody', 'Only robots'], answer: 'People', why: 'Astronauts have walked on the Moon.' } },
  { id: 'inner-mars-moon', target: 'Mars/Phobos', clue: 'Find the moon that circles closer to Mars: Phobos or Deimos?', hint: 'Phobos is the inner moon of Mars.', fact: 'Phobos circles closer to Mars than Deimos does.' },
  { id: 'outer-mars-moon', target: 'Mars/Deimos', clue: 'Find the smaller of Mars’s two moons, farther from Mars.', hint: 'Choose Deimos, a moon of Mars.', fact: 'Deimos is smaller than Phobos and orbits farther from Mars.' },
  { id: 'volcano-moon', target: 'Jupiter/Io', clue: 'Find Jupiter’s moon famous for its many active volcanoes.', hint: 'Choose Io, a moon of Jupiter.', fact: 'Jupiter’s gravity helps heat Io’s interior, powering its volcanoes.', question: { text: 'What does Io have lots of?', options: ['Volcanoes', 'Oceans', 'Rings'], answer: 'Volcanoes', why: 'Io is full of active volcanoes.' } },
  { id: 'ocean-moon', target: 'Jupiter/Europa', clue: 'Find Jupiter’s icy moon called Europa, with an ocean beneath its ice.', hint: 'Choose Europa, a moon of Jupiter.', fact: 'Europa has an icy shell with a salty ocean beneath it.', question: { text: 'What is under Europa’s ice?', options: ['An ocean', 'Lava', 'Nothing'], answer: 'An ocean', why: 'A salty ocean lies under the ice.' } },
  { id: 'biggest-moon', target: 'Jupiter/Ganymede', clue: 'Visit the biggest moon in our Solar System.', hint: 'Choose Ganymede, a moon of Jupiter.', fact: 'Ganymede is the largest moon in our Solar System, wider than Mercury.', question: { text: 'Ganymede is wider than which planet?', options: ['Mercury', 'Earth', 'Jupiter'], answer: 'Mercury', why: 'Ganymede is wider than Mercury.' } },
  { id: 'crater-moon', target: 'Jupiter/Callisto', clue: 'Find Callisto, Jupiter’s moon covered with many old craters.', hint: 'Choose Callisto, a moon of Jupiter.', fact: 'Callisto’s ancient surface is covered with impact craters.' },
  { id: 'cloudy-moon', target: 'Saturn/Titan', clue: 'Find Saturn’s biggest moon, wrapped in thick, hazy air.', hint: 'Choose Titan, a moon of Saturn.', fact: 'Titan has a thick atmosphere and lakes of liquid methane and ethane.', question: { text: 'What fills Titan’s lakes?', options: ['Methane', 'Water', 'Lava'], answer: 'Methane', why: 'Titan’s lakes are liquid methane and ethane.' } },
  { id: 'icy-jets', target: 'Saturn/Enceladus', clue: 'Find Saturn’s icy moon that sprays water and ice into space.', hint: 'Choose Enceladus, a moon of Saturn.', fact: 'Enceladus sprays water vapour and icy particles from near its south pole.' },
  { id: 'backwards-moon', target: 'Neptune/Triton', clue: 'Find Neptune’s biggest moon, which orbits opposite to Neptune’s spin.', hint: 'Choose Triton, a moon of Neptune.', fact: 'Triton travels around Neptune in the opposite direction to the planet’s spin.', question: { text: 'Which way does Triton travel round Neptune?', options: ['The opposite way to Neptune’s spin', 'The same way as Neptune’s spin'], answer: 'The opposite way to Neptune’s spin', why: 'Triton goes round backwards.' } },
  { id: 'pluto-friend', target: 'Pluto/Charon', clue: 'Find Pluto’s largest moon and close companion.', hint: 'Choose Charon, beside Pluto.', fact: 'Charon is Pluto’s largest moon, about half as wide as Pluto.', question: { text: 'How wide is Charon compared with Pluto?', options: ['About half as wide', 'Twice as wide', 'Exactly the same'], answer: 'About half as wide', why: 'Charon is about half as wide as Pluto.' } },
  { id: 'space-station', target: 'ISS', clue: 'Find the human-made satellite where astronauts live and work above Earth.', hint: 'Choose the International Space Station, also called the ISS.', fact: 'The ISS is a human-made satellite: a laboratory orbiting Earth.', question: { text: 'What is the ISS?', options: ['A laboratory in space', 'A moon', 'A star'], answer: 'A laboratory in space', why: 'Astronauts do experiments on board.' } },
  { id: 'rocky-belt', target: 'asteroid-belt', clue: 'Fly into the wide band of rocky objects between Mars and Jupiter.', hint: 'Choose Asteroid belt. Fly into the band rather than to its centre.', fact: 'The main asteroid belt lies between Mars and Jupiter. Its rocks are usually far apart.', question: { text: 'Are the belt’s rocks usually close together or far apart?', options: ['Far apart', 'Close together'], answer: 'Far apart', why: 'Real belt rocks are usually far apart.' } },
  { id: 'icy-visitor', target: 'halleys-comet', clue: 'Find the icy visitor named after Halley, which can grow tails near the Sun.', hint: 'Choose Halley’s Comet. Its path and speed here are pretend scales.', fact: 'Halley’s Comet is made of ice, rock and dust, and takes about 76 years to orbit the Sun.', question: { text: 'How long does Halley’s Comet take to go round the Sun?', options: ['About 76 years', 'One year', 'One week'], answer: 'About 76 years', why: 'About 76 years, so it comes back about once in a lifetime.' } },
  { id: 'giant-storm', target: 'Jupiter', clue: 'Find the planet with a giant storm called the Great Red Spot.', hint: 'Look for Jupiter.', fact: 'Jupiter’s Great Red Spot is a huge, long-lasting storm.', question: { text: 'What is the Great Red Spot?', options: ['A storm', 'A volcano', 'A sea'], answer: 'A storm', why: 'It is a giant storm.' }, then: { id: 'jupiter-io', target: 'Jupiter/Io', clue: 'Now find Jupiter’s moon with lots of volcanoes.', hint: 'Choose Io, a moon of Jupiter.', fact: 'Io is the most volcanic place in our Solar System.' } },
  // The asteroid-belt run (#84). Facts checked against NASA pages listed in SOLAR_SYSTEM_IDEAS.md.
  { id: 'ceres', target: 'Ceres', clue: 'Find the biggest thing in the asteroid belt. It is so big it is called a dwarf planet.', hint: 'Look for Ceres, in the asteroid belt.', fact: 'Ceres is the largest object in the asteroid belt. It is called a dwarf planet.', question: { text: 'What is Ceres called?', options: ['A dwarf planet', 'A moon', 'A comet'], answer: 'A dwarf planet', why: 'Ceres is big and round enough to be a dwarf planet.' } },
  { id: 'vesta', target: 'Vesta', clue: 'Find Vesta, the second heaviest rock in the asteroid belt.', hint: 'Look for Vesta, in the asteroid belt.', fact: 'Vesta has a giant crater almost as wide as Vesta itself. The Dawn spacecraft visited it.', question: { text: 'What does Vesta have?', options: ['A giant crater', 'Rings', 'An ocean'], answer: 'A giant crater', why: 'A huge crash left a crater almost as wide as Vesta.' } },
  { id: 'psyche', target: 'Psyche', clue: 'Find the asteroid that may be partly made of metal.', hint: 'Look for Psyche, in the asteroid belt.', fact: 'Psyche may be partly made of metal. A NASA spacecraft named Psyche should reach it in 2029.', question: { text: 'What might Psyche be partly made of?', options: ['Metal', 'Ice cream', 'Gas'], answer: 'Metal', why: 'Scientists think Psyche is a mix of rock and metal.' } },
  { id: 'bennu', target: 'Bennu', clue: 'Find the small asteroid near Earth where a spacecraft collected rocks and dust.', hint: 'Look for Bennu. It travels near Earth, not in the main belt.', fact: 'A spacecraft called OSIRIS-REx collected rocks and dust from Bennu and brought them to Earth in 2023.' },
];

// Home chapters: short themed adventures; together they use every clue.
export const FLIGHT_CHAPTERS = [
  { id: 'rocky', name: 'Rocky planets', icon: '🪨', promise: 'Visit the small rocky worlds near the Sun.', clueIds: ['nearest-sun', 'hottest', 'home', 'red-planet', 'space-station', 'our-star'] },
  { id: 'giants', name: 'Giant planets', icon: '🪐', promise: 'Fly out to the biggest planets and their moons.', clueIds: ['giant', 'giant-storm', 'rings'] },
  { id: 'moons', name: 'Moon hunters', icon: '🌙', promise: 'Track down famous moons.', clueIds: ['earth-moon', 'inner-mars-moon', 'outer-mars-moon', 'volcano-moon', 'ocean-moon', 'biggest-moon', 'crater-moon', 'cloudy-moon', 'backwards-moon', 'pluto-friend'] },
  { id: 'belt', name: 'Asteroid-belt run', icon: '☄️', promise: 'Weave through the belt to real asteroids.', honesty: 'Rocks squished together so you can play — the real belt is mostly empty space, with rocks usually far apart.', clueIds: ['rocky-belt', 'ceres', 'vesta', 'psyche', 'bennu'] },
  { id: 'icy', name: 'Icy edge', icon: '❄️', promise: 'Explore the cold, faraway edge.', clueIds: ['sideways', 'last-planet', 'dwarf', 'icy-jets', 'icy-visitor'] },
];

export const FLIGHT_BADGES = [
  { stars: 1, name: 'First discovery', icon: '🌟' },
  { stars: 5, name: 'Space Scout', icon: '🚀' },
  { stars: 10, name: 'Moon Ranger', icon: '🌙' },
  { stars: 20, name: 'Solar Explorer', icon: '☀️' },
  { stars: 25, name: 'Star Pilot', icon: '🏅' },
];

// A chapter is about this many finds (a two-step clue counts as two).
export const CHAPTER_SIZE = 5;
// Aiming help unlocks after this much flying on a clue, or this long after opening its hint.
export const HELP_ENGINE_SECONDS = 20;
export const HELP_HINT_SECONDS = 10;

function shuffle(list, random) {
  const deck = [...list];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // Avoid asking for the same destination twice in succession (a two-step clue ends at its second step).
  const end = c => (c?.then ?? c)?.target;
  const clash = (a, b) => Boolean(a && b) && end(a) === b.target;
  for (let i = 1; i < deck.length; i++) {
    if (!clash(deck[i - 1], deck[i])) continue;
    const next = deck.findIndex((c, j) => j !== i && !clash(deck[i - 1], c) && !clash(c, deck[i + 1])
      && !clash(deck[j - 1], deck[i]) && !clash(deck[i], deck[j + 1]));
    if (next >= 0) [deck[i], deck[next]] = [deck[next], deck[i]];
  }
  return deck;
}

const newRound = (deck, chapterId = null) => ({ chapterId, deck, index: 0, earned: [], solved: false, answers: {} });

/** A two-step clue becomes two steps; the first says the adventure continues. */
function steps(clue) {
  if (!clue.then) return [clue];
  return [{ ...clue, continues: true }, { ...clue.then, id: clue.then.id ?? `${clue.id}-then`, stepOf: clue.id }];
}

export function createFlightRound(random = Math.random, clues = FLIGHT_CLUES) {
  return newRound(shuffle(clues, random).flatMap(steps));
}

/** The system's chapters, or its clues split in order into parts of about CHAPTER_SIZE. */
export function flightChapters(flight) {
  if (flight.chapters) return flight.chapters;
  const parts = [];
  for (let i = 0; i < flight.clues.length; i += CHAPTER_SIZE) {
    parts.push({ id: `part-${parts.length + 1}`, name: `Part ${parts.length + 1}`, icon: '🚀', promise: 'A short space adventure', clueIds: flight.clues.slice(i, i + CHAPTER_SIZE).map(c => c.id) });
  }
  return parts;
}

/**
 * A chapter's adventure: shuffled from its pool until about CHAPTER_SIZE finds.
 * When any chosen clue has a question, one of them goes last, so every
 * chapter ends by checking what the child learned.
 */
export function createChapterRound(chapter, clues, random = Math.random, size = CHAPTER_SIZE) {
  const pool = shuffle(chapter.clueIds.map(id => clues.find(c => c.id === id)).filter(Boolean), random);
  const chosen = [];
  let finds = 0;
  for (const clue of pool) {
    if (finds >= size) break;
    chosen.push(clue); finds += clue.then ? 2 : 1;
  }
  const lastAsks = clue => Boolean((clue.then ?? clue).question);
  if (!lastAsks(chosen.at(-1) ?? {})) {
    const asking = chosen.findIndex(lastAsks);
    if (asking >= 0) chosen.push(...chosen.splice(asking, 1));
  }
  return newRound(chosen.flatMap(steps), chapter.id);
}

export function helpProgress({ engineSeconds, hintSeconds }) {
  const share = Math.min(1, Math.max(engineSeconds / HELP_ENGINE_SECONDS, hintSeconds == null ? 0 : hintSeconds / HELP_HINT_SECONDS));
  return { unlocked: share >= 1, share };
}

export function shuffledOptions(question, random = Math.random) {
  return shuffle(question.options.map(target => ({ target })), random).map(o => o.target);
}

export function flightRoundReducer(state, action) {
  if (action.type === 'restart') return action.round;
  if (!state) return state;
  const clue = state.deck[state.index];
  if (action.type === 'arrive') {
    if (state.solved || action.token !== clue.id || action.target !== clue.target) return state;
    return { ...state, solved: true, earned: [...state.earned, clue] };
  }
  if (action.type === 'answer') {
    if (!state.deck.some(step => step.id === action.stepId && step.question) || state.answers?.[action.stepId]) return state;
    return { ...state, answers: { ...state.answers, [action.stepId]: action.choice } };
  }
  if (action.type === 'next' && state.index < state.deck.length - 1) return { ...state, index: state.index + 1, solved: false };
  if (action.type === 'restart') return action.round;
  return state;
}

/** Distance to a world’s surface, or to the nearest edge of a belt region. */
export function flightTargetGap(target, position, center = target) {
  if (target.kind === 'belt') {
    const region = target.getRegion();
    const radius = Math.hypot(position.x, position.z);
    return Math.hypot(Math.max(region.innerRadius - radius, 0, radius - region.outerRadius), Math.max(0, Math.abs(position.y) - region.halfHeight));
  }
  return Math.max(0, Math.hypot(position.x - center.x, position.y - center.y, position.z - center.z) - target.radius);
}

export function flightArrivalMargin(target) {
  return target.kind === 'belt' ? .15 : target.kind === 'satellite' ? .5 : Math.max(.65, Math.min(1.5, target.radius * .3));
}
