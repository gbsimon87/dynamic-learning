/**
 * Teacher subject-knowledge briefings for Year 1 History, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the key stage 1 programme of
 * study in docs/curriculum/key-stage-1-history.md, using the requirement that
 * the topic's row in the "Year 1" mapping table names. Never paraphrase or
 * alter it: a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Early Years Foundation Stage prior learning and the Year 2+ destination
 *
 * Year 1 shows few or no years to pupils. Where this file gives a date it is
 * for the teacher. Dates follow the app: BC and AD.
 */
const LIVING_MEMORY = "changes within living memory";
const LIVING_MEMORY_NATIONAL =
  "changes within living memory. Where appropriate, these should be used to reveal aspects of change in national life";
const BEYOND_MEMORY = "events beyond living memory that are significant nationally or globally";
const INDIVIDUALS =
  "the lives of significant individuals in the past who have contributed to national and international achievements";
const COMPARE = "Some should be used to compare aspects of life in different periods";
const LOCALITY = "significant historical events, people and places in their own locality";

export const YEAR1_HISTORY_BRIEFINGS = {
  // ---------------------------------------------------------------- Then and Now
  "toys-then-and-now": {
    statutory: [LIVING_MEMORY],
    inBrief: "Toys are a friendly way into change over time. Pupils compare the toys their grandparents played with and toys today, and learn that old photographs and objects are clues to the past.",
    keyFacts: [
      "Living memory means the time a person alive today can remember. Grandparents' childhoods are the easiest way for 5 to 7 year olds to reach it.",
      "Grandparents' toys included wooden and tin toys, marbles, spinning tops, dolls and drums. Plastic and battery toys also existed in many childhoods from the 1950s to 1970s, so never say they had none.",
      "Toy trains show change in order: wind-up with a key, then battery, then app-controlled.",
      "Some toys have lasted for a very long time. Children in 1850s photographs (early daguerreotypes) hold dolls and toys that look familiar, so change and continuity sit side by side.",
      "Boundary: noticing and ordering differences between then and now. Exact dates, the history of plastic and comparing a toy's cost are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks children long ago had no toys and did not play.", why: "Old things look plain, so pupils assume nothing fun existed.", response: "Show a photograph or object of a toy from long ago and ask what a child did with it. Point out that children still play with dolls, drums and carts." },
      { mistake: "Thinks everything 'old' happened at one time, so Grandpa's toys and a Victorian doll are from the same period.", why: "At this age, 'a long time ago' is a single block.", response: "Use two or three words only: 'a long time ago', 'when grandparents were little', 'today'. Put the pictures in those three groups." },
      { mistake: "Believes old toys were not as good or that old photos mean people were less clever.", why: "Black and white photographs and simple toys look basic.", response: "Ask what a wind-up train can do that a battery train cannot, and what a tablet game cannot do that marbles can. Value both." },
    ],
    vocabulary: [
      { term: "old and new", meaning: "Old was made or used a long time ago. New is made or used now." },
      { term: "grandparents", meaning: "The parents of a child's mum or dad. They were children a long time ago." },
      { term: "then and now", meaning: "Then is the past. Now is today." },
      { term: "toy", meaning: "A thing children play with." },
      { term: "wind-up", meaning: "Worked by turning a key to tighten a spring." },
      { term: "photograph", meaning: "A picture taken with a camera. Old photographs are clues to the past." },
    ],
    before: "In the Early Years Foundation Stage (EYFS, Nursery and Reception) children talk about the lives of people around them, and notice some things that are the same and different between the past and now, often through family photographs and stories.",
    next: "Year 2 compares more ways of life within living memory (Keeping in Touch Then and Now, Getting About Then and Now) and begins to place events in time, such as the Great Fire of London in 1666.",
  },

  "homes-then-and-now": {
    statutory: [LIVING_MEMORY],
    inBrief: "Pupils compare homes when their grandparents were little with homes today: how they were heated, how washing and cooking were done and what technology was in them. They also learn who can tell them about the past.",
    keyFacts: [
      "Many homes in the 1950s to 1970s had coal or gas fires, not central heating. Office for National Statistics figures show about a third of homes had central heating around 1970, and most do today.",
      "Washing was often done by hand or with a simple machine, and many homes had one television with only a few channels. Britain had three channels (BBC One, BBC Two and ITV) until Channel 4 began in 1982.",
      "Telephones changed from corded home phones, to mobile phones carried around, to touch-screen phones with cameras. Mobile phones became common from the 1990s and touch-screen smartphones from about 2007.",
      "We find out about homes from grandparents' memories, photographs, objects and museums. Memory is a useful source but different people remember different things.",
      "Boundary: noticing differences in heating, machines and screens. Dates, the reasons for change and class or regional differences are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks homes in the past were all the same, or that every home had the same things.", why: "Pictures in books show one or two typical rooms.", response: "Ask 'Did every family have a TV?' and invite pupils to ask grandparents what their own home had. Treat answers as clues, not as a rule for everyone." },
      { mistake: "Thinks people long ago were unhappy or poor because they had no screens.", why: "Pupils judge the past by what they have now.", response: "Ask what families did in the evening instead: talking, games, reading, listening to the radio. Say 'different', not 'worse'." },
      { mistake: "Thinks a thing has always been the way it is now, such as phones or central heating.", why: "Pupils have only known their own home.", response: "Put three phone pictures (corded, mobile, touch-screen) in order and ask what changed at each step." },
    ],
    vocabulary: [
      { term: "home", meaning: "The place where a person lives." },
      { term: "coal fire", meaning: "A fire that burns coal to heat a room." },
      { term: "central heating", meaning: "A system that warms the whole house with pipes and radiators." },
      { term: "memory", meaning: "What someone remembers from their own life." },
      { term: "museum", meaning: "A place that keeps and shows old objects." },
      { term: "change", meaning: "When something becomes different over time." },
    ],
    before: "In EYFS children talk about their families and homes and the lives of people around them, and begin to compare how things are the same or different now.",
    next: "Year 2 looks at changing technology within living memory (Keeping in Touch Then and Now) and at older homes in London in 1666 (London in 1666).",
  },

  "school-then-and-now": {
    statutory: [LIVING_MEMORY],
    inBrief: "School is something every pupil knows, so it makes a secure example of change and continuity. Pupils compare their classroom with those their grandparents sat in, and notice what stayed the same.",
    keyFacts: [
      "Many classrooms in the 1950s to 1970s had a blackboard and chalk, desks in rows and a small bottle of milk at break. Whiteboards and then interactive boards and tablets came later.",
      "Free school milk was given in third-of-a-pint bottles from the 1940s. Free milk ended for most older children in the early 1970s and is still free for under-5s.",
      "Older still, children wrote on slates. Museums such as the Museum of Childhood (Young V&A) and the Ragged School Museum keep old desks, slates and books.",
      "What stayed the same: children read, write, count and play, and teachers help them learn.",
      "Boundary: comparing then and now and noticing what has not changed. Education laws, punishments and school types are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks school is a new idea, or that children long ago did not go to school.", why: "The pupil only knows their own school.", response: "Show a school photograph from long ago. Point out the children, the teacher and the desks, and say schools have existed for a very long time, though they have changed." },
      { mistake: "Thinks everything in an old photograph was the way all schools were.", why: "A single picture feels like the whole truth.", response: "Ask 'What can we see?' and 'What do we not know?' Then ask a grandparent or older visitor what their school was like." },
      { mistake: "Says old classrooms were 'boring' or 'bad'.", why: "Pupils judge by what they own now.", response: "Ask what a child in a chalk classroom could do that is the same as you, such as read, draw, sing or play at break." },
    ],
    vocabulary: [
      { term: "blackboard", meaning: "A dark board that a teacher writes on with chalk." },
      { term: "whiteboard", meaning: "A white board that a teacher writes on with pens." },
      { term: "chalk", meaning: "A soft white stick used for writing on a blackboard." },
      { term: "desk", meaning: "A table where a child sits to work." },
      { term: "slate", meaning: "A small flat piece of stone that children once wrote on." },
      { term: "tablet", meaning: "A flat computer you touch to use." },
    ],
    before: "In EYFS children talk about their own school and daily routine, and begin to say how things were different when they were younger or in the past.",
    next: "Year 2 continues with change in living memory (Getting About Then and Now) and begins to study a school-age event beyond living memory, the Great Fire of London.",
  },

  "seaside-holidays-then-and-now": {
    statutory: [LIVING_MEMORY_NATIONAL],
    inBrief: "Seaside holidays show how everyday national life changed: how families travelled, what they wore and what they did on the beach. Many things, such as sand, sea and piers, did not change at all.",
    keyFacts: [
      "Seaside holidays grew in Victorian times, when railways made it easy and cheap for families to reach the coast. Blackpool Tower opened in 1894, and Victorian piers survive in many resorts.",
      "Punch and Judy puppet shows have been given on British beaches for generations, and donkey rides at Blackpool still run today.",
      "Many early photographs show people in coats and hats on the beach, while today people wear swimming costumes and sun cream. Bathing huts and bathing machines were used for changing.",
      "Travel changed in order: steam trains, then cars for many families, then car, train or coach today. Paid holidays for most workers became law in 1938, which helped holidays spread.",
      "Boundary: noticing differences in travel, clothes and activities, and that some things continue. Dates, the history of railways and the rise of foreign holidays are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks only rich people or nobody went to the seaside long ago.", why: "Old photographs look formal, and pupils do not know about trains or paid holidays.", response: "Show the Blackpool beach photograph and ask who is there. Say that railways let many families go for the day or a week." },
      { mistake: "Thinks old photographs of the beach are from the same year as grandparents' childhoods.", why: "'Long ago' is a single block for young children.", response: "Use three groups: 'a very long time ago, before your grandparents were born', 'when grandparents were little', 'today'." },
      { mistake: "Believes nothing is the same now as then.", why: "Differences are the easiest things to spot.", response: "Ask what a child on a Victorian beach did that you do too: dig, paddle, build sandcastles, ride a donkey." },
    ],
    vocabulary: [
      { term: "seaside", meaning: "The land by the sea where people go on holiday." },
      { term: "pier", meaning: "A long walkway built out over the sea." },
      { term: "Punch and Judy", meaning: "A puppet show seen on British beaches for a very long time." },
      { term: "donkey ride", meaning: "A ride on a donkey along the sand." },
      { term: "holiday", meaning: "Time away from school or work to rest and have fun." },
      { term: "bathing hut", meaning: "A small hut on the beach where people changed into swimwear." },
    ],
    before: "In EYFS children talk about holidays and trips and look at photographs of familiar places, noticing what is the same and different between now and before.",
    next: "Year 2 compares how people travelled in grandparents' time and today (Getting About Then and Now) and begins to use old photographs as evidence (Old Maps and Photos).",
  },

  // ---------------------------------------------------------------- The First Flight
  "the-wright-brothers-first-flight": {
    statutory: [BEYOND_MEMORY],
    inBrief: "On 17 December 1903 two American brothers, Orville and Wilbur Wright, made the first powered, controlled flights in an aeroplane. The story shows how patient testing led to a world-changing event.",
    keyFacts: [
      "Orville and Wilbur Wright were from Dayton, Ohio, and ran a bicycle business. Their aeroplane was called the Wright Flyer and had one engine and two propellers.",
      "The flights took place at Kill Devil Hills near Kitty Hawk, North Carolina, a windy place with soft sand. Orville flew first, for about 12 seconds, and Wilbur flew later that day. There were four flights, the longest about 59 seconds.",
      "The pilot lay on the lower wing. A famous photograph shows the Flyer just off the ground with Wilbur running beside it.",
      "It was the first powered, controlled aeroplane flight. Others had flown gliders and balloons before, so say 'first aeroplane with an engine to fly'.",
      "Boundary: Orville and Wilbur, the Wright Flyer, about 12 seconds, and that it happened long ago. No years are shown to Year 1 pupils, and the engineering is not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks the first flight was like a modern plane journey, with seats and windows.", why: "Pupils picture the planes they know.", response: "Show the Flyer photograph and ask: 'Where does the pilot sit?' Count to 12 slowly so they feel how short it was." },
      { mistake: "Thinks the first flight happened when grandparents were little.", why: "'Long ago' and 'when grandparents were little' blur together.", response: "Use the timeline words: the first flight was before your grandparents were born, and before their parents were born." },
      { mistake: "Thinks only one brother mattered.", why: "Stories simplify to one hero.", response: "Say that both brothers built and tested the plane, and took turns to fly it." },
    ],
    vocabulary: [
      { term: "aeroplane", meaning: "A machine with wings and an engine that can fly." },
      { term: "engine", meaning: "A machine that makes something move." },
      { term: "pilot", meaning: "The person who flies a plane." },
      { term: "brothers", meaning: "Two boys or men who have the same parents." },
      { term: "first", meaning: "Before all the others." },
      { term: "Wright Flyer", meaning: "The name of the brothers' aeroplane." },
    ],
    before: "In EYFS children hear stories of real people from the past and talk about how things have changed, often through travel, transport and flight.",
    next: "Year 2 studies another event beyond living memory, the Great Fire of London in 1666, and learns to use different clues to find out about it. Key Stage 2 returns to inventions and change over a longer timeline.",
  },

  "flying-then-and-now": {
    statutory: [BEYOND_MEMORY],
    inBrief: "Pupils compare the first aeroplane with planes today to see how much changed in a short time on a long timeline. They also notice what stayed the same: wings, an engine and a pilot.",
    keyFacts: [
      "The 1903 Wright Flyer had one engine, one pilot lying on the lower wing, no seats and no windows. Its first flights lasted from 12 to 59 seconds.",
      "Planes crossed bigger and bigger distances: across the English Channel in 1909 and across the Atlantic in 1919. Jet airliners carrying passengers began in the 1950s.",
      "Today big passenger planes carry hundreds of people for hours, with a crew to look after them. Smaller planes, helicopters and drones are also used.",
      "What stayed the same: wings that lift the plane, an engine that pushes it, and a trained pilot.",
      "Boundary: comparing the first aeroplane with planes today. The names of aircraft, how wings work and the dates of each milestone are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks the first aeroplane could carry lots of people.", why: "Pupils picture modern passenger planes.", response: "Show both photographs and count the people in each. Ask where the first pilot sat." },
      { mistake: "Thinks planes changed overnight.", why: "Pupils see 'then' and 'now' with nothing in between.", response: "Add a middle picture, such as an early passenger propeller plane, to show change in steps." },
      { mistake: "Thinks planes in the past were silly or useless.", why: "The first plane looks fragile.", response: "Say it was clever and brave, and every later plane built on what the brothers learned." },
    ],
    vocabulary: [
      { term: "passenger", meaning: "A person who travels in a vehicle but does not drive it." },
      { term: "crew", meaning: "The people who work on a plane or ship." },
      { term: "wing", meaning: "The flat part of a plane that helps it stay in the air." },
      { term: "pilot", meaning: "The person who flies a plane." },
      { term: "then", meaning: "In the past." },
      { term: "today", meaning: "Now, in our time." },
    ],
    before: "In EYFS children compare modes of transport and talk about how things used to be different, often using photographs and toys.",
    next: "Year 2 compares travel in grandparents' time and today (Getting About Then and Now). Later years return to the history of science and technology.",
  },

  // ---------------------------------------------------------------- Explorers
  "christopher-columbus": {
    statutory: [INDIVIDUALS],
    inBrief: "Christopher Columbus, from Genoa in Italy, sailed west across the Atlantic for Spain in 1492. His voyage was an important and a harmful event: it linked Europe and the Americas, and people who already lived there were treated very unfairly.",
    keyFacts: [
      "Columbus was born in Genoa, a city in what is now Italy. He sailed for the king and queen of Spain with three ships, the Niña, the Pinta and the Santa María, hoping to reach Asia by sailing west.",
      "In 1492 his ships reached islands in the Caribbean, in the Americas, not Asia. Columbus did not discover empty land. People such as the Taíno already lived there.",
      "Columbus and the men with him treated the people they met very unfairly, taking land and enslaving people. This is part of the true story and can be said plainly and kindly to young children.",
      "We know about him from his own letters and journals. No portrait from his lifetime is known, and later artists guessed his appearance.",
      "Boundary: who he was, that he sailed west with three ships and that people already lived there and were treated unfairly. Dates, Spanish politics and the wider history of slavery are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks Columbus 'discovered' a place nobody had ever lived.", why: "'Discovered' is the word on many labels and in stories.", response: "Say 'he reached lands that were new to him'. Ask who already lived there and say they had their own homes and way of life." },
      { mistake: "Thinks Columbus was simply a hero or simply a villain.", why: "Young children prefer simple stories.", response: "Say he made a famous voyage and also did unfair, harmful things. Both are true, and a person in history can be both brave and wrong." },
      { mistake: "Believes we know exactly what he looked like.", why: "Pictures in books look certain.", response: "Show two different portraits and ask why they differ. Explain that there were no cameras and nobody painted him from life." },
    ],
    vocabulary: [
      { term: "explorer", meaning: "A person who travels to find out about new places." },
      { term: "voyage", meaning: "A long journey by sea." },
      { term: "ocean", meaning: "A very large area of sea." },
      { term: "unfair", meaning: "Not treating people in a way that is right and kind." },
      { term: "portrait", meaning: "A painting or drawing of a person." },
      { term: "sail", meaning: "To travel on water using the wind in the sails." },
    ],
    before: "In EYFS children hear stories about real people from the past and compare them with people around them, talking about travel and journeys.",
    next: "Year 2 studies people who challenged unfair rules (Rosa Parks, Emily Davison and Votes for Women). Key Stage 2 returns to exploration and its effects on the people already living in the lands reached.",
  },

  "neil-armstrong": {
    statutory: [INDIVIDUALS],
    inBrief: "Neil Armstrong was the first person to walk on the Moon, on 20 July 1969, as part of the Apollo 11 mission. His story shows what a large team can achieve and is a clear example of a world-changing event.",
    keyFacts: [
      "Neil Armstrong was an American astronaut. Apollo 11 launched on a Saturn V rocket carrying three astronauts: Armstrong, Buzz Aldrin and Michael Collins.",
      "Armstrong and Aldrin landed in a small craft called the Eagle and walked on the Moon. Armstrong stepped out first, and Aldrin followed. Collins stayed in orbit around the Moon in the main spacecraft.",
      "The journey to the Moon took about four days, and all three astronauts came home safely. The footprints are still there because the Moon has no wind or weather to blow them away.",
      "Thousands of people worked on the mission. It happened over 50 years ago, within the memory of some grandparents and great-grandparents.",
      "Boundary: Armstrong, the Moon and the order of events. Years, how rockets work and the space race are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks Neil Armstrong went to the Moon alone.", why: "Stories mention him most.", response: "Say there were three astronauts and thousands of helpers. Armstrong was the first person to step onto the Moon." },
      { mistake: "Thinks the Moon landing is 'make believe' because it looks like a film.", why: "Space is strange and films also show it.", response: "Say that photographs, rocks and recordings were brought back, and that many people watched it live on television." },
      { mistake: "Thinks astronauts today still walk on the Moon.", why: "Space news mixes past and present.", response: "Say no one has walked on the Moon since 1972, and today astronauts live on the International Space Station." },
    ],
    vocabulary: [
      { term: "astronaut", meaning: "A person trained to travel in space." },
      { term: "rocket", meaning: "A very powerful machine that can take people into space." },
      { term: "Moon", meaning: "The big round thing in the night sky that goes around the Earth." },
      { term: "bootprint", meaning: "The mark a boot leaves behind." },
      { term: "mission", meaning: "A special job a team goes to do." },
      { term: "first", meaning: "Before all the others." },
    ],
    before: "In EYFS children learn about people and jobs and hear stories about real people, and many already know about space and astronauts from books and television.",
    next: "Year 2 meets more significant individuals (Florence Nightingale, Mary Seacole, Edith Cavell) and learns to compare their lives with ours.",
  },

  "explorers-then-and-now": {
    statutory: [COMPARE],
    inBrief: "Pupils compare Columbus with Neil Armstrong: ships and rockets, maps and computers, weeks at sea and days in space. They use the comparison to see how technology changed what explorers could do, while courage and teamwork stayed the same.",
    keyFacts: [
      "Columbus sailed in wooden ships driven by the wind and found his way with hand-drawn charts and the stars. The voyage took weeks.",
      "Armstrong travelled in a rocket and reached the Moon in about four days, helped by computers and a huge team on the ground.",
      "Columbus sailed in 1492 and Armstrong walked on the Moon in 1969. Armstrong is much nearer to us in time, and we have photographs and film of his journey but not of Columbus.",
      "Both were brave and relied on a team. Today astronauts live on the International Space Station, which has had people on board without a break since 2000.",
      "Boundary: comparing transport, tools and journey times. Exact dates and distances are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks Columbus and Armstrong lived at about the same time.", why: "Both are 'explorers' in the same pupil book.", response: "Place Columbus much further back on a simple three-point line: long, long ago; when grandparents were little; today." },
      { mistake: "Thinks Columbus had a camera or a photograph exists.", why: "Pupils assume pictures have always existed.", response: "Ask 'How do we know what the journey was like?' and say we use his letters, because cameras had not been invented." },
      { mistake: "Thinks explorers only go to far-off places.", why: "Stories focus on oceans and space.", response: "Explorers also look closely at places near home. Ask what pupils could find out on a walk round school." },
    ],
    vocabulary: [
      { term: "explorer", meaning: "A person who travels to find out about new places." },
      { term: "journey", meaning: "Going from one place to another." },
      { term: "map", meaning: "A drawing of a place that helps you find your way." },
      { term: "technology", meaning: "Tools and machines people make to help them." },
      { term: "space station", meaning: "A large craft in space where astronauts live and work." },
      { term: "compare", meaning: "To look at two things and say how they are the same and different." },
    ],
    before: "In EYFS children compare and contrast characters from stories and people from the past, and talk about how things used to be different.",
    next: "Year 2 compares more people from different times (Nursing Then and Now, William Caxton and Tim Berners-Lee), using the same then and now language.",
  },

  // ---------------------------------------------------------------- Kings and Queens
  "queen-elizabeth-i": {
    statutory: [INDIVIDUALS],
    inBrief: "Elizabeth I was queen of England from 1558 to 1603, a reign of about 45 years. Pupils learn who she was, what her time looked like and how we know from portraits.",
    keyFacts: [
      "Elizabeth was the daughter of King Henry VIII. She became queen in 1558, ruled until 1603 and never married. This period is called Tudor times.",
      "In 1588 a large Spanish fleet, the Armada, tried to reach England. The English ships and bad weather stopped it from landing. Year 1 tells this as a short story with no fighting described.",
      "There were no cameras, so we know what she looked like from paintings. Portraits showed her as rich and strong, with jewels, pearls and big collars called ruffs, so they are not simple records of her looks.",
      "People travelled on horseback or in carriages, and rooms were lit by candles. Elizabeth travelled to towns to be seen by her people.",
      "Boundary: who she was, her long reign, the Armada as a short story and what we can see in portraits. Religion, her family history and the dates are not expected.",
    ],
    misconceptions: [
      { mistake: "Confuses Elizabeth I with the present-day royal family, or with Elizabeth II.", why: "They share a name, and 'queen' means 'a queen we know'.", response: "Say 'a different queen, a very long time ago'. Show the portrait and ask whether it is a photograph or a painting." },
      { mistake: "Thinks a painting is exactly what she looked like.", why: "Pictures look real.", response: "Ask why a painter might add jewels and a rich dress. Say portraits were made to show her power." },
      { mistake: "Thinks Elizabeth won the Armada battle by herself.", why: "Stories focus on the ruler.", response: "Say the English ships, sailors and the weather all played a part. The queen led a country of many people." },
    ],
    vocabulary: [
      { term: "queen", meaning: "A woman who rules a country, usually for life." },
      { term: "reign", meaning: "The time when a king or queen rules." },
      { term: "ruff", meaning: "A big frilly collar worn round the neck in Tudor times." },
      { term: "portrait", meaning: "A painting or drawing of a person." },
      { term: "Armada", meaning: "A large fleet of Spanish ships that sailed to England in 1588." },
      { term: "palace", meaning: "A very large house where a king or queen lives." },
    ],
    before: "In EYFS children hear stories about kings, queens and other people from the past and talk about the roles of people in society.",
    next: "Year 2 meets significant people in more depth and uses portraits and photographs as sources. Key Stage 2 studies the Tudors, the Stuarts and later rulers as part of a chronological story.",
  },

  "queen-victoria": {
    statutory: [INDIVIDUALS],
    inBrief: "Queen Victoria ruled from 1837 to 1901, a very long reign. Her time is called the Victorian age. Photographs, railways and gas and electric lighting make it a good first period for pupils to compare with today.",
    keyFacts: [
      "Victoria became queen in 1837 when she was 18 and reigned for about 63 years, until 1901. She married Prince Albert and had nine children.",
      "She was the first monarch to live at Buckingham Palace in London. We call her time Victorian times.",
      "Photography was new in her reign, so we have photographs of her as well as paintings.",
      "In Victorian times many people travelled by steam train, homes were lit by candles or gas lamps and electric lighting came slowly. Children went to the seaside, like children today.",
      "Boundary: who she was, a very long reign, a big family and a few differences in everyday life. Empire, factory work and poverty are not expected in Year 1.",
    ],
    misconceptions: [
      { mistake: "Thinks Victoria and Elizabeth I lived at the same time.", why: "Both are 'queens long ago' in pupil books.", response: "Order the portrait and the photograph. Say Elizabeth lived first, then Victoria, much later." },
      { mistake: "Thinks everyone in Victorian times lived in palaces and wore fancy clothes.", why: "Pictures of the queen dominate.", response: "Say the queen's life was very different from most people's. Show photographs of ordinary children from the time." },
      { mistake: "Thinks Victorians had no electric lights at all.", why: "Pupils picture all 'old' times as dark.", response: "Say candles and gas lamps were common, and electric lights were rare at first and spread slowly." },
    ],
    vocabulary: [
      { term: "queen", meaning: "A woman who rules a country, usually for life." },
      { term: "Victorian", meaning: "From the time when Queen Victoria was queen." },
      { term: "steam train", meaning: "A train driven by a steam engine that burns coal." },
      { term: "gas lamp", meaning: "A lamp that burns gas to give light." },
      { term: "photograph", meaning: "A picture taken with a camera." },
      { term: "Buckingham Palace", meaning: "A palace in London where kings and queens live and work." },
    ],
    before: "In EYFS children hear stories about kings and queens, and look at old photographs and objects to notice what is different from now.",
    next: "Year 2 uses photographs as evidence and meets Florence Nightingale and Edith Cavell, who lived in or just after Victorian times. Key Stage 2 studies Victorian Britain in more depth.",
  },

  "two-queens-long-ago": {
    statutory: [COMPARE],
    inBrief: "Pupils compare Elizabeth I and Victoria: clothes, homes, travel and how we know about them. Placing the two queens in order, with Elizabeth first, introduces a simple timeline and the idea of a sequence.",
    keyFacts: [
      "Elizabeth I reigned from 1558 to 1603 and Victoria from 1837 to 1901. There are about 230 years between the end of one reign and the start of the other.",
      "Both were queens for a long time and lived in palaces. Both are remembered by names for their times: Tudor and Victorian.",
      "Elizabeth wore a big ruff and pearls and travelled on horseback. Victoria often wore black dresses in later life and could travel by train.",
      "We have a painting of Elizabeth and photographs of Victoria, because cameras were new in Victoria's time. This is a first lesson in different kinds of sources.",
      "Boundary: ordering the two queens and comparing clothes, homes, travel and sources. Dates, family trees and Elizabeth II are not expected.",
    ],
    misconceptions: [
      { mistake: "Puts Victoria before Elizabeth, or thinks they were queens together.", why: "Pupils cannot yet sense the gap between periods.", response: "Use two cards on a line: Elizabeth first, Victoria later, today at the end. Say 'a very long time ago', 'a long time ago', 'now'." },
      { mistake: "Thinks all clothes in the past looked like the queen's.", why: "Royal pictures are common in books.", response: "Say these were queens' clothes. Ask what ordinary people wore, and show a photo or painting of one." },
      { mistake: "Says a painting is the same kind of evidence as a photograph.", why: "Both show a person.", response: "Ask which was made by a camera and which by an artist's choices. Say both are clues, and each tells us different things." },
    ],
    vocabulary: [
      { term: "queen", meaning: "A woman who rules a country, usually for life." },
      { term: "before and after", meaning: "Before is earlier in time. After is later in time." },
      { term: "compare", meaning: "To say how two things are the same and different." },
      { term: "painting", meaning: "A picture made with paint by an artist." },
      { term: "photograph", meaning: "A picture taken with a camera." },
      { term: "palace", meaning: "A very large house where a king or queen lives." },
    ],
    before: "In EYFS children put objects and events in order and talk about before and after, and compare stories of different characters.",
    next: "Year 2 places events in order within a longer period (London in 1666 to London After the Fire). Key Stage 2 builds a full chronological timeline of British history.",
  },

  // ---------------------------------------------------------------- Clues Around You
  "old-and-new-buildings": {
    statutory: [LOCALITY],
    inBrief: "Buildings are local history that pupils can see. They learn to look for clues that show how old a building is, such as materials, windows and dates carved on walls.",
    keyFacts: [
      "Old buildings often have wooden beams, small windows, thatched or slate roofs and stone or brick walls. New buildings often use glass, metal and concrete and have big windows.",
      "A date carved or painted on a wall, a name plaque or a stone is a direct clue. Be careful: a date can mark a rebuild or a change, not the first building.",
      "Different kinds of building belong to different times. Castles are medieval, many railway stations date from the 1830s onwards and tall glass towers are modern.",
      "Many old buildings are still used today, as homes, shops or schools. Old and new buildings can sit side by side in the same street.",
      "Boundary: noticing clues of age and sorting 'old' and 'new'. Architectural styles, names of periods and exact dates are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks any building that looks plain is new, or any building that looks fancy is old.", why: "Pupils judge by decoration.", response: "Look together at materials, windows and any date, and show an old simple house and a new fancy one." },
      { mistake: "Thinks old buildings are empty or only for museums.", why: "Pictures often show castles and ruins.", response: "Point out old buildings in use near school, such as a church, a pub, a shop or a house, and ask what they are used for." },
      { mistake: "Thinks a date on a wall tells us everything.", why: "A number looks certain.", response: "Ask 'What might the date mean? Was it built then, or mended then?' Then look for a second clue." },
    ],
    vocabulary: [
      { term: "building", meaning: "Something with walls and a roof, such as a house or school." },
      { term: "clue", meaning: "Something that helps you find out." },
      { term: "material", meaning: "What something is made from, such as wood, brick or glass." },
      { term: "thatch", meaning: "A roof made from dried straw or reeds." },
      { term: "concrete", meaning: "A hard grey building material made from cement and stones." },
      { term: "locality", meaning: "The area around where you live or go to school." },
    ],
    before: "In EYFS children talk about the places around them, notice features of buildings and their local area, and begin to talk about things that are old.",
    next: "Year 2 reads memorials and blue plaques and compares old maps and photographs of the local area (Memorials and Blue Plaques, Old Maps and Photos), and Key Stage 2 can use local sites for depth studies.",
  },

  "clues-in-street-names": {
    statutory: [LOCALITY],
    inBrief: "Street names often record what was once there. Mill Lane may have led to a mill and Church Street to a church, so a name can be a clue to local history even after the building has gone.",
    keyFacts: [
      "Many street names record a mill, church, market, bridge, well, castle or station that stood there. Names such as Mill Lane, Church Street, Station Road and Bridge Street are common.",
      "Mills, wells and old shops have often gone, but the street name stays. Sometimes the building is still there, as with a church on Church Street.",
      "Not every name is a clue to something nearby. Some honour a person, a place elsewhere or a developer's choice, and some were renamed. A name is a clue to check, not proof.",
      "Old maps, old photographs and the memories of older people can help check what a name suggests.",
      "Boundary: using the common names (Mill, Church, Station, Bridge) as clues. Where names come from in Old English or Norse and name changes are not expected.",
    ],
    misconceptions: [
      { mistake: "Thinks a street named after a mill must still have a mill.", why: "Pupils expect names to describe things as they are now.", response: "Say the name stayed after the mill went. Ask what other clues could show there was once a mill, such as an old map." },
      { mistake: "Thinks every street name is a clue to something at that exact place.", why: "The pattern works so often that it feels like a rule.", response: "Give one example that does not fit, such as a street named after a person, and say we check with a second clue." },
      { mistake: "Thinks street names cannot change.", why: "Names seem permanent.", response: "Say a council can rename a road. Ask what we would lose if an old name were changed." },
    ],
    vocabulary: [
      { term: "street name", meaning: "The name of a road, such as Mill Lane." },
      { term: "mill", meaning: "A building where grain is made into flour." },
      { term: "station", meaning: "A place where trains stop for people to get on and off." },
      { term: "clue", meaning: "Something that helps you find out." },
      { term: "map", meaning: "A drawing of a place that helps you find your way." },
      { term: "local", meaning: "Near where you live." },
    ],
    before: "In EYFS children talk about their own street and local area, make simple maps and notice features of places they know.",
    next: "Year 2 compares old and new maps and photographs (Old Maps and Photos) and reads memorials and plaques (Memorials and Blue Plaques) to find out what changed and what stayed.",
  },
};
