import { choices, lesson, ordered, record, sort, topic } from "./authoring.js";
import { placePair, photoPair } from "./visuals.js";
const journeys = record(["Example journeys on simplified local plans; not visitor directions.", "Whitby: start at a home, follow a street, reach a shop.", "Peramu: start at a home, follow a walkway, reach a jetty.", "A boat can continue from the jetty across the river.", "Both areas have homes and routes for local journeys.", "These examples do not tell us how everyone travels."]);
const connections = record(["Both study areas have homes beside water and local routes.", "Whitby's streets connect homes and shops on land.", "Peramu's walkways connect nearby buildings above water.", "A jetty lets people board boats for river journeys.", "Different journeys can use different routes and transport.", "One example is not everyone's daily journey."]);
export const homesAndJourneysInTwoPlaces = topic([
  lesson(["People in both small places need homes and routes.", "Photographs show particular homes beside water.", "They cannot tell us everyone's daily journey."], photoPair, choices([
    ["Which need is shared by people in both areas?", "Homes to live in", "Only snowy mountains", "Only empty land"],
    ["What can we see beside buildings in both views?", "Water", "Only desert", "Only ice"],
    ["Which feature is built by people in both views?", "Buildings", "Sea water", "River water"],
    ["Which Peramu feature can connect nearby buildings?", "Walkway", "Harbour mud", "Mountain path"],
    ["What do the photographs show directly?", "Particular buildings and their surroundings", "Every person's daily journey", "Every home in both countries"],
    ["Which description fits the Whitby view?", "Buildings along a harbour edge", "Every home above river water", "Only empty forest"],
    ["Which description fits the Peramu home view?", "A decorated home above water", "Only an empty office", "An English harbour street"],
  ], photoPair, ["y2WhitbyPhoto", "y2HomesPhoto"])),
  lesson(["Read each example journey from start to finish.", "Whitby has streets; Peramu has walkways and boat journeys.", "These are practice routes on simplified plans."], journeys, [
    ...choices([
      ["What starts the Whitby example journey?", "A home", "A jetty", "A mountain"],
      ["What ends the Whitby example journey?", "A shop", "A jetty", "The North Pole"],
      ["What links the Peramu home to its jetty?", "A walkway", "An English street", "A glacier"],
      ["What can follow reaching the Peramu jetty?", "A boat crossing", "A car driving on water", "A polar walk"],
      ["What is shared by both journeys?", "Each begins at a home", "Each ends at a shop", "Each uses a boat"],
    ], journeys, ["example", "y2Peramu", "y2Whitby"]),
    ordered("Order the Whitby example journey.", ["Leave the home", "Follow the street", "Reach the shop"], journeys, ["example"], "Find the start, route and destination."),
    ordered("Order the Peramu example journey.", ["Leave the home", "Follow the walkway", "Reach the jetty", "Board the boat"], journeys, ["example"], "Find the home first, then follow the route."),
  ]),
  lesson(["Compare the same kinds of features in both places.", "Find similarities as well as differences.", "Use the two plans to support your comparison."], placePair, [
    ...choices([
      ["Which feature is shown in both local plans?", "Homes", "An ice shelf", "An airport"],
      ["Which shared physical feature is shown?", "Water", "A volcano", "A desert"],
      ["Which plan labels shops on adjoining streets?", "Whitby", "Peramu", "Neither plan"],
      ["Which plan labels a river jetty?", "Peramu", "Whitby", "Neither plan"],
      ["Which plan shows walkways between nearby homes?", "Peramu", "Whitby", "Neither plan"],
      ["Which comparison is supported?", "Both have homes and local routes", "Neither place has water", "Everyone uses the same transport"],
    ], placePair, ["y2Whitby", "y2Peramu"]),
    sort("Sort what is shared and what differs.", ["Shared in the plans", "Different in the plans"], [["Homes", 0], ["Water", 0], ["Street or walkway route", 1], ["Harbour or river jetty", 1]], placePair, ["y2Whitby", "y2Peramu"]),
  ]),
  lesson(["Routes connect places people need to reach.", "Water can make a boat journey useful.", "Explain the route shown, not how everyone travels."], connections, choices([
    ["Why can a boat be useful from Peramu's jetty?", "It can cross river water", "It needs a dry road", "It removes the river"],
    ["Why are the shown Peramu walkways useful?", "They connect nearby buildings above water", "They are only for cars", "They cover all Asia"],
    ["Why can a Whitby street link homes and shops?", "It provides a route on land", "It is a polar ice sheet", "It crosses every ocean"],
    ["Which statement gives a reason using evidence?", "A jetty helps people board river boats", "Everyone always walks", "No place needs routes"],
    ["Can all journeys be described from one example?", "No, journeys can differ", "Yes, everyone travels identically", "Yes, all travel uses boats"],
    ["Which need connects both areas' routes?", "Reaching nearby places from homes", "Avoiding every building", "Travelling only to mountains"],
    ["Which comparison respects the evidence's limit?", "These plans show some local routes", "They show everyone's whole journey", "They show every route in both countries"],
  ], connections, ["y2Whitby", "y2Peramu", "example"])),
]);
