import { ch, od, st, nm } from "../topicBank.js";
import { int, times, termTopic } from "../year5Computing/shared.js";

// Year 6 Online World: internet services, effective searching, judging content and staying
// safe. Safety content is gentle and action-focused: keep private, tell a trusted adult, report.

/* ====================================================================
   How email and messaging work
   ==================================================================== */
export const messaging = termTopic({
  subject: "email and messaging",
  rule: "Email and messaging are services that run on the internet. A message is split into packets, sent through routers to a mail server, and kept there until the person you sent it to opens it. Services like shared documents let people work together from different places.",
  hint: "Think about the journey: from your device, across the internet, to a server, then to the other person.",
  terms: [
    ["email address", "the name and domain that tells the internet where to deliver an email, such as sam@school.org"],
    ["inbox", "the place where emails sent to you are kept"], ["attachment", "a file sent along with an email"],
    ["subject line", "a short title that says what an email is about"], ["mail server", "a computer that stores emails and passes them on"],
    ["spam", "unwanted emails sent to lots of people"], ["CC", "sending a copy of an email to another person"],
    ["collaborate", "work together on the same thing"],
  ],
  apart: [["inbox", "mail server"]],
  facts: [
    ch("What does the @ sign in an email address separate?", "The person's name from the domain", ["The subject from the message", "Two different emails", "The date from the time"]),
    ch("Is email the same as the World Wide Web?", "No, they are different services that both use the internet", ["Yes, they are the same thing", "No, email does not use the internet", "Yes, but only on phones"]),
    ch("Why can you get an email while your computer is switched off?", "A mail server keeps it until you look", ["The email waits in the cable", "The email bounces around space", "It cannot arrive at all"]),
    ch("Which service lets a class write one document together from different houses?", "A shared online document", ["A printer", "A calculator", "A USB stick in one drawer"]),
  ],
  sorts: [
    st("Is it an internet service or a device?", ["Internet service", "Device"], [["Email", 0], ["Video calling", 0], ["The World Wide Web", 0], ["Online shared documents", 0], ["Router", 1], ["Laptop", 1], ["Phone", 1], ["Server", 1]]),
  ],
  builds: ["Email is a service that uses the internet.", "A mail server keeps emails until they are read.", "An attachment is a file sent with an email."],
  orders: [
    od("Put the journey of an email in order.", ["You press send", "The email is split into packets", "Routers pass the packets across the internet", "The mail server stores the email", "Your friend opens it from their inbox"]),
  ],
  scenes: [
    ch("You want to send a friend a photo with your email. What do you add?", "An attachment", ["A subject line only", "A spam filter", "A CC"]),
    ch("You want your teacher to get a copy of an email to your friend. What do you use?", "CC", ["Spam", "An attachment", "The inbox"]),
    ch("An email from a stranger says you have won a prize and asks for your password. What is it most likely to be?", "Spam or a trick", ["A real prize", "A message from school", "A new inbox"]),
  ],
  gens: {
    4: [
      ...times(4, () => (rng) => { const people = int(rng, 2, 6); const each = int(rng, 2, 5); return nm(`You send one email to ${people} friends, and each friend replies ${each} times. How many replies do you get?`, people * each); }),
      ...times(4, () => (rng) => { const size = int(rng, 4, 20); const packets = int(rng, 3, 9); return nm(`A message is split into ${packets} packets of ${size} kilobytes each. How many kilobytes is the whole message?`, size * packets); }),
    ],
  },
});

/* ====================================================================
   Smart searching
   ==================================================================== */
export const smartSearching = termTopic({
  subject: "searching",
  rule: "Search with a few strong keywords, not a whole sentence. Put \"quotation marks\" round words that must stay together. Results marked Sponsored or Ad are paid adverts, not always the best answer. A search engine ranks the rest by how well they seem to match.",
  hint: "Pick the words that matter most. Then check whether a result is an advert before you trust it.",
  terms: [
    ["keyword", "an important word you type into a search engine"], ["quotation marks", "marks that keep words together as an exact phrase in a search"],
    ["sponsored", "a result that someone paid to put at the top"], ["ranking", "the order a search engine puts its results in"],
    ["search engine", "a website that finds web pages that match your words"], ["filter", "a setting that narrows results, such as images or news only"],
  ],
  facts: [
    ch("Which search is best to find out how tall giraffes grow?", "giraffe height", ["I want to know about some animals please", "animals", "tall things"]),
    ch("Which search finds the exact song title Twinkle Twinkle Little Star?", "\"twinkle twinkle little star\"", ["twinkle star song maybe", "star", "little things that twinkle"]),
    ch("A result at the top says Sponsored. What does that mean?", "Someone paid for it to be shown there", ["It is the most truthful answer", "It was written by the search engine", "It is the newest page"]),
    ch("Why does a search engine put some results higher than others?", "It ranks them by how well they seem to match", ["It sorts them by colour", "It picks them at random", "It shows the oldest first"]),
  ],
  sorts: [
    st("Is it a strong keyword search?", ["Strong", "Weak"], [["volcano eruption facts", 0], ["Roman Britain roads", 0], ["\"Great Fire of London\" 1666", 0], ["stuff", 1], ["can you tell me things", 1], ["the a and of", 1]]),
    st("Is the result an advert or a normal result?", ["Advert", "Normal result"], [["Sponsored: buy volcano toys", 0], ["Ad: cheap trainers", 0], ["Sponsored: best game ever", 0], ["Volcanoes: facts for children", 1], ["How volcanoes form", 1], ["Volcano diagram", 1]]),
  ],
  builds: ["Use a few strong keywords to search.", "Sponsored results are paid adverts.", "Quotation marks keep words together."],
  orders: [
    od("Put the steps of a smart search in order.", ["Decide what you want to find out", "Choose a few strong keywords", "Skip results marked Sponsored", "Check the result on a second site"]),
  ],
  scenes: [
    ch("You searched planets and got too many results. What helps most?", "Add a keyword, such as planets Saturn rings", ["Type the same word again", "Search for something else", "Turn the screen off"]),
    ch("You only want pictures of owls. What should you use?", "The images filter", ["A longer sentence", "A sponsored result", "Capital letters"]),
  ],
  gens: {
    4: times(4, () => (rng) => { const results = int(rng, 8, 12); const ads = int(rng, 2, 4); return nm(`A results page shows ${results} results. ${ads} of them are marked Sponsored. How many are normal results?`, results - ads); }),
  },
});

/* ====================================================================
   Fact or fake
   ==================================================================== */
export const factOrFake = termTopic({
  subject: "checking online content",
  rule: "Not everything online is true. Check who made it and why, when it was written, and whether other trusted sites say the same. Headlines that shout or pictures that look too strange may be clickbait or edited.",
  hint: "Ask: who made it, why, when, and does another trusted source agree?",
  terms: [
    ["source", "the person or organisation that made the information"], ["clickbait", "a headline written to make you click, not to inform you"],
    ["edited image", "a picture that has been changed on a computer"], ["fact", "something that can be checked and shown to be true"],
    ["opinion", "what someone thinks or feels, which may not be true for everyone"], ["bias", "showing only one side because of what the writer wants"],
  ],
  apart: [["fact", "opinion"]],
  facts: [
    ch("What is the best way to check a surprising fact you read online?", "See if other trusted sites say the same", ["Believe it if it has a picture", "Share it to ask your friends", "Trust it if it is in capitals"]),
    ch("A headline says: YOU WON'T BELIEVE WHAT THIS CAT DID! What is it most likely to be?", "Clickbait", ["A science report", "A dictionary entry", "A school timetable"]),
    ch("Why does the date on a web page matter?", "Old information may be out of date", ["Newer pages always have more pictures", "The date shows who wrote it", "It does not matter"]),
    ch("A site selling a toy says it is the best toy ever. Why should you be careful?", "It wants you to buy, so it may be biased", ["Shops are never allowed to lie", "It must be a fact", "Toys are always the best"]),
  ],
  sorts: [
    st("Is it a fact or an opinion?", ["Fact", "Opinion"], [["Water boils at 100 degrees at sea level", 0], ["London is the capital of England", 0], ["A spider has eight legs", 0], ["Pizza is the best food", 1], ["Blue is the nicest colour", 1], ["Football is boring", 1]]),
    st("Is it a sign the content is trustworthy, or a warning sign?", ["Trustworthy sign", "Warning sign"], [["A named, expert author", 0], ["Recent date", 0], ["Other trusted sites agree", 0], ["Headline in all capitals", 1], ["No author or date", 1], ["A photo that looks too strange to be real", 1]]),
  ],
  builds: ["Check who made the information and why.", "Clickbait headlines want you to click.", "Trusted sites should agree on a fact."],
  orders: [
    od("Put the checks in order when you read a surprising story online.", ["Read past the headline", "Check who made it and when", "Look for the same story on trusted sites", "Decide whether to believe it"]),
  ],
  scenes: [
    ch("A photo shows a shark swimming down a city street during a storm. What should you think first?", "It might be edited, so check it", ["It must be real", "Share it straight away", "Sharks live in streets"]),
    ch("A friend shares a story you are not sure is true. What is the kind and sensible thing to do?", "Check it before sharing it any further", ["Share it to everyone quickly", "Add something extra to it", "Make fun of your friend"]),
  ],
  gens: {
    4: times(4, () => (rng) => { const checked = int(rng, 4, 9); const agree = int(rng, 1, checked - 1); return nm(`You checked a claim on ${checked} trusted sites. ${agree} agreed with it. How many did not agree?`, checked - agree); }),
  },
});

/* ====================================================================
   Digital footprint and reporting
   ==================================================================== */
export const footprint = termTopic({
  subject: "staying safe online",
  rule: "Your digital footprint is everything you leave online: posts, photos, comments and searches. It can last a long time, so think before you post. If something online worries you, you can tell a trusted adult, use the report button, or block the person.",
  hint: "Think: would I be happy for anyone to see this later? If something feels wrong, tell a trusted adult.",
  terms: [
    ["digital footprint", "the trail of things you leave online, which can last a long time"],
    ["privacy settings", "choices that control who can see what you share"], ["report", "tell a website or app about something that breaks its rules"],
    ["block", "stop someone from contacting you"], ["trusted adult", "a grown-up you know well and can talk to, such as a parent or teacher"],
    ["personal information", "details that identify you, such as your address or school"],
  ],
  facts: [
    ch("How long can a photo you post online last?", "A very long time, even if you delete it", ["Only one minute", "Only until you log off", "Never longer than a day"]),
    ch("Something you see online makes you feel worried. What is the first thing to do?", "Tell a trusted adult", ["Keep it secret", "Reply to it", "Share it with friends"]),
    ch("Someone you do not know keeps messaging you. What can you do?", "Block them, report them and tell a trusted adult", ["Send them your address", "Keep chatting", "Meet them"]),
    ch("What do privacy settings help you do?", "Choose who can see what you share", ["Make your posts last for ever", "Show your password", "Make your device faster"]),
  ],
  sorts: [
    st("Is it safe to share online, or is it personal information to keep private?", ["Fine to share", "Keep private"], [["Your favourite book", 0], ["A drawing of a dragon", 0], ["Your favourite sport", 0], ["Your home address", 1], ["Your password", 1], ["Your school's name and your full name together", 1]]),
    st("Is it a way to report a worry?", ["Way to report", "Not a way to report"], [["Tell a parent or carer", 0], ["Tell a teacher", 0], ["Use the report button", 0], ["Keep it a secret", 1], ["Reply angrily", 1], ["Forward it to friends", 1]]),
  ],
  builds: ["Think before you post anything online.", "Tell a trusted adult if something worries you.", "Keep your password private."],
  orders: [
    od("Put the steps in order if an online message upsets you.", ["Stop and do not reply", "Tell a trusted adult", "Together, block and report the account"]),
  ],
  scenes: [
    ch("A game asks for your home address to give you a prize. What should you do?", "Do not give it, and tell a trusted adult", ["Give it quickly", "Give your school address instead", "Ask a friend for theirs"]),
    ch("You want to post a photo with your friend in it. What should you do first?", "Ask your friend if it is OK", ["Post it straight away", "Edit their face", "Tag their address"]),
    ch("Which post is kind and safe for your digital footprint?", "A picture of a model you built, with no personal details", ["A rude comment about a classmate", "Your password", "Your home address"]),
  ],
  gens: {
    4: times(4, () => (rng) => { const posts = int(rng, 3, 9); const weeks = int(rng, 2, 6); return nm(`You post ${posts} photos a week. How many photos is that in ${weeks} weeks?`, posts * weeks); }),
  },
});
