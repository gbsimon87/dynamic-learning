// Year 6 Geography purpose screens. Maps reuse the app's geography visuals; other ideas use tables, pictures and steps.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const geo = (visual, alt) => ({ renderer: "geography", data: { visual: { lines: [], ...visual, alt } }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const pics = (title, items, alt) => ({ renderer: "pictures", data: { title, items }, alt });
const steps = (title, list, alt) => ({ renderer: "lesson", data: { type: "steps", title, steps: list }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });
const mk = (id, label, point) => ({ id, label, point });
const map = (view, title, markers, alt, extra = {}) => geo({ type: "map", view, title, markers, ...extra }, alt);

export default defineIntroductions({ year: 6, subject: "geography",
  subjectIntro: I("Welcome to Year 6 Geography", ["Compare regions and study how places change.", "Use maps, data and fieldwork to back up your ideas."],
    "Geography helps you understand big choices, such as where to build, how to make power and how to protect a coast. Good evidence helps you decide fairly.",
    "Before deciding how to protect a village from floods, planners look at maps, data and what local people say.",
    map("world", "Places in Year 6", [mk("A", "Belize", [-88.5, 17.2]), mk("B", "Russia", [60, 60]), mk("C", "UK", [-2, 54])], "A world map with markers on Belize, Russia and the UK.")),
  quests: {
    "regions-and-comparison": {
      intro: I("Regions and comparison", ["Study Belize, Europe, the Americas and Russia.", "Learn how to compare places fairly."],
        "A fair comparison needs the same kind of evidence about each place. This helps you avoid guesses and stereotypes.",
        "To compare two regions fairly, look at the same feature, such as climate, in both.",
        table("A fair comparison", ["Feature", "Place 1", "Place 2"], [["Climate", "Evidence", "Evidence"], ["Land use", "Evidence", "Evidence"]], "A table with the same features, climate and land use, compared for two places, with a row of evidence for each.")),
      topics: {
        "belize-and-the-caribbean-coast": I("Belize and the Caribbean coast", ["Find Belize in Central America.", "Learn about its coast, reef and tourism."],
          "Belize shows how a reef, a coast and tourism are linked, and why they need care.", "The Belize Barrier Reef lies off its Caribbean coast.",
          map("northAmerica", "Central America", [mk("A", "Belize", [-88.7, 17.2]), mk("B", "Mexico City", [-99.13, 19.43])], "A map of North America and Central America with markers on Belize and Mexico City.")),
        "comparing-four-regions": I("Comparing four regions", ["Choose fair evidence.", "Compare physical and human features."],
          "Comparing four places helps you spot patterns and reach a conclusion you can defend.", "Mountains and rivers are physical features. Roads and farms are human features.",
          table("Kinds of feature", ["Physical", "Human"], [["Mountains", "Roads"], ["Rivers", "Farms"]], "A table of features. Physical: mountains and rivers. Human: roads and farms.")),
        "europe-the-americas-and-russia": I("Europe, the Americas and Russia", ["Locate large regions of the world.", "Use latitude, longitude and maps."],
          "Knowing where regions are helps you follow news and plan journeys.", "Russia stretches across both Europe and Asia.",
          map("world", "Large regions", [mk("A", "Europe", [10, 50]), mk("B", "North America", [-100, 45]), mk("C", "Russia", [90, 60])], "A world map with markers on Europe, North America and Russia.")),
        "changing-uk-counties-and-cities": I("Changing UK counties and cities", ["Tell counties from cities.", "See how land use changes and why."],
          "Knowing why a place changes helps people plan homes, shops and green space.", "An old factory can become flats or offices.",
          map("uk", "UK cities", [mk("A", "London", [-0.12, 51.51]), mk("B", "Manchester", [-2.24, 53.48]), mk("C", "Cardiff", [-3.18, 51.48])], "A map of the UK with markers on London, Manchester and Cardiff.")),
      },
    },
    "environmental-change": {
      intro: I("Environmental change", ["Learn about glaciers and mountains.", "Weigh up ways to manage rivers, coasts and climate change."],
        "People shape and protect places. Learning the choices helps you judge which plans are fair for people and nature.",
        "A flood plan may protect homes but cost a lot or move risk downstream.",
        pics("Places that change", [{ icon: "🏔️", label: "Mountain" }, { icon: "🌊", label: "Coast" }, { icon: "🏞️", label: "River" }], "Three pictures: a mountain, a coast and a river.")),
      topics: {
        "glaciers-and-mountain-environments": I("Glaciers and mountain environments", ["Learn how glaciers shape valleys.", "See how mountain places are used and protected."],
          "Mountains give us water, power and holidays, and their habitats are easily harmed.", "A glacier is moving ice on land.",
          steps("How a glacier forms", ["Snow builds up over many years.", "It turns to ice.", "Gravity makes it flow downhill.", "It carves the valley."], "Four steps: snow builds up over many years, it turns to ice, gravity makes it flow downhill and it carves the valley.")),
        "managing-rivers": I("Managing rivers", ["Compare hard engineering and natural flood methods.", "Make a fair plan."],
          "Towns beside rivers need plans to reduce flood harm. The best plan uses local evidence.", "Wetlands can store floodwater and give wildlife a home.",
          table("Two ways to manage floods", ["Method", "Example"], [["Hard engineering", "Flood wall"], ["Natural approach", "Wetland"]], "A table of two flood methods: hard engineering such as a flood wall, and a natural approach such as a wetland.")),
        "managing-coasts": I("Managing coasts", ["Compare hard and soft defences.", "Weigh costs and effects."],
          "Coasts are home to people and wildlife. Choosing how to protect them is a hard decision.", "Beach nourishment adds sand to a beach.",
          table("Two kinds of defence", ["Kind", "Example"], [["Hard", "Sea wall"], ["Soft", "Beach nourishment"]], "A table of coastal defences: hard such as a sea wall, and soft such as beach nourishment.")),
        "climate-change-responses": I("Climate change responses", ["Read evidence about climate change.", "Tell cutting emissions from adapting."],
          "People can respond in many ways, from small daily choices to big decisions by governments.", "Cycling to school cuts emissions. A flood wall helps a place adapt.",
          table("Two kinds of response", ["Response", "Example"], [["Cut emissions", "Cycle instead of drive"], ["Adapt", "Plant shade trees"]], "A table of responses to climate change: cutting emissions by cycling instead of driving, and adapting by planting shade trees.")),
      },
    },
    "people-resources-and-connections": {
      intro: I("People, resources and connections", ["Compare energy choices.", "Study population, migration, trade and land use."],
        "Choices about energy, homes and trade affect people far away. Understanding the links helps you judge fair choices.",
        "A wind farm gives clean power but can change a view.",
        pics("Linked ideas", [{ icon: "💡", label: "Energy" }, { icon: "🚢", label: "Trade" }, { icon: "🏘️", label: "Homes" }], "Three pictures: energy, trade and homes.")),
      topics: {
        "energy-choices-and-trade-offs": I("Energy choices and trade-offs", ["Compare energy sources.", "Say what each choice gives and costs."],
          "Every way of making electricity has benefits and drawbacks, so leaders must weigh them up.", "Wind turbines release no carbon dioxide but can change a view.",
          table("Energy choices", ["Source", "Benefit", "Drawback"], [["Wind", "No fuel burned", "Changes a view"], ["Coal", "Reliable supply", "Releases carbon dioxide"]], "A table of two energy sources. Wind: no fuel burned, but it changes a view. Coal: reliable supply, but it releases carbon dioxide.")),
        "population-and-migration": I("Population and migration", ["Read population data.", "Learn why people move."],
          "Knowing how many people live somewhere helps plan schools, homes and hospitals.", "Population density means people per square kilometre.",
          table("Example town population", ["Year", "People"], [["2001", "14,500"], ["2021", "20,000"]], "A table of example town population: 14,500 people in 2001 and 20,000 in 2021.")),
        "global-trade-networks": I("Global trade networks", ["Follow a product along a supply chain.", "Compare transport choices."],
          "Supply chains explain how products reach shops and why a delay in one place can matter elsewhere.", "Beans are grown, shipped, made into chocolate and sold.",
          steps("A supply chain", ["A farmer grows cocoa.", "A ship carries it.", "A factory makes chocolate.", "A shop sells it."], "Four steps of a supply chain: a farmer grows cocoa, a ship carries it, a factory makes chocolate and a shop sells it.")),
        "changing-uk-land-use": I("Changing UK land use", ["Name land uses.", "Use maps and surveys to see change."],
          "Planners use maps and surveys to decide where homes, shops and green spaces should go.", "Online shopping has led to more warehouses.",
          table("Land uses", ["Land use", "Example"], [["Residential", "Housing estate"], ["Industrial", "Warehouse"], ["Recreational", "Park"]], "A table of land uses with examples: residential housing estate, industrial warehouse and recreational park.")),
      },
    },
    "maps-data-and-fieldwork": {
      intro: I("Maps, data and fieldwork", ["Use six-figure references, scale and map layers.", "Plan, present and evaluate fieldwork."],
        "Maps and evidence help you answer questions about a place and explain what you found to others.",
        "A six-figure grid reference can point to one exact place on a map.",
        geo({ type: "grid", title: "A map grid", origin: [23, 41], size: 3, markers: [mk("T", "Tree marker", [24.5, 42.5])] }, "A map grid with numbered lines and a tree marker inside one square.")),
      topics: {
        "six-figure-references-and-scale": I("Six-figure references and scale", ["Read eastings then northings.", "Use scale to measure distance."],
          "Walkers and map apps use grid references to pinpoint a place and scale to judge a distance.", "The first three digits of a six-figure reference are the easting.",
          geo({ type: "grid", title: "A practice grid", origin: [23, 41], size: 3, tenths: true, markers: [mk("T", "Tree marker", [24.5, 42.5])] }, "A practice grid with numbered lines, each square split into tenths, and a tree marker.")),
        "digital-map-layers": I("Digital map layers", ["See how layers add information.", "Compare layers to spot patterns."],
          "Digital maps help people plan routes, check flood risk and see land use.", "A flood layer can be placed over a housing layer.",
          table("Map layers", ["Layer", "Shows"], [["Roads", "Transport routes"], ["Land use", "How land is used"], ["Flood", "Areas at risk"]], "A table of map layers: roads show transport routes, land use shows how land is used and flood shows areas at risk.")),
        "planning-a-fieldwork-enquiry": I("Planning a fieldwork enquiry", ["Write a question you can test.", "Plan a fair and safe method."],
          "A good plan means results can be trusted and everyone stays safe.", "Count people at each site for 10 minutes at the same time of day.",
          steps("A fieldwork plan", ["Choose a question.", "Choose a method.", "Check it is fair and safe.", "Prepare a recording sheet."], "Four steps of a plan: choose a question, choose a method, check it is fair and safe and prepare a recording sheet.")),
        "presenting-and-evaluating-fieldwork": I("Presenting and evaluating fieldwork", ["Show results clearly.", "Say what went well and what to improve."],
          "Clear graphs and honest evaluation help others trust your conclusion.", "A small sample may not show the whole area.",
          table("Example counts", ["Site", "People counted"], [["Site 1", "9"], ["Site 2", "15"], ["Site 3", "24"]], "A table of example people counted at three sites: Site 1 nine, Site 2 fifteen and Site 3 twenty-four.")),
      },
    },
  } });
