/**
 * Original reading passages for the Year 3 reading topics built on
 * ReadingTopicGame: Does It Make Sense?, Predicting What Happens Next, Fairy
 * Stories, Myths and Legends, Finding Information, Asking Questions about a
 * Text, Kinds of Writing, Words That Spark the Imagination and Poetry Forms.
 *
 * Same shape as passages.js: { id, year, kind, title, skills, blocks }, where
 * blocks are ReadingPassage blocks ("p" | "h" | "line" | "item"). Kept apart
 * from passages.js so each topic's texts sit together.
 *
 * The fairy stories, myths and legends are retellings, in our own words, of
 * traditional public-domain tales. Everything else is written for the app.
 * passagesReading.test.js keeps each one between 60 and 200 words, in
 * British spelling, with the cast's pronouns.
 */
export const READING_PASSAGES = [
  // --- Does It Make Sense? (each has ONE word and ONE sentence that do not fit) ---
  {
    id: "picnic-in-the-park",
    year: 3,
    kind: "story",
    title: "The Picnic",
    skills: ["does-it-make-sense"],
    blocks: [
      { type: "p", text: "On Saturday, Amara and Leo packed a picnic. They put sandwiches, apples and a bottle of juice into a basket. Then they walked to the park and spread a blanket on the grass." },
      { type: "p", text: "Leo was hungry, so he took a big bite of his ladder. Suddenly, a duck waddled over and quacked loudly. It wanted some lunch too! Amara laughed and threw it a few crumbs." },
      { type: "p", text: "Then dark clouds rolled across the sky, and big drops of rain began to fall. Leo’s goldfish can play the piano. Amara and Leo grabbed the basket and ran all the way home, laughing." },
    ],
  },
  {
    id: "zayns-rocket",
    year: 3,
    kind: "story",
    title: "Zayn’s Rocket",
    skills: ["does-it-make-sense"],
    blocks: [
      { type: "p", text: "Zayn wanted to build a rocket. He collected an empty bottle, some card and a roll of sticky tape. He sat at the kitchen table and got to work." },
      { type: "p", text: "First, he cut three triangles out of the card to make fins. Then he taped them to the bottom of the bottle. Penguins live at the South Pole. Next, he painted the rocket bright red." },
      { type: "p", text: "When the paint was dry, Zayn showed his rocket to Dad. Dad counted down from ten. Zayn held the rocket high above his head and pretended it was blasting off into soup." },
    ],
  },
  {
    id: "biscuits-bath",
    year: 3,
    kind: "story",
    title: "Bath Time for Biscuit",
    skills: ["does-it-make-sense"],
    blocks: [
      { type: "p", text: "Biscuit had been rolling in the mud. His fur was brown and sticky, and he left muddy paw prints all over the kitchen floor. “Bath time!” said Ellie." },
      { type: "p", text: "Ellie filled the bath with warm water and lots of bubbles. Biscuit did not like baths. As soon as he saw the water, he hid under the cloud." },
      { type: "p", text: "In the end, Ellie lifted him into the bath. Biscuit shook himself, and water splashed everywhere. A train can travel faster than a bicycle. Ellie was soaked, but Biscuit was clean at last." },
    ],
  },

  // --- Predicting What Happens Next ---
  {
    id: "the-tree-house",
    year: 3,
    kind: "story",
    title: "The Tree House",
    skills: ["predicting-what-happens-next"],
    blocks: [
      { type: "p", text: "Priya and Zayn were building a tree house at the bottom of Priya’s garden. They had nailed four planks to the strongest branch, and now they needed a roof." },
      { type: "p", text: "Zayn looked up at the sky. Grey clouds were rolling in from the hills, and the wind was getting colder. “We need to hurry,” he said." },
      { type: "p", text: "Priya found an old blue sheet in the shed. Zayn fetched a hammer and a tin of nails. The first drops were already falling." },
    ],
  },
  {
    id: "the-sandcastle",
    year: 3,
    kind: "story",
    title: "The Sandcastle",
    skills: ["predicting-what-happens-next"],
    blocks: [
      { type: "p", text: "Leo and Amara spent all morning building an enormous sandcastle. It had four towers, a wall made of shells and a moat all the way round." },
      { type: "p", text: "They were so busy that they did not notice the sea creeping up the beach. Each wave came a little closer than the one before. Soon the water was lapping at the edge of the moat." },
      { type: "p", text: "Leo stood back to admire their work. “It’s the best sandcastle ever!” he said. Behind him, a big wave was rolling towards the shore." },
    ],
  },
  {
    id: "the-birthday-cake",
    year: 3,
    kind: "story",
    title: "The Birthday Cake",
    skills: ["predicting-what-happens-next"],
    blocks: [
      { type: "p", text: "It was Ellie’s birthday. Mum had made a chocolate cake with pink icing and put it on the kitchen table to cool." },
      { type: "p", text: "Ellie went upstairs to put on her party dress. Mum went into the garden to hang up balloons. The kitchen was empty, except for Biscuit." },
      { type: "p", text: "Biscuit sniffed the air. He put his front paws on a chair and stretched up towards the table. His tail was wagging faster and faster." },
    ],
  },

  // --- Fairy Stories, Myths and Legends (retellings) ---
  {
    id: "elves-and-the-shoemaker",
    year: 3,
    kind: "story",
    title: "The Elves and the Shoemaker",
    skills: ["fairy-stories-myths-and-legends"],
    blocks: [
      { type: "p", text: "Once upon a time, there was a kind shoemaker who was very poor. One evening, he had only enough leather left for one last pair of shoes. He cut out the leather, left it on his table and went sadly to bed." },
      { type: "p", text: "In the morning, he could not believe his eyes. On the table stood a perfect pair of shoes, with tiny, neat stitches. A rich lady bought them for a bag of gold. The same thing happened the next night, and the night after that." },
      { type: "p", text: "So the shoemaker hid and watched. At midnight, two tiny elves crept in and sewed until dawn. To say thank you, the shoemaker and his wife made the elves some little clothes. The elves danced with joy, and the shoemaker was never poor again." },
    ],
  },
  {
    id: "tortoise-shell",
    year: 3,
    kind: "story",
    title: "Why Tortoise Has a Cracked Shell",
    skills: ["fairy-stories-myths-and-legends"],
    blocks: [
      { type: "p", text: "When the world was new, Tortoise had a smooth, shiny shell. One day, the birds were invited to a great feast in the sky. Tortoise begged to go too, so each bird lent him a feather, and he made himself a pair of wings." },
      { type: "p", text: "At the feast, Tortoise was greedy. He ate all the best food and left only scraps for the birds. The birds were so cross that they each took back their feather. Now Tortoise had no wings, and he could not fly home." },
      { type: "p", text: "Tortoise jumped and fell all the way down to the ground. His smooth shell cracked into many pieces. His wife stuck the pieces back together, but the cracks never went away. And that is why, to this day, a tortoise’s shell is covered in cracks." },
    ],
  },
  {
    id: "persephone",
    year: 3,
    kind: "story",
    title: "Persephone and the Seasons",
    skills: ["fairy-stories-myths-and-legends"],
    blocks: [
      { type: "p", text: "Long ago, in Ancient Greece, the goddess Demeter looked after all the plants on Earth. She loved her daughter, Persephone, more than anything." },
      { type: "p", text: "One day, Hades, the god of the Underworld, took Persephone down to his dark kingdom under the ground. Demeter was so sad that she stopped caring for the plants. Leaves fell from the trees, and nothing grew. It was the very first winter." },
      { type: "p", text: "At last, the gods agreed that Persephone could come home for half of every year. When she returns, Demeter is happy, and flowers bloom again. When she goes back under the ground, winter comes. That is how the seasons began." },
    ],
  },
  {
    id: "robin-hood-silver-arrow",
    year: 3,
    kind: "story",
    title: "Robin Hood and the Silver Arrow",
    skills: ["fairy-stories-myths-and-legends"],
    blocks: [
      { type: "p", text: "Many years ago, the outlaw Robin Hood lived in Sherwood Forest with his band of Merry Men. Some people say he was a real man. He took money from the greedy rich and gave it to the poor." },
      { type: "p", text: "The wicked Sheriff of Nottingham wanted to catch him. So he held an archery contest, with a silver arrow as the prize. He knew that Robin would not be able to stay away." },
      { type: "p", text: "Robin came in disguise, wearing a ragged cloak. His arrow hit the very centre of the target, and he won the prize. Before the Sheriff’s men could grab him, Robin threw off his cloak and escaped into the forest." },
    ],
  },
  {
    id: "sword-in-the-stone",
    year: 3,
    kind: "story",
    title: "The Sword in the Stone",
    skills: ["fairy-stories-myths-and-legends"],
    blocks: [
      { type: "p", text: "Long ago, England had no king. In a churchyard stood a great stone with a sword stuck deep inside it. Words were carved on the stone: whoever pulls this sword out shall be king." },
      { type: "p", text: "Many strong knights tried. They pulled and heaved until their faces went red, but the sword did not move at all." },
      { type: "p", text: "One day, a boy called Arthur needed a sword for his brother. He ran to the churchyard and pulled the sword from the stone as easily as a spoon from jelly. Everyone was amazed, and Arthur became king. Some people believe that King Arthur really lived." },
    ],
  },

  // --- Finding Information (non-fiction with headings) ---
  {
    id: "hedgehogs",
    year: 3,
    kind: "report",
    title: "Hedgehogs",
    skills: ["finding-information"],
    blocks: [
      { type: "p", text: "Hedgehogs are small, prickly animals that live in gardens, parks and woods across Britain." },
      { type: "h", text: "What do they look like?" },
      { type: "p", text: "A hedgehog is about the size of a guinea pig. Its back is covered in around 5,000 sharp spines. When it is scared, it rolls into a tight, spiky ball." },
      { type: "h", text: "What do they eat?" },
      { type: "p", text: "Hedgehogs eat beetles, worms, slugs and caterpillars. They hunt at night, using their good sense of smell." },
      { type: "h", text: "Winter sleep" },
      { type: "p", text: "In autumn, hedgehogs build nests of dry leaves. They sleep through the cold winter months and wake up in spring. This long sleep is called hibernation." },
    ],
  },
  {
    id: "honeybees",
    year: 3,
    kind: "report",
    title: "Honeybees",
    skills: ["finding-information"],
    blocks: [
      { type: "p", text: "Honeybees are insects that live together in a large group called a colony. A colony can have more than 20,000 bees!" },
      { type: "h", text: "The queen" },
      { type: "p", text: "Every colony has one queen. She is the biggest bee in the hive, and her only job is to lay eggs." },
      { type: "h", text: "Worker bees" },
      { type: "p", text: "Worker bees fly from flower to flower, collecting a sweet juice called nectar. Back at the hive, they turn the nectar into honey." },
      { type: "h", text: "Bee dances" },
      { type: "p", text: "When a worker bee finds lots of flowers, it does a waggle dance. The dance tells the other bees which way to fly." },
    ],
  },
  {
    id: "the-moon",
    year: 3,
    kind: "report",
    title: "The Moon",
    skills: ["finding-information"],
    blocks: [
      { type: "p", text: "The Moon is a huge ball of rock that travels around the Earth. It takes about 27 days to go all the way round." },
      { type: "h", text: "Moonlight" },
      { type: "p", text: "The Moon does not make its own light. It shines because light from the Sun bounces off it." },
      { type: "h", text: "Craters" },
      { type: "p", text: "The Moon is covered in round holes called craters. They were made by rocks from space crashing into it." },
      { type: "h", text: "Visitors" },
      { type: "p", text: "In 1969, two astronauts became the first people to walk on the Moon. They left footprints that are still there today, because there is no wind to blow them away." },
    ],
  },

  // --- Asking Questions about a Text ---
  {
    id: "missing-carrots",
    year: 3,
    kind: "story",
    title: "The Missing Carrots",
    skills: ["asking-questions-about-a-text"],
    blocks: [
      { type: "p", text: "Every morning, Amara helped Gran in her vegetable garden. One Monday, they found that three carrots had disappeared. There were small holes in the soil where they had been." },
      { type: "p", text: "On Tuesday, two more carrots had gone. Amara noticed tiny footprints in the mud and a fluffy white tuft caught on the fence. “I wonder who the thief is,” said Gran." },
      { type: "p", text: "That evening, Amara hid behind the shed and waited. As the sun went down, a rabbit squeezed under the fence and began to nibble a carrot. Amara smiled. The mystery was solved." },
    ],
  },
  {
    id: "zayns-volcano",
    year: 3,
    kind: "story",
    title: "Zayn’s Volcano",
    skills: ["asking-questions-about-a-text"],
    blocks: [
      { type: "p", text: "For the science fair, Zayn made a model volcano. He shaped it out of clay around a small plastic bottle, and painted it brown and orange." },
      { type: "p", text: "Next, he poured some bicarbonate of soda into the bottle and added a squirt of red food colouring. Then, very slowly, he tipped in some vinegar." },
      { type: "p", text: "Suddenly, red foam bubbled up and poured down the sides of the volcano, just like lava. Everyone at the fair clapped, and Zayn won a gold sticker." },
    ],
  },
  {
    id: "priyas-sunflower",
    year: 3,
    kind: "story",
    title: "Priya’s Sunflower",
    skills: ["asking-questions-about-a-text"],
    blocks: [
      { type: "p", text: "In April, Priya planted a sunflower seed in a pot. She put the pot on a sunny windowsill and watered it every day." },
      { type: "p", text: "After a week, a tiny green shoot poked out of the soil. By June, the plant was too big for the pot, so Priya and her dad moved it into the garden." },
      { type: "p", text: "By August, the sunflower was taller than Dad! Its huge yellow flower turned to face the sun each morning. Priya measured it with a long tape measure. It was two metres tall." },
    ],
  },

  // --- Kinds of Writing ---
  {
    id: "letter-from-camp",
    year: 3,
    kind: "letter",
    title: "",
    skills: ["kinds-of-writing"],
    blocks: [
      { type: "p", text: "Dear Gran," },
      { type: "p", text: "I am writing to you from Forest Camp. We arrived on Monday and we are sleeping in tents! On the first night, it rained so hard that our tent leaked, but we stayed dry in our sleeping bags." },
      { type: "p", text: "Yesterday, I climbed the tallest tree on the climbing course. My teacher said I was the bravest climber in the class." },
      { type: "p", text: "I will tell you everything when I get home on Friday." },
      { type: "p", text: "Love from Priya" },
    ],
  },
  {
    id: "bird-feeder",
    year: 3,
    kind: "instructions",
    title: "How to Make a Bird Feeder",
    skills: ["kinds-of-writing"],
    blocks: [
      { type: "p", text: "Birds find it hard to find food in winter. A bird feeder will help them, and you can watch them eat!" },
      { type: "h", text: "You will need:" },
      { type: "p", text: "a pine cone, peanut butter, birdseed and a piece of string." },
      { type: "h", text: "What to do:" },
      { type: "item", text: "Tie the string around the top of the pine cone." },
      { type: "item", text: "Spread peanut butter all over the pine cone." },
      { type: "item", text: "Roll the pine cone in birdseed until it is covered." },
      { type: "item", text: "Hang your feeder on a branch and watch the birds arrive!" },
    ],
  },
  {
    id: "zayns-diary",
    year: 3,
    kind: "diary",
    title: "",
    skills: ["kinds-of-writing"],
    blocks: [
      { type: "p", text: "Saturday 14th May" },
      { type: "p", text: "Today was the best day ever! Dad took me to the Science Museum in London. We went on a big red bus." },
      { type: "p", text: "My favourite part was the space gallery. I saw a real rocket engine and a space suit that an astronaut had worn. I wish I could go to space one day." },
      { type: "p", text: "Now I am tired, but I am going to draw a rocket before bed." },
    ],
  },
  {
    id: "polar-bears",
    year: 3,
    kind: "report",
    title: "Polar Bears",
    skills: ["kinds-of-writing"],
    blocks: [
      { type: "p", text: "Polar bears live in the Arctic, where it is icy and cold all year round. They are the largest bears in the world." },
      { type: "h", text: "Keeping warm" },
      { type: "p", text: "A polar bear has a thick layer of fat and two layers of fur. Its skin is black, which helps it soak up the heat of the sun." },
      { type: "h", text: "Food" },
      { type: "p", text: "Polar bears are excellent swimmers. They hunt seals, waiting beside holes in the ice for a seal to come up for air." },
    ],
  },

  // --- Words That Spark the Imagination ---
  {
    id: "the-storm",
    year: 3,
    kind: "story",
    title: "The Storm",
    skills: ["words-that-spark-the-imagination"],
    blocks: [
      { type: "p", text: "Leo pressed his nose against the cold window. Outside, the sky had turned the colour of a bruise. The trees bent and swayed as if they were dancing." },
      { type: "p", text: "Suddenly, lightning split the sky in two. Thunder growled like a hungry bear, and rain hammered on the roof. Leo pulled his blanket around his shoulders." },
      { type: "p", text: "By morning, the storm had crept away. The garden glittered with raindrops, and a blackbird sang a bright, cheerful song from the fence." },
    ],
  },
  {
    id: "midnight-feast",
    year: 3,
    kind: "story",
    title: "The Midnight Feast",
    skills: ["words-that-spark-the-imagination"],
    blocks: [
      { type: "p", text: "At midnight, Amara and Priya tiptoed down the stairs. Every step groaned under their feet, and they froze, holding their breath." },
      { type: "p", text: "In the kitchen, the fridge hummed softly. Priya opened the biscuit tin, and the lid fell off with a loud clang! The girls clapped their hands over their mouths to stop themselves giggling." },
      { type: "p", text: "They crept back to bed with their pockets full of crumbly chocolate biscuits. Under the covers, they munched and crunched until their tummies were full." },
    ],
  },
  {
    id: "under-the-sea",
    year: 3,
    kind: "story",
    title: "Under the Sea",
    skills: ["words-that-spark-the-imagination"],
    blocks: [
      { type: "p", text: "Zayn floated face down in the warm, clear water and peered through his mask. Below him, a whole new world was waiting." },
      { type: "p", text: "Fish as bright as jewels darted in and out of the coral. A crab scuttled sideways across the sand, waving its claws. Seaweed swayed gently, like long green ribbons." },
      { type: "p", text: "Then a shadow glided underneath him. Zayn’s heart thumped. It was a huge, gentle turtle, flapping its flippers slowly as it swam past." },
    ],
  },

  // --- Poetry Forms (each line is a "line" block) ---
  {
    id: "night-the-ducks-came",
    year: 3,
    kind: "poem",
    title: "The Night the Ducks Came",
    skills: ["poetry-forms"],
    blocks: [
      { type: "line", text: "One rainy night, when all was still," },
      { type: "line", text: "Six ducks came waddling down the hill." },
      { type: "line", text: "They marched in through our garden gate," },
      { type: "line", text: "And splashed about till very late." },
      { type: "line", text: "They swam in Mum’s new paddling pool," },
      { type: "line", text: "And quacked like children leaving school." },
      { type: "line", text: "Then, as the sun began to rise," },
      { type: "line", text: "They flew away into the skies." },
    ],
  },
  {
    id: "zayns-snowman",
    year: 3,
    kind: "poem",
    title: "Zayn’s Snowman",
    skills: ["poetry-forms"],
    blocks: [
      { type: "line", text: "On Monday," },
      { type: "line", text: "Zayn rolled a snowball" },
      { type: "line", text: "bigger than himself." },
      { type: "line", text: "On Tuesday," },
      { type: "line", text: "he gave it a carrot nose" },
      { type: "line", text: "and two pebble eyes." },
      { type: "line", text: "On Wednesday," },
      { type: "line", text: "the sun came out." },
      { type: "line", text: "On Thursday," },
      { type: "line", text: "all that was left" },
      { type: "line", text: "was a carrot, two pebbles" },
      { type: "line", text: "and a puddle." },
    ],
  },
  {
    id: "garden-at-night",
    year: 3,
    kind: "poem",
    title: "The Garden at Night",
    skills: ["poetry-forms"],
    blocks: [
      { type: "line", text: "Moonlight" },
      { type: "line", text: "silvers the lawn." },
      { type: "line", text: "The roses" },
      { type: "line", text: "have folded their petals" },
      { type: "line", text: "like sleeping hands." },
      { type: "line", text: "A hedgehog" },
      { type: "line", text: "snuffles" },
      { type: "line", text: "under the hedge." },
      { type: "line", text: "Everything else" },
      { type: "line", text: "is quiet." },
    ],
  },
  {
    id: "seaside-sounds",
    year: 3,
    kind: "poem",
    title: "Seaside Sounds",
    skills: ["poetry-forms"],
    blocks: [
      { type: "line", text: "The seagulls cry, the breakers roar," },
      { type: "line", text: "The pebbles rattle on the shore." },
      { type: "line", text: "The ice cream van plays out its tune" },
      { type: "line", text: "From breakfast time to afternoon." },
      { type: "line", text: "The windbreaks flap, the deckchairs creak," },
      { type: "line", text: "The crabs in buckets click and squeak." },
    ],
  },
];

export function findReadingPassage(id) {
  const passage = READING_PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`no reading passage "${id}"`);
  return passage;
}
