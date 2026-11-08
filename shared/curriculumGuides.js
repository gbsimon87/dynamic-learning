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
  },
  "art": {
    "name": "Art & Design",
    "icon": "🎨",
    "doodle": "Splash!",
    "caption": "Let’s make something wonderful.",
    "eyebrow": "Colour, line and a world of makers",
    "practical": "Bix introduces techniques, vocabulary and famous artists. It cannot assess your child’s own making. Real drawing, painting, printing and modelling, with a grown-up to help with materials, still matter most.",
    "introStep": "Look closely at artworks, techniques and short explanations."
  },
  "computing": {
    "name": "Computing",
    "icon": "💻",
    "doodle": "if … then",
    "caption": "Let’s think it through.",
    "eyebrow": "How computers and the web work",
    "practical": "Pictures and puzzles help rehearse computing ideas, but the app cannot assess your child writing and testing real programs. Make time to build programs, and talk about the sites and apps your family actually uses.",
    "introStep": "Follow short explanations and worked examples of how computers work."
  },
  "design": {
    "name": "Design & Technology",
    "icon": "🛠️",
    "doodle": "Plan · make",
    "caption": "Let’s work out how it works.",
    "eyebrow": "Ideas, making and how things work",
    "practical": "Bix teaches the ideas, safety and vocabulary behind design and making. It cannot show that your child can make, cook or use tools. A grown-up should supervise knives, heat and tools.",
    "introStep": "Explore pictures, diagrams and short explanations of how things are designed."
  },
  "french": {
    "name": "French",
    "icon": "🥖",
    "doodle": "Bonjour!",
    "caption": "Let’s try some French.",
    "eyebrow": "New words, new sounds",
    "practical": "Bix supports vocabulary, grammar and reading. Speaking and listening need real practice with a grown-up or recordings. The app does not assess your child’s pronunciation.",
    "introStep": "Meet new words and short phrases, with pictures and examples to help."
  },
  "music": {
    "name": "Music",
    "icon": "🎵",
    "doodle": "♪ ♫ ♪",
    "caption": "Can you hear the beat?",
    "eyebrow": "Rhythm, notes and listening",
    "practical": "Bix teaches the ideas and vocabulary of music. It cannot assess singing, playing, composing or performing. Sing, clap, play and listen to real music together.",
    "introStep": "Look at notation and rhythm patterns, with short explanations and examples."
  },
  "pe": {
    "name": "PE",
    "icon": "⚽",
    "doodle": "Ready, steady…",
    "caption": "Let’s get moving!",
    "eyebrow": "Moving well and playing fair",
    "practical": "Bix teaches the rules, vocabulary and ideas behind PE. It does not assess movement, fitness or swimming, and it does not replace school PE, clubs or swimming lessons. Keep a grown-up close for equipment or anything near water.",
    "introStep": "Explore pictures, rules and short explanations of sports and movement."
  },
  "wellbeing": {
    "name": "Relationships & Health",
    "icon": "💛",
    "doodle": "Be kind",
    "caption": "Let’s talk it through.",
    "eyebrow": "Friendships, feelings and healthy habits",
    "practical": "Bix covers a gentle, age-appropriate part of relationships and health education. Sensitive conversations are best shared at home or school, at a pace that suits your child. Bix cannot replace those conversations.",
    "introStep": "Read short, calm explanations and think about what you would do."
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
        "to": "/skills/number-bonds",
        "icon": "🔗",
        "label": "Number Bonds",
        "description": "Find pairs that make a total"
      },
      {
        "to": "/skills/reading-numbers",
        "icon": "🔢",
        "label": "Reading Numbers",
        "description": "Match numbers and words"
      },
      {
        "to": "/skills/clock-generator",
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
        "to": "/skills/word-builder",
        "icon": "🔤",
        "label": "Word Builder",
        "description": "Put letters together"
      },
      {
        "to": "/skills/sight-word-pop",
        "icon": "🎈",
        "label": "Sight Word Pop",
        "description": "Spot familiar words"
      },
      {
        "to": "/skills/sentence-builder",
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
        "to": "/skills/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/skills/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/skills/find-the-city",
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
        "to": "/skills/money",
        "icon": "🪙",
        "label": "Money Match",
        "description": "Explore coins and amounts"
      },
      {
        "to": "/skills/multiplication-table",
        "icon": "✖️",
        "label": "Multiplication Grid",
        "description": "Explore equal groups"
      },
      {
        "to": "/skills/charts",
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
        "to": "/skills/word-sorter",
        "icon": "🗂️",
        "label": "Word Sorter",
        "description": "Explore kinds of words"
      },
      {
        "to": "/skills/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Build a sentence"
      },
      {
        "to": "/skills/opposite-match",
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
        "to": "/skills/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/skills/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/skills/find-the-city",
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
        "to": "/skills/multiplication-table",
        "icon": "✖️",
        "label": "Multiplication Grid",
        "description": "Explore times tables"
      },
      {
        "to": "/skills/clock-generator",
        "icon": "⏰",
        "label": "Clock Generator",
        "description": "Get to know the clock"
      },
      {
        "to": "/skills/charts",
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
        "to": "/skills/word-builder",
        "icon": "🔤",
        "label": "Word Builder",
        "description": "Put letters together"
      },
      {
        "to": "/skills/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Make a sentence"
      },
      {
        "to": "/skills/synonym-match",
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
        "to": "/skills/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/skills/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/skills/find-the-city",
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
        "to": "/skills/fraction-fun",
        "icon": "🍕",
        "label": "Fraction Fun",
        "description": "Explore parts of a whole"
      },
      {
        "to": "/skills/multiplication-table",
        "icon": "✖️",
        "label": "Multiplication Grid",
        "description": "Practise multiplication facts"
      },
      {
        "to": "/skills/charts",
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
        "to": "/skills/word-builder",
        "icon": "🔤",
        "label": "Word Builder",
        "description": "Put letters together"
      },
      {
        "to": "/skills/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Make a sentence"
      },
      {
        "to": "/skills/synonym-match",
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
        "to": "/skills/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/skills/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/skills/find-the-city",
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
  },
  {
    "year": 5,
    "subject": "math",
    "slug": "year-5-maths",
    "path": "/curriculum-guide/year-5-maths",
    "label": "Year 5 Maths",
    "intro": "Millions, fractions and angles. Take a bigger step with numbers, measures and shapes.",
    "fit": "For children ready for numbers to a million, long multiplication, equivalent fractions and measuring angles.",
    "areas": [
      {
        "categoryId": "number---number-and-place-value",
        "title": "Number and Place Value",
        "icon": "🔢",
        "description": "Read, order, round and count with numbers to a million, including negative numbers and Roman numerals.",
        "example": "Is 408,215 or 480,125 greater?",
        "colour": "mint"
      },
      {
        "categoryId": "number---addition-and-subtraction",
        "title": "Addition and Subtraction",
        "icon": "➕",
        "description": "Use column and mental methods with large numbers. Round to check answers and solve multi-step problems.",
        "example": "Does your answer look sensible when rounded?",
        "colour": "rose"
      },
      {
        "categoryId": "number---multiplication-and-division",
        "title": "Multiplication and Division",
        "icon": "✖️",
        "description": "Explore factors, multiples, primes, squares and cubes. Use written methods and solve scaling and rate problems.",
        "example": "Which numbers divide exactly into 36?",
        "colour": "gold"
      },
      {
        "categoryId": "number---fractions-including-decimals-and-percentages",
        "title": "Fractions, Decimals and Percentages",
        "icon": "🍕",
        "description": "Compare and add fractions, work with mixed numbers and link decimals, thousandths and percentages.",
        "example": "Is 3/4 the same as 0.75?",
        "colour": "lilac"
      },
      {
        "categoryId": "measurement",
        "title": "Measurement",
        "icon": "📏",
        "description": "Convert metric units and time, compare metric and imperial measures and find perimeter and area.",
        "example": "How many millilitres are in 2.5 litres?",
        "colour": "mint"
      },
      {
        "categoryId": "geometry-properties-of-shapes",
        "title": "Properties of Shapes",
        "icon": "📐",
        "description": "Estimate, measure and draw angles. Explore angles on lines and at a point, and regular and irregular polygons.",
        "example": "Do these angles make a straight line?",
        "colour": "rose"
      },
      {
        "categoryId": "geometry-position-and-direction",
        "title": "Position and Direction",
        "icon": "🔁",
        "description": "Reflect and translate shapes and describe how they move.",
        "example": "Slide the shape 3 right and 2 up.",
        "colour": "gold"
      },
      {
        "categoryId": "statistics",
        "title": "Statistics",
        "icon": "📊",
        "description": "Read line graphs, tables and timetables and use them to solve problems.",
        "example": "What does the steepest part of the line show?",
        "colour": "lilac"
      }
    ],
    "games": [
      {
        "to": "/skills/fraction-fun",
        "icon": "🍕",
        "label": "Fraction Fun",
        "description": "Explore parts of a whole"
      },
      {
        "to": "/skills/arithmetic-practice",
        "icon": "➕",
        "label": "Arithmetic Practice",
        "description": "Warm up with calculations"
      },
      {
        "to": "/skills/measure",
        "icon": "📏",
        "label": "Measure It",
        "description": "Read scales and measures"
      }
    ],
    "alignment": "Topics are mapped to the Year 5 mathematics programme of study for England."
  },
  {
    "year": 5,
    "subject": "english",
    "slug": "year-5-english",
    "path": "/curriculum-guide/year-5-english",
    "label": "Year 5 English",
    "intro": "Roots, relative clauses and reasons for your views. Notice how writers choose their words.",
    "fit": "For children building on paragraphs and story inference, ready for word origins, relative clauses and giving reasons for their opinions.",
    "areas": [
      {
        "categoryId": "spelling---word-endings",
        "title": "Spelling · Word Endings",
        "icon": "🔚",
        "description": "Explore -cious, -tious, -cial, -tial, -ant, -ance, -ent, -ence, -able and -ible.",
        "example": "Does this word end in -cial or -tial?",
        "colour": "mint"
      },
      {
        "categoryId": "reading---words-and-meanings",
        "title": "Reading · Words and Meanings",
        "icon": "🔍",
        "description": "Look at word roots and origins, use a dictionary and thesaurus and explore similes and metaphors.",
        "example": "What is the writer comparing?",
        "colour": "rose"
      },
      {
        "categoryId": "grammar---verbs-and-possibility",
        "title": "Grammar · Verbs and Possibility",
        "icon": "🔧",
        "description": "Make verbs with -ate, -ise and -ify, add verb prefixes and use modal verbs such as might and must.",
        "example": "Might or must: which is more certain?",
        "colour": "gold"
      },
      {
        "categoryId": "spelling---silent-letters-and-tricky-words",
        "title": "Spelling · Silent Letters and Tricky Words",
        "icon": "🤫",
        "description": "Spot silent letters and the ei after c pattern. Practise homophones and words that are often misspelt.",
        "example": "Is it “receive” or “recieve”?",
        "colour": "lilac"
      },
      {
        "categoryId": "reading---understanding-texts",
        "title": "Reading · Understanding Texts",
        "icon": "📖",
        "description": "Explore thoughts and motives, compare characters and settings, tell fact from opinion and read play scripts.",
        "example": "Is this a fact or an opinion?",
        "colour": "mint"
      },
      {
        "categoryId": "grammar---clauses-and-punctuation",
        "title": "Grammar · Clauses and Punctuation",
        "icon": "✏️",
        "description": "Use relative pronouns and relative clauses. Punctuate with brackets, dashes and commas.",
        "example": "Which word begins the clause?",
        "colour": "rose"
      },
      {
        "categoryId": "grammar---cohesion-and-tense",
        "title": "Grammar · Cohesion and Tense",
        "icon": "🔗",
        "description": "Link ideas within and between paragraphs and explore the past perfect.",
        "example": "Which word links these paragraphs?",
        "colour": "gold"
      },
      {
        "categoryId": "writing---composition-and-editing",
        "title": "Writing · Composition and Editing",
        "icon": "🖊️",
        "description": "Think about audience and purpose, summarise, use headings and bullet points, then proofread and practise dictation.",
        "example": "Who is this writing for?",
        "colour": "lilac"
      },
      {
        "categoryId": "reading---discussion-and-debate",
        "title": "Reading · Discussion and Debate",
        "icon": "💬",
        "description": "Explore how to give reasons for a view and challenge a view courteously.",
        "example": "How could you disagree politely?",
        "colour": "mint"
      }
    ],
    "games": [
      {
        "to": "/skills/word-builder",
        "icon": "🔤",
        "label": "Word Builder",
        "description": "Put letters together"
      },
      {
        "to": "/skills/sentence-builder",
        "icon": "📝",
        "label": "Sentence Builder",
        "description": "Make a sentence"
      },
      {
        "to": "/skills/synonym-match",
        "icon": "🦁",
        "label": "Synonym Safari",
        "description": "Explore similar meanings"
      }
    ],
    "alignment": "Topics draw on the shared Years 5–6 English programme for England. The reading and spelling split between these years is Bix’s choice; grammar follows the year-specific appendix."
  },
  {
    "year": 5,
    "subject": "geography",
    "slug": "year-5-geography",
    "path": "/curriculum-guide/year-5-geography",
    "label": "Year 5 Geography",
    "intro": "From the Highlands to the Amazon. Explore coasts, climates, trade and the maps that connect them.",
    "fit": "For children ready to compare regions, read climate graphs, use latitude and longitude and plan a simple fieldwork enquiry.",
    "areas": [
      {
        "categoryId": "regions-in-depth",
        "title": "Regions in Depth",
        "icon": "🗺️",
        "description": "Compare Scotland and the Highlands, Andalusia in Spain and the Amazon region of Brazil.",
        "example": "How is the Amazon region different from the Highlands?",
        "colour": "mint"
      },
      {
        "categoryId": "coasts-rivers-and-hazards",
        "title": "Coasts, Rivers and Hazards",
        "icon": "🌊",
        "description": "Explore coasts and coastal landforms, rivers in flood and how people live with natural hazards.",
        "example": "What could happen when a river floods?",
        "colour": "rose"
      },
      {
        "categoryId": "climate-and-environments",
        "title": "Climate and Environments",
        "icon": "🌦️",
        "description": "Read climate graphs and patterns, then explore biomes and sustainability.",
        "example": "Which month is the wettest?",
        "colour": "gold"
      },
      {
        "categoryId": "resources-trade-and-settlement",
        "title": "Resources, Trade and Settlement",
        "icon": "🚢",
        "description": "Explore natural resources, trade links, how settlements grow and change, and economic activity and jobs.",
        "example": "Where might this product have travelled from?",
        "colour": "lilac"
      },
      {
        "categoryId": "coordinates-time-and-maps",
        "title": "Coordinates, Time and Maps",
        "icon": "🧭",
        "description": "Use latitude and longitude, time zones, contours, scale and OS maps, then design a fieldwork enquiry.",
        "example": "What do close-together contour lines show?",
        "colour": "mint"
      }
    ],
    "games": [
      {
        "to": "/skills/world-map",
        "icon": "🗺️",
        "label": "World Map",
        "description": "Explore countries and places"
      },
      {
        "to": "/skills/city-spotlight",
        "icon": "🏙️",
        "label": "City Spotlight",
        "description": "Take a closer look at a city"
      },
      {
        "to": "/skills/find-the-city",
        "icon": "📍",
        "label": "Find the City",
        "description": "Put places on the map"
      }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "science",
    "slug": "year-5-science",
    "path": "/curriculum-guide/year-5-science",
    "label": "Year 5 Science",
    "intro": "Life cycles, mixtures and the Moon. Explore forces and how the world changes.",
    "fit": "For children ready to use diagrams and supplied results to explain changes, forces and patterns in the world around them.",
    "areas": [
      {
        "categoryId": "living-things-and-their-habitats",
        "title": "Living things and their habitats",
        "icon": "🦋",
        "description": "Compare the life cycles of mammals, birds, amphibians and insects. Explore reproduction in plants and animals.",
        "example": "Which stage comes after the caterpillar?",
        "colour": "mint"
      },
      {
        "categoryId": "animals-including-humans",
        "title": "Animals, including humans",
        "icon": "🧒",
        "description": "Explore the stages of human growth, how bodies change during puberty and what happens as people grow older.",
        "example": "Which stage comes between a baby and an adult?",
        "colour": "rose"
      },
      {
        "categoryId": "properties-and-changes-of-materials",
        "title": "Properties and changes of materials",
        "icon": "🧪",
        "description": "Compare materials, explore dissolving and separating mixtures, and sort reversible from irreversible changes.",
        "example": "Could you get the salt back?",
        "colour": "gold"
      },
      {
        "categoryId": "earth-and-space",
        "title": "Earth and space",
        "icon": "🌙",
        "description": "Explore the Solar System, orbits, the Sun, Earth and Moon, day and night and the phases of the Moon.",
        "example": "Why does the Moon seem to change shape?",
        "colour": "lilac"
      },
      {
        "categoryId": "forces",
        "title": "Forces",
        "icon": "🧲",
        "description": "Explore gravity, air and water resistance, friction, and levers, pulleys and gears.",
        "example": "Which surface gives more friction?",
        "colour": "mint"
      }
    ],
    "activities": [
      {
        "icon": "🌙",
        "title": "Keep a Moon diary",
        "description": "Draw the Moon on a few clear evenings and look for a pattern."
      },
      {
        "icon": "🥄",
        "title": "Stir and separate",
        "description": "With a grown-up, stir salt into water and talk about how you could get it back."
      },
      {
        "icon": "🚗",
        "title": "Slide and compare",
        "description": "Push a toy car across different surfaces and explain which one grips most."
      }
    ],
    "practical": "Diagrams and supplied results rehearse scientific enquiry. They do not show that your child has performed an experiment. Real observation, measurement and practical enquiry need grown-up support. Some topics, such as puberty, are best talked through together at a pace that suits your family.",
    "alignment": "Topics are mapped to the Year 5 science programme of study for England."
  },
  {
    "year": 5,
    "subject": "history",
    "slug": "year-5-history",
    "path": "/curriculum-guide/year-5-history",
    "label": "Year 5 History",
    "intro": "Athens, Sparta and the Maya. Follow the clues left by ancient civilisations.",
    "fit": "For children ready to compare societies, read sources and place ancient civilisations on one long timeline.",
    "areas": [
      {
        "categoryId": "ancient-greece---land-and-cities",
        "title": "Ancient Greece · Land and Cities",
        "icon": "🏺",
        "description": "Find where Ancient Greece was. Compare Athens and Sparta, everyday life in Athens and the beginnings of democracy.",
        "example": "How did Athenians make decisions?",
        "colour": "mint"
      },
      {
        "categoryId": "ancient-greece---beliefs-and-games",
        "title": "Ancient Greece · Beliefs and Games",
        "icon": "🏛️",
        "description": "Explore Greek gods and myths, the Parthenon and temples and the Olympic Games.",
        "example": "Which god is in this story?",
        "colour": "rose"
      },
      {
        "categoryId": "ancient-greece---wars-ideas-and-legacy",
        "title": "Ancient Greece · Wars, Ideas and Legacy",
        "icon": "⚔️",
        "description": "Follow the Greeks and Persians and Alexander the Great. Explore Greek thinkers, theatre and the ideas we still use.",
        "example": "Which Greek idea do we still use today?",
        "colour": "gold"
      },
      {
        "categoryId": "the-maya---land-and-cities",
        "title": "The Maya · Land and Cities",
        "icon": "🌴",
        "description": "Find where the Maya lived. Explore farming and food, cities and kings, Chichen Itza and Maya pyramids.",
        "example": "How did the Maya grow their food?",
        "colour": "lilac"
      },
      {
        "categoryId": "the-maya---ideas-and-change",
        "title": "The Maya · Ideas and Change",
        "icon": "📜",
        "description": "Explore Maya writing and books, numbers and the calendar, gods and the ball game, and the Classic Maya collapse.",
        "example": "What can a carved symbol tell us?",
        "colour": "mint"
      },
      {
        "categoryId": "connections-and-chronology",
        "title": "Connections and Chronology",
        "icon": "⏳",
        "description": "Place periods on one long timeline, compare sources and interpretations and compare past societies.",
        "example": "Which came first, and how do you know?",
        "colour": "rose"
      }
    ],
    "activities": [
      {
        "icon": "⏳",
        "title": "Draw a timeline",
        "description": "Mark Ancient Greece, the Maya and today, then add what you have learned."
      },
      {
        "icon": "🔎",
        "title": "Spot Greek ideas",
        "description": "Look for words and ideas we still use, such as democracy, theatre and the Olympics."
      },
      {
        "icon": "⚖️",
        "title": "Compare two societies",
        "description": "Talk about what Athens and a Maya city had in common and how they differed."
      }
    ],
    "practical": "Timelines, pictured sources and short accounts build historical understanding. Talk through different viewpoints together, and visit museums or explore books and real objects with a grown-up when you can.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "art",
    "slug": "year-5-art-and-design",
    "path": "/curriculum-guide/year-5-art-and-design",
    "label": "Year 5 Art & Design",
    "intro": "Draw, mix and print. Meet artists, makers and architects and see through their eyes.",
    "fit": "For children who like looking closely, trying colours and patterns and talking about how artists make their work.",
    "areas": [
      {
        "categoryId": "sketchbooks-and-drawing",
        "title": "Sketchbooks and drawing",
        "icon": "✏️",
        "description": "Observe closely and explore line, tone, perspective and proportion. Practise talking about art.",
        "example": "Where is the light coming from?",
        "colour": "mint"
      },
      {
        "categoryId": "colour-and-painting",
        "title": "Colour and painting",
        "icon": "🎨",
        "description": "Explore the colour wheel, colour mood and mixing, and different painting techniques.",
        "example": "Which colours would make this feel calm?",
        "colour": "rose"
      },
      {
        "categoryId": "printing-sculpture-and-pattern",
        "title": "Printing, sculpture and pattern",
        "icon": "🏺",
        "description": "Explore printmaking, sculpture and clay, and pattern and texture.",
        "example": "What texture could you press into clay?",
        "colour": "gold"
      },
      {
        "categoryId": "artists-architects-and-designers",
        "title": "Artists, architects and designers",
        "icon": "🏛️",
        "description": "Meet famous artists, sculptors, craft makers, designers and architects and their buildings.",
        "example": "What do you notice in this artwork?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "✏️",
        "title": "Draw from life",
        "description": "Sketch one everyday object from two different viewpoints."
      },
      {
        "icon": "🎨",
        "title": "Mix a colour wheel",
        "description": "Use a few paints to mix new colours and name what you made."
      },
      {
        "icon": "🖐️",
        "title": "Press a pattern",
        "description": "Dab a clean household object in a little paint and print a repeating pattern."
      }
    ],
    "practical": "Bix introduces techniques, vocabulary and famous artists. It cannot assess your child’s own making. Real paper, paint, clay and time to create matter most, and a grown-up should help with materials and tools.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "computing",
    "slug": "year-5-computing",
    "path": "/curriculum-guide/year-5-computing",
    "label": "Year 5 Computing",
    "intro": "Loops, logic and how the web works. Think like a computer scientist and stay safe online.",
    "fit": "For children ready to follow and debug instructions, use simple logic and talk about how information travels online.",
    "areas": [
      {
        "categoryId": "programming-basics",
        "title": "Programming Basics",
        "icon": "🧩",
        "description": "Explore sequences, repeat loops, if and else decisions, variables, inputs and outputs, and finding and fixing bugs.",
        "example": "Where is the bug in this sequence?",
        "colour": "mint"
      },
      {
        "categoryId": "algorithms-and-logic",
        "title": "Algorithms and Logic",
        "icon": "⚙️",
        "description": "Break problems into parts, follow how algorithms work and use and, or and not.",
        "example": "Is this true when both conditions are met?",
        "colour": "rose"
      },
      {
        "categoryId": "networks-and-the-web",
        "title": "Networks and the Web",
        "icon": "🌐",
        "description": "Explore computer networks, how data travels and the difference between the internet and the web.",
        "example": "How could a message travel between computers?",
        "colour": "gold"
      },
      {
        "categoryId": "search-and-information",
        "title": "Search and Information",
        "icon": "🔎",
        "description": "Use search engines, see how results are ranked and judge websites.",
        "example": "Who made this website, and why?",
        "colour": "lilac"
      },
      {
        "categoryId": "safe-and-responsible-use",
        "title": "Safe and Responsible Use",
        "icon": "🔒",
        "description": "Talk about keeping information safe and being kind and responsible online.",
        "example": "Is this safe to share?",
        "colour": "mint"
      }
    ],
    "activities": [
      {
        "icon": "🥪",
        "title": "Write a sandwich algorithm",
        "description": "Give a grown-up step-by-step instructions to make a snack, exactly as written."
      },
      {
        "icon": "🐛",
        "title": "Hunt the bug",
        "description": "Ask a grown-up to hide a mistake in some instructions, then find and fix it."
      },
      {
        "icon": "🔍",
        "title": "Compare two websites",
        "description": "Search for the same question together and discuss which source you would trust."
      }
    ],
    "practical": "Pictures and puzzles help rehearse computing ideas, but the app cannot assess your child writing and testing real programs. Make time to build programs in a block-based or text-based language, and talk about the sites and apps your family actually uses.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "design",
    "slug": "year-5-design-and-technology",
    "path": "/curriculum-guide/year-5-design-and-technology",
    "label": "Year 5 Design & Technology",
    "intro": "Design it, test it, make it. Explore structures, gears, circuits and healthy cooking.",
    "fit": "For children who like working out how things work and are ready to think about criteria, materials and safe making.",
    "areas": [
      {
        "categoryId": "designing-and-evaluating",
        "title": "Designing and evaluating",
        "icon": "📝",
        "description": "Explore design criteria and research, sketches and models, evaluating products and famous inventors and designers.",
        "example": "What must your design do?",
        "colour": "mint"
      },
      {
        "categoryId": "making",
        "title": "Making",
        "icon": "🔨",
        "description": "Learn about tools and safety, materials and ways of joining them.",
        "example": "Which way of joining suits this material?",
        "colour": "rose"
      },
      {
        "categoryId": "technical-knowledge",
        "title": "Technical knowledge",
        "icon": "⚙️",
        "description": "Explore strong structures, levers and linkages, gears, pulleys and cams, electrical systems and using computing to monitor and control.",
        "example": "How could a lever help?",
        "colour": "gold"
      },
      {
        "categoryId": "cooking-and-nutrition",
        "title": "Cooking and nutrition",
        "icon": "🍳",
        "description": "Explore a healthy and varied diet, seasonality and food sources, cooking skills and kitchen hygiene.",
        "example": "Which foods are in season?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "📝",
        "title": "Design for someone",
        "description": "Sketch a better lunchbox for a friend, with three things it must do."
      },
      {
        "icon": "🏗️",
        "title": "Test a structure",
        "description": "Build a tower from paper or card, then test it and make it stronger."
      },
      {
        "icon": "🥗",
        "title": "Cook together",
        "description": "Prepare something simple with a grown-up, starting with clean hands and a tidy workspace."
      }
    ],
    "practical": "Bix teaches the ideas, safety and vocabulary behind design and making. It cannot show that your child can make, cook or use tools. A grown-up should supervise knives, heat and tools. Any electrical project must use low-voltage cells, never mains electricity.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "french",
    "slug": "year-5-french",
    "path": "/curriculum-guide/year-5-french",
    "label": "Year 5 French",
    "intro": "Bonjour! Say hello, count, order food and start building French sentences.",
    "fit": "For children who enjoy words and patterns and are ready to meet French sounds, vocabulary and simple grammar.",
    "areas": [
      {
        "categoryId": "sounds-and-spelling",
        "title": "Sounds and Spelling",
        "icon": "🔊",
        "description": "Explore silent letters, liaison, nasal sounds, accents and sound patterns.",
        "example": "Is this letter pronounced or silent?",
        "colour": "mint"
      },
      {
        "categoryId": "everyday-words",
        "title": "Everyday Words",
        "icon": "💬",
        "description": "Learn greetings and family words, numbers to 100, days, months and weather, food, school and town, hobbies, clothes and colours.",
        "example": "How would you order a drink?",
        "colour": "rose"
      },
      {
        "categoryId": "grammar",
        "title": "Grammar",
        "icon": "🧱",
        "description": "Explore gender, articles and plurals, adjectives, the verbs to be, to have, to go and to do, -er verbs, saying no and asking questions.",
        "example": "Does this word need le or la?",
        "colour": "gold"
      },
      {
        "categoryId": "reading-and-writing",
        "title": "Reading and Writing",
        "icon": "📖",
        "description": "Read short texts, build sentences and translate.",
        "example": "Can you build this sentence in French?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "🏷️",
        "title": "Label the room",
        "description": "Write French labels for things around the house and say each word aloud."
      },
      {
        "icon": "👋",
        "title": "Greet in French",
        "description": "Start each day with a French greeting and a number or colour of the day."
      },
      {
        "icon": "🎧",
        "title": "Listen and repeat",
        "description": "Listen to a French song or recording with a grown-up and copy the sounds."
      }
    ],
    "practical": "Bix supports vocabulary, grammar and reading. Speaking and listening need real practice: say words aloud, listen to French speakers or recordings and try short conversations. The app does not assess your child’s pronunciation.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "music",
    "slug": "year-5-music",
    "path": "/curriculum-guide/year-5-music",
    "label": "Year 5 Music",
    "intro": "Beats, notes and the orchestra. Learn the language of music and listen in new ways.",
    "fit": "For children who like listening, counting beats and reading the first steps of music notation.",
    "areas": [
      {
        "categoryId": "rhythm-and-metre",
        "title": "Rhythm and metre",
        "icon": "🥁",
        "description": "Explore note values and rests, time signatures, counting beats in a bar, tempo and rhythm words.",
        "example": "How many beats are in this bar?",
        "colour": "mint"
      },
      {
        "categoryId": "pitch-and-notation",
        "title": "Pitch and notation",
        "icon": "🎼",
        "description": "Read the stave and treble clef, notes in an octave, scales and tonality, and chords and triads.",
        "example": "Which note sits on this line?",
        "colour": "rose"
      },
      {
        "categoryId": "dynamics-and-structure",
        "title": "Dynamics and structure",
        "icon": "🔈",
        "description": "Explore dynamics and articulation, musical structure and texture.",
        "example": "Is this part loud or soft?",
        "colour": "gold"
      },
      {
        "categoryId": "instruments-and-listening",
        "title": "Instruments and listening",
        "icon": "🎻",
        "description": "Meet instruments of the orchestra, composers and periods, musical traditions of the world and popular music styles.",
        "example": "Which family does this instrument belong to?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "👏",
        "title": "Clap the beat",
        "description": "Clap along to a favourite song and count the beats in a bar."
      },
      {
        "icon": "🎧",
        "title": "Listen like a conductor",
        "description": "Play a short piece and notice loud and quiet parts and which instruments you hear."
      },
      {
        "icon": "🥄",
        "title": "Tap a rhythm",
        "description": "Tap a short rhythm on a cushion and write it down using note values."
      }
    ],
    "practical": "Bix teaches the ideas and vocabulary of music. It cannot assess singing, playing, composing or performing. Sing, clap, play and listen to real music together, ideally with an instrument or a music teacher.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "pe",
    "slug": "year-5-pe",
    "path": "/curriculum-guide/year-5-pe",
    "label": "Year 5 PE",
    "intro": "Teamwork, track and field, and fair play. Learn the ideas behind moving well and staying active.",
    "fit": "For children who enjoy sport and movement and want to learn the rules, vocabulary and ideas behind them.",
    "areas": [
      {
        "categoryId": "team-games",
        "title": "Team games",
        "icon": "⚽",
        "description": "Explore football, hockey, rugby tag, netball, basketball, attacking and defending, net and wall games, cricket and rounders.",
        "example": "Where could you move to receive a pass?",
        "colour": "mint"
      },
      {
        "categoryId": "athletics-gymnastics-and-dance",
        "title": "Athletics, gymnastics and dance",
        "icon": "🏃",
        "description": "Explore track and field events, times and distances, gymnastics and dance.",
        "example": "Which event measures distance?",
        "colour": "rose"
      },
      {
        "categoryId": "outdoors-and-swimming",
        "title": "Outdoors and swimming",
        "icon": "🧭",
        "description": "Explore orienteering and teamwork, swimming and water safety.",
        "example": "Who should be with you near water?",
        "colour": "gold"
      },
      {
        "categoryId": "fitness-and-fair-play",
        "title": "Fitness and fair play",
        "icon": "💪",
        "description": "Explore warming up, fitness, fair play and beating your own personal best.",
        "example": "Why do we warm up first?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "🤸",
        "title": "Warm up together",
        "description": "March on the spot and stretch gently for a few minutes in a clear space."
      },
      {
        "icon": "⏱️",
        "title": "Beat your own best",
        "description": "Count how many catches or skips you can do, then try to beat your own score."
      },
      {
        "icon": "🧭",
        "title": "Follow a map",
        "description": "Draw a simple map of a garden or park and follow it with a grown-up."
      }
    ],
    "practical": "Bix teaches the rules, vocabulary and ideas behind PE. It does not assess movement, fitness or swimming, and it does not replace school PE, clubs or swimming lessons. Move in a clear space, keep a grown-up close for equipment or anything near water, and choose activities that suit your child’s health and confidence.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 5,
    "subject": "wellbeing",
    "slug": "year-5-relationships-and-health",
    "path": "/curriculum-guide/year-5-relationships-and-health",
    "label": "Year 5 Relationships & Health",
    "intro": "Kind friends, calm feelings and healthy habits. Think about how to look after yourself and others.",
    "fit": "For children ready to talk about friendships, feelings, staying safe and everyday healthy habits, ideally with a grown-up nearby.",
    "areas": [
      {
        "categoryId": "friends-and-families",
        "title": "Friends and families",
        "icon": "🤝",
        "description": "Explore families who care, good friends, sorting out a falling out, and courtesy and respect.",
        "example": "How could you help two friends make up?",
        "colour": "mint"
      },
      {
        "categoryId": "feelings-and-wellbeing",
        "title": "Feelings and wellbeing",
        "icon": "😊",
        "description": "Name feelings, find ways to calm down and talk, and enjoy being active outdoors and having hobbies.",
        "example": "What could help when you feel worried?",
        "colour": "rose"
      },
      {
        "categoryId": "staying-safe",
        "title": "Staying safe",
        "icon": "🚦",
        "description": "Explore online safety and screen time, staying safe near roads, water and sun, and first aid and calling 999.",
        "example": "What would you do if something online felt wrong?",
        "colour": "gold"
      },
      {
        "categoryId": "healthy-habits",
        "title": "Healthy habits",
        "icon": "🥦",
        "description": "Explore healthy eating, sleep and rest, and looking after teeth and hands to keep germs away.",
        "example": "Why does your body need sleep?",
        "colour": "lilac"
      }
    ],
    "activities": [
      {
        "icon": "💬",
        "title": "Feelings check-in",
        "description": "Share one feeling from the day, if you want to, and what helped."
      },
      {
        "icon": "🛡️",
        "title": "Make a safety plan",
        "description": "Talk about who you would tell if something online or out and about felt wrong."
      },
      {
        "icon": "🌳",
        "title": "Go outside together",
        "description": "Take a walk or play outdoors, then talk about how it made you feel."
      }
    ],
    "alignment": "Topics are mapped to the Department for Education’s statutory relationships and health education guidance for primary schools in England. They cover a safe, age-appropriate part of it. Sensitive topics are best shared by school and home, and Bix does not replace those conversations."
  },
  {
    "year": 6,
    "subject": "english",
    "slug": "year-6-english",
    "path": "/curriculum-guide/year-6-english",
    "label": "Year 6 English",
    "intro": "Choose words for the reader and purpose. Formal and informal vocabulary is ready first; the other Year 6 English quests are being prepared.",
    "fit": "For children ready to make deliberate language choices for formal writing, compare viewpoints and edit for clarity.",
    "areas": [
      { "categoryId": "spelling---advanced-patterns", "title": "Spelling · Advanced Patterns", "icon": "🔤", "description": "Practise endings after -fer, hyphens, the tricky ough string, confusing pairs and the Year 6 word list.", "example": "Is it referring or refering?", "colour": "mint" },
      { "categoryId": "reading---interpretation-and-comparison", "title": "Reading · Interpretation and Comparison", "icon": "📖", "description": "Use evidence to predict, summarise across paragraphs, explore language and compare viewpoints.", "example": "Which detail supports this prediction?", "colour": "rose" },
      { "categoryId": "grammar---formal-language-and-sentence-choices", "title": "Grammar · Formal Language and Sentence Choices", "icon": "🎩", "description": "Choose formal vocabulary, explore synonyms and antonyms, and use active, passive and formal structures.", "example": "Which word suits a formal letter?", "colour": "gold" },
      { "categoryId": "grammar---cohesion-layout-and-punctuation", "title": "Grammar · Cohesion, Layout and Punctuation", "icon": "🔗", "description": "Link ideas across paragraphs and use layout, colons, semicolons, dashes and hyphens clearly.", "example": "Which link shows a contrast?", "colour": "lilac" },
      { "categoryId": "writing---composition-and-editing", "title": "Writing · Composition and Editing", "icon": "🖊️", "description": "Choose a register for a reader, précis a passage and proofread for clarity and effect.", "example": "Which sentence suits a council letter?", "colour": "mint" }
    ],
    "games": [
      { "to": "/skills/word-builder", "icon": "🔤", "label": "Word Builder", "description": "Put letters together" },
      { "to": "/skills/sentence-builder", "icon": "📝", "label": "Sentence Builder", "description": "Make a sentence" },
      { "to": "/skills/synonym-match", "icon": "🦁", "label": "Synonym Safari", "description": "Explore similar meanings" }
    ],
    "alignment": "Topics draw on the shared Years 5–6 English programme for England. The grammar content begins in Year 6 as set out in Appendix 2; the reading and spelling split is Bix’s documented choice. Formal and Informal Vocabulary is available now; the listed remaining topics are planned and stay unavailable until their four challenges are built."
  },
  {
    "year": 6,
    "subject": "history",
    "slug": "year-6-history",
    "path": "/curriculum-guide/year-6-history",
    "label": "Year 6 History",
    "intro": "Become a local history detective, follow Jarrow through time and trace crime and punishment from the Anglo-Saxons to today.",
    "fit": "For children ready to use maps, buildings, records and memories as evidence, and to explain change, cause and significance.",
    "areas": [
      { "categoryId": "local-history---investigating-your-area", "title": "Local History · Investigating Your Area", "icon": "🏘️", "description": "Learn how to study a place: old maps, buildings and streets, census pages, photographs, memories and how to plan an enquiry.", "example": "What can an old map tell us about a village?", "colour": "mint" },
      { "categoryId": "local-history---jarrow-through-time", "title": "Local History · Jarrow Through Time", "icon": "🚢", "description": "Follow one real town through the centuries: Bede's monastery, Palmer's shipyard and the Jarrow March of 1936.", "example": "Why did men march from Jarrow to London?", "colour": "rose" },
      { "categoryId": "crime-and-punishment---anglo-saxons-to-1700", "title": "Crime and Punishment · Anglo-Saxons to 1700", "icon": "⚖️", "description": "Explore law and order before 1066, Norman law and the forest, Magna Carta and trial by jury, and Tudor and Stuart fears about poverty and plots.", "example": "What did Magna Carta say about the king and the law?", "colour": "gold" },
      { "categoryId": "crime-and-punishment---1700-to-today", "title": "Crime and Punishment · 1700 to Today", "icon": "👮", "description": "Meet highwaymen, convicts sent to Australia, Peel's police, prison reformers and today's crime-fighting science.", "example": "Why did Robert Peel start the police?", "colour": "lilac" },
      { "categoryId": "thinking-like-a-historian", "title": "Thinking Like a Historian", "icon": "⭐", "description": "Explain change and continuity, cause and consequence, and who and what mattered.", "example": "What changed, and what stayed the same?", "colour": "mint" }
    ],
    "activities": [
      { "icon": "🗺️", "title": "Compare old and new", "description": "With a grown-up, find an old map or photo of a place near you and spot what changed and what stayed." },
      { "icon": "🏠", "title": "Read a street", "description": "Walk down a street and look for clues in street names, building styles and signs." },
      { "icon": "⚖️", "title": "Crime then and now", "description": "Talk about how a rule or punishment from the past differs from one today, and why." }
    ],
    "practical": "Local history belongs to your own place, so use libraries, museums, local archives and older relatives with a grown-up. Crime and punishment topics are stated factually and gently; talk through harsh punishments together.",
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6): a local history study and a theme in British history beyond 1066 (crime and punishment). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage."
  },
  {
    "year": 6,
    "subject": "geography",
    "slug": "year-6-geography",
    "path": "/curriculum-guide/year-6-geography",
    "label": "Year 6 Geography",
    "intro": "Use maps, evidence and field notes to explore changing places, environmental choices and global connections.",
    "fit": "For children ready to compare regions, weigh geographical trade-offs and plan a fair local enquiry.",
    "areas": [
      { "categoryId": "regions-and-comparison", "title": "Regions and Comparison", "icon": "🌍", "description": "Compare Belize, the Caribbean coast, Europe, the Americas, Russia and changing places in the UK.", "example": "What evidence makes a comparison fair?", "colour": "mint" },
      { "categoryId": "environmental-change", "title": "Environmental Change", "icon": "🏔️", "description": "Explore glaciers, mountain environments, river and coast management, and responses to climate change.", "example": "Which flood plan balances different needs?", "colour": "rose" },
      { "categoryId": "people-resources-and-connections", "title": "People, Resources and Connections", "icon": "🚢", "description": "Investigate energy choices, population and migration, global trade networks and changing UK land use.", "example": "What trade-off comes with this energy choice?", "colour": "gold" },
      { "categoryId": "maps-data-and-fieldwork", "title": "Maps, Data and Fieldwork", "icon": "🧭", "description": "Use six-figure references, map layers and enquiry evidence, then present and evaluate geographical findings.", "example": "What does this six-figure reference identify?", "colour": "lilac" }
    ],
    "games": [
      { "to": "/skills/world-map", "icon": "🗺️", "label": "World Map", "description": "Explore countries and places" },
      { "to": "/skills/city-spotlight", "icon": "🏙️", "label": "City Spotlight", "description": "Take a closer look at a city" },
      { "to": "/skills/find-the-city", "icon": "📍", "label": "Find the City", "description": "Put places on the map" }
    ],
    "alignment": "Topics are mapped to the National Curriculum in England for key stage 2 (Years 3–6). The year-by-year allocation is Bix’s choice; this path does not cover the whole key stage, and digital activities do not certify outdoor fieldwork."
  },
  {
    "year": 6,
    "subject": "science",
    "slug": "year-6-science",
    "path": "/curriculum-guide/year-6-science",
    "label": "Year 6 Science",
    "intro": "Classify living things, follow blood round the body and trace light and electricity in straight lines and loops.",
    "fit": "For children ready to read diagrams, keys and supplied results, and to explain how living things, light and circuits work.",
    "areas": [
      {
        "categoryId": "living-things-and-their-habitats",
        "title": "Living things and their habitats",
        "icon": "🔑",
        "description": "Classify plants, animals and micro-organisms, sort vertebrates and invertebrates, and use classification keys.",
        "example": "Is a snail a vertebrate or an invertebrate?",
        "colour": "mint"
      },
      {
        "categoryId": "animals-including-humans",
        "title": "Animals, including humans",
        "icon": "🫀",
        "description": "Explore the heart, blood and blood vessels, and how diet, exercise, drugs and lifestyle affect the body.",
        "example": "Why does your pulse rise when you run?",
        "colour": "rose"
      },
      {
        "categoryId": "evolution-and-inheritance",
        "title": "Evolution and inheritance",
        "icon": "🦴",
        "description": "Use fossils as evidence, compare offspring with their parents, and explore adaptation and evolution.",
        "example": "How does a camel survive in the desert?",
        "colour": "gold"
      },
      {
        "categoryId": "light",
        "title": "Light",
        "icon": "🔦",
        "description": "Use the idea that light travels in straight lines to explain how we see, how mirrors work and why shadows match their objects.",
        "example": "Which way does the light travel when you see a book?",
        "colour": "lilac"
      },
      {
        "categoryId": "electricity",
        "title": "Electricity",
        "icon": "⚡",
        "description": "Read and draw circuit diagrams with symbols, and explain why bulbs, buzzers and motors change with more cells.",
        "example": "What happens to a bulb when you add another cell?",
        "colour": "mint"
      }
    ],
    "activities": [
      {
        "icon": "💓",
        "title": "Count your pulse",
        "description": "Count your pulse for a minute while resting, then after a short jog on the spot, and compare."
      },
      {
        "icon": "🔦",
        "title": "Shadow puppets",
        "description": "With a torch, move a puppet closer to and further from a wall and watch its shadow change size but not shape."
      },
      {
        "icon": "🔋",
        "title": "Spot the cells",
        "description": "With a grown-up, look at a torch or toy and find how many cells it uses and their voltage."
      }
    ],
    "practical": "Diagrams and supplied results rehearse scientific enquiry. They do not show that your child has performed an experiment. Circuits should use suitable low-voltage cells with a grown-up, never mains electricity. Topics about medicines, drugs and health are kept factual and simple; talk them through together.",
    "alignment": "Topics are mapped to the Year 6 science programme of study for England."
  },
{
  "year": 6,
  "subject": "math",
  "slug": "year-6-maths",
  "path": "/curriculum-guide/year-6-maths",
  "label": "Year 6 Maths",
  "intro": "Build confidence with the full Year 6 Maths course: number, fractions, ratio, algebra, measure, geometry and statistics.",
  "fit": "For children ready for Year 6 Maths. Each area has four short challenges per topic, with Bix’s worked tips before play.",
  "areas": [
    {
      "categoryId": "number-number-and-place-value",
      "title": "Number and Place Value",
      "icon": "🔢",
      "description": "Read and compare numbers to ten million, round, use negative numbers and solve place-value problems.",
      "example": "What is the interval from −7 to 5?",
      "colour": "mint"
    },
    {
      "categoryId": "number-addition-subtraction-multiplication-and-division",
      "title": "The Four Operations",
      "icon": "✖️",
      "description": "Use written and mental methods, factors, primes, operation order and checking for multi-step problems.",
      "example": "Which operation should you do first?",
      "colour": "rose"
    },
    {
      "categoryId": "number-fractions-including-decimals-and-percentages",
      "title": "Fractions, Decimals and Percentages",
      "icon": "🍰",
      "description": "Simplify and calculate with fractions, use decimal place value and connect fractions, decimals and percentages.",
      "example": "How can you simplify 18/24?",
      "colour": "gold"
    },
    {
      "categoryId": "ratio-and-proportion",
      "title": "Ratio and Proportion",
      "icon": "⚖️",
      "description": "Find missing quantities, calculate percentages of amounts, use scale factors and share unequally.",
      "example": "If 2 cups serve 3 people, how many serve 9?",
      "colour": "lilac"
    },
    {
      "categoryId": "algebra",
      "title": "Algebra",
      "icon": "🔤",
      "description": "Use simple formulae, linear sequences, missing numbers and combinations of two variables.",
      "example": "Which pairs of whole numbers have a sum of 8?",
      "colour": "mint"
    },
    {
      "categoryId": "measurement",
      "title": "Measurement",
      "icon": "📏",
      "description": "Convert units and explore perimeter, area and volume, including triangles, parallelograms and cuboids.",
      "example": "What is the volume of a 3 cm by 4 cm by 5 cm cuboid?",
      "colour": "rose"
    },
    {
      "categoryId": "geometry-properties-of-shapes",
      "title": "Properties of Shapes",
      "icon": "🔷",
      "description": "Use dimensions and angles, nets, shape properties, circle parts and missing angles.",
      "example": "What is the diameter of a circle with radius 4 cm?",
      "colour": "gold"
    },
    {
      "categoryId": "geometry-position-and-direction",
      "title": "Position and Direction",
      "icon": "📍",
      "description": "Work in all four coordinate quadrants, then translate and reflect shapes in the axes.",
      "example": "Where does (−3, 2) move when reflected in the y-axis?",
      "colour": "lilac"
    },
    {
      "categoryId": "statistics",
      "title": "Statistics",
      "icon": "📊",
      "description": "Interpret pie charts and line graphs, then calculate and explain the mean.",
      "example": "What is the mean of 4, 6 and 8?",
      "colour": "mint"
    }
  ],
  "games": [
    {
      "to": "/skills/fraction-fun",
      "icon": "🍕",
      "label": "Fraction Fun",
      "description": "Explore parts of a whole"
    },
    {
      "to": "/skills/arithmetic-practice",
      "icon": "➕",
      "label": "Arithmetic Practice",
      "description": "Warm up with calculations"
    },
    {
      "to": "/skills/measure",
      "icon": "📏",
      "label": "Measure It",
      "description": "Read scales and measures"
    }
  ],
  "practical": "Screen activities build calculation and construction decisions. Practical work with rulers, protractors, physical nets and graph construction needs follow-up away from the screen.",
  "alignment": "The full course maps to the Year 6 mathematics programme of study for England."
}
];

export function findCurriculumGuide(slug) {
  return CURRICULUM_GUIDES.find(guide => guide.slug === slug);
}

export function curriculumGuideFor(year, subject) {
  return CURRICULUM_GUIDES.find(guide => guide.year === Number(year) && guide.subject === subject);
}
