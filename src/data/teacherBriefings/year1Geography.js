/**
 * Teacher subject-knowledge briefings for Year 1 Geography, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the key stage 1 programme of
 * study in docs/curriculum/key-stage-1-geography.md (the PDF text), using the
 * requirement that the topic's row in "Proposed topics mapped to statutory
 * requirements" names. Never paraphrase or alter it: a test checks every quote
 * against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Early Years prior learning and the Year 2+ destination
 */
const PHYSICAL = "key physical features, including: beach, cliff, coast, forest, hill, mountain, sea, ocean, river, soil, valley, vegetation, season and weather";
const HUMAN = "key human features, including: city, town, village, factory, farm, house, office, port, harbour and shop";
const CONTINENTS = "name and locate the world’s seven continents and five oceans";
const UK = "name, locate and identify characteristics of the four countries and capital cities of the United Kingdom and its surrounding seas";
const PLACES = "understand geographical similarities and differences through studying the human and physical geography of a small area of the United Kingdom, and of a small area in a contrasting non-European country";
const WEATHER = "identify seasonal and daily weather patterns in the United Kingdom and the location of hot and cold areas of the world in relation to the Equator and the North and South Poles";
const MAPS = "use world maps, atlases and globes to identify the United Kingdom and its countries, as well as the countries, continents and oceans studied at this key stage";
const COMPASS = "use simple compass directions (North, South, East and West) and locational and directional language [for example, near and far; left and right], to describe the location of features and routes on a map";
const AERIAL = "use aerial photographs and plan perspectives to recognise landmarks and basic human and physical features; devise a simple map; and use and construct basic symbols in a key";
const FIELDWORK = "use simple fieldwork and observational skills to study the geography of their school and its grounds and the key human and physical features of its surrounding environment.";

export const YEAR1_GEOGRAPHY_BRIEFINGS = {
  // ---------------------------------------------------------------- Our Place
  "around-our-school": {
    statutory: [FIELDWORK],
    inBrief: "Geography starts with looking carefully at a place we know. Pupils notice buildings, paths, trees and soil, and begin to tell what people made from what is natural.",
    keyFacts: [
      "Observing means looking carefully at what is there now, using eyes first and then words such as building, path, tree, soil, gate and playground.",
      "Some features are made by people (buildings, paths, gates, playgrounds). Others are natural or grow (trees, plants, soil). A grass lawn was planted by people but the grass is a plant, so use clear examples first.",
      "A walk with a pencil and paper is real fieldwork at this age: choose one building, one path and one growing thing, then draw them from above with a simple symbol for each.",
      "Bix uses a practice school picture, not the pupil's own school. The app rehearses observing; the real looking happens outdoors or at a window.",
      "Boundary: noticing and naming features in a familiar place. Measuring, recording data and drawing accurate plans are not expected in Year 1.",
    ],
    misconceptions: [
      { mistake: "A tree is made by people because it is in the school grounds.", why: "Pupils see the tree only where adults put it, so they link 'here' with 'made'.", response: "Ask 'Did people build it or did it grow?' Compare a tree with a gate and sort the two on a hoop." },
      { mistake: "Geography is only about faraway places.", why: "Maps and globes come to mind first, and the school feels too ordinary.", response: "Start each lesson with a short look outside or through a window and use the word 'geography' for what the class notices." },
      { mistake: "Soil is just dirt, not a feature.", why: "Soil is underfoot and rarely named.", response: "Dig a small patch with permission, look at it with a magnifier and name it as soil, then say that plants grow in it." },
    ],
    vocabulary: [
      { term: "feature", meaning: "Something you can see in a place, such as a tree or a building." },
      { term: "building", meaning: "A place with walls and a roof that people made." },
      { term: "path", meaning: "A way to walk along." },
      { term: "soil", meaning: "The brown ground that plants grow in." },
      { term: "natural", meaning: "Not made by people." },
      { term: "observe", meaning: "Look carefully at what is there now." },
    ],
    before: "In the Early Years pupils talk about the places they know, such as home, school and the local area, and about what they see and find outdoors. They have not yet named features with geographical words.",
    next: "In Year 2 pupils observe their school grounds and local area on purpose (Observing Our School Grounds, Exploring Our Local Area) and record what they find on simple maps.",
  },

  "human-and-physical-features": {
    statutory: [PHYSICAL, HUMAN],
    inBrief: "Features are either physical (made by nature) or human (made by people). Learning the key words is the vocabulary for all later geography.",
    keyFacts: [
      "Physical features in the programme: beach, cliff, coast, forest, hill, mountain, sea, ocean, river, soil, valley, vegetation, season and weather.",
      "Human features: city, town, village, factory, farm, house, office, port, harbour and shop.",
      "A hill is lower and rounder than a mountain, and a valley is low land between hills or mountains, often with a river. There is no fixed height for a hill, so keep to clear examples.",
      "A harbour is a sheltered place where boats stay. A port is a place where ships load and unload goods. Some places are both. A village, town and city differ in size, with a city usually the biggest.",
      "Boundary: naming and sorting features from pictures, and noticing a few similarities between two places. Detailed comparison of two small areas is Year 2.",
    ],
    misconceptions: [
      { mistake: "A farm is physical because it has fields and animals.", why: "Fields look natural and are full of living things.", response: "Ask who made the fields, fences and barns. The farm is human and the grass and hills around it are physical." },
      { mistake: "The sea and the ocean are different things in different places, so a sea is not an ocean.", why: "The words are used loosely at the beach.", response: "Say that oceans are the biggest bodies of salt water and seas are smaller parts, usually near land. Both are physical." },
      { mistake: "A town and a city are the same.", why: "Both are 'lots of houses'.", response: "Show pictures of a village, a town and a city and order them from smallest to biggest, then say that a city is usually the biggest." },
    ],
    vocabulary: [
      { term: "physical feature", meaning: "Something in a place that nature made, such as a hill or a river." },
      { term: "human feature", meaning: "Something in a place that people made, such as a shop or a farm." },
      { term: "vegetation", meaning: "Plants growing in a place." },
      { term: "valley", meaning: "Low land between hills or mountains." },
      { term: "harbour", meaning: "A sheltered place for boats." },
      { term: "port", meaning: "A place where ships load and unload." },
      { term: "village, town, city", meaning: "Places where people live, from smallest to biggest." },
    ],
    before: "In the Early Years pupils describe what they see in the natural world and in different environments, for example a park, a beach or a street.",
    next: "In Year 2 pupils use these words to describe and compare two small places (Whitby by the Sea, Kampong Ayer by the River, Comparing Two Small Places). Key stage 2 adds mountains, rivers, settlement and land use.",
  },

  "maps-from-above": {
    statutory: [AERIAL],
    inBrief: "A map shows a place as if seen from above. Pupils match a landmark seen at ground level, in an aerial photograph and on a plan.",
    keyFacts: [
      "An aerial photograph is taken from above, so roofs, treetops and paths are what we see. A plan is a drawing from above with simple shapes and symbols.",
      "A landmark is an easy-to-spot feature that helps us find our way, such as a church, a tall tree or a pond.",
      "From above, tall things hide the ground beside them and walls disappear. Roofs show as shapes.",
      "A symbol is a small picture or shape standing for a feature, so a plan can be read without words.",
      "Boundary: matching views and recognising features. Scale, compass rotation and measuring are not expected in Year 1.",
    ],
    misconceptions: [
      { mistake: "A plan should look like the front of the building.", why: "Children draw buildings from the side, as in pictures and books.", response: "Use a box on a table and view it from the front, then stand above it. Show the roof from above and draw that outline." },
      { mistake: "A map is a picture of what is directly in front of us.", why: "A map shows the whole place at once, which is unlike what children see.", response: "Place a toy on a plan of the room and walk it to its spot so the plan connects to where things really are." },
      { mistake: "Every symbol must look exactly like the thing.", why: "Pupils think a map is a small picture.", response: "Let children choose their own symbol and then explain it in a key, so a simple shape such as a square for a house works." },
    ],
    vocabulary: [
      { term: "aerial photograph", meaning: "A photograph taken from above." },
      { term: "plan", meaning: "A drawing of a place as if looked at from above." },
      { term: "landmark", meaning: "A feature that is easy to spot and helps us find our way." },
      { term: "symbol", meaning: "A simple picture or shape that stands for something on a map." },
      { term: "view", meaning: "What you can see from where you are." },
    ],
    before: "In the Early Years pupils draw information from a simple map and make their own maps and drawings of familiar places, often as part of Understanding the World.",
    next: "In Year 2 pupils read and make plans with symbols and keys (Aerial Views and Landmarks, Symbols and Map Keys, Making a Simple Map). Key stage 2 adds scale, grid references and digital maps.",
  },

  // ---------------------------------------------------------------- The United Kingdom
  "four-countries-of-the-uk": {
    statutory: [UK, MAPS],
    inBrief: "The United Kingdom is made up of four countries: England, Scotland, Wales and Northern Ireland. Pupils find them on a map and know the UK is in Europe.",
    keyFacts: [
      "The four countries are England, Scotland, Wales and Northern Ireland. Together they form the United Kingdom.",
      "England, Scotland and Wales share the island of Great Britain. Northern Ireland shares the island of Ireland with the Republic of Ireland, which is a different country and not part of the UK.",
      "The UK is in the continent of Europe, and is surrounded by sea.",
      "The map in a pupil's pack uses a clear outline. On a globe the UK is small, so pupils may need to find Europe first.",
      "Boundary: naming and locating the four countries. Counties, regions and national symbols beyond one simple characteristic each are not expected.",
    ],
    misconceptions: [
      { mistake: "Northern Ireland is not part of the UK, or Ireland is.", why: "The island has one name and Northern Ireland is separated from Great Britain by sea.", response: "Say that Northern Ireland is part of the UK but the Republic of Ireland is a different country. Colour the four UK countries and leave Ireland's south uncoloured." },
      { mistake: "England means the whole UK.", why: "People say 'England' for the UK, especially in sport and in the news.", response: "Say 'England is one of four countries' and ask pupils to point to the other three." },
      { mistake: "The UK is the same as Great Britain.", why: "The two names are often used together.", response: "Give Great Britain as the island with three countries and the UK as those three plus Northern Ireland." },
    ],
    vocabulary: [
      { term: "country", meaning: "A land with its own name and borders." },
      { term: "United Kingdom (UK)", meaning: "The four countries England, Scotland, Wales and Northern Ireland together." },
      { term: "England, Scotland, Wales, Northern Ireland", meaning: "The four countries of the UK." },
      { term: "Europe", meaning: "The continent the UK is part of." },
      { term: "map", meaning: "A drawing that shows where places are." },
    ],
    before: "In the Early Years pupils know that there are different countries in the world and that people live in many places, often by comparing their own life with others.",
    next: "In Year 2 pupils consolidate the UK and its places (UK Places and Landscapes). Key stage 2 adds counties, cities, regions and the wider British Isles.",
  },

  "uk-capital-cities": {
    statutory: [UK, HUMAN],
    inBrief: "Each UK country has a capital city: London, Edinburgh, Cardiff and Belfast. A capital is a city, but not every city is a capital.",
    keyFacts: [
      "England's capital is London, Scotland's is Edinburgh, Wales's is Cardiff and Northern Ireland's is Belfast.",
      "A capital is the city where a country's government is based. At this age it is enough to say it is the most important city of a country.",
      "London is in the south-east of England, Edinburgh in the south of Scotland, Cardiff on the south coast of Wales and Belfast on the east side of Northern Ireland.",
      "Bix pairs each capital with a landmark picture, such as the clock tower beside London's river, as a clue. Landmark trivia is not what pupils must memorise.",
      "Boundary: the four UK capitals. Capital cities of other countries and what each capital's government does are not Year 1 expectations.",
    ],
    misconceptions: [
      { mistake: "Every city is a capital.", why: "Pupils meet the word 'city' for their nearest big place and assume the biggest places are capitals.", response: "Show a map with the four capitals starred and name a city that is not one, such as Manchester or Glasgow, so a capital is a special city." },
      { mistake: "London is the capital of the whole UK, so the other three have none.", why: "London is also the UK's capital, and it is the one most often heard.", response: "Say London is the capital of England and of the UK. Each of the other three countries has its own capital too." },
      { mistake: "The capital is always the biggest city in its country.", why: "Capitals tend to be big and well known.", response: "Say a capital is chosen as the centre of government, not by size. Give each capital as a pair, country and city, and practise saying 'Cardiff is the capital of Wales'." },
    ],
    vocabulary: [
      { term: "capital city", meaning: "The most important city of a country, where its government meets." },
      { term: "city", meaning: "A big place where many people live and work." },
      { term: "London", meaning: "The capital of England." },
      { term: "Edinburgh", meaning: "The capital of Scotland." },
      { term: "Cardiff", meaning: "The capital of Wales." },
      { term: "Belfast", meaning: "The capital of Northern Ireland." },
    ],
    before: "In the Early Years pupils talk about different towns and cities and where people live, but do not yet name capitals.",
    next: "In Year 2 pupils consolidate UK places (UK Places and Landscapes). Key stage 2 pupils name and locate cities and regions of the UK and later the capitals of European countries.",
  },

  "seas-around-the-uk": {
    statutory: [UK, PHYSICAL],
    inBrief: "The UK is surrounded by water. Pupils name the North Sea, Irish Sea, English Channel and Atlantic Ocean and know that the coast is where land meets sea.",
    keyFacts: [
      "The North Sea is to the east of Great Britain, the English Channel is to the south between England and France, and the Irish Sea lies between Great Britain and Ireland.",
      "The Atlantic Ocean is to the west and north of the UK. It is an ocean, not a sea.",
      "The coast is the place where land meets the sea. The UK has a long coast because it is made of islands.",
      "A sea is part of an ocean that is usually partly enclosed by land. In Year 1 it is enough to say seas are smaller than oceans.",
      "Boundary: naming and locating these four waters on a map. Exact sea boundaries, tides and the Celtic Sea or other seas are not expected.",
    ],
    misconceptions: [
      { mistake: "The Atlantic is a sea.", why: "People say 'at the sea' for any salt water.", response: "Use the phrase 'the Atlantic Ocean' every time and sort pictured waters into sea or ocean." },
      { mistake: "The sea is on one side of the UK only.", why: "Children know one familiar beach and imagine a single coast.", response: "Draw the UK and put water on every side, then name the one for each side on a wall map." },
      { mistake: "The English Channel is a river or a tunnel.", why: "'Channel' sounds like a small waterway and the Channel Tunnel is well known.", response: "Show it on a map as a wide stretch of sea between England and France and say that boats and ferries cross it." },
    ],
    vocabulary: [
      { term: "coast", meaning: "Where the land meets the sea." },
      { term: "sea", meaning: "A big area of salt water, usually next to land." },
      { term: "ocean", meaning: "A very big area of salt water." },
      { term: "North Sea", meaning: "The sea to the east of Great Britain." },
      { term: "Irish Sea", meaning: "The sea between Great Britain and Ireland." },
      { term: "English Channel", meaning: "The sea between England and France." },
      { term: "Atlantic Ocean", meaning: "The ocean to the west of the UK." },
    ],
    before: "In the Early Years pupils talk about the seaside and about the water they find in the natural world, such as rivers, ponds and the sea.",
    next: "In Year 2 pupils use UK maps and landscapes (UK Places and Landscapes) and consolidate oceans (Continents and Oceans Together). Key stage 2 pupils study coasts, rivers and the UK's regions in more detail.",
  },

  // ---------------------------------------------------------------- The Wider World
  "seven-continents": {
    statutory: [CONTINENTS, MAPS],
    inBrief: "A continent is a very large area of land. There are seven: Africa, Antarctica, Asia, Europe, North America, South America and Australia. The UK is in Europe.",
    keyFacts: [
      "The seven continents are Africa, Antarctica, Asia, Europe, North America, South America and Australia. Some atlases call the Australian continent Oceania, which is an alternative name for a wider region.",
      "A globe is a round model of Earth and shows true shapes. A flat map must stretch Earth, so shapes and sizes look a little different.",
      "Antarctica is at the very bottom of the globe around the South Pole. It is mostly ice and has no permanent residents, only visiting scientists.",
      "Asia is the largest continent. Europe and Asia share one big landmass and the border between them is a convention.",
      "Boundary: naming and finding the seven on a map and globe, and placing the UK in Europe. Counting countries, populations and exact sizes are not expected.",
    ],
    misconceptions: [
      { mistake: "A continent is a country, such as Africa is a country.", why: "The word 'Africa' is often used as if it were one place.", response: "Say that a continent is much bigger and holds many countries. Show a few countries inside Africa on a map." },
      { mistake: "Greenland is bigger than Africa because it looks it on the map.", why: "Flat maps stretch land towards the top and bottom.", response: "Compare a flat map with a globe and say the globe shows size and shape most fairly." },
      { mistake: "The UK is its own continent.", why: "It is separated from the rest of Europe by sea.", response: "Say the UK is a group of islands off the coast of Europe and is part of that continent." },
    ],
    vocabulary: [
      { term: "continent", meaning: "A very large area of land." },
      { term: "globe", meaning: "A round model of Earth." },
      { term: "atlas", meaning: "A book of maps." },
      { term: "Europe", meaning: "The continent the UK is in." },
      { term: "Antarctica", meaning: "The icy continent at the bottom of the world." },
      { term: "Africa, Asia, Australia", meaning: "Three of the seven continents." },
      { term: "North America, South America", meaning: "Two of the seven continents." },
    ],
    before: "In the Early Years pupils know that the world has many countries and different places, and may meet a globe or atlas, usually without naming continents.",
    next: "In Year 2 pupils consolidate continents and oceans together (Continents and Oceans Together). Key stage 2 pupils locate the world's countries, with a focus on Europe, North and South America, and learn about latitude, longitude and the hemispheres.",
  },

  "five-oceans": {
    statutory: [CONTINENTS, PHYSICAL],
    inBrief: "Oceans are the largest areas of salt water on Earth. The five are the Pacific, Atlantic, Indian, Arctic and Southern Oceans.",
    keyFacts: [
      "The five oceans are the Pacific, Atlantic, Indian, Arctic and Southern. The Pacific is the biggest and the Atlantic is the second biggest.",
      "The Atlantic lies between the Americas and Europe and Africa. The Indian Ocean lies between Africa and Australia, with Asia to the north. The Arctic Ocean is at the top near the North Pole, and the Southern Ocean surrounds Antarctica.",
      "A flat world map is cut open, so the Pacific appears at both left and right edges. It is still one ocean.",
      "All the oceans are joined together, so the world's water is really one connected ocean with different names. Boundaries are agreed by convention.",
      "Boundary: naming the five and finding them on a map and globe. Depths, currents and exact boundaries are not expected.",
    ],
    misconceptions: [
      { mistake: "The Pacific at the left of the map and the Pacific at the right are two oceans.", why: "They appear far apart on a flat map.", response: "Turn a globe and show the Pacific is one continuous ocean. Cut a paper map and join the edges." },
      { mistake: "The Atlantic is only where the UK is.", why: "It is the ocean that children hear named most often locally.", response: "Trace the Atlantic from the UK down to Antarctica on a globe." },
      { mistake: "Oceans are just very big seas that are separate from one another.", why: "Pupils picture each water body with a hard edge.", response: "Run a finger from one ocean to the next on a globe without lifting it, showing that they join." },
    ],
    vocabulary: [
      { term: "ocean", meaning: "A very large area of salt water." },
      { term: "Pacific Ocean", meaning: "The biggest ocean." },
      { term: "Atlantic Ocean", meaning: "The ocean between the Americas and Europe and Africa." },
      { term: "Indian Ocean", meaning: "The ocean between Africa and Australia." },
      { term: "Arctic Ocean", meaning: "The icy ocean around the North Pole." },
      { term: "Southern Ocean", meaning: "The ocean around Antarctica." },
    ],
    before: "In the Early Years pupils talk about the sea, ponds and rivers and about creatures that live in water, but have not met the five named oceans.",
    next: "In Year 2 pupils consolidate continents and oceans together (Continents and Oceans Together). Key stage 2 pupils use latitude and longitude and study the world's oceans and water more widely.",
  },

  "hot-and-cold-places": {
    statutory: [WEATHER, MAPS],
    inBrief: "Places near the Equator are usually hot and places near the North and South Poles are usually cold. This is a pattern, not a rule for every place.",
    keyFacts: [
      "The Equator is an imaginary line around the middle of Earth. The North Pole is at the top of the globe and the South Pole at the bottom.",
      "In general it is warmer near the Equator and colder near the poles, because the Sun's light reaches the areas near the Equator more directly.",
      "Other things matter too. High mountains can be cold even near the Equator, and the sea and wind change the weather.",
      "The UK is not near either, so it is neither very hot nor very cold. Do not teach the Earth's tilt or latitude numbers in Year 1.",
      "Boundary: locating the Equator and the two poles on a globe and linking nearness to warmth. Degrees of latitude, climate zones and biomes are not expected.",
    ],
    misconceptions: [
      { mistake: "The Equator is a real line on the ground.", why: "It is drawn on globes and maps.", response: "Say it is an imaginary line we draw to help us. Stretch a string around the middle of a ball to show it." },
      { mistake: "All of one continent has the same weather, so all of Africa is hot.", why: "A single picture of a desert or jungle stands for a whole continent.", response: "Show mountain snow in a warm area and say places differ even in one continent." },
      { mistake: "The North Pole is where the Sun is closest, so it is hot.", why: "Pupils think 'top' means nearest the Sun.", response: "Use a torch and a globe to show the light is strong in the middle and weak at the top and bottom." },
    ],
    vocabulary: [
      { term: "Equator", meaning: "An imaginary line around the middle of Earth." },
      { term: "North Pole", meaning: "The place at the very top of Earth." },
      { term: "South Pole", meaning: "The place at the very bottom of Earth." },
      { term: "hot", meaning: "Very warm." },
      { term: "cold", meaning: "Not warm; very cool." },
      { term: "pattern", meaning: "Something that usually happens the same way." },
    ],
    before: "In the Early Years pupils talk about weather and how it changes, and know that people live in hot and cold places, often through stories and pictures.",
    next: "In Year 2 pupils deepen their reasoning (The Equator and the Poles). Key stage 2 pupils study latitude, the hemispheres, the tropics, climate zones and biomes.",
  },

  // ---------------------------------------------------------------- Weather and Exploring
  "daily-weather": {
    statutory: [WEATHER, FIELDWORK],
    inBrief: "Weather is what the air and sky are like now. Pupils name and record sunny, cloudy, rainy, windy and snowy weather using symbols.",
    keyFacts: [
      "Weather can be sunny, cloudy, rainy, windy or snowy, and more than one kind can happen on the same day.",
      "Observing is looking at the weather now. A forecast is a prediction about the weather later. Both are useful but they are different.",
      "A weather symbol is a simple picture for each kind of weather. A daily record uses one symbol or more for each day.",
      "Weather changes from hour to hour and day to day. Weather is not the same as the season or the climate.",
      "Boundary: observing and recording the weather with symbols. Measuring temperature or rainfall and reading forecasts are not expected. Bix records are example data, not real forecasts.",
    ],
    misconceptions: [
      { mistake: "It is either sunny or rainy, never both.", why: "Pupils choose the one weather word they notice most.", response: "Look outside on a showery day and record two symbols. Ask what you see in the sky and what you can feel." },
      { mistake: "Weather is the same in the whole UK on one day.", why: "Children know only the weather outside their window.", response: "Show a weather map or ask what a relative in another place sees, to show weather differs from place to place." },
      { mistake: "A forecast tells us what the weather is like now.", why: "The words are often used together on television.", response: "Say 'forecast' means 'a guess about later' and 'observe' means 'look now'. Compare a morning forecast with the afternoon." },
    ],
    vocabulary: [
      { term: "weather", meaning: "What the air and sky are like outside now." },
      { term: "sunny, cloudy, rainy, windy, snowy", meaning: "Words for kinds of weather." },
      { term: "symbol", meaning: "A simple picture that stands for something, such as a cloud for cloudy weather." },
      { term: "record", meaning: "Write or draw what you noticed so you can look at it again." },
      { term: "observe", meaning: "Look carefully at what is there now." },
      { term: "forecast", meaning: "A guess about what the weather will be later." },
    ],
    before: "In the Early Years pupils describe the weather and how it changes, and talk about the seasons, in daily talk and simple recording.",
    next: "In Year 2 pupils keep weather records and use them (Weather Records). Key stage 2 pupils compare climate and weather patterns around the world.",
  },

  "seasons-in-the-uk": {
    statutory: [WEATHER, PHYSICAL],
    inBrief: "The UK has four seasons: spring, summer, autumn and winter. They repeat every year, with typical changes in daylight, plants and weather.",
    keyFacts: [
      "The order is spring, summer, autumn, winter and then spring again. The seasons go round like a circle.",
      "Typical clues are blossom and new leaves in spring, long light days in summer, falling leaves in autumn, and short days and cold weather in winter.",
      "These are patterns, not rules. Rain can happen in any season and snow in winter is not guaranteed.",
      "Seasons are the same all over the UK, though the weather in them differs from place to place.",
      "Boundary: naming and ordering the four seasons and noticing typical changes. The reason for seasons (Earth's tilt) is not expected, and seasons in other parts of the world are not Year 1 content.",
    ],
    misconceptions: [
      { mistake: "It always snows in winter and is always sunny in summer.", why: "Picture books show one weather per season.", response: "Record real weather across a month and compare it with the picture book. Say 'usually' and 'often' for seasonal clues." },
      { mistake: "Seasons come in any order, or winter follows autumn then stops.", why: "Pupils think of seasons as a list rather than a cycle.", response: "Arrange the four on a circle with arrows so after winter comes spring." },
      { mistake: "The season changes all at once on one day.", why: "Calendar dates make it seem sudden.", response: "Watch the same tree each month and see how slowly it changes." },
    ],
    vocabulary: [
      { term: "season", meaning: "One of the four parts of the year." },
      { term: "spring, summer, autumn, winter", meaning: "The four seasons, in order." },
      { term: "cycle", meaning: "Something that goes round and starts again." },
      { term: "daylight", meaning: "The light of day, which is longer in summer." },
      { term: "blossom", meaning: "Flowers on a tree, often seen in spring." },
    ],
    before: "In the Early Years pupils talk about the four seasons, the changes in the natural world around them, and how trees and animals change across the year.",
    next: "In Year 2 pupils record weather and compare places (Weather Records). Science in Year 1 also names the seasons and observes changing weather and day length. Key stage 2 pupils learn why seasons happen and compare climates.",
  },

  "routes-and-simple-maps": {
    statutory: [COMPASS, AERIAL],
    inBrief: "Pupils use words such as near, far, left and right and the four compass directions to describe where things are, follow a short route and read a simple map key.",
    keyFacts: [
      "The four compass directions are North, South, East and West. A compass or north arrow shows which way is North. North is not always at the top of a map, so find the arrow first.",
      "Left and right depend on which way a person faces. When a friend faces you, their left is on your right.",
      "Near and far describe how close two things are. A route is the path from one place to another and can be given as two steps, such as 'go east, then north'.",
      "A map key shows what each symbol means. Pupils find a symbol in the key and then look for it on the map.",
      "Boundary: four compass points, simple routes and basic symbols. The eight points, grid references and scale are not expected in Year 1.",
    ],
    misconceptions: [
      { mistake: "North is always at the top of the page, or always up.", why: "Most maps are drawn that way, so it feels like a rule.", response: "Turn a map around and find the north arrow again, then say 'North is where the arrow points'." },
      { mistake: "Left and right never change.", why: "Children think of their own left and right only.", response: "Stand opposite a partner and ask each to point to their left hand, then to the other's. Use a figure on the map to name their left." },
      { mistake: "A key is a list of places, not of symbols.", why: "The key looks like a list of things.", response: "Cover the key and ask what the symbol could mean, then use the key to check." },
    ],
    vocabulary: [
      { term: "compass", meaning: "A tool or arrow that shows North, South, East and West." },
      { term: "North, South, East, West", meaning: "The four main directions." },
      { term: "route", meaning: "The way you go from one place to another." },
      { term: "key", meaning: "A box on a map that shows what each symbol means." },
      { term: "near and far", meaning: "Close to something and a long way from it." },
      { term: "left and right", meaning: "Directions that depend on which way you face." },
    ],
    before: "In the Early Years pupils use positional words such as next to, behind and in front of, and follow simple directions around familiar places.",
    next: "In Year 2 pupils use compass directions and routes and make their own maps (Compass Directions and Routes, Symbols and Map Keys, Making a Simple Map). Key stage 2 adds the eight points of a compass, grid references and scale.",
  },
};
