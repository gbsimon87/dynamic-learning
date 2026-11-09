/**
 * Teacher subject-knowledge briefings for Year 4 Geography, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the key stage 2 programme of
 * study in docs/curriculum/key-stage-2-geography.md (the PDF text), using the
 * requirement that the topic's row in the "Topics mapped to statutory
 * requirements" table names (Years 3 and 4 share that table). Never paraphrase
 * or alter it: a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Year 3 prior learning and the Year 5+ destination
 *
 * Place names, regions and map facts follow what Bix shows children. Practice
 * data in Bix is labelled example data; real climate records are model
 * summaries for single places, 2001 to 2025.
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

export const YEAR4_GEOGRAPHY_BRIEFINGS = {
  // ---------------------------------------------------------------- North and South America
  "north-american-countries-and-cities": {
    statutory: [WORLD_COUNTRIES, MAPS],
    inBrief: "North America is a continent made of many countries, not just the USA. Pupils learn to place a sample of countries and cities and to tell continent, country and city apart.",
    keyFacts: [
      "Bix's study countries are Canada, the USA, Mexico and Cuba, with the cities Ottawa, Washington DC, Mexico City and Havana. Canada lies north of the USA and Mexico to its south; Cuba is an island country in the Caribbean.",
      "Bix treats North America as including Central America (for example Guatemala and Costa Rica) and the Caribbean islands. Some atlases and countries use other conventions, for example one continent called the Americas.",
      "Washington DC, the US capital, is on the east coast and is not in Washington State, which is in the north-west.",
      "Environmental regions cross borders: the Rocky Mountains run through Canada and the USA, the Great Plains are mostly open grassland in both, and northern Canada has tundra, where it is too cold for trees.",
      "Boundary: a sample of countries, cities and regions. Pupils do not learn every country or capital, and political disputes are not assessed.",
    ],
    misconceptions: [
      { mistake: "America means the USA, so North America is just the USA.", why: "Everyday speech and media use 'America' for the USA.", response: "Use a map with country outlines. Ask pupils to place Canada, Mexico and Cuba and say 'the USA is one country in North America'." },
      { mistake: "Washington DC is in Washington State.", why: "They share a name and pupils meet both in the same year.", response: "Locate both on one map and compare their positions. Use 'DC, the capital' and 'the state' consistently." },
      { mistake: "A region such as the Rockies belongs to one country.", why: "Country maps colour each country separately.", response: "Overlay the mountain range on the border and name both countries it crosses." },
    ],
    vocabulary: [
      { term: "continent", meaning: "A huge area of land, such as North America." },
      { term: "country", meaning: "A nation with its own territory and government, such as Canada." },
      { term: "capital", meaning: "The city where a country's government is based." },
      { term: "environmental region", meaning: "A large area with similar landscape and climate, often crossing country borders." },
      { term: "tundra", meaning: "Very cold land where trees cannot grow." },
      { term: "plains", meaning: "Large, fairly flat areas of open land." },
    ],
    before: "In Year 3 pupils located the UK, Europe and Russia (Counties Cities and Regions, Europe and Russia) and met the Equator and hemispheres, which help place the Americas on a globe.",
    next: "Year 5 places the Amazon region of Brazil in South America (The Amazon Region of Brazil). Year 6 widens the places studied (Europe the Americas and Russia, Belize and the Caribbean Coast).",
  },

  "south-american-countries-and-cities": {
    statutory: [WORLD_COUNTRIES, MAPS],
    inBrief: "South America has many countries and many landscapes. Pupils place Brazil, Peru, Chile and Argentina with their cities and see that mountains, rainforest and grassland run across borders.",
    keyFacts: [
      "Bix's study countries are Brazil, Peru, Chile and Argentina with the cities Brasilia, Lima, Santiago and Buenos Aires. Brazil is in the east, Peru and Chile touch the Pacific, and Chile is long and narrow with Argentina to its east.",
      "Brasilia, not Rio de Janeiro or Sao Paulo, is the capital of Brazil.",
      "The Amazon Basin is the huge area drained by the Amazon River, and covers eight countries and French Guiana. The Andes are a long mountain range running through seven countries. The Pampas are grassland covering parts of Argentina, Uruguay and Brazil.",
      "A continent holds many climates: the Amazon Basin is hot and wet, high Andes are cold, and the Pampas are mild. Bix's climate figures are single model grid cells and do not describe a whole region.",
      "Boundary: a sample of countries, cities and three regions. Pupils do not learn every country or capital.",
    ],
    misconceptions: [
      { mistake: "South America is all rainforest and hot.", why: "The Amazon is the best-known image of the continent.", response: "Compare Amazon, Andes and Pampas evidence side by side and ask which statements are true of all three." },
      { mistake: "The biggest or best-known city is the capital.", why: "Cities such as Rio de Janeiro are far more famous than Brasilia.", response: "Make a capital and city card pair for each study country and check the key note on each map." },
      { mistake: "A mountain range or rainforest belongs to one country.", why: "Country maps colour each country separately.", response: "Count the countries the Andes pass through and trace the Amazon Basin across borders." },
    ],
    vocabulary: [
      { term: "Amazon Basin", meaning: "The huge area of land drained by the Amazon River and its tributaries." },
      { term: "Andes", meaning: "A very long mountain range down the west of South America." },
      { term: "Pampas", meaning: "Flat grassland in parts of Argentina, Uruguay and Brazil." },
      { term: "capital", meaning: "The city where a country's government is based." },
      { term: "Pacific Ocean", meaning: "The ocean along the west coast of South America." },
      { term: "environmental region", meaning: "A large area with similar landscape and climate, often crossing country borders." },
    ],
    before: "In Year 3 pupils located Europe and Russia and used latitude and longitude lines on globes. They have not yet studied South America.",
    next: "Year 5 studies the Amazon region of Brazil in depth (The Amazon Region of Brazil). Year 6 revisits the Americas (Europe the Americas and Russia).",
  },

  "washington-state": {
    statutory: [REGIONS],
    inBrief: "Washington State is the Year 4 region within North America. Its landscapes and ways of life differ on either side of the Cascade Range, so one place cannot stand for the whole state.",
    keyFacts: [
      "Washington State is in the north-west USA beside the Pacific Ocean. Olympia is the state capital and Seattle the largest city. Washington DC is a different place on the east coast.",
      "The Cascade Range runs north to south. Seattle and Olympia lie to the west, and Spokane and Yakima to the east.",
      "West of the Cascades the climate is mostly mild and wet. East of them it is much drier because the mountains block moist air from the Pacific (a rain shadow), so farms there depend on irrigation. The Yakima Valley is known for apple orchards.",
      "Seattle and Tacoma are ports on Puget Sound, and the Columbia River flows through the state. In Olympic National Park the west-facing valleys get far more rain than Port Angeles, in the rain shadow.",
      "Boundary: bounded regional study using evidence from several places. Pupils are not expected to explain the formation of the mountains or to treat the state as all rainforest.",
    ],
    misconceptions: [
      { mistake: "Washington State is rainy everywhere.", why: "Seattle's rain is well known, so it stands for the whole state.", response: "Compare Seattle and Spokane climate records and the two sides of the Cascades, then ask what this says about generalising." },
      { mistake: "Washington State and Washington DC are the same place.", why: "They share a name.", response: "Locate both on one map and give each a distinct label, such as 'the state' and 'DC, the capital'." },
      { mistake: "Seattle is the capital because it is the biggest city.", why: "Pupils often link capitals with the largest city.", response: "Show Olympia on the map and use the pair 'capital: Olympia; largest city: Seattle'." },
    ],
    vocabulary: [
      { term: "state", meaning: "One of the large regions that make up the USA." },
      { term: "Cascade Range", meaning: "The mountain range that runs north to south through Washington State." },
      { term: "Puget Sound", meaning: "A large inlet of the Pacific Ocean on the west side of the state, with ports such as Seattle." },
      { term: "irrigation", meaning: "Bringing water to dry land to grow crops." },
      { term: "rain shadow", meaning: "A drier area on the sheltered side of mountains." },
      { term: "port", meaning: "A place on the coast where ships load and unload." },
    ],
    before: "In Year 3 pupils studied two regions, the Lake District (UK) and Campania (Italy), and compared them (The Lake District, Campania, Comparing Two Regions).",
    next: "Year 4 ends this strand by comparing all three regions (Comparing Three Regions). Year 5 studies the Scottish Highlands, Andalusia and the Amazon region in more depth.",
  },

  // ---------------------------------------------------------------- Climate and the Globe
  "climate-zones": {
    statutory: [PHYSICAL],
    inBrief: "Weather is what the air is like at one time; climate is the usual weather of a place over many years. Bix uses a simple four-zone scheme, and pupils read climate tables as evidence.",
    keyFacts: [
      "Weather is the state of the air at a moment, such as this morning. Climate is the usual weather averaged over many years, often thirty. Bix's example tables use 2001 to 2025, a little short of the usual thirty.",
      "Bix's simple scheme: tropical is warm in every month, dry has almost no rain, temperate is mild and polar is always cold. Real classifications are more detailed.",
      "Bix's examples are Manaus (tropical), Seattle (temperate) and Utqiagvik, Alaska (polar).",
      "Latitude helps explain climate but not on its own. Height above sea level makes places cooler, and the sea and mountains also matter. Bix treats mountain climate as an extra influence, not a fifth zone.",
      "Boundary: reading monthly temperature and rainfall tables and bars and naming the four simple zones. Pupils do not use a full classification system or explain causes in depth.",
    ],
    misconceptions: [
      { mistake: "One very hot day changes a place's climate.", why: "A single day is vivid and recent, and news calls heatwaves 'climate'.", response: "Sort statements into weather and climate and ask what a table of many months of records would show." },
      { mistake: "Climate depends only on how far a place is from the Equator.", why: "Hot near the Equator and cold near the poles is a useful simple rule.", response: "Compare a high mountain place with a lowland place at a similar latitude and add altitude to the list of influences." },
      { mistake: "Temperate means the same as moderate every day.", why: "The word sounds like 'gentle'.", response: "Read a temperate table and find its warmest and coolest months to show that the seasons still differ." },
    ],
    vocabulary: [
      { term: "weather", meaning: "What the air is like at one time, such as this morning." },
      { term: "climate", meaning: "The usual weather of a place, averaged over many years." },
      { term: "tropical", meaning: "A zone that is warm in every month." },
      { term: "polar", meaning: "A zone that is always cold." },
      { term: "latitude", meaning: "How far a place is north or south of the Equator." },
      { term: "altitude", meaning: "Height above sea level." },
    ],
    before: "In Year 3 pupils placed the Equator, tropics and polar circles on a globe (The Equator and Hemispheres, Tropics and Polar Circles) and compared weather in the Lake District and Campania.",
    next: "Year 5 reads climate graphs and patterns (Climate Graphs and Patterns). Year 6 considers how people respond to climate change (Climate Change Responses).",
  },

  "biomes-and-vegetation-belts": {
    statutory: [PHYSICAL],
    inBrief: "A biome is a community of plants and animals suited to one kind of climate. Pupils connect the climate evidence from Climate Zones with the plants that grow, while seeing that people change vegetation too.",
    keyFacts: [
      "Bix's six biomes: tropical rainforest (hot and wet; vines, palms, orchids, ferns), desert (driest; small bushes, short grasses), grassland (mostly grasses), temperate forest (broadleaf trees such as oaks, maples and beeches), boreal forest (spruces, pines and firs, long cold winters) and tundra (coldest; mosses, sedges, lichens, few trees).",
      "Bix's examples: Manaus (rainforest), Aswan (desert), Regina (grassland), Utqiagvik (tundra) and Yellowknife (boreal forest). Each is one example, not the whole biome.",
      "Vegetation belts are broad bands of similar plant cover, linked to climate. Different biome maps draw the boundaries in different places, so they are broad zones, not sharp lines.",
      "People change vegetation: much grassland is now farmland, and forests have been cleared in many places for farmland and pasture.",
      "Boundary: matching six broad biomes to plants, places and climate evidence. Food chains, animal-to-continent matching and exact boundaries are not expected.",
    ],
    misconceptions: [
      { mistake: "Deserts are always hot and sandy.", why: "Pictures show sand dunes, and the word is linked with heat.", response: "Define desert by very low rainfall and look at the plants and the climate table, then discuss cold deserts as well." },
      { mistake: "Biome borders are lines you can walk across.", why: "Maps colour biomes with sharp edges.", response: "Compare two different biome maps and notice how the boundaries differ." },
      { mistake: "Plants grow where they do only because of nature.", why: "Maps of natural vegetation hide human land use.", response: "Look at Regina, where farming is now the main land use, and ask what the land might have looked like before." },
    ],
    vocabulary: [
      { term: "biome", meaning: "A community of plants and animals living in one kind of climate." },
      { term: "vegetation", meaning: "The plants that grow in a place." },
      { term: "vegetation belt", meaning: "A broad band of similar plant cover across a part of the world." },
      { term: "rainforest", meaning: "A hot, wet forest, such as around Manaus." },
      { term: "boreal forest", meaning: "A forest of spruce, pine and fir in a cold climate, sometimes called taiga." },
      { term: "tundra", meaning: "Very cold land with mosses, sedges and lichens and few trees." },
    ],
    before: "In Year 3 pupils met mountains and the Lake District and Campania as places with different land, but not biomes and vegetation belts by name.",
    next: "Year 5 looks at pressures on biomes and sustainability (Biomes and Sustainability). Year 6 returns to the Americas, Europe and Russia as environmental regions.",
  },

  "day-night-and-time-zones": {
    statutory: [GLOBE_LINES],
    inBrief: "Earth turns, so the side facing the Sun has day and the other side has night. Because places face the Sun at different times, the world is divided into time zones, measured from the Greenwich Meridian.",
    keyFacts: [
      "Earth rotates once about every 24 hours. The side facing the Sun has daytime and the side facing away has night. The Sun appears to rise in the east and set in the west.",
      "The Prime or Greenwich Meridian is the 0 degrees line of longitude. Time zones are counted from UTC, which is close to Greenwich time. UTC+2 is two hours ahead and UTC−5 is five hours behind.",
      "Places further east are ahead, because the Sun reaches them earlier.",
      "Britain uses Greenwich Mean Time (GMT) in winter and British Summer Time (BST) in summer, one hour ahead of GMT. Bix's offsets are for a stated date and other dates can differ.",
      "Boundary: whole-hour examples in daytime, with offsets supplied. Daylight saving calculations, the date line and journeys across midnight are not expected.",
    ],
    misconceptions: [
      { mistake: "The Sun moves round the Earth, so it goes down.", why: "The Sun really does look as though it crosses the sky.", response: "Use a torch and a globe. Turn the globe and watch a marked place move from light to dark." },
      { mistake: "It is the same time everywhere at once.", why: "Pupils' own experience is of one clock.", response: "Use a supplied offset table and work out the local time for a place two hours ahead." },
      { mistake: "Time zones are neat equal strips.", why: "Diagrams often draw straight bands.", response: "Show a real time zone map and point out where borders follow country or local boundaries." },
    ],
    vocabulary: [
      { term: "rotate", meaning: "Turn around, as Earth does about once every 24 hours." },
      { term: "Greenwich Meridian", meaning: "The 0 degrees line of longitude, running through Greenwich in London." },
      { term: "time zone", meaning: "A region that uses the same standard time." },
      { term: "UTC", meaning: "The world's reference time, close to Greenwich time, from which zones are counted." },
      { term: "GMT and BST", meaning: "Greenwich Mean Time is Britain's winter time. British Summer Time is one hour ahead." },
      { term: "offset", meaning: "How many hours a zone is ahead of or behind UTC." },
    ],
    before: "In Year 3 pupils met latitude and longitude (Latitude and Longitude), the Equator and hemispheres, and the Greenwich Meridian as a line on the globe.",
    next: "Year 5 uses real coordinates and time zone journeys, including the date line (Latitude and Longitude in Practice, Time Zones and Journeys).",
  },

  // ---------------------------------------------------------------- Rivers and Changing Landscapes
  "river-journeys": {
    statutory: [PHYSICAL],
    inBrief: "A river starts at a source, collects water from tributaries and flows downhill to its mouth. On the way it erodes, transports and deposits material, and it is part of the water cycle.",
    keyFacts: [
      "Source: where a river begins, fed by rainfall, snowmelt or groundwater. Tributary: a smaller river joining a bigger one. Confluence: where two rivers meet. Channel: the path the water follows. Mouth: where it flows into a sea or lake.",
      "Rivers flow downhill because of gravity. A river's direction depends on the slope of the land, not on north or south.",
      "Erosion wears away rock and soil, transport carries sediment (pieces of rock, sand and mud) and deposition drops it. Fast, steep water wears away more land and slow water drops sediment.",
      "Rivers are part of the water cycle: the Sun's energy makes water evaporate, it falls as rain or snow, and runoff returns it to rivers and the sea. The cycle has no single starting point.",
      "Bix uses the Thames, Severn and Trent as UK examples and the Columbia in the Washington State study. Boundary: a simple river diagram and three processes. Meanders, deltas and landforms by name are not expected.",
    ],
    misconceptions: [
      { mistake: "Rivers flow south, or always run to the sea.", why: "Maps are drawn with north up, so down the page feels like 'downhill'.", response: "Trace several real rivers on a map and notice that direction follows the slope. Note that some rivers end in lakes." },
      { mistake: "The source of a river is always a spring on a mountain top.", why: "Diagrams show a neat start at the top of a hill.", response: "Use the list of rainfall, snowmelt and groundwater, and look at a real source on a map or photo." },
      { mistake: "Rivers make new water.", why: "A river seems to appear from nowhere.", response: "Draw the water cycle and mark where the river's water came from and where it goes." },
    ],
    vocabulary: [
      { term: "source", meaning: "Where a river begins." },
      { term: "tributary", meaning: "A smaller river that flows into a bigger one." },
      { term: "confluence", meaning: "The place where two rivers meet." },
      { term: "mouth", meaning: "Where a river flows into a sea or lake." },
      { term: "erosion", meaning: "Moving water wearing away rock and soil." },
      { term: "deposition", meaning: "A river dropping the sediment it was carrying." },
      { term: "sediment", meaning: "Pieces of rock, sand and mud." },
    ],
    before: "In Year 3 pupils learned the water cycle (The Water Cycle) and met mountains and valleys (Mountains and Valleys) and rivers as features in the Lake District.",
    next: "Year 5 studies rivers in flood (Rivers in Flood), and Year 6 studies how rivers are managed (Managing Rivers).",
  },

  "rivers-and-people": {
    statutory: [PHYSICAL, HUMAN],
    inBrief: "People depend on rivers for water, farming, transport and energy, and a river can also flood. A river connects places with different needs, from its source down to its mouth.",
    keyFacts: [
      "Rivers supply drinking water and irrigation water for crops, and carry boats and cargo. Dams can produce hydroelectric power.",
      "Bix's example: dams on the Columbia and its major tributaries produce about half of the electricity used in the Pacific Northwest.",
      "Upstream is nearer the source, downstream nearer the mouth. Uses often differ along a river: a hill farm upstream, a market town and its water works, then fields and a port downstream. Bix's example river is labelled example data.",
      "A floodplain is flat land beside a river. A river can rise over it after heavy rain. Flooding is a possible challenge for people and also part of how rivers work.",
      "Boundary: uses, a calm view of flooding and a reasoned action from given benefits and limits. Flood causes in depth and river engineering are not expected.",
    ],
    misconceptions: [
      { mistake: "Dams only help people and cause no problems.", why: "The benefits, electricity and water, are easy to see.", response: "List benefits and limits together, for example that dams can block fish and change river conditions." },
      { mistake: "A flood means a river has gone wrong.", why: "News shows floods as disasters.", response: "Explain that rivers rise over floodplains after heavy rain and ask how people choose where to build." },
      { mistake: "Everyone along a river uses it in the same way.", why: "Pupils picture one use, such as boats.", response: "Read the upstream-to-downstream record and match each place to its need." },
    ],
    vocabulary: [
      { term: "irrigation", meaning: "Watering crops by bringing water to the land." },
      { term: "hydroelectric power", meaning: "Electricity made using the force of flowing water, often at a dam." },
      { term: "dam", meaning: "A wall built across a river to hold water back." },
      { term: "floodplain", meaning: "Flat land beside a river that can be covered when the river rises." },
      { term: "upstream", meaning: "Nearer the source of the river." },
      { term: "downstream", meaning: "Nearer the mouth of the river." },
    ],
    before: "In Year 3 pupils studied the water cycle and the Lake District, where lakes and rivers shape land use and tourism.",
    next: "Year 5 studies rivers in flood (Rivers in Flood) and Year 6 managing rivers, weighing benefits and trade-offs (Managing Rivers).",
  },

  "changing-uk-landscapes": {
    statutory: [UK_PLACES],
    inBrief: "Places change over time. Pupils compare two dated maps of the same area to say what changed, then separate that from any evidence about why.",
    keyFacts: [
      "A fair comparison needs the same area, the same scale, the same key and clear dates. Bix's paired grids each show the same area at the same scale, about 100 metres a square, with north at the top.",
      "Bix's scenarios include a coastal village, a river area and an estuary or marsh area. Changes can be human (new homes, a factory) or physical (waves wearing the beach back, a channel moving, mud building up).",
      "An observation says what changed and can be seen in the grids. An explanation gives a reason and needs other evidence, such as planning records or coastal measurements.",
      "Some squares change and some stay the same. Bix's notes labelled Example note are practice data, not real records.",
      "Boundary: reading two dated sources and sorting observation from explanation. Pupils do not need to explain coastal or river processes in detail.",
    ],
    misconceptions: [
      { mistake: "If a map shows something new, it must have been built by people.", why: "Human change is the most visible kind.", response: "Check the notes for each changed square: some changes, such as a river channel moving, have physical causes." },
      { mistake: "A map comparison proves why a place changed.", why: "A neat before and after looks like a complete story.", response: "Ask 'what do we see?' and 'what is our evidence for why?' as two separate questions." },
      { mistake: "Nothing in a place stays the same.", why: "Pupils focus on the differences they are asked to find.", response: "Count the squares that did not change and say what stayed the same." },
    ],
    vocabulary: [
      { term: "landscape", meaning: "What an area looks like, including its land, water, buildings and land use." },
      { term: "land use", meaning: "What people use land for, such as homes, farms or woods." },
      { term: "key", meaning: "A list that explains the symbols or letters on a map." },
      { term: "scale", meaning: "How distances on a map relate to real distances." },
      { term: "observation", meaning: "Something we can see in the evidence." },
      { term: "explanation", meaning: "A reason for a change, which needs evidence." },
    ],
    before: "In Year 3 pupils located UK places and compared landscapes and land use (UK Landscapes and Land Use) and surveyed local land use.",
    next: "Year 5 studies settlement growth and change and economic activity and jobs. Year 6 studies changing UK counties and cities and changing UK land use.",
  },

  // ---------------------------------------------------------------- Settlements and Resources
  "settlements-and-land-use": {
    statutory: [HUMAN],
    inBrief: "A settlement is a place where people live, from a village to a city. Where settlements grew, and how land around them is used, depends on several reasons that can combine.",
    keyFacts: [
      "A village is small with a few services, a town is larger with more shops and services, and a city is larger again, with services such as hospitals and universities. Size cut-offs differ between places.",
      "Patterns: nucleated (homes in a tight cluster), linear (homes along a road or river) and dispersed (homes spread out).",
      "People often settled near water, on flat land and beside useful routes, and some sites gave shelter and building materials. Several reasons can combine in one place.",
      "Land use is how land is used: homes, farming, industry, transport and recreation. A land-use map shows what land is used for, not why a settlement began.",
      "Bix's examples include Keswick beside Derwentwater, Naples with its harbour, and Seattle and Tacoma with container ports. Boundary: three settlement types, three patterns and one supported reason. Population cut-offs are not expected.",
    ],
    misconceptions: [
      { mistake: "A settlement is a city or town only.", why: "Those are the biggest and best-known examples.", response: "Show a village, a town and a city on one scale and name what each has." },
      { mistake: "Every settlement is where it is for one reason.", why: "Textbook examples tend to give one neat cause.", response: "Find water, flat land and a route on one map and ask which mattered most, and what evidence would help." },
      { mistake: "A land-use map shows why a town started there.", why: "The map shows the town and land together.", response: "Ask whether the map tells what land is used for now or the history, and what else we would need." },
    ],
    vocabulary: [
      { term: "settlement", meaning: "A place where people live, such as a village, town or city." },
      { term: "village, town, city", meaning: "Three sizes of settlement, with a village the smallest and a city the largest." },
      { term: "nucleated", meaning: "Homes grouped closely in a cluster." },
      { term: "linear", meaning: "Homes in a line, such as along a road." },
      { term: "dispersed", meaning: "Homes spread far apart." },
      { term: "land use", meaning: "What land is used for, such as farming or homes." },
      { term: "harbour", meaning: "A sheltered place on the coast for boats." },
    ],
    before: "In Year 3 pupils surveyed local land use and compared land use in the Lake District and Campania (Surveying Local Land Use, Comparing Two Regions).",
    next: "Year 5 studies settlement growth and change and economic activity and jobs (Settlement Growth and Change, Economic Activity and Jobs).",
  },

  "food-and-trade-links": {
    statutory: [HUMAN],
    inBrief: "Trade is buying and selling, and food often travels a long way from producer to consumer. Pupils trace a food journey and see how a change at one stage can affect another.",
    keyFacts: [
      "A producer grows or makes things to sell. A consumer buys or uses them. Exports are sold to another country and imports are brought in, so the same apples are an export for one country and an import for another.",
      "Bix's journeys are labelled example data: apples go from an orchard area near Yakima to the Seattle seaport and then by ship, and a crate leaves a Campania farm via the port of Naples to a shop in London. They are not records of real shipments.",
      "Farming depends on physical conditions such as rainfall and soil, and on human decisions such as which crop to plant and where to sell. Dry central Washington valleys grew orchards after large-scale irrigation.",
      "A journey has stages, for example orchard, packing house, seaport and shop abroad, and a problem at one stage can affect the others.",
      "Boundary: one traced journey and the words producer, consumer, import and export. Current trade figures and country rankings are not used, and one product does not show a country's trade.",
    ],
    misconceptions: [
      { mistake: "Imports and exports are different goods.", why: "The words sound like opposite things.", response: "Follow one crate from country X to country Y and say 'export from X, import into Y'." },
      { mistake: "A country can only trade the one product shown.", why: "Examples show a single product.", response: "Add other goods to the journey and say that one journey shows only one link." },
      { mistake: "Food is grown only where it is eaten.", why: "Shops stock food all year round without showing where it came from.", response: "Check packaging and mark the origins on a map." },
    ],
    vocabulary: [
      { term: "trade", meaning: "Buying and selling goods." },
      { term: "producer", meaning: "Someone who grows or makes things to sell." },
      { term: "consumer", meaning: "Someone who buys or uses things." },
      { term: "export", meaning: "A good sold to another country." },
      { term: "import", meaning: "A good brought into a country from abroad." },
      { term: "journey stage", meaning: "One step on the way from producer to consumer." },
    ],
    before: "In Year 3 pupils studied farming and land use in the Lake District and Campania but not trade links.",
    next: "Year 5 studies trade links and global connections (Trade Links and Global Connections). Year 6 studies global trade networks (Global Trade Networks).",
  },

  "energy-minerals-and-water": {
    statutory: [HUMAN],
    inBrief: "Natural resources are materials from nature that people use, and they are not spread equally around the world. Pupils sort resources from products and weigh up the benefits and trade-offs of using them.",
    keyFacts: [
      "Bix's natural resources: coal, natural gas, wind, flowing water, building stone and granite. Products such as petrol and bricks are made by people using resources. Granite is a rock built from the minerals quartz, feldspar and mica.",
      "Coal, oil and natural gas are fossil fuels: finite, not replaced soon. Wind and flowing water are renewable because nature keeps supplying them.",
      "Wind turbines turn a generator that makes electricity and release no air or water pollutants in use, but birds and bats can be hurt. Dams for hydropower can block fish and change river conditions. No energy source is free of impact.",
      "Resources are not found equally everywhere, so people move them by road, rail or ship. Central Washington's dry land is watered by the Columbia and Yakima irrigation projects.",
      "Boundary: example resource maps and records and a reasoned choice from benefits and trade-offs. The Bix examples labelled example data are made-up places.",
    ],
    misconceptions: [
      { mistake: "Renewable energy has no impact.", why: "It is described as clean and green.", response: "List benefits and trade-offs for wind and hydropower together, and avoid saying 'no impact'." },
      { mistake: "Petrol and bricks are natural resources.", why: "They are used and sold like resources.", response: "Ask 'does nature supply it, or do people make it?' and sort cards into resource and product." },
      { mistake: "Every place has the same resources.", why: "Pupils have not seen the uneven pattern.", response: "Read a resource map and talk about why people move resources over long distances." },
    ],
    vocabulary: [
      { term: "natural resource", meaning: "A material from nature that people use." },
      { term: "product", meaning: "Something people make using resources." },
      { term: "fossil fuel", meaning: "Coal, oil or natural gas, which formed over a very long time and will run out." },
      { term: "renewable", meaning: "A resource nature keeps supplying, such as wind." },
      { term: "mineral", meaning: "A natural solid material found in rocks." },
      { term: "trade-off", meaning: "A cost you accept to get a benefit." },
    ],
    before: "In Year 3 pupils learned about mountains, volcanoes and rivers as part of different regions, but not resource distribution.",
    next: "Year 5 studies natural resources around the world (Natural Resources Around the World). Year 6 weighs energy choices and trade-offs (Energy Choices and Trade Offs).",
  },

  "comparing-three-regions": {
    statutory: [REGIONS],
    inBrief: "Pupils compare the Lake District, Campania and Washington State using matching evidence for each. A good comparison covers human and physical geography and says what it cannot show.",
    keyFacts: [
      "The Lake District National Park is in England, in the UK. Campania is an administrative region of Italy, in Europe. Washington State is in the USA, in North America, and is not Washington DC.",
      "Lake District: lakes, mountains such as Scafell Pike, farming and tourism. Campania: Vesuvius, Naples harbour, farming and port activity. Washington State: Cascade Range, Puget Sound, irrigated orchards and seaports.",
      "A complete comparison names all three regions, uses matching evidence for each (same dimension, such as climate in the same months) and includes human and physical evidence.",
      "Each region varies inside: Seattle and Spokane are in the same state with different climate records, so one place does not describe a region.",
      "Boundary: a sampled evidence table. The three regions differ in size, so the comparison is not exact, and pupils are not expected to rank regions.",
    ],
    misconceptions: [
      { mistake: "One town or one climate record describes a whole region.", why: "Evidence tables usually show one place per column.", response: "Compare Seattle and Spokane and ask what the difference means for the word 'region'." },
      { mistake: "Comparing means listing facts about each place in turn.", why: "It is easier to describe than to compare.", response: "Use a table with the same rows for all three and write a sentence starting 'Both...' or 'Unlike...'." },
      { mistake: "Campania is a country.", why: "Italy and Campania are named together.", response: "Place Campania within Italy using nesting labels: region, country, continent." },
    ],
    vocabulary: [
      { term: "region", meaning: "An area with shared features, such as the Lake District or Campania." },
      { term: "compare", meaning: "Say how places are alike and how they differ, using the same evidence for each." },
      { term: "similarity", meaning: "Something places share." },
      { term: "difference", meaning: "Something that is not the same between places." },
      { term: "human geography", meaning: "People and what they do in a place, such as farming and ports." },
      { term: "physical geography", meaning: "Natural features of a place, such as mountains and climate." },
    ],
    before: "In Year 3 pupils compared the Lake District and Campania (The Lake District, Campania, Comparing Two Regions).",
    next: "Year 5 studies the Scottish Highlands, Andalusia and the Amazon region in more depth. Year 6 compares four regions (Comparing Four Regions).",
  },

  // ---------------------------------------------------------------- Mapping and Fieldwork Enquiries
  "six-figure-grid-references": {
    statutory: [COMPASS_GRID],
    inBrief: "A four-figure reference names one square. A six-figure reference splits that square into tenths to give a more exact position. Eastings, the numbers across, always come first.",
    keyFacts: [
      "Four-figure reference: two digits for the easting (across) and two for the northing (up), naming a square. Read along the corridor, then up the stairs.",
      "Six-figure reference: three digits for the easting, then three for the northing. The third digit is tenths across the square, and the sixth is tenths up it, counted from the square's lower-left corner.",
      "Example from Bix: a point 3 tenths east of line 23 and 6 tenths north of line 41 is 233416. The reference 416233 swaps the order and points somewhere else.",
      "Ordnance Survey (OS) is Britain's national mapping agency. A map key explains symbols: on Bix's actual OS extract grey areas are buildings and green patches are woods. Bix's practice grid has lines 1 km apart.",
      "Boundary: interior points on practice grids and one OS extract, with the main grid spacing stated. Pupils do not need other map scales or to convert references to distances.",
    ],
    misconceptions: [
      { mistake: "Northings come first.", why: "Pupils read up and across in other contexts, such as coordinates in maths.", response: "Use 'along the corridor, then up the stairs' and read the easting first every time." },
      { mistake: "The extra digits are another square.", why: "Four-figure references were squares, so more digits look like more squares.", response: "Zoom into one square drawn with tenth lines and count across and up inside it." },
      { mistake: "Count tenths from any corner.", why: "Pupils start from the nearest line.", response: "Always count from the lower-left corner of the square, the lines named in the reference." },
    ],
    vocabulary: [
      { term: "grid reference", meaning: "Numbers that give a position on a map." },
      { term: "easting", meaning: "A number along the bottom of the map, counting east. It comes first." },
      { term: "northing", meaning: "A number up the side of the map, counting north. It comes second." },
      { term: "tenths", meaning: "The ten equal steps between two numbered grid lines." },
      { term: "Ordnance Survey", meaning: "Britain's national mapping agency, often shortened to OS." },
      { term: "key", meaning: "A list that explains the symbols on a map." },
    ],
    before: "In Year 3 pupils used the eight compass points and four-figure grid references and read an OS key (Eight Compass Points, Four Figure Grid References).",
    next: "Year 5 uses contours, scale and OS maps (Contours Scale and OS Maps). Year 6 uses six-figure references with scale and digital map layers (Six Figure References and Scale, Digital Map Layers).",
  },

  "maps-atlases-and-digital-mapping": {
    statutory: [MAPS, COMPASS_GRID],
    inBrief: "Different maps suit different questions. Pupils choose among maps, atlases, globes and digital maps, read keys, directions and scale, and switch layers to find evidence.",
    keyFacts: [
      "A globe shows the shape of the Earth and the true arrangement of places. A flat map or atlas page shows a bounded area in detail. A digital map can change the view and add layers.",
      "A key explains the symbols, the eight compass points give directions, and a scale bar shows real distance. Bix's practice plans say 'each square is N km wide' and use whole-square counts.",
      "Bix's explorer is bundled with no live map tiles. It switches between an overview (the UK, or Italy) and a detail view (the Lake District or Campania) and adds a layer such as towns or places.",
      "Zooming in does not change the real size of a place. A layer shows one kind of information, so different layers answer different questions.",
      "Boundary: choosing a source for a purpose and simple whole-number distances. Map projections and area distortion are not expected.",
    ],
    misconceptions: [
      { mistake: "Zooming in makes a place bigger.", why: "On screen it looks bigger.", response: "Compare the scale bars at two zoom levels to show the same real place drawn larger." },
      { mistake: "One map is best for every question.", why: "Pupils use one familiar map for everything.", response: "Pose three questions and choose a source for each, for example a globe for the whole Earth." },
      { mistake: "A map without a layer showing something proves it is not there.", why: "Missing from the map seems to mean missing in reality.", response: "Switch layers on and off and note that a layer is a choice about what to show." },
    ],
    vocabulary: [
      { term: "atlas", meaning: "A book or collection of maps." },
      { term: "globe", meaning: "A model of the Earth as a ball." },
      { term: "digital map", meaning: "A map on a screen that can be changed, for example by zooming or adding layers." },
      { term: "layer", meaning: "One kind of information, such as towns, that can be shown or hidden on a digital map." },
      { term: "scale bar", meaning: "A line that shows how map distance relates to real distance." },
      { term: "compass points", meaning: "North, east, south and west, with the in-between directions." },
    ],
    before: "In Year 3 pupils used atlases and globes to locate countries, and the eight compass points and OS key on maps.",
    next: "Year 5 reads contours and OS scale (Contours Scale and OS Maps). Year 6 uses layered digital maps (Digital Map Layers).",
  },

  "local-fieldwork-enquiry": {
    statutory: [FIELDWORK],
    inBrief: "Fieldwork means going out to observe, measure and record. Pupils learn to plan a small enquiry with comparable sites, a consistent method, and a table, sketch map and graph. The digital challenge rehearses this and does not replace it.",
    keyFacts: [
      "Start with an observable question, such as how paths and planted areas differ at two familiar sites. Choose a measure you can repeat, such as path width or the cover of plants.",
      "Make it comparable: the same method and units at both sites, and several measurements, for example three spots at each. Measure only safe features and stay with a grown-up.",
      "Record in a table or tally and a sketch map with a key, then draw a graph. A grown-up can help make a digital chart.",
      "A small sample limits conclusions. Describe the limit and one useful repeat observation, such as another site or another day.",
      "Boundary: Bix's table, map and graph are practice data and cannot prove real fieldwork. The app does not collect an address, school name, GPS or photographs, and does not mark outdoor fieldwork complete.",
    ],
    misconceptions: [
      { mistake: "A single measurement is enough to answer a question.", why: "One result feels like an answer.", response: "Measure three spots at each site and compare them, then say what a repeat would add." },
      { mistake: "Different units or methods at each site do not matter.", why: "Both sites are measured, so they feel comparable.", response: "Try measuring one path in paces and the other in hand-spans, and see why the numbers cannot be compared." },
      { mistake: "A graph proves the answer.", why: "A neat chart looks certain.", response: "Ask what the graph shows, and what it cannot show because of the small sample." },
    ],
    vocabulary: [
      { term: "fieldwork", meaning: "Learning outdoors by observing, measuring and recording a real place." },
      { term: "enquiry", meaning: "Finding out by asking a question and collecting evidence." },
      { term: "sketch map", meaning: "A simple drawn map of an area, with a key." },
      { term: "tally", meaning: "A count kept with marks, in groups of five." },
      { term: "sample", meaning: "The sites or measurements you actually collect." },
      { term: "conclusion", meaning: "What the evidence shows, with a limit stated." },
    ],
    before: "In Year 3 pupils surveyed local land use with a guided practice plan (Surveying Local Land Use).",
    next: "Year 5 plans an enquiry with primary and secondary data and graphs (Designing a Fieldwork Enquiry). Year 6 plans, presents and evaluates a full enquiry (Planning a Fieldwork Enquiry, Presenting and Evaluating Fieldwork).",
  },
};
