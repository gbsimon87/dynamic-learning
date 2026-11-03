import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { letterOf, map } from "./maps.js";

const TR = "g4_trade", ATLAS = "atlas", PORTS = "y5_ports", CANALS = "y5_canals", FAIR = "y5_fairtrade", CHOC = "y5_cocoa";
const which = (v, name, others) => c(`Which letter marks ${name} on the map?`, `Marker ${letterOf(v, name)}`, `Marker ${letterOf(v, others[0])}`, `Marker ${letterOf(v, others[1])}`, v, [ATLAS, TR], "Find the marker list in the evidence, then match the name.");

const words = record([
  "Trade means buying and selling goods and services.",
  "An export is something a country sells to another country.",
  "An import is something a country buys from another country.",
  "A producer makes or grows goods. A consumer buys and uses them.",
  "Ports are where ships load and unload goods.",
], "Trade words");
const journey = map("world", ["Ghana", "Felixstowe", "Suez", "Panama"], [
  "Cocoa beans grow on farms in Ghana, in West Africa.",
  "Ships carry cocoa to ports such as Felixstowe in the UK, then lorries take it to chocolate factories.",
  "The Suez Canal joins the Mediterranean Sea and the Red Sea. It shortens sea trips between Europe and Asia.",
  "The Panama Canal joins the Atlantic Ocean and the Pacific Ocean.",
]);
const ports = visual("table", "Some famous ports", "Felixstowe, UK: the largest container port in the UK. Rotterdam, Netherlands: the largest port in Europe. Shanghai, China: one of the busiest container ports in the world.", [
  "Container ships carry goods in standard metal boxes.", "Ships are slow but carry heavy loads cheaply.", "Aeroplanes are quick but cost much more, so they carry light, valuable or fresh goods such as flowers.",
], { caption: "Three big ports", columns: ["Port", "Country", "Fact"], rows: [["Felixstowe", "UK", "Largest container port in the UK"], ["Rotterdam", "Netherlands", "Largest port in Europe"], ["Shanghai", "China", "One of the world's busiest container ports"]] });
const links = record([
  "A chocolate bar links many people: a cocoa farmer, a shipper, a factory worker, a shop worker and a customer.",
  "Fairtrade pays farmers a minimum price and an extra amount for their community.",
  "If a cocoa harvest is poor, there is less cocoa and the price can rise.",
  "If a port is closed, goods can be late and shop shelves can be empty.",
  "Buying goods grown near home can cut the distance they travel.",
], "Links in a chain");

export const tradeLinksAndGlobalConnections = topic([
  lesson(["Trade is buying and selling.", "A country exports what it sells and imports what it buys.", "Ships carry most goods."], words, [
    c("What does trade mean?", "Buying and selling goods and services", "Making and testing new kinds of maps", "Growing crops and planting trees for shade", words, [TR], "Read the first evidence sentence."),
    c("What is an export?", "Something a country sells to another country", "Something a country buys from another country", "Something a country makes and keeps for itself", words, [TR], "Read the second evidence sentence."),
    c("What is an import?", "Something a country buys from another country", "Something a country sells to another country", "Something a country grows and keeps for itself", words, [TR], "Read the third evidence sentence."),
    c("What does a producer do?", "Makes or grows goods", "Only buys goods", "Only counts goods", words, [TR], "Read the fourth evidence sentence."),
    c("What does a consumer do?", "Buys and uses goods", "Grows crops only", "Builds ships only", words, [TR], "Read the fourth evidence sentence."),
    c("What happens at a port?", "Ships load and unload goods", "Aeroplanes take off and land with goods", "Trains turn around and load coal", words, [PORTS, "y5_felixstowe"], "Read the last evidence sentence."),
    c("The UK buys bananas from abroad. For the UK, bananas are an …", "Import", "Export", "Producer", words, [TR], "The UK is buying them from another country."),
    sort("Sort each action as an import or an export for the UK.", ["Import for the UK", "Export for the UK"], [["Buying cocoa from Ghana", 0], ["Buying oranges from Spain", 0], ["Selling cars to France", 1], ["Selling books to Australia", 1]], words, [TR], "Imports come in; exports go out."),
  ]),
  lesson(["Follow a cocoa journey on the map.", "Canals shorten sea trips.", "Read the labelled places."], journey, [
    c("Where do cocoa beans grow in the evidence?", "Ghana", "Felixstowe", "Panama", journey, [CHOC], "Read the first evidence sentence."),
    c("Which marked place is a UK port?", "Felixstowe", "Ghana", "Suez", journey, [PORTS, "y5_felixstowe"], "Read the second evidence sentence."),
    c("What do lorries do after ships bring cocoa to a UK port?", "Take it to chocolate factories", "Take it back to farms in Ghana", "Plant it in fields beside the port", journey, [CHOC], "Read the second evidence sentence."),
    c("Which canal joins the Mediterranean Sea and the Red Sea?", "The Suez Canal", "The Panama Canal", "The English Channel", journey, [CANALS, "y5_panama"], "Read the third evidence sentence."),
    c("Which canal joins the Atlantic and the Pacific Oceans?", "The Panama Canal", "The Suez Canal", "The Thames", journey, [CANALS, "y5_panama"], "Read the last evidence sentence."),
    which(journey, "Panama", ["Ghana", "Suez"]),
    which(journey, "Felixstowe", ["Ghana", "Panama"]),
    c("Which marked place lies furthest west?", "Panama", "Ghana", "Suez", journey, [ATLAS], "Compare degrees west; the largest is furthest west."),
    ordered("Order the cocoa journey from the farm to the shop.", ["Cocoa grows in Ghana", "A ship crosses the sea", "Lorries reach the factory", "Chocolate arrives in shops"], journey, [CHOC], "Start with the farm."),
  ]),
  lesson(["Ports link countries.", "Ships are cheap for heavy goods.", "Aeroplanes are quick for light goods."], ports, [
    c("Which is the largest container port in the UK?", "Felixstowe", "Rotterdam", "Shanghai", ports, [PORTS, "y5_felixstowe"], "Read the Felixstowe row."),
    c("Which is the largest port in Europe?", "Rotterdam", "Felixstowe", "Shanghai", ports, [PORTS, "y5_felixstowe"], "Read the Rotterdam row."),
    c("In which country is Rotterdam?", "The Netherlands", "The UK", "China", ports, [PORTS, "y5_felixstowe"], "Read the Rotterdam row."),
    c("Which port is in China?", "Shanghai", "Felixstowe", "Rotterdam", ports, [PORTS, "y5_felixstowe"], "Read the Country column."),
    c("What do container ships carry goods in?", "Standard metal boxes", "Small paper bags", "Open baskets", ports, [PORTS, "y5_felixstowe"], "Read the first evidence line."),
    c("Why do ships carry heavy goods?", "They are slow but cheap for heavy loads", "They are quicker than aeroplanes", "They never use ports", ports, [PORTS, "y5_felixstowe"], "Read the second evidence line."),
    c("Which goods usually travel by aeroplane?", "Light, valuable or fresh goods such as flowers", "Very heavy goods such as coal and iron", "Huge machines too big for any aeroplane", ports, [PORTS, "y5_felixstowe"], "Read the third evidence line."),
    c("Which is cheaper for a heavy load?", "A ship", "An aeroplane", "They cost the same", ports, [PORTS, "y5_felixstowe"], "Read the second and third evidence lines."),
    sort("Sort each good by the way it is most likely to travel.", ["Likely by ship", "Likely by aeroplane"], [["Heavy car parts", 0], ["Bags of grain", 0], ["Fresh flowers", 1], ["Fresh strawberries", 1]], ports, [PORTS, "y5_felixstowe"], "Heavy goods go by ship; fresh light goods go by plane."),
  ]),
  lesson(["Trade links many people.", "A change at one stage can affect others.", "Choices change the links."], links, [
    c("Who is part of a chocolate bar's chain?", "A cocoa farmer, a shipper, a factory worker and a shop worker", "Only the customer who buys the chocolate bar", "Only the shop where the chocolate bar is sold", links, [CHOC], "Read the first evidence sentence."),
    c("What does Fairtrade pay farmers?", "A minimum price and an extra amount for their community", "Nothing, because Fairtrade only sets prices for shops", "Only a certificate to hang on the farm wall", links, [FAIR], "Read the second evidence sentence."),
    c("What can happen to the price after a poor cocoa harvest?", "It can rise", "It must fall", "It cannot change", links, [CHOC], "Read the third evidence sentence."),
    c("What can happen if a port is closed?", "Goods can be late", "Shops get more goods", "Ships run faster", links, [PORTS, "y5_felixstowe"], "Read the fourth evidence sentence."),
    c("What can buying goods grown near home do?", "Cut the distance they travel", "Make the journey longer", "Stop all trade", links, [TR], "Read the last evidence sentence."),
    c("Which stage is affected first when cocoa farmers lose their crop?", "The supply of cocoa", "The shop window", "The weather forecast", links, [CHOC], "Think about the start of the chain."),
    c("Which statement is supported by the evidence?", "A change at one stage can affect other stages", "Every stage works alone and never affects another", "Nothing changes along the chain whatever happens", links, [TR], "Read the middle evidence sentences."),
    c("Why can a port closure affect shoppers?", "Goods are late, so shelves can be empty", "Shoppers can walk through the ship", "Prices always fall", links, [PORTS, "y5_felixstowe"], "Link the port to the shop."),
    sort("Sort each event by the stage of the chocolate chain it affects most.", ["Farm", "Port or shop"], [["A poor harvest", 0], ["A drought on the cocoa farms", 0], ["A closed port", 1], ["Late goods on shelves", 1]], links, [CHOC, PORTS], "Think about where each event happens."),
  ]),
]);
