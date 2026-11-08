import { lesson, detective, sort, order, year6Topic } from "./authoring.js";
export const whatIsLocalHistory = year6Topic(["https://www.bbc.co.uk/bitesize/topics/zq2qhyc", "https://www.english-heritage.org.uk/learn/", "https://www.nationalarchives.gov.uk/education/"], [
  lesson("🏘️", "Local history", [
    ["Local history is the story of a place near you.", "What is local history?", "the story of a place near you", "the story of the whole world", "the story of one king"],
    ["A locality is a town, village or area.", "What is a locality?", "a town, village or area", "a faraway country", "a kind of old map"],
    ["National history is what happened across a whole country.", "What is national history?", "what happened across a whole country", "what happened in one house", "what might happen tomorrow"],
    ["Local places can show national events, such as wars and new factories.", "What can local places show?", "national events", "only the weather", "only birthdays"],
    ["Clues include buildings, maps, photos and memories.", "Which of these is a local history clue?", "photos", "a recipe for a cake", "a football score"],
    ["Libraries, museums and archives keep local records.", "Where are local records kept?", "libraries, museums and archives", "only in shops", "only on the beach"]],
    sort("Local or national?", ["Local history", "National history"], [["a town, village or area", 0], ["a place near you", 0], ["a whole country", 1], ["wars", 1]], ["a town, village or area", "place near you", "a whole country", "wars"])),
  lesson("📍", "From street to country", [
    ["A street is part of a town or village.", "What is a street part of?", "a town or village", "a country only", "the sea"],
    ["A town or village is part of a county.", "What is a town part of?", "a county", "a street", "a house"],
    ["A county is part of a country, such as England.", "What is a county part of?", "a country", "a street", "a village"],
    ["Local historians study the small places first.", "What do local historians study first?", "the small places", "the biggest countries", "space"],
    ["Then they ask how the small place fits into bigger history.", "What do they ask next?", "how the small place fits bigger history", "what to eat for tea", "how to paint a house"],
    ["One place can have history from many different times.", "How many times can one place have history from?", "many different times", "only one time", "no times at all"]],
    order("Order the places, smallest first.", ["Street", "Town or village", "County", "Country"], ["A street", "A town or village", "A county", "A country, such as England"]), false),
  detective(["A historian wants to know about a village school.", "The old school building still stands.", "A photo from 1920 shows pupils in rows.", "A school log book records the weather and who was absent.", "An old pupil remembers cold classrooms and slate boards.", "A newspaper reported the school's opening day.", "Each clue tells part of the story, so we use several."],
    [
    ["What still stands in this village?", "the old school building", "a castle", "a railway station", "The old school building still stands."],
    ["What does the 1920 photo show?", "pupils in rows", "pupils on bikes", "a football match", "pupils in rows"],
    ["What does the log book record?", "the weather and who was absent", "the cost of lunch", "the name of every cat", "records the weather and who was absent"],
    ["Who remembers cold classrooms?", "an old pupil", "the head teacher today", "a builder", "An old pupil remembers cold classrooms"],
    ["What does an old pupil remember writing on?", "slate boards", "tablets", "laptops", "slate boards"],
    ["What reported the opening day?", "a newspaper", "a calendar", "a map", "A newspaper reported the school's opening day."],
    ["Why use several clues?", "each clue tells part of the story", "one clue tells everything", "clues are all the same", "Each clue tells part of the story, so we use several."]], { picture: "🏫", pictureLabel: "An old village school" }),
  lesson("🔎", "Why local history matters", [
    ["Local history makes the past close to home.", "What does local history make close to home?", "the past", "the future", "the weather"],
    ["It shows how ordinary people lived, not only kings and queens.", "Whose lives does it show?", "ordinary people", "only kings and queens", "only explorers"],
    ["One site can show change over hundreds of years.", "What can one site show?", "change over hundreds of years", "only one afternoon", "only the future"],
    ["Some things last, such as a church or a street name.", "Which can last for a long time?", "a church or a street name", "yesterday's ice cream", "a puddle"],
    ["Shop names and owners often change quickly.", "What often changes quickly?", "shop names and owners", "church towers", "hills and rivers"],
    ["Historians check each story against the evidence.", "What do historians check stories against?", "the evidence", "a guess", "the weather"]],
    sort("Does it last or change?", ["Often lasts", "Often changes"], [["a church", 0], ["a street name", 0], ["shop names", 1], ["shop owners", 1]], ["a church or a street name", "Shop names and owners"])),
]);
