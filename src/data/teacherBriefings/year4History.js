/**
 * Teacher subject-knowledge briefings for Year 4 History, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the key stage 2 programme of
 * study in docs/curriculum/key-stage-2-history.md (the PDF text), using the
 * requirement that the topic's row in the "Year 4 topic crosswalk" names. Never
 * paraphrase or alter it: a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Year 3 prior learning and the Year 5+ destination
 *
 * Dates follow the app: BC and AD, "about" or "c." where scholars disagree.
 */
const SETTLEMENT = "Britain’s settlement by Anglo-Saxons and Scots";
const STRUGGLE =
  "the Viking and Anglo-Saxon struggle for the Kingdom of England to the time of Edward the Confessor";

export const YEAR4_HISTORY_BRIEFINGS = {
  // ---------------------------------------------------------------- Anglo-Saxons and Scots
  "when-the-romans-left-britain": {
    statutory: [SETTLEMENT],
    inBrief: "Roman rule in Britain ended about AD 410. Change was gradual and uneven: new rulers and communities appeared, while farming and daily needs carried on.",
    keyFacts: [
      "About AD 410 the western emperor Honorius is said to have told British cities to look to their own defence. Roman soldiers and officials had already been leaving, so historians treat 410 as a convenient marker rather than a single day.",
      "Britain was not the only place affected. The western Roman Empire ended in AD 476, when the last western emperor was removed. The eastern empire carried on for nearly a thousand years.",
      "Towns shrank and coins stopped being made for use in Britain, but farming went on in the countryside and some roads and buildings stayed in use.",
      "Evidence is thin. Few written sources survive, and later writers such as Gildas and Bede wrote long afterwards, so archaeology and writing must be compared.",
      "Boundary: the idea of withdrawal, continuity and the two dates. Causes of the empire's collapse and the detail of British politics in the AD 400s are not expected.",
    ],
    misconceptions: [
      { mistake: "All the Romans left Britain on one day and everyone's life changed at once.", why: "A date such as AD 410 sounds like a single event.", response: "Ask what a farmer would notice the next morning. Sort statements into changed (who governed) and carried on (growing crops)." },
      { mistake: "Roman buildings and roads vanished straight away.", why: "Pupils picture a clean ending to a Roman 'chapter'.", response: "Show that roads were still used and some towns and forts kept occupants for generations. Use 'carried on' as well as 'ended'." },
      { mistake: "The Anglo-Saxons arrived the moment the Romans left.", why: "The two topics are taught back to back.", response: "Use a timeline: settlement from newcomers increased through the 400s and 500s, and kingdoms formed later." },
    ],
    vocabulary: [
      { term: "withdrawal", meaning: "Pulling soldiers and officials out of a place." },
      { term: "empire", meaning: "A large area with many peoples, ruled by one government, often by an emperor." },
      { term: "Briton", meaning: "A person living in Britain at this time, whose ancestors lived there before the Romans." },
      { term: "continuity", meaning: "Something that carries on without changing much." },
      { term: "AD", meaning: "Labels years counted forward from year 1." },
      { term: "archaeologist", meaning: "Someone who studies objects and buildings left in the ground." },
    ],
    before: "In Year 3 pupils studied the Roman conquest, Hadrian's Wall, Roman towns and roads, and how the Romans changed Britain (How the Romans Changed Britain).",
    next: "The next topics follow the Scots and the Anglo-Saxon settlers. Year 5 pupils practise BC and AD ordering and use sources in One Long Timeline and Sources and Interpretations.",
  },

  "the-scots-come-from-ireland": {
    statutory: [SETTLEMENT],
    inBrief: "Early Scots had strong links with Ireland, and the kingdom of Dál Riata joined lands on both sides of the Irish Sea. The sea connected communities rather than dividing them.",
    keyFacts: [
      "Scots is the old name for people from Ireland. Dál Riata covered parts of north-east Ireland and the west of what is now Scotland, and its people spoke Gaelic.",
      "Historians disagree about how many people actually crossed from Ireland. Some think there was a major movement of people, others stress long contact and shared culture across the sea.",
      "Dunadd, an Argyll hillfort, was a royal centre from about AD 500. A footprint carved in its rock may have been used in inauguration rituals, which is an interpretation, not proof.",
      "The Picts, a separate people with their own kingdoms, lived in other parts of north Britain. Scots and Picts traded, intermarried and sometimes fought. Scotland only emerged as a kingdom later.",
      "Boundary: Scots, Picts and Dál Riata as groups, and the sea as a route. The kingdom of Alba and Kenneth MacAlpin are not expected.",
    ],
    misconceptions: [
      { mistake: "Scots and Picts were the same people.", why: "Both lived in what is now Scotland and the names are rarely taught together.", response: "Mark Dál Riata in the west and Pictish lands elsewhere on a sketch map and say they were different groups who met and mixed." },
      { mistake: "The Scots came from Scotland and 'invaded' Ireland.", why: "The modern name 'Scotland' suggests the people began there.", response: "Teach that the name 'Scot' first meant Gaelic speakers from Ireland. Land later took its name from them." },
      { mistake: "Because the carving 'may' have been used for crowning, we know it was.", why: "Pupils treat museum explanations as settled facts.", response: "Underline 'may'. Ask what evidence would make us more certain, such as written accounts." },
    ],
    vocabulary: [
      { term: "Scots", meaning: "Gaelic-speaking people from Ireland who settled in western north Britain." },
      { term: "Dál Riata", meaning: "The early kingdom that linked parts of Ireland and western Scotland." },
      { term: "Picts", meaning: "A different people who lived in other parts of north Britain." },
      { term: "Gaelic", meaning: "The Celtic language of the early Scots, still spoken in parts of Scotland." },
      { term: "mould", meaning: "A hollow shape used to cast hot metal into an object." },
      { term: "hillfort", meaning: "A hilltop settlement with defences, here used as a royal centre." },
    ],
    before: "Year 3 pupils met Iron Age hill forts and how Roman rule met the peoples of northern Britain at Hadrian's Wall.",
    next: "Saints and Monasteries follows Columba from Ireland to Iona. Year 6 Law and Order Before 1066 returns to Britain's early peoples.",
  },

  "anglo-saxon-settlers": {
    statutory: [SETTLEMENT],
    inBrief: "From the 400s and 500s groups from northern Europe, called Angles, Saxons and Jutes, crossed the North Sea and settled in Britain. Their languages and customs shaped English life.",
    keyFacts: [
      "The settlers came from lands now in northern Germany, Denmark and the Netherlands. Bede, writing about AD 731, named the Angles, Saxons and Jutes, but groups were mixed.",
      "Settlement was a process over generations, not one arrival. Britons already lived here. Some newcomers came peacefully as farmers and families, and there was also fighting.",
      "Famous stories such as Hengist and Horsa arriving in AD 449 come from later writers and are legends or uncertain tradition.",
      "Historians debate how many people moved, and DNA and archaeology both suggest mixing between newcomers and Britons.",
      "Boundary: who came, from where, why and what changed, using one object such as a brooch. Detailed migration numbers and DNA studies are not expected.",
    ],
    misconceptions: [
      { mistake: "The Britons were wiped out or all left.", why: "Stories of invasion suggest one side replaced the other.", response: "Say that many Britons stayed and that Old English was shaped by contact. Use place names such as rivers with older names." },
      { mistake: "The settlers all arrived together in one fleet.", why: "Pictures often show a single boat landing.", response: "Show repeated arrivals over many years on a timeline spread across the 400s and 500s." },
      { mistake: "One brooch tells us how every settler lived.", why: "A single beautiful object seems typical.", response: "Ask what one object can and cannot show, and which other finds you would compare it with." },
    ],
    vocabulary: [
      { term: "Anglo-Saxon", meaning: "A name for the peoples who came from northern Europe and settled in Britain, and for their way of life." },
      { term: "settle", meaning: "Make a new home in a place and stay there." },
      { term: "migration", meaning: "People moving from one area to live in another." },
      { term: "Angles, Saxons and Jutes", meaning: "The three main groups Bede named among the newcomers." },
      { term: "Old English", meaning: "The language of the Anglo-Saxons, the ancestor of modern English." },
      { term: "brooch", meaning: "A decorated pin used to fasten clothing." },
    ],
    before: "Year 3 pupils studied Roman Britain. Year 3 also taught how evidence shapes what we know about early peoples (How We Know About Prehistory).",
    next: "Anglo-Saxon Kingdoms, Village Life and Clues in Place Names build on this topic. Year 5 compares past societies (Comparing Past Societies).",
  },

  "anglo-saxon-kingdoms": {
    statutory: [SETTLEMENT],
    inBrief: "Anglo-Saxon England grew into several kingdoms ruled by kings who competed and made alliances. Boundaries and power changed over time.",
    keyFacts: [
      "Main kingdoms included Northumbria, Mercia, East Anglia and Wessex, with others such as Kent, Essex and Sussex. Later writers grouped seven as the 'Heptarchy', a term used from the Middle Ages.",
      "Kings relied on loyal warriors and on gifts, tribute and land. A powerful king might be called overlord by others for a time, as Offa of Mercia (about AD 757 to 796) was.",
      "Boundaries shifted with war, marriage and agreements. A map shows one moment and one interpretation, not fixed borders like today's.",
      "Kingdoms were unified only later, with Athelstan in AD 927. The Viking conquests left Wessex as the main surviving English kingdom.",
      "Boundary: four main kingdoms and where they were, and the idea of changing power. Lists of rulers and the Heptarchy debate are not expected.",
    ],
    misconceptions: [
      { mistake: "England already existed as one country then.", why: "Pupils read modern borders back into the past.", response: "Show a map with kingdoms, then ask which are now only regions. Say England was formed gradually, by about AD 927." },
      { mistake: "Kingdom borders were fixed lines like a modern map.", why: "Maps in textbooks draw clear edges.", response: "Describe frontier areas that shifted, and note that our map shows approximate positions." },
      { mistake: "Kings were always fighting, so no one lived normally.", why: "Accounts focus on war and rulers.", response: "Add farming and trade to the story: most people carried on working under different rulers." },
    ],
    vocabulary: [
      { term: "kingdom", meaning: "Land ruled by a king or queen." },
      { term: "Northumbria", meaning: "The northern kingdom, stretching from the Humber into what is now south-east Scotland." },
      { term: "Mercia", meaning: "The kingdom of the Midlands." },
      { term: "Wessex", meaning: "The kingdom of the south-west, home of Alfred the Great." },
      { term: "East Anglia", meaning: "The kingdom of the east." },
      { term: "alliance", meaning: "An agreement to help each other, often between rulers." },
    ],
    before: "Year 3 pupils studied Roman Britain and its governors, and met Iron Age tribes and hill forts.",
    next: "The Viking topics show some kingdoms falling and Wessex resisting. Athelstan First King of England shows unification in AD 927. Year 6 Law and Order Before 1066 uses king's laws.",
  },

  "anglo-saxon-village-life": {
    statutory: [SETTLEMENT],
    inBrief: "Most Anglo-Saxons lived in small farming communities, growing crops, keeping animals and making what they needed. Archaeology shows much about daily life that written accounts omit.",
    keyFacts: [
      "Houses were usually timber with thatched or turf roofs. Archaeologists find postholes, floors and sunken-floored buildings; wall and roof details are reconstructed from evidence and some educated guesses.",
      "People grew crops such as barley, wheat and oats and kept cattle, sheep and pigs. Bread, porridge and ale were common, and a poor harvest could mean hunger.",
      "Craftworkers made pottery, cloth, tools, bone combs and jewellery. Women, men and children all worked, and households differed by wealth.",
      "Society included free farmers (ceorls), nobles (thegns) and enslaved people. A reconstructed village such as West Stow in Suffolk is an interpretation, not a photograph.",
      "Boundary: farming, homes and craft as shown by objects and reconstructions. Detailed social ranks and open-field farming systems are not expected.",
    ],
    misconceptions: [
      { mistake: "Anglo-Saxon life was only fighting.", why: "Stories and films highlight warriors and kings.", response: "Collect a day in the life of a farmer, a potter and a child and contrast it with the king's story." },
      { mistake: "A reconstruction shows exactly how a house looked.", why: "Models and drawings look complete and certain.", response: "Ask what is evidence (postholes, pottery) and what is a guess (the roof), and note that our drawings are teaching aids." },
      { mistake: "Everyone lived the same way.", why: "A single typical house is shown.", response: "Compare a wealthy hall with a poorer house and say one house cannot stand for all." },
    ],
    vocabulary: [
      { term: "thatch", meaning: "A roof covering made from straw or reeds." },
      { term: "posthole", meaning: "A hole where a timber post once stood, left as a stain in the ground." },
      { term: "craftworker", meaning: "A person who makes things by skill, such as pottery or cloth." },
      { term: "harvest", meaning: "The gathering of ripe crops." },
      { term: "reconstruction", meaning: "A model or drawing of how something may have looked, built from evidence." },
      { term: "excavation", meaning: "A careful dig that records what lies in the ground." },
    ],
    before: "In Year 3 pupils met Stone Age farmers and Skara Brae, Iron Age hill forts and Roman farming and towns.",
    next: "Viking Life in Jorvik contrasts town trade and craft. Year 5 compares Greek and Mayan farming and food (Maya Farming and Food).",
  },

  "clues-in-place-names": {
    statutory: [SETTLEMENT],
    inBrief: "Many English place names come from Old English words, so they act as clues to who settled where. They are starting points and must be checked against old records.",
    keyFacts: [
      "Common Old English endings include -ham (a home or settlement, though sometimes an enclosed meadow), -ton (an enclosed farm or settlement), -ford (a river crossing), -bury or -burgh (a fortified place) and -ing (people of).",
      "A name was spoken for a long time before anyone wrote it. Spellings changed, so Domesday Book (AD 1086) and earlier charters are checked against modern forms.",
      "Viking settlers left Old Norse endings such as -by (farm or village) and -thorpe (outlying farm), found mostly in the north and east.",
      "Similar endings can have different origins, and one ending cannot date a settlement. Our 'Hamford' sign is invented practice, not a real place.",
      "Boundary: recognising a few endings and the need for care. Place-name scholarship and dating from name elements are not expected.",
    ],
    misconceptions: [
      { mistake: "A -ton ending proves the village is Anglo-Saxon and exactly 1,400 years old.", why: "The name looks like a simple label.", response: "Say the name only suggests a settlement existed when the name was made. Compare early written spellings and archaeology." },
      { mistake: "Place names have always been spelled as they are today.", why: "Signs make spelling look fixed.", response: "Show an old spelling beside the modern form and discuss how a name changed when spoken." },
      { mistake: "All names ending the same way mean the same thing.", why: "Pupils generalise from one example.", response: "Give an example of two names that look alike but come from different words, and call the meaning 'likely'." },
    ],
    vocabulary: [
      { term: "place name", meaning: "The name of a town, village, river or hill." },
      { term: "-ham", meaning: "An Old English ending that often means a home or settlement." },
      { term: "-ton", meaning: "An Old English ending that often means an enclosed settlement or farm." },
      { term: "-ford", meaning: "An ending for a shallow place where a river can be crossed." },
      { term: "-bury", meaning: "An ending that can mean a fortified place." },
      { term: "scribe", meaning: "A person whose job was to write documents by hand." },
    ],
    before: "Year 3 pupils met Roman place names such as those ending in -chester only through Roman towns and roads, and practised using clues from the past.",
    next: "Year 6 Maps Through Time and Buildings and Streets as Evidence use street and place names in a local study.",
  },

  "sutton-hoo-and-anglo-saxon-art": {
    statutory: [SETTLEMENT],
    inBrief: "The Sutton Hoo ship burial in Suffolk, from the early AD 600s, held rich gold and garnet metalwork. It shows craft skill and wide contacts but describes only one very wealthy person's burial.",
    keyFacts: [
      "Sutton Hoo is a burial ground in Suffolk. Mound 1 held a ship about 27 metres long and a burial chamber, dated to the early AD 600s and found by Basil Brown in 1939 with Edith Pretty, the landowner, who gave the finds to the British Museum.",
      "Finds include a helmet, a purse lid, a sword and gold buckles with garnets and glass. The helmet was rebuilt from hundreds of fragments, so pictures show a reconstruction.",
      "Some objects came from far away, including Byzantine silver and coins from Frankish lands, so the East Anglian king's world had distant contacts.",
      "The person buried is not certain. Raedwald, king of East Anglia, who died about AD 624 to 625, is a possible candidate. No body survived in the acid soil.",
      "Boundary: skilled craft, a ship burial and what one rich grave can and cannot show. Burial rites and the Beowulf poem are not expected in detail.",
    ],
    misconceptions: [
      { mistake: "This shows how all Anglo-Saxons lived.", why: "Spectacular objects dominate museum displays.", response: "Contrast with village finds such as pots and postholes, and call the burial 'one very rich person'." },
      { mistake: "The helmet was found complete.", why: "Pictures show it whole.", response: "Explain that experts reassembled it from many small pieces, and our picture is a teaching drawing." },
      { mistake: "We know exactly who was buried there.", why: "Museums name a probable king confidently.", response: "Ask what evidence would settle it and use the words 'may' and 'perhaps'." },
    ],
    vocabulary: [
      { term: "ship burial", meaning: "A grave in which a person is buried in or with a ship." },
      { term: "garnet", meaning: "A deep red gemstone used to decorate metalwork." },
      { term: "excavate", meaning: "Dig carefully and record what is found." },
      { term: "reconstruction", meaning: "A rebuilt or redrawn version made from surviving pieces." },
      { term: "metalworker", meaning: "A craftworker who shapes metal into objects." },
      { term: "treasure", meaning: "Valuable objects, here often of gold and silver." },
    ],
    before: "Year 3 pupils studied Bronze and Iron Age metalwork and Skara Brae as evidence, and how archaeologists work (How We Know About Prehistory).",
    next: "Year 5 Sources and Interpretations returns to evidence and viewpoints. Year 6 local studies use finds as evidence.",
  },

  "saints-and-monasteries": {
    statutory: [SETTLEMENT],
    inBrief: "Christianity spread across Anglo-Saxon Britain through missions and monasteries, from Canterbury in the south and Iona and Lindisfarne in the north. Monks copied and decorated books by hand.",
    keyFacts: [
      "Augustine, sent by Pope Gregory the Great, arrived in Kent in AD 597 and was welcomed by King Aethelberht, who had a Christian wife. Canterbury became the main church.",
      "Columba, from Ireland, founded a monastery on Iona in AD 563. Aidan travelled from Iona to found Lindisfarne in AD 635 at King Oswald's invitation.",
      "A monastery was a community of monks or nuns who prayed, farmed, taught and copied books. Many people held older beliefs for a time, and conversion spread unevenly.",
      "The Lindisfarne Gospels, made about AD 700 to 720 and believed to be by Eadfrith, are written in Latin with decorated pages. They are in the British Library.",
      "Boundary: Augustine, Columba, Aidan and one decorated book as evidence. The Synod of Whitby and Roman versus Irish customs are not expected.",
    ],
    misconceptions: [
      { mistake: "Everyone became Christian at once when a king did.", why: "A story of one conversion sounds complete.", response: "Say rulers converted first and others over decades, and some kept older beliefs for a time." },
      { mistake: "Monks only prayed.", why: "Pupils picture silent monks and nothing else.", response: "List the jobs: farming, teaching, healing, copying books and welcoming travellers." },
      { mistake: "A page from the Gospels tells us what ordinary people believed.", why: "It is a beautiful and famous source.", response: "Say it shows what monks made, for religious reasons. Look for other evidence of everyday belief." },
    ],
    vocabulary: [
      { term: "monastery", meaning: "A community where monks live, pray and work together." },
      { term: "monk", meaning: "A man who gives his life to prayer and work in a religious community." },
      { term: "mission", meaning: "A journey made to spread a religion." },
      { term: "conversion", meaning: "Changing to a new religion." },
      { term: "Gospels", meaning: "The books telling the life of Jesus." },
      { term: "manuscript", meaning: "A book written by hand." },
    ],
    before: "In Year 3 pupils met early Christianity in Roman Britain (Roman Gods and Early Christianity).",
    next: "The Raid on Lindisfarne shows the Vikings attacking a monastery. Year 6 Jarrow and the Venerable Bede studies Bede's monastery in Anglo-Saxon times.",
  },

  // ---------------------------------------------------------------- Vikings and Anglo-Saxons
  "who-were-the-vikings": {
    statutory: [STRUGGLE],
    inBrief: "The Vikings were seafaring people from Scandinavia who raided, traded and settled. Most Scandinavians were farmers and craftworkers, and only some went raiding.",
    keyFacts: [
      "Viking-age people came from what are now Norway, Denmark and Sweden. They spoke Old Norse, and the word 'Viking' was best used for those who went on expeditions, not every Scandinavian.",
      "Longships used a square sail and oars and had shallow hulls, so they could cross seas and travel up rivers. Real ships have been excavated, such as Gokstad and Oseberg in Norway and Skuldelev in Denmark.",
      "Vikings raided, but they also traded, settled in new lands and farmed. Raids harmed people and communities, and sources about them were often written by victims.",
      "Vikings did not wear horned helmets in battle. That image comes from later art and opera.",
      "Boundary: origins, ships and the three activities of raiding, trading and settling. Vikings in Russia, Iceland and America and Norse religion are not expected.",
    ],
    misconceptions: [
      { mistake: "All Vikings were raiders who wore horned helmets.", why: "Cartoons and costumes show this image.", response: "Look at real finds. Tell them horned helmets are a later invention and most Scandinavians farmed or made things." },
      { mistake: "The Vikings came from Britain's neighbour Ireland.", why: "Both lie across the sea.", response: "Point to Scandinavia on a map. Trace sea routes to Britain." },
      { mistake: "A drawing of a longship proves what every ship looked like.", why: "A drawing looks authoritative.", response: "Use the excavated ships as evidence to check the drawing, and say ships varied in size and use." },
    ],
    vocabulary: [
      { term: "Viking", meaning: "A Scandinavian sea traveller of about AD 800 to 1050, who might raid, trade or settle." },
      { term: "Scandinavia", meaning: "The region of northern Europe including Norway, Sweden and Denmark." },
      { term: "longship", meaning: "A long, narrow Viking ship with a sail and oars." },
      { term: "raid", meaning: "A sudden attack, usually to steal." },
      { term: "trade", meaning: "Buying, selling or swapping goods." },
      { term: "settlement", meaning: "A place where people come to live." },
    ],
    before: "Year 3 pupils studied how peoples from outside Britain, the Romans, changed life here, and used evidence to learn about the past.",
    next: "The next topics follow raids, invasion, Jorvik and the English kings. Year 5 compares other societies and sources (Comparing Past Societies, Sources and Interpretations).",
  },

  "the-raid-on-lindisfarne": {
    statutory: [STRUGGLE],
    inBrief: "In AD 793 Vikings attacked the monastery on Lindisfarne, an island off Northumbria. Alcuin's letters show how shocked Christian communities were, and also show his viewpoint.",
    keyFacts: [
      "Lindisfarne was a rich and holy monastery with valuable objects. The Anglo-Saxon Chronicle gives the date in June AD 793. Other raids happened earlier, but this one became famous.",
      "The attackers killed some monks and took treasure. Some people were carried away to be sold as slaves. This should be stated plainly and briefly with this age group.",
      "Alcuin, a scholar from Northumbria who worked abroad at Charlemagne's court, was not an eyewitness. His letters, written to Northumbrian kings and church leaders, warn and advise.",
      "Alcuin and others wrote from a Christian viewpoint and few Viking accounts of this raid survive. Comparing accounts and finds gives a fuller picture.",
      "Boundary: the raid, why monasteries were targets and one source. Dating earlier raids and Viking motives are not expected.",
    ],
    misconceptions: [
      { mistake: "The raid was the start of the Viking invasion of England.", why: "It is the first famous date.", response: "Use the timeline: the raid in 793, the great army arriving in 865, and over seventy years between them." },
      { mistake: "Alcuin saw the raid himself.", why: "His letters sound like eyewitness cries.", response: "Ask 'Where was he?' and use his letters as news heard from far away, written to warn." },
      { mistake: "All Vikings were like the raiders.", why: "One violent event stands for a whole people.", response: "Say raiding harmed people, while trading and farming were different activities, as in Jorvik." },
    ],
    vocabulary: [
      { term: "monastery", meaning: "A community of monks who live and pray together." },
      { term: "Lindisfarne", meaning: "A small island off the north-east coast of England with a famous monastery." },
      { term: "scholar", meaning: "A person who studies and teaches." },
      { term: "viewpoint", meaning: "The way a person sees events, shaped by who they are." },
      { term: "eyewitness", meaning: "Someone who saw an event for themselves." },
      { term: "slave", meaning: "A person who is owned by another and forced to work without freedom." },
    ],
    before: "In Year 4 pupils studied how Aidan founded Lindisfarne (Saints and Monasteries). In Year 3 they compared sources of different kinds.",
    next: "The Great Viking Invasion follows. Year 5 Sources and Interpretations returns to viewpoint and reliability. Year 6 uses Bede's Jarrow.",
  },

  "the-great-viking-invasion": {
    statutory: [STRUGGLE],
    inBrief: "In AD 865 a large Viking army, called the Great Heathen Army, arrived and sought land and power. It conquered several kingdoms and led to the Danelaw.",
    keyFacts: [
      "The army landed in East Anglia in AD 865 and captured York in AD 866. East Anglia, Northumbria and much of Mercia fell. Wessex under Alfred did not.",
      "'Heathen' was what Christian writers such as the Anglo-Saxon Chronicle called non-Christians. We use the name because it is how the army is known.",
      "The army wanted land to settle and rule. Some leaders took kingdoms and settlers followed.",
      "The Danelaw is an area of northern and eastern England where Scandinavian law and customs were strong. The name was first used later, and the area was not a fixed national border.",
      "Boundary: the arrival, conquest, the Danelaw and settlement. The names of the leaders, such as Ivar and Halfdan, and the individual campaigns are not expected.",
    ],
    misconceptions: [
      { mistake: "The Danelaw was a separate country with a clear border.", why: "Maps draw one line.", response: "Say the boundary was agreed and moved, and that people of different backgrounds lived on both sides." },
      { mistake: "Every Anglo-Saxon was driven out of the Danelaw.", why: "Conquest sounds total.", response: "Say communities stayed and mixed with Scandinavian settlers. Look at place names with both Old English and Old Norse endings." },
      { mistake: "This invasion is the same event as the Lindisfarne raid.", why: "Both are Viking attacks.", response: "Place both on a timeline: 793 and 865 are over seventy years apart, and an invasion seeking land differs from a raid." },
    ],
    vocabulary: [
      { term: "invasion", meaning: "An army entering a country to take control of it." },
      { term: "Great Heathen Army", meaning: "The large Viking army that arrived in England in AD 865." },
      { term: "conquer", meaning: "Take over a place by force." },
      { term: "Danelaw", meaning: "The area of England where Scandinavian law and customs were strong." },
      { term: "settlement", meaning: "A place where people come to live." },
      { term: "kingdom", meaning: "Land ruled by a king." },
    ],
    before: "Year 3 pupils met the Claudian conquest, so they have seen another invasion and its effects. Year 4 pupils have just studied Anglo-Saxon kingdoms.",
    next: "Alfred the Great shows resistance. Year 6 Law and Order Before 1066 shows Viking influence on law.",
  },

  "viking-life-in-jorvik": {
    statutory: [STRUGGLE],
    inBrief: "Jorvik, the Viking name for York, was a busy trading town. Finds from Coppergate show everyday lives of craftworkers and traders.",
    keyFacts: [
      "York was a Roman and Anglo-Saxon town before the Vikings captured it in AD 866, and was renamed Jorvik. It remained a major trading town.",
      "The Coppergate dig of 1976 to 1981 found timber buildings and thousands of everyday objects such as combs, leather shoes and tools, preserved by waterlogged ground that kept wood and leather from rotting.",
      "Craftworkers worked with bone, antler, leather, metal and amber, and traders brought goods from distant places such as the Baltic and the eastern Mediterranean.",
      "Objects tell us about work and daily life, which written accounts often leave out because they concentrate on rulers. Objects cannot show what people thought.",
      "Boundary: Jorvik as a trading and craft town, and the value of everyday finds. The Jorvik Viking Centre and the detail of trade routes are not expected.",
    ],
    misconceptions: [
      { mistake: "Vikings only raided and never lived peacefully.", why: "The raid stories are the best known.", response: "Show the combs and shoes made by Jorvik's craftworkers as evidence of peaceful work." },
      { mistake: "Everything old is in a museum, so discarded things are useless as evidence.", why: "Rubbish seems worthless.", response: "Explain that people threw things away and that is how we find evidence of daily life." },
      { mistake: "The Vikings founded York.", why: "Jorvik sounds like a new town.", response: "Say York existed before and the Vikings renamed and expanded it." },
    ],
    vocabulary: [
      { term: "Jorvik", meaning: "The Viking name for York." },
      { term: "Coppergate", meaning: "The York street where archaeologists found Viking-age buildings and objects." },
      { term: "craftworker", meaning: "A person who makes things by skill." },
      { term: "trade", meaning: "Buying, selling or swapping goods." },
      { term: "waterlogged", meaning: "Soaked with water, which can preserve wood and leather." },
      { term: "excavation", meaning: "A careful dig that records what lies in the ground." },
    ],
    before: "In Year 3 pupils studied Roman towns and Skara Brae as evidence of daily life, and compared evidence types.",
    next: "Year 5 compares everyday life in Athens and Maya cities (Everyday Life in Athens). Year 6 uses buildings and streets as local evidence.",
  },

  "alfred-the-great": {
    statutory: [STRUGGLE],
    inBrief: "Alfred, king of Wessex from AD 871 to 899, resisted the Viking armies, won at Edington in AD 878, built defended towns and encouraged learning. He did not rule all England.",
    keyFacts: [
      "Alfred became king in AD 871, after the great army arrived. In AD 878 he won at Edington and made an agreement with the Viking leader Guthrum, who accepted Christian baptism.",
      "Burhs were fortified towns with garrisons across Wessex. A document called the Burghal Hidage lists about thirty, so Wessex could defend itself.",
      "Alfred encouraged learning and the use of English. His court had scholars, and works were translated from Latin into English. He also issued laws.",
      "The tale of Alfred and the burnt cakes appears in writing about two hundred years after his death. It is a legend that may carry a message, not evidence of an event.",
      "Boundary: Edington, burhs, learning and the legend as a source. The Treaty of Wedmore and the navy are not expected. He is called 'the Great', but he ruled Wessex and part of Mercia, not England.",
    ],
    misconceptions: [
      { mistake: "Alfred was king of England and drove the Vikings out.", why: "He is called 'the Great' and the tale is simple.", response: "Show on a map that he held Wessex while the Danelaw remained, and say Athelstan united England in AD 927." },
      { mistake: "The cakes story is a true record.", why: "It is the most famous Alfred story.", response: "Ask 'Who wrote it, and when?' and say a legend can still have a meaning without proving the event." },
      { mistake: "Alfred only fought battles.", why: "Battles dominate Viking stories.", response: "Add burhs, laws, schools and books as other ways he protected and strengthened his kingdom." },
    ],
    vocabulary: [
      { term: "Wessex", meaning: "The Anglo-Saxon kingdom of the south-west, ruled by Alfred." },
      { term: "Edington", meaning: "The battle Alfred won in AD 878." },
      { term: "burh", meaning: "A fortified Anglo-Saxon town." },
      { term: "legend", meaning: "A story told for a long time that may not be true." },
      { term: "contemporary", meaning: "From the same time as the event." },
      { term: "agreement", meaning: "A deal that both sides accept." },
    ],
    before: "In Year 3 pupils studied Boudica's resistance and the Roman conquest, and in Year 4 Wessex as a kingdom.",
    next: "Athelstan First King of England carries on the story. Year 5 Sources and Interpretations compares legend and evidence, and Year 6 Law and Order Before 1066 uses Alfred's laws.",
  },

  "athelstan-first-king-of-england": {
    statutory: [STRUGGLE],
    inBrief: "Athelstan, Alfred's grandson, took control of York in AD 927 and is remembered as the first king of England. Laws, agreements and coins backed his authority as well as force.",
    keyFacts: [
      "Athelstan was the son of Edward the Elder and the grandson of Alfred. Alfred's children, Edward and his sister Aethelflaed, had already won back much of the Danelaw.",
      "In AD 927 he took York, the last Viking kingdom, and rulers in Britain accepted his authority. He won the battle of Brunanburh in AD 937 and died in AD 939.",
      "'First king of England' is a traditional description. Historians note that England was later split again, and that he was more securely king of the English than of Britain.",
      "Coins carried his name and image, and charters and law codes recorded his authority. These sources give royal claims, not everyone's agreement.",
      "Boundary: AD 927, unification and how kings showed power. The details of Brunanburh and relations with Scotland are not expected.",
    ],
    misconceptions: [
      { mistake: "Alfred was the first king of England.", why: "Alfred is better known and called 'the Great'.", response: "Use the timeline: Alfred in 871 to 899 and Athelstan in 927, and show how Athelstan built on family work." },
      { mistake: "Once united, everyone in England had the same customs and laws.", why: "One king sounds like one country.", response: "Say local customs and the Danelaw's traditions continued, and rulers had to work with local leaders." },
      { mistake: "A coin proves everyone accepted the king.", why: "Coins look like official proof.", response: "Say a coin shows a king's claim, so compare it with charters and written accounts." },
    ],
    vocabulary: [
      { term: "unite", meaning: "Join separate parts into one." },
      { term: "authority", meaning: "The power to make decisions that others follow." },
      { term: "charter", meaning: "A written document, often recording a king's grant of land." },
      { term: "moneyer", meaning: "A craftworker who made coins for a king." },
      { term: "unification", meaning: "Bringing separate kingdoms together under one ruler." },
      { term: "grandson", meaning: "The son of your son or daughter." },
    ],
    before: "In Year 4 pupils met several kingdoms, and Alfred in Wessex. In Year 3 pupils studied how Rome ruled Britain as one province.",
    next: "Danegeld and King Cnut shows later invasion. Year 6 uses laws as a theme (Law and Order Before 1066).",
  },

  "danegeld-and-king-cnut": {
    statutory: [STRUGGLE],
    inBrief: "From the AD 990s English kings paid Danegeld to Viking armies hoping to stop attacks, but payments often brought only a pause. In AD 1016 Cnut became king of England.",
    keyFacts: [
      "Danegeld was silver paid to Viking forces. The Anglo-Saxon Chronicle records a payment in AD 991 after the Battle of Maldon, and larger sums followed, raised by taxes on ordinary people.",
      "Aethelred II, king from AD 978 to 1016, ruled during renewed attacks. His nickname 'Unready' is a pun on 'ill-advised', not 'unprepared'.",
      "Sweyn Forkbeard of Denmark conquered England in AD 1013, and his son Cnut became king in AD 1016. Cnut also ruled Denmark and Norway and died in AD 1035.",
      "Cnut and the tide is a legend written down about a century later. Its point is usually told as the limits of royal power, and it is not an eyewitness record.",
      "Boundary: payment, renewed attacks, Cnut's reign and legend as a source. The St Brice's Day massacre and the Danish succession are not expected.",
    ],
    misconceptions: [
      { mistake: "Cnut thought he could stop the sea and was foolish.", why: "A popular retelling says so.", response: "Say the older story shows him proving that only God commands the waves. Ask who wrote it and why." },
      { mistake: "Paying Danegeld solved the problem.", why: "Paying sounds like an end to trouble.", response: "Show that attacks returned and ordinary people had to find the money." },
      { mistake: "Cnut was a Viking raider who destroyed England.", why: "He came from Denmark.", response: "Say he ruled as a Christian king, kept English laws and worked with English leaders, while the conquest was violent." },
    ],
    vocabulary: [
      { term: "Danegeld", meaning: "Money paid to Viking forces to try to stop attacks." },
      { term: "tribute", meaning: "A payment made to a stronger ruler." },
      { term: "tax", meaning: "Money people must pay to a ruler." },
      { term: "Aethelred", meaning: "The English king during the renewed Viking attacks." },
      { term: "Cnut", meaning: "The Danish king who ruled England from AD 1016." },
      { term: "legend", meaning: "A story told for a long time that may not be true." },
    ],
    before: "In Year 4 pupils studied the Great Viking Invasion and Athelstan. In Year 3 they studied conquest by Rome, including paying tribute.",
    next: "Edward the Confessor follows. Year 6 law themes show Cnut's laws, and Year 5 compares legend and evidence.",
  },

  "anglo-saxon-laws-and-justice": {
    statutory: [STRUGGLE],
    inBrief: "Anglo-Saxon kings recorded laws, and communities settled disputes in meetings with oaths and compensation. Law reflected rank, and it relied on belief in God's judgement as well as evidence.",
    keyFacts: [
      "The earliest English laws were written for King Aethelberht of Kent around AD 600. Alfred, Athelstan and Cnut also issued laws, so kings recorded and added to older customs.",
      "A moot was a local meeting where disputes were heard. People swore oaths, a solemn promise to tell the truth, and could bring others to swear for them.",
      "Wergild was compensation paid to a victim's family, with a higher amount for someone of higher rank. This system aimed to stop endless feuds, and it treated people unequally.",
      "A trial by ordeal was a test, such as carrying hot iron, that people believed showed God's judgement. Say plainly that these were painful and that they are not fair by our standards.",
      "Boundary: laws, moots, oaths, wergild and ordeal explained gently. Details of punishments and the different law areas are not expected. A law shows what rulers wanted, not what always happened.",
    ],
    misconceptions: [
      { mistake: "Anglo-Saxon law was just random cruelty.", why: "Only the ordeal is well known.", response: "Show moots, oaths and compensation as systems to settle disputes, and explain ordeal as part of the beliefs of the time." },
      { mistake: "If a law was written, everyone obeyed it.", why: "Laws today are usually followed.", response: "Ask 'What can a law tell us, and what can it not?' and compare with accounts of real cases." },
      { mistake: "The law treated everyone equally.", why: "Fairness is the modern idea.", response: "Say the price in wergild depended on rank, and discuss why we think this unfair." },
    ],
    vocabulary: [
      { term: "law code", meaning: "A written list of rules issued by a ruler." },
      { term: "moot", meaning: "A meeting where local disputes were heard." },
      { term: "oath", meaning: "A solemn promise to tell the truth." },
      { term: "wergild", meaning: "Money paid to a victim's family, set by the victim's rank." },
      { term: "compensation", meaning: "Payment to make up for a harm." },
      { term: "ordeal", meaning: "A painful test thought to reveal God's judgement." },
    ],
    before: "In Year 3 pupils met Roman rules and governors, and Year 4 pupils have studied Alfred and Cnut as lawmakers.",
    next: "Year 6 Law and Order Before 1066 extends this, then Norman Law and the Forest, Magna Carta and Trial by Jury show the ordeal ending in 1215.",
  },

  "edward-the-confessor": {
    statutory: [STRUGGLE],
    inBrief: "Edward the Confessor was king of England from AD 1042 to 1066. He rebuilt Westminster Abbey, and his death without a child left uncertainty about who should rule.",
    keyFacts: [
      "Edward was the son of Aethelred and Emma of Normandy and spent years in exile in Normandy. He became king in AD 1042, after the sons of Cnut, and was crowned in 1043.",
      "He rebuilt Westminster Abbey, consecrated in December 1065. He died on 5 January 1066. The Abbey seen today was largely rebuilt in later centuries.",
      "'Confessor' means a holy man who confesses his faith. He was later declared a saint.",
      "He had no child. Harold Godwinson, William of Normandy and Harald Hardrada of Norway each claimed the throne. The sources do not agree about Edward's wishes.",
      "Boundary: rebuilding the abbey, death in AD 1066 and why succession was uncertain. Details of the claims and the Norman Conquest itself belong to Year 6 and later.",
    ],
    misconceptions: [
      { mistake: "Edward died in a battle, or William came straight after.", why: "1066 is linked with battles.", response: "Say Edward died peacefully in January 1066 and Harold became king. The Norman invasion came in the autumn." },
      { mistake: "A life of Edward gives a fair account of everyone's claims.", why: "It is the main source and sounds official.", response: "Say Queen Edith commissioned it. Ask what the author wants us to think and who is missing." },
      { mistake: "He was a failure because he had no child.", why: "Pupils judge by one fact.", response: "Say there were many causes of the crisis, including rival nobles. A cause is not the same as blame." },
    ],
    vocabulary: [
      { term: "succession", meaning: "The choosing of who rules next." },
      { term: "Westminster Abbey", meaning: "The royal church in London that Edward rebuilt." },
      { term: "consecrated", meaning: "Made holy in a church ceremony." },
      { term: "claim", meaning: "A person's case that they have a right to be king." },
      { term: "noble", meaning: "A powerful person with land, such as an earl." },
      { term: "commissioned", meaning: "Asked and paid someone to make something." },
    ],
    before: "In Year 4 pupils studied Cnut and Aethelred and Athelstan, so they know the kingdom Edward inherited.",
    next: "From Romans to 1066 summarises the story. Year 6 builds on 1066 with Norman Law and the Forest, and Year 5 Sources and Interpretations returns to viewpoint.",
  },

  "from-romans-to-1066": {
    statutory: [SETTLEMENT, STRUGGLE],
    inBrief: "This topic ties together about 650 years, from Roman withdrawal about AD 410 to 1066. Pupils order events, spot change and continuity, and compare different kinds of source.",
    keyFacts: [
      "Key dates: Roman rule ends about AD 410, Lindisfarne raid AD 793, the great army AD 865, Edington AD 878, Athelstan AD 927, Cnut AD 1016, Edward king AD 1042 and death AD 1066.",
      "Some things changed, such as rulers, kingdoms, religion and language. Some carried on, such as farming and the need for food and shelter.",
      "Different sources answer different questions: coins show authority, shoes show everyday life, laws show what rulers wanted and letters show a viewpoint. One source rarely answers everything.",
      "Timeline bands are labels, not equal lengths of time, and history was not tidy. Change came at different times in different places.",
      "Boundary: chronology, change and continuity, and comparing sources. William of Normandy's conquest later in 1066 is signposted, not taught here.",
    ],
    misconceptions: [
      { mistake: "Everything changed whenever a new ruler came.", why: "Stories are told through kings.", response: "Ask what a farmer would notice. Sort statements into changed and carried on." },
      { mistake: "The period from AD 410 to 1066 was a 'Dark Age' with nothing happening.", why: "Few written sources survive for the early centuries.", response: "Point to Sutton Hoo, the Lindisfarne Gospels and Alfred's learning and say the label is old-fashioned." },
      { mistake: "One source gives the whole truth.", why: "Pupils trust the most vivid source.", response: "Use the question 'Who made it, why and what is missing?' and compare two sources." },
    ],
    vocabulary: [
      { term: "chronology", meaning: "The order in which events happened." },
      { term: "change", meaning: "Something that is different from before." },
      { term: "continuity", meaning: "Something that carries on the same." },
      { term: "source", meaning: "Anything that gives us evidence about the past." },
      { term: "viewpoint", meaning: "The way a person sees events." },
      { term: "timeline", meaning: "A line showing events in date order." },
    ],
    before: "In Year 3 pupils did the same kind of summary in From Stone to Iron and How the Romans Changed Britain.",
    next: "Year 5 One Long Timeline orders events from Years 3 to 5 with BC and AD. Year 6 Norman Law and the Forest and Change and Continuity continue after 1066.",
  },
};
