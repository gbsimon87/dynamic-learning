import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const londonIn1666 = topic([
 "https://www.london-fire.gov.uk/museum/history-and-stories/the-great-fire-of-london/",
 "https://cdn.nationalarchives.gov.uk/documents/education/great-fire-of-london-examine-the-evidence.pdf",
], [
 l(["In 1666, many London houses had wooden frames.", "Houses stood close together on narrow streets.", "People used buckets and simple pumps to fight fires.", "There were no modern fire engines."], "🏘️", "houses close together", [
 ["What framed many houses?", "wood", "only steel", "only plastic", "wooden frames"],
 ["How close were the houses?", "close together", "always far apart", "on separate islands", "close together"],
 ["What were the streets like?", "narrow", "all motorways", "all very wide", "narrow streets"],
 ["What did people carry water in?", "buckets", "paper bags", "hats only", "buckets"],
 ["Which firefighting tool existed?", "simple pumps", "modern fire engines", "helicopters", "simple pumps"],
 ["Which belongs to firefighting today?", "modern fire engines", "only buckets", "no pumps at all", "no modern fire engines"],
 ], s("In London then, or absent then?", ["Then", "Absent then"], [["wooden frames",0],["narrow streets",0],["buckets",0],["modern fire engines",1]], ["wooden frames", "narrow streets", "buckets", "no modern fire engines"])),
 l(["First, London had many wooden houses close together.", "Next, the Great Fire burned many buildings.", "After the fire, people rebuilt many homes using brick.", "1666 labels the time of the fire."], "🧱", "bricks for rebuilding", [
 ["What came before rebuilding?", "the fire", "modern fire engines", "video calls", "Next, the Great Fire"],
 ["What were many early houses made with?", "wood", "plastic", "only steel", "wooden houses"],
 ["What happened next?", "many buildings burned", "London became a forest", "all houses floated away", "burned many buildings"],
 ["What did people do after the fire?", "rebuilt homes", "stopped building forever", "built only ships", "people rebuilt"],
 ["What material helped rebuild homes?", "brick", "paper", "straw only", "using brick"],
 ["What does 1666 label here?", "the time of the fire", "a house number", "the number of buckets", "time of the fire"],
 ], o("First, next, after: order London's story.", ["wooden houses stand close together", "the Great Fire burns buildings", "people rebuild using brick"], ["First", "Next", "After"])),
 l(["Old maps show London's streets before the fire.", "Written accounts describe wooden houses and buckets.", "A map shows where streets were.", "It cannot tell us people's voices.", "Using both sources helps us learn more."], "🗺️", "an old map", [
 ["Which source shows street positions?", "a map", "a song", "a bucket", "map shows where streets were"],
 ["What do written accounts describe?", "houses and buckets", "mobile apps", "electric cars", "wooden houses and buckets"],
 ["What cannot a map tell us?", "people's voices", "street positions", "where streets were", "cannot tell us people's voices"],
 ["When were the streets on these maps?", "before the fire", "tomorrow", "next year", "before the fire"],
 ["Why use both sources?", "to learn more", "to hide the past", "to hear the map speak", "helps us learn more"],
 ["Which is a written source?", "an account", "a bucket", "a pump", "Written accounts"],
 ["Which question suits an old map?", "Where was this street?", "How did this person sound?", "What did everyone think?", "where streets were"],
 ]),
 l(["Then, people fought fires with buckets and simple pumps.", "Today, firefighters use engines with hoses.", "Both use water to fight fires.", "Many new buildings use brick instead of wooden frames.", "People still need safe homes."], "🚒", "a fire engine", [
 ["Which tool does Bix name for then?", "buckets", "modern engines", "helicopters", "Then, people fought fires with buckets"],
 ["What do firefighters use today?", "engines with hoses", "only buckets", "paper bags", "Today, firefighters use engines"],
 ["What is the same?", "using water", "using only buckets", "having no tools", "Both use water"],
 ["Which material is used in many new buildings?", "brick", "paper", "ice", "new buildings use brick"],
 ["What do people still need?", "safe homes", "homes that burn easily", "no homes", "safe homes"],
 ["What changed in the firefighting story?", "the tools", "the need for safety disappeared", "water became paper", "buckets and simple pumps",],
 ], s("Sort Bix's firefighting tools.", ["Then", "Today"], [["buckets",0],["simple pumps",0],["fire engines",1],["engine hoses",1]], ["Then", "Today"])),
]);
