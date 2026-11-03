import { lesson, detective, sort, order, year5Topic, MAYA_TIMELINE } from "./authoring.js";
export const mayaWritingAndBooks = year5Topic(["https://www.worldhistory.org/Maya_Writing/", "https://www.britannica.com/topic/Maya-writing", "https://www.britishmuseum.org/learn/schools"], [
  lesson("✍️", "Maya writing", [
    ["The Maya wrote in picture-signs called glyphs.", "What were Maya picture-signs called?", "glyphs", "letters", "runes"],
    ["Glyphs stood for words and for sounds.", "What did glyphs stand for?", "words and sounds", "only numbers", "only gods"],
    ["Scribes carved glyphs on stone and painted them on pots.", "Where did scribes put glyphs?", "on stone and pots", "only on paper", "only on ships"],
    ["They also made folding books from bark paper.", "What were Maya books made from?", "bark paper", "metal sheets", "clay tablets"],
    ["Only a few of these books survive today.", "How many books survive?", "only a few", "thousands", "none at all"],
    ["Spanish priests burned many Maya books in the 1500s.", "Who burned many Maya books?", "Spanish priests", "Roman soldiers", "Persian kings"]],
    sort("Stone and pots or books?", ["Stone and pots", "Books"], [["carved glyphs", 0], ["painted pots", 0], ["bark paper", 1], ["folding books", 1]], ["carved glyphs", "painted them on pots", "bark paper", "folding books"])),
  lesson("📅", "Maya writing through time", [
    ["The earliest Maya writing is from about 300 BC.", "When is the earliest Maya writing from?", "about 300 BC", "about AD 900", "about AD 1500"],
    ["Writing spread across Maya cities after AD 250.", "When did writing spread across cities?", "after AD 250", "after AD 1988", "before 2000 BC"],
    ["Dated stone monuments were carved from about AD 250 to 900.", "What was carved from AD 250 to 900?", "stone monuments with dates", "paper money", "Greek vases"],
    ["Spanish priests burned many books in the 1560s.", "Who burned many books in the 1560s?", "Spanish priests", "Roman soldiers", "Greek writers"],
    ["In the 1950s, Yuri Knorozov showed that glyphs stood for sounds.", "Who showed that glyphs stood for sounds?", "Yuri Knorozov", "Herodotus", "Pakal"],
    ["Today, experts can read most Maya glyphs.", "What can experts read today?", "most Maya glyphs", "no Maya glyphs", "only Greek writing"]],
    order("Order the events, oldest first.", ["First Maya writing · about 300 BC", "Writing spreads · after AD 250", "Books burned · 1560s", "Knorozov's idea · 1950s"], ["300 BC", "AD 250", "1560s", "1950s"]), MAYA_TIMELINE),
  detective(["Our drawing shows a folded Maya book with square signs.", "Real Maya books were painted on bark paper coated with plaster.", "Only four are well known.", "One survivor, the Dresden Codex, has tables about the planet Venus.", "Spanish priests burned many books, so we lost much of what they held.", "A priest named Landa wrote about Maya life but disliked their beliefs.", "So we must ask who wrote each account and why."],
    [
    ["What does our drawing show?", "a folded Maya book", "a Greek vase", "a stone stela", "a folded Maya book with square signs"],
    ["What were real books painted on?", "bark paper with plaster", "metal sheets", "wooden boards", "painted on bark paper coated with plaster"],
    ["How many well-known books survive?", "four", "four thousand", "none", "Only four are well known."],
    ["What does the Dresden Codex have tables about?", "the planet Venus", "Greek gods", "farm prices", "tables about the planet Venus"],
    ["Why have we lost so much knowledge?", "priests burned many books", "the Maya never wrote", "books were kept secret", "Spanish priests burned many books"],
    ["What did Landa think of Maya beliefs?", "he disliked them", "he loved all of them", "he shared them", "disliked their beliefs"],
    ["What must we ask about each account?", "who wrote it and why", "how long it is", "what colour it is", "who wrote each account and why"]], { scene: "y5-maya-glyphs", picture: "📖", pictureLabel: "A folded Maya book" }),
  lesson("🤔", "What writing did", [
    ["Writing helped Maya kings record their reigns.", "What did writing help kings do?", "record their reigns", "grow maize", "sail to Greece"],
    ["Scribes were important people and often came from royal families.", "Where did scribes often come from?", "royal families", "farming villages", "Greek ships"],
    ["Writing recorded dates, wars and family trees.", "What did writing record?", "dates, wars and family trees", "shopping lists only", "songs only"],
    ["Maya writing used glyphs, while the Greeks used an alphabet.", "What did the Greeks use instead of glyphs?", "an alphabet", "a number system", "a calendar"],
    ["Reading glyphs gave us a new view of Maya history.", "What did reading glyphs give us?", "a new view of Maya history", "no new facts", "a Roman map"],
    ["Before glyphs were read, some people thought the Maya were always peaceful.", "What did some people once think?", "that the Maya were always peaceful", "that the Maya were Romans", "that the Maya had no farms"]],
    sort("Maya or Greek writing?", ["Maya writing", "Greek writing"], [["glyphs", 0], ["scribes", 0], ["an alphabet", 1]], ["glyphs", "Scribes", "alphabet"])),
]);
