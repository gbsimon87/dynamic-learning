/**
 * Teacher subject-knowledge briefings for Year 4 Science, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the programme of study in
 * docs/curriculum/year-4-science.md (the PDF text). Never paraphrase or alter it:
 * a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Year 3 and earlier prior learning and the Year 5+ destination
 */
export const YEAR4_SCIENCE_BRIEFINGS = {
  // ------------------------------------------- Living things and their habitats
  "grouping-living-things": {
    statutory: ["recognise that living things can be grouped in a variety of ways"],
    inBrief: "The same living thing can belong to several groups, depending on which feature we choose to look at. Grouping by observable features is how scientists make sense of the huge variety of life.",
    keyFacts: [
      "Animals with a backbone are vertebrates (fish, amphibians, reptiles, birds, mammals). Animals without one are invertebrates (such as snails and slugs, worms, spiders and insects).",
      "Mammals have fur or hair and feed their young milk. Birds have feathers. Fish have fins and gills. Insects have six legs and spiders have eight.",
      "Plants can be grouped as flowering plants (including grasses) and non-flowering plants, such as ferns and mosses.",
      "One animal fits several groups at once: a butterfly is an animal, an invertebrate and an insect. The group chosen depends on the feature used.",
      "Boundary: grouping by features pupils can observe. Formal classification systems and micro-organisms are not Year 4 expectations.",
    ],
    misconceptions: [
      { mistake: "Whales and bats are fish or birds because of where they live or how they move.", why: "Pupils group by habitat or movement (sea, air) rather than by body features.", response: "Ask what the animal is covered in and how it feeds its young. Fur and milk make both of them mammals." },
      { mistake: "Spiders are insects.", why: "Spiders are small and have legs, like the insects pupils know best.", response: "Count legs and body parts: insects have six legs, spiders eight. Both are invertebrates, but they are different groups." },
      { mistake: "Each living thing belongs to only one correct group.", why: "Sorting activities in earlier years usually asked for a single label.", response: "Sort the same set twice using different features, and discuss how the groups change." },
    ],
    vocabulary: [
      { term: "vertebrate", meaning: "An animal that has a backbone." },
      { term: "invertebrate", meaning: "An animal that does not have a backbone." },
      { term: "mammal", meaning: "A vertebrate with fur or hair that feeds its young milk." },
      { term: "insect", meaning: "An invertebrate with six legs and a body in three parts." },
      { term: "flowering plant", meaning: "A plant that makes flowers, including grasses." },
      { term: "feature", meaning: "Something you can observe about a living thing, such as its covering or number of legs." },
    ],
    before: "In Year 1 pupils name common fish, amphibians, reptiles, birds and mammals, and sort animals into carnivores, herbivores and omnivores. In Year 2 they name plants and animals in their habitats, including micro-habitats.",
    next: "Year 5 pupils compare life cycles and reproduction. Year 6 pupils describe how living things are classified into broad groups, including micro-organisms, and give reasons for classifying plants and animals.",
  },

  "classification-keys": {
    statutory: ["explore and use classification keys to help group, identify and name a variety of living things in their local and wider environment"],
    inBrief: "A classification key is a set of yes-or-no questions about observable features that leads step by step to a name. Using a key trains pupils to look carefully and ask questions that sort things clearly.",
    keyFacts: [
      "A branching key asks one question at a time; each answer sends the user down one branch until a name is reached.",
      "Good key questions are about features that can be seen and have a clear yes or no answer, such as 'Does it have six legs?'. Vague questions such as 'Is it pretty?' do not work.",
      "A key works only for the set of living things it was made for. A key for garden minibeasts cannot identify a fish.",
      "Pupils can use keys outdoors on local plants and animals and then make their own, checking that every item ends in exactly one place.",
      "Boundary: using and making simple keys. Pupils are not expected to use keys with technical botanical or zoological vocabulary.",
    ],
    misconceptions: [
      { mistake: "A key can be started at any question.", why: "Pupils treat the questions like a list rather than a path.", response: "Always begin at the first question and follow the arrows. Compare what happens when you start in the middle." },
      { mistake: "Questions about size or colour are good key questions.", why: "They are easy to see, but 'big' and 'small' depend on opinion.", response: "Test a question by asking two pupils to answer it for the same animal. If they disagree, rewrite it using something countable or clearly present." },
      { mistake: "A key tells you the animal's name from memory, so it does not matter if the answers are careless.", why: "Pupils expect the key to 'know' the answer.", response: "Show that one wrong answer leads to the wrong name, and ask pupils to check each answer against the living thing." },
    ],
    vocabulary: [
      { term: "classification key", meaning: "A set of questions that helps you identify a living thing step by step." },
      { term: "branch", meaning: "One path through a key, following a yes or no answer." },
      { term: "feature", meaning: "Something you can observe, such as number of legs or having wings." },
      { term: "identify", meaning: "Find out the name of a living thing." },
      { term: "observe", meaning: "Look carefully and notice details." },
    ],
    before: "In Year 3 pupils learn that keys are one way of recording findings. In Year 2 they name plants and animals in their habitats and in Year 1 they sort animals by features.",
    next: "Year 5 pupils record data using classification keys alongside graphs and tables. Year 6 pupils use broad classification groups, including micro-organisms.",
  },

  "changing-environments": {
    statutory: ["recognise that environments can change and that this can sometimes pose dangers to living things"],
    inBrief: "Habitats change with the seasons, the weather and human activity. Changes can help some living things and harm others, so people's choices matter.",
    keyFacts: [
      "Natural changes include seasons, floods and dry spells. Human changes include building, litter, pollution and cutting down woodland.",
      "A change can harm one living thing and help another. A dry spell shrinks a pond, harming frogs and newts, but may suit other species.",
      "Human impact can be positive too: nature reserves, ecologically planned parks and garden ponds give living things places to live.",
      "Living things need shelter, food and water in their habitat. If a change removes one of these, the animals and plants that depend on it may struggle to survive.",
      "Boundary: local examples of change and simple causes and effects. Extinction, climate science and endangered species lists are not Year 4 expectations.",
    ],
    misconceptions: [
      { mistake: "When a habitat changes, the animals simply move to another one.", why: "Pupils picture animals as able to relocate easily.", response: "Ask where a pond snail or a hedgehog would go if the pond dried up or a hedge was removed, and what it would need to find." },
      { mistake: "Human changes to habitats are always bad.", why: "Stories about litter and pollution dominate.", response: "Compare a litter-strewn verge with a garden pond or nature reserve and list who benefits." },
      { mistake: "Environments only change because of people.", why: "Pupils notice human impact more readily than the weather.", response: "Track a local habitat across the seasons and sort changes into natural and human-made." },
    ],
    vocabulary: [
      { term: "environment", meaning: "The surroundings a living thing lives in." },
      { term: "habitat", meaning: "The place where a plant or animal lives and finds what it needs." },
      { term: "danger", meaning: "Something that could harm a living thing." },
      { term: "pollution", meaning: "Harmful waste in the air, water or land." },
      { term: "nature reserve", meaning: "A protected place where wildlife is looked after." },
      { term: "shelter", meaning: "A place that protects a living thing from weather and enemies." },
    ],
    before: "In Year 2 pupils learn that most living things live in habitats to which they are suited and depend on each other. In Year 1 they observe seasonal changes.",
    next: "Year 6 pupils learn how plants and animals are adapted to suit their environments and how adaptation may lead to evolution. Geography in key stage 2 also looks at human impact on places.",
  },

  // ------------------------------------------------ Animals, including humans
  "the-human-digestive-system": {
    statutory: ["describe the simple functions of the basic parts of the digestive system in humans"],
    inBrief: "Food travels along one connected route in the body, and each part does a job that breaks it down or moves it on. Digestion lets the body take the nutrients it needs from food.",
    keyFacts: [
      "Teeth break food into smaller pieces and the tongue helps to move and mix it with saliva in the mouth.",
      "The oesophagus carries food to the stomach. The stomach churns food and mixes it with digestive juices.",
      "In the small intestine, nutrients pass from digested food into the blood. In the large intestine, water is absorbed and the remaining waste is formed into faeces.",
      "Waste leaves the body through the end of the digestive system. It is one long, continuous tube, not separate bags.",
      "Boundary: main parts and their simple functions. Enzymes, the liver, the pancreas and the chemistry of digestion are not Year 4 expectations.",
    ],
    misconceptions: [
      { mistake: "Food is stored in the stomach and then simply drops out as waste.", why: "Pupils picture the body as a container rather than a processing route.", response: "Trace the route with a model (such as a long tube or a sock and tights) and name the job at each stage." },
      { mistake: "Drink goes down a different tube from food and ends up straight in the bladder.", why: "Pupils know liquid and solid waste leave separately.", response: "Explain that food and drink travel the same route, and water is absorbed mainly in the intestines." },
      { mistake: "The stomach is where all digestion happens, or where most nutrients are absorbed.", why: "The stomach is the best-known part.", response: "Stress that digestion starts in the mouth and most nutrients are absorbed in the small intestine." },
    ],
    vocabulary: [
      { term: "digestive system", meaning: "The parts of the body that break down food and take nutrients from it." },
      { term: "oesophagus", meaning: "The tube that carries food from the mouth to the stomach." },
      { term: "stomach", meaning: "The bag-like part that churns food and mixes it with digestive juices." },
      { term: "small intestine", meaning: "The long tube where nutrients pass into the blood." },
      { term: "large intestine", meaning: "The wider tube where water is absorbed and waste is formed." },
      { term: "nutrients", meaning: "The useful substances in food that the body needs." },
    ],
    before: "In Year 3 pupils learn that animals, including humans, get nutrition from what they eat, and that humans have skeletons and muscles. In Year 2 they learn about eating the right amounts of different types of food.",
    next: "Year 6 pupils describe the circulatory system and how nutrients and water are transported within animals. Detailed digestion, including enzymes, is taught in key stage 3.",
  },

  "teeth-and-their-functions": {
    statutory: ["identify the different types of teeth in humans and their simple functions"],
    inBrief: "Humans have four types of teeth with different shapes for different jobs. Looking after them matters because adult teeth have to last a lifetime.",
    keyFacts: [
      "Incisors are the chisel-shaped front teeth that cut and bite. Canines are pointed and tear food.",
      "Premolars and molars have broad, flat surfaces for crushing and grinding food.",
      "Children first have milk (baby) teeth, which are replaced by adult teeth. Adults normally have up to 32 teeth.",
      "Sugary food and drink damage teeth. Brushing twice a day with fluoride toothpaste and visiting a dentist help to protect them.",
      "Boundary: tooth types, jobs and care. Comparing the teeth of carnivores and herbivores is a good extension but the inner layers of a tooth are not expected.",
    ],
    misconceptions: [
      { mistake: "Humans only have one kind of tooth.", why: "Teeth look alike when pupils glance in a mirror.", response: "Use a mirror or a model jaw and trace the shapes from front to back, matching each to a job." },
      { mistake: "Milk teeth do not matter because they fall out.", why: "Pupils know they will be replaced.", response: "Explain that milk teeth hold space for adult teeth and can hurt if they decay." },
      { mistake: "Only sweets damage teeth.", why: "Sweets are the most familiar warning.", response: "Compare labels on drinks and snacks, and include fruit juice and fizzy drinks in the discussion." },
    ],
    vocabulary: [
      { term: "incisor", meaning: "A flat front tooth with a sharp edge for cutting." },
      { term: "canine", meaning: "A pointed tooth for tearing food." },
      { term: "premolar", meaning: "A tooth behind the canines with a broad surface for crushing." },
      { term: "molar", meaning: "A large back tooth with a broad surface for grinding." },
      { term: "enamel", meaning: "The hard outer layer that protects a tooth." },
      { term: "decay", meaning: "Damage to a tooth caused by sugar and bacteria." },
    ],
    before: "In Year 1 pupils learn about carnivores, herbivores and omnivores and in Year 2 about hygiene and eating the right amounts of different types of food. They have not yet named tooth types.",
    next: "Year 5 pupils study human growth and change to old age. Teeth are revisited when animals are compared and classified, and in key stage 3 nutrition and digestion.",
  },

  "food-chains": {
    statutory: ["construct and interpret a variety of food chains, identifying producers, predators and prey"],
    inBrief: "A food chain shows what eats what, starting with a plant that makes its own food. The arrows show the direction in which food, and energy, move.",
    keyFacts: [
      "A producer, usually a green plant, makes its own food. Animals cannot, so they are consumers.",
      "A predator hunts and eats other animals. Its prey is the animal it eats. An animal can be both predator and prey.",
      "Arrows point from the food to the eater: grass → rabbit → fox means the rabbit eats the grass and the fox eats the rabbit.",
      "Every chain starts with a producer. Chains are simple models, and in real habitats most animals eat more than one food.",
      "Boundary: building and reading short chains. Food webs, energy transfer figures and decomposers are not Year 4 expectations.",
    ],
    misconceptions: [
      { mistake: "The arrow means 'eats'.", why: "Pupils read the arrow as pointing from eater to food.", response: "Say 'gives food to' or 'is eaten by' while tracing each arrow, and rebuild one chain with the arrows reversed to show what changes." },
      { mistake: "Only predators in a chain matter, or the largest animal is the start.", why: "Big animals are the most memorable.", response: "Ask what each animal would do if the producer disappeared, so pupils see why the chain starts with a plant." },
      { mistake: "A rabbit can only be prey, and a fox only a predator.", why: "Roles are learned from a single example.", response: "Add a link to a chain, for example a frog that eats a beetle and is eaten by a heron, and ask which words fit the frog." },
    ],
    vocabulary: [
      { term: "food chain", meaning: "A line showing what eats what, with arrows from food to eater." },
      { term: "producer", meaning: "A living thing, such as a plant, that makes its own food." },
      { term: "consumer", meaning: "A living thing that eats other living things." },
      { term: "predator", meaning: "An animal that hunts and eats other animals." },
      { term: "prey", meaning: "An animal that is hunted and eaten." },
      { term: "herbivore", meaning: "An animal that eats only plants." },
    ],
    before: "In Year 2 pupils describe how animals obtain their food from plants and other animals using the idea of a simple food chain. In Year 3 they learn that animals cannot make their own food.",
    next: "Year 6 pupils learn how animals and plants are adapted to their environments. Food webs, energy flow and ecosystems are taught in key stage 3.",
  },

  // ------------------------------------------------------- States of matter
  "solids-liquids-and-gases": {
    statutory: ["compare and group materials together, according to whether they are solids, liquids or gases"],
    inBrief: "Materials exist as solids, liquids or gases, and each state behaves in its own way. Grouping by observed behaviour, not appearance, is the key skill.",
    keyFacts: [
      "Solids keep their own shape. Liquids flow and take the shape of the bottom of their container, forming a pool rather than a pile. Gases spread out to fill the container.",
      "Air is a mixture of gases, even though we cannot see it. Gases can be squashed more easily than solids or liquids.",
      "Powders and sand pour like liquids but each grain is a tiny solid. A heap of grains keeps a pile shape.",
      "Water can be a solid (ice), a liquid and a gas (water vapour), which makes it a good example of all three states.",
      "Boundary: describing and grouping materials by their behaviour. The particle model and arrangement of particles are key stage 3.",
    ],
    misconceptions: [
      { mistake: "Powders and sand are liquids because they pour.", why: "They flow and take on a container's shape.", response: "Look closely or with a magnifier: the grains are solid and keep their shape. A pile of sand stays a pile, unlike a liquid." },
      { mistake: "Gases are nothing, or air has no mass.", why: "Gases are usually invisible.", response: "Show air in a bag or balloon, feel it move, and show it pushes against a hand." },
      { mistake: "A flexible or soft solid, such as a sponge, is not a solid.", why: "Pupils link solid with hard.", response: "Ask whether the object keeps its own shape without a container." },
    ],
    vocabulary: [
      { term: "solid", meaning: "A material that keeps its own shape." },
      { term: "liquid", meaning: "A material that flows and takes the shape of its container's bottom." },
      { term: "gas", meaning: "A material that spreads out to fill its container." },
      { term: "state of matter", meaning: "Whether a material is a solid, a liquid or a gas." },
      { term: "material", meaning: "What something is made from." },
      { term: "property", meaning: "How a material looks or behaves." },
    ],
    before: "In Year 1 pupils name and group everyday materials by their simple physical properties, including water. In Year 2 they compare the suitability of materials for uses.",
    next: "Year 5 pupils use knowledge of solids, liquids and gases to decide how mixtures might be separated, and meet reversible changes. The particle model comes in key stage 3.",
  },

  "heating-and-cooling": {
    statutory: ["observe that some materials change state when they are heated or cooled, and measure or research the temperature at which this happens in degrees Celsius (°C)"],
    inBrief: "Heating and cooling can change a material's state without making a new material. Each material has its own melting and freezing temperature.",
    keyFacts: [
      "Melting is solid to liquid when heated. Freezing is liquid to solid when cooled. The material stays the same substance.",
      "Pure water freezes and ice melts at about 0 °C. Pure water boils at about 100 °C at normal air pressure.",
      "Different materials melt at different temperatures. Chocolate and butter melt at a little above room temperature, while iron needs a very high temperature.",
      "Temperature is measured in degrees Celsius with a thermometer or data logger. Size does not change a material's melting point.",
      "Boundary: reversible changes of state, using examples where no chemical change happens. Baking and burning are avoided. Pupils must not heat hot materials unsupervised.",
    ],
    misconceptions: [
      { mistake: "Melting makes a new material.", why: "Ice and water look and feel very different.", response: "Refreeze the water and show that the ice returns, so no new material was made." },
      { mistake: "A larger piece of the same material melts at a higher temperature.", why: "It takes longer to melt, so pupils think it needs more heat.", response: "Compare a small and a large ice cube. The time differs but the melting temperature stays about 0 °C." },
      { mistake: "Water always freezes at 0 °C and boils at 100 °C, whatever the conditions.", why: "These numbers are taught as fixed facts.", response: "Use 'about' and 'pure water at normal air pressure'. Only note that conditions can change the figures." },
    ],
    vocabulary: [
      { term: "melting", meaning: "Changing from a solid to a liquid when heated." },
      { term: "freezing", meaning: "Changing from a liquid to a solid when cooled." },
      { term: "melting point", meaning: "The temperature at which a solid turns to liquid." },
      { term: "degrees Celsius (°C)", meaning: "The unit used to measure temperature." },
      { term: "thermometer", meaning: "An instrument for measuring temperature." },
      { term: "reversible", meaning: "Able to change back again." },
    ],
    before: "In Year 2 pupils compare materials and see how some shapes change when squashed, bent, twisted and stretched. Year 4 is the first time pupils meet changes of state.",
    next: "Year 5 pupils demonstrate that dissolving, mixing and changes of state are reversible changes, and contrast them with burning. Particle explanations come in key stage 3.",
  },

  "evaporation-and-condensation": {
    statutory: ["identify the part played by evaporation and condensation in the water cycle and associate the rate of evaporation with temperature"],
    inBrief: "Evaporation turns liquid water into an invisible gas, and condensation turns it back into liquid droplets. Warmth makes evaporation faster.",
    keyFacts: [
      "Evaporation happens at the surface of a liquid and can happen well below boiling point. Puddles dry and washing dries without boiling.",
      "Water vapour is an invisible gas. Visible mist, steam clouds and clouds are tiny droplets of liquid water.",
      "Condensation happens when water vapour cools and turns back into liquid, such as droplets on a cold window or a cold glass.",
      "Evaporation is usually faster when it is warmer, windier or when there is more surface. A fair test changes one of these and keeps the others the same.",
      "Boundary: associating the rate with temperature and describing the changes. The particle explanation and humidity are not Year 4 expectations.",
    ],
    misconceptions: [
      { mistake: "Water only evaporates when it boils.", why: "Boiling is the most obvious way to see water vanish.", response: "Mark the water level in an open dish over several days to show that it falls without boiling." },
      { mistake: "The droplets on the outside of a cold glass leaked through the glass.", why: "Pupils cannot see the water in the air.", response: "Show that the outside of a dry cold glass becomes wet, and explain that water vapour from the air cooled and condensed." },
      { mistake: "The white 'steam' above a kettle is water vapour.", why: "It is called steam in everyday talk.", response: "Say that vapour is invisible and that the cloud we see is tiny droplets of liquid water." },
    ],
    vocabulary: [
      { term: "evaporation", meaning: "Liquid water turning into water vapour at its surface." },
      { term: "condensation", meaning: "Water vapour cooling and turning back into liquid droplets." },
      { term: "water vapour", meaning: "Water as an invisible gas." },
      { term: "droplet", meaning: "A tiny drop of liquid." },
      { term: "rate", meaning: "How fast something happens." },
      { term: "fair test", meaning: "A test where only one thing changes and everything else stays the same." },
    ],
    before: "In Year 3 pupils learn about rocks, soils and light, but they have not met evaporation or condensation. In Year 1 and Year 2 they notice weather and water in everyday contexts.",
    next: "Year 5 pupils use evaporating to separate mixtures, such as recovering salt from a solution. The particle model and boiling are in key stage 3.",
  },

  "the-water-cycle": {
    statutory: ["identify the part played by evaporation and condensation in the water cycle and associate the rate of evaporation with temperature"],
    inBrief: "Water moves between the sea, land, air and clouds in a continuous cycle driven by the Sun. Evaporation and condensation are the two changes of state that keep it going.",
    keyFacts: [
      "The Sun warms water in seas, lakes and puddles, and some of it evaporates into water vapour.",
      "Rising water vapour cools and condenses into tiny droplets, which make clouds. Clouds are droplets or ice crystals, not invisible vapour.",
      "Water falls as rain, hail, sleet or snow (precipitation), collects in rivers, lakes, soil and the sea, and the cycle continues.",
      "Plants also give out water vapour, but Year 4 pupils only need the main cycle of evaporation, condensation and precipitation.",
      "Boundary: the main stages and the part played by evaporation and condensation. Transpiration, groundwater and run-off detail are not expected.",
    ],
    misconceptions: [
      { mistake: "Clouds are made of water vapour.", why: "Clouds look like steam and vapour is described as 'in the air'.", response: "Explain that vapour is invisible and clouds are made of tiny liquid droplets or ice crystals." },
      { mistake: "Rain is made in clouds from nothing, or water is 'used up' once it rains.", why: "Pupils do not see the water's earlier journey.", response: "Trace one drop all the way round the diagram, showing it is the same water that keeps moving." },
      { mistake: "The cycle only happens over the sea.", why: "Diagrams usually show a sea and a mountain.", response: "Add puddles, lakes and wet washing to the diagram, since evaporation happens wherever there is liquid water." },
    ],
    vocabulary: [
      { term: "water cycle", meaning: "The way water moves around between the Earth and the air." },
      { term: "evaporation", meaning: "Liquid water turning into water vapour." },
      { term: "condensation", meaning: "Water vapour cooling into droplets." },
      { term: "precipitation", meaning: "Water falling from clouds as rain, hail, sleet or snow." },
      { term: "cloud", meaning: "A mass of tiny water droplets or ice crystals." },
      { term: "collect", meaning: "Gather in one place, as rainwater does in rivers and the sea." },
    ],
    before: "In Year 1 pupils observe seasonal changes and weather. In earlier years they meet water as a material, but not the cycle itself.",
    next: "Year 5 pupils study Earth and space and changes of state in materials. Water cycle detail returns in key stage 3 science and in geography.",
  },

  // ---------------------------------------------------------------- Sound
  "sounds-and-vibrations": {
    statutory: ["identify how sounds are made, associating some of them with something vibrating"],
    inBrief: "Every sound is made by something vibrating, which means moving to and fro very quickly. Some vibrations are too small or fast to see, but they can be felt or shown.",
    keyFacts: [
      "A vibration is a rapid to-and-fro movement. A struck drum, a plucked string and a hummed throat all vibrate.",
      "When the vibration stops, the sound stops. Touching a ringing bell or ruler makes it go quiet.",
      "Vibrations can be shown: rice or sand jumping on a drum skin, ripples in water, or a hand on the throat while humming.",
      "Different instruments make sound in different ways, such as by striking, plucking, blowing or scraping, but all rely on vibration.",
      "Boundary: linking sound sources to vibrations. How sound travels, pitch and volume are covered in separate Year 4 topics.",
    ],
    misconceptions: [
      { mistake: "Sound is made by the instrument itself, not by movement.", why: "Instruments seem to 'have' sound inside them.", response: "Sprinkle rice on a drum and tap it. Show the rice jumping, then stop the drum with a hand and show the sound stops." },
      { mistake: "If we cannot see something move, it is not vibrating.", why: "Fast small vibrations look still.", response: "Use a ruler on the desk edge, then a tuning fork touched to water, to make small vibrations visible." },
      { mistake: "Only musical instruments make vibrations.", why: "Pupils connect sound with music.", response: "Collect everyday sounds, such as a door slam or a voice, and find the vibrating part for each." },
    ],
    vocabulary: [
      { term: "vibration", meaning: "A quick movement to and fro." },
      { term: "sound source", meaning: "The object that makes a sound." },
      { term: "instrument", meaning: "An object made to produce sounds." },
      { term: "strike", meaning: "Hit something to make it vibrate." },
      { term: "pluck", meaning: "Pull and release a string." },
      { term: "tuning fork", meaning: "A metal fork that vibrates with a clear note when struck." },
    ],
    before: "In Year 1 pupils use their senses, including hearing, but they have not explored how sound is made. Year 3 Science has no sound unit.",
    next: "Year 6 pupils study light and how we see. Sound waves, frequency and amplitude are taught in key stage 3.",
  },

  "how-sound-travels": {
    statutory: ["recognise that vibrations from sounds travel through a medium to the ear"],
    inBrief: "Sound needs a material to travel through, called a medium. The vibrations pass through the medium to our ears, where we hear them.",
    keyFacts: [
      "A medium is any solid, liquid or gas that carries vibrations. Air is the medium we hear through most often.",
      "Sound also travels through water and solids, such as a wall or a table.",
      "Sound cannot travel through a vacuum, which is a space with no material in it.",
      "The vibrations make our eardrums vibrate, and the ear sends a message to the brain.",
      "Boundary: sound travelling through a medium to the ear. Pupils do not need the speed of sound or the parts inside the ear.",
    ],
    misconceptions: [
      { mistake: "Sound only travels through air.", why: "Air is the medium we use every day.", response: "Hold a ticking watch to the ear through a table or listen to a tap underwater in a bath, then ask what carried the sound." },
      { mistake: "Sound travels through space because explosions are loud in films.", why: "Films add sound to space scenes.", response: "Explain that space is a vacuum, so no material can pass the vibrations along." },
      { mistake: "Sound is something that travels on its own, not vibrations of a material.", why: "Pupils picture sound as a thing flying through the air.", response: "Act it out with a line of pupils passing a nudge along, with each one moving only a little." },
    ],
    vocabulary: [
      { term: "medium", meaning: "The material, solid, liquid or gas, that sound travels through." },
      { term: "vacuum", meaning: "A space with no material in it." },
      { term: "vibrations", meaning: "Quick to-and-fro movements that carry sound." },
      { term: "ear", meaning: "The part of the body that detects sound." },
      { term: "travel", meaning: "Move from one place to another." },
      { term: "source", meaning: "Where a sound starts." },
    ],
    before: "In Year 1 pupils name the ear as the sense organ for hearing. They have not yet explored how sound reaches the ear.",
    next: "Key stage 3 pupils study sound waves, their speed in different media and how the ear works.",
  },

  "changing-pitch": {
    statutory: ["find patterns between the pitch of a sound and features of the object that produced it"],
    inBrief: "Pitch is how high or low a sound is. Shorter, thinner or tighter vibrating objects usually make higher sounds.",
    keyFacts: [
      "Higher-pitched sounds come from faster vibrations. Lower-pitched sounds come from slower vibrations.",
      "A shorter vibrating string, a thinner string or a tighter string makes a higher pitch. A longer, thicker or looser one makes a lower pitch.",
      "A shorter length of ruler sticking out from a desk edge, or a smaller bottle with less air to blow across, makes a higher note.",
      "A fair test changes one feature, such as string length, and keeps the material, thickness and tightness the same.",
      "Boundary: finding patterns in how features affect pitch. Pupils do not need the word frequency or hertz.",
    ],
    misconceptions: [
      { mistake: "High pitch means loud.", why: "In everyday talk, 'high' and 'loud' are mixed up.", response: "Play a quiet high note and a loud low note, and sort them on two lines, one for pitch and one for volume." },
      { mistake: "A bigger object always makes a higher sound.", why: "Pupils expect size to give more of everything.", response: "Test strings or rulers of different lengths and let the data show that longer means lower pitch." },
      { mistake: "In a water-glass test, the fuller glass makes the lower note.", why: "Pupils think the more water, the more 'weight' and so lower pitch.", response: "Be clear about what is vibrating: tapping makes the glass and water vibrate, so more water gives a lower note, but blowing across a bottle makes the air column vibrate, so more water gives a higher note." },
    ],
    vocabulary: [
      { term: "pitch", meaning: "How high or low a sound is." },
      { term: "high-pitched", meaning: "A sound that is high, like a whistle." },
      { term: "low-pitched", meaning: "A sound that is low, like a drum." },
      { term: "pattern", meaning: "Something that happens again and again in the same way." },
      { term: "tension", meaning: "How tight a string is stretched." },
      { term: "length", meaning: "How long the vibrating part is." },
    ],
    before: "Pupils have met sources of sound and vibrations in this year's earlier sound topics. Year 3 includes no pitch work.",
    next: "Key stage 3 pupils link pitch to the frequency of sound waves, measured in hertz.",
  },

  "volume-and-vibrations": {
    statutory: ["find patterns between the volume of a sound and the strength of the vibrations that produced it"],
    inBrief: "Stronger vibrations make louder sounds, and gentler vibrations make quieter ones. Volume is separate from pitch.",
    keyFacts: [
      "Hitting a drum harder, plucking a string harder or blowing harder makes bigger vibrations and a louder sound.",
      "Gentler action makes smaller vibrations and a quieter sound.",
      "Volume and pitch are different: a sound can be loud and low, or quiet and high.",
      "Very loud sounds can damage hearing, so pupils should be taught to protect their ears.",
      "Boundary: finding the pattern between strength of vibration and volume. Decibels and the idea of amplitude are not Year 4 expectations.",
    ],
    misconceptions: [
      { mistake: "A louder sound is also a higher sound.", why: "Everyday language mixes up high and loud.", response: "Make two lines for pitch and volume and sort a mixed set of sounds on both." },
      { mistake: "Louder sounds vibrate faster.", why: "More energy seems to mean faster movement.", response: "Show that the same string, hit harder, moves further but at the same pitch." },
      { mistake: "Volume only depends on the instrument, not how it is played.", why: "Pupils link loudness to the object, such as a drum or a triangle.", response: "Play one instrument softly and then loudly, observing rice or the string moving more or less." },
    ],
    vocabulary: [
      { term: "volume", meaning: "How loud or quiet a sound is." },
      { term: "loud", meaning: "A sound with a large volume." },
      { term: "quiet", meaning: "A sound with a small volume." },
      { term: "strength", meaning: "How big and forceful a vibration is." },
      { term: "pattern", meaning: "A link that appears again and again in results." },
      { term: "ear protection", meaning: "Something that protects your ears from very loud sounds." },
    ],
    before: "Pupils have identified sounds as vibrations earlier in this unit. Earlier years use only everyday words such as loud and quiet.",
    next: "Key stage 3 pupils link volume to the amplitude of a sound wave and meet decibels.",
  },

  "sound-and-distance": {
    statutory: ["recognise that sounds get fainter as the distance from the sound source increases"],
    inBrief: "A sound seems quieter the further you are from where it starts. A fair test keeps the sound the same and changes only the distance.",
    keyFacts: [
      "As sound spreads out from its source, the vibrations get weaker, so the sound is fainter further away.",
      "The sound source must stay the same, such as the same bell hit the same way, and only the listener's distance changes.",
      "Measure distances in metres with a tape measure and record them in a table.",
      "Barriers and surroundings matter. Soft materials absorb sound and can make it fainter, which is how sound insulation works.",
      "Boundary: noticing and recording the pattern. How far sound travels and how fast are not Year 4 expectations.",
    ],
    misconceptions: [
      { mistake: "The sound is the same everywhere in a room, but we just stop paying attention.", why: "Pupils think their ears, not the sound, change.", response: "Use a sound meter app or a repeated blind test to show the fall in volume with distance." },
      { mistake: "The sound stops at the point we can no longer hear it.", why: "Fainter sounds seem to vanish.", response: "Explain that the vibrations become too weak for our ears, not that the sound has stopped." },
      { mistake: "To test distance you can also change how hard you hit the source.", why: "Pupils do not control all the variables.", response: "Agree what stays the same: the same object, the same strike, the same place. Only distance changes." },
    ],
    vocabulary: [
      { term: "distance", meaning: "How far one place is from another." },
      { term: "fainter", meaning: "Quieter and harder to hear." },
      { term: "sound source", meaning: "Where the sound starts." },
      { term: "variable", meaning: "Something that can change in a test." },
      { term: "insulation", meaning: "A material that reduces how much sound passes through." },
      { term: "metre", meaning: "A unit for measuring length and distance." },
    ],
    before: "Pupils have met sources and volume earlier in this unit. In Year 3 they have used fair tests in other topics, such as shadows.",
    next: "Key stage 3 pupils explain the weakening of sound with distance using waves and energy.",
  },

  // ----------------------------------------------------------- Electricity
  "electrical-appliances-and-safety": {
    statutory: ["identify common appliances that run on electricity"],
    inBrief: "Many everyday devices use electricity, from a battery or the mains. Electricity is useful but dangerous, so safety rules matter.",
    keyFacts: [
      "Mains appliances plug into sockets, for example a kettle, fridge, television or toaster. Battery appliances use cells, for example a torch or a remote control.",
      "Some devices can use both, such as a laptop with a charger and a battery.",
      "Mains electricity can cause serious injury. Pupils must never touch sockets, plugs with damaged wires, or put objects in sockets, and must keep water away from electrical items.",
      "Classroom circuit work uses suitable low-voltage cells only, with an adult present.",
      "Boundary: identifying appliances and following safety rules. Pupils may use the words current and voltage, but these should not be introduced or defined formally.",
    ],
    misconceptions: [
      { mistake: "Anything with a switch or a light uses electricity.", why: "Switches and lights are strongly associated with electricity.", response: "Sort a mixed set: a wind-up torch, a hand whisk and a candle versus an electric lamp, then check each for a power source." },
      { mistake: "Batteries are always safe, so mains and batteries are equally safe.", why: "Cells in school circuits cause no harm.", response: "Explain that mains electricity is much more powerful and can seriously hurt people, which is why we never experiment with it." },
      { mistake: "Appliances that have no wire do not use electricity.", why: "Pupils look only for a plug and a cable.", response: "Look for a battery compartment or a charging port to identify the power supply." },
    ],
    vocabulary: [
      { term: "appliance", meaning: "A machine or device that does a job, often using electricity." },
      { term: "mains electricity", meaning: "Electricity from sockets in the wall." },
      { term: "battery", meaning: "One or more cells that store energy and supply electricity." },
      { term: "cell", meaning: "A single source of electricity, such as in a torch." },
      { term: "socket", meaning: "The place on a wall where plugs go in." },
      { term: "danger", meaning: "Something that could cause harm." },
    ],
    before: "In Year 1 and Year 2 pupils learn about everyday materials and their uses, but have no electricity unit. Year 4 is the first formal electricity topic.",
    next: "Year 6 pupils associate the brightness of a lamp or volume of a buzzer with the number and voltage of cells, and use recognised circuit symbols.",
  },

  "simple-series-circuits": {
    statutory: ["construct a simple series electrical circuit, identifying and naming its basic parts, including cells, wires, bulbs, switches and buzzers"],
    inBrief: "A simple series circuit has its parts joined in one continuous loop. Naming the parts and tracing the loop is the foundation of everything in electricity.",
    keyFacts: [
      "A cell (or battery of cells) supplies the electricity. Wires join the parts. A bulb lights, a buzzer makes a sound and a switch controls the loop.",
      "In a series circuit there is one path, so there is one loop from one terminal of the cell, through the parts, to the other.",
      "A cell has two terminals, and both must be connected for the circuit to work.",
      "Pupils draw circuits as pictures, not conventional symbols. The words bulb and lamp are both used.",
      "Boundary: building and naming a series circuit with low-voltage cells. Symbols are introduced in Year 6, and parallel circuits are not expected.",
    ],
    misconceptions: [
      { mistake: "Electricity is used up in the bulb, so one wire from the cell to the bulb is enough.", why: "Pupils picture electricity flowing out of the cell like water from a tap.", response: "Build it with one wire and see it fail, then add the second wire and show the loop is needed." },
      { mistake: "A battery and a cell are the same thing.", why: "In everyday life a torch cell is called a battery.", response: "Say that a battery is two or more cells joined together, while a single cell can be called a cell." },
      { mistake: "The bulb must be next to the cell.", why: "Pupils think position matters rather than the connection.", response: "Rearrange the same parts in the same loop and show the bulb still lights." },
    ],
    vocabulary: [
      { term: "circuit", meaning: "A path that electricity can go all the way round." },
      { term: "series circuit", meaning: "A circuit with one loop and no branches." },
      { term: "cell", meaning: "A part that supplies electricity." },
      { term: "bulb", meaning: "A part that gives out light when electricity passes through it." },
      { term: "buzzer", meaning: "A part that makes a sound when electricity passes through it." },
      { term: "terminal", meaning: "One of the two connecting ends of a cell." },
      { term: "component", meaning: "A part of a circuit." },
    ],
    before: "Pupils met electrical appliances earlier this year. There is no circuit work in Years 1 to 3.",
    next: "Year 6 pupils draw circuits using recognised symbols, and link the brightness of a lamp or volume of a buzzer to the number and voltage of cells. Parallel circuits come in key stage 3.",
  },

  "complete-and-incomplete-circuits": {
    statutory: ["identify whether or not a lamp will light in a simple series circuit, based on whether or not the lamp is part of a complete loop with a battery"],
    inBrief: "A bulb lights only when it is part of a complete loop with a cell. Any gap, loose wire or missing connection stops it.",
    keyFacts: [
      "Both terminals of the cell must be connected through the components. Touching only one terminal is not enough.",
      "Common faults include a gap in the wire, a loose connection, a switch left open and a missing cell.",
      "A bulb can fail to light even in a complete loop if it is broken (its filament has gone) or if the cell is flat.",
      "Debugging a circuit means tracing the loop with a finger, checking each connection and the components in turn.",
      "Boundary: judging whether a lamp will light from a picture or a build. Pupils do not need to explain the flow of current.",
    ],
    misconceptions: [
      { mistake: "A bulb touching the cell is enough to light it.", why: "Pupils think the bulb takes electricity from the cell directly.", response: "Show that it also needs the second connection. Trace both terminals with a finger." },
      { mistake: "If a bulb is connected at both ends it must light.", why: "Pupils check connections but not the other parts.", response: "Test the bulb and cell in a circuit that is known to work to find the faulty part." },
      { mistake: "The bulb nearer the cell lights first, and the other lights later.", why: "Pupils think of electricity as a moving fluid.", response: "Show that in a complete series circuit the effect appears at the same time everywhere." },
    ],
    vocabulary: [
      { term: "complete circuit", meaning: "A circuit with no gaps, so electricity can go all the way round." },
      { term: "incomplete circuit", meaning: "A circuit with a gap, so electricity cannot flow." },
      { term: "loop", meaning: "A path that goes round and returns to where it started." },
      { term: "gap", meaning: "A break in the circuit." },
      { term: "connection", meaning: "A join between two parts of a circuit." },
      { term: "fault", meaning: "A problem that stops a circuit from working." },
    ],
    before: "Pupils have named the parts of a series circuit earlier this year.",
    next: "Year 6 pupils explore how the number and voltage of cells change the brightness of a lamp. Current is explained properly in key stage 3.",
  },

  "switches": {
    statutory: ["recognise that a switch opens and closes a circuit and associate this with whether or not a lamp lights in a simple series circuit"],
    inBrief: "A switch is a deliberate gap that can be closed or opened. Closing the switch completes the loop and the bulb lights; opening it breaks the loop.",
    keyFacts: [
      "A closed switch has its contacts touching, so the circuit is complete and the lamp lights. An open switch has a gap, so the lamp is off.",
      "The words are easy to reverse: 'closed' means the circuit is on and 'open' means off.",
      "A switch can go anywhere in a series loop and still control the whole circuit.",
      "Switches let us control devices safely, such as a torch, a light or a doorbell. Pupils can make a simple switch from a paper clip and two drawing pins.",
      "Boundary: open and closed switches and their effect on a bulb. Pupils do not need circuit symbols or two-way switches.",
    ],
    misconceptions: [
      { mistake: "An open switch means electricity is allowed through.", why: "In everyday talk, 'open' means ready to let things in.", response: "Use a door metaphor carefully: an open drawbridge leaves a gap, so nothing can cross. Test with a real circuit." },
      { mistake: "The switch has to be next to the bulb or the cell to work.", why: "Pupils think a switch controls only the part beside it.", response: "Move the switch around the loop and see that it controls the bulb from any place." },
      { mistake: "A switch makes the electricity.", why: "Pressing a switch seems to start something.", response: "Stress that the cell supplies electricity and the switch only opens or closes the loop." },
    ],
    vocabulary: [
      { term: "switch", meaning: "A part that opens or closes a gap in a circuit." },
      { term: "open switch", meaning: "A switch with a gap, so the circuit is broken." },
      { term: "closed switch", meaning: "A switch with its contacts joined, so the circuit is complete." },
      { term: "contact", meaning: "A metal part that touches another to make a connection." },
      { term: "control", meaning: "Decide when something is on or off." },
    ],
    before: "Pupils have built series circuits and judged complete and incomplete loops earlier this year.",
    next: "Year 6 pupils draw switches using the recognised circuit symbol. Key stage 3 pupils study circuits in more depth.",
  },

  "conductors-and-insulators": {
    statutory: ["recognise some common conductors and insulators, and associate metals with being good conductors"],
    inBrief: "Conductors let electricity pass through and insulators do not. Metals are generally good conductors, and materials such as plastic, wood and rubber are insulators.",
    keyFacts: [
      "To test a material, place it in a gap in a complete circuit. If the bulb lights, the material is a conductor.",
      "Most metals are good conductors. Copper is used for wires, and steel and aluminium also conduct.",
      "Plastic, rubber, glass, dry wood and fabric are insulators. They are used to cover wires and plugs for safety.",
      "Graphite (pencil lead) is a non-metal that conducts, and a surface coating of paint or rust can stop a metal item from conducting at the test point.",
      "Boundary: testing and sorting common materials with low-voltage cells. Pupils must never test using mains electricity.",
    ],
    misconceptions: [
      { mistake: "All shiny things conduct.", why: "Shininess is a visible metal property.", response: "Test a shiny plastic wrapper and a painted metal object and compare with bare metals." },
      { mistake: "Water, or anything wet, is safe to use near electricity.", why: "Pure water does not conduct well in a classroom test, so pupils overgeneralise.", response: "Explain that everyday water contains dissolved substances and conducts, so water and mains electricity never mix." },
      { mistake: "Insulators stop electricity being dangerous, so a plastic-coated wire can be handled when damaged.", why: "Pupils trust any covering.", response: "Say that damaged insulation makes a wire unsafe and a grown-up must always be told." },
    ],
    vocabulary: [
      { term: "conductor", meaning: "A material that lets electricity pass through it." },
      { term: "insulator", meaning: "A material that does not let electricity pass through it." },
      { term: "metal", meaning: "A hard, shiny material that is usually a good conductor." },
      { term: "test circuit", meaning: "A circuit with a gap where a material is placed to test it." },
      { term: "prediction", meaning: "What you think will happen and why." },
      { term: "fair test", meaning: "A test where only one thing changes." },
    ],
    before: "In Year 1 and Year 2 pupils name everyday materials, group them by properties and compare their suitability for uses. They have not yet grouped materials by electrical conduction.",
    next: "Year 5 pupils compare materials by properties including electrical and thermal conductivity. Year 6 pupils work with circuit symbols and cells.",
  },
};
