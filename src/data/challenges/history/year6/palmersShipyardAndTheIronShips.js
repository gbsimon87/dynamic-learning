import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const palmersShipyardAndTheIronShips = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.britannica.com/place/Jarrow", "https://www.nationalarchives.gov.uk/education/"], [
  lesson("🚢", "Palmer's Shipyard", [
    ["Charles Mark Palmer started iron shipbuilding at Jarrow in 1851.", "What did Palmer start at Jarrow in 1851?", "iron shipbuilding", "sheep farming on the hills", "cotton weaving in mills"],
    ["Jarrow is on the River Tyne, where new ships could be launched.", "Why was the Tyne a good place for a shipyard?", "new ships could be launched there", "it was far away from the open sea", "it had no water in it at all"],
    ["In 1852, the yard built the John Bowes, an early iron collier with a screw propeller.", "What was the John Bowes?", "an iron collier", "a wooden sailing barge", "a royal passenger liner"],
    ["A collier carried coal from the Tyne to other ports.", "What did colliers carry from the Tyne?", "coal", "sugar", "bricks"],
    ["The yard also built warships and merchant ships.", "Which ships did the yard also build?", "warships and merchant ships", "only small rowing boats and canoes", "only tiny fishing boats and barges"],
    ["At its peak, thousands of people worked there.", "How many people worked there at its peak?", "thousands of people", "only a few families", "about a dozen men"]],
    sort("Ship, or cargo and material?", ["A kind of ship", "A cargo or material"], [["Warship", 0], ["Collier", 0], ["Coal", 1], ["Iron", 1]], ["warships", "collier", "coal", "iron"])),
  lesson("📅", "The yard in order", [
    ["Palmer began iron shipbuilding at Jarrow in 1851.", "When did Palmer begin iron shipbuilding at Jarrow?", "1851", "1751", "1951"],
    ["The John Bowes was built in 1852.", "What was built in 1852?", "the John Bowes", "the Cutty Sark", "the Mary Rose"],
    ["Palmer later became an MP.", "What did Palmer later become?", "an MP", "a prime minister", "a lighthouse keeper"],
    ["The Great Depression, when trade and jobs collapsed worldwide, slowed shipbuilding, so the yard closed in 1934.", "What slowed shipbuilding before the yard closed?", "the Great Depression", "the Great Fire of London", "the Black Death plague"],
    ["In 1936, men marched from Jarrow to London to ask for work.", "When did men march from Jarrow to London?", "1936", "1926", "1946"],
    ["Work returned later, as Britain prepared for war.", "What brought work back to Jarrow later?", "Britain preparing for war", "a new king being crowned in London", "a Roman road being built nearby"]],
    order("Order the events, oldest first.", ["Palmer starts iron shipbuilding · 1851", "The John Bowes is built · 1852", "The yard closes · 1934", "Men march to London · 1936"], ["1851", "1852", "1934", "1936"]), false),
  detective(["Photographs show ships being built beside the Tyne at Jarrow.", "Rows of workers' houses were built nearby for the people who worked there.", "Records say the yard built warships and merchant ships.", "The John Bowes, an early iron collier, was built in 1852.", "A report by the yard's owners may praise it, as they wanted it to look good.", "Memories of former workers tell us what the work felt like.", "Photographs cannot show how the workers felt."],
    [
    ["What do the photographs show?", "ships being built", "a castle being repaired", "fields of ripe crops", "ships being built beside the Tyne"],
    ["Why were rows of houses built nearby?", "for the people who worked there", "for the monks of the old monastery", "for passengers waiting for trains", "for the people who worked there"],
    ["Which ships do the records say the yard built?", "warships and merchant ships", "only fishing boats and barges", "only royal yachts and rowing boats", "built warships and merchant ships"],
    ["In which year was the John Bowes built?", "1852", "1822", "1925", "built in 1852"],
    ["Why might the owners' report praise the yard?", "they wanted it to look good", "they wanted it to close down", "they had never even seen it", "they wanted it to look good"],
    ["What do the workers' memories tell us?", "what the work felt like", "the exact date the yard opened", "how much iron the yard used", "what the work felt like"],
    ["What can photographs not show?", "how the workers felt", "that ships were built", "what a ship's hull looked like", "cannot show how the workers felt"]], { picture: "⚓", pictureLabel: "A shipyard beside a river" }),
  lesson("⚙️", "Why Jarrow changed", [
    ["Iron ships could be built bigger and stronger than wooden ones.", "Why did builders turn to iron?", "iron ships could be bigger and stronger", "wood had been banned by Parliament", "iron could be found floating at sea"],
    ["Shipbuilding brought jobs, so more people moved to Jarrow.", "Why did more people move to Jarrow?", "shipbuilding brought jobs", "the monks asked them to come", "the river had dried up for ever"],
    ["The town grew, with rows of workers' houses.", "How did the town change?", "it grew, with rows of houses", "it shrank to a few small farms", "it was moved all the way to London"],
    ["The Great Depression slowed shipbuilding, and the yard closed in 1934.", "What led to the yard closing in 1934?", "the Great Depression slowing shipbuilding", "a flood on the River Tyne that year", "a ban on all iron ships by law"],
    ["Many families lost their wages, because the town depended on the yard.", "What was a result of the yard closing?", "families lost their wages", "the town became much richer", "far more ships were launched"],
    ["People may still disagree about exactly why the yard closed.", "What may people still disagree about?", "why the yard closed", "where Jarrow is on the map", "who built the first yard"]],
    sort("Cause or result?", ["A cause", "A result"], [["Iron ships could be bigger", 0], ["The Great Depression", 0], ["People moved to Jarrow", 1], ["Families lost wages", 1]], ["bigger and stronger", "Great Depression", "moved to Jarrow", "lost their wages"])),
]);
