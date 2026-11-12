import { OCEAN_DISCOVERIES } from './oceanDiscoveries.js';

// The reef, then every kind of animal in the ocean. The first five swim near the
// start; the scene travels to the nearest one of each kind, so the trips stay short.
// Every narration repeats a fact already on that discovery's card.
export const OCEAN_TOUR_STOPS = [
  {
    id: 'coral-reef',
    name: 'Coral reef',
    narration: 'Welcome to the reef! Coral may look like rock, but it is made by tiny animals called polyps. A reef is a busy home for many sea creatures.',
  },
  {
    id: 'parrotfish',
    name: 'Parrotfish',
    narration: 'Here is a parrotfish. Its teeth join together to make a strong beak. It scrapes tiny plants from rocks and old coral.',
  },
  {
    id: 'clownfish',
    name: 'Clownfish',
    narration: 'This is a clownfish. It lives among the stinging arms of a sea anemone, which keep it safe. In return, the clownfish cleans the anemone.',
  },
  {
    id: 'sea-turtle',
    name: 'Green sea turtle',
    narration: 'Here is a green sea turtle. It is a reptile, not a fish, so it must swim to the surface to breathe air.',
  },
  {
    id: 'eagle-ray',
    name: 'Spotted eagle ray',
    narration: 'Look, a spotted eagle ray! It ripples its wide fins to glide along, so it looks as if it is flying through the water.',
  },
  {
    id: 'seahorse',
    name: 'Seahorse',
    narration: 'This is a seahorse. In seahorses, the dad is the one who carries the babies until they are born.',
  },
  {
    id: 'porcupinefish',
    name: 'Porcupinefish',
    narration: 'Here is a porcupinefish. When it is scared, it gulps water and puffs up like a spiky ball.',
  },
  {
    id: 'octopus',
    name: 'Giant Pacific octopus',
    narration: 'Meet an octopus. It has eight arms covered in suckers, three hearts and no bones at all.',
  },
  {
    id: 'jellyfish',
    name: 'Moon jelly',
    narration: 'This is a moon jelly. It has no brain, no heart and no bones. It swims by squeezing its bell, over and over.',
  },
  {
    id: 'reef-shark',
    name: 'Caribbean reef shark',
    narration: 'Here is a reef shark. Sharks lose teeth all through their lives, and new ones keep growing in their place.',
  },
  {
    id: 'dolphin',
    name: 'Bottlenose dolphin',
    narration: 'This is a bottlenose dolphin. It is a mammal that breathes air. It finds fish by making clicks and listening for the echoes.',
  },
  {
    id: 'swordfish',
    name: 'Swordfish',
    narration: 'Here is a swordfish. It swishes its long, flat bill from side to side to stun the fish it wants to eat.',
  },
  {
    id: 'humpback-whale',
    name: 'Humpback whale',
    narration: 'Our last stop is a humpback whale. It is a mammal, and it is famous for its long songs. Thank you for exploring the ocean!',
  },
];

export const oceanTourStop = (id) => OCEAN_TOUR_STOPS.find((stop) => stop.id === id);

export const oceanTourDiscovery = (id) => {
  const discovery = OCEAN_DISCOVERIES.find((item) => item.id === id);
  const stop = oceanTourStop(id);
  return discovery && stop ? { ...discovery, narration: stop.narration } : null;
};
