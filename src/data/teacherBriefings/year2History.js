/**
 * Teacher subject-knowledge briefings for Year 2 History, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the key stage 1 programme of
 * study in docs/curriculum/key-stage-1-history.md (the PDF text), using the
 * requirement that the topic's row in the "Year 2" topic table names. Never
 * paraphrase or alter it: a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Year 1 prior learning and the Year 3+ destination
 *
 * Dates follow the app: BC and AD, "about" where sources differ.
 */
const LIVING_MEMORY = "changes within living memory";
const BEYOND_MEMORY = "events beyond living memory that are significant nationally or globally";
const INDIVIDUALS =
  "the lives of significant individuals in the past who have contributed to national and international achievements";
const COMPARE = "Some should be used to compare aspects of life in different periods";
const LOCALITY = "significant historical events, people and places in their own locality";

export const YEAR2_HISTORY_BRIEFINGS = {
  // ---------------------------------------------------------------- Changes Within Living Memory
  "keeping-in-touch-then-and-now": {
    statutory: [LIVING_MEMORY],
    inBrief: "People have always needed ways to keep in touch, and the ways have changed within the memory of grandparents. Older ways such as letters did not vanish when new ones arrived.",
    keyFacts: [
      "Living memory means what people who are alive can remember or have been told by them. For pupils this is usually their grandparents' childhood, about 50 to 70 years ago.",
      "Letters travelled by post, and a stamped letter has been possible in Britain since the Penny Post of 1840. Landline telephones are fixed to a socket or wire in one place; many homes had one by the 1960s and 1970s. Public phone boxes let people call when away from home.",
      "Mobile phones became common in Britain from the 1990s. Video calls need the internet and a screen with a camera.",
      "Old and new ways exist together: many people still write letters and use landlines. Change is usually gradual, not an overnight swap.",
      "Boundary: comparing ways of keeping in touch then and now, with a sense of before and after. Exact invention dates, how telephones work and the history of the internet are not expected.",
    ],
    misconceptions: [
      { mistake: "Grandparents had no way to talk to people far away.", why: "Pupils judge the past by what is missing compared with their own devices.", response: "Ask a grandparent or adult how they kept in touch as a child. List the ways they used (letters, landline, phone box) before listing what they did not have." },
      { mistake: "When something new arrives, the old way stops.", why: "Stories of change often say 'replaced', and pupils picture a single swap date.", response: "Find examples still in use today, such as birthday cards and landlines, and sort ways into 'then only', 'both' and 'now only'." },
      { mistake: "Everyone had the same things at the same time.", why: "Pupils picture one 'old time' with one way of life.", response: "Say that some families had a telephone earlier, some later, and some used a neighbour's or a phone box. Use 'many' and 'some' instead of 'all'." },
    ],
    vocabulary: [
      { term: "living memory", meaning: "What people who are alive now can remember, or have been told by someone who remembers." },
      { term: "landline", meaning: "A telephone joined by wires to a fixed place, such as a home." },
      { term: "mobile phone", meaning: "A phone you can carry and use away from home." },
      { term: "video call", meaning: "A call where people can see each other on a screen as well as hear." },
      { term: "then and now", meaning: "Comparing how things were in the past with how they are today." },
      { term: "source", meaning: "Something that gives us clues about the past, such as an old letter or a memory." },
    ],
    before: "In Year 1 pupils compared toys, homes, school and seaside holidays then and now, and learned that people's memories and old photos are clues to the past.",
    next: "Year 3 moves far beyond living memory to prehistory, using objects as sources. Change over time returns in Year 5 (One Long Timeline) and in Year 6 (Change and Continuity), which separates fast and slow change.",
  },

  "getting-about-then-and-now": {
    statutory: [LIVING_MEMORY],
    inBrief: "Ways of travelling have changed within living memory, but buses, bikes, cars and planes existed in grandparents' time too. Pupils compare journeys then and now and see what changed and what stayed.",
    keyFacts: [
      "Steam trains burned coal to heat water into steam that pushed the engine. Regular steam passenger services on British mainlines ended in 1968, so older people may remember riding them.",
      "Many trains today run on electricity from overhead wires or a third rail, or on diesel engines. Electric cars are becoming more common, but cars of grandparents' time ran on petrol or diesel.",
      "Buses, bicycles, cars and aeroplanes were all used in grandparents' childhood. What has changed is mostly how common, how fast and how powered they are.",
      "Memories and old photographs are sources: a photograph can show smoke above a train but cannot tell us how it sounded or felt to ride.",
      "Boundary: comparing travel then and now with words such as before, after and still. Engine science, dates of inventions and the history of railways before living memory are not expected.",
    ],
    misconceptions: [
      { mistake: "Grandparents travelled only by horse or steam train.", why: "Pupils mix living memory with much older history, and picture books favour steam trains.", response: "Show photographs from the 1950s to 1970s with cars, buses and planes in them. Ask 'Is this within living memory?'" },
      { mistake: "Steam trains are all in the past.", why: "The word 'then' suggests that something has gone completely.", response: "Say that heritage railways run steam trains today for visitors, but they are no longer the usual way to travel." },
      { mistake: "Electric trains and cars are brand new inventions.", why: "News talks about them as new, so pupils assume they have no past.", response: "Explain that electric trains have run for a long time and that electric cars are now becoming more common. Use 'more common', not 'invented'." },
    ],
    vocabulary: [
      { term: "steam train", meaning: "A train driven by steam made by burning fuel to heat water." },
      { term: "electric train", meaning: "A train that runs on electricity." },
      { term: "journey", meaning: "A trip from one place to another." },
      { term: "living memory", meaning: "What people alive today can remember." },
      { term: "transport", meaning: "Ways of carrying people and things from place to place." },
      { term: "common", meaning: "Seen or used by many people." },
    ],
    before: "In Year 1 pupils compared explorers' ships and rockets, and the Wright Brothers' first aeroplane with planes today (Explorers Then and Now, Flying Then and Now).",
    next: "Year 3 meets Roman roads (Roman Towns, Roads and Baths) and Year 6 meets travel by transportation ship and the police (Transportation to Australia, Peel's Police). Year 5 One Long Timeline places many events on one line.",
  },

  // ---------------------------------------------------------------- The Great Fire of London
  "london-in-1666": {
    statutory: [BEYOND_MEMORY],
    inBrief: "London in 1666 was a crowded city of timber houses on narrow streets, with only simple ways to fight fires. Knowing the setting explains why the Great Fire was so destructive.",
    keyFacts: [
      "The old walled City of London had many timber-framed houses, often with upper floors jutting out over narrow streets, so neighbours' windows nearly touched. Wood, thatch and pitch (a tar used to seal timber and boats) all burn easily.",
      "Fire-fighting used leather buckets, long hooks to pull down burning buildings and hand pumps called squirts. There was no organised fire brigade and no modern fire engine with hoses.",
      "Brick and stone buildings were already used for grand places, such as churches, but most ordinary homes were timber. The summer of 1666 was unusually hot and dry.",
      "1666 is a date label for this event. It is far beyond living memory: more than 350 years ago.",
      "Boundary: a picture of crowded wooden London and basic fire-fighting, with the date 1666. Population figures, political events and the plague of 1665 are not expected.",
    ],
    misconceptions: [
      { mistake: "There was nothing at all to fight fires in 1666.", why: "Pupils contrast with fire engines and hoses and assume the opposite is nothing.", response: "Show buckets, hooks and pumps in pictures. Say 'simple tools' and compare with today's firefighters." },
      { mistake: "London in 1666 was a small village.", why: "'Long ago' is imagined as small and rural.", response: "Say London was already one of Europe's large cities. Show a map or drawing of the old city and point to the crowded streets." },
      { mistake: "The Great Fire happened a hundred or so years ago.", why: "Children's sense of 'long ago' is not scaled.", response: "Use a washing-line timeline: put the Great Fire well to the left of grandparents' childhood." },
    ],
    vocabulary: [
      { term: "timber-framed", meaning: "Built with a wooden frame." },
      { term: "narrow", meaning: "Not wide, such as a street with little space between the houses." },
      { term: "pump", meaning: "A tool that pushes water out of a pipe or nozzle." },
      { term: "bucket", meaning: "A container used to carry water." },
      { term: "beyond living memory", meaning: "So long ago that nobody alive can remember it." },
      { term: "1666", meaning: "The year of the Great Fire of London." },
    ],
    before: "In Year 1 pupils looked for clues in old and new buildings and street names (Old and New Buildings, Clues in Street Names). Year 2 Keeping in Touch and Getting About prepared the idea of change over time.",
    next: "Year 3 studies Roman towns (Roman Towns, Roads and Baths), and Year 6 returns to London in the 1700s with highwaymen and the Bloody Code (Highwaymen and the Bloody Code). The Stuart period is taught in later key stages.",
  },

  "how-the-great-fire-started-and-spread": {
    statutory: [BEYOND_MEMORY],
    inBrief: "The Great Fire began in a bakery in Pudding Lane in the early hours of Sunday 2 September 1666 and spread for about four days. Dry weather, wind and crowded wooden houses let it grow.",
    keyFacts: [
      "The fire started in Thomas Farriner's bakery in Pudding Lane in the early hours of 2 September 1666. Farriner said he had put out his oven, but the fire still broke out. Nobody started it on purpose.",
      "The spread had causes: a long dry summer, a strong east wind, close wooden houses, warehouses full of materials that burn easily, and no quick, organised way to stop it.",
      "The fire burned until about 5 September, when the wind dropped and firebreaks (gaps made by pulling or blowing up buildings) helped. It destroyed about 13,000 houses and 87 parish churches, as well as old St Paul's Cathedral.",
      "Only a handful of deaths were recorded, but the true number is not known. People mostly escaped, many by boat on the Thames, carrying what they could.",
      "Boundary: where, when, why it spread and what people did. Fire-fighting decisions, Lord Mayor blame stories, rumours and the exact death toll are not expected.",
    ],
    misconceptions: [
      { mistake: "The baker lit the fire to hurt London, or a foreign group did.", why: "Pupils think big events need a bad plan and rumours were blamed at the time.", response: "Say it was an accident in a baker's oven, and that frightened people at the time looked for someone to blame, which was unfair." },
      { mistake: "The fire lasted one night.", why: "Pupils picture a single burning building.", response: "Use a four-day chart (Sunday to Wednesday) and a map that shows the fire moving from Pudding Lane across the city." },
      { mistake: "Rain put the fire out.", why: "Rain is the usual way fires end in stories.", response: "Say the wind dropped, firebreaks helped and the fire ran out of buildings to burn. Return to 'close wooden houses' as a cause." },
    ],
    vocabulary: [
      { term: "bakery", meaning: "A place where bread is baked." },
      { term: "spread", meaning: "To move from one place to others nearby." },
      { term: "firebreak", meaning: "A gap made so that fire cannot jump to the next building." },
      { term: "cause", meaning: "Something that makes another thing happen." },
      { term: "escape", meaning: "To get away from danger." },
      { term: "Pudding Lane", meaning: "The street in London where the fire began." },
    ],
    before: "In Year 1 pupils learned how a single event can be told in order, and in Year 2 London in 1666 set the scene.",
    next: "Year 6 pupils study cause and consequence, including long-term causes and triggers (Cause and Consequence). Year 3 uses the same careful 'what happened first, next, then' thinking for the Roman invasion.",
  },

  "how-we-know-about-the-great-fire": {
    statutory: [BEYOND_MEMORY],
    inBrief: "We know about the Great Fire from clues made at the time and later: diaries, paintings, records and the Monument. Each source shows one view, and using more than one helps us check.",
    keyFacts: [
      "Samuel Pepys, a government official, kept a diary from 1660 to 1669. He watched the fire, wrote about it and buried his cheese and wine to save them. His diary is a primary source: written by someone who was there.",
      "John Evelyn, another diarist, also wrote about it. Artists painted the fire too, some at the time and some later, and a painting may show an artist's idea more than a photograph would.",
      "The Monument, a tall stone column near Pudding Lane, was built between 1671 and 1677 to remember the fire. It is a later source: it tells us how people wanted to remember the fire, not what happened in each hour.",
      "A source gives clues, not complete answers: a diary shows one person's view, and its writer could not see the whole city.",
      "Boundary: different kinds of source and why we compare them. Primary and secondary labels, bias and interpretation are for later years.",
    ],
    misconceptions: [
      { mistake: "A diary tells us everything that happened.", why: "Pupils treat a book as the whole truth.", response: "Ask 'What could Pepys see? What could he not see?' Add a second source, such as a painting, and compare." },
      { mistake: "The Monument was built during the fire.", why: "It stands where the fire began, so it feels linked in time.", response: "Use dates: the fire was 1666 and the Monument was built years later to remember it. Sort sources into 'at the time' and 'later'." },
      { mistake: "A painting is as accurate as a photograph.", why: "Pupils may not know that photographs did not exist in 1666.", response: "Say there were no cameras in 1666, so people drew and painted. Ask what an artist might choose to show or leave out." },
    ],
    vocabulary: [
      { term: "source", meaning: "Something that gives us clues about the past." },
      { term: "diary", meaning: "A book in which a person writes about their days." },
      { term: "Samuel Pepys", meaning: "A man who wrote a famous diary and described the Great Fire." },
      { term: "Monument", meaning: "A tall stone column in London built to remember the Great Fire." },
      { term: "evidence", meaning: "Clues we use to say what we think happened." },
      { term: "compare", meaning: "To look at two things and say how they are the same and different." },
    ],
    before: "In Year 1 pupils used old photographs, buildings and memories as clues. Year 2 Keeping in Touch introduced an old letter as a source.",
    next: "Year 3 begins with archaeology and objects as evidence (How We Know About Prehistory). Year 4 asks what sources cannot tell us (Sutton Hoo), and Year 5 teaches primary and secondary sources (Sources and Interpretations).",
  },

  "london-after-the-fire": {
    statutory: [BEYOND_MEMORY],
    inBrief: "After the fire London was rebuilt over many years, with new rules for safer buildings and a new St Paul's Cathedral designed by Christopher Wren. Some things changed and some stayed.",
    keyFacts: [
      "The Rebuilding Act of 1667 required new houses to be built of brick or stone instead of timber, and set standards for street widths and storeys. Some grand plans to redesign the whole city were dropped, so the street pattern mostly stayed the same.",
      "Christopher Wren designed the new St Paul's Cathedral. The first stone was laid in 1675 and the cathedral was finished in 1710, so it took many years.",
      "Wren also designed many of the new city churches. The Monument, opened in 1677, was designed by Wren and Robert Hooke.",
      "A drawing or plan is a source for what a designer intended. The building that stands today is another clue, and the two can differ.",
      "Boundary: how London changed after the fire and what stayed. Building regulations in detail, the politics of rebuilding and insurance are not expected.",
    ],
    misconceptions: [
      { mistake: "London was rebuilt in a few weeks.", why: "Stories often jump straight to a happy ending.", response: "Show 1666, 1675 and 1710 on a timeline and ask how long a cathedral took. 'Rebuilding a city takes time.'" },
      { mistake: "Everything in London was brand new afterwards.", why: "Pupils picture total replacement.", response: "Sort changes (brick walls, wider streets in places, a new cathedral) and things that stayed (the river, many street lines, the need for homes)." },
      { mistake: "Wren built the cathedral himself.", why: "A single name on a famous building hides the many workers.", response: "Say Wren designed it, and masons, carpenters and labourers built it over years." },
    ],
    vocabulary: [
      { term: "rebuild", meaning: "To build again something that was damaged or destroyed." },
      { term: "brick", meaning: "A hard block made from baked clay, used to build walls." },
      { term: "architect", meaning: "A person who designs buildings." },
      { term: "Christopher Wren", meaning: "The architect who designed the new St Paul's Cathedral." },
      { term: "cathedral", meaning: "A large and important church." },
      { term: "landmark", meaning: "A building or place that is easy to recognise and helps people find their way." },
    ],
    before: "In Year 1 pupils noticed building materials and street names as clues (Old and New Buildings). In this course the earlier Great Fire topics set up before and after.",
    next: "Year 3 compares Roman towns with later ones, and Year 6 Change and Continuity separates what changed and what stayed, and fast and slow change. Wren's London is part of Stuart history studied later.",
  },

  // ---------------------------------------------------------------- Nurses Who Made a Difference
  "florence-nightingale": {
    statutory: [INDIVIDUALS, COMPARE],
    inBrief: "Florence Nightingale (1820 to 1910) helped make hospitals cleaner and safer during the Crimean War and started training for nurses in Britain. She is remembered as the Lady with the Lamp.",
    keyFacts: [
      "She came from a wealthy family and chose nursing, which was not seen as respectable work for a woman of her class. In 1854 she led a group of nurses to the army hospital at Scutari (Turkey) during the Crimean War (1853 to 1856).",
      "The hospital was crowded and dirty, and many soldiers died of disease and infection, not only wounds. Cleaner wards, fresh air and better supplies, helped by a government sanitary commission in 1855, were followed by fewer deaths.",
      "The name 'Lady with the Lamp' came from newspaper reports of her checking patients at night. It is a famous image, but she and her team did much more than carry a lamp.",
      "In 1860 she opened a training school for nurses at St Thomas' Hospital in London. She also used charts and statistics to argue for better hospitals.",
      "Boundary: who she was, what she did at Scutari and how nursing changed. The politics of the war, the statistical diagrams and debates about her legacy are not expected.",
    ],
    misconceptions: [
      { mistake: "Florence Nightingale was the only nurse in the Crimean War.", why: "Stories name one person and leave out the others who worked with her.", response: "Say she led a team, and that Mary Seacole also helped soldiers, in a different place. Compare their work in the next topic." },
      { mistake: "She only carried a lamp.", why: "The nickname and picture are the best-known parts of the story.", response: "Ask 'What else did she do?' Use clues: cleaner hospitals and a training school." },
      { mistake: "Nurses before her were not trained or did not matter.", why: "'She started it all' is an easy story.", response: "Say she helped to make nursing a trained profession in Britain, building on what people already did. Use 'helped improve', not 'invented'." },
    ],
    vocabulary: [
      { term: "nurse", meaning: "A person trained to look after sick or hurt people." },
      { term: "Crimean War", meaning: "A war in the 1850s in which Britain and its allies fought Russia." },
      { term: "Scutari", meaning: "The place in Turkey where Florence worked at a military hospital." },
      { term: "hospital", meaning: "A place where sick or hurt people are looked after." },
      { term: "clean", meaning: "Free from dirt and germs." },
      { term: "training", meaning: "Learning the skills you need to do a job." },
    ],
    before: "In Year 1 pupils met Queen Victoria and her time (Queen Victoria), and learned about significant individuals such as Neil Armstrong. Florence lived in Victoria's reign.",
    next: "Year 6 meets reformers who changed institutions (Prisons and Reformers, including Elizabeth Fry) and asks who and what mattered (Who and What Mattered?). Victorian Britain and the Crimean War are taught in later key stages.",
  },

  "mary-seacole": {
    statutory: [INDIVIDUALS, COMPARE],
    inBrief: "Mary Seacole (1805 to 1881) was a Jamaican-born healer who went to Crimea at her own expense to care for soldiers near the fighting. She wrote a book about her life.",
    keyFacts: [
      "Born in Kingston, Jamaica, she learned healing skills from her mother, who ran a boarding house and used herbal remedies. She also learned by treating patients in Jamaica and Panama, including during cholera outbreaks.",
      "When the Crimean War began she offered to go as a nurse. She was turned down by the British authorities. The reasons are debated, and racism is thought to be one of them.",
      "She paid her own way to Crimea, where she set up the British Hotel near Balaclava, close to the fighting, to supply food, drink and care for soldiers.",
      "She published 'Wonderful Adventures of Mrs Seacole in Many Lands' in 1857. After being almost forgotten, she was widely rediscovered in the late twentieth century.",
      "Boundary: who she was, where she worked and how she helped. Debates about her fame compared with Florence Nightingale's and the details of her business are not expected.",
    ],
    misconceptions: [
      { mistake: "Mary Seacole and Florence Nightingale did the same job in the same place.", why: "They are often taught together in one lesson.", response: "Compare on a table: Florence worked in a hospital at Scutari, Mary ran a place near the fighting. Both helped soldiers." },
      { mistake: "Mary was a nurse sent by the army.", why: "Pupils assume anyone who cares for soldiers was sent by the army.", response: "Say she was not accepted, so she travelled at her own cost and set up on her own." },
      { mistake: "She was only a cook or hotel owner.", why: "'British Hotel' sounds like a place to stay.", response: "Explain that it was a store and canteen near the camps, where she also treated soldiers' illnesses and wounds." },
    ],
    vocabulary: [
      { term: "healer", meaning: "A person who helps sick people get better, using skills and remedies." },
      { term: "Jamaica", meaning: "An island in the Caribbean where Mary Seacole was born." },
      { term: "Crimea", meaning: "The region where British soldiers fought in the 1850s." },
      { term: "British Hotel", meaning: "The place Mary ran near the fighting to give soldiers food, supplies and care." },
      { term: "supplies", meaning: "Things people need, such as food and medicine." },
      { term: "autobiography", meaning: "A book a person writes about their own life." },
    ],
    before: "In Year 1 pupils met Christopher Columbus, whose story includes people in other lands, and heard of significant individuals. Year 2 Florence Nightingale comes first in this course.",
    next: "Year 5 asks about sources and interpretations, including how people are remembered (Sources and Interpretations), and Year 6 asks 'whose story is missing' (Who and What Mattered?).",
  },

  "edith-cavell": {
    statutory: [INDIVIDUALS, COMPARE],
    inBrief: "Edith Cavell (1865 to 1915) was a British nurse in Belgium who cared for wounded soldiers from both sides in the First World War. She was put to death in 1915 for helping Allied soldiers escape.",
    keyFacts: [
      "She trained as a nurse in London and became matron (head nurse) of a nursing school in Brussels, helping to train Belgian nurses.",
      "After Germany occupied Belgium in 1914, she treated wounded soldiers from all sides. She also helped hundreds of Allied soldiers escape to the neutral Netherlands, which German authorities treated as a serious crime.",
      "She was arrested in August 1915 and executed by firing squad on 12 October 1915. Teach this soberly: she was put to death for helping people escape.",
      "Her words the night before are often quoted: 'patriotism is not enough, I must have no hatred or bitterness for anyone.' Her case angered many people around the world.",
      "Boundary: who she was, that she cared for people on both sides and helped soldiers, and that she died for it. Details of the trial and execution are not expected.",
    ],
    misconceptions: [
      { mistake: "She was a soldier or spy.", why: "She is linked to war and secret escapes.", response: "Say she was a nurse. Her job was to care for hurt people, and she also helped soldiers escape." },
      { mistake: "She only looked after one army.", why: "Pupils expect nurses to be on the side of their own country.", response: "Use the story line: she cared for soldiers from both sides. Ask why a nurse would do that." },
      { mistake: "The First World War was fought in the 1850s.", why: "Pupils mix this nurse with Florence and Mary.", response: "Place Crimea (1850s) and the First World War (1914 to 1918) on a timeline and say Edith worked in the later war." },
    ],
    vocabulary: [
      { term: "matron", meaning: "The senior nurse in charge of a hospital or nursing school." },
      { term: "Belgium", meaning: "A country in Europe where Edith worked." },
      { term: "First World War", meaning: "A big war fought from 1914 to 1918." },
      { term: "courage", meaning: "Being brave when something is dangerous or hard." },
      { term: "escape", meaning: "To get away from danger or capture." },
      { term: "both sides", meaning: "The two groups of countries fighting each other in a war." },
    ],
    before: "In Year 1 pupils met significant individuals (Queen Victoria and Neil Armstrong). Year 2 Florence Nightingale and Mary Seacole come earlier in this course, and Remembrance Day is a later topic.",
    next: "The First World War is taught at key stage 3. Year 6 asks significance and viewpoint questions (Who and What Mattered?).",
  },

  "nursing-then-and-now": {
    statutory: [INDIVIDUALS, COMPARE],
    inBrief: "Nursing has changed with equipment and knowledge, but caring for people has stayed central. Comparing Florence, Mary, Edith and nurses today shows change and continuity.",
    keyFacts: [
      "Florence Nightingale and Mary Seacole worked in the Crimean War (1850s), Edith Cavell in the First World War (1914 to 1918). All three cared for sick or hurt people, in different places and ways.",
      "In their time, nurses used simple equipment, lamps and basic medicines. Germ theory was only becoming widely accepted in later Victorian times, so cleanliness was understood in a different way from today.",
      "Today nurses work in hospitals, clinics, schools and people's homes, with electric lighting, machines, tested medicines and detailed training. Washing hands and kind care still matter.",
      "Nursing in the UK grew from the training schools Florence helped begin. Nurses today are men and women, and come from many backgrounds.",
      "Boundary: comparing then and now, using clothes, equipment and what nurses do. The history of the NHS, medicine and germ theory are not expected.",
    ],
    misconceptions: [
      { mistake: "Nurses in the past did not know about keeping things clean.", why: "Pupils think people long ago were not clever.", response: "Say people then had less knowledge about germs but still saw that clean wards helped. Florence used what she saw to change things." },
      { mistake: "All nurses today work in hospitals, as in the past.", why: "Hospital is the picture most pupils have.", response: "List places nurses work now: clinics, schools, homes. Ask pupils who has met a nurse and where." },
      { mistake: "Nursing is only for women.", why: "The three well-known nurses studied here are all women.", response: "Say that many men are nurses today and that men also nursed in the past. Use 'nurses' and avoid assuming gender." },
    ],
    vocabulary: [
      { term: "then and now", meaning: "Comparing the past with today." },
      { term: "equipment", meaning: "The tools and machines used to do a job." },
      { term: "similar", meaning: "Alike in some ways." },
      { term: "different", meaning: "Not the same." },
      { term: "clinic", meaning: "A place where people go for medical care without staying overnight." },
      { term: "care", meaning: "Looking after someone and helping them feel better." },
    ],
    before: "In Year 1 pupils compared homes, school and toys then and now. Year 2 pupils compared communication and travel then and now.",
    next: "Year 6 pupils meet changes in care and punishment (Prisons and Reformers) and study change and continuity (Change and Continuity). Later key stages study public health and the NHS.",
  },

  // ---------------------------------------------------------------- People Who Changed Things
  "rosa-parks": {
    statutory: [INDIVIDUALS, COMPARE],
    inBrief: "In December 1955 Rosa Parks refused to give up her bus seat in Montgomery, Alabama, where the law kept Black and white people apart. The bus boycott that followed helped end that unfair rule.",
    keyFacts: [
      "In parts of the southern United States, segregation laws kept Black and white people apart in buses, schools and many public places, and treated Black people unfairly. Black passengers had to sit at the back and give up seats if white passengers needed them.",
      "On 1 December 1955 Rosa Parks was arrested in Montgomery for refusing to give up her seat. She was an experienced member of the civil rights movement and not just a tired passenger, and she had decided to stand up for fairness.",
      "Black people in Montgomery boycotted the buses for 381 days. Many walked or shared cars. Leaders including Martin Luther King Jr. took part, and in 1956 the US Supreme Court ruled that bus segregation was against the law.",
      "Others had resisted before her, including Claudette Colvin, who was arrested for the same reason months earlier. Many people worked together for change.",
      "Boundary: unfair bus rules, Rosa's choice, the boycott and the change. The wider civil rights movement and legal cases are not expected.",
    ],
    misconceptions: [
      { mistake: "Rosa Parks changed the law alone.", why: "A single hero story is easier to tell.", response: "Say thousands of people boycotted the buses and lawyers and leaders also worked for change." },
      { mistake: "She refused because her feet were tired.", why: "The 'tired' version appears in many simple retellings.", response: "Say she was tired of being treated unfairly and chose to refuse. Use her own words if you read them." },
      { mistake: "This unfair rule was in Britain.", why: "Pupils may assume all history is British history.", response: "Find Alabama on a map. Say it happened in America, though British people also faced unfair treatment at times." },
    ],
    vocabulary: [
      { term: "unfair", meaning: "Not treating people equally or giving everyone the same chances." },
      { term: "boycott", meaning: "Choosing together not to use or buy something as a protest." },
      { term: "protest", meaning: "Showing in a peaceful way that you do not agree with something." },
      { term: "segregation", meaning: "Keeping groups of people apart by rules or laws, which was unfair." },
      { term: "Montgomery", meaning: "The city in Alabama, USA, where the bus boycott took place." },
      { term: "courage", meaning: "Being brave in a difficult or dangerous situation." },
    ],
    before: "In Year 1 pupils met Christopher Columbus and the idea that people were treated very unfairly. They also studied other significant individuals.",
    next: "Year 5 and Year 6 ask whose story is told and whose is missing (Sources and Interpretations, Who and What Mattered?). Later key stages study civil rights and the Atlantic slave trade.",
  },

  "emily-davison-and-votes-for-women": {
    statutory: [INDIVIDUALS, COMPARE],
    inBrief: "Before 1918 women in Britain could not vote in national elections. Campaigners, including the suffragette Emily Davison, fought for the vote, and women gained equal voting rights in 1928.",
    keyFacts: [
      "Suffragists campaigned peacefully for votes for women. Suffragettes, led by the Women's Social and Political Union (founded 1903), used more direct action, including protests, window-smashing and hunger strikes in prison.",
      "Emily Wilding Davison (1872 to 1913) was a suffragette who was jailed several times. At the Epsom Derby on 4 June 1913 she ran onto the course and was hit by the King's horse, and died four days later.",
      "Historians do not agree on what she intended. She may have wanted to attach a banner to the horse, or to make a deadly protest. Say honestly that this is not known.",
      "In 1918 some women over 30 gained the vote, and in 1928 women and men gained equal voting rights from age 21. Many campaigners and a changing society helped bring this about.",
      "Boundary: women could not vote, campaigners worked for change, Emily Davison's death and the later change. Details of militant tactics and political debates are not expected.",
    ],
    misconceptions: [
      { mistake: "Emily Davison won women the vote.", why: "Her death is the most famous moment.", response: "Say she was one of many campaigners, and that the vote came years later, after the First World War." },
      { mistake: "All women could vote after 1918.", why: "Stories compress the change into one date.", response: "Use a three-step line: before 1918 no national vote, 1918 some women, 1928 equal rights." },
      { mistake: "Women could never vote anywhere before.", why: "Pupils think 'could not vote' means all places and all time.", response: "Say this study is about national elections in Britain in the early twentieth century, and that rules were different in other places." },
    ],
    vocabulary: [
      { term: "vote", meaning: "A way of choosing who will make decisions for everyone." },
      { term: "suffragette", meaning: "A woman who campaigned for women to have the vote, often using direct action." },
      { term: "campaign", meaning: "To work with others to change something." },
      { term: "election", meaning: "When people vote to choose who will represent them." },
      { term: "equal", meaning: "The same for everyone." },
      { term: "protest", meaning: "To show you disagree with something." },
    ],
    before: "In Year 1 pupils met Queen Elizabeth I and Queen Victoria, and compared life in different periods (Two Queens Long Ago).",
    next: "Year 6 asks who and what mattered and whose story is missing (Who and What Mattered?) and studies law and punishment over time, including prisons (Prisons and Reformers). Votes for women are taught in more depth in later key stages.",
  },

  "william-caxton-and-tim-berners-lee": {
    statutory: [INDIVIDUALS, COMPARE],
    inBrief: "William Caxton set up England's first printing press in 1476 and Tim Berners-Lee invented the World Wide Web in about 1989. Both helped many more people share and find information.",
    keyFacts: [
      "Before printing, books were copied by hand, which was slow and costly. Johannes Gutenberg developed printing with movable metal type in Germany around 1450.",
      "William Caxton learned printing abroad and set up a press at Westminster in 1476. He printed books in English, such as Chaucer's 'The Canterbury Tales', and is called the first English printer.",
      "Tim Berners-Lee is a British computer scientist who proposed the World Wide Web while working at CERN, in 1989. The first website went live in 1991.",
      "The internet and the web are different: the internet is the network of connected computers, and the web is the system of linked pages that runs on it. Berners-Lee made the web freely available.",
      "Boundary: both helped people share words, and one is much older. How a press or the web works, and other inventors, are not expected.",
    ],
    misconceptions: [
      { mistake: "Caxton invented printing.", why: "He is the name given in English history stories.", response: "Say he brought printing to England. Printing with movable type was developed in Europe before him." },
      { mistake: "Tim Berners-Lee invented the internet.", why: "'Web' and 'internet' are used as if they mean the same.", response: "Say the internet was already there. Tim invented the way to link pages, which we call the World Wide Web." },
      { mistake: "These two men lived at about the same time.", why: "Both are 'about sharing information'.", response: "Put 1476 and 1989 on a timeline: more than 500 years apart." },
    ],
    vocabulary: [
      { term: "printing press", meaning: "A machine that prints words on paper using metal letters." },
      { term: "World Wide Web", meaning: "A way of linking pages of information on computers." },
      { term: "invent", meaning: "To make or think of something completely new." },
      { term: "copy", meaning: "To make another one like the first." },
      { term: "information", meaning: "Facts or knowledge." },
      { term: "link", meaning: "A connection that takes you from one page to another." },
    ],
    before: "In Year 1 pupils compared explorers and flight then and now (Explorers Then and Now, Flying Then and Now), practising how inventions change what people can do.",
    next: "Year 3 meets early writing and civilisations that kept records (Hieroglyphs), and Year 5 meets Maya writing and books (Maya Writing and Books). Later key stages study the spread of printing and modern technology.",
  },

  // ---------------------------------------------------------------- Days We Remember
  "bonfire-night": {
    statutory: [BEYOND_MEMORY],
    inBrief: "Bonfire Night on 5 November remembers the Gunpowder Plot of 1605, when a group of men planned to blow up the Houses of Parliament and King James I, and failed.",
    keyFacts: [
      "In 1605 a group of Catholic conspirators led by Robert Catesby planned to blow up the House of Lords at the State Opening of Parliament, when King James I would be there. They were angry about how Catholics were treated.",
      "Guy Fawkes was found guarding barrels of gunpowder in a cellar beneath Parliament on the night of 4 to 5 November 1605. He was one of the group but not its leader.",
      "The plot failed, and the plotters were later caught and punished. Say only that they were arrested and punished by law, which is enough for Year 2.",
      "Soon afterwards people lit bonfires to celebrate the King's survival, and Parliament passed a law for an annual day of thanksgiving. Bonfires, fireworks and effigies (models of a person) became part of the tradition.",
      "Boundary: what the plot was, that it failed, and why people remember it. Religious conflict, trials and punishments are not expected. Share firework safety rules.",
    ],
    misconceptions: [
      { mistake: "Guy Fawkes started the plot and succeeded in burning Parliament.", why: "The name is the one everybody knows, and the bonfire sounds like a fire.", response: "Say the plot failed and the bonfires celebrate that failure. Others planned it, and Fawkes was caught guarding the gunpowder." },
      { mistake: "Bonfire Night is a celebration of Guy Fawkes.", why: "'Guy' appears on a model in many places.", response: "Say it remembers the failure of the plot, and the date is 5 November. People are not celebrating the plotters." },
      { mistake: "Fireworks are safe for children to play with.", why: "Bonfire Night is presented as fun.", response: "Be clear that fireworks and bonfires are for adults to handle, and pupils watch from a safe distance." },
    ],
    vocabulary: [
      { term: "Gunpowder Plot", meaning: "A plan in 1605 to blow up Parliament and the King, which failed." },
      { term: "Guy Fawkes", meaning: "A man who was caught guarding the gunpowder." },
      { term: "Parliament", meaning: "The place where people make laws for the country." },
      { term: "plot", meaning: "A secret plan, usually to do something wrong." },
      { term: "bonfire", meaning: "A large outdoor fire." },
      { term: "anniversary", meaning: "A day that remembers an event that happened on the same date in a past year." },
    ],
    before: "In Year 1 pupils met Queen Elizabeth I and kings and queens (Kings and Queens). The King here, James I, followed Elizabeth I in 1603.",
    next: "Year 6 returns to the Gunpowder Plot in its setting of Tudor and Stuart law and punishment (Vagabonds, Plots and the Poor Law). Later key stages study religion and politics in Stuart times.",
  },

  "remembrance-day": {
    statutory: [BEYOND_MEMORY],
    inBrief: "Remembrance Day on 11 November remembers people who died in the First World War and later wars. Poppies and a two-minute silence are ways of showing respect.",
    keyFacts: [
      "An armistice (an agreement to stop fighting) began at 11 o'clock on 11 November 1918, ending fighting on the Western Front in the First World War. The war had lasted from 1914.",
      "Millions of soldiers died in the war, including very many from Britain and its empire. People gathered to remember them, and war memorials were built in thousands of towns and villages.",
      "Red poppies grew on battlefields in Belgium and France and became a symbol of remembrance after a 1915 poem, 'In Flanders Fields'. The Royal British Legion has sold poppies since 1921 to help veterans and their families.",
      "People keep a two-minute silence at 11 am on 11 November and on Remembrance Sunday, the second Sunday in November. Today the day also remembers those who died in later conflicts.",
      "Boundary: why we remember, and poppies, silence and memorials. Causes of the war, battles and numbers are not expected.",
    ],
    misconceptions: [
      { mistake: "Remembrance Day celebrates winning the war.", why: "Parades and ceremonies can look like a celebration.", response: "Say it is a quiet day to remember people who died. Use the words 'respect' and 'remember'." },
      { mistake: "The silence means we must be sad or scared.", why: "Pupils may think the silence is a test.", response: "Say it is a calm time to think. Pupils can think of someone they care about." },
      { mistake: "Remembrance only covers one war.", why: "Lessons focus on 1918.", response: "Say it began after the First World War and now remembers people who died in many wars." },
    ],
    vocabulary: [
      { term: "remembrance", meaning: "Remembering people or events in a respectful way." },
      { term: "armistice", meaning: "An agreement to stop fighting." },
      { term: "poppy", meaning: "A red flower worn to remember people who died in wars." },
      { term: "silence", meaning: "A time of quiet, with no talking." },
      { term: "memorial", meaning: "Something built or made to remember people or events." },
      { term: "respect", meaning: "Treating something or someone with care and honour." },
    ],
    before: "In Year 1 pupils learned about events beyond living memory such as the first flight, and looked at how we remember people. Year 2 Edith Cavell introduced the First World War.",
    next: "Year 2 Memorials and Blue Plaques continues the theme locally. The First World War is studied in more depth at key stage 3.",
  },

  // ---------------------------------------------------------------- History Near You
  "memorials-and-blue-plaques": {
    statutory: [LOCALITY],
    inBrief: "Memorials and plaques are clues to local history: they name people and events a community wanted to remember. Reading the words carefully tells us who, what and where, but not the whole story.",
    keyFacts: [
      "A memorial is anything built to remember people or events, such as a war memorial, statue, bench or stone. Most war memorials in Britain were put up after the First World War and list local people who died.",
      "A blue plaque is a sign on a building that marks a link with a notable person or event. The London scheme (run by English Heritage) began in the 1860s, and other places have their own schemes, with different colours.",
      "Plaques say who, what, when and where, usually in a few words, and they are placed later than the life or event, sometimes many years after.",
      "Someone chose who to remember and what to say, so memorials show what people valued at the time they were made. They can be a starting point for questions.",
      "Boundary: finding and reading memorials and plaques for clues. The Year 2 activity uses a practice plaque, and pupils should visit real ones only with a grown-up. Debates about statues are not expected.",
    ],
    misconceptions: [
      { mistake: "A blue plaque tells the person's whole life story.", why: "It is a sign on a wall and looks official.", response: "Read the words together and list what it says and what it does not. Ask 'What would you like to find out next?'" },
      { mistake: "A plaque was put up when the person lived there.", why: "Pupils assume signs are made at the same time as events.", response: "Look for dates: the plaque is newer than the life it remembers. Ask who put it up and why." },
      { mistake: "Every important person has a memorial.", why: "Pupils see famous names and assume all are included.", response: "Say communities choose who to remember, so some people have none. Ask who else might deserve one." },
    ],
    vocabulary: [
      { term: "memorial", meaning: "Something made to help people remember a person or an event." },
      { term: "blue plaque", meaning: "A sign on a building showing that a notable person lived or worked there." },
      { term: "statue", meaning: "A figure of a person or animal made from stone, metal or another material." },
      { term: "inscription", meaning: "The words carved or written on a memorial or plaque." },
      { term: "locality", meaning: "The place where you live and the area around it." },
      { term: "clue", meaning: "A piece of evidence that helps you find out about the past." },
    ],
    before: "In Year 1 pupils looked for clues in old buildings and street names in their locality (Old and New Buildings, Clues in Street Names). Year 2 Remembrance Day introduced memorials.",
    next: "Year 6 pupils plan a local study and use buildings, streets and plaques as evidence (What Is Local History?, Buildings and Streets as Evidence, Planning a Local Study).",
  },

  "old-maps-and-photos": {
    statutory: [LOCALITY],
    inBrief: "Comparing old and new maps and photographs of the same place shows what has changed and what has stayed. Each kind of source gives different clues and has limits.",
    keyFacts: [
      "Maps show where roads, buildings and boundaries were, as seen from above. Photographs show how a place looked from one spot at one moment.",
      "Photographs are available from the 1840s, so old photographs of a place are never older than that. Earlier views are drawings, paintings or maps. Early photographs were mostly black and white, but the world was not.",
      "To compare fairly, look at the same place from the same viewpoint and ask: what is new, what is missing, what is the same? Buildings, shops and roads often change while a church, river or hill stays.",
      "Local libraries, museums and record offices hold old maps and photographs, and the National Library of Scotland has a free site with old maps of Britain. A child should search with a grown-up.",
      "Boundary: comparing old and new views of one place and saying what changed and stayed. The Year 2 activity uses made-up practice maps, and map scales and map-making history are not expected.",
    ],
    misconceptions: [
      { mistake: "Everything in an old photo has gone.", why: "'Old' suggests that the whole scene has vanished.", response: "Find at least one thing that is the same in the new view, such as a church or a road line, and say what stayed as well as what changed." },
      { mistake: "The world used to be black and white.", why: "Early photographs have no colour.", response: "Say that colour was not recorded by early cameras, and that people and places had colours. Look for colour clues, such as painted posters." },
      { mistake: "An old map shows everything exactly as it was.", why: "Maps look neat and complete.", response: "Ask what a map shows and what it leaves out, such as people, sounds and colours. Compare it with a photograph." },
    ],
    vocabulary: [
      { term: "map", meaning: "A drawing that shows where places are, as seen from above." },
      { term: "photograph", meaning: "A picture made with a camera." },
      { term: "compare", meaning: "To look at how two things are alike and different." },
      { term: "changed", meaning: "Different from before." },
      { term: "stayed the same", meaning: "Still there and not different." },
      { term: "locality", meaning: "The place where you live and the area around it." },
    ],
    before: "In Year 1 pupils learned from old photographs and street names in their locality (Old and New Buildings, Clues in Street Names). Year 2 Getting About used old photographs as a source.",
    next: "Year 6 pupils compare old and new maps in more detail (Maps Through Time) and use census pages, photographs and memories as evidence (Census, Photos and Memories).",
  },
};
