import { lesson, detective, sort, order, year5Topic } from "./authoring.js";
export const mayaNumbersAndTheCalendar = year5Topic(["https://www.worldhistory.org/Maya_Calendar/", "https://www.britannica.com/topic/Maya-calendar", "https://www.worldhistory.org/Maya_Civilization/"], [
  lesson("🔢", "Maya numbers", [
    ["The Maya wrote numbers with dots and bars.", "What did the Maya write numbers with?", "dots and bars", "letters", "tally ticks"],
    ["A dot means one.", "What does a dot mean?", "one", "five", "zero"],
    ["A bar means five.", "What does a bar mean?", "five", "one", "ten"],
    ["A shell means zero.", "What does a shell mean?", "zero", "twenty", "one"],
    ["The Maya counted in twenties.", "How did the Maya count?", "in twenties", "in tens only", "in twelves"],
    ["Seven is a bar and two dots.", "How is seven written?", "a bar and two dots", "two bars", "seven bars"]],
    sort("Dot, bar or shell?", ["Dot", "Bar", "Shell"], [["one", 0], ["five", 1], ["zero", 2]], ["dot means one", "bar means five", "shell means zero"]), false, "y5-maya-numbers"),
  lesson("🗓️", "The Maya calendars", [
    ["The Maya had a 260-day calendar for ceremonies.", "How long was the ceremonial calendar?", "260 days", "365 days", "52 days"],
    ["They also had a 365-day calendar for the farming year.", "How long was the farming-year calendar?", "365 days", "260 days", "52 days"],
    ["The two calendars together repeat every 52 years.", "After how many years did the two calendars repeat?", "52 years", "20 years", "260 years"],
    ["The Long Count numbered days from a starting day in 3114 BC.", "What did the Long Count do?", "numbered days from a start day", "named the kings", "counted ships"],
    ["Maya astronomers tracked Venus and the Moon.", "What did astronomers track?", "Venus and the Moon", "Greek ships", "Roman roads"],
    ["Many Long Count dates carved on stelae are from AD 250 to 900.", "When are many carved Long Count dates from?", "AD 250 to 900", "3114 to 2000 BC", "AD 1500 to 1900"]],
    order("Order the cycles, shortest first.", ["260-day calendar", "365-day calendar", "52-year cycle"], ["260-day", "365-day", "52 years"])),
  detective(["Our drawing shows Maya number signs.", "For bigger numbers, scribes stacked signs in layers.", "The shell sign stood for zero.", "The Maya were among the first people to use a zero.", "We know this from carved dates and from Maya books.", "Different Maya cities sometimes drew the signs in different styles.", "Our drawing is a simple example, not a real carving."],
    [
    ["What does our drawing show?", "Maya number signs", "Greek letters", "a Maya king", "Our drawing shows Maya number signs."],
    ["How did scribes write bigger numbers?", "stacked signs in layers", "used Roman letters", "drew one long line", "scribes stacked signs in layers"],
    ["What did the shell sign stand for?", "zero", "five", "twenty", "The shell sign stood for zero."],
    ["What were the Maya among the first to use?", "a zero", "a clock", "printed money", "among the first people to use a zero"],
    ["How do we know this?", "from carved dates and Maya books", "from Greek stories", "from modern guesses", "from carved dates and from Maya books"],
    ["How did signs differ between cities?", "in style", "in meaning completely", "they did not differ", "in different styles"],
    ["Is our drawing a real carving?", "no, it is a simple example", "yes, it is from Tikal", "yes, it is from Chichen Itza", "not a real carving"]], { scene: "y5-maya-numbers", picture: "🔢", pictureLabel: "Maya number signs" }),
  lesson("🤔", "Why numbers mattered", [
    ["Numbers helped the Maya measure time and plan farming.", "What did numbers help the Maya measure?", "time", "oceans", "armies"],
    ["Calendars helped priests choose days for ceremonies.", "What did calendars help priests choose?", "days for ceremonies", "new alphabets", "Olympic winners"],
    ["Dates on stelae helped kings claim their place in history.", "What did stela dates help kings do?", "claim their place in history", "hide events", "grow maize"],
    ["The Maya used base twenty, while we use base ten.", "What base did the Maya use?", "twenty", "ten", "two"],
    ["A zero is useful in our own numbers too.", "What is useful in our own numbers too?", "a zero", "a shell only", "a bar only"],
    ["Maya maths came from needs like farming, building and religion.", "Where did Maya maths come from?", "needs like farming, building and religion", "playing games only", "copying Greece"]],
    sort("Measuring time or counting?", ["Measuring time", "Counting system"], [["calendars", 0], ["dates", 0], ["base twenty", 1], ["zero", 1]], ["Calendars", "Dates", "base twenty", "zero"])),
]);
