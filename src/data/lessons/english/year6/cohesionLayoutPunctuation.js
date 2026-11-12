import { topicLessons as lesson, sentence as s, table as t, fix as f, steps } from "../../topicLessons.js";

/** Bix lessons for the Year 6 "Grammar - Cohesion, Layout and Punctuation" topics. */
export const YEAR6_COHESION_LAYOUT_PUNCTUATION_LESSONS = {
  "cohesive-devices-across-paragraphs": lesson("Link one paragraph to the next", [
    "A **cohesive device** is a word or phrase that links a new paragraph to the one before.",
    "Three ways to link: show a contrast, show a result, or repeat a key word or phrase.",
  ], [
    s("Link with a contrast", "Cats sleep most of the day. **In contrast,** dogs need long walks.", "In contrast tells the reader paragraph 2 says something different."),
    t("Sort by what the link shows", ["Shows a contrast", "Shows a result"], [["On the other hand", "However"], ["As a consequence", "Therefore"], ["In contrast", "As a result"]], "Ask: is the next idea different, or is it what happened because of the first?"),
    f("Repair the link", "The river rose all night. On the other hand, several roads were closed.", "The river rose all night. As a consequence, several roads were closed.", "Closed roads are a result of the flooding, so a result link fits."),
    steps("Link by repeating", ["Find the key phrase in paragraph 1.", "Start paragraph 2 by repeating that phrase.", "Check the new paragraph is still about it."], "Repeating “the Roman road” links the paragraphs without needing a linking adverbial."),
  ]),
  "ellipsis": lesson("Leave out words readers can guess", [
    "**Ellipsis** means leaving words out because the reader can work them out from what came before.",
    "It stops writing repeating itself, and the gap links the two ideas.",
  ], [
    s("See the gap", "Leo ordered soup and Mia**,** pasta.", "The word ordered is left out the second time; the comma marks the gap and the reader fills it in."),
    t("Compare the versions", ["Full wording", "With ellipsis"], [["Sam did not want to paint.", "Sam did not."], ["Yes, I am coming.", "Yes, I am."], ["Dev packed a map.", "Dev, a map."]], "The shorter version keeps the meaning because the reader fills the gap."),
    f("Shorten the sentence", "Ravi packed a torch and Dev packed a map.", "Ravi packed a torch and Dev, a map.", "The second packed can be left out; the meaning is still clear."),
    steps("Check your ellipsis", ["Find the words repeated from the first part.", "Leave them out.", "Read it aloud: is the meaning still clear?"], "Do not leave out words the reader cannot work out."),
  ]),
  "layout-devices": lesson("Arrange a text for the reader", [
    "**Layout devices** structure a text so readers can find and understand things quickly.",
    "Headings and sub-headings name parts, bullets list short items, tables compare facts and columns split text into strips.",
  ], [
    s("Heading and sub-headings", "**Our School Garden** → Planting the seeds · What to bring", "The heading names the whole leaflet; each sub-heading names one part."),
    t("Match job to device", ["Job", "Device"], [["Title of a whole page", "Heading"], ["Start of a new part", "Sub-heading"], ["Short list of things", "Bullet points"], ["Facts to compare", "Table"], ["Narrow side-by-side strips", "Columns"]], "Ask what the reader needs to do, then pick the device that helps."),
    f("Choose the better layout", "Torch, map, compass and water bottle written in one long paragraph.", "Pack: • a torch • a map • a compass • a water bottle", "Short items are easier to scan as bullet points."),
    steps("Choose a device", ["Say what the reader needs.", "Find a part? Use a sub-heading. Scan a list? Use bullets. Compare facts? Use a table.", "Check the layout makes the text clearer, not busier."], "A layout device should always help the reader."),
  ]),
  "semicolons-colons-and-dashes": lesson("Join clauses with the right mark", [
    "An **independent clause** makes sense alone. Join two with a semi-colon, colon or dash, never just a comma.",
    "Semi-colon: two related ideas. Colon: the second explains the first. Dash: a pause or a surprise.",
  ], [
    s("Semi-colon", "It is raining**;** I am fed up.", "Both sides could be sentences; the semi-colon joins two related ideas."),
    t("Choose the mark", ["Semi-colon", "Colon", "Dash"], [["The sun set; the stars appeared.", "The match was cancelled: the pitch was flooded.", "I opened the box – it was empty."]], "Each mark gives the join a different feel."),
    f("Repair the comma splice", "Zayn was late, his bus had broken down.", "Zayn was late: his bus had broken down.", "A comma cannot join two independent clauses; the colon shows the second explains the first."),
    steps("Punctuate the join", ["Check each side could stand alone.", "Decide how the clauses relate.", "Put one mark exactly between them."], "Do not use a capital letter after a semi-colon or colon unless the word needs one."),
  ]),
  "punctuation-in-lists": lesson("Colons and semi-colons in lists", [
    "A **colon** introduces a list after a complete clause. When list items already contain commas, **semi-colons** separate the items.",
    "Read the part before the list: is it a complete clause? Do the items contain commas?",
  ], [
    s("Colon before a list", "Pack three things**:** a torch, a map and a compass.", "The clause before the colon is complete, so the colon introduces the list."),
    t("Choose the mark", ["Colon", "Semi-colons"], [["We visited three countries: France, Spain and Italy.", "I have friends in Paris, France; Madrid, Spain; and Rome, Italy."]], "Items without commas need only a colon; items with commas need semi-colons between them."),
    f("Repair the list", "Pets: Biscuit, a dog, Mittens, a cat, and Bubbles, a goldfish.", "Our pets are Biscuit, a dog; Mittens, a cat; and Bubbles, a goldfish.", "Semi-colons show where each item ends."),
    steps("Punctuate the list", ["Is the first part a complete clause? Add a colon.", "Do items contain commas? Separate them with semi-colons.", "Finish with a full stop."], "Never put a colon straight after a verb or preposition such as are or in."),
  ]),
  "bullet-point-punctuation": lesson("Punctuate bullet points consistently", [
    "Bullet points list information. The line before them ends with a **colon**.",
    "Phrases: lower-case start, no full stop. Sentences: capital letter and full stop. Keep every bullet the same.",
  ], [
    s("Phrase bullets", "Bring these to the pool**:** • a towel • a swimming costume • a water bottle", "Phrases: lower-case, no full stop."),
    t("Compare the styles", ["Phrases", "Full sentences"], [["a towel", "Hand in your form."], ["sun cream", "Pack a lunch."], ["a packed lunch", "Wear sensible shoes."]], "Choose one style and use it for every bullet in the list."),
    f("Repair a bullet", "• Pack a lunch", "• Pack a lunch.", "In a list of sentences every bullet needs a capital letter and a full stop."),
    steps("Check the list", ["Does the lead-in end with a colon?", "Are the bullets phrases or sentences?", "Do all bullets follow the same style?"], "Different styles in one list look careless and confuse the reader."),
  ]),
  "hyphens-to-avoid-ambiguity": lesson("Hyphens make the meaning clear", [
    "A hyphen can stop a phrase having two meanings. It joins words that work together, or separates a prefix.",
    "Say both meanings aloud, then decide which one you want.",
  ], [
    s("Two meanings", "a **man-eating** shark ≠ a man eating shark", "With the hyphen the shark eats people; without it a man is eating a shark."),
    t("Match meaning to spelling", ["With hyphen", "Without hyphen"], [["re-cover (cover again)", "recover (get back)"], ["re-sign (sign again)", "resign (leave a job)"], ["twenty-odd (about twenty)", "twenty odd (twenty strange)"]], "A hyphen can change a whole word's meaning."),
    f("Repair the meaning", "She meant a pale blue bag: a light blue bag.", "She meant a pale blue bag: a light-blue bag.", "The hyphen makes light-blue one describing word for the colour."),
    steps("Decide on the hyphen", ["Read the phrase aloud.", "Can it mean two things?", "Add a hyphen so only the meaning you want is possible."], "Not every phrase needs a hyphen; use it only to avoid confusion."),
  ]),
};
