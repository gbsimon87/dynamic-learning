// Public editorial content only. Topic names and counts are read from the app registry.
// Reviewed against docs/curriculum/ mappings; no learner state belongs here.
export const GUIDE_SUBJECTS = {
  "math": {
    "name": "Maths",
    "icon": "🧮",
    "doodle": "1, 2, 3…",
    "caption": "Let’s work it out!",
    "eyebrow": "A world of numbers to explore",
    "practical": "Use Bix alongside teaching and real-world practice: measuring objects, drawing on paper and handling shapes and quantities.",
    "introStep": "Short lessons and worked examples introduce each idea."
  },
  "english": {
    "name": "English",
    "icon": "📚",
    "doodle": "Once upon…",
    "caption": "Every word opens a door.",
    "eyebrow": "Words, stories and bright ideas",
    "practical": "Keep reading whole books, talking about stories, reading aloud and practising handwriting and independent writing. Structured screen activities do not assess those skills.",
    "introStep": "Explore words and short texts, with prompts and examples to help."
  },
  "geography": {
    "name": "Geography",
    "icon": "🌍",
    "doodle": "Near & far",
    "caption": "Where shall we explore?",
    "eyebrow": "Places, patterns and new perspectives",
    "practical": "Maps and supplied data rehearse geographical skills. Real local fieldwork, outdoor observation, independent sketch maps and presenting your own findings still need grown-up support.",
    "introStep": "Explore maps, place evidence and short explanations before using the clues."
  },
  "science": {
    "name": "Science",
    "icon": "🔬",
    "doodle": "What if…?",
    "caption": "Let’s look a little closer.",
    "eyebrow": "Small questions, wonderful discoveries",
    "practical": "Diagrams and supplied results rehearse scientific enquiry. They do not show that your child has performed an experiment. Real observation, measurement and practical enquiry need grown-up support.",
    "introStep": "Look closely at pictures, diagrams and supplied observations."
  },
  "history": {
    "name": "History",
    "icon": "🏛️",
    "doodle": "Then → now",
    "caption": "Follow the clues with me.",
    "eyebrow": "The past has a story to tell",
    "practical": "Timelines and sources build historical understanding. Talk through different viewpoints together and explore real local history with a grown-up; pictured examples are not a study of your child’s own locality.",
    "introStep": "Explore pictures, short accounts and source clues about the past."
  }
};

export const CURRICULUM_GUIDES = [
  {
    "year": 1,
    "subject": "math",
    "slug": "year-1-maths",
    "path": "/curriculum-guide/year-1-maths",
    "label": "Year 1 Maths",
    "intro": "Counting, sharing and spotting shapes. A friendly first adventure with numbers.",
    "fit": "For children beginning to count, compare quantities and explore simple number stories. A grown-up can help read the questions.",
    "areas": [
      {
        "categoryId": "number---number-and-place-value",
        "title": "Number and Place Value",
        "icon": "🍎",
        "description": "Count, read and compare numbers to 100, with number words to 20 and counting in twos, fives and tens.",
        "example": "What comes after 39?",
        "colour": "mint"
      },
      {
        "categoryId": "number---addition-and-subtraction",
        "title": "Addition and Subtraction",
        "icon": "➕",
        "description": "Add and subtract within 20. Explore number bonds, missing numbers and simple picture problems.",
        "example": "7 and 3 make 10.",
        "colour": "rose"
      },
      {
        "categoryId": "number---multiplication-and-division",
        "title": "Multiplication and Division",
        "icon": "🔵",
        "description": "Make equal groups, share objects and double small quantities with pictures.",
        "example": "Share 8 counters between 2 groups.",
        "colour": "gold"
      },
      {
        "categoryId": "number---fractions",
        "title": "Fractions",
        "icon": "🍊",
        "description": "Find halves and quarters of shapes and small groups. Look for equal parts.",
        "example": "Are both halves the same size?",
        "colour": "lilac"
      },
      {
        "categoryId": "measurement",
        "title": "Measurement",
        "icon": "📏",
        "description": "Compare lengths, mass and capacity. Recognise coins and notes, order events and read o’clock and half past.",
        "example": "The long hand points to 6…",
        "colour": "mint"
      },
      {
        "categoryId": "geometry-properties-of-shapes",
        "title": "Properties of Shapes",
        "icon": "🔺",
        "description": "Name familiar flat and solid shapes, including triangles, rectangles, cubes and spheres.",
        "example": "Which shape can you spot?",
        "colour": "rose"
      },
      {
        "categoryId": "geometry-position-and-direction",
        "title": "Position and Direction",
        "icon": "📍",
        "description": "Describe where things are, follow movements and explore whole, half and quarter turns.",
        "example": "Move left. Make a half-turn.",
        "colour": "gold"
      }
    ],
    "games": [
      {
        "to": "/number-bonds",
        "icon": "🔗",
        "label": "Number Bonds",
        "description": "Find pairs that make a total"
      },
      {
        "to": "/reading-numbers",
        "icon": "🔢",
        "label": "Reading Numbers",
        "description": "Match numbers and words"
      },
      {
        "to": "/clock-generator",
        "icon": "⏰",
        "label": "Clock Generator",
        "description": "Explore clock faces"
      }
    ],
    "alignment": "Topics are mapped to the Year 1 mathematics programme of study for England."
  },
  {
    "year": 1,
    "subject": "english",
    "slug": "year-1-english",
    "path": "/curriculum-guide/year-1-english",
    "label": "Year 1 English",
    "intro": "Sounds become words. Words become stories. Start exploring reading and writing with Bix.",
    "fit": "For early readers beginning to connect letters and sounds, build simple words and make sense of short sentences.",
    "areas": [
      {
        "categoryId": "spelling---letters-and-sounds",
        "title": "Spelling · Letters and Sounds",
        "icon": "🔤",
        "description": "Explore the alphabet and common letter patterns, including double letters, ck, nk and tch.",
        "example": "Which letters finish the word?",
        "colour": "mint"
      },
      {
        "categoryId": "reading---phonics",
        "title": "Reading · Phonics",
        "icon": "🧩",
        "description": "Blend sounds, read tricky and longer words, and recognise contractions in reading.",
        "example": "Put the sounds together.",
        "colour": "rose"
      },
      {
        "categoryId": "grammar---words",
        "title": "Grammar · Words",
        "icon": "🐶",
        "description": "Explore plurals, simple word endings, un- and compound words.",
        "example": "One wish. Two wishes.",
        "colour": "gold"
      },
      {
        "categoryId": "reading---stories",
        "title": "Reading · Stories",
        "icon": "🏰",
        "description": "Meet traditional tales, think about characters and predict what might happen next.",
        "example": "What clue tells you how they feel?",
        "colour": "lilac"
      },
      {
        "categoryId": "spelling---vowel-sounds",
        "title": "Spelling · Vowel Sounds",
        "icon": "🚂",
        "description": "Practise different ways of spelling vowel sounds, from ai and ay to air and ear.",
        "example": "Same sound. Different spelling.",
        "colour": "mint"
      },
      {
        "categoryId": "grammar---sentences",
        "title": "Grammar · Sentences",
        "icon": "🧱",
        "description": "Build sentences with spaces, capital letters, end marks and the joining word “and”.",
        "example": "Where does the full stop belong?",
        "colour": "rose"
      },
      {
        "categoryId": "reading---poems-and-facts",
        "title": "Reading · Poems and Facts",
        "icon": "🎵",
        "description": "Enjoy rhymes and repeated phrases. Explore word meanings, facts and stories.",
        "example": "Can you find the rhyming words?",
        "colour": "gold"
      },
      {
        "categoryId": "writing---composition",
        "title": "Writing · Composition",
        "icon": "🏗️",
        "description": "Build and order sentences, check meaning and practise short dictation tasks.",
        "example": "Put the story in order.",
        "colour": "lilac"
      }
    ],
    "games": [
      {
        "to": "/word-builder",
        "icon": "🔤",
        "label": "Word Builder",
        "description": "Put letters together"
      },
      {
        "to": "/sight-word-pop",
        "icon": "🎈",
        "label": "Sight Word Pop",
        "description": "Spot familiar words"
      },
      {
        "to": "/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Make a sentence"
      }
    ],
    "alignment": "Topics are mapped to the Year 1 english programme of study for England."
  },
  {
    "year": 1,
    "subject": "geography",
    "slug": "year-1-geography",
    "path": "/curriculum-guide/year-1-geography",
    "label": "Year 1 Geography",
    "intro": "Start close to home. Discover maps, weather and a much bigger world.",
    "fit": "For children beginning to describe familiar places, follow directions and explore where things are on a map.",
    "areas": [
      {
        "categoryId": "our-place",
        "title": "Our Place",
        "icon": "🏫",
        "description": "Explore school surroundings, human and physical features, and views from above.",
        "example": "A building or a natural feature?",
        "colour": "mint"
      },
      {
        "categoryId": "the-united-kingdom",
        "title": "The United Kingdom",
        "icon": "🇬🇧",
        "description": "Find the four UK countries, their capital cities and the surrounding seas.",
        "example": "Where is Wales on the map?",
        "colour": "rose"
      },
      {
        "categoryId": "the-wider-world",
        "title": "The Wider World",
        "icon": "🗺️",
        "description": "Meet the seven continents and five oceans, and explore broad hot and cold patterns.",
        "example": "Land or ocean?",
        "colour": "gold"
      },
      {
        "categoryId": "weather-and-exploring",
        "title": "Weather and Exploring",
        "icon": "🌦️",
        "description": "Notice UK weather and seasons. Follow routes and read simple maps.",
        "example": "Which direction comes next?",
        "colour": "lilac"
      }
    ],
    "games": [
      {
        "to": "/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/find-the-city",
        "icon": "📍",
        "label": "Find the City",
        "description": "Put places on the map"
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 1 (Years 1–2). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 1,
    "subject": "science",
    "slug": "year-1-science",
    "path": "/curriculum-guide/year-1-science",
    "label": "Year 1 Science",
    "intro": "Plants, paws and everyday wonders. Start noticing what makes the world work.",
    "fit": "For curious beginners learning to name, notice, compare and sort things around them. Talk through the pictures together.",
    "areas": [
      {
        "categoryId": "plants",
        "title": "Plants",
        "icon": "🌼",
        "description": "Name common plants and trees. Spot roots, stems, leaves and flowers, and compare evergreen and deciduous trees.",
        "example": "Which part grows below the ground?",
        "colour": "mint"
      },
      {
        "categoryId": "animals-including-humans",
        "title": "Animals, including humans",
        "icon": "🐸",
        "description": "Explore animal groups, diets and bodies, then discover human body parts and the five senses.",
        "example": "Feathers, fins or fur?",
        "colour": "rose"
      },
      {
        "categoryId": "everyday-materials",
        "title": "Everyday materials",
        "icon": "🥄",
        "description": "Tell objects from materials. Name, describe and group materials by their properties.",
        "example": "The spoon is the object. What is it made of?",
        "colour": "gold"
      },
      {
        "categoryId": "seasonal-changes",
        "title": "Seasonal changes",
        "icon": "🍂",
        "description": "Explore UK seasons, weather and changes in day length through the year.",
        "example": "How does winter daylight compare with summer?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "🌼",
        "title": "Notice a plant",
        "description": "Look at its leaves, stem and flowers together."
      },
      {
        "icon": "🧵",
        "title": "Sort some materials",
        "description": "Compare familiar objects: hard, soft, smooth or rough?"
      },
      {
        "icon": "☁️",
        "title": "Watch the weather",
        "description": "Describe what you notice outside today."
      }
    ],
    "alignment": "Topics are mapped to the Year 1 science programme of study for England."
  },
  {
    "year": 1,
    "subject": "history",
    "slug": "year-1-history",
    "path": "/curriculum-guide/year-1-history",
    "label": "Year 1 History",
    "intro": "Old toys, first flights and clues down your street. Discover the stories behind then and now.",
    "fit": "For children beginning to use words such as before, after, old and new, and ask how we know about the past.",
    "areas": [
      {
        "categoryId": "then-and-now",
        "title": "Then and Now",
        "icon": "🧸",
        "description": "Compare toys, homes, schools and seaside holidays in the past and today.",
        "example": "What changed? What stayed familiar?",
        "colour": "mint"
      },
      {
        "categoryId": "the-first-flight",
        "title": "The First Flight",
        "icon": "✈️",
        "description": "Meet the Wright brothers and compare the first powered flight with flying today.",
        "example": "What can a photograph tell us?",
        "colour": "rose"
      },
      {
        "categoryId": "explorers",
        "title": "Explorers",
        "icon": "⛵",
        "description": "Meet Christopher Columbus and Neil Armstrong. Compare journeys by ship and spacecraft.",
        "example": "Two journeys. Very different equipment.",
        "colour": "gold"
      },
      {
        "categoryId": "kings-and-queens",
        "title": "Kings and Queens",
        "icon": "👑",
        "description": "Explore Elizabeth I and Victoria, using portraits and other clues to compare their lives.",
        "example": "What can you spot in this portrait?",
        "colour": "lilac"
      },
      {
        "categoryId": "clues-around-you",
        "title": "Clues Around You",
        "icon": "🏚️",
        "description": "Look for signs of the past in buildings and street names through pictured examples.",
        "example": "What might “Mill Lane” tell us?",
        "colour": "mint"
      }
    ],
    "activities": [
      {
        "icon": "🧸",
        "title": "Compare toys",
        "description": "Ask a grown-up about a toy they remember."
      },
      {
        "icon": "📷",
        "title": "Look at an old photo",
        "description": "What clues suggest it was taken long ago?"
      },
      {
        "icon": "🏠",
        "title": "Spot a clue",
        "description": "With a grown-up, look for an old date on a building."
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 1 (Years 1–2). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 2,
    "subject": "math",
    "slug": "year-2-maths",
    "path": "/curriculum-guide/year-2-maths",
    "label": "Year 2 Maths",
    "intro": "Number patterns, equal groups and everyday maths. Build on the basics with Bix.",
    "fit": "For children building on counting to 100, adding and subtracting within 20, and recognising halves and quarters.",
    "areas": [
      {
        "categoryId": "number---number-and-place-value",
        "title": "Number and Place Value",
        "icon": "🔢",
        "description": "Explore tens and ones, numbers to 100 and counting in steps of 2, 3, 5 and 10.",
        "example": "Which is greater: 46 or 64?",
        "colour": "mint"
      },
      {
        "categoryId": "number---addition-and-subtraction",
        "title": "Addition and Subtraction",
        "icon": "👯",
        "description": "Work with two-digit numbers, missing numbers and number problems. Use linked facts to check answers.",
        "example": "If 8 + 7 = 15, then 15 − 7 = …",
        "colour": "rose"
      },
      {
        "categoryId": "number---multiplication-and-division",
        "title": "Multiplication and Division",
        "icon": "✖️",
        "description": "Explore arrays, sharing and grouping. Practise the 2, 5 and 10 tables and their division facts.",
        "example": "5 groups of 2 = ?",
        "colour": "gold"
      },
      {
        "categoryId": "number---fractions",
        "title": "Fractions",
        "icon": "🍕",
        "description": "Find halves, thirds and quarters of shapes and groups, including two quarters and three quarters.",
        "example": "Two quarters make a half.",
        "colour": "lilac"
      },
      {
        "categoryId": "measurement",
        "title": "Measurement",
        "icon": "📏",
        "description": "Measure length, mass, capacity and temperature. Explore coins and change, and tell time to five minutes.",
        "example": "Is it quarter past or quarter to?",
        "colour": "mint"
      },
      {
        "categoryId": "geometry-properties-of-shapes",
        "title": "Properties of Shapes",
        "icon": "🔺",
        "description": "Compare 2-D and 3-D shapes, their properties and vertical lines of symmetry.",
        "example": "Which shape has four corners?",
        "colour": "rose"
      },
      {
        "categoryId": "geometry-position-and-direction",
        "title": "Position and Direction",
        "icon": "🌈",
        "description": "Build patterns and sequences. Describe right-angle, quarter, half and three-quarter turns.",
        "example": "What comes next in the pattern?",
        "colour": "gold"
      },
      {
        "categoryId": "statistics",
        "title": "Statistics",
        "icon": "🖼️",
        "description": "Read and build pictograms, tally charts, block diagrams and tables. Compare groups and totals.",
        "example": "One picture stands for five.",
        "colour": "lilac"
      }
    ],
    "games": [
      {
        "to": "/money",
        "icon": "🪙",
        "label": "Money Match",
        "description": "Explore coins and amounts"
      },
      {
        "to": "/multiplication-table",
        "icon": "✖️",
        "label": "Multiplication Grid",
        "description": "Explore equal groups"
      },
      {
        "to": "/charts",
        "icon": "📊",
        "label": "Chart Detective",
        "description": "Find clues in the data"
      }
    ],
    "alignment": "Topics are mapped to the Year 2 mathematics programme of study for England."
  },
  {
    "year": 2,
    "subject": "english",
    "slug": "year-2-english",
    "path": "/curriculum-guide/year-2-english",
    "label": "Year 2 English",
    "intro": "Longer words, richer sentences and stories to talk about. Help language skills grow.",
    "fit": "For children building on early phonics, simple sentence punctuation and short stories. Grown-ups can help talk through new words.",
    "areas": [
      {
        "categoryId": "spelling---sounds-and-endings",
        "title": "Spelling · Sounds and Endings",
        "icon": "💎",
        "description": "Explore ge and dge, silent letters and different word endings and sound spellings.",
        "example": "Which ending fits this word?",
        "colour": "mint"
      },
      {
        "categoryId": "reading---words",
        "title": "Reading · Words",
        "icon": "🦋",
        "description": "Read longer words, words with suffixes and common exception words.",
        "example": "Break a longer word into parts.",
        "colour": "rose"
      },
      {
        "categoryId": "grammar---words",
        "title": "Grammar · Words",
        "icon": "🧩",
        "description": "Explore compound words, nouns, adjectives and adverbs.",
        "example": "Add a word that describes the noun.",
        "colour": "gold"
      },
      {
        "categoryId": "reading---stories",
        "title": "Reading · Stories",
        "icon": "🪜",
        "description": "Sequence events, understand characters and use story clues to predict and explain.",
        "example": "What happened before the surprise?",
        "colour": "lilac"
      },
      {
        "categoryId": "spelling---suffixes",
        "title": "Spelling · Suffixes",
        "icon": "🪰",
        "description": "Change word endings: y to ies, dropping e, doubling letters and adding suffixes.",
        "example": "Happy becomes happiest.",
        "colour": "mint"
      },
      {
        "categoryId": "grammar---sentences-and-punctuation",
        "title": "Grammar · Sentences and Punctuation",
        "icon": "💬",
        "description": "Explore sentence types, tense, expanded noun phrases, joining words and commas in lists.",
        "example": "A statement or a question?",
        "colour": "rose"
      },
      {
        "categoryId": "spelling---apostrophes-and-homophones",
        "title": "Spelling · Apostrophes and Homophones",
        "icon": "✂️",
        "description": "Use contractions and singular possessive apostrophes. Choose between words that sound alike.",
        "example": "Their, there or they’re?",
        "colour": "gold"
      },
      {
        "categoryId": "reading---information-and-poetry",
        "title": "Reading · Information and Poetry",
        "icon": "🗂️",
        "description": "Find facts, explore poems and rehearse questions and discussion choices about books.",
        "example": "Which question would help you understand?",
        "colour": "lilac"
      },
      {
        "categoryId": "writing---planning-and-checking",
        "title": "Writing · Planning and Checking",
        "icon": "✍️",
        "description": "Plan and build stories, factual writing and poems. Check and improve structured writing.",
        "example": "Does the tense stay the same?",
        "colour": "mint"
      }
    ],
    "games": [
      {
        "to": "/word-sorter",
        "icon": "🗂️",
        "label": "Word Sorter",
        "description": "Explore kinds of words"
      },
      {
        "to": "/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Build a sentence"
      },
      {
        "to": "/opposite-match",
        "icon": "↔️",
        "label": "Opposite Match",
        "description": "Find words with opposite meanings"
      }
    ],
    "alignment": "Topics are mapped to the Year 2 english programme of study for England."
  },
  {
    "year": 2,
    "subject": "geography",
    "slug": "year-2-geography",
    "path": "/curriculum-guide/year-2-geography",
    "label": "Year 2 Geography",
    "intro": "Follow a route, read a map and discover how two small places can be alike and different.",
    "fit": "For children building on UK countries, continents, oceans and simple directions, with growing curiosity about other places.",
    "areas": [
      {
        "categoryId": "world-and-uk-knowledge",
        "title": "World and UK Knowledge",
        "icon": "🌍",
        "description": "Connect continents and oceans, explore UK landscapes and follow four-point compass directions.",
        "example": "Head north, then turn east.",
        "colour": "mint"
      },
      {
        "categoryId": "weather-and-world-patterns",
        "title": "Weather and World Patterns",
        "icon": "🌦️",
        "description": "Read weather records and explore the Equator and the poles.",
        "example": "What does the weather record show?",
        "colour": "rose"
      },
      {
        "categoryId": "two-small-places",
        "title": "Two Small Places",
        "icon": "⚓",
        "description": "Compare Whitby and a small area of Kampong Ayer in Brunei: homes, journeys and surroundings.",
        "example": "How do people travel in each place?",
        "colour": "gold"
      },
      {
        "categoryId": "making-and-reading-maps",
        "title": "Making and Reading Maps",
        "icon": "🦅",
        "description": "Use aerial views, landmarks, symbols and keys to read and build simple maps.",
        "example": "What does this map symbol mean?",
        "colour": "lilac"
      },
      {
        "categoryId": "local-fieldwork",
        "title": "Local Fieldwork",
        "icon": "🌳",
        "description": "Rehearse observing school grounds and a local area, using pictures and supplied evidence.",
        "example": "What would you look for on a local walk?",
        "colour": "mint"
      }
    ],
    "games": [
      {
        "to": "/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/find-the-city",
        "icon": "📍",
        "label": "Find the City",
        "description": "Put places on the map"
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 1 (Years 1–2). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 2,
    "subject": "science",
    "slug": "year-2-science",
    "path": "/curriculum-guide/year-2-science",
    "label": "Year 2 Science",
    "intro": "Growing things, busy habitats and materials with a job to do. Ask a question, then look for clues.",
    "fit": "For children ready to build on naming plants, animals and materials, and start explaining what living things need.",
    "areas": [
      {
        "categoryId": "living-things-and-their-habitats",
        "title": "Living things and their habitats",
        "icon": "🪨",
        "description": "Compare living, dead and never-alive things. Explore habitats, micro-habitats, food sources and simple food chains.",
        "example": "What might live beneath a log?",
        "colour": "mint"
      },
      {
        "categoryId": "plants",
        "title": "Plants",
        "icon": "🌰",
        "description": "Follow seeds and bulbs as they grow. Explore plant needs and compare supplied experiment results.",
        "example": "What changed between the two plant tests?",
        "colour": "rose"
      },
      {
        "categoryId": "animals-including-humans",
        "title": "Animals, including humans",
        "icon": "🐣",
        "description": "Explore young animals, growth, survival needs, exercise, food and hygiene.",
        "example": "What does an animal need to survive?",
        "colour": "gold"
      },
      {
        "categoryId": "uses-of-everyday-materials",
        "title": "Uses of everyday materials",
        "icon": "🧱",
        "description": "Choose materials for a purpose. Explore changing shapes and people who developed useful materials.",
        "example": "Would this material keep the rain out?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "🌱",
        "title": "Follow a plant",
        "description": "Sketch the same plant over several days."
      },
      {
        "icon": "🐾",
        "title": "Look for a habitat",
        "description": "With a grown-up, notice where small creatures live."
      },
      {
        "icon": "🧥",
        "title": "Think like a designer",
        "description": "Which properties make a coat useful in the rain?"
      }
    ],
    "alignment": "Topics are mapped to the Year 2 science programme of study for England."
  },
  {
    "year": 2,
    "subject": "history",
    "slug": "year-2-history",
    "path": "/curriculum-guide/year-2-history",
    "label": "Year 2 History",
    "intro": "London’s great fire, people who changed things and the clues they left behind.",
    "fit": "For children building on then-and-now comparisons and ready to sequence events, compare sources and explain simple causes.",
    "areas": [
      {
        "categoryId": "changes-within-living-memory",
        "title": "Changes Within Living Memory",
        "icon": "📞",
        "description": "Compare communication and transport within living memory.",
        "example": "How would you send the same message then?",
        "colour": "mint"
      },
      {
        "categoryId": "the-great-fire-of-london",
        "title": "The Great Fire of London",
        "icon": "🏘️",
        "description": "Explore London in 1666, why the fire spread, the evidence and what changed afterwards.",
        "example": "Which source helps us find out?",
        "colour": "rose"
      },
      {
        "categoryId": "nurses-who-made-a-difference",
        "title": "Nurses Who Made a Difference",
        "icon": "🪔",
        "description": "Meet Florence Nightingale, Mary Seacole and Edith Cavell. Compare nursing in the past and today.",
        "example": "Different lives. Different ways of helping.",
        "colour": "gold"
      },
      {
        "categoryId": "people-who-changed-things",
        "title": "People Who Changed Things",
        "icon": "🚌",
        "description": "Explore Rosa Parks, Emily Davison, William Caxton and Tim Berners-Lee, and the changes they helped bring.",
        "example": "How did this invention change communication?",
        "colour": "lilac"
      },
      {
        "categoryId": "days-we-remember",
        "title": "Days We Remember",
        "icon": "🎆",
        "description": "Explore why Bonfire Night and Remembrance Day are remembered.",
        "example": "What does this symbol help people remember?",
        "colour": "mint"
      },
      {
        "categoryId": "history-near-you",
        "title": "History Near You",
        "icon": "🪧",
        "description": "Use memorials, plaques, old maps and photographs to investigate local-history examples.",
        "example": "Compare the old photo with the new one.",
        "colour": "rose"
      }
    ],
    "activities": [
      {
        "icon": "☎️",
        "title": "Ask about the past",
        "description": "How did a grown-up keep in touch when they were young?"
      },
      {
        "icon": "📷",
        "title": "Compare two views",
        "description": "What changed between an old and a new photograph?"
      },
      {
        "icon": "📜",
        "title": "Look for a memorial",
        "description": "Talk about who or what a local plaque remembers."
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 1 (Years 1–2). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 3,
    "subject": "math",
    "slug": "year-3-maths",
    "path": "/curriculum-guide/year-3-maths",
    "label": "Year 3 Maths",
    "intro": "Big numbers. New discoveries. Little steps that help maths make sense.",
    "fit": "For children ready to build on two-digit numbers, the 2, 5 and 10 times tables, and simple fractions.",
    "areas": [
      {
        "categoryId": "number---number-and-place-value",
        "title": "Number and Place Value",
        "icon": "🐸",
        "description": "Numbers to 1,000. Hundreds, tens and ones. Counting, comparing and estimating.",
        "example": "100 less than 472 is…",
        "colour": "mint"
      },
      {
        "categoryId": "number---addition-and-subtraction",
        "title": "Addition and Subtraction",
        "icon": "🔢",
        "description": "Mental maths, column methods with three digits, missing numbers and checking answers.",
        "example": "Add it. Subtract it. Check it.",
        "colour": "rose"
      },
      {
        "categoryId": "number---multiplication-and-division",
        "title": "Multiplication and Division",
        "icon": "🍀",
        "description": "The 3, 4 and 8 times tables. Two-digit calculations, equal groups and scaling.",
        "example": "4 groups of 8 = ?",
        "colour": "gold"
      },
      {
        "categoryId": "number---fractions",
        "title": "Fractions",
        "icon": "🔟",
        "description": "Tenths, equal parts and equivalent fractions. Adding and subtracting with the same denominator, within one whole.",
        "example": "⅕ + ⅕ = ⅖",
        "colour": "lilac"
      },
      {
        "categoryId": "measurement",
        "title": "Measurement",
        "icon": "📏",
        "description": "Length, mass, capacity, perimeter and change. Clocks to the minute, Roman numerals and durations.",
        "example": "How far around? How much change?",
        "colour": "mint"
      },
      {
        "categoryId": "geometry-properties-of-shapes",
        "title": "Properties of Shapes",
        "icon": "✏️",
        "description": "2-D and 3-D shapes, turns, right angles, parallel and perpendicular lines.",
        "example": "Spot a right angle in a shape.",
        "colour": "rose"
      },
      {
        "categoryId": "statistics",
        "title": "Statistics",
        "icon": "📊",
        "description": "Read and build charts, pictograms and tables. Use the data to solve one-step and two-step problems.",
        "example": "Each picture stands for five…",
        "colour": "gold"
      }
    ],
    "games": [
      {
        "to": "/multiplication-table",
        "icon": "✖️",
        "label": "Multiplication Grid",
        "description": "Explore times tables"
      },
      {
        "to": "/clock-generator",
        "icon": "⏰",
        "label": "Clock Generator",
        "description": "Get to know the clock"
      },
      {
        "to": "/charts",
        "icon": "📊",
        "label": "Chart Detective",
        "description": "Find clues in the data"
      }
    ],
    "alignment": "Topics are mapped to the Year 3 mathematics programme of study for England."
  },
  {
    "year": 3,
    "subject": "english",
    "slug": "year-3-english",
    "path": "/curriculum-guide/year-3-english",
    "label": "Year 3 English",
    "intro": "Follow story clues, play with word parts and give every sentence a little more purpose.",
    "fit": "For children ready to move beyond short texts and simple sentences, with growing confidence in spelling and punctuation.",
    "areas": [
      {
        "categoryId": "spelling---prefixes-and-suffixes",
        "title": "Spelling · Prefixes and Suffixes",
        "icon": "🧩",
        "description": "Build words with prefixes and suffixes, including super-, anti-, auto-, -ation and -ly.",
        "example": "What does “re-” add to a word?",
        "colour": "mint"
      },
      {
        "categoryId": "reading---words-and-meanings",
        "title": "Reading · Words and Meanings",
        "icon": "🌱",
        "description": "Explore root words, exception words, dictionaries and meanings in context.",
        "example": "Which dictionary meaning fits here?",
        "colour": "rose"
      },
      {
        "categoryId": "grammar---words",
        "title": "Grammar · Words",
        "icon": "🍎",
        "description": "Choose a or an and explore how words belong to families.",
        "example": "A unicorn, but an umbrella.",
        "colour": "gold"
      },
      {
        "categoryId": "reading---stories",
        "title": "Reading · Stories",
        "icon": "🤔",
        "description": "Check meaning, infer feelings and make predictions. Explore fairy stories, myths and legends.",
        "example": "What in the story supports your idea?",
        "colour": "lilac"
      },
      {
        "categoryId": "spelling---sounds-and-homophones",
        "title": "Spelling · Sounds and Homophones",
        "icon": "💎",
        "description": "Practise -sure and -ture endings, tricky sounds, homophones and often-misspelt words.",
        "example": "A piece of cake, or peace and quiet?",
        "colour": "mint"
      },
      {
        "categoryId": "grammar---sentences",
        "title": "Grammar · Sentences",
        "icon": "🔗",
        "description": "Join ideas, show time and cause, explore the present perfect and introduce inverted commas.",
        "example": "Which words were spoken aloud?",
        "colour": "rose"
      },
      {
        "categoryId": "reading---non-fiction-and-poetry",
        "title": "Reading · Non-Fiction and Poetry",
        "icon": "🗂️",
        "description": "Find information, ask useful questions and explore imaginative words and poetry forms.",
        "example": "Which heading will help you find it?",
        "colour": "gold"
      },
      {
        "categoryId": "writing---composition",
        "title": "Writing · Composition",
        "icon": "🧱",
        "description": "Group ideas into paragraphs, use headings and build settings, characters and plots. Proofread and practise dictation.",
        "example": "One paragraph. One main idea.",
        "colour": "lilac"
      }
    ],
    "introStep": "Short lessons from Bix introduce word, reading and writing ideas before practice.",
    "games": [
      {
        "to": "/word-builder",
        "icon": "🔤",
        "label": "Word Builder",
        "description": "Put letters together"
      },
      {
        "to": "/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Make a sentence"
      },
      {
        "to": "/synonym-match",
        "icon": "🦁",
        "label": "Synonym Safari",
        "description": "Explore similar meanings"
      }
    ],
    "alignment": "Topics draw on the shared Years 3–4 English programme for England. The reading and spelling split between these years is Bix’s choice; grammar follows the year-specific appendix."
  },
  {
    "year": 3,
    "subject": "geography",
    "slug": "year-3-geography",
    "path": "/curriculum-guide/year-3-geography",
    "label": "Year 3 Geography",
    "intro": "Mountains, maps and lines around the globe. Explore the UK, Europe and the forces shaping places.",
    "fit": "For children ready to build on world maps and simple directions, then compare regions and begin using grid references.",
    "areas": [
      {
        "categoryId": "the-uk-and-europe",
        "title": "The UK and Europe",
        "icon": "🏙️",
        "description": "Explore UK counties, cities, regions and landscapes, then locate selected places in Europe and Russia.",
        "example": "Which region is this city in?",
        "colour": "mint"
      },
      {
        "categoryId": "lines-on-the-globe",
        "title": "Lines on the Globe",
        "icon": "🌍",
        "description": "Explore hemispheres, the Equator, tropics, polar circles, latitude and longitude.",
        "example": "North or south of the Equator?",
        "colour": "rose"
      },
      {
        "categoryId": "physical-processes",
        "title": "Physical Processes",
        "icon": "⛰️",
        "description": "Discover mountains, valleys, volcanoes, earthquakes and the water cycle through diagrams and evidence.",
        "example": "What helps explain this changing landscape?",
        "colour": "gold"
      },
      {
        "categoryId": "two-european-regions",
        "title": "Two European Regions",
        "icon": "🐑",
        "description": "Explore the Lake District and Campania in Italy, comparing landscapes, settlements and land use.",
        "example": "What is alike? What is different?",
        "colour": "lilac"
      },
      {
        "categoryId": "maps-and-local-surveys",
        "title": "Maps and Local Surveys",
        "icon": "🧭",
        "description": "Use eight compass points and four-figure grid references. Rehearse a local land-use survey.",
        "example": "Across first, then up.",
        "colour": "mint"
      }
    ],
    "games": [
      {
        "to": "/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/find-the-city",
        "icon": "📍",
        "label": "Find the City",
        "description": "Put places on the map"
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 3,
    "subject": "science",
    "slug": "year-3-science",
    "path": "/curriculum-guide/year-3-science",
    "label": "Year 3 Science",
    "intro": "From roots to rocks and shadows to magnets. Look closely, compare evidence and ask why.",
    "fit": "For children ready to explain patterns, compare simple tests and use supplied observations to support an answer.",
    "areas": [
      {
        "categoryId": "plants",
        "title": "Plants",
        "icon": "🌼",
        "description": "Explore how plant parts work, what plants need, water transport, pollination and seed dispersal.",
        "example": "How does water reach the leaves?",
        "colour": "mint"
      },
      {
        "categoryId": "animals-including-humans",
        "title": "Animals, including humans",
        "icon": "🥗",
        "description": "Connect food and nutrition with skeletons, muscles, support and movement.",
        "example": "What helps the body move?",
        "colour": "rose"
      },
      {
        "categoryId": "rocks",
        "title": "Rocks",
        "icon": "🪨",
        "description": "Compare rocks and discover how fossils form and what soil contains.",
        "example": "What clues can a fossil give us?",
        "colour": "gold"
      },
      {
        "categoryId": "light",
        "title": "Light",
        "icon": "💡",
        "description": "Explore seeing, reflection and shadows, including how shadow size changes and why eyes need protection.",
        "example": "What happens when the lamp moves closer?",
        "colour": "lilac"
      },
      {
        "categoryId": "forces-and-magnets",
        "title": "Forces and magnets",
        "icon": "🛝",
        "description": "Compare surfaces, contact forces and magnetic materials. Explore poles, attraction and repulsion.",
        "example": "Will these poles attract or repel?",
        "colour": "mint"
      }
    ],
    "activities": [
      {
        "icon": "🌿",
        "title": "Compare leaves",
        "description": "Notice similarities and differences between plants."
      },
      {
        "icon": "🪨",
        "title": "Study a rock",
        "description": "Describe a familiar rock’s texture and appearance."
      },
      {
        "icon": "💬",
        "title": "Ask a testable question",
        "description": "What could you compare, and what would you keep the same?"
      }
    ],
    "alignment": "Topics are mapped to the Year 3 science programme of study for England."
  },
  {
    "year": 3,
    "subject": "history",
    "slug": "year-3-history",
    "path": "/curriculum-guide/year-3-history",
    "label": "Year 3 History",
    "intro": "Stone tools, Roman roads and ancient Egyptian clues. Become a detective of the distant past.",
    "fit": "For children ready to explore longer timelines, compare historical evidence and ask how life changed across different periods.",
    "areas": [
      {
        "categoryId": "stone-age-to-iron-age",
        "title": "Stone Age to Iron Age",
        "icon": "🔍",
        "description": "Explore hunter-gatherers, early farming, Skara Brae, Stonehenge and Iron Age hill forts.",
        "example": "What changed from stone to bronze to iron?",
        "colour": "mint"
      },
      {
        "categoryId": "roman-britain",
        "title": "Roman Britain",
        "icon": "⚔️",
        "description": "Follow invasions, resistance and Roman life in Britain, from the army to towns, beliefs and lasting changes.",
        "example": "What did the Romans leave behind?",
        "colour": "rose"
      },
      {
        "categoryId": "the-first-civilisations",
        "title": "The First Civilisations",
        "icon": "🗺️",
        "description": "Locate early civilisations, then explore Ancient Egypt: the Nile, rulers, writing, beliefs and everyday life.",
        "example": "What can an object from a tomb tell us?",
        "colour": "gold"
      }
    ],
    "activities": [
      {
        "icon": "🕰️",
        "title": "Make a timeline",
        "description": "Place the periods you have explored in order."
      },
      {
        "icon": "🔎",
        "title": "Question an object",
        "description": "What could it tell us, and what can’t it tell us?"
      },
      {
        "icon": "💬",
        "title": "Compare accounts",
        "description": "How might two people describe the same event differently?"
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 4,
    "subject": "math",
    "slug": "year-4-maths",
    "path": "/curriculum-guide/year-4-maths",
    "label": "Year 4 Maths",
    "intro": "Bigger numbers, clever connections. Explore decimals, coordinates and maths that goes a little further.",
    "fit": "For children ready to build on three-digit calculations, the 3, 4 and 8 tables, and fractions with the same denominator.",
    "areas": [
      {
        "categoryId": "number---number-and-place-value",
        "title": "Number and Place Value",
        "icon": "🔢",
        "description": "Explore four-digit numbers, rounding, counting through zero and Roman numerals to 100.",
        "example": "Round 3,462 to the nearest hundred.",
        "colour": "mint"
      },
      {
        "categoryId": "number---addition-and-subtraction",
        "title": "Addition and Subtraction",
        "icon": "➕",
        "description": "Use column methods with up to four digits. Check calculations and solve two-step problems.",
        "example": "Which operation will you need first?",
        "colour": "rose"
      },
      {
        "categoryId": "number---multiplication-and-division",
        "title": "Multiplication and Division",
        "icon": "✖️",
        "description": "Practise times tables to 12, factor pairs and written multiplication of two- and three-digit numbers.",
        "example": "How could 6 × 8 help with 60 × 8?",
        "colour": "gold"
      },
      {
        "categoryId": "number---fractions-including-decimals",
        "title": "Fractions including Decimals",
        "icon": "🍰",
        "description": "Connect fractions, tenths, hundredths and decimals. Compare, round and solve fraction and decimal problems.",
        "example": "One quarter is 0.25.",
        "colour": "lilac"
      },
      {
        "categoryId": "measurement",
        "title": "Measurement",
        "icon": "📏",
        "description": "Convert measures, count squares for area and calculate perimeter. Work with money and 12- and 24-hour time.",
        "example": "Same shape. Different area or perimeter?",
        "colour": "mint"
      },
      {
        "categoryId": "geometry-properties-of-shapes",
        "title": "Properties of Shapes",
        "icon": "🔷",
        "description": "Classify triangles and quadrilaterals. Compare angles and complete symmetric figures.",
        "example": "Can you finish the reflection?",
        "colour": "rose"
      },
      {
        "categoryId": "geometry-position-and-direction",
        "title": "Position and Direction",
        "icon": "📍",
        "description": "Plot coordinates in the first quadrant, move shapes on a grid and complete polygons.",
        "example": "Start at (2, 3). Move two places right.",
        "colour": "gold"
      },
      {
        "categoryId": "statistics",
        "title": "Statistics",
        "icon": "📊",
        "description": "Read bar charts and time graphs. Compare values and calculate sums and differences from data.",
        "example": "How did the value change over time?",
        "colour": "lilac"
      }
    ],
    "games": [
      {
        "to": "/fraction-fun",
        "icon": "🍕",
        "label": "Fraction Fun",
        "description": "Explore parts of a whole"
      },
      {
        "to": "/multiplication-table",
        "icon": "✖️",
        "label": "Multiplication Grid",
        "description": "Practise multiplication facts"
      },
      {
        "to": "/charts",
        "icon": "📊",
        "label": "Chart Detective",
        "description": "Compare data"
      }
    ],
    "alignment": "Topics are mapped to the Year 4 mathematics programme of study for England."
  },
  {
    "year": 4,
    "subject": "english",
    "slug": "year-4-english",
    "path": "/curriculum-guide/year-4-english",
    "label": "Year 4 English",
    "intro": "Read between the lines. Shape stronger sentences. Discover how writers make words work.",
    "fit": "For children building on paragraph writing, spelling patterns, story inference and the first steps in punctuating speech.",
    "areas": [
      {
        "categoryId": "spelling---prefixes-suffixes-and-apostrophes",
        "title": "Spelling · Prefixes, Suffixes and Apostrophes",
        "icon": "🚫",
        "description": "Explore il-, im- and ir-, the -ous ending, more -ly words and apostrophes for plural possession.",
        "example": "The children’s coats…",
        "colour": "mint"
      },
      {
        "categoryId": "reading---understanding-texts",
        "title": "Reading · Understanding Texts",
        "icon": "📌",
        "description": "Summarise main ideas, support inferences and explore how language and layout create meaning.",
        "example": "Which detail supports your answer?",
        "colour": "rose"
      },
      {
        "categoryId": "grammar---words-and-phrases",
        "title": "Grammar · Words and Phrases",
        "icon": "🐕",
        "description": "Explore determiners, expanded noun phrases, verb forms and the difference between plurals and possession.",
        "example": "More detail in a single noun phrase.",
        "colour": "gold"
      },
      {
        "categoryId": "spelling---word-endings",
        "title": "Spelling · Word Endings",
        "icon": "🎻",
        "description": "Practise -tion, -sion, -ssion and -cian, plus -gue, -que and often-misspelt words.",
        "example": "Which spelling makes this ending?",
        "colour": "lilac"
      },
      {
        "categoryId": "reading---stories-and-poems",
        "title": "Reading · Stories and Poems",
        "icon": "⚔️",
        "description": "Find themes, predict from clues and compare myths, legends and different poetry forms.",
        "example": "What do these two poems have in common?",
        "colour": "mint"
      },
      {
        "categoryId": "grammar---sentences-and-speech",
        "title": "Grammar · Sentences and Speech",
        "icon": "🚀",
        "description": "Use fronted adverbials, commas, direct-speech punctuation and pronouns.",
        "example": "Later that day, the door opened.",
        "colour": "rose"
      },
      {
        "categoryId": "spelling---sounds-and-homophones",
        "title": "Spelling · Sounds and Homophones",
        "icon": "🧑‍🍳",
        "description": "Explore ch, sc, ei, eigh and ey spellings and more homophones.",
        "example": "Weather or whether?",
        "colour": "gold"
      },
      {
        "categoryId": "writing---composition-and-editing",
        "title": "Writing · Composition and Editing",
        "icon": "🧱",
        "description": "Organise paragraphs around a theme. Choose clear nouns and pronouns, edit for consistency and proofread.",
        "example": "Does the reader know who “she” means?",
        "colour": "lilac"
      }
    ],
    "games": [
      {
        "to": "/word-builder",
        "icon": "🔤",
        "label": "Word Builder",
        "description": "Put letters together"
      },
      {
        "to": "/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Make a sentence"
      },
      {
        "to": "/synonym-match",
        "icon": "🦁",
        "label": "Synonym Safari",
        "description": "Explore similar meanings"
      }
    ],
    "alignment": "Topics draw on the shared Years 3–4 English programme for England. The reading and spelling split between these years is Bix’s choice; grammar follows the year-specific appendix."
  },
  {
    "year": 4,
    "subject": "geography",
    "slug": "year-4-geography",
    "path": "/curriculum-guide/year-4-geography",
    "label": "Year 4 Geography",
    "intro": "Travel from rivers to rainforests. Connect places, climates and the resources people use.",
    "fit": "For children building on regional comparisons, compass points, four-figure references and explanations of physical processes.",
    "areas": [
      {
        "categoryId": "north-and-south-america",
        "title": "North and South America",
        "icon": "🍁",
        "description": "Locate selected countries and cities in the Americas and explore Washington State as a region.",
        "example": "Find the country, then the city.",
        "colour": "mint"
      },
      {
        "categoryId": "climate-and-the-globe",
        "title": "Climate and the Globe",
        "icon": "🌡️",
        "description": "Explore climate zones, biomes and vegetation belts, plus day, night and simple time-zone differences.",
        "example": "Same moment. Different local time.",
        "colour": "rose"
      },
      {
        "categoryId": "rivers-and-changing-landscapes",
        "title": "Rivers and Changing Landscapes",
        "icon": "🏞️",
        "description": "Follow rivers, explore their uses and investigate changing UK landscapes.",
        "example": "How do people use this river?",
        "colour": "gold"
      },
      {
        "categoryId": "settlements-and-resources",
        "title": "Settlements and Resources",
        "icon": "🏡",
        "description": "Connect settlements, land use, trade and resources. Compare Washington State, Campania and the Lake District.",
        "example": "Where might this resource come from?",
        "colour": "lilac"
      },
      {
        "categoryId": "mapping-and-fieldwork-enquiries",
        "title": "Mapping and Fieldwork Enquiries",
        "icon": "▦",
        "description": "Use six-figure grid references, atlases and digital maps. Plan enquiries using supplied fieldwork examples.",
        "example": "Which evidence would answer your question?",
        "colour": "mint"
      }
    ],
    "games": [
      {
        "to": "/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/find-the-city",
        "icon": "📍",
        "label": "Find the City",
        "description": "Put places on the map"
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 4,
    "subject": "science",
    "slug": "year-4-science",
    "path": "/curriculum-guide/year-4-science",
    "label": "Year 4 Science",
    "intro": "Follow food, trace water and connect the clues. Explore living things, sound and electricity.",
    "fit": "For children ready to use observations, diagrams and results tables to explain patterns and compare scientific ideas.",
    "areas": [
      {
        "categoryId": "living-things-and-their-habitats",
        "title": "Living things and their habitats",
        "icon": "🐾",
        "description": "Group living things, use classification keys and explore how changing environments affect habitats.",
        "example": "Which question will identify this animal?",
        "colour": "mint"
      },
      {
        "categoryId": "animals-including-humans",
        "title": "Animals, including humans",
        "icon": "🍎",
        "description": "Explore digestion, teeth and food chains, including producers, predators and prey.",
        "example": "Follow the food through the body.",
        "colour": "rose"
      },
      {
        "categoryId": "states-of-matter",
        "title": "States of matter",
        "icon": "🧊",
        "description": "Compare solids, liquids and gases. Explore heating, cooling, evaporation, condensation and the water cycle.",
        "example": "Where did the puddle water go?",
        "colour": "gold"
      },
      {
        "categoryId": "sound",
        "title": "Sound",
        "icon": "🥁",
        "description": "Connect sound with vibrations. Compare pitch, volume, travel and distance using supplied examples.",
        "example": "Higher pitch or louder sound?",
        "colour": "lilac"
      },
      {
        "categoryId": "electricity",
        "title": "Electricity",
        "icon": "🔌",
        "description": "Explore appliances, pictured series circuits, switches, conductors and insulators.",
        "example": "Is there a complete loop?",
        "colour": "mint"
      }
    ],
    "activities": [
      {
        "icon": "🍃",
        "title": "Try a sorting key",
        "description": "Use visible features to group familiar leaves."
      },
      {
        "icon": "🧊",
        "title": "Watch an ice cube",
        "description": "Observe it melting at room temperature with a grown-up."
      },
      {
        "icon": "💬",
        "title": "Explain a pattern",
        "description": "Use an observation to explain your idea, then ask another question."
      }
    ],
    "practical": "Use grown-up support for real experiments, observations and measurements. Circuit work in the app uses pictures; any practical circuit building must use supervised low-voltage cells, never mains electricity.",
    "alignment": "Topics are mapped to the Year 4 science programme of study for England."
  },
  {
    "year": 4,
    "subject": "history",
    "slug": "year-4-history",
    "path": "/curriculum-guide/year-4-history",
    "label": "Year 4 History",
    "intro": "New settlers, shifting kingdoms and Viking journeys. Follow Britain’s story after the Romans.",
    "fit": "For children ready to build on Roman Britain, compare viewpoints and trace change and continuity over several centuries.",
    "areas": [
      {
        "categoryId": "anglo-saxons-and-scots",
        "title": "Anglo-Saxons and Scots",
        "icon": "🚪",
        "description": "Explore Roman withdrawal, Scots and Anglo-Saxon settlement, kingdoms, village life, Sutton Hoo and monasteries.",
        "example": "What do place names and objects reveal?",
        "colour": "mint"
      },
      {
        "categoryId": "vikings-and-anglo-saxons",
        "title": "Vikings and Anglo-Saxons",
        "icon": "🐉",
        "description": "Follow Viking raids and settlement, Jorvik, Alfred, Athelstan, Cnut and Edward the Confessor, up to 1066.",
        "example": "Whose account are we reading?",
        "colour": "rose"
      }
    ],
    "activities": [
      {
        "icon": "🗺️",
        "title": "Investigate a place name",
        "description": "Ask a grown-up to help check where the name came from."
      },
      {
        "icon": "🕰️",
        "title": "Connect the timeline",
        "description": "Trace the story from Roman Britain towards 1066."
      },
      {
        "icon": "🔎",
        "title": "Weigh the evidence",
        "description": "Who made this source, and why might that matter?"
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  }
];

export function findCurriculumGuide(slug) {
  return CURRICULUM_GUIDES.find(guide => guide.slug === slug);
}

export function curriculumGuideFor(year, subject) {
  return CURRICULUM_GUIDES.find(guide => guide.year === Number(year) && guide.subject === subject);
}
