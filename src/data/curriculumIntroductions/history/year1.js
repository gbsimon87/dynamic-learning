// Year 1 History purpose screens. No years are shown; ideas of long ago and today only.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const timeline = (events, alt) => ({ renderer: "timeline", data: { events: events.map(([date, label]) => ({ date, label })) }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });

export default defineIntroductions({ year: 1, subject: "history",
  subjectIntro: I("Welcome to Year 1 History", ["Find out how life was different long ago.", "Meet people and places from the past."],
    "History helps you understand how things change. You can ask grown-ups what life was like when they were small.",
    "Toys, homes and schools were different long ago.",
    timeline([["Long ago", "Old toys"], ["Later", "Newer toys"], ["Today", "Toys with apps"]], "A timeline in three steps: long ago, later and today.")),
  quests: {
    "then-and-now": {
      intro: I("Then and now", ["Compare toys, homes, schools and seaside holidays.", "Spot what changed and what stayed the same."],
        "Comparing then and now helps you see how life has changed.", "Some things changed. Some things stayed familiar.",
        pictures("Then and now", [["🧸", "Toys"], ["🏠", "Homes"], ["🏫", "School"], ["🏖️", "Seaside"]], "Four pictures: a teddy bear, a house, a school and a beach.")),
      topics: {
        "toys-then-and-now": I("Toys then and now", ["Some old toys were wood or tin.", "Some toys today use apps and screens."],
          "Old toys can show how play has changed.", "Grandparents spun tops and played marbles.",
          timeline([["First", "Wind-up train"], ["Next", "Battery train"], ["Now", "App train"]], "A timeline of toy trains: wind-up first, then battery, then app.")),
        "homes-then-and-now": I("Homes then and now", ["Long ago many homes had coal fires.", "Today homes have central heating and machines."],
          "Knowing how homes changed helps you ask older people about their homes.", "Washing clothes by hand took a long time. A machine is quicker.",
          pictures("Homes", [["🔥", "Coal fire"], ["🧺", "Washing by hand"], ["🌡️", "Central heating"], ["📺", "Screens"]], "Four pictures: a fire, a washing basket, a heating symbol and a television.")),
        "school-then-and-now": I("School then and now", ["Long ago classrooms had chalk and blackboards.", "Today we use whiteboards and tablets."],
          "Comparing schools helps you see what stays the same: children still learn together.", "Desks were often in rows.",
          pictures("School", [["🖍️", "Chalk"], ["🪧", "Blackboard"], ["📱", "Tablet"], ["🪑", "Desks"]], "Four pictures: chalk, a board, a tablet and a desk.")),
        "seaside-holidays-then-and-now": I("Seaside holidays", ["Long ago people visited piers and watched Punch and Judy.", "Some changed into swimwear in bathing huts."],
          "Old holiday photos tell us how people had fun long ago.", "Children rode donkeys on the beach.",
          pictures("Seaside", [["🎡", "Pier"], ["🎭", "Punch and Judy"], ["🫏", "Donkey"], ["🏖️", "Beach"]], "Four seaside pictures: a pier, a puppet show, a donkey and a beach.")),
      },
    },
    "the-first-flight": {
      intro: I("The first flight", ["Meet the Wright brothers.", "Compare the first plane with planes today."],
        "Knowing about the first flight helps you understand how travel changed.", "The first flight was very short.",
        timeline([["First", "Wright Flyer"], ["Later", "Bigger planes"], ["Today", "Jet planes"]], "A timeline of planes: the Wright Flyer, bigger planes and jet planes.")),
      topics: {
        "the-wright-brothers-first-flight": I("The Wright brothers", ["Orville and Wilbur Wright built the Wright Flyer.", "It flew for 12 seconds."],
          "This was the first powered plane flight, so it is a big moment in history.", "Orville flew the Wright Flyer. The flight lasted 12 seconds.",
          pictures("The first flight", [["👨", "Orville"], ["👨", "Wilbur"], ["✈️", "Wright Flyer"], ["⏱️", "12 seconds"]], "Four pictures: two brothers, a plane and a stopwatch showing 12 seconds.")),
        "flying-then-and-now": I("Flying then and now", ["The first plane was small.", "Planes today carry many people."],
          "Comparing planes shows how much can change.", "The Wright Flyer carried one pilot. A jet carries hundreds.",
          table("Planes", ["Compare", "First plane", "Plane today"], [["Size", "Small", "Big"], ["People", "One pilot", "Many"]], "A table comparing the first plane with a plane today for size and people.")),
      },
    },
    "explorers": {
      intro: I("Explorers", ["Meet Christopher Columbus and Neil Armstrong.", "Compare journeys by ship and by rocket."],
        "Explorers find out about new places. Their stories show how travel has changed.", "One explorer sailed in a ship. One went in a rocket.",
        pictures("Explorers", [["⛵", "Ship"], ["🚀", "Rocket"], ["🗺️", "Map"], ["🧭", "Compass"]], "Four pictures: a ship, a rocket, a map and a compass.")),
      topics: {
        "christopher-columbus": I("Christopher Columbus", ["Columbus sailed west with three ships.", "People already lived in the lands he reached."],
          "Learning about explorers means hearing the whole story, including how people were treated.", "People already lived there and were treated very unfairly.",
          pictures("Columbus", [["⛵", "Ship"], ["⛵", "Ship"], ["⛵", "Ship"], ["🧭", "West"]], "Four pictures: three ships and a compass pointing west.")),
        "neil-armstrong": I("Neil Armstrong", ["Neil Armstrong flew in Apollo 11.", "He was the first person to walk on the Moon."],
          "His story shows how people can explore space.", "Neil Armstrong stepped onto the Moon.",
          pictures("Neil Armstrong", [["🚀", "Rocket"], ["🧑‍🚀", "Astronaut"], ["🌕", "Moon"], ["👣", "First steps"]], "Four pictures: a rocket, an astronaut, the Moon and footprints.")),
        "explorers-then-and-now": I("Explorers then and now", ["Compare ships and rockets.", "Compare maps and computers."],
          "Comparing helps you see how journeys changed.", "A ship sails slowly. A rocket is much faster.",
          table("Two explorers", ["Compare", "Columbus", "Neil Armstrong"], [["Travel", "Ship", "Rocket"], ["Finding the way", "Map and compass", "Computers"]], "A table comparing Columbus and Neil Armstrong by travel and by how they found the way.")),
      },
    },
    "kings-and-queens": {
      intro: I("Kings and queens", ["Meet Queen Elizabeth I and Queen Victoria.", "Use portraits to find clues."],
        "Portraits and objects tell us about people who lived long ago.", "A portrait shows clothes and jewels.",
        pictures("Queens", [["👑", "Crown"], ["🖼️", "Portrait"], ["👗", "Clothes"], ["🏰", "Palace"]], "Four pictures: a crown, a portrait, a dress and a palace.")),
      topics: {
        "queen-elizabeth-i": I("Queen Elizabeth I", ["She was queen for a long time.", "Portraits show her clothes."],
          "Portraits help us find out about people before photographs.", "Her time had a famous fleet of ships called the Armada.",
          pictures("Elizabeth I", [["👑", "Crown"], ["🖼️", "Portrait"], ["⛵", "Armada"], ["👗", "Big collar"]], "Four pictures: a crown, a portrait, ships and a dress with a big collar.")),
        "queen-victoria": I("Queen Victoria", ["She was queen for a very long time.", "She had a big family."],
          "Her life shows how people lived in her time.", "In Victoria's time people travelled by steam train.",
          pictures("Victoria", [["👑", "Crown"], ["👨‍👩‍👧‍👦", "Big family"], ["🚂", "Steam train"], ["🐴", "Carriage"]], "Four pictures: a crown, a family, a steam train and a horse and carriage.")),
        "two-queens-long-ago": I("Two queens", ["Compare Elizabeth I and Victoria.", "Find out how we know about them."],
          "Comparing helps you notice clothes, homes and travel in different times.", "One queen came long before the other.",
          table("Two queens", ["Compare", "Elizabeth I", "Victoria"], [["Came first", "Yes", "No"], ["Known for", "The Armada", "A big family"]], "A table comparing Elizabeth I and Victoria.")),
      },
    },
    "clues-around-you": {
      intro: I("Clues around you", ["Look for clues in buildings.", "Read street names."],
        "Old buildings and street names tell stories about the place where you live.", "Mill Lane may once have led to a mill.",
        pictures("Clues", [["🏚️", "Old building"], ["🪧", "Street sign"], ["🔍", "Look closely"], ["📅", "Date"]], "Four pictures: an old building, a street sign, a magnifying glass and a date.")),
      topics: {
        "old-and-new-buildings": I("Old and new buildings", ["Look at materials and windows.", "Look for dates on walls."],
          "Clues help you tell old buildings from new ones.", "A date carved on a wall can show when it was built.",
          pictures("Building clues", [["🧱", "Materials"], ["🪟", "Windows"], ["📅", "Date"], ["🏚️", "Old"]], "Four pictures: bricks, a window, a date and an old building.")),
        "clues-in-street-names": I("Clues in street names", ["Some names tell us what was nearby.", "Read Mill Lane, Station Road and Church Street."],
          "A street name can be a clue about the past.", "Church Street may lead to a church.",
          pictures("Street names", [["🌾", "Mill Lane"], ["🚉", "Station Road"], ["⛪", "Church Street"], ["🔍", "Clue"]], "Four pictures: a mill, a station, a church and a magnifying glass.")),
      },
    },
  } });
