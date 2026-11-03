import { ch, od, st, nm, some } from "../topicBank.js";
import { shuffle } from "../year1Math/shared.js";
import { int, pick, times, showing, termTopic } from "./shared.js";

/* ====================================================================
   Computer networks
   ==================================================================== */
export const networks = termTopic({
  subject: "networks",
  rule: "A network is a group of computers and devices joined together so they can share things. Cables or Wi-Fi join them. A server stores things and sends them out, and a client asks a server for what it needs.",
  hint: "Think about what the thing does: does it store, join, send or ask?",
  terms: [
    ["network", "any group of devices joined together so they can share data"], ["server", "a powerful computer that stores things and sends them to other computers"],
    ["client", "a computer or tablet that asks a server for something"], ["router", "a device that sends data from one network to another"],
    ["switch", "a device that joins the computers inside the same network"], ["Wi-Fi", "a way to join a network without wires, using radio waves"],
    ["Ethernet cable", "a wire that plugs into a device to join it to a network"], ["LAN", "a local area network, such as the computers in one school"],
    ["WAN", "a wide area network that covers a large area, such as a whole country"], ["internet", "a huge network of networks joined all over the world"],
    ["data", "information that a computer stores and sends"], ["port", "a socket where a cable plugs into a device"],
  ],
  apart: [["network", "LAN"], ["network", "WAN"], ["network", "internet"], ["LAN", "WAN"]],
  facts: [
    ch("What can the computers on a school network share?", "Files and a printer", ["The weather", "Their batteries", "Their screens' colours"]),
    ch("What joins computers in a network?", "Cables or Wi-Fi", ["Glue", "Paper", "Pens"]),
    ch("What is the main job of a server?", "To store things and send them to other computers", ["To be a keyboard", "To switch the lights on", "To print photos"]),
    ch("Which is a client?", "A tablet asking for a web page", ["A computer that stores the web page", "A cable", "A router"]),
    ch("Which network is the biggest?", "The internet", ["A LAN in one school", "A tablet", "Two computers joined together"]),
    ch("Which can join a laptop to a network with no cable at all?", "Wi-Fi", ["An Ethernet cable", "A port", "A switch"]),
  ],
  sorts: [
    st("Does it use a wire or no wire to join a network?", ["Wired", "Wireless"], [["Ethernet cable", 0], ["A cable plugged into a port", 0], ["A computer plugged into a switch", 0], ["Wi-Fi", 1], ["A tablet on the school Wi-Fi", 1], ["A phone joining Wi-Fi at home", 1]]),
    st("Is it a client or a server?", ["Client", "Server"], [["A tablet asking for a web page", 0], ["A phone asking for a video", 0], ["A laptop asking for a school file", 0], ["A computer that stores a website", 1], ["A computer that holds the school files", 1], ["A computer that sends videos out", 1]]),
    st("How big is the network?", ["Small: one place", "Huge: all over the world"], [["A LAN in one classroom", 0], ["A home Wi-Fi network", 0], ["Computers in one school", 0], ["The internet", 1], ["Networks joined across countries", 1], ["The network of all networks", 1]]),
  ],
  builds: [
    "A router joins one network to another.", "A server stores web pages and sends them out.", "Wi-Fi joins devices without any wires.", "A cable plugs into a port.",
    "A LAN covers one building.", "The internet is a network of networks.", "Computers in a network can share files.", "A client asks a server for information.",
    "A switch joins the computers in a school.", "Data travels along cables or through the air.",
  ],
  orders: [
    od("Put these in order when you open a school web page on a tablet.", ["The tablet asks a server for the page", "The request travels through the network", "The server sends the page back", "The page appears on the tablet"]),
    od("Put the networks in order, from smallest to biggest.", ["One tablet", "A school LAN", "A national WAN", "The internet"]),
  ],
  scenes: [
    ch("A school wants every classroom to share one printer. What does it need?", "A network", ["A bigger screen", "More paper", "A faster keyboard"]),
    ch("Your tablet shows a web page. Which computer sent the page?", "A server", ["A printer", "A keyboard", "A switch"]),
    ch("Which device passes data from the school network out to the internet?", "A router", ["A mouse", "A speaker", "A scanner"]),
    ch("You plug a cable into the back of a computer. Where does it go?", "Into a port", ["Into the screen", "Into the keyboard keys", "Into the mouse mat"]),
    ch("A pupil works on a shared file at the same time as a friend at home. What does this show?", "Networks let people collaborate", ["Networks make files smaller", "Networks stop people sharing", "Networks are only for printers"]),
    ch("A class talks live to pupils in another country by video. What do networks help with here?", "Communication", ["Painting", "Printing", "Cooking"]),
    ch("Which is a LAN?", "The computers in one school", ["All the computers in the world", "One computer on its own", "A television"]),
    ch("Why does a school have a switch?", "To join its computers together", ["To make the lights switch on", "To store the web", "To print pictures"]),
  ],
  gens: {
    2: [
      ch("A tablet has no cable but is on the internet. What does it most likely use?", "Wi-Fi", ["An Ethernet cable", "A switch", "A port only"]),
      ch("Two classrooms need to share files. What joins them?", "A network", ["A pen", "A speaker", "A clock"]),
    ],
    4: times(3, () => (rng) => { const ports = pick(rng, [8, 16, 24]); const used = int(rng, 3, ports - 2); return nm(`A switch has ${ports} ports. ${used} of them have cables plugged in. How many ports are free?`, ports - used); }),
  },
});

/* ====================================================================
   How data travels
   ==================================================================== */
const ipText = (parts) => parts.join(".");
const validIp = (rng) => ipText(Array.from({ length: 4 }, () => int(rng, 0, 255)));
const badIp = (rng) => {
  const kind = int(rng, 0, 2);
  const parts = Array.from({ length: 4 }, () => int(rng, 0, 255));
  if (kind === 0) parts[int(rng, 0, 3)] = int(rng, 256, 999);
  if (kind === 1) return ipText(parts.slice(0, 3));
  if (kind === 2) return `${ipText(parts.slice(0, 3))}.${String.fromCharCode(97 + int(rng, 0, 25))}`;
  return ipText(parts);
};

export const dataTravel = termTopic({
  subject: "how data travels",
  rule: "Before data travels across a network it is cut into small pieces called packets. Each packet has an address on it. Routers pass the packets along, and they may take different routes. At the end, the packets are put back in the right order.",
  hint: "Picture a message cut into pieces, sent with addresses, and put back together at the end.",
  terms: [
    ["packet", "a small piece of a message sent across a network"], ["IP address", "a number that identifies a device on a network"],
    ["router", "a device that passes packets along towards where they are going"], ["route", "the path that a packet takes"],
    ["destination", "the place a packet is going to"], ["reassemble", "to put packets back together in the right order"],
    ["sender", "the device that sends data"], ["receiver", "the device that gets the data"],
    ["protocol", "a set of rules that computers follow to send data"], ["domain name", "a name such as bbc.co.uk that stands for an IP address"],
    ["DNS", "the internet's phone book, which turns names into numbers"],
  ],
  facts: [
    ch("What is a message cut into before it travels across a network?", "Packets", ["Pictures", "Passwords", "Pages"]),
    ch("Why does each packet have an address on it?", "So routers know where to send it", ["To make it look nice", "To make it heavier", "To keep it secret"]),
    ch("Can two packets from the same message take different routes?", "Yes", ["No, never", "Only on Mondays", "Only inside one computer"]),
    ch("What happens to the packets when they arrive?", "They are put back in order", ["They are thrown away", "They are painted", "They are printed"]),
  ],
  sorts: [
    st("Is it an IP address or a domain name?", ["IP address", "Domain name"], [["192.168.0.1", 0], ["10.0.0.7", 0], ["172.16.4.2", 0], ["www.bbc.co.uk", 1], ["school.org.uk", 1], ["www.nasa.gov", 1]]),
    st("Does this happen at the sender or at the receiver?", ["At the sender", "At the receiver"], [["Cut the message into packets", 0], ["Put an address on each packet", 0], ["Send the packets out", 0], ["Put the packets back in order", 1], ["Read the whole message", 1], ["Check that every packet arrived", 1]]),
    st("Is it a job for the router or for the sender?", ["Router", "Sender"], [["Pass a packet along", 0], ["Choose the next step of the route", 0], ["Read the address on a packet", 0], ["Write the message", 1], ["Press send", 1], ["Choose who gets it", 1]]),
  ],
  builds: [
    "A message is split into small packets.", "Each packet carries an address.", "Routers pass packets along the best route.", "Packets can take different routes.",
    "The packets are put back in order at the end.", "An IP address identifies a device.", "Packets arrive at their destination.", "The receiver reassembles the message.",
    "Routers read the address on each packet.", "Names are easier to remember than numbers.",
  ],
  orders: [
    od("Put these in order when you send a photo to a friend.", ["The photo is cut into packets", "Each packet gets an address", "Routers pass the packets along", "The packets arrive and are put in order"]),
    od("Put these in order when you visit a website.", ["You type a web address", "The name is turned into an IP address", "The request travels to the server", "The page comes back as packets"]),
  ],
  scenes: [
    ch("Two packets from one message arrive in the wrong order. What does the receiver do?", "Puts them back in order", ["Deletes them", "Sends them back to the start", "Colours them in"]),
    ch("One route is blocked. What can packets do?", "Take a different route", ["Wait for ever", "Disappear", "Turn into letters"]),
    ch("Which is easier for a person to remember?", "A domain name like school.org.uk", ["A number like 203.0.113.42", "Every packet's number", "The path of a packet"]),
    ch("What does DNS do?", "It turns a name into an IP address", ["It cuts messages into packets", "It joins two cables", "It prints web pages"]),
    ch("Why is a message cut into packets?", "So many small pieces can travel by different routes", ["So it takes longer", "So nobody can read it", "So it looks smaller on screen"]),
  ],
  gens: {
    1: times(5, () => (rng) => {
      const right = validIp(rng);
      return ch("Which of these looks like an IP address? It has four numbers from 0 to 255 with dots between them.", right, [badIp(rng), badIp(rng), badIp(rng)].filter((x, i, all) => all.indexOf(x) === i && x !== right));
    }),
    2: times(2, () => (rng) => {
      const wrong = badIp(rng); const parts = wrong.split(".");
      const why = parts.length < 4 ? "It only has three numbers" : parts.some((p) => !/^\d+$/.test(p)) ? "One part is a letter, not a number" : "One number is bigger than 255";
      return ch(`Why is ${wrong} not a real IP address?`, why, ["It has dots in it", "Its numbers are too small", "It is too short to read"].filter((x) => x !== why).concat(["It has too many dots"]).slice(0, 3));
    }),
    4: times(6, () => (rng) => { const per = pick(rng, [100, 250, 500]); const packets = int(rng, 3, 12); return nm(`A file of ${per * packets} KB is sent. Each packet holds ${per} KB. How many packets are needed?`, packets); }),
  },
});

/* ====================================================================
   The internet and the web
   ==================================================================== */
export const internetAndWeb = termTopic({
  subject: "the internet and the web",
  rule: "The internet is the huge network of cables, routers and computers. The World Wide Web is one service that runs on it: web pages and websites that you visit with a browser. Email, video calls and online games are other services on the internet.",
  hint: "Ask: is it a web page you open in a browser, or another way to use the internet?",
  terms: [
    ["internet", "the huge network of cables, routers and computers joined across the world"], ["World Wide Web", "the collection of web pages and websites you visit with a browser"],
    ["website", "a group of web pages that belong together"], ["web page", "one single page on the web, such as an article"],
    ["browser", "the program you use to visit web pages"], ["URL", "the address of a web page"],
    ["email", "messages sent from one person to another over the internet"], ["video call", "talking and seeing each other live over the internet"],
    ["hyperlink", "a link that takes you from one web page to another"], ["download", "to copy a file from the internet onto your device"],
    ["upload", "to send a file from your device to the internet"], ["online game", "a game you play with other people over the internet"],
  ],
  apart: [["internet", "World Wide Web"], ["website", "web page"], ["download", "upload"]],
  facts: [
    ch("Which is part of the internet but is not the World Wide Web?", "Email", ["A website", "A web page", "A hyperlink"]),
    ch("What do you use to open a web page?", "A browser", ["A printer", "A speaker", "A scanner"]),
    ch("Which one runs on the internet?", "The World Wide Web", ["A pencil", "A television aerial only", "A battery"]),
    ch("What does clicking a hyperlink do?", "It takes you to another web page", ["It turns the computer off", "It prints the page", "It deletes the page"]),
  ],
  sorts: [
    st("Is it the web, or another internet service?", ["The web: a website", "Another internet service"], [["Looking at a school website", 0], ["Reading a page in an online encyclopedia", 0], ["Opening a recipe page in a browser", 0], ["Sending an email", 1], ["A video call with Gran", 1], ["Playing an online game with friends", 1]]),
    st("Is it a download or an upload?", ["Download", "Upload"], [["Saving a photo from a website", 0], ["Getting a game onto a tablet", 0], ["Copying a song to your device", 0], ["Sending your homework file to a teacher", 1], ["Posting a video you made", 1], ["Adding a photo to a shared album", 1]]),
    st("Does it help people to communicate or to collaborate?", ["Communicate: share messages", "Collaborate: work together"], [["Emailing Gran", 0], ["A video call with a friend", 0], ["A chat message", 0], ["Writing a story together in one shared document", 1], ["Adding slides to a shared presentation", 1], ["A class editing one poster at the same time", 1]]),
  ],
  builds: [
    "The web is a service that runs on the internet.", "A browser opens web pages.", "A URL is the address of a web page.", "Email is a different service from the web.",
    "A hyperlink jumps to another page.", "The internet joins networks across the world.", "A website has many web pages.", "People can collaborate on shared documents.",
    "A video call lets friends talk live.", "You download a file from the internet.",
  ],
  orders: [
    od("Put these in order when you visit a website.", ["You type the URL into the browser", "The browser asks the server for the page", "The server sends the page", "The browser shows the page"]),
    od("Put these in order from the smallest to the biggest.", ["A web page", "A website", "The World Wide Web"]),
  ],
  scenes: [
    ch("Aisha sends an email to her aunt. Is that the World Wide Web?", "No, it is another internet service", ["Yes, all of the internet is the web", "Yes, it is a website", "No, it is not on the internet"]),
    ch("Jack reads a news page in his browser. Which is he using?", "The World Wide Web", ["Only email", "Only a video call", "No network at all"]),
    ch("Which has more in it: the internet or the World Wide Web?", "The internet", ["The World Wide Web", "They are exactly the same", "Neither has anything in it"]),
    ch("A class edits one story together from different homes. What is this?", "Collaboration", ["A download only", "A printer job", "A power cut"]),
    ch("Maya wants to see her cousin live on a screen. What should she use?", "A video call", ["An email", "A printer", "A hyperlink"]),
    ch("Which part of a web address tells you the page, such as https://school.org.uk/news?", "The whole address is the URL", ["Only the dot", "Only the s", "Nothing"]),
    ch("A pupil puts a photo into a shared school album. What is that?", "An upload", ["A download", "A hyperlink", "A browser"]),
    ch("A pupil saves a worksheet from the school website. What is that?", "A download", ["An upload", "A video call", "A web page"]),
  ],
  gens: {
    2: [
      ch("You send a message that Gran reads in her email. Which service is that?", "Email", ["The web", "A browser", "A hyperlink"]),
      ch("You open a page on a museum site. Which service is that?", "The web", ["Email", "A video call", "An online game"]),
    ],
  },
});

/* ====================================================================
   Using search engines
   ==================================================================== */
// [goal, the best search, three worse ones]
const GOALS = [
  ["Find out how tall Mount Everest is", "Mount Everest height", ["mountain", "how tall is everything in the whole world please", "Everest"]],
  ["Find a pancake recipe with no eggs", "eggless pancake recipe", ["food", "pancake", "eggs"]],
  ["Find photos of the planet Saturn", "Saturn planet photos", ["space", "planets and stars", "look at things"]],
  ["Learn how volcanoes erupt", "how volcanoes erupt", ["volcano", "hot", "I want to know about volcanoes and other things"]],
  ["Find the capital city of Spain", "capital city of Spain", ["Spain", "cities", "capital"]],
  ["Find out when the Romans left Britain", "when did the Romans leave Britain", ["Romans", "history", "Britain Romans Italy Rome Caesar swords"]],
  ["Find a picture of a red panda", "red panda picture", ["animal", "panda", "red"]],
  ["Find a free game to practise times tables", "times tables game for kids", ["games", "maths", "tables"]],
  ["Find the top speed of a cheetah", "cheetah top speed", ["cheetah", "fast", "animals"]],
  ["Find the weather in London tomorrow", "London weather tomorrow", ["weather", "tomorrow", "rain"]],
];
const GOOD_SEARCHES = ["Mount Everest height", "cheetah top speed", "London weather tomorrow", "red panda picture", "capital city of Spain"];
const POOR_SEARCHES = ["animals", "weather", "things", "how do I find out some stuff about space please", "mountain"];

export const searching = termTopic({
  subject: "searching",
  rule: "A search engine finds web pages that match the words you type. Choose clear keywords: the important words, with enough detail to be specific. Short, exact searches usually work better than long chatty ones or single, very general words.",
  hint: "Pick the important words and leave out words like 'please' and 'how do I'. Add detail so the search is specific.",
  terms: [
    ["search engine", "a website that finds web pages for the words you type"], ["keyword", "an important word you type into a search"],
    ["query", "the words you type into a search engine"], ["results", "the list of pages that the search engine finds"],
    ["filter", "a setting that narrows the results, such as images only"], ["specific", "clear and exact, not too general"],
    ["quotation marks", "marks put around words to search for that exact phrase"], ["autocomplete", "suggestions that appear as you type a search"],
    ["image search", "a search that shows pictures instead of web pages"], ["general", "wide and not exact, so it gives far too many results"],
  ],
  apart: [["specific", "general"], ["keyword", "query"]],
  facts: GOALS.map(([goal, best, wrong]) => ch(`${goal}. Which search is best?`, best, wrong)),
  sorts: [
    st("Is it a good search or a poor search?", ["Good: clear and specific", "Poor: too general or chatty"], [...GOOD_SEARCHES.map((x) => [x, 0]), ...POOR_SEARCHES.map((x) => [x, 1])]),
    st("Is it a keyword or just a filler word?", ["Keyword", "Filler word"], [["Everest", 0], ["volcano", 0], ["recipe", 0], ["Saturn", 0], ["please", 1], ["the", 1], ["a", 1], ["some stuff", 1]]),
    st("Would this narrow the search or make it wider?", ["Narrows the search", "Makes it wider"], [["Adding a place name", 0], ["Adding a year", 0], ["Using quotation marks", 0], ["Using a filter", 0], ["Using fewer keywords", 1], ["Using only one general word", 1]]),
  ],
  builds: [
    "Choose clear keywords for your search.", "Specific words give better results.", "A search engine lists web pages for you.", "Check more than one result.",
    "Put quotation marks around an exact phrase.", "Filters can narrow your results.", "Short and clear searches work best.", "Read the page before you trust it.",
    "Change your keywords if the results are poor.", "The first result is not always the best.", "Use an image search to find pictures.",
  ],
  orders: [
    od("Put these steps of a search in order.", ["Think about what you want to find", "Choose your keywords", "Type them in and search", "Read the results"]),
    od("Put these steps in order when a search finds far too much.", ["Look at the results", "Notice there are too many", "Add a more specific keyword", "Search again"]),
  ],
  scenes: [
    ch("You search for 'dog' and get millions of results about everything. What should you do?", "Add more specific keywords", ["Search for 'dog' again", "Search for 'a'", "Give up"]),
    ch("Which keywords would help you learn how bees make honey?", "how bees make honey", ["bees", "honey", "insects and food"]),
    ch("The search engine suggests words as you type. What is this called?", "Autocomplete", ["A filter", "A download", "A router"]),
    ch("You only want pictures of castles. Which setting helps?", "An image search", ["A louder speaker", "A longer password", "A bigger screen"]),
    ch("You want the exact phrase 'blue whale'. What can you put around it?", "Quotation marks", ["Brackets", "Stars", "Hearts"]),
    ch("The first result is an advert for something. Is it always the best answer?", "No, you still need to check", ["Yes, always", "Yes, if it is first", "It is always wrong"]),
  ],
  gens: {
    2: times(4, () => (rng) => {
      const n = pick(rng, [12, 17, 23, 25, 34, 38, 41, 47]); const per = 10;
      const page = Math.ceil(n / per);
      return ch(`The search engine shows ${per} results on each page. Which page has result number ${n}?`, `Page ${page}`, some(rng, [1, 2, 3, 4, 5].filter((p) => p !== page), 3).map((p) => `Page ${p}`));
    }),
    4: times(4, () => (rng) => { const per = pick(rng, [10, 20]); const n = int(rng, 2, 9) * per - int(rng, 1, per - 1); return nm(`The search engine shows ${per} results on each page. On which page is result number ${n}?`, Math.ceil(n / per)); }),
  },
});

/* ====================================================================
   How results are ranked
   ==================================================================== */
const PAGE_NAMES = ["Page A", "Page B", "Page C", "Page D"];
const score = (p) => p.keywords * 2 + p.links;
const makePages = (rng, count) => {
  const scores = new Set(); const pages = [];
  for (let tries = 0; tries < 200 && pages.length < count; tries += 1) {
    const p = { name: PAGE_NAMES[pages.length], keywords: int(rng, 0, 6), links: int(rng, 0, 9) };
    if (!scores.has(score(p))) { scores.add(score(p)); pages.push(p); }
  }
  return pages;
};
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
const pageLine = (p) => `${p.name}: ${plural(p.keywords, "keyword match").replace("matchs", "matches")}, ${plural(p.links, "link")}`;

export const ranking = termTopic({
  subject: "ranking search results",
  rule: "A search engine ranks results: it puts the pages it thinks are best at the top. It looks at how well a page matches your keywords, how many other pages link to it, and more. Adverts marked 'sponsored' are paid for, so they are not ranked by how good they are.",
  hint: "Work out each page's score, then put the biggest first. For adverts, remember that someone paid.",
  terms: [
    ["ranking", "putting search results in an order, best first"], ["relevant", "closely matching what you searched for"],
    ["popular", "linked to or visited by lots of people"], ["sponsored", "an advert that a company paid to show"],
    ["algorithm", "the steps a search engine follows to order its results"], ["link", "a connection from one web page to another"],
    ["snippet", "the short preview of a page shown under its title"], ["position", "the place a result has in the list"],
  ],
  apart: [["relevant", "popular"]],
  facts: [
    ch("Which helps a page appear higher in the results?", "Many other pages link to it", ["Its name is long", "It has a red background", "It was written on a Monday"]),
    ch("What does 'sponsored' next to a result mean?", "A company paid to show it", ["It is the most true", "It is the newest", "A teacher chose it"]),
    ch("Does the top result always mean the page is the most trustworthy?", "No, you still need to check", ["Yes, always", "Yes, if it has pictures", "Only on weekends"]),
    ch("Why might two people see different results for the same search?", "Things like where they are can change the results", ["Search engines pick at random", "Computers cannot count", "Their screens are different colours"]),
    ch("What does a search engine look for first?", "Pages that match your keywords", ["Pages with the longest names", "Pages with no words", "Pages that are blank"]),
    ch("Why do popular pages often rank higher?", "Many pages link to them", ["They are bigger files", "They use bold writing", "They load slowly"]),
    ch("A page uses your keyword 5 times and another uses it 0 times. Which is likely to rank higher?", "The page that uses it 5 times", ["The page that uses it 0 times", "They always tie", "Neither can rank"]),
    ch("What does a search engine do with the pages it finds?", "Puts them in an order", ["Deletes them", "Paints them", "Prints them"]),
    ch("Which is more likely to be near the top?", "A page that matches your keywords", ["A page that does not match at all", "A blank page", "A page picked at random"]),
  ],
  sorts: [
    st("Does it help a page rank higher?", ["Helps ranking", "Does not help"], [["Matches your keywords well", 0], ["Many pages link to it", 0], ["It is up to date", 0], ["It has a long title", 1], ["It has a bright colour", 1], ["It was made on a Friday", 1]]),
    st("Is it an advert or an ordinary result?", ["An advert", "An ordinary result"], [["Sponsored", 0], ["Ad", 0], ["Paid for by a company", 0], ["Matches your keywords", 1], ["Linked to by many pages", 1], ["Chosen by the ranking steps", 1]]),
  ],
  builds: [
    "Search engines rank pages in order.", "Good matches appear near the top.", "Many links can raise a page's rank.", "Sponsored results are adverts.",
    "An algorithm decides the order.", "Check a page even when it is first.", "Different people can see different results.", "Relevant pages match your keywords.",
  ],
  orders: [],
  scenes: [
    ch("A result has the word 'Sponsored' above it. What should you remember?", "It is an advert that was paid for", ["It is always the best answer", "It is always wrong", "It was made by your teacher"]),
    ch("Which result is most relevant to 'how bees make honey'?", "A page called How Bees Make Honey", ["A page about buying shoes", "A page about football scores", "A blank page"]),
    ch("A new page has no links to it yet. How is it likely to rank?", "Lower than popular pages for now", ["Always at the top", "It cannot be found at all", "It always ties"]),
    ch("Two pages match your keywords equally. One has far more links. Which is likely higher?", "The one with more links", ["The one with fewer links", "They swap every second", "Neither"]),
    ch("The search engine is an algorithm. What does that mean here?", "It follows steps to order the results", ["It reads your mind", "It picks a page at random", "It never changes"]),
    ch("Why should you look past the first few results?", "The best page for you may be lower down", ["Only the last result is true", "The first results are always wrong", "Results do not matter"]),
  ],
  gens: {
    2: times(6, () => (rng) => {
      const pages = makePages(rng, 3); if (pages.length < 3) return null;
      const top = [...pages].sort((a, b) => score(b) - score(a))[0];
      return ch("Each keyword match is worth 2 points and each link is worth 1 point. Which page ranks highest?", top.name, pages.filter((p) => p !== top).map((p) => p.name), showing("The pages", pages.map(pageLine)));
    }),
    3: times(6, () => (rng) => {
      const pages = makePages(rng, 4); if (pages.length < 4) return null;
      const ordered = [...pages].sort((a, b) => score(b) - score(a));
      return od("Each keyword match is worth 2 points and each link is worth 1 point. Put the pages in rank order, top first.", ordered.map((p) => `${p.name} (${plural(p.keywords, "keyword")}, ${plural(p.links, "link")})`));
    }),
    4: times(6, () => (rng) => {
      const p = { name: "Page A", keywords: int(rng, 1, 7), links: int(rng, 1, 12) };
      return nm("Each keyword match is worth 2 points and each link is worth 1 point. What is this page's score?", score(p), showing("The page", [pageLine(p)]));
    }),
  },
});

/* ====================================================================
   Judging websites
   ==================================================================== */
export const judging = termTopic({
  subject: "judging websites",
  rule: "Anyone can put a page on the internet, so not everything you read is true. A reliable page names who wrote it, gives the date, shows evidence and sources, and agrees with other good sources. Be careful of pages that sell things or show only one side.",
  hint: "Look for who wrote it, when, and what evidence they give. Then check another source.",
  terms: [
    ["reliable", "can be trusted to be correct"], ["author", "the person or group who wrote the page"],
    ["source", "where a piece of information comes from"], ["evidence", "facts that show an idea is true"],
    ["opinion", "what a person thinks, which is not always a fact"], ["bias", "showing only one side so it is not fair"],
    ["advert", "a message that tries to sell you something"], ["misinformation", "false information that spreads, even if people do not mean to"],
    ["cross-check", "to compare a fact with other sources"], ["up to date", "recent, not old and out of date"],
  ],
  apart: [["reliable", "up to date"], ["opinion", "bias"], ["misinformation", "bias"]],
  facts: [
    ch("Which page is most likely to be reliable for facts about the Moon?", "A space agency website", ["A joke website", "A page that says 'shocking secret they hide'", "A comment on a video"]),
    ch("What is a sign that a page may be reliable?", "It names the author and gives the date", ["It has lots of pop-ups", "It asks for your address", "It has no words"]),
    ch("What is a warning sign?", "The page has no author and many spelling mistakes", ["The page lists its sources", "The page was written by an expert", "The page shows the date"]),
    ch("Which is a fact?", "The Earth orbits the Sun", ["Cats are the best pets", "Winter is the nicest season", "Broccoli tastes horrible"]),
    ch("Which is an opinion?", "Football is the best sport", ["A week has seven days", "Water is wet", "London is a city"]),
    ch("Why is it a good idea to use more than one source?", "You can check that they agree", ["It is quicker", "It makes the page bigger", "It uses less power"]),
  ],
  sorts: [
    st("Is it a sign of a reliable page or a warning sign?", ["Reliable sign", "Warning sign"], [["The author is named", 0], ["It shows a recent date", 0], ["It lists its sources", 0], ["Other good sites say the same", 0], ["Written by an expert", 0], ["No author at all", 1], ["Lots of pop-up adverts", 1], ["Spelling mistakes everywhere", 1], ["It asks for personal details", 1], ["It says 'shocking secret'", 1], ["Big claims with no evidence", 1]]),
    st("Is it a fact or an opinion?", ["Fact", "Opinion"], [["The Moon orbits the Earth", 0], ["Water boils at 100 degrees at sea level", 0], ["London is the capital of England", 0], ["A week has seven days", 0], ["Football is the best sport", 1], ["Cats are better than dogs", 1], ["Broccoli tastes horrible", 1], ["Summer is the nicest season", 1]]),
  ],
  builds: [
    "Check who wrote the page.", "Look for the date of the page.", "A fact can be checked.", "An opinion is what someone thinks.", "Use more than one source.",
    "Be careful of pages that sell things.", "Pages with evidence are more reliable.", "Do not believe everything you read online.", "Ask a trusted adult if you are not sure.",
    "Compare two sources before you decide.", "A page with no author is a warning sign.",
  ],
  orders: [od("Put these steps of checking a page in order.", ["Search for and open a page", "Look at who wrote it and when", "Compare it with a second reliable source", "Decide whether to trust it"])],
  scenes: [
    ch("A website says a miracle cure works but gives no evidence and no author. What should you do?", "Be careful and check other sources", ["Believe it at once", "Share it with everyone", "Copy it into your homework"]),
    ch("Two websites disagree about a fact. What is a good next step?", "Check a third reliable source", ["Pick the one you like", "Pick the shorter one", "Stop reading"]),
    ch("A page for homework was last changed ten years ago and the topic changes quickly. What is the problem?", "It might be out of date", ["It is too colourful", "It has too many letters", "It is too quiet"]),
    ch("A page tries to sell you a product while it tells you the product is the best. What should you think?", "It may be biased because it wants to sell", ["It is always fair", "It is the safest source", "It must be a fact"]),
    ch("Which source is best for facts about volcanoes?", "A science museum website", ["A funny video", "A chat message", "A page with no author"]),
    ch("A friend sends you a surprising claim online. What should you do before sharing it?", "Check it with a reliable source", ["Share it quickly", "Add more claims", "Delete your account"]),
    ch("A page gives facts and says where each fact came from. What does this show?", "It names its sources", ["It is too long", "It is an advert", "It is a joke"]),
    ch("Which website address is most likely to be run by the government?", "www.gov.uk", ["www.amazing-secrets.com", "www.cheap-stuff.shop", "www.my-funny-page.net"]),
  ],
  gens: {
    2: [
      ch("Which clue tells you most that a page about space is reliable?", "It is written by a space agency and lists its sources", ["It has lots of bright colours", "It is the first result", "It has a funny title"]),
      ch("A page says 'Everyone knows this is true!' but gives no evidence. What is that?", "A claim with no evidence", ["A fact with evidence", "A source", "An author"]),
      ch("Which question helps you decide if a page is reliable?", "Who wrote it and when?", ["How long is the title?", "What colour is the text?", "How many pictures are there?"]),
      ch("Which is a better place to check a fact about history?", "A museum website", ["A page with no author", "A stranger's comment", "An advert for a game"]),
      ch("You find the same fact on three good websites. What does that suggest?", "It is more likely to be true", ["It is certainly false", "It is only an opinion", "Nothing at all"]),
    ],
    4: [
      ch("A page about animals has no author and no date, and shows lots of adverts. How reliable is it?", "Not very, so check another source", ["Very reliable", "As reliable as a museum", "It cannot be checked"]),
      ch("Which of these is an opinion?", "This is the best website ever", ["This page was written in 2024", "The author is named", "It lists its sources"]),
    ],
  },
});

/* ====================================================================
   Keeping information safe
   ==================================================================== */
// [password, how strong it is, 1 weakest to 9 strongest]
const PASSWORDS = [["cat", 1], ["123456", 1], ["password", 1], ["dog123", 2], ["football", 2], ["Max2015", 3], ["Sunny7", 3], ["blue-Tiger-Rain-42", 8], ["Tr33-H0use-B1ue!", 8], ["Rb7!kLm2#Qp", 9], ["purple-Elephant-Dance-9!", 9]];
const WEAK = PASSWORDS.filter((p) => p[1] <= 3).map((p) => p[0]);
const STRONG = PASSWORDS.filter((p) => p[1] >= 8).map((p) => p[0]);
const distinctStrength = (rng, count) => {
  const chosen = [];
  for (const p of shuffle(rng, PASSWORDS)) if (!chosen.some((c) => c[1] === p[1]) && chosen.length < count) chosen.push(p);
  return chosen;
};

export const safeInfo = termTopic({
  subject: "staying safe online",
  rule: "Personal information is anything that tells people who you are or where to find you. Keep it private online. Use a strong password, keep it secret, and log out when you finish. If something online worries you, tell a trusted adult.",
  hint: "Ask: would I be happy for a stranger to know this? If not, keep it private.",
  terms: [
    ["personal information", "details that tell people who you are or where to find you"], ["privacy settings", "controls that decide who can see what you share"],
    ["password", "a secret word or phrase that protects your account"], ["strong password", "a long password that mixes letters, numbers and symbols"],
    ["username", "the name you use to log in, which should not be your real name"], ["account", "your own space on a website or app, protected by a password"],
    ["trusted adult", "a grown-up you can talk to when something worries you"], ["log out", "to sign out so nobody else can use your account"],
    ["stranger", "someone online you do not know in real life"], ["share", "to send or post something so other people can see it"],
  ],
  apart: [["password", "strong password"]],
  facts: [
    ch("Which is safe to share online with people you do not know?", "Your favourite colour", ["Your home address", "Your password", "Your phone number"]),
    ch("Who should you tell if something online worries you?", "A trusted adult", ["A stranger", "Nobody", "Everyone online"]),
    ch("What should you do when you finish using an account on a shared computer?", "Log out", ["Leave it open", "Share your password", "Turn the screen to face the wall"]),
    ch("Who should know your password?", "Only you, and a trusted adult if needed", ["Everyone in your class", "Anyone who asks", "Everyone online"]),
    ...times(5, () => (rng) => {
      const picked = distinctStrength(rng, 3);
      const best = [...picked].sort((a, b) => b[1] - a[1])[0];
      return ch("Which password is the strongest?", best[0], picked.filter((p) => p !== best).map((p) => p[0]));
    }),
  ],
  sorts: [
    st("Is it safe to share, or should you keep it private?", ["Safe to share", "Keep it private"], [["Your favourite colour", 0], ["Your favourite animal", 0], ["A joke you like", 0], ["What you thought of a film", 0], ["Your home address", 1], ["Your password", 1], ["Your phone number", 1], ["Your school name and class", 1], ["Your full date of birth", 1]]),
    st("Is it a strong password or a weak one?", ["Strong", "Weak"], [...STRONG.map((p) => [p, 0]), ...WEAK.map((p) => [p, 1])]),
    st("Do you tell a trusted adult, or is it fine?", ["Tell a trusted adult", "That is fine"], [["Someone you do not know asks where you live", 0], ["A message asks for your password", 0], ["A stranger asks to be your friend", 0], ["A pop-up says you have won a prize", 0], ["You play a game with your cousin", 1], ["You message your teacher through the school system", 1], ["You video call your grandparent", 1]]),
  ],
  builds: [
    "Keep your password secret.", "Never share your address online.", "A strong password is long and mixed.", "Log out when you finish.", "Tell a trusted adult if something worries you.",
    "Use privacy settings to control who sees things.", "Do not share personal information with strangers.", "Ask before you post a photo.", "Change your password if someone knows it.", "Choose a username that is not your real name.",
  ],
  orders: [],
  scenes: [
    ch("A message from someone you do not know asks for your home address. What do you do?", "Do not reply and tell a trusted adult", ["Send it quickly", "Send half of it", "Ask them to send theirs first"]),
    ch("A friend asks for your password so they can play your game. What do you do?", "Keep it secret", ["Share it", "Write it on the game", "Tell the whole class"]),
    ch("You want to set up a username for a game. Which is the safest?", "BlueFalcon77", ["Your full real name", "Your name and school", "Your name and address"]),
    ch("Which password is the best to choose?", "purple-Elephant-Dance-9!", ["password", "123456", "cat"]),
    ch("What does a privacy setting do?", "It controls who can see what you share", ["It makes a game faster", "It makes the screen brighter", "It deletes the internet"]),
    ch("A pop-up says you have won a prize if you type your name and address. What should you do?", "Close it and tell a trusted adult", ["Type your details", "Share it with friends", "Click everything"]),
    ch("Why log out of an account on a school computer?", "So nobody else can use your account", ["To save electricity only", "To make the computer faster", "To change the password"]),
    ch("Which is personal information?", "Your phone number", ["Your favourite food", "The weather today", "A joke"]),
  ],
  gens: {
    2: [
      ch("Which username is safer?", "StarGazer12", ["Amy Jones Year 5 Oak School", "Sam, 12 High Street", "Lily Brown"]),
      ch("Which is the better way to keep a password safe?", "Remember it and keep it secret", ["Write it on the front of your book", "Tell your whole class", "Use the same simple word everywhere"]),
      ch("A game asks for your full name, address and school before you can play. What is the safest choice?", "Ask a trusted adult before typing anything", ["Type it all in", "Type half of it", "Give a friend's details instead"]),
    ],
    4: [
      ch("Which of these should you never share online?", "Your password", ["A joke", "Your favourite song", "What you thought of a book"]),
      ch("You think someone has found out your password. What should you do?", "Change it and tell a trusted adult", ["Keep using it", "Tell the whole class", "Ignore it"]),
      ch("Which is the weakest password?", "123456", ["Rb7!kLm2#Qp", "blue-Tiger-Rain-42", "purple-Elephant-Dance-9!"]),
    ],
    3: times(4, () => (rng) => {
      const picked = distinctStrength(rng, 4).sort((a, b) => a[1] - b[1]);
      if (picked.length < 4) return null;
      return od("Put the passwords in order, from the weakest to the strongest.", picked.map((p) => p[0]));
    }),
  },
});

/* ====================================================================
   Kind and responsible online
   ==================================================================== */
export const kindOnline = termTopic({
  subject: "being kind and responsible online",
  rule: "Be as kind online as you are in person. Think before you post, because what you share can stay online for a long time. Ask before you share other people's photos or work. If something upsets you, stop, tell a trusted adult, and use the report or block button.",
  hint: "Ask: is it kind, is it fair to other people, and would I be happy for it to stay online?",
  terms: [
    ["respect", "treating other people kindly and fairly"], ["digital footprint", "the trail of things you leave behind when you use the internet"],
    ["cyberbullying", "being unkind to someone online"], ["report", "to tell a trusted adult or use the report button about something that is wrong"],
    ["block", "to stop a person from being able to contact you"], ["permission", "agreement before you use or share something that is not yours"],
    ["copyright", "the rule that the person who made something owns it"], ["acceptable behaviour", "behaviour that is kind, fair and safe"],
    ["unacceptable behaviour", "behaviour that is unkind, unfair or unsafe"], ["credit", "saying who made something that you use"],
  ],
  apart: [["acceptable behaviour", "unacceptable behaviour"], ["permission", "copyright"], ["permission", "credit"], ["copyright", "credit"]],
  facts: [
    ch("Which comment is kind?", "That was a great drawing", ["That is rubbish", "Nobody likes you", "You are silly"]),
    ch("What should you do if someone is unkind to you online?", "Tell a trusted adult and report or block them", ["Be unkind back", "Keep it secret", "Send it to everyone"]),
    ch("Can something you post stay online for a long time?", "Yes", ["No, it vanishes at once", "Only for an hour", "Only if you pay"]),
    ch("What should you do before sharing a photo of a friend?", "Ask their permission", ["Post it fast", "Change their name", "Hide it for a week"]),
    ch("Who owns a picture that an artist draws?", "The artist", ["Anyone who finds it", "The first person to download it", "Nobody"]),
    ch("Which behaviour is acceptable online?", "Chatting politely in a class group", ["Using someone else's account", "Sending unkind messages", "Copying a page and saying it is yours"]),
  ],
  sorts: [
    st("Is it kind or unkind online?", ["Kind", "Unkind"], [["Saying well done", 0], ["Asking before you share a photo", 0], ["Helping a friend with a game", 0], ["Saying thank you", 0], ["Sending nasty messages", 1], ["Leaving someone out on purpose", 1], ["Sharing a secret that is not yours", 1], ["Making fun of a drawing", 1]]),
    st("Is it acceptable behaviour or unacceptable?", ["Acceptable", "Unacceptable"], [["Asking before sharing a friend's photo", 0], ["Giving credit for a picture you use", 0], ["Chatting politely in a group", 0], ["Using someone else's account", 1], ["Sending unkind messages", 1], ["Copying a whole page and saying it is yours", 1]]),
    st("Is it part of your digital footprint?", ["Part of your footprint", "Not part of it"], [["A comment you post", 0], ["A photo you share", 0], ["A website you search for", 0], ["A video you upload", 0], ["A diary kept in a drawer", 1], ["A chat you had face to face", 1], ["A drawing on paper at home", 1]]),
  ],
  builds: [
    "Be kind when you write online.", "Think before you post.", "What you post can stay online for a long time.", "Ask permission before you share a photo.", "Tell a trusted adult if something upsets you.",
    "You can report or block unkind messages.", "Respect other people's work.", "Say who made a picture you use.", "Be as kind online as you are in person.", "Never use someone else's account.",
  ],
  orders: [
    od("Put these in order if something online upsets you.", ["Stop and do not reply", "Tell a trusted adult", "Report or block with their help"]),
    od("Put these in order before you share a photo of a friend.", ["Ask your friend for permission", "Check who can see it", "Share it kindly"]),
  ],
  scenes: [
    ch("A classmate posts an unkind comment about your drawing. What is the best first step?", "Do not reply and tell a trusted adult", ["Write an unkind comment back", "Post it to everyone", "Hide it and say nothing"]),
    ch("You want to use a picture from the internet in your project. What should you do?", "Say who made it", ["Say you made it", "Change the colours and hide it", "Take it without saying"]),
    ch("A friend wants to post a photo of you. What should happen first?", "They should ask your permission", ["They should post it at once", "They should tag your address", "Nothing"]),
    ch("Someone online keeps sending you messages you do not like. What can you do?", "Block them and tell a trusted adult", ["Reply to every one", "Send them your address", "Ignore the problem for ever"]),
    ch("Which is a good thing to think before you post?", "Would I be happy for this to stay online?", ["Can I post it faster than anyone?", "Is it long?", "Is it the loudest?"]),
    ch("A pupil copies a whole web page into her homework and says it is hers. What is wrong?", "It is someone else's work and she gave no credit", ["It is too short", "It has pictures", "It is not blue"]),
    ch("Why should you be kind in a group chat?", "Words online can hurt as much as words in person", ["Chats do not matter", "Nobody reads them", "It is against the rules to type"]),
    ch("Where can you find a report button?", "On many websites and apps", ["Only on paper", "Only on a printer", "Nowhere at all"]),
  ],
  gens: {
    2: [
      ch("Which message is respectful?", "I disagree, but I see your point", ["You are so stupid", "Nobody asked you", "Go away"]),
      ch("Why do people say 'think before you post'?", "Posts can stay online and be seen by many people", ["Typing is slow", "Screens are small", "Posts always disappear"]),
      ch("You see an unkind comment about a classmate. What is a kind thing to do?", "Tell a trusted adult and be kind to the classmate", ["Add another unkind comment", "Share the comment", "Say nothing to anyone and look away"]),
    ],
    4: [
      ch("Which is not a good reason to share a friend's photo?", "You think it is funny and did not ask", ["They said yes", "They asked you to post it", "You checked who can see it"]),
    ],
  },
});
