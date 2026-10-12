import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const williamCaxtonAndTimBernersLee = topic([
 "https://www.themorgan.org/exhibitions/william-caxton — printing in England in the 1470s.",
 "https://home.cern/science/computing/the-birth-of-the-web/where-web-was-born/",
], [
 l(["William Caxton brought printing to England long, long ago.", "His press made copies of books on paper.", "Much later, Tim Berners-Lee invented the World Wide Web.", "Web pages link information on computers.", "Both helped people share words."], "📰", "a printed page", [
 ["What did Caxton bring to England?","printing","video calls","electric trains","brought printing to England"],
 ["What did his press make?","copies of books","mobile phones","steam trains","copies of books"],
 ["What were the books printed on?","paper","computer screens","ice","on paper"],
 ["What did Tim invent?","the World Wide Web","all of the internet","the printing press","invented the World Wide Web"],
 ["What do web pages link?","information","only railway tracks","only paper sheets","link information"],
 ["What did both help people share?","words","only food","only clothes","share words"],
 ], s("Caxton's press or Tim's web?", ["Printing press","World Wide Web"], [["paper books",0],["printed copies",0],["linked web pages",1],["information on computers",1]], ["press made copies of books on paper", "Web pages link information on computers"])),
 l(["First, many books were copied by hand.", "Later, Caxton's press printed books in England.", "Much later, Tim made the World Wide Web.", "Today, people still read printed books and web pages."], "📚", "books", [
 ["How were many books copied first?","by hand","by smartphones","by web pages","copied by hand"],
 ["Which came after hand copying?","Caxton's printed books","the first mobile apps","the web first","Later, Caxton's press"],
 ["Which came much later?","the World Wide Web","hand copying","Caxton's first press","Much later, Tim"],
 ["Do printed books still exist today?","yes, people still read them","no, all vanished","only in space","still read printed books"],
 ["What else do people read today?","web pages","only blank screens","only clay walls","web pages"],
 ["Which person belongs to the earlier story?","Caxton","Tim Berners-Lee","both at the same time","Later, Caxton's press"],
 ], o("Order ways of sharing words, oldest first.", ["books copied by hand", "Caxton's printed books", "Tim's World Wide Web"], ["First", "Later", "Much later"])),
 l(["An old printed page is a source from Caxton's time.", "Its letters show printing on paper.", "A web page shows linked information on a screen.", "Neither page alone tells us every reader's thoughts.", "A drawing of Tim is an illustration, not a photo."], "🖥️", "a computer screen", [
 ["What can an old printed page be?","a source from Caxton's time","a sound recording","a modern mobile call","source from Caxton's time"],
 ["What do its letters show?","printing on paper","a spoken voice","electric power","printing on paper"],
 ["Where can a web page appear?","on a screen","only on a stone wall","only in a bucket","on a screen"],
 ["What cannot either page alone tell us?","every reader's thoughts","visible words","that it contains information","every reader's thoughts"],
 ["What is a drawing of Tim?","an illustration","a photo of his time","a voice recording","an illustration, not a photo"],
 ["What does a web page show?","linked information","only unprinted paper","train sounds","linked information"],
 ["Which question suits a printed page?","What words are printed here?","What did every reader think?","What did all voices sound like?","Its letters"],
 ]),
 l(["Caxton's press shared words in paper books.", "Tim's web shares linked pages on computers.", "Both helped more people find information.", "Books and web pages still exist together.", "Printing and the web are different ways to share."], "📖", "an open book", [
 ["How did Caxton share words?","paper books","mobile video calls","electric train signs only","paper books"],
 ["How does the web share pages?","on computers","only by post","only on stone","on computers"],
 ["What did both help people find?","information","only medicines","only bus seats","find information"],
 ["Which still exists today?","both books and web pages","only web pages","no books or web pages","still exist together"],
 ["What is different between these inventions?","ways to share","neither shares words","both are the same machine","different ways to share"],
 ["Who is linked to printing in England?","Caxton","Rosa Parks","Edith Cavell","Caxton's press"],
 ], s("Paper book or web page?", ["Paper book","Web page"], [["printed paper",0],["pages in a printed book",0],["linked screen pages",1],["pages on a computer",1]], ["paper books", "linked pages on computers"])),
]);

williamCaxtonAndTimBernersLee.levels[3].story.scene = "sharing";
for (const question of williamCaxtonAndTimBernersLee.banks.facts3) question.visual = { type: "scene", scene: "sharing" };
