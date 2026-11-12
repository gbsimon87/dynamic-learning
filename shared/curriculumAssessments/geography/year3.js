// Year 3 Geography knowledge checks. Local survey work is rehearsed from supplied evidence, not assessed outdoors.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const evidence = (title, text) => [{ title, text, credit: "Learn with Bix — authored example evidence" }];
const europeMarker = geo({ type: "map", view: "europe", title: "Map of Europe", markers: [{ id: "A", label: "Marker A", point: [12.5, 43] }] }, "A map of Europe with one marker, A, on one country.");
const coords = (point) => geo({ type: "coordinates", title: "Read point P on a globe grid", point }, "A practice globe grid with latitude labels up the side, longitude labels along the bottom and a point P marked.");
const grid = (point) => geo({ type: "grid", title: "Practice grid", origin: [23, 41], size: 3, markers: [{ id: "T", label: "Marker T", point }] },
  "A practice grid. Eastings run along the bottom from 23 to 26 and northings up the side from 41 to 44. Marker T is inside one square. North is up.");

export default defineAssessmentBank({ year: 3, subject: "geography", quests: {
  "the-uk-and-europe": {
    "counties-cities-and-regions": { objective: "Tells counties, cities and regions of the UK apart.", items: [
      { q: "Which of these is a county in England?", a: "Cumbria", d: ["Cardiff", "Belfast"], practice: 1,
        why: "Cumbria is a county. Cardiff and Belfast are capital cities." },
      { q: "Sort these places.", sort: { bins: ["City", "County"], cards: [["Manchester", "City"], ["Birmingham", "City"], ["Cumbria", "County"], ["North Yorkshire", "County"]] }, practice: 1,
        why: "Manchester and Birmingham are cities. Cumbria and North Yorkshire are counties." },
      { q: "In which region of England is Newcastle upon Tyne?", a: "North East", d: ["South West", "East Midlands"], practice: 4,
        why: "Newcastle upon Tyne is in the North East of England." },
    ] },
    "uk-landscapes-and-land-use": { objective: "Names UK landscapes and describes land use.", items: [
      { q: "What is a valley?", a: "Low land between slopes", d: ["The flat top of a hill", "The place where land meets the sea"], practice: 1,
        why: "A valley is lower land between hills or mountains. Where land meets the sea is the coast." },
      { q: "A field full of sheep is an example of which land use?", a: "Farming", d: ["Housing", "Industry"], practice: 1,
        why: "Keeping animals on a field is farming." },
      { q: "The Pennines are...", a: "Hills in northern England", d: ["Islands off Scotland", "Lakes in Wales"], practice: 2,
        why: "The Pennines are a range of upland hills in northern England." },
      { q: "A map from 2000 shows a field. A map of the same place from 2020 shows houses and a road. What changed?", a: "Farmland became housing", d: ["Housing became farmland", "Nothing changed"], practice: 4,
        why: "Comparing the two dated maps shows the field was replaced by houses and a road." },
    ] },
    "europe-and-russia": { objective: "Locates chosen European countries and Russia.", items: [
      { q: "What is the capital city of France?", a: "Paris", d: ["Rome", "Berlin"], practice: 2,
        why: "Paris is the capital of France. Rome is in Italy and Berlin is in Germany." },
      { q: "Which country is marked A?", a: "Italy", d: ["Spain", "Greece"], practice: 2, model: europeMarker,
        why: "The marker is on the boot-shaped country in southern Europe, which is Italy." },
      { q: "Russia has land in which two continents?", a: "Europe and Asia", d: ["Europe and Africa", "Asia and Australia"], practice: 4,
        why: "Western Russia is in Europe and most of Russia lies in Asia." },
    ] },
  },
  "lines-on-the-globe": {
    "the-equator-and-hemispheres": { objective: "Uses the Equator and hemispheres to place countries.", items: [
      { q: "Which line divides Earth into northern and southern hemispheres?", a: "The Equator", d: ["The Prime Meridian", "The Tropic of Cancer"], practice: 1,
        why: "The Equator is at 0° latitude and splits north from south." },
      { q: "In which hemisphere is Australia?", a: "Southern", d: ["Northern", "Neither"], practice: 2,
        why: "Australia lies south of the Equator." },
      { q: "Sort these countries by hemisphere.", sort: { bins: ["Northern Hemisphere", "Southern Hemisphere"], cards: [["Norway", "Northern Hemisphere"], ["Canada", "Northern Hemisphere"], ["Argentina", "Southern Hemisphere"], ["New Zealand", "Southern Hemisphere"]] }, practice: 4,
        why: "Norway and Canada are north of the Equator. Argentina and New Zealand are south of it." },
    ] },
    "tropics-and-polar-circles": { objective: "Names the tropics and polar circles and their order.", items: [
      { q: "Which line is about 23.5° north of the Equator?", a: "Tropic of Cancer", d: ["Tropic of Capricorn", "Arctic Circle"], practice: 1,
        why: "The Tropic of Cancer is north. The Tropic of Capricorn is south." },
      { q: "Put these lines in order from north to south.", order: ["Arctic Circle", "Tropic of Cancer", "Equator", "Tropic of Capricorn", "Antarctic Circle"], practice: 2,
        why: "From the top of the globe: Arctic Circle, Tropic of Cancer, Equator, Tropic of Capricorn, Antarctic Circle." },
      { q: "The tropics lie between which two lines?", a: "Tropic of Cancer and Tropic of Capricorn", d: ["Arctic Circle and Antarctic Circle", "Equator and Arctic Circle"], practice: 3,
        why: "The tropics are the band between the two tropic lines, with the Equator in the middle." },
    ] },
    "latitude-and-longitude": { objective: "Reads latitude and longitude from a globe grid.", items: [
      { q: "What is point P's latitude?", a: "20° south", d: ["20° north", "40° south"], practice: 2, model: coords([20, -20]),
        why: "Latitude is read up the side. P is 20° south of the Equator." },
      { q: "What is point P's longitude?", a: "20° west", d: ["20° east", "40° west"], practice: 3, model: coords([-20, 20]),
        why: "Longitude is read along the bottom. P is 20° west of the Prime Meridian." },
      { q: "Which line is at 0° latitude?", t: ["Equator", "the Equator"], practice: 1,
        why: "The Equator is at 0° latitude." },
    ] },
  },
  "physical-processes": {
    "mountains-and-valleys": { objective: "Names mountain parts and valleys and some UK peaks.", items: [
      { q: "What is low land between two hills or mountains called?", a: "A valley", d: ["A summit", "A peak"], practice: 1,
        why: "A valley is low land between higher ground." },
      { q: "Put these from the highest land to the lowest.", order: ["Mountain", "Hill", "Valley"], practice: 1,
        why: "Mountains are higher than hills. A valley is low land between the slopes." },
      { q: "Which mountain range has high peaks in northern Italy?", a: "The Alps", d: ["The Pennines", "The Cairngorms"], practice: 2,
        why: "The Alps stretch across northern Italy. The Pennines are in England and the Cairngorms are in Scotland." },
      { q: "Why are farm fields often found in a valley rather than on steep slopes?", a: "Gentle, flat land is easier to farm", d: ["Valleys never get any rain", "Steep slopes are always too warm"], practice: 4,
        why: "Flatter land in a valley is easier to plough, build on and travel across." },
    ] },
    "volcanoes": { objective: "Describes magma, lava and eruptions and names a famous volcano.", items: [
      { q: "What is hot melted rock underground called?", a: "Magma", d: ["Ash", "Pebbles"], practice: 1,
        why: "Magma is melted rock under the ground. It is called lava when it flows out." },
      { q: "Put the route of molten rock in order, starting below ground.", order: ["Magma collects below ground", "Magma moves up the vent", "It comes out of the crater", "Lava flows down the side"], practice: 3,
        why: "Magma travels up the vent and out of the crater. Once it reaches the surface it is called lava." },
      { q: "Mount Vesuvius, near Naples, is a volcano in which country?", a: "Italy", d: ["Spain", "Wales"], practice: 2,
        why: "Vesuvius is in Campania in southern Italy." },
    ] },
    "earthquakes": { objective: "Describes plates, faults and earthquake measuring.", items: [
      { q: "The Earth's crust is broken into huge pieces called...", a: "Tectonic plates", d: ["Lava flows", "Ocean currents"], practice: 1,
        why: "Tectonic plates move very slowly and can cause earthquakes." },
      { q: "What is a crack in the Earth's crust where blocks of rock can slip?", a: "A fault", d: ["A crater", "A river mouth"], practice: 1,
        why: "A fault is a break in the crust. Earthquakes often start at faults." },
      { q: "Which tool measures shaking in an earthquake?", a: "A seismometer", d: ["A thermometer", "A rain gauge"], practice: 4,
        why: "A seismometer detects ground movement." },
    ] },
    "the-water-cycle": { objective: "Names the main processes of the water cycle.", items: [
      { q: "What is it called when liquid water turns into water vapour?", a: "Evaporation", d: ["Condensation", "Collection"], practice: 1,
        why: "Evaporation happens when water is warmed and rises as vapour." },
      { q: "Put the water cycle in order, starting with the sea.", order: ["Evaporation", "Condensation", "Precipitation", "Collection"], practice: 2,
        why: "Water rises, cools into clouds, falls and then collects again." },
      { q: "Rain, snow and hail fall from clouds. What is this part of the water cycle called?", t: "precipitation", practice: 1,
        why: "Water falling from clouds is precipitation." },
    ] },
  },
  "two-european-regions": {
    "the-lake-district": { objective: "Describes the Lake District's location, landscape and land use.", items: [
      { q: "In which English county is most of the Lake District?", a: "Cumbria", d: ["Devon", "Kent"], practice: 1,
        why: "Most of the Lake District is in Cumbria." },
      { q: "Which is the highest mountain in England, in the Lake District?", a: "Scafell Pike", d: ["Ben Nevis", "Snowdon"], practice: 2,
        why: "Scafell Pike is England's highest mountain." },
      { q: "Which land uses are common in the Lake District?", a: "Sheep farming and tourism", d: ["Large car factories", "Tropical fruit farming"], practice: 3,
        why: "Hill farming and visitors are important there." },
    ] },
    "campania": { objective: "Describes Campania's location, landscape and land use.", items: [
      { q: "Campania is a region in which part of Italy?", a: "Southern Italy", d: ["Northern Italy", "The Alps"], practice: 1,
        why: "Campania is on the south-west coast of Italy." },
      { q: "Which volcano overlooks the Bay of Naples?", a: "Vesuvius", d: ["Snowdon", "Ben Nevis"], practice: 2,
        why: "Vesuvius is the famous volcano near Naples." },
      { q: "Which is the biggest city in Campania?", a: "Naples", d: ["Rome", "Milan"], practice: 1,
        why: "Naples is Campania's largest city. Rome and Milan are in other regions." },
      { q: "Why do boats use Naples?", a: "It has a harbour on the coast", d: ["It is beside a lake", "It is high in the mountains"], practice: 4,
        why: "Naples has a harbour beside the sea, so boats can load and unload there." },
    ] },
    "comparing-two-regions": { objective: "Compares the Lake District and Campania.", items: [
      { q: "Use the evidence. Sort these features.", sort: { bins: ["Lake District", "Campania"], cards: [["Lakes shaped by ice", "Lake District"], ["Hill sheep farms", "Lake District"], ["A volcano nearby", "Campania"], ["Hot, dry Julys near Naples", "Campania"]] }, practice: 3,
        evidence: [{ title: "July climate (1991–2020 averages)", text: "Ambleside area: 15°C and 104 mm of rain. Naples area: 25°C and 23 mm of rain.", credit: "NASA POWER, rounded model averages" }],
        why: "The Lake District has lakes shaped by ice and hill farms. Campania has Vesuvius, and the Naples area is hotter and much drier in July." },
      { q: "What is alike about both regions?", a: "Many visitors come for tourism", d: ["Both have an active volcano", "Both are in Italy"], practice: 4,
        why: "Both are popular with visitors. Only Campania has a volcano and is in Italy." },
      { q: "Which region is in Italy?", a: "Campania", d: ["Lake District", "Both regions"], practice: 1,
        why: "Campania is in Italy. The Lake District is in England." },
    ] },
  },
  "maps-and-local-surveys": {
    "eight-compass-points": { objective: "Uses eight compass points.", items: [
      { q: "Which direction is halfway between north and east?", a: "North-east", d: ["South-east", "North-west"], practice: 1,
        why: "North-east lies between north and east." },
      { q: "Which direction is opposite to south-west?", a: "North-east", d: ["North-west", "South-east"], practice: 2,
        why: "Opposite directions point in opposite ways, so south-west is opposite north-east." },
      { q: "Put the eight points in clockwise order, starting at north.", order: ["North", "North-east", "East", "South-east", "South", "South-west", "West", "North-west"], practice: 1,
        why: "Turn clockwise round the compass from north." },
    ] },
    "four-figure-grid-references": { objective: "Reads four-figure grid references, eastings first.", items: [
      { q: "Which four-figure reference matches the square containing marker T?", a: "2442", d: ["4224", "2542"], practice: 4, model: grid([24.5, 42.5]),
        why: "Eastings first: 24. Then northings: 42. The reference is 2442." },
      { q: "In a four-figure grid reference, which pair do we read first?", a: "Eastings, along the bottom", d: ["Northings, up the side", "Either; the order does not matter"], practice: 1,
        why: "Along the corridor, then up the stairs: eastings first." },
      { q: "Which four-figure reference matches the square containing marker T?", a: "2541", d: ["4125", "2441"], practice: 4, model: grid([25.5, 41.5]),
        why: "Eastings first: 25. Then northings: 41. The reference is 2541." },
    ] },
    "surveying-local-land-use": { objective: "Rehearses recording and reading land use from supplied evidence (not an outdoor survey).", items: [
      { q: "Sort these land uses.", sort: { bins: ["Homes", "Business"], cards: [["Terraced street", "Homes"], ["Block of flats", "Homes"], ["Supermarket", "Business"], ["Office block", "Business"]] }, practice: 3,
        why: "Streets and flats are for living in. Shops and offices are used for business." },
      { q: "How many more houses than shops were counted?", n: 7, practice: 3,
        evidence: evidence("Street survey", "A class counted 12 houses, 5 shops and 1 park along one street."),
        why: "12 - 5 = 7 more houses than shops." },
      { q: "You cannot tell how a building is used. What should you record?", a: "Uncertain", d: ["Guess that it is a shop", "Leave it off the record"], practice: 1,
        why: "Recording 'uncertain' keeps the survey honest instead of guessing." },
      { q: "Why keep the same land-use categories at both survey sites?", a: "So the counts can be compared fairly", d: ["So the survey takes longer", "So you can guess hidden uses"], practice: 2,
        why: "Using the same categories at each site makes a fair comparison." },
    ] },
  },
} });
