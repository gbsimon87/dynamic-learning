// Year 2 History purpose screens. Facts follow the approved Year 2 design boundary.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const timeline = (events, alt) => ({ renderer: "timeline", data: { events: events.map(([date, label]) => ({ date, label })) }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });

export default defineIntroductions({ year: 2, subject: "history",
  subjectIntro: I("Welcome to Year 2 History", ["Find out about events and people from long ago.", "Use clues to learn what happened."],
    "History helps you understand why things are the way they are today. Clues like diaries, pictures and buildings tell the story.",
    "A fire in London in 1666 changed how the city was built.",
    timeline([["1666", "Great Fire of London"], ["1850s", "Nurses help soldiers"], ["1955", "Rosa Parks"]], "A timeline with three events: the Great Fire of London in 1666, nurses helping soldiers in the 1850s and Rosa Parks in 1955.")),
  quests: {
    "changes-within-living-memory": {
      intro: I("Changes in living memory", ["Compare how people kept in touch.", "Compare how people got about."],
        "Asking grandparents about the past shows how much has changed in one lifetime.", "A letter takes time to arrive. A video call is live.",
        pictures("Then and now", [["✉️", "Letter"], ["☎️", "Telephone"], ["🚌", "Bus"], ["💻", "Video call"]], "Four pictures: a letter, a telephone, a bus and a video call on a laptop.")),
      topics: {
        "keeping-in-touch-then-and-now": I("Keeping in touch", ["Compare letters and phone calls with video calls.", "Think about how long messages took."],
          "Knowing how messages travelled shows why today feels so fast.", "A letter went in the post. A video call is live.",
          timeline([["First", "Letters"], ["Next", "Telephones"], ["Now", "Video calls"]], "A timeline of keeping in touch: letters, telephones, then video calls.")),
        "getting-about-then-and-now": I("Getting about", ["Compare journeys in grandparents' time and today.", "Compare steam trains with electric trains."],
          "Journeys have changed, so people can travel further each day.", "Grandparents rode buses and bikes too. Many trains today use electricity.",
          pictures("Getting about", [["🚶", "Walking"], ["🚲", "Bicycle"], ["🚗", "Car"], ["✈️", "Aeroplane"]], "Four pictures: a walker, a bicycle, a car and an aeroplane.")),
      },
    },
    "the-great-fire-of-london": {
      intro: I("The Great Fire of London", ["Learn why the fire began and spread.", "Use diaries and pictures to find out."],
        "The fire shows how an event can change a city, and how we learn about it from clues.", "The fire began in a bakery and burned for days.",
        timeline([["1666", "The fire starts"], ["Later", "London is rebuilt"]], "A timeline with two events: the fire starts in 1666 and London is rebuilt later.")),
      topics: {
        "london-in-1666": I("London in 1666", ["Houses were wooden and close together.", "Streets were narrow and busy."],
          "Knowing what London was like helps explain why fire was dangerous.", "Many houses had wooden frames and stood close together.",
          pictures("London in 1666", [["🏠", "Wooden houses"], ["🛣️", "Narrow streets"], ["🌊", "River Thames"], ["⛪", "St Paul's"]], "Four pictures: a wooden house, a narrow street, a river and a cathedral.")),
        "how-the-great-fire-started-and-spread": I("How the fire started and spread", ["The fire began in a bakery in Pudding Lane.", "Wooden houses and wind helped it spread."],
          "Knowing why it spread helps us understand how to be safe from fire.", "The fire began on a Sunday in September 1666.",
          timeline([["1", "A fire starts"], ["2", "Wind carries sparks"], ["3", "Wooden houses catch fire"]], "A timeline in three steps: a fire starts, wind carries sparks, wooden houses catch fire.")),
        "how-we-know-about-the-great-fire": I("How we know about the fire", ["Diaries are written clues.", "Paintings are picture clues."],
          "Different clues help us learn about the past even though nobody alive saw the fire.", "Samuel Pepys wrote a diary about the fire.",
          pictures("Clues", [["📖", "Diary"], ["🖼️", "Painting"], ["✉️", "Letter"], ["🔍", "Look closely"]], "Four pictures: a diary, a painting, a letter and a magnifying glass.")),
        "london-after-the-fire": I("London after the fire", ["London was rebuilt with brick and stone.", "A new St Paul's Cathedral was built."],
          "The fire changed how London was built, and the changes last today.", "Christopher Wren designed a new cathedral.",
          table("Before and after", ["Compare", "Before the fire", "After the fire"], [["Houses", "Wood", "Brick and stone"], ["Streets", "Narrow", "Wider"]], "A table comparing London before and after the fire for houses and streets.")),
      },
    },
    "nurses-who-made-a-difference": {
      intro: I("Nurses who made a difference", ["Meet Florence Nightingale, Mary Seacole and Edith Cavell.", "Compare nursing then and now."],
        "These nurses helped people in need. Their ideas still help nurses today.", "Each nurse found her own way to help.",
        pictures("Nurses", [["🩺", "Nurse"], ["🛏️", "Hospital bed"], ["🪔", "Lamp"], ["🧼", "Clean hands"]], "Four pictures: a stethoscope, a hospital bed, a lamp and clean hands.")),
      topics: {
        "florence-nightingale": I("Florence Nightingale", ["She nursed soldiers in the Crimean War.", "She made hospitals cleaner."],
          "Her ideas about cleanliness still matter in hospitals.", "She carried a lamp at night, so she was called the Lady with the Lamp.",
          pictures("Florence Nightingale", [["🪔", "Lamp"], ["🧼", "Clean"], ["🌬️", "Fresh air"], ["🩺", "Nurse"]], "Four pictures: a lamp, soap, fresh air and a stethoscope.")),
        "mary-seacole": I("Mary Seacole", ["She was born in Jamaica.", "She cared for soldiers near the fighting."],
          "Her story shows courage in helping others.", "She went to the Crimea to care for soldiers.",
          pictures("Mary Seacole", [["🌴", "Jamaica"], ["🩺", "Nurse"], ["🪖", "Soldiers"], ["🍲", "Food and care"]], "Four pictures: palm trees, a nurse, a soldier and a bowl of food.")),
        "edith-cavell": I("Edith Cavell", ["She was a nurse in Belgium.", "She cared for people from both sides in the war."],
          "Her story shows that a nurse helps everyone who needs care.", "She cared for soldiers whichever side they were on.",
          pictures("Edith Cavell", [["🩺", "Nurse"], ["🏥", "Hospital"], ["🤝", "Both sides"], ["🇧🇪", "Belgium"]], "Four pictures: a stethoscope, a hospital, two hands shaking and a Belgian flag.")),
        "nursing-then-and-now": I("Nursing then and now", ["Compare what nurses used long ago and today.", "See what stays the same."],
          "Comparing shows how medicine has changed while caring stays the same.", "Nurses still care for people who are ill.",
          table("Nursing", ["Compare", "Long ago", "Today"], [["Light", "Oil lamp", "Electric light"], ["Equipment", "Simple tools", "Modern machines"]], "A table comparing nursing long ago and today for light and equipment.")),
      },
    },
    "people-who-changed-things": {
      intro: I("People who changed things", ["Meet Rosa Parks, Emily Davison, William Caxton and Tim Berners-Lee.", "Find out what changed."],
        "People can make big changes by being brave or by inventing something new.", "A printing press and the web both changed how we share ideas.",
        pictures("Changes", [["🚌", "Bus"], ["🗳️", "Vote"], ["📚", "Printed books"], ["🌐", "The web"]], "Four pictures: a bus, a ballot box, books and the web.")),
      topics: {
        "rosa-parks": I("Rosa Parks", ["She lived in the United States.", "She refused to give up her bus seat."],
          "Her story shows how standing up for fairness can help change unfair rules.", "In 1955 Rosa Parks said no on a bus, and many people supported her.",
          pictures("Rosa Parks", [["🚌", "Bus"], ["💺", "Seat"], ["✋", "Said no"], ["🤝", "People together"]], "Four pictures: a bus, a seat, a raised hand and people together.")),
        "emily-davison-and-votes-for-women": I("Votes for women", ["Campaigners wanted women to vote.", "Emily Davison was one of them."],
          "Voting lets people have a say, and women had to campaign for it.", "In 1918 some women won the vote.",
          timeline([["Before 1918", "Women could not vote"], ["1918", "Some women could vote"], ["1928", "All women over 21"]], "A timeline: before 1918 women could not vote, in 1918 some women could vote, in 1928 all women over 21.")),
        "william-caxton-and-tim-berners-lee": I("Caxton and Berners-Lee", ["William Caxton brought printing to England.", "Tim Berners-Lee invented the World Wide Web."],
          "Both changed how people share words and ideas.", "Printing made many copies of a book. The web lets us read pages on screens.",
          timeline([["About 1476", "Printing press in England"], ["1989", "World Wide Web invented"]], "A timeline: a printing press in England about 1476 and the World Wide Web invented in 1989.")),
      },
    },
    "days-we-remember": {
      intro: I("Days we remember", ["Learn why we remember Bonfire Night and Remembrance Day.", "See what symbols mean."],
        "Special days help people remember events and stay safe.", "A poppy helps people remember.",
        pictures("Days we remember", [["🎆", "Bonfire Night"], ["🌺", "Poppy"], ["🕯️", "Remember"], ["📅", "Date"]], "Four pictures: fireworks, a poppy, a candle and a date.")),
      topics: {
        "bonfire-night": I("Bonfire Night", ["It remembers the Gunpowder Plot.", "It is on 5 November."],
          "Knowing the story explains why we have bonfires and fireworks, which we enjoy safely.", "Guy Fawkes was found guarding gunpowder.",
          pictures("Bonfire Night", [["🎆", "Fireworks"], ["🔥", "Bonfire"], ["📅", "5 November"], ["🏛️", "Parliament"]], "Four pictures: fireworks, a bonfire, a date and Parliament.")),
        "remembrance-day": I("Remembrance Day", ["We remember people who died in wars.", "We wear poppies and keep silence."],
          "Remembering shows respect and thanks.", "At 11 o'clock people are quiet for two minutes.",
          pictures("Remembrance", [["🌺", "Poppy"], ["🤫", "Silence"], ["🕚", "11 o'clock"], ["📅", "11 November"]], "Four pictures: a poppy, a quiet face, a clock at eleven and a date.")),
      },
    },
    "history-near-you": {
      intro: I("History near you", ["Read memorials and plaques.", "Compare old and new views."],
        "Clues near your home show who and what mattered in the place where you live.", "A plaque on a wall can say who lived there.",
        pictures("Local clues", [["🔵", "Blue plaque"], ["🗿", "Memorial"], ["🗺️", "Old map"], ["📷", "Old photo"]], "Four pictures: a blue plaque, a statue, a map and a photograph.")),
      topics: {
        "memorials-and-blue-plaques": I("Memorials and blue plaques", ["A blue plaque says who lived or worked somewhere.", "A memorial helps us remember."],
          "Plaques and memorials are clues about local people and events.", "A blue plaque may be on the wall of a house.",
          pictures("Plaques", [["🔵", "Blue plaque"], ["🗿", "Memorial"], ["📜", "Words"], ["🏠", "House"]], "Four pictures: a blue plaque, a memorial, some writing and a house.")),
        "old-maps-and-photos": I("Old maps and photos", ["Compare old and new views.", "Find what changed and what stayed."],
          "Comparing helps you see how a place has changed over time.", "Fields may have become houses, but a church may stay.",
          table("Comparing views", ["Compare", "Old view", "New view"], [["Land", "Fields", "Houses"], ["Church", "There", "Still there"]], "A table comparing an old and a new view for land and for a church.")),
      },
    },
  } });
