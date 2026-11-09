/**
 * Teacher subject-knowledge briefings for Year 3 Geography, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the key stage 2 programme of
 * study in docs/curriculum/key-stage-2-geography.md (the PDF text), using the
 * requirement that the topic's row in the "Topics mapped to statutory
 * requirements" table names. Never paraphrase or alter it: a test checks every
 * quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Key Stage 1 prior learning and the Year 4+ destination
 *
 * Place names, regions and map facts follow what Bix shows children.
 */
const UK_PLACES =
  "name and locate counties and cities of the United Kingdom, geographical regions and their identifying human and physical characteristics, key topographical features (including hills, mountains, coasts and rivers), and land-use patterns; and understand how some of these aspects have changed over time";
const WORLD_COUNTRIES =
  "locate the world’s countries, using maps to focus on Europe (including the location of Russia) and North and South America, concentrating on their environmental regions, key physical and human characteristics, countries, and major cities";
const GLOBE_LINES =
  "identify the position and significance of latitude, longitude, Equator, Northern Hemisphere, Southern Hemisphere, the Tropics of Cancer and Capricorn, Arctic and Antarctic Circle, the Prime/Greenwich Meridian and time zones (including day and night)";
const REGIONS =
  "understand geographical similarities and differences through the study of human and physical geography of a region of the United Kingdom, a region in a European country, and a region within North or South America";
const PHYSICAL =
  "physical geography, including: climate zones, biomes and vegetation belts, rivers, mountains, volcanoes and earthquakes, and the water cycle";
const HUMAN =
  "human geography, including: types of settlement and land use, economic activity including trade links, and the distribution of natural resources including energy, food, minerals and water";
const MAPS =
  "use maps, atlases, globes and digital/computer mapping to locate countries and describe features studied";
const COMPASS_GRID =
  "use the eight points of a compass, four and six-figure grid references, symbols and key (including the use of Ordnance Survey maps) to build their knowledge of the United Kingdom and the wider world";
const FIELDWORK =
  "use fieldwork to observe, measure, record and present the human and physical features in the local area using a range of methods, including sketch maps, plans and graphs, and digital technologies.";

export const YEAR3_GEOGRAPHY_BRIEFINGS = {
  // ---------------------------------------------------------------- The UK and Europe
  "counties-cities-and-regions": {
    statutory: [UK_PLACES],
    inBrief: "Places sit inside larger places: a city lies within a region or county, inside a country, inside the United Kingdom. Pupils learn to name selected places and to describe where they are using that nesting and the compass points.",
    keyFacts: [
      "The United Kingdom has four countries: England, Scotland, Wales and Northern Ireland. Their capitals are London, Edinburgh, Cardiff and Belfast.",
      "England is divided into regions (for example the North West and North East) and into counties. Bix uses English ceremonial counties such as Cumbria, North Yorkshire and Greater London, shown as markers, not boundaries.",
      "Manchester is a city in the North West of England, Newcastle upon Tyne a city in the North East, and Birmingham a city in the West Midlands. London is a city within Greater London.",
      "Scotland, Wales and Northern Ireland use different local-area systems from England, so the words county and region do not map onto them in the same way.",
      "Boundary: locating a manageable set of places and describing them from larger to smaller areas. Exact county boundaries and the history of local government are not expected.",
    ],
    misconceptions: [
      { mistake: "A city, a county and a country are the same kind of place.", why: "They are all names on a map, and some share a name (such as Greater London).", response: "Use nesting cards: city, region or county, country, UK. Ask pupils to place a label on the right layer and say 'is within' aloud." },
      { mistake: "England and the UK mean the same thing.", why: "Everyday speech uses them interchangeably.", response: "Show the UK as four coloured countries and England as one of them. Match each capital to its country." },
      { mistake: "A map marker shows where a county starts and stops.", why: "A dot or label looks like it covers the whole area.", response: "Point out the key note that markers show selected locations only. Compare with a map that does show boundaries." },
    ],
    vocabulary: [
      { term: "country", meaning: "A land with its own name and government area, such as England or Wales." },
      { term: "county", meaning: "A traditional area of England used for local identity and administration. Bix uses ceremonial counties." },
      { term: "region", meaning: "A larger area with shared features, such as the North West of England." },
      { term: "city", meaning: "A large settlement with many people, homes and services." },
      { term: "capital", meaning: "The city where a country's government is based or that has that special role." },
      { term: "United Kingdom", meaning: "The four countries of England, Scotland, Wales and Northern Ireland together." },
    ],
    before: "In Year 1 pupils name the four countries and capital cities of the UK and the seas around it. In Year 2 they use connected maps and meet UK Places and Landscapes.",
    next: "Year 4 adds Changing UK Landscapes and Maps, Atlases and Digital Mapping. Year 6 revisits UK counties and cities with dated change.",
  },

  "uk-landscapes-and-land-use": {
    statutory: [UK_PLACES, HUMAN],
    inBrief: "The UK has hills, mountains, coasts and rivers, and people use land for homes, farming, woodland and leisure. Comparing maps of the same place at two dates shows that land use can change.",
    keyFacts: [
      "Bix locates four examples: the Lake District (mountains and lakes in north-west England), the Pennines (uplands running through northern England), the River Thames (flowing through southern England) and Whitby (a coastal town on the North Yorkshire coast).",
      "A physical feature is natural (a hill, river or coast). A human feature is made or used by people (a house, road or field). Land use describes what people do on the land.",
      "Typical land-use categories are settlement, farming, woodland and leisure. A single place can have more than one use.",
      "Two maps of one place at different dates show change, such as a field replaced by houses. A map shows that something changed, not who decided it or why.",
      "Boundary: naming features, locating them and reading simple land use and change. A detailed change enquiry belongs to Year 4, and the plans in Bix are example data, not real observations.",
    ],
    misconceptions: [
      { mistake: "Land use is only about farming.", why: "Fields are the most obvious land use in pictures of the countryside.", response: "Sort a photo set into settlement, farming, woodland and leisure. Look for places where uses sit side by side." },
      { mistake: "The Pennines and the Lake District are the same place.", why: "Both are upland areas in the north of England.", response: "Mark each on the UK map and compare. The Lake District has lakes and the Pennines are a long chain of uplands." },
      { mistake: "If a map shows a change, it tells us the reason for it.", why: "Before and after pictures feel like a complete story.", response: "Ask 'What changed? What can we not tell from the maps?' and list what extra evidence would explain it." },
    ],
    vocabulary: [
      { term: "physical feature", meaning: "Something natural in the landscape, such as a hill, river or coast." },
      { term: "human feature", meaning: "Something made or used by people, such as a house, road or field." },
      { term: "land use", meaning: "What people do with an area of land." },
      { term: "settlement", meaning: "A place where people live, from a hamlet to a city." },
      { term: "upland", meaning: "High land, such as hills and mountains." },
      { term: "coast", meaning: "Where the land meets the sea." },
    ],
    before: "In Year 2 pupils learn UK Places and Landscapes, using physical and human vocabulary, and compare Whitby with Kampong Ayer.",
    next: "Year 4 studies Changing UK Landscapes, Settlements and Land Use, and Rivers and People. Year 6 returns to changing UK land use over time.",
  },

  "europe-and-russia": {
    statutory: [WORLD_COUNTRIES],
    inBrief: "Europe is a continent made up of many countries, and the UK is one of them. Russia is the largest country and has land in both Europe and Asia, with Moscow in the European part.",
    keyFacts: [
      "Bix locates nine countries: the UK, France, Spain, Italy, Germany, Norway, Poland, Greece and Russia. Europe has many more, so this is a starting set.",
      "The major cities are London, Paris, Rome, Berlin and Moscow.",
      "A continent is a very large area of land and a country is a part of one. Russia crosses the continental boundary, which is conventionally taken along the Ural Mountains, so most of its area is in Asia and most of its people live in the European part.",
      "Environments vary within countries. Bix uses northern Norway (rocky coast, high land), the Italian Alps (mountains) and the Spanish Mediterranean coast (sea beside land) as labelled examples. One example cannot describe a whole country.",
      "Boundary: locating a representative set of countries and cities and describing labelled examples. Capitals of every country, borders and political groupings are not expected.",
    ],
    misconceptions: [
      { mistake: "Europe is a country.", why: "Pupils hear 'in Europe' used like a place name, as they would say 'in France'.", response: "Use a two-level sort: continent, country. Ask which labels contain others." },
      { mistake: "Russia is in Asia only (or Europe only).", why: "It is shown as one colour, and atlases with a cut-off edge hide its eastern part.", response: "Show a world map with Russia whole, then mark Moscow and a far eastern point. Say the country has land in both continents." },
      { mistake: "Every part of Italy is warm and sunny, or all of Norway is icy.", why: "One photograph or a stereotype gets generalised to a country.", response: "Compare the Italian Alps with the Spanish coast. Ask what each example can and cannot tell us about its country." },
    ],
    vocabulary: [
      { term: "continent", meaning: "One of Earth's seven very large areas of land, such as Europe." },
      { term: "country", meaning: "A part of a continent with its own name and borders, such as Italy." },
      { term: "atlas", meaning: "A book or digital collection of maps." },
      { term: "capital city", meaning: "The city where a country's government sits." },
      { term: "environment", meaning: "The natural surroundings of a place: land, climate and plants." },
      { term: "Mediterranean", meaning: "The sea between southern Europe and North Africa, and the lands around it." },
    ],
    before: "In Year 1 pupils name the seven continents and five oceans. In Year 2 they connect continents and oceans on one world map.",
    next: "Year 4 turns to North and South American countries and cities. Year 5 places Andalusia in Spain. Year 6 widens Europe, including more of Russia.",
  },

  // ---------------------------------------------------------------- Lines on the Globe
  "the-equator-and-hemispheres": {
    statutory: [GLOBE_LINES],
    inBrief: "The Equator is an imaginary line around the middle of Earth at 0 degrees latitude. It divides the globe into the Northern and Southern Hemispheres, and some countries lie in both.",
    keyFacts: [
      "The Equator is a reference line drawn by people, not a line on the ground. It is halfway between the North and South Poles.",
      "North of it is the Northern Hemisphere and south of it the Southern Hemisphere. The UK and Italy are in the Northern Hemisphere.",
      "Ecuador and Brazil both have land on each side of the Equator. Quito, Ecuador's capital, lies just south of it, and Brasília in Brazil is south of it.",
      "A marker shows one place, not a whole country. The Equator does not follow every national boundary.",
      "Boundary: locating places north or south of the Equator and naming the hemispheres. Being in a hemisphere does not give a fixed weather rule, and the east-west hemispheres are not expected.",
    ],
    misconceptions: [
      { mistake: "The Equator is a real line or rope you could see.", why: "Globes and maps draw it as a solid line.", response: "Compare with the lines of a football pitch. Ask who decided where the Equator goes and why it is useful." },
      { mistake: "Each country is wholly in one hemisphere.", why: "Pupils think of countries as small and tidy.", response: "Show Ecuador and Brazil with the Equator crossing them, and ask which parts are north and which south." },
      { mistake: "It is hot everywhere in the Southern Hemisphere.", why: "Pupils link the Equator with heat and then stretch it to a whole half of the globe.", response: "Point out that the south includes Antarctica. Position tells where a place is, not its weather on any given day." },
    ],
    vocabulary: [
      { term: "Equator", meaning: "An imaginary line around Earth halfway between the poles, at 0 degrees latitude." },
      { term: "hemisphere", meaning: "Half of the globe." },
      { term: "Northern Hemisphere", meaning: "The half of Earth north of the Equator." },
      { term: "Southern Hemisphere", meaning: "The half of Earth south of the Equator." },
      { term: "latitude", meaning: "How far a place is north or south of the Equator." },
      { term: "globe", meaning: "A model of Earth shaped like a ball." },
    ],
    before: "In Year 1 pupils meet the Equator and poles through hot and cold places. In Year 2 they deepen this in The Equator and the Poles.",
    next: "Year 4 uses the Equator in Climate Zones and Biomes and Vegetation Belts. Year 5 reads real latitude and longitude coordinates and hemispheres.",
  },

  "tropics-and-polar-circles": {
    statutory: [GLOBE_LINES],
    inBrief: "Four more reference lines lie parallel to the Equator: the Tropics of Cancer and Capricorn and the Arctic and Antarctic Circles. They mark the limits of where the Sun can be directly overhead and where polar day and night occur.",
    keyFacts: [
      "The Tropic of Cancer is about 23.5 degrees north and the Tropic of Capricorn about 23.5 degrees south. The Arctic Circle is about 66.5 degrees north and the Antarctic Circle about 66.5 degrees south.",
      "Between the tropics the noon Sun can be directly overhead on some day of the year. It is never overhead north of the Tropic of Cancer or south of the Tropic of Capricorn, as in the UK.",
      "Beyond a polar circle there is at least one day with no sunset (polar day) and one with no sunrise (polar night).",
      "These patterns exist because Earth's axis is tilted, by about 23.5 degrees, as it travels around the Sun.",
      "Boundary: positioning the four lines relative to the Equator and a simple sunlight diagram. Pupils need not memorise or calculate degrees, and latitude alone does not decide climate.",
    ],
    misconceptions: [
      { mistake: "Everywhere between the tropics is hot and everywhere beyond the circles is frozen.", why: "The labels 'tropical' and 'polar' are used as weather words.", response: "Give examples such as high mountains in the tropics. Climate also depends on height, sea and wind, not latitude alone." },
      { mistake: "The seasons happen because Earth is closer to the Sun in summer.", why: "Closer feels like the obvious reason for hotter.", response: "Use a torch and a tilted ball to show how the tilt changes the angle and length of daylight. Do not claim distance as the cause." },
      { mistake: "The Sun is overhead at noon in the UK in summer.", why: "Summer noon feels high and bright.", response: "Compare shadow lengths and say the UK is north of the Tropic of Cancer, where the Sun is never straight overhead." },
    ],
    vocabulary: [
      { term: "Tropic of Cancer", meaning: "The line about 23.5 degrees north of the Equator." },
      { term: "Tropic of Capricorn", meaning: "The line about 23.5 degrees south of the Equator." },
      { term: "Arctic Circle", meaning: "The line about 66.5 degrees north, near the North Pole." },
      { term: "Antarctic Circle", meaning: "The line about 66.5 degrees south, near the South Pole." },
      { term: "polar day and night", meaning: "A day when the Sun does not set, or does not rise, beyond a polar circle." },
      { term: "tilt", meaning: "The lean of Earth's axis, which helps explain seasons." },
    ],
    before: "In Year 2 pupils reason about the Equator and the poles and why some places are hot and others cold.",
    next: "Year 4 uses these lines in Climate Zones, Biomes and Vegetation Belts, and Day, Night and Time Zones. Year 5 uses real coordinates.",
  },

  "latitude-and-longitude": {
    statutory: [GLOBE_LINES],
    inBrief: "Latitude and longitude are a pair of numbers that locate a place on the globe. Latitude measures north or south from the Equator, and longitude measures east or west from the Prime (Greenwich) Meridian.",
    keyFacts: [
      "Latitude lines run east to west around the globe and are numbered up to 90 degrees north and south. The Equator is 0 degrees latitude.",
      "Longitude lines run from pole to pole and are numbered up to 180 degrees east and west. The Prime Meridian, 0 degrees longitude, passes through Greenwich in London.",
      "A coordinate pair needs two numbers with directions, such as 20 degrees north, 20 degrees west. Bix gives latitude first.",
      "Globe coordinates are different from the OS eastings and northings used on grid maps in the Maps and Local Surveys lessons.",
      "Boundary: reading simple supplied coordinates on a large practice grid. Minutes and seconds, finding a real place's exact coordinates and time zones come later (time zones in Year 4).",
    ],
    misconceptions: [
      { mistake: "Mixes up latitude and longitude.", why: "Both are 'lines' and have similar names.", response: "Give a memory hook: latitude lines are like the rungs of a ladder, 'flat-itude'. Always ask 'north or south, east or west?' first." },
      { mistake: "A coordinate is just one number.", why: "Grid squares or a house number use one number.", response: "Play a finding game: one number leaves a whole line of places, and two numbers give one point." },
      { mistake: "Drops or swaps the direction, so 20 degrees west becomes 20 degrees east.", why: "Pupils concentrate on the number and forget the direction word.", response: "Insist on a full phrase, number plus direction, and check against the labelled axes." },
    ],
    vocabulary: [
      { term: "latitude", meaning: "Position north or south of the Equator, in degrees." },
      { term: "longitude", meaning: "Position east or west of the Prime Meridian, in degrees." },
      { term: "Prime Meridian", meaning: "The 0 degrees line of longitude, also called the Greenwich Meridian." },
      { term: "coordinates", meaning: "A pair of numbers that locate a point." },
      { term: "degree", meaning: "The unit used to measure latitude and longitude, written with a small circle." },
      { term: "axis", meaning: "A line used to read a position, such as the side or bottom of a grid." },
    ],
    before: "In Year 2 pupils use simple maps and keys and meet the Equator and poles. They have not used a coordinate pair.",
    next: "Year 4 adds the Meridian and Day, Night and Time Zones. Year 5 reads real latitude and longitude for places and hemispheres.",
  },

  // ---------------------------------------------------------------- Physical Processes
  "mountains-and-valleys": {
    statutory: [PHYSICAL, UK_PLACES],
    inBrief: "Mountains and hills are raised land and valleys lie between them. Some mountains form when moving plates push land upwards, but mountains have different origins and not all are volcanoes.",
    keyFacts: [
      "Mountains are higher and usually steeper than hills. There is no single worldwide height that separates them, though in the UK 600 m is often used.",
      "A valley is low land between hills or mountains. Slopes can be steep or gentle, and gentle land is often easier for farming and building roads.",
      "Some mountain ranges form when plates push towards each other and squeeze rock upwards, as with the Alps. Other mountains form in different ways, including volcanoes.",
      "Bix examples are Scafell Pike in the Lake District (England's highest mountain) and the Alps, which include mountains in northern Italy.",
      "Boundary: naming features, locating the examples and reading a simple formation diagram. Contour lines and slope calculations are not expected, and the many types of mountain are not taught.",
    ],
    misconceptions: [
      { mistake: "Every mountain is a volcano.", why: "Cartoon mountains often have a crater, and pupils link both to being tall.", response: "Compare the formation diagram with a volcano cross-section. Say clearly that some mountains are volcanoes and many are not." },
      { mistake: "Valleys are always carved by rivers and always have a river in the bottom.", why: "Pictures of valleys usually include a river.", response: "Say valleys can be shaped by rivers or ice and some are dry. Use 'low land between slopes' as the definition." },
      { mistake: "The tallest-looking hill is the highest.", why: "Perspective makes nearby hills look bigger.", response: "Compare heights in a table, not just photographs, and discuss why heights need measuring." },
    ],
    vocabulary: [
      { term: "mountain", meaning: "A very high area of raised land, usually with steep slopes." },
      { term: "hill", meaning: "Raised land lower than a mountain." },
      { term: "valley", meaning: "Low land between hills or mountains." },
      { term: "slope", meaning: "The side of a hill or mountain. It can be steep or gentle." },
      { term: "plate", meaning: "A huge moving piece of Earth's outer layer." },
      { term: "summit", meaning: "The highest point of a mountain." },
    ],
    before: "In Year 1 and Year 2 pupils use words such as hill, mountain, valley and coast and meet UK Places and Landscapes.",
    next: "Year 4 follows rivers from source to mouth in River Journeys. Year 5 reads contour lines and spot heights, and Year 6 studies glaciers and mountain environments.",
  },

  volcanoes: {
    statutory: [PHYSICAL, WORLD_COUNTRIES],
    inBrief: "A volcano is an opening in Earth's crust through which molten rock can reach the surface. Magma is molten rock below ground and lava is the same material once it reaches the surface.",
    keyFacts: [
      "Crust is Earth's thin outer rocky layer. Magma collects below it, rises up a vent and may erupt through a crater at the top.",
      "The same molten rock is called magma below ground and lava at the surface.",
      "Bix studies Vesuvius, a volcano in Campania in southern Italy, near Naples. It is an active volcano that scientists monitor.",
      "Volcanic places can bring benefits, such as fertile soils and visitors, and challenges, such as danger to homes and farms. A benefit does not cancel a challenge.",
      "Boundary: parts of a volcano, the magma to lava route and locating Vesuvius. Types of volcano, current alert levels, eruption predictions and disaster stories are not expected.",
    ],
    misconceptions: [
      { mistake: "Magma and lava are two different materials.", why: "They have different names, so they sound like different things.", response: "Show the flow diagram and say the name changes with the location: below ground is magma, at the surface is lava." },
      { mistake: "All mountains are volcanoes, and all volcanoes are mountains.", why: "Many pictures show a cone-shaped mountain.", response: "Compare with the mountains topic. Say a volcano is defined by how it erupts molten rock, not just by its shape." },
      { mistake: "People never live near volcanoes.", why: "Pupils see only dramatic eruptions.", response: "Show Naples and the farmland around Vesuvius. Discuss why people stay, and why scientists keep watch." },
    ],
    vocabulary: [
      { term: "volcano", meaning: "An opening in Earth's crust where molten rock, ash and gas can come out." },
      { term: "magma", meaning: "Molten rock below the ground." },
      { term: "lava", meaning: "Molten rock that has reached the surface." },
      { term: "vent", meaning: "The passage that carries material up through a volcano." },
      { term: "crater", meaning: "The bowl-shaped opening at the top of a volcano." },
      { term: "crust", meaning: "Earth's thin, rocky outer layer." },
    ],
    before: "In Year 1 and Year 2 pupils meet landscape and place words but not volcanoes. In Year 3 Science rocks and soils are studied, not volcanic processes.",
    next: "Year 5 looks at living with volcanoes and earthquakes. Year 4 climate and biome work revisits where hazards and resources sit on the globe.",
  },

  earthquakes: {
    statutory: [PHYSICAL, MAPS],
    inBrief: "An earthquake is shaking of the ground. It happens when energy is released by sudden movement along a break in the rock called a fault.",
    keyFacts: [
      "Earth's outer layer is divided into moving plates. Stress builds where rock is held, then the rock suddenly slips along a fault and energy spreads as shaking.",
      "Many earthquakes happen near plate boundaries, but some happen away from them. Bix maps Japan, California and Italy as studied areas, not live alerts.",
      "Scientists record where earthquakes happen and how the ground moves. Records help them study patterns and plan safer buildings.",
      "Scientists cannot yet predict the exact date, place and size of a future earthquake, even where they know earthquakes are likely.",
      "Boundary: shaking, fault, plates and why recording is not predicting. Magnitude scales, damage and injury imagery and any current event feeds are not expected.",
    ],
    misconceptions: [
      { mistake: "Scientists can tell us when the next earthquake will happen.", why: "Weather forecasts give dates and times, so pupils expect the same.", response: "Say earthquakes can be recorded and mapped, and that patterns show where they are likely, not exactly when." },
      { mistake: "The ground opens up and swallows things during every earthquake.", why: "Films show it, and the word 'fault' suggests a gap.", response: "Return to the fault diagram: the rock slips past, and the main effect is shaking that travels through the ground." },
      { mistake: "Earthquakes only happen in far-away countries.", why: "Pupils see news from places with large earthquakes.", response: "Say the UK has small earthquakes too, most too weak to feel, and that scientists record them as well." },
    ],
    vocabulary: [
      { term: "earthquake", meaning: "Shaking of the ground caused by sudden movement of rock." },
      { term: "fault", meaning: "A break in rock where movement can happen." },
      { term: "plate", meaning: "A huge moving piece of Earth's outer layer." },
      { term: "plate boundary", meaning: "Where two plates meet." },
      { term: "energy", meaning: "What is released in an earthquake and makes the ground shake." },
      { term: "predict", meaning: "To say exactly when and where something will happen before it does." },
    ],
    before: "Earlier years have no earthquake content. Pupils have used simple world maps and the words continent and ocean.",
    next: "Year 5 studies living with volcanoes and earthquakes, including how people prepare. Year 4 uses plate and hazard ideas lightly in regional work.",
  },

  "the-water-cycle": {
    statutory: [PHYSICAL],
    inBrief: "Water moves around Earth in a repeating cycle of evaporation, condensation, precipitation and collection. The Sun supplies the energy that keeps it going.",
    keyFacts: [
      "Evaporation turns liquid water into water vapour, an invisible gas. Condensation turns water vapour into tiny droplets, which form clouds.",
      "Clouds are made of water droplets or ice, not of water vapour, because vapour cannot be seen.",
      "Precipitation is water falling as rain, snow or hail. Collection and runoff happen when water gathers and flows across land into rivers, lakes and the sea.",
      "A cycle has no real starting point, so questions name one. Water can also follow other routes, such as soaking into the ground.",
      "Boundary: the four stages in order and the Sun's role. Transpiration, groundwater and the particle explanation are later, and the states of matter belong in Year 4 Science.",
    ],
    misconceptions: [
      { mistake: "The white cloud above a boiling kettle or a cloud in the sky is water vapour.", why: "It looks like 'steam' and the word vapour is used loosely.", response: "Say vapour is invisible. What we see is tiny droplets that have already condensed." },
      { mistake: "Rain comes from a hole or a store of water in the sky.", why: "Pupils picture clouds as tanks.", response: "Use a cold-lid-over-hot-water demonstration to show droplets forming and growing until they fall." },
      { mistake: "The water cycle starts when it rains.", why: "Rain is the stage pupils notice most.", response: "Ask pupils to pick a different start each time and trace round the loop to show the cycle has no fixed beginning." },
    ],
    vocabulary: [
      { term: "evaporation", meaning: "Liquid water changing into an invisible gas, water vapour." },
      { term: "water vapour", meaning: "Water as an invisible gas in the air." },
      { term: "condensation", meaning: "Water vapour cooling and turning into tiny droplets." },
      { term: "precipitation", meaning: "Water falling from clouds as rain, snow or hail." },
      { term: "runoff", meaning: "Water flowing over the land into rivers, lakes and the sea." },
      { term: "collection", meaning: "Water gathering in rivers, lakes and the sea." },
    ],
    before: "In Years 1 and 2 pupils meet weather, rain and seasons, and the sea as a part of the UK. They have not named the stages.",
    next: "Year 4 Science covers evaporation and condensation in the water cycle, and Year 4 Geography follows River Journeys. Year 5 looks at rivers in flood.",
  },

  // ---------------------------------------------------------------- Two European Regions
  "the-lake-district": {
    statutory: [REGIONS, HUMAN],
    inBrief: "The Lake District is a National Park in north-west England. Its mountains, valleys and lakes shape how people live and work, especially through farming and tourism.",
    keyFacts: [
      "Bix uses the National Park boundary as the region: the outlined area is the study region. Keswick, Ambleside, Windermere and Derwentwater lie within it and Scafell Pike, England's highest mountain, is in it.",
      "Kendal is a nearby town just outside the park boundary, so it must not be described as inside it.",
      "The region is in Cumbria. Its mountains and valleys are the physical features, and its lakes include Windermere and Derwentwater.",
      "Farming (especially sheep) and tourism are both part of local life, alongside homes, shops and other jobs. One photograph cannot show every job.",
      "Boundary: locating the region and linking landscape to livelihoods using the evidence supplied. Visitor totals, which change, and the park's history are not expected.",
    ],
    misconceptions: [
      { mistake: "The Lake District is all tourism and scenery, with no one living or working there.", why: "Photographs and holiday stories show visitors and views.", response: "Look for evidence of homes, farms, shops and schools. Ask who lives and works there all year." },
      { mistake: "Kendal is inside the National Park because it is close to the lakes.", why: "Nearness is mistaken for being inside the boundary.", response: "Use the outlined boundary on the map and check each place against it." },
      { mistake: "It is a region only of mountains.", why: "The name and the pictures focus on peaks.", response: "Sort features into mountains, valleys, lakes and settlements, and show that all four are in the same region." },
    ],
    vocabulary: [
      { term: "National Park", meaning: "A protected area of countryside where people live and work and the landscape is looked after." },
      { term: "region", meaning: "An area with a boundary and shared features that we choose to study." },
      { term: "lake", meaning: "A large area of water surrounded by land." },
      { term: "tourism", meaning: "People visiting a place for a holiday or day out." },
      { term: "livelihood", meaning: "The way people earn the money they need to live." },
      { term: "boundary", meaning: "The line that marks the edge of an area." },
    ],
    before: "In Year 2 pupils compare two small places, Whitby and Kampong Ayer. This is their first study of a whole region.",
    next: "Year 4 compares three regions in Comparing Three Regions, adding Washington State. Year 5 studies the Scottish Highlands as a further UK region.",
  },

  campania: {
    statutory: [REGIONS, HUMAN],
    inBrief: "Campania is a region in southern Italy with a coast, uplands and busy settlements. Its capital Naples, its port and Vesuvius sit within it, and people work in farming, tourism and port activity.",
    keyFacts: [
      "Campania is an administrative region of Italy, in Europe. The region's capital is Naples, on the Bay of Naples.",
      "Vesuvius is a volcano within Campania near Naples. It is one place in the region, not the whole region.",
      "The coast and the uplands are physical features. The Mediterranean climate has hot, dry summers and mild, wetter winters.",
      "Bix uses evidence about homes, port activity, farming and tourism. A photograph cannot prove how every building is used.",
      "Boundary: locating the region and reading evidence about land and work. Detailed economic figures and history, such as the story of Pompeii, are not expected.",
    ],
    misconceptions: [
      { mistake: "Campania is a city, or is the same as Naples.", why: "Naples is the best-known place and often appears in captions.", response: "Show Italy, then Campania, then Naples as nested areas on the closer map." },
      { mistake: "Vesuvius describes the whole region.", why: "The volcano is the famous feature.", response: "List other features: the coast, farmland, a port and towns. Ask what the region would look like without Vesuvius." },
      { mistake: "Italy is all one climate and landscape.", why: "Pupils generalise from one photograph.", response: "Compare Campania with the Italian Alps from the Europe topic. Say a region is a small part of a country." },
    ],
    vocabulary: [
      { term: "Campania", meaning: "A region in southern Italy." },
      { term: "Naples", meaning: "The main city and port of Campania." },
      { term: "Vesuvius", meaning: "An active volcano in Campania, near Naples." },
      { term: "port", meaning: "A place on the coast where ships load and unload." },
      { term: "Mediterranean climate", meaning: "Hot, dry summers and mild, wetter winters." },
      { term: "region", meaning: "An area with a boundary that we choose to study." },
    ],
    before: "In Year 2 pupils compare two small places, Whitby and Kampong Ayer in Brunei. Year 3 Europe and Russia places Italy in Europe.",
    next: "Year 4 compares all three regions. Year 5 studies Andalusia in Spain as a further European region, and Year 6 adds a fourth comparison.",
  },

  "comparing-two-regions": {
    statutory: [REGIONS],
    inBrief: "Comparing the Lake District and Campania uses the same questions for both: land and water, settlements, land use and climate. Good comparisons name both similarities and differences and use evidence.",
    keyFacts: [
      "Compare like with like: relief and water, settlements, farming and tourism, and the same climate measures for the same time period.",
      "Similarities include mountains and valleys, farming and tourism, and settlements near water. Differences include the Italian coast and port, a volcano, and a warmer, drier summer in Campania.",
      "Climate summaries in Bix are for one location in each region over the same thirty years. They do not describe a whole region or country.",
      "A country-level fact, such as something true of Italy, is not evidence about a region.",
      "Boundary: at least two supported similarities and two differences, and a careful note on what the evidence cannot show. Statistics beyond the supplied summaries are not expected.",
    ],
    misconceptions: [
      { mistake: "Comparing means only listing differences.", why: "Differences stand out more than shared features.", response: "Use a Venn diagram with a middle section and ask for evidence in each part." },
      { mistake: "One climate record describes the whole region.", why: "A single number feels like a fact about the whole place.", response: "Point out it is one location. Ask what other places in the region might be like." },
      { mistake: "Italy and the UK facts can stand in for the regions.", why: "Country facts are easier to find than regional ones.", response: "Check each statement is about the Lake District or Campania, not the country." },
    ],
    vocabulary: [
      { term: "similarity", meaning: "Something the same in both places." },
      { term: "difference", meaning: "Something not the same in the two places." },
      { term: "evidence", meaning: "Maps, photographs and records that support a claim." },
      { term: "compare", meaning: "Look at two things using the same questions." },
      { term: "climate", meaning: "The usual weather of a place over many years." },
      { term: "relief", meaning: "The shape of the land: how high, flat or steep it is." },
    ],
    before: "In Year 2 pupils compare Whitby and Kampong Ayer using human and physical features.",
    next: "Year 4 compares three bounded regions. Year 5 compares the Scottish Highlands with Andalusia, and Year 6 ends with an evidence-based decision.",
  },

  // ---------------------------------------------------------------- Maps and Local Surveys
  "eight-compass-points": {
    statutory: [COMPASS_GRID],
    inBrief: "The eight compass points are north, north-east, east, south-east, south, south-west, west and north-west. Pupils read a direction from one place to another using a north arrow.",
    keyFacts: [
      "The four cardinal points are north, east, south and west. The four between them are north-east, south-east, south-west and north-west.",
      "Say north or south first, then east or west: north-east, not east-north.",
      "Direction depends on where you start. If B is north-east of A, then A is south-west of B.",
      "Use the north arrow: north is not always at the top of a map, so check before reading it. Bix practice maps have north pointing up.",
      "Boundary: eight points and simple routes. Compass bearings in degrees are not expected.",
    ],
    misconceptions: [
      { mistake: "North is always at the top of the page.", why: "Most maps pupils see are drawn that way.", response: "Turn a map and re-find north from the arrow. Ask which way the arrow now points." },
      { mistake: "Reads the direction the wrong way round, from B to A.", why: "Pupils forget which place is the starting point.", response: "Place a finger on the start and say 'from here to there'. Check by reversing the answer to its opposite." },
      { mistake: "A diagonal step is two separate moves in the same direction.", why: "Pupils count along and up separately.", response: "Draw a diagonal path on a grid and show it changes both horizontal and vertical position." },
    ],
    vocabulary: [
      { term: "compass", meaning: "A tool with a needle that points north, or the set of direction names." },
      { term: "cardinal points", meaning: "The four main directions: north, east, south and west." },
      { term: "north arrow", meaning: "The symbol on a map that shows where north is." },
      { term: "direction", meaning: "The way from one place to another." },
      { term: "north-east", meaning: "The direction halfway between north and east." },
      { term: "route", meaning: "The path from one place to another." },
    ],
    before: "In Year 1 pupils use the four compass directions and positional language. In Year 2 they follow routes and build simple maps.",
    next: "Year 4 adds six-figure grid references and digital mapping. Year 5 reads contour lines, spot heights and grid distances.",
  },

  "four-figure-grid-references": {
    statutory: [COMPASS_GRID],
    inBrief: "A four-figure grid reference names one square on a map. Read the eastings (along) first and then the northings (up), using the lower-left corner of the square.",
    keyFacts: [
      "Grid lines are numbered. Eastings run up the map and are read along the bottom. Northings run across the map and are read up the side.",
      "'Along the corridor, then up the stairs': give the easting first, then the northing. A reference such as 3 4 means line 3 across and line 4 up.",
      "The two numbers come from the lower-left corner of the square, so the whole square is named.",
      "Keys explain the symbols. Bix includes a licensed Ordnance Survey extract with its real key, in the NY grid area, and a numbered grid added for practice.",
      "Boundary: four-figure references to a square. Six-figure references that locate a point within a square belong to Year 4.",
    ],
    misconceptions: [
      { mistake: "Gives the northing before the easting.", why: "Coordinates in other work, such as latitude first, feel natural.", response: "Chant 'along the corridor, up the stairs' and mark the order with arrows on a grid." },
      { mistake: "Reads the grid reference at the square's upper-right corner or the middle.", why: "Pupils choose any corner or the centre.", response: "Highlight the lower-left corner, then draw the square up and across from it." },
      { mistake: "Counts squares instead of reading the numbered lines.", why: "Counting squares from the edge feels natural.", response: "Teach pupils to read the numbers on the lines, since numbers do not always start at 1." },
    ],
    vocabulary: [
      { term: "grid reference", meaning: "Numbers that tell you which square a place is in." },
      { term: "easting", meaning: "A number on a line that runs up the map; read it first." },
      { term: "northing", meaning: "A number on a line that runs across the map; read it second." },
      { term: "symbol", meaning: "A small picture or sign on a map that stands for a feature." },
      { term: "key", meaning: "The box that explains what the map symbols mean." },
      { term: "Ordnance Survey", meaning: "The organisation that makes detailed maps of Britain." },
    ],
    before: "In Year 2 pupils read symbols and keys and make a simple map. They have used no numbered grid.",
    next: "Year 4 teaches six-figure grid references. Year 6 uses them on 1:25 000 and 1:50 000 Ordnance Survey extracts.",
  },

  "surveying-local-land-use": {
    statutory: [FIELDWORK, HUMAN],
    inBrief: "A land-use survey asks a question about a place, such as how land is used near school, and answers it with careful observations. Pupils choose categories, tally what they see, make a sketch map and present a simple graph.",
    keyFacts: [
      "Start with an enquiry question that can be answered by looking. Choose clear categories such as homes, shops, parks and an uncertain category for anything unclear.",
      "Use the same categories and the same method at each observation point so the results can be compared.",
      "A tally, a sketch map and a bar graph present the results. A graph describes the sampled places, not the whole neighbourhood.",
      "An aerial photo alone cannot prove what a building is used for today. Check with a visit or another source.",
      "Boundary: Bix uses labelled example data to prepare for real fieldwork. Real observations are made outdoors with a grown-up. Large samples and statistics are not expected.",
    ],
    misconceptions: [
      { mistake: "The results from two sites describe the whole area.", why: "A graph looks like a complete picture.", response: "Ask 'Which places did we not look at?' and say the conclusion covers only the sample." },
      { mistake: "Every building fits neatly into one category.", why: "Pupils want a single right answer.", response: "Add an 'uncertain' or 'mixed use' category and give a rule for using it." },
      { mistake: "A photograph proves what a building is used for.", why: "Appearance seems like proof.", response: "Compare a shop-fronted building that is now empty or a house with a business sign, and discuss what extra evidence would settle it." },
    ],
    vocabulary: [
      { term: "survey", meaning: "A careful look at a place to collect information." },
      { term: "enquiry question", meaning: "The question a survey sets out to answer." },
      { term: "land use", meaning: "What an area of land or a building is used for." },
      { term: "tally", meaning: "A count made by marks, in groups of five." },
      { term: "sketch map", meaning: "A simple drawing of a place showing the main features." },
      { term: "sample", meaning: "The places you actually observe, not every place." },
    ],
    before: "In Year 2 pupils observe their school grounds and explore the local area, and build a simple map with a key.",
    next: "Year 4 carries out a Local Fieldwork Enquiry with measured data. Year 5 designs enquiries and Year 6 leads a full fieldwork enquiry.",
  },
};
