/**
 * Teacher subject-knowledge briefings for Year 3 History, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the key stage 2 programme of
 * study in docs/curriculum/key-stage-2-history.md (the PDF text), using the
 * requirement that the topic's row in the "Year 3 topic crosswalk" names. Never
 * paraphrase or alter it: a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Key Stage 1 prior learning and the Year 4+ destination
 *
 * Dates follow the app: BC and AD, "about" or "c." where scholars disagree.
 */
const STONE_TO_IRON = "changes in Britain from the Stone Age to the Iron Age";
const ROMANS = "the Roman Empire and its impact on Britain";
const CIVILISATIONS =
  "the achievements of the earliest civilizations – an overview of where and when the first civilizations appeared and a depth study of one of the following: Ancient Sumer; The Indus Valley; Ancient Egypt; The Shang Dynasty of Ancient China";

export const YEAR3_HISTORY_BRIEFINGS = {
  // ---------------------------------------------------------------- Stone Age to Iron Age
  "how-we-know-about-prehistory": {
    statutory: [STONE_TO_IRON],
    inBrief: "Prehistory is the long time before people left written records, so we learn about it from objects and remains. Archaeologists build careful, cautious explanations from clues, and know that new finds can change them.",
    keyFacts: [
      "An artefact is an object made or changed by people, such as a flint tool or a pot. Bones, seeds and charcoal are remains. Both are evidence, and neither speaks for itself.",
      "Where a find lies matters as much as the find. Digging destroys the ground, so archaeologists record each find's position before it is moved.",
      "Stone Age, Bronze Age and Iron Age are labels archaeologists chose from the main tool material. The dates are approximate and the periods overlap: roughly Stone Age to about 2500 BC, Bronze Age to about 800 BC, Iron Age to the Roman conquest in AD 43.",
      "BC years count down towards year 1 and AD years count up, with no year 0. From 55 BC to AD 43 is 97 years, not 98.",
      "Boundary: sources, artefacts, the order of the British periods and the meaning of BC and AD. Scientific dating methods and exact period boundaries are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks prehistory means the time of dinosaurs, or that archaeologists dig up dinosaurs.", why: "Both are 'very old' and appear together in stories and films.", response: "Put dinosaurs (about 66 million years ago) well off the left of a timeline. Show that people first appear far later, and that palaeontologists study fossils while archaeologists study things people made or used." },
      { mistake: "Puts 50 BC before 100 BC because 50 is smaller.", why: "Numbers normally grow with time, so counting down towards year 1 feels backwards.", response: "Use a number line with 100 BC at the left and AD 100 at the right. Count a countdown towards year 1 and then up, and say each date aloud with its label." },
      { mistake: "Believes an object tells us everything, such as the maker's name or exactly how it was used.", why: "A museum label sounds certain, and one object is easy to over-read.", response: "Ask 'What can we see? What can we not know?' Compare two or more kinds of clue before drawing a conclusion." },
    ],
    vocabulary: [
      { term: "prehistory", meaning: "The time before people left written records in a place." },
      { term: "archaeologist", meaning: "Someone who studies objects and remains from the past, often by careful digging." },
      { term: "artefact", meaning: "An object made or changed by people." },
      { term: "evidence", meaning: "A clue we use to work out and support an idea about the past." },
      { term: "excavation", meaning: "A careful dig that uncovers and records what lies in the ground." },
      { term: "BC and AD", meaning: "BC labels years before year 1 and counts down; AD labels years from year 1 onwards and counts up." },
    ],
    before: "In Key Stage 1 pupils use clues such as old buildings, photographs and maps to find out about the past (Old and New Buildings, How We Know About the Great Fire, Old Maps and Photos). The furthest event they met is the Great Fire of London in 1666.",
    next: "Year 4 uses artefacts and place names to study the Anglo-Saxons and Sutton Hoo, with attention to what sources cannot tell us. Year 5 adds BC and AD ordering (One Long Timeline) and primary and secondary sources (Sources and Interpretations).",
  },

  "stone-age-hunter-gatherers": {
    statutory: [STONE_TO_IRON],
    inBrief: "For most of the Stone Age, people in Britain lived by hunting animals and gathering wild plants, using tools made from flint, bone, antler and wood. Their way of life was skilled and often mobile, and it was shaped by the seasons.",
    keyFacts: [
      "Hunter-gatherers hunted animals, fished and gathered berries, nuts, roots and shellfish. Many moved with the seasons to follow food, in small groups, and made temporary shelters.",
      "Flint breaks into sharp edges when struck, so it was chipped into axes, blades and arrowheads. Wood, bone and antler tools were also used, but they rot, so stone tools survive best.",
      "Fire gave warmth, light and protection and made food easier to eat. In the colder parts of the Stone Age, Ice Age animals such as woolly mammoths lived in Britain, and Britain was joined to Europe by land until about 8,000 years ago.",
      "Britain's Stone Age is far longer than all later periods put together. Farming reached Britain about 6,000 years ago, and hunting and gathering carried on alongside it.",
      "Boundary: the broad pattern of a way of life based on wild food. The names Palaeolithic, Mesolithic and Neolithic and named sites are not required.",
    ],
    misconceptions: [
      { mistake: "Thinks all Stone Age people lived in caves and were not clever.", why: "Cartoons show 'cavemen'. Caves preserve evidence well, so they feature in museums.", response: "Show the skill in making flint tools and the planning needed to follow seasonal food. Explain that most people used shelters built from wood, hides and plants, which have left few traces." },
      { mistake: "Believes Stone Age people lived alongside dinosaurs.", why: "Both are 'long ago', and films mix them.", response: "Use a long timeline to show dinosaurs died out millions of years before the first people." },
      { mistake: "Thinks hunting stopped as soon as farming began.", why: "Pupils picture one way of life replacing another on a single date.", response: "Use the 'both' idea: some groups hunted, some farmed and many did both for a long time. Change spread slowly and unevenly." },
    ],
    vocabulary: [
      { term: "hunter-gatherer", meaning: "A person who gets food by hunting animals and gathering wild plants rather than farming." },
      { term: "flint", meaning: "A hard stone that can be chipped to make a sharp edge." },
      { term: "gathering", meaning: "Collecting wild foods such as berries, nuts and roots." },
      { term: "seasonal", meaning: "Linked to a time of year, such as autumn nuts or summer fishing." },
      { term: "Stone Age", meaning: "The earliest period of human history, named because stone was the main material for tools." },
    ],
    before: "In Year 1 pupils compare ways of life then and now (Toys, Homes and School Then and Now), and in Year 2 they look back as far as 1666. This is their first study of a past thousands of years old.",
    next: "Year 4 compares farming and village life in Anglo-Saxon times (Anglo-Saxon Village Life). Year 5 meets very different farming and food in the Maya (Maya Farming and Food).",
  },

  "the-first-farmers-and-skara-brae": {
    statutory: [STONE_TO_IRON],
    inBrief: "Farming reached Britain in the later Stone Age, and some people began to live in settled villages. Skara Brae in Orkney is a well-preserved village whose stone houses show how farmers lived about 5,000 years ago.",
    keyFacts: [
      "Farming reached Britain about 6,000 years ago, brought by people who crossed from continental Europe with seed corn and animals. Farmers grew barley and wheat, kept cattle and sheep, and cleared land.",
      "Skara Brae is on the Bay of Skaill in Orkney, Scotland, and was occupied from about 3200 BC to 2500 BC. It was uncovered by a storm in 1850. Orkney has few trees, so builders used local stone that splits into slabs.",
      "Its houses had thick walls built into piles of earth, a central hearth, stone beds and stone shelves. Villagers also hunted, fished and collected shellfish. What some features were for, such as the stone 'dressers' and carved stone balls, is unknown and named by modern excavators.",
      "Skara Brae is older than the Great Pyramid at Giza and than Stonehenge's large stones.",
      "Boundary: the move from hunting and gathering to farming and settled villages, with Skara Brae as the example. Migration debates and the term Neolithic are not needed.",
    ],
    misconceptions: [
      { mistake: "Says Skara Brae is in England, or that Britain means England.", why: "Pupils use 'Britain' and 'England' as if they were the same.", response: "Locate Orkney on a map. Britain is England, Scotland and Wales, and Skara Brae is on an island off northern Scotland." },
      { mistake: "Thinks the farmers gave up hunting and fishing.", why: "'Farmers' suggests only crops and animals.", response: "Use the evidence: bones of fish, shellfish and deer are found alongside farm animals. People used every available food." },
      { mistake: "Assumes stone beds and shelves mean these people were simple or had no wood.", why: "Pupils judge by modern furniture.", response: "Explain that stone was the plentiful material on Orkney. Padded beds with skins or heather are likely but have not survived. Ask what clues are lost and what survives." },
    ],
    vocabulary: [
      { term: "farmer", meaning: "A person who grows crops and keeps animals for food." },
      { term: "settlement", meaning: "A place where people live together for a long time." },
      { term: "village", meaning: "A small group of homes with shared life, usually surrounded by fields." },
      { term: "hearth", meaning: "The fireplace in the centre of a home, used for warmth and cooking." },
      { term: "Neolithic", meaning: "The later Stone Age, when farming began (the app calls it the later Stone Age)." },
    ],
    before: "In Year 1 pupils compare homes then and now and use clues to tell that a building is old (Homes Then and Now, Old and New Buildings). Year 2 pupils use evidence to describe London in 1666.",
    next: "Year 4 compares Skara Brae's farming and homes with Anglo-Saxon Village Life. Year 6 uses buildings, maps and records as evidence in a local study (Buildings and Streets as Evidence).",
  },

  "stonehenge-and-the-bronze-age": {
    statutory: [STONE_TO_IRON],
    inBrief: "Stonehenge was built in stages by people with no metal tools and was used over many centuries. Its purpose is not known for certain, and the Bronze Age brought new metal skills and wider travel.",
    keyFacts: [
      "Stonehenge is in Wiltshire. Its first ditch and bank date to about 3000 BC. The big sarsen stones were raised about 2500 BC, around the end of the Stone Age. The smaller bluestones came from the Preseli Hills in west Wales, roughly 150 miles away, and the sarsens from about 15 miles away.",
      "How the stones were moved and raised is still debated. Sledges, ropes and many people working together are the leading ideas, and these are theories rather than facts.",
      "What Stonehenge was for is not certain. It is lined up on the midsummer and midwinter sun, and many burials were made there, so ceremony and remembering the dead are strong possibilities. Druids did not build it.",
      "Bronze is made by mixing copper with a little tin. In Britain the Bronze Age ran from about 2500 BC to about 800 BC. Metal, and ideas such as gold ornaments and pottery styles, travelled widely, and tin from south-west Britain was traded.",
      "Boundary: building in stages, working together, links between distant places, and religion and technology as ideas. Exact phases and measurements are not required.",
    ],
    misconceptions: [
      { mistake: "Says the Druids (or the Romans) built Stonehenge.", why: "Popular stories and Victorian ideas link Stonehenge with Druids.", response: "Show on the timeline that Stonehenge is more than 2,000 years older than the Druids reported by Roman writers. Say that nobody in the Iron Age or Roman period built it." },
      { mistake: "Thinks it was built all at once by one generation.", why: "A finished picture hides the changes over time.", response: "Use a three-stage sequence: ditch and bank, large stones, later changes. Stress that people kept changing it over hundreds of years." },
      { mistake: "States as fact that Stonehenge was a calendar or a temple.", why: "Guides and websites give one answer with confidence.", response: "Separate evidence (sun alignment, burials, stones from Wales) from explanations (ceremony, remembrance). Ask pupils which words show uncertainty, such as 'probably'." },
    ],
    vocabulary: [
      { term: "monument", meaning: "A large structure built by people to mark something important." },
      { term: "bronze", meaning: "A metal made by mixing copper with tin." },
      { term: "solstice", meaning: "The longest or shortest day of the year, when the sun rises or sets at its furthest point." },
      { term: "ceremony", meaning: "A special event with set actions, often connected with beliefs." },
      { term: "technology", meaning: "The tools and methods people use to make or do things." },
      { term: "trade", meaning: "Swapping or selling goods between people or places." },
    ],
    before: "Pupils have met historic buildings as clues (Old and New Buildings) and events beyond living memory (the Great Fire, 1666). Earlier in Year 3 they met the Stone Age and Skara Brae.",
    next: "Year 4 studies another burial and its treasures in Sutton Hoo and Anglo-Saxon Art. Year 5 studies building for power and belief in The Parthenon and Greek Temples and in Maya Cities and Kings.",
  },

  "iron-age-hill-forts": {
    statutory: [STONE_TO_IRON],
    inBrief: "In the Iron Age, about 800 BC to the Roman conquest in AD 43, many Britons lived in farming communities led by tribal leaders. Some built hill forts with banks and ditches, such as Maiden Castle in Dorset.",
    keyFacts: [
      "Iron was widely available and made strong tools and weapons, but it needs high heat and skilled forging. Blacksmiths and metalworkers were valued specialists. Bronze continued to be used for decoration.",
      "Most people were farmers living in roundhouses in small settlements. Hill forts were large enclosures with earth banks, ditches and timber gates. They were used for defence, storage, gatherings and showing power, and not everyone lived in one.",
      "Maiden Castle has an earlier Stone Age enclosure but grew into one of the largest Iron Age hill forts. It was home to a tribe, the Durotriges, in the late Iron Age. A story of a Roman massacre there, told in the 1930s, has since been questioned.",
      "Iron Age art is known for flowing, curved patterns on metalwork such as mirrors, shields and neck rings. Many people say 'Celtic' for this art, but historians debate whether that label fits all the peoples of Iron Age Britain.",
      "Boundary: why forts were built, how people lived and what we can learn from them. Tribal names beyond one or two, and detailed rampart designs, are not required.",
    ],
    misconceptions: [
      { mistake: "Thinks everyone lived in hill forts and was always fighting.", why: "'Fort' suggests war, and a defended site is easy to remember.", response: "Show pits for grain, roundhouses and farm animals. Ask what the evidence tells us about daily work, and note that most people lived in ordinary farm settlements." },
      { mistake: "Pictures Maiden Castle as a medieval stone castle, or as built by the Romans.", why: "The word 'castle' and the Roman link in stories.", response: "Compare a photo of earth banks with a stone castle. Explain that the name is much later and that the banks were made with earth and timber long before the Romans came." },
      { mistake: "Thinks Iron Age people were backward because they lived before the Romans.", why: "Roman Britain is often presented as when civilisation arrived.", response: "Point to skilled metalwork, planned farming, trade and coins. People before the Romans were highly skilled in different ways." },
    ],
    vocabulary: [
      { term: "hill fort", meaning: "A hilltop settlement or enclosure surrounded by banks and ditches." },
      { term: "rampart", meaning: "A bank of earth built to protect a place." },
      { term: "tribe", meaning: "A group of people with shared leaders, land and customs." },
      { term: "iron", meaning: "A strong metal made by heating iron ore and forging it." },
      { term: "blacksmith", meaning: "A skilled worker who shapes hot iron into tools and weapons." },
      { term: "roundhouse", meaning: "A circular home with a wooden frame and a thatched roof." },
    ],
    before: "In Year 1 pupils notice what old buildings and place names tell us (Old and New Buildings, Clues in Street Names). Earlier in Year 3 they met farming settlements and Bronze Age monuments.",
    next: "Year 4 meets fortified towns called burhs under Alfred the Great and compares defence and kingdoms (Anglo-Saxon Kingdoms). Year 6 asks how landscapes and buildings show history (Buildings and Streets as Evidence).",
  },

  "from-stone-to-iron": {
    statutory: [STONE_TO_IRON],
    inBrief: "Over thousands of years, new materials and ways of living appeared in Britain, while farming, family life and the need for food and shelter continued. This topic brings the whole period together and practises seeing change and continuity.",
    keyFacts: [
      "The Stone Age, Bronze Age and Iron Age are modern labels based on the main tool material. People did not know they were in one. Periods overlapped and stone tools were used long after bronze and iron appeared.",
      "Rough British dates: Stone Age to about 2500 BC, Bronze Age to about 800 BC, Iron Age to AD 43. The bands on the app's timeline are not equal lengths: the Stone Age is by far the longest.",
      "Change: new materials, farming, settled villages, large monuments, hill forts and growing trade. Continuity: farming, family life, the need for food and shelter, and the use of earlier tools alongside new ones.",
      "Change was slow and uneven. Some places and groups adopted new ways earlier than others, and nobody changed overnight.",
      "Boundary: the order of the three ages, simple change and continuity, and one or two examples of each. Exact start dates and sub-periods are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks each age began on one day everywhere and the old material vanished.", why: "Timelines show tidy blocks with sharp edges.", response: "Show tools from two materials together in a mixed hoard picture. Ask pupils to describe who might still use stone tools and why." },
      { mistake: "Says nothing stayed the same, or that people before the Romans were all alike.", why: "Pupils focus on novelty and treat long periods as one.", response: "List what people always needed (food, shelter, clothing) and then what changed. Ask for an example from each period." },
      { mistake: "Thinks Bronze Age people had no stone tools and Iron Age people had no bronze.", why: "The ages' names suggest the materials stand alone.", response: "Use the app's idea that a new material joined older ones, and bronze stayed in use for decoration." },
    ],
    vocabulary: [
      { term: "change", meaning: "Something that became different over time." },
      { term: "continuity", meaning: "Something that stayed the same or carried on." },
      { term: "period", meaning: "A stretch of time historians group together, such as the Bronze Age." },
      { term: "technology", meaning: "The tools and methods people use to make or do things." },
      { term: "trade", meaning: "Swapping or selling goods between people or places." },
      { term: "timeline", meaning: "A line showing events or periods in the order they happened." },
    ],
    before: "In Years 1 and 2 pupils describe change within living memory (Toys, Homes and School Then and Now; Getting About Then and Now). This is their first use of change and continuity over thousands of years.",
    next: "Year 4 uses change and continuity to compare Romans, Anglo-Saxons and Vikings in From Romans to 1066. Year 5 places Britain on One Long Timeline, and Year 6 teaches fast and slow change in Change and Continuity.",
  },

  // ---------------------------------------------------------------- Roman Britain
  "the-roman-empire-and-its-army": {
    statutory: [ROMANS],
    inBrief: "Rome began as a city in Italy and grew into an empire ruling many lands and peoples. A trained, disciplined army was the foundation of Roman power and the way it spread.",
    keyFacts: [
      "An empire is a state that rules over many lands and peoples. By AD 42, under the emperor Claudius, Rome's empire ringed the Mediterranean Sea and included Egypt and Gaul. Britain was not yet included.",
      "The Roman army was made up of legions of about 5,000 Roman citizens, split into smaller units. A century was about 80 men led by a centurion. Soldiers served about 25 years and trained, marched and fought as a team.",
      "Auxiliaries were non-citizen soldiers recruited from across the empire, who could earn citizenship. So the army that reached Britain was multicultural, and many soldiers were not from Italy.",
      "Roman expansion meant conquest. Conquered people often lost land and freedom and some were enslaved. Roads, forts and supply made the army effective, though it did not always win.",
      "Boundary: the idea of empire, where it stood by AD 42 and how the army worked. The republic and its collapse, named battles and the empire's later decline are not required.",
    ],
    misconceptions: [
      { mistake: "Thinks all Roman soldiers came from Rome or Italy.", why: "'Roman' suggests 'from Rome'.", response: "Use a map of the empire and show where legions and auxiliaries were raised. Ask what a Roman identity meant for people from Gaul, Syria or Spain." },
      { mistake: "Believes the Roman army never lost.", why: "Stories dwell on successes and conquest.", response: "Share a defeat, such as the loss of three legions in Germany in AD 9, and Caesar's difficulties in Britain. Strong armies still lose." },
      { mistake: "Thinks the empire was a kind, peaceful helper that brought roads and baths.", why: "Lessons often focus on technology.", response: "Hold both ideas: Roman rule brought roads and towns, and it was won by force, with taxes, lost freedom and slavery." },
    ],
    vocabulary: [
      { term: "empire", meaning: "A large state that rules many lands and peoples." },
      { term: "legion", meaning: "A large group of about 5,000 Roman citizen soldiers." },
      { term: "auxiliary", meaning: "A soldier from the provinces who was not a citizen when he joined and fought alongside the legions." },
      { term: "emperor", meaning: "The ruler of the Roman Empire." },
      { term: "conquer", meaning: "Take control of a place and its people by force." },
      { term: "province", meaning: "A part of the empire ruled by Rome through a governor." },
    ],
    before: "In Year 1 pupils learn that explorers sailed to places where people already lived and that those people were treated very unfairly (Christopher Columbus). Empires and armies are new ideas in Year 3.",
    next: "Year 4 studies the end of Roman Britain and the fall of the western empire (When the Romans Left Britain). Year 5 studies Alexander the Great's empire and a contested legacy, and Greeks and Persians.",
  },

  "julius-caesar-tries-to-invade": {
    statutory: [ROMANS],
    inBrief: "Julius Caesar led two expeditions to Britain, in 55 BC and 54 BC. Britons resisted, and he left without making Britain part of the Roman Empire, so these were not conquests.",
    keyFacts: [
      "Caesar was a Roman general who conquered Gaul (modern France) between 58 and 50 BC. He crossed the sea to Britain in 55 BC with two legions and again in 54 BC with a larger force. He was never an emperor.",
      "Reasons given or suggested include stopping help for his enemies in Gaul, finding out about Britain, and winning fame in Rome. In 54 BC he defeated a British leader, Cassivellaunus, took hostages and a promise of tribute, then left. Caesar describes these as victories.",
      "Our main source is Caesar's own account, written for Romans at home. It is a source with a viewpoint, so it may stress his successes and say less about problems such as storm damage to ships.",
      "BC dates count down, so 55 BC came before 54 BC. Claudius's invasion in AD 43 came about 97 years after the first expedition.",
      "Boundary: two expeditions, resistance and the lack of lasting Roman rule. Battle details and Gaul's wider story are not required.",
    ],
    misconceptions: [
      { mistake: "Says 54 BC came before 55 BC.", why: "Larger numbers usually mean later.", response: "Use a number line where BC counts down to year 1. Ask pupils to say 'earlier' or 'later' for each pair of dates." },
      { mistake: "Thinks Caesar conquered Britain or ruled it as emperor.", why: "He is the best-known Roman, so he is linked with everything Roman.", response: "State plainly that he left, and that Britain became a Roman province about 100 years later under Claudius." },
      { mistake: "Mixes up Julius Caesar and Claudius.", why: "Both are Roman leaders with invasion stories and similar names.", response: "Give each a date and a one-line label: Caesar, 55 and 54 BC, visitor who left; Claudius, AD 43, began Roman rule." },
    ],
    vocabulary: [
      { term: "expedition", meaning: "A journey made for a purpose, such as exploring or fighting." },
      { term: "general", meaning: "A leader of an army." },
      { term: "Gaul", meaning: "The Roman name for the land that is now mostly France." },
      { term: "resist", meaning: "Fight back or refuse to give way." },
      { term: "province", meaning: "A part of the empire ruled by Rome." },
      { term: "source", meaning: "Something that gives information about the past, such as a book or an object." },
    ],
    before: "In Year 1 pupils meet sailors travelling to unfamiliar lands (Christopher Columbus). In Year 2 they compare different clues about one event (How We Know About the Great Fire).",
    next: "Year 4 returns to the Romans' departure (When the Romans Left Britain). Year 5 studies accounts with a viewpoint in Greeks and Persians and in Sources and Interpretations.",
  },

  "claudius-conquers-britain": {
    statutory: [ROMANS],
    inBrief: "In AD 43 the Roman emperor Claudius sent a large army to Britain. This time the Romans stayed, creating the province of Britannia, and conquest continued for decades.",
    keyFacts: [
      "Claudius had been emperor for about two years and needed a military success. Britain offered prestige, metals, farmland and people to enslave. A British king, Verica, had also asked Rome for help.",
      "A force of tens of thousands of men, commanded by Aulus Plautius, landed in Kent and defeated British forces. Claudius himself came briefly to take part in the entry to Camulodunum (Colchester).",
      "Britannia became a province. The south-east fell quickly but conquest of Wales and the north took many years, and Scotland was never held. Some British rulers co-operated with Rome and others resisted, such as Caratacus.",
      "Roman rule brought taxes, soldiers, new towns and roads, and lost land and freedom for many Britons. Some people were enslaved.",
      "Boundary: why Claudius invaded, the AD 43 date, the province of Britannia, and that conquest was gradual and unequal. Names of legions and commanders are not required.",
    ],
    misconceptions: [
      { mistake: "Thinks the Romans conquered all of Britain in AD 43.", why: "'Invasion in AD 43' sounds like one event.", response: "Mark AD 43 as the start. Add Boudica (about AD 60–61) and Hadrian's Wall (AD 122), and show that Scotland was never fully held." },
      { mistake: "Thinks every Briton fought the Romans.", why: "Resistance stories are more dramatic.", response: "Use examples of both: some leaders made agreements for power or safety, others fought. Ask why people made different choices." },
      { mistake: "Mixes up Julius Caesar's visits and Claudius's conquest.", why: "Both involve crossing the sea.", response: "Use a timeline: Caesar in 55 and 54 BC, nearly 100 years earlier, left; Claudius in AD 43, stayed." },
    ],
    vocabulary: [
      { term: "invasion", meaning: "Entering a place with an army to take control." },
      { term: "conquest", meaning: "Taking over a place and its people by force." },
      { term: "emperor", meaning: "The ruler of the Roman Empire." },
      { term: "Britannia", meaning: "The Roman name for their province in Britain." },
      { term: "province", meaning: "A part of the empire ruled by Rome through a governor." },
      { term: "tax", meaning: "Money or goods people must pay to those who rule them." },
    ],
    before: "In Year 1 pupils meet the idea that arriving in a land where people already live can harm them (Christopher Columbus). In Year 1 and 2 they also compare life across periods.",
    next: "Year 4 follows what happened when the Romans left (When the Romans Left Britain) and meets another arrival (Anglo-Saxon Settlers, The Great Viking Invasion). Year 5 compares conquest and its legacy in Alexander the Great.",
  },

  "boudica-fights-back": {
    statutory: [ROMANS],
    inBrief: "Boudica, queen of the Iceni, led a revolt against Roman rule in about AD 60–61. Several British peoples joined her and destroyed Roman towns, but the Romans defeated her army. We know of it mainly through Roman writers.",
    keyFacts: [
      "Boudica's husband, Prasutagus, ruled the Iceni of East Anglia as Rome's ally. When he died, Rome ignored his will and took Iceni land. Roman writers say Boudica and her daughters were treated brutally, and that anger at this and at taxes and debts fuelled revolt.",
      "While the Roman governor was away in Wales, Boudica's forces, joined by the Trinovantes, destroyed Camulodunum (Colchester), Londinium (London) and Verulamium (St Albans). A layer of burnt material in the ground at these sites supports the written accounts.",
      "The Romans defeated her army in a battle whose site is unknown. How she died is uncertain: one Roman writer says poison and another illness. Roman writers give very large numbers killed that are probably exaggerated. Civilians, British and Roman, were killed in the revolt and its aftermath.",
      "The main sources are Tacitus and Cassius Dio, who were Romans (Dio wrote about 150 years later). No British account survives, and the speeches and descriptions of her were written by others. Her name appears as Boadicea in older books.",
      "Boundary: who she was, why she rebelled, what happened and that the sources are Roman. Battle details and names of other leaders are not required.",
    ],
    misconceptions: [
      { mistake: "Thinks Boudica won, or that the Britons drove the Romans out.", why: "She is celebrated as a heroine, so pupils assume victory.", response: "Say plainly that the Romans won and stayed for about 350 more years. Ask why people still remember her." },
      { mistake: "Imagines her in a chariot with scythed wheels.", why: "A famous Victorian statue shows this. Roman writers do not describe scythed wheels.", response: "Ask 'What did the Romans write? What did a later artist add?' This is a good first interpretation lesson." },
      { mistake: "Thinks she ruled all Britain.", why: "She is a well-known name.", response: "Use a map: she led the Iceni of East Anglia, with the Trinovantes. Other peoples did not all join her." },
    ],
    vocabulary: [
      { term: "revolt", meaning: "A fight by people against the rulers who control them." },
      { term: "Iceni", meaning: "The British people who lived in what is now Norfolk and Suffolk." },
      { term: "queen", meaning: "A woman who rules, or the wife of a king." },
      { term: "resistance", meaning: "Fighting back against a force that has taken control." },
      { term: "viewpoint", meaning: "The way one person or group sees events, which affects what they write." },
      { term: "evidence", meaning: "A clue we use to work out and support an idea about the past." },
    ],
    before: "In Year 2 pupils learn about people who challenged unfair rules (Rosa Parks, Emily Davison and Votes for Women). Boudica's revolt differs because it involved fighting, which should be said soberly.",
    next: "Year 4 meets resistance and viewpoint in Alfred the Great and in The Raid on Lindisfarne (Alcuin's account). Year 5 uses Herodotus and Greeks and Persians, and Year 6 asks Who and What Mattered? and whose story is missing.",
  },

  "hadrians-wall": {
    statutory: [ROMANS],
    inBrief: "Hadrian's Wall was a stone frontier built across northern Britain from AD 122. It marked the edge of Roman control and was a base for soldiers, trade and daily life, and parts of it still stand.",
    keyFacts: [
      "Emperor Hadrian visited Britain in AD 122 and ordered the wall. It runs about 73 miles from the River Tyne in the east to the Solway Firth in the west, and was built by Roman soldiers.",
      "Along the wall were forts for soldiers, small fortlets called milecastles with gates, and turrets between them. Gates controlled who crossed, which helped to guard the frontier and to collect taxes.",
      "Soldiers manned it from many parts of the empire. Writing tablets from nearby Vindolanda include letters about everyday matters, such as a birthday party invitation, so life on the frontier was not just fighting.",
      "The wall is not the modern England and Scotland border, which lies further north for most of its length. Its exact purpose is debated: defence, control of movement, taxation and a display of Roman power have all been suggested.",
      "Boundary: the wall as frontier, who built and manned it, and what its remains tell us. The Antonine Wall and details of each fort are not required.",
    ],
    misconceptions: [
      { mistake: "Thinks the wall marks the border between England and Scotland.", why: "It runs across the north and is often described as a border.", response: "Find the wall and the modern border on a map. For most of its length the border lies well to the north of the wall." },
      { mistake: "Thinks enslaved people built the wall.", why: "Slavery is linked with big building projects.", response: "Say soldiers did most of the construction, and that building stones carry the names of the units that built sections." },
      { mistake: "Pictures constant battles along the wall.", why: "Walls suggest fighting.", response: "Use the evidence of trade, letters and daily work. Ask pupils what a fort needed each day: food, water, clothing and repair." },
    ],
    vocabulary: [
      { term: "frontier", meaning: "The edge of an area controlled by a ruler or state." },
      { term: "fort", meaning: "A strong building or enclosure where soldiers lived." },
      { term: "milecastle", meaning: "A small fort with a gate, built about every Roman mile along the wall." },
      { term: "garrison", meaning: "The soldiers stationed in a fort." },
      { term: "ruin", meaning: "What remains of a building that has fallen down." },
      { term: "emperor", meaning: "The ruler of the Roman Empire." },
    ],
    before: "In Years 1 and 2 pupils read old buildings, plaques, maps and photos for clues (Old and New Buildings, Memorials and Blue Plaques, Old Maps and Photos).",
    next: "Year 4 studies kingdoms, boundaries and power (Anglo-Saxon Kingdoms) and the arrival of the Scots (The Scots Come from Ireland). Year 6 compares old and new maps in Maps Through Time.",
  },

  "roman-towns-roads-and-baths": {
    statutory: [ROMANS],
    inBrief: "Romans built straight roads and planned towns with markets, public buildings and bathhouses. These new ways of building and living changed some lives, especially in towns, while most people still worked the land.",
    keyFacts: [
      "Roman roads were built by soldiers with layered stone, a raised centre and side ditches. They were straight where possible, and many modern roads, such as parts of the A5 and the A1, follow Roman routes.",
      "Roman towns were planned on a grid of streets with a forum (market place), a town hall (basilica), temples and baths. Caerwent, in Wales, began in the late first century AD as the town of the Silures, a British tribe.",
      "Public baths were places to wash, exercise, meet and do business. A system called a hypocaust sent hot air under floors and through walls to heat rooms. Rich homes could have heated floors and mosaics, but most people did not.",
      "Most people in Roman Britain still lived in the countryside, farming. Wealth shaped who could enjoy these comforts.",
      "Boundary: recognising Roman roads, towns and baths and why they mattered. Room names, engineering detail and the idea of 'Romanisation' as a word are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks everyone had heated floors and visited the baths.", why: "Mosaic and hypocaust pictures show the richest homes.", response: "Ask 'Who could afford this?' Contrast a wealthy villa with a farm. Use the fact that most people lived outside towns." },
      { mistake: "Thinks the Romans built the first roads in Britain.", why: "Roman roads are famous and still visible.", response: "Explain that tracks and trackways existed long before, but Romans built long, straight, surfaced roads across the country." },
      { mistake: "Thinks baths were only for washing.", why: "Pupils see them as modern swimming pools or bathrooms.", response: "Describe them as places to meet, relax and talk. Ask which modern places have a similar role." },
    ],
    vocabulary: [
      { term: "forum", meaning: "The open space in a Roman town where people met, traded and held events." },
      { term: "bathhouse", meaning: "A public building where Romans washed, relaxed and met people." },
      { term: "hypocaust", meaning: "A heating system that sent hot air beneath floors." },
      { term: "mosaic", meaning: "A picture or pattern made from many small pieces of stone or tile." },
      { term: "villa", meaning: "A large Roman house, often a farm, belonging to a wealthy person." },
      { term: "grid", meaning: "Streets laid out in straight lines that cross at right angles." },
    ],
    before: "In Year 1 pupils compare homes, heating and washing then and now (Homes Then and Now) and read street names for clues (Clues in Street Names).",
    next: "Year 4 studies what happened to Roman towns after AD 410 (When the Romans Left Britain) and how place names reveal history (Clues in Place Names; -chester and -caster come from Latin through Old English). Year 6 teaches buildings and maps as evidence.",
  },

  "roman-gods-and-early-christianity": {
    statutory: [ROMANS],
    inBrief: "Most people in Roman Britain worshipped many gods, and Romans and Britons often mixed their beliefs. Christianity, belief in one God, began in the Roman Empire and grew slowly in Britain in the later Roman period.",
    keyFacts: [
      "Romans worshipped many gods linked to parts of life: Jupiter (sky and thunder), Mars (war), Minerva (wisdom). They used offerings, vows and prayer at temples, shrines and at home, and often matched Greek gods with their own, such as Zeus and Jupiter.",
      "Roman and British beliefs often blended. At Bath, the local goddess Sulis was joined with Minerva as Sulis Minerva, and people left offerings and messages at the spring.",
      "Christianity began among followers of Jesus in the Roman province of Judaea and spread across the empire. It was sometimes banned, then made legal in AD 313 and later the official religion. In Britain, the Lullingstone villa in Kent has a Christian worship room from the 4th century AD.",
      "Christianity in Britain did not begin with Augustine in AD 597. It existed in Roman Britain, though most people at the time were not Christian.",
      "Boundary: many gods and one God, simple evidence such as altars, temples and a villa chapel, and respectful description of belief. Doctrine and persecution detail are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks Christianity reached Britain only with the Anglo-Saxon-era missionaries.", why: "Saint Augustine's mission in AD 597 is better known.", response: "Show the Lullingstone evidence on the timeline. Explain that Year 4 covers a later wave of conversion." },
      { mistake: "Says ancient people who worshipped many gods were silly.", why: "Pupils compare ancient beliefs with their own.", response: "Describe what people believed and why, using 'they believed'. Ask what an altar or temple shows about what mattered to them." },
      { mistake: "Thinks Romans replaced British beliefs completely.", why: "Conquest is imagined as total change.", response: "Use Sulis Minerva and the British gods named on altars to show blending, and that beliefs differed between people and places." },
    ],
    vocabulary: [
      { term: "god", meaning: "A being people worship and believe has power over part of life or the world." },
      { term: "altar", meaning: "A table or block of stone where offerings are made." },
      { term: "temple", meaning: "A building for worshipping a god." },
      { term: "Christian", meaning: "A person who follows Jesus and believes in one God." },
      { term: "offering", meaning: "A gift given to a god, such as food, a coin or a carved object." },
      { term: "belief", meaning: "An idea someone holds to be true, especially about gods or the world." },
    ],
    before: "Key Stage 1 history does not teach past beliefs directly. The nearest links are Year 2 customs of remembering, such as Bonfire Night and Remembrance Day, where pupils see how traditions mark events.",
    next: "Year 4 follows the Christian conversion through Canterbury, Iona and Lindisfarne (Saints and Monasteries). Year 5 studies Greek gods and myths and Maya gods, using objects and writing as evidence of belief.",
  },

  "how-the-romans-changed-britain": {
    statutory: [ROMANS],
    inBrief: "Roman rule brought roads, towns, coins, Latin and new buildings, but daily life for many people continued as before, and conquest brought taxes and lost freedom. Historians judge impact by comparing what changed with what lasted.",
    keyFacts: [
      "Changes: roads and towns, coined money, brick, tile and concrete, Latin writing, new foods and goods, taxes and Roman law. Our alphabet comes from Latin letters, and words such as street and wall come from Latin.",
      "Continuity: farming, roundhouses and villages in many places, British languages and beliefs. People adopted what suited them, and the south-east changed more than the north and west.",
      "Roman rule had costs as well as benefits. Britons paid taxes, lost land and many were killed or enslaved in the conquest. Wealth shaped who gained.",
      "Some Roman remains are still visible, including road routes, Hadrian's Wall, baths and mosaics. After about AD 410 Roman rule ended and many towns and trades declined, but people did not vanish.",
      "Boundary: change and continuity in the Roman period, and some lasting traces. Judging whether Roman rule was good or bad overall is not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks Britain was backward before the Romans and they brought everything.", why: "Roman Britain is often presented as the start of 'civilisation'.", response: "Recall Iron Age farming, metalwork, trade and coins. Compare what was new with what existed before." },
      { mistake: "Thinks everyone's life changed in the same way.", why: "Textbook pictures show towns and villas.", response: "Ask who changed most (townspeople, soldiers, the wealthy) and who changed least (many farmers). Use the words 'some' and 'many'." },
      { mistake: "Says the Romans left in AD 410 and everything disappeared at once.", why: "A single date suggests an overnight break.", response: "Explain that Roman rule ended around AD 410, but people stayed, farming continued and some buildings and roads were used for centuries." },
    ],
    vocabulary: [
      { term: "impact", meaning: "The effect something has on people or places." },
      { term: "change", meaning: "Something that became different over time." },
      { term: "continuity", meaning: "Something that stayed the same or carried on." },
      { term: "Latin", meaning: "The language of the Romans." },
      { term: "legacy", meaning: "Something left behind by people in the past that still affects us." },
      { term: "tax", meaning: "Money or goods people must pay to those who rule them." },
    ],
    before: "In Years 1 and 2 pupils compare life then and now and find what changed and what stayed (Homes Then and Now, Old Maps and Photos).",
    next: "Year 4 asks what happened When the Romans Left Britain and follows change and continuity through From Romans to 1066. Year 5 asks about legacy in Greek Ideas We Still Use, and Year 6 teaches Change and Continuity directly.",
  },

  // ---------------------------------------------------------------- The First Civilisations
  "where-the-first-civilisations-began": {
    statutory: [CIVILISATIONS],
    inBrief: "The first large civilisations grew up beside great rivers: Sumer in Mesopotamia, Egypt on the Nile, the Indus Valley and Shang China. They developed at different times, and often at the same time as Stone Age and Bronze Age Britain.",
    keyFacts: [
      "A civilisation, in this sense, is a large society with cities, rulers, organised government, specialist jobs, trade and often writing. Many other societies also had skills and complex lives but did not build cities in the same way.",
      "Rough dates: Sumer's cities from about 3500 BC; Egypt united under one ruler about 3100 BC; Indus cities at their height from about 2600 BC; Shang rule from about 1600 BC.",
      "Sumer lay between the Tigris and Euphrates in what is now Iraq. Egypt grew along the Nile. The Indus Valley lay mainly in what is now Pakistan and north-west India, and its writing has not been read. Shang China grew around the Yellow River.",
      "Rivers gave water, fertile soil and transport, but floods could also destroy. Skara Brae (about 3200 BC) and Egypt's unification were roughly at the same time, and Stonehenge's big stones and the Giza pyramids both date to about 2500 BC.",
      "Boundary: where and when four civilisations began, and why rivers mattered. Detailed study of Sumer, the Indus Valley and Shang China is not expected, because Egypt is the Year 3 depth study.",
    ],
    misconceptions: [
      { mistake: "Thinks the civilisations followed one another in a line.", why: "Topics are taught one after another.", response: "Draw them on parallel lines on a timeline and add Britain. Point out how many overlap with Stone Age and Bronze Age Britain." },
      { mistake: "Thinks these four are the only early societies, or that people elsewhere were 'uncivilised'.", why: "'First civilisations' sounds like a complete list.", response: "Say these are the four named in the curriculum. Other peoples, including Stone Age Britons, had knowledge and skills worth studying." },
      { mistake: "Places Egypt in Mesopotamia, or the Nile as one of the Mesopotamian rivers.", why: "Names and places are new.", response: "Use a map with colour-coded regions and rivers, and have pupils match each river to its civilisation." },
    ],
    vocabulary: [
      { term: "civilisation", meaning: "A large society with cities, rulers, organised government, specialist jobs and often writing." },
      { term: "Mesopotamia", meaning: "The land between the Tigris and Euphrates rivers, where Sumer was." },
      { term: "city", meaning: "A large settlement with many people, buildings and different jobs." },
      { term: "irrigation", meaning: "Bringing water to fields through channels." },
      { term: "specialist", meaning: "A person who does one skilled job, such as a potter or scribe." },
      { term: "BC", meaning: "Before year 1; years count down towards it." },
    ],
    before: "Key Stage 1 history does not teach ancient civilisations. Pupils have met world events such as the first aeroplane flight and Neil Armstrong, and earlier in Year 3 they studied Britain's Stone Age to Iron Age.",
    next: "Year 5 deepens this with Ancient Greece (Where Ancient Greece Was) and the Maya, and practises ordering parallel histories in One Long Timeline and Comparing Past Societies.",
  },

  "what-the-first-civilisations-gave-us": {
    statutory: [CIVILISATIONS],
    inBrief: "Farming surpluses allowed cities and specialist workers, and early civilisations developed writing, wheeled transport, laws and skilled crafts. Many of these ideas were improved over time and still affect us.",
    keyFacts: [
      "Farmers who grew more than they needed fed people who did other jobs, such as builders, potters, scribes and priests. This is why cities could grow.",
      "Sumerian cuneiform, wedge-shaped marks pressed into clay, began about 3300 BC as a way to record goods and tax, before it was used for stories. Egyptian hieroglyphs also appeared around then. They are among the earliest writing systems.",
      "Wheeled vehicles appear in Mesopotamia and elsewhere around 3500 BC. Where the wheel was first invented is not certain. Rulers also wrote laws down, such as the Code of Ur-Nammu (about 2100 BC) and Hammurabi's laws (about 1750 BC).",
      "Other achievements: planned cities and drains in the Indus Valley, bronze casting in Shang China, and Egyptian and Mesopotamian mathematics. Ideas spread and were improved by many people, so no single place 'gave' everything.",
      "Boundary: an overview of some early achievements and why they mattered. Detailed study of each civilisation is not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks one civilisation invented everything.", why: "Books name a few well-known examples.", response: "Make a table of achievements by civilisation. Add that ideas often developed in several places and were shared by trade." },
      { mistake: "Believes writing was first used to write stories.", why: "Pupils know writing from books.", response: "Show a cuneiform tablet that lists goods. Ask why keeping records would matter in a growing city." },
      { mistake: "Thinks a law means everyone obeyed it.", why: "Written rules look certain.", response: "Remind pupils that laws show what rulers wanted, not what everyone did. Compare with school rules." },
    ],
    vocabulary: [
      { term: "surplus", meaning: "More food than people need to eat straight away." },
      { term: "cuneiform", meaning: "Wedge-shaped writing pressed into clay in ancient Mesopotamia." },
      { term: "hieroglyphs", meaning: "Egyptian writing using picture signs for sounds and ideas." },
      { term: "scribe", meaning: "A trained writer who kept records." },
      { term: "law", meaning: "A rule made by a ruler or government that people must follow." },
      { term: "invention", meaning: "A new tool, idea or way of doing something." },
    ],
    before: "In Year 2 pupils compare William Caxton's printing with Tim Berners-Lee's World Wide Web, as ways of sharing information. They meet writing as a tool for spreading ideas.",
    next: "Year 5 meets Maya writing and numbers (Maya Writing and Books, Maya Numbers and the Calendar) and Greek ideas we still use. Year 6 studies law over time in Law and Order Before 1066.",
  },

  "the-river-nile": {
    statutory: [CIVILISATIONS],
    inBrief: "Egyptian civilisation depended on the Nile. Each year its flood left rich soil in a narrow green strip beside the desert, so farmers could grow food for the whole country, and boats carried people and goods.",
    keyFacts: [
      "The Nile flows north through Egypt to the Mediterranean Sea. Rain far to the south caused an annual flood from about June to September. Farmland lay in a narrow green strip beside the river, with desert beyond.",
      "The flood left silt, so farmers sowed after the water went down and harvested grain, such as wheat and barley, before the next flood. Egyptians dug canals and used simple tools to move water to fields.",
      "River boats carried people, grain and huge stone blocks. Boats could drift north with the current and sail south with the prevailing wind. Egyptians measured the flood to guess the harvest and set taxes.",
      "Too little flood meant poor harvests and hunger, and too much could damage homes and fields. Since the Aswan High Dam was completed in 1970, the Nile no longer floods in the same way.",
      "Boundary: the flood and farming cycle and why the Nile mattered. Names of the three seasons and the Nile's source are not required.",
    ],
    misconceptions: [
      { mistake: "Thinks floods were always bad for Egyptians.", why: "Floods usually mean disaster in the news.", response: "Explain that the annual flood was expected and welcome because it made the soil fertile. Only unusually high or low floods caused trouble." },
      { mistake: "Thinks Egypt was all desert.", why: "Pictures often show pyramids in sand.", response: "Show a satellite image of the narrow green strip along the Nile. Ask where people lived and why." },
      { mistake: "Says the Nile flows south because south is 'down' the map.", why: "Many rivers seem to flow down a page.", response: "Trace the river on a map to the Mediterranean in the north. Mention that Upper Egypt is in the south because it is upstream." },
    ],
    vocabulary: [
      { term: "flood", meaning: "When a river rises and covers the land beside it." },
      { term: "silt", meaning: "Fine, fertile soil left behind by flood water." },
      { term: "harvest", meaning: "Gathering ripe crops from the fields." },
      { term: "canal", meaning: "A channel dug to carry water." },
      { term: "delta", meaning: "Where a river splits into streams as it reaches the sea." },
      { term: "desert", meaning: "A dry land with very little rain." },
    ],
    before: "Key Stage 1 history does not cover ancient Egypt or rivers. Earlier in Year 3 pupils met farming (The First Farmers and Skara Brae) and the idea that rivers helped the first civilisations.",
    next: "Year 5 studies how geography shapes Greek city-states and Maya lands (Where Ancient Greece Was, Where the Maya Lived) and Maya farming. Pupils compare how different places support farming.",
  },

  "pharaohs-and-pyramids": {
    statutory: [CIVILISATIONS],
    inBrief: "Pharaohs were Egypt's rulers, thought to be linked with the gods. The great pyramids at Giza were royal tombs built about 4,500 years ago by skilled, organised workers, and they show how much power a pharaoh had.",
    keyFacts: [
      "Egypt was united under one ruler about 3100 BC. Pharaohs were seen as links between gods and people. Most were men, but some women ruled, such as Hatshepsut.",
      "The Great Pyramid at Giza was built for Khufu about 4,500 years ago. It is the last surviving of the ancient Seven Wonders. The Giza pyramids are much older than Tutankhamun, who lived about 1,200 years later and was buried in a rock tomb, not a pyramid.",
      "Pyramids were tombs linked with beliefs about the afterlife. Archaeologists found a town for workers near Giza, with bakeries and cemeteries, which suggests paid, fed and respected teams, not only enslaved people. How exactly the blocks were raised is still debated.",
      "Greek writers, about 2,000 years later, said slaves built the pyramids, but archaeology has changed that picture.",
      "Boundary: what a pharaoh was, why pyramids were built, and the evidence for who built them. Dynasties, kingdom names and construction theories are not expected.",
    ],
    misconceptions: [
      { mistake: "Believes slaves built the pyramids.", why: "Films and old accounts say so.", response: "Share the evidence from workers' villages, tombs and records. Explain that most workers were Egyptians organised in teams, though not all questions are settled." },
      { mistake: "Thinks Tutankhamun was buried in a pyramid or lived when they were built.", why: "Pharaoh, pyramid and Egypt blur together.", response: "Put the Great Pyramid (about 2500 BC) and Tutankhamun (about 1330 BC) on a timeline." },
      { mistake: "Thinks all pharaohs were men.", why: "Most pictures show kings.", response: "Name Hatshepsut as a female pharaoh and ask why a statue might show her with royal symbols." },
    ],
    vocabulary: [
      { term: "pharaoh", meaning: "A ruler of ancient Egypt." },
      { term: "pyramid", meaning: "A huge stone tomb with sloping sides built for some pharaohs." },
      { term: "tomb", meaning: "A burial place." },
      { term: "afterlife", meaning: "A life that people believe comes after death." },
      { term: "quarry", meaning: "A place where stone is cut from the ground." },
      { term: "dynasty", meaning: "A line of rulers from the same family." },
    ],
    before: "In Year 1 pupils learn about rulers and how portraits show them (Queen Elizabeth I, Queen Victoria, Two Queens Long Ago). Pharaohs are the first rulers they meet from the ancient world.",
    next: "Year 4 studies royal power in Athelstan First King of England. Year 5 studies building to show power and belief (The Parthenon and Greek Temples) and Maya pyramids at Chichen Itza.",
  },

  "hieroglyphs": {
    statutory: [CIVILISATIONS],
    inBrief: "Hieroglyphs were the Egyptians' formal writing, used on stone and papyrus. Their meaning was lost for centuries until the Rosetta Stone, which carries the same text in three scripts, helped scholars read them again.",
    keyFacts: [
      "Hieroglyphs are not simple picture-writing. Some signs stand for sounds, some for whole words or ideas, and some show what kind of word it is. They can be written in rows or columns.",
      "Scribes were trained writers. Only a small share of people could read and write. Scribes wrote on papyrus, made from a river plant, and carved signs into walls and monuments. Royal names were often put inside an oval called a cartouche.",
      "The Rosetta Stone, found in 1799, carries a royal decree from 196 BC in hieroglyphs, a simpler Egyptian script and Greek. Scholars could read the Greek, and Jean-François Champollion announced in 1822 that he had worked out how the signs work.",
      "The stone has been in the British Museum since 1802, and Egypt has asked for it to be returned, which is an ongoing discussion.",
      "Boundary: what hieroglyphs are, why scribes mattered and how the Rosetta Stone helped. Reading grammar and the other scripts are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks each hieroglyph is just a picture of what it shows.", why: "The signs look like drawings.", response: "Show that a bird sign can stand for a sound. Have pupils spell a name in sound signs and note that this is an approximation." },
      { mistake: "Thinks everyone in ancient Egypt could read.", why: "Pupils assume literacy is universal.", response: "Explain that scribes were trained for years, and ask who might need a scribe to write for them." },
      { mistake: "Thinks the Rosetta Stone was a dictionary or a secret code.", why: "'Decoding' suggests a puzzle.", response: "Describe it as an ordinary official text written in three scripts. Because scholars could read one, they could compare the others." },
    ],
    vocabulary: [
      { term: "hieroglyphs", meaning: "Egyptian writing using signs for sounds, words and ideas." },
      { term: "scribe", meaning: "A trained writer who kept records." },
      { term: "papyrus", meaning: "A paper-like material made from a river plant." },
      { term: "cartouche", meaning: "An oval frame around a royal name in hieroglyphs." },
      { term: "decipher", meaning: "Work out the meaning of writing that nobody can read." },
      { term: "script", meaning: "A system of written signs." },
    ],
    before: "In Year 2 pupils compare printing with the World Wide Web (William Caxton and Tim Berners-Lee), seeing how writing and technology change how people share information.",
    next: "Year 5 meets another script that was long unreadable in Maya Writing and Books, and Year 5 Sources and Interpretations asks how new evidence changes what we know.",
  },

  "egyptian-gods-and-mummies": {
    statutory: [CIVILISATIONS],
    inBrief: "Ancient Egyptians worshipped many gods and believed life continued after death. Mummification and rich burials were part of those beliefs, and the objects they left are evidence of what people believed.",
    keyFacts: [
      "Egyptians worshipped many gods, often shown with animal features that stood for qualities. Ra was linked with the sun, Osiris with the afterlife, and Anubis with embalming. Temples were seen as homes for gods, and ordinary people used home shrines and festivals.",
      "Many believed the body needed to be preserved for the afterlife. In mummification, specialists removed organs, dried the body with natron salt for about 40 days, and wrapped it in linen, taking about 70 days in all.",
      "Burials were richer for the wealthy and simpler for most people. Coffins, tomb paintings and funeral texts such as the Book of the Dead are our main evidence. Practices changed over the thousands of years of Egyptian history.",
      "Mummies are the remains of real people and are shown with respect. Films' ideas of a mummy's curse are fiction.",
      "Boundary: beliefs about gods and the afterlife, the main steps of mummification and the evidence for it. Lists of gods and organ details are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks mummies were cursed.", why: "Horror films use the idea.", response: "Say the curse is a modern story. Egyptologists study mummies using scans and records." },
      { mistake: "Thinks everyone in Egypt was mummified in a grand tomb.", why: "Museum collections show the richest burials.", response: "Ask 'Who could afford this?' Say poorer people were buried simply, often in the sand." },
      { mistake: "Says Egyptians worshipped animals or made up silly gods.", why: "Animal-headed gods look strange to pupils.", response: "Explain that animal features stood for qualities such as protection. Use 'they believed' and respect for people's beliefs." },
    ],
    vocabulary: [
      { term: "mummy", meaning: "A body preserved so it lasts, often wrapped in linen." },
      { term: "afterlife", meaning: "A life that people believe comes after death." },
      { term: "embalm", meaning: "Treat a body so it does not rot." },
      { term: "coffin", meaning: "A box that holds a body for burial." },
      { term: "natron", meaning: "A natural salt used to dry out bodies." },
      { term: "god", meaning: "A being people worship and believe has power over part of life or the world." },
    ],
    before: "In Year 2 pupils learn how poppies and a silence help people remember (Remembrance Day), their first view of how people honour the dead. Earlier in Year 3 they met Roman gods.",
    next: "Year 5 studies Greek gods and myths and Maya gods and rituals, stated soberly (Maya Gods and the Ball Game). Year 4 follows Christian saints and monasteries.",
  },

  "everyday-life-in-ancient-egypt": {
    statutory: [CIVILISATIONS],
    inBrief: "Most Egyptians were farmers who lived in mud-brick homes, ate bread and drank beer, and wore linen. Wealth shaped homes, food and chances, and tomb scenes show a chosen view of daily life.",
    keyFacts: [
      "Most Egyptians farmed. Others were craftworkers, builders, soldiers, priests and scribes. The pharaoh and the rich lived very differently from ordinary families.",
      "Homes were usually of mud brick with flat roofs. Bread and beer were everyday foods, along with onions, lentils, fish and fruit such as dates. Linen came from the flax plant.",
      "Children learnt by helping their families. Some boys trained as scribes. Women had notable legal rights for the time: they could own property and run businesses. People played board games such as senet, and children had toys.",
      "Our evidence includes tomb paintings, which often show an ideal view, plus tools, food remains, houses and writing such as records from the workers' village at Deir el-Medina.",
      "Boundary: homes, work, food, clothing and play, with a sense that life varied by wealth and time. Social ranks and kingdom periods are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks all Egyptians were rich or lived like pharaohs.", why: "Pupils see gold and tombs in museums.", response: "Compare a pharaoh's tomb with a farmer's mud-brick home. Ask what survives and why." },
      { mistake: "Reads a tomb painting as an exact photograph of daily life.", why: "Pictures look realistic.", response: "Ask who made it and why. Tomb scenes were made to show a good life continuing after death, so they show selected, ideal scenes." },
      { mistake: "Thinks Egyptian children only worked and never played.", why: "Pupils assume the past was all hardship.", response: "Show evidence of toys and senet, and talk about what children did with their time." },
    ],
    vocabulary: [
      { term: "mud brick", meaning: "A brick made from Nile mud dried in the sun." },
      { term: "flax", meaning: "A plant whose fibres are woven into linen." },
      { term: "linen", meaning: "Cloth woven from flax, worn in hot weather." },
      { term: "senet", meaning: "An ancient Egyptian board game." },
      { term: "craftworker", meaning: "A skilled worker who makes things, such as pots or jewellery." },
      { term: "tomb painting", meaning: "A picture on a tomb wall, often showing work and food." },
    ],
    before: "In Year 1 pupils compare homes, toys and school then and now (Homes, Toys and School Then and Now), so comparing daily life is familiar.",
    next: "Year 4 studies Anglo-Saxon Village Life, and Year 5 Everyday Life in Athens, where vase painting is evidence and enslaved people are discussed. Pupils compare homes, food, school and work across societies.",
  },

  "tutankhamuns-tomb": {
    statutory: [CIVILISATIONS],
    inBrief: "Tutankhamun was a young pharaoh who ruled about 3,300 years ago. His tomb was found in the Valley of the Kings in 1922 and was almost untouched, so its objects and the records made by the excavators give us rich evidence.",
    keyFacts: [
      "Tutankhamun became pharaoh as a child, ruled for about nine years (about 1332 to 1323 BC) and died aged about 18 or 19. How he died is uncertain. He was not a famous king in his own time.",
      "His tomb, called KV62, was found in November 1922 by a team led by Howard Carter, with a large Egyptian workforce, who gave much of the knowledge and labour. Robbers had entered it twice soon after burial, but it survived largely complete.",
      "It held thousands of objects, including furniture, chariots, jewellery, a gold coffin and the famous gold mask. Harry Burton photographed the finds and the team recorded each item before moving it, and the work took about a decade.",
      "The 'curse of the pharaoh' is a newspaper story from the 1920s, and there is no evidence for it. The discovery date (1922) is different from the age of the objects (over 3,000 years).",
      "Boundary: when Tutankhamun lived, how the tomb was found and what the objects show, including the value of careful recording. Politics of his reign and cause of death are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks Tutankhamun lived when the pyramids were built.", why: "Pharaoh, gold and pyramids are linked in pictures.", response: "Place the Giza pyramids (about 2500 BC), Tutankhamun (about 1330 BC) and the 1922 discovery on a timeline." },
      { mistake: "Gives the 1922 discovery date as the time Tutankhamun lived.", why: "Dates in the story are mixed.", response: "Ask two questions each time: when was it made or used, and when was it found?" },
      { mistake: "Believes in the curse, or that Carter alone found everything.", why: "Films and stories repeat the curse and credit a single hero.", response: "Say the curse is a story. Note that Egyptian workers and a large team did the work, and that careful recording matters more than treasure." },
    ],
    vocabulary: [
      { term: "tomb", meaning: "A burial place." },
      { term: "Egyptologist", meaning: "A person who studies ancient Egypt." },
      { term: "excavation", meaning: "A careful dig that uncovers and records what lies in the ground." },
      { term: "artefact", meaning: "An object made or changed by people." },
      { term: "Valley of the Kings", meaning: "A valley in Egypt where many pharaohs were buried in rock-cut tombs." },
      { term: "record", meaning: "A written, drawn or photographed account of what was found and where." },
    ],
    before: "In Years 1 and 2 pupils use photographs and different clues as sources (How We Know About the Great Fire, Old Maps and Photos). Burton's photographs are the same kind of evidence.",
    next: "Year 4 studies another famous burial in Sutton Hoo and Anglo-Saxon Art, including the limits of what finds can tell us. Year 5 teaches Sources and Interpretations and how new evidence changes ideas.",
  },
};
