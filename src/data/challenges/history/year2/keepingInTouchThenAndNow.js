import { story, choice as c, sort as s, order as o, topic } from "./authoring.js";
export const keepingInTouchThenAndNow = topic([
  "https://www.postalmuseum.org/collections/ — letters and postal history.",
  "https://www.sciencemuseum.org.uk/objects-and-stories — telephone collections and communication.",
], [
  [story(["Grandparents sent letters and used landline phones.", "Some used phone boxes away from home.", "Today, mobiles can make video calls.", "Letters and landlines are still used too."], "📞", "a landline telephone"), [
    c("What did grandparents send?", "letters", ["video calls by letter", "web pages by post"], "sent letters"),
    c("Which phone did grandparents use?", "a landline", ["only smartphones", "only video phones"], "landline phones"),
    c("Where could people phone away from home?", "a phone box", ["a letter box", "a bus stop sign"], "phone boxes away from home"),
    c("What can mobiles make today?", "video calls", ["paper letters", "steam"], "mobiles can make video calls"),
    c("Which older way is still used?", "letters", ["nothing older", "only phone boxes"], "Letters and landlines are still used"),
  ], [
    s("Which ways does Bix say grandparents used?", ["In the story", "Not in the story"], [["letters", 0], ["landlines", 0], ["phone boxes", 0], ["only smartphones", 1]], ["sent letters", "landline phones", "phone boxes"]),
    s("Sort the ways we keep in touch.", ["Written words", "Talking"], [["a letter", 0], ["a landline call", 1], ["a phone box call", 1], ["a video call", 1]], ["letters", "phones", "calls"]),
  ]],
  [story(["First, people sent letters long before telephones existed.", "Later, people used landlines and phone boxes.", "Much later, mobiles could make video calls.", "All these ways can help people keep in touch."], "✉️", "a letter"), [
    c("Which came before telephones?", "letters", ["mobile video calls", "phone boxes"], "letters long before telephones"),
    c("Which came much later?", "mobile video calls", ["letters", "the first landlines"], "Much later, mobiles"),
    c("What followed letters in Bix's story?", "landlines and phone boxes", ["video calls first", "no more talking"], "Later, people used landlines and phone boxes"),
    c("What does before mean?", "earlier", ["later", "at the same time"], "First", { rule: "Before means earlier. After means later." }),
    c("Why use these ways?", "to keep in touch", ["to stop all messages", "to travel by train"], "keep in touch"),
  ], [o("Oldest kind first, newest last.", ["letters", "landline phones", "mobile video calls"], ["First", "Later", "Much later"]),
    s("Before or after the first telephones?", ["Before", "After"], [["the first letters", 0], ["mobile video calls", 1], ["phone boxes", 1], ["mobile phones", 1]], ["letters long before telephones", "Later", "Much later"])]],
  [story(["An old letter is a source from the past.", "Its words can tell us what someone wrote.", "It cannot let us hear their voice.", "Ask a grown-up how they kept in touch as children."], "✉️", "an old letter"), [
    c("What kind of clue is an old letter?", "a source", ["a sound recording", "a video call"], "a source from the past"),
    c("What can its words tell us?", "what someone wrote", ["how their voice sounded", "everything they thought"], "what someone wrote"),
    c("What can a silent letter not tell us?", "how a voice sounded", ["the written words", "that someone wrote it"], "cannot let us hear their voice"),
    c("Who could tell you about childhood phone calls?", "a grown-up", ["a new phone box", "a blank envelope"], "Ask a grown-up"),
    c("Which question could you ask a grown-up?", "How did you keep in touch?", ["What colour is tomorrow?", "Can this letter talk?"], "how they kept in touch"),
    c("Which source would help us hear a voice?", "a sound recording", ["a silent letter", "a blank page"], "cannot let us hear their voice"),
    c("What time can an old letter help us learn about?", "the past", ["tomorrow", "next week"], "from the past"),
  ]],
  [story(["Letters carry written words, then and now.", "Landlines let people talk from a fixed place.", "Mobiles let people talk while away from home.", "Video calls let people see each other too.", "Keeping in touch matters in every time."], "📱", "a mobile phone"), [
    c("What do letters still carry?", "written words", ["live moving pictures", "spoken voices"], "Letters carry written words"),
    c("Which phone stays in a fixed place?", "a landline", ["a mobile", "a letter"], "Landlines", { hint: "Look for **fixed place** in Bix's story." }),
    c("Which phone helps away from home?", "a mobile", ["a fixed landline", "a postcard"], "Mobiles let people talk while away from home"),
    c("What extra thing does a video call do?", "lets people see each other", ["prints letters", "makes trains move"], "see each other too"),
    c("What matters in every time?", "keeping in touch", ["everyone having mobiles", "everyone using phone boxes"], "Keeping in touch matters"),
  ], [s("Words on paper or live talking?", ["Paper", "Live talking"], [["a letter", 0], ["a landline call", 1], ["a mobile call", 1], ["a video call", 1]], ["written words", "talk", "Video calls"]),
    s("Which calls let you see the other person?", ["Video call", "Voice only"], [["talking and seeing", 0], ["live moving pictures", 0], ["landline talking", 1], ["voice without pictures", 1]], ["Landlines let people talk", "Video calls let people see"])]],
]);
