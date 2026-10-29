// Things to discover in the ocean. Every fact was checked against the listed sources.

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const REEF_DISCOVERY = {
  id: 'coral-reef',
  name: 'Coral reef',
  eyebrow: 'Habitat',
  factsNoun: 'reef',
  summary: 'Coral looks like rock, but it is made of tiny animals called polyps.',
  honesty: 'This ocean is a made-up mix of places. Real coral reefs grow in warm, shallow, sunny seas.',
  meta: ['Habitat', 'Warm, sunny seas'],
  stats: [
    { label: 'Found in', value: 'Warm seas near the equator' },
    { label: 'Water', value: 'About 23 to 29 °C', compare: 'as warm as a bath that has cooled down' },
    { label: 'Depth', value: 'Down to about 30 metres', compare: 'where sunlight still reaches' },
  ],
  facts: [
    'A coral is made of hundreds or thousands of tiny animals called polyps.',
    'Each polyp builds a hard skeleton of limestone around itself. Together they build the reef.',
    'Tiny algae live inside coral. They use sunlight to make food and share it with the coral.',
    'The algae give many corals their bright colours.',
    'About a quarter of the fish in the ocean depend on healthy coral reefs.',
  ],
  closer: [
    'A coral is a crowd of tiny animals called polyps, all joined together. Each one builds a little cup of limestone to live in.',
    'Tiny algae live inside the polyps. They use sunlight to make food and share it with the coral. That is why reefs grow where the water is shallow and sunny.',
    'If the water gets too warm, the coral pushes its algae out and turns white. This is called bleaching. The coral is not dead, but it is in trouble.',
  ],
  sources: [
    'https://oceanservice.noaa.gov/facts/coral.html',
    'https://oceanservice.noaa.gov/education/tutorial_corals/coral02_zooxanthellae.html',
    'https://oceanservice.noaa.gov/education/tutorial_corals/coral05_distribution.html',
    'https://www.noaa.gov/education/resource-collections/marine-life/coral-reef-ecosystems',
  ],
};

/** The submarine circles level, clear of the coral; the camera rides high so the reef stays in view. */
export const REEF_ORBIT = { entryDistance: 11, radius: 7.5, rig: { back: 3, lift: 4.5, trail: 3 }, level: true };

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const FISH_DISCOVERY = {
  id: 'parrotfish',
  name: 'Parrotfish',
  eyebrow: 'Sea life',
  factsNoun: 'parrotfish',
  summary: 'A parrotfish has a beak like a parrot, made of teeth joined together.',
  honesty: 'This ocean is a made-up mix of places, and this parrotfish is drawn bigger so it is easy to spot. Real parrotfish live on warm coral reefs.',
  meta: ['Fish', 'Coral reefs'],
  stats: [
    { label: 'Lives', value: 'On warm coral reefs' },
    { label: 'Size', value: 'A stoplight parrotfish grows up to about 55 cm', compare: 'about as long as your arm' },
    { label: 'Food', value: 'Algae and bits of coral' },
  ],
  facts: [
    'A parrotfish scrapes tiny plants called algae off rocks and dead coral with its beak.',
    'It swallows bits of coral too. They come out as fine white sand!',
    'The biggest kind, the bumphead parrotfish, can make a pile of sand heavier than a grown-up in one year.',
    'Some white sand beaches are made from parrotfish poo.',
    'Stoplight parrotfish change colour as they grow up.',
  ],
  closer: [
    'A parrotfish has its teeth joined together into a hard beak. It uses the beak to scrape algae off rocks and old coral.',
    'Bits of coral get swallowed too. Teeth in its throat grind them up, and they come out as white sand. Some of the sand on the seabed may once have been inside a parrotfish!',
    'At night, some parrotfish make a cocoon of slime around themselves to sleep in.',
  ],
  sources: [
    'https://oceanservice.noaa.gov/facts/sand.html',
    'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/stoplight-parrotfish/',
    'https://www.floridamuseum.ufl.edu/southflorida/habitats/corals/reef-communities/',
  ],
};

/** A small, close orbit; the camera rides high so the submarine never hides the fish, and the craft faces where it goes as the fish swims. */
export const FISH_ORBIT = { entryDistance: 5.5, radius: 3, rig: { back: 3, lift: 5, trail: 2 }, level: true, faceTravel: true };


/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const CLOWNFISH_DISCOVERY = {
  id: 'clownfish',
  name: 'Clownfish',
  eyebrow: 'Sea life',
  factsNoun: 'clownfish',
  summary: 'A clownfish lives safely among the stinging arms of a sea anemone.',
  honesty: 'This ocean is a made-up mix of places, so there is no sea anemone here. A real clownfish stays close to its anemone.',
  meta: ['Fish', 'Coral reefs'],
  stats: [
    { label: 'Lives', value: 'Warm coral reefs in the Indian and Pacific Oceans' },
    { label: 'Home', value: 'Inside a sea anemone' },
  ],
  facts: [
    'A sea anemone has stinging arms. They keep hungry fish away from the clownfish that lives in them.',
    'The anemone does not get hurt by its own stings.',
    'The clownfish cleans the algae off its anemone.',
    'When two animals help each other like this, it is called a mutually beneficial partnership.',
    'Bigger anemones are home to bigger clownfish.',
  ],
  closer: [
    'A clownfish and a sea anemone are partners. The anemone keeps the clownfish safe with its stinging arms, which it is not hurt by.',
    'In return, the clownfish cleans algae off the anemone. Each one helps the other.',
    'Scientists have found that the bigger the anemone, the bigger the clownfish that lives in it.',
  ],
  sources: [
    'https://sanctuaries.noaa.gov/pgallery/pgfagatele/living/living_03_100.html',
    'https://repository.library.noaa.gov/view/noaa/10369/noaa_10369_DS1.pdf',
  ],
};
export const CLOWNFISH_ORBIT = { entryDistance: 5, radius: 3.2, rig: { back: 4, lift: 4.5, trail: 2 }, level: true, faceTravel: true };

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const TURTLE_DISCOVERY = {
  id: 'sea-turtle',
  name: 'Green sea turtle',
  eyebrow: 'Sea life',
  factsNoun: 'sea turtle',
  summary: 'A green sea turtle is a reptile, so it must swim up to the surface to breathe air.',
  honesty: 'This ocean is a made-up mix of places. Real green sea turtles swim in seas all around the world.',
  meta: ['Reptile', 'Seas worldwide'],
  stats: [
    { label: 'Size', value: 'About 1 metre long', compare: 'as long as a six-year-old is tall' },
    { label: 'Food', value: 'Algae and seagrasses' },
    { label: 'Lifetime', value: 'Maybe 70 years or more' },
  ],
  facts: [
    'Green turtles mostly eat algae and seagrasses.',
    'They are called green because of the colour of their fat, not their shells.',
    'A turtle is a reptile, so it has to come to the surface to breathe air.',
    'Grown-up green turtles can travel hundreds or even thousands of miles between where they feed and where they nest.',
    'A green turtle might live for 70 years or more.',
  ],
  closer: [
    'Green turtles are the biggest hard-shelled sea turtles. A grown-up is about as long as a six-year-old is tall.',
    'They eat mostly algae and seagrasses. Their fat is green, and that is where their name comes from.',
    'Turtles are reptiles, not fish. They cannot breathe underwater, so they come up to the surface for air.',
  ],
  sources: ['https://www.fisheries.noaa.gov/species/green-turtle'],
};
export const TURTLE_ORBIT = { entryDistance: 6.5, radius: 4, rig: { back: 4, lift: 5, trail: 2.5 }, level: true, faceTravel: true };

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const RAY_DISCOVERY = {
  id: 'eagle-ray',
  name: 'Spotted eagle ray',
  eyebrow: 'Sea life',
  factsNoun: 'eagle ray',
  summary: 'A spotted eagle ray seems to fly through the water as its wide fins ripple.',
  honesty: 'This ocean is a made-up mix of places. Real spotted eagle rays swim in warm coastal seas.',
  meta: ['Fish', 'Reefs and bays'],
  stats: [
    { label: 'Width', value: 'Up to about 3 metres across' },
    { label: 'Lives', value: 'Over coral reefs and in bays' },
    { label: 'Depth', value: 'Down to about 60 metres' },
  ],
  facts: [
    'A spotted eagle ray flies through the water by rippling its big side fins.',
    'Its back is dark with small pale spots.',
    'Flat, plate-like teeth help it crush clams, oysters and whelks.',
    'It is often seen in bays and over coral reefs.',
    'The eggs grow inside the mother, and she gives birth to up to four pups.',
  ],
  closer: [
    'The spotted eagle ray has big fins on each side of its body. It ripples them to glide along, so it looks as if it is flying.',
    'Its back is dark with small pale spots. Under its snout are flat, plate-like teeth that crush shellfish like clams and oysters.',
    'The eggs hatch inside the mother, so the pups are born ready to swim.',
  ],
  sources: ['https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/spotted-eagle-ray/'],
};
export const RAY_ORBIT = { entryDistance: 6.5, radius: 4, rig: { back: 4, lift: 5, trail: 2.5 }, level: true, faceTravel: true };

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const SEAHORSE_DISCOVERY = {
  id: 'seahorse',
  name: 'Seahorse',
  eyebrow: 'Sea life',
  factsNoun: 'seahorse',
  summary: 'A seahorse dad is the one who gets pregnant and gives birth.',
  honesty: 'This ocean is a made-up mix of places, and this seahorse is drawn bigger so it is easy to spot.',
  meta: ['Fish', 'Seagrass and coral'],
  stats: [
    { label: 'Babies', value: 'A few dozen to 1,000 at once' },
    { label: 'Pregnancy', value: 'About 2 to 4 weeks' },
    { label: 'Home', value: 'Seagrass, coral and mangroves' },
  ],
  facts: [
    'Seahorses and their cousins, the sea dragons, are the only animals where the dad gets pregnant.',
    'A seahorse dad can have anything from a few dozen to 1,000 baby seahorses at once.',
    'Once the babies are born, nobody looks after them.',
    'Seahorses cling to seagrass and are well camouflaged, so they can be hard to see.',
    'A dwarf seahorse is only about 2.5 centimetres tall.',
  ],
  closer: [
    'In most animals, the mum has the babies. In seahorses, the dad does! He carries the babies for about two to four weeks and then they are born.',
    'A dad can have a few dozen babies, or even as many as 1,000. The babies swim off on their own.',
    'Seahorses hold on to seagrass and are very good at hiding. Some are tiny. The dwarf seahorse is only about 2.5 centimetres tall.',
  ],
  sources: [
    'https://oceanservice.noaa.gov/facts/seahorse.html',
    'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/lined-seahorse/',
    'https://www.fisheries.noaa.gov/s3/dam-migration/2017-dwarf-seahorse-status-review-final-508-1-.pdf',
  ],
};
export const SEAHORSE_ORBIT = { entryDistance: 4, radius: 2.6, rig: { back: 2, lift: 5, trail: 5 }, level: true, faceTravel: true };


// Orbits for the open-water animals: each sized to the animal, the camera high enough to see over the hull.
export const SHARK_ORBIT = { entryDistance: 9, radius: 4.5, rig: { back: 3.5, lift: 5, trail: 3 }, level: true, faceTravel: true };
export const OCTOPUS_ORBIT = { entryDistance: 5.5, radius: 3, rig: { back: 2.5, lift: 5, trail: 4 }, level: true, faceTravel: true };
export const WHALE_ORBIT = { entryDistance: 15, radius: 8.5, rig: { back: 6, lift: 5, trail: 5 }, level: true, faceTravel: true };
export const SWORDFISH_ORBIT = { entryDistance: 10, radius: 4.5, rig: { back: 3.5, lift: 5, trail: 3 }, level: true, faceTravel: true };
export const DOLPHIN_ORBIT = { entryDistance: 9, radius: 4, rig: { back: 3.5, lift: 5, trail: 3 }, level: true, faceTravel: true };
export const PORCUPINEFISH_ORBIT = { entryDistance: 5, radius: 2.6, rig: { back: 2, lift: 5, trail: 5 }, level: true, faceTravel: true };
export const JELLYFISH_ORBIT = { entryDistance: 5, radius: 3, rig: { back: 2, lift: 5, trail: 5 }, level: true, faceTravel: true };

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const SHARK_DISCOVERY = {
  id: 'reef-shark',
  name: 'Caribbean reef shark',
  eyebrow: 'Sea life',
  factsNoun: 'shark',
  summary: 'A shark’s teeth keep falling out, and new ones keep growing in their place.',
  honesty: 'This ocean is a made-up mix of places. Real Caribbean reef sharks live around coral reefs in the Caribbean.',
  meta: ['Fish', 'Coral reefs'],
  stats: [
    { label: 'Size', value: 'Usually about 2 to 3 metres long' },
    { label: 'Lives', value: 'On and near Caribbean coral reefs' },
    { label: 'Food', value: 'Mostly fish' },
  ],
  facts: [
    'Sharks lose teeth all through their lives, and new teeth keep replacing them.',
    'A shark’s skeleton is made of cartilage, not bone like yours.',
    'It is the most common shark around coral reefs in the Caribbean.',
    'Caribbean reef sharks mainly eat fish.',
    'Sometimes they rest on the sea floor or in caves, and scientists still do not know why.',
  ],
  closer: [
    'Your skeleton is made of bone. A shark’s skeleton is made of cartilage instead.',
    'Sharks lose teeth all the time, but that is fine. New teeth keep moving in to take their place.',
    'Caribbean reef sharks are the most common sharks on Caribbean coral reefs. They sometimes lie still on the sea floor or in caves, and nobody knows why yet.',
  ],
  sources: [
    'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/carcharhinus-perezi/',
    'https://www.floridamuseum.ufl.edu/discover-fish/fish/fish-groups/',
    'https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/sharks',
  ],
};

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const OCTOPUS_DISCOVERY = {
  id: 'octopus',
  name: 'Giant Pacific octopus',
  eyebrow: 'Sea life',
  factsNoun: 'octopus',
  summary: 'An octopus has three hearts and no bones at all.',
  honesty: 'This ocean is a made-up mix of places, and this octopus is drawn much smaller than the biggest giant Pacific octopuses.',
  meta: ['Invertebrate', 'Clever hunter'],
  stats: [
    { label: 'Arms', value: '8, covered in suckers' },
    { label: 'Hearts', value: '3' },
    { label: 'Biggest found', value: 'Nearly 6 metres across' },
  ],
  facts: [
    'Its eight arms are covered with suction cups.',
    'It has three hearts. Two pump blood to its gills, and one sends it around the body.',
    'An octopus has no bones, so it can squeeze into tiny spaces.',
    'It can change colour very quickly to hide.',
    'Octopuses are clever. They can learn to open jars and solve puzzles.',
  ],
  closer: [
    'An octopus has eight arms covered in suckers, and no bones at all.',
    'It has three hearts! Two send blood to its gills, and the third pumps it around the rest of its body.',
    'To escape, it can squirt a cloud of ink and shoot away by squirting out water, a bit like a jet.',
  ],
  sources: [
    'https://www.montereybayaquarium.org/animals/animals-a-to-z/giant-pacific-octopus',
    'https://oceanservice.noaa.gov/news/feb26/undersea-creatures-valentines-day.html',
    'https://www.fisheries.noaa.gov/science-blog/view-inside-kodiak-lab-aquarium-post-4',
  ],
};

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const WHALE_DISCOVERY = {
  id: 'humpback-whale',
  name: 'Humpback whale',
  eyebrow: 'Sea life',
  factsNoun: 'whale',
  summary: 'A humpback whale is a mammal, so it comes up to breathe air through its blowholes.',
  honesty: 'This ocean is a made-up mix of places, and this whale is drawn much smaller than a real humpback so it fits.',
  meta: ['Mammal', 'Oceans worldwide'],
  stats: [
    { label: 'Size', value: 'About 12 to 18 metres long', compare: 'longer than a bus' },
    { label: 'Food', value: 'Krill and small fish' },
    { label: 'Baby', value: 'About 4 to 5 metres long at birth' },
  ],
  facts: [
    'Humpback whales sing the most complex and varied songs of any whale.',
    'A song can last more than 15 minutes, and they may sing it again and again for hours.',
    'They eat krill and small fish by straining huge gulps of water through plates called baleen.',
    'Sometimes a humpback jumps right out of the water. This is called breaching.',
    'Some humpbacks swim about 8,000 kilometres from where their babies are born to where they feed.',
  ],
  closer: [
    'Whales are mammals, like us. A humpback comes up to the surface and blows out air through its blowholes.',
    'It has no teeth for chewing. Instead it gulps water and strains out krill and little fish through baleen plates.',
    'Humpbacks are famous singers. Their songs can last over 15 minutes and be repeated for hours.',
  ],
  sources: [
    'https://www.fisheries.noaa.gov/species/humpback-whale',
    'https://www.montereybayaquarium.org/animals/animals-a-to-z/humpback-whale',
    'https://www.nps.gov/chis/learn/nature/humpback-whale.htm',
    'https://www.mbari.org/news/when-the-humpbacks-sing/',
    'https://oceanservice.noaa.gov/facts/dolphin.html',
  ],
};

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const SWORDFISH_DISCOVERY = {
  id: 'swordfish',
  name: 'Swordfish',
  eyebrow: 'Sea life',
  factsNoun: 'swordfish',
  summary: 'A swordfish has a long, flat bill that looks like a sword.',
  honesty: 'This ocean is a made-up mix of places. Real swordfish live in deeper water, away from coral reefs.',
  meta: ['Fish', 'Fast swimmer'],
  stats: [
    { label: 'Speed', value: 'Up to about 80 km an hour', compare: 'as fast as a car' },
    { label: 'Size', value: 'Up to about 4.5 metres long' },
    { label: 'Food', value: 'Fish and squid' },
  ],
  facts: [
    'It catches food by slashing its bill from side to side to stun fish.',
    'Swordfish can swim at up to about 80 kilometres an hour.',
    'Grown-up swordfish have no scales and no teeth.',
    'They eat fish and squid.',
    'The biggest swordfish are about 4.5 metres long.',
  ],
  closer: [
    'The swordfish’s “sword” is a long, flat bill. It swishes it from side to side to stun the fish it wants to eat.',
    'It is one of the fastest fish in the sea, reaching up to about 80 kilometres an hour.',
    'When they are grown up, swordfish have no teeth and no scales at all.',
  ],
  sources: [
    'https://www.fisheries.noaa.gov/species/north-atlantic-swordfish',
    'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/swordfish/',
  ],
};

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const DOLPHIN_DISCOVERY = {
  id: 'dolphin',
  name: 'Bottlenose dolphin',
  eyebrow: 'Sea life',
  factsNoun: 'dolphin',
  summary: 'A dolphin finds food by making clicks and listening for the echoes.',
  honesty: 'This ocean is a made-up mix of places.',
  meta: ['Mammal', 'Breathes air'],
  stats: [
    { label: 'Size', value: 'About 2 to 4 metres long' },
    { label: 'Food', value: 'Fish, squid and crabs and shrimps' },
    { label: 'Clicks', value: 'Up to 2,000 a second' },
  ],
  facts: [
    'Dolphins are mammals. They come up to the surface to breathe air through a blowhole.',
    'A dolphin makes up to 2,000 clicks a second and listens for echoes to find fish.',
    'When a dolphin sleeps, half of its brain stays awake so it keeps breathing.',
    'Dolphins travel alone or in groups, and groups often split up and join together again.',
    'A dolphin may eat 14 kilograms of fish in a day.',
  ],
  closer: [
    'A dolphin is a mammal, not a fish. It breathes air through the blowhole on top of its head.',
    'It finds food with sound. It sends out clicks and listens for the echoes that bounce back from fish.',
    'When it sleeps, only half of its brain rests. The other half stays awake so the dolphin keeps breathing.',
  ],
  sources: [
    'https://www.fisheries.noaa.gov/species/common-bottlenose-dolphin',
    'https://www.nps.gov/places/000/atlantic-bottlenose-dolphin.htm',
    'https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/common-bottlenose-dolphin',
  ],
};

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const PORCUPINEFISH_DISCOVERY = {
  id: 'porcupinefish',
  name: 'Porcupinefish',
  eyebrow: 'Sea life',
  factsNoun: 'porcupinefish',
  summary: 'When a porcupinefish is scared, it gulps water and puffs up so its spikes stand out.',
  honesty: 'This ocean is a made-up mix of places, and this porcupinefish is drawn bigger so it is easy to spot.',
  meta: ['Fish', 'Puffs up'],
  stats: [
    { label: 'Size', value: 'Usually about 40 cm long' },
    { label: 'Food', value: 'Snails, sea urchins and hermit crabs' },
  ],
  facts: [
    'When it is in danger, it fills up with water and puffs out its spikes.',
    'Strong jaws let it crack open snails, sea urchins and hermit crabs.',
    'It swims slowly among the coral.',
    'It is shy and swims away if divers come close.',
    'It makes a poison, so people do not catch it to eat.',
  ],
  closer: [
    'A porcupinefish has a secret trick. When it is scared, it takes in water and blows up like a spiky ball.',
    'Its strong jaws can crack the shells of snails, sea urchins and hermit crabs.',
    'It is a shy, slow swimmer that likes to stay among the coral.',
  ],
  sources: [
    'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/porcupinefish/',
    'https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/balloonfish/',
  ],
};

/** @type {import('../../../components/worlds/discovery.js').Discovery} */
export const JELLYFISH_DISCOVERY = {
  id: 'jellyfish',
  name: 'Moon jelly',
  eyebrow: 'Sea life',
  factsNoun: 'jelly',
  summary: 'A jellyfish has no brain, no heart and no bones.',
  honesty: 'This ocean is a made-up mix of places, and this jelly is drawn bigger so it is easy to spot.',
  meta: ['Jellyfish', 'Drifts and pulses'],
  stats: [
    { label: 'Made of', value: 'About 95 percent water' },
    { label: 'Food', value: 'Plankton' },
    { label: 'On Earth for', value: 'Over 600 million years' },
  ],
  facts: [
    'A jellyfish is about 95 percent water.',
    'A moon jelly moves by squeezing and pulsing its bell.',
    'Its tentacles have stinging cells to catch food.',
    'Jellies eat tiny swimming living things called plankton.',
    'Jellies have been on Earth for more than 600 million years.',
  ],
  closer: [
    'A jellyfish has no brain, no heart, no blood and no bones. It is almost all water.',
    'A moon jelly swims by squeezing its bell, then letting it open again, over and over.',
    'Jellies have been floating in the sea for more than 600 million years.',
  ],
  sources: [
    'https://oceanservice.noaa.gov/facts/jellyfish.html',
    'https://www.montereybayaquarium.org/animals/animals-a-to-z/jellies',
    'https://www.nps.gov/foma/learn/nature/jellyfish.htm',
  ],
};

export const OCEAN_DISCOVERIES = [
  REEF_DISCOVERY, FISH_DISCOVERY, CLOWNFISH_DISCOVERY, TURTLE_DISCOVERY, RAY_DISCOVERY, SEAHORSE_DISCOVERY,
  SHARK_DISCOVERY, OCTOPUS_DISCOVERY, WHALE_DISCOVERY, SWORDFISH_DISCOVERY, DOLPHIN_DISCOVERY, PORCUPINEFISH_DISCOVERY, JELLYFISH_DISCOVERY,
];
