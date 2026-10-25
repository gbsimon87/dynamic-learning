/** Child-friendly card copy, separate from scene materials and tour narration.
 * Sources: NASA Science planet facts pages (checked 25 October 2026).
 * Avoid changing moon totals, and distinguish real features from model detail.
 */
export const PLANET_DETAILS = {
  Mercury: {
    facts: [
      'Mercury is the smallest planet and the closest planet to the Sun.',
      'Its rocky ground is covered in craters made by space rocks crashing into it.',
      'Mercury takes just 88 Earth days to travel around the Sun.',
      'It has almost no air to hold warmth, so its nights are freezing cold.',
    ],
    closer: [
      'Look for round dents and bright streaks on the grey, rocky ground. These craters and streaks are marks left by impacts.',
      'Mercury may look like our Moon, but it travels around the Sun. It has no moons of its own.',
    ],
    source: 'https://science.nasa.gov/mercury/facts/',
  },
  Venus: {
    facts: [
      'Venus is the second planet from the Sun and is almost as wide as Earth.',
      'Its thick blanket of air traps heat, making it the hottest planet.',
      'Venus spins in the opposite direction to most planets.',
      'One whole spin takes about 243 Earth days, longer than its 225-day year!',
    ],
    closer: [
      'The pale swirls are thick clouds hiding the rocky ground. They are not oceans or continents.',
      'Below the clouds are mountains and volcanoes. Scientists use radar, which can pass through the clouds, to map the ground.',
    ],
    source: 'https://science.nasa.gov/venus/venus-facts/',
  },
  Earth: {
    facts: [
      'Earth is our home and the third planet from the Sun.',
      'It is the only planet where we know living things exist.',
      'Water covers about seven tenths of Earth’s surface.',
      'Earth has one Moon and takes about 365 days to go around the Sun.',
    ],
    closer: [
      'Find the blue oceans, patches of land and white clouds. The clouds float in the air above the land and sea.',
      'The side facing the Sun has daytime. The side facing away has night. Earth’s spin brings each place into sunlight again.',
    ],
    source: 'https://science.nasa.gov/earth/facts/',
  },
  Mars: {
    facts: [
      'Mars is a cold, rocky desert and the fourth planet from the Sun.',
      'Rust in its rocks and dust gives Mars its reddish colour.',
      'Mars has two small moons, Phobos and Deimos.',
      'Its huge volcano Olympus Mons is the tallest volcano in our solar system.',
    ],
    closer: [
      'Look for rusty red ground and darker patches. Mars also has craters, deep valleys and icy caps at its poles.',
      'Old river channels tell scientists that water once flowed here. Today, robot rovers explore the ground and send pictures back to Earth.',
    ],
    source: 'https://science.nasa.gov/mars/facts/',
  },
  Jupiter: {
    facts: [
      'Jupiter is the largest planet in our solar system.',
      'It is a gas giant, with no solid ground for a rocket to land on.',
      'The Great Red Spot is an enormous storm that has lasted for centuries.',
      'Jupiter spins once in about ten hours, much faster than Earth.',
    ],
    closer: [
      'Look for light and dark stripes. These are bands of clouds pushed around by strong winds.',
      'The oval Great Red Spot is a swirling storm, not a mark on solid ground. It turns out of sight as Jupiter spins, so you may need to wait to see it.',
    ],
    source: 'https://science.nasa.gov/jupiter/jupiter-facts/',
  },
  Saturn: {
    facts: [
      'Saturn is a gas giant and the second-largest planet.',
      'Its rings contain countless pieces of ice and rock.',
      'Saturn has no solid ground to stand on beneath its clouds.',
      'One trip around the Sun takes Saturn about 29 Earth years.',
    ],
    closer: [
      'Look at the wide, flat rings and the darker gaps between them. The rings are many separate pieces travelling around Saturn, not one solid disc.',
      'The pale stripes on the planet are clouds. The rings are very thin compared with how far they spread out.',
    ],
    source: 'https://science.nasa.gov/saturn/facts/',
  },
  Uranus: {
    facts: [
      'Uranus is an ice giant and the seventh planet from the Sun.',
      'It spins almost on its side, unlike most planets.',
      'Methane gas in its air helps give it a blue-green colour.',
      'A year on Uranus lasts about 84 Earth years.',
    ],
    closer: [
      'The pale blue-green ball is the top of a deep atmosphere. There is no solid surface where a rocket could land.',
      'Uranus has faint rings and clouds, even when pictures look smooth. Its sideways tilt makes its seasons very different from Earth’s.',
    ],
    source: 'https://science.nasa.gov/uranus/facts/',
  },
  Neptune: {
    facts: [
      'Neptune is the eighth and most distant planet from the Sun.',
      'It is an ice giant with no solid surface to land on.',
      'Neptune has the fastest winds measured on any planet in our solar system.',
      'One year there lasts about 165 Earth years.',
    ],
    closer: [
      'Neptune’s blue colour comes from its atmosphere. White clouds and dark storms can appear, but these features change over time.',
      'Some spacecraft pictures make Neptune look extra blue to show its clouds. In natural colour it looks more like pale blue-green Uranus.',
    ],
    source: 'https://science.nasa.gov/neptune/neptune-facts/',
  },
  Pluto: {
    facts: [
      'Pluto is a dwarf planet, smaller than Earth’s Moon.',
      'It travels around the Sun beyond Neptune for most of its long orbit.',
      'One year on Pluto lasts about 248 Earth years.',
      'NASA’s New Horizons spacecraft flew past Pluto in 2015.',
    ],
    closer: [
      'Pluto has bright and dark patches of frozen ground. Its famous heart-shaped region includes a broad plain of nitrogen ice.',
      'Some mountains are made of water ice, which is hard as rock in Pluto’s cold. Its large moon Charon travels beside it.',
    ],
    source: 'https://science.nasa.gov/dwarf-planets/pluto/facts/',
  },
};
