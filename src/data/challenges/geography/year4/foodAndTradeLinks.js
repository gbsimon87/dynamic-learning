import { c, lesson, ordered, record, sort, topic, visual } from "./authoring.js";
import { map } from "./maps.js";
import { directionOptions } from "./settlementsShared.js";

const EXD = "Example data: an invented journey, not a record of one real shipment.";
const vocab = record(["Example data: Ana grows apples on a farm in Country X.", "Sam buys apples in a shop in Country Y.", "Some of Ana's apples are sold to Country Y."], "Apples: an example (example data)");
const dry = record(["Dry central Washington valleys such as Yakima grew orchards after large-scale irrigation.", "Farmers also decide which crop to plant and where to sell it."], "Farming and conditions");
const apples = map("washington", ["Yakima", "Seattle"], ["Example journey (example data): apples start in an orchard area and are taken to a seaport.", "Stage 1 is at A, an orchard area near Yakima. Stage 2 is at B, the Seattle seaport.", "Stage 3 is a ship to another country; the map does not show it."]);
const eu = map("europe", ["Naples", "London"], ["Example journey (example data): a crate of food leaves a Campania farm.", "A is Naples, where the crate boards a ship. B is London, where it reaches a shop.", EXD]);
const table = visual("table", "Example journey (example data): food crate from Italy to the UK",
  "Example data table. Stage 1 Farm, Campania, Italy, transport to next stage: farm truck. Stage 2 Packing, near Naples, Italy, lorry. Stage 3 Port, Naples, Italy, ship. Stage 4 Port, a UK port, UK, lorry. Stage 5 Shop, London, UK, none. " + EXD,
  [EXD, "The crate starts on an Italian farm and ends in a shop in the UK."], {
    caption: "Example data: stages of an invented food journey.", columns: ["Stage", "Place", "Country", "Transport to next stage"],
    rows: [["1 Farm", "Campania", "Italy", "Farm truck"], ["2 Packing", "Near Naples", "Italy", "Lorry"], ["3 Port", "Naples", "Italy", "Ship"], ["4 Port", "A UK port", "UK", "Lorry"], ["5 Shop", "London", "UK", "None"]],
  });
const chain = record(["Example data: stage 1 orchard, stage 2 packing house, stage 3 seaport, stage 4 shop abroad.", "Each stage passes the apples to the next.", "Dry orchards in central Washington were irrigated to grow apples.", "Rainfall and soil are physical conditions. Farmers decide which crop to plant and where to sell it.", "Countries trade many kinds of goods; this example shows one journey only.", "No ranking of countries or current trade figures is used."], "A food chain (example data)");

const [dAns, dW1, dW2] = directionOptions("Yakima", "Seattle");
const [eAns, eW1, eW2] = directionOptions("Naples", "London");

export const foodAndTradeLinks = topic([
  lesson(["A producer grows or makes things to sell. A consumer buys or uses them.", "Trade is buying and selling.", "Exports are sold to another country; imports are brought in."], vocab, [
    c("Who is the producer in this example?", "Ana", "Sam", "Country Y", vocab, ["example"], "Who grows the apples?"),
    c("Who is the consumer in this example?", "Sam", "Ana", "Country X", vocab, ["example"], "Who buys the apples?"),
    c("From Country X's viewpoint, apples sold to Y are what?", "Exports", "Imports", "Consumers", vocab, ["g4_trade"], "They leave X to be sold abroad."),
    c("From Country Y's viewpoint, apples bought from X are what?", "Imports", "Exports", "Producers", vocab, ["g4_trade"], "They are brought into Y."),
    c("What is trade?", "Buying, selling or exchanging things", "Growing and packing food", "Moving house to another country", vocab, ["g4_trade"], "Think about what Ana and Sam do together."),
    sort("Sort each action by role.", ["Producer", "Consumer"], [["Picks the apples", 0], ["Eats the apples", 1], ["Grows the trees", 0], ["Buys a bag in a shop", 1]], vocab, ["example"], "Ask who makes it and who uses it."),
    ordered("Order a simple apple journey.", ["Apples grow on a farm", "Apples are packed", "Apples are shipped", "Apples are sold in a shop"], vocab, ["example"], "Start where the apples are grown."),
    c("What helped orchards grow in dry Yakima valleys?", "Irrigation", "Constant snow", "Warmer winters", dry, ["g4_orchards", "g4_wsAgri"], "Read the line about irrigation."),
  ]),
  lesson(["Follow the stages from the farm.", "Use the letters and the labelled lines.", "These journeys are examples, not shipment records."], apples, [
    c("Which marker shows the orchard stage?", "A", "B", "Neither", apples, ["g4_orchards"], "Read stage 1 in the lines."),
    c("Which marker shows the seaport stage?", "B", "A", "Neither", apples, ["g4_seaport"], "Read stage 2 in the lines."),
    c("In which direction do apples travel from A to B?", dAns, dW1, dW2, apples, ["atlas"], "Compare the positions of A and B."),
    ordered("Order the apple journey, starting at the orchard.", ["Orchard near Yakima", "Seattle seaport", "Ship to another country"], apples, ["example", "g4_seaport"], "Follow the stages from 1 to 3."),
    c("In the Naples journey, in which direction is B from A?", eAns, eW1, eW2, eu, ["atlas"], "Compare the positions of A and B on the map."),
    c("Which marker is the starting place of the Europe journey?", "A, Naples", "B, London", "Neither", eu, ["example"], "The crate leaves a Campania farm."),
    c("Which country buys the crate in the Europe example?", "The UK", "Italy", "Spain", eu, ["example"], "The crate reaches a shop in London."),
    c("Is the Europe journey a record of a real shipment?", "No, it is an example", "Yes, it records a real crate", "Yes, it records last year's trade", eu, ["example"], "Check the label in the lines."),
    c("Which stage happens at the Seattle seaport marker?", "Cargo ships are loaded", "Apples are picked from trees", "Shoppers buy apples", apples, ["g4_seaport"], "Think about what a seaport handles."),
  ]),
  lesson(["Read the table from one country's viewpoint.", "Imports come in; exports go out.", "An example journey does not show all trade."], table, [
    c("From Italy's viewpoint, the crate leaving Naples is what?", "An export", "An import", "A farm", table, ["g4_trade"], "It is sold to another country."),
    c("From the UK's viewpoint, the crate arriving at a UK port is what?", "An import", "An export", "A harvest", table, ["g4_trade"], "It is brought in from another country."),
    c("What transport carries the crate between the two countries?", "Ship", "Farm truck", "Lorry", table, ["example"], "Compare stage 3 and stage 4."),
    c("How many stages are in the UK?", "2", "3", "1", table, ["example"], "Count the rows with UK in the country column."),
    c("How many road journeys (truck or lorry) does the table show?", "3", "2", "4", table, ["example"], "Count truck and lorry rows."),
    c("Which is the first stage in a different country from the farm?", "Stage 4, the UK port", "Stage 3, the port at Naples", "Stage 2, packing", table, ["example"], "Check the country column."),
    sort("Sort each statement by viewpoint.", ["Italy's view: export", "UK's view: import"], [["Crate leaves Naples port", 0], ["Crate arrives at a UK port", 1], ["Italy sells food to the UK", 0], ["The UK buys food from Italy", 1]], table, ["g4_trade"], "Ask who is selling and who is buying."),
    c("What does this table show?", "One invented example journey", "Italy's total food exports", "A record of one real shipment", table, ["example"], "Read the label about example data."),
  ]),
  lesson(["A change at one stage can affect the next.", "Farming depends on conditions and decisions.", "One example never shows a whole country's trade."], chain, [
    c("A smaller harvest at stage 1 may lead to what at stage 2?", "Less fruit to pack", "More fruit waiting to be packed", "Fruit packed twice as quickly", chain, ["example"], "Stage 2 gets apples from stage 1."),
    c("If the seaport closes for a day, what could happen at stage 4?", "Apples may reach shops later", "Apples may reach shops sooner", "Apples may be picked sooner", chain, ["example"], "Stage 4 depends on stage 3."),
    c("If the packing house stops, what may happen at the seaport?", "Fewer boxes arrive", "More boxes arrive", "The same boxes arrive after the shop", chain, ["example"], "Stage 3 follows stage 2."),
    c("Why can one product not show all of a country's exports?", "Countries trade many kinds of goods", "Each country trades one main product", "A product's journey never crosses a border", chain, ["g4_trade"], "Think how many things are bought and sold."),
    c("Which physical condition did irrigation change?", "Water supply to dry land", "The length of the day", "The shape of the coast", chain, ["g4_orchards"], "Read the line about dry orchards."),
    sort("Sort each item by type.", ["Physical condition", "Human decision"], [["Rainfall", 0], ["Soil", 0], ["Which crop to plant", 1], ["Where to sell it", 1]], chain, ["g4_wsAgri", "example"], "Ask whether nature or farmers choose it."),
    ordered("Order the effects of a poor harvest.", ["Smaller harvest", "Less fruit packed", "Fewer boxes shipped", "Fewer apples in shops"], chain, ["example"], "Follow the stages in order."),
    c("Which statement avoids using a current trade ranking?", "This example shows one journey", "This country sells more apples than any other", "This journey shows this year's top exports", chain, ["example"], "Check which statements rely on rankings."),
    c("How could shoppers' choices affect the orchard?", "Fewer purchases can mean fewer orders", "Fewer purchases mean more orders", "Purchases change nothing earlier on", chain, ["example"], "Think about the journey in reverse."),
  ]),
]);
