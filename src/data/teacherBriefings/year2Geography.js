/**
 * Teacher subject-knowledge briefings for Year 2 Geography, one per topic id.
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
 *   before / next: Year 1 prior learning and the Year 3+ destination
 */
const CONTINENTS = "name and locate the world’s seven continents and five oceans";
const UK = "name, locate and identify characteristics of the four countries and capital cities of the United Kingdom and its surrounding seas";
const PLACE = "understand geographical similarities and differences through studying the human and physical geography of a small area of the United Kingdom, and of a small area in a contrasting non-European country";
const WEATHER = "identify seasonal and daily weather patterns in the United Kingdom and the location of hot and cold areas of the world in relation to the Equator and the North and South Poles";
const PHYSICAL = "key physical features, including: beach, cliff, coast, forest, hill, mountain, sea, ocean, river, soil, valley, vegetation, season and weather";
const HUMAN = "key human features, including: city, town, village, factory, farm, house, office, port, harbour and shop";
const ATLAS = "use world maps, atlases and globes to identify the United Kingdom and its countries, as well as the countries, continents and oceans studied at this key stage";
const COMPASS = "use simple compass directions (North, South, East and West) and locational and directional language [for example, near and far; left and right], to describe the location of features and routes on a map";
const AERIAL = "use aerial photographs and plan perspectives to recognise landmarks and basic human and physical features; devise a simple map; and use and construct basic symbols in a key";
const FIELD = "use simple fieldwork and observational skills to study the geography of their school and its grounds and the key human and physical features of its surrounding environment";

export const YEAR2_GEOGRAPHY_BRIEFINGS = {
  // ---------------------------------------------------------------- World and UK Knowledge
  "continents-and-oceans-together": {
    statutory: [CONTINENTS, ATLAS],
    inBrief: "Pupils bring together the seven continents and five oceans and use world maps, atlases and globes to find them. They also learn that country, continent and ocean are different kinds of place.",
    keyFacts: [
      "The seven continents are Africa, Antarctica, Asia, Australia (Oceania), Europe, North America and South America. The five oceans are the Arctic, Atlantic, Indian, Pacific and Southern.",
      "A continent is a very large area of land, a country is a part of a continent with its own borders, and an ocean is a very large area of salt water. The UK is a country in Europe and Brunei is a country in Asia.",
      "A globe is a model of Earth and shows true shapes and relative sizes. A flat world map must stretch some parts, and an atlas is a book of maps.",
      "Different maps may place the same continents in different positions on the page, so pupils should find them by shape and label, not by position alone.",
      "Boundary: naming and locating the continents and oceans and placing the UK and Brunei. Which ocean touches which continent, and exact boundaries, are not expected.",
    ],
    misconceptions: [
      { mistake: "The UK or Brunei is a continent.", why: "Pupils meet all of these names as 'places' on a map and the size difference is hard to see.", response: "Use nesting language, such as 'Brunei is a country in the continent of Asia', and sort name cards into country, continent and ocean." },
      { mistake: "Australia, or any other large island, is not a continent because it is surrounded by water.", why: "Pupils think land joined to other land is what makes a continent.", response: "Say the seven are named by agreement, and focus on finding each on the map and globe rather than on definitions of boundaries." },
      { mistake: "The map and the globe show different places.", why: "A flat map looks very unlike a ball, and north is not always the same way up on a globe.", response: "Find the same marker, such as the UK, on a globe and a map in turn, then turn the globe to show it is the same place." },
    ],
    vocabulary: [
      { term: "continent", meaning: "A very large area of land. There are seven." },
      { term: "ocean", meaning: "A very large area of salt water. There are five." },
      { term: "country", meaning: "A place with its own borders, such as the UK or Brunei." },
      { term: "globe", meaning: "A ball-shaped model of the Earth." },
      { term: "atlas", meaning: "A book of maps." },
      { term: "marker", meaning: "A label or pin that shows where a place is." },
    ],
    before: "In Year 1 (Seven Continents and Five Oceans) pupils named the seven continents and five oceans and found them on maps and globes.",
    next: "Year 3 adds Europe and Russia and the Equator and hemispheres. Key stage 2 uses the world map to place countries, regions and oceans in more detail.",
  },

  "uk-places-and-landscapes": {
    statutory: [UK, PHYSICAL],
    inBrief: "Pupils revisit the four countries, their capitals and the seas around the UK, and use labelled examples of coast, hill, mountain, valley, forest, river and settlements. Features are described by name, not assumed to belong to only one country.",
    keyFacts: [
      "The UK has four countries: England, Scotland, Wales and Northern Ireland. The capitals are London, Edinburgh, Cardiff and Belfast.",
      "Great Britain is the island with England, Scotland and Wales. The UK also includes Northern Ireland, so the two names are not the same.",
      "The UK is surrounded by the North Sea, English Channel, Irish Sea and Celtic Sea, and the Atlantic Ocean lies to the west and north.",
      "Physical features are natural, such as rivers, hills and coasts. Human features are made by people, such as farms, factories, offices, ports and harbours. Many places have both.",
      "Boundary: consolidating Year 1 and describing named examples. Counties, regions and land use are Year 3, and one example is not a description of a whole country.",
    ],
    misconceptions: [
      { mistake: "Mountains are in Scotland and Wales and England has none, or each feature belongs to one country.", why: "Pupils generalise from the example on the map or in a book.", response: "Ask 'Does this picture show the whole country?' and look for hills, rivers and farms in more than one country." },
      { mistake: "Great Britain and the United Kingdom are the same thing.", why: "People use the names as if they were interchangeable, including in everyday talk.", response: "Show Northern Ireland on the map and say it is part of the UK but not on the island of Great Britain." },
      { mistake: "A feature made by people, such as a harbour wall, is physical because it is by the sea.", why: "Pupils sort by where something is, not by who made it.", response: "Ask 'Was it here before people came?' to sort natural from made." },
    ],
    vocabulary: [
      { term: "capital city", meaning: "The city where a country's government is based." },
      { term: "coast", meaning: "The land beside the sea." },
      { term: "valley", meaning: "Low land between hills or mountains, often with a river." },
      { term: "physical feature", meaning: "Something in the landscape made by nature." },
      { term: "human feature", meaning: "Something in the landscape made by people." },
      { term: "port", meaning: "A place where ships load and unload." },
    ],
    before: "In Year 1 (Four Countries, UK Capital Cities, Seas Around the UK) pupils named the countries, capitals and surrounding seas and used feature words for places they could see.",
    next: "Year 3 studies counties, cities and regions and UK landscapes and land use, and key stage 2 adds rivers, mountains and settlement in more depth.",
  },

  "compass-directions-and-routes": {
    statutory: [COMPASS],
    inBrief: "Pupils use North, South, East and West with a north arrow to describe where features are and to follow short routes. Left and right describe the page or the walker, while the compass directions stay fixed.",
    keyFacts: [
      "North, East, South and West are fixed directions, and a map or compass rose shows which way is north. A common memory phrase for the order clockwise from north is 'Never Eat Shredded Wheat'.",
      "A map can be turned. The directions turn with it, so pupils must read the north arrow before describing anything.",
      "Directions describe where something is from a starting point, such as 'the pond is east of the gate'. Left and right depend on which way a walker faces.",
      "A good route names the start, gives steps in order and says when to turn, using landmarks as well as directions.",
      "Boundary: four points and routes of up to about three steps. Diagonal points (north-east and so on), grid references and distance scales are not expected until Year 3 and later.",
    ],
    misconceptions: [
      { mistake: "North is always at the top of the page, so it is always up.", why: "Most maps pupils see are drawn with north at the top.", response: "Turn a practice map and ask them to find the north arrow each time before answering." },
      { mistake: "East and west are swapped.", why: "Pupils recall 'left and right' but not which side is which on a map.", response: "Stand in the room with a compass rose, facing north, and point east to the right and west to the left. Use the memory phrase." },
      { mistake: "Left and right are the same thing as west and east.", why: "On many maps with north at the top, they do match, so the link seems permanent.", response: "Walk a route and turn around. Left and right change with the walker but north stays put." },
    ],
    vocabulary: [
      { term: "compass rose", meaning: "The picture on a map showing north, east, south and west." },
      { term: "north arrow", meaning: "An arrow that shows which way north is." },
      { term: "direction", meaning: "The way something is from a place, such as north." },
      { term: "route", meaning: "The path from one place to another." },
      { term: "start", meaning: "The place where a journey begins." },
      { term: "near and far", meaning: "Words for how close one thing is to another." },
    ],
    before: "In Year 1 (Routes and Simple Maps) pupils used near, far, left and right and met four directions on a simple map.",
    next: "Year 3 (Eight Compass Points, Four-Figure Grid References) adds the eight points and grid references, and later years use scale and six-figure references.",
  },

  // ---------------------------------------------------------------- Weather and World Patterns
  "weather-records": {
    statutory: [WEATHER, FIELD],
    inBrief: "Pupils read and compare a short weather record with symbols, tally marks and a pictogram. The skill is describing what the record shows, and a few days are not a pattern for the whole year.",
    keyFacts: [
      "Weather is what the air is doing on a given day, such as sun, cloud, rain or wind. Climate is the usual weather of a place over many years.",
      "Pupils use symbols, tally marks and pictograms. One tally mark or symbol counts one day, and a day can have more than one weather type, such as rain and wind.",
      "Counts in a pictogram answer 'how many days?' and the log answers 'what happened on this day?'. Pupils should know which to use.",
      "A fair record is kept in the same place, at the same time of day, using the same symbols each day.",
      "Boundary: reading a five-day record and keeping a short log. Averages, instruments with readings and the word climate in a full sense are later.",
    ],
    misconceptions: [
      { mistake: "A place that was rainy for two days has a rainy climate.", why: "Recent weather feels like the whole story.", response: "Say that five days is a small sample and ask what a whole year would show. Use 'in this record' in sentences." },
      { mistake: "Each day has only one kind of weather.", why: "Weather words are often used one at a time, such as 'sunny day'.", response: "Look at a log with two symbols on a day and read it aloud as 'rainy and windy'." },
      { mistake: "A pictogram circle counts something other than a day.", why: "Pupils read the shape as an object, not a count.", response: "Always read the key first: 'one circle is one day'. Match the circles back to the log." },
    ],
    vocabulary: [
      { term: "weather", meaning: "What the air and sky are like at a certain time." },
      { term: "record", meaning: "Notes that show what happened, kept in order." },
      { term: "tally", meaning: "Marks used to count, one mark for each." },
      { term: "pictogram", meaning: "A chart that uses pictures or symbols to show numbers." },
      { term: "symbol", meaning: "A small picture that stands for something, such as a cloud for cloudy." },
      { term: "pattern", meaning: "Something that happens again and again." },
    ],
    before: "In Year 1 (Daily Weather, Seasons in the UK) pupils named types of weather, linked them to seasons and observed the weather outside.",
    next: "Year 3 (The Water Cycle) links weather to water, and key stage 2 uses measured data, graphs and climate zones.",
  },

  "the-equator-and-the-poles": {
    statutory: [WEATHER, ATLAS],
    inBrief: "The Equator is an imaginary line around the middle of Earth, and the North and South Poles are its ends. Places near the Equator are usually hot and places near the poles are usually cold, though many other things matter too.",
    keyFacts: [
      "The Equator is at 0 degrees latitude and runs around the middle of the Earth. The North Pole and South Pole are the two ends of the line the Earth spins around.",
      "The Sun's rays are strongest near the Equator, so places there are usually warm. Near the poles the rays are weaker, so it is usually cold. This is a broad pattern.",
      "Brunei, in Asia, is about 5 degrees north of the Equator. It is warm and wet through the year. The UK is much farther north and is cooler.",
      "Hot does not mean dry. A place near the Equator can be wet as well as warm, and a polar place can be dry as well as cold.",
      "Boundary: the broad hot and cold pattern with located examples. Hemispheres, tropics, latitude numbers and season reversal are Year 3 or later.",
    ],
    misconceptions: [
      { mistake: "The Equator is a real line you can see on the ground.", why: "It is drawn clearly on maps and globes.", response: "Say it is imaginary. Hold up a globe and show that the line is drawn to help us describe places." },
      { mistake: "All of Asia, or any large continent, has the same weather.", why: "Pupils think a continent is one place.", response: "Compare Brunei, near the Equator, with the far north of Asia on the globe. Say a continent has many kinds of weather." },
      { mistake: "Hot places are always dry, or cold places are always snowy.", why: "Pictures of deserts and polar ice are the commonest ones.", response: "Use the Brunei example: warm and rainy. Ask 'could it be warm and wet?' for each example." },
    ],
    vocabulary: [
      { term: "Equator", meaning: "An imaginary line around the middle of the Earth." },
      { term: "North Pole", meaning: "The point at the very top of the Earth." },
      { term: "South Pole", meaning: "The point at the very bottom of the Earth." },
      { term: "globe", meaning: "A ball-shaped model of the Earth." },
      { term: "hot and cold areas", meaning: "Parts of the world that are usually warm or usually cold." },
      { term: "imaginary", meaning: "Not a real thing you can see, but used to help us describe places." },
    ],
    before: "In Year 1 (Hot and Cold Places) pupils met the Equator and the North and South Poles and the broad link between them and hot and cold places.",
    next: "Year 3 (The Equator and Hemispheres, Tropics and Polar Circles, Latitude and Longitude) adds hemispheres, the tropics and polar circles, and later years study climate zones and biomes.",
  },

  // ---------------------------------------------------------------- Two Small Places
  "whitby-by-the-sea": {
    statutory: [PLACE, HUMAN],
    inBrief: "Pupils study one small area of the UK: Whitby harbour and the streets beside it. They name its human and physical features, and use evidence from photographs, plans and an aerial view.",
    keyFacts: [
      "Whitby is a town on the coast of North Yorkshire, England, in the UK. It lies where the River Esk reaches the North Sea.",
      "The study area is the harbour and the adjoining town-centre streets, not the whole of Whitby or England.",
      "Physical features include the sea, the River Esk, the coast, the cliffs and the hill. Human features include the harbour, houses, shops, bridge, St Mary's Church and the abbey ruins above the town.",
      "A harbour is a sheltered place for boats beside the land. Fishing boats use Whitby's harbour, which links water and work.",
      "Boundary: features that can be seen in the evidence. Whitby's history, the economy and the whole of England are not expected.",
    ],
    misconceptions: [
      { mistake: "A photo of Whitby shows what all of England is like.", why: "Pupils treat one picture as typical of the whole country.", response: "Ask 'What does this picture show, and what can it not show?' and use 'in this harbour area' in sentences." },
      { mistake: "Harbour water is the same as a river.", why: "Both are water beside the town, and the boundary is hard to see in a photo.", response: "On the plan, find the River Esk flowing in and the harbour where boats shelter. The river reaches the sea here." },
      { mistake: "The abbey and church are physical features because they are old.", why: "Age is confused with being natural.", response: "Ask who made it. Buildings are human features however old." },
    ],
    vocabulary: [
      { term: "harbour", meaning: "A sheltered place beside the land where boats stay safe." },
      { term: "coast", meaning: "The land beside the sea." },
      { term: "river", meaning: "A natural stream of water flowing towards the sea." },
      { term: "port", meaning: "A place where ships load and unload." },
      { term: "aerial photograph", meaning: "A photograph taken from above." },
      { term: "key", meaning: "A list that tells you what the symbols on a map mean." },
    ],
    before: "In Year 1 (Human and Physical Features, Around Our School) pupils named features in two pictured places and in their school grounds.",
    next: "Year 3 compares two regions of the UK (The Lake District, Comparing Two Regions), and key stage 2 studies a region of the UK and regions in Europe and the Americas.",
  },

  "kampong-ayer-by-the-river": {
    statutory: [PLACE, HUMAN],
    inBrief: "Pupils study one small area in a contrasting non-European country: Kampong Peramu, a neighbourhood in Kampong Ayer, Brunei. They learn that people live, meet and travel here, using homes, walkways and boats.",
    keyFacts: [
      "Brunei is a country in Asia, on the island of Borneo. Its capital is Bandar Seri Begawan. Kampong Ayer is a historic water village beside the Brunei River, close to the capital.",
      "Kampong Ayer is a group of neighbourhoods, and Kampong Peramu is one of them. The study area is Kampong Peramu and the nearby river and walkways.",
      "The buildings stand on stilts above the river and are joined by walkways. Homes, shops, a prayer hall and other buildings can be seen, and boats are used to cross the river.",
      "A jetty is a boat landing place. A walkway is a path built for people to walk on, here above the water.",
      "Boundary: one neighbourhood from the evidence. Not all Bruneians live on water, and this is not a study of all of Brunei or Asia.",
    ],
    misconceptions: [
      { mistake: "Everyone in Brunei lives on the water.", why: "The photographs are striking and one view stands for the country.", response: "Say 'This is one neighbourhood. Many people in Brunei live in other kinds of home.' Use limit phrases like 'in this area'." },
      { mistake: "People there have no roads or shops, so life is unusual or simple.", why: "Pupils judge by how different it looks from their own home.", response: "Look at the plan for walkways, shops and a prayer hall, and talk about daily life in the same terms as their own street." },
      { mistake: "Water homes are boats.", why: "Homes beside water and boats both float or sit on the river in pupils' pictures.", response: "Point out the stilts and walkways that join them to each other, and that boats are used to travel." },
    ],
    vocabulary: [
      { term: "neighbourhood", meaning: "A small area where people live and meet." },
      { term: "walkway", meaning: "A path built for people to walk along, here above the water." },
      { term: "jetty", meaning: "A place where boats stop to let people on and off." },
      { term: "stilts", meaning: "Tall posts that hold a building above the water." },
      { term: "river", meaning: "A natural stream of water flowing towards the sea." },
      { term: "contrasting", meaning: "Very different from something else." },
    ],
    before: "In Year 1 (Seven Continents, Human and Physical Features) pupils found continents and met a contrasting place in pictures, without studying a named small area.",
    next: "Year 3 compares two regions (Comparing Two Regions), and key stage 2 studies regions in Europe and the Americas in more depth.",
  },

  "homes-and-journeys-in-two-places": {
    statutory: [PLACE, COMPASS],
    inBrief: "Pupils compare homes and journeys in Whitby and Kampong Peramu, using the same two small areas. Both have homes and routes, but their shapes and the way people move are different.",
    keyFacts: [
      "Both areas have homes, routes and water close by. People in both need places to live, shops and ways of getting around.",
      "In the Whitby harbour area, routes include streets and a bridge across the river. In Kampong Peramu, routes include walkways above the water and boat journeys across the river.",
      "A route is shown on a plan by a line from a start to a destination. Directions and landmarks help to describe it.",
      "The photographs and plans show selected examples. They cannot tell us how everyone in either place travels.",
      "Boundary: describing the shown homes and routes with similarities and differences. General claims about transport, or about all homes in a country, are not expected.",
    ],
    misconceptions: [
      { mistake: "People in Peramu only travel by boat and people in Whitby only by car.", why: "The most unusual feature in each picture becomes the whole story.", response: "Ask what else the plan shows. Use 'some journeys here use...' in sentences." },
      { mistake: "The places have nothing in common because one is in England and one in Asia.", why: "Pupils look for obvious differences first.", response: "Make a table with 'both have' and 'only here' columns. Start with 'both have homes and routes beside water'." },
      { mistake: "Homes above water are not real homes.", why: "They look unlike pupils' own.", response: "Ask what a home gives people (shelter, a place to sleep and eat), and check that both places provide it." },
    ],
    vocabulary: [
      { term: "home", meaning: "A place where people live." },
      { term: "journey", meaning: "Going from one place to another." },
      { term: "route", meaning: "The path a journey follows." },
      { term: "similarity", meaning: "Something that is the same in two places." },
      { term: "difference", meaning: "Something that is not the same in two places." },
      { term: "evidence", meaning: "What we can see in a photograph or plan that supports an idea." },
    ],
    before: "In Year 1 (Routes and Simple Maps, Human and Physical Features) pupils followed simple routes and named human features such as houses.",
    next: "Year 3 uses comparison of two regions, and later years explore settlement, transport and trade in more depth.",
  },

  "comparing-two-small-places": {
    statutory: [PLACE, WEATHER],
    inBrief: "Pupils bring together human features, physical features and weather evidence for Whitby and Kampong Peramu. A good comparison gives a similarity or difference, a reason from the evidence and a limit.",
    keyFacts: [
      "Both areas have homes, water and routes. Whitby has a harbour, shops and streets beside the River Esk and North Sea, and Kampong Peramu has homes, walkways and a jetty beside the Brunei River.",
      "Weather in the examples is from short, labelled records. Brunei is near the Equator and warm and wet through the year, while the UK is cooler and changeable, but one record is not a climate.",
      "A comparison sentence has three parts: what is the same or different, the evidence for it and a limit, such as 'in these two areas'.",
      "Pupils should find at least two similarities and two differences, each supported by something they can point to.",
      "Boundary: two small areas and the evidence shown. Comparing countries, climates or ways of life is not expected.",
    ],
    misconceptions: [
      { mistake: "The weather in Brunei and England is always opposite.", why: "Strong contrast examples, such as warm and rainy against cool and cloudy, suggest a rule.", response: "Check the record: do all the days differ? Say 'on these days' and note that England can have warm days too." },
      { mistake: "One photograph tells us what a country is like.", why: "A picture feels like the whole truth.", response: "Ask 'What can this photo not tell us?' and add a limit phrase to each statement." },
      { mistake: "Difference means one place is better.", why: "Pupils compare with what they know best.", response: "Use neutral words, such as 'different' and 'the same', and ask what each place's features are useful for." },
    ],
    vocabulary: [
      { term: "compare", meaning: "Find what is the same and what is different." },
      { term: "similarity", meaning: "Something that is the same in two places." },
      { term: "difference", meaning: "Something that is not the same in two places." },
      { term: "evidence", meaning: "What we can see or read that shows an idea is true." },
      { term: "limit", meaning: "What our evidence cannot tell us." },
      { term: "weather record", meaning: "Notes that show what the weather was like on certain days." },
    ],
    before: "In Year 1 (Human and Physical Features, Daily Weather) pupils described features and weather in single places but did not compare two with evidence.",
    next: "Year 3 (Comparing Two Regions) compares regions using several kinds of evidence, and key stage 2 studies the human and physical geography of regions in depth.",
  },

  // ---------------------------------------------------------------- Making and Reading Maps
  "aerial-views-and-landmarks": {
    statutory: [AERIAL],
    inBrief: "Pupils tell apart a ground photograph, an aerial photograph and a plan, and find the same landmark in each. From above we see the arrangement of features, and the plan uses symbols.",
    keyFacts: [
      "A ground photograph is taken from near the ground and shows sides of things. An aerial photograph is taken from above, for example from a plane or drone, and shows tops and positions.",
      "A plan view is a drawing from directly above, using symbols and a key, so it shows arrangement but no details of the photograph.",
      "A landmark is an easily recognised feature, such as a church or a bridge. Whitby's St Mary's Church and the abbey ruins can be found in both the ground and the aerial photographs.",
      "Features keep the same position relative to one another in each view, so pupils match by arrangement as well as by shape.",
      "Boundary: matching landmarks in views of the study areas and a practice school. Identifying small features in unclear photographs, and scale, are not expected.",
    ],
    misconceptions: [
      { mistake: "A plan looks like a photograph taken from far away.", why: "Both are from above, so pupils expect similar detail.", response: "Lay a plan next to an aerial photograph and note that the plan uses symbols and shows only chosen features." },
      { mistake: "A building looks the same from above as from the ground.", why: "Pupils draw buildings from the side.", response: "Show a roof from above. Build a block model and look from the side, then from above." },
      { mistake: "Landmarks have to be big or famous.", why: "The word is linked to tourist sights.", response: "Say a landmark is any feature that helps you find your way, such as a gate or pond, and choose some in the playground." },
    ],
    vocabulary: [
      { term: "aerial photograph", meaning: "A photograph taken from above." },
      { term: "plan", meaning: "A drawing of a place as seen from directly above." },
      { term: "landmark", meaning: "A feature that is easy to recognise and helps you find your way." },
      { term: "view", meaning: "What you can see from a certain place." },
      { term: "symbol", meaning: "A small drawing that stands for something on a map." },
      { term: "arrangement", meaning: "How things are placed in relation to each other." },
    ],
    before: "In Year 1 (Maps from Above) pupils met aerial photographs and plans of familiar places and named simple features on them.",
    next: "Year 3 (Four-Figure Grid References) and later years use grids, Ordnance Survey symbols and larger-scale maps, and later years use aerial images and GIS.",
  },

  "symbols-and-map-keys": {
    statutory: [AERIAL, COMPASS],
    inBrief: "A map key explains what each symbol stands for. Pupils read a key to find features and build a consistent key where each feature has its own symbol.",
    keyFacts: [
      "A symbol is a simple picture or shape that stands for a feature, and the key lists each symbol and its meaning.",
      "A good key uses a different shape for each feature, with a label, so it still works if colours look alike or are hard to tell apart.",
      "The same symbol must mean the same thing everywhere on the map. A changed symbol can mislead a reader.",
      "Maps often use a north arrow alongside the key so that directions can be used with the symbols.",
      "Boundary: keys with about five features, such as house, shop, trees, path and water. Ordnance Survey symbols and map scales belong to key stage 2.",
    ],
    misconceptions: [
      { mistake: "A symbol means the same thing on every map.", why: "Pupils expect pictures to have fixed meanings.", response: "Compare two practice maps with different keys, and always read the key first." },
      { mistake: "Colour alone is enough to tell features apart.", why: "Colour is the first thing children notice and use.", response: "Show a key in black and white, or ask someone to read it who finds colours difficult. Add shape and a label." },
      { mistake: "Two features can share a symbol if they are similar, such as a house and a shop.", why: "Pupils use their own idea of similar.", response: "Ask a partner to find the shop. If both have the same symbol, they cannot. Give each its own." },
    ],
    vocabulary: [
      { term: "symbol", meaning: "A small picture or shape that stands for something." },
      { term: "key", meaning: "A list on a map that says what each symbol means." },
      { term: "feature", meaning: "Something on a map, such as a house, path or river." },
      { term: "label", meaning: "A word that names a symbol or place." },
      { term: "consistent", meaning: "The same each time." },
      { term: "map", meaning: "A drawing of a place that shows where things are." },
    ],
    before: "In Year 1 (Maps from Above, Routes and Simple Maps) pupils recognised simple symbols and used a basic key on picture maps.",
    next: "Year 3 uses Ordnance Survey symbols and grid references, and later years use scale and contours.",
  },

  "making-a-simple-map": {
    statutory: [AERIAL, COMPASS],
    inBrief: "Pupils plan a simple map of a small area: they choose landmarks, keep them in the right positions, add a key and describe a route someone else could follow. The app supports this with choices, and drawing happens on paper with a grown-up.",
    keyFacts: [
      "A useful map shows only what is needed, such as a few landmarks, and leaves out the rest.",
      "A plan keeps landmarks in the same positions relative to each other as in the real place: what is left, right, above and below.",
      "A map needs a key for its symbols. A north arrow lets readers use compass directions, and a route should say where to start.",
      "A route description gives steps in order, using directions and landmarks, such as 'start at the gate, go east to the pond'.",
      "Boundary: a supported map of a small area with a key and a short route. Scale, grid references and accurate drawing from measurement are not expected.",
    ],
    misconceptions: [
      { mistake: "A map has to include everything in the place.", why: "Photographs show everything, so pupils expect maps to.", response: "Ask 'Would someone need this to find the pond?' and leave out what they would not." },
      { mistake: "The positions of things on the map do not matter, as long as all are there.", why: "Pupils treat a map as a list of pictures.", response: "Swap two features and ask a partner to find one in the real place or the original picture." },
      { mistake: "A route is just the finish.", why: "Pupils focus on the destination.", response: "Name the start and give each step as a direction and a landmark. Ask a friend to try it." },
    ],
    vocabulary: [
      { term: "plan", meaning: "A drawing of a place from above." },
      { term: "landmark", meaning: "A feature that is easy to recognise and helps you find your way." },
      { term: "key", meaning: "A list that tells you what each symbol on a map means." },
      { term: "route", meaning: "The path from a start to a destination." },
      { term: "position", meaning: "Where something is compared with other things." },
      { term: "devise", meaning: "Work out and create something yourself." },
    ],
    before: "In Year 1 (Routes and Simple Maps) pupils made drawings of familiar places and followed simple routes.",
    next: "Year 3 uses grid references and eight compass points to describe positions, and later years draw maps to scale and use sketch maps in fieldwork.",
  },

  // ---------------------------------------------------------------- Local Fieldwork
  "observing-our-school-grounds": {
    statutory: [FIELD, PHYSICAL],
    inBrief: "Fieldwork means going outside to look carefully, record and describe. Pupils notice the human and physical features of a place, tally what they see and show it on a simple map with a key.",
    keyFacts: [
      "Observation means looking carefully at what is really there, and recording what you see rather than what you expect.",
      "A tally counts one mark for each feature seen, and groups of five make counting easier. Counts only describe the area that was looked at.",
      "School grounds have physical features, such as grass, trees, soil and puddles, and human features, such as buildings, paths and fences.",
      "The steps are: ask a question, observe, record, map and describe. A different viewing area, such as a window view, would give different counts.",
      "Boundary: the app uses an invented practice school, and real fieldwork is done on paper with a grown-up. The app cannot confirm it has been done.",
    ],
    misconceptions: [
      { mistake: "Fieldwork means counting everything in sight.", why: "Without a question, pupils list anything.", response: "Start with one question, such as 'Which features can we see here?', and choose categories first." },
      { mistake: "A tally from one area tells us about the whole school or town.", why: "Counts feel like facts about the whole place.", response: "Say 'In the area we looked at...' and compare with a second area." },
      { mistake: "Trees are human features because the school planted them.", why: "Pupils may know the tree was planted.", response: "Say plants growing naturally are physical. Planted trees are a mix, so a grown-up can decide a rule, such as 'a tree counts as vegetation'." },
    ],
    vocabulary: [
      { term: "fieldwork", meaning: "Learning about a place by going there and looking carefully." },
      { term: "observe", meaning: "Look carefully and notice details." },
      { term: "tally", meaning: "Marks used to count, one mark for each." },
      { term: "record", meaning: "Write or draw what you found out." },
      { term: "vegetation", meaning: "Plants that grow in a place, such as grass and trees." },
      { term: "grounds", meaning: "The outdoor areas of a school, such as the playground and field." },
    ],
    before: "In Year 1 (Around Our School) pupils prepared for observation by naming features in and around school with simple geographical words.",
    next: "Year 3 (Surveying Local Land Use) uses surveys and more detailed fieldwork, and key stage 2 builds in measurement, sketch maps and presenting data.",
  },

  "exploring-our-local-area": {
    statutory: [FIELD, COMPASS],
    inBrief: "Pupils take a grown-up-led walk or look at a window view to notice buildings, plants, land use and landmarks. They compare two observation points and present findings with a simple map and key.",
    keyFacts: [
      "A good local question can be answered by looking, such as 'What buildings can we see on our street?'.",
      "A route can be recorded by naming landmarks in order and using directions from a north arrow.",
      "Two observation points can have different counts, or the same. Pupils compare the same features in each, and the counts show only what was seen at those points.",
      "Findings are presented with a map, a key and a short account that uses the record as evidence, with a limit such as 'at these two points'.",
      "Boundary: a familiar route led by a grown-up and two viewing points. Roads and waterside places should be looked at from a safe place, and the app collects no addresses, photographs or locations.",
    ],
    misconceptions: [
      { mistake: "The observations are what we would see anywhere in town.", why: "Pupils generalise from a few points.", response: "Ask 'What did we not look at?' and add a limit to the account." },
      { mistake: "If the counts differ, one place is better or has more of everything.", why: "Totals are read as scores.", response: "Compare row by row, one feature at a time, and say 'more trees here, more houses there'." },
      { mistake: "Fieldwork is finished when we get back.", why: "Pupils see the walk as the whole activity.", response: "Use the record to make the map and key, then explain what it shows." },
    ],
    vocabulary: [
      { term: "local area", meaning: "The places near where we live or go to school." },
      { term: "observation point", meaning: "A place where we stop to look and count." },
      { term: "landmark", meaning: "A feature that is easy to recognise and helps you find your way." },
      { term: "land use", meaning: "What people use a place for, such as homes, shops or a park." },
      { term: "findings", meaning: "What we found out from our records." },
      { term: "route", meaning: "The path we follow from a start to a finish." },
    ],
    before: "In Year 1 (Around Our School, Routes and Simple Maps) pupils observed their school and followed simple routes with near, far, left and right.",
    next: "Year 3 (Surveying Local Land Use) carries out a land-use survey, and later years use fieldwork to collect, record and present data and to draw sketch maps.",
  },
};
