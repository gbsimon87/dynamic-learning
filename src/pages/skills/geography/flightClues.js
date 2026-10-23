// Source links for the teaching content are recorded in docs/SOLAR_SYSTEM_IDEAS.md.
// Namespaced IDs match the live scene; no changing moon-count rankings.
export const FLIGHT_CLUES = [
  { id: 'red-planet', target: 'Mars', clue: 'Fly to what people call the red planet.', hint: 'Look for Mars.', fact: 'Mars looks red because iron minerals in its dust have rusted.' },
  { id: 'home', target: 'Earth', clue: 'Find our home planet, with oceans and living things.', hint: 'Look for Earth.', fact: 'Earth is the planet we call home.' },
  { id: 'nearest-sun', target: 'Mercury', clue: 'Visit the planet closest to the Sun.', hint: 'Look for Mercury.', fact: 'Mercury is the closest planet to the Sun.' },
  { id: 'hottest', target: 'Venus', clue: 'Find the hottest planet, wrapped in thick clouds.', hint: 'Look for Venus, the second planet from the Sun.', fact: 'Venus traps heat in its thick atmosphere, making it hotter than Mercury.' },
  { id: 'giant', target: 'Jupiter', clue: 'Fly to the biggest planet in our Solar System.', hint: 'Look for Jupiter.', fact: 'Jupiter is the largest of our eight planets.' },
  { id: 'rings', target: 'Saturn', clue: 'Find the planet famous for its wide, bright rings.', hint: 'Look for Saturn.', fact: 'Saturn’s bright rings are made mostly of pieces of ice.' },
  { id: 'sideways', target: 'Uranus', clue: 'Find the planet that spins almost on its side.', hint: 'Look for Uranus.', fact: 'Uranus is tilted so far that it rolls around the Sun on its side.' },
  { id: 'last-planet', target: 'Neptune', clue: 'Visit the eighth and farthest planet from the Sun.', hint: 'Look for Neptune. Pluto is a dwarf planet.', fact: 'Neptune is the farthest of our eight planets from the Sun.' },
  { id: 'dwarf', target: 'Pluto', clue: 'Find the dwarf planet once counted as the ninth planet.', hint: 'Look for Pluto.', fact: 'Pluto is a dwarf planet. Its real orbit sometimes brings it closer to the Sun than Neptune.' },
  { id: 'our-star', target: 'Sun', clue: 'Visit the star that gives Earth its light and warmth.', hint: 'Look for the Sun. Only look at our pretend Sun, never the real one.', fact: 'The Sun is a star. Never look directly at the real Sun: it can hurt your eyes.' },
  { id: 'earth-moon', target: 'Earth/Moon', clue: 'Find Earth’s natural satellite, where astronauts have walked.', hint: 'Choose Moon, beside Earth.', fact: 'The Moon is Earth’s natural satellite. People have walked on its surface.' },
  { id: 'inner-mars-moon', target: 'Mars/Phobos', clue: 'Find the moon that circles closer to Mars: Phobos or Deimos?', hint: 'Phobos is the inner moon of Mars.', fact: 'Phobos circles closer to Mars than Deimos does.' },
  { id: 'outer-mars-moon', target: 'Mars/Deimos', clue: 'Find the smaller of Mars’s two moons, farther from Mars.', hint: 'Choose Deimos, a moon of Mars.', fact: 'Deimos is smaller than Phobos and orbits farther from Mars.' },
  { id: 'volcano-moon', target: 'Jupiter/Io', clue: 'Find Jupiter’s moon famous for its many active volcanoes.', hint: 'Choose Io, a moon of Jupiter.', fact: 'Jupiter’s gravity helps heat Io’s interior, powering its volcanoes.' },
  { id: 'ocean-moon', target: 'Jupiter/Europa', clue: 'Find Jupiter’s icy moon called Europa, with an ocean beneath its ice.', hint: 'Choose Europa, a moon of Jupiter.', fact: 'Europa has an icy shell with a salty ocean beneath it.' },
  { id: 'biggest-moon', target: 'Jupiter/Ganymede', clue: 'Visit the biggest moon in our Solar System.', hint: 'Choose Ganymede, a moon of Jupiter.', fact: 'Ganymede is the largest moon in our Solar System, wider than Mercury.' },
  { id: 'crater-moon', target: 'Jupiter/Callisto', clue: 'Find Callisto, Jupiter’s moon covered with many old craters.', hint: 'Choose Callisto, a moon of Jupiter.', fact: 'Callisto’s ancient surface is covered with impact craters.' },
  { id: 'cloudy-moon', target: 'Saturn/Titan', clue: 'Find Saturn’s biggest moon, wrapped in thick, hazy air.', hint: 'Choose Titan, a moon of Saturn.', fact: 'Titan has a thick atmosphere and lakes of liquid methane and ethane.' },
  { id: 'icy-jets', target: 'Saturn/Enceladus', clue: 'Find Saturn’s icy moon that sprays water and ice into space.', hint: 'Choose Enceladus, a moon of Saturn.', fact: 'Enceladus sprays water vapour and icy particles from near its south pole.' },
  { id: 'backwards-moon', target: 'Neptune/Triton', clue: 'Find Neptune’s biggest moon, which orbits opposite to Neptune’s spin.', hint: 'Choose Triton, a moon of Neptune.', fact: 'Triton travels around Neptune in the opposite direction to the planet’s spin.' },
  { id: 'pluto-friend', target: 'Pluto/Charon', clue: 'Find Pluto’s largest moon and close companion.', hint: 'Choose Charon, beside Pluto.', fact: 'Charon is Pluto’s largest moon, about half as wide as Pluto.' },
  { id: 'space-station', target: 'ISS', clue: 'Find the human-made satellite where astronauts live and work above Earth.', hint: 'Choose the International Space Station, also called the ISS.', fact: 'The ISS is a human-made satellite: a laboratory orbiting Earth.' },
  { id: 'rocky-belt', target: 'asteroid-belt', clue: 'Fly into the wide band of rocky objects between Mars and Jupiter.', hint: 'Choose Asteroid belt. Fly into the band rather than to its centre.', fact: 'The main asteroid belt lies between Mars and Jupiter. Its rocks are usually far apart.' },
  { id: 'icy-visitor', target: 'halleys-comet', clue: 'Find the icy visitor named after Halley, which can grow tails near the Sun.', hint: 'Choose Halley’s Comet. Its path and speed here are pretend scales.', fact: 'Halley’s Comet is made of ice, rock and dust, and takes about 76 years to orbit the Sun.' },
  { id: 'giant-storm', target: 'Jupiter', clue: 'Find the planet with a giant storm called the Great Red Spot.', hint: 'Look for Jupiter.', fact: 'Jupiter’s Great Red Spot is a huge, long-lasting storm.' },
];

export const FLIGHT_BADGES = [
  { stars: 1, name: 'First discovery', icon: '🌟' },
  { stars: 5, name: 'Space Scout', icon: '🚀' },
  { stars: 10, name: 'Moon Ranger', icon: '🌙' },
  { stars: 20, name: 'Solar Explorer', icon: '☀️' },
  { stars: 25, name: 'Star Pilot', icon: '🏅' },
];

export function createFlightRound(random = Math.random, clues = FLIGHT_CLUES) {
  const deck = [...clues];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // Avoid asking for the same destination twice in succession.
  for (let i = 1; i < deck.length; i++) {
    if (deck[i].target !== deck[i - 1].target) continue;
    const next = deck.findIndex((c, j) => j !== i && c.target !== deck[i - 1].target && c.target !== deck[i + 1]?.target
      && deck[j - 1]?.target !== deck[i].target && deck[j + 1]?.target !== deck[i].target);
    if (next >= 0) [deck[i], deck[next]] = [deck[next], deck[i]];
  }
  return { deck, index: 0, earned: [], solved: false };
}

export function flightRoundReducer(state, action) {
  const clue = state.deck[state.index];
  if (action.type === 'arrive') {
    if (state.solved || action.token !== clue.id || action.target !== clue.target) return state;
    return { ...state, solved: true, earned: [...state.earned, clue] };
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
